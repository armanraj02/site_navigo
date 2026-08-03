"use client";

import React, { useEffect, useState } from "react";
import { useTransitStore } from "@/features/transit/TrackingEngine/TransitStore";
import { AdminCoordinator } from "../AdminCoordinator/AdminCoordinator";
import { useAdminStore } from "../AdminState";
import { Card } from "@/components/ui";

interface BusState {
  id: string;
  routeId: string;
  routeColor: string;
  speed: number;
  progress: number;
}

const mockBuses: BusState[] = [
  { id: "KA-19 F 4587", routeId: "R1", routeColor: "#3b82f6", speed: 12, progress: 0.4 },
  { id: "KA-19 F 4588", routeId: "R2", routeColor: "#10b981", speed: 10, progress: 0.8 },
  { id: "KA-19 F 4589", routeId: "R3", routeColor: "#f59e0b", speed: 15, progress: 0.1 },
];

export const FleetStatusGrid: React.FC = () => {
  const [vehicles, setVehicles] = useState<BusState[]>([]);
  const selectedVehicleId = useAdminStore((s) => s.selectedVehicleId);
  const activeFilter = useAdminStore((s) => s.activeFilter);
  
  const liveBuses = useTransitStore((s) => s.liveBuses);

  useEffect(() => {
    setVehicles(mockBuses);
  }, []);

  const filteredBuses = vehicles.filter((bus) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "warning") {
      const live = liveBuses[bus.id];
      return live ? live.healthStatus !== "good" : false;
    }
    return bus.routeId === activeFilter;
  });

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Live Fleet Vehicles ({filteredBuses.length})
      </span>

      <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
        {filteredBuses.map((bus) => {
          const live = liveBuses[bus.id];
          const speedVal = live ? live.speedKmh : Math.round(bus.speed * 3.6);
          const delayVal = live ? live.delayMinutes : 0;
          const batteryVal = Math.max(20, Math.round(100 - bus.progress * 45));

          const isSelected = selectedVehicleId === bus.id;

          return (
            <div
              key={bus.id}
              onClick={() => AdminCoordinator.focusVehicle(bus.id)}
              className={`p-3 border rounded-xl flex justify-between items-center cursor-pointer transition-all ${
                isSelected
                  ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white font-mono"
                  style={{ backgroundColor: bus.routeColor }}
                >
                  {bus.routeId}
                </span>
                <span className="text-xs font-bold text-text-primary">{bus.id}</span>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-semibold text-text-secondary">
                <div className="flex flex-col items-end">
                  <span className="text-text-primary font-mono">{speedVal} km/h</span>
                  <span className="text-[8px] text-text-muted uppercase font-mono">Speed</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`font-mono ${delayVal > 4 ? "text-red-400 font-bold" : "text-emerald-400"}`}>
                    {delayVal === 0 ? "On Time" : `+${Math.round(delayVal)}m`}
                  </span>
                  <span className="text-[8px] text-text-muted uppercase font-mono">Delay</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-text-primary font-mono">{batteryVal}%</span>
                  <span className="text-[8px] text-text-muted uppercase font-mono">Battery</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

FleetStatusGrid.displayName = "FleetStatusGrid";
export default FleetStatusGrid;
