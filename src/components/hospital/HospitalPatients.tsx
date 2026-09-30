import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  FileText,
  Calendar,
  Eye,
  ShieldCheck,
  Stethoscope,
  X,
  Upload,
  PlusCircle,
  Download,
  AlertCircle,
  Clock,
  Plane,
} from 'lucide-react';
import { PatientRecord } from '../admin/types';
import {
  PatientDocumentItem,
  PatientAppointmentItem,
  HospitalTreatmentEstimate,
} from '../../types/portalTypes';

interface HospitalPatientsProps {
  hospitalId: string;
  hospitalName: string;
  assignedPatients: PatientRecord[];
  documents: PatientDocumentItem[];
  appointments: PatientAppointmentItem[];
  estimates: HospitalTreatmentEstimate[];
  onOpenUploadDocumentForPatient: (patientId: string, patientName: string) => void;
  onOpenEstimateForPatient: (patientId: string, patientName: string, treatment: string) => void;
  onOpenAppointmentForPatient: (patientId: string, patientName: string) => void;
}

export const HospitalPatients: React.FC<HospitalPatientsProps> = ({
  hospitalId,
  hospitalName,
  assignedPatients,
  documents,
  appointments,
  estimates,
  onOpenUploadDocumentForPatient,
  onOpenEstimateForPatient,
  onOpenAppointmentForPatient,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  const filteredPatients = assignedPatients.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      (p.treatment && p.treatment.toLowerCase().includes(query)) ||
      p.country.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Assigned Patients & Clinical Review
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              {assignedPatients.length} Hospital Assigned Cases
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Access authorized patient profiles, medical imaging, and clinical requirements for {hospitalName}.
          </p>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Restricted to {hospitalId} patients only</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search assigned patients by name, Patient ID, treatment, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Assigned Patients Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Patient Name & ID</th>
                  <th className="py-3.5 px-4">Country / Age</th>
                  <th className="py-3.5 px-4">Treatment Required</th>
                  <th className="py-3.5 px-4">Case Stage</th>
                  <th className="py-3.5 px-4">Documents</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPatients.map((patient) => {
                  const patientDocs = documents.filter((d) => d.patientId === patient.id);
                  const patientAppts = appointments.filter((a) => a.patientId === patient.id);

                  return (
                    <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{patient.fullName}</div>
                        <div className="text-[11px] font-mono text-indigo-600 font-semibold">
                          {patient.id}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-slate-800 font-medium">{patient.country}</div>
                        <div className="text-[11px] text-slate-400">
                          {patient.gender} • {patient.age || 35} yrs
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 line-clamp-1">
                          {patient.treatment}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {patient.specialty}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          {patient.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">{patientDocs.length}</span> reports on file
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedPatient(patient)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Clinical Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No patients assigned yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Bharat Health Connect case coordinators assign patients directly to {hospitalName}. As soon as referrals arrive, they will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Patient Clinical Profile Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedPatient.fullName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono text-indigo-600 font-semibold">ID: {selectedPatient.id}</span>
                    <span>•</span>
                    <span>{selectedPatient.country}</span>
                    <span>•</span>
                    <span>Stage: {selectedPatient.stage}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Buttons for Hospital User */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <button
                onClick={() => {
                  onOpenEstimateForPatient(selectedPatient.id, selectedPatient.fullName, selectedPatient.treatment || '');
                  setSelectedPatient(null);
                }}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Submit Treatment Estimate
              </button>

              <button
                onClick={() => {
                  onOpenAppointmentForPatient(selectedPatient.id, selectedPatient.fullName);
                  setSelectedPatient(null);
                }}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule Consultation
              </button>

              <button
                onClick={() => {
                  onOpenUploadDocumentForPatient(selectedPatient.id, selectedPatient.fullName);
                  setSelectedPatient(null);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Doctor Opinion / Admission Letter
              </button>
            </div>

            {/* Basic Info & Medical Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-indigo-700">
                  Patient Demographic & Travel Info
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Date of Birth: <strong>{selectedPatient.dob || '1992-04-12'}</strong></div>
                  <div>Gender: <strong>{selectedPatient.gender}</strong></div>
                  <div>Nationality: <strong>{selectedPatient.nationality || selectedPatient.country}</strong></div>
                  <div>Language: <strong>{selectedPatient.preferredLanguage || 'English'}</strong></div>
                  <div>Passport Status: <strong>{selectedPatient.passportNumber ? 'Verified on File' : 'Pending'}</strong></div>
                  <div>Visa Status: <strong>{selectedPatient.visaStatus || 'Approved'}</strong></div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-indigo-700">
                  Clinical Case Details
                </span>
                <div className="text-slate-700 space-y-1">
                  <div>Requirement: <strong>{selectedPatient.treatment}</strong></div>
                  <div>Specialty: <strong>{selectedPatient.specialty}</strong></div>
                  <div className="text-slate-500 pt-1 leading-relaxed">
                    Brief: {selectedPatient.briefProblem || 'Under clinical assessment.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Medical Reports for this Patient */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-600" />
                Medical Reports & Scans Available for Review ({documents.filter((d) => d.patientId === selectedPatient.id).length})
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {documents.filter((d) => d.patientId === selectedPatient.id).map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {doc.category} • Uploaded by {doc.uploadedByName} ({doc.uploadDate})
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Protection notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Confidential Health Data Notice:</strong> You are accessing protected health information for treatment facilitation. Do not export or share patient details outside hospital medical board protocol.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
