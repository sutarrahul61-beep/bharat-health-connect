export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'bn' | 'ar';

export function detectSupportedLanguage(): SupportedLanguage {
  if (typeof window === 'undefined' || !window.navigator) return 'en';
  const browserLang = (window.navigator.language || '').toLowerCase();
  if (browserLang.startsWith('hi')) return 'hi';
  if (browserLang.startsWith('mr')) return 'mr';
  if (browserLang.startsWith('bn')) return 'bn';
  if (browserLang.startsWith('ar')) return 'ar';
  return 'en';
}

export interface TranslationDictionary {
  brandTitle: string;
  brandTagline: string;
  navWhyMiraj: string;
  navTreatments: string;
  navHospitals: string;
  navHowItWorks: string;
  navInternational: string;
  navFAQ: string;
  navContact: string;
  navWhatsApp: string;
  navGetAssistance: string;
  searchNavPlaceholder: string;
  searchBtn: string;
  portalLabel: string;
  textSize: string;
  coordinatorPortal: string;
  breadcrumbHome: string;
  breadcrumbInternational: string;
  breadcrumbIndia: string;
  breadcrumbConcierge: string;

  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCTA: string;
  heroSecondaryCTA: string;
  heroTrustLine: string;
  heroBadge: string;
  ethicalCareNotice: string;
  conciergeCardTitle: string;
  conciergeCardSub: string;
  realHumanTeam: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  stat1Num: string;
  stat1Label: string;
  stat2Num: string;
  stat2Label: string;
  stat3Num: string;
  stat3Label: string;
  haveReports: string;
  uploadSecurely: string;
  startForm: string;

  enquiryCardTitle: string;
  enquiryCardSubtitle: string;
  fullName: string;
  country: string;
  preferredLanguage: string;
  whatsappNumber: string;
  email: string;
  treatmentSpecialty: string;
  preferredHospitalDoctor: string;
  uploadReports: string;
  uploadHint: string;
  message: string;
  requestAssistanceCTA: string;
  privacyNotice: string;
  consentCheckbox: string;
  confidentialDataNotice: string;

  whyMirajBadge: string;
  whyMirajTitle: string;
  whyMirajSubtitle: string;
  whyMirajPrompt: string;
  talkToCoordinator: string;

  specialtiesBadge: string;
  specialtiesTitle: string;
  specialtiesSubtitle: string;
  searchSpecialtyPlaceholder: string;
  askAboutTreatment: string;

  timelineBadge: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  timelineCTA: string;
  timelineSub: string;

  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesVisaNotice: string;
  servicesCustomPrompt: string;

  costBadge: string;
  costTitle: string;
  costSubtitle: string;
  costEthicsNotice: string;
  costColTreatment: string;
  costColEstimate: string;
  costColHospitalStay: string;
  costColRecovery: string;
  costColIncluded: string;
  costColExcluded: string;
  costNote: string;
  costRequestCTA: string;

  hospitalBadge: string;
  hospitalTitle: string;
  hospitalLabelNote: string;
  hospitalNotice: string;

  doctorBadge: string;
  doctorTitle: string;
  doctorSubtitle: string;
  doctorNotice: string;
  requestConsultation: string;

  travelStayTitle: string;
  comparisonTitle: string;

  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;

  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;

  whatsappGreeting: string;
  adminPortal: string;
  verifiedTag: string;
  informationToVerify: string;

  emergencyBanner: string;
  emergencyBannerTitle: string;
  footerDesc: string;
  footerRights: string;
  stepBadge: string;

  recommendedBadge?: string;
  assistedSub?: string;
  confidentialNotice?: string;
  contactDesk?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactCenters?: string;
  contactHours?: string;
  faqCatAll?: string;
  faqCatGeneral?: string;
  faqCatMedical?: string;
  faqCatTravel?: string;
  faqCatCosts?: string;
  faqSearchPlaceholder?: string;
  haveQuestionPrompt?: string;
  askQuestionCTA?: string;
  footerEmergencyNotice?: string;
  footerBrandDesc?: string;
  footerQuickNav?: string;
  navAbout?: string;
  navFaq?: string;
  footerPatientDesks?: string;
  footerRegionalHeritage?: string;
  footerHeritageDesc?: string;
  allRightsReserved?: string;
  footerPrivacyPolicy?: string;
  footerTermsOfService?: string;
  footerMedicalDisclaimer?: string;
  footerBackToTop?: string;
  doctorsBadge?: string;
  journeyBadge?: string;
  journeyTitle?: string;
  journeySubtitle?: string;
  milestoneStage?: string;
  of?: string;
  coordinatorResponsibility?: string;
  prevStage?: string;
  nextStage?: string;
  storiesBadge?: string;
  storiesTitle?: string;
  storiesSubtitle?: string;
  allExperiences?: string;
  caseSummaries?: string;
  videoStories?: string;
  testimonialConsentDisclaimer?: string;
  travelStayBadge?: string;
  travelStaySubtitle?: string;
  trustBadge?: string;
  trustTitle?: string;
  trustSubtitle?: string;
  ethicalPledgeHeading?: string;
  ethicalPledgeSub?: string;
  nonBiasedAdvisory?: string;
  comparisonBadge?: string;
  comparisonSubtitle?: string;
  unassistedHeading?: string;
  unassistedSub?: string;
  assistedHeading?: string;

  clinicalDepartmentsBadge?: string;
  hospitalSubtitle?: string;
  noSpecialtiesFound?: string;
  contactForOtherConditions?: string;
  clearSearchFilter?: string;
  specialtyDisclaimer?: string;

  allFacilitiesTab?: string;
  mirajClusterTab?: string;
  sangliClusterTab?: string;
  searchHospitalPlaceholder?: string;
  partnerProviderBadge?: string;
  exploreProviderBadge?: string;
  keySpecialtiesLabel?: string;
  clinicalFacilitiesLabel?: string;
  accreditationLabel?: string;
  inquireHospitalBtn?: string;
  websiteLink?: string;

  specialistPanelBadge?: string;
  verificationEthicsTitle?: string;
  doctorEthicsNotice?: string;
  qualificationsLabel?: string;
  experienceLabel?: string;
  hospitalAffiliationLabel?: string;
  languagesSpokenLabel?: string;
  consultationFormatLabel?: string;
  credentialsVerifiedBadge?: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandTitle: 'Bharat Health Connect',
    brandTagline: 'Connecting You to Healthcare in India',
    navWhyMiraj: 'About Us',
    navTreatments: 'Treatments',
    navHospitals: 'Hospitals',
    navHowItWorks: 'How It Works',
    navInternational: 'International Patients',
    navFAQ: 'FAQ',
    navContact: 'Contact',
    navWhatsApp: 'WhatsApp',
    navGetAssistance: 'Get Medical Assistance',
    searchNavPlaceholder: 'Search hospitals, treatments, doctors...',
    searchBtn: 'Search',
    portalLabel: 'Private Healthcare Facilitation Portal',
    textSize: 'Text Size:',
    coordinatorPortal: 'Coordinator CRM',
    breadcrumbHome: 'Home',
    breadcrumbInternational: 'International Patients',
    breadcrumbIndia: 'Healthcare in India',
    breadcrumbConcierge: 'Patient Concierge & Hospital Coordination',

    heroHeadline: 'Connecting You to Trusted Healthcare in India',
    heroSubheadline:
      'Explore healthcare options, medical specialists and patient assistance services across India.',
    heroPrimaryCTA: 'Get Medical Assistance',
    heroSecondaryCTA: 'AI Health Assistant',
    heroTrustLine: 'Healthcare Information • Hospital Coordination • Doctor Consultation • Travel Assistance',
    heroBadge: 'Healthcare Assistance in India',
    ethicalCareNotice:
      'Healthcare Facilitation Notice: Bharat Health Connect is an independent healthcare concierge service and not a hospital. Medical advice, diagnostics, and treatments are provided exclusively by licensed hospitals and physicians.',
    conciergeCardTitle: 'Bharat Health Connect Concierge',
    conciergeCardSub: 'Independent Facilitation for Healthcare in India',
    realHumanTeam: 'Real Human Team',
    pillar1Title: 'Multiple Hospital & Specialist Review',
    pillar1Desc: 'Objective assessment across multiple clinical teams and hospitals.',
    pillar2Title: 'Direct Medical Enquiry & Tele-Review',
    pillar2Desc: 'Preliminary evaluations before making travel commitments.',
    pillar3Title: 'Medical Visa & Travel Guidance',
    pillar3Desc: 'End-to-end liaison for international and NRI patients and families.',
    stat1Num: '100+ Yrs',
    stat1Label: 'Healthcare Heritage',
    stat2Num: '15+',
    stat2Label: 'Super-Specialties',
    stat3Num: '1-on-1',
    stat3Label: 'Patient Coordinator',
    haveReports: 'Have existing medical reports?',
    uploadSecurely: 'Upload securely in the quick form below',
    startForm: 'Start Form',

    enquiryCardTitle: 'Tell Us What You Need',
    enquiryCardSubtitle: 'Share your treatment inquiry. A human patient coordinator will review your case confidentially.',
    fullName: 'Full Name',
    country: 'Country of Residence',
    preferredLanguage: 'Preferred Language for Communication',
    whatsappNumber: 'WhatsApp Number (with country code)',
    email: 'Email Address',
    treatmentSpecialty: 'Treatment / Medical Specialty',
    preferredHospitalDoctor: 'Preferred Hospital / Doctor (optional)',
    uploadReports: 'Upload Medical Reports (PDF, JPG, PNG — max 10MB each)',
    uploadHint: 'Attach recent blood tests, MRI/CT scans, doctor prescriptions or summaries',
    message: 'Briefly describe your symptoms, diagnosis or questions',
    requestAssistanceCTA: 'Request Medical Assistance',
    privacyNotice: 'We respect your privacy. Your medical information is used only to help process your enquiry.',
    consentCheckbox: 'I consent to sharing the information I provide with relevant healthcare providers for the purpose of responding to my enquiry.',
    confidentialDataNotice: 'Confidential Healthcare Data',

    whyMirajBadge: 'Heritage & Infrastructure',
    whyMirajTitle: 'Why Consider Miraj–Sangli for Healthcare?',
    whyMirajSubtitle: 'A historic medical legacy combined with modern superspeciality hospital infrastructure in Maharashtra, India.',
    whyMirajPrompt: 'Need assistance choosing the right hospital or specialist? Speak with our care coordinator.',
    talkToCoordinator: 'Talk to Coordinator',

    specialtiesBadge: 'Clinical Departments',
    specialtiesTitle: 'Comprehensive Medical Specialties',
    specialtiesSubtitle: 'Explore our multi-disciplinary medical directory with verified specialist departments across the region.',
    searchSpecialtyPlaceholder: 'Search specialty, procedure, or condition...',
    askAboutTreatment: 'Ask About This Treatment',

    timelineBadge: 'Transparent Care Pathway',
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'A structured, transparent 6-step roadmap from your first enquiry to recovery and return home.',
    timelineCTA: 'Start Your Medical Enquiry',
    timelineSub: 'Ready to begin your medical journey? Connect with our dedicated patient coordinator.',

    servicesBadge: 'Patient Concierge Scope',
    servicesTitle: 'Support Beyond the Hospital',
    servicesSubtitle: 'Comprehensive international patient concierge services for patients, attendants, and families.',
    servicesVisaNotice:
      'Important Visa & Regulatory Notice: We coordinate with hospitals to procure official visa invitation letters. Indian e-Medical Visas (MED & MED-X) are issued solely by the Ministry of External Affairs, Government of India.',
    servicesCustomPrompt: 'Need a tailored concierge arrangement? Speak directly with our care coordinator.',

    costBadge: 'Financial Transparency',
    costTitle: 'Understand Your Treatment Costs',
    costSubtitle: 'Transparent, itemized healthcare planning without hidden coordination margins.',
    costEthicsNotice:
      'Financial Transparency Policy: We do not inflate hospital quotes or charge patients coordination markups on treatment bills. Official quotes are rendered directly by treating hospitals.',
    costColTreatment: 'Treatment / Procedure',
    costColEstimate: 'Hospital Estimate Structure',
    costColHospitalStay: 'Inpatient Stay',
    costColRecovery: 'Recovery Stay',
    costColIncluded: "What's Included",
    costColExcluded: "What's Excluded",
    costNote: 'Official quotations are confirmed by hospital administration upon detailed specialist review of full clinical diagnostics.',
    costRequestCTA: 'Request a Personalized Estimate',

    hospitalBadge: 'Accredited Partners',
    hospitalTitle: 'Our Healthcare Network',
    hospitalLabelNote: 'Healthcare Providers We Can Help You Explore',
    hospitalNotice: 'As an independent medical concierge, we help you evaluate and navigate regional healthcare facilities objectively.',

