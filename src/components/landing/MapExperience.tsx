"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Grid, FileText, Settings, LogOut, 
  Search, Bell, MapPin, Navigation, Phone, MessageSquare, IndianRupee, Check
} from "lucide-react";
import { GoogleMap, useJsApiLoader, OverlayViewF } from "@react-google-maps/api";
import Link from "next/link";

const containerStyle = {
  width: '100%',
  height: '100%'
};

import { MANGALURU_ROUTES as MOCK_ROUTES, MANGALURU_STOPS as MANGALURU_MARKERS } from "@/lib/demoData";

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  keyboardShortcuts: false,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
    { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
    { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
    { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }
  ]
};

interface MapExperienceProps {
  fullScreen?: boolean;
  userName?: string;
}

export function MapExperience({ fullScreen = false, userName = "Rohan Sharma" }: MapExperienceProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // UI States
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [trackInput, setTrackInput] = useState('');
  const [sheetMode, setSheetMode] = useState<'search' | 'tracking'>('search');
  const [exploreFrom, setExploreFrom] = useState('');
  const [exploreTo, setExploreTo] = useState('');
  
  // Data States
  const [activeRouteId, setActiveRouteId] = useState(MOCK_ROUTES[0].id);
  const activeRoute = useMemo(() => MOCK_ROUTES.find(r => r.id === activeRouteId) || MOCK_ROUTES[0], [activeRouteId]);
  const otherRoutes = useMemo(() => MOCK_ROUTES.filter(r => 
    r.id !== activeRouteId && 
    (r.busId.toLowerCase().includes(searchQuery.toLowerCase()) || 
     r.originName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     r.destinationName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (exploreFrom ? r.originName.toLowerCase().includes(exploreFrom.toLowerCase()) : true) &&
    (exploreTo ? r.destinationName.toLowerCase().includes(exploreTo.toLowerCase()) : true)
  ), [activeRouteId, searchQuery, exploreFrom, exploreTo]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTrackSubmit = () => {
    if (!trackInput.trim()) return;
    const found = MOCK_ROUTES.find(r => r.busId.toLowerCase().includes(trackInput.toLowerCase()));
    if (found) {
      setActiveRouteId(found.id);
      setTrackInput('');
    } else {
      showToast("Bus not found in active fleet.");
    }
  };

  return (
    <div id="map" className={`${fullScreen ? 'h-screen w-full' : 'py-24 px-6'} relative bg-[#F5F7FA] overflow-hidden flex justify-center`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#2EE59D] animate-pulse" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Shell */}
      <motion.div 
        initial={fullScreen ? { opacity: 0 } : { opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={fullScreen ? undefined : { once: true, margin: "-100px" }}
        transition={fullScreen ? { duration: 0.5 } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full bg-white flex relative z-10 ${fullScreen ? 'h-full' : 'max-w-6xl h-[800px] lg:h-auto lg:aspect-[16/9] rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden'}`}
      >
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-20">
          
          {/* Header */}
          {!fullScreen && (
            <div className="h-20 border-b border-slate-200 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md">
              <div className="relative flex-1 min-w-[120px] md:w-96 mr-2 md:mr-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search routes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-base md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0057FF]/30 focus:bg-white transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 md:gap-6 shrink-0">
                <div 
                  className="relative cursor-pointer hover:bg-slate-50 p-2 rounded-full transition-colors"
                  onClick={() => showToast("No new notifications")}
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0057FF] rounded-full shadow-[0_0_10px_rgba(0,87,255,0.4)]" />
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0057FF] to-[#00D6FF] flex items-center justify-center text-sm font-semibold text-white shadow-md shadow-[#0057FF]/20 shrink-0">
                    {userName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-900 hidden sm:block">{userName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Body Columns */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-transparent">
            
            {/* Left Column (Data & Lists) */}
            {!fullScreen && (
              <div className="w-full lg:w-[400px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 p-4 md:p-6 flex flex-col gap-6 overflow-y-auto lg:overflow-hidden bg-white z-30 max-h-[50vh] lg:max-h-none">
                
                {/* Action Gradient Card */}
                <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-[#0057FF]/5 to-purple-500/5 border border-[#0057FF]/10 relative overflow-hidden group shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative z-10">
                    <h3 className="font-semibold text-lg mb-1 tracking-tight text-slate-900">Track New Bus</h3>
                    <p className="text-xs text-slate-500 mb-4 font-medium">Enter vehicle number to monitor live status</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={trackInput}
                        onChange={(e) => setTrackInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTrackSubmit()}
                        placeholder="e.g. KA-19 F 4587" 
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 text-base md:text-sm font-mono placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:border-[#0057FF]/30 transition-colors text-slate-900 shadow-sm"
                      />
                      <button 
                        onClick={handleTrackSubmit}
                        className="w-11 h-11 shrink-0 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-[#0057FF] active:scale-95 transition-all shadow-md hover:shadow-lg"
                      >
                        <ArrowRightIcon />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Tracking Card */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeRoute.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl p-5 bg-white border border-slate-200 flex flex-col gap-5 hover:border-slate-300 transition-colors shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Live Tracking</div>
                        <div className="font-mono text-base font-bold tracking-tight text-slate-900">{activeRoute.busId}</div>
                      </div>
                      <StatusBadge status={activeRoute.status} />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-slate-500 text-xs mb-1 font-medium">Departure</div>
                        <div className="font-semibold text-slate-900 tracking-wide">{activeRoute.originName}</div>
                        <div className="text-xs text-slate-400 mt-1 font-mono">{(activeRoute as any).departureTime || "10:30 AM"}</div>
                      </div>
                      <div className="flex-1 flex items-center px-4">
                        <div className="h-[1px] w-full bg-slate-200 border-dashed border-t" />
                        <MapPin className="w-4 h-4 text-slate-300 mx-2" />
                        <div className="h-[1px] w-full bg-slate-200 border-dashed border-t" />
                      </div>
                      <div className="text-right">
                        <div className="text-slate-500 text-xs mb-1 font-medium">Arrival</div>
                        <div className="font-semibold text-slate-900 tracking-wide">{activeRoute.destinationName}</div>
                        <div className="text-xs text-slate-400 mt-1 font-mono">{activeRoute.arrivalTime}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-[10px] text-slate-500 mb-1 font-medium">Passengers</div>
                        <div className="text-sm font-bold tracking-wide text-slate-900">{(activeRoute as any).passengers || activeRoute.occupancy} / {activeRoute.capacity}</div>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center border-x border-slate-200">
                        <div className="text-[10px] text-slate-500 mb-1 font-medium">Fare</div>
                        <div className="text-sm font-bold flex items-center justify-center tracking-wide text-slate-900"><IndianRupee className="w-3 h-3 mr-[1px]"/> {activeRoute.fare}</div>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-[10px] text-slate-500 mb-1 font-medium">Distance</div>
                        <div className="text-sm font-bold tracking-wide text-slate-900">{activeRoute.distance}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                          <span className="text-xs font-bold text-slate-600">{activeRoute.driverInitials}</span>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-medium">Driver</div>
                          <div className="text-sm font-bold text-slate-900 tracking-wide">{activeRoute.driverName}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => showToast(`Calling ${activeRoute.driverName}...`)}
                          className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-slate-600 hover:text-slate-900"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => showToast(`Messaging ${activeRoute.driverName}...`)}
                          className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-slate-600 hover:text-slate-900"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Other Routes List */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Other Active Routes</div>
                  <div className="flex flex-col gap-2 overflow-y-auto pr-2 pb-4 scrollbar-hide">
                    <AnimatePresence>
                      {otherRoutes.map((route) => (
                        <motion.div
                          key={route.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <RouteItem 
                            bus={route.busId} 
                            from={route.originName} 
                            to={route.destinationName} 
                            status={route.status} 
                            onClick={() => setActiveRouteId(route.id)}
                          />
                        </motion.div>
                      ))}
                      {otherRoutes.length === 0 && (
                        <div className="text-center text-slate-400 text-sm mt-4">
                          No matching routes found
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {/* Right Column (Live Google Map) */}
            <div className="flex-1 relative bg-slate-100 overflow-hidden z-10">
              
              {/* FLOATING TRACKING SHEET (Only on FullScreen Dashboard) */}
              {fullScreen && isLoaded && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute bottom-6 left-6 z-50 w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col max-h-[85vh]"
                >
                  <AnimatePresence mode="wait">
                    {sheetMode === 'search' ? (
                      <motion.div
                        key="search-mode"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col min-h-0"
                      >
                        <div className="p-5 border-b border-slate-100 bg-white shrink-0">
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">Where to?</h3>
                          <div className="flex flex-col gap-3 relative">
                            <div className="absolute left-3.5 top-3.5 bottom-3.5 w-0.5 bg-slate-200 flex flex-col items-center justify-between z-10">
                              <div className="w-2.5 h-2.5 bg-slate-800 rounded-full -ml-1 mt-1" />
                              <div className="w-2.5 h-2.5 bg-[#D32F2F] rounded-sm -ml-1 mb-1" />
                            </div>
                            <input
                              type="text"
                              placeholder="Current Location"
                              value={exploreFrom}
                              onChange={(e) => setExploreFrom(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-base md:text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-colors relative z-0"
                            />
                            <input
                              type="text"
                              placeholder="Destination"
                              value={exploreTo}
                              onChange={(e) => setExploreTo(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-base md:text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-colors relative z-0"
                            />
                          </div>
                        </div>
                        <div className="overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50/50 flex-1">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Available Rides</div>
                          {otherRoutes.map((route) => (
                            <div 
                              key={route.id}
                              onClick={() => {
                                setActiveRouteId(route.id);
                                setSheetMode('tracking');
                              }}
                              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#D32F2F]/30 hover:shadow-md cursor-pointer transition-all group"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:bg-red-50 transition-colors">
                                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#D32F2F]">BUS</span>
                                  </div>
                                  <span className="font-bold text-slate-900">Route {route.routeNo}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-900">{route.fare}</span>
                              </div>
                              <div className="flex justify-between items-end">
                                <div>
                                  <div className="text-xs text-slate-500 font-medium">{route.arrivalTime} arrival • {route.distance}</div>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${route.occupancy.includes('8') || route.occupancy.includes('9') ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {route.occupancy} Full
                                </span>
                              </div>
                            </div>
                          ))}
                          {otherRoutes.length === 0 && (
                            <div className="text-center text-slate-500 text-sm mt-4 pb-4">
                              No buses found for this route.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tracking-mode"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Bus arriving soon</h3>
                          <p className="text-sm font-medium text-slate-500">Arrives at <span className="font-bold text-slate-900">{activeRoute.arrivalTime}</span></p>
                        </div>
                        
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Driver</h4>
                            <p className="text-base font-bold text-slate-900">{activeRoute.driverName}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => showToast(`Calling ${activeRoute.driverName}...`)}
                              className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all text-slate-700 shadow-sm"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => showToast(`Messaging ${activeRoute.driverName}...`)}
                              className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all text-slate-700 shadow-sm"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="p-5 border-b border-slate-100">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Route Details</h4>
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center gap-1 mt-1">
                              <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400" />
                              <div className="w-[1.5px] h-6 bg-slate-300" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] shadow-[0_0_8px_rgba(211,47,47,0.5)]" />
                            </div>
                            <div className="flex flex-col gap-3">
                              <div>
                                <div className="text-xs text-slate-500 font-medium">Origin</div>
                                <div className="text-sm font-semibold text-slate-800">{activeRoute.originName}</div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500 font-medium">Destination</div>
                                <div className="text-sm font-bold text-slate-900">{activeRoute.destinationName}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col gap-3 bg-slate-50/50">
                          <button 
                            onClick={() => showToast("Loading route details...")}
                            className="w-full py-3.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                          >
                            View Route Details
                          </button>
                          <button 
                            onClick={() => {
                              showToast("Tracking cancelled.");
                              setSheetMode('search');
                            }}
                            className="w-full py-3.5 rounded-xl bg-transparent hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all active:scale-[0.98]"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Logout Button (Only on FullScreen Dashboard) */}
              {fullScreen && isLoaded && (
                <Link 
                  href="/"
                  className="absolute top-6 right-6 z-50 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              )}

              {!isLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#D32F2F] animate-spin" />
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={activeRoute.currentLocation}
                  zoom={7}
                  options={mapOptions}
                >
                  {MOCK_ROUTES.map(route => {
                    const isActive = route.id === activeRouteId;
                    return (
                      <React.Fragment key={route.id}>
                        {/* Line Rendering removed to prevent API crash on Demo Key quota limits */}

                        {/* Origin Marker (Glowing Red for active) */}
                        <OverlayViewF position={route.origin} mapPaneName={"overlayMouseTarget"}>
                          <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${isActive ? 'w-8 h-8 bg-red-500/30' : 'w-4 h-4 bg-slate-400/30'}`}>
                            <div className={`rounded-full ${isActive ? 'w-4 h-4 bg-[#D32F2F] shadow-lg shadow-red-500/50 border-2 border-white' : 'w-2 h-2 bg-slate-500 border border-white'}`} />
                          </div>
                        </OverlayViewF>

                        {/* Destination Marker */}
                        <OverlayViewF position={route.destination} mapPaneName={"overlayMouseTarget"}>
                          <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${isActive ? 'w-8 h-8 bg-red-500/30' : 'w-4 h-4 bg-slate-400/30'}`}>
                            <div className={`rounded-full ${isActive ? 'w-4 h-4 bg-[#D32F2F] shadow-lg shadow-red-500/50 border-2 border-white' : 'w-2 h-2 bg-slate-500 border border-white'}`} />
                          </div>
                        </OverlayViewF>

                        {/* Moving Bus Marker */}
                        <OverlayViewF
                          position={route.currentLocation}
                          mapPaneName={"overlayMouseTarget"}
                        >
                          <div className={`absolute -translate-x-1/2 -translate-y-[120%] flex flex-col items-center ${isActive ? 'z-50' : 'z-10 cursor-pointer hover:z-40'}`} onClick={() => setActiveRouteId(route.id)}>
                            
                            {/* Detailed Info Bubble for Active Route */}
                            {isActive ? (
                              <div className="mb-3 bg-white border border-red-100 text-slate-900 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap shadow-xl flex items-center gap-2 pointer-events-auto transition-all">
                                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-[#D32F2F]">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v9c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                                </div>
                                {route.distance} away
                                {/* Bubble pointer */}
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-red-100 rotate-45 rounded-sm" />
                              </div>
                            ) : (
                              /* Small Bubble for Inactive Routes */
                              <div className="mb-2 bg-slate-800 text-white px-2 py-1 rounded-md text-[9px] font-bold tracking-wide shadow-md pointer-events-auto">
                                {route.busId}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 rounded-sm" />
                              </div>
                            )}
                            
                            {/* Map Dot */}
                            <div className={`w-5 h-5 rounded-full border-[3px] border-white relative ${isActive ? 'bg-[#D32F2F] shadow-[0_0_15px_rgba(211,47,47,0.5)]' : 'bg-slate-500 shadow-md'}`}>
                              {isActive && <div className="absolute inset-0 rounded-full border border-[#D32F2F] animate-ping opacity-50" style={{ animationDuration: '2s' }} />}
                            </div>
                          </div>
                        </OverlayViewF>

                      </React.Fragment>
                    );
                  })}
                </GoogleMap>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SidebarIcon({ icon: Icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
        active ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPacked = status === "Packed";
  return (
    <div className={`text-[10px] px-2.5 py-1.5 rounded-md font-bold border flex items-center gap-1.5 transition-colors ${isPacked ? 'bg-[#FFC857]/10 text-[#E5A822] border-[#FFC857]/30' : 'bg-[#2EE59D]/10 text-[#00B060] border-[#2EE59D]/30'}`}>
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isPacked ? 'bg-[#E5A822]' : 'bg-[#00B060]'}`} />
      {status}
    </div>
  );
}

function RouteItem({ bus, from, to, status, onClick }: { bus: string, from: string, to: string, status: string, onClick: () => void }) {
  const isPacked = status === "Packed";
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-100 hover:border-[#0057FF]/30 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-3.5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isPacked ? 'bg-[#FFC857]/10 text-[#E5A822] group-hover:bg-[#FFC857]/20' : 'bg-[#0057FF]/10 text-[#0057FF] group-hover:bg-[#0057FF]/20'}`}>
          <Navigation className="w-4 h-4" />
        </div>
        <div>
          <div className="font-mono text-xs font-bold text-slate-900 tracking-tight">{bus}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">{from} <span className="mx-1 text-slate-300">→</span> {to}</div>
        </div>
      </div>
      <div className={`text-[9px] font-bold tracking-wide px-2.5 py-1 rounded-md border transition-colors ${isPacked ? 'bg-[#FFC857]/10 text-[#E5A822] border-[#FFC857]/20 group-hover:border-[#FFC857]/40' : 'bg-[#2EE59D]/10 text-[#00B060] border-[#2EE59D]/20 group-hover:border-[#2EE59D]/40'}`}>
        • {status.toUpperCase()}
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
