import React from 'react';
import {
  Heart,
  Building2,
  Calendar,
  FileText,
  Plane,
  ShieldCheck,
  Clock,
  ArrowRight,
  Upload,
  MessageSquare,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  PatientDocumentItem,
  PatientAppointmentItem,
  PatientPaymentItem,
  PortalMessageItem,
  TreatmentTimelineStageInfo,
} from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';

interface PatientDashboardProps {
  patient: PatientRecord;
  documents: PatientDocumentItem[];
  appointments: PatientAppointmentItem[];
  payments: PatientPaymentItem[];
  messages: PortalMessageItem[];
  timelineStages: TreatmentTimelineStageInfo[];
  onNavigateTab: (tabId: string) => void;
  onOpenUploadModal: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  patient,
  documents,
  appointments,
  payments,
  messages,
  timelineStages,
  onNavigateTab,
  onOpenUploadModal,
}) => {
  const currentStage = timelineStages.find((s) => s.status === 'current') || timelineStages[0];
  const upcomingAppointment = appointments.find((a) => a.status === 'Confirmed' || a.status === 'Scheduled');
  const pendingDocsCount = documents.filter((d) => d.status === 'Pending Review' || d.status === 'Under Review').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-teal-700/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Patient Portal • Encrypted Health Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome, {patient.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-teal-100">
              <span className="bg-slate-900/60 px-2.5 py-1 rounded-lg border border-teal-500/30 font-mono text-teal-300 font-semibold">
                Patient ID: {patient.id}
              </span>
              <span>•</span>
              <span>Nationality: <strong>{patient.nationality || patient.country}</strong></span>
              <span>•</span>
              <span>Coordinator: <strong>{patient.assignedStaff || 'Senior Case Coordinator'}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenUploadModal}
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Upload Medical Report
            </button>
            <button
              onClick={() => onNavigateTab('messages')}
              className="px-4 py-2.5 bg-slate-900/80 hover:bg-slate-900 text-white font-medium text-xs rounded-xl border border-teal-500/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              Message Coordinator
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Treatment Requirement */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Treatment Requirement</span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
            {patient.treatment || 'Comprehensive Medical Evaluation'}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span className="font-medium text-slate-700">{patient.specialty || 'General Speciality'}</span>
          </div>
        </div>

        {/* Assigned Hospital */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Assigned Hospital</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-slate-900 text-base leading-snug">
            {patient.preferredHospital || 'Wanless Hospital (Miraj Medical Centre)'}
          </div>
          <div className="mt-2 text-xs text-indigo-600 font-medium flex items-center gap-1">
            <span>Miraj Medical Hub, Maharashtra</span>
          </div>
        </div>

        {/* Current Treatment Status */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Treatment Stage</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-emerald-700 text-base leading-snug">
            {currentStage.label}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>Step {currentStage.stepNumber} of 11 in Treatment Pathway</span>
          </div>
        </div>

        {/* Visa & Travel Status */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Visa & Travel Status</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
          </div>
          <div className="font-bold text-slate-900 text-base leading-snug flex items-center gap-2">
            <span>{patient.visaStatus || 'Approved / In Progress'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>Airport Escort: {patient.airportPickupRequired !== false ? 'Arranged' : 'Optional'}</span>
          </div>
        </div>
      </div>

      {/* Treatment Pathway Timeline Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              11-Stage Treatment Pathway
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status of your hospital review, medical visa, admission, and post-care follow-up.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('timeline')}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            Full Pathway Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Mini Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2 pt-2">
          {timelineStages.map((stage) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.id}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-teal-50 border-teal-500 shadow-sm ring-2 ring-teal-500/20'
                    : isCompleted
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {stage.stepNumber}
                    </div>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400">
                      {stage.stepNumber}
                    </span>
                  )}
                </div>
                <div className={`text-[11px] font-semibold truncate ${isCurrent ? 'text-teal-900' : isCompleted ? 'text-emerald-800' : 'text-slate-500'}`}>
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Upcoming Appointment & Medical Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Scheduled Appointment */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Upcoming Specialist Appointment
              </h3>
              <button
                onClick={() => onNavigateTab('appointments')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View All
              </button>
            </div>

            {upcomingAppointment ? (
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-800 mb-1">
                      {upcomingAppointment.appointmentType}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {upcomingAppointment.doctor}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {upcomingAppointment.department}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {upcomingAppointment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-indigo-100 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Date & Time</span>
                    <strong>{upcomingAppointment.appointmentDate}</strong> at {upcomingAppointment.appointmentTime}
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Hospital / Room</span>
                    <span className="truncate block font-medium">{upcomingAppointment.location}</span>
                  </div>
                </div>

                {upcomingAppointment.meetingLink && (
                  <a
                    href={upcomingAppointment.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Join Video Consultation Room <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-xl text-xs">
                No immediate appointments scheduled. Your coordinator will schedule consultation upon report review.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hospital: {patient.preferredHospital || 'Wanless Hospital Miraj'}</span>
            <span className="text-teal-600 font-medium">OPD & Telehealth Desk</span>
          </div>
        </div>

        {/* Dedicated Document Center Snapshot */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  My Documents ({documents.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Categorized medical reports, scan files, and official hospital estimates.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('documents')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Document Center
              </button>
            </div>

            <div className="space-y-2">
              {documents.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl border border-slate-100 hover:border-teal-200 bg-slate-50/50 flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {doc.name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="text-teal-700 font-medium">{doc.category}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {documents.length} verified documents in your private health locker
            </span>
            <button
              onClick={onOpenUploadModal}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
            >
              + Upload New File
            </button>
          </div>
        </div>
      </div>

      {/* Recent Messages & Coordinator Channel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Direct Coordinator Channel
              </h3>
              <p className="text-xs text-slate-500">
                Assigned Coordinator: <strong>{patient.assignedStaff || 'Senior Case Coordinator'}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('messages')}
            className="px-3.5 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold text-xs rounded-lg transition-colors"
          >
            Open Chat Thread
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
          {messages.slice(-2).map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-xl text-xs ${
                msg.senderType === 'patient'
                  ? 'bg-teal-100/70 border border-teal-200 text-teal-950 ml-6'
                  : 'bg-white border border-slate-200 text-slate-800 mr-6'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-slate-600">
                <span>{msg.senderName} ({msg.senderType})</span>
                <span className="text-slate-400 font-normal">{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
