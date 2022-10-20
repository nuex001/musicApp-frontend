import React, { useEffect, useState } from "react";
import "../../App.css";
// import cover from "../../images/Rectangle 21.png";
import { HiRefresh } from "react-icons/hi";
import { FaCompress } from "react-icons/fa";
import {
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
} from "react-icons/bs";
import {
  GiPreviousButton,
  GiNextButton,
  GiPlayButton,
  GiPauseButton,
} from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setPlaystate, setPlaying, setIndex } from "../../redux/audio";
import { motion } from "framer-motion";

function Playing() {
  const { loading, music, playstate, nowplaying, index } = useSelector(
    (state) => state.audios
  );
  const dispatch = useDispatch();

  const [audioVolume, setAudioVolume] = useState(1);
  const [flow, setFlow] = useState("normal");
  const audio = document.querySelector("#audio_palying");

  const setprogress = (e) => {
    if (e.target.tagName !== "SPAN") {
      // was having a trouble of getting the exact point of my progress bar,had tocheck this and it works
      // getting the parent width,because the bar isn't static and it is said to have the exact initail width as the cont
      if (e.target.classList.contains("progress_bar")) {
        const width = e.target.parentNode.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        //  getting the duration
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
      } else {
        const width = e.target.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        //  getting the duration
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
      }
    }
  };

  //   toggleAudio
  const toggleAudio = () => {
    const audio = document.querySelector("#audio_palying");

    if (nowplaying) {
      audio.pause();
      dispatch(setPlaying(false));
    } else {
      audio.play();
      dispatch(setPlaying(true));
    }
  };

  const updateProgress = (e) => {
    // console.log(e.target.currentTime);
    const { currentTime, duration } = e.target;
    let proggrespercent = (currentTime / duration) * 100;
    const progress_bar = document.querySelectorAll(".progress_bar")[0];
    // console.log(progress_bar);
    progress_bar.style.width = `${proggrespercent}%`;
    let audioCurrent = audio.currentTime;
  };

  // set volume
  const setVolume = (e) => {
    const audio = document.querySelector("#audio_palying");
    const progress_bar = document.querySelectorAll(".progress_bar")[1];
    if (e.target.tagName !== "SPAN") {
      if (e.target.classList.contains("progress_bar")) {
        const width = e.target.parentNode.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        //  getting the volume
        const volume = audio.volume;
        audio.volume = (clickX / width) * 1;
        setAudioVolume((clickX / width) * 1); //setting the state
        progress_bar.style.width = `${(clickX / width) * 1 * 100}%`;
      } else {
        console.log(progress_bar);
        const width = e.target.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        //  getting the volume
        const volume = audio.volume;
        audio.volume = (clickX / width) * 1;
        setAudioVolume((clickX / width) * 1); //setting the state
        progress_bar.style.width = `${(clickX / width) * 1 * 100}%`;
      }
    }
    // checking if volume is low
  };
  // ended music
  const onEnded = () => {};
  //next
  const next = () => {
    const audio = document.querySelector("#audio_palying");
    let allmusic = music.songs.length;

    switch (playstate) {
      case "repeat":
        audio.currentTime = 0;
        break;
      case "shuffle":
        let musicIndex;
        let randIndex = Math.floor(Math.random() * allmusic);
        do {
          randIndex = Math.floor(Math.random() * allmusic);
        } while (musicIndex == randIndex);
        musicIndex = randIndex;
        dispatch(setIndex(musicIndex));
        break;

      default:
        console.log("dffd");
        index < music.songs.length - 1 && dispatch(setIndex(parseInt(index) + 1));
        break;
    }
  };
  // prev
  const prev = () => {
    const audio = document.querySelector("#audio_palying");
    let allmusic = music.length;
    // console.log(playstate);

    switch (playstate) {
      case "repeat":
        audio.currentTime = 0;
        break;
      case "shuffle":
        let musicIndex;
        let randIndex = Math.floor(Math.random() * allmusic);
        do {
          randIndex = Math.floor(Math.random() * allmusic);
        } while (musicIndex == randIndex);
        musicIndex = randIndex;
        setIndex(musicIndex);
        break;

      default:
        index > 0 && setIndex(index - 1);
        break;
    }
  };
  // changeState
  const changeState = (e) => {
    // console.log(e.target.getAttribute("data-value"));
    if (e.target.getAttribute("data-value") === playstate) {
      dispatch(setPlaystate("normal"));
    } else {
      dispatch(setPlaystate(e.target.getAttribute("data-value")));
    }
  };
  //
  const showVolume = (e) => {
    const volumeBar = document.querySelector(".volume .progress_cont");
    //  console.log(volumeBar);
    volumeBar.classList.toggle("active");
  };

  useEffect(() => {
    if (music) {
      // console.log(music);
      const audio = document.querySelector("#audio_palying");
      const img = document.querySelector(".display img");
      const artist = document.querySelector(".display .text p");
      const name = document.querySelector(".display .text h1");
      // console.log(img);

      audio.src = `https://musicapp-api.onrender.com/${music.songs[index]}`;
      artist.textContent = music.artist;
      name.textContent = music.title;
      img.src = `https://musicapp-api.onrender.com/${music.cover}`;
      if (nowplaying) {
        audio.play();
      }
    }
  }, [index]);
  if (music) {
    return (
      <motion.div
        className="playing_cont"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <audio
          src=""
          style={{ display: "none" }}
          onTimeUpdate={updateProgress}
          onEnded={next}
          id="audio_palying"
        />
        <div className="display">
          <img src="" alt="" />
          <div className="text">
            <h1></h1>
            <p></p>
          </div>
        </div>
        <div className="controls">
          <div className="control">
            <FaCompress
              className="fa"
              data-value="shuffle"
              onClick={changeState}
              style={{
                color: `${
                  playstate === "shuffle" ? "var(--color)" : "var(--text)"
                }`,
              }}
            />
            <GiPreviousButton className="fa" onClick={prev} />
            <div className="play" onClick={toggleAudio}>
              {!nowplaying ? (
                <GiPlayButton className="icon" />
              ) : (
                <GiPauseButton className="icon" />
              )}
            </div>
            <GiNextButton className="fa" onClick={next} />
            <HiRefresh
              className="fa"
              data-value="repeat"
              onClick={changeState}
              style={{
                color: `${
                  playstate === "repeat" ? "var(--color)" : "var(--text)"
                }`,
              }}
            />
          </div>
          <div
            className="progress_cont"
            onClick={setprogress}
            onTouchMove={setprogress}
          >
            <div className="progress_bar">
              <span></span>
            </div>
          </div>
        </div>
        <div className="volume">
          {audioVolume < 0.3 ? (
            <BsFillVolumeDownFill className="icon" onClick={showVolume} />
          ) : (
            <BsFillVolumeUpFill className="icon" onClick={showVolume} />
          )}
          <div
            className="progress_cont"
            onClick={setVolume}
            onTouchMove={setVolume}
          >
            <div className="progress_bar">
              <span></span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

export default Playing;
