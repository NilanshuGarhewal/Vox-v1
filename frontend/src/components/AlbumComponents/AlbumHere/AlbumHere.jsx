import "./AlbumHere.css";

import AlbumImg from "../AlbumImg/AlbumImg";
import AlbumTools from "../AlbumTools/AlbumTools";
import AlbumSongs from "../AlbumSongs/AlbumSongs";

export default function AlbumHere({
  album,
  setCurrentSong,
  queue,
  setQueue,
  currentIndex,
  setCurrentIndex,
}) {
  if (!album) return <p>Loading album...</p>;

  function prepareSong(song, albumThumbnail, albumTitle) {
    return {
      ...song,
      albumThumbnail,
      albumTitle,
    };
  }

  return (
    <div className="album">
      <div className="album-details">
        <AlbumTools
          album={album}
          prepareSong={prepareSong}
          setCurrentSong={setCurrentSong}
          setQueue={setQueue}
          setCurrentIndex={setCurrentIndex}
        />
        <AlbumSongs
          album={album}
          prepareSong={prepareSong}
          setCurrentSong={setCurrentSong}
          setQueue={setQueue}
          setCurrentIndex={setCurrentIndex}
        />
      </div>

      <AlbumImg album={album} />
    </div>
  );
}
