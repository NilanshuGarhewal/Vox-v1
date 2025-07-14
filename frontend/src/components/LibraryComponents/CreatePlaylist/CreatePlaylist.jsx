import { useState } from "react";
import "./CreatePlaylist.css";

export default function CreatePlaylist({ onCreate }) {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = () => {
    if (!playlistName.trim()) {
      alert("Please enter a playlist name.");
      return;
    }

    const newPlaylist = {
      id: Date.now(), // unique ID
      name: playlistName.trim(),
      songs: [],
    };

    onCreate(newPlaylist);
    setPlaylistName(""); // clear input
  };

  return (
    <div className="cp-parent">
      <div className="create-playlist">
        <p>Name Your Playlist</p>
        <input
          className="cp-input"
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Your playlist name here..."
        />
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}
