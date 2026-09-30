import { SupportedLanguage } from './translations';

export interface WhyMirajCard {
  badge: string;
  title: string;
  description: string;
}

export const whyMirajCards: Record<SupportedLanguage, WhyMirajCard[]> = {
  en: [
    {
      badge: '130+ Years Medical Heritage',
      title: 'Pioneering Healthcare Legacy Since 1894',
      description: 'Home to the historic Wanless Hospital founded in 1894, Miraj has served as Western India’s premier medical crossroads for over a century, blending deep clinical acumen with compassionate patient care.',
    },
    {
      badge: 'Specialist Density',
      title: 'World-Class Clinical Specialists & Surgeons',
      description: 'Over 400+ board-certified surgeons and specialists trained in top institutions across India and abroad in robotic orthopaedics, cardiac interventions, neurosurgery, and oncology.',
    },
    {
      badge: '70% Cost Advantage',
      title: 'Transparent, Ethical Healthcare Without Inflation',
      description: 'Tier-2 regional efficiency means world-standard surgical care at a fraction of metro city costs—with zero markups, clear breakdown estimates, and no commercial broker commissions.',
    },
    {
      badge: 'Integrated Network',
      title: 'Advanced Superspeciality Hospital Network',
      description: 'High-volume tertiary centers featuring state-of-the-art modular operating theatres, NABH-accredited facilities, 128-slice CT, 3T MRI, modern cath labs, and intensive care units.',
    },
    {
      badge: 'Easy Transit Hub',
      title: 'Seamless Regional & International Connectivity',
      description: 'Miraj Junction is an A-grade railway junction with direct express trains to Mumbai, Pune, Bengaluru, and Goa. Close proximity to Kolhapur, Belagavi, and Pune international airports.',
    },
    {
      badge: 'Dedicated Concierge',
      title: '1-on-1 Patient Coordinator Support',
      description: 'From initial opinion and visa invitation letters to private hospital transport, vernacular language translators, and post-discharge follow-ups, our patient coordinators are with you 24/7.',
    },
  ],
  hi: [
    {
      badge: '130+ वर्षों की चिकित्सा विरासत',
      title: '1894 से प्रतिष्ठित स्वास्थ्य सेवा का केंद्र',
      description: '1894 में स्थापित ऐतिहासिक वानलेस अस्पताल की भूमि, मिराज एक सदी से अधिक समय से पश्चिमी भारत का प्रमुख चिकित्सा केंद्र रहा है, जो उच्च नैदानिक विशेषज्ञता और सेवा भाव का संगम है।',
    },
    {
      badge: 'विशेषज्ञ डॉक्टरों का सघन नेटवर्क',
      title: 'विश्वस्तरीय विशेषज्ञ सर्जन व चिकित्सक',
      description: 'रोबोटिक आर्थोपेडिक्स, हृदय रोग, न्यूरोसर्जरी और ऑन्कोलॉजी में भारत और विदेश के शीर्ष संस्थानों से प्रशिक्षित 400 से अधिक अनुभवी विशेषज्ञ चिकित्सक।',
    },
    {
      badge: '70% तक की लागत बचत',
      title: 'पारदर्शी एवं नैतिक चिकित्सा उपचार',
      description: 'महानगरों की तुलना में 70% तक कम खर्च में आधुनिकतम सर्जरी। बिना किसी दलाली, प्रत्यक्ष अस्पताल दरों और पारदर्शी बिलिंग का आश्वासन।',
    },
    {
      badge: 'सुपरस्पेशलिटी इन्फ्रास्ट्रक्चर',
      title: 'अत्याधुनिक मल्टीस्पेशलिटी अस्पताल',
      description: 'NABH मान्यता प्राप्त अस्पताल, आधुनिक मॉड्यूलर ऑपरेशन थिएटर, 3T MRI, 128-स्लाइस CT स्कैन, अत्याधुनिक कैथ लैब और आधुनिक ICU सुविधाएं।',
    },
    {
      badge: 'सुगम आवागमन केंद्र',
      title: 'सुलभ रेल व हवाई कनेक्टिविटी',
      description: 'मिराज जंक्शन एक प्रमुख रेलवे हब है जहां से मुंबई, पुणे, बेंगलुरु और गोवा के लिए सीधी ट्रेनें उपलब्ध हैं। कोल्हापुर, बेलगावी और पुणे एयरपोर्ट से सुगम पहुंच।',
    },
    {
      badge: 'समर्पित पेशेंट कोऑर्डिनेटर',
      title: '24/7 व्यक्तिगत सहायता एवं मार्गदर्शन',
      description: 'मेडिकल वीज़ा पत्र, एयरपोर्ट पिकअप, स्थानीय भाषा अनुवादक से लेकर डिस्चार्ज के बाद फॉलो-अप तक—हमारी समर्पित टीम हर कदम पर आपके साथ है।',
    },
  ],
  mr: [
    {
      badge: '१३०+ वर्षांची वैद्यकीय परंपरा',
      title: '१८९४ पासून पश्चिम महाराष्ट्राची वैद्यकीय पंढरी',
      description: '१८९४ मध्ये स्थापन झालेल्या ऐतिहासिक वॉनलेस हॉस्पिटलमुळे मिरज-सांगली हे वैद्यकीय क्षेत्रातील अग्रगण्य केंद्र म्हणून देश-विदेशात ओळखले जाते.',
    },
    {
      badge: 'तज्ज्ञ डॉक्टरांची उपलब्धता',
      title: 'अनुभवी व उच्चविद्याविभूषित तज्ज्ञ डॉक्टर्स',
      description: 'सांधेरोपण, हृदयरोग, न्यूरोसर्जरी, कर्करोग व दुर्बिणीद्वारे शस्त्रक्रियांमध्ये आंतरराष्ट्रीय अनुभव असलेले ४०० हून अधिक निष्णात शल्यचिकित्सक.',
    },
    {
      badge: 'परवडणारे व पारदर्शक उपचार',
      title: 'मोठ्या शहरांपेक्षा ७०% पर्यंत कमी खर्च',
      description: 'मुंबई, पुणे, बंगळुरूच्या तुलनेत अत्यंत माफक दरात जागतिक दर्जाचे उपचार. कोणतीही मध्यस्थी किंवा छुपा खर्च नाही.',
    },
    {
      badge: 'आधुनिक हॉस्पिटल नेटवर्क',
      title: 'NABH मान्यताप्राप्त सुसज्ज सुपरस्पेशालिटी हॉस्पिटल्स',
      description: 'अत्याधुनिक मॉड्यूलर ऑपरेशन थिएटर्स, ३T MRI, कॅथलॅब, सुसज्ज अतिदक्षता विभाग (ICU) आणि २४ तास आपत्कालीन सेवा.',
    },
    {
      badge: 'उत्कृष्ट दळणवळण सोय',
      title: 'रेल्वे आणि विमानतळाशी थेट जोडणी',
      description: 'मिरज हे देशातील महत्त्वाचे रेल्वे जंक्शन असून कोल्हापूर, बेळगाव आणि पुणे विमानतळांशी उत्तम रस्ते व रेल्वे जोडणी उपलब्ध आहे.',
    },
    {
      badge: 'वैयक्तिक रुग्ण समन्वयक',
      title: 'प्रत्येक टप्प्यावर २४/७ मदत व मार्गदर्शन',
      description: 'मेडिकल व्हिसा, मोफत सल्ला, हॉस्पिटलायझेशन, स्थानिक भाषांतरकार आणि उपचारांनंतर पाठपुरावा यासाठी समर्पित टीम कार्यरत.',
    },
  ],
  bn: [
    {
      badge: '১৩০+ বছরের চিকিৎসা ঐতিহ্য',
      title: '১৮৯৪ সাল থেকে ভারতের নির্ভরযোগ্য স্বাস্থ্যসেবা কেন্দ্র',
      description: 'ঐতিহাসিক ওয়ানলেস হাসপাতালের গৌরবময় পথচলা থেকে শুরু করে মিরাজ-সাংলি আজ ভারতের অন্যতম শীর্ষস্থানীয় এবং সাশ্রয়ী চিকিৎসা কেন্দ্র।',
    },
    {
      badge: 'শীর্ষস্থানীয় বিশেষজ্ঞ চিকিৎসক',
      title: 'অভিজ্ঞ সার্জন এবং বিশ্বমানের চিকিৎসা সেবা',
      description: 'হৃদরোগ, হাঁটু ও নিতম্ব প্রতিস্থাপন, নিউরোসার্জারি এবং অনকোলজিতে বিশেষ দক্ষতাসম্পন্ন ৪০০ জনেরও বেশি অভিজ্ঞ বিশেষজ্ঞ ডাক্তার।',
    },
    {
      badge: '৭০% পর্যন্ত খরচ সাশ্রয়',
      title: 'স্বচ্ছ এবং মধ্যস্থতাকারী-মুক্ত সাশ্রয়ী চিকিৎসা',
      description: 'মেট্রো শহরের তুলনায় অত্যন্ত কম খরচে আন্তর্জাতিক মানের চিকিৎসা। সরাসরি হাসপাতাল বিলিং এবং শতভাগ নৈতিক চিকিৎসাসেবা।',
    },
    {
      badge: 'আধুনিক হাসপাতাল নেটওয়ার্ক',
      title: 'NABH স্বীকৃত আধুনিক টারশিয়ারি হাসপাতাল',
      description: 'মডার্ন অপারেশন থিয়েটার, 3T MRI, উন্নত ক্যাথ ল্যাব এবং আন্তর্জাতিক রোগীদের জন্য বিশেষ কেবিনের সুবিধা।',
    },
    {
      badge: 'সহজ যাতায়াত ব্যবস্থা',
      title: 'রেল ও বিমানপথের মাধ্যমে সহজ যোগাযোগ',
      description: 'মিরাজ জংশনে মুম্বাই, পুনে এবং ব্যাঙ্গালোর থেকে সরাসরি ট্রেন সুবিধা রয়েছে। নিকটবর্তী কোলহাপুর, বেলগাম ও পুনে বিমানবন্দর।',
    },
    {
      badge: 'ডেডিকেটেড পেশেন্ট সাপোর্ট',
      title: '২৪/৭ আন্তর্জাতিক সমন্বয়কারী এবং বাংলা দোভাষী',
      description: 'মেডিকেল ভিসা আমন্ত্রণ পত্র, বিমানবন্দর থেকে রিসিভ, বাংলায় কথা বলার সহায়তা এবং সম্পূর্ণ চিকিৎসা প্রক্রিয়ায় সার্বক্ষণিক সঙ্গ।',
    },
  ],
  ar: [
    {
      badge: 'أكثر من 130 عاماً من الريادة الطبية',
      title: 'إرث طبي عريق في الرعاية الصحية منذ 1894',
      description: 'تعتبر ميراج عاصمة للرعاية الصحية في غرب الهند بفضل مستشفى وانليس التاريخي، وتجمع بين الكفاءة السريرية والخبرة الممتدة لأجيال.',
    },
    {
      badge: 'نخبة من كبار الجراحين والاستشاريين',
      title: 'أطباء معتمدون دولياً في أدق التخصصات',
      description: 'أكثر من 400 جراح واستشاري ذوي خبرة عالية في جراحة العظام الروبوتية، القسطرة القلبية، جراحة المخ والأعصاب، وعلاج الأورام.',
    },
    {
      badge: 'توفير يصل إلى 70%',
      title: 'تكاليف علاجية عادلة وشفافة بدون وسطاء',
      description: 'جودة علاجية بمعايير عالمية بتكلفة أقل بنسبة تصل إلى 70% مقارنة بالمدن الكبرى أو الدول الغربية، مع فواتير واضحة ودقيقة.',
    },
    {
      badge: 'مستشفيات فائقة التخصص',
      title: 'مرافق معتمدة مزودة بأحدث التقنيات الطبية',
      description: 'مستشفيات معتمدة من NABH، غرف عمليات متطورة، رنين مغناطيسي 3T، قسطرة قلبية رقمية، وأجنحة خاصة للمرضى الدوليين.',
    },
    {
      badge: 'سهولة الوصول والتنقل',
      title: 'شبكة نقل مريحة بالقطارات والمطارات',
      description: 'محطة قطارات ميراج المركزية تربطها مباشرة بمومباي وبيون وبنغالور وغوا، مع سهولة الوصول عبر مطارات كولهابور وبيلاغافي.',
    },
    {
      badge: 'منسق شخصي مخصص 24/7',
      title: 'خدمات متكاملة للمرضى الدوليين والمترجمين',
      description: 'تنسيق التأشيرة الطبية، الاستقبال من المطار، توفير مترجم للغة العربية، ومتابعة طبية دقيقة ومستمرة حتى العودة إلى الوطن.',
    },
  ],
};
