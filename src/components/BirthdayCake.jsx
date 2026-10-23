import React, { useState } from "react";
import { Wind, RotateCcw, Heart, Sparkles } from "lucide-react";
import { fireFireworks, fireConfetti } from "../utils/confetti";

export const BirthdayCake = ({ config }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWishModal, setShowWishModal] = useState(false);
  const [randomWish, setRandomWish] = useState("");

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    const wishes = config.cake.wishes;
    const pickedWish = wishes[Math.floor(Math.random() * wishes.length)];
    setRandomWish(pickedWish);

    fireFireworks();
    setTimeout(() => {
      fireConfetti();
      setShowWishModal(true);
    }, 600);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setShowWishModal(false);
  };

  return (
    <section id="cake-section" className="section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="postage-badge">
            <span>MAKE A SWEET BIRTHDAY WISH</span>
          </div>
          <h2 className="section-title">
            Blow The Birthday Candles 🕯️✨
          </h2>
          <p className="section-subtitle">
            {config.cake.instruction}
          </p>
        </div>

        <div
          className="scrapbook-card"
          style={{
            maxWidth: "660px",
            margin: "0 auto",
            padding: "36px 24px",
            textAlign: "center",
            position: "relative"
          }}
        >
          {/* Washi Tape */}
          <div className="washi-tape-strip"></div>

          {/* Cake with ambient glow */}
          <div className="cake-container">
            {/* Ambient glow when lit */}
            {candlesLit && (
              <div style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "220px",
                height: "160px",
                background: "radial-gradient(ellipse, rgba(244, 162, 97, 0.12) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }} />
            )}

            <div className="cake-stage">
              {/* Candles */}
              <div className="candles-row">
                {Array.from({ length: config.cake.candlesCount }).map((_, i) => (
                  <div key={i} className={`candle-item ${!candlesLit ? "extinguished" : ""}`}>
                    <div className="candle-flame" style={{ animationDelay: `${i * 0.15}s` }}></div>
                    <div className="candle-smoke"></div>
                  </div>
                ))}
              </div>

              {/* Cake Top Tier with frosting drips and cherry */}
              <div className="cake-tier-top" style={{ overflow: "visible" }}>
                {/* Frosting drips */}
                {[18, 45, 75, 105].map((left, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    bottom: `-${8 + (i % 2) * 6}px`,
                    left: `${left}px`,
                    width: "8px",
                    height: `${8 + (i % 2) * 6}px`,
                    background: "linear-gradient(180deg, #FFF5EE, #F8E8DD)",
                    borderRadius: "0 0 50% 50%",
                    opacity: 0.9,
                  }} />
                ))}
                {/* Cherry decoration */}
                <div style={{
                  position: "absolute",
                  top: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "14px",
                  lineHeight: 1,
                }}>🍒</div>
                {/* Decorative piping */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "4px",
                  right: "4px",
                  height: "6px",
                  background: "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(232, 130, 155, 0.15) 8px, rgba(232, 130, 155, 0.15) 16px)",
                  borderRadius: "0 0 3px 3px",
                }} />
              </div>

              {/* Cake Bottom Tier with frosting drips */}
              <div className="cake-tier-bottom" style={{ overflow: "visible" }}>
                {[15, 50, 85, 120, 155].map((left, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    bottom: `-${6 + (i % 3) * 4}px`,
                    left: `${left}px`,
                    width: "9px",
                    height: `${6 + (i % 3) * 4}px`,
                    background: "linear-gradient(180deg, #FFF8F0, #F0E4D6)",
                    borderRadius: "0 0 50% 50%",
                    opacity: 0.85,
                  }} />
                ))}
                {/* Decorative dots */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  right: "10px",
                  transform: "translateY(-50%)",
                  display: "flex",
                  justifyContent: "space-around",
                }}>
                  {["🌸", "✨", "🌸", "✨", "🌸"].map((emoji, i) => (
                    <span key={i} style={{ fontSize: "10px", opacity: 0.6 }}>{emoji}</span>
                  ))}
                </div>
              </div>

              {/* Plate */}
              <div className="cake-plate"></div>
            </div>
          </div>

          {/* Action Button */}
          <div style={{ marginTop: "24px" }}>
            {candlesLit ? (
              <button onClick={handleBlowCandles} className="btn-primary">
                <Wind size={16} /> Blow Out The Candles
              </button>
            ) : (
              <button onClick={handleRelight} className="btn-secondary">
                <RotateCcw size={14} /> Relight Candles & Wish Again
              </button>
            )}
          </div>

          {/* Wish Modal */}
          {showWishModal && (
            <div
              style={{
                marginTop: "28px",
                padding: "28px 24px",
                background: "linear-gradient(180deg, var(--bg-parchment), var(--bg-cream))",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-rose)",
                boxShadow: "var(--shadow-card)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent gradient bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, var(--rosewood), var(--sakura-pink), var(--fairy-gold))",
              }} />

              <div style={{
                fontSize: "2.2rem",
                marginBottom: "12px",
              }}>🌟✨🎂✨🌟</div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--rosewood)",
                  fontWeight: "700",
                  marginBottom: "12px"
                }}
              >
                Your Birthday Wish
              </h3>

              <p
                className="font-serif"
                style={{
                  fontSize: "1.15rem",
                  color: "var(--ink-secondary)",
                  lineHeight: "1.7",
                  fontStyle: "italic",
                  maxWidth: "480px",
                  margin: "0 auto"
                }}
              >
                "{randomWish}"
              </p>

              <div
                className="font-handwriting"
                style={{
                  marginTop: "16px",
                  color: "var(--rosewood)",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <Heart size={16} fill="var(--rosewood)" color="var(--rosewood)" />
                Happy Birthday, {config.girlfriendName}!
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
