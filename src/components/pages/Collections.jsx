import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../css/collection.css";

import { motion } from "framer-motion";
import {
  fetchPlaylist,
  setPlaying,
  setIndex,
  setMusic,
} from "../../redux/audio";
import Playing from "../layouts/Playing";
import Spinner from "../layouts/Spinner";

function Collections() {
  const dispatch = useDispatch();

  let cartItems = localStorage.getItem("musicsInCart"); //getting the cart Item
  cartItems = JSON.parse(cartItems); //parsing it
  const addMusic = (e) => {
    e.preventDefault();
    // console.log(JSON.parse(e.target.getAttribute("data-src")));
    const src = JSON.parse(e.target.getAttribute("data-src"));
    dispatch(setMusic(src));
    dispatch(setIndex(src.songs.length - (src.songs.length)));
    dispatch(setPlaying(true));
  };

  return (
    <React.Fragment>
      <motion.div
        className="collection"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <div className="head">
          <h4 className="active">My collections</h4>
          <h4>Likes</h4>
        </div>
        <div className="box">
          {cartItems &&
            Object.values(cartItems).map((item) => (
              <Link
                to={`../playlist/${item._id}`}
                className="row"
                key={item._id}
              >
                <img
                  src={`https://musicapp-api.onrender.com/${item.cover}`}
                  alt=""
                  className="cover"
                />
                <div className="info">
                  <h1>
                    {item.title}
                    <span>{item.artist}</span>
                  </h1>
                  <h2>
                    {item.likes.length}{" "}
                    {item.likes.length > 1 ? `likes` : `like`}
                  </h2>
                </div>
                <img
                  src="/audio/collection.png"
                  alt=""
                  className="play"
                  onClick={addMusic}
                  data-src={JSON.stringify(item)}
                />
              </Link>
            ))}
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default Collections;
