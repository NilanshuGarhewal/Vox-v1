import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useSearchLogic({
  songs,
  setCurrentSong,
  searchRef,
  searchInputRef,
}) {
  const [query, setQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const text = e.target.value;
    setQuery(text);

    if (text.trim() === "") {
      setFilteredSongs([]);
      setFilteredAlbums([]);
      setFilteredArtists([]);
      return;
    }

    try {
      const [songsRes, albumsRes, artistsRes] = await Promise.all([
        fetch(`http://localhost:3001/searchSongs?query=${text}`),
        fetch(`http://localhost:3001/searchAlbums?query=${text}`),
        fetch(`http://localhost:3001/searchArtists?query=${text}`),
      ]);

      const songsData = await songsRes.json();
      const albumsData = await albumsRes.json();
      const artistsData = await artistsRes.json();

      setFilteredSongs(
        songsData.slice(0, 6).map((item) => ({ item, matches: [] }))
      );
      setFilteredAlbums(
        albumsData.slice(0, 3).map((item) => ({ item, matches: [] }))
      );
      setFilteredArtists(
        artistsData.slice(0, 3).map((item) => ({ item, matches: [] }))
      );
    } catch (err) {
      console.error("Search failed:", err);
      setFilteredSongs([]);
      setFilteredAlbums([]);
      setFilteredArtists([]);
    }
  };

  const handleSelect = (item, type) => {
    setQuery("");
    setFilteredSongs([]);
    setFilteredAlbums([]);
    setFilteredArtists([]);

    if (type === "song") {
      setCurrentSong(item);
    } else if (type === "album") {
      navigate(`/album/${item.browseId}`);
    } else if (type === "artist") {
      navigate(`/artist/${item.id}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredSongs([]);
        setFilteredAlbums([]);
        setFilteredArtists([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  useEffect(() => {
    const handleShortcut = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isShortcut = isMac
        ? e.metaKey && e.key === "/"
        : e.ctrlKey && e.key === "/";

      if (isShortcut) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [searchInputRef]);

  return {
    query,
    filteredSongs,
    filteredAlbums,
    filteredArtists,
    handleChange,
    handleSelect,
  };
}
