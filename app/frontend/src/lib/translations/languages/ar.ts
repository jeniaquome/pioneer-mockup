import type { TranslationStructure } from '../types'

export const arabicTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    adminDashboard: 'لوحة الإدارة',
    welcome: 'مرحباً',
    resources: 'الموارد',
    bookmarks: 'مواردي المحفوظة',
    about: 'حول',
    myChecklist: 'قائمة مهامي',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    accountSettings: 'إعدادات الملف الشخصي',
    signOut: 'تسجيل الخروج',
    settings: 'الإعدادات',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'مرحباً بكم في بايونير',
    heroWelcomeTo: 'مرحباً بكم في',
      heroPioneer: 'بايونير',
    heroDescription: 'دليلكم الشخصي لبدء حياة جديدة في بيتسبرغ — مجاني، خاص، متعدد اللغات',
    heroExtendedDescription: 'هل تنتقلون إلى بيتسبرغ؟ لا تقضوا ساعات في البحث في عشرات المواقع أو طرح نفس الأسئلة مراراً وتكراراً. بايونير هو دليلكم الشخصي المجاني لكل مورد يساعد الوافدين الجدد على الاستقرار بسرعة وثقة — من السكن والمدارس إلى اللغة والإيمان والحياة المجتمعية. إنها الطريقة الأكثر اكتمالاً وتوفيراً للوقت وترحيباً لبدء فصلكم الجديد في بيتسبرغ.',
    howCanWeHelp: 'كيف يمكننا مساعدتكم اليوم؟',
    howCanWeHelpSubtitle: 'اختاروا مساركم للحصول على توصيات شخصية',
    createRoadmapTitle: 'أنشئوا خارطة طريقكم',
    createRoadmapDescription: 'أجيبوا على استطلاع قصير لتلقي خطة عمل شخصية مصممة خصيصاً لاحتياجاتكم وأهدافكم المحددة.',
    getStarted: 'ابدؤوا',
    browseResourcesTitle: 'تصفحوا الموارد',
    browseResourcesDescription: 'استكشفوا دليلنا الشامل للخدمات والمنظمات والموارد المنظمة حسب الفئة.',
    exploreDirectory: 'استكشفوا الدليل',
    askBridgetTitle: 'اسألوا بريدجيت',
    askBridgetDescription: 'احصلوا على إجابات فورية لأسئلتكم من مساعدنا الذكي. متاح 24/7 بلغتكم المفضلة.',
    startChatting: 'ابدؤوا المحادثة',
    saveProgressQuestion: 'هل تريدون حفظ تقدمكم والوصول إلى الميزات الشخصية؟',
    signIn: 'تسجيل الدخول',
    createAccount: 'إنشاء حساب',
    servicesNote: 'جميع الخدمات مجانية تماماً وسرية بشكل صارم ومتاحة بأكثر من 16 لغة بما في ذلك الإنجليزية والإسبانية والعربية والفرنسية والصينية والسواحيلية.',
    
    // Trust badges
    hundredPercentFree: '100% مجاني',
    privateSecure: 'خاص وآمن',
    multilingualSupport: 'دعم متعدد اللغات',
    languagesSupported: 'دعم لأكثر من 16 لغة بما في ذلك الإسبانية والعربية والفرنسية والماندرين والسواحيلية.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'الوضع التجريبي',
    demoModeDescription: 'جربوا بايونير مع ملفات مستخدمين مختلفة لمعرفة كيف تتكيف التجربة مع احتياجاتكم',
    whatYouExperience: 'ما ستختبرونه',
    immigrantUser: 'مستخدم مهاجر',
    immigrantFeatures: {
      emergency: 'موارد الطوارئ ذات الأولوية',
      multilingual: 'الدعم متعدد اللغات',
      settlement: 'محتوى مركز على الاستقرار',
    },
    studentUser: 'مستخدم طالب',
    studentFeatures: {
      academic: 'الموارد الأكاديمية',
      campus: 'معلومات خاصة بالحرم الجامعي',
      career: 'الإرشاد المهني',
    },
    professionalUser: 'مستخدم محترف',
    professionalFeatures: {
      networking: 'التواصل المهني',
      services: 'الخدمات المهنية',
      advancement: 'التقدم المهني',
    },
    localHelper: 'مساعد محلي',
    localFeatures: {
      community: 'موارد المجتمع',
      volunteer: 'فرص التطوع',
      support: 'شبكات الدعم',
    },
    signIn: 'تسجيل الدخول',
    
    // Authentication required page
    authenticationRequired: 'المصادقة مطلوبة',
    loginToAccessPage: 'تحتاجون إلى تسجيل الدخول للوصول إلى هذه الصفحة.',
    
    // Login page
    emailVerified: 'تم التحقق من البريد الإلكتروني',
    emailVerifiedDescription: 'تم التحقق من بريدكم الإلكتروني بنجاح.',
    alreadySignedIn: 'تم تسجيل الدخول بالفعل',
    redirectingToDashboard: 'جاري إعادة التوجيه إلى لوحة التحكم...',
    signInDescription: 'سجلوا الدخول للوصول إلى موارد بيتسبرغ والتوصيات الشخصية.',
    signInWithAuth0: 'تسجيل الدخول',
    signInHelp: 'تواجهون مشكلة في تسجيل الدخول؟ اتصلوا بالدعم للحصول على المساعدة.',
    loginError: 'خطأ في تسجيل الدخول',
    loginErrorDescription: 'حدثت مشكلة أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'تجربة الحسابات التجريبية',
    experienceDifferentPerspectives: 'تجربة بايونير من منظورات مستخدمين مختلفة',
    email: 'البريد الإلكتروني:',
    password: 'كلمة المرور:',
    loginAs: 'تسجيل الدخول كمستخدم {{role}}',
    demoTip: 'هذه الحسابات التجريبية تعرض تجارب مستخدمين مختلفة ومحتوى شخصي',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'جاري التفكير...',
    curatingRecommendations: 'جاري تنسيق التوصيات الشخصية...',
    findingResources: 'جاري العثور على أفضل الموارد...',
    complete: 'مكتمل!',
    creatingYourPlan: 'جاري إنشاء خطتكم الشخصية',
    ready: 'جاهز!',
    mayTakeAMoment: 'قد يستغرق هذا لحظة بينما نقوم بتخصيص تجربتكم...',
    seeMyRecommendations: 'عرض توصياتي',
    loadingHint: 'قد يستغرق هذا لحظة بينما نقوم بتخصيص تجربتكم...',
  },
  
  // Screening page
  screening: {
    title: 'أخبرونا عنكم',
    description: 'أجيبوا على بعض الأسئلة السريعة حتى نتمكن من إنشاء دليلكم الشخصي للعيش والازدهار في بيتسبرغ.',
    saveRoadmapBanner: 'احفظوا خارطة طريقكم الشخصية بإنشاء حساب. يمكنكم إجراء الاستبيان الآن بشكل مجهول ثم تسجيل الدخول لاحقاً لحفظه.',
    
    // Progress indicator
    progress: 'التقدم',
    completed: '{{count}} من {{total}} مكتمل',
    
    // Questions
    questions: {
      audience: {
        question: 'أي من هذه الأوصاف ينطبق عليكم بشكل أفضل؟',
        options: [
          'طالب/محترف (أدرس في جامعة في منطقة بيتسبرغ أو أعمل لدى مؤسسة)',
          'عائد إلى المنطقة (كنت أعيش هنا سابقاً، غادرت والآن عدت إلى منطقة بيتسبرغ)',
          'لاجئ أو ذو حالة حماية مؤقتة (أُعيد توطيني هنا حديثاً أو انتقلت من مدينة أخرى)',
          'مُنتقل (أنتقل إلى بيتسبرغ من مدينة أخرى في الولايات المتحدة)',
          'رائد أعمال (أبني عملي الخاص)',
          'موظف عن بُعد',
          'أخرى',
        ],
      },
      primaryLanguage: {
        question: 'ما هي لغتكم الأساسية؟',
        options: [
          'الإنجليزية (English)',
          'الإسبانية (Español)',
          'العربية',
          'السواحيلية (Kiswahili)',
          'الأوزبكية (Oʻzbekcha)',
          'النيبالية/البوتانية (नेपाली / རྫོང་ཁ)',
          'الدري/الباشتو (دری / پښتو)',
          'الصينية الماندرينية (中文)',
          'أخرى',
        ],
      },
      culturalBackground: {
        question: 'ما الخلفية الثقافية أو الإقليمية التي تصفكم بشكل أدق؟',
        options: [
          'أبيض/بيضاء',
          'أسود/سمراء أو أمريكي من أصل أفريقي (بما في ذلك أصول أفريقية وكاريبية)',
          'من أصل إسباني/لاتيني/لاتينا/لاتينكس',
          'آسيوي/ة (مثلاً: صيني، هندي، فيتنامي)',
          'شرق أوسطي أو شمال أفريقي',
          'من سكان هاواي الأصليين أو جزر المحيط الهادئ الأخرى',
          'أمريكي أصلي أو من سكان ألاسكا الأصليين',
          'أفريقي/ة (مثلاً: نيجيري، إثيوبي، غاني، إلخ.)',
          'كاريبي/ة (مثلاً: جامايكي، هايتي، ترينيدادي، إلخ.)',
          'أخرى',
          'أفضل عدم الإجابة',
        ],
      },
      housingNeed: {
        question: 'أي نوع من دعم السكن تحتاجونه؟',
        options: [
          'المساعدة في العثور على الأحياء والشقق بسعر السوق',
          'مساعدة السكن الميسور التكلفة والبرامج',
          'سكن مؤقت/طارئ',
          'سكن مشترك/مطابقة الشركاء في السكن',
          'مساعدة لمحاولة شراء منزل',
          'لدي سكن مؤمن',
        ],
      },
      professionalStatus: {
        question: 'ما هو وضعكم المهني الحالي؟',
        options: [
          'طالب (مرحلة البكالوريوس/الدراسات العليا/مدرسة مهنية)',
          'محترف تقنية/مهندس',
          'محترف رعاية صحية/علوم الحياة',
          'أكاديمي/باحث',
          'باحث عن عمل',
          'خريج حديث يبحث عن عمل',
          'محترف آخر',
        ],
      },
      languageSupport: {
        question: 'أي دعم لغوي سيكون مفيداً؟',
        options: [
          'دروس اللغة الإنجليزية (ESL) - من المبتدئ إلى المتوسط',
          'مهارات التواصل المهني بالإنجليزية',
          'خدمات ترجمة الوثائق',
          'ممارسة اللغة الإنجليزية المحادثة',
          'لا حاجة لدعم لغوي',
        ],
      },
      employment: {
        question: 'أي دعم توظيف يهمكم؟',
        options: [
          'التواصل المهني والتقدم المهني',
          'مساعدة البحث عن العمل ومساعدة السيرة الذاتية',
          'برامج التدريب على المهارات والشهادات',
          'التواصل المخصص للصناعة (التكنولوجيا، الرعاية الصحية، إلخ)',
          'لا حاجة لدعم التوظيف، شكراً',
        ],
      },
      communityPriorities: {
        question: 'أي روابط مجتمعية هي الأهم بالنسبة لكم؟ (اختاروا كل ما ينطبق)',
        options: [
          'الشبكات المهنية ولقاءات الصناعة',
          'المجتمعات الثقافية والدينية',
          'الأنشطة الاجتماعية والترفيه',
          'خدمات الأسرة والأطفال',
          'الأنشطة الرياضية والترفيهية',
          'الفنون والفعاليات الثقافية',
          'لا شيء من هذه',
        ],
      },
      immediateNeeds: {
        question: 'ما هي احتياجاتكم الفورية؟ (اختاروا كل ما ينطبق)',
        options: [
          'التعرف على أشخاص وتكوين صداقات جديدة',
          'الخدمات الأساسية (الرعاية الصحية، البنوك، النقل)',
          'تسجيل الأطفال في المدرسة',
          'المساعدة القانونية/الهجرة',
          'دعم الصحة النفسية والعافية',
          'المساعدة الطارئة (الطعام، المأوى)',
          'لا شيء من هذه',
        ],
      },
      timeline: {
        question: 'ما هو جدولكم الزمني للاستقرار في منطقة بيتسبرغ؟',
        options: [
          'وصلت للتو (خلال الشهر الماضي)',
          'وصلت مؤخراً (1-6 أشهر)',
          'أخطط للوصول قريباً (الأشهر الثلاثة القادمة)',
          'تخطيط طويل المدى (أكثر من 6 أشهر)',
          'مستقر بالفعل في منطقة بيتسبرغ',
        ],
      },
      // techComfort removed
    },
    
    // Form messages
    pleaseAnswer: 'يرجى الإجابة على هذا السؤال.',
    pleaseAnswerAll: 'يرجى الإجابة على جميع الأسئلة للمتابعة',
    creatingGuide: 'جاري إنشاء دليلكم...',
    seePersonalizedGuide: 'عرض دليلي الشخصي',
    screeningQuestionnaire: 'استبيان الفحص',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'مجموعة أدوات القادمين الجدد',
    description: 'اعثروا على الموارد والدعم التي تحتاجونها للاستقرار والازدهار في بيتسبرغ',
    categories: {
      housingAssistance: 'مساعدة الإسكان',
      foodAssistance: 'المساعدة الغذائية',
      entrepreneurHiringHub: 'مركز ريادة الأعمال والتوظيف',
      youthAdultEducation: 'موارد التعليم للشباب والكبار',
      eslImmigrantConnection: 'خدمات ربط تعلم الإنجليزية والهجرة',
      socialConnectionCulture: 'التواصل الاجتماعي والثقافة',
    },
    chat: {
      bridgitTitle: 'الدردشة مع بريدجيت',
      bridgitDescription: 'احصل على المساعدة الشخصية والإرشاد لرحلتك',
    },
  },

  // Resource search
  resources: {
    title: 'البحث عن موارد',
    searchPlaceholder: 'البحث في الموارد...',
    allCategories: 'جميع الفئات',
    housing: 'السكن',
    educationESL: 'التعليم / تعلم الإنجليزية',
    socialNetworking: 'التواصل الاجتماعي',
    noResourcesFound: 'لم يتم العثور على موارد تطابق بحثكم أو مرشحاتكم.',
    backToAllCategories: 'العودة إلى جميع الفئات',
    backToCategory: 'العودة إلى {{category}}',
    welcomeToCategory: 'مرحباً بكم في {{category}}',
    categoryDescription: {
      housing: 'اعثروا على دعم الإسكان ومساعدة الإيجار وموارد الحي',
      foodAssistance: 'اعثروا على بنوك الطعام وبرامج الوجبات والمساعدة الغذائية',
      entrepreneurHiring: 'اكتشفوا موارد الأعمال وفرص العمل ودعم التوظيف',
      youthEducation: 'الوصول إلى البرامج التعليمية والدروس الخصوصية وموارد التعلم',
      eslImmigrant: 'اتصلوا بدروس الإنجليزية وخدمات الهجرة والدعم الثقافي',
      socialConnection: 'انضموا إلى المجموعات المجتمعية والفعاليات الثقافية والأنشطة الاجتماعية',
    },
    refreshBookmarks: 'تحديث العلامات المرجعية (تصحيح الأخطاء)',
    compare: 'مقارنة ({{count}}/3)',
    filterByLanguage: 'تصفية حسب اللغة:',
    showingResults: 'عرض {{current}} من {{total}} مورد',
    categoryTitles: {
      housingProcess: 'عملية الإسكان في بيتسبرغ',
      housingProcessDescription: 'تعلموا عن عملية البحث عن السكن والمتطلبات',
    },
    exploreResources: 'استكشاف الموارد',
    categoryNotFound: 'الفئة غير موجودة',
    subcategoryNotFound: 'الفئة الفرعية غير موجودة',
    clearFilters: 'مسح المرشحات',
    showingResultsFor: 'لـ',
    showingResultsIn: 'في',
    compareSelected: 'مقارنة المحددة',
    noResourcesFoundCategory: 'لم يتم العثور على موارد لهذه الفئة.',
    browseSubcategoryDescription: 'تصفح الموارد ضمن هذه الفئة الفرعية.',
    
    // Global search
    globalSearch: {
      placeholder: 'البحث في جميع الموارد...',
      button: 'بحث',
    },
    searchResults: {
      title: 'نتائج البحث',
      for: 'لـ',
      noResults: 'لم يتم العثور على موارد تطابق بحثكم.',
      tryDifferent: 'جربوا مصطلح بحث مختلف.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'مرحباً بكم في',
      subcategories: {
        // Housing subcategories
        housingProcess: 'عملية الإسكان في بيتسبرغ',
        housingProcessDesc: 'تعلموا عن عملية البحث عن السكن والمتطلبات',
        neighborhoodResources: 'موارد الحي والعقارات',
        neighborhoodResourcesDesc: 'اكتشفوا الأحياء ومعلومات العقارات',
        housingAssistanceSubcat: 'مساعدة الإسكان',
        housingAssistanceSubcatDesc: 'مساعدة مباشرة في الإيجار وخدمات دعم الإسكان',
        
        // Food subcategories
        culturalFood: 'مركز الطعام الثقافي',
        culturalFoodDesc: 'الأسواق الدولية وموارد الطعام الثقافي',
        foodPantries: 'بنوك الطعام',
        foodPantriesDesc: 'المساعدة الغذائية الطارئة والمخازن',
        groceryGuide: 'دليل متاجر البقالة',
        groceryGuideDesc: 'متاجر البقالة المحلية ومساعدة التسوق',
        
        // Employment subcategories
        hiringHub: 'هل أنتم مهاجرون أو وافدون جدد تبحثون عن عمل؟',
        hiringHubDesc: 'تفقدوا مركز التوظيف الخاص بنا!',
        entrepreneurship: 'الموارد الريادية داخل بيتسبرغ',
        entrepreneurshipDesc: 'تطوير الأعمال وموارد الشركات الناشئة',
        
        // Education subcategories
        schoolResources: 'تبحثون عن موارد لإيجاد مدرسة جديدة؟',
        schoolResourcesDesc: 'التسجيل المدرسي والموارد التعليمية',
        tutoring: 'تبحثون عن إعداد جامعي أو مدرس خصوصي؟',
        tutoringDesc: 'خدمات التدريس والإعداد الجامعي',
        gedResources: 'تبحثون عن الحصول على شهادة GED؟',
        gedResourcesDesc: 'إعداد GED وتعليم الكبار',
        
        // ESL & Immigration subcategories
        eslResources: 'تبحثون عن موارد ESL؟',
        eslResourcesDesc: 'تعلم اللغة الإنجليزية والفصول',
        documentation: 'مساعدة الوثائق',
        documentationDesc: 'أوراق الهجرة والدعم القانوني',
        basicNeeds: 'مساعدة الاحتياجات الأساسية',
        basicNeedsDesc: 'الخدمات الأساسية والدعم الطارئ',
        
        // Social subcategories
        fosterConnection: 'موارد لتعزيز التواصل',
        fosterConnectionDesc: 'المجموعات الاجتماعية وبناء المجتمع',
        culturalResourcesSocial: 'موارد الطعام والثقافة',
        culturalResourcesSocialDesc: 'الأحداث الثقافية وتقاليد الطعام',
        faithGroups: 'المجموعات الدينية',
        faithGroupsDesc: 'المجتمعات الدينية والدعم الروحي',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'المجتمع والانتماء',
          'culture-leisure': 'الثقافة والفنون والترفيه',
        'esl-immigrant': 'دعم تعلّم الإنجليزية والهجرة',
          'education-youth': 'التعليم: الكبار والشباب',
          'living-essentials': 'الاحتياجات المعيشية',
          'work-business': 'الوظائف وموارد الأعمال',
      },
      categoryDescriptions: {
        'community-belonging': 'التواصل والمشاركة وبناء المجتمع في بيتسبرغ',
        'culture-leisure': 'استكشاف الفنون والأنشطة العائلية والهوايات والحياة الليلية',
        'esl-immigrant': 'تعلّم اللغة، المساعدة في الهجرة، وخدمات القادمين الجدد',
          'education-youth': 'تعليم الكبار والدروس الخصوصية وفرص الشباب',
          'living-essentials': 'السكن والصحة والمواصلات والطعام',
          'work-business': 'وظائف، دعم مهني، وموارد الأعمال',
      },
      subcategories: {
        'civic-government': 'الحكومة',
        'civic-advocacy': 'المناصرة المحلية',
        'civic-volunteer': 'التطوع',
        'civic-youth': 'مشاركة الشباب',
        religion: 'الدين',
        'social-connection': 'التواصل الاجتماعي',
        art: 'الفنون',
        family: 'تسلية العائلة',
        'beauty-hair': 'العناية بالشعر والجمال',
        'hobby-spaces': 'مساحات الهوايات',
        'night-life': 'حياة ليلية',
        'esl-support': 'دعم تعلم الإنجليزية كلغة ثانية (ESL)',
        'general-law': 'قانون عام',
        'immigration-asylum': 'الهجرة واللجوء',
        'refugee-immigrant-support': 'دعم اللاجئين والمهاجرين',
        'adult-education': 'تعليم الكبار',
        'college-prep-tutoring': 'الإعداد الجامعي والدروس الخصوصية',
        'youth-education': 'تعليم الشباب',
        'youth-programming': 'برامج للشباب',
        'food-pantries': 'بنوك الطعام',
        'grocery-guide': 'دليل البقالة',
        'specialty-stores': 'متاجر متخصصة',
        'guide-discover-pittsburgh': 'اكتشف بيتسبرغ',
        'guide-diverse-businesses': 'أعمال متنوعة',
        'guide-immigrant-services': 'خدمات للمهاجرين',
        'health-additional-support': 'دعم إضافي',
        'health-body-mind': 'عناية بالجسم والعقل',
        'health-hospitals': 'مستشفيات',
        'health-nutrition': 'التغذية',
        'health-senior-care': 'رعاية كبار السن',
        'housing-buying-home': 'شراء منزل',
        'housing-assistance': 'مساعدة الإسكان',
        'housing-relocating': 'الانتقال إلى بيتسبرغ',
        'housing-rent': 'الإيجار',
        transportation: 'النقل العام',
        'business-development': 'تطوير الأعمال',
        'business-support': 'دعم الأعمال',
        'career-support': 'دعم مهني',
        'internship-opportunities': 'فرص تدريب',
      },
      groups: {
        'civic-engagement': 'المشاركة المدنية',
        legal: 'قانوني',
        food: 'غذاء',
        'pittsburgh-guides': 'أدلة بيتسبرغ',
        health: 'صحة',
        housing: 'سكن',
        transit: 'النقل العام',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'جاري تحميل قائمة المهام الشخصية الخاصة بكم...',
  },
  
  // About page
  about: {
    title: 'حول بايونير',
    description: 'بايونير هو دليلكم الودود للاستقرار في بيتسبرغ ومقاطعة أليغيني. سواء كنتم محترفي تقنية أو وافدين جدد تبحثون عن بداية جديدة، يربطكم بايونير بالموارد المحلية للسكن والتعليم والتوظيف والمجتمع.',
    features: [
      'أكثر من 161 منظمة غير ربحية',
      'قوائم مرجعية وخرائط طريق شخصية',
      'دعم للوافدين المستقلين والتقليديين',
      'فحص سهل لمطابقة احتياجاتكم',
    ],
    conclusion: 'هذا المشروع هو تعاون بين الشركاء المحليين والمتطوعين، مكرس لجعل بيتسبرغ مرحبة وداعمة ومليئة بالفرص للجميع.',
    copyright: 'بايونير. جميع الحقوق محفوظة.',
    
    // AboutPage specific content
    welcomeText: 'مرحباً بكم في بايونير، دليلكم الشخصي لبدء حياة جديدة في بيتسبرغ ومقاطعة أليغيني. سواء كنتم قد وصلتم للتو إلى الولايات المتحدة أو حصلتم على وظيفة جديدة مع إحدى شركات بيتسبرغ النامية في مجال الطاقة أو الروبوتيكا أو الذكاء الاصطناعي أو علوم الحياة أو الفولاذ — بايونير هنا لمساعدتكم. من إيجاد السكن إلى تسجيل أطفالكم في المدرسة، من العثور على دروس اللغة الإنجليزية إلى التواصل مع المجتمعات الدينية أو الدعم الغذائي المحلي، يجمع بايونير الموارد التي تحتاجونها في مكان واحد.',
    
    whyPioneerTitle: 'لماذا بايونير؟',
    whyPioneerText1: 'لأن البدء من جديد في مدينة جديدة لا يجب أن يعني البدء من الصفر.',
    whyPioneerText2: 'يجمع بايونير كل ما تحتاجونه لبدء حياة جديدة في بيتسبرغ ومقاطعة أليغيني — كل ذلك في مكان واحد موثوق وسهل الاستخدام.',
    whyPioneerText3: 'إنه مجاني وشامل ومصمم لتوفير ساعات من البحث والمقارنة والتخمين. سواء كنتم تبحثون عن سكن أو تسجلون أطفالكم في المدرسة أو تتعلمون الإنجليزية أو تبحثون عن أشخاص يشاركونكم إيمانكم أو لغتكم أو اهتماماتكم — يضمن بايونير عدم تفويت أي فرصة لجعل انتقالكم أكثر سلاسة وحياتكم الجديدة أكثر ثراءً.',
    whyPioneerText4: 'حيث يعرض لكم بحث جوجل كل شيء، يعرض لكم بايونير بالضبط ما يهم.',
    whyPioneerText5: 'حيث يقدم روبوت الدردشة بالذكاء الاصطناعي إجابات، يمنحكم بايونير خارطة طريق.',
    whyPioneerText6: 'حيث تتوقف معظم أدوات الانتقال عند اللوجستيات، يبدأ بايونير بالمجتمع.',
    whyPioneerText7: 'إنها بيتسبرغ، مصنوعة لكم شخصياً.',
    
    youAreThePioneerTitle: 'أنتم الرواد',
    youAreThePioneerText1: 'أنتم لا تنتقلون فقط — بل تبدؤون شيئاً جديداً. وظيفة جديدة. مدرسة جديدة. منزل جديد. وربما حتى لغة أو ثقافة جديدة. هذا يتطلب شجاعة.',
    youAreThePioneerText2: 'لقد بنينا بايونير لدعمكم — لأنكم أنتم الرواد. هذا الموقع هنا لمرافقتكم أثناء بناء مستقبل في بيتسبرغ.',
    
    howPioneerHelpsTitle: 'كيف يساعد بايونير',
    
    madeForYouTitle: 'مصمم لكم — مهما كان مصدركم',
    madeForYouDescription: 'نحن نعلم أن ليس الجميع يتحدث الإنجليزية كلغة أولى. لهذا السبب يدعم بايونير العشرات من اللغات العالمية، بما في ذلك الإسبانية والعربية والفرنسية والصينية والدرية وأكثر. إذا كتبتم بلغتكم الأم، سيرد بايونير بنفس اللغة.',
    
    personalRoadmapTitle: 'أنشئوا خارطة طريقكم الشخصية',
    personalRoadmapDescription: 'أداتنا الأقوى هي خارطة طريقكم الشخصية — قائمة مهام مصنوعة خصيصاً لكم. من خلال الإجابة على بعض الأسئلة البسيطة حول احتياجاتكم (السكن، الطعام، الوظائف، التعليم، إلخ)، ينشئ بايونير خطة عمل مخصصة لدعم خطواتكم التالية. يمكنكم:',
    personalRoadmapFeatures: [
      'عرض وتحديث خارطة طريقكم في أي وقت',
      'حفظ تقدمكم عبر تسجيل الدخول (اختياري)',
      'تحميل أو طباعة قائمة مهامكم لحملها معكم',
      'مراجعة وتنقيح خارطة طريقكم مع نمو حياتكم في بيتسبرغ'
    ],
    personalRoadmapNote: 'إذا كنتم تفضلون الاستكشاف بوتيرتكم الخاصة، يمكنكم تصفح مكتبة مواردنا الكاملة دون تسجيل الدخول.',
    
    smartSupportTitle: 'دعم ذكي وذاتي التوجيه',
    smartSupportDescription: 'يتميز بايونير بروبوت محادثة ودود مدرب للإجابة على مئات الأسئلة الشائعة. يمكنه توجيهكم إلى الموارد، وشرح كيفية عمل الأنظمة المحلية، ومساعدتكم في اتخاذ الخطوة التالية. يوجد أيضاً دليل كامل لمعلومات الاتصال لشركائنا الموثوقين — الوكالات العامة والمنظمات غير الربحية ومقدمي الخدمات وأكثر.',
    
    trustedPartnersTitle: 'شركاء موثوقون',
    trustedPartnersDescription: 'اطلعوا على دليلنا الكامل للشركاء الموثوقين — الوكالات العامة والمنظمات غير الربحية ومقدمي الخدمات في جميع أنحاء بيتسبرغ ومقاطعة أليغيني. تشمل شبكتنا أكثر من 380 منظمة غير ربحية مستعدة للمساعدة في احتياجاتكم المحددة.',
    
    privacyTitle: 'خصوصيتكم محمية',
    privacyDescription: 'خصوصيتكم وأمانكم مهمان لنا. إذا اخترتم إنشاء حساب، فإن بياناتكم الشخصية محمية ببروتوكولات أمان متوافقة مع SOC II. لن نبيع أو نشارك بياناتكم أبداً. تحتفظون بالسيطرة الكاملة على معلوماتكم في جميع الأوقات.',
    
    pittsburghTomorrowTitle: 'حول بيتسبرغ توومورو',
    pittsburghTomorrowText1: 'بايونير هو مبادرة من بيتسبرغ توومورو، منظمة غير ربحية تهدف إلى نمو بيتسبرغ. نحن نحفز الروح الجديدة التي تعيد تعريف ما أسماه المؤرخ ديفيد ماكولو "مدينة أمريكا الضرورية".',
    pittsburghTomorrowText2: 'المنطقة التي بنت أمريكا من الأساس تشهد حيوية جديدة وروحاً مدنية: ترحب بالوافدين الجدد، وتطلق رجال الأعمال، وتمهد طرقاً جديدة. حركتنا مدفوعة بموجة جديدة من الرواد والمبادرين والمخاطرين الذين يستغلون الفرص ويبنون المستقبل — في بيتسبرغ.',
    pittsburghTomorrowText3: 'في بيتسبرغ توومورو، نحن في مهمة لتنمية بيتسبرغ. وهذا لا يعني فقط النمو السكاني أو الاقتصادي؛ بل يعني إحياء روح مدينتنا. دعم الشركات الصغيرة ورجال الأعمال. تجميل والحفاظ على بيئتنا. تعزيز الفنون والثقافة. الترحيب بالوافدين الجدد وخلق المجتمع. الفخر بمدينتنا، ووضعها مرة أخرى على الخريطة.',
    pittsburghTomorrowLink: 'تعلموا المزيد',
    
    // Call to action section
    readyToStartTitle: 'ابدؤوا رحلتكم في بيتسبرغ',
    readyToStartDescription: 'أنشئوا خارطة طريقكم الشخصية لمساعدتكم على الاستقرار والازدهار في منزلكم الجديد.',
    getStarted: 'ابدؤوا',
    browseResources: 'استكشاف الموارد',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'العودة إلى حول',
    title: 'بيان شفافية البيانات والخصوصية',
    description: 'في Pittsburgh Tomorrow، نقدر الشفافية وثقتكم. نعتقد أن لديكم الحق في فهم بالضبط لماذا نطرح أسئلة معينة، وكيف نستخدم المعلومات، وكيف تستفيدون منها.',
    
    whyWeAskTitle: 'لماذا نطرح هذه الأسئلة وكيف نستخدم معلوماتكم:',
    whyWeAskDescription: 'الأسئلة التي نطرحها مصممة لمساعدتنا في إنشاء خارطة طريق مخصصة لكم. إجاباتكم تسمح لنا بـ:',
    whyWeAskBullet1: 'استخراج الموارد والمعلومات ذات الصلة من قاعدة بياناتنا المصممة خصيصاً لاحتياجاتكم.',
    whyWeAskBullet2: 'التأكد من وصولنا للناس بشكل عادل عبر جميع المجتمعات والخلفيات.',
    whyWeAskBullet3: 'تحديد الثغرات في من نخدمهم حتى نتمكن من الوصول بشكل أفضل لأولئك الذين قد يكونون مفقودين.',
    whyWeAskBullet4: 'تحسين أدوات الذكاء الاصطناعي لدينا بحيث تكون مجهزة بشكل أفضل لخدمة جميع المستخدمين بفعالية.',
    weDoNotSell: 'لا نبيع بياناتكم. نستخدمها فقط للأغراض المذكورة أعلاه.',
    
    dataRetentionTitle: 'الاحتفاظ بالبيانات:',
    dataRetentionDescription: 'نحتفظ بمعلوماتكم في قاعدة بياناتنا حتى تخبرونا أنكم لم تعودوا ترغبون في الوصول إلى لوحة التحكم المخصصة لكم. بعد ذلك، ستصبح بياناتكم مجهولة الهوية وستُستخدم فقط لتحسين خدمات الذكاء الاصطناعي لدينا لمساعدة القادمين الجدد الآخرين إلى بيتسبرغ.',
    
    quomeTitle: 'كيف تستخدم Quome بياناتكم:',
    quomeDescription: 'موقعنا مستضاف من قبل Quome، والتي قد تجمع بيانات معينة لتشغيل وتحسين المنصة. يمكنكم معرفة المزيد حول كيفية استخدام Quome وحماية بياناتكم من خلال مراجعة',
    
    skillBuilderTitle: 'كيف يستخدم Skill Builder بياناتكم:',
    skillBuilderDescription: 'روبوت المحادثة في موقعنا مستضاف من قبل SkillBuilder.io، والتي قد تجمع بيانات معينة لتشغيل وتحسين المنصة. يمكنكم معرفة المزيد حول كيفية استخدام SkillBuilder.io وحماية بياناتكم من خلال مراجعة',
    
    contactDescription: 'إذا كان لديكم أسئلة حول استخدامنا للبيانات أو ممارسات الخصوصية، يرجى استخدام زر التعليقات في الجانب الأيمن من كل صفحة للتواصل معنا.',
    privacyPolicyLink: 'سياسة الخصوصية'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'حول Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'يساعد بايونير الوافدين الجدد إلى بيتسبرغ ومقاطعة أليغيني في العثور على طريقهم. نربطكم بالموارد والفرص المناسبة، مهما كانت رحلتكم.',
    quickLinks: 'روابط سريعة',
    home: 'الرئيسية',
    about: 'حول',
    resources: 'الموارد',
    privacyPolicy: 'سياسة الخصوصية',
    getStarted: 'البدء',
    contact: 'الاتصال',
    location: 'مرحباً من بيتسبرغ، بنسيلفانيا',
    email: 'البريد الإلكتروني: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'أهلاً وسهلاً، {{name}}!',
    welcomeStudent: 'مرحباً بعودتك، {{name}}!',
    welcomeProfessional: 'أهلاً وسهلاً، {{name}}!',
    welcomeLocal: 'مرحباً {{name}}!',
    
    subtitleImmigrant: 'رحلة الاستقرار الخاصة بكم تبدأ هنا',
    subtitleStudent: 'نجاحكم الأكاديمي أولويتنا',
    subtitleProfessional: 'نموكم المهني هو تركيزنا',
    subtitleLocal: 'ساعدوا في جعل بيتسبرغ مرحبة بالجميع',
    
    demoUserNote: 'أنتم تشاهدون بايونير كمستخدم **{{role}}**. التجربة مخصصة لدوركم.',
    userBadge: 'مستخدم {{role}}',
    
    urgentResources: 'موارد عاجلة',
    
    // Resource categories
    emergencyServices: 'خدمات الطوارئ',
    emergencyDescription: 'دعم الأزمات على مدار الساعة والمساعدة الفورية',
    temporaryHousing: 'السكن المؤقت',
    temporaryHousingDescription: 'برامج المأوى ومساعدة السكن',
    healthcareAccess: 'الوصول للرعاية الصحية',
    healthcareDescription: 'الخدمات الطبية ومساعدة التأمين الصحي',
    languageServices: 'الخدمات اللغوية',
    languageServicesDescription: 'دعم الترجمة والتفسير',
    
    // Additional resource categories for other roles
    academicSupport: 'الدعم الأكاديمي',
    academicSupportDescription: 'التدريس والمجموعات الدراسية والموارد الأكاديمية',
    studentHousing: 'سكن الطلاب',
    studentHousingDescription: 'خيارات السكن داخل الحرم الجامعي وخارجه',
    financialAid: 'المساعدة المالية',
    financialAidDescription: 'المنح الدراسية والهبات والمساعدة المالية',
    studentGroups: 'مجموعات الطلاب',
    studentGroupsDescription: 'منظمات الطلاب الدوليين والنوادي',
    professionalNetworks: 'الشبكات المهنية',
    professionalNetworksDescription: 'لقاءات الصناعة وفعاليات التواصل',
    careerDevelopment: 'التطوير المهني',
    careerDevelopmentDescription: 'برامج التدريب على المهارات والشهادات',
    professionalHousing: 'السكن المهني',
    professionalHousingDescription: 'السكن التنفيذي وخدمات النقل',
    mentorship: 'الإرشاد',
    mentorshipDescription: 'برامج الإرشاد والتوجيه المهني',
    volunteerOpportunities: 'فرص التطوع',
    volunteerOpportunitiesDescription: 'طرق لمساعدة الوافدين الجدد في مجتمعكم',
    communityOrganizations: 'منظمات المجتمع',
    communityOrganizationsDescription: 'المنظمات غير الربحية المحلية ومقدمي الخدمات',
    supportNetworks: 'شبكات الدعم',
    supportNetworksDescription: 'برامج الإرشاد والصداقة',
    culturalExchange: 'التبادل الثقافي',
    culturalExchangeDescription: 'فعاليات وبرامج التبادل الثقافي',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'سجلوا الدخول لاستكشاف رحلتكم الشخصية في بيتسبرغ',
      signInToPioneer: 'تسجيل الدخول إلى بايونير',
    welcomeTitle: 'مرحباً بكم في بايونير، {{name}}!',
    welcomeTitleWithoutName: 'مرحباً بكم في بايونير!',
    journeyContinues: 'رحلتكم الشخصية مستمرة...',
    beginJourney: 'ابدؤوا رحلتكم الشخصية في بيتسبرغ',
    completedSurveyHeader: 'لقد أكملتم الاستبيان مسبقاً',
    completedSurveyText: 'لقد أكملتم استبيان الانضمام. اعرضوا خارطة الطريق الشخصية أدناه أو عدّلوا إجاباتكم لتحديث التوصيات.',
    completedSurveyTextWithDate: 'لقد أكملتم استبيان الانضمام بتاريخ {{date}}. اعرضوا خارطة الطريق الشخصية أدناه أو عدّلوا إجاباتكم لتحديث التوصيات.',
    editResponses: 'تعديل الإجابات',
    viewMyRoadmap: 'عرض خارطة طريقي',
    noteLabel: 'ملاحظة:',
    editRegenerateNote: 'إذا قمتم بتعديل إجابات الاستبيان، فسيُعاد توليد التوصيات وخارطة الطريق تلقائياً لتطابق تفضيلاتكم المحدثة بشكل أفضل.',
    bridgitHelp: 'هل لديكم أسئلة لم يغطها الاستبيان؟ انقروا على الدردشة الآلية Bridgit في الأسفل اليمين للحصول على مساعدة شخصية!',
    personalizedRoadmap: 'خارطة طريقكم الشخصية',
    unlockExperience: 'افتحوا تجربتكم المخصصة',
    completeSurveyHeader: 'أكملوا الاستبيان للبدء',
    completeSurveyText: 'أجيبوا على استبياننا السريع (5 دقائق) للحصول على توصيات موارد شخصية مصممة خصيصاً لاحتياجاتكم وأهدافكم في بيتسبرغ.',
  },
  
  // Profile page
  profile: {
    title: 'إعدادات الملف الشخصي',
    subtitle: 'إدارة معلوماتكم الشخصية وتفضيلاتكم',
    accountInformation: 'معلومات الحساب',
    accountInformationDescription: 'حدّثوا تفاصيل حسابكم الأساسية',
    basicInformation: 'المعلومات الأساسية',
    basicInformationDescription: 'تحديث تفاصيلكم الشخصية الأساسية',
    firstName: 'الاسم الأول',
    enterFirstName: 'أدخلوا اسمكم الأول',
    lastName: 'اسم العائلة',
    enterLastName: 'أدخلوا اسم العائلة',
    username: 'اسم المستخدم',
    enterUsername: 'أدخلوا اسم المستخدم',
    email: 'البريد الإلكتروني',
    emailChangeNote: 'لا يمكن تغيير البريد الإلكتروني. تواصلوا مع الدعم إذا كنتم بحاجة إلى تحديث بريدكم.',
    emailCannotBeChanged: 'لا يمكن تغيير البريد الإلكتروني. اتصلوا بالدعم إذا كنتم تحتاجون لتحديث بريدكم الإلكتروني.',
    surveyRequired: 'أكملوا الاستبيان أولاً',
    surveyRequiredDescription: 'للحصول على توصيات شخصية وتعديل إجابات الاستبيان، يجب إكمال استبيان التقييم الأولي أولاً.',
    takeSurvey: 'إجراء الاستبيان',
    basicQuestions: 'معلومات أساسية',
    basicQuestionsDescription: 'أخبرونا عن أنفسكم ووضعكم للحصول على توصيات شخصية',
    selectPrimary: 'اختاروا تفضيلكم الرئيسي:',
    selectOption: 'اختاروا خياراً...',
    supportNeeds: 'الدعم والاحتياجات',
    supportNeedsDescription: 'ما نوع الدعم والخدمات التي تحتاجونها؟',
    selectMultiple: 'اختاروا كل ما ينطبق:',
    selectAtLeastOne: 'يرجى اختيار خيار واحد على الأقل.',
    timelinePreferences: 'الجدول الزمني والتفضيلات',
    timelinePreferencesDescription: 'جدولكم الزمني وتفضيلات التكنولوجيا',
    backToDashboard: 'العودة إلى لوحة التحكم',
    languageAndCultural: 'اللغة والخلفية الثقافية',
    languageAndCulturalDescription: 'ساعدونا في تقديم توصيات شخصية أفضل',
    primaryLanguage: 'اللغة الأساسية',
    selectPrimaryLanguage: 'اختاروا لغتكم الأساسية',
    culturalBackground: 'الخلفية الثقافية',
    selectCulturalBackground: 'اختاروا خلفيتكم الثقافية',
    professionalAndLiving: 'الوضع المهني والمعيشي',
    professionalAndLivingDescription: 'هذا يساعدنا في توصية الموارد والخدمات ذات الصلة',
    professionalStatus: 'الوضع المهني',
    selectProfessionalStatus: 'اختاروا وضعكم المهني',
    housingSituation: 'وضع السكن',
    selectHousingSituation: 'اختاروا وضع سكنكم',
    familyStatus: 'الحالة العائلية',
    selectFamilyStatus: 'اختاروا حالتكم العائلية',
    saveChanges: 'حفظ التغييرات',
    saving: 'جاري الحفظ...',
    recalculatingRecommendations: 'إعادة حساب التوصيات...',
    profileUpdated: 'تم تحديث الملف الشخصي',
    profileUpdatedDescription: 'تم تحديث ملفكم الشخصي بنجاح.',
    accountUpdated: 'تم تحديث الحساب',
    accountUpdatedDescription: 'تم تحديث معلومات حسابكم بنجاح. أكملوا الاستبيان لحفظ تفضيلاتكم.',
    updateFailed: 'فشل التحديث',
    updateFailedDescription: 'فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.',
    pleaseLogIn: 'يرجى تسجيل الدخول لعرض ملفكم الشخصي.',
    
    // Language options
    languages: {
      english: 'الإنجليزية',
      spanish: 'الإسبانية',
      french: 'الفرنسية',
      arabic: 'العربية',
      chinese: 'الصينية',
      swahili: 'السواحيلية',
      hindi: 'الهندية',
      portuguese: 'البرتغالية',
      russian: 'الروسية',
      nepali: 'النيبالية',
      somali: 'الصومالية',
      tagalog: 'التاغالوغ',
      turkish: 'التركية',
      other: 'أخرى',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'أمريكي/غربي',
      westAfrican: 'غرب أفريقي',
      middleEasternNorthAfrican: 'شرق أوسطي/شمال أفريقي',
      southAsian: 'جنوب آسيوي (بما في ذلك البوتاني)',
      latinoHispanic: 'لاتيني/هسباني',
      eastAsian: 'شرق آسيوي',
      easternEuropean: 'أوروبا الشرقية',
      other: 'أخرى/أفضل عدم الإفصاح',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'طالب',
      graduateStudent: 'طالب دراسات عليا',
      softwareEngineer: 'مهندس برمجيات',
      healthcareProfessional: 'محترف رعاية صحية',
      researchScientist: 'عالم أبحاث',
      seekingEmployment: 'باحث عن عمل',
      employedFullTime: 'موظف بدوام كامل',
      employedPartTime: 'موظف بدوام جزئي',
      selfEmployed: 'يعمل لحسابه الخاص',
      retired: 'متقاعد',
      other: 'أخرى',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'سكن مؤقت',
      campusHousing: 'سكن الحرم الجامعي',
      apartmentHunting: 'البحث عن شقة',
      rentingApartment: 'استئجار شقة',
      rentingHouse: 'استئجار منزل',
      homeowner: 'مالك منزل',
      livingWithFamily: 'العيش مع العائلة',
      sharedHousing: 'سكن مشترك',
      other: 'أخرى',
    },
    
    // Family status options
    familyStatuses: {
      single: 'أعزب',
      married: 'متزوج',
      familyWithChildren: 'عائلة مع أطفال',
      singleParent: 'والد وحيد',
      extendedFamily: 'عائلة ممتدة',
      other: 'أخرى',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'ماذا يجب أن نناديك؟',
    description: 'ساعدنا في تخصيص تجربتك من خلال إخبارنا باسمك.',
    firstName: 'الاسم الأول',
    firstNamePlaceholder: 'أدخل اسمك الأول',
    lastName: 'اسم العائلة',
    lastNamePlaceholder: 'أدخل اسم العائلة (اختياري)',
    skip: 'تخطي الآن',
    save: 'حفظ الاسم',
    saving: 'جاري الحفظ...',
    firstNameRequired: 'الاسم الأول مطلوب',
    firstNameRequiredDescription: 'يرجى إدخال اسمك الأول للمتابعة.',
    nameUpdated: 'تم تحديث الاسم',
    nameUpdatedDescription: 'تم حفظ اسمك بنجاح.',
    updateFailed: 'فشل التحديث',
    updateFailedDescription: 'فشل في تحديث اسمك. يرجى المحاولة مرة أخرى.',
  },
  
  // Common elements
  common: {
    dashboard: 'لوحة التحكم',
    loading: 'جاري التحميل...',
    search: 'بحث',
    filter: 'تصفية',
    next: 'التالي',
    previous: 'السابق',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    edit: 'تعديل',
    delete: 'حذف',
    close: 'إغلاق',
    back: 'العودة',
    backToResources: 'العودة إلى الموارد',
    viewDetails: 'عرض التفاصيل',
    learnMore: 'اعرف المزيد',
    getHelp: 'الحصول على مساعدة',
    startNow: 'ابدأ الآن',
    tryNow: 'جرب الآن',
    downloadNow: 'تحميل الآن',
    visitWebsite: 'زيارة',
    shareThis: 'شارك هذا',
    copied: 'تم النسخ!',
    copy: 'نسخ',
    show: 'عرض',
    hide: 'إخفاء',
    expand: 'توسيع',
    collapse: 'طي',
    seeMore: 'عرض المزيد',
    seeLess: 'عرض أقل',
    showingTopOf: 'عرض أهم {{current}} من أصل {{total}} مورد',
    selectLanguage: 'اختيار اللغة',
    personalizedRecommendationsLabel: 'توصيات شخصية',
    exploreResourcesNowLabel: 'استكشفوا الموارد الآن',
    curatedAdviceLabel: 'نصائح مُختارة للنجاح',
    
    // Accessibility and UI labels
    toggleSidebar: 'تبديل الشريط الجانبي',
    toggleMobileMenu: 'تبديل القائمة المحمولة',
    feedback: 'ملاحظات',
    openInNewTab: 'فتح في علامة تبويب جديدة',
    removeBookmark: 'إزالة الإشارة المرجعية',
    editResource: 'تحرير المورد',
    deleteResource: 'حذف المورد',
    dragToReorder: 'اسحب لإعادة الترتيب',
    saveOrPrintOptions: 'خيارات الحفظ أو الطباعة',
    filterByCategory: 'تصفية حسب الفئة',
    openChatAssistant: 'فتح الدردشة مع مساعد بريدجيت',
    askBridget: 'اسألوا بريدجيت',
    bridgitComingSoonTitle: 'بريدجيت: قريباً!',
    bridgitComingSoonDescription: 'مساعدنا الذكي بريدجيت قيد التطوير حالياً. ترقبوا التحديثات!',
    
    // Content section headers
    description: 'الوصف',
    services: 'الخدمات',
    languages: 'اللغات',
    languagesSupported: 'اللغات المدعومة',
    available: 'متاح',
    resources: 'الموارد',
    exploreResources: 'استكشاف الموارد',
    
    // Admin interface
    authenticationRequired: 'مطلوب مصادقة',
    organizationName: 'اسم المنظمة',
    website: 'الموقع الإلكتروني',
    shortDescription: 'وصف مختصر',
    fullDescription: 'الوصف الكامل',
    affiliation: 'الانتماء',
    financialData: 'البيانات المالية',
    serviceDetails: 'تفاصيل الخدمة',
    categories: 'الفئات',
    servicesProvided: 'الخدمات المقدمة',
    totalResources: 'إجمالي الموارد',
    publishingStatus: 'حالة النشر',
    totalUsers: 'إجمالي المستخدمين',
    adminUsers: 'المستخدمون الإداريون',
    demoUsers: 'مستخدمو العرض التوضيحي',
    noResourcesFound: 'لم يتم العثور على موارد',
    
    // Form placeholders
    placeholders: {
      organizationName: 'اسم المنظمة',
      briefDescription: 'وصف مختصر',
      detailedDescription: 'وصف مفصل للخدمات والبرامج',
      organizationAffiliation: 'انتماء المنظمة أو الشبكة',
      partnersCollaborating: 'قائمة الشركاء والمنظمات المتعاونة',
      availableOnline: 'متاح عبر الإنترنت',
    },
    
    // Additional UI elements
    backToHome: 'العودة إلى الرئيسية',
    goHome: 'الذهاب إلى الرئيسية',
    browseResources: 'تصفح الموارد',
    needPersonalizedRecommendations: 'هل تحتاجون توصيات شخصية؟',
    personalizedRecommendationsDescription: 'أجيبوا على تقييمنا السريع للحصول على قائمة تحقق مخصصة مع موارد مختارة خصيصاً لاحتياجاتكم.',
    getYourPersonalRoadmap: 'احصلوا على خارطة طريقكم الشخصية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    initiativeOfPittsburghTomorrow: 'مبادرة من بيتسبرغ توومورو',
    viewingAsUserNotification: 'أنتم تشاهدون بايونير كمستخدم {{role}}. التجربة مخصصة لدوركم.',
    priorityResourcesForYou: 'الموارد ذات الأولوية لكم',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'بناءً على إجاباتكم في الاستبيان، لا تحتاجون إلى مساعدة محددة في الوقت الحالي. إذا تغيرت ظروفكم، يمكنكم تحديث ملفكم الشخصي. وإلا، لا تترددوا في استكشاف جميع الموارد المتاحة.',
    editProfile: 'تحديث الملف الشخصي',
    exploreAllResources: 'استكشاف جميع الموارد',
    
    // Priority Categories
    priorityCategories: {
      housing: 'السكن',
      education: 'التعليم', 
      income: 'الدخل',
      first_things_first: 'الأولويات الأساسية',
      meeting_people: 'لقاء الناس',
      kids_activities: 'أنشطة الأطفال',
      faith_communities: 'المجتمعات الدينية',
      sports_wellness: 'الرياضة والعافية',
      arts_entertainment: 'الفنون والترفيه',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'العثور على سكن ميسور التكلفة والدعم المالي.',
      education: 'الإنجليزية المهنية ودعم اللغات الأخرى.',
      income: 'الدعم في البحث عن عمل وتطوير المهارات.',
      first_things_first: 'المساعدة في المعونة الطارئة والصحة النفسية والتسجيل.',
      meeting_people: 'تواصل من خلال الشبكات المهنية والأحداث الاجتماعية.',
      kids_activities: 'البرامج العائلية وبرامج الأطفال متاحة.',
      faith_communities: 'ابحث عن المجموعات الدينية والثقافية المحلية.',
      sports_wellness: 'استكشف فرص الرياضة والترفيه.',
      arts_entertainment: 'اكتشف الأحداث الفنية والثقافية المحلية.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'اعرضوا وأديروا مواردكم المحفوظة',
    searchYourBookmarks: 'ابحثوا في إشاراتكم المرجعية...',
    showingBookmarks: 'عرض {{count}} من {{total}} موارد محفوظة',
    showingBookmarksPaginated: 'عرض {{start}}-{{end}} من {{total}} إشارة مرجعية',
    failedToLoadBookmarks: 'فشل في تحميل الإشارات المرجعية. يرجى المحاولة مرة أخرى.',
    bookmarkedOn: 'تم الحفظ في',
    noBookmarksMatchFilters: 'لا توجد إشارات مرجعية تطابق مرشحاتكم الحالية.',
    
    // Additional UI elements - screening form
    stepOf: 'الخطوة {{current}} من {{total}}',
    percentComplete: '{{percent}}% مكتمل',
    previousButton: 'السابق',
    nextButton: 'التالي',
    creatingYourPlan: 'جاري إنشاء خطتكم...',
    completeAssessment: 'إكمال التقييم',
    
    // Bookmarks empty state
    noBookmarksYet: 'لا توجد إشارات مرجعية بعد',
    startExploringBookmark: 'ابدؤوا في استكشاف الموارد وضعوا إشارات مرجعية على تلك التي تجدونها مفيدة!',
    pageOf: 'الصفحة {{current}} من {{total}}',
    yourPersonalizedRoadmap: 'خارطة طريقكم الشخصية',
    resourcesReadyForYou: '{{count}} من الموارد جاهزة لكم',
    seeMoreResources: 'استكشاف جميع الموارد',
    discoveringPerfectResources: 'اكتشاف مواردكم المثالية',
    noRecommendationsYet: 'يتم إعداد توصياتكم الشخصية. استكشفوا دليل الموارد للبدء.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'الصفحة غير موجودة',
    pageNotFoundDescription: 'الصفحة التي تبحثون عنها غير موجودة أو تم نقلها.',
  },
} 