import React, { useState } from 'react';
import { Hospital, Doctor, LeadSubmission, LeadStatus, SiteConfig } from '../types';
import { AdminDashboard } from './admin/AdminDashboard';
import { Lead } from './admin/types';
import { AdminAuth } from './admin/AdminAuth';

// Re-export NewPatientForm and AdminAuth from the AdminPortal module
export { NewPatientForm } from './admin/NewPatientForm';
export { AdminAuth } from './admin/AdminAuth';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  isStandalone?: boolean;
  leads: LeadSubmission[];
  onUpdateLeadStatus?: (id: string, status: LeadStatus, notes?: string) => void;
  onAddLead?: (newLeadData: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => string;
  onRefreshLeads?: () => Promise<void> | void;
  hospitals?: Hospital[];
  onSaveHospital?: (hospital: Hospital) => void;
  onDeleteHospital?: (id: string) => void;
  doctors?: Doctor[];
  onSaveDoctor?: (doctor: Doctor) => void;
  onDeleteDoctor?: (id: string) => void;
  onResetData?: () => void;
  siteConfig?: SiteConfig;
  onUpdateSiteConfig?: (updatedConfig: SiteConfig) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  isStandalone = false,
  leads,
  onUpdateLeadStatus,
  onAddLead,
  onRefreshLeads,
  hospitals = [],
  onSaveHospital,
  onDeleteHospital,
  doctors = [],
  onSaveDoctor,
  onDeleteDoctor,
  onResetData,
  siteConfig,
  onUpdateSiteConfig,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  // Convert website LeadSubmission to standard Lead interface for the admin engine
  const mappedLeads: Lead[] = leads.map((l) => ({
    id: l.id,
    referenceId: l.id,
    patientName: l.name,
    country: l.country,
    phone: l.phone,
    email: l.email,
    treatmentRequired: l.treatment,
    preferredHospital: l.preferredHospital,
    reports: l.uploadedReports?.map((r) => r.name) || [],
    notes: l.message || l.notes,
    status: l.status,
    createdAt: l.createdAt,
  }));

  return (
    <AdminAuth onClose={isStandalone ? undefined : onClose} isStandalone={isStandalone}>
      {(session, onLogout) => (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-100 flex flex-col animate-in fade-in duration-200">
          <AdminDashboard
            onLogout={() => {
              onLogout();
              if (!isStandalone) {
                onClose();
              }
            }}
            leads={mappedLeads}
            onRefreshLeads={async () => {
              if (onRefreshLeads) {
                setIsRefreshing(true);
                try {
                  await onRefreshLeads();
                } finally {
                  setIsRefreshing(false);
                }
              }
            }}
            isRefreshingLeads={isRefreshing}
            hospitals={hospitals}
            onSaveHospital={onSaveHospital}
            onDeleteHospital={onDeleteHospital}
            doctors={doctors}
            onSaveDoctor={onSaveDoctor}
            onDeleteDoctor={onDeleteDoctor}
            siteConfig={siteConfig}
            onUpdateSiteConfig={onUpdateSiteConfig}
            onUpdateLeadStatus={onUpdateLeadStatus}
            onAddLead={onAddLead}
          />
        </div>
      )}
    </AdminAuth>
  );
};

