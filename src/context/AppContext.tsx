import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Waterbody, Complaint, Officer, SystemNotification, Role, PriorityType, StatusType, IssueType, User } from '../types';
import { INITIAL_WATERBODIES, INITIAL_COMPLAINTS, INITIAL_OFFICERS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: User | null;
  login: (role: Role, name?: string, email?: string, phone?: string, department?: string) => void;
  logout: () => void;
  waterbodies: Waterbody[];
  complaints: Complaint[];
  officers: Officer[];
  notifications: SystemNotification[];
  selectedComplaintId: string | null;
  setSelectedComplaintId: (id: string | null) => void;
  selectedWaterbodyId: string | null;
  setSelectedWaterbodyId: (id: string | null) => void;
  activeAuthorityTab: string;
  setActiveAuthorityTab: (tab: string) => void;
  activeCitizenTab: string;
  setActiveCitizenTab: (tab: string) => void;
  submitComplaint: (data: Partial<Complaint>) => Complaint;
  assignOfficer: (complaintId: string, officerName: string, officerRole: string, priority: PriorityType, deadline: string, instructions: string) => void;
  updateComplaintStatus: (complaintId: string, newStatus: StatusType, extraData?: Partial<Complaint>) => void;
  triggerNtfyAlert: (waterbodyName: string, district: string, ndwiChange: number, areaHa: number, issue: IssueType, confidence: number) => Promise<boolean>;
  resetDemoData: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_COMPLAINTS = 'waterwatch_tn_complaints_v2';
const LOCAL_STORAGE_KEY_WATERBODIES = 'waterwatch_tn_waterbodies_v2';
const LOCAL_STORAGE_KEY_NOTIFS = 'waterwatch_tn_notifs_v2';
const LOCAL_STORAGE_KEY_USER = 'waterwatch_tn_user_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('LANDING');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    return saved ? JSON.parse(saved) : {
      id: 'usr-001',
      name: 'Srinivasan K.',
      email: 'srinivasan.k@gmail.com',
      phone: '+91 98401 23456',
      role: 'CITIZEN'
    };
  });

  const [activeAuthorityTab, setActiveAuthorityTab] = useState<string>('dashboard');
  const [activeCitizenTab, setActiveCitizenTab] = useState<string>('dashboard');

  const [waterbodies, setWaterbodies] = useState<Waterbody[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WATERBODIES);
    return saved ? JSON.parse(saved) : INITIAL_WATERBODIES;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_COMPLAINTS);
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [officers] = useState<Officer[]>(INITIAL_OFFICERS);

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_NOTIFS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>('WTN-2026-00482');
  const [selectedWaterbodyId, setSelectedWaterbodyId] = useState<string | null>('wb-001');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WATERBODIES, JSON.stringify(waterbodies));
  }, [waterbodies]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const login = (
    targetRole: Role, 
    name = 'Demo User', 
    email = 'user@waterwatchtn.gov.in', 
    phone = '+91 98401 23456', 
    department?: string
  ) => {
    const userObj: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: targetRole,
      department
    };
    setCurrentUser(userObj);
    setRole(targetRole);
    showToast(`Logged in successfully as ${name} (${targetRole} Portal)!`);
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('LOGIN');
    showToast('Logged out of system.');
  };

  const submitComplaint = (data: Partial<Complaint>): Complaint => {
    const nextNum = complaints.length + 483;
    const complaintId = `WTN-2026-${String(nextNum).padStart(5, '0')}`;
    const targetWb = waterbodies.find(w => w.id === data.waterbodyId) || waterbodies[0];

    const newComplaint: Complaint = {
      id: complaintId,
      citizenName: data.citizenName || currentUser?.name || 'Srinivasan K.',
      citizenEmail: data.citizenEmail || currentUser?.email || 'citizen@waterwatchtn.gov.in',
      citizenPhone: data.citizenPhone || currentUser?.phone || '+91 98401 23456',
      waterbodyId: targetWb.id,
      waterbodyName: targetWb.name,
      district: targetWb.district,
      issueType: data.issueType || 'Land Filling',
      description: data.description || 'Observed illegal dumping of debris and soil near waterbody perimeter.',
      latitude: data.latitude || targetWb.latitude + (Math.random() * 0.005 - 0.0025),
      longitude: data.longitude || targetWb.longitude + (Math.random() * 0.005 - 0.0025),
      dateSubmitted: '25 Sep 2026',
      status: 'Submitted',
      priority: 'High',
      evidenceImages: data.evidenceImages && data.evidenceImages.length > 0 
        ? data.evidenceImages 
        : ['https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800'],
      aiData: {
        ndwiPrev: targetWb.previousNdwi,
        ndwiCurr: targetWb.currentNdwi,
        ndwiChange: targetWb.ndwiChange,
        changedAreaHa: targetWb.changedAreaHa,
        threshold: -0.15,
        classification: data.issueType || 'Land Filling',
        confidence: 94.2,
        riskLevel: targetWb.riskLevel
      }
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setSelectedComplaintId(newComplaint.id);

    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      waterbodyName: targetWb.name,
      district: targetWb.district,
      ndwiChange: targetWb.ndwiChange,
      affectedAreaHa: targetWb.changedAreaHa,
      classification: newComplaint.issueType,
      confidence: 94.2,
      date: '25 Sep 2026 Just Now',
      read: false,
      ntfyDelivered: true
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Complaint ${complaintId} submitted! Immediately sent to Authority Dashboard.`);
    return newComplaint;
  };

  const assignOfficer = (
    complaintId: string, 
    officerName: string, 
    officerRole: string, 
    priority: PriorityType, 
    deadline: string, 
    instructions: string
  ) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'Assigned' as StatusType,
          assignedOfficer: officerName,
          assignedOfficerRole: officerRole,
          priority: priority,
          deadline: deadline,
          assignedDate: '25 Sep 2026',
          assignedBy: 'Authority Admin / Superintending Engineer',
          instructions: instructions
        };
      }
      return c;
    }));
    showToast(`Case ${complaintId} assigned to ${officerName} with priority ${priority}.`);
  };

  const updateComplaintStatus = (complaintId: string, newStatus: StatusType, extraData?: Partial<Complaint>) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: newStatus,
          ...extraData
        };
      }
      return c;
    }));
    showToast(`Status for ${complaintId} updated to "${newStatus}".`);
  };

  const triggerNtfyAlert = async (
    waterbodyName: string,
    district: string,
    ndwiChange: number,
    areaHa: number,
    issue: IssueType,
    confidence: number
  ): Promise<boolean> => {
    try {
      const topic = 'waterwatch_tn_alerts_demo';
      const payload = `🚨 ENCROACHMENT ALERT: ${waterbodyName} (${district})\nIssue: ${issue}\nNDWI Change: ${ndwiChange}\nAffected: ${areaHa} ha\nConfidence: ${confidence}%`;
      
      fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        body: payload,
        headers: { 'Title': `WaterWatch TN Alert - ${waterbodyName}` }
      }).catch(err => console.log('ntfy note:', err));

      showToast(`ntfy.sh Alert Broadcasted to topic 'waterwatch_tn_alerts_demo'!`);
      return true;
    } catch {
      showToast(`Alert created in system local buffer.`);
      return true;
    }
  };

  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_COMPLAINTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_WATERBODIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_NOTIFS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    setWaterbodies(INITIAL_WATERBODIES);
    setComplaints(INITIAL_COMPLAINTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUser({
      id: 'usr-001',
      name: 'Srinivasan K.',
      email: 'srinivasan.k@gmail.com',
      phone: '+91 98401 23456',
      role: 'CITIZEN'
    });
    setSelectedComplaintId('WTN-2026-00482');
    setSelectedWaterbodyId('wb-001');
    showToast('Demo state reset to initial default state.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        login,
        logout,
        waterbodies,
        complaints,
        officers,
        notifications,
        selectedComplaintId,
        setSelectedComplaintId,
        selectedWaterbodyId,
        setSelectedWaterbodyId,
        activeAuthorityTab,
        setActiveAuthorityTab,
        activeCitizenTab,
        setActiveCitizenTab,
        submitComplaint,
        assignOfficer,
        updateComplaintStatus,
        triggerNtfyAlert,
        resetDemoData,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
