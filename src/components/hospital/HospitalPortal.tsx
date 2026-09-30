import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  LogOut,
  ShieldCheck,
  PlusCircle,
  Menu,
  X,
  ExternalLink,
  Award,
} from 'lucide-react';
import { HospitalAuth } from './HospitalAuth';
import { HospitalDashboard } from './HospitalDashboard';
import { HospitalPatients } from './HospitalPatients';
import { HospitalProfile } from './HospitalProfile';
import { HospitalEstimateModal } from './HospitalEstimateModal';
import { HospitalAppointmentModal } from './HospitalAppointmentModal';
import { HospitalDocumentUpload } from './HospitalDocumentUpload';
import { HospitalMessages } from './HospitalMessages';
import {
  HospitalSession,
  HospitalOrganizationProfile,
  HospitalTreatmentEstimate,
  PatientAppointmentItem,
  PatientDocumentItem,
  PortalMessageItem,
} from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';
import {
  initialHospitalProfiles,
  initialHospitalEstimates,
  initialPatientAppointments,
  initialPatientDocuments,
  initialPortalMessages,
} from '../../data/portalMockData';
import { initialPatientsData } from '../admin/adminData';

interface HospitalPortalProps {
  onBackToMain?: () => void;
  isStandalone?: boolean;
}

