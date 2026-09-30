import { SupportedLanguage } from './translations';

export interface LocalizedSpecialty {
  id: string;
  name: string;
  iconName?: string;
  description?: string;
  keyProcedures?: string[];
}

export const localizedSpecialties: Record<SupportedLanguage, LocalizedSpecialty[]> = {
  en: [
    {
      id: 'spec-ortho',
      name: 'Orthopaedics & Joint Replacement',
      iconName: 'Activity',
      description: 'Robotic knee & hip replacement, complex trauma reconstruction, arthroscopy, and spine stabilization.',
      keyProcedures: ['Robotic Total Knee Replacement', 'Hip Resurfacing & Arthroplasty', 'Spine Microdiscectomy', 'ACL/Ligament Reconstruction'],
    },
    {
      id: 'spec-cardio',
      name: 'Cardiology & Cardiac Surgery',
      iconName: 'Heart',
      description: 'Advanced catheterization, coronary angioplasty (PTCA), CABG bypass, and valve repair.',
      keyProcedures: ['Coronary Angioplasty (DES)', 'CABG (Beating Heart)', 'Valvular Heart Surgery', 'Pacemaker Implantation'],
    },
    {
      id: 'spec-neuro',
      name: 'Neurosurgery & Neurology',
      iconName: 'Brain',
      description: 'Microsurgical tumor removal, stroke management, minimally invasive spinal fusion, and epilepsy care.',
      keyProcedures: ['Brain Tumor Resection', 'Spine Decompression & Fusion', 'Stroke Thrombolysis Unit', 'Endoscopic Skull Base Surgery'],
    },
    {
      id: 'spec-onco',
      name: 'Oncology & Cancer Care',
      iconName: 'ShieldAlert',
      description: 'Multidisciplinary oncology with surgical, medical chemotherapy, radiation, and palliative care.',
      keyProcedures: ['Surgical Tumor Resection', 'Targeted Chemotherapy', 'Linear Accelerator Radiation', 'Preventive Cancer Screening'],
    },
    {
      id: 'spec-ophthal',
      name: 'Ophthalmology & Eye Surgery',
      iconName: 'Eye',
      description: 'Miraj medical legacy in vitreo-retinal surgery, blade-free cataract phacoemulsification, and cornea transplants.',
      keyProcedures: ['Phacoemulsification Cataract', 'Vitrectomy & Retinal Laser', 'Corneal Grafting', 'Glaucoma Shunt Surgery'],
    },
    {
      id: 'spec-uro',
      name: 'Urology & Kidney Care',
      iconName: 'Layers',
      description: 'Laser prostatectomy (HoLEP), kidney stone ureteroscopy (RIRS), and dialysis management.',
      keyProcedures: ['Laser RIRS for Renal Stones', 'HoLEP Prostate Surgery', 'Hemodialysis Unit', 'Laparoscopic Nephrectomy'],
    },
    {
      id: 'spec-gastro',
      name: 'Gastroenterology & GI Surgery',
      iconName: 'Stethoscope',
      description: 'Diagnostic & therapeutic endoscopy, ERCP, colorectal surgeries, and liver disease management.',
      keyProcedures: ['Diagnostic & Therapeutic ERCP', 'Laparoscopic Gallbladder & Hernia', 'Upper GI Endoscopy & Colonoscopy', 'Bariatric Weight Loss Surgery'],
    },
    {
      id: 'spec-ent',
      name: 'ENT & Cochlear Implants',
      iconName: 'Mic',
      description: 'Endoscopic sinus surgery (FESS), tympanoplasty, head & neck surgery, and vertigo treatment.',
      keyProcedures: ['Functional Endoscopic Sinus Surgery', 'Micro-ear Tympanoplasty', 'Cochlear Implant Rehabilitation', 'Thyroidectomy'],
    },
    {
      id: 'spec-paed',
      name: 'Paediatrics & Neonatology',
      iconName: 'Baby',
      description: 'Level-3 NICU/PICU, paediatric cardiology, neonatal surgeries, and growth disorder management.',
      keyProcedures: ['Advanced Neonatal Intensive Care', 'Paediatric Surgery & Urology', 'Congenital Defect Correction', 'Childhood Vaccination'],
    },
    {
      id: 'spec-ivf',
      name: 'IVF & Fertility Care',
      iconName: 'Sparkles',
      description: 'High-success ICSI, blastocyst transfer, egg donation, and advanced male infertility therapies.',
      keyProcedures: ['ICSI / IVF Cycle', 'Blastocyst Culture & Vitrification', 'Pre-implantation Genetic Testing', 'IUI & Hormonal Stimulation'],
    },
    {
      id: 'spec-dental',
      name: 'Dental & Maxillofacial',
      iconName: 'Smile',
      description: 'Full-mouth rehabilitation, dental implants, facial trauma surgery, and orthognathic alignment.',
      keyProcedures: ['All-on-4 Dental Implants', 'Zygomatic Implants', 'Maxillofacial Fracture Plating', 'Cosmetic Veneers'],
    },
    {
      id: 'spec-pulmo',
      name: 'Pulmonology & Chest Medicine',
      iconName: 'Wind',
      description: 'Bronchoscopy, sleep apnea clinic, tuberculosis & interstitial lung disease treatment.',
      keyProcedures: ['Diagnostic Fiberoptic Bronchoscopy', 'Sleep Study (Polysomnography)', 'Allergy & Asthma Management', 'Post-COVID Pulmonary Rehab'],
    },
  ],
  hi: [
    {
      id: 'spec-ortho',
      name: 'हड्डी रोग एवं जोड़ प्रत्यारोपण (Orthopaedics)',
      iconName: 'Activity',
      description: 'रोबोटिक घुटना एवं कूल्हा प्रत्यारोपण, जटिल फ्रैक्चर एवं रीढ़ की हड्डी की सर्जरी।',
      keyProcedures: ['रोबोटिक टोटल नी रिप्लेसमेंट', 'हिप आर्थ्रोप्लास्टी', 'स्पाइन माइक्रो-डिस्केक्टॉमी', 'लिगामेंट सर्जरी'],
    },
    {
      id: 'spec-cardio',
      name: 'हृदय रोग एवं कार्डियक सर्जरी (Cardiology)',
      iconName: 'Heart',
      description: 'कोरोनरी एंजियोप्लास्टी, बाईपास सर्जरी (CABG), और पेसमेकर प्रत्यारोपण।',
      keyProcedures: ['एंजियोप्लास्टी (स्टेंटिंग)', 'बाईपास सर्जरी (CABG)', 'हार्ट वाल्व रिपेयर', 'पेसमेकर इम्प्लांटेशन'],
    },
    {
      id: 'spec-neuro',
      name: 'न्यूरोसर्जरी एवं न्यूरोलॉजी (Brain & Spine)',
      iconName: 'Brain',
      description: 'ब्रेन ट्यूमर सर्जरी, स्ट्रोक उपचार, और रीढ़ की हड्डी के माइक्रो-ऑपरेशन।',
      keyProcedures: ['ब्रेन ट्यूमर रिसेक्शन', 'स्पाइनल फ्यूजन सर्जरी', 'स्ट्रोक केयर यूनिट', 'एंडोस्कोपिक सर्जरी'],
    },
    {
      id: 'spec-onco',
      name: 'कैंसर एवं ऑन्कोलॉजी (Cancer Care)',
      iconName: 'ShieldAlert',
      description: 'सर्जिकल, कीमोथेरेपी और रेडिएशन ऑन्कोलॉजी के साथ समग्र कैंसर उपचार।',
      keyProcedures: ['सर्जिकल ऑन्कोलॉजी', 'टार्गेटेड कीमोथेरेपी', 'रेडिएशन थेरेपी', 'कैंसर स्क्रीनिंग'],
    },
    {
      id: 'spec-ophthal',
      name: 'नेत्र रोग एवं मोतियाबिंद (Ophthalmology)',
      iconName: 'Eye',
      description: 'मोतियाबिंद फेको सर्जरी, रेटिना सर्जरी और कॉर्निया प्रत्यारोपण में मिराज की ऐतिहासिक प्रसिद्धि।',
      keyProcedures: ['लेजर फेको मोतियाबिंद', 'विट्रेक्टॉमी रेटिना सर्जरी', 'कॉर्निया ग्राफ्टिंग', 'ग्लूकोमा उपचार'],
    },
    {
      id: 'spec-uro',
      name: 'मूत्र रोग एवं गुर्दा चिकित्सा (Urology)',
      iconName: 'Layers',
      description: 'लेजर द्वारा पथरी का ऑपरेशन (RIRS), प्रोस्टेट सर्जरी (HoLEP), और डायलिसिस।',
      keyProcedures: ['लेजर किडनी स्टोन सर्जरी', 'प्रोस्टेट सर्जरी', 'डायलिसिस यूनिट', 'लेप्रोस्कोपिक सर्जरी'],
    },
  ],
  mr: [
    {
      id: 'spec-ortho',
      name: 'अस्थिव्यंगोपचार व सांधेरोपण (Orthopaedics)',
      iconName: 'Activity',
      description: 'रोबोटिक गुडघा व मांडीचे सांधेरोपण, मणक्याचे आजार आणि फ्रॅक्चर शस्त्रक्रिया.',
      keyProcedures: ['रोबोटिक टोटल नी रिप्लेसमेंट', 'हिप रिप्लेसमेंट', 'मणक्याची शस्त्रक्रिया', 'लिगामेंट सर्जरी'],
    },
    {
      id: 'spec-cardio',
      name: 'हृदयरोग व हृदयशस्त्रक्रिया (Cardiology)',
      iconName: 'Heart',
      description: 'एंजिओप्लास्टी, बायपास सर्जरी, पेसमेकर आणि हृदयविकार प्रतिबंधक तपासणी.',
      keyProcedures: ['एंजिओप्लास्टी (स्टेंट)', 'बायपास शस्त्रक्रिया (CABG)', 'हार्ट व्हॉल्व्ह शस्त्रक्रिया', 'पेसमेकर'],
    },
    {
      id: 'spec-neuro',
      name: 'न्यूरोसर्जरी व मेंदूतज्ज्ञ (Brain & Spine)',
      iconName: 'Brain',
      description: 'मेंदूच्या गाठी, पॅरालिसिस उपचार आणि पाठीच्या कण्याचे दुर्बिणीद्वारे ऑपरेशन.',
      keyProcedures: ['ब्रेन ट्यूमर सर्जरी', 'स्पाइन शस्त्रक्रिया', 'स्ट्रोक उपचार', 'एंडोस्कोपिक सर्जरी'],
    },
    {
      id: 'spec-onco',
      name: 'कर्करोग उपचार (Cancer Care)',
      iconName: 'ShieldAlert',
      description: 'कॅन्सर शस्त्रक्रिया, किमोथेरपी, रेडिएशन आणि सुसज्ज पॅलिएटिव्ह केअर.',
      keyProcedures: ['कॅन्सर शस्त्रक्रिया', 'किमोथेरपी', 'रेडिएशन थेरपी', 'कॅन्सर तपासणी'],
    },
    {
      id: 'spec-ophthal',
      name: 'नेत्ररोग व मोतीबिंदू (Ophthalmology)',
      iconName: 'Eye',
      description: 'वॉनलेस हॉस्पिटलची शतकोत्तर नेत्रचिकित्सा परंपरा, लेझर मोतीबिंदू व रेटिना उपचार.',
      keyProcedures: ['लेझर मोतीबिंदू शस्त्रक्रिया', 'रेटिना सर्जरी', 'कॉर्निया प्रत्यारोपण', 'काचबिंदू उपचार'],
    },
    {
      id: 'spec-uro',
      name: 'मूत्ररोग व मुतखडा उपचार (Urology)',
      iconName: 'Layers',
      description: 'लेझरने मुतखडा काढणे, प्रोस्टेट शस्त्रक्रिया आणि डायलिसिस सुविधा.',
      keyProcedures: ['लेझर किडनी स्टोन शस्त्रक्रिया', 'प्रोस्टेट शस्त्रक्रिया', 'डायलिसिस केंद्र', 'नेफ्रॉक्टॉमी'],
    },
  ],
  bn: [
    {
      id: 'spec-ortho',
      name: 'অর্থোপেডিকস ও হাঁটু প্রতিস্থাপন (Orthopaedics)',
      iconName: 'Activity',
      description: 'রোবোটিক নি এবং হিপ রিপ্লেসমেন্ট, ফ্র্যাকচার ও স্পাইনাল সার্জারি।',
      keyProcedures: ['রোবোটিক নি রিপ্লেসমেন্ট', 'হিপ রিপ্লেসমেন্ট', 'স্পাইন সার্জারি', 'লিগামেন্ট রিকনস্ট্রাকশন'],
    },
    {
      id: 'spec-cardio',
      name: 'হৃদরোগ ও কার্ডিয়াক সার্জারি (Cardiology)',
      iconName: 'Heart',
      description: 'করোনারি এনজিওপ্লাস্টি, বাইপাস সার্জারি (CABG) এবং হার্ট ফেইলিউর চিকিৎসা।',
      keyProcedures: ['এনজিওপ্লাস্টি (স্টেন্টিং)', 'বাইপাস সার্জারি', 'হার্ট ভালভ প্রতিস্থাপন', 'পেসমেকার'],
    },
    {
      id: 'spec-neuro',
      name: 'নিউরোসার্জারি ও ব্রেন স্পাইন কেয়ার (Neuro)',
      iconName: 'Brain',
      description: 'ব্রেন টিউমার অপসারণ, স্ট্রোক ম্যানেজমেন্ট এবং মিনিম্যালি ইনভেসিভ স্পাইন সার্জারি।',
      keyProcedures: ['ব্রেন টিউমার সার্জারি', 'স্পাইনাল ফিউশন', 'স্ট্রোক ইউনিট', 'এন্ডোস্কোপিক সার্জারি'],
    },
    {
      id: 'spec-onco',
      name: 'ক্যান্সার ও অনকোলজি (Oncology)',
      iconName: 'ShieldAlert',
      description: 'সার্জিক্যাল, কেমোথেরাপি এবং রেডিয়েশন অনকোলজি সমন্বিত আধুনিক ক্যান্সার চিকিৎসা।',
      keyProcedures: ['ক্যান্সার সার্জারি', 'কেমোথেরাপি', 'রেডিয়েশন থেরাপি', 'ক্যান্সার স্ক্রিনিং'],
    },
  ],
  ar: [
    {
      id: 'spec-ortho',
      name: 'جراحة العظام وتبديل المفاصل (Orthopaedics)',
      iconName: 'Activity',
      description: 'استبدال الركبة والورك بالروبوت، جراحة العمود الفقري، وعلاج الكسور المعقدة.',
      keyProcedures: ['استبدال الركبة بالروبوت', 'استبدال مفصل الورك', 'جراحة العمود الفقري المجهرية', 'ترميم الأربطة'],
    },
    {
      id: 'spec-cardio',
      name: 'أمراض وجراحة القلب والأوعية الدموية (Cardiology)',
      iconName: 'Heart',
      description: 'قسطرة الشرايين، جراحة القلب المفتوح وتغيير الشرايين (CABG)، وزراعة الصمامات.',
      keyProcedures: ['القسطرة وتركيب الدعامات', 'جراحة المجازة التاجية (CABG)', 'ترميم واستبدال صمامات القلب', 'زراعة أجهزة تنظيم ضربات القلب'],
    },
    {
      id: 'spec-neuro',
      name: 'جراحة المخ والأعصاب والعمود الفقري (Neurosurgery)',
      iconName: 'Brain',
      description: 'استئصال أورام الدماغ، جراحة العمود الفقري بالمنظار، وعلاج السكتات الدماغية.',
      keyProcedures: ['استئصال أورام الدماغ', 'تثبيت الفقرات بالمنظار', 'وحدة السكتة الدماغية', 'جراحة قاعدة الجمجمة'],
    },
    {
      id: 'spec-onco',
      name: 'علاج الأورام وأمراض السرطان (Oncology)',
      iconName: 'ShieldAlert',
      description: 'علاج الأورام الجراحي والكيماوي والإشعاعي وفق أحدث البروتوكولات الدولية.',
      keyProcedures: ['استئصال الأورام الجراحي', 'العلاج الكيماوي الموجه', 'العلاج الإشعاعي المتطور', 'الفحص الشامل المبكر'],
    },
  ],
};
