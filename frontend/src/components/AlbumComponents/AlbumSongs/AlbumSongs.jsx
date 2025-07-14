import "./AlbumSongs.css";
import { HeartIcon } from "@phosphor-icons/react";

export default function AlbumSongs({
  album,
  prepareSong,
  setCurrentSong,
  setQueue,
  setCurrentIndex,
}) {
  return (
    <div className="album-songs">
      <div className="album-song-header">
        <p className="ash-hash">#</p>
        <p className="ash-title">Title</p>
        <p className="ash-duration">Duration</p>
        <p className="ash-like"></p>
      </div>

      <div className="divider"></div>

      <div className="album-song-songs">
        {album.songs.map((song, i) => (
          <div
            className="album-song"
            key={i}
            onClick={() => {
              setQueue(
                album.songs.map((song, idx) => ({
                  ...song,
                  id: `${album.title}-${idx}`,
                  albumThumbnail: album.thumbnail,
                  albumTitle: album.title,
                }))
              );

              setCurrentIndex(i);
              setCurrentSong(prepareSong(song, album.thumbnail, album.title));
            }}
          >
            <p className="album-song-index">{i + 1}</p>
            <div className="album-song-info">
              <p className="album-song-title">{song.title}</p>
              <p className="album-song-artist">{song.artist}</p>
            </div>
            <p className="album-song-duration">{song.duration}</p>
            {/* <div className="album-song-like">
              <HeartIcon weight="bold" size={16} />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
