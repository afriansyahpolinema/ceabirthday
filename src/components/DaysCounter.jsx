import React, { useState, useEffect } from "react";
import { Heart, Clock } from "lucide-react";

export const DaysCounter = ({ config }) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date(config.relationshipStartDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, now - startDate);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config.relationshipStartDate]);

  return (
    <section style={{ padding: "10px 0 35px 0" }}>
      <div className="content-wrapper">
        <div
          className="scrapbook-card"
          style={{
            padding: "36px 24px",
            textAlign: "center",
            maxWidth: "840px",
            margin: "0 auto",
            position: "relative"
          }}
        >
          {/* Washi Tape Header */}
          <div className="washi-tape-strip washi-tape-sage"></div>

          <div
            className="postage-badge"
            style={{
              marginBottom: "14px"
            }}
          >
            <Clock size={13} /> Our Love Journal Timeline
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              marginBottom: "8px",
              color: "var(--ink-primary)",
              fontWeight: "700",
              letterSpacing: "-0.01em"
            }}
          >
            Every Single Day With <span className="text-gradient">{config.girlfriendName}</span>
          </h2>

          {/* Ornamental divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            margin: "4px 0 16px 0",
            color: "var(--rosewood-soft)",
            fontSize: "0.75rem",
          }}>
            <span style={{ width: "36px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
            <span>✦</span>
            <span style={{ width: "36px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
          </div>

          <p
            className="font-handwriting"
            style={{ color: "var(--rosewood)", fontSize: "1.45rem", marginBottom: "30px", fontWeight: "600" }}
          >
            Treasuring every heartbeat and memory since {config.relationshipStartDate} ✨
          </p>

          {/* Time Counter Grid with Glassmorphic Paper Cards */}
          <div className="days-counter-grid">
            {[
              { label: "DAYS", value: timeTogether.days, color: "var(--rosewood)", bgGradient: "linear-gradient(180deg, rgba(253, 240, 243, 0.7) 0%, rgba(255, 255, 255, 0.85) 100%)" },
              { label: "HOURS", value: timeTogether.hours, color: "var(--terracotta)", bgGradient: "linear-gradient(180deg, rgba(251, 241, 236, 0.7) 0%, rgba(255, 255, 255, 0.85) 100%)" },
              { label: "MINUTES", value: timeTogether.minutes, color: "var(--warm-honey)", bgGradient: "linear-gradient(180deg, rgba(253, 248, 240, 0.7) 0%, rgba(255, 255, 255, 0.85) 100%)" },
              { label: "SECONDS", value: timeTogether.seconds, color: "var(--soft-sage)", bgGradient: "linear-gradient(180deg, rgba(242, 245, 241, 0.7) 0%, rgba(255, 255, 255, 0.85) 100%)" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="days-counter-cell"
                style={{
                  background: item.bgGradient,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: "16px",
                  padding: "18px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "var(--shadow-card)",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Accent top sliver */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: "2px",
                  background: item.color,
                  borderRadius: "0 0 2px 2px",
                  opacity: 0.7
                }} />

                <span
                  style={{
                    fontSize: "clamp(2.1rem, 4.2vw, 2.7rem)",
                    fontWeight: "800",
                    color: item.color,
                    fontFamily: "var(--font-serif)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}
                >
                  {String(item.value).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    color: "var(--ink-muted)",
                    marginTop: "6px"
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="font-handwriting"
            style={{
              marginTop: "26px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "1.35rem",
              color: "var(--rosewood)",
              fontWeight: "600"
            }}
          >
            <Heart size={16} fill="var(--rosewood)" color="var(--rosewood)" />
            <span>and countless more sweet chapters ahead...</span>
          </div>

        </div>
      </div>
    </section>
  );
};
