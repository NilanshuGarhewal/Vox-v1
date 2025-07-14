// File: MusicPlayer.jsx
import "./MusicPlayer.css";
import useAudioPlayer from "../../components/MusicPlayer/useAudioPlayer";

import MusicControls from "../../components/MusicPlayer/MusicControls/MusicContols";
import MusicInfo from "../../components/MusicPlayer/MusicInfo/MusicInfo";
import MvpTools from "../../components/MusicPlayer/MvpTools/MvpTools";
import Queue from "../../components/MusicPlayer/Queue/Queue";

import { useState, useEffect } from "react";

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function MusicPlayer({
  currentSong,
  setCurrentSong,
  queue,
  setQueue,
  currentIndex,
  setCurrentIndex,
  isLoop,
  setIsLoop,
  isShuffle,
  setIsShuffle,
}) {
  const [originalQueue, setOriginalQueue] = useState([]);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const {
    isPlaying,
    progress,
    duration,
    volume,
    togglePlay,
    handleSeek,
    handleVolume,
    formatTime,
  } = useAudioPlayer(
    currentSong,
    queue,
    currentIndex,
    setCurrentIndex,
    setCurrentSong,
    isLoop,
    isShuffle
  );

  useEffect(() => {
    if (isShuffle && queue.length > 0 && originalQueue.length === 0) {
      setOriginalQueue(queue);
    }
    if (!isShuffle && originalQueue.length > 0) {
      setQueue(originalQueue);
      setCurrentIndex(0);
      setCurrentSong(originalQueue[0]);
      setOriginalQueue([]);
    }
  }, [isShuffle, currentSong]);

  useEffect(() => {
    if (
      currentSong &&
      currentSong.id &&
      (!queue.some((song) => song.id === currentSong.id) || queue.length <= 1)
    ) {
      fetch(`http://localhost:3001/getSimilarSongs?songId=${currentSong.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const filtered = data.filter((song) => song.id !== currentSong.id);
            const finalQueue = [currentSong, ...filtered];

            setQueue(finalQueue);
            setCurrentIndex(0);
            setCurrentSong(currentSong);
          }
        })
        .catch((err) => console.error("Error getting similar songs:", err));
    }
  }, [currentSong]);

  const handleShuffleToggle = () => {
    if (!isShuffle) {
      setOriginalQueue(queue);
      const shuffled = shuffleArray(queue);
      setQueue(shuffled);
      setCurrentIndex(0);
      setCurrentSong(shuffled[0]);
    } else {
      setQueue(originalQueue);
      setCurrentIndex(0);
      setCurrentSong(originalQueue[0]);
      setOriginalQueue([]);
    }
    setIsShuffle(!isShuffle);
  };

  if (!currentSong) return null;

  return (
    <>
      {isQueueOpen && (
        <div className="queue-parent">
          <Queue
            queue={queue}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setCurrentSong={setCurrentSong}
            setQueue={setQueue}
          />
        </div>
      )}
      <div className="fitter2">
        <div className="music-player">
          <MusicControls
            isPlaying={isPlaying}
            progress={progress}
            duration={duration}
            togglePlay={togglePlay}
            handleSeek={handleSeek}
            formatTime={formatTime}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            queue={queue}
            setCurrentSong={setCurrentSong}
            isShuffle={isShuffle}
            setIsShuffle={handleShuffleToggle}
            isLoop={isLoop}
            setIsLoop={setIsLoop}
          />

          <MusicInfo currentSong={currentSong} />

          <MvpTools
            volume={volume}
            handleVolume={handleVolume}
            isQueueOpen={isQueueOpen}
            setIsQueueOpen={setIsQueueOpen}
          />
        </div>
      </div>
    </>
  );
}
