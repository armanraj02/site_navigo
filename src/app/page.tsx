"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { MapExperience } from "@/components/landing/MapExperience";

import { LoginModal } from "@/components/landing/LoginModal";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  // Convert "armanraj02@gmail.com" to "Armanraj02"
  const userName = userEmail ? userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1) : "Guest";

  return (
    <div className="bg-[#F5F7FA] min-h-screen text-slate-900 font-sans selection:bg-[#0057FF] selection:text-white overflow-x-hidden">
      
      <AnimatePresence>
        {!isLoggedIn && <LoginModal onLogin={handleLogin} />}
      </AnimatePresence>

      <Navbar userName={userName} onLogout={() => setIsLoggedIn(false)} />

      {/* SLIDE 1: Static Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
        />
        {/* Soft light gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />

        <div className="relative z-10 flex flex-col items-center pt-32 text-center px-4 w-full h-full">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[9rem] font-bold tracking-tighter mb-6 leading-none text-slate-900 drop-shadow-lg"
          >
            Navigate Smarter.
          </motion.h1>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <a href="/dashboard" className="px-10 py-5 rounded-full bg-[#0057FF] text-white font-semibold tracking-wide hover:bg-[#0046CC] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
              Goto Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 2: Google Maps Experience */}
      <MapExperience fullScreen={false} userName={userName} />


      {/* SLIDE 4: Footer */}
      <Footer />
    </div>
  );
}
