import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar({ userName = "Guest", onLogout }: { userName?: string, onLogout?: () => void }) {
  const initials = userName.substring(0, 2).toUpperCase();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0057FF] rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#0057FF]/30">
            N
          </div>
          <span className="font-semibold tracking-tight text-slate-900 text-xl hidden sm:block">NAVIGO</span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-xl px-2 py-1.5 rounded-full border border-slate-200/50 shadow-sm">
          <NavLink href="#overview">Overview</NavLink>
          <NavLink href="#navigation">Navigation</NavLink>
          <NavLink href="#fleet">Fleet</NavLink>
          <NavLink href="#analytics">Analytics</NavLink>
          <NavLink href="#technology">Technology</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/dashboard" className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-md">
            Goto Maps <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Profile Icon with Dropdown */}
          <div className="relative group hidden sm:block">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#0057FF] to-[#00D6FF] text-white shadow-md shadow-[#0057FF]/20 cursor-pointer hover:scale-105 active:scale-95 transition-all border-2 border-white">
              <span className="text-sm font-bold">{initials}</span>
            </div>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm text-slate-900 font-bold">{userName}</p>
                <p className="text-xs text-slate-500 font-medium truncate">user@navigo.com</p>
              </div>
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium cursor-pointer">
                  Profile Settings
                </button>
                <button 
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-900 active:scale-95 transition-all z-50"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 flex flex-col gap-2 md:hidden z-40"
          >
            <MobileNavLink href="#overview" onClick={() => setIsMobileMenuOpen(false)}>Overview</MobileNavLink>
            <MobileNavLink href="#navigation" onClick={() => setIsMobileMenuOpen(false)}>Navigation</MobileNavLink>
            <MobileNavLink href="#fleet" onClick={() => setIsMobileMenuOpen(false)}>Fleet</MobileNavLink>
            <MobileNavLink href="#analytics" onClick={() => setIsMobileMenuOpen(false)}>Analytics</MobileNavLink>
            <div className="h-px w-full bg-slate-100 my-2" />
            <Link 
              href="/dashboard" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-3 rounded-xl text-sm font-bold shadow-md"
            >
              Goto Maps <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all active:bg-slate-100"
    >
      {children}
    </a>
  );
}
