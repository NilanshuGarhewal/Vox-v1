import { useRef } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import SongCard from "../../UI/SongCard/SongCard";
import "./BrowseContain.css";

export default function BrowseContain({ songs, setCurrentSong, heading = "" }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const scrollContainer = scrollRef.current;
    const amount = window.innerWidth * 10; // pixels to scroll
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="browse-contain">
      <div className="browse-head">
        <p>{heading}</p>
        <div className="song-container-slider">
          <ArrowLeftIcon
            className="scs-left scs"
            size={16}
            onClick={() => scroll("left")}
          />
          <ArrowRightIcon
            className="scs-right scs"
            size={16}
            onClick={() => scroll("right")}
          />
        </div>
      </div>

      <div
        className="browse-container"
        style={{ scrollBehavior: "smooth" }}
        ref={scrollRef}
      >
        {songs.map((song, i) => (
          <SongCard key={i} song={song} setCurrentSong={setCurrentSong} />
        ))}
      </div>
    </div>
  );
}
