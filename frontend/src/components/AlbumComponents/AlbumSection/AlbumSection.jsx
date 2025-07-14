import "./AlbumSection.css";
import AlbumHere from "../AlbumHere/AlbumHere";

export default function AlbumSection({
  currentSong,
  album,
  setCurrentSong,
  queue,
  setQueue,
  currentIndex,
  setCurrentIndex,
}) {
  return (
    <div className={`fitter4 ${currentSong ? "with-song" : "without-song"}`}>
      <div className="alb-name">
        <AlbumHere
          album={album}
          setCurrentSong={setCurrentSong}
          queue={queue}
          setQueue={setQueue}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}
