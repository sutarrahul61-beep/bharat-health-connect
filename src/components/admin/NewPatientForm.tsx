import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Globe, Save, X, Stethoscope, Building2 } from 'lucide-react';
import { PatientRecord } from './types';
import { Hospital, Doctor } from '../../types';

interface NewPatientFormProps {
  onSave: (patient: PatientRecord) => void;
  onCancel: () => void;
  hospitals?: Hospital[];
  doctors?: Doctor[];
}

export const NewPatientForm: React.FC<NewPatientFormProps> = ({
  onSave,
  onCancel,
  hospitals = [],
  doctors = [],
}) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatmentRequired, setTreatmentRequired] = useState('');
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
  const [assignedHospitalId, setAssignedHospitalId] = useState('');
  const [assignedDoctorId, setAssignedDoctorId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedHosp = hospitals.find((h) => h.id === assignedHospitalId);
    const assignedDoc = doctors.find((d) => d.id === assignedDoctorId);

    const newRecord: PatientRecord = {
      id: `BHC-P-${Date.now().toString().slice(-6)}`,
      fullName,
      dob: dob || undefined,
      age: typeof age === 'number' ? age : undefined,
      gender,
      country,
      city,
      phone,
      whatsappNumber: phone,
      email,
      treatmentRequired,
      primaryDiagnosis,
      assignedHospitalId,
      assignedHospitalName: assignedHosp?.name,
      assignedDoctorId,
      assignedDoctorName: assignedDoc?.name,
      status: 'Registered',
      registeredDate: new Date().toISOString().slice(0, 10),
    };

    onSave(newRecord);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-teal-600" />
          Register New Patient Record
        </h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 95275 19903"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@example.com"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Bangladesh / UAE"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">City / Region</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Dhaka"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Treatment / Procedure Required</label>
            <input
              type="text"
              value={treatmentRequired}
              onChange={(e) => setTreatmentRequired(e.target.value)}
              placeholder="e.g. Total Knee Replacement"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Primary Clinical Diagnosis</label>
            <input
              type="text"
              value={primaryDiagnosis}
              onChange={(e) => setPrimaryDiagnosis(e.target.value)}
              placeholder="e.g. Bilateral Grade-IV Osteoarthritis"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Assigned Hospital</label>
            <select
              value={assignedHospitalId}
              onChange={(e) => setAssignedHospitalId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="">Select hospital partner...</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Assigned Doctor / Specialist</label>
            <select
              value={assignedDoctorId}
              onChange={(e) => setAssignedDoctorId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="">Select doctor...</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialty})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Create Patient Record</span>
          </button>
        </div>
      </form>
    </div>
  );
};
