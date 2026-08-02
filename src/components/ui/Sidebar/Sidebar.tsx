import React from "react";
import { cn } from "@/utils";
import { GlassCard } from "../GlassCard";
import { IconButton } from "../IconButton";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  isOpen,
  onToggle,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "hidden md:flex fixed top-4 bottom-4 left-4 z-40 transition-all duration-300 ease-apple",
        isOpen ? "w-80" : "w-16",
        className
      )}
      {...props}
    >
      <GlassCard
        className="flex-1 flex flex-col justify-between p-4 overflow-hidden relative"
        padding="none"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between border-b border-glass-border pb-3 select-none">
            {isOpen && (
              <span className="font-display font-bold text-lg text-primary tracking-wide flex items-center gap-2">
                NAVIGO
              </span>
            )}
            <IconButton
              variant="ghost"
              icon={
                isOpen ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )
              }
              aria-label="Toggle Sidebar"
              onClick={onToggle}
            />
          </div>
          {children}
        </div>
      </GlassCard>
    </div>
  );
};

Sidebar.displayName = "Sidebar";
