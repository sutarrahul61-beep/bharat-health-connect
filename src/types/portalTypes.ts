export type DocumentCategory =
  | 'Medical Reports'
  | 'Blood Reports'
  | 'MRI'
  | 'CT Scan'
  | 'X-Ray'
  | 'Prescriptions'
  | 'Doctor Reports'
  | 'Passport'
  | 'Previous Medical Records'
  | 'Hospital Documents'
  | 'Treatment Estimate'
  | 'Appointment Letter'
  | 'Visa Documents'
  | 'Travel Documents'
  | 'Insurance Documents'
  | 'Other';

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  'Medical Reports',
  'Blood Reports',
  'MRI',
  'CT Scan',
  'X-Ray',
  'Prescriptions',
  'Doctor Reports',
  'Passport',
  'Previous Medical Records',
  'Hospital Documents',
  'Treatment Estimate',
  'Appointment Letter',
  'Visa Documents',
  'Travel Documents',
  'Insurance Documents',
  'Other',
];

export interface PatientUserSession {
  token: string;
  patientId: string;
  fullName: string;
  email: string;
  mobile: string;
  avatar?: string;
  loginMethod: 'email' | 'mobile_otp';
  loginTime: string;
}

export interface PatientDocumentItem {
  id: string;
  patientId: string;
  name: string;
  category: DocumentCategory;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  uploadedBy: 'patient' | 'hospital' | 'coordinator';
  uploadedByName: string;
  hospitalId?: string;
  status: 'Verified' | 'Under Review' | 'Pending Review' | 'Additional Info Required';
  notes?: string;
  fileData?: string; // base64 or mock url
}

export type TreatmentTimelineStageId =
  | 'NEW_PATIENT'
  | 'DOCUMENTS_RECEIVED'
  | 'HOSPITAL_REVIEW'
  | 'COST_ESTIMATE'
  | 'APPOINTMENT'
  | 'VISA'
  | 'TRAVEL'
  | 'ADMISSION'
  | 'TREATMENT'
  | 'DISCHARGE'
  | 'FOLLOW_UP';

export interface TreatmentTimelineStageInfo {
  id: TreatmentTimelineStageId;
  label: string;
  stepNumber: number;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  completedDate?: string;
  notes?: string;
}

export interface PatientAppointmentItem {
  id: string;
  patientId: string;
  patientName: string;
  hospitalId: string;
  hospitalName: string;
  doctor: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'Video Consultation' | 'Hospital OPD' | 'Pre-Op Evaluation' | 'Follow-up';
  location: string;
  status: 'Confirmed' | 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  instructions?: string;
  meetingLink?: string;
  proposedByHospital?: boolean;
}

export interface PatientPaymentItem {
  id: string;
  patientId: string;
  invoiceNumber: string;
  treatment: string;
  hospitalName: string;
  amount: number;
  currency: string;
  paymentStatus: 'Paid' | 'Pending' | 'Partial' | 'Refunded';
  paymentDate?: string;
  dueDate?: string;
  receiptNumber?: string;
  description: string;
}

export interface PortalMessageItem {
  id: string;
  patientId: string;
  hospitalId?: string;
  senderType: 'patient' | 'coordinator' | 'hospital' | 'system';
  senderName: string;
  senderRole?: string;
  recipientType: 'patient' | 'coordinator' | 'hospital';
  message: string;
  timestamp: string;
  attachmentName?: string;
  attachmentUrl?: string;
  read: boolean;
}

// -------------------------------------------------------------
// HOSPITAL PORTAL TYPES
// -------------------------------------------------------------

export interface HospitalAccountUser {
  id: string;
  hospitalId: string;
  hospitalName: string;
  name: string;
  email: string;
  role: 'Hospital Coordinator' | 'Chief Medical Officer' | 'International Liaison' | 'Records Officer';
  phone: string;
  avatar?: string;
}

export interface HospitalSession {
  token: string;
  user: HospitalAccountUser;
  loginTime: string;
}

export interface HospitalOrganizationProfile {
  id: string; // e.g. HOSP-MIRAJ-001
  name: string;
  logo?: string;
  coverImage?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  emergencyContact: string;
  internationalPatientContact: string;
  accreditations: string[];
  departments: string[];
  facilities: string[];
  specialities: string[];
  treatments: string[];
  doctorsCount: number;
  operationTheatres: number;
  icuBeds: number;
  totalBeds: number;
  internationalPatientServices: string[];
  languagesSupported: string[];
  airportAssistance: boolean;
  accommodationAssistance: boolean;
  visaAssistance: boolean;
  insuranceSupport: boolean;
  isApprovedByAdmin: boolean;
  notes?: string;
}

export interface HospitalTreatmentEstimate {
  id: string;
  patientId: string;
  patientName: string;
  hospitalId: string;
  hospitalName: string;
  treatment: string;
  doctor: string;
  estimatedCost: number;
  currency: 'INR' | 'USD' | 'AED' | 'BDT';
  expectedStayDays: number;
  expectedTreatmentDurationDays: number;
  preRequirements: string;
  postRequirements: string;
  validityDate: string;
  additionalChargesDetails: string;
  notes: string;
  status: 'Submitted' | 'Admin Approved' | 'Official' | 'Rejected';
  createdAt: string;
  createdByHospitalUserId: string;
  createdByHospitalUserName: string;
  adminApprovalNotes?: string;
}
