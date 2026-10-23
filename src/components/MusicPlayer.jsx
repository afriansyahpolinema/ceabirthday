import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, Music } from "lucide-react";

export const MusicPlayer = ({ config, shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Audio autoplay prevented by browser policy:", err);
          });
      }
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  return (
    <div className="music-player-widget">
      <audio
        ref={audioRef}
        src={config.music.src}
        loop
        preload="auto"
      />

      {/* Mini Retro Vinyl Disc */}
      <div
        className={`vinyl-disc ${isPlaying ? "playing" : ""}`}
        onClick={togglePlay}
        style={{ cursor: "pointer" }}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <Heart size={14} fill="#FFFDF9" color="#FFFDF9" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "160px" }}>
        <span
          style={{
            fontSize: "0.84rem",
            fontWeight: "700",
            color: "var(--ink-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {config.music.title}
        </span>
        <span style={{ fontSize: "0.74rem", color: "var(--sakura-pink)", fontWeight: "600" }}>
          🌸 {config.music.artist}
        </span>
      </div>

      {/* Controls */}
      <button
        onClick={togglePlay}
        className="music-play-btn"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={15} fill="white" /> : <Play size={15} fill="white" style={{ marginLeft: "2px" }} />}
      </button>

      <button
        onClick={toggleMute}
        style={{
          background: "none",
          border: "none",
          color: "var(--ink-muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "4px"
        }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
};
