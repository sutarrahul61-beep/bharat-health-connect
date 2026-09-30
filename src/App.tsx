import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickEnquiryCard } from './components/QuickEnquiryCard';
import { WhyMiraj } from './components/WhyMiraj';
import { SpecialtyGrid } from './components/SpecialtyGrid';
import { ProcessTimeline } from './components/ProcessTimeline';
import { InternationalServices } from './components/InternationalServices';
import { CostSection } from './components/CostSection';
import { HospitalNetwork } from './components/HospitalNetwork';
import { DoctorSection } from './components/DoctorSection';
import { PatientJourney } from './components/PatientJourney';
import { TravelStay } from './components/TravelStay';
import { ComparisonSection } from './components/ComparisonSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustSection } from './components/TrustSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CountryLandingModal } from './components/CountryLandingModal';
import { AdminPortal } from './components/AdminPortal';
import { PatientPortal } from './components/patient/PatientPortal';
import { HospitalPortal } from './components/hospital/HospitalPortal';
import { LegalModal } from './components/LegalModal';
import { AIChatWidget } from './components/AIChatWidget';

import { SupportedLanguage, detectSupportedLanguage } from './data/translations';
import { initialSiteConfig, sampleInitialLeads, hospitalsData, doctorsPlaceholderData } from './data/mockData';
import { LeadSubmission, LeadStatus, Hospital, Doctor, SiteConfig } from './types';
import { api } from './services/api';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => detectSupportedLanguage());
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // Dynamic Site Config state with localStorage persistence
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('bhc_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure the official mobile number 9527519903 is used even if old mock was cached
        if (parsed.whatsappNumber === '919822000000' || parsed.phoneDisplay?.includes('220 0000')) {
          parsed.whatsappNumber = '919527519903';
          parsed.phoneDisplay = '+91 95275 19903';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return initialSiteConfig;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_site_config', JSON.stringify(siteConfig));
    } catch {
      // ignore
    }
  }, [siteConfig]);

  // Listen for hash changes (e.g. #admin) and keyboard shortcut (Alt+A or Ctrl+Shift+A)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination for staff to open admin portal without public buttons: Alt+A or Ctrl+Shift+A
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Synchronize document direction for Arabic RTL support and persist language choice
  useEffect(() => {
    const isRtl = currentLang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    try {
      localStorage.setItem('user_language', currentLang);
    } catch {
      // ignore
    }
  }, [currentLang]);

  // Form pre-selection states
  const [preselectedTreatment, setPreselectedTreatment] = useState('');
  const [preselectedHospital, setPreselectedHospital] = useState('');
  const [preselectedDoctor, setPreselectedDoctor] = useState('');

  // Dynamic Hospitals state with localStorage persistence
  const [hospitals, setHospitals] = useState<Hospital[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_custom_hospitals');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return hospitalsData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_custom_hospitals', JSON.stringify(hospitals));
    } catch {
      // ignore
    }
  }, [hospitals]);

  // Dynamic Doctors state with localStorage persistence
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('bhc_custom_doctors');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return doctorsPlaceholderData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhc_custom_doctors', JSON.stringify(doctors));
    } catch {
      // ignore
    }
  }, [doctors]);

  // Leads state with localStorage persistence
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('miraj_medical_leads');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return sampleInitialLeads;
  });

  // Sync leads to localStorage as fallback
  useEffect(() => {
    try {
      localStorage.setItem('miraj_medical_leads', JSON.stringify(leads));
    } catch {
      // ignore
    }
  }, [leads]);

  // Initial fetch and auto-polling from server
  const fetchAllFromServer = async () => {
    try {
      const serverLeads = await api.getLeads();
      if (serverLeads && serverLeads.length > 0) {
        setLeads(serverLeads);
      }
      const serverHospitals = await api.getHospitals();
      if (serverHospitals && serverHospitals.length > 0) {
        setHospitals(serverHospitals);
      }
      const serverDoctors = await api.getDoctors();
      if (serverDoctors && serverDoctors.length > 0) {
        setDoctors(serverDoctors);
      }
      const serverConfig = await api.getConfig();
      if (serverConfig) {
        setSiteConfig(serverConfig);
      }
    } catch (e) {
      console.warn('Backend sync failed, relying on local storage cache:', e);
    }
  };

  useEffect(() => {
    fetchAllFromServer();

    // Auto-poll every 3.5 seconds so incoming enquiries submitted by any patient appear in real time
    const interval = setInterval(async () => {
      try {
        const serverLeads = await api.getLeads();
        if (serverLeads && serverLeads.length > 0) {
          setLeads((currentLeads) => {
            if (JSON.stringify(currentLeads) !== JSON.stringify(serverLeads)) {
              return serverLeads;
            }
            return currentLeads;
          });
        }
      } catch {
        // ignore
      }
    }, 3500);

    // Background real-time live events subscription (SSE)
    const unsubscribeLive = api.subscribeToLiveEvents((event) => {
      if (event.type === 'LEADS_UPDATED' && Array.isArray(event.data)) {
        setLeads(event.data);
      } else if (event.type === 'HOSPITALS_UPDATED' && Array.isArray(event.data)) {
        setHospitals(event.data);
      } else if (event.type === 'DOCTORS_UPDATED' && Array.isArray(event.data)) {
        setDoctors(event.data);
      } else if (event.type === 'CONFIG_UPDATED' && event.data) {
        setSiteConfig(event.data);
      }
    });

    // Cross-tab storage synchronization
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === 'miraj_medical_leads' && e.newValue) {
        try {
          setLeads(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorageChange);

    return () => {
      clearInterval(interval);
      unsubscribeLive();
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  // Hospital CRUD handlers
  const handleSaveHospital = (savedHospital: Hospital) => {
    setHospitals((prev) => {
      const existingIdx = prev.findIndex((h) => h.id === savedHospital.id);
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = savedHospital;
        return next;
      }
      return [savedHospital, ...prev];
    });
    api.saveHospital(savedHospital);
  };

  const handleDeleteHospital = (id: string) => {
    setHospitals((prev) => prev.filter((h) => h.id !== id));
    api.deleteHospital(id);
  };

  // Doctor CRUD handlers
  const handleSaveDoctor = (savedDoctor: Doctor) => {
    setDoctors((prev) => {
      const existingIdx = prev.findIndex((d) => d.id === savedDoctor.id);
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = savedDoctor;
        return next;
      }
      return [savedDoctor, ...prev];
    });
    api.saveDoctor(savedDoctor);
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    api.deleteDoctor(id);
  };

  // Reset to default initial data
  const handleResetData = () => {
    setHospitals(hospitalsData);
    setDoctors(doctorsPlaceholderData);
    setLeads(sampleInitialLeads);
    setSiteConfig(initialSiteConfig);
    try {
      localStorage.removeItem('bhc_custom_hospitals');
      localStorage.removeItem('bhc_custom_doctors');
      localStorage.removeItem('miraj_medical_leads');
      localStorage.removeItem('bhc_site_config');
    } catch {
      // ignore
    }
    api.resetData();
  };

  const handleCreateLead = (
    newLeadData: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>
  ): string => {
    const newId = `MSMT-${Date.now().toString().slice(-6)}`;
    const newLead: LeadSubmission = {
      ...newLeadData,
      id: newId,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'New',
    };
    // Optimistically update React state immediately
    setLeads((prev) => [newLead, ...prev.filter((l) => l.id !== newId)]);

    // Save to central server API
    api.createLead(newLead).then((persistedLead) => {
      setLeads((prev) => [persistedLead, ...prev.filter((l) => l.id !== persistedLead.id)]);
    }).catch((err) => {
      console.warn('Could not persist to server, saved locally:', err);
    });

    return newId;
  };

  const handleUpdateLeadStatus = (
    id: string,
    status: LeadStatus,
    notes?: string
  ) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, status, notes: notes !== undefined ? notes : lead.notes }
          : lead
      )
    );
    api.updateLead(id, status, notes);
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('quick-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectSpecialty = (specialtyName: string) => {
    setPreselectedTreatment(specialtyName);
    scrollToEnquiry();
  };

  const handleSelectHospital = (hospitalName: string) => {
    setPreselectedHospital(hospitalName);
    scrollToEnquiry();
  };

  const handleSelectDoctor = (doctorName: string) => {
    setPreselectedDoctor(doctorName);
    scrollToEnquiry();
  };

  const handleStartEnquiryForCountry = (countryName: string) => {
    // When selected from country modal, scroll to form
    scrollToEnquiry();
  };

  // Subdomain & dedicated route detection (e.g., admin.bharathealthconnect.com, patient.bharathealthconnect.com, hospital.bharathealthconnect.com)
  const isDedicatedAdmin = () => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      hostname.startsWith('admin.') ||
      pathname === '/admin' ||
      pathname.startsWith('/admin/') ||
      search.includes('portal=admin') ||
      hash === '#admin'
    );
  };

  const isDedicatedPatient = () => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      hostname.startsWith('patient.') ||
      pathname === '/patient' ||
      pathname.startsWith('/patient/') ||
      search.includes('portal=patient') ||
      hash === '#patient'
    );
  };

  const isDedicatedHospital = () => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      hostname.startsWith('hospital.') ||
      pathname === '/hospital' ||
      pathname.startsWith('/hospital/') ||
      search.includes('portal=hospital') ||
      hash === '#hospital'
    );
  };

  const [activePortalView, setActivePortalView] = useState<'main' | 'admin' | 'patient' | 'hospital'>(() => {
    if (isDedicatedAdmin()) return 'admin';
    if (isDedicatedPatient()) return 'patient';
    if (isDedicatedHospital()) return 'hospital';
    return 'main';
  });

  useEffect(() => {
    const handleUrlChange = () => {
      if (isDedicatedAdmin()) setActivePortalView('admin');
      else if (isDedicatedPatient()) setActivePortalView('patient');
      else if (isDedicatedHospital()) setActivePortalView('hospital');
      else setActivePortalView('main');
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // 1. Separate Patient Portal Application View
  if (activePortalView === 'patient' || isDedicatedPatient()) {
    return (
      <PatientPortal
        isStandalone={true}
        onBackToMain={() => {
          if (window.location.hostname.startsWith('patient.')) {
            window.location.href = window.location.protocol + '//' + window.location.hostname.replace(/^patient\./, '');
          } else {
            window.location.href = '/';
          }
        }}
      />
    );
  }

  // 2. Separate Hospital Partner Portal Application View
  if (activePortalView === 'hospital' || isDedicatedHospital()) {
    return (
      <HospitalPortal
        isStandalone={true}
        onBackToMain={() => {
          if (window.location.hostname.startsWith('hospital.')) {
            window.location.href = window.location.protocol + '//' + window.location.hostname.replace(/^hospital\./, '');
          } else {
            window.location.href = '/';
          }
        }}
      />
    );
  }

  // 3. Separate Admin Portal Application View
  if (activePortalView === 'admin' || isDedicatedAdmin()) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-900 font-sans">
        <AdminPortal
          isOpen={true}
          isStandalone={true}
          onClose={() => {
            if (window.location.hostname.startsWith('admin.')) {
              window.location.href = window.location.protocol + '//' + window.location.hostname.replace(/^admin\./, '');
            } else {
              window.location.href = '/';
            }
          }}
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onAddLead={handleCreateLead}
          onRefreshLeads={fetchAllFromServer}
          hospitals={hospitals}
          onSaveHospital={handleSaveHospital}
          onDeleteHospital={handleDeleteHospital}
          doctors={doctors}
          onSaveDoctor={handleSaveDoctor}
          onDeleteDoctor={handleDeleteDoctor}
          onResetData={handleResetData}
          siteConfig={siteConfig}
          onUpdateSiteConfig={setSiteConfig}
        />
      </div>
    );
  }

  return (
    <div
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900"
    >
      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        siteConfig={siteConfig}
        onOpenCountryModal={(slug) => setSelectedCountryCode(slug || 'international')}
        leadCount={leads.length}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          currentLang={currentLang}
          siteConfig={siteConfig}
          onGetAssistanceClick={scrollToEnquiry}
        />

        {/* 2. Quick Enquiry Card */}
        <QuickEnquiryCard
          currentLang={currentLang}
          siteConfig={siteConfig}
          onSubmitLead={handleCreateLead}
          preselectedTreatment={preselectedTreatment}
          preselectedHospital={preselectedHospital}
          preselectedDoctor={preselectedDoctor}
          hospitals={hospitals}
          doctors={doctors}
        />

        {/* 3. Why Miraj–Sangli Section */}
        <WhyMiraj
          currentLang={currentLang}
          siteConfig={siteConfig}
        />

        {/* 4. Medical Specialties Grid (20 specialties, searchable) */}
        <SpecialtyGrid
          currentLang={currentLang}
          onSelectSpecialty={handleSelectSpecialty}
        />

        {/* 5. How It Works (6-Step Timeline) */}
        <ProcessTimeline
          currentLang={currentLang}
          onEnquireClick={scrollToEnquiry}
        />

        {/* 6. International Patient Services (Support Beyond Hospital) */}
        <InternationalServices
          currentLang={currentLang}
          onEnquireClick={scrollToEnquiry}
        />

        {/* 7. Treatment Cost Section (Transparent structure, no fake prices) */}
        <CostSection
          currentLang={currentLang}
          onRequestEstimateClick={scrollToEnquiry}
        />

        {/* 8. Hospital Network (Careful partner / explore distinction) */}
        <HospitalNetwork
          currentLang={currentLang}
          onSelectHospital={handleSelectHospital}
          hospitals={hospitals}
        />

        {/* 9. Doctor Section (Specialist cards & consultation request) */}
        <DoctorSection
          currentLang={currentLang}
          onSelectDoctor={handleSelectDoctor}
          doctors={doctors}
        />

        {/* 10. Patient Journey (11-Stage visual pathway) */}
        <PatientJourney currentLang={currentLang} />

        {/* 11. Travel & Stay (Airports, trains, hotels, visas, languages) */}
        <TravelStay currentLang={currentLang} />

        {/* 12. Why Choose Us (Side-by-side comparison visual) */}
        <ComparisonSection
          currentLang={currentLang}
          onEnquireClick={scrollToEnquiry}
        />

        {/* 13. Patient Stories (Consent-verified case records) */}
        <TestimonialsSection
          currentLang={currentLang}
          onEnquireClick={scrollToEnquiry}
        />

        {/* 14. Trust & Medical Facilitation Disclaimer */}
        <TrustSection currentLang={currentLang} />

        {/* 15. FAQ Section (14 questions with emergency advisory) */}
        <FAQSection
          currentLang={currentLang}
          onEnquireClick={scrollToEnquiry}
        />

        {/* 16. High-Conversion Contact Section */}
        <ContactSection
          currentLang={currentLang}
          siteConfig={siteConfig}
          onStartEnquiryClick={scrollToEnquiry}
        />
      </main>

      {/* Footer with legal links & emergency guidance */}
      <Footer
        currentLang={currentLang}
        siteConfig={siteConfig}
        onOpenLegalModal={setLegalModalType}
        onCountryClick={setSelectedCountryCode}
      />

      {/* Modals & Overlays */}
      {selectedCountryCode && (
        <CountryLandingModal
          countryCode={selectedCountryCode}
          onClose={() => setSelectedCountryCode(null)}
          siteConfig={siteConfig}
          onStartEnquiryForCountry={handleStartEnquiryForCountry}
        />
      )}

      {/* Dedicated Authenticated Admin & Coordinator Portal */}
      {isAdminOpen && (
        <AdminPortal
          isOpen={isAdminOpen}
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash === '#admin') {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onAddLead={handleCreateLead}
          onRefreshLeads={fetchAllFromServer}
          hospitals={hospitals}
          onSaveHospital={handleSaveHospital}
          onDeleteHospital={handleDeleteHospital}
          doctors={doctors}
          onSaveDoctor={handleSaveDoctor}
          onDeleteDoctor={handleDeleteDoctor}
          onResetData={handleResetData}
          siteConfig={siteConfig}
          onUpdateSiteConfig={setSiteConfig}
        />
      )}

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}

      {/* 24/7 AI Healthcare Assistant with Zero-Pricing Guardrail */}
      <AIChatWidget currentLang={currentLang} />
    </div>
  );
}
