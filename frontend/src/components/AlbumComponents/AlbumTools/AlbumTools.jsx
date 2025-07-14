import { useEffect } from "react";
import "./AlbumTools.css";
import {
  PlayIcon,
  ShuffleIcon,
  ListPlusIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

export default function AlbumTools({
  album,
  prepareSong,
  setCurrentSong,
  setQueue,
  setCurrentIndex,
}) {
  const handlePlay = () => {
    setQueue(
      album.songs.map((song, idx) => ({
        ...song,
        id: `${album.title}-${idx}`,
        albumThumbnail: album.thumbnail,
        albumTitle: album.title,
      }))
    );

    setCurrentIndex(0);
    setCurrentSong(prepareSong(album.songs[0], album.thumbnail, album.title));
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * album.songs.length);

    const shuffledQueue = album.songs.map((song) => ({
      ...song,
      albumThumbnail: album.thumbnail,
      albumTitle: album.title,
    }));

    setQueue(shuffledQueue);
    setCurrentIndex(randomIndex);
    setCurrentSong(
      prepareSong(album.songs[randomIndex], album.thumbnail, album.title)
    );
  };

  return (
    <div className="album-tools">
      <span className="ast">
        <p className="album-name">{album.title}</p>
      </span>

      <p className="album-small-details">
        <span className="album-main-artist">{album.artist}</span>
        &nbsp;&nbsp; &middot; &nbsp;
        {album.year}
        &nbsp; &middot; &nbsp;
        {album.songs.length} songs &nbsp; &middot; &nbsp;
        {album.duration}
      </p>

      <div className="album-tools-option">
        <button
          className="alb-play alb-btn"
          disabled={!album?.songs?.length}
          onClick={handlePlay}
        >
          <PlayIcon weight="fill" size={16} />
        </button>
        <button
          className="alb-btn"
          disabled={!album?.songs?.length}
          onClick={handleShuffle}
        >
          <ShuffleIcon weight="bold" size={16} />
        </button>

        {/* <button className="alb-btn">
          <ListPlusIcon weight="bold" size={16} />
        </button> */}

        <button className="alb-btn">
          <DotsThreeIcon weight="bold" size={16} />
        </button>
      </div>
    </div>
  );
}
