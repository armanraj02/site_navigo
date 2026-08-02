"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { TopNavbar as BaseNavbar, Badge, ThemeToggle, IconButton } from "@/components/ui";

export const ShellNavbar: React.FC = () => {
  const currentView = useUIStore((state) => state.currentView);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const openModal = useUIStore((state) => state.openModal);

  const viewTitles = {
    loading: "System Preloader",
    landing: "Overview & Flyover",
    passenger: "Passenger Transit Board",
    driver: "Driver Telematics Console",
    admin: "System Analytics Dashboard",
  };

  const viewBadges = {
    loading: "PRELOAD" as const,
    landing: "FLYOVER" as const,
    passenger: "PASSENGER" as const,
    driver: "DRIVER" as const,
    admin: "ADMINISTRATOR" as const,
  };

  const badgeColors = {
    loading: "default" as const,
    landing: "primary" as const,
    passenger: "success" as const,
    driver: "warning" as const,
    admin: "danger" as const,
  };

  return (
    <BaseNavbar
      className="left-4 right-4 md:right-4 transition-all duration-300"
      style={{
        left: typeof window !== 'undefined' && window.innerWidth >= 768 ? (isSidebarOpen ? "22rem" : "6rem") : undefined,
      }}
      title={viewTitles[currentView]}
      actions={
        <>
          <Badge variant={badgeColors[currentView]} className="font-mono uppercase h-5 text-[10px]">
            {viewBadges[currentView]}
          </Badge>
          <ThemeToggle />
          <IconButton
            variant="ghost"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
            aria-label="Open notifications center"
            onClick={() => openModal("notification-center")}
          />
        </>
      }
    />
  );
};

ShellNavbar.displayName = "ShellNavbar";
export default ShellNavbar;
