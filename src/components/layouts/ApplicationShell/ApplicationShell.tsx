"use client";

import React, { Suspense } from "react";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/utils";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";
import { GlobalShortcuts } from "./GlobalShortcuts";
import { SceneViewport } from "./SceneViewport";
import { FloatingSidebar } from "./FloatingSidebar";
import { ShellNavbar } from "./TopNavbar";
import { BottomHUD } from "./BottomHUD";
import { ToastLayer } from "./ToastLayer";
import { NotificationLayer } from "./NotificationLayer";
import { DialogLayer } from "./DialogLayer";
import { Spinner } from "@/components/ui";

export interface ApplicationShellProps {
  children?: React.ReactNode;
}

export const ApplicationShell: React.FC<ApplicationShellProps> = ({ children }) => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const currentView = useUIStore((state) => state.currentView);

  return (
    <GlobalErrorBoundary>
      <GlobalShortcuts />
      
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col bg-background text-foreground select-none">
        {/* Fullscreen 3D Scene Viewport behind HUD layers */}
        <SceneViewport />

        {/* Global Floating Navigation Sidebar */}
        {currentView !== "loading" && currentView !== "passenger" && <FloatingSidebar />}

        {/* Global Top Navbar */}
        {currentView !== "loading" && currentView !== "passenger" && <ShellNavbar />}

        {/* Main Floating Page Panels / Dashboard Views */}
        <main
          className={cn(
            "relative z-10 flex-1 flex flex-col transition-all duration-300 pointer-events-none select-none",
            currentView !== "passenger" && "mt-20 md:mr-4 p-4 pb-20 md:pb-4",
            currentView !== "loading" && currentView !== "passenger" && (isSidebarOpen ? "md:ml-[22rem]" : "md:ml-24")
          )}
        >
          <div className="flex-1 w-full flex flex-col justify-start items-stretch pointer-events-auto">
            <Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center">
                  <Spinner size="lg" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </main>

        {/* Global Bottom HUD Deck */}
        {currentView !== "loading" && currentView !== "passenger" && <BottomHUD />}

        {/* System Logs & Notification layers */}
        <ToastLayer />
        <NotificationLayer />
        <DialogLayer />
      </div>
    </GlobalErrorBoundary>
  );
};

ApplicationShell.displayName = "ApplicationShell";
export default ApplicationShell;
