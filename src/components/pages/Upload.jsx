import React from "react";
import "../../css/upload.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function Upload() {
  const navigate = useNavigate();

  function previewImg(event) {
    const img = document.querySelector("label img");
    console.log(event.target.files[0]);
    const imgUrl = URL.createObjectURL(event.target.files[0]);
    img.src = imgUrl;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post("/api/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        e.target.reset();
        navigate("/");
      });
  };

  return (
    <div className="upload_container">
      <form action="" onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept="images/*"
          id="cover"
          name="cover"
          style={{ display: "none" }}
          onChange={previewImg}
        />
        <label htmlFor="cover">
          <img src="/audio/avatar.jpg" alt="" />
        </label>
        <input type="text" placeholder="Song Name" name="title" />
        <input type="text" placeholder="Artist" name="artist" />
        <input
          type="file"
          multiple
          style={{ border: "none", cursor: "pointer" }}
          accept="audio/*"
          name="songs"
        />
        <textarea id="" placeholder="Description" name="description"></textarea>
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default Upload;
