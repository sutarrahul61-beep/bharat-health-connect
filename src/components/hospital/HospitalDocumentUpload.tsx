import React, { useState } from 'react';
import {
  Upload,
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import {
  PatientDocumentItem,
  DocumentCategory,
} from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';

interface HospitalDocumentUploadProps {
  hospitalId: string;
  hospitalName: string;
  hospitalUserId: string;
  hospitalUserName: string;
  assignedPatients: PatientRecord[];
  initialPatientId?: string;
  onClose: () => void;
  onUploadDocument: (newDoc: PatientDocumentItem) => void;
}

export const HospitalDocumentUpload: React.FC<HospitalDocumentUploadProps> = ({
  hospitalId,
  hospitalName,
  hospitalUserId,
  hospitalUserName,
  assignedPatients,
  initialPatientId,
  onClose,
  onUploadDocument,
}) => {
  const [patientId, setPatientId] = useState(
    initialPatientId || (assignedPatients[0] ? assignedPatients[0].id : '')
  );
  const selectedPatient = assignedPatients.find((p) => p.id === patientId) || assignedPatients[0];

  const [documentType, setDocumentType] = useState<DocumentCategory>('Doctor Reports');
  const [documentName, setDocumentName] = useState('');
  const [notes, setNotes] = useState('');
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newDoc: PatientDocumentItem = {
        id: `DOC-HOSP-${Date.now().toString().slice(-5)}`,
        patientId: patientId,
        name: documentName.trim().endsWith('.pdf') ? documentName.trim() : `${documentName.trim()}.pdf`,
        category: documentType,
        fileType: fileObject?.type || 'application/pdf',
        fileSize: fileObject?.size || 1850000,
        uploadDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        uploadedBy: 'hospital',
        uploadedByName: `${hospitalName} (${hospitalUserName})`,
        hospitalId: hospitalId,
        status: 'Verified',
        notes: notes.trim() || `Uploaded by ${hospitalUserName} on behalf of ${hospitalName}.`,
      };

      onUploadDocument(newDoc);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hospital Document Upload
              </h3>
              <p className="text-[11px] text-slate-500">
                Directly synchronized to Patient's "My Documents"
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
              Select Assigned Patient *
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {assignedPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.id}) - {p.treatment}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Hospital Document Type *
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="Doctor Reports">Doctor Clinical Opinion & Review</option>
              <option value="Treatment Estimate">Treatment Estimate Quotation</option>
              <option value="Appointment Letter">Official Appointment Letter</option>
              <option value="Hospital Documents">Hospital Admission / Bed Booking Letter</option>
              <option value="Prescriptions">Pre-Admission Prescription</option>
              <option value="Other">Discharge Summary / Recovery Plan</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Document Title / File Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wanless_Orthopaedic_Clinical_Opinion.pdf"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Choose Document File (PDF / Images)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
              <input
                type="file"
                id="hosp-doc-file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFileObject(e.target.files[0]);
                    if (!documentName) {
                      setDocumentName(e.target.files[0].name);
                    }
                  }
                }}
              />
              <label htmlFor="hosp-doc-file" className="cursor-pointer">
                <Upload className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="font-semibold text-slate-700 block">
                  {fileObject ? fileObject.name : 'Select file to upload'}
                </span>
                <span className="text-[10px] text-slate-500">
                  Will record Hospital ID: {hospitalId} and User ID: {hospitalUserId}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">
              Clinical Notes / Findings
            </label>
            <textarea
              rows={2}
              placeholder="Remarks for the patient and coordinator..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              disabled={isSubmitting}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Uploading...' : 'Publish to Patient Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
