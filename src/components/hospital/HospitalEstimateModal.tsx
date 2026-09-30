import React, { useState } from 'react';
import {
  FileText,
  X,
  PlusCircle,
  Building2,
  DollarSign,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { HospitalTreatmentEstimate } from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';

interface HospitalEstimateModalProps {
  hospitalId: string;
  hospitalName: string;
  hospitalUserId: string;
  hospitalUserName: string;
  assignedPatients: PatientRecord[];
  initialPatientId?: string;
  initialTreatment?: string;
  onClose: () => void;
  onSubmitEstimate: (estimate: HospitalTreatmentEstimate) => void;
}

export const HospitalEstimateModal: React.FC<HospitalEstimateModalProps> = ({
  hospitalId,
  hospitalName,
  hospitalUserId,
  hospitalUserName,
  assignedPatients,
  initialPatientId,
  initialTreatment,
  onClose,
  onSubmitEstimate,
}) => {
  const [patientId, setPatientId] = useState(
    initialPatientId || (assignedPatients[0] ? assignedPatients[0].id : '')
  );
  const selectedPatient = assignedPatients.find((p) => p.id === patientId) || assignedPatients[0];

  const [treatment, setTreatment] = useState(initialTreatment || selectedPatient?.treatment || '');
  const [doctor, setDoctor] = useState(selectedPatient?.assignedDoctor || 'Chief Consultant');
  const [estimatedCost, setEstimatedCost] = useState<number>(4500);
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'AED' | 'BDT'>('USD');
  const [expectedStayDays, setExpectedStayDays] = useState<number>(6);
  const [expectedTreatmentDurationDays, setExpectedTreatmentDurationDays] = useState<number>(14);
  const [preRequirements, setPreRequirements] = useState(
    'Fasting 8 hrs prior to pre-op tests; discontinue blood thinners under supervision.'
  );
  const [postRequirements, setPostRequirements] = useState(
    'Physical therapy sessions in Miraj for 7-10 days; follow-up X-ray and suture removal.'
  );
  const [validityDate, setValidityDate] = useState('2026-11-30');
  const [additionalChargesDetails, setAdditionalChargesDetails] = useState(
    'Package includes surgeon fee, operating theater, implants, nursing, and 1 attendant room stay. Extra days at $85/day.'
  );
  const [notes, setNotes] = useState(
    'Patient reports reviewed by senior orthopaedic surgical team. Bone quality favorable for procedure.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEst: HospitalTreatmentEstimate = {
      id: `EST-HOSP-${Date.now().toString().slice(-5)}`,
      patientId: patientId,
      patientName: selectedPatient ? selectedPatient.fullName : 'Assigned Patient',
      hospitalId: hospitalId,
      hospitalName: hospitalName,
      treatment,
      doctor,
      estimatedCost: Number(estimatedCost),
      currency,
      expectedStayDays: Number(expectedStayDays),
      expectedTreatmentDurationDays: Number(expectedTreatmentDurationDays),
      preRequirements,
      postRequirements,
      validityDate,
      additionalChargesDetails,
      notes,
      status: 'Official', // Officially published
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      createdByHospitalUserId: hospitalUserId,
      createdByHospitalUserName: hospitalUserName,
    };

    onSubmitEstimate(newEst);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Generate Hospital Treatment Estimate
              </h3>
              <p className="text-[11px] text-slate-500">
                Official quotation prepared by <strong>{hospitalName}</strong>
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
          {/* Patient Selection (strictly only assigned patients) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Select Assigned Patient *
              </label>
              <select
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value);
                  const p = assignedPatients.find((item) => item.id === e.target.value);
                  if (p) {
                    setTreatment(p.treatment || '');
                    if (p.assignedDoctor) setDoctor(p.assignedDoctor);
                  }
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {assignedPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.id}) - {p.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Lead Operating Surgeon / Doctor *
              </label>
              <input
                type="text"
                required
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="e.g. Chief Joint Replacement Surgeon"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Treatment Procedure / Surgery Package *
            </label>
            <input
              type="text"
              required
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Pricing & Duration */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="BDT">BDT (৳)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Estimated Cost *
              </label>
              <input
                type="number"
                required
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                In-Hospital Stay (Days)
              </label>
              <input
                type="number"
                value={expectedStayDays}
                onChange={(e) => setExpectedStayDays(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Total City Stay (Days)
              </label>
              <input
                type="number"
                value={expectedTreatmentDurationDays}
                onChange={(e) => setExpectedTreatmentDurationDays(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Pre-Treatment Requirements
              </label>
              <textarea
                rows={2}
                value={preRequirements}
                onChange={(e) => setPreRequirements(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Post-Treatment Requirements
              </label>
              <textarea
                rows={2}
                value={postRequirements}
                onChange={(e) => setPostRequirements(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Estimate Validity Date
              </label>
              <input
                type="date"
                value={validityDate}
                onChange={(e) => setValidityDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Inclusions & Additional Charges Policy
              </label>
              <input
                type="text"
                value={additionalChargesDetails}
                onChange={(e) => setAdditionalChargesDetails(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Surgeon Clinical Notes / Recommendations
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-[11px] text-indigo-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>Automatic Workflow Synchronization:</strong> This treatment estimate will be linked to Patient ID: <code>{patientId}</code>, reflected in the coordinator CRM, and will populate in the Patient's "My Documents" section under <em>Treatment Estimate</em>.
            </div>
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
              Submit Official Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
