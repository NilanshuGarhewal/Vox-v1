import { useRef, useState, useEffect } from "react";

export default function useAudioPlayer(
  currentSong,
  queue,
  currentIndex,
  setCurrentIndex,
  setCurrentSong,
  isLoop,
  isShuffle
) {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const abortControllerRef = useRef(null); // 👈 new

  useEffect(() => {
    if (!currentSong?.url || audioRef.current.dataset.songId === currentSong.id)
      return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    audioRef.current.dataset.songId = currentSong.id;
    audioRef.current.pause();
    audioRef.current.src = "";
    audioRef.current.currentTime = 0;

    fetch(
      `http://localhost:3001/getAudio?url=${encodeURIComponent(
        currentSong.url
      )}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.audioUrl) throw new Error("No audio URL returned");
        if (!controller.signal.aborted) {
          audioRef.current.src = data.audioUrl;
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.warn("Autoplay blocked:", err);
              setIsPlaying(false);
            });
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Previous fetch aborted");
        } else {
          console.error("Failed to fetch audio:", err);
        }
      });

    return () => {
      audioRef.current.pause();
    };
  }, [currentSong]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA";
      if (e.code === "Space" && !isTyping) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime || 0);
        setDuration(audioRef.current.duration || 0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  useEffect(() => {
    const handleEnded = () => {
      if (!queue || queue.length === 0) return;

      if (isLoop) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (currentIndex < queue.length - 1) {
        const next = currentIndex + 1;
        setCurrentIndex(next);
        setCurrentSong(queue[next]);
      }
    };

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, queue, isLoop, isShuffle, setCurrentIndex, setCurrentSong]);

  const formatTime = (t) =>
    isNaN(t)
      ? "0:00"
      : `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  return {
    audioRef,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlay,
    handleSeek,
    handleVolume,
    formatTime,
  };
}
