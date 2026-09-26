import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapComponent } from './MapComponent';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  ShieldAlert, 
  Cpu, 
  FileText, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Layers, 
  UserCheck, 
  Send, 
  HardHat,
  LogOut
} from 'lucide-react';
import type { PriorityType } from '../types';

export const AuthorityPortal: React.FC = () => {
  const { 
    waterbodies, 
    complaints, 
    officers, 
    activeAuthorityTab, 
    setActiveAuthorityTab,
    selectedComplaintId,
    setSelectedComplaintId,
    selectedWaterbodyId,
    setSelectedWaterbodyId,
    assignOfficer,
    updateComplaintStatus,
    triggerNtfyAlert,
    currentUser,
    logout
  } = useApp();

  const currentComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];
  const currentWaterbody = waterbodies.find(w => w.id === selectedWaterbodyId) || waterbodies[0];

  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [assigneeName, setAssigneeName] = useState<string>('Rajesh Kumar');
  const [assigneeRole, setAssigneeRole] = useState<string>('Field Officer');
  const [assignPriority, setAssignPriority] = useState<PriorityType>('High');
  const [assignDeadline, setAssignDeadline] = useState<string>('2026-09-28');
  const [assignInstructions, setAssignInstructions] = useState<string>(
    'Inspect the affected waterbody boundary near Medavakkam Link Road, verify the detected land filling, and collect GPS survey markers.'
  );

  const [ndwiMapMode, setNdwiMapMode] = useState<'prev' | 'curr' | 'diff'>('diff');

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentComplaint) return;
    assignOfficer(
      currentComplaint.id,
      assigneeName,
      assigneeRole,
      assignPriority,
      assignDeadline,
      assignInstructions
    );
    setIsAssignModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* AUTHORITY TOP SUB-NAVBAR */}
      <nav className="bg-[#0A1E30] text-white border-b border-slate-800 sticky top-[65px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight block">
                WaterWatch TN — Authority Dashboard
              </span>
              <span className="text-[10px] text-cyan-300 font-semibold">
                Officer: {currentUser?.name || 'PWD Admin'} ({currentUser?.department || 'Water Resources Dept'})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-xs py-1">
            <button
              onClick={() => setActiveAuthorityTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'dashboard' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveAuthorityTab('ai-detection')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'ai-detection' || activeAuthorityTab === 'ndwi-analysis' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              AI Detection
            </button>
            <button
              onClick={() => setActiveAuthorityTab('complaints')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'complaints' || activeAuthorityTab === 'review' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Citizen Complaints ({complaints.length})
            </button>
            <button
              onClick={() => setActiveAuthorityTab('assignments')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'assignments' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveAuthorityTab('waterbody-details')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'waterbody-details' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Waterbodies
            </button>
            <button
              onClick={() => setActiveAuthorityTab('officers')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'officers' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Officers
            </button>
            <button
              onClick={() => setActiveAuthorityTab('alerts')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                activeAuthorityTab === 'alerts' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Alerts & Escalations
            </button>
          </div>

          <button
            onClick={logout}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition border border-slate-700 flex items-center gap-1"
            title="Logout of Authority Dashboard"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" /> Logout
          </button>
        </div>
      </nav>

      {/* AUTHORITY MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* 1. AUTHORITY DASHBOARD OVERVIEW TAB */}
        {activeAuthorityTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Detected Changes</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">128</p>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">↑ 12 new Sentinel passes</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Citizen Complaints</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{complaints.length}</p>
                  <span className="text-[11px] text-cyan-600 font-semibold mt-1 inline-block">Received with pictures</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Assignment</p>
                  <p className="text-3xl font-black text-amber-600 mt-1">
                    {complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length}
                  </p>
                  <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">Requires officer assignment</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overdue Cases</p>
                  <p className="text-3xl font-black text-rose-600 mt-1">6</p>
                  <span className="text-[11px] text-rose-600 font-semibold mt-1 inline-block">Deadline exceeded</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 text-white rounded-xl p-6 border border-rose-900/60 shadow-md flex flex-wrap justify-between items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="font-extrabold text-sm uppercase text-rose-400 tracking-wider">🚨 New Encroachment Alert & Citizen Photo Received</span>
                </div>
                <h3 className="text-xl font-black">Pallikaranai Wetland (Chengalpattu District)</h3>
                <p className="text-xs text-slate-300">
                  NDWI Change: <strong className="text-rose-400 font-bold">-0.23</strong> &bull; Affected Area: <strong className="text-white">2.4 ha</strong> &bull; ML Classification: <strong className="text-amber-300">Land Filling (94.2% Confidence)</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedComplaintId('WTN-2026-00482');
                  setActiveAuthorityTab('review');
                }}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5"
              >
                <span>Review Citizen Picture & Assign</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">District Satellite & Complaint GIS Map</h3>
                    <p className="text-xs text-slate-500">Live overlay of waterbodies, AI detection anomalies, and citizen complaints</p>
                  </div>
                  <button 
                    onClick={() => setActiveAuthorityTab('ai-detection')}
                    className="text-xs font-semibold text-cyan-700 hover:underline"
                  >
                    View Satellite Raster
                  </button>
                </div>
                <MapComponent
                  waterbodies={waterbodies}
                  complaints={complaints}
                  height="420px"
                  onSelectComplaint={(cId) => {
                    setSelectedComplaintId(cId);
                    setActiveAuthorityTab('review');
                  }}
                  onSelectWaterbody={(wId) => {
                    setSelectedWaterbodyId(wId);
                    setActiveAuthorityTab('waterbody-details');
                  }}
                />
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">Grievances Awaiting Action</h3>
                  <p className="text-xs text-slate-500 mb-4">Click to open review and officer assignment screen</p>

                  <div className="space-y-3">
                    {complaints.filter(c => c.status !== 'Resolved').slice(0, 4).map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedComplaintId(c.id);
                          setActiveAuthorityTab('review');
                        }}
                        className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs font-bold text-slate-900">{c.id}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                            {c.priority} Priority
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs mt-1">{c.waterbodyName}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">Issue: {c.issueType} ({c.district})</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveAuthorityTab('complaints')}
                  className="mt-4 w-full py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 transition"
                >
                  View All Complaints ({complaints.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. AI DETECTION & REGISTERED WATERBODIES SECTION */}
        {activeAuthorityTab === 'ai-detection' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Sentinel-2 AI Change Detection Pipeline</h1>
                <p className="text-xs text-slate-600 mt-0.5">Multispectral NDWI change extraction across registered waterbodies in Tamil Nadu.</p>
              </div>
              <button
                onClick={() => setActiveAuthorityTab('ndwi-analysis')}
                className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4" /> Open Full NDWI Raster Visualizer
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Monitored Waterbodies & NDWI Values</span>
                <span className="text-xs text-slate-500">Threshold Limit: <strong>-0.15 NDWI Change</strong></span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Waterbody</th>
                      <th className="p-3">District</th>
                      <th className="p-3 text-right">NDWI Previous</th>
                      <th className="p-3 text-right">NDWI Current</th>
                      <th className="p-3 text-right">NDWI Change</th>
                      <th className="p-3 text-right">Changed Area</th>
                      <th className="p-3">Detection</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {waterbodies.map(wb => (
                      <tr 
                        key={wb.id} 
                        className="hover:bg-slate-50 cursor-pointer transition"
                        onClick={() => {
                          setSelectedWaterbodyId(wb.id);
                          setActiveAuthorityTab('ndwi-analysis');
                        }}
                      >
                        <td className="p-3 font-bold text-slate-900">{wb.name}</td>
                        <td className="p-3 text-slate-600">{wb.district}</td>
                        <td className="p-3 text-right font-mono font-medium">{wb.previousNdwi.toFixed(2)}</td>
                        <td className="p-3 text-right font-mono font-medium">{wb.currentNdwi.toFixed(2)}</td>
                        <td className="p-3 text-right font-mono font-bold text-rose-600">
                          {wb.ndwiChange.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-medium">{wb.changedAreaHa} ha</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            wb.latestDetection === 'Land Filling' ? 'bg-amber-100 text-amber-800' :
                            wb.latestDetection === 'Sand Mining' ? 'bg-rose-100 text-rose-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {wb.latestDetection}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWaterbodyId(wb.id);
                              setActiveAuthorityTab('ndwi-analysis');
                            }}
                            className="px-2.5 py-1 bg-slate-900 text-white font-semibold text-[11px] rounded hover:bg-slate-800 transition"
                          >
                            Analyze Raster
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. NDWI ANALYSIS DETAILED SATELLITE PAGE */}
        {activeAuthorityTab === 'ndwi-analysis' && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Satellite NDWI Raster Analysis</h1>
                <p className="text-xs text-slate-600 mt-0.5">Analyzing spectral band changes for {currentWaterbody.name} ({currentWaterbody.district} District).</p>
              </div>
              <select
                value={selectedWaterbodyId || 'wb-001'}
                onChange={(e) => setSelectedWaterbodyId(e.target.value)}
                className="px-3 py-2 bg-white text-xs font-semibold border border-slate-300 rounded-lg shadow-xs"
              >
                {waterbodies.map(wb => (
                  <option key={wb.id} value={wb.id}>{wb.name} ({wb.district})</option>
                ))}
              </select>
            </div>

            <div className="bg-[#0F2942] text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">McFeeters (1996) Spectral Formula</span>
                <h2 className="text-xl sm:text-2xl font-extrabold mt-1 font-mono text-cyan-300">
                  NDWI = (Green − NIR) / (Green + NIR)
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Calculated using Sentinel-2 Band 3 (Green 560nm) & Band 8 (Near-Infrared 842nm).
                </p>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-700 text-xs space-y-1">
                <p>Previous NDWI: <strong className="text-cyan-400 font-mono">{currentWaterbody.previousNdwi.toFixed(2)}</strong></p>
                <p>Current NDWI: <strong className="text-amber-400 font-mono">{currentWaterbody.currentNdwi.toFixed(2)}</strong></p>
                <p>NDWI Change: <strong className="text-rose-400 font-mono font-bold">{currentWaterbody.ndwiChange.toFixed(2)}</strong></p>
                <p>Changed Area: <strong className="text-white font-bold">{currentWaterbody.changedAreaHa} ha</strong></p>
                <p>Threshold Limit: <strong className="text-slate-400 font-mono">-0.15</strong></p>
                <div className="mt-2 pt-1 border-t border-slate-800">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">
                    Significant Change Detected
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-base">Multispectral Raster Mode Switcher</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNdwiMapMode('prev')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                      ndwiMapMode === 'prev' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Previous Satellite (Jul 2026)
                  </button>
                  <button
                    onClick={() => setNdwiMapMode('curr')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                      ndwiMapMode === 'curr' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Current Satellite (Sep 2026)
                  </button>
                  <button
                    onClick={() => setNdwiMapMode('diff')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                      ndwiMapMode === 'diff' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    NDWI Difference Map
                  </button>
                </div>
              </div>

              <MapComponent
                waterbodies={[currentWaterbody]}
                complaints={complaints.filter(c => c.waterbodyId === currentWaterbody.id)}
                centerLat={currentWaterbody.latitude}
                centerLng={currentWaterbody.longitude}
                zoom={14}
                height="450px"
              />
            </div>
          </div>
        )}

        {/* 4. AUTHORITY COMPLAINT MANAGEMENT TABLE */}
        {activeAuthorityTab === 'complaints' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Citizen Complaints Management</h1>
                <p className="text-xs text-slate-600 mt-0.5">Review citizen filed grievances with pictures, AI cross-verifications, and officer dispatches.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Complaint ID</th>
                      <th className="p-3">Citizen</th>
                      <th className="p-3">Waterbody</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Issue</th>
                      <th className="p-3">Submitted Date</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Assigned Officer</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {complaints.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-mono font-bold text-teal-800">{c.id}</td>
                        <td className="p-3 text-slate-900 font-medium">{c.citizenName}</td>
                        <td className="p-3 font-semibold text-slate-900">{c.waterbodyName}</td>
                        <td className="p-3 text-slate-600">{c.district}</td>
                        <td className="p-3 font-medium text-rose-700">{c.issueType}</td>
                        <td className="p-3 text-slate-500">{c.dateSubmitted}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.priority === 'Critical' ? 'bg-rose-100 text-rose-800' :
                            c.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {c.priority}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                            c.status === 'Assigned' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700">
                          {c.assignedOfficer ? <b>{c.assignedOfficer}</b> : <span className="text-slate-400 italic">Not Assigned</span>}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedComplaintId(c.id);
                              setActiveAuthorityTab('review');
                            }}
                            className="px-3 py-1 bg-cyan-600 text-white font-bold text-[11px] rounded hover:bg-cyan-700 transition"
                          >
                            Review Picture & Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. COMPLAINT REVIEW PAGE (AUTHORITY RECEIVES CITIZEN PICTURE) */}
        {activeAuthorityTab === 'review' && currentComplaint && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  {currentComplaint.id}
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Review Citizen Complaint & Photo Evidence
                </h1>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" /> Assign Officer
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LEFT COLUMN: RECEIVED CITIZEN COMPLAINT & PHOTO */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-600" /> Received Citizen Complaint
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {currentComplaint.dateSubmitted}
                  </span>
                </div>

                <div className="text-xs space-y-2 text-slate-700">
                  <p><span className="font-semibold text-slate-900">Complaint ID:</span> {currentComplaint.id}</p>
                  <p><span className="font-semibold text-slate-900">Citizen:</span> {currentComplaint.citizenName} ({currentComplaint.citizenPhone})</p>
                  <p><span className="font-semibold text-slate-900">Waterbody:</span> {currentComplaint.waterbodyName}</p>
                  <p><span className="font-semibold text-slate-900">Issue Type:</span> <strong className="text-rose-700">{currentComplaint.issueType}</strong></p>
                  <p><span className="font-semibold text-slate-900">Location:</span> {currentComplaint.district} District</p>
                  
                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-semibold text-slate-900 block mb-1">Description:</span>
                    <p className="bg-slate-50 p-3 rounded-lg text-slate-700 leading-relaxed border border-slate-200">
                      "{currentComplaint.description}"
                    </p>
                  </div>
                </div>

                {/* CITIZEN PICTURE RECEIVED BY AUTHORITY */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 text-xs block">Received Citizen Photo Evidence</span>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {currentComplaint.evidenceImages?.length || 0} Picture(s) Received
                    </span>
                  </div>

                  {currentComplaint.evidenceImages && currentComplaint.evidenceImages.length > 0 ? (
                    <div className="space-y-3">
                      {currentComplaint.evidenceImages.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden border-2 border-teal-500 shadow-md bg-slate-900 group relative">
                          <img src={img} alt="Received Citizen Picture" className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-900/90 to-transparent text-white text-[11px] font-semibold flex justify-between">
                            <span>Citizen Uploaded Photo #{idx + 1}</span>
                            <span className="text-teal-300">Verified Image</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No images uploaded.</p>
                  )}
                </div>
              </div>

              {/* MIDDLE COLUMN: MAP */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-600" /> Complaint GIS Location Map
                  </h3>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {currentComplaint.latitude.toFixed(4)}, {currentComplaint.longitude.toFixed(4)}
                  </span>
                </div>

                <MapComponent
                  waterbodies={waterbodies.filter(w => w.id === currentComplaint.waterbodyId)}
                  complaints={[currentComplaint]}
                  centerLat={currentComplaint.latitude}
                  centerLng={currentComplaint.longitude}
                  zoom={14}
                  height="360px"
                />

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                  📍 Marker pinpointed within 50m of recorded Cadastral FTL boundary.
                </div>
              </div>

              {/* RIGHT COLUMN: AI EVIDENCE & ACTIONS */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-600" /> AI & NDWI Evidence
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    Sentinel-2 MSI
                  </span>
                </div>

                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-xs">
                  <p className="flex justify-between">
                    <span className="text-slate-400">NDWI Previous:</span>
                    <strong className="font-mono text-cyan-300">0.61</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">NDWI Current:</span>
                    <strong className="font-mono text-amber-300">0.38</strong>
                  </p>
                  <p className="flex justify-between border-t border-slate-800 pt-1">
                    <span className="text-slate-400">NDWI Change:</span>
                    <strong className="font-mono text-rose-400 font-bold text-sm">-0.23</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Detected Changed Area:</span>
                    <strong className="text-white font-bold">2.4 ha</strong>
                  </p>
                  <p className="flex justify-between border-t border-slate-800 pt-1">
                    <span className="text-slate-400">ML Classification:</span>
                    <strong className="text-amber-300 font-bold">Land Filling</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Confidence Score:</span>
                    <strong className="text-teal-400 font-mono font-bold">94.2%</strong>
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      updateComplaintStatus(currentComplaint.id, 'Under Review');
                      setIsAssignModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm Detection & Assign Officer
                  </button>

                  <button
                    onClick={() => {
                      setIsAssignModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <HardHat className="w-4 h-4" /> Request Field Verification
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ASSIGN OFFICER MODAL */}
        {isAssignModalOpen && currentComplaint && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4 animate-scaleUp">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-600" /> Assign Officer to {currentComplaint.id}
                </h3>
                <button 
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Field / Survey Officer *</label>
                  <select
                    value={assigneeName}
                    onChange={(e) => {
                      setAssigneeName(e.target.value);
                      const off = officers.find(o => o.name === e.target.value);
                      if (off) setAssigneeRole(off.roleTitle);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    {officers.map(off => (
                      <option key={off.id} value={off.name}>
                        {off.name} — {off.roleTitle} ({off.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority Level *</label>
                  <select
                    value={assignPriority}
                    onChange={(e) => setAssignPriority(e.target.value as PriorityType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inspection Deadline *</label>
                  <input
                    type="date"
                    required
                    value={assignDeadline}
                    onChange={(e) => setAssignDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Field Instructions *</label>
                  <textarea
                    rows={3}
                    required
                    value={assignInstructions}
                    onChange={(e) => setAssignInstructions(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Assign Complaint
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 7. ASSIGNMENTS TRACKING LIST */}
        {activeAuthorityTab === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Officer Assignment Tracker</h1>
              <p className="text-xs text-slate-600 mt-0.5">Track field inspections, assigned officers, and pending deadlines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complaints.filter(c => c.assignedOfficer).map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                        {c.id}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-2">{c.waterbodyName}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {c.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-600">
                    <p>Assigned Officer: <strong className="text-slate-900">{c.assignedOfficer} ({c.assignedOfficerRole})</strong></p>
                    <p>Deadline: <strong className="text-rose-700">{c.deadline}</strong></p>
                    <p>Assigned Date: {c.assignedDate}</p>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-700 block">Instructions:</span>
                      <p className="italic text-slate-600">"{c.instructions}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. WATERBODY DETAILS PROFILE PAGE */}
        {activeAuthorityTab === 'waterbody-details' && currentWaterbody && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">{currentWaterbody.name} Profile</h1>
                <p className="text-xs text-slate-600 mt-0.5">{currentWaterbody.district} District &bull; {currentWaterbody.type}</p>
              </div>
              <select
                value={selectedWaterbodyId || 'wb-001'}
                onChange={(e) => setSelectedWaterbodyId(e.target.value)}
                className="px-3 py-2 bg-white text-xs font-semibold border border-slate-300 rounded-lg shadow-xs"
              >
                {waterbodies.map(wb => (
                  <option key={wb.id} value={wb.id}>{wb.name} ({wb.district})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Total Area</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{currentWaterbody.areaHa} ha</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Previous NDWI</span>
                <p className="text-2xl font-black text-cyan-600 mt-1">{currentWaterbody.previousNdwi}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Current NDWI</span>
                <p className="text-2xl font-black text-amber-600 mt-1">{currentWaterbody.currentNdwi}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Active Cases</span>
                <p className="text-2xl font-black text-rose-600 mt-1">{currentWaterbody.activeCasesCount}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-base">Historical Surface Water (NDWI) Index Trend</h3>
                <span className="text-xs font-semibold text-slate-500">Sentinel-2 7-Month Timeline</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentWaterbody.historicalNdwi}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis domain={[0, 1]} stroke="#64748b" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                    <Line type="monotone" dataKey="ndwi" stroke="#0284c7" strokeWidth={3} dot={{ r: 5, fill: '#0284c7' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

        {/* 9. OFFICERS LIST TAB */}
        {activeAuthorityTab === 'officers' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Enforcement Officers Directory</h1>
              <p className="text-xs text-slate-600 mt-0.5">Field Inspectors, Surveyors, and Revenue Officers deployed across districts.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {officers.map(off => (
                <div key={off.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={off.avatar} alt={off.name} className="w-12 h-12 rounded-full object-cover border-2 border-teal-500" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{off.name}</h3>
                      <p className="text-[11px] text-teal-700 font-semibold">{off.roleTitle}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                    <p><span className="font-semibold text-slate-700">Department:</span> {off.department}</p>
                    <p><span className="font-semibold text-slate-700">Contact:</span> {off.contact}</p>
                    <p><span className="font-semibold text-slate-700">Active Cases:</span> <b>{off.activeAssignmentsCount} assigned</b></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. ALERT SYSTEM & ESCALATION SYSTEM */}
        {activeAuthorityTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Real-Time Alert Dispatch (Ntfy.sh Integration)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Broadcast push notification payloads to field officers via ntfy.sh messaging bus.</p>
                </div>

                <button
                  onClick={() => triggerNtfyAlert(
                    'Pallikaranai Wetland',
                    'Chengalpattu',
                    -0.23,
                    2.4,
                    'Land Filling',
                    94.2
                  )}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <Bell className="w-4 h-4" /> Trigger Test Ntfy.sh Alert
                </button>
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1 border border-slate-800">
                <p className="text-teal-400">// Sample Ntfy.sh Payload broadcast</p>
                <p>Topic: <span className="text-amber-300">https://ntfy.sh/waterwatch_tn_alerts_demo</span></p>
                <p>Title: <span className="text-white">WaterWatch TN Alert — Pallikaranai Wetland</span></p>
                <p>Body: <span className="text-rose-400 font-bold">🚨 ENCROACHMENT ALERT: Land Filling (2.4 ha) NDWI drop -0.23</span></p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
