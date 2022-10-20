import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/playlist.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ImDownload } from "react-icons/im";
import cover1 from "../../images/Rectangle 14.png";
import cover2 from "../../images/Rectangle 15.png";
import { motion } from "framer-motion";
import axios from "axios";
import Spinner from "../layouts/Spinner";

import Playing from "../layouts/Playing";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylist,
  setPlaystate,
  setPlaying,
  setIndex,
} from "../../redux/audio";

function Playlist() {
  const navigate = useNavigate();
  let { id } = useParams();
  if (!id) {
    navigate(-1);
  }
  const [data, setData] = useState(null);
  let token = localStorage.getItem("musicToken");
  //
  const dispatch = useDispatch();
  const { loading, error, music, nowplaying, index } = useSelector(
    (state) => state.audios
  );
  useEffect(() => {
    dispatch(fetchPlaylist(id));
    setData(token);
  }, []);

  // Like
  const likeMusic = async (e) => {
    const form = new FormData();
    form.append("audioId", e);
    form.append("userId", data);
    try {
      await axios.put("/api/like/", form).then((response) => response.data);
      dispatch(fetchPlaylist(id));
    } catch (error) {}
  };
  // UNLike
  const unLikeMusic = async (e) => {
    const form = new FormData();
    form.append("audioId", e);
    form.append("userId", data);
    try {
      await axios.put("/api/unLike/", form).then((response) => response.data);
      dispatch(fetchPlaylist(id));
    } catch (error) {}
  };

  const onLoadedMetadata = (e) => {
    let mainDur = e.target.duration / 60;
    mainDur = mainDur.toFixed(2);
    e.target.parentNode.querySelector("#dur").textContent = mainDur;

    // working for title
    const audio = e.target.parentNode.querySelector("audio");
    const tit = e.target.parentNode.querySelector("#tit");
    const fileName = audio.src.split("/");
    const ext_names = fileName[fileName.length - 1];
    const main_ext = ext_names.split(".");
    const main = main_ext[0];
    tit.textContent = main;
  };

  //SetIndex And play
  const onclick = (e) => {
    dispatch(setIndex(e.target.getAttribute("data-index")));
    dispatch(setPlaying(true));
  };

  // PLAYALL
  const playAll = (e) => {
    dispatch(setIndex(e.target.getAttribute("data-index")));
    dispatch(setPlaying(true));
  };

  // ADDCOLLECTION
  const addCollection = () => {
    let cartItems = localStorage.getItem("musicsInCart"); //getting the cart Item
    cartItems = JSON.parse(cartItems); //parsing it
    if (cartItems != null) {
      cartItems = {
        ...cartItems,
        [music.title]: music,
      };
    } else {
      //if empty then create a cartItem
      cartItems = {
        [music.title]: music,
      };
    }

    localStorage.setItem("musicsInCart", JSON.stringify(cartItems));
    console.log(music);
  };

  return (
    <React.Fragment>
      <motion.div
        className="child"
        style={{ backgroundImage: "url('/audio/Rectangle 20.png')" }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        {music ? (
          <div className="header">
            <img
              src={`http://localhost:5000/${music.cover}`}
              alt=""
              className="cover"
            />
            <div className="text">
              <h2>{music.title}</h2>
              <p>{music.description}</p>
              <p>
                <span>{music.songs.length}</span>{" "}
                {music.songs.length > 1 ? "songs" : "song"} ~{" "}
                <span>16 hrs+</span>
              </p>
              <div className="innerBox">
                <div className="box">
                  <img src="/audio/Play.png" alt="" onClick={playAll} data-index={0}/> Play
                  all
                </div>
                <div className="box" onClick={addCollection}>
                  <img src="/audio/music-square-add.png" alt="" /> Add to
                  Collection
                </div>
                {music.likes.includes(data) ? (
                  <div
                    className="heart"
                    onClick={(e) => {
                      e.preventDefault();
                      unLikeMusic(music._id);
                    }}
                  >
                    <AiFillHeart />
                    <span>Like</span>
                  </div>
                ) : (
                  <div
                    className="heart"
                    onClick={(e) => {
                      e.preventDefault();
                      likeMusic(music._id);
                    }}
                  >
                    <AiOutlineHeart />
                    <span>Like</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        <main>
          {music &&
            music.songs.map((song, index) => (
              <div className="row" data-index={index} onClick={onclick}>
                <audio
                  src={`http://localhost:5000/${song}`}
                  onLoadedMetadata={onLoadedMetadata}
                  style={{ display: "none" }}
                ></audio>
                <div className="detail" data-index={index}>
                  <img
                    src={`http://localhost:5000/${music.cover}`}
                    alt=""
                    data-index={index}
                  />
                  <AiOutlineHeart className="fa hrt" />
                  <p data-index={index}>
                    <span id="tit" data-index={index}>
                      {music.title}
                    </span>{" "}
                    ~ {music.artist}
                  </p>
                </div>
                <p className="info first" data-index={index}>
                  {music.type}
                </p>
                <p className="info" id="dur" data-index={index}>
                  4:17
                </p>
                <Link
                  to={`http://localhost:5000/${song}`}
                  className="fa"
                  onClick={async (e) => {
                    e.preventDefault();
                    const res = await axios({
                      method: "get",
                      url: `http://localhost:5000/api/downloads/?fileName=${song}`,
                      responseType: "blob",
                      headers: {},
                    });
                    let mainName = song.split("/");
                    mainName = mainName[mainName.length - 1];
                    // creating url and appending
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(
                      new Blob([res.data])
                    );
                    link.setAttribute("download", mainName);
                    link.setAttribute("target", "_blank");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <ImDownload />
                </Link>
              </div>
            ))}
        </main>
      </motion.div>
      <Playing />
    </React.Fragment>
  );
}

export default Playlist;
