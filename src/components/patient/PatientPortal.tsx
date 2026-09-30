import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShieldCheck,
  User,
  FileText,
  Clock,
  Calendar,
  Receipt,
  MessageSquare,
  LogOut,
  ChevronDown,
  Building2,
  Lock,
  AlertTriangle,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { PatientAuth } from './PatientAuth';
import { PatientDashboard } from './PatientDashboard';
import { PatientProfile } from './PatientProfile';
import { PatientDocuments } from './PatientDocuments';
import { PatientTimeline } from './PatientTimeline';
import { PatientAppointments } from './PatientAppointments';
import { PatientPayments } from './PatientPayments';
import { PatientMessages } from './PatientMessages';
import {
  PatientUserSession,
  PatientDocumentItem,
  PatientAppointmentItem,
  PatientPaymentItem,
  PortalMessageItem,
  TreatmentTimelineStageInfo,
} from '../../types/portalTypes';
import { PatientRecord } from '../admin/types';
import {
  initialPatientDocuments,
  initialPatientAppointments,
  initialPatientPayments,
  initialPortalMessages,
  generateDefaultTimelineStages,
} from '../../data/portalMockData';
import { initialPatientsData } from '../admin/adminData';

interface PatientPortalProps {
  onBackToMain?: () => void;
  isStandalone?: boolean;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  onBackToMain,
  isStandalone = true,
}) => {
  // Session State
  const [session, setSession] = useState<PatientUserSession | null>(() => {
    try {
      const saved = localStorage.getItem('bhc_patient_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  // Current Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'profile' | 'documents' | 'timeline' | 'appointments' | 'payments' | 'messages'
  >('dashboard');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  // Synchronize session to localStorage
  useEffect(() => {
    if (session) {
      try {
        localStorage.setItem('bhc_patient_session', JSON.stringify(session));
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.removeItem('bhc_patient_session');
      } catch {
        // ignore
      }
    }
  }, [session]);

  // URL Parameter Tampering Detection & Enforcement (as required by prompt)
  useEffect(() => {
    if (!session) return;
    const searchParams = new URLSearchParams(window.location.search);
    const requestedPatientId = searchParams.get('id') || searchParams.get('patientId');
    if (requestedPatientId && requestedPatientId !== session.patientId) {
      setSecurityAlert(
        `Security Alert: Cross-patient access denied. You are authenticated as Patient ID ${session.patientId}. You cannot access ${requestedPatientId}. Reverting to your authorized profile.`
      );
      // Clean up URL parameter to prevent spoofing
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
      setTimeout(() => setSecurityAlert(null), 6000);
    }
  }, [session]);

  // Patient Records State (persisted)
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_patients_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialPatientsData;
  });

  // Documents State
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

  // Appointments State
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

  // Payments State
  const [payments, setPayments] = useState<PatientPaymentItem[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_patient_payments');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialPatientPayments;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_patient_payments', JSON.stringify(payments));
    } catch {
      // ignore
    }
  }, [payments]);

  // Messages State
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

  // Current Patient Record Resolver
  const currentPatient: PatientRecord = session
    ? patients.find((p) => p.id === session.patientId) || {
        id: session.patientId,
        registeredDate: '2026-09-20',
        fullName: session.fullName,
        firstName: session.fullName.split(' ')[0],
        lastName: session.fullName.split(' ')[1] || '',
        dob: '1992-04-12',
        age: 34,
        gender: 'Male',
        nationality: 'India',
        country: 'India',
        preferredLanguage: 'English',
        passportNumber: 'Z8921473',
        address: 'Miraj, Maharashtra, India',
        city: 'Miraj',
        emergencyContact: {
          name: 'Family Contact',
          relationship: 'Next of Kin',
          phone: session.mobile,
        },
        email: session.email,
        phone: session.mobile,
        whatsappNumber: session.mobile,
        treatment: 'Cardiology - Preventive & Diagnostic Assessment',
        specialty: 'Cardiology',
        briefProblem: 'Comprehensive cardiac review and specialist consultation.',
        preferredHospital: 'Wanless Hospital (Miraj Medical Centre)',
        assignedDoctor: 'Dr. C (Cardiologist)',
        visaRequired: false,
        visaStatus: 'Not Required',
        accompanyingPersons: 1,
        accommodationRequired: false,
        airportPickupRequired: false,
        travelAssistanceRequired: false,
        stage: 'TREATMENT COMPLETED',
        priority: 'Normal',
        assignedStaff: 'Rahul Sutar (Coordinator)',
        lastContactDate: '2026-09-20',
        documents: [],
      }
    : initialPatientsData[0];

  // Treatment timeline stages
  const timelineStages = generateDefaultTimelineStages(
    session?.patientId === 'BHC-P-000001' ? 9 : 4
  );

  // Synchronize with backend API using secure session token
  useEffect(() => {
    if (!session) return;
    const fetchServerData = async () => {
      try {
        // Fetch Patient Profile
        const resPatient = await fetch(`/api/patients/${session.patientId}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
            'x-patient-id': session.patientId,
          },
        });
        if (resPatient.ok) {
          const patientData = await resPatient.json();
          setPatients((prev) => {
            const idx = prev.findIndex((p) => p.id === patientData.id);
            if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = patientData;
              return updated;
            }
            return [patientData, ...prev];
          });
        }

        // Fetch Authorized Patient Documents
        const resDocs = await fetch('/api/patient/documents', {
          headers: {
            Authorization: `Bearer ${session.token}`,
            'x-patient-id': session.patientId,
          },
        });
        if (resDocs.ok) {
          const docsData = await resDocs.json();
          if (Array.isArray(docsData)) {
            setDocuments(docsData);
          }
        }
      } catch (err) {
        console.error('Error synchronizing with backend:', err);
      }
    };

    fetchServerData();
  }, [session]);

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem('bhc_patient_session');
    } catch {
      // ignore
    }
  };

  const handleUpdatePatient = async (updated: PatientRecord) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    try {
      localStorage.setItem('bhc_patients_list', JSON.stringify(patients));
      if (session) {
        const res = await fetch(`/api/patients/${updated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`,
            'x-patient-id': session.patientId,
          },
          body: JSON.stringify(updated),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setSecurityAlert(errData.error || 'Server validation rejected update.');
          setTimeout(() => setSecurityAlert(null), 5000);
        }
      }
    } catch (err) {
      console.error('Failed to sync patient update:', err);
    }
  };

  const handleUploadDocument = async (newDoc: PatientDocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    try {
      if (session) {
        await fetch('/api/patient/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`,
            'x-patient-id': session.patientId,
          },
          body: JSON.stringify(newDoc),
        });
      }
    } catch (err) {
      console.error('Failed to sync document upload:', err);
    }
  };

  const handleSendMessage = (newMsg: PortalMessageItem) => {
    setMessages((prev) => [...prev, newMsg]);
  };

  // If not authenticated, render login
  if (!session) {
    return <PatientAuth onLoginSuccess={(sess) => setSession(sess)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col">
      {/* Security alert notification if URL tampering was attempted */}
      {securityAlert && (
        <div className="bg-rose-600 text-white text-xs font-semibold px-4 py-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{securityAlert}</span>
          </div>
          <button onClick={() => setSecurityAlert(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Application Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center font-bold shadow-md">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  Bharat Health Connect
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500 text-slate-950 uppercase tracking-wider">
                  Patient Portal
                </span>
              </div>
              <p className="text-[11px] text-teal-300">
                https://patient.bharathealthconnect.com
              </p>
            </div>
          </div>

          {/* Right Header Navigation & Patient User Badge */}
          <div className="hidden md:flex items-center gap-4">
            {/* Authenticated Patient ID Capsule */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-2.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <div className="font-bold text-slate-100 flex items-center gap-1">
                  <span>{session.fullName}</span>
                </div>
                <div className="text-[10px] text-teal-300 font-mono">
                  ID: {session.patientId}
                </div>
              </div>
            </div>

            {/* Logout Action */}
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
              { id: 'dashboard', label: 'Patient Dashboard', icon: Heart },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'documents', label: 'My Documents (16 Categories)', icon: FileText },
              { id: 'timeline', label: 'Treatment Journey (11 Stages)', icon: Clock },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'payments', label: 'Payments & Receipts', icon: Receipt },
              { id: 'messages', label: 'Messages & Support', icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
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
              <div className="font-bold text-white">{session.fullName}</div>
              <div className="text-[11px] text-teal-300 font-mono">Patient ID: {session.patientId}</div>
            </div>
            {[
              { id: 'dashboard', label: 'Patient Dashboard', icon: Heart },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'documents', label: 'My Documents', icon: FileText },
              { id: 'timeline', label: 'Treatment Journey', icon: Clock },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'payments', label: 'Payments & Receipts', icon: Receipt },
              { id: 'messages', label: 'Messages & Support', icon: MessageSquare },
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
                    activeTab === tab.id ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'
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
          <PatientDashboard
            patient={currentPatient}
            documents={documents.filter((d) => d.patientId === session.patientId)}
            appointments={appointments.filter((a) => a.patientId === session.patientId)}
            payments={payments.filter((p) => p.patientId === session.patientId)}
            messages={messages.filter((m) => m.patientId === session.patientId)}
            timelineStages={timelineStages}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenUploadModal={() => {
              setActiveTab('documents');
              setIsUploadModalOpen(true);
            }}
          />
        )}

        {activeTab === 'profile' && (
          <PatientProfile
            patient={currentPatient}
            onUpdatePatient={handleUpdatePatient}
          />
        )}

        {activeTab === 'documents' && (
          <PatientDocuments
            patientId={session.patientId}
            patientName={session.fullName}
            documents={documents}
            onUploadDocument={handleUploadDocument}
            isUploadModalOpen={isUploadModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
          />
        )}

        {activeTab === 'timeline' && (
          <PatientTimeline
            stages={timelineStages}
            patientTreatment={currentPatient.treatment || 'General Medical Evaluation'}
            assignedHospital={currentPatient.preferredHospital || 'Wanless Hospital Miraj'}
          />
        )}

        {activeTab === 'appointments' && (
          <PatientAppointments
            appointments={appointments}
            patientId={session.patientId}
          />
        )}

        {activeTab === 'payments' && (
          <PatientPayments
            payments={payments}
            patientId={session.patientId}
            patientName={session.fullName}
          />
        )}

        {activeTab === 'messages' && (
          <PatientMessages
            messages={messages}
            patientId={session.patientId}
            patientName={session.fullName}
            assignedStaff={currentPatient.assignedStaff || 'Senior Case Coordinator'}
            assignedHospital={currentPatient.preferredHospital || 'Wanless Hospital Miraj'}
            onSendMessage={handleSendMessage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Bharat Health Connect Patient Portal • Dedicated Medical Vault</span>
          </div>
          <div>
            <a
              href="/"
              className="text-teal-600 hover:underline flex items-center gap-1 font-medium"
            >
              Public Website <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