export const HospitalPortal: React.FC<HospitalPortalProps> = ({
  onBackToMain,
  isStandalone = true,
}) => {
  // Hospital Session State
  const [session, setSession] = useState<HospitalSession | null>(() => {
    try {
      const saved = localStorage.getItem('bhc_hospital_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (session) {
      try {
        localStorage.setItem('bhc_hospital_session', JSON.stringify(session));
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.removeItem('bhc_hospital_session');
      } catch {
        // ignore
      }
    }
  }, [session]);

  // Current Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'patients' | 'profile' | 'estimates' | 'appointments' | 'messages'
  >('dashboard');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [targetPatientForAction, setTargetPatientForAction] = useState<{
    id: string;
    name: string;
    treatment?: string;
  } | null>(null);

  // Hospital Profiles state
  const [hospitalProfiles, setHospitalProfiles] = useState<HospitalOrganizationProfile[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_hospital_profiles');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialHospitalProfiles;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_hospital_profiles', JSON.stringify(hospitalProfiles));
    } catch {
      // ignore
    }
  }, [hospitalProfiles]);

  // Patients state
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_patients_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialPatientsData;
  });

  // Estimates state
  const [estimates, setEstimates] = useState<HospitalTreatmentEstimate[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_hospital_estimates');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialHospitalEstimates;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_hospital_estimates', JSON.stringify(estimates));
    } catch {
      // ignore
    }
  }, [estimates]);

  // Appointments state
  const [appointments, setAppointments] = useState<PatientAppointmentItem[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_patient_appts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialPatientAppointments;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_patient_appts', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  // Documents state
  const [documents, setDocuments] = useState<PatientDocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_patient_docs');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialPatientDocuments;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_patient_docs', JSON.stringify(documents));
    } catch {
      // ignore
    }
  }, [documents]);

  // Messages state
  const [messages, setMessages] = useState<PortalMessageItem[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_portal_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialPortalMessages;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_portal_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // If not logged in, render Hospital Auth
  if (!session) {
    return <HospitalAuth onLoginSuccess={(sess) => setSession(sess)} />;
  }

  // Active Hospital Profile
  const currentHospital =
    hospitalProfiles.find((h) => h.id === session.user.hospitalId) || hospitalProfiles[0];

  // STRICT LEAST-PRIVILEGE FILTER:
  // A hospital user MUST ONLY see patients assigned to that hospital!
  const assignedPatients = patients.filter((p) => {
    const prefHosp = (p.preferredHospital || '').toLowerCase();
    const hospName = currentHospital.name.toLowerCase();
    const hospId = currentHospital.id.toLowerCase();
    return (
      prefHosp.includes('wanless') && hospId.includes('001') ||
      prefHosp.includes('sevasadan') && hospId.includes('002') ||
      prefHosp.includes('synergy') && hospId.includes('003') ||
      prefHosp.includes('gmc') && hospId.includes('004') ||
      prefHosp === hospName ||
      prefHosp === currentHospital.id
    );
  });

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem('bhc_hospital_session');
    } catch {
      // ignore
    }
  };

  const handleUpdateHospital = (updated: HospitalOrganizationProfile) => {
    setHospitalProfiles((prev) =>
      prev.map((h) => (h.id === updated.id ? updated : h))
    );
  };

  const handleAddEstimate = (newEst: HospitalTreatmentEstimate) => {
    setEstimates((prev) => [newEst, ...prev]);

    // Also automatically create a document in the patient's "My Documents"
    const newDoc: PatientDocumentItem = {
      id: `DOC-EST-${Date.now()}`,
      patientId: newEst.patientId,
      name: `${currentHospital.name.slice(0, 15)}_Treatment_Estimate.pdf`,
      category: 'Treatment Estimate',
      fileType: 'application/pdf',
      fileSize: 1200000,
      uploadDate: newEst.createdAt,
      uploadedBy: 'hospital',
      uploadedByName: `${currentHospital.name} (${newEst.createdByHospitalUserName})`,
      hospitalId: currentHospital.id,
      status: 'Verified',
      notes: `Official Treatment Estimate: ${newEst.currency} ${newEst.estimatedCost}. Stay: ${newEst.expectedStayDays} days.`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleAddAppointment = (newAppt: PatientAppointmentItem) => {
    setAppointments((prev) => [newAppt, ...prev]);

    // Also notify via message in thread
    const newMsg: PortalMessageItem = {
      id: `MSG-APPT-${Date.now()}`,
      patientId: newAppt.patientId,
      hospitalId: currentHospital.id,
      senderType: 'hospital',
      senderName: `${currentHospital.name} Appointments Desk`,
      recipientType: 'patient',
      message: `Appointment scheduled with ${newAppt.doctor} on ${newAppt.appointmentDate} at ${newAppt.appointmentTime} (${newAppt.appointmentType}). Location: ${newAppt.location}.`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleUploadDocument = (newDoc: PatientDocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleSendMessage = (newMsg: PortalMessageItem) => {
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col">
      {/* Top Application Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  Bharat Health Connect
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-slate-950 uppercase tracking-wider">
                  Hospital Portal
                </span>
              </div>
              <p className="text-[11px] text-indigo-300">
                https://hospital.bharathealthconnect.com
              </p>
            </div>
          </div>

          {/* Right Header Navigation & Hospital Organization User Badge */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-2.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <div className="font-bold text-slate-100 flex items-center gap-1">
                  <span>{currentHospital.name}</span>
                </div>
                <div className="text-[10px] text-indigo-300">
                  {session.user.name} ({session.user.role}) • ID: {currentHospital.id}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 hidden md:block">
          <nav className="flex space-x-1 py-1.5 text-xs font-medium">
            {[
              { id: 'dashboard', label: 'Hospital Dashboard', icon: Building2 },
              { id: 'patients', label: `Assigned Patients (${assignedPatients.length})`, icon: Users },
              { id: 'profile', label: 'Hospital Organization Profile', icon: Award },
              { id: 'estimates', label: `Treatment Estimates (${estimates.filter((e) => e.hospitalId === currentHospital.id).length})`, icon: FileText },
              { id: 'appointments', label: 'Appointments & Consultations', icon: Calendar },
              { id: 'messages', label: 'Coordinator Channel', icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-2">
            <div className="p-3 bg-slate-800 rounded-xl mb-3 text-xs">
              <div className="font-bold text-white">{currentHospital.name}</div>
              <div className="text-[11px] text-indigo-300 font-mono">Hospital ID: {currentHospital.id}</div>
              <div className="text-[11px] text-slate-400">User: {session.user.name}</div>
            </div>
            {[
              { id: 'dashboard', label: 'Hospital Dashboard', icon: Building2 },
              { id: 'patients', label: 'Assigned Patients', icon: Users },
              { id: 'profile', label: 'Hospital Organization Profile', icon: Award },
              { id: 'estimates', label: 'Treatment Estimates', icon: FileText },
              { id: 'appointments', label: 'Appointments & Consultations', icon: Calendar },
              { id: 'messages', label: 'Coordinator Channel', icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                    activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full mt-2 p-2.5 rounded-xl text-left text-xs font-semibold text-rose-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'dashboard' && (
          <HospitalDashboard
            hospital={currentHospital}
            user={session.user}
            assignedPatients={assignedPatients}
            estimates={estimates}
            appointments={appointments}
            messages={messages}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenEstimateModal={() => {
              setTargetPatientForAction(null);
              setIsEstimateModalOpen(true);
            }}
            onOpenAppointmentModal={() => {
              setTargetPatientForAction(null);
              setIsAppointmentModalOpen(true);
            }}
            onOpenUploadModal={() => {
              setTargetPatientForAction(null);
              setIsUploadModalOpen(true);
            }}
          />
        )}

        {activeTab === 'patients' && (
          <HospitalPatients
            hospitalId={currentHospital.id}
            hospitalName={currentHospital.name}
            assignedPatients={assignedPatients}
            documents={documents}
            appointments={appointments}
            estimates={estimates}
            onOpenUploadDocumentForPatient={(pId, pName) => {
              setTargetPatientForAction({ id: pId, name: pName });
              setIsUploadModalOpen(true);
            }}
            onOpenEstimateForPatient={(pId, pName, treatment) => {
              setTargetPatientForAction({ id: pId, name: pName, treatment });
              setIsEstimateModalOpen(true);
            }}
            onOpenAppointmentForPatient={(pId, pName) => {
              setTargetPatientForAction({ id: pId, name: pName });
              setIsAppointmentModalOpen(true);
            }}
          />
        )}

        {activeTab === 'profile' && (
          <HospitalProfile
            hospital={currentHospital}
            onUpdateHospital={handleUpdateHospital}
          />
        )}

        {activeTab === 'estimates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Treatment Estimates & Quotations
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Official clinical quotes prepared for patients referred to {currentHospital.name}.
                </p>
              </div>
              <button
                onClick={() => {
                  setTargetPatientForAction(null);
                  setIsEstimateModalOpen(true);
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                Generate New Treatment Estimate
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Estimate ID</th>
                      <th className="py-3.5 px-4">Patient Name & ID</th>
                      <th className="py-3.5 px-4">Procedure / Surgery</th>
                      <th className="py-3.5 px-4">Doctor</th>
                      <th className="py-3.5 px-4">Estimated Cost</th>
                      <th className="py-3.5 px-4">Stay</th>
                      <th className="py-3.5 px-4">Validity</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {estimates
                      .filter((e) => e.hospitalId === currentHospital.id)
                      .map((est) => (
                        <tr key={est.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                            {est.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{est.patientName}</div>
                            <div className="text-[11px] font-mono text-indigo-600">{est.patientId}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-900">
                            {est.treatment}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{est.doctor}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                            {est.currency} {est.estimatedCost.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                            {est.expectedStayDays} days
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                            {est.validityDate}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                              {est.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Hospital Consultation & Surgery Slots
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Active OPD and Video consultations scheduled by {currentHospital.name}.
                </p>
              </div>
              <button
                onClick={() => {
                  setTargetPatientForAction(null);
                  setIsAppointmentModalOpen(true);
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                Schedule New Appointment
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Ref #</th>
                      <th className="py-3.5 px-4">Patient</th>
                      <th className="py-3.5 px-4">Doctor & Department</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Venue</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {appointments
                      .filter((a) => a.hospitalId === currentHospital.id)
                      .map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                            {appt.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{appt.patientName}</div>
                            <div className="text-[11px] font-mono text-indigo-600">{appt.patientId}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{appt.doctor}</div>
                            <div className="text-[11px] text-slate-500">{appt.department}</div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-900">
                            <strong>{appt.appointmentDate}</strong> at {appt.appointmentTime}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-800">
                              {appt.appointmentType}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                            {appt.location}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <HospitalMessages
            hospitalId={currentHospital.id}
            hospitalName={currentHospital.name}
            hospitalUserId={session.user.id}
            hospitalUserName={session.user.name}
            assignedPatients={assignedPatients}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Bharat Health Connect • Hospital Partner Portal</span>
          </div>
          <div>
            <a
              href="/"
              className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
            >
              Public Website <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isEstimateModalOpen && (
        <HospitalEstimateModal
          hospitalId={currentHospital.id}
          hospitalName={currentHospital.name}
          hospitalUserId={session.user.id}
          hospitalUserName={session.user.name}
          assignedPatients={assignedPatients}
          initialPatientId={targetPatientForAction?.id}
          initialTreatment={targetPatientForAction?.treatment}
          onClose={() => {
            setIsEstimateModalOpen(false);
            setTargetPatientForAction(null);
          }}
          onSubmitEstimate={handleAddEstimate}
        />
      )}

      {isAppointmentModalOpen && (
        <HospitalAppointmentModal
          hospitalId={currentHospital.id}
          hospitalName={currentHospital.name}
          assignedPatients={assignedPatients}
          initialPatientId={targetPatientForAction?.id}
          onClose={() => {
            setIsAppointmentModalOpen(false);
            setTargetPatientForAction(null);
          }}
          onSubmitAppointment={handleAddAppointment}
        />
      )}

      {isUploadModalOpen && (
        <HospitalDocumentUpload
          hospitalId={currentHospital.id}
          hospitalName={currentHospital.name}
          hospitalUserId={session.user.id}
          hospitalUserName={session.user.name}
          assignedPatients={assignedPatients}
          initialPatientId={targetPatientForAction?.id}
          onClose={() => {
            setIsUploadModalOpen(false);
            setTargetPatientForAction(null);
          }}
          onUploadDocument={handleUploadDocument}
        />
      )}
    </div>
  );
};
