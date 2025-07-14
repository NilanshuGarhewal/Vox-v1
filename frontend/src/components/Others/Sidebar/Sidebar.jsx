import { Link } from "react-router-dom";
import "./Sidebar.css";

import {
  FolderIcon,
  PlaylistIcon,
  HeartIcon,
  VinylRecordIcon,
  UserIcon,
} from "@phosphor-icons/react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="library-section">
        <FolderIcon weight="fill" size={16} />
        <p>Library</p>
      </div>

      <div className="menu-section">
        <div className="menu-tools">
          <Link className="menu-links" to={"/library"}>
            <PlaylistIcon weight="bold" size={16} />
            Playlists
          </Link>
          <Link className="menu-links" to={"/library"}>
            <HeartIcon weight="bold" size={16} />
            Liked Songs
          </Link>
          <Link className="menu-links" to={"/home"}>
            <VinylRecordIcon weight="bold" size={16} />
            Albums
          </Link>
          <Link className="menu-links" to={"/library"}>
            <UserIcon weight="bold" size={16} />
            Artist
          </Link>
        </div>
      </div>
    </div>
  );
}
