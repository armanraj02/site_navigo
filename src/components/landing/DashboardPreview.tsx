"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Users, Map, AlertTriangle, TrendingUp, Cpu, IndianRupee } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 10, rotateY: -10, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    rotateY: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 12,
      mass: 1,
    }
  }
};

const mapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotateX: 5 },
  show: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 15,
      delay: 0.4
    }
  }
};

export function DashboardPreview() {
  return (
    <section className="py-32 relative bg-[#F5F7FA] overflow-hidden">
      {/* Cinematic bloom background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-[#0057FF]/5 to-[#00D6FF]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-900">Absolute command.</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-xl font-medium tracking-wide">
            Intelligence synchronized perfectly across the entire fleet.
          </p>
        </motion.div>

        {/* Floating Dashboard Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-[2.5rem] p-6 bg-slate-100/50 border border-slate-200 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.1)]"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Mac-like Window Controls */}
          <div className="flex items-center gap-3 mb-8 px-4 pt-2 opacity-50">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <div className="w-3 h-3 rounded-full bg-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar KPIs */}
            <div className="md:col-span-3 space-y-6 flex flex-col">
              <motion.div variants={cardVariants} className="h-full">
                <WhiteCard>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-500 text-sm font-bold tracking-wider uppercase">Active Buses</span>
                    <Map className="w-5 h-5 text-[#00D6FF]" />
                  </div>
                  <div className="text-4xl font-bold tracking-tight text-slate-900">1,248</div>
                  <div className="text-xs text-[#00B060] mt-3 font-bold tracking-wide">18,540 trips today</div>
                </WhiteCard>
              </motion.div>

              <motion.div variants={cardVariants} className="h-full">
                <WhiteCard>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-500 text-sm font-bold tracking-wider uppercase">Passengers</span>
                    <Users className="w-5 h-5 text-[#0057FF]" />
                  </div>
                  <div className="text-4xl font-bold tracking-tight text-slate-900">2.4 Lakh</div>
                  <div className="text-xs text-[#00B060] mt-3 font-bold tracking-wide">+15k during peak hours</div>
                </WhiteCard>
              </motion.div>
              
              <motion.div variants={cardVariants} className="flex-1 h-full">
                <WhiteCard className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-500 text-sm font-bold tracking-wider uppercase">AI Analysis</span>
                    <Cpu className="w-5 h-5 text-[#E5A822]" />
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-slate-600 font-medium tracking-wide">On-Time Rate</span>
                        <span className="text-[#00B060] font-bold">98.7%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "98.7%" }}
                          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                          className="bg-[#00B060] h-1 rounded-full" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-slate-600 font-medium tracking-wide">Avg Delay</span>
                        <span className="text-[#E5A822] font-bold">2 mins</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "15%" }}
                          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                          className="bg-[#E5A822] h-1 rounded-full" 
                        />
                      </div>
                    </div>
                  </div>
                </WhiteCard>
              </motion.div>
            </div>

            {/* Main Map / Center Area */}
            <motion.div variants={mapVariants} className="md:col-span-6 relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 min-h-[500px]">
              {/* Fake Map Grid */}
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at center, #cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              {/* Central Radar / Pin */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full border border-[#0057FF]/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-[#0057FF]/10 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="w-4 h-4 rounded-full bg-[#00D6FF] shadow-[0_0_20px_rgba(0,214,255,0.8)]" />
                </div>
                <div className="mt-4 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-xl border border-slate-200 text-center shadow-lg shadow-slate-200/50">
                   <div className="text-xs text-[#E5A822] font-bold mb-1 uppercase tracking-wider">AI Prediction</div>
                   <div className="text-sm font-medium text-slate-800">Traffic expected on NH-66 near Udupi in 18 minutes.</div>
                   <div className="text-xs text-[#00B060] font-semibold mt-1">Suggested Alternate Route active.</div>
                </div>
              </motion.div>
              
            </motion.div>

            {/* Right KPIs */}
            <div className="md:col-span-3 space-y-6 flex flex-col">
              <motion.div variants={cardVariants} className="h-full">
                <WhiteCard>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-500 text-sm font-bold tracking-wider uppercase">Revenue</span>
                    <TrendingUp className="w-5 h-5 text-[#00B060]" />
                  </div>
                  <div className="flex items-center gap-1 text-4xl font-bold tracking-tight text-slate-900">
                    <IndianRupee className="w-8 h-8" /> 18.6L
                  </div>
                  
                  {/* Animated Graph */}
                  <div className="mt-6 flex items-end gap-[2px] h-12">
                    {[4, 7, 5, 8, 12, 10, 16, 14, 20].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(h/20)*100}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.05), type: "spring" }}
                        className="flex-1 bg-[#00B060]/30 rounded-t-sm relative group cursor-pointer hover:bg-[#00B060]/60 transition-colors"
                      />
                    ))}
                  </div>
                </WhiteCard>
              </motion.div>

              <motion.div variants={cardVariants} className="flex-1 h-full">
                <WhiteCard className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-500 text-sm font-bold tracking-wider uppercase">Maintenance</span>
                    <AlertTriangle className="w-5 h-5 text-[#E11D48]" />
                  </div>
                  
                  <div className="text-4xl font-bold tracking-tight mb-4 text-[#E11D48]">12</div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white border border-[#E11D48]/20 hover:border-[#E11D48]/40 transition-colors shadow-sm">
                      <div className="text-sm font-bold text-[#E11D48] tracking-wide mb-1">Bus KA-01 M 2341</div>
                      <div className="text-xs text-slate-600 font-medium leading-relaxed">Bengaluru Depot: Battery degradation</div>
                    </div>
                  </div>
                </WhiteCard>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhiteCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-3xl p-8 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
}
