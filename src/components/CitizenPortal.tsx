import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapComponent } from './MapComponent';
import { 
  FilePlus, 
  ListFilter, 
  MapPin, 
  CheckCircle, 
  ChevronRight, 
  Droplets,
  X,
  ArrowLeft,
  Camera
} from 'lucide-react';
import type { IssueType, StatusType } from '../types';

export const CitizenPortal: React.FC = () => {
  const { 
    waterbodies, 
    complaints, 
    activeCitizenTab, 
    setActiveCitizenTab,
    selectedComplaintId,
    setSelectedComplaintId,
    submitComplaint,
    currentUser,
    logout
  } = useApp();

  const [selectedWaterbodyId, setSelectedWaterbodyId] = useState<string>('wb-001');
  const [issueType, setIssueType] = useState<IssueType>('Land Filling');
  const [description, setDescription] = useState<string>('Construction material, soil debris, and land filling activity observed near the eastern bund edge of the wetland.');
  const [dateObserved, setDateObserved] = useState<string>('2026-09-25');
  const [citizenName, setCitizenName] = useState<string>(currentUser?.name || 'Srinivasan K.');
  const [citizenPhone, setCitizenPhone] = useState<string>(currentUser?.phone || '+91 98401 23456');
  const [pickedLat, setPickedLat] = useState<number>(12.9372);
  const [pickedLng, setPickedLng] = useState<number>(80.2173);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState<boolean>(false);
  const [evidenceImages, setEvidenceImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800'
  ]);
  const [submittedResultId, setSubmittedResultId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEvidenceImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComp = submitComplaint({
      waterbodyId: selectedWaterbodyId,
      issueType,
      description,
      dateSubmitted: '25 Sep 2026',
      citizenName,
      citizenPhone,
      latitude: pickedLat,
      longitude: pickedLng,
      evidenceImages
    });
    setSubmittedResultId(newComp.id);
  };

  const selectedComplaintObj = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  const getStatusStepIndex = (status: StatusType) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Under Review': return 1;
      case 'Assigned': return 2;
      case 'Field Inspection': return 3;
      case 'Action Taken': return 4;
      case 'Resolved': return 5;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* CITIZEN SUB-NAVBAR HEADER */}
      <nav className="bg-white border-b border-slate-200 sticky top-[65px] z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-teal-600" /> Citizen Portal
            </span>
            <span className="text-xs bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold border border-teal-200">
              Logged in: {currentUser?.name || 'Citizen'}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveCitizenTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCitizenTab === 'dashboard' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveCitizenTab('report')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCitizenTab === 'report' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Report Issue
            </button>
            <button
              onClick={() => setActiveCitizenTab('my-complaints')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCitizenTab === 'my-complaints' || activeCitizenTab === 'details' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              My Complaints
            </button>
            <button
              onClick={() => setActiveCitizenTab('waterbodies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCitizenTab === 'waterbodies' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Waterbodies
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCitizenTab('report')}
              className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1.5"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Report Encroachment</span>
            </button>
            <button
              onClick={logout}
              className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition"
              title="Logout of Citizen Portal"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* CITIZEN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* 1. CITIZEN DASHBOARD HOME TAB */}
        {activeCitizenTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#0F2942] to-teal-900 text-white rounded-2xl p-6 sm:p-10 shadow-md">
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/30">
                Civic Water Protection Portal
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold mt-3">
                Protect Tamil Nadu’s Waterbodies
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                Report suspected encroachment, dumping, land filling, construction, or sand mining near waterbodies. Every citizen report is processed by satellite change verification and dispatched for field inspection.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveCitizenTab('report')}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-2"
                >
                  <FilePlus className="w-4 h-4" /> Report an Issue
                </button>
                <button
                  onClick={() => setActiveCitizenTab('my-complaints')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-700 transition flex items-center gap-2"
                >
                  <ListFilter className="w-4 h-4 text-cyan-400" /> View My Complaints
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Active Monitoring Map</h3>
                  <p className="text-xs text-slate-500">Live view of tracked waterbodies & reported complaints in Tamil Nadu</p>
                </div>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {complaints.length} Total Complaints Tracked
                </span>
              </div>
              <MapComponent
                waterbodies={waterbodies}
                complaints={complaints}
                height="380px"
                onSelectComplaint={(cId) => {
                  setSelectedComplaintId(cId);
                  setActiveCitizenTab('details');
                }}
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">Recent Citizen Submissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {complaints.slice(0, 3).map(c => (
                  <div key={c.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 transition">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{c.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'Assigned' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-2">{c.waterbodyName}</h4>
                    <p className="text-xs text-rose-700 font-medium mt-0.5">Issue: {c.issueType}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">{c.description}</p>
                    <button
                      onClick={() => {
                        setSelectedComplaintId(c.id);
                        setActiveCitizenTab('details');
                      }}
                      className="mt-3 text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                    >
                      Track Details & Timeline <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. REPORT COMPLAINT PAGE WITH DEVICE IMAGE UPLOADER */}
        {activeCitizenTab === 'report' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Report Waterbody Encroachment</h1>
              <p className="text-xs text-slate-600 mt-1">
                Fill out the civic grievance form below and attach a photo. Your report will be immediately dispatched to the Authority Portal.
              </p>
            </div>

            {submittedResultId ? (
              <div className="bg-white rounded-xl border border-emerald-200 p-8 text-center shadow-md space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Complaint Submitted & Sent to Authority</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your reference ID has been registered and received on the Authority Dashboard.
                </p>
                <div className="bg-slate-100 p-4 rounded-lg inline-block border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Tracking Reference ID</span>
                  <span className="font-mono text-2xl font-black text-teal-800">{submittedResultId}</span>
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedComplaintId(submittedResultId);
                      setActiveCitizenTab('details');
                    }}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    View Status & Timeline
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedResultId(null);
                    }}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg"
                  >
                    Submit Another Report
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      required
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Waterbody *</label>
                  <select
                    value={selectedWaterbodyId}
                    onChange={(e) => {
                      setSelectedWaterbodyId(e.target.value);
                      const target = waterbodies.find(w => w.id === e.target.value);
                      if (target) {
                        setPickedLat(target.latitude);
                        setPickedLng(target.longitude);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium text-slate-800"
                  >
                    {waterbodies.map(wb => (
                      <option key={wb.id} value={wb.id}>
                        {wb.name} ({wb.district} District — {wb.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Encroachment Location *</label>
                    <button
                      type="button"
                      onClick={() => setIsLocationPickerOpen(!isLocationPickerOpen)}
                      className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {isLocationPickerOpen ? 'Hide Location Map' : 'Select Location on Map'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <span className="text-slate-500 block text-[10px]">Latitude</span>
                      <span className="font-mono font-bold text-slate-800">{pickedLat.toFixed(4)}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <span className="text-slate-500 block text-[10px]">Longitude</span>
                      <span className="font-mono font-bold text-slate-800">{pickedLng.toFixed(4)}</span>
                    </div>
                  </div>

                  {isLocationPickerOpen && (
                    <div className="mt-2 border border-slate-300 rounded-lg overflow-hidden">
                      <div className="bg-teal-50 p-2 text-[11px] text-teal-800 font-medium border-b border-teal-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Click anywhere on the map to pinpoint the exact encroachment spot.
                      </div>
                      <MapComponent
                        waterbodies={waterbodies}
                        complaints={complaints}
                        centerLat={pickedLat}
                        centerLng={pickedLng}
                        zoom={13}
                        interactiveSelectLocation={true}
                        onLocationPicked={(lat, lng) => {
                          setPickedLat(lat);
                          setPickedLng(lng);
                        }}
                        height="260px"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Type *</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value as IssueType)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium text-slate-800"
                  >
                    <option value="Illegal Construction">Illegal Construction</option>
                    <option value="Land Filling">Land Filling</option>
                    <option value="Sand Mining">Sand Mining</option>
                    <option value="Waste Dumping">Waste Dumping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you observed near the waterbody..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date Observed *</label>
                  <input
                    type="date"
                    required
                    value={dateObserved}
                    onChange={(e) => setDateObserved(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* UPLOAD EVIDENCE PICTURE FORM FIELD */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Photo Evidence (Send Picture to Authority) *</label>
                  
                  <label className="border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-xl p-5 text-center bg-teal-50/30 hover:bg-teal-50/70 cursor-pointer block transition">
                    <Camera className="w-8 h-8 text-teal-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-800">Choose Image File from Device</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Click here to upload photos or drag & drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {evidenceImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {evidenceImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                          <img src={imgUrl} alt="evidence preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setEvidenceImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-80 hover:opacity-100 transition shadow"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit & Send Picture to Authority</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3. MY COMPLAINTS LIST */}
        {activeCitizenTab === 'my-complaints' && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">My Tracked Complaints</h1>
                <p className="text-xs text-slate-600 mt-0.5">Monitor resolution status, assigned officers, and inspection reports.</p>
              </div>
              <button
                onClick={() => setActiveCitizenTab('report')}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <FilePlus className="w-3.5 h-3.5" /> Report New Issue
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complaints.map(c => (
                <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                        {c.id}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'Assigned' || c.status === 'Field Inspection' ? 'bg-amber-100 text-amber-800' :
                        c.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mt-3">{c.waterbodyName}</h3>
                    <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                      <p><span className="font-semibold text-slate-700">District:</span> {c.district}</p>
                      <p><span className="font-semibold text-slate-700">Issue:</span> <strong className="text-rose-700">{c.issueType}</strong></p>
                      <p><span className="font-semibold text-slate-700">Submitted:</span> {c.dateSubmitted}</p>
                      {c.assignedOfficer && (
                        <p><span className="font-semibold text-slate-700">Assigned Authority:</span> <strong className="text-slate-900">{c.assignedOfficer} ({c.assignedOfficerRole})</strong></p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-slate-500">Updated: Today</span>
                    <button
                      onClick={() => {
                        setSelectedComplaintId(c.id);
                        setActiveCitizenTab('details');
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition flex items-center gap-1"
                    >
                      <span>View Details</span> <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CITIZEN COMPLAINT DETAILS VIEW */}
        {activeCitizenTab === 'details' && selectedComplaintObj && (
          <div className="space-y-6">
            <button
              onClick={() => setActiveCitizenTab('my-complaints')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Complaints
            </button>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-extrabold text-teal-800 bg-teal-50 px-3 py-1 rounded border border-teal-200">
                    {selectedComplaintObj.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedComplaintObj.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    selectedComplaintObj.status === 'Assigned' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedComplaintObj.status}
                  </span>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-2">{selectedComplaintObj.waterbodyName}</h1>
                <p className="text-xs text-slate-500 mt-0.5">{selectedComplaintObj.district} District &bull; Submitted on {selectedComplaintObj.dateSubmitted}</p>
              </div>

              <div className="text-right text-xs space-y-1">
                <span className="text-slate-500 block">Issue Classification</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 inline-block text-xs">
                  {selectedComplaintObj.issueType}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Grievance Resolution Progress Timeline</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {[
                  { label: 'Complaint Submitted', done: getStatusStepIndex(selectedComplaintObj.status) >= 0 },
                  { label: 'Authority Received', done: getStatusStepIndex(selectedComplaintObj.status) >= 1 },
                  { label: 'Under Review', done: getStatusStepIndex(selectedComplaintObj.status) >= 1 },
                  { label: 'Officer Assigned', done: getStatusStepIndex(selectedComplaintObj.status) >= 2 },
                  { label: 'Field Inspection', done: getStatusStepIndex(selectedComplaintObj.status) >= 3 },
                  { label: 'Resolved', done: getStatusStepIndex(selectedComplaintObj.status) >= 5 },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      step.done ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step.done ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[11px] font-semibold mt-2 ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Complaint Information</h3>
                  <div className="text-xs space-y-2 text-slate-700">
                    <p><span className="font-semibold text-slate-900">Complaint ID:</span> {selectedComplaintObj.id}</p>
                    <p><span className="font-semibold text-slate-900">Waterbody:</span> {selectedComplaintObj.waterbodyName}</p>
                    <p><span className="font-semibold text-slate-900">Issue:</span> {selectedComplaintObj.issueType}</p>
                    <p><span className="font-semibold text-slate-900">Location:</span> {selectedComplaintObj.district} District</p>
                    <p><span className="font-semibold text-slate-900">Submitted:</span> {selectedComplaintObj.dateSubmitted}</p>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-900 block mb-1">Citizen Description:</span>
                      <p className="bg-slate-50 p-3 rounded-lg text-slate-700 text-xs leading-relaxed border border-slate-200">
                        "{selectedComplaintObj.description}"
                      </p>
                    </div>
                    {selectedComplaintObj.assignedOfficer && (
                      <div className="pt-2 border-t border-slate-100 bg-teal-50/60 p-3 rounded-lg border border-teal-200">
                        <span className="font-bold text-teal-900 block mb-0.5">Assigned Officer Details</span>
                        <p><span className="font-semibold">Officer:</span> {selectedComplaintObj.assignedOfficer}</p>
                        <p><span className="font-semibold">Role:</span> {selectedComplaintObj.assignedOfficerRole}</p>
                        <p><span className="font-semibold">Deadline:</span> {selectedComplaintObj.deadline}</p>
                        {selectedComplaintObj.instructions && (
                          <p><span className="font-semibold">Instructions:</span> {selectedComplaintObj.instructions}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Uploaded Citizen Evidence</h3>
                  {selectedComplaintObj.evidenceImages && selectedComplaintObj.evidenceImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {selectedComplaintObj.evidenceImages.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                          <img src={img} alt="Citizen evidence" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No evidence photos attached.</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Complaint Geolocation Map</h3>
                <MapComponent
                  waterbodies={waterbodies}
                  complaints={[selectedComplaintObj]}
                  centerLat={selectedComplaintObj.latitude}
                  centerLng={selectedComplaintObj.longitude}
                  zoom={14}
                  height="380px"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. WATERBODIES LIST TAB */}
        {activeCitizenTab === 'waterbodies' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Tamil Nadu Registered Waterbodies</h1>
              <p className="text-xs text-slate-600 mt-0.5">Browse wetlands, lakes, and reservoirs monitored by satellite intelligence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {waterbodies.map(wb => (
                <div key={wb.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{wb.district}</span>
                      <h3 className="font-bold text-slate-900 text-base">{wb.name}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {wb.type}
                    </span>
                  </div>

                  <div className="mt-3 text-xs space-y-1 text-slate-600">
                    <p>Total Area: <b>{wb.areaHa} ha</b></p>
                    <p>NDWI Change: <strong className={wb.ndwiChange < -0.15 ? 'text-rose-600 font-bold' : 'text-slate-800'}>{wb.ndwiChange}</strong></p>
                    <p>Active Encroachment Cases: <b>{wb.activeCasesCount}</b></p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedWaterbodyId(wb.id);
                      setActiveCitizenTab('report');
                    }}
                    className="mt-4 w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-lg transition text-center border border-teal-200"
                  >
                    Report Issue at this Waterbody
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
