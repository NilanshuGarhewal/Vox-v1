import "./MusicControls.css";

import {
  PlayIcon,
  ShuffleIcon,
  PauseIcon,
  RepeatIcon,
  SkipForwardIcon,
  SkipBackIcon,
} from "@phosphor-icons/react";

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MusicControls({
  isPlaying,
  progress,
  duration,
  togglePlay,
  handleSeek,
  formatTime,
  currentIndex,
  setCurrentIndex,
  queue,
  setCurrentSong,
  isShuffle,
  setIsShuffle,
  isLoop,
  setIsLoop,
}) {
  const handleNext = () => {
    let nextIndex;

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (isLoop) {
      nextIndex = 0;
    } else {
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentSong(queue[nextIndex]);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
    }
  };

  const handleShuffleToggle = () => {
  const newShuffle = !isShuffle;
  setIsShuffle(newShuffle);

  if (newShuffle && queue.length > 1) {
    const shuffled = shuffleArray(queue).map((song, index) => ({
      ...song,
      id: `${song.title}-${index}`, // Add or override ID if missing
    }));

    setQueue(shuffled);
    setCurrentIndex(0);
    setCurrentSong(shuffled[0]);
  }
};

  return (
    <div className="music-controls">
      <div className="controls">
        <div className="control-tools">
          <button className="play-pause c-tool" onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon color="black" size={16} weight="fill" />
            ) : (
              <PlayIcon color="black" weight="fill" size={16} />
            )}
          </button>

          <button className="prev-song c-tool" onClick={handlePrev}>
            <SkipBackIcon size={14} weight="fill" />
          </button>

          <button
            className="next-song c-tool"
            onClick={handleNext}
            disabled={!queue?.length}
          >
            <SkipForwardIcon weight="fill" size={14} />
          </button>

          <button
            className="next-song c-tool"
            onClick={handleShuffleToggle}
            style={{
              color: isShuffle ? "var(--fg-primary)" : "var(--fg-secondary)",
            }}
          >
            <ShuffleIcon weight="bold" size={16} />
          </button>

          <button
            className="next-song c-tool"
            onClick={() => setIsLoop(!isLoop)}
            style={{
              color: isLoop ? "var(--fg-primary)" : "var(--fg-secondary)",
            }}
          >
            <RepeatIcon weight="bold" size={16} />
          </button>
        </div>

        <div className="time-shown">
          <span className="fitter3">
            <span className="music-time">{formatTime(progress)}</span>
            <input
              type="range"
              className="music-bar"
              min={0}
              max={duration}
              value={progress}
              onChange={handleSeek}
              style={{
                "--progress": `${(progress / duration) * 100}%`,
              }}
            />
            <span className="music-time">{formatTime(duration)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
