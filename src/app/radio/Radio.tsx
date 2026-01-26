"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./radio.module.css";
import Image from "next/image";

interface Station {
  id: number;
  category: string;
  medianame: string;
  stream: string;
  website: string;
  frequency: string;
  location: string;
  type: string;
  hits: string;
  approved: string;
  priority: number;
  courtesy: string;
  courtesylink: string;
  medianameshort: string;
}

// interface Station {
//   id: number;
//   medianame: string;
//   location: string;
//   type: string;
//   frequency: string;
//   courtesy: string;
//   courtesylink: string;
//   priority: number;
// }

interface RadioState {
  showMenu: boolean;
  audioLoading: boolean;
  showVinyl: boolean;
  selectedMenu: string;
  playerOn: boolean;
  selectedStation: Station;
}

function Radio({ stations }: { stations: Station[] }) {
  const [volumeRange, setVolumeRange] = useState(10);

  const [state, setState] = useState<RadioState>({
    showMenu: false,
    audioLoading: false,
    selectedMenu: "International",
    playerOn: false,
    showVinyl: false,
    selectedStation: {
      id: 0,
      category: "",
      medianame: "",
      stream: "",
      website: "",
      frequency: "",
      location: "",
      type: "",
      hits: "",
      approved: "",
      priority: 0,
      courtesy: "",
      courtesylink: "",
      medianameshort: "",
    },
  });

  function displayMenu() {
    updateState({
      showMenu: !state.showMenu,
    });
  }

  function updateState(props: Partial<RadioState>) {
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

  const audioRef = useRef<HTMLAudioElement>(null);


  function setVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseInt(e.target.value);
    if (newVolume === 100) window.navigator.vibrate(500);
    setVolumeRange(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }

  function doPlay(station: Station) {
    const audio = audioRef.current;
    document.title = `${station.medianame}-${station.location || ""}`;
    if (audio?.paused || (audio?.src && audio?.src !== station.stream)) {
      updateState({
        audioLoading: true,
        selectedStation: station,
      });
      if (audio) {
        audio.src = station.stream;
        audio.onplaying = () => {
          updateState({
            audioLoading: false,
            playerOn: true,
            showVinyl: station.type.toLowerCase().includes("music") 
            || station.category.toLowerCase().includes("music")
          || station.type.toLowerCase().includes("artists")
          || station.category.toLowerCase().includes("devotional"),

          });
        };
        audio.play().catch((err) => {
         console.log("Error ", err)
        });
      }
    } else {
      audio?.pause();
      setState((prevState) => {
        return {
          ...prevState,
          playerOn: false,
          audioLoading: false,
        };
      });
    }
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

  // Sleep countdown state (in seconds)
  const [sleepCountdown, setSleepCountdown] = useState<number>(0); // in seconds
  const [timerSet, setTimerSet] = useState<boolean>(false); // Track if timer has been set
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false); // Track if countdown is active
  const [toggleOnTime, setToggleOnTime] = useState<number | null>(null); // Track when toggle was turned on

  function formatSleepTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function handleMinuteClick() {
    // Only allow if radio is on
    // if (!state.playerOn) return;
    // Increment by 1 minute (60 seconds) - for testing
    // When it reaches or exceeds 120 minutes (7200 seconds), reset to 0
    setSleepCountdown((prev) => {
      const newValue = prev + 60;
      return newValue >= 7200 ? 0 : newValue;
    });
    setTimerSet(true); // Mark that timer has been set
  }

  function handleSleepToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if (checked && sleepCountdown > 0) {
      // Toggle ON: Set the time when toggle was turned on (wait 1 minute before starting)
      setIsCountingDown(true);
      setToggleOnTime(Date.now());
    } else {
      // Toggle OFF: Reset everything
      setIsCountingDown(false);
      setToggleOnTime(null);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {};
  }, []);

  // Monitor sleep countdown and mute when it reaches 0
  useEffect(() => {
    if (sleepCountdown > 0 && isCountingDown && toggleOnTime !== null) {
      // Use interval that checks every second
      const timer = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - toggleOnTime!) / 1000);
        
        // Wait 1 minute (60 seconds) before starting to decrement
        if (elapsedSeconds >= 60) {
          // 1-minute delay has passed, now start decrementing
          setSleepCountdown((prev) => {
            if (prev <= 0) return 0; // Prevent going below 0
            
            const newVal = prev - 1;
            // If countdown reaches 0, pause audio immediately
            if (newVal === 0) {
              // Pause audio synchronously before state updates
              const audio = audioRef.current;
              if (audio) {
                audio.pause();
                // Update state immediately
                setState((prevState) => ({
                  ...prevState,
                  playerOn: false,
                  audioLoading: false,
                }));
              }
              // Stop countdown and reset
              setIsCountingDown(false);
              setToggleOnTime(null);
            }
            return newVal;
          });
        }
        // If elapsedSeconds < 60, do nothing - just keep checking every second
      }, 1000); // Check every 1 second

      return () => clearInterval(timer);
    }
  }, [sleepCountdown, isCountingDown, toggleOnTime]);

  // Separate effect to pause audio when countdown reaches 0 (safety net)
  // This triggers when countdown reaches 0, regardless of isCountingDown state
  useEffect(() => {
    if (sleepCountdown === 0) {
      // Check if we were counting down (even if it was just set to false)
      const wasCountingDown = isCountingDown || toggleOnTime !== null;
      
      if (wasCountingDown) {
        // Pause the radio when countdown reaches 0
        const audio = audioRef.current;
        if (audio) {
          // Force pause the audio - pause() is synchronous and returns void
          // Try pausing regardless of current paused state
          try {
            audio.pause();
            // Update state to reflect paused state
            setState((prevState) => ({
              ...prevState,
              playerOn: false,
              audioLoading: false,
            }));
          } catch (error) {
            // Handle any pause errors silently
          }
        }
        // Stop countdown and reset toggle
        setIsCountingDown(false);
        setToggleOnTime(null);
      }
    }
  }, [sleepCountdown, isCountingDown, toggleOnTime]);

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
          <div>HD Radio</div>
        </div>
         
        <ul onClick={muteRadio} className={lcd}> 
          {/* <li className={station}> */}
        
          <li
            className={
              state.playerOn && !state.audioLoading ? animatedTitle : station
            }
          >
            {state.selectedStation.medianame || "Internet Radio"}
          </li>

          {/* {state.selectedStation.frequency ? ( */}
          <li className={freqPanel}>
            {
              // state.selectedStation.frequency ? (
              <div className={flex}>
                <div>

                     {!state.audioLoading && state.playerOn 
                 &&  imageMap[state.selectedStation.medianame] && <div style={{position:"relative"}}>
                    <Image
                    style={{background:'none',position:"absolute", top:"-10px", left:"-90px"}}
                      src={imageMap[state.selectedStation.medianame]}
                      alt={"image"}
                      width={100}
                      height={100}
                      // className={musicGraph}
                      priority={true}
                    />
                    </div>}


                </div>
                {state.selectedStation.frequency ? (
                  <>
                    <div className={frequency}>
                      <div>&nbsp;</div>
                      <div>{state.selectedStation.frequency.split(" ")[0]}</div>
                    </div>
                    <div className={freqMode}>
                      {state.selectedStation.frequency.split(" ")[1]}
                    </div>

                    <div className={band}>
                      {state.selectedStation.frequency.split(" ")[2]}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={streaming}>Streaming Audio</div>
                  </>
                )}
                {/* <div>{loadingPlaying()}</div> */}
                {!state.audioLoading && state.playerOn ? (
                  <div style={{position:"relative"}}>
                    <Image
                      src={"/musicgraph.gif"}
                      alt={"image"}
                      width={0}
                      height={0}
                      className={musicGraph}
                      priority={true}
                    />
                     {state.showVinyl && <Image style={{position:"absolute", top:"5px", left:"15px"}}
                      src={"/lprecord.gif"}
                      alt={"image"}
                      width={100}
                      height={100}
                      // className={musicGraph}
                      priority={true}
                    />}

                  </div>
                ) : (
                  !state.audioLoading && (
                    <div style={{ color: "red", fontSize: "23px" }}>
                      &#128263;
                    </div>
                  )
                )}
                {state.audioLoading && <div className={ldsHourglass}></div>}
                {state.audioLoading && (
                  <div className={countDownColor}>
                    {/* <div className={circle}>
                      <CountDown speed={state.selectedStation.priority} />
                    </div> */}
                  </div>
                )}
              </div>
            }
          </li>

          <li className={place}>
            {state.selectedStation?.location || "Listen Live Radio"}&nbsp;
          </li>
          <li className={tagline}>
            {state.selectedStation?.type || "From Anywhere, Any Time"}&nbsp;
          </li>
          <li>
            <div className={courtesy}>
              <div></div>
              {/* <div>
                Courtesy:
                <a
                  onClick={(e) => e?.stopPropagation()}
                  target="_blank"
                  href={state.selectedStation?.courtesylink}
                >
                  {state.selectedStation?.courtesy}
                </a>
              </div> */}
              <div className={dateTime}>{showDateTime()}</div>
            </div>
          </li>
        </ul>

        {/* <div
          id="volumePanel"
          style={{
            margin: "3px 0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={radioLabel}>Volume</div>
          <div>
            <input
              onChange={(e) => {
                setVolume(e);
              }}
              type="range"
              min="1"
              max="100"
              step="1"
              value={volumeRange}
              className={slider}
            />
          </div>
        </div> */}

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
            {state.selectedMenu !== "International" && (
              <div
                onClick={() => updateSelectedMenu("International")}
                className={`${menuItem} ${c1}`}
              >
                International
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
            {state.selectedMenu !== "Artists" && (
              <div
                onClick={() => updateSelectedMenu("Artists")}
                className={`${menuItem} ${c3}`}
              >
                Artists
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
        {!state.showMenu && <div className={grid}>
          {stations
            ?.filter((station) => {
              return station.category === state.selectedMenu.toLowerCase();
            })
            ?.map?.((station) => {
              return (
                <React.Fragment key={station.id}>
                  <div
                    onClick={() => doPlay(station)}
                    
                    className={
                      station.id === state.selectedStation?.id
                        ? selectedRadioTile
                        : radioTile
                    }
                  >
                    {station.medianameshort}
                  </div>
                </React.Fragment>
              );
            })}
        </div>}
        </div>
         <div className={footerSection}>
          <div className={console} >
          <div className={volumeSection}>
             <div
          id="volumePanel"
        
        >
          <div className={radioLabel}>Volume</div>
          <div>
            <input
              onChange={(e) => {
                setVolume(e);
              }}
              type="range"
              min="1"
              max="100"
              step="1"
              value={volumeRange}
              className={slider}
            />
          </div>
        </div>
          </div>
           {/* <div className={sleepSection}> */}
             {/* <div
          id="volumePanel"
        >
          <div className={switchContainer} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div className={radioLabel}>Sleep</div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                className={switchInput}
                checked={isCountingDown}
                onChange={handleSleepToggle}
                disabled={sleepCountdown === 0}
              />
              <span className={switchSlider}></span>
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "8px" }}>
           
            <button
              onClick={handleMinuteClick}
              className={sleepMinute}
              style={{ 
                cursor: "pointer",
                color: isCountingDown ? "red" : "#fff"
              }}
            >
              {Math.floor(sleepCountdown / 60).toString().padStart(2, "0")}
            </button>
          </div>
        </div> */}
          {/* </div> */}
          </div>

          <div className={footer}>
            <div>Copyright 2026 Media DX</div>
            {/* <div className={author}>Developed by Noothan Krishnan</div> */}
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
  c1,c2,c3,c4,c5,c6,c7,
  console,
  sleepHour,
  sleepMinute,
  sleepSecond,
  sleepColon,
  switchContainer,
  switchInput,
  switchSlider
} = styles;
export default Radio;
