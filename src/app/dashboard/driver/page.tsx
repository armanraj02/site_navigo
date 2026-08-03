"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Signal, BatteryMedium, Clock, MapPin, 
  Navigation, AlertTriangle, CheckCircle2, 
  ArrowRight, Users, LogOut
} from "lucide-react";
import { GoogleMap, useJsApiLoader, OverlayViewF, Polyline } from "@react-google-maps/api";
import Link from "next/link";
import { DRIVER_DATA, MANGALURU_ROUTES } from "@/lib/demoData";

const mapContainerStyle = { width: '100%', height: '100%' };
const activeRoute = MANGALURU_ROUTES[0];
const center = activeRoute.currentLocation;

export default function DriverDashboard() {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return (
    <div className="h-screen w-full bg-[#F5F7FA] text-slate-900 flex flex-col font-sans overflow-hidden">
      
      {/* Top Status Bar */}
      <div className="min-h-14 h-auto bg-white border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:px-6 shrink-0 relative z-20 gap-3 lg:gap-0">
        {/* Left Side */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3 lg:gap-4">
            <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 font-medium text-xs lg:text-sm transition-colors border border-slate-200 px-2 lg:px-3 py-1 rounded-lg shrink-0">
              ← Exit
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-center gap-0.5 lg:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-widest text-sm lg:text-lg text-slate-900">{DRIVER_DATA.busId}</span>
                <span className="px-1.5 lg:px-2 py-0.5 rounded text-[8px] lg:text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {activeRoute.busType}
                </span>
              </div>
              <span className="text-xs lg:text-sm text-slate-500 font-medium">
                {DRIVER_DATA.name} <span className="hidden lg:inline">• {DRIVER_DATA.driverId}</span>
              </span>
            </div>
          </div>
          
          <Link href="/" className="lg:hidden bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 p-2 rounded-lg flex items-center justify-center shrink-0">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 lg:gap-2 text-slate-400">
            <Signal className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isShiftActive ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider">{isShiftActive ? DRIVER_DATA.shift.gpsStatus : 'GPS OFF'}</span>
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2 text-slate-400">
            <BatteryMedium className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            <span className="text-[10px] lg:text-xs font-bold">{DRIVER_DATA.shift.battery}</span>
          </div>
          <div className="text-base lg:text-xl font-bold tracking-tight text-slate-900">{currentTime}</div>
          
          <div className="hidden lg:block h-6 w-[1px] bg-slate-200 mx-2" />
          <Link href="/" className="hidden lg:flex bg-white border border-slate-200 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 text-slate-500 transition-colors px-4 py-2 rounded-lg text-sm font-bold items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Left Panel: Controls & Progress */}
        <div className="w-full lg:w-[450px] h-[55vh] lg:h-auto overflow-y-auto bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col shrink-0 relative z-20 shadow-xl">
          
          {/* Main Action Area */}
          <div className="p-8 border-b border-slate-100 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
            
            <motion.button
              onClick={() => setIsShiftActive(!isShiftActive)}
              animate={{
                scale: isShiftActive ? 0.95 : 1,
                backgroundColor: isShiftActive ? "#ef4444" : "#3b82f6",
              }}
              className="w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] relative z-10 transition-shadow hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] cursor-pointer"
            >
              {isShiftActive ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-white mb-2" />
                  <span className="text-xl font-bold text-white tracking-wide">END SHIFT</span>
                </>
              ) : (
                <>
                  <Navigation className="w-12 h-12 text-white mb-2 ml-2" />
                  <span className="text-xl font-bold text-white tracking-wide">START SHIFT</span>
                </>
              )}
            </motion.button>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-medium uppercase tracking-widest mb-1">Status</p>
              <p className={`text-lg font-bold ${isShiftActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                {isShiftActive ? "BROADCASTING LIVE" : "OFFLINE"}
              </p>
            </div>
          </div>

          {/* Route Progress (Only when active) */}
          <AnimatePresence mode="wait">
            {isShiftActive ? (
              <motion.div 
                key="active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Speed</div>
                    <div className="text-3xl font-bold text-slate-900 flex items-baseline gap-1">
                      {DRIVER_DATA.shift.currentSpeed.split(' ')[0]} <span className="text-sm text-slate-500 font-medium">km/h</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Passengers</div>
                    <div className="text-3xl font-bold text-slate-900 flex items-baseline gap-2">
                      {activeRoute.occupancy.replace('%', '')} <span className="text-sm text-slate-500 font-medium">%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Next Stop</div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{activeRoute.nextStop}</h3>
                      <p className="text-sm text-slate-500 font-medium">ETA: {activeRoute.arrivalTime}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer">
                    Report Delay
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="offline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Shift not started</h3>
                <p className="text-sm text-slate-500 font-medium">Tap the button above to begin broadcasting your GPS location and routing data.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Emergency Dock */}
          <div className="p-4 border-t border-slate-200 bg-white shrink-0">
            <button className="w-full py-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <AlertTriangle className="w-5 h-5" />
              EMERGENCY SOS
            </button>
          </div>

        </div>

        {/* Right Panel: Live Map */}
        <div className="flex-1 min-h-[45vh] lg:min-h-0 relative bg-[#F5F7FA] z-10">
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
            </div>
          ) : (
            <div className={`absolute inset-0 transition-all duration-1000 ${isShiftActive ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={isShiftActive ? activeRoute.currentLocation : center} // Mock active location
                zoom={12}
                options={{
                  disableDefaultUI: true,
                }}
              >
                {isShiftActive && (
                  <>
                    <Polyline
                      path={activeRoute.path}
                      options={{
                        strokeColor: "#3b82f6",
                        strokeOpacity: 0.8,
                        strokeWeight: 6,
                      }}
                    />
                    
                    {/* Origin/Dest */}
                    <OverlayViewF position={activeRoute.path[0]} mapPaneName={"overlayMouseTarget"}>
                      <div className="w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-full border-2 border-white" />
                    </OverlayViewF>
                    <OverlayViewF position={activeRoute.path[activeRoute.path.length - 1]} mapPaneName={"overlayMouseTarget"}>
                      <div className="w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-full border-2 border-white" />
                    </OverlayViewF>

                    {/* Current Driver Location */}
                    <OverlayViewF position={activeRoute.currentLocation} mapPaneName={"overlayMouseTarget"}>
                      <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-500/20 rounded-full animate-ping absolute" style={{ animationDuration: '3s' }} />
                        <div className="w-8 h-8 bg-blue-600 border-4 border-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] relative z-10 flex items-center justify-center">
                          <Navigation className="w-4 h-4 text-white -rotate-45" />
                        </div>
                      </div>
                    </OverlayViewF>
                  </>
                )}
              </GoogleMap>
              
              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
