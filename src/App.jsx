import React, { useState } from "react";
import { CONFIG } from "./config";
import { BackgroundParticles } from "./components/BackgroundParticles";
import { IntroEnvelope } from "./components/IntroEnvelope";
import { MusicPlayer } from "./components/MusicPlayer";
import { StorybookJournal } from "./components/StorybookJournal";

export default function App() {
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleEnvelopeOpen = () => {
    setShouldPlayMusic(true);
  };

  return (
    <div className="app-container storybook-theme">
      {/* Dynamic Falling Sakura Petals & Fairy Dust Particle Background */}
      <BackgroundParticles />

      {/* 3D Fairy Wax Sealed Intro Envelope Overlay */}
      <IntroEnvelope config={CONFIG} onOpen={handleEnvelopeOpen} />

      {/* Floating Vinyl Record Music Player */}
      <MusicPlayer config={CONFIG} shouldPlay={shouldPlayMusic} />

      {/* Interactive Storybook & Flipbook Journal Layout */}
      <StorybookJournal config={CONFIG} />
    </div>
  );
}
