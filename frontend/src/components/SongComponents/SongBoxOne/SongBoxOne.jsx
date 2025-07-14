import {
  UserIcon,
  VinylRecordIcon,
  PlayIcon,
  PauseIcon,
  HeartIcon,
  ListPlusIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  ShareIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import "./SongBoxOne.css";

export default function SongBoxOne({ songData, setCurrentSong }) {
  const navigate = useNavigate();

  const handleAlbumPage = (id) => {
    navigate(`/album/${id}`);
  };

  const handleArtistPage = (id) => {
    navigate(`/artist/${id}`);
  };

  const formatDuration = (duration) => {
    // Expecting "4:29" or formatDuration(269) fallback
    if (!duration && songData?.duration_seconds) {
      const minutes = Math.floor(songData.duration_seconds / 60);
      const seconds = songData.duration_seconds % 60;
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
    return duration || "0:00";
  };

  // 👇 Add this function inside SongBoxOne component
  const getHDThumbnail = (videoId, fallback) => {
    return {
      src: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      fallback: fallback,
    };
  };

  return (
    <div className="song-box1">
      <div className="song-box-img">
        <img
          src={getHDThumbnail(songData?.videoId, songData?.thumbnail).src}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = songData?.thumbnail;
          }}
        />
      </div>

      <div className="song-box-details">
        <p className="song-box-title">{songData?.title}</p>

        <div className="song-box-tools">
          <p
            className="song-box-in-detail"
            onClick={() => {
              handleArtistPage(songData?.artists?.[0].id);
            }}
          >
            <UserIcon className="dull-icons" weight="bold" size={14} />
            {songData?.artists?.[0]?.name}
          </p>
          &middot;
          <p
            className="song-box-in-detail song-box-album"
            onClick={() => {
              handleAlbumPage(songData?.album?.id);
            }}
          >
            <VinylRecordIcon className="dull-icons" weight="bold" size={14} />
            {songData?.album?.name}
          </p>
          &middot;
          <p>{songData?.year || "Unknown"}</p>
          &middot;
          <p>{formatDuration(songData?.duration)}</p>
          &middot;
          <p>{songData?.views || ""}</p>
        </div>

        <div className="song-box-controls">
          <div
            className="song-box-play-icon"
            onClick={() => {
              setCurrentSong(songData);
            }}
          >
            <PlayIcon weight="fill" size={16} />
          </div>

          <HeartIcon weight="bold" size={20} />
          <ListPlusIcon weight="bold" size={20} />
          <DownloadSimpleIcon weight="bold" size={20} />
          <ShareIcon weight="bold" size={20} />
          <DotsThreeIcon weight="bold" size={20} />
        </div>

        <div className="song-box-all-artist">
          {songData?.artists?.map((artist, idx) => (
            <div
              className="song-box-artist-k"
              key={idx}
              onClick={() => {
                handleArtistPage(artist.id);
              }}
            >
              <img src={songData.thumbnail}/>
              <span>
                <p>{artist.name}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
