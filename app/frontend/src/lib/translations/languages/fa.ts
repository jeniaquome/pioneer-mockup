/**
 * Farsi/Persian (fa) translations
 * 
 * Professional translations with formal, polite address (Farsi from Iran)
 * Proper RTL text support
 * Cultural appropriateness
 * 
 * Language: Farsi/Persian (fa-IR)
 * Locale: Iran
 */

import type { TranslationStructure } from '../types'

export const farsiTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'خانه',
    dashboard: 'داشبورد',
    adminDashboard: 'داشبورد مدیریت',
    welcome: 'خوش آمدید',
    resources: 'منابع',
    bookmarks: 'نشان‌گذاری‌ها',
    about: 'درباره',
    myChecklist: 'فهرست',
    signIn: 'ورود',
    signUp: 'ثبت نام',
    accountSettings: 'تنظیمات پروفایل',
    signOut: 'خروج',
    settings: 'تنظیمات',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'به پیونیر پیتسبورگ فردا خوش آمدید',
    heroWelcomeTo: 'خوش آمدید به',
    heroPioneer: 'پیونیر پیتسبورگ فردا',
    heroDescription: 'راهنمای شخصی شما برای شروع زندگی جدید در پیتسبورگ — رایگان، خصوصی، چندزبانه',
    heroExtendedDescription: 'به پیتسبورگ نقل مکان می‌کنید؟ ساعت‌ها در ده‌ها سایت جستجو نکنید یا همان سوالات را بارها و بارها نپرسید. پیونیر پیتسبورگ فردا راهنمای شخصی و رایگان شما برای هر منبعی است که به تازه‌واردان کمک می‌کند تا به سرعت و با اطمینان مستقر شوند — از مسکن و مدارس تا زبان، ایمان و زندگی اجتماعی. این کامل‌ترین، صرفه‌جویی‌کننده‌ترین زمان و خوش‌آمدترین راه برای شروع فصل جدید شما در پیتسبورگ است.',
    howCanWeHelp: 'امروز چگونه می‌توانیم به شما کمک کنیم؟',
    howCanWeHelpSubtitle: 'مسیر خود را انتخاب کنید تا توصیه‌های شخصی‌سازی شده دریافت کنید',
    createRoadmapTitle: 'نقشه راه خود را ایجاد کنید',
    createRoadmapDescription: 'یک نظرسنجی کوتاه انجام دهید تا یک برنامه عملی شخصی‌سازی شده متناسب با نیازها و اهداف خاص خود دریافت کنید.',
    getStarted: 'شروع کنید',
    browseResourcesTitle: 'مرور منابع',
    browseResourcesDescription: 'دایرکتوری جامع خدمات، سازمان‌ها و منابع ما را که بر اساس دسته‌بندی سازماندهی شده‌اند، کاوش کنید.',
    exploreDirectory: 'کاوش دایرکتوری',
    askBridgetTitle: 'از BRIDGIT بپرسید',
    askBridgetDescription: 'پاسخ‌های فوری به سوالات خود را از دستیار هوش مصنوعی ما دریافت کنید. ۲۴/۷ به زبان مورد نظر شما در دسترس است.',
    startChatting: 'شروع گفتگو',
    saveProgressQuestion: 'می‌خواهید پیشرفت خود را ذخیره کنید و به ویژگی‌های شخصی‌سازی شده دسترسی داشته باشید؟',
    signIn: 'ورود',
    createAccount: 'ایجاد حساب',
    servicesNote: 'همه خدمات کاملاً رایگان، کاملاً محرمانه و به بیش از ۱۶ زبان از جمله انگلیسی، اسپانیایی، عربی، فرانسوی، چینی و سواحیلی در دسترس است.',
    
    // Trust badges
    hundredPercentFree: '۱۰۰٪ رایگان',
    privateSecure: 'خصوصی و امن',
    multilingualSupport: 'پشتیبانی چندزبانه',
    languagesSupported: 'پشتیبانی از بیش از ۱۶ زبان از جمله اسپانیایی، عربی، فرانسوی، ماندارین و سواحیلی.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'حالت نمایشی',
    demoModeDescription: 'پیونیر پیتسبورگ فردا را با پروفایل‌های کاربری مختلف امتحان کنید تا ببینید تجربه چگونه با نیازهای شما سازگار می‌شود',
    whatYouExperience: 'آنچه تجربه خواهید کرد',
    immigrantUser: 'کاربر مهاجر',
    immigrantFeatures: {
      emergency: 'منابع اضطراری در اولویت',
      multilingual: 'پشتیبانی چندزبانه',
      settlement: 'محتوای متمرکز بر اسکان',
    },
    studentUser: 'کاربر دانشجو',
    studentFeatures: {
      academic: 'منابع آکادمیک',
      campus: 'اطلاعات خاص پردیس',
      career: 'راهنمایی شغلی',
    },
    professionalUser: 'کاربر حرفه‌ای',
    professionalFeatures: {
      networking: 'شبکه‌سازی صنعتی',
      services: 'خدمات حرفه‌ای',
      advancement: 'پیشرفت شغلی',
    },
    localHelper: 'کمک‌کننده محلی',
    localFeatures: {
      community: 'منابع جامعه',
      volunteer: 'فرصت‌های داوطلبانه',
      support: 'شبکه‌های پشتیبانی',
    },
    signIn: 'ورود',
    
    // Authentication required page
    authenticationRequired: 'احراز هویت مورد نیاز',
    loginToAccessPage: 'برای دسترسی به این صفحه باید وارد شوید.',
    
    // Login page
    emailVerified: 'ایمیل تأیید شد',
    emailVerifiedDescription: 'ایمیل شما با موفقیت تأیید شد.',
    alreadySignedIn: 'قبلاً وارد شده‌اید',
    redirectingToDashboard: 'در حال هدایت شما به داشبورد...',
    signInDescription: 'وارد شوید تا به منابع و توصیه‌های شخصی‌سازی شده پیتسبورگ خود دسترسی داشته باشید.',
    signInWithAuth0: 'ورود',
    signInHelp: 'در ورود مشکل دارید؟ برای کمک با پشتیبانی تماس بگیرید.',
    loginError: 'خطای ورود',
    loginErrorDescription: 'مشکلی در ورود شما پیش آمد. لطفاً دوباره تلاش کنید.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'حساب‌های نمایشی را امتحان کنید',
    experienceDifferentPerspectives: 'پیونیر پیتسبورگ فردا را از دیدگاه‌های مختلف کاربری تجربه کنید',
    email: 'ایمیل:',
    password: 'رمز عبور:',
    loginAs: 'ورود به عنوان کاربر {{role}}',
    demoTip: 'این حساب‌های نمایشی تجربیات مختلف کاربری و محتوای شخصی‌سازی شده را نشان می‌دهند',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'در حال فکر کردن...',
    curatingRecommendations: 'در حال گردآوری توصیه‌های شخصی‌سازی شده...',
    findingResources: 'در حال یافتن بهترین منابع...',
    complete: 'تکمیل شد!',
    creatingYourPlan: 'در حال ایجاد برنامه شخصی‌سازی شده شما',
    ready: 'آماده!',
    mayTakeAMoment: 'این ممکن است کمی طول بکشد زیرا ما تجربه شما را شخصی‌سازی می‌کنیم...',
    seeMyRecommendations: 'توصیه‌های من را ببینید',
    loadingHint: 'این ممکن است کمی طول بکشد زیرا ما تجربه شما را شخصی‌سازی می‌کنیم...',
  },
  
  // Screening page
  screening: {
    title: 'درباره خودتان به ما بگویید',
    description: 'به چند سوال سریع پاسخ دهید تا بتوانیم راهنمای شخصی‌سازی شده شما را برای زندگی و پیشرفت در پیتسبورگ ایجاد کنیم.',
    saveRoadmapBanner: 'نقشه راه شخصی‌سازی شده خود را با ایجاد حساب ذخیره کنید. می‌توانید اکنون به صورت ناشناس نظرسنجی را انجام دهید و بعداً وارد شوید تا آن را ذخیره کنید.',
    
    // Progress indicator
    progress: 'پیشرفت',
    completed: '{{count}} از {{total}} تکمیل شد',
    
    // Questions
    questions: {
      audience: {
        question: 'کدام یک وضعیت شما را بهتر توصیف می‌کند؟',
        options: [
          'دانشجو/حرفه‌ای (در حال تحصیل در دانشگاه منطقه پیتسبورگ یا کار برای یک سازمان)',
          'بومرنگ (قبلاً اینجا زندگی می‌کردم، نقل مکان کردم و اکنون به منطقه پیتسبورگ برگشته‌ام)',
          'پناهنده یا وضعیت حفاظت موقت (تازه اینجا اسکان داده شده‌ام یا از شهر دیگری به اینجا نقل مکان کرده‌ام)',
          'انتقالی (از شهر دیگری در ایالات متحده به پیتسبورگ نقل مکان می‌کنم)',
          'کارآفرین (در حال ساخت کسب‌وکار خودم)',
          'کارمند دورکار',
          'سایر',
        ],
      },
      primaryLanguage: {
        question: 'زبان اصلی شما چیست؟',
        options: [
          'انگلیسی (بومی/مسلط)',
          'اسپانیایی (Español)',
          'عربی (العربية)',
          'سواحیلی (Kiswahili)',
          'ازبکی (Oʻzbekcha)',
          'نپالی/بوتانی (नेपाली / རྫོང་ཁ)',
          'دری/پشتو (دری / پښتو)',
          'چینی ماندارین (中文)',
          'سایر',
        ],
      },
      culturalBackground: {
        question: 'کدام پیشینه فرهنگی یا منطقه‌ای شما را بهتر توصیف می‌کند؟',
        options: [
          'سفید',
          'سیاه یا آفریقایی آمریکایی (شامل تبار آفریقایی و کارائیبی)',
          'هیسپانیک یا لاتینو/آ/ایکس',
          'آسیایی (مثلاً چینی، هندی، ویتنامی)',
          'خاورمیانه یا آفریقای شمالی',
          'هاوایی بومی یا جزیره‌نشین اقیانوس آرام',
          'سرخپوست آمریکایی یا آلاسکا بومی',
          'آفریقایی (مثلاً نیجریه‌ای، اتیوپیایی، غنایی و غیره)',
          'کارائیبی (مثلاً جامائیکایی، هائیتی، ترینیداد و غیره)',
          'سایر',
          'ترجیح می‌دهم پاسخ ندهم',
        ],
      },
      housingNeed: {
        question: 'چه نوع پشتیبانی مسکنی نیاز دارید؟',
        options: [
          'کمک در یافتن محله‌ها و آپارتمان‌های با نرخ بازار',
          'کمک مسکن مقرون‌به‌صرفه و برنامه‌ها',
          'مسکن موقت/اضطراری',
          'مسکن مشترک/تطبیق هم‌اتاقی',
          'کمک برای خرید خانه',
          'مسکن من تأمین شده است',
        ],
      },
      professionalStatus: {
        question: 'وضعیت حرفه‌ای فعلی شما چیست؟',
        options: [
          'دانشجو (کارشناسی/کارشناسی ارشد/مدرسه فنی)',
          'حرفه‌ای فناوری/مهندس',
          'حرفه‌ای مراقبت‌های بهداشتی/علوم زیستی',
          'آکادمیک/محقق',
          'در جستجوی شغل',
          'فارغ‌التحصیل اخیر در جستجوی کار',
          'حرفه‌ای دیگر',
        ],
      },
      languageSupport: {
        question: 'چه پشتیبانی زبانی مفید خواهد بود؟',
        options: [
          'کلاس‌های انگلیسی (ESL) - مبتدی تا متوسط',
          'مهارت‌های ارتباطی انگلیسی حرفه‌ای',
          'خدمات ترجمه اسناد',
          'تمرین انگلیسی مکالمه‌ای',
          'پشتیبانی زبانی نیاز نیست',
        ],
      },
      employment: {
        question: 'چه پشتیبانی شغلی مورد علاقه شماست؟',
        options: [
          'شبکه‌سازی حرفه‌ای و پیشرفت شغلی',
          'کمک جستجوی شغل و کمک رزومه',
          'برنامه‌های آموزش مهارت و گواهینامه',
          'شبکه‌سازی خاص صنعت (فناوری، مراقبت‌های بهداشتی و غیره)',
          'پشتیبانی شغلی نیاز نیست، متشکرم',
        ],
      },
      communityPriorities: {
        question: 'کدام ارتباطات اجتماعی برای شما مهم‌تر است؟ (همه موارد اعمال را انتخاب کنید)',
        options: [
          'شبکه‌های حرفه‌ای و گردهمایی‌های صنعتی',
          'جوامع فرهنگی و مبتنی بر ایمان',
          'فعالیت‌های اجتماعی و سرگرمی',
          'خدمات خانواده و کودکان',
          'فعالیت‌های ورزشی و تفریحی',
          'رویدادهای هنری و فرهنگی',
          'هیچکدام از این موارد',
        ],
      },
      immediateNeeds: {
        question: 'فوری‌ترین نیازهای شما چیست؟ (همه موارد اعمال را انتخاب کنید)',
        options: [
          'ملاقات با مردم و دوست‌یابی',
          'خدمات پایه (مراقبت‌های بهداشتی، بانکداری، حمل‌ونقل)',
          'ثبت‌نام مدرسه برای کودکان',
          'کمک حقوقی/مهاجرت',
          'پشتیبانی سلامت روان و تندرستی',
          'کمک اضطراری (غذا، سرپناه)',
          'هیچکدام از این موارد',
        ],
      },
      timeline: {
        question: 'زمان‌بندی شما برای اسکان در منطقه پیتسبورگ چیست؟',
        options: [
          'تازه رسیده‌ام (در ماه گذشته)',
          'اخیراً رسیده‌ام (۱-۶ ماه)',
          'قصد دارم به زودی برسم (۳ ماه آینده)',
          'برنامه‌ریزی بلندمدت (۶+ ماه)',
          'قبلاً در منطقه پیتسبورگ مستقر شده‌ام',
        ],
      },
    },
    
    // Form messages
    pleaseAnswer: 'لطفاً به این سوال پاسخ دهید.',
    pleaseAnswerAll: 'لطفاً به همه سوالات پاسخ دهید تا ادامه دهید',
    creatingGuide: 'در حال ایجاد راهنمای شما...',
    seePersonalizedGuide: 'راهنمای شخصی‌سازی شده من را ببینید',
    screeningQuestionnaire: 'پرسشنامه غربالگری',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'جعبه ابزار تازه‌وارد',
    description: 'منابع و پشتیبانی مورد نیاز خود را برای اسکان و پیشرفت در پیتسبورگ پیدا کنید',
    categories: {
      housingAssistance: 'کمک مسکن',
      foodAssistance: 'کمک غذایی',
      entrepreneurHiringHub: 'مرکز کارآفرینی و استخدام',
      youthAdultEducation: 'منابع آموزش جوانان و بزرگسالان',
      eslImmigrantConnection: 'خدمات ارتباط ESL و مهاجر',
      socialConnectionCulture: 'ارتباط اجتماعی و فرهنگ',
    },
    chat: {
      bridgitTitle: 'گفتگو با BRIDGIT',
      bridgitDescription: 'کمک و راهنمایی شخصی‌سازی شده برای سفر خود دریافت کنید',
    },
  },

  // Resource search
  resources: {
    title: 'یافتن منابع',
    searchPlaceholder: 'جستجوی منابع...',
    allCategories: 'همه دسته‌بندی‌ها',
    housing: 'مسکن',
    educationESL: 'آموزش / ESL',
    socialNetworking: 'اجتماعی / شبکه‌سازی',
    noResourcesFound: 'هیچ منبعی مطابق با جستجو یا فیلترهای شما یافت نشد.',
    backToAllCategories: 'بازگشت به همه دسته‌بندی‌ها',
    backToCategory: 'بازگشت به {{category}}',
    welcomeToCategory: 'خوش آمدید به {{category}}',
    categoryDescription: {
      housing: 'پشتیبانی مسکن، کمک اجاره و منابع محله را پیدا کنید',
      foodAssistance: 'بانک‌های غذایی، برنامه‌های وعده غذایی و کمک تغذیه را پیدا کنید',
      entrepreneurHiring: 'منابع کسب‌وکار، فرصت‌های شغلی و پشتیبانی استخدام را کشف کنید',
      youthEducation: 'به برنامه‌های آموزشی، تدریس خصوصی و منابع یادگیری دسترسی داشته باشید',
      eslImmigrant: 'با کلاس‌های انگلیسی، خدمات مهاجرت و پشتیبانی فرهنگی ارتباط برقرار کنید',
      socialConnection: 'به گروه‌های اجتماعی، رویدادهای فرهنگی و فعالیت‌های اجتماعی بپیوندید',
    },
    refreshBookmarks: 'تازه‌سازی نشان‌گذاری‌ها (اشکال‌زدایی)',
    compare: 'مقایسه ({{count}}/۳)',
    filterByLanguage: 'فیلتر بر اساس زبان:',
    showingResults: 'نمایش {{current}} از {{total}} منبع',
    categoryTitles: {
      housingProcess: 'فرآیند مسکن در پیتسبورگ',
      housingProcessDescription: 'درباره فرآیند و الزامات جستجوی مسکن بیاموزید',
    },
    exploreResources: 'کاوش منابع',
    categoryNotFound: 'دسته‌بندی یافت نشد',
    subcategoryNotFound: 'زیردسته یافت نشد',
    clearFilters: 'پاک کردن فیلترها',
    showingResultsFor: 'برای',
    showingResultsIn: 'در',
    compareSelected: 'مقایسه انتخاب شده',
    noResourcesFoundCategory: 'هیچ منبعی برای این دسته‌بندی یافت نشد.',
    browseSubcategoryDescription: 'منابع در این زیردسته را مرور کنید.',
    
    // Global search
    globalSearch: {
      placeholder: 'جستجوی همه منابع...',
      button: 'جستجو',
    },
    searchResults: {
      title: 'نتایج جستجو',
      for: 'برای',
      noResults: 'هیچ منبعی مطابق با جستجوی شما یافت نشد.',
      tryDifferent: 'یک عبارت جستجوی متفاوت امتحان کنید.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'خوش آمدید به',
      subcategories: {
        // Housing subcategories
        housingProcess: 'فرآیند مسکن در پیتسبورگ',
        housingProcessDesc: 'درباره فرآیند و الزامات جستجوی مسکن بیاموزید',
        neighborhoodResources: 'منابع محله و املاک',
        neighborhoodResourcesDesc: 'محله‌ها و اطلاعات املاک را کشف کنید',
        housingAssistanceSubcat: 'کمک مسکن',
        housingAssistanceSubcatDesc: 'کمک مستقیم اجاره و خدمات پشتیبانی مسکن',
        
        // Food subcategories
        culturalFood: 'مرکز غذای فرهنگی',
        culturalFoodDesc: 'بازارهای بین‌المللی و منابع غذای فرهنگی',
        foodPantries: 'انبارهای غذایی',
        foodPantriesDesc: 'کمک غذایی اضطراری و انبارها',
        groceryGuide: 'راهنمای فروشگاه مواد غذایی',
        groceryGuideDesc: 'فروشگاه‌های مواد غذایی محلی و کمک خرید',
        
        // Employment subcategories
        hiringHub: 'آیا شما یک مهاجر یا تازه‌وارد در جستجوی کار هستید؟',
        hiringHubDesc: 'مرکز استخدام ما را بررسی کنید!',
        entrepreneurship: 'منابع کارآفرینی در پیتسبورگ',
        entrepreneurshipDesc: 'منابع توسعه کسب‌وکار و استارتاپ',
        
        // Education subcategories
        schoolResources: 'به دنبال منابع برای یافتن مدرسه جدید هستید؟',
        schoolResourcesDesc: 'ثبت‌نام مدرسه و منابع آموزشی',
        tutoring: 'به دنبال آماده‌سازی کالج یا معلم خصوصی هستید؟',
        tutoringDesc: 'خدمات تدریس خصوصی و آماده‌سازی کالج',
        gedResources: 'می‌خواهید GED خود را دریافت کنید؟',
        gedResourcesDesc: 'آماده‌سازی GED و آموزش بزرگسالان',
        
        // ESL & Immigration subcategories
        eslResources: 'به دنبال منابع ESL هستید؟',
        eslResourcesDesc: 'یادگیری زبان انگلیسی و کلاس‌ها',
        documentation: 'کمک مستندات',
        documentationDesc: 'کاغذبازی مهاجرت و پشتیبانی حقوقی',
        basicNeeds: 'کمک نیازهای اولیه',
        basicNeedsDesc: 'خدمات ضروری و پشتیبانی اضطراری',
        
        // Social subcategories
        fosterConnection: 'منابع برای تقویت ارتباط',
        fosterConnectionDesc: 'گروه‌های اجتماعی و ساخت جامعه',
        culturalResourcesSocial: 'منابع غذایی و فرهنگی',
        culturalResourcesSocialDesc: 'رویدادهای فرهنگی و سنت‌های غذایی',
        faithGroups: 'گروه‌های مبتنی بر ایمان',
        faithGroupsDesc: 'جوامع مذهبی و پشتیبانی معنوی',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'جامعه و تعلق',
          'culture-leisure': 'فرهنگ، هنر و سرگرمی',
        'esl-immigrant': 'پشتیبانی ESL و مهاجر',
          'education-youth': 'آموزش: بزرگسال و جوان',
        'living-essentials': 'ضروریات زندگی',
          'work-business': 'منابع شغل و کسب‌وکار',
      },
      categoryDescriptions: {
        'community-belonging': 'در پیتسبورگ ارتباط برقرار کنید، مشارکت کنید و جامعه بسازید',
          'culture-leisure': 'هنر، فعالیت‌های خانوادگی، سرگرمی‌ها و شب‌زندگی را کاوش کنید',
        'esl-immigrant': 'یادگیری زبان، کمک مهاجرت و خدمات تازه‌وارد',
          'education-youth': 'یادگیری بزرگسالان، تدریس خصوصی و فرصت‌های جوانان',
          'living-essentials': 'مسکن، سلامت، حمل‌ونقل و غذا',
          'work-business': 'شغل، پشتیبانی شغلی و منابع کسب‌وکار',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'دولت',
        'civic-advocacy': 'مدافع محلی',
        'civic-volunteer': 'داوطلب',
        'civic-youth': 'مشارکت جوانان',
        religion: 'دین',
        'social-connection': 'ارتباط اجتماعی',

        // Culture & Leisure
        art: 'هنر',
        family: 'تفریح خانوادگی',
        'beauty-hair': 'مراقبت از مو / زیبایی',
        'hobby-spaces': 'فضاهای سرگرمی',
        'night-life': 'شب‌زندگی',

        // ESL & Immigrant Support
        'esl-support': 'پشتیبانی زبان انگلیسی به عنوان زبان دوم (ESL)',
        'general-law': 'قانون عمومی',
        'immigration-asylum': 'مهاجرت / پناهندگی',
        'refugee-immigrant-support': 'پشتیبانی پناهنده / مهاجر',

        // Education & Youth
        'adult-education': 'آموزش بزرگسالان',
        'college-prep-tutoring': 'آماده‌سازی کالج / تدریس خصوصی',
        'youth-education': 'آموزش جوانان',
        'youth-programming': 'برنامه‌ریزی جوانان',

        // Living Essentials
        'food-pantries': 'انبارهای غذایی',
        'grocery-guide': 'راهنمای فروشگاه مواد غذایی',
        'specialty-stores': 'فروشگاه‌های تخصصی',
        'guide-discover-pittsburgh': 'کشف پیتسبورگ',
        'guide-diverse-businesses': 'کسب‌وکارهای متنوع',
        'guide-immigrant-services': 'خدمات مهاجر',
        'health-additional-support': 'پشتیبانی اضافی',
        'health-body-mind': 'مراقبت از بدن و ذهن',
        'health-hospitals': 'بیمارستان‌ها',
        'health-nutrition': 'تغذیه',
        'health-senior-care': 'مراقبت از سالمندان',
        'housing-buying-home': 'خرید خانه',
        'housing-assistance': 'کمک مسکن',
        'housing-relocating': 'نقل مکان به پیتسبورگ',
        'housing-rent': 'اجاره',
        transportation: 'حمل‌ونقل',

        // Work & Business
        'business-development': 'توسعه کسب‌وکار',
        'business-support': 'پشتیبانی کسب‌وکار',
        'career-support': 'پشتیبانی شغلی',
        'internship-opportunities': 'فرصت‌های کارآموزی',
      },
      groups: {
        'civic-engagement': 'مشارکت مدنی',
        legal: 'حقوقی',
        food: 'غذا',
        'pittsburgh-guides': 'راهنماهای پیتسبورگ',
        health: 'سلامت',
        housing: 'مسکن',
        transit: 'حمل‌ونقل',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'در حال بارگذاری فهرست شخصی‌سازی شده شما...',
  },
  
  // About page
  about: {
    title: 'درباره پیونیر پیتسبورگ فردا',
    description: 'پیونیر پیتسبورگ فردا راهنمای دوستانه شما برای اسکان در پیتسبورگ و شهرستان الگینی است. چه یک حرفه‌ای فناوری باشید و چه یک تازه‌وارد در جستجوی شروع تازه، پیونیر پیتسبورگ فردا شما را به منابع محلی برای مسکن، آموزش، اشتغال و جامعه متصل می‌کند.',
    features: [
      'بیش از ۱۶۱ سازمان غیرانتفاعی',
      'فهرست‌ها و نقشه‌های راه شخصی‌سازی شده',
      'پشتیبانی از تازه‌واردان مهاجر مستقل و سنتی',
      'غربالگری آسان برای تطبیق با نیازهای شما',
    ],
    conclusion: 'این پروژه همکاری شرکای محلی و داوطلبان است که به استقبال، پشتیبانی و پر از فرصت برای همه در پیتسبورگ اختصاص دارد.',
    copyright: 'پیونیر پیتسبورگ فردا. تمامی حقوق محفوظ است.',
    
    // AboutPage specific content
    welcomeText: 'به پیونیر پیتسبورگ فردا خوش آمدید، راهنمای شخصی شما برای شروع زندگی جدید در پیتسبورگ و شهرستان الگینی. چه تازه به ایالات متحده رسیده‌اید و چه شغل جدیدی در یکی از شرکت‌های در حال رشد پیتسبورگ در انرژی، رباتیک، هوش مصنوعی، علوم زیستی یا فولاد گرفته‌اید — پیونیر پیتسبورگ فردا اینجاست تا کمک کند. از یافتن مسکن تا ثبت‌نام کودکان در مدرسه، از یافتن کلاس‌های انگلیسی تا ارتباط با جوامع ایمان یا پشتیبانی غذایی محلی، پیونیر پیتسبورگ فردا منابع مورد نیاز شما را در یک مکان گرد هم می‌آورد.',
    
    whyPioneerTitle: 'چرا پیونیر پیتسبورگ فردا؟',
    whyPioneerText1: 'زیرا شروع تازه در یک شهر جدید نباید به معنای شروع از صفر باشد.',
    whyPioneerText2: 'پیونیر پیتسبورگ فردا همه آنچه را که برای شروع زندگی جدید در پیتسبورگ و شهرستان الگینی نیاز دارید — همه در یک مکان قابل اعتماد و آسان برای استفاده — گرد هم می‌آورد.',
    whyPioneerText3: 'رایگان، جامع و طراحی شده برای صرفه‌جویی ساعت‌ها جستجو، مقایسه و تردید. چه در حال یافتن مسکن باشید، چه ثبت‌نام کودکان در مدرسه، یادگیری انگلیسی، یا جستجوی ملاقات با افرادی که ایمان، زبان یا علایق شما را به اشتراک می‌گذارند — پیونیر پیتسبورگ فردا اطمینان می‌دهد که هیچ فرصتی را برای هموارتر کردن نقل مکان و غنی‌تر کردن زندگی جدید خود از دست ندهید.',
    whyPioneerText4: 'جایی که جستجوی گوگل همه چیز را به شما نشان می‌دهد، پیونیر پیتسبورگ فردا دقیقاً آنچه مهم است را نشان می‌دهد.',
    whyPioneerText5: 'جایی که یک ربات چت هوش مصنوعی پاسخ می‌دهد، پیونیر به شما یک نقشه راه می‌دهد.',
    whyPioneerText6: 'جایی که بیشتر ابزارهای نقل مکان در لجستیک متوقف می‌شوند، پیونیر با جامعه شروع می‌کند.',
    whyPioneerText7: 'این پیتسبورگ است، شخصی‌سازی شده.',
    
    youAreThePioneerTitle: 'شما پیونیر هستید',
    youAreThePioneerText1: 'شما فقط نقل مکان نمی‌کنید — شما چیزی جدید را شروع می‌کنید. یک شغل جدید. یک مدرسه جدید. یک خانه جدید. و شاید حتی یک زبان یا فرهنگ جدید. این شجاعت می‌خواهد.',
    youAreThePioneerText2: 'ما پیونیر پیتسبورگ فردا را برای پشتیبانی از شما ساختیم — زیرا شما پیونیر هستید. این سایت اینجاست تا در کنار شما قدم بزند در حالی که آینده‌ای در پیتسبورگ می‌سازید.',
    
    howPioneerHelpsTitle: 'پیونیر پیتسبورگ فردا چگونه کمک می‌کند',
    
    madeForYouTitle: 'ساخته شده برای شما — از هر کجا که هستید',
    madeForYouDescription: 'ما می‌دانیم که همه انگلیسی را به عنوان زبان اول خود صحبت نمی‌کنند. به همین دلیل است که پیونیر پیتسبورگ فردا از ده‌ها زبان جهانی از جمله اسپانیایی، عربی، فرانسوی، چینی، فارسی و بیشتر پشتیبانی می‌کند. اگر به زبان مادری خود تایپ کنید، پیونیر پیتسبورگ فردا به همان شکل پاسخ خواهد داد.',
    
    personalRoadmapTitle: 'نقشه راه شخصی خود را ایجاد کنید',
    personalRoadmapDescription: 'قدرتمندترین ابزار ما نقشه راه شخصی‌سازی شده شماست — یک فهرست که فقط برای شما ساخته شده است. با پاسخ به چند سوال ساده درباره نیازهای شما (مسکن، غذا، شغل، آموزش و غیره)، پیونیر پیتسبورگ فردا یک برنامه عملی سفارشی برای پشتیبانی از مراحل بعدی شما ایجاد می‌کند. شما می‌توانید:',
    personalRoadmapFeatures: [
      'نقشه راه خود را در هر زمان مشاهده و به‌روزرسانی کنید',
      'پیشرفت خود را با ورود ذخیره کنید (اختیاری)',
      'فهرست خود را دانلود یا چاپ کنید تا همراه خود داشته باشید',
      'نقشه راه خود را با رشد زندگی شما در پیتسبورگ دوباره مرور و اصلاح کنید'
    ],
    personalRoadmapNote: 'اگر ترجیح می‌دهید با سرعت خود کاوش کنید، می‌توانید کتابخانه کامل منابع ما را بدون ورود مرور کنید.',
    
    smartSupportTitle: 'پشتیبانی هوشمند و خودراهنما',
    smartSupportDescription: 'پیونیر پیتسبورگ فردا دارای یک ربات چت هوش مصنوعی دوستانه است که برای پاسخ به صدها سوال رایج آموزش دیده است. می‌تواند شما را به منابع راهنمایی کند، نحوه کار سیستم‌های محلی را توضیح دهد و به شما کمک کند تا قدم بعدی را بردارید. همچنین یک دایرکتوری کامل از اطلاعات تماس برای شرکای قابل اعتماد ما — آژانس‌های عمومی، غیرانتفاعی، ارائه‌دهندگان خدمات و بیشتر — وجود دارد.',
    
    trustedPartnersTitle: 'شرکای قابل اعتماد',
    trustedPartnersDescription: 'به دایرکتوری کامل شرکای قابل اعتماد ما — آژانس‌های عمومی، غیرانتفاعی و ارائه‌دهندگان خدمات در سراسر پیتسبورگ و شهرستان الگینی دسترسی داشته باشید. شبکه ما شامل بیش از ۳۸۰ سازمان غیرانتفاعی است که آماده کمک به نیازهای خاص شما هستند.',
    
    privacyTitle: 'حریم خصوصی شما، محافظت شده',
    privacyDescription: 'حریم خصوصی و امنیت شما برای ما مهم است. اگر انتخاب کنید که حساب ایجاد کنید، داده‌های شخصی شما توسط پروتکل‌های امنیتی مطابق با SOC II محافظت می‌شوند. ما هرگز داده‌های شما را نمی‌فروشیم یا به اشتراک نمی‌گذاریم. شما در تمام زمان‌ها کنترل کامل اطلاعات خود را دارید.',
    
    pittsburghTomorrowTitle: 'درباره پیتسبورگ فردا',
    pittsburghTomorrowText1: 'پیونیر پیتسبورگ فردا یک ابتکار از پیتسبورگ فردا است، یک سازمان غیرانتفاعی با مأموریت رشد پیتسبورگ. ما روح جدیدی را که آنچه مورخ دیوید مک‌کالو "شهر ضروری آمریکا" نامید را دوباره تعریف می‌کند، کاتالیز می‌کنیم.',
    pittsburghTomorrowText2: 'منطقه‌ای که آمریکا را از پایه ساخت، با یک حیات و روح مدنی جدید در حال رشد است: استقبال از تازه‌واردان، راه‌اندازی کارآفرینان و گشودن مسیرهای جدید. جنبش ما توسط موج جدیدی از پیشگامان، پیشگامان و ریسک‌پذیرانی که فرصت را در دست می‌گیرند و آینده را می‌سازند — در پیتسبورگ — قدرت می‌گیرد.',
    pittsburghTomorrowText3: 'در پیتسبورگ فردا، ما در مأموریت رشد پیتسبورگ هستیم. و این فقط به معنای رشد جمعیت یا اقتصادی نیست؛ به معنای احیای روح شهر ماست. پشتیبانی از کسب‌وکارهای کوچک و کارآفرینان. زیباسازی و حفظ محیط ما. ترویج هنر و فرهنگ. استقبال از تازه‌واردان و ایجاد جامعه. افتخار به شهرمان و بازگرداندن آن به نقشه.',
    pittsburghTomorrowLink: 'بیشتر بیاموزید',
    
    // Call to action section
    readyToStartTitle: 'سفر خود را در پیتسبورگ شروع کنید',
    readyToStartDescription: 'نقشه راه شخصی‌سازی شده خود را بسازید تا به شما کمک کند در خانه جدید خود اسکان یابید و پیشرفت کنید.',
    getStarted: 'شروع کنید',
    browseResources: 'مرور منابع',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'بازگشت به درباره',
    title: 'شفافیت داده و بیانیه حریم خصوصی',
    description: 'در پیتسبورگ فردا، ما به شفافیت و اعتماد شما ارزش می‌دهیم. ما معتقدیم که شما حق دارید دقیقاً بدانید چرا ما اطلاعات خاصی را می‌پرسیم، چگونه از آن استفاده می‌کنیم و چگونه به شما سود می‌رساند.',
    
    whyWeAskTitle: 'چرا این سوالات را می‌پرسیم و چگونه از اطلاعات شما استفاده می‌کنیم:',
    whyWeAskDescription: 'سوالاتی که می‌پرسیم برای کمک به ایجاد یک نقشه راه سفارشی برای شما طراحی شده‌اند. پاسخ‌های شما به ما اجازه می‌دهد:',
    whyWeAskBullet1: 'منابع و اطلاعات مرتبط را از پایگاه داده ما متناسب با نیازهای شما استخراج کنیم.',
    whyWeAskBullet2: 'اطمینان حاصل کنیم که به طور عادلانه در جوامع و پیشینه‌ها به مردم دسترسی داریم.',
    whyWeAskBullet3: 'شکاف‌ها در کسانی که خدمت می‌کنیم را شناسایی کنیم تا بتوانیم بهتر به کسانی که ممکن است از دست رفته باشند دسترسی پیدا کنیم.',
    whyWeAskBullet4: 'ابزارهای هوش مصنوعی خود را بهبود بخشیم تا بهتر بتوانند به همه کاربران به طور مؤثر خدمت کنند.',
    weDoNotSell: 'ما داده‌های شما را نمی‌فروشیم. ما آن را صرفاً برای اهداف ذکر شده در بالا استفاده می‌کنیم.',
    
    dataRetentionTitle: 'نگهداری داده:',
    dataRetentionDescription: 'ما اطلاعات شما را در پایگاه داده خود نگه می‌داریم تا زمانی که به ما اطلاع دهید که دیگر نمی‌خواهید به داشبورد سفارشی خود دسترسی داشته باشید. پس از آن، داده‌های شما ناشناس می‌شوند و فقط برای بهبود خدمات هوش مصنوعی ما برای کمک به سایر تازه‌واردان به پیتسبورگ استفاده می‌شوند.',
    
    quomeTitle: 'Quome چگونه از داده‌های شما استفاده می‌کند:',
    quomeDescription: 'سایت ما توسط Quome میزبانی می‌شود که ممکن است داده‌های خاصی را برای عملکرد و بهبود پلتفرم جمع‌آوری کند. می‌توانید با بررسی',
    
    skillBuilderTitle: 'Skill Builder چگونه از داده‌های شما استفاده می‌کند:',
    skillBuilderDescription: 'ربات چت سایت ما توسط SkillBuilder.io میزبانی می‌شود که ممکن است داده‌های خاصی را برای عملکرد و بهبود پلتفرم جمع‌آوری کند. می‌توانید با بررسی',
    
    contactDescription: 'اگر سوالی در مورد استفاده از داده یا شیوه‌های حریم خصوصی ما دارید، لطفاً از دکمه بازخورد در سمت راست هر صفحه برای تماس با ما استفاده کنید.',
    privacyPolicyLink: 'سیاست حریم خصوصی'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'درباره پیونیر پیتسبورگ فردا',
    aboutDescription: 'پیونیر پیتسبورگ فردا به تازه‌واردان به پیتسبورگ و شهرستان الگینی کمک می‌کند تا مسیر خود را پیدا کنند. ما شما را به منابع و فرصت‌های مناسب متصل می‌کنیم، مهم نیست سفر شما چیست.',
    quickLinks: 'لینک‌های سریع',
    home: 'خانه',
    about: 'درباره',
    resources: 'منابع',
    privacyPolicy: 'سیاست حریم خصوصی',
    getStarted: 'شروع کنید',
    contact: 'تماس',
    location: 'سلام از پیتسبورگ، پنسیلوانیا',
    email: 'ایمیل: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'خوش آمدید، {{name}}!',
    welcomeStudent: 'خوش برگشتید، {{name}}!',
    welcomeProfessional: 'خوش آمدید، {{name}}!',
    welcomeLocal: 'سلام {{name}}!',
    
    subtitleImmigrant: 'سفر اسکان شما از اینجا شروع می‌شود',
    subtitleStudent: 'موفقیت آکادمیک شما اولویت ماست',
    subtitleProfessional: 'رشد شغلی شما تمرکز ماست',
    subtitleLocal: 'کمک کنید پیتسبورگ برای همه خوش‌آمد باشد',
    
    demoUserNote: 'شما پیونیر پیتسبورگ فردا را به عنوان کاربر **{{role}}** مشاهده می‌کنید. تجربه برای نقش شما شخصی‌سازی شده است.',
    userBadge: 'کاربر {{role}}',
    
    urgentResources: 'منابع فوری',
    
    // Resource categories
    emergencyServices: 'خدمات اضطراری',
    emergencyDescription: 'پشتیبانی بحران ۲۴/۷ و کمک فوری',
    temporaryHousing: 'مسکن موقت',
    temporaryHousingDescription: 'برنامه‌های کمک سرپناه و مسکن',
    healthcareAccess: 'دسترسی به مراقبت‌های بهداشتی',
    healthcareDescription: 'خدمات پزشکی و کمک بیمه سلامت',
    languageServices: 'خدمات زبانی',
    languageServicesDescription: 'پشتیبانی ترجمه و تفسیر',
    
    // Additional resource categories for other roles
    academicSupport: 'پشتیبانی آکادمیک',
    academicSupportDescription: 'تدریس خصوصی، گروه‌های مطالعه و منابع آکادمیک',
    studentHousing: 'مسکن دانشجویی',
    studentHousingDescription: 'گزینه‌های مسکن در پردیس و خارج از پردیس',
    financialAid: 'کمک مالی',
    financialAidDescription: 'بورسیه‌ها، کمک‌های مالی و کمک مالی',
    studentGroups: 'گروه‌های دانشجویی',
    studentGroupsDescription: 'سازمان‌ها و باشگاه‌های دانشجویان بین‌المللی',
    professionalNetworks: 'شبکه‌های حرفه‌ای',
    professionalNetworksDescription: 'گردهمایی‌های صنعتی و رویدادهای شبکه‌سازی',
    careerDevelopment: 'توسعه شغلی',
    careerDevelopmentDescription: 'برنامه‌های آموزش مهارت و گواهینامه',
    professionalHousing: 'مسکن حرفه‌ای',
    professionalHousingDescription: 'مسکن اجرایی و خدمات نقل مکان',
    mentorship: 'راهنمایی',
    mentorshipDescription: 'برنامه‌های راهنمایی و راهنمایی حرفه‌ای',
    volunteerOpportunities: 'فرصت‌های داوطلبانه',
    volunteerOpportunitiesDescription: 'راه‌های کمک به تازه‌واردان در جامعه شما',
    communityOrganizations: 'سازمان‌های جامعه',
    communityOrganizationsDescription: 'غیرانتفاعی‌های محلی و ارائه‌دهندگان خدمات',
    supportNetworks: 'شبکه‌های پشتیبانی',
    supportNetworksDescription: 'برنامه‌های راهنمایی و دوستی',
    culturalExchange: 'تبادل فرهنگی',
    culturalExchangeDescription: 'رویدادها و برنامه‌های بین‌فرهنگی',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'وارد شوید تا سفر شخصی‌سازی شده پیتسبورگ خود را کاوش کنید',
    signInToPioneer: 'وارد پیونیر پیتسبورگ فردا شوید',
    welcomeTitle: 'به پیونیر پیتسبورگ فردا خوش آمدید، {{name}}!',
    welcomeTitleWithoutName: 'به پیونیر پیتسبورگ فردا خوش آمدید!',
    journeyContinues: 'سفر شخصی‌سازی شده شما ادامه می‌یابد...',
    beginJourney: 'سفر شخصی‌سازی شده پیتسبورگ خود را شروع کنید',
    completedSurveyHeader: 'شما قبلاً نظرسنجی را تکمیل کرده‌اید',
    completedSurveyText: 'شما نظرسنجی پذیرش خود را تکمیل کردید. نقشه راه شخصی‌سازی شده خود را در زیر مشاهده کنید یا پاسخ‌های خود را ویرایش کنید تا توصیه‌های خود را به‌روزرسانی کنید.',
    completedSurveyTextWithDate: 'شما نظرسنجی پذیرش خود را در {{date}} تکمیل کردید. نقشه راه شخصی‌سازی شده خود را در زیر مشاهده کنید یا پاسخ‌های خود را ویرایش کنید تا توصیه‌های خود را به‌روزرسانی کنید.',
    editResponses: 'ویرایش پاسخ‌ها',
    viewMyRoadmap: 'نقشه راه من را ببینید',
    noteLabel: 'یادداشت:',
    editRegenerateNote: 'اگر پاسخ‌های نظرسنجی خود را ویرایش کنید، توصیه‌ها و نقشه راه شخصی‌سازی شده شما به طور خودکار برای تطبیق بهتر با ترجیحات به‌روزرسانی شده شما دوباره تولید می‌شوند.',
    bridgitHelp: 'سوالاتی دارید که در نظرسنجی پوشش داده نشده است؟ روی ربات چت BRIDGIT در پایین سمت راست کلیک کنید برای کمک شخصی‌سازی شده!',
    personalizedRoadmap: 'نقشه راه شخصی‌سازی شده شما',
    unlockExperience: 'تجربه سفارشی خود را باز کنید',
    completeSurveyHeader: 'نظرسنجی خود را تکمیل کنید تا شروع کنید',
    completeSurveyText: 'نظرسنجی سریع ۵ دقیقه‌ای ما را انجام دهید تا توصیه‌های منبع شخصی‌سازی شده متناسب با نیازها و اهداف خاص شما در پیتسبورگ دریافت کنید.',
  },
  
  // Profile page
  profile: {
    title: 'تنظیمات پروفایل',
    subtitle: 'اطلاعات شخصی و ترجیحات خود را مدیریت کنید',
    accountInformation: 'اطلاعات حساب',
    accountInformationDescription: 'جزئیات حساب پایه خود را به‌روزرسانی کنید',
    basicInformation: 'اطلاعات پایه',
    basicInformationDescription: 'جزئیات شخصی پایه خود را به‌روزرسانی کنید',
    firstName: 'نام',
    enterFirstName: 'نام خود را وارد کنید',
    lastName: 'نام خانوادگی',
    enterLastName: 'نام خانوادگی خود را وارد کنید',
    username: 'نام کاربری',
    enterUsername: 'نام کاربری خود را وارد کنید',
    email: 'ایمیل',
    emailChangeNote: 'ایمیل قابل تغییر نیست. اگر نیاز به به‌روزرسانی ایمیل خود دارید با پشتیبانی تماس بگیرید.',
    emailCannotBeChanged: 'ایمیل قابل تغییر نیست. اگر نیاز به به‌روزرسانی ایمیل خود دارید با پشتیبانی تماس بگیرید.',
    surveyRequired: 'ابتدا نظرسنجی خود را تکمیل کنید',
    surveyRequiredDescription: 'برای دریافت توصیه‌های شخصی‌سازی شده و ویرایش پاسخ‌های نظرسنجی خود، ابتدا باید نظرسنجی ارزیابی اولیه را تکمیل کنید.',
    takeSurvey: 'نظرسنجی را انجام دهید',
    basicQuestions: 'اطلاعات پایه',
    basicQuestionsDescription: 'درباره خود و وضعیت خود به ما بگویید تا توصیه‌های شخصی‌سازی شده دریافت کنید',
    selectPrimary: 'ترجیح اصلی خود را انتخاب کنید:',
    selectOption: 'یک گزینه را انتخاب کنید...',
    supportNeeds: 'پشتیبانی و نیازها',
    supportNeedsDescription: 'چه نوع پشتیبانی و خدماتی نیاز دارید؟',
    selectMultiple: 'همه موارد اعمال را انتخاب کنید:',
    selectAtLeastOne: 'لطفاً حداقل یک گزینه را انتخاب کنید.',
    timelinePreferences: 'زمان‌بندی و ترجیحات',
    timelinePreferencesDescription: 'زمان‌بندی و ترجیحات فناوری شما',
    backToDashboard: 'بازگشت به داشبورد',
    languageAndCultural: 'زبان و پیشینه فرهنگی',
    languageAndCulturalDescription: 'به ما کمک کنید تا توصیه‌های شخصی‌سازی شده بهتری ارائه دهیم',
    primaryLanguage: 'زبان اصلی',
    selectPrimaryLanguage: 'زبان اصلی خود را انتخاب کنید',
    culturalBackground: 'پیشینه فرهنگی',
    selectCulturalBackground: 'پیشینه فرهنگی خود را انتخاب کنید',
    professionalAndLiving: 'وضعیت حرفه‌ای و زندگی',
    professionalAndLivingDescription: 'این به ما کمک می‌کند تا منابع و خدمات مرتبط را توصیه کنیم',
    professionalStatus: 'وضعیت حرفه‌ای',
    selectProfessionalStatus: 'وضعیت حرفه‌ای خود را انتخاب کنید',
    housingSituation: 'وضعیت مسکن',
    selectHousingSituation: 'وضعیت مسکن خود را انتخاب کنید',
    familyStatus: 'وضعیت خانواده',
    selectFamilyStatus: 'وضعیت خانواده خود را انتخاب کنید',
    saveChanges: 'ذخیره تغییرات',
    saving: 'در حال ذخیره...',
    recalculatingRecommendations: 'در حال محاسبه مجدد توصیه‌ها...',
    profileUpdated: 'پروفایل به‌روزرسانی شد',
    profileUpdatedDescription: 'پروفایل شما با موفقیت به‌روزرسانی شد.',
    accountUpdated: 'حساب به‌روزرسانی شد',
    accountUpdatedDescription: 'اطلاعات حساب شما با موفقیت به‌روزرسانی شد. نظرسنجی را تکمیل کنید تا ترجیحات خود را ذخیره کنید.',
    updateFailed: 'به‌روزرسانی ناموفق',
    updateFailedDescription: 'به‌روزرسانی پروفایل ناموفق بود. لطفاً دوباره تلاش کنید.',
    pleaseLogIn: 'لطفاً برای مشاهده پروفایل خود وارد شوید.',
    
    // Language options
    languages: {
      english: 'انگلیسی',
      spanish: 'اسپانیایی',
      french: 'فرانسوی',
      arabic: 'عربی',
      chinese: 'چینی',
      swahili: 'سواحیلی',
      hindi: 'هندی',
      portuguese: 'پرتغالی',
      russian: 'روسی',
      nepali: 'نپالی',
      somali: 'سومالیایی',
      tagalog: 'تاگالوگ',
      turkish: 'ترکی',
      other: 'سایر',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'آمریکایی/غربی',
      westAfrican: 'آفریقای غربی',
      middleEasternNorthAfrican: 'خاورمیانه/آفریقای شمالی',
      southAsian: 'آسیای جنوبی (شامل بوتانی)',
      latinoHispanic: 'لاتینو/هیسپانیک',
      eastAsian: 'آسیای شرقی',
      easternEuropean: 'اروپای شرقی',
      other: 'سایر/ترجیح می‌دهم نگویم',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'دانشجو',
      graduateStudent: 'دانشجوی تحصیلات تکمیلی',
      softwareEngineer: 'مهندس نرم‌افزار',
      healthcareProfessional: 'حرفه‌ای مراقبت‌های بهداشتی',
      researchScientist: 'دانشمند محقق',
      seekingEmployment: 'در جستجوی شغل',
      employedFullTime: 'شاغل تمام وقت',
      employedPartTime: 'شاغل پاره وقت',
      selfEmployed: 'خویش‌فرما',
      retired: 'بازنشسته',
      other: 'سایر',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'مسکن موقت',
      campusHousing: 'مسکن پردیس',
      apartmentHunting: 'جستجوی آپارتمان',
      rentingApartment: 'اجاره آپارتمان',
      rentingHouse: 'اجاره خانه',
      homeowner: 'صاحب خانه',
      livingWithFamily: 'زندگی با خانواده',
      sharedHousing: 'مسکن مشترک',
      other: 'سایر',
    },
    
    // Family status options
    familyStatuses: {
      single: 'مجرد',
      married: 'متأهل',
      familyWithChildren: 'خانواده با کودکان',
      singleParent: 'والد تنها',
      extendedFamily: 'خانواده گسترده',
      other: 'سایر',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'چه چیزی شما را صدا کنیم؟',
    description: 'با گفتن نام خود به ما کمک کنید تا تجربه شما را شخصی‌سازی کنیم.',
    firstName: 'نام',
    firstNamePlaceholder: 'نام خود را وارد کنید',
    lastName: 'نام خانوادگی',
    lastNamePlaceholder: 'نام خانوادگی خود را وارد کنید (اختیاری)',
    skip: 'فعلاً رد شوید',
    save: 'ذخیره نام',
    saving: 'در حال ذخیره...',
    firstNameRequired: 'نام مورد نیاز است',
    firstNameRequiredDescription: 'لطفاً نام خود را وارد کنید تا ادامه دهید.',
    nameUpdated: 'نام به‌روزرسانی شد',
    nameUpdatedDescription: 'نام شما با موفقیت ذخیره شد.',
    updateFailed: 'به‌روزرسانی ناموفق',
    updateFailedDescription: 'به‌روزرسانی نام شما ناموفق بود. لطفاً دوباره تلاش کنید.',
  },
  
  // Common elements
  common: {
    dashboard: 'داشبورد',
    loading: 'در حال بارگذاری...',
    search: 'جستجو',
    filter: 'فیلتر',
    next: 'بعدی',
    previous: 'قبلی',
    save: 'ذخیره',
    cancel: 'لغو',
    confirm: 'تأیید',
    edit: 'ویرایش',
    delete: 'حذف',
    close: 'بستن',
    back: 'بازگشت',
    backToResources: 'بازگشت به منابع',
    viewDetails: 'مشاهده جزئیات',
    learnMore: 'بیشتر بیاموزید',
    getHelp: 'کمک بگیرید',
    startNow: 'اکنون شروع کنید',
    tryNow: 'اکنون امتحان کنید',
    downloadNow: 'اکنون دانلود کنید',
    visitWebsite: 'بازدید',
    shareThis: 'این را به اشتراک بگذارید',
    copied: 'کپی شد!',
    copy: 'کپی',
    show: 'نمایش',
    hide: 'پنهان',
    expand: 'گسترش',
    collapse: 'جمع کردن',
    seeMore: 'بیشتر ببینید',
    seeLess: 'کمتر ببینید',
    showingTopOf: 'نمایش {{current}} برتر از {{total}} منبع',
    selectLanguage: 'انتخاب زبان',
    personalizedRecommendationsLabel: 'توصیه‌های شخصی‌سازی شده',
    exploreResourcesNowLabel: 'اکنون منابع را کاوش کنید',
    curatedAdviceLabel: 'مشاوره انتخابی برای موفقیت',
    
    // Accessibility and UI labels
    toggleSidebar: 'تغییر داشبورد کناری',
    toggleMobileMenu: 'تغییر منوی موبایل',
    feedback: 'بازخورد',
    openInNewTab: 'باز کردن در تب جدید',
    removeBookmark: 'حذف نشان‌گذاری',
    editResource: 'ویرایش منبع',
    deleteResource: 'حذف منبع',
    dragToReorder: 'کشیدن برای مرتب‌سازی مجدد',
    saveOrPrintOptions: 'گزینه‌های ذخیره یا چاپ',
    filterByCategory: 'فیلتر بر اساس دسته‌بندی',
    openChatAssistant: 'باز کردن چت با دستیار هوش مصنوعی BRIDGIT',
    askBridget: 'از BRIDGIT بپرسید',
    bridgitComingSoonTitle: 'BRIDGIT: به زودی!',
    bridgitComingSoonDescription: 'دستیار هوش مصنوعی ما BRIDGIT در حال توسعه است. برای به‌روزرسانی‌ها منتظر بمانید!',
    
    // Content section headers
    description: 'توضیحات',
    services: 'خدمات',
    languages: 'زبان‌ها',
    languagesSupported: 'زبان‌های پشتیبانی شده',
    available: 'در دسترس',
    resources: 'منابع',
    exploreResources: 'کاوش منابع',
    
    // Admin interface
    authenticationRequired: 'احراز هویت مورد نیاز',
    organizationName: 'نام سازمان',
    website: 'وب‌سایت',
    shortDescription: 'توضیحات کوتاه',
    fullDescription: 'توضیحات کامل',
    affiliation: 'وابستگی',
    financialData: 'داده‌های مالی',
    serviceDetails: 'جزئیات خدمات',
    categories: 'دسته‌بندی‌ها',
    servicesProvided: 'خدمات ارائه شده',
    totalResources: 'کل منابع',
    publishingStatus: 'وضعیت انتشار',
    totalUsers: 'کل کاربران',
    adminUsers: 'کاربران مدیریت',
    demoUsers: 'کاربران نمایشی',
    noResourcesFound: 'هیچ منبعی یافت نشد',
    
    // Form placeholders
    placeholders: {
      organizationName: 'نام سازمان',
      briefDescription: 'توضیحات مختصر',
      detailedDescription: 'توضیحات دقیق خدمات و برنامه‌ها',
      organizationAffiliation: 'وابستگی یا شبکه سازمان',
      partnersCollaborating: 'فهرست شرکا و سازمان‌های همکاری‌کننده',
      availableOnline: 'در دسترس آنلاین',
    },
    
    // Additional UI elements
    backToHome: 'بازگشت به خانه',
    goHome: 'رفتن به خانه',
    browseResources: 'مرور منابع',
    needPersonalizedRecommendations: 'نیاز به توصیه‌های شخصی‌سازی شده دارید؟',
    personalizedRecommendationsDescription: 'غربالگری سریع ما را انجام دهید تا یک فهرست سفارشی با منابعی که به طور خاص برای نیازهای شما انتخاب شده‌اند دریافت کنید.',
    getYourPersonalRoadmap: 'نقشه راه شخصی خود را دریافت کنید',
    allRightsReserved: 'تمامی حقوق محفوظ است',
    initiativeOfPittsburghTomorrow: 'یک ابتکار از پیتسبورگ فردا',
    viewingAsUserNotification: 'شما پیونیر پیتسبورگ فردا را به عنوان کاربر {{role}} مشاهده می‌کنید. تجربه برای نقش شما شخصی‌سازی شده است.',
    priorityResourcesForYou: 'منابع اولویت‌دار برای شما',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'بر اساس پاسخ‌های نظرسنجی شما، اکنون به کمک خاصی نیاز ندارید. اگر وضعیت شما تغییر کرد، می‌توانید پروفایل خود را به‌روزرسانی کنید. در غیر این صورت، آزادانه همه منابع موجود را کاوش کنید.',
    editProfile: 'به‌روزرسانی پروفایل',
    exploreAllResources: 'کاوش همه منابع',
    
    // Priority Categories
    priorityCategories: {
      housing: 'مسکن',
      education: 'آموزش', 
      income: 'درآمد',
      first_things_first: 'اولویت‌ها',
      meeting_people: 'ملاقات با مردم',
      kids_activities: 'فعالیت‌های کودکان',
      faith_communities: 'جوامع ایمان',
      sports_wellness: 'ورزش و تندرستی',
      arts_entertainment: 'هنر و سرگرمی',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'یافتن مسکن مقرون‌به‌صرفه و پشتیبانی مالی.',
      education: 'پشتیبانی انگلیسی حرفه‌ای و سایر زبان‌ها.',
      income: 'پشتیبانی برای جستجوی شغل و توسعه مهارت.',
      first_things_first: 'کمک با کمک اضطراری، سلامت روان و ثبت‌نام.',
      meeting_people: 'ارتباط از طریق شبکه‌های حرفه‌ای و رویدادهای اجتماعی.',
      kids_activities: 'برنامه‌های خانواده و کودکان در دسترس است.',
      faith_communities: 'یافتن گروه‌های ایمان و فرهنگی محلی.',
      sports_wellness: 'کاوش فرصت‌های ورزش و تفریح.',
      arts_entertainment: 'کشف رویدادهای هنری و فرهنگی محلی.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'مشاهده و مدیریت منابع نشان‌گذاری شده شما',
    searchYourBookmarks: 'نشان‌گذاری‌های خود را جستجو کنید...',
    showingBookmarks: 'نمایش {{count}} از {{total}} منبع نشان‌گذاری شده',
    showingBookmarksPaginated: 'نمایش {{start}}-{{end}} از {{total}} نشان‌گذاری',
    failedToLoadBookmarks: 'بارگذاری نشان‌گذاری‌ها ناموفق بود. لطفاً دوباره تلاش کنید.',
    bookmarkedOn: 'نشان‌گذاری شده در',
    noBookmarksMatchFilters: 'هیچ نشان‌گذاری‌ای با فیلترهای فعلی شما مطابقت ندارد.',
    
    // Additional UI elements - screening form
    stepOf: 'مرحله {{current}} از {{total}}',
    percentComplete: '{{percent}}٪ تکمیل شده',
    previousButton: 'قبلی',
    nextButton: 'بعدی',
    creatingYourPlan: 'در حال ایجاد برنامه شما...',
    completeAssessment: 'تکمیل ارزیابی',
    
    // Bookmarks empty state
    noBookmarksYet: 'هنوز نشان‌گذاری‌ای وجود ندارد',
    startExploringBookmark: 'شروع به کاوش منابع کنید و مواردی را که مفید می‌یابید نشان‌گذاری کنید!',
    pageOf: 'صفحه {{current}} از {{total}}',
    yourPersonalizedRoadmap: 'نقشه راه شخصی‌سازی شده شما',
    resourcesReadyForYou: '{{count}} منبع آماده برای شما',
    seeMoreResources: 'کاوش همه منابع',
    discoveringPerfectResources: 'کشف منابع کامل شما',
    noRecommendationsYet: 'توصیه‌های شخصی‌سازی شده شما در حال آماده‌سازی است. دایرکتوری منابع ما را برای شروع کاوش کنید.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'صفحه یافت نشد',
    pageNotFoundDescription: 'صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.',
  },
}
