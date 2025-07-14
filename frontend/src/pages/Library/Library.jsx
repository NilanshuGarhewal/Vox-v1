import CreatePlaylist from "../../components/LibraryComponents/CreatePlaylist/CreatePlaylist";
import "./Library.css";
import { useEffect, useState } from "react";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(savedPlaylists);
  }, []);

  const handleCreatePlaylist = (newPlaylist) => {
    const updatedPlaylists = [newPlaylist, ...playlists];
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setShowCreate(false);
  };

  return (
    <div className="library">
      <div className="library-container">
        <div className="library-tool">
          <p>Library</p>
          <button onClick={() => setShowCreate(!showCreate)}>
            {showCreate ? "Cancel" : "Create Playlist"}
          </button>
        </div>

        {showCreate && <CreatePlaylist onCreate={handleCreatePlaylist} />}

        <div className="library-divider"></div>

        {playlists.length > 0 ? (
          <div className="playlist-box">
            {playlists.map((playlist) => (
              <div className="playlist-card" key={playlist.id}>
                <p className="playlist-name">{playlist.name}</p>
                <p className="playlist-count">
                  {playlist.songs.length} songs
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No playlists yet</p>
        )}
      </div>
    </div>
  );
}