    doctorBadge: 'Experienced Clinicians',
    doctorTitle: 'Connect With the Right Specialist',
    doctorSubtitle: 'Experienced clinical specialists and surgical teams available for pre-travel review and consultation.',
    doctorNotice:
      'Verification & Clinical Ethics: We do not publish unverified clinical claims. When you enquire, our coordinator coordinates directly with hospital directorates to confirm credentials and availability.',
    requestConsultation: 'Request Doctor Consultation',

    travelStayTitle: 'Your Journey to Miraj–Sangli',
    comparisonTitle: 'Why Choose Our Coordination Service',

    faqBadge: 'Clear Answers',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Essential facts on medical enquiries, visa documentation, accommodations, treatment planning, and follow-up.',

    contactBadge: 'Confidential Patient Coordination',
    contactTitle: 'Tell Us What You Need Help With',
    contactSubtitle: 'Reach our human concierge team by WhatsApp, phone, or direct enquiry.',

    whatsappGreeting: 'Hello, I am looking for medical treatment in Miraj–Sangli, India. I would like assistance with my medical enquiry.',
    adminPortal: 'Coordinator / CMS View',
    verifiedTag: 'Verified Information',
    informationToVerify: 'Information to be verified prior to booking',

    emergencyBannerTitle: 'Medical Emergency Notice: ',
    emergencyBanner: 'If you are experiencing an acute or life-threatening emergency, please call your local emergency service or proceed to the nearest emergency department immediately. Our service coordinates planned medical facilitation.',
    footerDesc: 'Independent medical tourism patient concierge connecting international patients, NRIs, and outstation families with verified hospitals and clinical specialists across India.',
    footerRights: 'All rights reserved. Independent Healthcare Concierge.',
    stepBadge: 'Step',

