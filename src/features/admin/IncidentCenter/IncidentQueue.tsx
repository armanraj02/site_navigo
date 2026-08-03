"use client";

import React, { useState } from "react";
import { useAdminStore } from "../AdminState";
import { NotificationQueue } from "@/features/transit/NotificationEngine/NotificationQueue";

import { Card, Button } from "@/components/ui";

const sendIncidentAlert = (title: string, routeId: string, severity: "low" | "medium" | "high") => {
  NotificationQueue.enqueue({
    id: `admin-inc-${routeId}-${Math.floor(Math.random() * 100000)}`,
    title: `Admin Incident: ${title}`,
    message: `Operations center logged [${severity.toUpperCase()}] issue on route ${routeId}. Dispatch crew alerted.`,
    priority: severity === "high" ? "critical" : severity === "medium" ? "high" : "medium",
    timestamp: new Date().toLocaleTimeString(),
  });
};

export const IncidentQueue: React.FC = () => {
  const incidents = useAdminStore((s) => s.incidentsList);
  const reportIncident = useAdminStore((s) => s.reportIncident);
  const resolveIncident = useAdminStore((s) => s.resolveIncident);

  const [newTitle, setNewTitle] = useState("");
  const [newRoute, setNewRoute] = useState("R42");
  const [newSeverity, setNewSeverity] = useState<"low" | "medium" | "high">("medium");

  const handleReport = () => {
    if (!newTitle.trim()) return;
    reportIncident(newTitle, newRoute, newSeverity);
    sendIncidentAlert(newTitle, newRoute, newSeverity);
    setNewTitle("");
  };

  const activeIncidents = incidents.filter((inc) => inc.status === "active");

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Operations Incident Queue
      </span>

      {/* Incident reporting console */}
      <div className="flex flex-col gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
        <input
          type="text"
          placeholder="New Incident Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full h-8 px-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/5 focus:border-blue-500/50 text-text-primary placeholder:text-text-muted outline-none transition-all"
        />

        <div className="flex gap-2 items-center">
          <select
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
            className="flex-1 h-8 px-1.5 text-xs rounded-lg bg-zinc-900 border border-white/5 text-text-primary outline-none focus:border-blue-500/50"
          >
            <option value="R42">R42</option>
            <option value="R7">R7</option>
            <option value="R15">R15</option>
          </select>

          <select
            value={newSeverity}
            onChange={(e) => setNewSeverity(e.target.value as "low" | "medium" | "high")}
            className="flex-1 h-8 px-1.5 text-xs rounded-lg bg-zinc-900 border border-white/5 text-text-primary outline-none focus:border-blue-500/50"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <Button
            variant="primary"
            onClick={handleReport}
            className="h-8 text-[10px] font-bold px-3 uppercase shrink-0"
          >
            Log Alert
          </Button>
        </div>
      </div>

      {/* Active Incident List */}
      <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
        {activeIncidents.map((inc) => (
          <div
            key={inc.id}
            className="flex items-center justify-between bg-red-500/5 border border-red-500/20 p-2.5 rounded-xl text-[10px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-red-400">{inc.title}</span>
              <span className="text-[8px] text-text-muted font-mono uppercase mt-0.5">
                Route: {inc.routeId} • Severity: {inc.severity}
              </span>
            </div>
            <button
              onClick={() => resolveIncident(inc.id)}
              className="text-[9px] font-semibold text-text-muted hover:text-text-primary uppercase"
            >
              Clear
            </button>
          </div>
        ))}

        {activeIncidents.length === 0 && (
          <span className="text-[10px] text-text-muted text-center py-2 font-medium">
            No active incidents reported.
          </span>
        )}
      </div>
    </Card>
  );
};

IncidentQueue.displayName = "IncidentQueue";
export default IncidentQueue;
