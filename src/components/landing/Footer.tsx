import React from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white text-slate-600 font-sans pt-16 pb-8 px-6 md:px-16 border-t border-slate-200">
      {/* Scroll Up Button */}
      <div className="w-full flex justify-center mb-16">
        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-slate-500 group-hover:text-slate-900 transition-colors">Scroll up</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        
        {/* Left Section: Region */}
        <div className="flex-1">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Current Region / Language</h4>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 bg-white flex items-center justify-center shadow-sm">
              {/* Simple India Flag CSS */}
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-1/3 bg-[#FF9933]" />
                <div className="w-full h-1/3 bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full border border-[#000080]" />
                </div>
                <div className="w-full h-1/3 bg-[#138808]" />
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-900">India / English</span>
            <button className="text-sm text-[#0057FF] hover:text-[#0046CC] transition-colors ml-2 font-medium">
              Change
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact</h4>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Get in touch</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Subscribe to newsletter</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</h4>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Career</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Global Partnership Council</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Compliance</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Sustainability</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Newsroom & Press</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Navigo on the web</h4>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Navigo Homepage</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Route Planner</Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-[#0057FF] font-medium transition-colors w-fit">Find Live Buses</Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Socials & App Badges */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-200">
        
        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.163 0 7.398 2.967 7.398 6.923 0 4.136-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/>
            </svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </Link>
        </div>

        {/* App Buttons */}
        <div className="flex items-center gap-4">
          <Link href="#" className="h-10 px-4 bg-slate-900 hover:bg-[#0057FF] border border-transparent rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
            <svg viewBox="0 0 512 512" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider leading-none mb-0.5 text-slate-300">Get it on</span>
              <span className="text-sm font-semibold leading-none text-white">Google Play</span>
            </div>
          </Link>
          
          <Link href="#" className="h-10 px-4 bg-slate-900 hover:bg-[#0057FF] border border-transparent rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
            <svg viewBox="0 0 384 512" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider leading-none mb-0.5 text-slate-300">Download on the</span>
              <span className="text-sm font-semibold leading-none text-white">App Store</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
