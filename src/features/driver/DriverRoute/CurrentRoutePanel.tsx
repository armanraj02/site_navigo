"use client";

import React from "react";
import { useDriverStore } from "../DriverState";
import { MANGALURU_ROUTES as MOCK_ROUTES } from "@/lib/demoData";
import { Card } from "@/components/ui";

export const CurrentRoutePanel: React.FC = () => {
  const busId = useDriverStore((s) => s.activeBusId);
  const delay = useDriverStore((s) => s.delayMinutes);

  const route = MOCK_ROUTES.find((r) => r.id === "R42"); // default driver R42 route focus

  if (!route) return null;

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
          Current Assignment
        </span>
        <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono uppercase">
          {busId}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="text-xs font-bold text-white px-2 py-1 rounded font-mono"
          style={{ backgroundColor: "#3b82f6" }}
        >
          {route.id}
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-text-primary leading-none">
            {route.originName} to {route.destinationName}
          </span>
          <span className="text-[9px] text-text-muted font-mono uppercase tracking-wider mt-1">
            Headway: 15 mins
          </span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2.5 flex items-center justify-between text-xs">
        <span className="font-semibold text-text-secondary">Schedule Deviation:</span>
        <span
          className={`font-bold font-mono px-2 py-0.5 rounded ${
            delay > 5
              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse"
              : delay > 0
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          }`}
        >
          {delay === 0 ? "On Time" : `+${Math.round(delay)} min`}
        </span>
      </div>
    </Card>
  );
};

CurrentRoutePanel.displayName = "CurrentRoutePanel";
export default CurrentRoutePanel;
