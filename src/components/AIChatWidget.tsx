import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
} from 'lucide-react';
import { SupportedLanguage } from '../data/translations';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AIChatWidgetProps {
  currentLang?: SupportedLanguage;
}

// Official Bharat Health Connect Header Logo (Cross + Network Nodes)
export const HeaderLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Healthcare Cross */}
    <path
      d="M13 5C13 4.44772 13.4477 4 14 4H18C18.5523 4 19 4.44772 19 5V13H27C27.5523 13 28 13.4477 28 14V18C28 18.5523 27.5523 19 27 19H19V27C19 27.5523 18.5523 28 18 28H14C13.4477 28 13 27.5523 13 27V19H5C4.44772 19 4 18.5523 4 18V14C4 13.4477 4.44772 13 5 13H13V5Z"
      fill="#FFFFFF"
    />
    {/* 4 Quadrant Connection Network Nodes */}
    <circle cx="7" cy="7" r="2.2" fill="#38BDF8" />
    <circle cx="25" cy="7" r="2.2" fill="#FF9933" />
    <circle cx="7" cy="25" r="2.2" fill="#38BDF8" />
    <circle cx="25" cy="25" r="2.2" fill="#138808" />
    {/* Fine Connecting Lines */}
    <line x1="7" y1="7" x2="13" y2="13" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="25" y1="7" x2="19" y2="13" stroke="#FF9933" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="7" y1="25" x2="13" y2="19" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="25" y1="25" x2="19" y2="19" stroke="#138808" strokeWidth="1" strokeDasharray="1 1" />
  </svg>
);

// Exact Header Logo Box with Geometric Watermark, Navy Border, and Cross
export const HeaderBrandBadge: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dimMap = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10',
  };
  const iconDimMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-7 sm:h-7',
  };

  return (
    <div
      className={`rounded-lg bg-[#0B1E3F] text-white flex items-center justify-center shadow-xs border border-blue-950 relative overflow-hidden shrink-0 ${dimMap[size]} ${className}`}
    >
      {/* Subtle India Geometric Hexagonal/Octagonal Pattern Watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.8" />
        <line x1="24" y1="2" x2="24" y2="46" stroke="currentColor" strokeWidth="0.5" />
        <line x1="2" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="0.5" />
        <line x1="8" y1="8" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" />
        <line x1="8" y1="40" x2="40" y2="8" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {/* Central Healthcare Symbol + 4 Connected Network Nodes */}
      <svg
        className={`relative z-10 transition-transform ${iconDimMap[size]}`}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 5C13 4.44772 13.4477 4 14 4H18C18.5523 4 19 4.44772 19 5V13H27C27.5523 13 28 13.4477 28 14V18C28 18.5523 27.5523 19 27 19H19V27C19 27.5523 18.5523 28 18 28H14C13.4477 28 13 27.5523 13 27V19H5C4.44772 19 4 18.5523 4 18V14C4 13.4477 4.44772 13 5 13H13V5Z"
          fill="#FFFFFF"
        />
        <circle cx="7" cy="7" r="2.2" fill="#38BDF8" />
        <circle cx="25" cy="7" r="2.2" fill="#FF9933" />
        <circle cx="7" cy="25" r="2.2" fill="#38BDF8" />
        <circle cx="25" cy="25" r="2.2" fill="#138808" />
        <line x1="7" y1="7" x2="13" y2="13" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
        <line x1="25" y1="7" x2="19" y2="13" stroke="#FF9933" strokeWidth="1" strokeDasharray="1 1" />
        <line x1="7" y1="25" x2="13" y2="19" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 1" />
        <line x1="25" y1="25" x2="19" y2="19" stroke="#138808" strokeWidth="1" strokeDasharray="1 1" />
      </svg>
    </div>
  );
};

const CHAT_LOCALES: Record<
  SupportedLanguage,
  {
    launcherTitle: string;
    launcherSub: string;
    headerTitle: string;
    headerSub: string;
    bannerText: string;
    quickTitle: string;
    placeholder: string;
    footerDb: string;
    footerTag: string;
    typingText: string;
    welcomeText: string;
    presetQuestions: string[];
    fallbackReply: string;
  }
