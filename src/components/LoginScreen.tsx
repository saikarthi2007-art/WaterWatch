import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  ShieldAlert, 
  Droplets, 
  Lock, 
  Mail, 
  HardHat, 
  Building2,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, setActiveCitizenTab, setActiveAuthorityTab } = useApp();
  
  const [loginRole, setLoginRole] = useState<'CITIZEN' | 'AUTHORITY' | 'OFFICER'>('CITIZEN');
  const [email, setEmail] = useState<string>('srinivasan.k@gmail.com');
  const [password, setPassword] = useState<string>('citizenPass123!');
  const [department, setDepartment] = useState<string>('Public Works Dept (PWD) Water Resources');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === 'CITIZEN') {
      login('CITIZEN', 'Srinivasan K.', email, '+91 98401 23456');
      setActiveCitizenTab('dashboard');
    } else if (loginRole === 'AUTHORITY') {
      login('AUTHORITY', 'Superintending Engineer', email, '+91 94440 10000', department);
      setActiveAuthorityTab('dashboard');
    } else {
      login('OFFICER', 'Rajesh Kumar (Field Officer)', email, '+91 94440 81234');
    }
  };

  const selectRoleAndAutofill = (roleType: 'CITIZEN' | 'AUTHORITY' | 'OFFICER') => {
    setLoginRole(roleType);
    if (roleType === 'CITIZEN') {
      setEmail('srinivasan.k@gmail.com');
      setPassword('citizenPass123!');
    } else if (roleType === 'AUTHORITY') {
      setEmail('authority.admin@tn.gov.in');
      setPassword('govtAdmin99#');
      setDepartment('Public Works Dept (PWD) Water Resources');
    } else {
      setEmail('rajesh.kumar@pwd.tn.gov.in');
      setPassword('inspectorOfficer45$');
    }
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-slate-100 flex items-center justify-center p-4 sm:p-8 relative">
      
      {/* Container Box: Human Designed Civic Split Screen */}
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto">
        
        {/* LEFT COLUMN: OFFICIAL CIVIC BRANDING BANNER (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F2942] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle civic background texture accents */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Droplets className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Govt Header Emblem & Seal */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-[11px] font-medium text-cyan-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Government of Tamil Nadu Portal
            </div>

            {/* Logo Badge & Branding */}
            <div className="flex items-center gap-3.5 pt-1">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0F2942] shadow-md shrink-0">
                <Droplets className="w-7 h-7 text-[#0F2942]" />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white leading-tight">
                  WaterWatch TN
                </h1>
                <p className="text-xs text-slate-300 font-medium">
                  வாட்டர்வாட்ச் தமிழ்நாடு
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2.5 pt-2">
              <h2 className="text-lg font-bold text-slate-100 leading-snug">
                Satellite Encroachment Detection & Citizen Reporting System
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Unified portal for satellite NDWI change detection, citizen photo reporting, and rapid field officer action across Tamil Nadu waterbodies.
              </p>
            </div>

            {/* Key Civic System Features */}
            <div className="space-y-3 pt-3 border-t border-white/10 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-teal-500/20 text-teal-300 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Sentinel-2 Satellite Analysis</strong>
                  <span className="text-[11px] text-slate-300">Automated NDWI water index spectral differencing.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-cyan-500/20 text-cyan-300 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Citizen Incident Filing</strong>
                  <span className="text-[11px] text-slate-300">Upload ground photos & pinpoint GIS map locations.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-amber-500/20 text-amber-300 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Authority & Field Enforcement</strong>
                  <span className="text-[11px] text-slate-300">Fast-track officer assignment and escalation.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Security Badge */}
          <div className="relative z-10 pt-6 border-t border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              TN State Data Centre Secured
            </span>
            <span className="font-mono text-[10px] text-slate-400">v2.4 Production</span>
          </div>

        </div>

        {/* RIGHT COLUMN: HUMAN-DESIGNED LOGIN FORM (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white text-slate-800 space-y-6">
          
          <div className="space-y-6">
            
            {/* Header Title */}
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Sign In to Account
                </h2>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> Helpdesk: 1800-425-5000
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Select your designated role tab below to enter credentials.
              </p>
            </div>

            {/* TABBED ACCOUNT ROLE SELECTOR (Human Segmented Control) */}
            <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => selectRoleAndAutofill('CITIZEN')}
                className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  loginRole === 'CITIZEN'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <UserCheck className={`w-4 h-4 ${loginRole === 'CITIZEN' ? 'text-teal-600' : 'text-slate-500'}`} /> 
                <span>Citizen</span>
              </button>

              <button
                type="button"
                onClick={() => selectRoleAndAutofill('AUTHORITY')}
                className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  loginRole === 'AUTHORITY'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <ShieldAlert className={`w-4 h-4 ${loginRole === 'AUTHORITY' ? 'text-blue-600' : 'text-slate-500'}`} /> 
                <span>Authority</span>
              </button>

              <button
                type="button"
                onClick={() => selectRoleAndAutofill('OFFICER')}
                className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  loginRole === 'OFFICER'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <HardHat className={`w-4 h-4 ${loginRole === 'OFFICER' ? 'text-amber-600' : 'text-slate-500'}`} /> 
                <span>Inspector</span>
              </button>
            </div>

            {/* Dynamic Role Explanation Banner */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  loginRole === 'CITIZEN' ? 'bg-teal-500' : loginRole === 'AUTHORITY' ? 'bg-blue-600' : 'bg-amber-500'
                }`}></span>
                <span>
                  Logging in as <strong>{loginRole === 'CITIZEN' ? 'Citizen Public User' : loginRole === 'AUTHORITY' ? 'Authority Department Officer' : 'Field Inspection Officer'}</strong>
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
                {loginRole === 'CITIZEN' ? 'Public Portal' : loginRole === 'AUTHORITY' ? 'WRD / TNPCB Portal' : 'Field Work App'}
              </span>
            </div>

            {/* FORM */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              
              {/* Email Field */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5 uppercase text-[11px] tracking-wider">
                  Email Address / Govt ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Department field for Authority */}
              {loginRole === 'AUTHORITY' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5 uppercase text-[11px] tracking-wider">
                    Government Department
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition appearance-none"
                    >
                      <option value="Public Works Dept (PWD) Water Resources">Public Works Dept (PWD) - Water Resources</option>
                      <option value="District Collectorate">District Collectorate / Revenue Office</option>
                      <option value="TNPCB">TN Pollution Control Board (TNPCB)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-slate-700 font-semibold uppercase text-[11px] tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline font-semibold">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F2942] hover:bg-[#15385b] active:bg-[#0a1e31] text-white font-semibold rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-white" />
                  <span>Sign In as {loginRole === 'CITIZEN' ? 'Citizen' : loginRole === 'AUTHORITY' ? 'Authority Officer' : 'Field Inspector'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 ml-1" />
                </button>
              </div>

            </form>
          </div>

          {/* Clean Footer Note */}
          <div className="pt-4 border-t border-slate-200 text-center text-[11px] text-slate-400">
            Protected by TN State Data Centre Security Infrastructure &bull; All logins logged
          </div>

        </div>

      </div>
    </div>
  );
};
