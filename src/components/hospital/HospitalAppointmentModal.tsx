import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  X,
  Building2,
  Stethoscope,
  Video,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { PatientAppointmentItem } from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';

interface HospitalAppointmentModalProps {
  hospitalId: string;
  hospitalName: string;
  assignedPatients: PatientRecord[];
  initialPatientId?: string;
  onClose: () => void;
  onSubmitAppointment: (appt: PatientAppointmentItem) => void;
}

export const HospitalAppointmentModal: React.FC<HospitalAppointmentModalProps> = ({
  hospitalId,
  hospitalName,
  assignedPatients,
  initialPatientId,
  onClose,
  onSubmitAppointment,
}) => {
  const [patientId, setPatientId] = useState(
    initialPatientId || (assignedPatients[0] ? assignedPatients[0].id : '')
  );
  const selectedPatient = assignedPatients.find((p) => p.id === patientId) || assignedPatients[0];

  const [doctor, setDoctor] = useState(selectedPatient?.assignedDoctor || 'Lead Specialist');
  const [department, setDepartment] = useState('Department of Surgery & Clinical Care');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-05');
  const [appointmentTime, setAppointmentTime] = useState('11:30 AM IST');
  const [appointmentType, setAppointmentType] = useState<
    'Video Consultation' | 'Hospital OPD' | 'Pre-Op Evaluation' | 'Follow-up'
  >('Hospital OPD');
  const [location, setLocation] = useState(`${hospitalName}, OPD Block A, Room 102`);
  const [instructions, setInstructions] = useState(
    'Please bring all original imaging CDs, previous discharge reports, and arrive 15 minutes before the slot.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppt: PatientAppointmentItem = {
      id: `APPT-HOSP-${Date.now().toString().slice(-5)}`,
      patientId: patientId,
      patientName: selectedPatient ? selectedPatient.fullName : 'Assigned Patient',
      hospitalId,
      hospitalName,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      appointmentType,
      location,
      status: 'Confirmed',
      instructions,
      proposedByHospital: true,
      meetingLink:
        appointmentType === 'Video Consultation'
          ? `https://meet.bharathealthconnect.com/telehealth-${patientId.toLowerCase()}`
          : undefined,
    };

    onSubmitAppointment(newAppt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Schedule Patient Appointment
              </h3>
              <p className="text-[11px] text-slate-500">
                Directly displayed in Patient Portal & Coordinator Calendar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Select Patient *
            </label>
            <select
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
                const p = assignedPatients.find((item) => item.id === e.target.value);
                if (p?.assignedDoctor) setDoctor(p.assignedDoctor);
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {assignedPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.id}) - {p.treatment}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Doctor Name *
              </label>
              <input
                type="text"
                required
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Time *
              </label>
              <input
                type="text"
                required
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                placeholder="11:30 AM"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Type *
              </label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Hospital OPD">Hospital OPD</option>
                <option value="Video Consultation">Video Consultation</option>
                <option value="Pre-Op Evaluation">Pre-Op Evaluation</option>
                <option value="Follow-up">Post-Op Follow-up</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Venue / Room / Hospital Wing *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Instructions for the Patient
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md cursor-pointer"
            >
              Confirm & Publish Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
