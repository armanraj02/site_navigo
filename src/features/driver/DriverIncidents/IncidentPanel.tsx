"use client";

import React from "react";
import { useDriverStore } from "../DriverState";
import { NotificationQueue } from "@/features/transit/NotificationEngine/NotificationQueue";

import { Card, Button } from "@/components/ui";

const sendIncidentAlert = (type: string, label: string) => {
  NotificationQueue.enqueue({
    id: `driver-inc-${type}-${Math.floor(Math.random() * 100000)}`,
    title: `Driver Report: ${label}`,
    message: `Cockpit reported issue [${type.toUpperCase()}] along the route corridor. Dispatching assistance.`,
    priority: "high",
    timestamp: new Date().toLocaleTimeString(),
  });
};

export const IncidentPanel: React.FC = () => {
  const addIncident = useDriverStore((s) => s.addIncident);
  const reportedIncidents = useDriverStore((s) => s.reportedIncidents);
  const resolveIncident = useDriverStore((s) => s.resolveIncident);

  const incidentTypes = [
    { type: "roadblock", label: "Report Roadblock" },
    { type: "traffic", label: "Congested Traffic" },
    { type: "warning", label: "Vehicle Warning" },
  ];

  const handleReportIncident = (type: string, label: string) => {
    addIncident(type, label);
    sendIncidentAlert(type, label);
  };

  const activeIncidents = reportedIncidents.filter((inc) => inc.status === "active");

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Incident Console
      </span>

      {/* Selector Buttons */}
      <div className="grid grid-cols-3 gap-1.5">
        {incidentTypes.map((inc) => (
          <Button
            key={inc.type}
            variant="ghost"
            onClick={() => handleReportIncident(inc.type, inc.label)}
            className="text-[9px] font-bold py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-white/5 rounded-xl justify-center h-auto leading-tight"
          >
            {inc.label.split(" ")[1]}
          </Button>
        ))}
      </div>

      {/* Active Incidents List */}
      {activeIncidents.length > 0 && (
        <div className="flex flex-col gap-2 mt-1.5 border-t border-white/5 pt-2">
          <span className="text-[8px] uppercase tracking-wider text-red-400 font-mono font-bold">
            Active Dispatches
          </span>
          <div className="flex flex-col gap-1.5 max-h-24 overflow-y-auto">
            {activeIncidents.map((inc) => (
              <div
                key={inc.id}
                className="flex items-center justify-between bg-red-500/5 border border-red-500/20 p-2 rounded-xl text-[10px]"
              >
                <div className="flex items-center gap-1.5 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-bold">{inc.title}</span>
                </div>
                <button
                  onClick={() => resolveIncident(inc.id)}
                  className="text-[9px] font-semibold text-text-muted hover:text-text-primary uppercase"
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

IncidentPanel.displayName = "IncidentPanel";
export default IncidentPanel;
