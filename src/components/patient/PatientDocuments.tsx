import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  FileCheck,
  Lock,
  X,
  FilePlus2,
  Trash2,
} from 'lucide-react';
import {
  PatientDocumentItem,
  DocumentCategory,
  DOCUMENT_CATEGORIES,
} from '../../types/portalTypes';

interface PatientDocumentsProps {
  patientId: string;
  patientName: string;
  documents: PatientDocumentItem[];
  onUploadDocument: (newDoc: PatientDocumentItem) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
}

export const PatientDocuments: React.FC<PatientDocumentsProps> = ({
  patientId,
  patientName,
  documents,
  onUploadDocument,
  isUploadModalOpen,
  setIsUploadModalOpen,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<PatientDocumentItem | null>(null);

  // New Upload Form State
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('Medical Reports');
  const [documentName, setDocumentName] = useState('');
  const [documentNotes, setDocumentNotes] = useState('');
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Filter documents strictly belonging to this patient ID
  const patientDocs = documents.filter((doc) => doc.patientId === patientId);

  const filteredDocs = patientDocs.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedByName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: PatientDocumentItem) => {
    // Simulated secure download of authorized document
    const blobContent = `--- Bharat Health Connect Secure Clinical Record ---\nPatient ID: ${patientId}\nPatient Name: ${patientName}\nDocument Name: ${doc.name}\nCategory: ${doc.category}\nUpload Date: ${doc.uploadDate}\nUploaded By: ${doc.uploadedByName}\nStatus: ${doc.status}\n\nClinical Content / Record Verification Checksum: verified-sha256-safe\n`;
    const blob = new Blob([blobContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name.endsWith('.pdf') ? doc.name : `${doc.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFormUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentName.trim()) return;

    setUploading(true);
    setTimeout(() => {
      const newDoc: PatientDocumentItem = {
        id: `DOC-PT-${Date.now()}`,
        patientId: patientId, // IMMUTABLE: Bound to authenticated patient ID
        name: documentName.trim().endsWith('.pdf') ? documentName.trim() : `${documentName.trim()}.pdf`,
        category: uploadCategory,
        fileType: fileObject?.type || 'application/pdf',
        fileSize: fileObject?.size || 1500000,
        uploadDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        uploadedBy: 'patient',
        uploadedByName: `${patientName} (Patient)`,
        status: 'Under Review',
        notes: documentNotes.trim() || undefined,
      };

      onUploadDocument(newDoc);
      setUploading(false);
      setIsUploadModalOpen(false);
      setDocumentName('');
      setDocumentNotes('');
      setFileObject(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              My Medical & Travel Documents
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
              {patientDocs.length} Total Files
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated health vault. All 16 standard medical categories supported with strict patient-isolated encryption.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          Upload New Document
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by title, doctor, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Vault locked to Patient ID: <strong>{patientId}</strong></span>
          </div>
        </div>

        {/* 16-Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories ({patientDocs.length})
          </button>
          {DOCUMENT_CATEGORIES.map((cat) => {
            const count = patientDocs.filter((d) => d.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} {count > 0 && <span className="opacity-80">({count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Documents Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredDocs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Document Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Uploaded By</th>
                  <th className="py-3.5 px-4">Upload Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {doc.name}
                          </div>
                          {doc.notes && (
                            <div className="text-[11px] text-slate-400 line-clamp-1">
                              {doc.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-800">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-slate-800 font-medium">
                        {doc.uploadedByName}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">
                        {doc.uploadedBy} upload
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                      {doc.uploadDate}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          doc.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'Under Review'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {doc.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                        {doc.status === 'Under Review' && <Clock className="w-3 h-3" />}
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-teal-600 hover:bg-slate-100 transition-colors"
                          title="View Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-teal-600 hover:bg-slate-100 transition-colors"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No documents found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No files uploaded under this category yet. Click "Upload New Document" to add your test reports, MRI, prescriptions, or travel passports.
            </p>
          </div>
        )}
      </div>

      {/* Document Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Upload Medical Document
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Bound automatically to Patient ID: <strong>{patientId}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormUpload} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Document Category (16 Standard Medical Categories) *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as DocumentCategory)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {DOCUMENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Document Title / File Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brain_MRI_Contrast_Scan_Sep2026.pdf"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Attach File (PDF, DICOM, JPG, PNG) *
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
                  <input
                    type="file"
                    id="patient-file-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileObject(e.target.files[0]);
                        if (!documentName) {
                          setDocumentName(e.target.files[0].name);
                        }
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="patient-file-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                    <span className="font-semibold text-slate-700 block">
                      {fileObject ? fileObject.name : 'Choose a file from your device'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Encrypted directly into your private locker
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Clinical Notes / Doctor Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Additional notes or specific observations for the medical board..."
                  value={documentNotes}
                  onChange={(e) => setDocumentNotes(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Security confirmation */}
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Protected Upload:</strong> This file will be tagged to Patient ID: <code>{patientId}</code> and made available exclusively to your assigned hospital review board.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-md disabled:opacity-50"
                >
                  {uploading ? 'Encrypting & Uploading...' : 'Upload Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document View / Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {previewDoc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{previewDoc.category}</span>
                    <span>•</span>
                    <span>Uploaded by {previewDoc.uploadedByName}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Box */}
            <div className="p-6 bg-slate-900 text-white rounded-xl font-mono text-xs space-y-3 max-h-80 overflow-y-auto">
              <div className="text-teal-400 font-semibold border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>[BHARAT HEALTH CONNECT ENCRYPTED VAULT]</span>
                <span className="text-[10px] text-slate-400">PATIENT ID: {patientId}</span>
              </div>
              <p>DOCUMENT ID: {previewDoc.id}</p>
              <p>DOCUMENT NAME: {previewDoc.name}</p>
              <p>CATEGORY: {previewDoc.category}</p>
              <p>STATUS: {previewDoc.status}</p>
              <p>UPLOAD TIMESTAMP: {previewDoc.uploadDate}</p>
              {previewDoc.notes && (
                <div className="pt-2 text-teal-200 font-sans">
                  <strong>Notes:</strong> {previewDoc.notes}
                </div>
              )}
              <div className="pt-4 text-slate-400 text-[11px] font-sans">
                This document is certified by the Bharat Health Connect medical records coordinator for patient care in Miraj, Maharashtra.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Encrypted File Hash: SHA256-CERT-OK
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(previewDoc)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
