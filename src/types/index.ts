export type Role = 'LANDING' | 'LOGIN' | 'CITIZEN' | 'AUTHORITY' | 'OFFICER';

export type StatusType = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Assigned' 
  | 'Field Inspection' 
  | 'Action Taken' 
  | 'Resolved';

export type PriorityType = 'Low' | 'Medium' | 'High' | 'Critical';

export type IssueType = 
  | 'Illegal Construction' 
  | 'Land Filling' 
  | 'Sand Mining' 
  | 'Waste Dumping' 
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  department?: string;
  badgeId?: string;
}

export interface HistoricalNdwi {
  month: string;
  ndwi: number;
}

export interface Waterbody {
  id: string;
  name: string;
  district: string;
  type: 'Lake' | 'Pond' | 'River' | 'Wetland' | 'Reservoir' | 'Other';
  areaHa: number;
  latitude: number;
  longitude: number;
  lastSatelliteDate: string;
  previousNdwi: number;
  currentNdwi: number;
  ndwiChange: number;
  detectedChangesCount: number;
  activeCasesCount: number;
  resolvedCasesCount: number;
  historicalNdwi: HistoricalNdwi[];
  changedAreaHa: number;
  latestDetection: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface AIData {
  ndwiPrev: number;
  ndwiCurr: number;
  ndwiChange: number;
  changedAreaHa: number;
  threshold: number;
  classification: IssueType;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Complaint {
  id: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  waterbodyId: string;
  waterbodyName: string;
  district: string;
  issueType: IssueType;
  description: string;
  latitude: number;
  longitude: number;
  dateSubmitted: string;
  status: StatusType;
  priority: PriorityType;
  assignedOfficer?: string;
  assignedOfficerRole?: string;
  deadline?: string;
  assignedDate?: string;
  assignedBy?: string;
  instructions?: string;
  evidenceImages: string[];
  fieldEvidenceImages?: string[];
  fieldInspectionNotes?: string;
  fieldInspectionDate?: string;
  actionTakenNotes?: string;
  resolvedDate?: string;
  aiData?: AIData;
}

export interface Officer {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  contact: string;
  activeAssignmentsCount: number;
  avatar: string;
}

export interface SystemNotification {
  id: string;
  waterbodyName: string;
  district: string;
  ndwiChange: number;
  affectedAreaHa: number;
  classification: IssueType;
  confidence: number;
  date: string;
  read: boolean;
  ntfyDelivered?: boolean;
}
