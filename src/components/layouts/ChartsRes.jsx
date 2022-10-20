import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import cover from "../../images/Lead-image.png";
import cover1 from "../../images/Rectangle 14.png";
import cover2 from "../../images/Rectangle 15.png";
import "../../css/home.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharts } from "../../redux/audio";
import Spinner from "./Spinner";
import axios from "axios";

function ChartsRes() {
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

  // Like
  const likeMusic = async (e) => {
    const form = new FormData();
    form.append("audioId", e);
    form.append("userId", data);
    try {
      await axios.put("/api/like/", form).then((response) => response.data);
      dispatch(fetchCharts());
    } catch (error) {}
  };
  // UNLike
  const unLikeMusic = async (e) => {
    const form = new FormData();
    form.append("audioId", e);
    form.append("userId", data);
    try {
      await axios.put("/api/unLike/", form).then((response) => response.data);
      dispatch(fetchCharts());
    } catch (error) {}
  };

  return (
    <div className="mobileCharts">
      <h1>Top Charts</h1>
      <Swiper
        className="slider"
        breakpoints={{
          375: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 1,
          },
        }}
      >
        {charts ? (
          charts.map((chart) => (
            <SwiperSlide className="slides" key={chart._id}>
              <Link to={`playlist/${chart._id}`}>
                <img src={`https://musicapp-api.onrender.com/${chart.cover}`} alt="" />
                <h4>{chart.title}</h4>
                <span>{chart.artist}</span>
                <p>2:34:45</p>
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
            </SwiperSlide>
          ))
        ) : (
          <Spinner />
        )}
      </Swiper>
    </div>
  );
}

export default ChartsRes;
