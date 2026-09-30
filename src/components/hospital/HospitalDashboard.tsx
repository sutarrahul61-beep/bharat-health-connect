import React from 'react';
import {
  Users,
  FileText,
  Clock,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import {
  HospitalOrganizationProfile,
  HospitalAccountUser,
  HospitalTreatmentEstimate,
  PatientAppointmentItem,
  PortalMessageItem,
} from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';

interface HospitalDashboardProps {
  hospital: HospitalOrganizationProfile;
  user: HospitalAccountUser;
  assignedPatients: PatientRecord[];
  estimates: HospitalTreatmentEstimate[];
  appointments: PatientAppointmentItem[];
  messages: PortalMessageItem[];
  onNavigateTab: (tabId: string) => void;
  onOpenEstimateModal: () => void;
  onOpenAppointmentModal: () => void;
  onOpenUploadModal: () => void;
}

export const HospitalDashboard: React.FC<HospitalDashboardProps> = ({
  hospital,
  user,
  assignedPatients,
  estimates,
  appointments,
  messages,
  onNavigateTab,
  onOpenEstimateModal,
  onOpenAppointmentModal,
  onOpenUploadModal,
}) => {
  const pendingReviews = assignedPatients.filter((p) => p.stage === 'MEDICAL REPORTS RECEIVED' || p.stage === 'UNDER REVIEW');
  const upcomingAppts = appointments.filter((a) => a.hospitalId === hospital.id && (a.status === 'Confirmed' || a.status === 'Scheduled'));
  const hospitalEstimates = estimates.filter((e) => e.hospitalId === hospital.id);

  return (
    <div className="space-y-6">
      {/* Hospital Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-2xl p-6 text-white shadow-xl border border-indigo-700/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Partner Organization Desk • {hospital.city}, Maharashtra
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {hospital.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-indigo-200">
              <span className="font-mono text-indigo-300 font-semibold bg-slate-900/80 px-2 py-0.5 rounded border border-indigo-500/30">
                Hospital ID: {hospital.id}
              </span>
              <span>•</span>
              <span>Logged in as: <strong>{user.name}</strong> ({user.role})</span>
              <span>•</span>
              <span>Accreditation: <strong>{hospital.accreditations[0] || 'Verified'}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenEstimateModal}
              className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Create Treatment Estimate
            </button>
            <button
              onClick={onOpenAppointmentModal}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl border border-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-indigo-400" />
              Propose Appointment
            </button>
          </div>
        </div>
      </div>

      {/* KPI Dashboard Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Assigned Patients */}
        <div
          onClick={() => onNavigateTab('patients')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Assigned Patients</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {assignedPatients.length}
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">
            Exclusive to {hospital.id}
          </div>
        </div>

        {/* Pending Reviews */}
        <div
          onClick={() => onNavigateTab('patients')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Pending Reviews</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {pendingReviews.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Awaiting surgeon opinion
          </div>
        </div>

        {/* Active Estimates */}
        <div
          onClick={() => onNavigateTab('estimates')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Treatment Estimates</span>
            <FileText className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700">
            {hospitalEstimates.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Official quotes sent
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div
          onClick={() => onNavigateTab('appointments')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Appointments</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-700">
            {upcomingAppts.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            OPD & Telehealth slots
          </div>
        </div>

        {/* Scheduled Admissions */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>OTs & ICU Beds</span>
            <Stethoscope className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {hospital.operationTheatres} / {hospital.icuBeds}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Capacity: {hospital.totalBeds} beds
          </div>
        </div>

        {/* Direct Messages */}
        <div
          onClick={() => onNavigateTab('messages')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Active Messages</span>
            <MessageSquare className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {messages.length}
          </div>
          <div className="text-[11px] text-teal-600 font-medium mt-1">
            Coordinator liaison
          </div>
        </div>
      </div>

      {/* Two Column Layout: Assigned Patients Overview & Treatment Estimates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Patients Table Preview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  Assigned Patients ({assignedPatients.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Strictly filtered to patients assigned to {hospital.name}.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('patients')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View Full Roster
              </button>
            </div>

            <div className="space-y-3">
              {assignedPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{patient.fullName}</span>
                      <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                        {patient.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {patient.treatment}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Country: {patient.country} • Stage: <strong>{patient.stage}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateTab('patients')}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Clinical Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Least-privilege isolation active</span>
            <span className="text-indigo-600 font-medium">HIPAA & NABH aligned</span>
          </div>
        </div>

        {/* Treatment Estimates Snapshot */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Official Treatment Estimates ({hospitalEstimates.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Quotations prepared for international patient care coordination.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('estimates')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                All Estimates
              </button>
            </div>

            <div className="space-y-3">
              {hospitalEstimates.map((est) => (
                <div
                  key={est.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-teal-200 bg-slate-50/50 flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{est.patientName}</span>
                      <span className="text-[10px] font-mono text-slate-500">{est.patientId}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {est.treatment}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Estimated Cost: <strong className="text-slate-900">{est.currency} {est.estimatedCost.toLocaleString()}</strong> ({est.expectedStayDays} days stay)
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    {est.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Admin approval automatically verified
            </span>
            <button
              onClick={onOpenEstimateModal}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              + Create New Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
