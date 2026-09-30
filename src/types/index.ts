export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Reports Received'
  | 'Doctor Review'
  | 'Hospital Coordination'
  | 'Estimate Sent'
  | 'Travel Planning'
  | 'Arrived'
  | 'Treatment'
  | 'Follow-up'
  | 'Converted'
  | 'Closed';

export interface LeadSubmission {
  id: string;
  createdAt: string;
  name: string;
  country: string;
  phone: string;
  email: string;
  preferredLanguage?: string;
  treatment: string;
  preferredHospital?: string;
  preferredDoctor?: string;
  message: string;
  uploadedReports: Array<{
    name: string;
    size: number;
    type: string;
  }>;
  status: LeadStatus;
  notes?: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: 'Miraj' | 'Sangli' | string;
  specialties: string[];
  facilities: string[];
  address: string;
  phone: string;
  website: string;
  accreditation: string; // Factual or "Information to be verified"
  accreditations?: string[];
  internationalPatientServices?: string;
  isPartner: boolean; // Distinction between formal partner vs explore provider
  description: string;
  imageUrl?: string;
  rating?: number;
  priceRange?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  yearsExperience: string;
  experienceYears?: number;
  hospital: string;
  hospitalName?: string;
  languages: string[];
  consultationType: string;
  avatarText: string;
  imageUrl?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
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

export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  description: string;
  keyProcedures: string[];
  imageUrl?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  detail: string;
}

export interface InternationalServiceItem {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface TestimonialStory {
  id: string;
  title: string;
  patientName: string;
  country: string;
  treatment: string;
  consentStatus: string;
  format: 'written' | 'video';
  summary: string;
  quote: string;
  verificationNote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Medical' | 'Travel & Visa' | 'Costs';
  isEmergency?: boolean;
}

export interface CountryLandingInfo {
  slug: string;
  countryName: string;
  flag: string;
  headline: string;
  subheadline: string;
  currency: string;
  languageHelp: string;
  visaGuidance: string;
  travelRecommendation: string;
  commonTreatments: string[];
}

export interface SiteConfig {
  brandName: string;
  location: string;
  whatsappNumber: string; // e.g. "919876543210"
  phoneDisplay: string;
  email: string;
  responseTimeNote: string;
  address: string;
}
