import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Waterbody, Complaint } from '../types';

interface MapComponentProps {
  waterbodies: Waterbody[];
  complaints: Complaint[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  onSelectWaterbody?: (wbId: string) => void;
  onSelectComplaint?: (cId: string) => void;
  interactiveSelectLocation?: boolean;
  onLocationPicked?: (lat: number, lng: number) => void;
  height?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  waterbodies,
  complaints,
  centerLat = 12.9372,
  centerLng = 80.2173,
  zoom = 10,
  onSelectWaterbody,
  onSelectComplaint,
  interactiveSelectLocation = false,
  onLocationPicked,
  height = '400px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const pickedMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([centerLat, centerLng], zoom);

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | WaterWatch TN',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([centerLat, centerLng], zoom);
    }

    const map = mapInstanceRef.current;

    // Clear existing non-tile layers
    map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    // Custom Icon Creators
    const createCustomIcon = (color: string, iconSymbol: string, label: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-8 h-8 rounded-full ${color} text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white transition-transform hover:scale-110">
              ${iconSymbol}
            </div>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
              ${label}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Plot Waterbody Markers (🔵 Blue)
    waterbodies.forEach(wb => {
      const isHighRisk = wb.riskLevel === 'High' || wb.riskLevel === 'Critical';
      const wbIcon = createCustomIcon(
        isHighRisk ? 'bg-amber-600' : 'bg-blue-600',
        '💧',
        `${wb.name} (${wb.type})`
      );

      const marker = L.marker([wb.latitude, wb.longitude], { icon: wbIcon }).addTo(map);

      const circleColor = isHighRisk ? '#ea580c' : '#2563eb';
      L.circle([wb.latitude, wb.longitude], {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.15,
        radius: Math.sqrt(wb.areaHa * 10000) / 2
      }).addTo(map);

      marker.bindPopup(`
        <div class="p-2 font-sans">
          <div class="text-xs font-bold uppercase text-blue-700 tracking-wider">${wb.district} District</div>
          <h4 class="font-bold text-slate-900 text-sm mt-0.5">${wb.name}</h4>
          <p class="text-xs text-slate-600 mt-1">Area: <b>${wb.areaHa} ha</b> | Type: ${wb.type}</p>
          <div class="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
            <span>NDWI Change: <strong class="${wb.ndwiChange < -0.15 ? 'text-red-600 font-bold' : 'text-slate-700'}">${wb.ndwiChange}</strong></span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              wb.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
              wb.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
            }">${wb.riskLevel} Risk</span>
          </div>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectWaterbody) onSelectWaterbody(wb.id);
      });
    });

    // Plot Complaints Markers (🔴 Red / 🟠 Orange / 🟢 Green)
    complaints.forEach(c => {
      let badgeColor = 'bg-rose-600';
      let symbol = '🔴';

      if (c.status === 'Resolved') {
        badgeColor = 'bg-emerald-600';
        symbol = '🟢';
      } else if (c.status === 'Assigned' || c.status === 'Field Inspection') {
        badgeColor = 'bg-amber-500';
        symbol = '🟠';
      }

      const cIcon = createCustomIcon(badgeColor, symbol, `${c.id}: ${c.issueType}`);
      const cMarker = L.marker([c.latitude, c.longitude], { icon: cIcon }).addTo(map);

      cMarker.bindPopup(`
        <div class="p-2 font-sans">
          <div class="flex items-center justify-between gap-2">
            <span class="font-mono text-xs font-bold text-slate-800">${c.id}</span>
            <span class="text-[10px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">${c.status}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-sm mt-1">${c.waterbodyName}</h4>
          <p class="text-xs text-rose-700 font-medium mt-0.5">Issue: ${c.issueType}</p>
          <p class="text-xs text-slate-600 line-clamp-2 mt-1">${c.description}</p>
          ${c.assignedOfficer ? `<div class="mt-2 text-xs text-slate-500">Officer: <b>${c.assignedOfficer}</b></div>` : ''}
        </div>
      `);

      cMarker.on('click', () => {
        if (onSelectComplaint) onSelectComplaint(c.id);
      });
    });

    if (interactiveSelectLocation) {
      const handleMapClick = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (pickedMarkerRef.current) {
          map.removeLayer(pickedMarkerRef.current);
        }
        const pinIcon = createCustomIcon('bg-purple-600', '📍', 'Selected Location');
        pickedMarkerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        if (onLocationPicked) onLocationPicked(lat, lng);
      };

      map.on('click', handleMapClick);
      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [waterbodies, complaints, centerLat, centerLng, zoom, interactiveSelectLocation, onLocationPicked, onSelectComplaint, onSelectWaterbody]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 shadow-xs" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-2 left-2 z-[500] bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-md text-[11px] font-medium text-slate-700 border border-slate-200 shadow-xs flex items-center gap-3">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Waterbody</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span> AI Detected Encroachment</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Assigned Complaint</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span> Resolved</span>
      </div>
    </div>
  );
};
