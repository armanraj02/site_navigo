"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { GlassCard } from "@/components/ui";
import { StatusBar } from "./StatusBar";
import { CameraStatusWidget } from "./CameraStatusWidget";

export const BottomHUD: React.FC = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <div
      className="fixed bottom-4 z-30 transition-all duration-300 left-4 right-4 md:right-4"
      style={{
        left: typeof window !== 'undefined' && window.innerWidth >= 768 ? (isSidebarOpen ? "22rem" : "6rem") : undefined,
      }}
    >
      <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-4 py-2.5 px-6" padding="none">
        <StatusBar />
        <CameraStatusWidget />
      </GlassCard>
    </div>
  );
};

BottomHUD.displayName = "BottomHUD";
export default BottomHUD;
