import React, { useState } from 'react';
import {
  User,
  Shield,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Building2,
  Stethoscope,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Globe,
  Contact2,
} from 'lucide-react';
import { PatientRecord } from '../admin/types';

interface PatientProfileProps {
  patient: PatientRecord;
  onUpdatePatient: (updated: PatientRecord) => void;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({
  patient,
  onUpdatePatient,
}) => {
  // Permitted editable fields for the patient
  const [phone, setPhone] = useState(patient.phone || '');
  const [whatsappNumber, setWhatsappNumber] = useState(patient.whatsappNumber || patient.phone || '');
  const [address, setAddress] = useState(patient.address || '');
  const [city, setCity] = useState(patient.city || '');
  const [stateProvince, setStateProvince] = useState(patient.stateProvince || '');
  const [postalCode, setPostalCode] = useState(patient.postalCode || '');
  const [emergencyName, setEmergencyName] = useState(patient.emergencyContact?.name || '');
  const [emergencyRelationship, setEmergencyRelationship] = useState(patient.emergencyContact?.relationship || '');
  const [emergencyPhone, setEmergencyPhone] = useState(patient.emergencyContact?.phone || '');
  const [preferredLanguage, setPreferredLanguage] = useState(patient.preferredLanguage || 'English');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updated: PatientRecord = {
      ...patient,
      phone,
      whatsappNumber,
      address,
      city,
      stateProvince,
      postalCode,
      preferredLanguage,
      emergencyContact: {
        ...patient.emergencyContact,
        name: emergencyName,
        relationship: emergencyRelationship,
        phone: emergencyPhone,
      },
    };

    setTimeout(() => {
      onUpdatePatient(updated);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              My Patient Profile
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
              Verified Health ID
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review your demographic, contact, emergency, and official clinical assignment details.
          </p>
        </div>

        {/* Immutable Patient ID Badge */}
        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center gap-3 border border-slate-800 shadow-md">
          <Shield className="w-5 h-5 text-teal-400" />
          <div>
            <div className="text-[10px] text-teal-300 uppercase tracking-wider font-semibold">
              Permanent Patient ID
            </div>
            <div className="text-base font-mono font-bold tracking-wide">
              {patient.id}
            </div>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded ml-2">
            Locked
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your contact & emergency information has been updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Immutable Identification & Clinical Assignment (Read Only) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" />
              Verified Identification & Medical Case Assignment
            </h3>
            <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
              <Lock className="w-3 h-3" /> Medical Board Verified (Read Only)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Full Registered Name
              </label>
              <input
                type="text"
                disabled
                value={patient.fullName}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Date of Birth & Age
              </label>
              <input
                type="text"
                disabled
                value={`${patient.dob || '1992-04-12'} (${patient.age || 34} years)`}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Gender & Nationality
              </label>
              <input
                type="text"
                disabled
                value={`${patient.gender || 'Male'} • ${patient.nationality || patient.country}`}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Passport Number
              </label>
              <input
                type="text"
                disabled
                value={patient.passportNumber ? `${patient.passportNumber.slice(0, 3)}****${patient.passportNumber.slice(-2)}` : 'Verified on File'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Assigned Hospital
              </label>
              <input
                type="text"
                disabled
                value={patient.preferredHospital || 'Wanless Hospital (Miraj Medical Centre)'}
                className="w-full p-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-teal-900 font-semibold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Lead Specialist Doctor
              </label>
              <input
                type="text"
                disabled
                value={patient.assignedDoctor || patient.preferredDoctor || 'Chief Consultant'}
                className="w-full p-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-teal-900 font-semibold cursor-not-allowed"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-800">Current Treatment Requirement: </span>
            <span className="text-slate-700">{patient.treatment}</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Clinical Brief: {patient.briefProblem || 'Comprehensive clinical records under active hospital review.'}
            </p>
          </div>
        </div>

        {/* Section 2: Patient Editable Contact Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Contact2 className="w-4 h-4 text-teal-600" />
              Contact Information (Editable)
            </h3>
            <p className="text-xs text-slate-500">
              Please keep your phone, WhatsApp, and residential address updated for local coordination and hospital conveyance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Registered Email (Login ID)
              </label>
              <input
                type="email"
                disabled
                value={patient.email}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Permanent Residential Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                City & Country
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Preferred Language
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="English">English</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="Russian">Russian</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Emergency Contact Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-600" />
              Emergency & Next-of-Kin Contact
            </h3>
            <p className="text-xs text-slate-500">
              Person to contact immediately in case of medical urgency or travel coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Emergency Contact Full Name
              </label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="e.g. Tariq Al-Mansoor"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={emergencyRelationship}
                onChange={(e) => setEmergencyRelationship(e.target.value)}
                placeholder="e.g. Son / Spouse / Brother"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Emergency Phone Number
              </label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+91 95275 19903"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
