import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  CheckCircle2,
  Stethoscope,
  Plane,
  Heart,
  Save,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { HospitalOrganizationProfile } from '../../types/portalTypes';

interface HospitalProfileProps {
  hospital: HospitalOrganizationProfile;
  onUpdateHospital: (updated: HospitalOrganizationProfile) => void;
}

export const HospitalProfile: React.FC<HospitalProfileProps> = ({
  hospital,
  onUpdateHospital,
}) => {
  // All fields editable by hospital organization
  const [name, setName] = useState(hospital.name);
  const [address, setAddress] = useState(hospital.address);
  const [city, setCity] = useState(hospital.city);
  const [state, setState] = useState(hospital.state);
  const [country, setCountry] = useState(hospital.country);
  const [phone, setPhone] = useState(hospital.phone);
  const [email, setEmail] = useState(hospital.email);
  const [website, setWebsite] = useState(hospital.website);
  const [emergencyContact, setEmergencyContact] = useState(hospital.emergencyContact);
  const [internationalPatientContact, setInternationalPatientContact] = useState(hospital.internationalPatientContact);
  const [doctorsCount, setDoctorsCount] = useState(hospital.doctorsCount);
  const [operationTheatres, setOperationTheatres] = useState(hospital.operationTheatres);
  const [icuBeds, setIcuBeds] = useState(hospital.icuBeds);
  const [totalBeds, setTotalBeds] = useState(hospital.totalBeds);
  const [airportAssistance, setAirportAssistance] = useState(hospital.airportAssistance);
  const [accommodationAssistance, setAccommodationAssistance] = useState(hospital.accommodationAssistance);
  const [visaAssistance, setVisaAssistance] = useState(hospital.visaAssistance);
  const [insuranceSupport, setInsuranceSupport] = useState(hospital.insuranceSupport);
  const [accreditationsStr, setAccreditationsStr] = useState(hospital.accreditations.join(', '));
  const [departmentsStr, setDepartmentsStr] = useState(hospital.departments.join(', '));
  const [facilitiesStr, setFacilitiesStr] = useState(hospital.facilities.join(', '));
  const [specialitiesStr, setSpecialitiesStr] = useState(hospital.specialities.join(', '));
  const [treatmentsStr, setTreatmentsStr] = useState(hospital.treatments.join(', '));
  const [languagesStr, setLanguagesStr] = useState(hospital.languagesSupported.join(', '));

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updated: HospitalOrganizationProfile = {
      ...hospital,
      name,
      address,
      city,
      state,
      country,
      phone,
      email,
      website,
      emergencyContact,
      internationalPatientContact,
      doctorsCount: Number(doctorsCount),
      operationTheatres: Number(operationTheatres),
      icuBeds: Number(icuBeds),
      totalBeds: Number(totalBeds),
      airportAssistance,
      accommodationAssistance,
      visaAssistance,
      insuranceSupport,
      accreditations: accreditationsStr.split(',').map((s) => s.trim()).filter(Boolean),
      departments: departmentsStr.split(',').map((s) => s.trim()).filter(Boolean),
      facilities: facilitiesStr.split(',').map((s) => s.trim()).filter(Boolean),
      specialities: specialitiesStr.split(',').map((s) => s.trim()).filter(Boolean),
      treatments: treatmentsStr.split(',').map((s) => s.trim()).filter(Boolean),
      languagesSupported: languagesStr.split(',').map((s) => s.trim()).filter(Boolean),
    };

    setTimeout(() => {
      onUpdateHospital(updated);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Hospital Organization Profile
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Admin Approved Profile
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete institutional profile displayed to international medical tourists and coordinators.
          </p>
        </div>

        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center gap-3 border border-slate-800 shadow-md">
          <Building2 className="w-5 h-5 text-indigo-400" />
          <div>
            <div className="text-[10px] text-indigo-300 uppercase tracking-wider font-semibold">
              Organization Code
            </div>
            <div className="text-base font-mono font-bold tracking-wide">
              {hospital.id}
            </div>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Hospital profile updated and synchronized successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Basic Organization Details */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            Hospital Entity & Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Hospital Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Official Website URL
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Physical Campus Address *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                City & State *
              </label>
              <input
                type="text"
                required
                value={`${city}, ${state}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setCity(parts[0]?.trim() || 'Miraj');
                  if (parts[1]) setState(parts[1]?.trim());
                }}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Numbers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            Helpline & International Patient Desk Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Hospital Board Line Phone *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Hospital Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                24x7 Emergency / Casualty
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                International Patient Liaison
              </label>
              <input
                type="text"
                value={internationalPatientContact}
                onChange={(e) => setInternationalPatientContact(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Clinical Capacity & Infrastructure */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            Infrastructure & Clinical Capacity
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Senior Doctors Count
              </label>
              <input
                type="number"
                value={doctorsCount}
                onChange={(e) => setDoctorsCount(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Operation Theatres (OT)
              </label>
              <input
                type="number"
                value={operationTheatres}
                onChange={(e) => setOperationTheatres(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                ICU / Critical Care Beds
              </label>
              <input
                type="number"
                value={icuBeds}
                onChange={(e) => setIcuBeds(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Total In-Patient Beds
              </label>
              <input
                type="number"
                value={totalBeds}
                onChange={(e) => setTotalBeds(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Departments, Accreditations & Specialties */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Accreditations, Departments & Services
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Hospital Accreditations (Comma separated)
              </label>
              <input
                type="text"
                value={accreditationsStr}
                onChange={(e) => setAccreditationsStr(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Languages Supported by Hospital Staff
              </label>
              <input
                type="text"
                value={languagesStr}
                onChange={(e) => setLanguagesStr(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Clinical Departments
              </label>
              <textarea
                rows={2}
                value={departmentsStr}
                onChange={(e) => setDepartmentsStr(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Key Treatments & Procedures
              </label>
              <textarea
                rows={2}
                value={treatmentsStr}
                onChange={(e) => setTreatmentsStr(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 5: International Patient Services & Checkboxes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Plane className="w-4 h-4 text-teal-600" />
            International Patient Services & Assistance Facilities
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={airportAssistance}
                onChange={(e) => setAirportAssistance(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="font-semibold text-slate-800">Airport Assistance</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={accommodationAssistance}
                onChange={(e) => setAccommodationAssistance(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="font-semibold text-slate-800">Accommodation Support</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={visaAssistance}
                onChange={(e) => setVisaAssistance(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="font-semibold text-slate-800">Medical Visa Liaison</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={insuranceSupport}
                onChange={(e) => setInsuranceSupport(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="font-semibold text-slate-800">Insurance Support</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Updating Profile...' : 'Save Hospital Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};
