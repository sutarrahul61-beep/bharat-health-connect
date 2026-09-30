import React, { useState } from 'react';
import {
  Users,
  Building2,
  Stethoscope,
  Settings,
  Shield,
  RefreshCw,
  LogOut,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  Save,
  X,
  ExternalLink,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { Lead, AdminUser } from './types';
import { Hospital, Doctor, SiteConfig, LeadStatus, LeadSubmission } from '../../types';
import { AuditLogsView } from './AuditLogsView';
import { NewPatientForm } from './NewPatientForm';

export interface AdminDashboardProps {
  onLogout?: () => void;
  leads?: Lead[];
  onRefreshLeads?: () => Promise<void> | void;
  isRefreshingLeads?: boolean;
  hospitals?: Hospital[];
  onSaveHospital?: (hospital: Hospital) => void;
  onDeleteHospital?: (id: string) => void;
  doctors?: Doctor[];
  onSaveDoctor?: (doctor: Doctor) => void;
  onDeleteDoctor?: (id: string) => void;
  siteConfig?: SiteConfig;
  onUpdateSiteConfig?: (updatedConfig: SiteConfig) => void;
  onUpdateLeadStatus?: (id: string, status: LeadStatus, notes?: string) => void;
  onAddLead?: (newLeadData: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  leads = [],
  onRefreshLeads,
  isRefreshingLeads = false,
  hospitals = [],
  onSaveHospital,
  onDeleteHospital,
  doctors = [],
  onSaveDoctor,
  onDeleteDoctor,
  siteConfig,
  onUpdateSiteConfig,
  onUpdateLeadStatus,
  onAddLead,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'hospitals' | 'doctors' | 'config' | 'audit'>('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  // Config form local state
  const [configForm, setConfigForm] = useState<SiteConfig>(() => siteConfig || {
    brandName: 'Bharat Health Connect',
    location: 'Miraj – Sangli Medical Hub, Maharashtra, India',
    whatsappNumber: '919527519903',
    phoneDisplay: '+91 95275 19903',
    email: 'care@bharathealthconnect.com',
    responseTimeNote: 'Clinical review within 2 to 4 hours on business days',
    address: 'Miraj Junction Medical Corridor, Maharashtra, India',
  });

  const allStatuses: LeadStatus[] = [
    'New',
    'Contacted',
    'Reports Received',
    'Doctor Review',
    'Hospital Coordination',
    'Estimate Sent',
    'Travel Planning',
    'Arrived',
    'Treatment',
    'Follow-up',
    'Converted',
    'Closed',
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.treatmentRequired?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);
    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-100 text-slate-800">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
            BHC
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>Bharat Health Connect — Staff Command Portal</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-900/80 text-teal-300 border border-teal-700/50">
                Staff Verified
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Miraj–Sangli Medical Facilitation Operations & Audit Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onRefreshLeads && (
            <button
              onClick={() => onRefreshLeads()}
              disabled={isRefreshingLeads}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLeads ? 'animate-spin' : ''}`} />
              <span>{isRefreshingLeads ? 'Syncing...' : 'Refresh'}</span>
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Portal</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Body with Sidebar Tabs */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-3">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-teal-600" />
                <span>Patient Inquiries</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hospitals')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'hospitals'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Hospital Network</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">
                {hospitals.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Specialist Doctors</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">
                {doctors.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'config'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4 text-teal-600" />
              <span>Site Configuration</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4 text-teal-600" />
              <span>RBAC Security & Audit</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="font-bold text-slate-700">Miraj Operations Hub</div>
            <div>Phone: +91 95275 19903</div>
            <div className="text-[10px] text-emerald-600 font-semibold">● Server Connected</div>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PATIENT INQUIRIES & LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-5">
              {/* Header & Filter Controls */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Patient Inquiries & Leads ({filteredLeads.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time enquiries submitted via website form and hospital referrals.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search patient, country, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Ref ID / Date</th>
                        <th className="py-3 px-4">Patient Details</th>
                        <th className="py-3 px-4">Treatment Required</th>
                        <th className="py-3 px-4">Preferred Center</th>
                        <th className="py-3 px-4">Reports</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No inquiries match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono text-[11px]">
                              <div className="font-bold text-slate-800">{lead.id}</div>
                              <div className="text-slate-400 text-[10px]">{lead.createdAt}</div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900">{lead.patientName}</div>
                              <div className="text-slate-500 text-[11px] flex items-center gap-1">
                                <span>{lead.country}</span>
                                <span>•</span>
                                <span>{lead.phone}</span>
                              </div>
                              <div className="text-[10px] text-slate-400">{lead.email}</div>
                            </td>

                            <td className="py-3 px-4 font-medium text-slate-800">
                              {lead.treatmentRequired}
                            </td>

                            <td className="py-3 px-4 text-slate-600 text-[11px]">
                              {lead.preferredHospital || 'No preference'}
                            </td>

                            <td className="py-3 px-4">
                              {lead.reports && lead.reports.length > 0 ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-semibold border border-teal-200">
                                  <FileText className="w-3 h-3" />
                                  <span>{lead.reports.length} report(s)</span>
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[10px]">No files</span>
                              )}
                            </td>

                            <td className="py-3 px-4">
                              {onUpdateLeadStatus ? (
                                <select
                                  value={lead.status}
                                  onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                  className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                                >
                                  {allStatuses.map((st) => (
                                    <option key={st} value={st}>
                                      {st}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="font-semibold text-slate-700">{lead.status}</span>
                              )}
                            </td>

                            <td className="py-3 px-4 text-right">
                              {lead.phone && (
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.patientName}, this is Bharat Health Connect regarding your inquiry ref ${lead.id}.`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] border border-emerald-200 transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOSPITAL NETWORK */}
          {activeTab === 'hospitals' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Hospital Network Management ({hospitals.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure verified hospital partners and accredited facilities in Miraj and Sangli.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingHospital(null);
                    setIsHospitalModalOpen(true);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Hospital</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {hospitals.map((hosp) => (
                  <div
                    key={hosp.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {hosp.city}
                        </span>
                        {hosp.isPartner && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            Partner Center
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{hosp.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{hosp.description}</p>
                      <div className="text-[11px] text-slate-600 mt-3 space-y-1">
                        <div>
                          <span className="font-medium text-slate-700">Accreditation: </span>
                          <span>{hosp.accreditation}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Specialties: </span>
                          <span>{hosp.specialties.slice(0, 3).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setEditingHospital(hosp);
                          setIsHospitalModalOpen(true);
                        }}
                        className="text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                      >
                        Edit Center
                      </button>
                      {onDeleteHospital && (
                        <button
                          onClick={() => onDeleteHospital(hosp.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOCTORS */}
          {activeTab === 'doctors' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Consultant Specialists & Faculty ({doctors.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage board-certified surgeons and specialists available for patient consultations.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingDoctor(null);
                    setIsDoctorModalOpen(true);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Specialist</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm border border-teal-200">
                          {doc.avatarText || 'DR'}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{doc.name}</h4>
                          <span className="text-[10px] text-teal-700 font-semibold">{doc.specialty}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                      <div className="text-[10px] text-slate-600 mt-2">
                        <span>{doc.hospital}</span> • <span>{doc.yearsExperience}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setEditingDoctor(doc);
                          setIsDoctorModalOpen(true);
                        }}
                        className="text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                      >
                        Edit Profile
                      </button>
                      {onDeleteDoctor && (
                        <button
                          onClick={() => onDeleteDoctor(doc.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORM CONFIGURATION */}
          {activeTab === 'config' && (
            <div className="max-w-2xl bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Global Platform & Contact Configuration
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update live contact numbers, brand title, and response service standards.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onUpdateSiteConfig) {
                    onUpdateSiteConfig(configForm);
                  }
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={configForm.brandName}
                    onChange={(e) => setConfigForm({ ...configForm, brandName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official WhatsApp (no +)</label>
                    <input
                      type="text"
                      value={configForm.whatsappNumber}
                      onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                      placeholder="919527519903"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Display Label</label>
                    <input
                      type="text"
                      value={configForm.phoneDisplay}
                      onChange={(e) => setConfigForm({ ...configForm, phoneDisplay: e.target.value })}
                      placeholder="+91 95275 19903"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Public Support Email</label>
                  <input
                    type="email"
                    value={configForm.email}
                    onChange={(e) => setConfigForm({ ...configForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service SLA Response Note</label>
                  <input
                    type="text"
                    value={configForm.responseTimeNote}
                    onChange={(e) => setConfigForm({ ...configForm, responseTimeNote: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: RBAC SECURITY & AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div>
              <AuditLogsView logs={[]} />
            </div>
          )}
        </main>
      </div>

      {/* Hospital Add/Edit Modal */}
      {isHospitalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingHospital ? 'Edit Hospital Center' : 'Add New Hospital'}
              </h3>
              <button
                onClick={() => setIsHospitalModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                const newHosp: Hospital = {
                  id: editingHospital?.id || `HOSP-${Date.now().toString().slice(-4)}`,
                  name: form.hospName.value,
                  city: form.hospCity.value,
                  specialties: form.hospSpecialties.value.split(',').map((s: string) => s.trim()),
                  facilities: ['Modular OTs', '24x7 Emergency', 'ICU'],
                  address: form.hospAddress.value,
                  phone: form.hospPhone.value,
                  website: form.hospWebsite.value,
                  accreditation: form.hospAccreditation.value,
                  isPartner: form.hospPartner.checked,
                  description: form.hospDesc.value,
                };
                if (onSaveHospital) onSaveHospital(newHosp);
                setIsHospitalModalOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-semibold mb-1">Hospital Name</label>
                <input
                  name="hospName"
                  required
                  defaultValue={editingHospital?.name || ''}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    name="hospCity"
                    required
                    defaultValue={editingHospital?.city || 'Miraj'}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone</label>
                  <input
                    name="hospPhone"
                    defaultValue={editingHospital?.phone || '+91 233 222 3291'}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Specialties (comma separated)</label>
                <input
                  name="hospSpecialties"
                  defaultValue={editingHospital?.specialties?.join(', ') || 'Orthopaedics, Cardiology, General Surgery'}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Accreditation</label>
                <input
                  name="hospAccreditation"
                  defaultValue={editingHospital?.accreditation || 'NABH Accredited'}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Website URL</label>
                <input
                  name="hospWebsite"
                  defaultValue={editingHospital?.website || 'https://mirajmedicalcentre.org'}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Address</label>
                <input
                  name="hospAddress"
                  defaultValue={editingHospital?.address || 'Miraj, Maharashtra 416410'}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="hospDesc"
                  rows={2}
                  defaultValue={editingHospital?.description || ''}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="hospPartner"
                  name="hospPartner"
                  defaultChecked={editingHospital?.isPartner ?? true}
                />
                <label htmlFor="hospPartner" className="font-semibold text-slate-700">
                  Designate as Formal Verified Partner Center
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsHospitalModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                >
                  Save Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctor Add/Edit Modal */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor'}
              </h3>
              <button
                onClick={() => setIsDoctorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                const newDoc: Doctor = {
                  id: editingDoctor?.id || `DOC-${Date.now().toString().slice(-4)}`,
                  name: form.docName.value,
                  specialty: form.docSpecialty.value,
                  qualification: form.docQual.value,
                  yearsExperience: form.docExp.value,
                  hospital: form.docHosp.value,
                  languages: ['English', 'Marathi', 'Hindi'],
                  consultationType: 'In-Person & Teleconsultation',
                  avatarText: form.docName.value.split(' ').map((n: string) => n[0]).join('').slice(0, 2),
                  verified: true,
                };
                if (onSaveDoctor) onSaveDoctor(newDoc);
                setIsDoctorModalOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-semibold mb-1">Doctor Name</label>
                <input
                  name="docName"
                  required
                  defaultValue={editingDoctor?.name || 'Dr. '}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Medical Specialty</label>
                <input
                  name="docSpecialty"
                  required
                  defaultValue={editingDoctor?.specialty || ''}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Qualifications & Degrees</label>
                <input
                  name="docQual"
                  defaultValue={editingDoctor?.qualification || 'MBBS, MS, Fellowship'}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Experience</label>
                  <input
                    name="docExp"
                    defaultValue={editingDoctor?.yearsExperience || '15+ Years Experience'}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Affiliated Hospital</label>
                  <input
                    name="docHosp"
                    defaultValue={editingDoctor?.hospital || 'Wanless Hospital (Miraj Medical Centre)'}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                >
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