    recommendedBadge: 'Recommended Pathway',
    assistedSub: 'Dedicated Healthcare Concierge Support',
    confidentialNotice: 'Strict Data Privacy: Your medical data is strictly confidential and shared only with licensed physicians.',
    contactDesk: 'Patient Coordination Desk',
    contactPhone: 'Direct Phone Line',
    contactEmail: 'Official Email Contact',
    contactCenters: 'Regional Center Network',
    contactHours: 'Operating Hours: 24/7 International Desk',
    faqCatAll: 'All Categories',
    faqCatGeneral: 'General Enquiries',
    faqCatMedical: 'Medical & Consultations',
    faqCatTravel: 'Travel & Visa Assistance',
    faqCatCosts: 'Treatment Estimates & Costs',
    faqSearchPlaceholder: 'Search frequently asked questions...',
    haveQuestionPrompt: 'Have an unlisted question about medical facilitation in India?',
    askQuestionCTA: 'Ask Coordinator / AI Assistant',
    footerEmergencyNotice: 'Medical Emergency Notice:',
    footerBrandDesc: 'Independent patient concierge coordinating trusted medical care, accredited hospital partnerships, and comprehensive travel assistance across India.',
    footerQuickNav: 'Quick Navigation',
    navAbout: 'About Us',
    navFaq: 'Frequently Asked Questions',
    footerPatientDesks: 'Dedicated Patient Desks',
    footerRegionalHeritage: 'Regional Medical Heritage',
    footerHeritageDesc: 'Miraj–Sangli has been a historic center of medical education and specialized surgery in Western India for over 130 years.',
    allRightsReserved: 'All rights reserved. Bharat Health Connect.',
    footerPrivacyPolicy: 'Privacy Policy',
    footerTermsOfService: 'Terms of Facilitation',
    footerMedicalDisclaimer: 'Medical Disclaimer',
    footerBackToTop: 'Back to Top',
    doctorsBadge: 'Specialist Medical Panel',
    journeyBadge: 'Structured Care Pathway',
    journeyTitle: 'Your Healthcare Journey to India',
    journeySubtitle: 'A structured, transparent step-by-step pathway from initial medical review to treatment and safe return home.',
    milestoneStage: 'Stage',
    of: 'of',
    coordinatorResponsibility: 'Coordinator Responsibility',
    prevStage: 'Previous Stage',
    nextStage: 'Next Stage',
    storiesBadge: 'Patient Experiences',
    storiesTitle: 'Patient Journeys & Case Histories',
    storiesSubtitle: 'Real experiences from international and NRI patients coordinated through our independent care network.',
    allExperiences: 'All Experiences',
    caseSummaries: 'Clinical Summaries',
    videoStories: 'Video & Audio Reviews',
    testimonialConsentDisclaimer: 'All patient accounts published with explicit consent and verified by clinical registries. Identifying details protected where requested.',
    travelStayBadge: 'Travel Logistics & Accommodation',
    travelStaySubtitle: 'Complete logistical support ensuring stress-free transit, visa letters, and comfortable recovery stays.',
    trustBadge: 'Transparency & Institutional Trust',
    trustTitle: 'Why Patients Trust Bharat Health Connect',
    trustSubtitle: 'Our ethical commitment to independent, uncompromised patient advocacy and clinical transparency.',
    ethicalPledgeHeading: 'Our Strict Ethical Healthcare Pledge',
    ethicalPledgeSub: 'We never accept kickbacks from hospitals, push unnecessary surgeries, or publish fake testimonials.',
    nonBiasedAdvisory: '100% Objective Medical Advisory',
    clinicalDepartmentsBadge: 'Clinical Departments',
    hospitalSubtitle: 'Miraj and Sangli host major tertiary healthcare centers. As an independent concierge service, we help you navigate these regional medical facilities objectively.',
    noSpecialtiesFound: 'No specialties matched',
    contactForOtherConditions: 'Contact our patient coordinator directly to enquire about other clinical conditions.',
    clearSearchFilter: 'Clear search filter',
    specialtyDisclaimer: 'Note: Specialty descriptions provide general orientation regarding available hospital departments in Miraj–Sangli. They do not constitute clinical advice, promises of specific surgical outcomes, or guarantee of procedure eligibility.',
    allFacilitiesTab: 'All Facilities',
    mirajClusterTab: 'Miraj Cluster',
    sangliClusterTab: 'Sangli Cluster',
    searchHospitalPlaceholder: 'Search hospital or specialty...',
    partnerProviderBadge: 'Partner Provider',
    exploreProviderBadge: 'Explore Provider',
    keySpecialtiesLabel: 'Key Specialties:',
    clinicalFacilitiesLabel: 'Clinical Facilities:',
    accreditationLabel: 'Accreditation:',
    inquireHospitalBtn: 'Inquire for this Hospital',
    websiteLink: 'Website',
    specialistPanelBadge: 'Specialist Panel',
    verificationEthicsTitle: 'Verification & Clinical Ethics Note:',
    doctorEthicsNotice: "We do not publish unverified clinical claims. When you submit your enquiry, our coordinator coordinates directly with the hospital clinical directorate to share the treating specialist's verified medical council registration and curriculum vitae.",
    qualificationsLabel: 'Qualifications:',
    experienceLabel: 'Experience:',
    hospitalAffiliationLabel: 'Hospital:',
    languagesSpokenLabel: 'Languages:',
    consultationFormatLabel: 'Format:',
    credentialsVerifiedBadge: 'Credentials verified with medical administrative registers',
  },
  hi: {
    brandTitle: 'भारत हेल्थ कनेक्ट',
    brandTagline: 'भारत में स्वास्थ्य सेवा से आपका जुड़ाव',
    navWhyMiraj: 'परिचय',
    navTreatments: 'उपचार व विशेषज्ञताएं',
    navHospitals: 'अस्पताल',
    navHowItWorks: 'कार्यप्रणाली',
    navInternational: 'अंतर्राष्ट्रीय रोगी',
    navFAQ: 'अक्सर पूछे जाने वाले प्रश्न',
    navContact: 'संपर्क करें',
    navWhatsApp: 'व्हाट्सएप',
    navGetAssistance: 'चिकित्सा सहायता प्राप्त करें',
    searchNavPlaceholder: 'अस्पताल, उपचार, डॉक्टर खोजें...',
    searchBtn: 'खोजें',
    portalLabel: 'निजी स्वास्थ्य सेवा सुविधा पोर्टल',
    textSize: 'अक्षर आकार:',
    coordinatorPortal: 'समन्वयक सीआरएम',
    breadcrumbHome: 'होम',
    breadcrumbInternational: 'अंतर्राष्ट्रीय रोगी',
    breadcrumbIndia: 'भारत में स्वास्थ्य सेवा',
    breadcrumbConcierge: 'रोगी कंसीयज व अस्पताल समन्वय',

    heroHeadline: 'भारत में विश्वसनीय स्वास्थ्य सेवाओं से आपका जुड़ाव',
    heroSubheadline:
      'भारत भर में स्वास्थ्य सेवा विकल्प, विशेषज्ञ चिकित्सक और रोगी सहायता सेवाएं खोजें।',
    heroPrimaryCTA: 'चिकित्सा सहायता प्राप्त करें',
    heroSecondaryCTA: 'AI स्वास्थ्य सहायक',
    heroTrustLine: 'स्वास्थ्य जानकारी • अस्पताल समन्वय • डॉक्टर परामर्श • यात्रा सहायता',
    heroBadge: 'भारत में स्वास्थ्य सहायता',
    ethicalCareNotice:
      'स्वास्थ्य सुविधा सूचना: भारत हेल्थ कनेक्ट एक स्वतंत्र रोगी समन्वय सेवा है, अस्पताल नहीं। सभी चिकित्सीय निर्णय और उपचार केवल लाइसेंस प्राप्त अस्पतालों और डॉक्टरों द्वारा दिए जाते हैं।',
    conciergeCardTitle: 'भारत हेल्थ कनेक्ट कंसीयज',
    conciergeCardSub: 'भारत में स्वास्थ्य सेवा हेतु स्वतंत्र समन्वय',
    realHumanTeam: 'समर्पित मानव टीम',
    pillar1Title: 'बहु-अस्पताल व विशेषज्ञ समीक्षा',
    pillar1Desc: 'कई प्रमुख चिकित्सा टीमों से निष्पक्ष मूल्यांकन।',
    pillar2Title: 'सीधी चिकित्सा पूछताछ व टेली-समीक्षा',
    pillar2Desc: 'यात्रा से पूर्व डॉक्टरों से प्रारंभिक राय।',
    pillar3Title: 'मेडिकल वीजा व यात्रा मार्गदर्शन',
    pillar3Desc: 'अंतरराष्ट्रीय व एनआरआई परिवारों के लिए संपूर्ण समन्वय।',
    stat1Num: '100+ वर्ष',
    stat1Label: 'चिकित्सा धरोहर',
    stat2Num: '15+',
    stat2Label: 'सुपर-स्पेशियलिटी',
    stat3Num: '1-ऑन-1',
    stat3Label: 'केयर समन्वयक',
    haveReports: 'क्या आपके पास मेडिकल रिपोर्ट हैं?',
    uploadSecurely: 'नीचे दिए फॉर्म में सुरक्षित अपलोड करें',
    startForm: 'फॉर्म शुरू करें',

    enquiryCardTitle: 'अपनी आवश्यकता हमें बताएं',
    enquiryCardSubtitle: 'अपनी चिकित्सा समस्या साझा करें। हमारे समन्वयक आपके मामले की समीक्षा करेंगे।',
    fullName: 'पूरा नाम',
    country: 'देश',
    preferredLanguage: 'परामर्श हेतु पसंदीदा भाषा',
    whatsappNumber: 'व्हाट्सएप नंबर (कंट्री कोड सहित)',
    email: 'ईमेल पता',
    treatmentSpecialty: 'उपचार / चिकित्सा विभाग',
    preferredHospitalDoctor: 'पसंदीदा अस्पताल / डॉक्टर (वैकल्पिक)',
    uploadReports: 'मेडिकल रिपोर्ट अपलोड करें (PDF, JPG, PNG - अधिकतम 10MB)',
    uploadHint: 'हालिया रक्त रिपोर्ट, एमआरआई/सीटी स्कैन या डॉक्टर का पर्चा संलग्न करें',
    message: 'अपने लक्षण, निदान या प्रश्न संक्षेप में लिखें',
    requestAssistanceCTA: 'चिकित्सा सहायता का अनुरोध करें',
    privacyNotice: 'हम आपकी गोपनीयता का सम्मान करते हैं। आपकी जानकारी केवल आपके अनुरोध के समाधान हेतु उपयोग की जाती है।',
    consentCheckbox: 'मैं अपनी स्वास्थ्य जानकारी को प्रासंगिक स्वास्थ्य सेवा प्रदाताओं के साथ साझा करने की सहमति देता/देती हूँ।',
    confidentialDataNotice: 'गोपनीय स्वास्थ्य डेटा',

    whyMirajBadge: 'धरोहर व आधुनिक बुनियादी ढांचा',
    whyMirajTitle: 'स्वास्थ्य सेवा के लिए मिरज–सांगली को क्यों चुनें?',
    whyMirajSubtitle: 'महाराष्ट्र के इस ऐतिहासिक चिकित्सा केंद्र में आधुनिक सुपरस्पेशियलिटी अस्पतालों की श्रृंखला।',
    whyMirajPrompt: 'सही अस्पताल या विशेषज्ञ चुनने में मदद चाहिए? हमारे केयर समन्वयक से बात करें।',
    talkToCoordinator: 'समन्वयक से बात करें',

    specialtiesBadge: 'चिकित्सा विभाग',
    specialtiesTitle: 'प्रमुख चिकित्सा विशेषज्ञताएं',
    specialtiesSubtitle: 'मिरज-सांगली के प्रमुख अस्पतालों में उपलब्ध उपचार विभागों का अन्वेषण करें।',
    searchSpecialtyPlaceholder: 'विभाग, उपचार या बीमारी खोजें...',
    askAboutTreatment: 'इस उपचार के बारे में पूछें',

    timelineBadge: 'पारदर्शी देखभाल मार्ग',
    howItWorksTitle: 'यह कैसे काम करता है',
    howItWorksSubtitle: 'पहले संदेश से लेकर उपचार और स्वस्थ होकर घर वापसी तक 6 पारदर्शी चरण।',
    timelineCTA: 'अपनी चिकित्सा पूछताछ शुरू करें',
    timelineSub: 'अपनी स्वास्थ्य यात्रा शुरू करने के लिए तैयार हैं? हमारे समर्पित समन्वयक से जुड़ें।',

    servicesBadge: 'रोगी कंसीयज सेवाएं',
    servicesTitle: 'अस्पताल से परे संपूर्ण सहयोग',
    servicesSubtitle: 'रोगी और परिवार के लिए चिकित्सा वीजा मार्गदर्शन, आवास और यात्रा सहायता।',
    servicesVisaNotice:
      'महत्वपूर्ण वीजा सूचना: हम अस्पतालों से आधिकारिक वीजा आमंत्रण पत्र प्राप्त करवाते हैं। भारतीय ई-मेडिकल वीजा भारत सरकार द्वारा जारी किया जाता है।',
    servicesCustomPrompt: 'क्या आपको विशेष व्यवस्था की आवश्यकता है? हमारे केयर समन्वयक से सीधे संपर्क करें।',

    costBadge: 'वित्तीय पारदर्शिता',
    costTitle: 'अपने उपचार खर्च को समझें',
    costSubtitle: 'प्रत्येक रोगी की आवश्यकता अनुसार पारदर्शी और स्पष्ट अस्पताल मूल्यांकन।',
    costEthicsNotice:
      'वित्तीय पारदर्शिता नीति: हम अस्पताल के बिलों पर कोई कमीशन या अतिरिक्त मार्जिन नहीं जोड़ते। सभी कोटेशन सीधे अस्पताल द्वारा जारी किए जाते हैं।',
    costColTreatment: 'उपचार / प्रक्रिया',
    costColEstimate: 'अस्पताल अनुमानित खर्च',
    costColHospitalStay: 'अस्पताल में भर्ती',
    costColRecovery: 'रिकवरी अवधि',
    costColIncluded: 'शामिल सुविधाएं',
    costColExcluded: 'अतिरिक्त खर्च',
    costNote: 'अंतिम आधिकारिक कोटेशन पूर्ण जांच रिपोर्ट की डॉक्टर द्वारा समीक्षा के बाद अस्पताल प्रशासन द्वारा दिया जाता है।',
    costRequestCTA: 'व्यक्तिगत लागत अनुमान प्राप्त करें',

    hospitalBadge: 'मान्यता प्राप्त अस्पताल',
    hospitalTitle: 'हमारा स्वास्थ्य सेवा नेटवर्क',
    hospitalLabelNote: 'स्वास्थ्य सेवा प्रदाता जिनका आप अन्वेषण कर सकते हैं',
    hospitalNotice: 'एक स्वतंत्र समन्वयक के रूप में, हम आपको निष्पक्ष रूप से क्षेत्रीय चिकित्सा केंद्रों का मूल्यांकन करने में मदद करते हैं।',

    doctorBadge: 'अनुभवी चिकित्सक',
    doctorTitle: 'सही विशेषज्ञ से संपर्क करें',
    doctorSubtitle: 'अनुभवी चिकित्सकों और सर्जनों से परामर्श व द्वितीय राय प्राप्त करें।',
    doctorNotice:
      'सत्यापन व नैदानिक नैतिकता: हम केवल सत्यापित जानकारी साझा करते हैं। आपकी पूछताछ पर समन्वयक सीधे अस्पताल से डॉक्टर की उपलब्धता सुनिश्चित करते हैं।',
    requestConsultation: 'डॉक्टर परामर्श का अनुरोध करें',

    travelStayTitle: 'मिरज–सांगली तक की आपकी यात्रा',
    comparisonTitle: 'हमारी समन्वय सेवा क्यों चुनें?',

    faqBadge: 'स्पष्ट उत्तर',
    faqTitle: 'सामान्य प्रश्न (FAQ)',
    faqSubtitle: 'चिकित्सा पूछताछ, वीजा दस्तावेज, आवास, उपचार योजना और फॉलो-अप के बारे में महत्वपूर्ण तथ्य।',

    contactBadge: 'गोपनीय रोगी समन्वय',
    contactTitle: 'बताएं हम आपकी क्या मदद कर सकते हैं',
    contactSubtitle: 'व्हाट्सएप, कॉल या संदेश के माध्यम से हमारे वास्तविक समन्वयक से जुड़ें।',

    whatsappGreeting: 'नमस्ते, मैं मिरज–सांगली, भारत में उपचार के विकल्प देख रहा हूँ। मुझे सहायता चाहिए।',
    adminPortal: 'समन्वयक / सीएमएस पैनल',
    verifiedTag: 'सत्यापित विवरण',
    informationToVerify: 'पुष्टि प्रक्रियाधीन',

    emergencyBannerTitle: 'आपातकालीन चिकित्सा सूचना: ',
    emergencyBanner: 'यदि आप किसी आपातकालीन स्थिति का सामना कर रहे हैं, तो तुरंत स्थानीय आपातकालीन सेवाओं से संपर्क करें या निकटतम अस्पताल जाएं। हमारी सेवा नियोजित चिकित्सा समन्वय प्रदान करती है।',
    footerDesc: 'स्वतंत्र रोगी कंसीयज जो अंतरराष्ट्रीय रोगियों, एनआरआई और बाहरी परिवारों को भारत के विश्वसनीय अस्पतालों और विशेषज्ञों से जोड़ता है।',
    footerRights: 'सर्वाधिकार सुरक्षित। स्वतंत्र स्वास्थ्य सेवा कंसीयज।',
    stepBadge: 'चरण',

    recommendedBadge: 'अनुशंसित मार्ग',
    assistedSub: 'समर्पित स्वास्थ्य सेवा कंसीयज सहायता',
    confidentialNotice: 'कठोर डेटा गोपनीयता: आपकी चिकित्सा जानकारी पूर्णतः गोपनीय है और केवल लाइसेंस प्राप्त चिकित्सकों के साथ साझा की जाती है।',
    contactDesk: 'रोगी समन्वय डेस्क',
    contactPhone: 'सीधी फोन लाइन',
    contactEmail: 'आधिकारिक ईमेल संपर्क',
    contactCenters: 'क्षेत्रीय केंद्र नेटवर्क',
    contactHours: 'कार्य समय: 24/7 अंतर्राष्ट्रीय डेस्क',
    faqCatAll: 'सभी श्रेणियां',
    faqCatGeneral: 'सामान्य पूछताछ',
    faqCatMedical: 'चिकित्सा और परामर्श',
    faqCatTravel: 'यात्रा और वीजा सहायता',
    faqCatCosts: 'अनुमानित लागत व खर्च',
    faqSearchPlaceholder: 'अक्सर पूछे जाने वाले प्रश्न खोजें...',
    haveQuestionPrompt: 'क्या आपका कोई ऐसा प्रश्न है जो यहाँ सूचीबद्ध नहीं है?',
    askQuestionCTA: 'समन्वयक / AI सहायक से पूछें',
    footerEmergencyNotice: 'आपातकालीन चिकित्सा सूचना:',
    footerBrandDesc: 'स्वतंत्र रोगी कंसीयज जो भारत भर में विश्वसनीय अस्पतालों और विशेषज्ञों के साथ चिकित्सा समन्वय प्रदान करता है।',
    footerQuickNav: 'त्वरित नेविगेशन',
    navAbout: 'हमारे बारे में',
    navFaq: 'अक्सर पूछे जाने वाले प्रश्न',
    footerPatientDesks: 'समर्पित रोगी सहायता डेस्क',
    footerRegionalHeritage: 'क्षेत्रीय चिकित्सा विरासत',
    footerHeritageDesc: 'मिरज–सांगली 130 से अधिक वर्षों से पश्चिमी भारत में चिकित्सा शिक्षा और शल्य चिकित्सा का ऐतिहासिक केंद्र रहा है।',
    allRightsReserved: 'सर्वाधिकार सुरक्षित। भारत हेल्थ कनेक्ट।',
    footerPrivacyPolicy: 'गोपनीयता नीति',
    footerTermsOfService: 'सेवा की शर्तें',
    footerMedicalDisclaimer: 'चिकित्सीय अस्वीकरण',
    footerBackToTop: 'शीर्ष पर जाएं',
    doctorsBadge: 'विशेषज्ञ चिकित्सा पैनल',
    journeyBadge: 'संरचित उपचार यात्रा',
    journeyTitle: 'भारत में आपकी स्वास्थ्य सेवा यात्रा',
    journeySubtitle: 'प्रारंभिक रिपोर्ट समीक्षा से लेकर उपचार और सुरक्षित घर वापसी तक का स्पष्ट और पारदर्शी चरणबद्ध मार्ग।',
    milestoneStage: 'चरण',
    of: 'का',
    coordinatorResponsibility: 'समन्वयक की जिम्मेदारी',
    prevStage: 'पिछला चरण',
    nextStage: 'अगला चरण',
    storiesBadge: 'रोगी अनुभव',
    storiesTitle: 'रोगी यात्राएं और वास्तविक केस स्टडीज़',
    storiesSubtitle: 'हमारे स्वतंत्र नेटवर्क द्वारा समन्वित अंतरराष्ट्रीय और एनआरआई रोगियों के वास्तविक अनुभव।',
    allExperiences: 'सभी अनुभव',
    caseSummaries: 'नैदानिक सारांश',
    videoStories: 'वीडियो व ऑडियो समीक्षाएं',
    testimonialConsentDisclaimer: 'सभी रोगी विवरण स्पष्ट सहमति और नैदानिक रजिस्टरी सत्यापन के साथ प्रकाशित किए जाते हैं।',
    travelStayBadge: 'यात्रा प्रबंधन और आवास',
    travelStaySubtitle: 'तनावमुक्त यात्रा, वीजा आमंत्रण पत्र और आरामदायक आवास के लिए पूर्ण सहायता।',
    trustBadge: 'पारदर्शिता और संस्थागत विश्वास',
    trustTitle: 'मरीज भारत हेल्थ कनेक्ट पर भरोसा क्यों करते हैं',
    trustSubtitle: 'स्वतंत्र, निष्पक्ष रोगी वकालत और पूर्ण पारदर्शिता के प्रति हमारी नैतिक प्रतिबद्धता।',
    ethicalPledgeHeading: 'हमारी सख्त नैतिक स्वास्थ्य सेवा प्रतिज्ञा',
    ethicalPledgeSub: 'हम अस्पतालों से कोई कमीशन नहीं लेते, अनावश्यक सर्जरी को बढ़ावा नहीं देते और कभी फर्जी समीक्षाएं प्रकाशित नहीं करते।',
    nonBiasedAdvisory: '100% निष्पक्ष चिकित्सा परामर्श',
    clinicalDepartmentsBadge: 'चिकित्सा विभाग',
    hospitalSubtitle: 'मिरज और सांगली में प्रमुख तृतीयक स्वास्थ्य सेवा केंद्र स्थित हैं। एक स्वतंत्र समन्वयक के रूप में, हम आपको इन क्षेत्रीय चिकित्सा सुविधाओं में निष्पक्ष मार्गदर्शन प्रदान करते हैं।',
    noSpecialtiesFound: 'कोई परिणाम नहीं मिला',
    contactForOtherConditions: 'अन्य चिकित्सीय स्थितियों की जानकारी हेतु हमारे समन्वयक से संपर्क करें।',
    clearSearchFilter: 'फ़िल्टर हटाएं',
    specialtyDisclaimer: 'सूचना: विशेषता विवरण मिरज-सांगली में उपलब्ध विभागों की सामान्य जानकारी प्रदान करते हैं। यह व्यक्तिगत चिकित्सीय सलाह या परिणाम की गारंटी नहीं है।',
    allFacilitiesTab: 'सभी अस्पताल व केंद्र',
    mirajClusterTab: 'मिरज क्लस्टर',
    sangliClusterTab: 'सांगली क्लस्टर',
    searchHospitalPlaceholder: 'अस्पताल या विभाग खोजें...',
    partnerProviderBadge: 'भागीदार प्रदाता',
    exploreProviderBadge: 'सुझावित अस्पताल',
    keySpecialtiesLabel: 'प्रमुख विशेषज्ञताएं:',
    clinicalFacilitiesLabel: 'चिकित्सीय सुविधाएं:',
    accreditationLabel: 'प्रत्यायन व मान्यता:',
    inquireHospitalBtn: 'इस अस्पताल के लिए पूछताछ करें',
    websiteLink: 'वेबसाइट',
    specialistPanelBadge: 'विशेषज्ञ चिकित्सक पैनल',
    verificationEthicsTitle: 'सत्यापन एवं नैदानिक आचार संहिता:',
    doctorEthicsNotice: 'हम अप्रमाणित दावे प्रकाशित नहीं करते। आपकी पूछताछ के बाद समन्वयक सीधे अस्पताल प्रशासन से डॉक्टर के पंजीकरण और योग्यता की पुष्टि करता है।',
    qualificationsLabel: 'शैक्षणिक योग्यता:',
    experienceLabel: 'अनुभव:',
    hospitalAffiliationLabel: 'अस्पताल संबद्धता:',
    languagesSpokenLabel: 'भाषाएं:',
    consultationFormatLabel: 'परामर्श प्रारूप:',
    credentialsVerifiedBadge: 'मेडिकल काउंसिल रजिस्टरों से सत्यापित प्रमाण-पत्र',
  },
  mr: {
    brandTitle: 'भारत हेल्थ कनेक्ट',
    brandTagline: 'भारतातील आरोग्य सेवेसाठी तुमचा मार्गदर्शक',
    navWhyMiraj: 'परिचय',
    navTreatments: 'उपचार व विभाग',
    navHospitals: 'रुग्णालये',
    navHowItWorks: 'प्रक्रिया',
    navInternational: 'आंतरराष्ट्रीय रुग्ण',
    navFAQ: 'वारंवार विचारले जाणारे प्रश्न',
    navContact: 'संपर्क',
    navWhatsApp: 'व्हॉट्सअॅप',
    navGetAssistance: 'वैद्यकीय मदत मिळवा',
    searchNavPlaceholder: 'रुग्णालये, उपचार, डॉक्टर शोधा...',
    searchBtn: 'शोधा',
    portalLabel: 'खाजगी आरोग्य सेवा समन्वय पोर्टल',
    textSize: 'अक्षर आकार:',
    coordinatorPortal: 'समन्वयक डॅशबोर्ड',
    breadcrumbHome: 'मुखपृष्ठ',
    breadcrumbInternational: 'आंतरराष्ट्रीय रुग्ण',
    breadcrumbIndia: 'भारतात आरोग्यसेवा',
    breadcrumbConcierge: 'रुग्ण सहाय्य व रुग्णालय समन्वय',

    heroHeadline: 'भारतातील विश्वासार्ह आरोग्य सेवांशी तुमचा संपर्क',
    heroSubheadline:
      'संपूर्ण भारतातील आरोग्य सेवा पर्याय, वैद्यकीय तज्ज्ञ आणि रुग्ण साहाय्य सेवा शोधा.',
    heroPrimaryCTA: 'वैद्यकीय मदत मिळवा',
    heroSecondaryCTA: 'AI आरोग्य सहाय्यक',
    heroTrustLine: 'आरोग्य माहिती • रुग्णालय समन्वय • डॉक्टर सल्ला • प्रवास साहाय्य',
    heroBadge: 'भारतात आरोग्य साहाय्य',
    ethicalCareNotice:
      'आरोग्य सुविधा सूचना: भारत हेल्थ कनेक्ट ही एक स्वतंत्र रुग्ण समन्वय सेवा आहे, रुग्णालय नाही. सर्व वैद्यकीय निर्णय आणि उपचार केवळ परवानाधारक रुग्णालये आणि डॉक्टरांकडून दिले जातात.',
    conciergeCardTitle: 'भारत हेल्थ कनेक्ट कंसीयज',
    conciergeCardSub: 'भारतातील आरोग्य सेवेसाठी स्वतंत्र समन्वय',
    realHumanTeam: 'समर्पित मानवी टीम',
    pillar1Title: 'अनेक रुग्णालये व तज्ज्ञांचे मत',
    pillar1Desc: 'अनेक वैद्यकीय पथकांकडून निष्पक्ष व अचूक मूल्यांकन.',
    pillar2Title: 'थेट वैद्यकीय चौकशी व टेलि-सल्ला',
    pillar2Desc: 'प्रवासाचा निर्णय घेण्यापूर्वी तज्ज्ञ डॉक्टरांचे मत.',
    pillar3Title: 'मेडिकल व्हिसा व प्रवास मार्गदर्शन',
    pillar3Desc: 'आंतरराष्ट्रीय व अनिवासी भारतीय कुटुंबांसाठी संपूर्ण साहाय्य.',
    stat1Num: '१००+ वर्षे',
    stat1Label: 'वैद्यकीय वारसा',
    stat2Num: '१५+',
    stat2Label: 'सुपर-स्पेशालिटी',
    stat3Num: '१-ऑन-१',
    stat3Label: 'केअर समन्वयक',
    haveReports: 'तुमच्याकडे तपासणी अहवाल आहेत का?',
    uploadSecurely: 'खालील फॉर्ममध्ये सुरक्षित अपलोड करा',
    startForm: 'फॉर्म भरा',

    enquiryCardTitle: 'आपली गरज आम्हाला सांगा',
    enquiryCardSubtitle: 'आपली वैद्यकीय माहिती सुरक्षितपणे पाठवा. आमचे समन्वयक मार्गदर्शन करतील.',
    fullName: 'पूर्ण नाव',
    country: 'देश',
    preferredLanguage: 'पसंतीची भाषा (संभाषणासाठी)',
    whatsappNumber: 'व्हॉट्सअॅप नंबर (देश कोडसह)',
    email: 'ईमेल आयडी',
    treatmentSpecialty: 'उपचार / वैद्यकीय विभाग',
    preferredHospitalDoctor: 'पसंदीदा रुग्णालय / डॉक्टर (पर्यायी)',
    uploadReports: 'वैद्यकीय अहवाल अपलोड करा (PDF, JPG, PNG - कमाल 10MB)',
    uploadHint: 'रक्त तपासणी, स्कॅन्स किंवा डिस्चार्ज सारांश जोडा',
    message: 'लक्षणे व आजाराबद्दल थोडक्यात सांगा',
    requestAssistanceCTA: 'वैद्यकीय मदतीची विनंती करा',
    privacyNotice: 'आम्ही आपल्या गोपनीयतेचा आदर करतो. माहिती केवळ वैद्यकीय मार्गदर्शनासाठी वापरली जाईल.',
    consentCheckbox: 'माझी वैद्यकीय माहिती संबंधित डॉक्टरांसोबत शेअर करण्यास माझी संमती आहे.',
    confidentialDataNotice: 'गोपनीय वैद्यकीय माहिती',

    whyMirajBadge: 'वारसा व आधुनिक पायाभूत सुविधा',
    whyMirajTitle: 'आरोग्यसेवेसाठी मिरज–सांगली का निवडावे?',
    whyMirajSubtitle: '१०० वर्षांहून अधिक वैद्यकीय वारसा आणि आधुनिक सुपरस्पेशालिटी रुग्णालयांचे केंद्र.',
    whyMirajPrompt: 'योग्य रुग्णालय किंवा डॉक्टर निवडण्यासाठी मदत हवी आहे? आमच्या समन्वयकाशी बोला.',
    talkToCoordinator: 'समन्वयकाशी बोला',

    specialtiesBadge: 'वैद्यकीय विभाग',
    specialtiesTitle: 'वैद्यकीय उपचार विभाग',
    specialtiesSubtitle: 'सर्व प्रकारच्या शस्त्रक्रिया व तपासणीसाठी प्रगत विभाग उपलब्ध.',
    searchSpecialtyPlaceholder: 'विभाग, शस्त्रक्रिया किंवा आजार शोधा...',
    askAboutTreatment: 'या उपचाराबद्दल विचारा',

    timelineBadge: 'पारदर्शक काळजी मार्ग',
    howItWorksTitle: 'कार्यपद्धती कशी आहे?',
    howItWorksSubtitle: 'चौकशीपासून ते उपचार आणि सुरक्षित घरी परतेपर्यंतचे ६ सुलभ टप्पे.',
    timelineCTA: 'वैद्यकीय चौकशी सुरू करा',
    timelineSub: 'तुमचा आरोग्य प्रवास सुरू करण्यास तयार आहात? आमच्या समर्पित समन्वयकाशी संपर्क साधा.',

    servicesBadge: 'रुग्ण साहाय्य सेवा',
    servicesTitle: 'रुग्णालय पलीकडील संपूर्ण सहाय्य',
    servicesSubtitle: 'व्हिसा कागदपत्रे मार्गदर्शन, विमानतळ पिकअप व निवासाची उत्तम सोय.',
    servicesVisaNotice:
      'महत्त्वाची व्हिसा सूचना: आम्ही रुग्णालयाकडून अधिकृत व्हिसा पत्र मिळवून देतो. भारतीय ई-मेडिकल व्हिसा भारत सरकारद्वारे मंजूर केला जातो.',
    servicesCustomPrompt: 'विशेष व्यवस्थेची आवश्यकता आहे? आमच्या समन्वयकांशी थेट बोला.',

    costBadge: 'आर्थिक पारदर्शकता',
    costTitle: 'उपचाराचा अंदाजे खर्च समजून घ्या',
    costSubtitle: 'कोणतीही लपलेली फी नाही; रुग्णालयाच्या तपासणीनुसार स्पष्ट माहिती.',
    costEthicsNotice:
      'आर्थिक पारदर्शकता धोरण: आम्ही रुग्णालयाच्या बिलांवर कोणतेही अतिरिक्त मार्जिन किंवा छुपे शुल्क आकारत नाही.',
    costColTreatment: 'उपचार / शस्त्रक्रिया',
    costColEstimate: 'अंदाजे रुग्णालय खर्च',
    costColHospitalStay: 'रुग्णालय मुक्काम',
    costColRecovery: 'विश्रांती कालावधी',
    costColIncluded: 'समाविष्ट बाबी',
    costColExcluded: 'असमाविष्ट बाबी',
    costNote: 'संपूर्ण अहवाल पाहिल्यानंतर रुग्णालयाकडून अंतिम अधिकृत अंदाजपत्रक दिले जाते.',
    costRequestCTA: 'खर्चाचा अंदाज मिळवा',

    hospitalBadge: 'मान्यताप्राप्त रुग्णालये',
    hospitalTitle: 'आमचे आरोग्य नेटवर्क',
    hospitalLabelNote: 'आरोग्य सेवा प्रदाते ज्यांचे तुम्ही अन्वेषण करू शकता',
    hospitalNotice: 'एक स्वतंत्र समन्वयक म्हणून आम्ही तुम्हाला योग्य व निष्पक्ष रुग्णालय निवडण्यास मदत करतो.',

    doctorBadge: 'अनुभवी शल्यचिकित्सक',
    doctorTitle: 'योग्य तज्ज्ञ डॉक्टरांशी संपर्क साधा',
    doctorSubtitle: 'अनुभवी फिजिशियन व सर्जन्सकडून सखोल मार्गदर्शन व सल्ला.',
    doctorNotice:
      'पडताळणी व नैतिकता: आम्ही केवळ सत्यापित माहिती देतो. चौकशी केल्यानंतर समन्वयक थेट डॉक्टरांशी समन्वय साधतात.',
    requestConsultation: 'डॉक्टर सल्लामसलतीची विनंती',

    travelStayTitle: 'मिरज–सांगली प्रवासाचे नियोजन',
    comparisonTitle: 'आमचे समन्वयक सहाय्य का निवडावे?',

    faqBadge: 'स्पष्ट उत्तरे',
    faqTitle: 'नेहमी विचारले जाणारे प्रश्न',
    faqSubtitle: 'चौकशी, व्हिसा कागदपत्रे, राहण्याची सोय आणि उपचारांविषयी महत्त्वाची माहिती.',

    contactBadge: 'गोपनीय रुग्ण समन्वय',
    contactTitle: 'आम्ही आपल्याला कशी मदत करू शकतो?',
    contactSubtitle: 'व्हॉट्सअॅप, फोन किंवा ऑनलाइन फॉर्मद्वारे थेट संपर्क करा.',

    whatsappGreeting: 'नमस्कार, मला मिरज-सांगली येथील वैद्यकीय उपचारांविषयी माहिती हवी आहे.',
    adminPortal: 'समन्वयक / CMS डॅशबोर्ड',
    verifiedTag: 'सत्यापित माहिती',
    informationToVerify: 'माहिती पडताळणी प्रक्रियेत',

    emergencyBannerTitle: 'तातडीची वैद्यकीय सूचना: ',
    emergencyBanner: 'जर आपत्कालीन वैद्यकीय प्रसंग असेल तर त्वरित स्थानिक आपत्कालीन सेवांशी संपर्क साधा किंवा जवळच्या रुग्णालयात जा.',
    footerDesc: 'आंतरराष्ट्रीय आणि परराज्यातील रुग्णांना भारतातील नामांकित रुग्णालये व तज्ज्ञ डॉक्टरांशी जोडणारी स्वतंत्र रुग्ण सहाय्यक सेवा.',
    footerRights: 'सर्व हक्क राखीव. स्वतंत्र आरोग्य सेवा कंसीयज.',
    stepBadge: 'टप्पा',

    recommendedBadge: 'शिफारस केलेला मार्ग',
    assistedSub: 'समर्पित आरोग्य सेवा कंसीयज साहाय्य',
    confidentialNotice: 'कठोर डेटा गोपनीयता: आपले वैद्यकीय अहवाल पूर्णपणे सुरक्षित आहेत आणि केवळ नोंदणीकृत डॉक्टरांशीच शेअर केले जातात.',
    contactDesk: 'रुग्ण समन्वय कक्ष',
    contactPhone: 'थेट फोन हेल्पलाइन',
    contactEmail: 'अधिकृत ईमेल संपर्क',
    contactCenters: 'प्रादेशिक केंद्र नेटवर्क',
    contactHours: 'वेळ: २४/७ आंतरराष्ट्रीय कक्ष',
    faqCatAll: 'सर्व विभाग',
    faqCatGeneral: 'सर्वसाधारण विचारणा',
    faqCatMedical: 'वैद्यकीय व सल्लामसलत',
    faqCatTravel: 'प्रवास व व्हिसा मदत',
    faqCatCosts: 'उपचार खर्च अंदाज',
    faqSearchPlaceholder: 'वारंवार विचारले जाणारे प्रश्न शोधा...',
    haveQuestionPrompt: 'आपल्या मनात आणखी काही प्रश्न आहेत का?',
    askQuestionCTA: 'समन्वयक / AI सहाय्यकाशी चर्चा करा',
    footerEmergencyNotice: 'तातडीची वैद्यकीय सूचना:',
    footerBrandDesc: 'आंतरराष्ट्रीय आणि परराज्यातील रुग्णांना भारतातील विश्वासू रुग्णालये आणि तज्ज्ञ डॉक्टरांशी जोडणारी स्वतंत्र सहाय्यक सेवा.',
    footerQuickNav: 'जलद नेव्हिगेशन',
    navAbout: 'आमच्याबद्दल',
    navFaq: 'वारंवार विचारले जाणारे प्रश्न',
    footerPatientDesks: 'विशेष रुग्ण साहाय्य कक्ष',
    footerRegionalHeritage: 'प्रादेशिक वैद्यकीय वारसा',
    footerHeritageDesc: 'मिरज–सांगली हे १३० वर्षांहून अधिक काळ वैद्यकीय शिक्षण व शस्त्रक्रियांसाठी पश्चिम भारतातील अग्रगण्य केंद्र आहे.',
    allRightsReserved: 'सर्व हक्क राखीव. भारत हेल्थ कनेक्ट.',
    footerPrivacyPolicy: 'गोपनीयता धोरण',
    footerTermsOfService: 'नियम व अटी',
    footerMedicalDisclaimer: 'वैद्यकीय अस्वीकरण',
    footerBackToTop: 'वर जा',
    doctorsBadge: 'विशेषज्ञ डॉक्टर पॅनेल',
    journeyBadge: 'नियोजित उपचार प्रवास',
    journeyTitle: 'भारतातील आपला आरोग्य उपचार प्रवास',
    journeySubtitle: 'वैद्यकीय अहवाल तपासणीपासून ते उपचार पूर्ण करून सुखरूप घरी परतेपर्यंतचा पारदर्शक टप्पा.',
    milestoneStage: 'टप्पा',
    of: 'पैकी',
    coordinatorResponsibility: 'समन्वयकाची जबाबदारी',
    prevStage: 'मागील टप्पा',
    nextStage: 'पुढील टप्पा',
    storiesBadge: 'रुग्णांचे अनुभव',
    storiesTitle: 'रुग्णांचे अनुभव व केस हिस्टरी',
    storiesSubtitle: 'आमच्या स्वतंत्र नेटवर्कद्वारे उपचार घेतलेल्या आंतरराष्ट्रीय व अनिवासी रुग्णांचे अनुभव.',
    allExperiences: 'सर्व अनुभव',
    caseSummaries: 'वैद्यकीय सारांश',
    videoStories: 'व्हिडिओ व ऑडिओ अभिप्राय',
    testimonialConsentDisclaimer: 'सर्व रुग्णांचे अनुभव त्यांच्या स्पष्ट संमतीने आणि वैद्यकीय नोंदींच्या पडताळणीनंतरच प्रसिद्ध केले जातात.',
    travelStayBadge: 'प्रवास व्यवस्था व निवास',
    travelStaySubtitle: 'विनासायास प्रवास, व्हिसा आमंत्रण पत्रे आणि आरामदायी निवासासाठी संपूर्ण साहाय्य.',
    trustBadge: 'पारदर्शकता व संस्थात्मक विश्वास',
    trustTitle: 'रुग्ण भारत हेल्थ कनेक्टवर विश्वास का ठेवतात',
    trustSubtitle: 'स्वतंत्र, निष्पक्ष रुग्णहित आणि पारदर्शक सेवेसाठी आमची नैतिक वचनबद्धता.',
    ethicalPledgeHeading: 'आमची कठोर नैतिक आरोग्य सेवा प्रतिज्ञा',
    ethicalPledgeSub: 'आम्ही कोणत्याही रुग्णालयाकडून कमिशन घेत नाही किंवा अनावश्यक शस्त्रक्रिया सुचवत नाही.',
    nonBiasedAdvisory: '१००% निष्पक्ष वैद्यकीय सल्ला',
    clinicalDepartmentsBadge: 'वैद्यकीय विभाग',
    hospitalSubtitle: 'मिरज आणि सांगली येथे अग्रगण्य तृतीयक आरोग्य सेवा केंद्रे आहेत. एक स्वतंत्र रुग्ण साहाय्यक सेवा म्हणून, आम्ही या प्रादेशिक वैद्यकीय केंद्रांमध्ये तुम्हाला निष्पक्ष मार्गदर्शन करतो.',
    noSpecialtiesFound: 'कोणतेही परिणाम आढळले नाहीत',
    contactForOtherConditions: 'इतर वैद्यकीय आजारांच्या माहितीसाठी आमच्या रुग्ण समन्वयकांशी संपर्क साधा.',
    clearSearchFilter: 'फिल्टर हटवा',
    specialtyDisclaimer: 'टीप: विभागांचे वर्णन मिरज-सांगली परिसरातील उपलब्ध सुविधांची सामान्य माहिती देते. हा थेट वैद्यकीय सल्ला किंवा निकालाची हमी नाही.',
    allFacilitiesTab: 'सर्व रुग्णालये व केंद्र',
    mirajClusterTab: 'मिरज क्लस्टर',
    sangliClusterTab: 'सांगली क्लस्टर',
    searchHospitalPlaceholder: 'रुग्णालय किंवा विभाग शोधा...',
    partnerProviderBadge: 'भागीदार प्रदाता',
    exploreProviderBadge: 'तपासणीयोग्य रुग्णालय',
    keySpecialtiesLabel: 'प्रमुख विभाग:',
    clinicalFacilitiesLabel: 'वैद्यकीय सुविधा:',
    accreditationLabel: 'मान्यता व प्रमाणन:',
    inquireHospitalBtn: 'या रुग्णालयासाठी विचारणा करा',
    websiteLink: 'वेबसाइट',
    specialistPanelBadge: 'तज्ज्ञ डॉक्टर पॅनेल',
    verificationEthicsTitle: 'पडताळणी व नैतिक मूल्ये नोंद:',
    doctorEthicsNotice: 'आम्ही अप्रमाणित दावे प्रसिद्ध करत नाही. चौकशीनंतर समन्वयक थेट रुग्णालयातून डॉक्टरांच्या नोंदणी क्रमांकाची व पात्रतेची खातरजमा करतो.',
    qualificationsLabel: 'पात्रता व पदवी:',
    experienceLabel: 'अनुभव:',
    hospitalAffiliationLabel: 'संलग्न रुग्णालय:',
    languagesSpokenLabel: 'भाषा:',
    consultationFormatLabel: 'सल्ला स्वरूप:',
    credentialsVerifiedBadge: 'वैद्यकीय परिषदेच्या नोंदींनुसार पडताळणीकृत प्रमाणपत्रे',
  },
  bn: {
    brandTitle: 'ভারত হেলথ কানেক্ট',
    brandTagline: 'ভারতে চিকিৎসাসেবার সাথে আপনার যোগাযোগ',
    navWhyMiraj: 'আমাদের সম্পর্কে',
    navTreatments: 'চিকিৎসাসেবা',
    navHospitals: 'হাসপাতাল',
    navHowItWorks: 'কার্যপ্রক্রিয়া',
    navInternational: 'আন্তর্জাতিক রোগী',
    navFAQ: 'সাধারণ প্রশ্নোত্তর',
    navContact: 'যোগাযোগ',
    navWhatsApp: 'হোয়াটসঅ্যাপ',
    navGetAssistance: 'চিকিৎসা সহায়তা নিন',
    searchNavPlaceholder: 'হাসপাতাল, চিকিৎসা, ডাক্তার খুঁজুন...',
    searchBtn: 'অনুসন্ধান',
    portalLabel: 'ব্যক্তিগত স্বাস্থ্যসেবা সুবিধা পোর্টাল',
    textSize: 'ফন্ট সাইজ:',
    coordinatorPortal: 'কোঅর্ডিনেটর প্যানেল',
    breadcrumbHome: 'হোম',
    breadcrumbInternational: 'আন্তর্জাতিক রোগী',
    breadcrumbIndia: 'ভারতে স্বাস্থ্যসেবা',
    breadcrumbConcierge: 'রোগী সহায়তা ও হাসপাতাল সমন্বয়',

    heroHeadline: 'ভারতে বিশ্বস্ত চিকিৎসাসেবার সাথে আপনার সংযোগ',
    heroSubheadline:
      'ভারত জুড়ে মানসম্পন্ন চিকিৎসা ব্যবস্থা, বিশেষজ্ঞ চিকিৎসক এবং সর্বাঙ্গীন রোগী সহায়তা পরিষেবা অন্বেষণ করুন।',
    heroPrimaryCTA: 'চিকিৎসা সহায়তা নিন',
    heroSecondaryCTA: 'AI স্বাস্থ্য সহায়ক',
    heroTrustLine: 'স্বাস্থ্য তথ্য • হাসপাতাল সমন্বয় • বিশেষজ্ঞ পরামর্শ • ভ্রমণ সহায়তা',
    heroBadge: 'ভারতে স্বাস্থ্যসেবা সহায়তা',
    ethicalCareNotice:
      'স্বাস্থ্যসেবা সহায়তা বিজ্ঞপ্তি: ভারত হেলথ কানেক্ট একটি নিরপেক্ষ রোগী সহায়তা ও সমন্বয়কারী সংস্থা, কোনো হাসপাতাল নয়। সমস্ত চিকিৎসা পরামর্শ ও চিকিৎসা সেবা লাইসেন্সপ্রাপ্ত হাসপাতাল ও চিকিৎসকদের দ্বারা প্রদত্ত হয়।',
    conciergeCardTitle: 'ভারত হেলথ কানেক্ট কনসিয়ার্জ',
    conciergeCardSub: 'ভারতে চিকিৎসার জন্য নিরপেক্ষ সমন্বয়',
    realHumanTeam: 'অভিজ্ঞ সমন্বয়ক টিম',
    pillar1Title: 'একাধিক হাসপাতাল ও ডাক্তারের মতামত',
    pillar1Desc: 'বিভিন্ন শীর্ষস্থানীয় চিকিৎসকদের থেকে নিরপেক্ষ মূল্যায়ন।',
    pillar2Title: 'সরাসরি জিজ্ঞাসা ও টেলি-পর্যালোচনা',
    pillar2Desc: 'ভারতে ভ্রমণের পূর্বেই ডাক্তারের প্রাথমিক পরামর্শ।',
    pillar3Title: 'মেডিকেল ভিসা ও ভ্রমণ গাইডেন্স',
    pillar3Desc: 'আন্তর্জাতিক ও প্রবাসী পরিবারের জন্য পূর্ণাঙ্গ সমন্বয় সেবা।',
    stat1Num: '১০০+ বছর',
    stat1Label: 'চিকিৎসা ঐতিহ্য',
    stat2Num: '১৫+',
    stat2Label: 'সুপার-স্পেশালিটি',
    stat3Num: '১-অন-১',
    stat3Label: 'কেয়ার কোঅর্ডিনেটর',
    haveReports: 'আপনার কি মেডিকেল রিপোর্ট আছে?',
    uploadSecurely: 'নিচের ফর্মে নিরাপদে আপলোড করুন',
    startForm: 'ফর্ম পূরণ করুন',

    enquiryCardTitle: 'আপনার চিকিৎসার প্রয়োজন জানান',
    enquiryCardSubtitle: 'আপনার সমস্যা ও প্রশ্ন শেয়ার করুন। আমাদের সমন্বয়ক দল বিশ্বস্ততার সাথে যোগাযোগ করবেন।',
    fullName: 'সম্পূর্ণ নাম',
    country: 'দেশ',
    preferredLanguage: 'পছন্দের ভাষা (পরামর্শের জন্য)',
    whatsappNumber: 'হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোড সহ)',
    email: 'ইমেইল অ্যাড্রেস',
    treatmentSpecialty: 'চিকিৎসা বিভাগ বা রোগের ধরন',
    preferredHospitalDoctor: 'পছন্দের হাসপাতাল / ডাক্তার (ঐচ্ছিক)',
    uploadReports: 'মেডিকেল রিপোর্ট আপলোড করুন (PDF, JPG, PNG - প্রতি ফাইল সর্বোচ্চ 10MB)',
    uploadHint: 'রক্তের রিপোর্ট, এক্স-রে, এমআরআই বা ডাক্তারের প্রেসক্রিপশন যোগ করুন',
    message: 'লক্ষণ, সমস্যা বা চিকিৎসার প্রশ্ন সংক্ষেপে লিখুন',
    requestAssistanceCTA: 'চিকিৎসা সহায়তার আবেদন করুন',
    privacyNotice: 'আমরা আপনার তথ্যের সম্পূর্ণ গোপনীয়তা রক্ষা করি। তথ্য কেবল বিশেষজ্ঞ পর্যালোচনার জন্য ব্যবহৃত হয়।',
    consentCheckbox: 'আমার প্রদত্ত তথ্য উপযুক্ত স্বাস্থ্যসেবা বিশেষজ্ঞদের সাথে ভাগ করে নেওয়ার অনুমতি দিচ্ছি।',
    confidentialDataNotice: 'গোপনীয় স্বাস্থ্য তথ্য',

    whyMirajBadge: 'ঐতিহ্য ও আধুনিক পরিকাঠামো',
    whyMirajTitle: 'চিকিৎসার জন্য কেন এই সেবা বেছে নেবেন?',
    whyMirajSubtitle: 'ভারতের ঐতিহ্যবাহী ও বিশ্বমানের স্বাস্থ্যসেবা অবকাঠামোর সাথে সমন্বয়।',
    whyMirajPrompt: 'সঠিক হাসপাতাল বা ডাক্তার নির্বাচনে সাহায্য দরকার? আমাদের সমন্বয়কের সাথে কথা বলুন।',
    talkToCoordinator: 'কোঅর্ডিনেটরের সাথে কথা বলুন',

    specialtiesBadge: 'চিকিৎসা বিভাগ',
    specialtiesTitle: 'গুরুত্বপূর্ণ চিকিৎসা বিভাগসমূহ',
    specialtiesSubtitle: 'কার্ডিওলজি, অর্থোপেডিক, নিউরোসার্জারি, ইউরোলজি এবং অন্যান্য শীর্ষস্থানীয় বিভাগ।',
    searchSpecialtyPlaceholder: 'বিভাগ, অপারেশন বা রোগ অনুসন্ধান করুন...',
    askAboutTreatment: 'এই চিকিৎসা সম্পর্কে জানুন',

    timelineBadge: 'স্বচ্ছ সেবা পথরেখা',
    howItWorksTitle: 'কীভাবে যোগাযোগ করবেন',
    howItWorksSubtitle: 'প্রথম অনুসন্ধান থেকে সুস্থ হয়ে দেশে ফেরা পর্যন্ত ৬টি সহজ ও স্বচ্ছ ধাপ।',
    timelineCTA: 'চিকিৎসার জিজ্ঞাসা শুরু করুন',
    timelineSub: 'আপনার সুস্থতার যাত্রা শুরু করতে প্রস্তুত? আমাদের নিবেদিত কোঅর্ডিনেটরের সাথে যোগাযোগ করুন।',

    servicesBadge: 'পেশেন্ট কনসিয়ার্জ পরিসর',
    servicesTitle: 'হাসপাতালের বাইরেও সম্পূর্ণ সহায়তা',
    servicesSubtitle: 'মেডিকেল ভিসা গাইডেন্স, বিমানবন্দর থেকে গাড়ি এবং আরামদায়ক হোটেলের ব্যবস্থা।',
    servicesVisaNotice:
      'জরুরি ভিসা তথ্য: আমরা হাসপাতাল থেকে আনুষ্ঠানিক ভিসা আমন্ত্রণ পত্র সরবরাহ করি। ভারতীয় ই-মেডিকেল ভিসা ভারত সরকারের পররাষ্ট্র মন্ত্রণালয় কর্তৃক অনুমোদিত হয়।',
    servicesCustomPrompt: 'বিশেষ কোনো সহায়তার প্রয়োজন? আমাদের কেয়ার সমন্বয়কের সাথে সরাসরি কথা বলুন।',

    costBadge: 'আর্থিক স্বচ্ছতা',
    costTitle: 'চিকিৎসা খরচ সম্পর্কে জানুন',
    costSubtitle: 'কোনো লুকানো চার্জ নেই; হাসপাতাল থেকে স্বচ্ছ ও স্পষ্ট আনুমানিক খরচের বিবরণী।',
    costEthicsNotice:
      'আর্থিক স্বচ্ছতা নীতি: আমরা হাসপাতালের চিকিৎসা ব্যয়ে কোনো বাড়তি কমিশন যোগ করি না। সকল কোটেশন সরাসরি হাসপাতাল কর্তৃক প্রদত্ত।',
    costColTreatment: 'চিকিৎসা / অপারেশন',
    costColEstimate: 'হাসপাতালের আনুমানিক ব্যয়',
    costColHospitalStay: 'হাসপাতালে অবস্থান',
    costColRecovery: 'বিশ্রামের সময়কাল',
    costColIncluded: 'অন্তর্ভুক্ত সেবাসমূহ',
    costColExcluded: 'অতিরিক্ত খরচসমূহ',
    costNote: 'রিপোর্ট দেখার পর হাসপাতাল প্রশাসন থেকে চূড়ান্ত আনুষ্ঠানিক খরচের হিসাব প্রদান করা হয়।',
    costRequestCTA: 'আনুমানিক খরচের তালিকা চান',

    hospitalBadge: 'স্বীকৃত হাসপাতাল',
    hospitalTitle: 'আমাদের স্বাস্থ্যসেবা নেটওয়ার্ক',
    hospitalLabelNote: 'যেসব হাসপাতাল আপনি বিবেচনা করতে পারেন',
    hospitalNotice: 'একটি স্বাধীন সেবা প্ল্যাটফর্ম হিসেবে আমরা আপনাকে নিরপেক্ষভাবে উপযুক্ত হাসপাতাল খুঁজে পেতে সাহায্য করি।',

    doctorBadge: 'অভিজ্ঞ চিকিৎসক',
    doctorTitle: 'অভিজ্ঞ বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন',
    doctorSubtitle: 'ভারতে আসার পূর্বেই বিশেষজ্ঞ ডাক্তারের সাথে যোগাযোগ ও দ্বিতীয় মতামত।',
    doctorNotice:
      'যাচাইকৃত তথ্য ও নীতি: আমরা কেবল যাচাইকৃত তথ্য প্রদান করি। আপনার অনুরোধের পর সমন্বয়ক সরাসরি চিকিৎসকদের সাথে সমন্বয় করেন।',
    requestConsultation: 'ডাক্তারের পরামর্শ চান',

    travelStayTitle: 'ভ্রমণ ও অবস্থান পরিকল্পনা',
    comparisonTitle: 'কেন আমাদের সমন্বয় সেবা গ্রহণ করবেন?',

    faqBadge: 'স্পষ্ট উত্তর',
    faqTitle: 'সাধারণ প্রশ্নোত্তর (FAQ)',
    faqSubtitle: 'অনুসন্ধান, ভিসা সংক্রান্ত নথি, হোটেল ব্যবস্থা এবং চিকিৎসা পরিকল্পনার গুরুত্বপূর্ণ তথ্য।',

    contactBadge: 'গোপনীয় রোগী সমন্বয়',
    contactTitle: 'আমরা কীভাবে সাহায্য করতে পারি?',
    contactSubtitle: 'হোয়াটসঅ্যাপ বা সরাসরি মেসেজে আমাদের সাথে যোগাযোগ করুন।',

    whatsappGreeting: 'নমস্কার, আমি ভারত হেলথ কানেক্টের মাধ্যমে ভারতে চিকিৎসার ব্যাপারে সমন্বয় সহায়তা চাই।',
    adminPortal: 'কোঅর্ডিনেটর প্যানেল',
    verifiedTag: 'যাচাইকৃত তথ্য',
    informationToVerify: 'তথ্য যাচাই সাপেক্ষ',

    emergencyBannerTitle: 'জরুরি চিকিৎসা বিজ্ঞপ্তি: ',
    emergencyBanner: 'যদি আপনার জরুরি চিকিৎসার প্রয়োজন হয়, তবে অবিলম্বে স্থানীয় জরুরি নম্বরে কল করুন অথবা নিকটস্থ হাসপাতালে যান।',
    footerDesc: 'স্বতন্ত্র মেডিকেল কনসিয়ার্জ সেবা যা আন্তর্জাতিক রোগী ও প্রবাসী পরিবারগুলোকে ভারতের শীর্ষ হাসপাতাল ও চিকিৎসকদের সাথে যুক্ত করে।',
    footerRights: 'সর্বস্বত্ব সংরক্ষিত। স্বাধীন স্বাস্থ্যসেবা কনসিয়ার্জ।',
    stepBadge: 'ধাপ',

    recommendedBadge: 'প্রস্তাবিত পদ্ধতি',
    assistedSub: 'নিবেদিত স্বাস্থ্যসেবা কনসিয়ার্জ সহায়তা',
    confidentialNotice: 'কঠোর তথ্য গোপনীয়তা: আপনার চিকিৎসা তথ্য সম্পূর্ণরূপে গোপনীয় এবং কেবল লাইসেন্সপ্রাপ্ত চিকিৎসকদের সাথে শেয়ার করা হয়।',
    contactDesk: 'রোগী সমন্বয় ডেস্ক',
    contactPhone: 'সরাসরি ফোন নম্বর',
    contactEmail: 'অফিসিয়াল ইমেল যোগাযোগ',
    contactCenters: 'আঞ্চলিক সহায়তা কেন্দ্র',
    contactHours: 'কার্যকাল: ২৪/৭ আন্তর্জাতিক ডেস্ক',
    faqCatAll: 'সকল বিভাগ',
    faqCatGeneral: 'সাধারণ জিজ্ঞাসা',
    faqCatMedical: 'চিকিৎসা ও ডাক্তার পরামর্শ',
    faqCatTravel: 'ভ্রমণ ও ভিসা সহায়তা',
    faqCatCosts: 'চিকিৎসা খরচের আনুমানিক হিসাব',
    faqSearchPlaceholder: 'সাধারণ প্রশ্নোত্তর খুঁজুন...',
    haveQuestionPrompt: 'ভারতে চিকিৎসার ব্যাপারে আপনার কি অন্য কোনো প্রশ্ন আছে?',
    askQuestionCTA: 'কোঅর্ডিনেটর / AI সহায়ককে জানান',
    footerEmergencyNotice: 'জরুরি চিকিৎসা বিজ্ঞপ্তি:',
    footerBrandDesc: 'স্বতন্ত্র পেশেন্ট কনসিয়ার্জ যা আন্তর্জাতিক রোগী ও প্রবাসী পরিবারগুলোকে ভারতের শীর্ষ হাসপাতাল ও চিকিৎসকদের সাথে যুক্ত করে।',
    footerQuickNav: 'দ্রুত মেনু',
    navAbout: 'আমাদের সম্পর্কে',
    navFaq: 'সাধারণ প্রশ্নোত্তর',
    footerPatientDesks: 'বিশেষ রোগী সহায়তা ডেস্ক',
    footerRegionalHeritage: 'ঐতিহাসিক চিকিৎসা ঐতিহ্য',
    footerHeritageDesc: 'মিরজ–সাংলি ১৩০ বছরেরও বেশি সময় ধরে পশ্চিম ভারতে আধুনিক চিকিৎসা ও জটিল অস্ত্রোপচারের ঐতিহাসিক কেন্দ্র।',
    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত। ভারত হেলথ কানেক্ট।',
    footerPrivacyPolicy: 'গোপনীয়তা নীতি',
    footerTermsOfService: 'সেবার শর্তাবলী',
    footerMedicalDisclaimer: 'মেডিকেল ডিসক্লেইমার',
    footerBackToTop: 'উপরে ফিরে যান',
    doctorsBadge: 'বিশেষজ্ঞ চিকিৎসক প্যানেল',
    journeyBadge: 'পরিকল্পিত চিকিৎসা যাত্রা',
    journeyTitle: 'ভারতে আপনার চিকিৎসা সেবা যাত্রা',
    journeySubtitle: 'রিপোর্ট মূল্যায়ন থেকে শুরু করে সফল চিকিৎসা ও নিরাপদে বাড়ি ফেরা পর্যন্ত ধাপে ধাপে স্পষ্ট নির্দেশনা।',
    milestoneStage: 'ধাপ',
    of: 'এর মধ্যে',
    coordinatorResponsibility: 'কোঅর্ডিনেটরের দায়িত্ব',
    prevStage: 'পূর্ববর্তী ধাপ',
    nextStage: 'পরবর্তী ধাপ',
    storiesBadge: 'রোগীদের অভিজ্ঞতা',
    storiesTitle: 'রোগীদের চিকিৎসা অভিজ্ঞতা ও বাস্তব কেস স্টাডি',
    storiesSubtitle: 'আমাদের স্বতন্ত্র নেটওয়ার্কের সহায়তায় সুস্থ হওয়া আন্তর্জাতিক ও প্রবাসী রোগীদের বাস্তব অভিজ্ঞতা।',
    allExperiences: 'সকল অভিজ্ঞতা',
    caseSummaries: 'ক্লিনিক্যাল সারাংশ',
    videoStories: 'ভিডিও ও অডিও রিভিউ',
    testimonialConsentDisclaimer: 'সকল রোগীর অভিজ্ঞতা লিখিত সম্মতি ও মেডিকেল যাচাইয়ের পর প্রকাশ করা হয়।',
    travelStayBadge: 'ভ্রমণ লজিস্টিকস ও আবাসন',
    travelStaySubtitle: 'ঝামেলামুক্ত যাত্রা, মেডিকেল ভিসা ইনভাইটেশন লেটার এবং আরামদায়ক রিকভারি থাকার সম্পূর্ণ ব্যবস্থা।',
    trustBadge: 'স্বচ্ছতা ও প্রাতিষ্ঠানিক বিশ্বাস',
    trustTitle: 'রোগীরা কেন ভারত হেলথ কানেক্টকে বেছে নেন',
    trustSubtitle: 'স্বতন্ত্র, নিরপেক্ষ ও সৎ রোগী সেবার প্রতি আমাদের অটল নৈতিক প্রতিশ্রুতি।',
    ethicalPledgeHeading: 'আমাদের কঠোর নৈতিক স্বাস্থ্যসেবা অঙ্গীকার',
    ethicalPledgeSub: 'আমরা কোনো হাসপাতাল থেকে অনুচিত কমিশন গ্রহণ করি না বা অপ্রয়োজনীয় চিকিৎসার পরামর্শ দিই না।',
    nonBiasedAdvisory: '১০০% নিরপেক্ষ মেডিকেল পরামর্শ',
    clinicalDepartmentsBadge: 'ক্লিনিক্যাল বিভাগসমূহ',
    hospitalSubtitle: 'মিরজ এবং সাংলিতে প্রধান টারশিয়ারি স্বাস্থ্যসেবা কেন্দ্র রয়েছে। একটি স্বাধীন কনসিয়ার্জ সেবা হিসেবে, আমরা আপনাকে এই আঞ্চলিক চিকিৎসা প্রতিষ্ঠানগুলোতে স্বচ্ছ ও নিরপেক্ষভাবে পথপ্রদর্শন করি।',
    noSpecialtiesFound: 'কোনো ফলাফল পাওয়া যায়নি',
    contactForOtherConditions: 'অন্যান্য চিকিৎসাসেবার তথ্যের জন্য সরাসরি আমাদের সমন্বয়কের সাথে যোগাযোগ করুন।',
    clearSearchFilter: 'ফিল্টার মুছুন',
    specialtyDisclaimer: 'বিজ্ঞপ্তি: বিশেষত্বের বিবরণ মিরজ-সাংলিতে উপলব্ধ হাসপাতাল ও বিভাগসমূহের প্রাথমিক দিকনির্দেশনা প্রদান করে। এটি কোনো ব্যক্তিগত চিকিৎসা পরামর্শ বা ফলাফলের নিশ্চয়তা নয়।',
    allFacilitiesTab: 'সকল স্বাস্থ্যসেবা কেন্দ্র',
    mirajClusterTab: 'মিরজ ক্লাস্টার',
    sangliClusterTab: 'সাংলি ক্লাস্টার',
    searchHospitalPlaceholder: 'হাসপাতাল বা বিভাগ খুঁজুন...',
    partnerProviderBadge: 'অংশীদার কেন্দ্র',
    exploreProviderBadge: 'রেফারেল হাসপাতাল',
    keySpecialtiesLabel: 'প্রধান বিশেষত্ব:',
    clinicalFacilitiesLabel: 'চিকিৎসা সুযোগ-সুবিধা:',
    accreditationLabel: 'স্বীকৃতি ও সার্টিফিকেশন:',
    inquireHospitalBtn: 'এই হাসপাতালের জন্য অনুসন্ধান করুন',
    websiteLink: 'ওয়েবসাইট',
    specialistPanelBadge: 'বিশেষজ্ঞ চিকিৎসক প্যানেল',
    verificationEthicsTitle: 'যাচাই ও নৈতিক অঙ্গীকার নোট:',
    doctorEthicsNotice: 'আমরা কোনো অপ্রমাণিত তথ্য প্রকাশ করি না। রোগী অনুরোধ করার পর আমাদের সমন্বয়ক সরাসরি চিকিৎসকদের মেডিকেল কাউন্সিল নিবন্ধন ও অভিজ্ঞতার সত্যতা যাচাই করেন।',
    qualificationsLabel: 'শিক্ষাগত যোগ্যতা:',
    experienceLabel: 'অভিজ্ঞতা:',
    hospitalAffiliationLabel: 'হাসপাতাল সংযুক্তি:',
    languagesSpokenLabel: 'ভাষা:',
    consultationFormatLabel: 'পরামর্শের ধরন:',
    credentialsVerifiedBadge: 'মেডিকেল কাউন্সিল দ্বারা যাচাইকৃত সনদপত্র',
  },
  ar: {
    brandTitle: 'بهارات هيلث كونكت',
    brandTagline: 'خدمات التنسيق الطبي والرعاية الصحية في الهند',
    navWhyMiraj: 'نبذة عنا',
    navTreatments: 'التخصصات الطبية',
    navHospitals: 'المستشفيات',
    navHowItWorks: 'كيف نعمل',
    navInternational: 'خدمات المرضى الدوليين',
    navFAQ: 'الأسئلة الشائعة',
    navContact: 'اتصل بنا',
    navWhatsApp: 'واتساب',
    navGetAssistance: 'طلب مساعدة طبية',
    searchNavPlaceholder: 'ابحث عن مستشفى، عملية، طبيب...',
    searchBtn: 'بحث',
    portalLabel: 'بوابة التنسيق الطبي والرعاية الصحية الخاصة',
    textSize: 'حجم الخط:',
    coordinatorPortal: 'بوابة المنسق الطبي',
    breadcrumbHome: 'الرئيسية',
    breadcrumbInternational: 'المرضى الدوليين',
    breadcrumbIndia: 'العلاج في الهند',
    breadcrumbConcierge: 'المرافقة والتنسيق الطبي المتكامل',

    heroHeadline: 'رعاية صحية موثوقة في الهند — مع دعم شامل للمرضى',
    heroSubheadline:
      'استكشف خيارات الرعاية الصحية والمستشفيات التخصصية المعتمدة في الهند مع مرافقة شخصية وإرشاد متكامل.',
    heroPrimaryCTA: 'طلب مساعدة طبية',
    heroSecondaryCTA: 'مساعد الرعاية الصحية الذكي',
    heroTrustLine: 'معلومات الرعاية الصحية • تنسيق المستشفيات • استشارات الأطباء • المساعدة في السفر',
    heroBadge: 'المساعدة الصحية في الهند',
    ethicalCareNotice:
      'إشعار التنسيق الطبي: بهارات هيلث كونكت هي خدمة مرافقة وتيسير طبي مستقلة وليست مستشفى. جميع القرارات الطبية والعلاجية تصدر وتنفذ حصرياً عبر الأطباء والمستشفيات المرخصة والمعتمدة.',
    conciergeCardTitle: 'بهارات هيلث كونكت كونسيرج',
    conciergeCardSub: 'تنسيق مستقل للرعاية الصحية في الهند',
    realHumanTeam: 'فريق منسقين بشري معتمد',
    pillar1Title: 'عرض الحالة على عدة مستشفيات واستشاريين',
    pillar1Desc: 'تقييم سريري محايد ودقيق من عدة فرق جراحية متخصصة.',
    pillar2Title: 'استشارة مبدئية ورأي طبي قبل السفر',
    pillar2Desc: 'تقييم شامل للفحوصات والأشعة قبل حجز التذاكر.',
    pillar3Title: 'تأشيرة العلاج وترتيبات السفر والإقامة',
    pillar3Desc: 'خدمات شاملة للمرضى الدوليين وعائلاتهم من المطار إلى العودة.',
    stat1Num: '100+ عام',
    stat1Label: 'إرث طبي وتاريخي',
    stat2Num: '15+',
    stat2Label: 'تخصص دقيق',
    stat3Num: '1-إلى-1',
    stat3Label: 'منسق رعاية مخصص',
    haveReports: 'هل لديك تقارير أو أشعة طبية؟',
    uploadSecurely: 'ارفعها بأمان عبر النموذج أدناه',
    startForm: 'ابدأ النموذج',

    enquiryCardTitle: 'أخبرنا باحتياجاتك الطبية',
    enquiryCardSubtitle: 'شاركنا استفسارك الطبي بسرية تامة. سيقوم منسق رعاية معتمد بمراجعة حالتك والتواصل معك.',
    fullName: 'الاسم الكامل',
    country: 'بلد الإقامة',
    preferredLanguage: 'اللغة المفضلة للتواصل',
    whatsappNumber: 'رقم واتساب (مع رمز الدولة)',
    email: 'البريد الإلكتروني',
    treatmentSpecialty: 'التخصص الطبي المطلوب',
    preferredHospitalDoctor: 'المستشفى أو الطبيب المفضل (اختياري)',
    uploadReports: 'تحميل التقارير الطبية (PDF, JPG, PNG - حتى 10 ميغابايت لكل ملف)',
    uploadHint: 'يرجى إرفاق تقارير الأشعة أو الفحوصات المخبرية أو ملخص الطبيب',
    message: 'اشرح الأعراض أو الحالة الطبية أو استفساراتك باختصار',
    requestAssistanceCTA: 'إرسال طلب المساعدة الطبية',
    privacyNotice: 'نحترم خصوصيتك بالكامل. تستخدم بياناتك فقط لمساعدتك في استفسارك الطبي.',
    consentCheckbox: 'أوافق على مشاركة المعلومات مع مقدمي الرعاية الصحية المؤهلين للرد على استفساري.',
    confidentialDataNotice: 'بيانات طبية سرية وآمنة',

    whyMirajBadge: 'إرث عريق وبنية متطورة',
    whyMirajTitle: 'لماذا تختار ميراج–سانغلي للعلاج؟',
    whyMirajSubtitle: 'مركز طبي تاريخي في ولاية ماهاراشترا يضم مستشفيات تخصصية متطورة وتكاليف مدروسة.',
    whyMirajPrompt: 'هل تحتاج مساعدة في اختيار المستشفى أو الجراح الأنسب؟ تحدث مباشرة مع المنسق.',
    talkToCoordinator: 'تحدث مع المنسق الطبي',

    specialtiesBadge: 'الأقسام السريرية',
    specialtiesTitle: 'التخصصات الطبية المتكاملة',
    specialtiesSubtitle: 'جراحة القلب، العظام، العمود الفقري، الأعصاب، المسالك البولية، وغيرها.',
    searchSpecialtyPlaceholder: 'ابحث عن تخصص، عملية أو تشخيص...',
    askAboutTreatment: 'استفسر عن هذا العلاج',

    timelineBadge: 'مسار الرعاية الشفاف',
    howItWorksTitle: 'كيف تبدأ رحلتك العلاجية',
    howItWorksSubtitle: 'ست خطوات واضحة وميسرة من الاستشارة الأولى حتى عودتك بسلامة الله.',
    timelineCTA: 'ابدأ استفسارك الطبي الآن',
    timelineSub: 'مستعد لبدء رحلتك العلاجية؟ تواصل مع منسق الرعاية المخصص لك.',

    servicesBadge: 'نطاق خدمات المرافقة',
    servicesTitle: 'رعاية متكاملة تفوق المستشفى',
    servicesSubtitle: 'إرشاد تأشيرة العلاج، الاستقبال في المطار، الإقامة الفندقية ودعم المترجمين.',
    servicesVisaNotice:
      'إشعار التأشيرة الهامة: نقوم بالتنسيق مع المستشفيات لاستخراج خطاب الدعوة الطبي الرسمي. التأشيرة الإلكترونية تصدر حصراً من وزارة الشؤون الخارجية الهندية.',
    servicesCustomPrompt: 'هل ترغب في ترتيبات خاصة لك ولعائلتك؟ تحدث مباشرة مع منسق الرعاية.',

    costBadge: 'الشفافية المالية',
    costTitle: 'فهم تكاليف العلاج بشفافية',
    costSubtitle: 'تكاليف تقريبية واضحة يتم تحديدها نهائياً من قبل المستشفى بعد تقييم الفحوصات.',
    costEthicsNotice:
      'ميثاق النزاهة والشفافية: لا نتقاضى أي مبالغ إضافية أو عمولات على فواتير المستشفيات. عروض الأسعار تصدر مباشرة من إدارة المستشفى.',
    costColTreatment: 'العلاج / العملية الجراحية',
    costColEstimate: 'تقدير المستشفى المعتمد',
    costColHospitalStay: 'إقامة المستشفى',
    costColRecovery: 'فترة النقاهة',
    costColIncluded: 'الخدمات المشمولة',
    costColExcluded: 'غير المشمول',
    costNote: 'يتم تأكيد عرض السعر النهائي المعتمد رسمياً من قبل المستشفى بعد مراجعة الطبيب الاستشاري لجميع الفحوصات والأشعة.',
    costRequestCTA: 'طلب تقدير تكلفة مخصص',

    hospitalBadge: 'مستشفيات معتمدة',
    hospitalTitle: 'شبكة الرعاية الصحية',
    hospitalLabelNote: 'مستشفيات معتمدة ومراكز طبية يمكنك استكشافها',
    hospitalNotice: 'بصفتنا منصة تنسيق طبي مستقلة، نساعدك في تقييم واختيار المنشآت الطبية بكل حيادية وموضوعية.',

    doctorBadge: 'كبار الاستشاريين والجراحين',
    doctorTitle: 'تواصل مع أفضل الجراحين والاستشاريين',
    doctorSubtitle: 'استشارات قبل السفر ورأي طبي ثانٍ بكل وضوح وشفافية.',
    doctorNotice:
      'ميثاق النزاهة الطبية: ننشر فقط المعلومات المؤكدة. عند تقديم استفسارك، يقوم منسقنا بمخاطبة المستشفى مباشرة لترتيب الاستشارة.',
    requestConsultation: 'طلب استشارة طبيب',

    travelStayTitle: 'رحلتك إلى ميراج–سانغلي',
    comparisonTitle: 'لماذا تختار خدمة التنسيق لدينا؟',

    faqBadge: 'إجابات واضحة',
    faqTitle: 'الأسئلة الأكثر تكراراً',
    faqSubtitle: 'حقائق أساسية حول الاستشارات الطبية، وثائق التأشيرة، الإقامة، خطة العلاج، والمتابعة.',

    contactBadge: 'تنسيق طبي بسرية تامة',
    contactTitle: 'تواصل مع فريق المنسقين',
    contactSubtitle: 'نحن هنا للإجابة على جميع استفساراتك بكل أمانة واحترافية.',

    whatsappGreeting: 'مرحباً، أود الاستفسار عن العلاج الطبي في الهند عبر بهارات هيلث كونكت. أحتاج لمساعدة منسق.',
    adminPortal: 'لوحة التحكم والمتابعة',
    verifiedTag: 'معلومات مؤكدة',
    informationToVerify: 'المعلومات تخضع للتحقق المسبق',

    emergencyBannerTitle: 'تنبيه الحالات الطارئة: ',
    emergencyBanner: 'إذا كنت تعاني من حالة طبية حرجة أو طارئة، يرجى التوجه فوراً لأقرب قسم طوارئ أو الاتصال بخدمات الإسعاف المحلية. خدماتنا مخصصة لتنسيق العلاجات المجدولة.',
    footerDesc: 'خدمة مرافقة وتنسيق طبي مستقلة تربط المرضى الدوليين والمغتربين بأفضل المستشفيات والأطباء المعتمدين في الهند.',
    footerRights: 'جميع الحقوق محفوظة. خدمات التنسيق والمرافقة الصحية المستقلة.',
    stepBadge: 'المرحلة',

    recommendedBadge: 'المسار الموصى به',
    assistedSub: 'دعم ورعاية متكاملة من منسقك الخاص',
    confidentialNotice: 'خصوصية مشددة للبيانات: تقاريرك الطبية سرية تماماً ولا يطلع عليها سوى الأطباء الاستشاريين المرخصين.',
    contactDesk: 'مكتب تنسيق رعاية المرضى',
    contactPhone: 'خط الاتصال المباشر',
    contactEmail: 'البريد الإلكتروني الرسمي',
    contactCenters: 'شبكة المراكز الإقليمية',
    contactHours: 'ساعات العمل: مكتب المرضى الدوليين على مدار الساعة',
    faqCatAll: 'جميع الأقسام',
    faqCatGeneral: 'استفسارات عامة',
    faqCatMedical: 'العلاج والاستشارات الطبية',
    faqCatTravel: 'السفر وخدمات التأشيرة الطبية',
    faqCatCosts: 'تقديرات التكاليف والأسعار',
    faqSearchPlaceholder: 'ابحث في الأسئلة الشائعة...',
    haveQuestionPrompt: 'هل لديك استفسار آخر غير مدرج حول العلاج في الهند؟',
    askQuestionCTA: 'تحدث مع المنسق / المساعد الذكي',
    footerEmergencyNotice: 'تنبيه الحالات الطارئة:',
    footerBrandDesc: 'خدمة مرافقة وتنسيق طبي مستقلة تربط المرضى الدوليين بالمستشفيات المعتمدة ونخبة الأطباء الجراحين في الهند.',
    footerQuickNav: 'روابط سريعة',
    navAbout: 'نبذة عنا',
    navFaq: 'الأسئلة الأكثر تكراراً',
    footerPatientDesks: 'مكاتب مساعدة المرضى المخصصة',
    footerRegionalHeritage: 'تاريخ طبي إقليمي عريق',
    footerHeritageDesc: 'تعد ميراج–سانغلي مركزاً طبياً وجراحياً تاريخياً في غرب الهند منذ أكثر من 130 عاماً من العطاء الطبي.',
    allRightsReserved: 'جميع الحقوق محفوظة. بهارات هيلث كونكت.',
    footerPrivacyPolicy: 'سياسة الخصوصية',
    footerTermsOfService: 'شروط التنسيق والخدمة',
    footerMedicalDisclaimer: 'إخلاء المسؤولية الطبية',
    footerBackToTop: 'العودة للأعلى',
    doctorsBadge: 'نخبة الأطباء الاستشاريين',
    journeyBadge: 'مسار رعاية منظم',
    journeyTitle: 'رحلتك العلاجية الشاملة إلى الهند',
    journeySubtitle: 'مسار منظم ومريح يبدأ من تقييم تقاريرك الطبية وحتى تلقي العلاج والعودة سالماً إلى وطنك.',
    milestoneStage: 'المرحلة',
    of: 'من',
    coordinatorResponsibility: 'مسؤولية المنسق الطبي',
    prevStage: 'المرحلة السابقة',
    nextStage: 'المرحلة التالية',
    storiesBadge: 'تجارب المرضى',
    storiesTitle: 'قصص نجاح وتجارب مرضانا الحقيقية',
    storiesSubtitle: 'تجارب واقعية لمرضى دوليين ومغتربين تلقوا علاجهم تحت إشراف وتنسيق شبكتنا الطبية المستقلة.',
    allExperiences: 'جميع التجارب',
    caseSummaries: 'ملخصات الحالات السريرية',
    videoStories: 'تسجيلات مرئية وصوتية',
    testimonialConsentDisclaimer: 'تم نشر كافة تجارب المرضى بموافقتهم الخطية الصريحة مع توثيق السجلات الطبية. يتم حجب البيانات الشخصية بناء على رغبة المريض.',
    travelStayBadge: 'ترتيبات السفر والإقامة',
    travelStaySubtitle: 'دعم لوجستي شامل يضمن سفراً مريحاً، خطابات تأشيرة رسمية، وأماكن إقامة مهيأة للاستشفاء.',
    trustBadge: 'الشفافية والمصداقية المؤسسية',
    trustTitle: 'لماذا يثق المرضى ببهارات هيلث كونكت',
    trustSubtitle: 'التزامنا الأخلاقي المستقل بتقديم المشورة الطبية النزيهة ودعم المريض دون أي تضارب في المصالح.',
    ethicalPledgeHeading: 'ميثاقنا الأخلاقي الصارم في الرعاية الصحية',
    ethicalPledgeSub: 'لا نتقاضى أي عمولات سرية من المستشفيات، ولا نوجه المرضى لعمليات غير ضرورية، ولا ننشر شهادات وهمية إطلاقاً.',
    nonBiasedAdvisory: 'استشارة طبية مستقلة وغير متحيزة 100%',
    clinicalDepartmentsBadge: 'الأقسام والتخصصات السريرية',
    hospitalSubtitle: 'تضم مدينتا ميراج وسانغلي مراكز رعاية صحية متقدمة من الدرجة الثالثة. وبصفتنا جهة تنسيق طبية مستقلة، نساعدك في استكشاف هذه المنشآت الطبية بكل حيادية وشفافية.',
    noSpecialtiesFound: 'لم يتم العثور على نتائج مطابقة',
    contactForOtherConditions: 'يرجى التواصل مع المنسق الطبي مباشرة للاستفسار عن الحالات والتخصصات الأخرى.',
    clearSearchFilter: 'إعادة ضبط البحث',
    specialtyDisclaimer: 'ملاحظة: تهدف بيانات الأقسام إلى تقديم دليل عام حول التخصصات المتاحة في مستشفيات ميراج–سانغلي، ولا تعد مشورة علاجية شخصية أو ضماناً لنتائج جراحية بعينها.',
    allFacilitiesTab: 'كافة المستشفيات والمراكز',
    mirajClusterTab: 'مجمع مستشفيات ميراج',
    sangliClusterTab: 'مجمع مستشفيات سانغلي',
    searchHospitalPlaceholder: 'ابحث باسم المستشفى أو القسم...',
    partnerProviderBadge: 'مزود شريك معتمد',
    exploreProviderBadge: 'مستشفى استكشافي',
    keySpecialtiesLabel: 'أبرز التخصصات:',
    clinicalFacilitiesLabel: 'التجهيزات والمرافق السريرية:',
    accreditationLabel: 'الاعتماد والتراخيص:',
    inquireHospitalBtn: 'طلب استشارة في هذا المستشفى',
    websiteLink: 'الموقع الرسمي',
    specialistPanelBadge: 'نخبة الأطباء الاستشاريين',
    verificationEthicsTitle: 'إشعار النزاهة والتحقق المهني:',
    doctorEthicsNotice: 'نحن لا ننشر ادعاءات طبية غير موثقة. عند تقديم استفسارك، يقوم منسقنا بالتواصل المباشر مع إدارة المستشفى لتزويدك ببيانات التسجيل الرسمي والسيرة الذاتية المعتمدة للطبيب المعالج.',
    qualificationsLabel: 'المؤهلات والشهادات:',
    experienceLabel: 'سنوات الخبرة:',
    hospitalAffiliationLabel: 'المستشفى التابع له:',
    languagesSpokenLabel: 'اللغات المتاحة:',
    consultationFormatLabel: 'طريقة الاستشارة:',
    credentialsVerifiedBadge: 'تم التحقق من بيانات الطبيب وسجله الطبي المهني المعتمد',
  },
};
