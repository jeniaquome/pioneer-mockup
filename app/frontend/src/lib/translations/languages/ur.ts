/**
 * Urdu (ur) translations
 * 
 * Professional translations with formal, polite address (Urdu from Pakistan)
 * Proper RTL text support (Nastaliq script)
 * Cultural appropriateness
 * 
 * Language: Urdu (ur-PK)
 * Locale: Pakistan
 */

import type { TranslationStructure } from '../types'

export const urduTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'ہوم',
    dashboard: 'ڈیش بورڈ',
    adminDashboard: 'ایڈمن ڈیش بورڈ',
    welcome: 'خوش آمدید',
    resources: 'وسائل',
    bookmarks: 'بک مارکس',
    about: 'کے بارے میں',
    myChecklist: 'چیک لسٹ',
    signIn: 'لاگ ان',
    signUp: 'سائن اپ',
    accountSettings: 'پروفائل کی ترتیبات',
    signOut: 'لاگ آؤٹ',
    settings: 'ترتیبات',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'پٹسبرگ ٹومارو پائنیر میں خوش آمدید',
    heroWelcomeTo: 'خوش آمدید',
    heroPioneer: 'پٹسبرگ ٹومارو پائنیر',
    heroDescription: 'پٹسبرگ میں نئی زندگی شروع کرنے کے لیے آپ کی ذاتی رہنما — مفت، نجی، کثیراللسانی',
    heroExtendedDescription: 'پٹسبرگ منتقل ہو رہے ہیں؟ درجنوں سائٹس پر گھنٹوں تلاش کرنے یا بار بار ایک ہی سوالات پوچھنے میں وقت ضائع نہ کریں۔ پٹسبرگ ٹومارو پائنیر ہر اس وسائل کی آپ کی ذاتی، مفت رہنما ہے جو نئے آنے والوں کو تیزی اور اعتماد کے ساتھ آباد ہونے میں مدد کرتی ہے — رہائش اور اسکولوں سے لے کر زبان، مذہب اور معاشرتی زندگی تک۔ یہ پٹسبرگ میں آپ کے نئے باب کو شروع کرنے کا سب سے مکمل، وقت بچانے والا اور خوش آمدید کا طریقہ ہے۔',
    howCanWeHelp: 'آج ہم آپ کی کس طرح مدد کر سکتے ہیں؟',
    howCanWeHelpSubtitle: 'ذاتی سفارشات حاصل کرنے کے لیے اپنا راستہ منتخب کریں',
    createRoadmapTitle: 'اپنا روڈ میپ بنائیں',
    createRoadmapDescription: 'اپنی مخصوص ضروریات اور اہداف کے مطابق ذاتی کارروائی کا منصوبہ حاصل کرنے کے لیے ایک مختصر سروے کریں۔',
    getStarted: 'شروع کریں',
    browseResourcesTitle: 'وسائل براؤز کریں',
    browseResourcesDescription: 'زمرہ جات کے مطابق منظم خدمات، تنظیمات اور وسائل کی ہماری جامع ڈائرکٹری دریافت کریں۔',
    exploreDirectory: 'ڈائرکٹری دریافت کریں',
    askBridgetTitle: 'BRIDGIT سے پوچھیں',
    askBridgetDescription: 'ہمارے AI اسسٹنٹ سے اپنے سوالات کے فوری جوابات حاصل کریں۔ آپ کی ترجیحی زبان میں 24/7 دستیاب۔',
    startChatting: 'گپ شپ شروع کریں',
    saveProgressQuestion: 'اپنی پیشرفت محفوظ کرنا اور ذاتی خصوصیات تک رسائی حاصل کرنا چاہتے ہیں؟',
    signIn: 'سائن ان',
    createAccount: 'اکاؤنٹ بنائیں',
    servicesNote: 'تمام خدمات مکمل طور پر مفت، سخت خفیہ، اور 16+ زبانوں میں دستیاب ہیں جن میں انگریزی، ہسپانوی، عربی، فرانسیسی، چینی اور سواحلی شامل ہیں۔',
    
    // Trust badges
    hundredPercentFree: '100% مفت',
    privateSecure: 'نجی اور محفوظ',
    multilingualSupport: 'کثیراللسانی مدد',
    languagesSupported: '16+ زبانوں کی حمایت حاصل ہے جن میں ہسپانوی، عربی، فرانسیسی، مینڈارن اور سواحلی شامل ہیں۔',
  },
  
  // Auth pages
  auth: {
    demoMode: 'ڈیمو موڈ',
    demoModeDescription: 'اپنی ضروریات کے مطابق تجربہ کیسے ڈھلتا ہے دیکھنے کے لیے مختلف صارف پروفائلز کے ساتھ پٹسبرگ ٹومارو پائنیر آزمائیں',
    whatYouExperience: 'آپ کیا تجربہ کریں گے',
    immigrantUser: 'مہاجر صارف',
    immigrantFeatures: {
      emergency: 'ہنگامی وسائل کو ترجیح دی گئی',
      multilingual: 'کثیراللسانی مدد',
      settlement: 'آبادی پر مرکوز مواد',
    },
    studentUser: 'طالب علم صارف',
    studentFeatures: {
      academic: 'تعلیمی وسائل',
      campus: 'کیمپس مخصوص معلومات',
      career: 'کیریئر کی رہنمائی',
    },
    professionalUser: 'پیشہ ور صارف',
    professionalFeatures: {
      networking: 'صنعت نیٹ ورکنگ',
      services: 'پیشہ ورانہ خدمات',
      advancement: 'کیریئر کی ترقی',
    },
    localHelper: 'مقامی مددگار',
    localFeatures: {
      community: 'کمیونٹی وسائل',
      volunteer: 'رضاکارانہ مواقع',
      support: 'مدد کے نیٹ ورکس',
    },
    signIn: 'لاگ ان',
    
    // Authentication required page
    authenticationRequired: 'تصدیق درکار',
    loginToAccessPage: 'اس صفحے تک رسائی کے لیے آپ کو لاگ ان ہونا ضروری ہے۔',
    
    // Login page
    emailVerified: 'ای میل تصدیق شدہ',
    emailVerifiedDescription: 'آپ کی ای میل کامیابی سے تصدیق ہو گئی ہے۔',
    alreadySignedIn: 'پہلے سے سائن ان',
    redirectingToDashboard: 'آپ کو آپ کے ڈیش بورڈ پر ری ڈائریکٹ کر رہے ہیں...',
    signInDescription: 'اپنے ذاتی پٹسبرگ وسائل اور سفارشات تک رسائی کے لیے سائن ان کریں۔',
    signInWithAuth0: 'سائن ان',
    signInHelp: 'سائن ان کرنے میں مشکل؟ مدد کے لیے سپورٹ سے رابطہ کریں۔',
    loginError: 'لاگ ان کی خرابی',
    loginErrorDescription: 'آپ کو سائن ان کرنے میں ایک مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'ڈیمو اکاؤنٹس آزمائیں',
    experienceDifferentPerspectives: 'مختلف صارف نقطہ نظر سے پٹسبرگ ٹومارو پائنیر کا تجربہ کریں',
    email: 'ای میل:',
    password: 'پاس ورڈ:',
    loginAs: '{{role}} صارف کے طور پر لاگ ان',
    demoTip: 'یہ ڈیمو اکاؤنٹس مختلف صارف تجربات اور ذاتی مواد پیش کرتے ہیں',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'سوچ رہے ہیں...',
    curatingRecommendations: 'ذاتی سفارشات تیار کر رہے ہیں...',
    findingResources: 'بہترین وسائل تلاش کر رہے ہیں...',
    complete: 'مکمل!',
    creatingYourPlan: 'آپ کا ذاتی منصوبہ بنایا جا رہا ہے',
    ready: 'تیار!',
    mayTakeAMoment: 'یہ تھوڑا وقت لے سکتا ہے کیونکہ ہم آپ کے تجربے کو ذاتی بناتے ہیں...',
    seeMyRecommendations: 'میری سفارشات دیکھیں',
    loadingHint: 'یہ تھوڑا وقت لے سکتا ہے کیونکہ ہم آپ کے تجربے کو ذاتی بناتے ہیں...',
  },
  
  // Screening page
  screening: {
    title: 'اپنے بارے میں بتائیں',
    description: 'کچھ تیز سوالات کے جوابات دیں تاکہ ہم پٹسبرگ میں رہنے اور ترقی کرنے کے لیے آپ کا ذاتی گائیڈ بنا سکیں۔',
    saveRoadmapBanner: 'اکاؤنٹ بنانے سے اپنا ذاتی روڈ میپ محفوظ کریں۔ آپ اب گمنام طور پر سروے کر سکتے ہیں اور بعد میں اسے محفوظ کرنے کے لیے سائن ان کر سکتے ہیں۔',
    
    // Progress indicator
    progress: 'پیشرفت',
    completed: '{{total}} میں سے {{count}} مکمل',
    
    // Questions
    questions: {
      audience: {
        question: 'کون سا آپ کی صورت حال کو بہترین بیان کرتا ہے؟',
        options: [
          'طالب علم/پیشہ ور (پٹسبرگ علاقے کی یونیورسٹی میں شرکت یا کسی تنظیم کے لیے کام کرنا)',
          'بومرنگ (پہلے یہاں رہتا تھا، منتقل ہو گیا اور اب میں پٹسبرگ علاقے میں واپس آیا ہوں)',
          'مہاجر یا عارضی محفوظ حیثیت (ابھی یہاں دوبارہ آباد ہوا یا کسی دوسرے شہر سے یہاں منتقل ہوا)',
          'منتقل (امریکہ کے کسی دوسرے شہر سے پٹسبرگ منتقل ہو رہا ہوں)',
          'کاروباری (اپنا کاروبار بنا رہا ہوں)',
          'دور دراز ملازم',
          'دیگر',
        ],
      },
      primaryLanguage: {
        question: 'آپ کی بنیادی زبان کیا ہے؟',
        options: [
          'انگریزی (مادری/رواں)',
          'ہسپانوی (Español)',
          'عربی (العربية)',
          'سواحلی (Kiswahili)',
          'ازبک (Oʻzbekcha)',
          'نیپالی/بھوٹانی (नेपाली / རྫོང་ཁ)',
          'دری/پشتو (دری / پښتو)',
          'مینڈارن چینی (中文)',
          'دیگر',
        ],
      },
      culturalBackground: {
        question: 'کون سا ثقافتی یا علاقائی پس منظر آپ کو بہترین بیان کرتا ہے؟',
        options: [
          'سفید',
          'سیاہ یا افریقی امریکی (افریقی اور کیریبین نسل سمیت)',
          'ہسپانوی یا لاطینی/ا/ایکس',
          'ایشیائی (مثلاً چینی، ہندی، ویتنامی)',
          'مشرق وسطی یا شمالی افریقہ',
          'مقامی ہوائی یا دیگر بحر الکاہل جزیرہ نشین',
          'امریکی انڈین یا الاسکا مقامی',
          'افریقی (مثلاً نائجیرین، ایتھوپین، گھانین وغیرہ)',
          'کیریبین (مثلاً جمیکن، ہیٹین، ترینیداد وغیرہ)',
          'دیگر',
          'جواب دینا ترجیح نہیں',
        ],
      },
      housingNeed: {
        question: 'آپ کو کس قسم کی رہائشی مدد درکار ہے؟',
        options: [
          'محلے اور مارکیٹ ریٹ اپارٹمنٹس تلاش کرنے میں مدد',
          'قابل برداشت رہائشی مدد اور پروگرام',
          'عارضی/ہنگامی رہائش',
          'مشترکہ رہائش/روم میٹ میچنگ',
          'گھر خریدنے کی کوشش میں مدد',
          'میرے پاس رہائش محفوظ ہے',
        ],
      },
      professionalStatus: {
        question: 'آپ کی موجودہ پیشہ ورانہ حیثیت کیا ہے؟',
        options: [
          'طالب علم (انڈرگریجویٹ/گریجویٹ/ٹریڈ اسکول)',
          'ٹیک پیشہ ور/انجینئر',
          'صحت کی دیکھ بھال/لائف سائنسز پیشہ ور',
          'تعلیمی/محقق',
          'ملازمت کی تلاش',
          'حال ہی میں گریجویٹ، کام کی تلاش',
          'دیگر پیشہ ور',
        ],
      },
      languageSupport: {
        question: 'کون سی زبان کی مدد مفید ہوگی؟',
        options: [
          'انگریزی کلاسز (ESL) - ابتدائی سے درمیانی',
          'پیشہ ورانہ انگریزی مواصلاتی مہارتیں',
          'دستاویز ترجمہ خدمات',
          'بات چیت کی انگریزی مشق',
          'زبان کی مدد درکار نہیں',
        ],
      },
      employment: {
        question: 'کون سی ملازمت کی مدد آپ کو دلچسپ ہے؟',
        options: [
          'پیشہ ورانہ نیٹ ورکنگ اور کیریئر کی ترقی',
          'ملازمت کی تلاش میں مدد اور ریزیومے کی مدد',
          'مہارتیں کی تربیت اور سرٹیفیکیشن پروگرام',
          'صنعت مخصوص نیٹ ورکنگ (ٹیک، صحت کی دیکھ بھال وغیرہ)',
          'ملازمت کی مدد درکار نہیں، شکریہ',
        ],
      },
      communityPriorities: {
        question: 'کون سے کمیونٹی روابط آپ کے لیے سب سے اہم ہیں؟ (تمام لاگو ہونے والے منتخب کریں)',
        options: [
          'پیشہ ورانہ نیٹ ورکس اور صنعت ملاقاتیں',
          'ثقافتی اور مذہبی کمیونٹیز',
          'سماجی سرگرمیاں اور تفریح',
          'خاندان اور بچوں کی خدمات',
          'کھیل اور تفریحی سرگرمیاں',
          'فنون اور ثقافتی تقریبات',
          'ان میں سے کوئی نہیں',
        ],
      },
      immediateNeeds: {
        question: 'آپ کی فوری ترین ضروریات کیا ہیں؟ (تمام لاگو ہونے والے منتخب کریں)',
        options: [
          'لوگوں سے ملنا اور نئے دوست بنانا',
          'بنیادی خدمات (صحت کی دیکھ بھال، بینکنگ، نقل و حمل)',
          'بچوں کے لیے اسکول داخلہ',
          'قانونی/امیگریشن مدد',
          'ذہنی صحت اور تندرستی کی مدد',
          'ہنگامی مدد (خوراک، پناہ)',
          'ان میں سے کوئی نہیں',
        ],
      },
      timeline: {
        question: 'پٹسبرگ علاقے میں آباد ہونے کے لیے آپ کا وقت کیا ہے؟',
        options: [
          'ابھی پہنچا (پچھلے مہینے کے اندر)',
          'حال ہی میں پہنچا (1-6 ماہ)',
          'جلد پہنچنے کا منصوبہ (اگلے 3 ماہ)',
          'طویل مدتی منصوبہ بندی (6+ ماہ)',
          'پہلے سے پٹسبرگ علاقے میں آباد',
        ],
      },
    },
    
    // Form messages
    pleaseAnswer: 'براہ کرم اس سوال کا جواب دیں۔',
    pleaseAnswerAll: 'جاری رکھنے کے لیے براہ کرم تمام سوالات کے جوابات دیں',
    creatingGuide: 'آپ کا گائیڈ بنایا جا رہا ہے...',
    seePersonalizedGuide: 'میرا ذاتی گائیڈ دیکھیں',
    screeningQuestionnaire: 'اسکریننگ سوالنامہ',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'نئے آنے والے کا ٹول کٹ',
    description: 'پٹسبرگ میں آباد ہونے اور ترقی کرنے کے لیے درکار وسائل اور مدد تلاش کریں',
    categories: {
      housingAssistance: 'رہائشی مدد',
      foodAssistance: 'خوراک کی مدد',
      entrepreneurHiringHub: 'کاروباری اور بھرتی مرکز',
      youthAdultEducation: 'نوجوان اور بالغ تعلیم کے وسائل',
      eslImmigrantConnection: 'ESL اور مہاجر رابطہ خدمات',
      socialConnectionCulture: 'سماجی رابطہ اور ثقافت',
    },
    chat: {
      bridgitTitle: 'BRIDGIT کے ساتھ چیٹ کریں',
      bridgitDescription: 'اپنے سفر کے لیے ذاتی مدد اور رہنمائی حاصل کریں',
    },
  },

  // Resource search
  resources: {
    title: 'وسائل تلاش کریں',
    searchPlaceholder: 'وسائل تلاش کریں...',
    allCategories: 'تمام زمرے',
    housing: 'رہائش',
    educationESL: 'تعلیم / ESL',
    socialNetworking: 'سماجی / نیٹ ورکنگ',
    noResourcesFound: 'آپ کی تلاش یا فلٹرز سے میل کھانے والا کوئی وسائل نہیں ملا۔',
    backToAllCategories: 'تمام زمرے پر واپس',
    backToCategory: '{{category}} پر واپس',
    welcomeToCategory: '{{category}} میں خوش آمدید',
    categoryDescription: {
      housing: 'رہائشی مدد، کرایہ کی مدد اور محلے کے وسائل تلاش کریں',
      foodAssistance: 'فوڈ بینکس، کھانے کے پروگرام اور غذائیت کی مدد تلاش کریں',
      entrepreneurHiring: 'کاروباری وسائل، ملازمت کے مواقع اور بھرتی کی مدد دریافت کریں',
      youthEducation: 'تعلیمی پروگرام، ٹیوشن اور سیکھنے کے وسائل تک رسائی حاصل کریں',
      eslImmigrant: 'انگریزی کلاسز، امیگریشن خدمات اور ثقافتی مدد سے جڑیں',
      socialConnection: 'کمیونٹی گروپس، ثقافتی تقریبات اور سماجی سرگرمیوں میں شامل ہوں',
    },
    refreshBookmarks: 'بک مارکس تازہ کریں (ڈیبگ)',
    compare: 'موازنہ ({{count}}/3)',
    filterByLanguage: 'زبان کے لحاظ سے فلٹر:',
    showingResults: '{{total}} وسائل میں سے {{current}} دکھا رہے ہیں',
    categoryTitles: {
      housingProcess: 'پٹسبرگ میں رہائشی عمل',
      housingProcessDescription: 'رہائش کی تلاش کے عمل اور ضروریات کے بارے میں جانیں',
    },
    exploreResources: 'وسائل دریافت کریں',
    categoryNotFound: 'زمرہ نہیں ملا',
    subcategoryNotFound: 'ذیلی زمرہ نہیں ملا',
    clearFilters: 'فلٹرز صاف کریں',
    showingResultsFor: 'کے لیے',
    showingResultsIn: 'میں',
    compareSelected: 'منتخب کردہ کا موازنہ',
    noResourcesFoundCategory: 'اس زمرے کے لیے کوئی وسائل نہیں ملا۔',
    browseSubcategoryDescription: 'اس ذیلی زمرے کے اندر وسائل براؤز کریں۔',
    
    // Global search
    globalSearch: {
      placeholder: 'تمام وسائل تلاش کریں...',
      button: 'تلاش',
    },
    searchResults: {
      title: 'تلاش کے نتائج',
      for: 'کے لیے',
      noResults: 'آپ کی تلاش سے میل کھانے والا کوئی وسائل نہیں ملا۔',
      tryDifferent: 'ایک مختلف تلاش کی اصطلاح آزمائیں۔',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'میں خوش آمدید',
      subcategories: {
        // Housing subcategories
        housingProcess: 'پٹسبرگ میں رہائشی عمل',
        housingProcessDesc: 'رہائش کی تلاش کے عمل اور ضروریات کے بارے میں جانیں',
        neighborhoodResources: 'محلے اور جائیداد کے وسائل',
        neighborhoodResourcesDesc: 'محلے اور جائیداد کی معلومات دریافت کریں',
        housingAssistanceSubcat: 'رہائشی مدد',
        housingAssistanceSubcatDesc: 'براہ راست کرایہ کی مدد اور رہائشی مدد خدمات',
        
        // Food subcategories
        culturalFood: 'ثقافتی خوراک مرکز',
        culturalFoodDesc: 'بین الاقوامی مارکیٹیں اور ثقافتی خوراک کے وسائل',
        foodPantries: 'فوڈ پینٹریز',
        foodPantriesDesc: 'ہنگامی خوراک کی مدد اور پینٹریز',
        groceryGuide: 'گروسری اسٹور گائیڈ',
        groceryGuideDesc: 'مقامی گروسری اسٹورز اور خریداری کی مدد',
        
        // Employment subcategories
        hiringHub: 'کیا آپ کام کی تلاش میں مہاجر یا نئے آنے والے ہیں؟',
        hiringHubDesc: 'ہمارا بھرتی مرکز دیکھیں!',
        entrepreneurship: 'پٹسبرگ کے اندر کاروباری وسائل',
        entrepreneurshipDesc: 'کاروبار کی ترقی اور اسٹارٹ اپ وسائل',
        
        // Education subcategories
        schoolResources: 'نیا اسکول تلاش کرنے کے لیے وسائل کی تلاش؟',
        schoolResourcesDesc: 'اسکول داخلہ اور تعلیمی وسائل',
        tutoring: 'کالج کی تیاری یا ٹیوٹر کی تلاش؟',
        tutoringDesc: 'ٹیوشن خدمات اور کالج کی تیاری',
        gedResources: 'اپنا GED حاصل کرنا چاہتے ہیں؟',
        gedResourcesDesc: 'GED کی تیاری اور بالغ تعلیم',
        
        // ESL & Immigration subcategories
        eslResources: 'ESL وسائل کی تلاش؟',
        eslResourcesDesc: 'انگریزی زبان سیکھنا اور کلاسز',
        documentation: 'دستاویزات کی مدد',
        documentationDesc: 'امیگریشن کاغذات اور قانونی مدد',
        basicNeeds: 'بنیادی ضروریات کی مدد',
        basicNeedsDesc: 'ضروری خدمات اور ہنگامی مدد',
        
        // Social subcategories
        fosterConnection: 'روابط کو فروغ دینے کے وسائل',
        fosterConnectionDesc: 'سماجی گروپس اور کمیونٹی کی تعمیر',
        culturalResourcesSocial: 'خوراک اور ثقافتی وسائل',
        culturalResourcesSocialDesc: 'ثقافتی تقریبات اور خوراک کی روایات',
        faithGroups: 'مذہبی گروپس',
        faithGroupsDesc: 'مذہبی کمیونٹیز اور روحانی مدد',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'کمیونٹی اور تعلق',
          'culture-leisure': 'ثقافت، فنون اور تفریح',
        'esl-immigrant': 'ESL اور مہاجر مدد',
          'education-youth': 'تعلیم: بالغ اور نوجوان',
        'living-essentials': 'زندگی کی ضروریات',
          'work-business': 'ملازمتیں اور کاروبار کے وسائل',
      },
      categoryDescriptions: {
        'community-belonging': 'پٹسبرگ میں جڑیں، حصہ لیں اور کمیونٹی بنائیں',
          'culture-leisure': 'فنون، خاندانی سرگرمیاں، مشاغل اور رات کی زندگی دریافت کریں',
        'esl-immigrant': 'زبان سیکھنا، امیگریشن مدد اور نئے آنے والوں کی خدمات',
          'education-youth': 'بالغ سیکھنا، ٹیوشن اور نوجوانوں کے مواقع',
          'living-essentials': 'رہائش، صحت، نقل و حمل اور خوراک',
          'work-business': 'ملازمتیں، کیریئر مدد اور کاروبار کے وسائل',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'حکومت',
        'civic-advocacy': 'مقامی وکالت',
        'civic-volunteer': 'رضاکار',
        'civic-youth': 'نوجوانوں کی شمولیت',
        religion: 'مذہب',
        'social-connection': 'سماجی رابطہ',

        // Culture & Leisure
        art: 'فنون',
        family: 'خاندانی تفریح',
        'beauty-hair': 'بالوں کی دیکھ بھال / خوبصورتی',
        'hobby-spaces': 'مشاغل کی جگہیں',
        'night-life': 'رات کی زندگی',

        // ESL & Immigrant Support
        'esl-support': 'انگریزی دوسری زبان (ESL) مدد',
        'general-law': 'عام قانون',
        'immigration-asylum': 'امیگریشن / پناہ',
        'refugee-immigrant-support': 'مہاجر / مہاجر مدد',

        // Education & Youth
        'adult-education': 'بالغ تعلیم',
        'college-prep-tutoring': 'کالج کی تیاری / ٹیوشن',
        'youth-education': 'نوجوانوں کی تعلیم',
        'youth-programming': 'نوجوانوں کی پروگرامنگ',

        // Living Essentials
        'food-pantries': 'فوڈ پینٹریز',
        'grocery-guide': 'گروسری گائیڈ',
        'specialty-stores': 'خصوصی اسٹورز',
        'guide-discover-pittsburgh': 'پٹسبرگ دریافت کریں',
        'guide-diverse-businesses': 'متنوع کاروبار',
        'guide-immigrant-services': 'مہاجر خدمات',
        'health-additional-support': 'اضافی مدد',
        'health-body-mind': 'جسم اور ذہن کی دیکھ بھال',
        'health-hospitals': 'ہسپتال',
        'health-nutrition': 'غذائیت',
        'health-senior-care': 'بزرگوں کی دیکھ بھال',
        'housing-buying-home': 'گھر خریدنے',
        'housing-assistance': 'رہائشی مدد',
        'housing-relocating': 'پٹسبرگ منتقل ہونا',
        'housing-rent': 'کرایہ',
        transportation: 'نقل و حمل',

        // Work & Business
        'business-development': 'کاروبار کی ترقی',
        'business-support': 'کاروبار کی مدد',
        'career-support': 'کیریئر کی مدد',
        'internship-opportunities': 'انٹرنشپ کے مواقع',
      },
      groups: {
        'civic-engagement': 'شہری شمولیت',
        legal: 'قانونی',
        food: 'خوراک',
        'pittsburgh-guides': 'پٹسبرگ گائیڈز',
        health: 'صحت',
        housing: 'رہائش',
        transit: 'نقل و حمل',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'آپ کی ذاتی چیک لسٹ لوڈ ہو رہی ہے...',
  },
  
  // About page
  about: {
    title: 'پٹسبرگ ٹومارو پائنیر کے بارے میں',
    description: 'پٹسبرگ ٹومارو پائنیر پٹسبرگ اور الیگھینی کاؤنٹی میں آباد ہونے کے لیے آپ کی دوستانہ رہنما ہے۔ چاہے آپ ٹیک پیشہ ور ہوں یا نئے آغاز کی تلاش میں نئے آنے والے، پٹسبرگ ٹومارو پائنیر آپ کو رہائش، تعلیم، ملازمت اور کمیونٹی کے لیے مقامی وسائل سے جوڑتا ہے۔',
    features: [
      '161+ غیر منفعتی تنظیمیں',
      'ذاتی چیک لسٹس اور روڈ میپس',
      'آزاد اور روایتی مہاجر نئے آنے والوں دونوں کے لیے مدد',
      'آپ کی ضروریات سے میل کھانے کے لیے آسان اسکریننگ',
    ],
    conclusion: 'یہ منصوبہ مقامی شراکت داروں اور رضاکاروں کا تعاون ہے، جو پٹسبرگ کو سب کے لیے خوش آمدید، مددگار اور مواقع سے بھرپور بنانے کے لیے وقف ہے۔',
    copyright: 'پٹسبرگ ٹومارو پائنیر۔ تمام حقوق محفوظ ہیں۔',
    
    // AboutPage specific content
    welcomeText: 'پٹسبرگ ٹومارو پائنیر میں خوش آمدید، پٹسبرگ اور الیگھینی کاؤنٹی میں نئی زندگی شروع کرنے کے لیے آپ کی ذاتی رہنما۔ چاہے آپ ابھی امریکہ پہنچے ہوں یا پٹسبرگ کی بڑھتی ہوئی کمپنیوں میں سے کسی میں توانائی، روبوٹکس، AI، لائف سائنسز یا سٹیل میں نئی نوکری لی ہو — پٹسبرگ ٹومارو پائنیر مدد کے لیے یہاں ہے۔ رہائش تلاش کرنے سے لے کر اپنے بچوں کو اسکول میں داخل کرنے تک، انگریزی کلاسز تلاش کرنے سے لے کر مذہبی کمیونٹیز یا مقامی خوراک کی مدد سے جڑنے تک — پٹسبرگ ٹومارو پائنیر آپ کی ضرورت کے تمام وسائل کو ایک جگہ پر جمع کرتا ہے۔',
    
    whyPioneerTitle: 'پٹسبرگ ٹومارو پائنیر کیوں؟',
    whyPioneerText1: 'کیونکہ ایک نئے شہر میں تازہ شروع کرنا صفر سے شروع کرنے کا مطلب نہیں ہونا چاہیے۔',
    whyPioneerText2: 'پٹسبرگ ٹومارو پائنیر پٹسبرگ اور الیگھینی کاؤنٹی میں نئی زندگی شروع کرنے کے لیے درکار ہر چیز کو ایک قابل اعتماد، استعمال میں آسان جگہ پر جمع کرتا ہے۔',
    whyPioneerText3: 'یہ مفت، جامع ہے اور گھنٹوں کی تلاش، موازنہ اور دوبارہ سوچنے سے بچانے کے لیے ڈیزائن کیا گیا ہے۔ چاہے آپ رہائش تلاش کر رہے ہوں، اپنے بچوں کو اسکول میں داخل کر رہے ہوں، انگریزی سیکھ رہے ہوں یا اپنے مذہب، زبان یا دلچسپیوں کو بانٹنے والے لوگوں سے ملنے کی تلاش میں ہوں — پٹسبرگ ٹومارو پائنیر یقینی بناتا ہے کہ آپ اپنی منتقلی کو ہموار اور اپنی نئی زندگی کو بھرپور بنانے کے لیے ایک بھی موقع نہ چھوڑیں۔',
    whyPioneerText4: 'جہاں گوگل سرچ آپ کو سب کچھ دکھاتی ہے، پٹسبرگ ٹومارو پائنیر آپ کو بالکل وہی دکھاتا ہے جو اہم ہے۔',
    whyPioneerText5: 'جہاں AI چیٹ بوٹ جوابات پیش کرتا ہے، پائنیر آپ کو ایک روڈ میپ دیتا ہے۔',
    whyPioneerText6: 'جہاں زیادہ تر منتقلی کے ٹولز لاجسٹکس پر رک جاتے ہیں، پائنیر کمیونٹی سے شروع ہوتا ہے۔',
    whyPioneerText7: 'یہ پٹسبرگ ہے، ذاتی بنایا گیا۔',
    
    youAreThePioneerTitle: 'آپ پائنیر ہیں',
    youAreThePioneerText1: 'آپ صرف منتقل نہیں ہو رہے — آپ کچھ نیا شروع کر رہے ہیں۔ ایک نئی نوکری۔ ایک نیا اسکول۔ ایک نیا گھر۔ اور شاید ایک نئی زبان یا ثقافت بھی۔ اس کے لیے ہمت چاہیے۔',
    youAreThePioneerText2: 'ہم نے آپ کی مدد کے لیے پٹسبرگ ٹومارو پائنیر بنایا — کیونکہ آپ پائنیر ہیں۔ یہ سائٹ یہاں ہے تاکہ آپ کے ساتھ چلے جب آپ پٹسبرگ میں مستقبل بناتے ہیں۔',
    
    howPioneerHelpsTitle: 'پٹسبرگ ٹومارو پائنیر کیسے مدد کرتا ہے',
    
    madeForYouTitle: 'آپ کے لیے بنایا گیا — آپ کہیں سے بھی ہوں',
    madeForYouDescription: 'ہم جانتے ہیں کہ ہر کوئی انگریزی کو اپنی پہلی زبان کے طور پر نہیں بولتا۔ اسی لیے پٹسبرگ ٹومارو پائنیر درجنوں عالمی زبانوں کی حمایت کرتا ہے، جن میں ہسپانوی، عربی، فرانسیسی، چینی، دری اور مزید شامل ہیں۔ اگر آپ اپنی مادری زبان میں ٹائپ کریں گے، پٹسبرگ ٹومارو پائنیر اسی طرح جواب دے گا۔',
    
    personalRoadmapTitle: 'اپنا ذاتی روڈ میپ بنائیں',
    personalRoadmapDescription: 'ہمارا سب سے طاقتور ٹول آپ کا ذاتی روڈ میپ ہے — ایک چیک لسٹ جو صرف آپ کے لیے بنائی گئی ہے۔ آپ کی ضروریات (رہائش، خوراک، ملازمتیں، تعلیم وغیرہ) کے بارے میں کچھ سادہ سوالات کے جوابات دینے سے، پٹسبرگ ٹومارو پائنیر آپ کے اگلے اقدامات کی مدد کے لیے ایک حسب ضرورت کارروائی کا منصوبہ بناتا ہے۔ آپ کر سکتے ہیں:',
    personalRoadmapFeatures: [
      'کسی بھی وقت اپنا روڈ میپ دیکھیں اور اپ ڈیٹ کریں',
      'سائن ان کرکے اپنی پیشرفت محفوظ کریں (اختیاری)',
      'اپنی چیک لسٹ ڈاؤن لوڈ یا پرنٹ کریں تاکہ اسے اپنے پاس رکھیں',
      'جیسے جیسے پٹسبرگ میں آپ کی زندگی بڑھتی ہے اپنے روڈ میپ کو دوبارہ دیکھیں اور بہتر بنائیں'
    ],
    personalRoadmapNote: 'اگر آپ اپنی رفتار سے دریافت کرنا ترجیح دیتے ہیں، تو آپ لاگ ان کیے بغیر ہماری مکمل وسائل لائبریری براؤز کر سکتے ہیں۔',
    
    smartSupportTitle: 'ذہین، خود رہنمائی مدد',
    smartSupportDescription: 'پٹسبرگ ٹومارو پائنیر میں ایک دوستانہ AI چیٹ بوٹ شامل ہے جو سینکڑوں عام سوالات کے جوابات دینے کے لیے تربیت یافتہ ہے۔ یہ آپ کو وسائل کی طرف رہنمائی کر سکتا ہے، مقامی نظام کیسے کام کرتے ہیں اس کی وضاحت کر سکتا ہے اور آپ کو اگلا قدم اٹھانے میں مدد کر سکتا ہے۔ ہمارے قابل اعتماد شراکت داروں — عوامی ایجنسیوں، غیر منفعتی تنظیمات، خدمات فراہم کرنے والوں اور مزید — کے لیے رابطے کی معلومات کا ایک مکمل ڈائرکٹری بھی موجود ہے۔',
    
    trustedPartnersTitle: 'قابل اعتماد شراکت دار',
    trustedPartnersDescription: 'ہمارے قابل اعتماد شراکت داروں کا مکمل ڈائرکٹری تک رسائی حاصل کریں — پٹسبرگ اور الیگھینی کاؤنٹی بھر میں عوامی ایجنسیاں، غیر منفعتی تنظیمات اور خدمات فراہم کرنے والے۔ ہمارے نیٹ ورک میں 380+ غیر منفعتی تنظیمیں شامل ہیں جو آپ کی مخصوص ضروریات کے ساتھ مدد کے لیے تیار ہیں۔',
    
    privacyTitle: 'آپ کی رازداری، محفوظ',
    privacyDescription: 'آپ کی رازداری اور حفاظت ہمارے لیے اہم ہے۔ اگر آپ اکاؤنٹ بنانے کا انتخاب کرتے ہیں، تو آپ کے ذاتی ڈیٹا کو SOC II کے مطابق حفاظتی پروٹوکولز کے ذریعے محفوظ کیا جاتا ہے۔ ہم کبھی بھی آپ کے ڈیٹا کو فروخت یا شیئر نہیں کریں گے۔ آپ ہر وقت اپنی معلومات پر مکمل کنٹرول رکھتے ہیں۔',
    
    pittsburghTomorrowTitle: 'پٹسبرگ ٹومارو کے بارے میں',
    pittsburghTomorrowText1: 'پٹسبرگ ٹومارو پائنیر پٹسبرگ ٹومارو کی ایک پہل ہے، ایک غیر منفعتی تنظیم جو پٹسبرگ کو بڑھانے کے مشن پر ہے۔ ہم اس نئی روح کو تیز کر رہے ہیں جو مورخ ڈیوڈ میک کلو کے "امریکہ کا ناگزیر شہر" کہے جانے والے کو دوبارہ تعریف کر رہی ہے۔',
    pittsburghTomorrowText2: 'وہ خطہ جس نے امریکہ کو زمین سے بنایا ایک نئی زندگی اور شہری روح کے ساتھ بڑھ رہا ہے: نئے آنے والوں کا خیرمقدم، کاروباریوں کا آغاز اور نئے راستے کھولنا۔ ہماری تحریک پائنیرز، پہلے چلنے والوں اور خطرہ اٹھانے والوں کی ایک نئی لہر سے چل رہی ہے جو موقع حاصل کر رہے ہیں اور مستقبل بنا رہے ہیں — پٹسبرگ میں۔',
    pittsburghTomorrowText3: 'پٹسبرگ ٹومارو میں، ہم پٹسبرگ کو بڑھانے کے مشن پر ہیں۔ اور اس کا مطلب صرف آبادی یا معاشی ترقی نہیں ہے؛ اس کا مطلب ہمارے شہر کی روح کو دوبارہ زندہ کرنا ہے۔ چھوٹے کاروباروں اور کاروباریوں کی مدد کرنا۔ ہمارے ماحول کو خوبصورت بنانا اور محفوظ رکھنا۔ فنون اور ثقافت کو فروغ دینا۔ نئے آنے والوں کا خیرمقدم کرنا اور کمیونٹی بنانا۔ اپنے شہر پر فخر کرنا اور اسے دوبارہ نقشے پر لانا۔',
    pittsburghTomorrowLink: 'مزید جانیں',
    
    // Call to action section
    readyToStartTitle: 'پٹسبرگ میں اپنا سفر شروع کریں',
    readyToStartDescription: 'اپنا ذاتی روڈ میپ بنائیں تاکہ آپ کو اپنے نئے گھر میں آباد ہونے اور ترقی کرنے میں مدد ملے۔',
    getStarted: 'شروع کریں',
    browseResources: 'وسائل براؤز کریں',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'کے بارے میں پر واپس',
    title: 'ڈیٹا کی شفافیت اور رازداری کا بیان',
    description: 'پٹسبرگ ٹومارو میں، ہم شفافیت اور آپ کے اعتماد کو قدر دیتے ہیں۔ ہم یقین رکھتے ہیں کہ آپ کو یہ سمجھنے کا حق ہے کہ ہم کچھ معلومات کیوں مانگتے ہیں، ہم اسے کیسے استعمال کرتے ہیں اور یہ آپ کو کیسے فائدہ پہنچاتا ہے۔',
    
    whyWeAskTitle: 'ہم یہ سوالات کیوں پوچھتے ہیں اور ہم آپ کی معلومات کو کیسے استعمال کرتے ہیں:',
    whyWeAskDescription: 'ہم جو سوالات پوچھتے ہیں وہ آپ کے لیے ایک حسب ضرورت روڈ میپ بنانے میں ہماری مدد کے لیے ڈیزائن کیے گئے ہیں۔ آپ کے جوابات ہمیں اجازت دیتے ہیں:',
    whyWeAskBullet1: 'آپ کی ضروریات کے مطابق ہمارے ڈیٹا بیس سے متعلقہ وسائل اور معلومات نکالیں۔',
    whyWeAskBullet2: 'یقینی بنائیں کہ ہم کمیونٹیز اور پس منظر میں لوگوں تک منصفانہ طور پر پہنچ رہے ہیں۔',
    whyWeAskBullet3: 'جن کی ہم خدمت کر رہے ہیں ان میں خلا کی شناخت کریں تاکہ ہم ان لوگوں تک بہتر طور پر پہنچ سکیں جو شاید گم ہو سکتے ہیں۔',
    whyWeAskBullet4: 'ہمارے AI ٹولز کو بہتر بنائیں تاکہ وہ تمام صارفین کو مؤثر طریقے سے خدمت کرنے کے لیے بہتر طور پر لیس ہوں۔',
    weDoNotSell: 'ہم آپ کے ڈیٹا کو فروخت نہیں کرتے۔ ہم اسے صرف اوپر درج مقاصد کے لیے استعمال کرتے ہیں۔',
    
    dataRetentionTitle: 'ڈیٹا کی برقراری:',
    dataRetentionDescription: 'ہم آپ کی معلومات کو اپنے ڈیٹا بیس میں اس وقت تک رکھتے ہیں جب تک آپ ہمیں مطلع نہیں کرتے کہ آپ اب اپنے حسب ضرورت ڈیش بورڈ تک رسائی نہیں چاہتے۔ اس کے بعد، آپ کا ڈیٹا گمنام ہو جائے گا اور صرف ہماری AI خدمات کو بہتر بنانے کے لیے استعمال کیا جائے گا تاکہ پٹسبرگ کے دیگر نئے آنے والوں کی مدد کی جا سکے۔',
    
    quomeTitle: 'Quome آپ کے ڈیٹا کو کیسے استعمال کرتا ہے:',
    quomeDescription: 'ہماری سائٹ Quome کے ذریعے ہوسٹ کی گئی ہے، جو پلیٹ فارم کو چلانے اور بہتر بنانے کے لیے کچھ ڈیٹا جمع کر سکتا ہے۔ آپ',
    
    skillBuilderTitle: 'Skill Builder آپ کے ڈیٹا کو کیسے استعمال کرتا ہے:',
    skillBuilderDescription: 'ہمارا سائٹ چیٹ بوٹ SkillBuilder.io کے ذریعے ہوسٹ کیا گیا ہے، جو پلیٹ فارم کو چلانے اور بہتر بنانے کے لیے کچھ ڈیٹا جمع کر سکتا ہے۔ آپ',
    
    contactDescription: 'اگر آپ کے پاس ہمارے ڈیٹا کے استعمال یا رازداری کی مشقوں کے بارے میں سوالات ہیں، تو براہ کرم ہم سے رابطہ کرنے کے لیے ہر صفحے کے دائیں طرف ہمارا فیڈ بیک بٹن استعمال کریں۔',
    privacyPolicyLink: 'رازداری کی پالیسی'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'پٹسبرگ ٹومارو پائنیر کے بارے میں',
    aboutDescription: 'پٹسبرگ ٹومارو پائنیر پٹسبرگ اور الیگھینی کاؤنٹی کے نئے آنے والوں کو ان کا راستہ تلاش کرنے میں مدد کرتا ہے۔ ہم آپ کو صحیح وسائل اور مواقع سے جوڑتے ہیں، چاہے آپ کا سفر کچھ بھی ہو۔',
    quickLinks: 'تیز لنکس',
    home: 'ہوم',
    about: 'کے بارے میں',
    resources: 'وسائل',
    privacyPolicy: 'رازداری کی پالیسی',
    getStarted: 'شروع کریں',
    contact: 'رابطہ',
    location: 'پنسلوانیا، پٹسبرگ سے ہیلو',
    email: 'ای میل: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'خوش آمدید، {{name}}!',
    welcomeStudent: 'واپسی پر خوش آمدید، {{name}}!',
    welcomeProfessional: 'خوش آمدید، {{name}}!',
    welcomeLocal: 'ہیلو {{name}}!',
    
    subtitleImmigrant: 'آپ کا آبادی کا سفر یہاں سے شروع ہوتا ہے',
    subtitleStudent: 'آپ کی تعلیمی کامیابی ہماری ترجیح ہے',
    subtitleProfessional: 'آپ کی کیریئر کی ترقی ہمارا فوکس ہے',
    subtitleLocal: 'پٹسبرگ کو سب کے لیے خوش آمدید بنانے میں مدد کریں',
    
    demoUserNote: 'آپ پٹسبرگ ٹومارو پائنیر کو **{{role}}** صارف کے طور پر دیکھ رہے ہیں۔ تجربہ آپ کی کردار کے لیے ذاتی بنایا گیا ہے۔',
    userBadge: '{{role}} صارف',
    
    urgentResources: 'فوری وسائل',
    
    // Resource categories
    emergencyServices: 'ہنگامی خدمات',
    emergencyDescription: '24/7 بحران کی مدد اور فوری امداد',
    temporaryHousing: 'عارضی رہائش',
    temporaryHousingDescription: 'پناہ گاہ اور رہائشی مدد پروگرام',
    healthcareAccess: 'صحت کی دیکھ بھال تک رسائی',
    healthcareDescription: 'طبی خدمات اور صحت کی انشورنس مدد',
    languageServices: 'زبان کی خدمات',
    languageServicesDescription: 'ترجمہ اور تشریح کی مدد',
    
    // Additional resource categories for other roles
    academicSupport: 'تعلیمی مدد',
    academicSupportDescription: 'ٹیوشن، مطالعہ گروپس اور تعلیمی وسائل',
    studentHousing: 'طالب علم رہائش',
    studentHousingDescription: 'کیمپس پر اور کیمپس سے باہر رہائشی اختیارات',
    financialAid: 'مالی امداد',
    financialAidDescription: 'اسکالرشپس، گرانٹس اور مالی مدد',
    studentGroups: 'طالب علم گروپس',
    studentGroupsDescription: 'بین الاقوامی طالب علم تنظیمیں اور کلب',
    professionalNetworks: 'پیشہ ورانہ نیٹ ورکس',
    professionalNetworksDescription: 'صنعت ملاقاتیں اور نیٹ ورکنگ تقریبات',
    careerDevelopment: 'کیریئر کی ترقی',
    careerDevelopmentDescription: 'مہارتیں کی تربیت اور سرٹیفیکیشن پروگرام',
    professionalHousing: 'پیشہ ورانہ رہائش',
    professionalHousingDescription: 'ایگزیکٹو رہائش اور منتقلی خدمات',
    mentorship: 'رہنمائی',
    mentorshipDescription: 'پیشہ ورانہ رہنمائی اور رہنمائی پروگرام',
    volunteerOpportunities: 'رضاکارانہ مواقع',
    volunteerOpportunitiesDescription: 'اپنی کمیونٹی میں نئے آنے والوں کی مدد کرنے کے طریقے',
    communityOrganizations: 'کمیونٹی تنظیمیں',
    communityOrganizationsDescription: 'مقامی غیر منفعتی تنظیمیں اور خدمات فراہم کرنے والے',
    supportNetworks: 'مدد کے نیٹ ورکس',
    supportNetworksDescription: 'رہنمائی اور دوستی پروگرام',
    culturalExchange: 'ثقافتی تبادلہ',
    culturalExchangeDescription: 'بین الثقافتی تقریبات اور پروگرام',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'اپنے ذاتی پٹسبرگ سفر کو دریافت کرنے کے لیے سائن ان کریں',
    signInToPioneer: 'پٹسبرگ ٹومارو پائنیر میں سائن ان کریں',
    welcomeTitle: 'پٹسبرگ ٹومارو پائنیر میں خوش آمدید، {{name}}!',
    welcomeTitleWithoutName: 'پٹسبرگ ٹومارو پائنیر میں خوش آمدید!',
    journeyContinues: 'آپ کا ذاتی سفر جاری ہے...',
    beginJourney: 'اپنا ذاتی پٹسبرگ سفر شروع کریں',
    completedSurveyHeader: 'آپ نے پہلے ہی سروے مکمل کر لیا ہے',
    completedSurveyText: 'آپ نے اپنا آن بورڈنگ سروے مکمل کر لیا ہے۔ نیچے اپنا ذاتی روڈ میپ دیکھیں یا اپنی سفارشات کو اپ ڈیٹ کرنے کے لیے اپنے جوابات میں ترمیم کریں۔',
    completedSurveyTextWithDate: 'آپ نے {{date}} کو اپنا آن بورڈنگ سروے مکمل کیا۔ نیچے اپنا ذاتی روڈ میپ دیکھیں یا اپنی سفارشات کو اپ ڈیٹ کرنے کے لیے اپنے جوابات میں ترمیم کریں۔',
    editResponses: 'جوابات میں ترمیم کریں',
    viewMyRoadmap: 'میرا روڈ میپ دیکھیں',
    noteLabel: 'نوٹ:',
    editRegenerateNote: 'اگر آپ اپنے سروے کے جوابات میں ترمیم کرتے ہیں، تو آپ کی ذاتی سفارشات اور روڈ میپ خود بخود دوبارہ تیار کیے جائیں گے تاکہ آپ کی اپ ڈیٹ شدہ ترجیحات سے بہتر میل کھائیں۔',
    bridgitHelp: 'سروے میں شامل نہیں کیے گئے سوالات ہیں؟ ذاتی مدد کے لیے نیچے دائیں طرف BRIDGIT چیٹ بوٹ پر کلک کریں!',
    personalizedRoadmap: 'آپ کا ذاتی روڈ میپ',
    unlockExperience: 'اپنا حسب ضرورت تجربہ کھولیں',
    completeSurveyHeader: 'شروع کرنے کے لیے اپنا سروے مکمل کریں',
    completeSurveyText: 'پٹسبرگ میں آپ کی ضروریات اور اہداف کے لیے خاص طور پر تیار کردہ ذاتی وسائل کی سفارشات حاصل کرنے کے لیے ہمارا تیز 5 منٹ کا سروے کریں۔',
  },
  
  // Profile page
  profile: {
    title: 'پروفائل کی ترتیبات',
    subtitle: 'اپنی ذاتی معلومات اور ترجیحات کا انتظام کریں',
    accountInformation: 'اکاؤنٹ کی معلومات',
    accountInformationDescription: 'اپنی بنیادی اکاؤنٹ کی تفصیلات اپ ڈیٹ کریں',
    basicInformation: 'بنیادی معلومات',
    basicInformationDescription: 'اپنی بنیادی ذاتی تفصیلات اپ ڈیٹ کریں',
    firstName: 'پہلا نام',
    enterFirstName: 'اپنا پہلا نام درج کریں',
    lastName: 'آخری نام',
    enterLastName: 'اپنا آخری نام درج کریں',
    username: 'صارف نام',
    enterUsername: 'اپنا صارف نام درج کریں',
    email: 'ای میل',
    emailChangeNote: 'ای میل تبدیل نہیں کی جا سکتی۔ اگر آپ کو اپنی ای میل اپ ڈیٹ کرنے کی ضرورت ہے تو سپورٹ سے رابطہ کریں۔',
    emailCannotBeChanged: 'ای میل تبدیل نہیں کی جا سکتی۔ اگر آپ کو اپنی ای میل اپ ڈیٹ کرنے کی ضرورت ہے تو سپورٹ سے رابطہ کریں۔',
    surveyRequired: 'پہلے اپنا سروے مکمل کریں',
    surveyRequiredDescription: 'ذاتی سفارشات حاصل کرنے اور اپنے سروے کے جوابات میں ترمیم کرنے کے لیے، آپ کو پہلے ابتدائی تشخیصی سروے مکمل کرنا ہوگا۔',
    takeSurvey: 'سروے کریں',
    basicQuestions: 'بنیادی معلومات',
    basicQuestionsDescription: 'ذاتی سفارشات حاصل کرنے کے لیے اپنے بارے میں اور اپنی صورت حال بتائیں',
    selectPrimary: 'اپنی بنیادی ترجیح منتخب کریں:',
    selectOption: 'ایک اختیار منتخب کریں...',
    supportNeeds: 'مدد اور ضروریات',
    supportNeedsDescription: 'آپ کو کس قسم کی مدد اور خدمات درکار ہیں؟',
    selectMultiple: 'تمام لاگو ہونے والے منتخب کریں:',
    selectAtLeastOne: 'براہ کرم کم از کم ایک اختیار منتخب کریں۔',
    timelinePreferences: 'وقت کا تعین اور ترجیحات',
    timelinePreferencesDescription: 'آپ کا وقت کا تعین اور ٹیکنالوجی کی ترجیحات',
    backToDashboard: 'ڈیش بورڈ پر واپس',
    languageAndCultural: 'زبان اور ثقافتی پس منظر',
    languageAndCulturalDescription: 'بہتر ذاتی سفارشات فراہم کرنے میں ہماری مدد کریں',
    primaryLanguage: 'بنیادی زبان',
    selectPrimaryLanguage: 'اپنی بنیادی زبان منتخب کریں',
    culturalBackground: 'ثقافتی پس منظر',
    selectCulturalBackground: 'اپنا ثقافتی پس منظر منتخب کریں',
    professionalAndLiving: 'پیشہ ورانہ اور زندگی کی صورت حال',
    professionalAndLivingDescription: 'یہ ہمیں متعلقہ وسائل اور خدمات کی سفارش کرنے میں مدد کرتا ہے',
    professionalStatus: 'پیشہ ورانہ حیثیت',
    selectProfessionalStatus: 'اپنی پیشہ ورانہ حیثیت منتخب کریں',
    housingSituation: 'رہائشی صورت حال',
    selectHousingSituation: 'اپنی رہائشی صورت حال منتخب کریں',
    familyStatus: 'خاندانی حیثیت',
    selectFamilyStatus: 'اپنی خاندانی حیثیت منتخب کریں',
    saveChanges: 'تبدیلیاں محفوظ کریں',
    saving: 'محفوظ ہو رہا ہے...',
    recalculatingRecommendations: 'سفارشات دوبارہ حساب کر رہے ہیں...',
    profileUpdated: 'پروفائل اپ ڈیٹ شدہ',
    profileUpdatedDescription: 'آپ کا پروفائل کامیابی سے اپ ڈیٹ ہو گیا ہے۔',
    accountUpdated: 'اکاؤنٹ اپ ڈیٹ شدہ',
    accountUpdatedDescription: 'آپ کی اکاؤنٹ کی معلومات کامیابی سے اپ ڈیٹ ہو گئی ہیں۔ اپنی ترجیحات محفوظ کرنے کے لیے سروے مکمل کریں۔',
    updateFailed: 'اپ ڈیٹ ناکام',
    updateFailedDescription: 'پروفائل اپ ڈیٹ کرنے میں ناکام۔ براہ کرم دوبارہ کوشش کریں۔',
    pleaseLogIn: 'براہ کرم اپنا پروفائل دیکھنے کے لیے لاگ ان کریں۔',
    
    // Language options
    languages: {
      english: 'انگریزی',
      spanish: 'ہسپانوی',
      french: 'فرانسیسی',
      arabic: 'عربی',
      chinese: 'چینی',
      swahili: 'سواحلی',
      hindi: 'ہندی',
      portuguese: 'پرتگالی',
      russian: 'روسی',
      nepali: 'نیپالی',
      somali: 'صومالی',
      tagalog: 'ٹیگالوگ',
      turkish: 'ترکی',
      other: 'دیگر',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'امریکی/مغربی',
      westAfrican: 'مغربی افریقی',
      middleEasternNorthAfrican: 'مشرق وسطی/شمالی افریقی',
      southAsian: 'جنوبی ایشیائی (بھوٹانی سمیت)',
      latinoHispanic: 'لاطینی/ہسپانوی',
      eastAsian: 'مشرقی ایشیائی',
      easternEuropean: 'مشرقی یورپی',
      other: 'دیگر/کہنا ترجیح نہیں',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'طالب علم',
      graduateStudent: 'گریجویٹ طالب علم',
      softwareEngineer: 'سافٹ ویئر انجینئر',
      healthcareProfessional: 'صحت کی دیکھ بھال پیشہ ور',
      researchScientist: 'تحقیقی سائنسدان',
      seekingEmployment: 'ملازمت کی تلاش',
      employedFullTime: 'فل ٹائم ملازم',
      employedPartTime: 'پارٹ ٹائم ملازم',
      selfEmployed: 'خود ملازم',
      retired: 'ریٹائرڈ',
      other: 'دیگر',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'عارضی رہائش',
      campusHousing: 'کیمپس رہائش',
      apartmentHunting: 'اپارٹمنٹ کی تلاش',
      rentingApartment: 'اپارٹمنٹ کرایہ پر',
      rentingHouse: 'گھر کرایہ پر',
      homeowner: 'گھر کا مالک',
      livingWithFamily: 'خاندان کے ساتھ رہنا',
      sharedHousing: 'مشترکہ رہائش',
      other: 'دیگر',
    },
    
    // Family status options
    familyStatuses: {
      single: 'غیر شادی شدہ',
      married: 'شادی شدہ',
      familyWithChildren: 'بچوں والا خاندان',
      singleParent: 'اکیلا والد/والدہ',
      extendedFamily: 'وسیع خاندان',
      other: 'دیگر',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'ہم آپ کو کیا کہیں؟',
    description: 'اپنا نام بتا کر ہماری مدد کریں تاکہ ہم آپ کے تجربے کو ذاتی بنا سکیں۔',
    firstName: 'پہلا نام',
    firstNamePlaceholder: 'اپنا پہلا نام درج کریں',
    lastName: 'آخری نام',
    lastNamePlaceholder: 'اپنا آخری نام درج کریں (اختیاری)',
    skip: 'ابھی کے لیے چھوڑ دیں',
    save: 'نام محفوظ کریں',
    saving: 'محفوظ ہو رہا ہے...',
    firstNameRequired: 'پہلا نام درکار',
    firstNameRequiredDescription: 'جاری رکھنے کے لیے براہ کرم اپنا پہلا نام درج کریں۔',
    nameUpdated: 'نام اپ ڈیٹ شدہ',
    nameUpdatedDescription: 'آپ کا نام کامیابی سے محفوظ ہو گیا ہے۔',
    updateFailed: 'اپ ڈیٹ ناکام',
    updateFailedDescription: 'آپ کا نام اپ ڈیٹ کرنے میں ناکام۔ براہ کرم دوبارہ کوشش کریں۔',
  },
  
  // Common elements
  common: {
    dashboard: 'ڈیش بورڈ',
    loading: 'لوڈ ہو رہا ہے...',
    search: 'تلاش',
    filter: 'فلٹر',
    next: 'اگلا',
    previous: 'پچھلا',
    save: 'محفوظ کریں',
    cancel: 'منسوخ',
    confirm: 'تصدیق',
    edit: 'ترمیم',
    delete: 'حذف',
    close: 'بند',
    back: 'واپس',
    backToResources: 'وسائل پر واپس',
    viewDetails: 'تفصیلات دیکھیں',
    learnMore: 'مزید جانیں',
    getHelp: 'مدد حاصل کریں',
    startNow: 'ابھی شروع کریں',
    tryNow: 'ابھی آزمائیں',
    downloadNow: 'ابھی ڈاؤن لوڈ کریں',
    visitWebsite: 'ملاحظہ',
    shareThis: 'یہ شیئر کریں',
    copied: 'کاپی شدہ!',
    copy: 'کاپی',
    show: 'دکھائیں',
    hide: 'چھپائیں',
    expand: 'پھیلائیں',
    collapse: 'سکیڑیں',
    seeMore: 'مزید دیکھیں',
    seeLess: 'کم دیکھیں',
    showingTopOf: '{{total}} وسائل میں سے {{current}} دکھا رہے ہیں',
    selectLanguage: 'زبان منتخب کریں',
    personalizedRecommendationsLabel: 'ذاتی سفارشات',
    exploreResourcesNowLabel: 'اب وسائل دریافت کریں',
    curatedAdviceLabel: 'کامیابی کے لیے منتخب مشورہ',
    
    // Accessibility and UI labels
    toggleSidebar: 'سائیڈ بار ٹوگل کریں',
    toggleMobileMenu: 'موبائل مینو ٹوگل کریں',
    feedback: 'فیڈ بیک',
    openInNewTab: 'نئی ٹیب میں کھولیں',
    removeBookmark: 'بک مارک ہٹائیں',
    editResource: 'وسائل میں ترمیم کریں',
    deleteResource: 'وسائل حذف کریں',
    dragToReorder: 'دوبارہ ترتیب دینے کے لیے کھینچیں',
    saveOrPrintOptions: 'محفوظ یا پرنٹ کے اختیارات',
    filterByCategory: 'زمرے کے لحاظ سے فلٹر',
    openChatAssistant: 'BRIDGIT AI اسسٹنٹ کے ساتھ چیٹ کھولیں',
    askBridget: 'BRIDGIT سے پوچھیں',
    bridgitComingSoonTitle: 'BRIDGIT: جلد آرہا ہے!',
    bridgitComingSoonDescription: 'ہمارا AI اسسٹنٹ BRIDGIT فی الحال ترقی کے تحت ہے۔ اپ ڈیٹس کے لیے توجہ رکھیں!',
    
    // Content section headers
    description: 'تفصیل',
    services: 'خدمات',
    languages: 'زبانیں',
    languagesSupported: 'تعاون یافتہ زبانیں',
    available: 'دستیاب',
    resources: 'وسائل',
    exploreResources: 'وسائل دریافت کریں',
    
    // Admin interface
    authenticationRequired: 'تصدیق درکار',
    organizationName: 'تنظیم کا نام',
    website: 'ویب سائٹ',
    shortDescription: 'مختصر تفصیل',
    fullDescription: 'مکمل تفصیل',
    affiliation: 'وابستگی',
    financialData: 'مالی ڈیٹا',
    serviceDetails: 'خدمات کی تفصیلات',
    categories: 'زمرے',
    servicesProvided: 'فراہم کردہ خدمات',
    totalResources: 'کل وسائل',
    publishingStatus: 'اشاعت کی حیثیت',
    totalUsers: 'کل صارفین',
    adminUsers: 'ایڈمن صارفین',
    demoUsers: 'ڈیمو صارفین',
    noResourcesFound: 'کوئی وسائل نہیں ملا',
    
    // Form placeholders
    placeholders: {
      organizationName: 'تنظیم کا نام',
      briefDescription: 'مختصر تفصیل',
      detailedDescription: 'خدمات اور پروگراموں کی تفصیلی تفصیل',
      organizationAffiliation: 'تنظیم کی وابستگی یا نیٹ ورک',
      partnersCollaborating: 'شراکت داروں اور تعاون کرنے والی تنظیموں کی فہرست',
      availableOnline: 'آن لائن دستیاب',
    },
    
    // Additional UI elements
    backToHome: 'ہوم پر واپس',
    goHome: 'ہوم پر جائیں',
    browseResources: 'وسائل براؤز کریں',
    needPersonalizedRecommendations: 'ذاتی سفارشات درکار؟',
    personalizedRecommendationsDescription: 'آپ کی ضروریات کے لیے خاص طور پر منتخب کردہ وسائل کے ساتھ حسب ضرورت چیک لسٹ حاصل کرنے کے لیے ہماری تیز اسکریننگ کریں۔',
    getYourPersonalRoadmap: 'اپنا ذاتی روڈ میپ حاصل کریں',
    allRightsReserved: 'تمام حقوق محفوظ ہیں',
    initiativeOfPittsburghTomorrow: 'پٹسبرگ ٹومارو کی ایک پہل',
    viewingAsUserNotification: 'آپ پٹسبرگ ٹومارو پائنیر کو {{role}} صارف کے طور پر دیکھ رہے ہیں۔ تجربہ آپ کی کردار کے لیے ذاتی بنایا گیا ہے۔',
    priorityResourcesForYou: 'آپ کے لیے ترجیحی وسائل',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'آپ کے سروے کے جوابات کی بنیاد پر، آپ کو ابھی مخصوص مدد درکار نہیں ہے۔ اگر آپ کی صورت حال بدل جاتی ہے، تو آپ اپنا پروفائل اپ ڈیٹ کر سکتے ہیں۔ بصورت دیگر، تمام دستیاب وسائل کو دریافت کرنے میں آزاد محسوس کریں۔',
    editProfile: 'پروفائل اپ ڈیٹ کریں',
    exploreAllResources: 'تمام وسائل دریافت کریں',
    
    // Priority Categories
    priorityCategories: {
      housing: 'رہائش',
      education: 'تعلیم', 
      income: 'آمدنی',
      first_things_first: 'پہلے اہم چیزیں',
      meeting_people: 'لوگوں سے ملنا',
      kids_activities: 'بچوں کی سرگرمیاں',
      faith_communities: 'مذہبی کمیونٹیز',
      sports_wellness: 'کھیل اور تندرستی',
      arts_entertainment: 'فنون اور تفریح',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'قابل برداشت رہائش اور مالی مدد تلاش کرنا۔',
      education: 'پیشہ ورانہ انگریزی اور دیگر زبان کی مدد۔',
      income: 'ملازمت کی تلاش اور مہارتیں کی ترقی کے لیے مدد۔',
      first_things_first: 'ہنگامی امداد، ذہنی صحت اور داخلے کے ساتھ مدد۔',
      meeting_people: 'پیشہ ورانہ نیٹ ورکس اور سماجی تقریبات کے ذریعے جڑیں۔',
      kids_activities: 'خاندان اور بچوں کے پروگرام دستیاب ہیں۔',
      faith_communities: 'مقامی مذہبی اور ثقافتی گروپس تلاش کریں۔',
      sports_wellness: 'کھیل اور تفریح کے مواقع دریافت کریں۔',
      arts_entertainment: 'مقامی فنون اور ثقافتی تقریبات دریافت کریں۔',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'اپنے بک مارک کردہ وسائل دیکھیں اور ان کا انتظام کریں',
    searchYourBookmarks: 'اپنے بک مارکس تلاش کریں...',
    showingBookmarks: '{{total}} بک مارک کردہ وسائل میں سے {{count}} دکھا رہے ہیں',
    showingBookmarksPaginated: '{{total}} بک مارکس میں سے {{start}}-{{end}} دکھا رہے ہیں',
    failedToLoadBookmarks: 'بک مارکس لوڈ کرنے میں ناکام۔ براہ کرم دوبارہ کوشش کریں۔',
    bookmarkedOn: 'پر بک مارک شدہ',
    noBookmarksMatchFilters: 'کوئی بک مارک آپ کے موجودہ فلٹرز سے میل نہیں کھاتا۔',
    
    // Additional UI elements - screening form
    stepOf: '{{total}} میں سے {{current}} قدم',
    percentComplete: '{{percent}}% مکمل',
    previousButton: 'پچھلا',
    nextButton: 'اگلا',
    creatingYourPlan: 'آپ کا منصوبہ بنایا جا رہا ہے...',
    completeAssessment: 'تشخیص مکمل کریں',
    
    // Bookmarks empty state
    noBookmarksYet: 'ابھی تک کوئی بک مارکس نہیں',
    startExploringBookmark: 'وسائل کی تلاش شروع کریں اور جو آپ کو مفید لگتے ہیں انہیں بک مارک کریں!',
    pageOf: 'صفحہ {{current}} از {{total}}',
    yourPersonalizedRoadmap: 'آپ کا ذاتی روڈ میپ',
    resourcesReadyForYou: '{{count}} وسائل آپ کے لیے تیار',
    seeMoreResources: 'تمام وسائل دریافت کریں',
    discoveringPerfectResources: 'آپ کے بہترین وسائل دریافت کیے جا رہے ہیں',
    noRecommendationsYet: 'آپ کی ذاتی سفارشات تیار کی جا رہی ہیں۔ شروع کرنے کے لیے ہماری وسائل ڈائرکٹری دریافت کریں۔',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'صفحہ نہیں ملا',
    pageNotFoundDescription: 'صفحہ جس کی آپ تلاش کر رہے ہیں موجود نہیں ہے یا منتقل کر دیا گیا ہے۔',
  },
}
