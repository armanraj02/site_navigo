"use client";

import React, { useEffect, useState } from "react";
import { useGoogleMap } from "./GoogleMapProvider";

export const MapDebugger: React.FC = () => {
  const { map } = useGoogleMap();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(0);
  const [heading, setHeading] = useState(0);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    if (!map) return;

    const listeners = [
      map.addListener("bounds_changed", () => {
        const c = map.getCenter();
        if (c) setCenter({ lat: c.lat(), lng: c.lng() });
        setZoom(map.getZoom() || 0);
        setHeading(map.getHeading() || 0);
        setTilt(map.getTilt() || 0);
      }),
    ];

    return () => {
      listeners.forEach((l) => {
        if (l && typeof l.remove === 'function') {
          l.remove();
        }
      });
    };
  }, [map]);

  if (!map) return null;

  return (
    <div className="absolute bottom-4 left-4 p-3 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-white/5 text-[9px] font-mono text-zinc-400 z-50 pointer-events-none w-48 shadow-xl">
      <div className="text-white font-semibold uppercase tracking-wider mb-1 text-[10px]">Digital Twin Debug</div>
      <div>Lat: {center.lat.toFixed(5)}</div>
      <div>Lng: {center.lng.toFixed(5)}</div>
      <div>Zoom: {zoom.toFixed(1)}</div>
      <div>Heading: {heading.toFixed(1)}°</div>
      <div>Tilt: {tilt.toFixed(1)}°</div>
    </div>
  );
};

export default MapDebugger;
