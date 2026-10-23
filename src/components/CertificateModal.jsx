import React from "react";
import { X, Heart, Award } from "lucide-react";

export const CertificateModal = ({ config, score, total, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26, 22, 37, 0.6)",
        backdropFilter: "blur(12px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          position: "relative",
          padding: "6px",
          background: "linear-gradient(135deg, var(--fairy-gold), var(--rosewood-soft), var(--fairy-gold))",
          borderRadius: "22px",
          boxShadow: "0 24px 60px rgba(26, 22, 37, 0.25)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner frame */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            padding: "44px 36px",
            textAlign: "center",
            position: "relative",
            border: "1px solid var(--rosewood-soft)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "var(--bg-cream)",
              border: "1px solid var(--border-subtle)",
              color: "var(--ink-muted)",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              zIndex: 10
            }}
          >
            <X size={16} />
          </button>

          {/* Decorative corner ornaments */}
          {[
            { top: "14px", left: "14px" },
            { top: "14px", right: "14px" },
            { bottom: "14px", left: "14px" },
            { bottom: "14px", right: "14px" },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                fontSize: "1.1rem",
                color: "var(--fairy-gold)",
                opacity: 0.5,
                transform: i === 1 ? "scaleX(-1)" : i === 2 ? "scaleY(-1)" : i === 3 ? "scale(-1)" : "none",
              }}
            >
              ❧
            </div>
          ))}

          {/* Certificate Seal */}
          <div style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px auto",
            background: "radial-gradient(circle at 35% 35%, var(--rosewood) 0%, var(--rosewood-hover) 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(180, 99, 122, 0.3), 0 0 0 4px var(--fairy-gold), 0 0 0 6px rgba(212, 165, 116, 0.3)",
          }}>
            <Award size={30} color="#FFFDF9" />
          </div>

          {/* Certificate Title */}
          <div style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            marginBottom: "6px"
          }}>
            Certificate of Love
          </div>

          {/* Ornamental divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "18px",
            color: "var(--fairy-gold)",
            fontSize: "0.75rem",
          }}>
            <span style={{ width: "40px", height: "1px", background: "var(--fairy-gold)", display: "inline-block" }} />
            <span>❖</span>
            <span style={{ width: "40px", height: "1px", background: "var(--fairy-gold)", display: "inline-block" }} />
          </div>

          <p
            className="font-serif"
            style={{
              fontSize: "1rem",
              color: "var(--ink-secondary)",
              marginBottom: "6px",
              fontStyle: "italic"
            }}
          >
            This certifies that
          </p>

          {/* Name */}
          <div
            className="font-serif"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 3.2rem)",
              color: "var(--rosewood)",
              fontWeight: "800",
              borderBottom: "2px solid rgba(180, 99, 122, 0.25)",
              display: "inline-block",
              padding: "0 36px 8px 36px",
              marginBottom: "18px",
              lineHeight: 1.2,
            }}
          >
            {config.girlfriendName} 🌸
          </div>

          <p
            className="font-serif"
            style={{
              fontSize: "1.1rem",
              color: "var(--ink-secondary)",
              lineHeight: "1.7",
              maxWidth: "440px",
              margin: "0 auto 14px auto",
              fontStyle: "italic"
            }}
          >
            "For possessing the brightest smile, the gentlest heart, effortless fairy magic, and the infinite ability to make every single day feel like home."
          </p>

          {/* Score */}
          <div style={{
            background: "var(--bg-cream)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 20px",
            display: "inline-block",
            marginBottom: "22px",
          }}>
            <span className="font-serif" style={{ fontSize: "1rem", color: "var(--ink-secondary)" }}>
              Quiz Score:{" "}
            </span>
            <span className="font-serif" style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--rosewood)" }}>
              {score} / {total} 💖
            </span>
          </div>

          {/* Signatures */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              paddingTop: "18px",
              borderTop: "1px solid var(--border-subtle)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                className="font-handwriting"
                style={{ fontSize: "1.8rem", color: "var(--rosewood)", fontWeight: "700" }}
              >
                {config.boyfriendName}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontWeight: "600", letterSpacing: "1px" }}>
                Certified With Love
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>
                <Heart fill="var(--rosewood)" color="var(--rosewood)" size={28} />
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontWeight: "600", letterSpacing: "1px" }}>
                Sealed Forever
              </div>
            </div>
          </div>

          {/* Decorative footer */}
          <div style={{
            marginTop: "20px",
            color: "var(--fairy-gold)",
            fontSize: "0.65rem",
            letterSpacing: "4px",
          }}>
            ✦ · ❀ · ✧ · ❀ · ✦
          </div>

        </div>
      </div>
    </div>
  );
};
