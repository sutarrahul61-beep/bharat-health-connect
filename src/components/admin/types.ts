export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'PATIENT_COORDINATOR'
  | 'DOCTOR_COORDINATOR'
  | 'CONTENT_MANAGER'
  | 'VIEW_ONLY'
  | 'PATIENT'
  | 'Medical Coordinator'
  | 'Hospital Desk'
  | 'Admin Executive'
  | string;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  department?: string;
  token?: string;
  active?: boolean;
  permissions?: string[];
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  user?: string;
  userName?: string;
  role?: string;
  action: string;
  details?: string | any;
  targetRecord?: string;
  targetId?: string;
  route?: string;
  ipAddress?: string;
  ip?: string;
}

export interface AdminSession {
  token: string;
  user: AdminUser;
  authenticatedAt: string;
  expiresAt?: string;
}

export interface Lead {
  id: string;
  referenceId: string;
  patientName: string;
  country: string;
  phone: string;
  email: string;
  treatmentRequired: string;
  preferredHospital?: string;
  reports: string[];
  notes?: string;
  status: string;
  createdAt: string;
}

export interface PatientRecord {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  age?: number;
  gender?: string;
  country: string;
  nationality?: string;
  city?: string;
  phone: string;
  whatsappNumber?: string;
  email: string;
  address?: string;
  stateProvince?: string;
  postalCode?: string;
  preferredLanguage?: string;
  passportNumber?: string;
  visaStatus?: string;
  visaRequired?: boolean;
  accompanyingPersons?: number;
  accommodationRequired?: boolean;
  travelAssistanceRequired?: boolean;
  priority?: string;
  lastContactDate?: string;
  documents?: any[];
  status?: string;
  stage?: string;
  treatmentRequired?: string;
  treatment?: string;
  specialty?: string;
  primaryDiagnosis?: string;
  briefProblem?: string;
  preferredHospital?: string;
  preferredDoctor?: string;
  assignedHospitalId?: string;
  assignedHospitalName?: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  assignedDoctor?: string;
  assignedStaff?: string;
  airportPickupRequired?: boolean;
  leadReferenceId?: string;
  registeredDate?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}
