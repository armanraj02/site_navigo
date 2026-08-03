"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useUIStore } from "@/store/uiStore";
import { useIdleCamera } from "../hooks/useIdleCamera";
import { useLandingAnimation } from "../hooks/useLandingAnimation";
import { LoadingScreen } from "./LoadingScreen";
import { WelcomeOverlay } from "./WelcomeOverlay";
import { EnterTransition } from "./EnterTransition";

type LandingStage =
  | "booting"
  | "flythrough"
  | "welcome"
  | "entering"
  | "done";

export const LandingSequence: React.FC = () => {
  const [stage, setStage] = useState<LandingStage>("booting");
  const [loadProgress, setLoadProgress] = useState(0);

  const setView = useUIStore((state) => state.setView);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);

  const { startFlythrough, enterPassengerMode, stopTimeline } = useLandingAnimation();

  // Idle orbit activates while on welcome stage
  useIdleCamera(stage === "welcome");

  // Boot: preload assets then start flythrough
  useEffect(() => {
    if (stage !== "booting") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLoadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      // Brief pause at 100% before flythrough begins
      setTimeout(() => {
        setStage("flythrough");
        startFlythrough(() => {
          setStage("welcome");
        });
      }, 600);
      }
    }, 50);
  }, [stage, startFlythrough]);

  const handleEnterExperience = useCallback(() => {
    setStage("entering");
    stopTimeline();

    enterPassengerMode(() => {
      setSidebarOpen(true);
      setTimeout(() => {
        setView("passenger");
        setStage("done");
      }, 300);
    });
  }, [stopTimeline, enterPassengerMode, setSidebarOpen, setView]);

  const handleSkip = useCallback(() => {
    setStage("entering");
    stopTimeline();
    setSidebarOpen(true);
    setView("passenger");
    setStage("done");
  }, [stopTimeline, setSidebarOpen, setView]);

  if (stage === "done") return null;

  return (
    <>
      {/* Boot loading screen */}
      <LoadingScreen
        progress={loadProgress}
        visible={stage === "booting"}
      />

      {/* Glassmorphism welcome overlay */}
      <WelcomeOverlay
        visible={stage === "welcome"}
        onEnter={handleEnterExperience}
        onSkip={handleSkip}
      />

      {/* Flash enter transition */}
      <EnterTransition active={stage === "entering"} />
    </>
  );
};

LandingSequence.displayName = "LandingSequence";
export default LandingSequence;
