import React, { useEffect, useState } from "react";
import "../../css/home.css";
import { Link } from "react-router-dom";
import vector from "../../images/Vector.svg";
import person from "../../images/person.png";
import Img from "../../images/Ellipse 2.png";
import Img1 from "../../images/Ellipse 3.png";
import Img2 from "../../images/Ellipse 4.png";
import Img3 from "../../images/Ellipse 5.png";
// cover
import cover from "../../images/Lead-image.png";
import cover1 from "../../images/Rectangle 17 (1).png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Release from "../layouts/Release";
import Popular from "../layouts/Popular";
import ChartsRes from "../layouts/ChartsRes";
import Playing from "../layouts/Playing";
import { motion } from "framer-motion";
import Spinner from "../layouts/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharts } from "../../redux/audio";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Home() {
  const [data, setData] = useState(null);
  let token = localStorage.getItem("musicToken");
  useEffect(() => {
    if (!token) {
      localStorage.setItem("musicToken", uuidv4());
    }
    setData(token);
  }, [token]);
  const dispatch = useDispatch();
  const { loading, error, charts } = useSelector((state) => state.audios);
  useEffect(() => {
    dispatch(fetchCharts());
    // console.log(data);
  }, []);

  // working for likes
  // Like
  const likeMusic = async (e) => {
    const form = new FormData();
    form.append("audioId", e);
    form.append("userId", data);
    try {
      await axios.put("https://musicapp-api.onrender.com/api/like/", form).then((response) => response.data);
      dispatch(fetchCharts());
    } catch (error) {}
  };
  // UNLike
  const unLikeMusic = async (e) => {
    const form = new FormData();
    form.append("audioId", e);
    form.append("userId", data);
    try {
      await axios.put("https://musicapp-api.onrender.com/api/unLike/", form).then((response) => response.data);
      dispatch(fetchCharts());
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <motion.section
        className="home"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <header>
          <div className="box">
            <p>Currated playlist</p>
            <div className="text">
              <h1>R & B Hits</h1>
              <p>
                All mine, Lie again, Petty call me everyday, Out of time, No
                love, Bad habit,and so much more
              </p>
            </div>
            <div className="reactions">
              <img src={Img} alt="" />
              <img src={Img1} alt="" />
              <img src={Img2} alt="" />
              <img src={Img} alt="" />
              <img src={Img3} alt="" />
              <span>
                <AiFillHeart className="icon" /> 33K Likes
              </span>
            </div>
            <img src={vector} alt="" className="vector" />
            <img src={person} alt="" className="vector" />
          </div>
          <div className="charts">
            <h1>Top Charts</h1>
            {charts ? (
              charts.map((chart) => (
                <Link
                  to={`playlist/${chart._id}`}
                  className="row"
                  key={chart._id}
                >
                  <img src={`https://musicapp-api.onrender.com/${chart.cover}`} alt="" />
                  <div className="text">
                    <h4>{chart.title}</h4>
                    <span>{chart.artist}</span>
                    <p>2:34:45</p>
                  </div>
                  {chart.likes.includes(data) ? (
                    <div
                      className="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        unLikeMusic(chart._id);
                      }}
                    >
                      <AiFillHeart className="active" />
                    </div>
                  ) : (
                    <div
                      className="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        likeMusic(chart._id);
                      }}
                    >
                      <AiOutlineHeart className="active" />
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <Spinner />
            )}
          </div>
          <ChartsRes />
        </header>
        <Release />
        <Popular />
      </motion.section>
    </React.Fragment>
  );
}

export default Home;
{
  /* <img src={Vector} alt="" /> */
}
