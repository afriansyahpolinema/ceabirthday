import React, { useState } from "react";
import { Heart, Mail, Sparkles, Music } from "lucide-react";

export const IntroEnvelope = ({ config, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className={`envelope-landing-overlay ${isOpen ? "overlay-fade-out" : ""}`}>
      
      {/* Top Greeting */}
      <div className="envelope-intro-header">
        <div className="envelope-postage-badge">
          <span>SPECIAL AIRMAIL • HAND DELIVERED</span>
        </div>

        {/* Decorative flourish */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "8px",
          color: "var(--rosewood-soft)",
          fontSize: "1.2rem",
          letterSpacing: "6px"
        }}>
          <span>✦</span>
          <span style={{ width: "40px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
          <span>❀</span>
          <span style={{ width: "40px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
          <span>✦</span>
        </div>

        <h1 className="font-serif envelope-intro-title">
          For My Dearest {config.girlfriendName}
        </h1>
        <p className="font-handwriting envelope-intro-subtitle">
          (with all my love ❤️)
        </p>
      </div>

      {/* Realistic Handcrafted Envelope */}
      <div
        className={`luxury-envelope ${isOpen ? "is-open" : ""}`}
        onClick={handleOpenEnvelope}
        title="Click to open your birthday letter"
      >
        {/* Envelope Top Flap */}
        <div className="envelope-top-flap"></div>

        {/* Envelope Body / Pocket */}
        <div className="envelope-pocket-front"></div>
        <div className="envelope-pocket-inner"></div>

        {/* Wax Seal with sparkle accents */}
        <div className="envelope-wax-seal">
          <div className="wax-seal-inner">
            <Heart size={24} fill="#FFFDF9" color="#FFFDF9" />
          </div>
          {/* Sparkle dots around seal */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              style={{
                position: "absolute",
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(255, 253, 249, 0.8)",
                top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
                left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                animation: `softPulse ${1.5 + (deg % 3) * 0.3}s ease-in-out infinite`,
                animationDelay: `${deg * 0.01}s`,
              }}
            />
          ))}
        </div>

        {/* Sliding Letter Card */}
        <div className="envelope-letter-card">
          <div className="letter-card-header">
            <span className="letter-mini-badge font-sans">BIRTHDAY LETTER</span>
            <span className="letter-date">{config.loveLetter.date}</span>
          </div>
          <div className="letter-card-title font-serif">
            Happy Birthday, {config.girlfriendName} 🌸
          </div>
          <div className="letter-card-quote font-serif">
            "A letter written from the deepest corners of my heart, just for you..."
          </div>
          <div className="letter-card-footer font-handwriting">
            {config.loveLetter.signature} ❤️
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="envelope-intro-footer">
        <button onClick={handleOpenEnvelope} className="btn-open-envelope">
          <Mail size={18} /> Open Your Birthday Surprise
        </button>
        <span className="envelope-music-hint">
          <Music size={14} /> {config.music.autoPlayPrompt}
        </span>
      </div>
    </div>
  );
};
