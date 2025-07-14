import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AlbumSection from "../../components/AlbumComponents/AlbumSection/AlbumSection";
import ErrorSection from "../../components/ErrorPage/Error";
import "./Album.css";

export default function Album({
  queue,
  setQueue,
  currentIndex,
  setCurrentIndex,
  currentSong,
  setCurrentSong,
}) {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/getAlbumSongs?browseId=${albumId}`)
      .then((res) => res.json())
      .then(setAlbumData)
      .catch((err) => console.error("Error fetching album:", err));
  }, [albumId]);

  if (
    !albumData ||
    albumData == undefined ||
    albumData.error ==
      "Server returned HTTP 400: Bad Request.\nRequest contains an invalid argument."
  )
    return <ErrorSection currentSong={currentSong} />;
  return (
    <div className="album-section">
      {albumData && (
        <AlbumSection
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          queue={queue}
          setQueue={setQueue}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          album={albumData}
        />
      )}
    </div>
  );
}
