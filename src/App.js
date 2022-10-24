// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layouts/Navbar";
import Playlist from "./components/pages/Playlist";
import Collections from "./components/pages/Collections";
import Upload from "./components/pages/Upload"
import Search from "./components/pages/Search";
import Playing from "./components/layouts/Playing";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playlist/:id" element={<Playlist />} />
          <Route exact path="/Collections" element={<Collections />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
        <Playing/>
      </div>
    </Router>
  );
}

export default App;
