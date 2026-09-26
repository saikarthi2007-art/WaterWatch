import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Droplets, 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  LogIn,
  LogOut,
  UserCheck,
  ShieldAlert,
  HardHat
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    toastMessage, 
    resetDemoData, 
    currentUser,
    logout
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#0F2942] text-white shadow-md border-b border-slate-800">
      
      {/* Top Banner */}
      <div className="bg-[#091A2B] text-slate-300 px-4 py-1 text-[11px] font-medium flex justify-between items-center border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Government of Tamil Nadu — Water Resources Department & Environmental Protection Agency</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>Sentinel-2 Satellite Feed: <strong className="text-emerald-400">ACTIVE (Live Passes)</strong></span>
          <button 
            onClick={resetDemoData}
            className="flex items-center gap-1 text-slate-300 hover:text-white underline transition"
            title="Reset to initial state"
          >
            <RotateCcw className="w-3 h-3" /> Reset State
          </button>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setRole('LANDING')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                WaterWatch TN
              </span>
              <span className="px-1.5 py-0.5 bg-teal-500/30 text-teal-300 text-[10px] font-bold rounded border border-teal-400/30">
                v2.4 Live
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-normal">
              Waterbody Encroachment Detection & Citizen Portal
            </p>
          </div>
        </div>

        {/* Navigation & Active Session Status */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setRole('LANDING')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              role === 'LANDING'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Home
          </button>

          {/* User Session Info or Sign In Button */}
          {currentUser && role !== 'LOGIN' && role !== 'LANDING' ? (
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
              <span className="flex items-center gap-1.5 text-slate-200">
                {role === 'CITIZEN' && <UserCheck className="w-3.5 h-3.5 text-teal-400" />}
                {role === 'AUTHORITY' && <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />}
                {role === 'OFFICER' && <HardHat className="w-3.5 h-3.5 text-amber-400" />}
                <strong className="text-white">{currentUser.name}</strong>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase font-bold">
                  {role}
                </span>
              </span>

              <button
                onClick={logout}
                className="ml-2 px-2.5 py-1 bg-rose-900/40 hover:bg-rose-900/70 text-rose-200 font-bold text-[11px] rounded border border-rose-800/60 transition flex items-center gap-1"
                title="Sign out of system"
              >
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setRole('LOGIN')}
              className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-950" />
              <span>Sign In / Login</span>
            </button>
          )}

        </div>
      </div>

      {toastMessage && (
        <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-center gap-2 shadow-inner border-t border-emerald-500 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
};
