import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Lock,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { SupportedLanguage, translations } from '../data/translations';
import { localizedSpecialties } from '../data/localizedSpecialties';
import { localizedHospitals } from '../data/localizedHospitals';
import { localizedDoctors } from '../data/localizedDoctors';
import { LeadSubmission, SiteConfig, Hospital, Doctor } from '../types';
import { trackEvent } from '../utils/analytics';
import { HeaderLogoIcon } from './AIChatWidget';

interface QuickEnquiryCardProps {
  currentLang: SupportedLanguage;
  siteConfig: SiteConfig;
  onSubmitLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => string;
  preselectedTreatment?: string;
  preselectedHospital?: string;
  preselectedDoctor?: string;
  hospitals?: Hospital[];
  doctors?: Doctor[];
}

export const QuickEnquiryCard: React.FC<QuickEnquiryCardProps> = ({
  currentLang,
  siteConfig,
  onSubmitLead,
  preselectedTreatment = '',
  preselectedHospital = '',
  preselectedDoctor = '',
  hospitals: customHospitals,
  doctors: customDoctors,
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<string>(
    currentLang === 'hi'
      ? 'Hindi — हिन्दी'
      : currentLang === 'mr'
      ? 'Marathi — मराठी'
      : currentLang === 'bn'
      ? 'Bengali — বাংলা'
      : currentLang === 'ar'
      ? 'Arabic — العربية'
      : 'English'
  );
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(preselectedTreatment);
  const [preferredHospital, setPreferredHospital] = useState(preselectedHospital);
  const [preferredDoctor, setPreferredDoctor] = useState(preselectedDoctor);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number; type: string }>>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Synchronize if preselection props change
  React.useEffect(() => {
    if (preselectedTreatment) setTreatment(preselectedTreatment);
    if (preselectedHospital) setPreferredHospital(preselectedHospital);
    if (preselectedDoctor) setPreferredDoctor(preselectedDoctor);
  }, [preselectedTreatment, preselectedHospital, preselectedDoctor]);

  React.useEffect(() => {
    setPreferredLanguage(
      currentLang === 'hi'
        ? 'Hindi — हिन्दी'
        : currentLang === 'mr'
        ? 'Marathi — मराठी'
        : currentLang === 'bn'
        ? 'Bengali — বাংলা'
        : currentLang === 'ar'
        ? 'Arabic — العربية'
        : 'English'
    );
  }, [currentLang]);

  const countriesList = [
    'Bangladesh',
    'Nepal',
    'United Arab Emirates',
    'Oman',
    'Saudi Arabia',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'United Kingdom',
    'United States',
    'Kenya',
    'Tanzania',
    'Nigeria',
    'Uganda',
    'Australia',
    'Canada',
    'India (Other State / Domestic Patient)',
    'Other Country',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

      const validFiles: Array<{ name: string; size: number; type: string }> = [];

      for (const file of filesArray) {
        if (file.size > maxSize) {
          setFileError(`File "${file.name}" exceeds the 10MB size limit.`);
          return;
        }
        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png)$/i)) {
          setFileError(`File "${file.name}" is not supported. Please upload PDF, JPG, or PNG files only.`);
          return;
        }
        validFiles.push({
          name: file.name,
          size: file.size,
          type: file.type || 'document',
        });
      }

      setUploadedFiles((prev) => [...prev, ...validFiles]);
      trackEvent('report_upload', { count: validFiles.length });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Please agree to the privacy consent checkbox to proceed.');
      return;
    }

    setIsSubmitting(true);
    trackEvent('form_submit', {
      treatment,
      country,
      hasFiles: uploadedFiles.length > 0,
    });

    setTimeout(() => {
      const newLeadId = onSubmitLead({
        name: fullName,
        country,
        phone,
        email,
        preferredLanguage,
        treatment: treatment || 'General Healthcare Enquiry',
        preferredHospital: preferredHospital || undefined,
        preferredDoctor: preferredDoctor || undefined,
        message,
        uploadedReports: uploadedFiles,
      });

      setSubmittedLeadId(newLeadId);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="quick-enquiry" className="relative -mt-6 sm:-mt-10 max-w-5xl mx-auto px-4 sm:px-6 z-20">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-10 transition-all">
        {submittedLeadId ? (
          /* Submission Success State */
          <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Enquiry Received Confidentially
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Thank You, {fullName || 'Patient'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Your medical enquiry reference number is{' '}
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {submittedLeadId}
                </span>
                . A real human patient coordinator will review your request and reach out via WhatsApp or email.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl max-w-lg mx-auto text-left border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Service Response Standard:</span>
                <span className="font-semibold text-slate-800">{siteConfig.responseTimeNote}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Method:</span>
                <span className="font-semibold text-slate-800">{phone || email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reports Attached:</span>
                <span className="font-semibold text-slate-800">{uploadedFiles.length} file(s)</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-ai-chat'));
                }}
                className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center shadow-xs cursor-pointer gap-2"
              >
                <div className="w-5 h-5 rounded bg-[#0B1E3F] border border-blue-900 flex items-center justify-center shrink-0 p-0.5 shadow-2xs">
                  <HeaderLogoIcon className="w-3.5 h-3.5" />
                </div>
                <span>Chat with AI Health Assistant</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedLeadId(null);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                  setUploadedFiles([]);
                  setConsent(false);
                }}
                className="w-full sm:w-auto px-5 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* The Form */
          <div>
            <div className="border-b border-slate-100 pb-5 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {t.enquiryCardTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {t.enquiryCardSubtitle}
                  </p>
                </div>
                <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                  <Lock className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                  <span>Confidential Healthcare Data</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="enquiry-full-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.fullName} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="enquiry-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Smith / Mohammad Rahman"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="enquiry-country" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.country} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="enquiry-country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer"
                  >
                    <option value="">Select your country...</option>
                    {countriesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label htmlFor="enquiry-whatsapp" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.whatsappNumber} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="enquiry-whatsapp"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567 / +880 171..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="enquiry-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.email} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient.contact@email.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                {/* Preferred Language for Communication */}
                <div>
                  <label htmlFor="enquiry-language" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.preferredLanguage}
                  </label>
                  <select
                    id="enquiry-language"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Hindi — हिन्दी">Hindi — हिन्दी</option>
                    <option value="Marathi — मराठी">Marathi — मराठी</option>
                    <option value="Bengali — বাংলা">Bengali — বাংলা</option>
                    <option value="Arabic — العربية">Arabic — العربية</option>
                  </select>
                </div>

                {/* Treatment / Medical Specialty */}
                <div>
                  <label htmlFor="enquiry-treatment" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.treatmentSpecialty} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="enquiry-treatment"
                    required
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer"
                  >
                    <option value="">Select specialty or condition...</option>
                    {(localizedSpecialties[currentLang] || localizedSpecialties.en).map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Second Opinion Request">Second Opinion Request</option>
                    <option value="Comprehensive Health Checkup">Comprehensive Health Checkup</option>
                    <option value="Other Medical Requirement">Other Medical Requirement</option>
                  </select>
                </div>

                {/* Preferred Hospital / Doctor (Optional) */}
                <div>
                  <label htmlFor="enquiry-preferred-provider" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.preferredHospitalDoctor}
                  </label>
                  <select
                    id="enquiry-preferred-provider"
                    value={preferredHospital || preferredDoctor}
                    onChange={(e) => setPreferredHospital(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer"
                  >
                    <option value="">No preference / Coordinator Recommendation</option>
                    <optgroup label="Hospitals">
                      {(customHospitals && customHospitals.length > 0
                        ? customHospitals
                        : (localizedHospitals[currentLang] || localizedHospitals.en)
                      ).map((h) => (
                        <option key={h.id} value={h.name}>
                          {h.name} ({h.city})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Specialist Panels">
                      {(customDoctors && customDoctors.length > 0
                        ? customDoctors
                        : (localizedDoctors[currentLang] || localizedDoctors.en)
                      ).map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.specialty})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="enquiry-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.message}
                </label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about previous diagnoses, current symptoms, preferred timing, or questions for our doctors..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
              </div>

              {/* Upload Medical Reports Section */}
              <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-dashed border-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      {t.uploadReports}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {t.uploadHint} (Max 10 MB per file)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-3.5 py-2 bg-white hover:bg-slate-100 text-teal-800 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <UploadCloud className="w-4 h-4 mr-1.5 text-teal-600" />
                    Browse Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {fileError && (
                  <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5 shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Uploaded File Pill List */}
                {uploadedFiles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs text-xs"
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                          <span className="font-medium text-slate-800 truncate">
                            {file.name}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label="Remove uploaded file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs text-slate-400">
                    No files attached yet. You can also send reports directly over WhatsApp later.
                  </div>
                )}
              </div>

              {/* Consent Checkbox and Privacy */}
              <div className="space-y-3 pt-1">
                <label className="flex items-start space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed font-medium">
                    {t.consentCheckbox}
                  </span>
                </label>

                <p className="text-[11px] text-slate-500 flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span>{t.privacyNotice}</span>
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:opacity-60 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Enquiry...</span>
                  ) : (
                    <>
                      <span>{t.requestAssistanceCTA}</span>
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
