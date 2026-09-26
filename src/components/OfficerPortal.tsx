import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapComponent } from './MapComponent';
import { 
  HardHat, 
  CheckCircle, 
  Upload, 
  FileCheck
} from 'lucide-react';

export const OfficerPortal: React.FC = () => {
  const { 
    complaints, 
    waterbodies, 
    updateComplaintStatus, 
    showToast,
    selectedComplaintId,
    setSelectedComplaintId 
  } = useApp();

  const officerName = 'Rajesh Kumar';

  const assignedComplaints = complaints.filter(
    c => c.assignedOfficer === officerName || c.status === 'Assigned' || c.status === 'Field Inspection' || c.status === 'Action Taken'
  );

  const currentComplaint = complaints.find(c => c.id === selectedComplaintId) || assignedComplaints[0] || complaints[0];

  const [inspectionNotes, setInspectionNotes] = useState<string>(
    'Field inspection conducted on 25 Sep 2026. Measured 2.4 ha soil filling within the high-water line boundary. Survey pins installed.'
  );
  const [actionNotes, setActionNotes] = useState<string>(
    'Stop notice issued under TN Protection of Waterbodies Act. Heavy machinery impounded and soil removal initiated.'
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* OFFICER HEADER */}
      <header className="bg-amber-800 text-white border-b border-amber-900 sticky top-[65px] z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-700 flex items-center justify-center text-white">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-base tracking-tight">
                Field Officer Portal — {officerName}
              </h1>
              <p className="text-[11px] text-amber-200">
                Public Works Dept (PWD) Water Resources Division
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 bg-amber-900/80 text-amber-200 rounded-full font-semibold border border-amber-700">
              Active Cases: {assignedComplaints.length}
            </span>
          </div>
        </div>
      </header>

      {/* OFFICER WORKFLOW CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              My Assigned Inspection Cases
            </h3>

            <div className="space-y-3">
              {assignedComplaints.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedComplaintId(c.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    c.id === currentComplaint?.id 
                      ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-bold text-slate-900">{c.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                      c.status === 'Action Taken' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mt-1">{c.waterbodyName}</h4>
                  <p className="text-xs text-rose-700 font-medium">Issue: {c.issueType}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Deadline: {c.deadline || '2026-09-28'}</p>
                </div>
              ))}
            </div>
          </div>

          {currentComplaint && (
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
              
              <div className="border-b border-slate-200 pb-4 flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                    {currentComplaint.id}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-2">{currentComplaint.waterbodyName}</h2>
                  <p className="text-xs text-slate-500">{currentComplaint.district} District &bull; Issue: {currentComplaint.issueType}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Current Status</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 inline-block mt-0.5">
                    {currentComplaint.status}
                  </span>
                </div>
              </div>

              {currentComplaint.instructions && (
                <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">Authority Instructions</span>
                  <p className="text-slate-200">"{currentComplaint.instructions}"</p>
                  <p className="text-slate-400 text-[11px] pt-1">Deadline: <strong>{currentComplaint.deadline}</strong></p>
                </div>
              )}

              <div>
                <span className="font-bold text-slate-900 text-xs block mb-2">Field Location Map</span>
                <MapComponent
                  waterbodies={waterbodies.filter(w => w.id === currentComplaint.waterbodyId)}
                  complaints={[currentComplaint]}
                  centerLat={currentComplaint.latitude}
                  centerLng={currentComplaint.longitude}
                  zoom={14}
                  height="260px"
                />
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Officer Action Workflow Controls</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      updateComplaintStatus(currentComplaint.id, 'Field Inspection', {
                        fieldInspectionDate: '25 Sep 2026'
                      });
                    }}
                    className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <HardHat className="w-4 h-4" /> 1. Start Inspection
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Field photo evidence uploaded for ${currentComplaint.id}.`);
                    }}
                    className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-4 h-4" /> 2. Upload Field Evidence
                  </button>

                  <button
                    onClick={() => {
                      updateComplaintStatus(currentComplaint.id, 'Action Taken', {
                        actionTakenNotes: actionNotes
                      });
                    }}
                    className="py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <FileCheck className="w-4 h-4" /> 3. Mark Action Taken
                  </button>

                  <button
                    onClick={() => {
                      updateComplaintStatus(currentComplaint.id, 'Resolved', {
                        resolvedDate: '25 Sep 2026',
                        actionTakenNotes: actionNotes
                      });
                    }}
                    className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" /> 4. Resolve Complaint
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Field Inspection Report Notes</label>
                    <textarea
                      rows={2}
                      value={inspectionNotes}
                      onChange={(e) => setInspectionNotes(e.target.value)}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enforcement Action Taken Notes</label>
                    <textarea
                      rows={2}
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </main>
    </div>
  );
};
