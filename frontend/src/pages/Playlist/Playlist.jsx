import { useParams } from "react-router-dom";
import PlaylistHeader from "../../components/PlaylistComponents/PlaylistHeader/PlaylistHeader";
import PlaylistSongs from "../../components/PlaylistComponents/PlaylistSongs/PlaylistSongs";
import "./Playlist.css";

export default function Playlist({
  playlists,
  setCurrentSong,
  queue,
  setQueue,
  currentIndex,
  setCurrentIndex,
}) {
  const { playlistId } = useParams();
  const pl = playlists.find((p) => p.id === playlistId);
  if (!pl) return <p>Playlist not found</p>;

  return (
    <div className="playlist-page">
      <PlaylistHeader playlist={pl} />
      <PlaylistSongs
        songs={pl.songs}
        setCurrentSong={setCurrentSong}
        queue={queue}
        setQueue={setQueue}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