> = {
  mr: {
    launcherTitle: 'AI आरोग्य सहाय्यक',
    launcherSub: 'आरोग्य सहाय्यक',
    headerTitle: 'AI आरोग्य सहाय्यक',
    headerSub: 'भारत हेल्थ कनेक्ट • मिरज हॉस्पिटल नेटवर्क',
    bannerText: 'केवळ अधिकृत हॉस्पिटल्स • शून्य-किंमत धोरण (No Cost Figures Given)',
    quickTitle: 'वारंवार विचारले जाणारे प्रश्न (Quick Questions):',
    placeholder: 'येथे तुमचा प्रश्न लिहा (उदा. हार्ट उपचारासाठी हॉस्पिटल...)...',
    footerDb: 'मिरज-सांगली अधिकृत नेटवर्क हॉस्पिटल डेटाबेस',
    footerTag: '२४/७ AI आरोग्य सहाय्यक',
    typingText: 'माहिती तपासत आहे...',
    welcomeText:
      '**नमस्कार! मी भारत हेल्थ कनेक्टचा अधिकृत AI आरोग्य सहाय्यक आहे.** 🏥\n\n' +
      'मी तुम्हाला मिरजमधील आमच्या अधिकृत पार्टनर हॉस्पिटल्स (उदा. Wanless, Sevasadan Lifeline, Synergy, Samarth Neuro, Siddhivinayak Cancer इ.), स्पेशालिटी डॉक्टर्स, मेडिकल व्हिसा आणि प्रवासाचे अचूक मार्गदर्शन करू शकतो.\n\n' +
      '*(टीप: प्रत्येक रुग्णाची स्थिती आणि हॉस्पिटलचे पॅकेज वेगवेगळे असल्याने, उपचारांचा अधिकृत खर्च थेट डॉक्टरांच्या तपासणीनंतर आमचे पेशंट कोऑर्डिनेटर देतात.)*',
    presetQuestions: [
      'हार्ट (Cardiology) साठी कोणते हॉस्पिटल उत्तम आहे?',
      'गुडघेदुखी / जॉइंट रिप्लेसमेंटसाठी हॉस्पिटल?',
      'ब्रेन व स्पाइन (मणका) उपचारांची सोय कुठे आहे?',
      'कॅन्सर उपचारांसाठी (Oncology) केंद्र कोणते?',
      'परदेशी रुग्णांसाठी मेडिकल व्हिसा कसा मिळतो?',
      'विमानतळावरून मिरजला कसे पोहोचायचे?',
    ],
    fallbackReply:
      'तुमच्या विनंतीवर मार्गदर्शन करण्यासाठी आमचे पेशंट कोऑर्डिनेटर उपलब्ध आहेत. अचूक हॉस्पिटल शिफारशीसाठी तुम्ही पेशंट पोर्टलवर लॉगिन करू शकता किंवा आमच्या हेल्पलाइनवर संपर्क साधू शकता.',
  },
  en: {
    launcherTitle: 'AI Health Assistant',
    launcherSub: 'Health Assistant',
    headerTitle: 'AI Health Assistant',
    headerSub: 'Bharat Health Connect • Miraj Hospital Network',
    bannerText: 'Accredited Hospitals Only • Zero-Pricing Policy (No Cost Figures Given)',
    quickTitle: 'Frequently Asked Questions (Quick Questions):',
    placeholder: 'Type your healthcare query here (e.g. Hospital for heart care)...',
    footerDb: 'Miraj-Sangli Accredited Network Hospital Database',
    footerTag: '24/7 AI Health Assistant',
    typingText: 'Checking healthcare network...',
    welcomeText:
      '**Hello! I am the official AI Health Assistant for Bharat Health Connect.** 🏥\n\n' +
      'I can guide you to our accredited network hospitals in Miraj (including Wanless Hospital, Sevasadan Lifeline, Synergy, Samarth Neuro, and Siddhivinayak Cancer Hospital), expert medical specialists, Medical Visa (MED-1) procedures, and travel logistics.\n\n' +
      '*(Note: Treatment costs vary across hospitals and are provided by coordinators only upon doctor clinical review.)*',
    presetQuestions: [
      'Which hospital is best for Cardiology / Heart care?',
      'Hospital for Knee & Joint Replacement?',
      'Where are Brain & Spine surgery facilities?',
      'Which center handles Cancer treatment (Oncology)?',
      'How do international patients get a Medical Visa?',
      'How to travel to Miraj from international airports?',
    ],
    fallbackReply:
      'Our medical coordinators are available to assist with your case. You can login to the Patient Portal or submit an enquiry through our desk.',
  },
  hi: {
    launcherTitle: 'AI स्वास्थ्य सहायक',
    launcherSub: 'स्वास्थ्य सहायक',
    headerTitle: 'AI स्वास्थ्य सहायक',
    headerSub: 'भारत हेल्थ कनेक्ट • मिरज अस्पताल नेटवर्क',
    bannerText: 'केवल अधिकृत अस्पताल • शून्य-लागत नीति (No Cost Figures Given)',
    quickTitle: 'अक्सर पूछे जाने वाले प्रश्न (Quick Questions):',
    placeholder: 'यहाँ अपना प्रश्न लिखें (उदा. हृदय उपचार के लिए अस्पताल...)...',
    footerDb: 'मिरज-सांगली अधिकृत अस्पताल नेटवर्क डेटाबेस',
    footerTag: '24/7 AI स्वास्थ्य सहायक',
    typingText: 'जानकारी जाँची जा रही है...',
    welcomeText:
      '**नमस्ते! मैं भारत हेल्थ कनेक्ट का आधिकारिक AI स्वास्थ्य सहायक हूँ।** 🏥\n\n' +
      'मैं आपको मिरज के हमारे अधिकृत नेटवर्क अस्पतालों (जैसे Wanless, Sevasadan Lifeline, Synergy, Samarth Neuro, Siddhivinayak Cancer आदि), विशेषज्ञ डॉक्टरों, मेडिकल वीज़ा और यात्रा संबंधी सटीक मार्गदर्शन दे सकता हूँ।\n\n' +
      '*(सूचना: विभिन्न अस्पतालों के पैकेज भिन्न होते हैं। आधिकारिक लागत अनुमान डॉक्टरों द्वारा रिपोर्ट समीक्षा के बाद ही कोऑर्डिनेटर प्रदान करते हैं।)*',
    presetQuestions: [
      'हृदय रोग (Cardiology) के लिए कौन सा अस्पताल उत्तम है?',
      'घुटने के दर्द / जॉइंट रिप्लेसमेंट के लिए अस्पताल?',
      'ब्रेन व स्पाइन (रीढ़) सर्जरी की सुविधा कहाँ है?',
      'कैंसर उपचार (Oncology) के लिए प्रमुख केंद्र?',
      'विदेशी मरीजों के लिए मेडिकल वीज़ा कैसे मिलता है?',
      'हवाई अड्डे से मिरज कैसे पहुँचें?',
    ],
    fallbackReply:
      'आपके अनुरोध पर मार्गदर्शन के लिए हमारे पेशेंट कोऑर्डिनेटर उपलब्ध हैं। सटीक अस्पताल सिफारिश के लिए आप पेशेंट पोर्टल पर लॉगिन कर सकते हैं।',
  },
  bn: {
    launcherTitle: 'AI স্বাস্থ্য সহায়ক',
    launcherSub: 'স্বাস্থ্য সহায়ক',
    headerTitle: 'AI স্বাস্থ্য সহায়ক',
    headerSub: 'ভারত হেলথ কানেক্ট • মিরাজ হাসপাতাল নেটওয়ার্ক',
    bannerText: 'কেবল অনুমোদিত হাসপাতাল • শূন্য-খরচ নীতি (No Cost Figures Given)',
    quickTitle: 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (Quick Questions):',
    placeholder: 'এখানে আপনার প্রশ্ন লিখুন (যেমন হার্ট চিকিৎসার জন্য হাসপাতাল...)...',
    footerDb: 'মিরাজ-সাংলী অনুমোদিত হাসপাতাল নেটওয়ার্ক ডাটাবেস',
    footerTag: '২৪/৭ AI স্বাস্থ্য সহায়ক',
    typingText: 'তথ্য যাচাই করা হচ্ছে...',
    welcomeText:
      '**নমস্কার! আমি ভারত হেলথ কানেক্ট-এর অফিসিয়াল AI স্বাস্থ্য সহায়ক।** 🏥\n\n' +
      'আমি আপনাকে মিরাজের অনুমোদিত নেটওয়ার্ক হাসপাতালসমূহ (যেমন Wanless, Sevasadan Lifeline, Synergy, Samarth Neuro, Siddhivinayak Cancer ইত্যাদি), বিশেষজ্ঞ ডাক্তার, মেডিকেল ভিসা এবং ভ্রমণ সংক্রান্ত সঠিক তথ্য দিতে পারি।\n\n' +
      '*(দ্রষ্টব্য: বিভিন্ন হাসপাতালের প্যাকেজ ভিন্ন হয়। ডাক্তারদের পর্যালোচনার পরেই কোঅর্ডিনেটররা অফিশিয়াল খরচ অনুমান প্রদান করেন।)*',
    presetQuestions: [
      'হার্ট (Cardiology) চিকিৎসার জন্য সেরা হাসপাতাল কোনটি?',
      'হাঁটু প্রতিস্থাপন / জয়েন্ট রিপ্লেসমেন্ট হাসপাতাল?',
      'মস্তিষ্ক ও স্পাইন (মেরুদণ্ড) সার্জারির সুবিধা কোথায়?',
      'ক্যান্সার চিকিৎসার (Oncology) প্রধান কেন্দ্র কোনটি?',
      'বিদেশী রোগীদের জন্য মেডিকেল ভিসা কীভাবে পাবেন?',
      'বিমানবন্দর থেকে মিরাজে কীভাবে পৌঁছাবেন?',
    ],
    fallbackReply:
      'আপনার চিকিৎসার বিষয়ে সহায়তা করার জন্য আমাদের কোঅর্ডিনেটররা প্রস্তুত রয়েছেন। আপনি পেশেন্ট পোর্টালে লগইন করতে পারেন।',
  },
  ar: {
    launcherTitle: 'مساعد الرعاية الصحية',
    launcherSub: 'استشارات طبية',
    headerTitle: 'مساعد الرعاية الصحية الذكي',
    headerSub: 'بهارات هيلथ كونكت • شبكة مستشفيات ميراج',
    bannerText: 'مستشفيات معتمدة فقط • سياسة حظر الأسعار المباشرة (No Cost Figures Given)',
    quickTitle: 'الأسئلة الشائعة (Quick Questions):',
    placeholder: 'اكتب استفسارك هنا (مثال: أفضل مستشفى لعلاج القلب)...',
    footerDb: 'قاعدة بيانات مستشفيات شبكة ميراج وسانغلي المعتمدة',
    footerTag: 'مساعد ذكي على مدار الساعة',
    typingText: 'جارٍ البحث في الشبكة الطبية...',
    welcomeText:
      '**مرحباً بك! أنا المساعد الذكي الرسمي لشبكة بهارات هيلث كونكت.** 🏥\n\n' +
      'يمكنني إرشادك إلى شبكة مستشفياتنا المعتمدة في مجمع ميراج الطبي (مثل مستشفى وانلس، سيفاسادان لايف لاين، سينيرجي، وسامارث للأعصاب وسيدهيفيناياك للأورام)، وأطباء الاختصاص، وإجراءات التأشيرة الطبية وخدمات الاستقبال.\n\n' +
      '*(ملاحظة: تختلف تكاليف العلاج باختلاف الحالة والمستشفى المختار. يتم تقديم عروض التكاليف الرسمية حصرياً عبر المنسقين الطبيين بعد فحص التقارير الطبية).*',
    presetQuestions: [
      'ما هو أفضل مستشفى لعلاج وجراحة القلب؟',
      'أفضل مستشفى لتبديل المفاصل والركبة؟',
      'أين تتوفر جراحة المخ والعمود الفقري؟',
      'ما هو المركز المعتمد لعلاج الأورام والسرطان؟',
      'كيف يحصل المرضى الدوليون على التأشيرة الطبية؟',
      'كيفية الوصول إلى ميراج من المطارات الدولية؟',
    ],
    fallbackReply:
      'منسقونا الطبيون متواجدون لمساعدتك. يمكنك تسجيل الدخول إلى بوابة المرضى أو التواصل عبر مكتب المساعدة.',
  },
};

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ currentLang = 'mr' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const activeLocale = CHAT_LOCALES[currentLang] || CHAT_LOCALES.mr;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: activeLocale.welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // When currentLang changes from the language picker, update initial message if user hasn't chatted yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: `msg-welcome-${currentLang}`,
            sender: 'assistant',
            text: activeLocale.welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [currentLang, activeLocale.welcomeText]);

  // Global event listener to open AI Chat from any button
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setHasUnread(false);
    };
    window.addEventListener('open-ai-chat', handleOpen);
    return () => window.removeEventListener('open-ai-chat', handleOpen);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Client-side Immediate Zero-Pricing Guardrail (Strict Compliance)
    const lower = text.toLowerCase();
    const isPriceQuery =
      lower.includes('cost') ||
      lower.includes('price') ||
      lower.includes('charge') ||
      lower.includes('fee') ||
      lower.includes('rate') ||
      lower.includes('package') ||
      lower.includes('bill') ||
      lower.includes('खर्च') ||
      lower.includes('पैसे') ||
      lower.includes('दर') ||
      lower.includes('रुपये') ||
      lower.includes('किंमत') ||
      lower.includes('लागत') ||
      lower.includes('फीस') ||
      lower.includes('किती') ||
      lower.includes('দাম') ||
      lower.includes('টাকা') ||
      lower.includes('سعر') ||
      lower.includes('تكلفة') ||
      lower.includes('kiti') ||
      lower.includes('kharch');

    if (isPriceQuery) {
      const NO_PRICE_MESSAGES: Record<string, string> = {
        mr: 'उपचारांचा अचूक खर्च हा रुग्णाचे वैद्यकीय अहवाल, शारीरिक तपासणी आणि निवडलेल्या हॉस्पिटलच्या पॅकेजवर अवलंबून असतो. वेगवेगळ्या हॉस्पिटल्सचे दर वेगवेगळे असल्याने, कोणतीही चुकीची माहिती जाऊ नये म्हणून आमचे अधिकृत पेशंट कोऑर्डिनेटर तुमच्या अहवालांची डॉक्टरांकडून तपासणी करूनच तुम्हाला अधिकृत "Treatment Estimate" देतात.\n\nकृपया तुमचे वैद्यकीय अहवाल पेशंट पोर्टलवर अपलोड करा किंवा अधिकृत पेशंट कोऑर्डिनेटरशी संपर्क साधा.',
        hi: 'उपचार की सटीक लागत मरीज की मेडिकल रिपोर्ट, शारीरिक परीक्षण और चुने गए अस्पताल के पैकेज पर निर्भर करती है। अलग-अलग अस्पतालों की दरें अलग-अलग होने के कारण, हमारे अधिकृत पेशेंट कोऑर्डिनेटर डॉक्टरों द्वारा आपकी रिपोर्ट की समीक्षा के बाद ही आधिकारिक "Treatment Estimate" प्रदान करते हैं।\n\nकृपया अपनी मेडिकल रिपोर्ट पेशेंट पोर्टल पर अपलोड करें या अधिकृत कोऑर्डिनेटर से संपर्क करें।',
        en: "Exact medical treatment costs depend on the patient's clinical condition, physical assessment, and the specific hospital room/package chosen. Because rates vary across different accredited hospitals, our official patient coordinators provide written Treatment Estimates only after clinical doctor review of your medical reports.\n\nKindly upload your diagnostic reports through the Patient Portal or contact our coordinator desk.",
        bn: 'চিকিৎসার সঠিক খরচ রোগীর ক্লিনিকাল রিপোর্ট, শারীরিক পরীক্ষা এবং নির্বাচিত হাসপাতালের প্যাকেজের ওপর নির্ভর করে। বিভিন্ন হাসপাতালের রেট আলাদা হওয়ায়, ডাক্তারদের রিপোর্ট পর্যালোচনার পরেই অফিশিয়াল কোঅর্ডিনেটররা লিখিত "Treatment Estimate" প্রদান করেন।\n\nঅনুগ্রহ করে পেশেন্ট পোর্টালে আপনার রিপোর্ট আপলোড করুন অথবা কোঅর্ডিনেটরের সাথে যোগাযোগ করুন।',
        ar: 'تعتمد التكلفة الدقيقة للعلاج على التقارير الطبية للمريض، والفحص السريري، وباقة المستشفى المختارة. ونظراً لاختلاف الأسعار بين المستشفيات المعتمدة، فإن منسقينا الطبيين المعتمدين يقدمون عروض التكاليف الرسمية فقط بعد فحص الأطباء الاستشاريين لتقاريركم الطبية.\n\nيرجى رفع تقاريركم الطبية عبر بوابة المريض أو التواصل مع مكتب المنسق الطبي.',
      };

      setTimeout(() => {
        const noPriceMsg: ChatMessage = {
          id: `bot-guard-${Date.now()}`,
          sender: 'assistant',
          text: NO_PRICE_MESSAGES[currentLang] || NO_PRICE_MESSAGES.mr,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, noPriceMsg]);
        setIsLoading(false);
      }, 350);
      return;
    }

    try {
      // Prepare history for server
      const history = messages.slice(-5).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          language: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || activeLocale.fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API failed');
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: activeLocale.fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'assistant',
        text: activeLocale.welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const isRtl = currentLang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div
          className={`fixed bottom-5 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
            isRtl ? 'left-5' : 'right-5'
          }`}
        >
          <button
            onClick={() => setIsOpen(true)}
            aria-label={activeLocale.launcherTitle}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0B1E3F] hover:bg-blue-900 active:scale-95 text-white rounded-full shadow-2xl hover:shadow-cyan-900/40 border border-teal-500/40 transition-all cursor-pointer"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500"></span>
            </span>

            <div className="flex items-center gap-2.5">
              <HeaderBrandBadge size="md" className="group-hover:scale-105 transition-transform" />
              <div className="text-left leading-tight hidden xs:block">
                <span className="block text-xs font-bold tracking-tight">
                  {activeLocale.launcherTitle}
                </span>
                <span className="block text-[10px] text-teal-300 font-medium">
                  {activeLocale.launcherSub}
                </span>
              </div>
            </div>

            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </button>
        </div>
      )}

      {/* Chat Dialog Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 sm:bottom-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[85vh] h-[620px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200 ${
            isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
          }`}
        >
          {/* Header */}
          <div className="bg-[#0B1E3F] text-white p-4 shrink-0 flex items-center justify-between border-b border-blue-950">
            <div className="flex items-center gap-3 min-w-0">
              <HeaderBrandBadge size="lg" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white truncate">
                    {activeLocale.headerTitle}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-teal-300 truncate">
                  {activeLocale.headerSub}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Reset chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <HeaderBrandBadge size="sm" className="mt-0.5" />
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0B1E3F] text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line text-xs">
                    {msg.text.split('\n').map((line, idx) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <p key={idx} className="font-bold text-slate-900 my-1">
                            {line.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <p key={idx} className="my-0.5">
                            {parts.map((p, i) =>
                              i % 2 === 1 ? (
                                <strong key={i} className="font-bold text-slate-900">
                                  {p}
                                </strong>
                              ) : (
                                p
                              )
                            )}
                          </p>
                        );
                      }
                      return <p key={idx} className="my-0.5">{line}</p>;
                    })}
                  </div>
                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-200" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-500 text-xs">
                <HeaderBrandBadge size="sm" />
                <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
                  <span className="text-[11px] text-slate-500 ml-1">
                    {activeLocale.typingText}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-200 shrink-0">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>{activeLocale.quickTitle}</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {activeLocale.presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="shrink-0 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-300 px-2.5 py-1 rounded-full text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={activeLocale.placeholder}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 bg-[#0B1E3F] hover:bg-blue-900 text-white rounded-xl shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
              >
                <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>{activeLocale.footerDb}</span>
              <span className="text-teal-700 font-semibold">{activeLocale.footerTag}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
