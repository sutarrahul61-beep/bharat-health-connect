import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  Video,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  X,
} from 'lucide-react';
import { PatientAppointmentItem } from '../../types/portalTypes';

interface PatientAppointmentsProps {
  appointments: PatientAppointmentItem[];
  patientId: string;
}

export const PatientAppointments: React.FC<PatientAppointmentsProps> = ({
  appointments,
  patientId,
}) => {
  const [selectedAppt, setSelectedAppt] = useState<PatientAppointmentItem | null>(null);

  const patientAppts = appointments.filter((a) => a.patientId === patientId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              My Appointments & Consultations
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              {patientAppts.length} Scheduled Sessions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Confirmed consultations with senior surgical & clinical specialists across Miraj hospital network.
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {patientAppts.length > 0 ? (
          patientAppts.map((appt) => {
            const isConfirmed = appt.status === 'Confirmed' || appt.status === 'Scheduled';
            const isVideo = appt.appointmentType === 'Video Consultation';

            return (
              <div
                key={appt.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-teal-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isVideo
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      {isVideo ? <Video className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isVideo
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {appt.appointmentType}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {appt.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {appt.doctor}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {appt.department} • <strong>{appt.hospitalName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-sm font-bold text-slate-900 flex items-center sm:justify-end gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      {appt.appointmentDate}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {appt.appointmentTime}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Location: <strong>{appt.location}</strong></span>
                  </div>
                  {appt.instructions && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">Instructions: {appt.instructions}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setSelectedAppt(appt)}
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 underline cursor-pointer"
                  >
                    View Full Instructions & Clinical Prep
                  </button>

                  {appt.meetingLink && (
                    <a
                      href={appt.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      Join Secure Video Consultation
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-400">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No scheduled appointments</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Once your clinical reports have been reviewed by the hospital panel, your consultation schedule will be displayed here.
            </p>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Appointment Details
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ref: {selectedAppt.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="text-slate-500">Doctor & Hospital:</div>
                <div className="font-bold text-slate-900 text-sm">{selectedAppt.doctor}</div>
                <div className="text-slate-700">{selectedAppt.department} • {selectedAppt.hospitalName}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Date</span>
                  <span className="font-bold text-slate-900">{selectedAppt.appointmentDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Time</span>
                  <span className="font-bold text-slate-900">{selectedAppt.appointmentTime}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Venue / Mode</span>
                <span className="font-medium text-slate-900">{selectedAppt.location}</span>
              </div>

              {selectedAppt.instructions && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                  <strong className="block text-amber-800 mb-0.5">Pre-Appointment Instructions:</strong>
                  {selectedAppt.instructions}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedAppt(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
