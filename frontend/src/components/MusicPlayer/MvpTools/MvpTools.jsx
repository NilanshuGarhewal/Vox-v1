import { useEffect } from "react";
import "./MvpTools.css";
import {
  SpeakerHighIcon,
  HeartIcon,
  PlaylistIcon,
  ListPlusIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

export default function MvpTools({
  volume,
  handleVolume,
  isQueueOpen,
  setIsQueueOpen,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        handleQueueOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQueueOpen]);

  const handleQueueOpen = () => {
    setIsQueueOpen(!isQueueOpen);
  };

  return (
    <div className="mvp-tools">
      {/* <HeartIcon size={20} weight="regular" /> */}

      <PlaylistIcon onClick={handleQueueOpen} size={20} weight="regular" />

      {/* <ListPlusIcon size={20} weight="regular" /> */}

      {/* <DotsThreeIcon size={20} weight="regular" /> */}

      <div className="seperator"></div>

      <div className="volume-btn">
        <SpeakerHighIcon size={20} weight="fill" />
        <input
          className="vol-btn"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}
