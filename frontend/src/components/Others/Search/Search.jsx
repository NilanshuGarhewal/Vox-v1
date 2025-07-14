import { useRef, useState } from "react";
import "./Search.css";
import Dropdown from "../../Dropdown/Dropdown";
import useSearchLogic from "./useSearchLogic";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function Search({ songs, setCurrentSong }) {
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const {
    query,
    filteredSongs,
    filteredAlbums,
    filteredArtists,
    handleChange,
    handleSelect,
  } = useSearchLogic({
    songs,
    setCurrentSong,
    searchRef,
    searchInputRef,
  });

  return (
    <div className="search" ref={searchRef}>
      <div className={`search-here ${isFocused || query ? "active" : ""}`}>
        <MagnifyingGlassIcon
          className="nav-icon search-icon"
          size={16}
          weight="bold"
        />
        <input
          autoFocus
          type="text"
          ref={searchInputRef}
          className="search-input"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <Dropdown
        filteredSongs={filteredSongs}
        filteredAlbums={filteredAlbums}
        filteredArtists={filteredArtists}
        onSelect={handleSelect}
      />
    </div>
  );
}
