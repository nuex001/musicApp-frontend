import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../../css/playlist.css";
import { AiFillHeart, AiOutlineHeart, AiFillThunderbolt } from "react-icons/ai";
import cover1 from "../../images/Rectangle 14.png";
import cover2 from "../../images/Rectangle 15.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setMusics } from "../../redux/audio";
import axios from "axios";
import Playing from "../layouts/Playing";

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let name = searchParams.get("q");

  const { loading, error, charts, musics } = useSelector(
    (state) => state.audios
  );
  if (name) {
    axios
      .get(`https://musicapp-api.onrender.com/api/searchs?q=${name}`)
      .then((response) => dispatch(setMusics(response.data)));
  } else {
    navigate(-1);
  }
  useEffect(() => {
    if (name) {
      axios
        .get(`https://musicapp-api.onrender.com/api/searchs?q=${name}`)
        .then((response) => dispatch(setMusics(response.data)));
    } else {
      navigate(-1);
    }
  }, []);
  //  console.log(id);

  return (
    <React.Fragment>
      <motion.div
        className="child"
        style={{ backgroundImage: "url('/audio/Rectangle 20.png')" }}
        transition={{ type: "tween", duration: 1, delay: 1 }}
      >
        <h2 className="header">
          SEARCH RESULTS:{" "}
          <span>{musics && musics.length > 0 ? "found" : "Empty"}</span>{" "}
        </h2>
        <main>
          {musics &&
            musics.map((music) => (
              <Link
                to={`../playlist/${music._id}`}
                className="row"
                key={music._id}
              >
                <audio src="" style={{ display: "none" }}></audio>
                <div className="detail">
                  <img src={`https://musicapp-api.onrender.com/${music.cover}`} alt="" />
                  <AiOutlineHeart className="fa hrt" />
                  <p>
                    {music.title} ~ {music.artist}
                  </p>
                </div>
                <p className="info first">{music.type}</p>
                <p className="info">{music.songs.length} songs</p>
                <AiFillThunderbolt className="fa" />
              </Link>
            ))}
        </main>
      </motion.div>
      <Playing />
    </React.Fragment>
  );
}

export default Search;
