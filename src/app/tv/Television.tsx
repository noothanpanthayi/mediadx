"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./radio.module.css";

interface Channel {
  id: number;
  category: string;
  station: string;
  title: string | null;
  location: string | null;
  url: string;
  courtesy: string | null;
  priority: number | null;
  // created_at: string; // or Date if you convert in your API
  // updated_at: string; // or Date
}

// interface ChannelState {
//   showMenu: boolean;
//   audioLoading: boolean;
//   showVinyl: boolean;
//   selectedMenu: string;
//   playerOn: boolean;
//   selectedStation: Channel;
//   created_at:Timestamp;
//   updated_at:Timestamp;
// }

interface ChannelState {
   showMenu: boolean,
    audioLoading: boolean,
    selectedMenu: string,
    playerOn: boolean,
    showVinyl: boolean,
    selectedChannel: {
      id: 0,
      category: string,
      station: string,
      title: string,
      location: string,
      url: string,
      courtesy: string,
      priority: number,
      // created_at:Timestamp,
    },
}

function Television({ channels }: { channels: Channel[] }) {
  const [volumeRange, setVolumeRange] = useState(10);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sleep timer state - track minutes directly
  const [sleepMinutes, setSleepMinutes] = useState<number>(0);
  const [isSleepActive, setIsSleepActive] = useState<boolean>(false);
  const [switchOnTime, setSwitchOnTime] = useState<number | null>(null);
  const hasStartedCounting = useRef(false);
  const prevSleepMinutes = useRef<number>(0);

  // Display variable - shows on screen
  const showMinute = sleepMinutes;

  const [state, setState] = useState<ChannelState>({
    showMenu: false,
    audioLoading: false,
    selectedMenu: "International",
    playerOn: false,
    showVinyl: false,
    selectedChannel: {
      id: 0,
      category: "",
      station: "",
      title: "",
      location: "",
      url: "YDvsBbKfLPA?si=Zv4iHTDG8PIOUSYl",
      courtesy: "",
      priority: 0,
      // created_at:number,
    },
  });

  function displayMenu() {
    updateState({
      showMenu: !state.showMenu,
    });
  }

  function updateState(props: Partial<ChannelState>) {
    setState((prevState) => {
      return {
        ...prevState,
        ...props,
      };
    });
  }

  useEffect(() => {
    setVolumeRange(volumeRange);
    if (audioRef.current) {
      audioRef.current.volume = volumeRange / 100;
    }
  }, []);

  function updateSelectedMenu(category: string) {
    setState((prevState) => {
      return {
        ...prevState,
        showMenu: false,
        selectedMenu: category,
      };
    });
  }

  // audio.oncanplaythrough = () => {
  //   updateState({
  //     audioLoading: false,
  //     playerOn: true,
  //   });
  // };

  function setVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseInt(e.target.value);
    if (newVolume === 100) window.navigator.vibrate(500);
    setVolumeRange(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }

  function doPlay(channel: Channel) {

    setState((prevState:any)=>{
      return {
        ...prevState,
          selectedChannel:{
          url:channel.url
        }
      }
    })
  }

  function CountDown({ speed }: { speed: number }) {
    const [max, setMax] = useState(speed);

    useEffect(() => {
      const handler = setInterval(() => {
        setMax((prev) => {
          if (prev <= 0) {
            clearInterval(handler);

            setMax(0);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(handler); // cleanup on unmount
    }, []);

    return max;
  }

  function muteRadio() {
    const audio = audioRef?.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setState((prevState) => {
        return {
          ...prevState,
          playerOn: true,
        };
      });
    } else {
      audio.pause();
      setState((prevState) => {
        return {
          ...prevState,
          playerOn: false,
        };
      });
    }
  }

  function stopRadio() {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.pause();
    setState((prevState) => {
      return {
        ...prevState,
        playerOn: false,
      };
    });
  }

  function showDateTime() {
    const raw = new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return raw.replace(/,/g, "").replace("AM", "am").replace("PM", "pm");
  }

  // Handle timer button click - increase by 15 minutes
  function handleTimerClick() {
    setSleepMinutes((prev) => prev + 15);
  }

  // Handle sleep switch toggle
  function handleSwitchToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if (checked) {
      // Switch turned ON
      prevSleepMinutes.current = sleepMinutes;
      hasStartedCounting.current = false;
      setSwitchOnTime(Date.now());
      setIsSleepActive(true);
    } else {
      // Switch turned OFF - reset timer to 00
      setSleepMinutes(0);
      prevSleepMinutes.current = 0;
      hasStartedCounting.current = false;
      setSwitchOnTime(null);
      setIsSleepActive(false);
    }
  }

  // Countdown effect - decrements timer every minute
  useEffect(() => {
    if (isSleepActive && sleepMinutes > 0 && switchOnTime !== null) {
      const interval = setInterval(() => {
        hasStartedCounting.current = true;
        setSleepMinutes((prev) => (prev > 0 ? prev - 1 : 0));
      }, 60000); // 60000 ms = 1 minute

      return () => clearInterval(interval);
    }
  }, [isSleepActive, switchOnTime]);

  // Simple monitor - when display transitions to 0, stop the radio
  useEffect(() => {
    if (isSleepActive && showMinute === 0 && prevSleepMinutes.current > 0) {
      stopRadio();
      setIsSleepActive(false);
      setSwitchOnTime(null);
      hasStartedCounting.current = false;
    }
    prevSleepMinutes.current = showMinute;
  }, [showMinute, isSleepActive]);

  const imageMap: Record<string, string> = {
    Krishna: "/krishna.gif",
    "Radio Ayyappa": "/ayyappa.png",
    Ganesha: "/ganesha.png",
    Sai: "/sainew1.png",
    Hanuman: "/hanuman.png",
  };

  return (
    <>
      <audio ref={audioRef} />
      <div className={radio}>
        <div className={headerSection}>
          <div className={titlePanel}>
            <div>Media DX</div>
            <div></div>
            <div>HD Television</div>
          </div>

          <ul className={lcd}>
            <iframe 
              style={{ width: "100%", height: "100%" }}
              src={`https://www.youtube.com/embed/${state.selectedChannel.url}&autoplay=1&mute=0`}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </ul>

          <div onClick={displayMenu} className={selectedMenuItem}>
            <div></div>
            <div> {state.selectedMenu}</div>
            {state.showMenu ? (
              <div className={arrow}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2 11l6-6 6 6H2z" />
                </svg>
              </div>
            ) : (
              <div className={arrow}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2 5l6 6 6-6H2z" />
                </svg>
              </div>
            )}
          </div>

          {state.showMenu && (
            <div className={menu}>
              {state.selectedMenu !== "Artists" && (
                <div
                  onClick={() => updateSelectedMenu("Artists")}
                  className={`${menuItem} ${c1}`}
                >
                  Artists
                </div>
              )}
              {state.selectedMenu !== "Music" && (
                <div
                  onClick={() => updateSelectedMenu("Music")}
                  className={`${menuItem} ${c2}`}
                >
                  Music
                </div>
              )}
              {state.selectedMenu !== "International" && (
                <div
                  onClick={() => updateSelectedMenu("International")}
                  className={`${menuItem} ${c3}`}
                >
                  International
                </div>
              )}
              {state.selectedMenu !== "Hindi" && (
                <div
                  onClick={() => updateSelectedMenu("Hindi")}
                  className={`${menuItem} ${c4}`}
                >
                  Hindi
                </div>
              )}
              {state.selectedMenu !== "Malayalam" && (
                <div
                  onClick={() => updateSelectedMenu("Malayalam")}
                  className={`${menuItem} ${c5}`}
                >
                  Malayalam
                </div>
              )}
              {state.selectedMenu !== "Tamil" && (
                <div
                  onClick={() => updateSelectedMenu("Tamil")}
                  className={`${menuItem} ${c6}`}
                >
                  Tamil
                </div>
              )}
              {state.selectedMenu !== "Devotional" && (
                <div
                  onClick={() => updateSelectedMenu("Devotional")}
                  className={`${menuItem} ${c7}`}
                >
                  Devotional
                </div>
              )}

              {/* <div className={menuItem}>&nbsp;</div>
            <div className={menuItem}>&nbsp;</div>
            <div className={menuItem}>&nbsp;</div>
            <div className={menuItem}>&nbsp;</div> */}
            </div>
          )}
        </div>
        <div className={scrollable}>
          {!state.showMenu && (
            <div className={grid}>
              {channels
                ?.filter((channel) => {
                  return channel.category === state.selectedMenu.toLowerCase();
                })
                ?.map?.((channel) => {
                  return (
                    <React.Fragment key={channel.id}>
                      <div
                        onClick={() => doPlay(channel)}
                        className={
                          channel.id === state.selectedChannel?.id
                            ? selectedRadioTile
                            : radioTile
                        }
                      >
                        {channel.station}
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          )}
        </div>
        <div className={footerSection}>
          <div className={footer}>
            <div>Media DX</div>
            <div className={author}>Developed by Noothan Krishnan</div>
          </div>
        </div>
      </div>
    </>
  );
}

const {
  frequency,
  streaming,
  lcd,
  radio,
  station,
  freqPanel,
  place,
  tagline,
  grid,
  radioTile,
  menuItem,
  selectedMenuItem,
  menu,
  selectedRadioTile,
  ldsHourglass,
  courtesy,
  dateTime,
  animatedTitle,
  musicGraph,
  titlePanel,
  flex,
  sleepNo,
  flexRow,
  freqMode,
  band,
  loading,
  countDownColor,
  circle,
  slider,
  radioLabel,
  arrow,
  footer,
  footerSection,
  volumeSection,
  sleepSection,
  headerSection,
  scrollable,
  author,
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  radioconsole,
  sleepMinute,
  switchContainer,
  switchInput,
  switchSlider,
} = styles;
export default Television;
