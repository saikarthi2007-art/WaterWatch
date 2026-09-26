import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Satellite, 
  Cpu, 
  FileText, 
  UserCheck, 
  BellRing, 
  Droplets,
  ChevronRight,
  LogIn
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, waterbodies } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#0F2942] text-white py-20 px-4 sm:px-6 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-teal-900/30 to-slate-900/50 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-6">
            <Satellite className="w-3.5 h-3.5 text-teal-400" />
            <span>Sentinel-2 Earth Observation + AI Water Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Protect Tamil Nadu’s Waterbodies with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Satellite Intelligence</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Detect changes early. Report encroachments. Coordinate field action. Protect our water resources across all districts of Tamil Nadu.
          </p>

          {/* Single Clean Login CTA */}
          <div className="mt-8 flex justify-center items-center">
            <button
              onClick={() => setRole('LOGIN')}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-base rounded-xl shadow-xl hover:shadow-cyan-900/40 transition-all flex items-center gap-2.5 active:scale-95"
            >
              <LogIn className="w-5 h-5 text-slate-950" />
              <span>Sign In / Login</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-xs text-left">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Monitored Lakes</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">3,420+</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">NDWI Resolution</p>
              <p className="text-2xl font-extrabold text-cyan-400 mt-0.5">10 Meters</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI Accuracy</p>
              <p className="text-2xl font-extrabold text-teal-400 mt-0.5">94.2%</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Action Time</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">&lt; 48 Hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SIX FEATURES GRID */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Integrated Civic & Satellite Surveillance System
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Combining European Space Agency Sentinel-2 optics with deep-learning raster analysis and citizen ground reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Satellite className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Satellite Monitoring</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated 5-day cycle Sentinel-2 Multispectral Instrument (MSI) acquisitions capturing Green (B3) and NIR (B8) spectral bands across Tamil Nadu.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">NDWI Change Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Normalized Difference Water Index formula calculation <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-teal-800">(Green - NIR) / (Green + NIR)</code> with raster differencing to detect surface area reductions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">AI Classification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supervised Random Forest Machine Learning pipeline classifying detected land alterations into Land Filling, Illegal Construction, Sand Mining, and Waste Dumping.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Citizen Reporting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mobile-friendly citizen portal enabling rapid complaint submission, geolocation mapping, photo evidence uploads, and real-time tracking code generator.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Authority Assignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Streamlined workflow connecting District Collectors, Revenue Inspectors, PWD Engineers, and Environmental Officers with assigned deadlines & priority flags.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
              <BellRing className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Real-Time Alerts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated push notification dispatch via Ntfy.sh messaging protocol when NDWI values drop beyond critical threshold limit (&lt; -0.15).
            </p>
          </div>
        </div>
      </section>

      {/* CORE WORKFLOW STEPPER DIAGRAM */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900">
              End-to-End Governance & Field Response Workflow
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From space-borne pixel change to ground enforcement in 5 structured phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Detect</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                Sentinel-2 capture + NDWI image differencing flags anomaly area.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Verify</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                Authority compares citizen evidence against satellite overlay.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Assign</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                Case assigned to Revenue Inspector or PWD Survey Officer with deadline.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Act</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                Field officer inspects site, uploads ground evidence, enforces removal.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
                5
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Protect</h4>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                Complaint resolved, waterbody restored, status notified to citizen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE WATERBODIES PREVIEW */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Key Tamil Nadu Waterbodies Monitored</h2>
            <p className="text-sm text-slate-600 mt-1">Real-time status of critical wetlands, lakes and reservoirs.</p>
          </div>
          <button 
            onClick={() => {
              setRole('LOGIN');
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>Sign In to Monitored Systems</span> <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {waterbodies.slice(0, 3).map(wb => (
            <div key={wb.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{wb.district} District</span>
                  <h3 className="font-bold text-slate-900 text-base">{wb.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  wb.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                  wb.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {wb.riskLevel} Risk
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Total Area</span>
                  <strong className="text-slate-800">{wb.areaHa} Ha</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">NDWI Change</span>
                  <strong className={wb.ndwiChange < -0.15 ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                    {wb.ndwiChange}
                  </strong>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setRole('LOGIN');
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition text-center"
                >
                  Sign In to Inspect Satellite Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALLOUT TAGLINE */}
      <footer className="bg-[#091A2B] text-white py-12 px-4 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Droplets className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            “Every waterbody protected today means a safer tomorrow.”
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            WaterWatch TN Civic Portal &bull; Government of Tamil Nadu Water Resources Department
          </p>
        </div>
      </footer>

    </div>
  );
};
