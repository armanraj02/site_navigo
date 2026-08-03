import { create } from "zustand";

interface TransitState {
  liveBuses: Record<string, any>;
  networkStats: {
    activeVehicles: number;
    avgSpeed: number;
    delayImpact: number;
    predictedDemand: number;
  };
  analyticsSnapshot: {
    averageDelayMinutes: number;
    averageOccupancyPercent: number;
  };
}

export const useTransitStore = create<TransitState>(() => ({
  liveBuses: {},
  networkStats: {
    activeVehicles: 0,
    avgSpeed: 0,
    delayImpact: 0,
    predictedDemand: 0,
  },
  analyticsSnapshot: {
    averageDelayMinutes: 0,
    averageOccupancyPercent: 0,
  }
}));
