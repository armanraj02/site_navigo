"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, EyeOff, Bus, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  onLogin: (email: string) => void;
}

export function LoginModal({ onLogin }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"passenger" | "driver">("passenger");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [busId, setBusId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (activeTab === "passenger") {
        onLogin(email || "guest@navigo.com");
      } else {
        // Driver login - route to driver dashboard directly
        router.push("/dashboard/driver");
      }
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    // Open a popup window to simulate real OAuth flow
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const popup = window.open(
      "", 
      "SocialLoginPopup", 
      `width=${width},height=${height},top=${top},left=${left},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`
    );

    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Sign in with ${provider}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #ffffff; color: #1e293b; }
              .loader { border: 3px solid #f3f4f6; border-top: 3px solid #3b82f6; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin-bottom: 16px; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              h2 { margin: 0 0 8px 0; font-size: 20px; font-weight: 600; }
              p { margin: 0; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="loader"></div>
            <h2>Connecting to ${provider}...</h2>
            <p>Please wait while we securely authenticate your account.</p>
          </body>
        </html>
      `);
      
      setIsLoading(true);
      
      // Simulate network request duration
      setTimeout(() => {
        popup.close();
        onLogin(`${provider.toLowerCase()}@navigo.com`);
      }, 1500);
    } else {
      // Fallback if popup blocker is enabled
      setIsLoading(true);
      setTimeout(() => {
        onLogin(`${provider.toLowerCase()}@navigo.com`);
      }, 1500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image (Same as Hero to make it look like it's overlaid) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      />
      {/* Heavy Blur Overlay to focus on the login card */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl" />

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-[#0057FF]/10 border border-white/50 flex flex-col items-center"
      >
        {/* Role Tabs */}
        <div className="w-full bg-slate-100 p-1 rounded-2xl flex relative mb-8">
          <div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: activeTab === "passenger" ? "translateX(4px)" : "translateX(calc(100% + 4px))" }}
          />
          <button 
            type="button"
            onClick={() => setActiveTab("passenger")}
            className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${activeTab === "passenger" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
          >
            Passenger
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("driver")}
            className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${activeTab === "driver" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
          >
            Driver
          </button>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans tracking-tight">
          {activeTab === "passenger" ? "Sign in with email" : "Driver Portal"}
        </h2>
        <p className="text-sm text-slate-500 text-center mb-8 px-4 leading-relaxed font-medium">
          {activeTab === "passenger" 
            ? "Track your bus, plan routes, and get live ETA directly to your phone." 
            : "Broadcast your GPS and manage your active route schedule."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {activeTab === "passenger" ? (
              <motion.div 
                key="passenger-fields"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200/60 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0057FF]/40 focus:bg-white transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    className="w-full bg-slate-50/80 border border-slate-200/60 rounded-xl py-3 pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0057FF]/40 focus:bg-white transition-colors"
                  />
                  <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="driver-fields"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <Bus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Bus ID (e.g. KA-01-M-1122)" 
                    required
                    value={busId}
                    onChange={(e) => setBusId(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-200/60 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0057FF]/40 focus:bg-white transition-colors uppercase"
                  />
                </div>

                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="Security PIN" 
                    required
                    className="w-full bg-slate-50/80 border border-slate-200/60 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0057FF]/40 focus:bg-white transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full flex justify-end mb-2">
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              {activeTab === "passenger" ? "Forgot password?" : "Driver Support"}
            </a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full text-white rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-colors shadow-lg relative overflow-hidden ${activeTab === "passenger" ? "bg-[#18181B] hover:bg-black" : "bg-[#0057FF] hover:bg-[#0046CC]"}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              activeTab === "passenger" ? "Get Started" : "Start Shift"
            )}
          </button>
        </form>

        {/* Social Icons (Only for Passenger) */}
        <AnimatePresence>
          {activeTab === "passenger" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full overflow-hidden"
            >
              <div className="w-full flex items-center justify-between gap-4 my-6">
                <div className="h-[1px] flex-1 bg-slate-200 border-dashed border-t" />
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Or sign in with</span>
                <div className="h-[1px] flex-1 bg-slate-200 border-dashed border-t" />
              </div>

              <div className="w-full flex justify-center gap-4">
                <button type="button" onClick={() => handleSocialLogin('Google')} disabled={isLoading} className="flex-1 bg-white border border-slate-200/80 rounded-xl py-3 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.37 10H12V14.26H17.93C17.67 15.68 16.89 16.88 15.69 17.67V20.45H19.26C21.35 18.52 22.56 15.65 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C14.97 23 17.46 22.01 19.26 20.45L15.69 17.67C14.71 18.33 13.46 18.73 12 18.73C9.17 18.73 6.78 16.82 5.91 14.27H2.23V17.13C4.03 20.7 7.73 23 12 23Z" fill="#34A853"/>
                    <path d="M5.91 14.27C5.69 13.61 5.56 12.89 5.56 12.15C5.56 11.41 5.69 10.69 5.91 10.03V7.17H2.23C1.49 8.65 1.05 10.35 1.05 12.15C1.05 13.95 1.49 15.65 2.23 17.13L5.91 14.27Z" fill="#FBBC05"/>
                    <path d="M12 5.57C13.62 5.57 15.07 6.13 16.21 7.21L19.34 4.08C17.45 2.32 14.97 1.3 12 1.3C7.73 1.3 4.03 3.6 2.23 7.17L5.91 10.03C6.78 7.48 9.17 5.57 12 5.57Z" fill="#EA4335"/>
                  </svg>
                </button>
                <button type="button" onClick={() => handleSocialLogin('Facebook')} disabled={isLoading} className="flex-1 bg-white border border-slate-200/80 rounded-xl py-3 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm text-[#1877F2] disabled:opacity-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0C5.373 0 0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.562H7.078V12.073H10.125V9.412C10.125 6.388 11.916 4.717 14.657 4.717C15.97 4.717 17.344 4.953 17.344 4.953V7.935H15.831C14.339 7.935 13.875 8.87 13.875 9.831V12.073H17.203L16.67 15.562H13.875V24C19.612 23.094 24 18.1 24 12.073Z" />
                  </svg>
                </button>
                <button type="button" onClick={() => handleSocialLogin('Apple')} disabled={isLoading} className="flex-1 bg-white border border-slate-200/80 rounded-xl py-3 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm text-black disabled:opacity-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-1.97.04-3.805 1.169-4.821 2.955-2.057 3.593-.526 8.91 1.487 11.83 1.01 1.455 2.213 3.093 3.792 3.037 1.517-.058 2.083-.984 3.905-.984 1.802 0 2.33.984 3.923.963 1.631-.02 2.66-1.472 3.65-2.934 1.157-1.705 1.634-3.357 1.655-3.444-.034-.015-3.21-1.238-3.242-4.947-.027-3.111 2.534-4.607 2.646-4.673-1.464-2.146-3.734-2.438-4.542-2.476-2.03-.238-4.04 1.163-5.111 1.163-.122 0-.251-.013-.38-.05zm.14-1.393c.846 0 1.94-.535 2.527-1.265.545-.678.93-1.639.816-2.585-.75.032-1.785.51-2.385 1.222-.533.633-.993 1.611-.864 2.535.803.064 1.06.093 1.906.093z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
}
