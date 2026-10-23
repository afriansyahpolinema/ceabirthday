import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
  BookOpen,
  Calendar,
  Cake,
  Feather,
  Heart,
  Maximize2,
  Minimize2,
  Menu,
  X
} from "lucide-react";
import { fireHeartBurst, fireFireworks } from "../utils/confetti";
import { DaysCounter } from "./DaysCounter";
import { BirthdayCake } from "./BirthdayCake";
import { LoveLetter } from "./LoveLetter";

export const StorybookJournal = ({ config }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const chapters = [
    {
      id: "cover",
      title: "Prologue",
      icon: <BookOpen size={16} />,
      badge: "Chapter I",
      tag: "The Beginning"
    },
    {
      id: "timeline",
      title: "Our Love Timeline",
      icon: <Calendar size={16} />,
      badge: "Chapter II",
      tag: "Every Milestone"
    },
    {
      id: "cake",
      title: "Birthday Cake & Wish",
      icon: <Cake size={16} />,
      badge: "Chapter III",
      tag: "Make a Wish"
    },
    {
      id: "letter",
      title: "Hand-penned Love Letter",
      icon: <Feather size={16} />,
      badge: "Chapter IV",
      tag: "From My Soul"
    },
    {
      id: "epilogue",
      title: "Epilogue & Celebration",
      icon: <Heart size={16} />,
      badge: "Chapter V",
      tag: "Forever Yours"
    }
  ];

  const totalPages = chapters.length;

  const goToPage = useCallback(
    (pageIndex) => {
      if (pageIndex === currentPage || pageIndex < 0 || pageIndex >= totalPages) return;
      setFlipDirection(pageIndex > currentPage ? "next" : "prev");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
      setIsTocOpen(false);
    },
    [currentPage, totalPages]
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        nextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        prevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const currentChapter = chapters[currentPage];

  return (
    <div className={`storybook-wrapper ${isExpanded ? "book-expanded" : ""}`}>
      
      {/* Top Floating Ribbon Bookmark Bar (Chapter Tabs) */}
      <header className="storybook-topbar">
        <div className="storybook-topbar-inner">
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="storybook-toc-toggle"
            title="Open Table of Contents"
          >
            {isTocOpen ? <X size={17} /> : <Menu size={17} />}
            <span className="hide-mobile">Index</span>
          </button>

          {/* Scrolling Chapter Bookmark Ribbons */}
          <nav className="storybook-tabs-scroll">
            {chapters.map((ch, index) => (
              <button
                key={ch.id}
                onClick={() => goToPage(index)}
                className={`storybook-tab-ribbon ${currentPage === index ? "active" : ""}`}
              >
                <span className="tab-icon">{ch.icon}</span>
                <span className="tab-badge">{ch.badge}</span>
                <span className="tab-title hide-mobile">{ch.title}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="storybook-expand-toggle hide-mobile"
            title={isExpanded ? "Standard View" : "Immersive Expanded View"}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Table of Contents Drawer / Overlay Modal */}
      {isTocOpen && (
        <div className="storybook-toc-drawer-overlay" onClick={() => setIsTocOpen(false)}>
          <div className="storybook-toc-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="toc-header">
              <div className="postage-badge">
                <Bookmark size={13} /> JOURNAL TABLE OF CONTENTS
              </div>
              <h3 className="font-serif toc-title">
                Chapters of {config.girlfriendName}'s Story
              </h3>
              <p className="font-serif toc-subtitle">
                Select any chapter to jump right to that memory page ✨
              </p>
            </div>

            <div className="toc-chapters-list">
              {chapters.map((ch, index) => (
                <div
                  key={ch.id}
                  onClick={() => goToPage(index)}
                  className={`toc-chapter-item ${currentPage === index ? "active" : ""}`}
                >
                  <div className="toc-item-left">
                    <span className="toc-item-icon">{ch.icon}</span>
                    <div>
                      <div className="toc-item-badge">{ch.badge} • {ch.tag}</div>
                      <div className="toc-item-title font-serif">{ch.title}</div>
                    </div>
                  </div>
                  <div className="toc-item-page">Page {index + 1}</div>
                </div>
              ))}
            </div>

            <div className="toc-footer">
              <button
                className="btn-primary"
                onClick={() => {
                  fireHeartBurst();
                  setIsTocOpen(false);
                }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Heart size={16} fill="white" /> Close & Continue Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Storybook Container */}
      <main className="storybook-main-container">
        
        {/* The Open Journal Page Container */}
        <div className={`storybook-book-shell ${isFlipping ? `flip-${flipDirection}` : ""}`}>
          
          {/* Header Bar of the current Journal Page */}
          <div className="journal-page-header">
            <div className="journal-page-tag">
              <span className="journal-badge">{currentChapter.badge}</span>
              <span className="journal-subtitle">• {currentChapter.tag}</span>
            </div>

            <div className="journal-page-number font-serif">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>

          {/* Page Content View based on currentPage */}
          <div className="journal-page-body">
            
            {/* CHAPTER 1: COVER & PROLOGUE */}
            {currentPage === 0 && (
              <div className="chapter-cover-view">
                <div className="washi-tape-strip"></div>

                {/* Decorative corner stars */}
                <div style={{ position: "absolute", top: "18px", left: "24px", color: "var(--fairy-gold)", opacity: 0.3, fontSize: "0.9rem" }}>✦</div>
                <div style={{ position: "absolute", top: "18px", right: "24px", color: "var(--fairy-gold)", opacity: 0.3, fontSize: "0.9rem" }}>✦</div>

                <div className="postage-badge" style={{ marginBottom: "18px" }}>
                  <span>{config.hero.badge || "TODAY IS ALL ABOUT YOU"}</span>
                </div>

                <h1 className="font-serif cover-headline">
                  Happy Birthday, <br />
                  <span className="text-gradient">{config.girlfriendName}</span>
                </h1>

                {/* Ornamental divider */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  margin: "6px 0 10px 0",
                  color: "var(--rosewood-soft)",
                  fontSize: "0.7rem",
                }}>
                  <span style={{ width: "30px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
                  <span>✿</span>
                  <span style={{ width: "30px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
                </div>

                <div className="font-handwriting cover-subheadline">
                  — to my favorite person in the world ❤️
                </div>

                {/* Decorative Illustrated Frame */}
                <div className="cover-illustrated-frame">
                  <div className="frame-icon-row">
                    <span>☕</span>
                    <span>🌅</span>
                    <span>💖</span>
                    <span>✨</span>
                    <span>🎂</span>
                  </div>

                  <p className="font-serif cover-quote">
                    "{config.hero.subtitle}"
                  </p>

                  <div className="cover-signature font-handwriting">
                    Handcrafted with endless love for your special day
                  </div>
                </div>

                {/* Navigation CTA */}
                <div className="cover-cta-row">
                  <button
                    className="btn-primary"
                    onClick={() => goToPage(1)}
                  >
                    <BookOpen size={16} /> Begin Reading: Chapter II <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={fireHeartBurst}
                    className="btn-secondary"
                  >
                    <Heart size={16} fill="var(--rosewood)" color="var(--rosewood)" /> Love Shower ❤️
                  </button>
                </div>

              </div>
            )}

            {/* CHAPTER 2: TIMELINE */}
            {currentPage === 1 && (
              <div className="chapter-content-view">
                <DaysCounter config={config} />
              </div>
            )}

            {/* CHAPTER 3: BIRTHDAY CAKE */}
            {currentPage === 2 && (
              <div className="chapter-content-view">
                <BirthdayCake config={config} />
              </div>
            )}

            {/* CHAPTER 4: LOVE LETTER */}
            {currentPage === 3 && (
              <div className="chapter-content-view">
                <LoveLetter config={config} />
              </div>
            )}

            {/* CHAPTER 5: EPILOGUE */}
            {currentPage === 4 && (
              <div className="chapter-content-view chapter-epilogue-view">
                {/* Decorative header ornament */}
                <div style={{
                  color: "var(--rosewood-soft)",
                  fontSize: "0.8rem",
                  letterSpacing: "6px",
                  marginBottom: "14px",
                }}>
                  ✦ · ❀ · ✦
                </div>

                <div className="postage-badge" style={{ marginBottom: "18px" }}>
                  <span>CHAPTER V • THE EPILOGUE</span>
                </div>
                
                <h2 className="font-serif epilogue-title">
                  Forever Your Favorite Person 💕
                </h2>

                {/* Gradient accent line */}
                <div style={{
                  width: "60px",
                  height: "2px",
                  background: "linear-gradient(90deg, var(--rosewood), var(--sakura-pink))",
                  margin: "0 auto 18px auto",
                  borderRadius: "1px",
                }} />

                <p className="font-serif epilogue-text">
                  "Happy Birthday {config.girlfriendName}! You deserve all the laughter, gentle hugs, starlight, and boundless joy in the entire universe."
                </p>

                <div className="epilogue-cta-box">
                  <button
                    onClick={() => {
                      fireFireworks();
                      setTimeout(() => fireHeartBurst(), 300);
                    }}
                    className="btn-primary"
                  >
                    <Sparkles size={16} /> Launch Birthday Fireworks! 🎆
                  </button>

                  <button
                    onClick={() => goToPage(0)}
                    className="btn-secondary"
                  >
                    <BookOpen size={16} /> Re-read From Page 1
                  </button>
                </div>

                {/* Ornamental divider */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  margin: "8px 0 14px 0",
                  color: "var(--rosewood-soft)",
                  fontSize: "0.7rem",
                }}>
                  <span style={{ width: "30px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
                  <span>❀</span>
                  <span style={{ width: "30px", height: "1px", background: "var(--rosewood-soft)", display: "inline-block" }} />
                </div>

                <div className="epilogue-author-sign font-handwriting">
                  Written with infinite love by {config.boyfriendName} ❤️
                </div>

                {/* Decorative star row */}
                <div style={{
                  marginTop: "14px",
                  color: "var(--fairy-gold)",
                  fontSize: "0.55rem",
                  letterSpacing: "5px",
                  opacity: 0.5,
                }}>
                  ✦ ✧ ✦ ✧ ✦
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Bottom Sticky Journal Navigation Dock */}
      <footer className="storybook-dock">
        <div className="storybook-dock-inner">
          
          {/* Previous Page Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="dock-nav-btn"
            title="Previous Chapter (Left Arrow)"
          >
            <ChevronLeft size={18} />
            <span className="dock-btn-label hide-mobile">Previous Page</span>
          </button>

          {/* Stepper Dots & Current Page Info */}
          <div className="dock-stepper">
            <div className="dock-stepper-dots">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`dock-dot ${currentPage === idx ? "active" : ""}`}
                  title={`Jump to Page ${idx + 1}: ${chapters[idx].title}`}
                />
              ))}
            </div>
            <span className="dock-stepper-text font-serif">
              {currentChapter.badge}: <strong>{currentChapter.title}</strong>
            </span>
          </div>

          {/* Next Page Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="dock-nav-btn next-btn"
            title="Next Chapter (Right Arrow)"
          >
            <span className="dock-btn-label hide-mobile">Next Page</span>
            <ChevronRight size={18} />
          </button>

        </div>
      </footer>

    </div>
  );
};
