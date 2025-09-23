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

  //    function setVolume(e:any){
  //     parseInt(e.target.value)===100 && window.navigator.vibrate(500);
  //     setVolumeRange(e.target.value);
  //     audioRef?.current?.volume=volumeRange/100;
  // }

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
          });
        };
        audio.play().catch((err) => {
          console.warn("Autoplay blocked", err);
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

  return (
    <>
      <audio ref={audioRef} />
      <div className={radio}>
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
                {state.selectedStation.frequency ? (
                  <>
                    <div className={frequency}>
                      {state.selectedStation.frequency.split(" ")[0]}
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
                    <div>Streaming Audio</div>
                  </>
                )}
                {/* <div>{loadingPlaying()}</div> */}
                {!state.audioLoading && state.playerOn && (
                  <div>
                    <Image
                      src={"/musicgraph.gif"}
                      alt={"image"}
                      width={0}
                      height={0}
                      className={musicGraph}
                      priority={true}
                    />
                  </div>
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
              <div>
                <strong>Courtesy:</strong>
                <a
                  onClick={(e) => e?.stopPropagation()}
                  target="_blank"
                  href={state.selectedStation?.courtesylink}
                >
                  {state.selectedStation?.courtesy}
                </a>
              </div>
              <div className={dateTime}>{showDateTime()}</div>
            </div>
          </li>
        </ul>

        <div
          id="volumePanel"
          style={{ margin: "0 0px", display: "flex", flexDirection: "column" }}
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

        <div onClick={displayMenu} className={selectedMenuItem}>
         <div></div>
          <div> {state.selectedMenu}</div>
           {state.showMenu ? <div className={arrow}>&#9207;</div>:<div className={arrow}>&#9206;</div>}

        </div>
         
        {state.showMenu && (
          <div className={menu}>
            {state.selectedMenu !== "International" && (
              <div
                onClick={() => updateSelectedMenu("International")}
                className={menuItem}
              >
                International
              </div>
            )}
            {state.selectedMenu !== "Music" && (
              <div
                onClick={() => updateSelectedMenu("Music")}
                className={menuItem}
              >
                Music
              </div>
            )}
            {state.selectedMenu !== "Hindi" && (
              <div
                onClick={() => updateSelectedMenu("Hindi")}
                className={menuItem}
              >
                Hindi
              </div>
            )}
            {state.selectedMenu !== "Malayalam" && (
              <div
                onClick={() => updateSelectedMenu("Malayalam")}
                className={menuItem}
              >
                Malayalam
              </div>
            )}
            {state.selectedMenu !== "Tamil" && (
              <div
                onClick={() => updateSelectedMenu("Tamil")}
                className={menuItem}
              >
                Tamil
              </div>
            )}

            {/* <div className={menuItem}>&nbsp;</div>
            <div className={menuItem}>&nbsp;</div>
            <div className={menuItem}>&nbsp;</div>
            <div className={menuItem}>&nbsp;</div> */}
          </div>
        )}
        <div className={grid}>
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
        </div>
      </div>
    </>
  );
}

const {
  frequency,
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
  flexRow,
  freqMode,
  band,
  loading,
  countDownColor,
  circle,
  slider,
  radioLabel,
  arrow
} = styles;
export default Radio;
