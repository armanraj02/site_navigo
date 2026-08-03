"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, Users, Navigation, MapPin, 
  Settings, Bell, Search, Filter, 
  MoreVertical, CheckCircle2, AlertTriangle, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { FLEET_KPI, MANGALURU_ROUTES } from "@/lib/demoData";

const STATS = [
  { title: "Active Fleet", value: FLEET_KPI.activeBuses, change: "+12%", trend: "up" },
  { title: "Daily Passengers", value: FLEET_KPI.passengersToday, change: "+5.2%", trend: "up" },
  { title: "Avg. Delay (ETA)", value: FLEET_KPI.averageDelay, change: "-1.1m", trend: "down" },
  { title: "Revenue Today", value: FLEET_KPI.revenueToday, change: "+8.4%", trend: "up" },
];

const FLEET_DATA = MANGALURU_ROUTES.map(route => ({
  id: route.busId,
  driver: route.driverName,
  route: `${route.originName.substring(0,3).toUpperCase()} → ${route.destinationName.substring(0,3).toUpperCase()}`,
  status: route.status === "On Time" ? "Active" : route.status,
  eta: route.delay === "0 mins" ? "On Time" : `+${route.delay}`,
  load: route.occupancy,
  rawStatus: route.status
}));

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col md:flex-row text-slate-900 font-sans">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 md:min-h-screen bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0 relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg mr-3 shadow-md shadow-blue-500/20">
            N
          </div>
          <span className="font-bold tracking-tight text-lg">Navigo Admin</span>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col gap-1">
          <SidebarItem icon={BarChart3} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={Navigation} label="Fleet & Routes" active={activeTab === 'fleet'} onClick={() => setActiveTab('fleet')} />
          <SidebarItem icon={Users} label="Drivers & Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <SidebarItem icon={MapPin} label="Stops Network" active={activeTab === 'stops'} onClick={() => setActiveTab('stops')} />
        </div>

        <div className="p-4 border-t border-slate-100">
          <SidebarItem icon={Settings} label="Settings" active={false} onClick={() => {}} />
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors mt-1 font-medium text-sm">
            ← Exit to Map
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-10">
          <div className="relative w-full max-w-[200px] md:max-w-none md:w-96 mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search fleet, drivers, or routes..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/30 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Fleet Overview</h1>
                <p className="text-sm text-slate-500">Monitor live operations and system performance.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                  Export Report
                </button>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-500 mb-2">{stat.title}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</span>
                    <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.trend === 'up' && stat.change.includes('+') ? 'text-emerald-500' : 'text-emerald-500'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />}
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Active Live Fleet</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Bus ID</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Driver</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Route</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ETA Delay</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Occupancy</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {FLEET_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-mono text-sm font-bold text-slate-900">{row.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-700">{row.driver}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500 font-medium">{row.route}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                            row.status === 'Delayed' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {row.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                            {row.status === 'Delayed' && <AlertTriangle className="w-3 h-3" />}
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${row.eta.includes('+') ? 'text-amber-600' : 'text-slate-500'}`}>{row.eta}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${row.load === '100%' ? 'bg-amber-500' : 'bg-blue-500'}`} 
                                style={{ width: row.load === '-' ? '0%' : row.load }} 
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-500 w-8">{row.load}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
        active 
          ? 'bg-slate-900 text-white shadow-sm' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
      {label}
    </button>
  );
}
