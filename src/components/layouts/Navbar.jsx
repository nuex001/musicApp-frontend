import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import home from "../../images/homeActive.png";
import playList from "../../images/playlist.png";
import radio from "../../images/radio.png";
import videos from "../../images/videos.png";
import profile from "../../images/profile.png";
import signOut from "../../images/signOut.png";
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {
  const navigate = useNavigate();
  const menu = () => {
    const sideBar = document.querySelector(".sideBar");
    const mobileNav = document.querySelector(".mobileNav");
    mobileNav.classList.toggle("active");
    sideBar.classList.toggle("active");
  };

  const onsubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${e.target.q.value}`);
  };

  return (
    <React.Fragment>
      <nav>
        <img src={logo} alt="" className="logo" />
        <form action="/search" onSubmit={onsubmit}>
          <input type="submit" id="submit" style={{ display: "none" }} />
          <label htmlFor="submit">
            <AiOutlineSearch />
          </label>
          <input type="text" placeholder="Search" name="q" />
        </form>
      </nav>
      <aside>
        <ul>
          <Link to="/">
            <img src={home} alt="" />
          </Link>
          <Link to="/Collections">
            <img src={playList} alt="" />
          </Link>
          <Link>
            <img src={radio} alt="" />
          </Link>
          <Link>
            <img src={videos} alt="" />
          </Link>
        </ul>
        <ul>
          <Link to="/upload">
            <img src={profile} alt="" />
          </Link>
          <Link>
            <img src={signOut} alt="" />
          </Link>
        </ul>
      </aside>
      <div className="mobileNav">
        <div className="bars" onClick={menu}>
          <span></span>
          <span></span>
        </div>
        <img src={logo} alt="" className="logo" />
        <form action="/search" onSubmit={onsubmit}>
          <input type="text" placeholder="Search" name="q" />
          <input type="submit" id="submit" style={{ display: "none" }} />
          <label htmlFor="submit">
            <AiOutlineSearch />
          </label>
        </form>
      </div>
      <ul className="sideBar">
        <Link to="/" className="active">
          <img src={home} alt="" /> <span>Home</span>
        </Link>
        <Link to="/Collections">
          <img src={playList} alt="" />
          <span>My collections</span>
        </Link>
        <Link>
          <img src={radio} alt="" />
          <span>Radio</span>
        </Link>
        <Link>
          <img src={videos} alt="" />
          <span>Music video</span>
        </Link>
        <Link to="/upload">
          <img src={profile} alt="" />
          <span>Profile</span>
        </Link>
        <Link>
          <img src={signOut} alt="" />
          <span>Log out</span>
        </Link>
      </ul>
    </React.Fragment>
  );
}

export default Navbar;
