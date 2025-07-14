import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

import { HouseIcon, FolderIcon } from "@phosphor-icons/react";

import Search from "../Search/Search";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ songs, setCurrentSong }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar">
      <span className="nav1">
        <div className="nav">
          <Link className="nav-routes" to="/">
            <p
              className={` ${location.pathname === "/" ? "active-route" : ""}`}
            >
              <HouseIcon className="nav-icon" size={16} weight="fill" />
              Home
            </p>
          </Link>

          {/* <Link className="nav-routes nvu" to="/library">
            <p
              className={` ${
                location.pathname === "/library" ? "active-route" : ""
              }`}
            >
              <FolderIcon className="nav-icon" size={16} weight="fill" />
              Library
            </p>
          </Link> */}
        </div>
        <Search songs={songs} setCurrentSong={setCurrentSong} />
      </span>
      <div className="nav2">
        <CaretLeftIcon className="pno" size={16} onClick={() => navigate(-1)} />
        <CaretRightIcon className="pno" size={16} onClick={() => navigate(1)} />
      </div>
    </div>
  );
}
