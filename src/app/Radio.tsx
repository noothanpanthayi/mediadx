"use client";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import styles from "./radio.module.css";
import Image from "next/image";
// import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import Footer from "./components/footer/Footer";

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
  const [playbackError, setPlaybackError] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Sleep timer state - track minutes directly
  const [sleepMinutes, setSleepMinutes] = useState<number>(0);
  const [isSleepActive, setIsSleepActive] = useState<boolean>(false);
  const [switchOnTime, setSwitchOnTime] = useState<number | null>(null);
  const hasStartedCounting = useRef(false);
  const prevSleepMinutes = useRef<number>(0);

  // Display variable - shows on screen
  const showMinute = sleepMinutes;

  const [state, setState] = useState<RadioState>({
    showMenu: false,
    audioLoading: false,
    selectedMenu: "Artists",
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
    if (audioRef.current) {
      audioRef.current.volume = volumeRange / 100;
    }
    if (videoRef.current) {
      videoRef.current.volume = volumeRange / 100;
    }

    const video = videoRef.current;
    const handleVideoError = () => {
      if (!video) return;
      const message = video.error ? `Video playback error code=${video.error.code}` : "Video playback error";
      console.error(message, video.error);
      setPlaybackError(message);
    };
    video?.addEventListener("error", handleVideoError);

    return () => {
      video?.removeEventListener("error", handleVideoError);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  function isVideoStream(stream: string) {
    return /\.m3u8(\?|$)/i.test(stream?.toLowerCase() ?? "");
  }

  function isSafariBrowser() {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Safari/.test(ua) && !/Chrome|CriOS|Chromium|Edg|Firefox|FxiOS/.test(ua);
  }

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
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  }

  function doPlay(station: Station) {
    const audio = audioRef.current;
    const video = videoRef.current;
    const isVideo = isVideoStream(station.stream);
    document.title = `${station.medianame}-${station.location || ""}`;

    if (isVideo) {
      if (!video) return;
      audio?.pause();
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      updateState({
        audioLoading: true,
        selectedStation: station,
      });

      const canPlayNative =
        video.canPlayType("application/vnd.apple.mpegurl") !== "" ||
        video.canPlayType("application/x-mpegURL") !== "";

      console.log(
        "HLS playback start",
        { stream: station.stream, canPlayNative, hlsSupported: Hls.isSupported() }
      );

      const startVideo = () => {
        video.onplaying = () => {
          updateState({
            audioLoading: false,
            playerOn: true,
            showVinyl:
              station.type.toLowerCase().includes("music") ||
              station.category.toLowerCase().includes("music") ||
              station.type.toLowerCase().includes("artists") ||
              station.category.toLowerCase().includes("devotional"),
          });
          setPlaybackError("");
        };
        video
          .play()
          .catch((err) => {
            console.log("Error playing video stream", err);
            setPlaybackError(`Video play failed: ${err?.message ?? err}`);
          });
      };

      const isSafari = isSafariBrowser();
      const useHlsJs = Hls.isSupported() && (!canPlayNative || !isSafari);
      console.log("HLS playback mode", { canPlayNative, isSafari, useHlsJs });

      if (useHlsJs) {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
            xhr.withCredentials = false;
          },
        });
        hlsRef.current = hls;
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(station.stream);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, startVideo);
        hls.on(Hls.Events.ERROR, (event, data) => {
          const message = `HLS error type=${data.type} details=${data.details} fatal=${data.fatal}`;
          console.error("HLS error", message, event, data);
          const isIgnoredManifestError =
            data.fatal &&
            data.type === Hls.ErrorTypes.NETWORK_ERROR &&
            data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR;

          if (!data.fatal || isIgnoredManifestError) {
            if (isIgnoredManifestError) {
              console.warn("Ignored fatal HLS manifest load error", message);
            }
            return;
          }

          setPlaybackError(message);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("HLS network error, trying recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("HLS media error, trying recover...");
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        });
      } else {
        video.src = station.stream;
        video.load();
        startVideo();
      }
    } else {
      if (!audio) return;
      const shouldPlay =
        audio.paused || (audio.src && audio.src !== station.stream);
      video?.pause();
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (shouldPlay) {
        updateState({
          audioLoading: true,
          selectedStation: station,
        });
        audio.src = station.stream;
        audio.onplaying = () => {
          updateState({
            audioLoading: false,
            playerOn: true,
            showVinyl:
              station.type.toLowerCase().includes("music") ||
              station.category.toLowerCase().includes("music") ||
              station.type.toLowerCase().includes("artists") ||
              station.category.toLowerCase().includes("devotional"),
          });
        };
        audio.play().catch((err) => {
          console.log("Error ", err);
          setPlaybackError(`Audio play failed: ${err?.message ?? err}`);
        });
      } else {
        audio.pause();
        setState((prevState) => {
          return {
            ...prevState,
            playerOn: false,
            audioLoading: false,
          };
        });
      }
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
    const isVideo = isVideoStream(state.selectedStation.stream);
    const media = isVideo ? videoRef.current : audioRef.current;
    if (!media) return;

    if (media.paused) {
      media.play();
      setState((prevState) => ({
        ...prevState,
        playerOn: true,
      }));
    } else {
      media.pause();
      setState((prevState) => ({
        ...prevState,
        playerOn: false,
      }));
    }
  }

  function stopRadio() {
    const isVideo = isVideoStream(state.selectedStation.stream);
    const media = isVideo ? videoRef.current : audioRef.current;
    if (!media) return;
    media.pause();
    setState((prevState) => ({
      ...prevState,
      playerOn: false,
    }));
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
      <audio ref={audioRef} style={{ display: "none" }} />
      <video
        ref={videoRef}
        playsInline
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
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
                    {!state.audioLoading &&
                      state.playerOn &&
                      imageMap[state.selectedStation.medianame] && (
                        <div style={{ position: "relative" }}>
                          <Image
                            style={{
                              background: "none",
                              position: "absolute",
                              top: "-10px",
                              left: "-90px",
                            }}
                            src={imageMap[state.selectedStation.medianame]}
                            alt={"image"}
                            width={100}
                            height={100}
                            // className={musicGraph}
                            priority={true}
                          />
                        </div>
                      )}
                  </div>
                  {state.selectedStation.frequency ? (
                    <>
                      <div className={frequency}>
                        <div>&nbsp;</div>
                        <div>
                          {state.selectedStation.frequency.split(" ")[0]}
                        </div>
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
                    <div style={{ position: "relative" }}>
                      <Image
                        src={"/musicgraph.gif"}
                        alt={"image"}
                        width={0}
                        height={0}
                        className={musicGraph}
                        priority={true}
                      />
                      {state.showVinyl && (
                        <Image
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "15px",
                          }}
                          src={"/lprecord.gif"}
                          alt={"image"}
                          width={100}
                          height={100}
                          // className={musicGraph}
                          priority={true}
                        />
                      )}
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
          {/* {playbackError && (
            <div
              style={{
                color: "#ff6666",
                background: "rgba(255, 0, 0, 0.08)",
                padding: "8px 12px",
                borderRadius: "8px",
                marginTop: "12px",
                fontSize: "0.9rem",
                lineHeight: 1.4,
              }}
            >
              <strong>Playback issue:</strong> {playbackError}
            </div>
          )} */}

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
              {/* <div
                  onClick={() => displayMenu()}
                  className={`${menuItem} ${closeMenu1}`}
                >
                  X
                </div> */}

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
          )}
        </div>
        <div className={footerSection}>
          <div className={radioconsole}>
            <div className={volumeSection}>
              <div id="volumePanel">
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
            <div className={sleepSection}>
              <div id="volumePanel">
                <div
                  className={switchContainer}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <div className={radioLabel}>Sleep</div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      className={switchInput}
                      checked={isSleepActive}
                      onChange={handleSwitchToggle}
                      disabled={showMinute === 0}
                    />
                    <span className={switchSlider}></span>
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    marginTop: "8px",
                  }}
                >
                  <button
                    onClick={handleTimerClick}
                    className={sleepMinute}
                    style={{
                      cursor: "pointer",
                      color: isSleepActive ? "red" : "#fff",
                    }}
                  >
                    {String(showMinute).padStart(2, "0")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />

          {/* <div className={footer}>
            <div>Media DX</div>
            <div className={author}>Developed by Noothan Krishnan</div>
          </div> */}
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
  closeMenu1,
} = styles;
export default Radio;
