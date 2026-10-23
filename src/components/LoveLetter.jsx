import React, { useState, useEffect } from "react";
import { Heart, Play, SkipForward, Copy, Check, Feather } from "lucide-react";
import { fireSparkles } from "../utils/confetti";

export const LoveLetter = ({ config }) => {
  const fullText = config.loveLetter.paragraphs.join("\n\n");
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 22);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, fullText]);

  const handleSkip = () => {
    setDisplayedText(fullText);
    setCurrentIndex(fullText.length);
    setIsTyping(false);
  };

  const handleReplay = () => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsTyping(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${config.loveLetter.salutation}\n\n${fullText}\n\n${config.loveLetter.closing}\n${config.loveLetter.signature}`
    );
    setCopied(true);
    fireSparkles();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="letter-section" className="section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="postage-badge">
            <Feather size={13} /> FROM MY HEART TO YOURS
          </div>
          <h2 className="section-title">
            A Letter For <span className="text-gradient">{config.girlfriendName}</span> 💌
          </h2>
          <p className="section-subtitle">
            Words could never completely capture how much you mean to me, but here is a piece of my soul.
          </p>
        </div>

        <div
          className="scrapbook-card"
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "48px 40px",
            position: "relative",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FCF9F5 100%)",
            border: "1px solid var(--border-medium)",
            borderRadius: "20px",
            boxShadow: "var(--shadow-card)"
          }}
        >
          {/* Washi Tape Header */}
          <div className="washi-tape-strip washi-tape-honey"></div>

          {/* Top Wax Seal Corner Badge */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "28px",
              background: "radial-gradient(circle at 35% 35%, #C95465 0%, #8A2D40 70%, #6E1D30 100%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-wax)",
              border: "2px solid #6E1D30"
            }}
          >
            <Heart size={20} fill="#FFFDF9" color="#FFFDF9" />
          </div>

          {/* Letter Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "14px",
              marginBottom: "22px"
            }}
          >
            <span
              className="font-serif"
              style={{ fontSize: "1.5rem", color: "var(--rosewood)", fontWeight: "700" }}
            >
              {config.loveLetter.salutation}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
              {config.loveLetter.date}
            </span>
          </div>

          {/* Typewriter Letter Content */}
          <div
            className="font-serif"
            style={{
              fontSize: "1.18rem",
              lineHeight: "1.85",
              color: "var(--ink-primary)",
              whiteSpace: "pre-wrap",
              minHeight: "200px"
            }}
          >
            {displayedText}
            {isTyping && (
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.1em",
                  background: "var(--rosewood)",
                  marginLeft: "3px",
                  verticalAlign: "middle"
                }}
              />
            )}
          </div>

          {/* Letter Sign-off */}
          {!isTyping && (
            <div
              style={{
                marginTop: "32px",
                paddingTop: "18px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <span className="font-serif" style={{ color: "var(--ink-muted)", fontSize: "1.05rem", fontStyle: "italic" }}>
                {config.loveLetter.closing}
              </span>
              <span
                className="font-handwriting"
                style={{
                  fontSize: "1.9rem",
                  color: "var(--rosewood)",
                  fontWeight: "700",
                  marginTop: "2px"
                }}
              >
                {config.loveLetter.signature} ❤️
              </span>
            </div>
          )}

          {/* Action Bar */}
          <div
            style={{
              marginTop: "26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {isTyping ? (
                <button onClick={handleSkip} className="btn-secondary" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
                  <SkipForward size={13} /> Skip Typewriter
                </button>
              ) : (
                <button onClick={handleReplay} className="btn-secondary" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
                  <Play size={13} /> Replay
                </button>
              )}
            </div>

            <button
              onClick={handleCopy}
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px" }}
            >
              {copied ? (
                <>
                  <Check size={13} color="var(--soft-sage)" /> Copied with Love!
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy Letter
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
