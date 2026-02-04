import type { TranslationStructure } from '../types'

// Standard Southern Pashto (formal tone, تاسو/ستاسو), RTL script
export const pashtoTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'کور',
    dashboard: 'ډشبورډ',
    adminDashboard: 'اداري ډشبورډ',
    welcome: 'ښه راغلاست',
    resources: 'سرچینې',
    bookmarks: 'خوندي شوي',
    about: 'په اړه',
    myChecklist: 'لړلیک',
    signIn: 'ننوتل',
    signUp: 'نوم لیکنه',
    accountSettings: 'د پروفایل امستنې',
    signOut: 'وتل',
    settings: 'امستنې',
  },

  // Homepage
  homepage: {
    heroTitle: 'Pittsburgh Tomorrow Pioneer ته ښه راغلاست',
    heroWelcomeTo: 'ښه راغلاست',
      heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'په پِټسبورګ کې د نوي ژوند پیل لپاره ستاسو شخصي لارښود — وړیا، خصوصي، څو ژبنی',
    heroExtendedDescription: 'ایا تاسو پِټسبورګ ته کوچیږئ؟ په لسګونو سایټونو کې د پلټنې یا یوې پوښتنې بیا او بیا کولو لپاره ساعتونه مه مصرفوئ. Pittsburgh Tomorrow Pioneer ستاسو شخصي، وړیا لارښود دی چې هر هغه سرچینې ته چې نویو راتلونکو ته په چټکۍ او باور سره میشته کیدو کې مرسته کوي — له کورونو او ښوونځیو څخه تر ژبې، ایمان او ټولنیز ژوند پورې. دا په پِټسبورګ کې ستاسو د نوې مرحلې پیل کولو خورا بشپړه، وخت سپما کوونکې او هرکلي کوونکې لاره ده.',
    howCanWeHelp: 'موږ څنګه درسره مرسته وکړو؟',
    howCanWeHelpSubtitle: 'خپل لاره وټاکئ څو ځانګړې سپارښتنې تر لاسه کړئ',
    createRoadmapTitle: 'خپل سړک نقشه جوړه کړئ',
    createRoadmapDescription:
      'لنډه سروې بشپړه کړئ څو ستاسو اړتیاوو او موخو ته سمون لرونکې ځانګړې کړنلاره تر لاسه کړئ.',
    getStarted: 'پیل وکړئ',
    browseResourcesTitle: 'سرچینې وپلټئ',
    browseResourcesDescription:
      'زموږ د خدمتونو، ادارو او سرچینو بشپړ لارښود په کټګوریو منظم وپلټئ.',
    exploreDirectory: 'لارښود وپلټئ',
    askBridgetTitle: 'له بریجټ څخه وپوښتئ',
    askBridgetDescription:
      'له زموږ د AI مرستیال څخه خپلو پوښتنو ته سمدستي ځوابونه ترلاسه کړئ. ۲۴/۷ په خپلې خوښې ژبه کې شتون لري.',
    startChatting: 'خبرې پيل کړئ',
    saveProgressQuestion: 'ایا غواړئ پرمخ تګ خوندي او ځانګړې بڼې وکاروئ؟',
    signIn: 'ننوتل',
    createAccount: 'حساب جوړ کړئ',
    servicesNote:
      'ټولې خدمتونه په بشپړه توګه وړیا، په کلکه محرم او په ۱۶+ ژبو کې شتون لري؛ لکه انګلیسي، هسپانوي، عربي، فرانسوي، چینايي او سواهيلي.',

    // Trust badges
    hundredPercentFree: '٪۱۰۰ وړیا',
    privateSecure: 'خصوصي او خوندي',
    multilingualSupport: 'چند-ژبې ملاتړ',
    languagesSupported:
      '۱۶+ ژبې ملاتړ کېږي؛ په شمول د هسپانوي، عربي، فرانسوي، مندارین او سواهيلي.',
  },

  // Auth pages
  auth: {
    demoMode: 'ډیمو حالت',
    demoModeDescription:
      'Pittsburgh Tomorrow Pioneer د بېلابېلو کاروونکو پروفایلونو سره وازمویئ او وګورئ چې تجربه څنګه ستاسو اړتیاوو ته برابریږي',
    whatYouExperience: 'تاسو به څه ووینئ',
    immigrantUser: 'کډوال کاروونکی',
    immigrantFeatures: {
      emergency: 'بیړني سرچینې لومړیتوب لري',
      multilingual: 'چند-ژبې ملاتړ',
      settlement: 'په میشتېدو تمرکز لرونکې منځپانګه',
    },
    studentUser: 'محصل کاروونکی',
    studentFeatures: {
      academic: 'اکادمیک سرچینې',
      campus: 'د کمپس ځانګړې معلومات',
      career: 'د مسلک لارښوونې',
    },
    professionalUser: 'مسلکي کاروونکی',
    professionalFeatures: {
      networking: 'صنعتې اړیکې',
      services: 'مسلکي خدمتونه',
      advancement: 'د مسلک پرمختګ',
    },
    localHelper: 'ځايي مرسته کوونکی',
    localFeatures: {
      community: 'د ټولنې سرچینې',
      volunteer: 'د رضاکارۍ فرصتونه',
      support: 'د ملاتړ شبکې',
    },
    signIn: 'ننوتل',

    // Authentication required page
    authenticationRequired: 'تصدیق ته اړتیا ده',
    loginToAccessPage: 'د دې پاڼې د لیدو لپاره باید ننوځئ.',
    
    // Login page
    emailVerified: 'برېښنالیک تصدیق شو',
    emailVerifiedDescription: 'ستاسو برېښنالیک په بریالیتوب سره تصدیق شو.',
    alreadySignedIn: 'دمخه ننوتلی',
    redirectingToDashboard: 'ستاسو ډشبورډ ته بیا لارښوونه کېږي...',
    signInDescription: 'د پِټسبورګ شخصي سرچینو او سپارښتنو ته د لاسرسي لپاره ننوځئ.',
    signInWithAuth0: 'ننوتل',
    signInHelp: 'په ننوتلو کې ستاسو ستونزې شته؟ د مرستې لپاره ملاتړ ته اړیکه ونیسئ.',
    loginError: 'د ننوتلو تېروتنه',
    loginErrorDescription: 'په ننوتلو کې ستونزه رامنځته شوه. مهرباني وکړئ بیا هڅه وکړئ.',
  },

  // Demo credentials
  demo: {
    tryDemoAccounts: 'ډیمو حسابونه وازمویئ',
    experienceDifferentPerspectives: 'Pittsburgh Tomorrow Pioneer د بېلابېلو کاروونکو له لیدلورو تجربه کړئ',
    email: 'برېښنالیک:',
    password: 'پټنوم:',
    loginAs: 'د {{role}} کاروونکي په توګه ننوځئ',
    demoTip: 'دا ډیمو حسابونه بېلابېلې تجربې او شخصي منځپانګه ښيي',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'فکر کوم...',
    curatingRecommendations: 'شخصي وړاندیزونه چمتو کوم...',
    findingResources: 'غوره سرچینې موندم...',
    complete: 'بشپړ شو!',
    creatingYourPlan: 'ستاسو شخصي پلان جوړوم',
    ready: 'چمتو!',
    mayTakeAMoment: 'دا ممکن لږ وخت ونیسي کله چې موږ ستاسو تجربه شخصي کوو...',
    seeMyRecommendations: 'زموږ وړاندیزونه وګورئ',
    loadingHint: 'دا ممکن لږ وخت ونیسي کله چې موږ ستاسو تجربه شخصي کوو...',
  },

  // Screening page
  screening: {
    title: 'موږ ته د خپل ځان په اړه ووایاست',
    description:
      'د پِټسبورګ کې د ژوند کولو او پرمختګ لپاره ستاسو ځانګړې لارښود جوړولو لپاره څو لنډو پوښتنو ته ځواب ورکړئ.',
    saveRoadmapBanner:
      'په حساب جوړولو سره خپله شخصي سړک نقشه خوندي کړئ. تاسو اوس کولی شئ سروې بې نومه بشپړه کړئ او وروسته په ننوتلو سره یې خوندي کړئ.',

    // Progress indicator
    progress: 'پرمختګ',
    completed: '{{count}} له {{total}} څخه بشپړ شول',

    // Questions
    questions: {
      audience: {
        question: 'ستاسو حالت کوم تر ټولو ښه بیانوي؟',
        options: [
          'محصل/مسلکي (په پِټسبورګ سیمه کې د پوهنتون محصل یا د کوم سازمان کارکوونکی)',
          'بيرته ګرځېدونکی (پخوا دلته اوسېدم، کډه شوم او اوس بېرته پِټسبورګ سیمې ته راغلی یم)',
          'کډوال یا د لنډ مهاله خوندي حالت لرونکی (اوس تازه دلته میشت شوی یم یا له بل ښار څخه راغلی یم)',
          'له بل ښاره راغلی (په متحده ایالاتو کې له بل ښار څخه پِټسبورګ ته کډه کوم)',
          'متشبث (خپل کاروبار جوړوم)',
          'لیرې-کار کوونکی کارکوونکی',
          'بل',
        ],
      },
      primaryLanguage: {
        question: 'ستاسو اصلي ژبه کومه ده؟',
        options: [
          'انګلیسي (مورنۍ/روغ)',
          'هسپانوي (Español)',
          'عربي (العربية)',
          'سواهيلي (Kiswahili)',
          'اوزبکي (اوزبېکچه)',
          'نېپالي/بوټاني (नेपाली / རྫོང་ཁ)',
          'دري/پښتو (دری / پښتو)',
          'ماندارین چینايي (中文)',
          'بل',
        ],
      },
      culturalBackground: {
        question: 'کوم کلتوري یا سيمه ييز شالید تاسو ښه بیانوي؟',
        options: [
          'سپین',
          'تور یا افريقايي-امریکايي (د افريقايي او کارېبين اصل په ګډون)',
          'هسپانوي یا لاتیني',
          'آسیایي (لکه: چینايي، هندي، وېتنامي)',
          'منځنی ختیځ یا شمالي افریقا',
          'بېړۍوال/نور د ارام سمندر ټاپو اوسېدونکي',
          'امریکايي هندي یا الاسکا اصلي',
          'افريقايي (لکه: نايجېريايي، اېتيوپيايي، غنايي، او نور)',
          'کارېبين (لکه: يامايايي، هايتيايي، ترينېداډي، او نور)',
          'بل',
          'غواړم ځواب ورنه کړم',
        ],
      },
      housingNeed: {
        question: 'تاسو کوم ډول د کور موندلو ملاتړ ته اړتیا لرئ؟',
        options: [
          'د ګاونډیو او د بازار-کچې اپارتمانونو په موندلو کې مرسته',
          'د ارزانه کور د پروګرامونو او مرستو په اړه مرسته',
          'موقتي/بیړنی استوګنځای',
          'ګډ استوګنځای/هم خونه موندل',
          'د کور رانیولو هڅه کې مرسته',
          'زه استوګنځای لرم',
        ],
      },
      professionalStatus: {
        question: 'ستاسو اوسنی مسلکي حالت څه دی؟',
        options: [
          'محصل (لیسانس/ماستر/تخنیکي ښوونځی)',
          'د ټکنالوژۍ متخصص/انجینر',
          'د روغتیا/ژوندیو علومو متخصص',
          'اکادمیک/څېړونکی',
          'د کار په لټه کې',
          'اوسنی فارغ التحصیل د کار په لټه کې',
          'بل مسلکي',
        ],
      },
      languageSupport: {
        question: 'کوم ډول د ژبې ملاتړ درته ګټور دی؟',
        options: [
          'د انګلیسي ټولګي (ESL) — له پیل تر منځني',
          'د مسلکي انګلیسي د اړیکو مهارتونه',
          'د سندونو د ژباړې خدمتونه',
          'د انګلیسي محاوري تمرین',
          'د ژبې ملاتړ ته اړتیا نشته',
        ],
      },
      employment: {
        question: 'کوم ډول د کارموندنې ملاتړ مو دلچسپوي؟',
        options: [
          'مسلکي شبکې او د مسلک پرمختګ',
          'د کار لټون او د ریزومې مرسته',
          'د مهارتونو روزنه او د تصدیق پروګرامونه',
          'د صنعت-ځانګړې شبکې (ټکنالوژي، روغتیا، او نور)',
          'د کار ملاتړ ته اړتیا نشته، مننه',
        ],
      },
      communityPriorities: {
        question: 'کوم ټولنیز تړاوونه درته تر ټولو مهم دي؟ (ټول چې پلي کېږي وټاکئ)',
        options: [
          'مسلکي شبکې او د صنعت غونډې',
          'کلتوري او دیني ټولنې',
          'ټولنیزې فعالیتونه او تفریح',
          'د کورنۍ او ماشومانو خدمتونه',
          'سپورت او تفریحي فعالیتونه',
          'هنرونه او کلتوري پېښې',
          'هیڅ یو',
        ],
      },
      immediateNeeds: {
        question: 'ستاسو تر ټولو عاجلې اړتیاوې کومې دي؟ (ټول چې پلي کېږي وټاکئ)',
        options: [
          'له خلکو سره بلد کېدل او نوي ملګري جوړول',
          'بنسټیز خدمتونه (روغتیا، بانکي، ترانسپورت)',
          'د ماشومانو د ښوونځي شمولیت',
          'قانوني/کډوالۍ مرسته',
          'ذهني روغتیا او هوساینې ملاتړ',
          'بیړنۍ مرسته (خواړه، استوګنځای)',
          'هیڅ یو',
        ],
      },
      timeline: {
        question: 'د پِټسبورګ په سیمه کې د ځای پر ځای کېدو مهال ویش مو څه ډول دی؟',
        options: [
          'تازه راغلی یم (د تېرې میاشتې په دننه کې)',
          'وروسته راغلی یم (۱–۶ میاشتې)',
          'نږدې راتلونکي کې راتګ پلانوم (راتلونکې ۳ میاشتې)',
          'اوږدمهاله پلان (۶+ میاشتې)',
          'لا دمخه په پِټسبورګ سیمه کې مېشت یم',
        ],
      },
      // techComfort removed
    },

    // Form messages
    pleaseAnswer: 'مهرباني وکړئ دې پوښتنې ته ځواب ورکړئ.',
    pleaseAnswerAll: 'د دوام لپاره مهرباني وکړئ ټولو پوښتنو ته ځواب ورکړئ',
    creatingGuide: 'ستاسو لارښود جوړېږي...',
    seePersonalizedGuide: 'زما شخصي لارښود وګورئ',
    screeningQuestionnaire: 'سروې پوښتنلیک',
  },

  // Toolkit interface
  toolkit: {
    title: 'د نوي راتلونکو کسانو وسایلو ټولګه',
    description:
      'هغه سرچینې او ملاتړ ومومئ چې د پِټسبورګ کې د مېشتېدو او پرمختګ لپاره ورته اړتیا لرئ',
    categories: {
      housingAssistance: 'د استوګنې مرسته',
      foodAssistance: 'د خوړو مرسته',
      entrepreneurHiringHub: 'د متشبثینو او کارګمارنې مرکز',
      youthAdultEducation: 'د ځوانانو او لويانو د زده کړې سرچینې',
      eslImmigrantConnection: 'ESL او د کډوالو د وصل خدمتونه',
      socialConnectionCulture: 'ټولنیز تړاو او کلتور',
    },
    chat: {
      bridgitTitle: 'له BRIDGIT سره خبرې اترې',
      bridgitDescription: 'د خپل سفر لپاره شخصي مرسته او لارښوونه تر لاسه کړئ',
    },
  },

  // Resource search
  resources: {
    title: 'سرچینې ومومئ',
    searchPlaceholder: 'سرچینې ولټوئ...',
    allCategories: 'ټولې کټګورۍ',
    housing: 'استوګنځای',
    educationESL: 'زده کړه / ESL',
    socialNetworking: 'ټولنیز / اړیکې',
    noResourcesFound: 'ستاسو د لټون یا فلټرونو سره سمې سرچینې و نه موندل شوې.',
    backToAllCategories: 'ټولو کټګوریو ته ستنېدل',
    backToCategory: 'بېرته {{category}} ته',
    welcomeToCategory: '{{category}} ته ښه راغلاست',
    categoryDescription: {
      housing: 'د استوګنځای ملاتړ، د کرایې مرسته او د ګاونډیو سرچینې ومومئ',
      foodAssistance: 'د خوړو بنسټونه، د خوړو پروګرامونه او تغذیې مرسته پیدا کړئ',
      entrepreneurHiring: 'د کاروبار سرچینې، دنده موندنه او د کارګمارنې ملاتړ ومومئ',
      youthEducation: 'تعلیمي پروګرامونو، ټیوټرۍ او د زده کړې سرچینو ته لاسرسی',
      eslImmigrant: 'د انګلیسي ټولګي، د کډوالۍ خدمتونه او کلتوري ملاتړ سره وصل شئ',
      socialConnection: 'د ټولنې ډلو، کلتوري پېښو او ټولنیزو فعالیتونو کې ګډون وکړئ',
    },
    refreshBookmarks: 'خوندي شوي ريفرش کړئ (ازموینه)',
    compare: 'مقایسه ({{count}}/۳)',
    filterByLanguage: 'ژبه په اساس فلټر:',
    showingResults: '{{current}} له {{total}} سرچینو څخه ښودل کېږي',
    categoryTitles: {
      housingProcess: 'په پِټسبورګ کې د استوګنې بهیر',
      housingProcessDescription: 'د استوګنځای د لټون بهیر او شرایطو په اړه زده کړه',
    },
    exploreResources: 'سرچینې وپلټئ',
    categoryNotFound: 'کټګوري ونه موندل شوه',
    subcategoryNotFound: 'فرعي کټګوري ونه موندل شوه',
    clearFilters: 'فلټرونه پاک کړئ',
    showingResultsFor: 'لپاره',
    showingResultsIn: 'په',
    compareSelected: 'ټاکل شوې پرتله کړئ',
    noResourcesFoundCategory: 'د دې کټګورۍ لپاره سرچینه ونه موندل شوه.',
    browseSubcategoryDescription: 'په دې فرعي کټګورۍ کې سرچینې وپلټئ.',
    
    // Global search
    globalSearch: {
      placeholder: 'ټولې سرچینې ولټوئ...',
      button: 'لټون',
    },
    searchResults: {
      title: 'د لټون پایلې',
      for: 'لپاره',
      noResults: 'ستاسو د لټون سره سمون لرونکې سرچینې ونه موندل شوې.',
      tryDifferent: 'د لټون بل اصطلاح وآزمایئ.',
    },

    // Individual category pages
    categoryPages: {
      welcomePrefix: '{{category}} ته ښه راغلاست',
      subcategories: {
        // Housing subcategories
        housingProcess: 'په پِټسبورګ کې د استوګنې بهیر',
        housingProcessDesc: 'د استوګنځای د لټون بهیر او شرایطو په اړه زده کړه',
        neighborhoodResources: 'د ګاونډیو او ملکیتونو سرچینې',
        neighborhoodResourcesDesc: 'ګاونډي ومومئ او د ملکیت معلومات کشف کړئ',
        housingAssistanceSubcat: 'د استوګنې مرسته',
        housingAssistanceSubcatDesc: 'د کرایې مستقیمه مرسته او د استوګنې ملاتړ خدمتونه',

        // Food subcategories
        culturalFood: 'د کلتوري خوړو مرکز',
        culturalFoodDesc: 'نړیوال مارکېټونه او د کلتوري خوړو سرچینې',
        foodPantries: 'د خوړو بنسټونه',
        foodPantriesDesc: 'بیړنۍ د خوړو مرسته او بنسټونه',
        groceryGuide: 'د خوراکي توکو لارښود',
        groceryGuideDesc: 'ځايي دوکانونه او د پېرود مرستې',

        // Employment subcategories
        hiringHub: 'ایا تاسې کډوال یا نوی راتلونکی یاست چې کار لټوئ؟',
        hiringHubDesc: 'زموږ د کارګمارنې مرکز وګورئ!',
        entrepreneurship: 'د پِټسبورګ دننه د متشبثینو سرچینې',
        entrepreneurshipDesc: 'د کاروبار پرمختګ او سټارټ اپ سرچینې',

        // Education subcategories
        schoolResources: 'نوی ښوونځی لټوئ؟',
        schoolResourcesDesc: 'د ښوونځي داخلې او تعلیمي سرچینې',
        tutoring: 'د کالج چمتووالی یا ټیوټر ته اړتیا لرئ؟',
        tutoringDesc: 'ټیوټرۍ خدمتونه او د کالج چمتووالی',
        gedResources: 'غواړئ GED ترلاسه کړئ؟',
        gedResourcesDesc: 'د GED چمتووالی او د لويانو زده کړه',

        // ESL & Immigration subcategories
        eslResources: 'د ESL سرچینې لټوئ؟',
        eslResourcesDesc: 'د انګلیسي ژبې زده کړه او ټولګي',
        documentation: 'د اسنادو مرسته',
        documentationDesc: 'د کډوالۍ اسناد او قانوني ملاتړ',
        basicNeeds: 'بنسټیزې اړتیاوې',
        basicNeedsDesc: 'اساسي خدمتونه او بیړنی ملاتړ',

        // Social subcategories
        fosterConnection: 'د اړیکو پیاوړتیا سرچینې',
        fosterConnectionDesc: 'ټولنیزې ډلې او د ټولنې جوړونه',
        culturalResourcesSocial: 'خواړه او کلتوري سرچینې',
        culturalResourcesSocialDesc: 'کلتوري پروګرامونه او د خوړو دودونه',
        faithGroups: 'مذهبي ډلې',
        faithGroupsDesc: 'مذهبي ټولنې او روحي ملاتړ',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
        'community-belonging': 'ټولنه او تړاو',
        'culture-leisure': 'کلتور، هنرونه او تفریح',
        'esl-immigrant': 'ESL او د کډوالو ملاتړ',
        'education-youth': 'زده کړه: لويان او ځوانان',
        'living-essentials': 'د ژوند بنسټیز توکي',
        'work-business': 'دندې او د کاروبار سرچینې',
      },
      categoryDescriptions: {
        'community-belonging': 'په پِټسبورګ کې ونښلئ، ګډون وکړئ او ټولنه جوړه کړئ',
        'culture-leisure': 'هنرونه، د کورنۍ فعالیتونه، شوقونه او د شپې تفریح وپلټئ',
        'esl-immigrant': 'د ژبې زده کړه، د کډوالۍ مرسته او د نویو راتلونکو خدمتونه',
        'education-youth': 'د لويانو زده کړه، ټیوټرۍ او د ځوانانو فرصتونه',
        'living-essentials': 'استوګنځای، روغتیا، ترانسپورت او خواړه',
        'work-business': 'دندې، د مسلک ملاتړ او د کاروبار سرچینې',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'حکومت',
        'civic-advocacy': 'ځايي مدافع',
        'civic-volunteer': 'رضاکار',
        'civic-youth': 'د ځوانانو ونډه',
        religion: 'مذهب',
        'social-connection': 'ټولنیز تړاو',

        // Culture & Leisure
        art: 'هنرونه',
        family: 'د کورنۍ تفریح',
        'beauty-hair': 'د ویښتو ساتنه / ښکلا',
        'hobby-spaces': 'د شوق ځایونه',
        'night-life': 'د شپې ژوند',

        // ESL & Immigrant Support
        'esl-support': 'د انګلیسي دویمه ژبه (ESL) ملاتړ',
        'general-law': 'عمومي قانون',
        'immigration-asylum': 'کډوالۍ / پناه',
        'refugee-immigrant-support': 'د کډوالو / نویو راتلونکو ملاتړ',

        // Education & Youth
        'adult-education': 'د لويانو زده کړه',
        'college-prep-tutoring': 'د کالج چمتووالی / ټیوټرۍ',
        'youth-education': 'د ځوانانو زده کړه',
        'youth-programming': 'د ځوانانو پروګرامونه',

        // Living Essentials
        'food-pantries': 'د خوړو بنسټونه',
        'grocery-guide': 'د خوړو لارښود',
        'specialty-stores': 'ځانګړي دوکانونه',
        'guide-discover-pittsburgh': 'پِټسبورګ وپېژنئ',
        'guide-diverse-businesses': 'ډول ډول کاروبارونه',
        'guide-immigrant-services': 'د کډوالو خدمتونه',
        'health-additional-support': 'اضافي ملاتړ',
        'health-body-mind': 'بدن او ذهن پاملرنه',
        'health-hospitals': 'روغتونونه',
        'health-nutrition': 'تغذیه',
        'health-senior-care': 'د سپین ږیرو پاملرنه',
        'housing-buying-home': 'د کور رانیول',
        'housing-assistance': 'د استوګنې مرسته',
        'housing-relocating': 'پِټسبورګ ته کډه',
        'housing-rent': 'کرایه',
        transportation: 'ترانسپورت',

        // Work & Business
        'business-development': 'د کاروبار پرمختګ',
        'business-support': 'د کاروبار ملاتړ',
        'career-support': 'د مسلک ملاتړ',
        'internship-opportunities': 'د انټرنشیپ فرصتونه',
      },
      groups: {
        'civic-engagement': 'مدني ګډون',
        legal: 'قانوني',
        food: 'خواړه',
        'pittsburgh-guides': 'د پِټسبورګ لارښودونه',
        health: 'روغتیا',
        housing: 'استوګنځای',
        transit: 'ترانسپورت',
      },
    },
  },

  // Checklist page
  checklist: {
    loadingMessage: 'ستاسو شخصي لړلیک لوډ کېږي...',
  },

  // About page
  about: {
    title: 'د Pittsburgh Tomorrow Pioneer په اړه',
    description:
      'Pittsburgh Tomorrow Pioneer ستاسو دوستانه لارښود دی څو په پِټسبورګ او الیګېني کاونټي کې مېشت شئ. که تاسو د ټکنالوژۍ مسلکي یاست او که نوی راتلونکی چې نوې پیل غواړي — Pittsburgh Tomorrow Pioneer تاسو د کور، زده کړې، کار او ټولنې له ځايي سرچینو سره نښلوي.',
    features: [
      '۱۶۱+ غیر انتفاعي سازمانونه',
      'شخصي لړلیکونه او سړک نقشې',
      'د خپلواکو او دودیزو نویو راتلونکو لپاره ملاتړ',
      'ستاسو اړتیاوو ته برابر ساده پوښتنلیک',
    ],
    conclusion:
      'دا پروژه د ځايي شریکانو او رضاکارانو ګډ کار دی؛ زموږ موخه پِټسبورګ ټولو ته هرکلی کوونکی، ملاتړ کوونکی او د فرصتونو ډک ښار ګرځول دي.',
    copyright: 'پایونیر. ټول حقونه خوندي دي.',

    // AboutPage specific content
    welcomeText:
      'Pittsburgh Tomorrow Pioneer ته ښه راغلاست — ستاسو شخصي لارښود د پِټسبورګ او الیګېني کاونټي کې د نوې ژوند د پیل لپاره. که تاسې تازه متحده ایالاتو ته راغلي یاست یا د انرژۍ، روباټیک، AI، ژوندیو علومو یا فولادو په صنعتونو کې د پِټسبورګ له وده کوونکو شرکتونو سره نوې دنده مو اخیستې وي — Pittsburgh Tomorrow Pioneer له تاسو سره مرسته کوي. له کور موندلو او د ماشومانو د ښوونځي شاملولو نیولې، د انګلیسي ټولګو، دیني ټولنو او ځايي د خوړو ملاتړ پورې — اړتیا وړ هر څه په یوه ځای کې.',
    
    whyPioneerTitle: 'ولې Pittsburgh Tomorrow Pioneer؟',
    whyPioneerText1: 'ځکه چې په نوي ښار کې نوی پیل باید د صفر څخه پیل نه معنی ولري.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer هر هغه څه راټولوي چې تاسو په پِټسبورګ او الیګېني کاونټي کې د نوي ژوند پیلولو لپاره اړتیا لرئ — ټول په یوه باوري او اسانه ځای کې.',
    whyPioneerText3: 'دا وړیا، جامع او د ساعتونو لټون، پرتله کولو او اټکل کولو خوندي کولو لپاره ډیزاین شوی. که تاسو کور لټوئ، خپل ماشومان ښوونځي ته شاملوئ، انګلیسي زده کوئ، یا د خپل ایمان، ژبې یا علاقو شریکوونکي خلک لټوئ — Pittsburgh Tomorrow Pioneer ډاډ ورکوي چې تاسو هیڅ فرصت له لاسه نه ورکوئ چې ستاسو کډه اسانه او نوی ژوند بډایه کړي.',
    whyPioneerText4: 'چیرې چې د Google لټون تاسو ته هر څه ښکاره کوي، Pittsburgh Tomorrow Pioneer تاسو ته هغه څه ښکاره کوي چې واقعاً مهم دي.',
    whyPioneerText5: 'چیرې چې AI چټ بوټ ځوابونه وړاندې کوي، Pioneer تاسو ته سړک نقشه درکوي.',
    whyPioneerText6: 'چیرې چې ډیری د کډې وسیلې په لوژستیک ودریږي، Pioneer د ټولنې څخه پیلیږي.',
    whyPioneerText7: 'دا پِټسبورګ دی، شخصي جوړ شوی.',
    
    youAreThePioneerTitle: 'تاسو — Pittsburgh Tomorrow Pioneer یاست',
    youAreThePioneerText1:
      'تاسو یوازې کډه نه کوئ — تاسو نوی څه پېلوي. نوې دنده. نوی ښوونځی. نوی کور. او کېدای شي نوې ژبه یا کلتور هم. دا زړورتیا غواړي.',
    youAreThePioneerText2:
      'موږ Pittsburgh Tomorrow Pioneer ستاسو د ملاتړ لپاره جوړ کړی — ځکه چې تاسو Pittsburgh Tomorrow Pioneer یاست. دا وېبپاڼه دلته ده چې په پِټسبورګ کې د خپل راتلونکي د جوړولو پر مهال له تاسو سره ملګرې شي.',
    howPioneerHelpsTitle: 'Pittsburgh Tomorrow Pioneer څه ډول مرسته کوي',

    madeForYouTitle: 'ستاسو لپاره جوړه — هر ځایه چې یاست',
    madeForYouDescription:
      'موږ پوهېږو چې هر څوک په انګلیسي خبرې نه کوي. له همدې امله Pittsburgh Tomorrow Pioneer لسګونه نړیوالې ژبې ملاتړوي، په شمول د هسپانوي، عربي، فرانسوي، چینايي، دري او نورو. که تاسو په خپله مورنۍ ژبه ولیکئ، Pittsburgh Tomorrow Pioneer به هماغه ژبه وکاروي.',

    personalRoadmapTitle: 'خپل شخصي سړک نقشه جوړه کړئ',
    personalRoadmapDescription:
      'زموږ تر ټولو پیاوړی وسیله ستاسو شخصي لړلیک دی — یو لړلیک چې یوازې ستاسو لپاره جوړ شوی. د څو ساده پوښتنو په ځوابولو سره چې ستاسو اړتیاوې (استوګنځای، خواړه، کارونه، زده کړه، او نور) پوښي، Pittsburgh Tomorrow Pioneer ستاسو د راتلونکو ګامونو لپاره ځانګړې کړنلاره جوړوي. تاسو کولی شئ:',
    personalRoadmapFeatures: [
      'خپل لړلیک هر وخت وګورئ او نوي کړئ',
      'د ننوتلو له لارې پرمختګ خوندي کړئ (اختیاري)',
      'خپل لړلیک ډاونلوډ یا چاپ کړئ',
      'لړلیک بیاکتنه او اصلاح کړئ لکه څنګه چې ستاسو ژوند په پِټسبورګ کې وده کوي',
    ],
    personalRoadmapNote:
      'که غواړئ په خپل سرعت وپلټئ، زموږ د سرچینو بشپړ کتابتون پرته له ننوتلو هم کتلای شئ.',

    smartSupportTitle: 'هوښیار، ځان-لارښود ملاتړ',
    smartSupportDescription:
      'Pittsburgh Tomorrow Pioneer یو دوستانه AI چت بوټ لري چې سلګونو عامو پوښتنو ته د ځواب ویلو لپاره روزل شوی. دا کولی شي تاسې سرچینو ته رهبري کړي، وښيي چې محلي سیسټمونه څنګه کار کوي او په راتلونکي ګام کې مرسته وکړي. د باور وړ شریکانو بشپړ ډایرکټري هم شته — عامه ادارې، غیر انتفاعي موسسې، خدمت وړاندې کوونکي او نور.',

    trustedPartnersTitle: 'باور وړ شریکان',
    trustedPartnersDescription:
      'په پِټسبورګ او الیګېني کاونټي کې زموږ د باور وړ شریکانو بشپړ ډایرکټري ته لاسرسی ومومئ — عامه ادارې، غیر انتفاعي سازمانونه او خدمت وړاندې کوونکي. زموږ په شبکه کې ۳۸۰+ غیر انتفاعي سازمانونه شامل دي چې ستاسو د ځانګړو اړتیاوو لپاره چمتو دي.',

    privacyTitle: 'ستاسې محرمیت، خوندي',
    privacyDescription:
      'ستاسو محرمیت او امنیت زموږ لپاره مهم دی. که حساب جوړ کړئ، ستاسو شخصي معلومات د SOC II له معیارونو سره سم خوندي کېږي. موږ هېڅکله ستاسو معلومات نه پلورو او نه شریکوو. تاسو تل پر خپلو معلوماتو بشپړ واک لرئ.',

    pittsburghTomorrowTitle: 'د Pittsburgh Tomorrow په اړه',
    pittsburghTomorrowText1:
      'Pittsburgh Tomorrow Pioneer د Pittsburgh Tomorrow د غیر انتفاعي ادارې نوښت دی چې موخه یې د پِټسبورګ وده ده. موږ هغه نوې روحیه پیاوړې کوو چې مورخ ډېوېډ مک کلا په "د امریکا نه بدلېدونکی ښار" کې بیان کړې.',
    pittsburghTomorrowText2:
      'هغه سیمه چې امریکا یې له بنسټه جوړه کړه، نن هم د نوې ځوانۍ او مدني روحیې ډکه ده: نويو راتلونکو ته هرکلی ویل، متشبثین پیلول او نوې لارې پرانستل. زموږ حرکت د نوې څپې مخکښو، لومړنیو او خطر منونکو له خوا ځواکمن شوی چې فرصت ته رسېږي او راتلونکی جوړوي — په پِټسبورګ کې.',
    pittsburghTomorrowText3:
      'په Pittsburgh Tomorrow کې، زموږ موخه د پِټسبورګ وده ده. او دا یوازې د نفوس یا اقتصادي وده نه ده؛ دا زموږ د ښار روحیه بیا ژوندی کول دي. د کوچنیو سوداګریو او متشبثینو ملاتړ. زموږ چاپیریال ښایسته او خوندي کول. هنر او کلتور وده. نويو راتلونکو ته هرکلی او ټولنه جوړول. زموږ په ښار ویاړ، او بیا یې په نقشه کې ایښودل.',
    pittsburghTomorrowLink: 'نور معلومات',

    // Call to action section
    readyToStartTitle: 'په پِټسبورګ کې خپل سفر پیل کړئ',
    readyToStartDescription:
      'خپل شخصي لړلیک جوړ کړئ چې تاسو ته په خپل نوي کور کې میشته کېدو او وده کولو کې مرسته وکړي.',
    getStarted: 'پیل وکړئ',
    browseResources: 'سرچینې وپلټئ',
  },

  // Privacy Policy
  privacy: {
    backToAbout: 'بېرته د «د Pittsburgh Tomorrow Pioneer په اړه» پاڼې ته',
    title: 'د معلوماتو روڼتیا او د محرمیت اعلامیه',
    description:
      'په Pittsburgh Tomorrow کې، موږ روڼتیا او ستاسو باور ته ارزښت ورکوو. موږ باور لرو چې حق لرئ پوه شئ ولې له تاسو ځینې معلومات غواړو، څنګه یې کاروو او دا تاسو ته څنګه ګټه رسوي.',

    whyWeAskTitle: 'ولې دا پوښتنې کوو او ستاسو معلومات څنګه کاروو؟',
    whyWeAskDescription:
      'زموږ پوښتنې د دې لپاره دي چې ستاسو لپاره ځانګړې سړک نقشه جوړه کړو. ستاسو ځوابونه موږ ته اجازه راکوي چې:',
    whyWeAskBullet1:
      'ستاسو اړتیاوو ته برابرې سرچینې او معلومات زموږ له ډیټابیس څخه راوباسو.',
    whyWeAskBullet2:
      'باور وکړو چې موږ خلکو ته له بېلابېلو ټولنو او شالیدونو څخه په عادلانه توګه رسېدلي یو.',
    whyWeAskBullet3:
      'هغه تشې وپېژنو چې کېدای شي چا ته نه یو رسېدلي او غوره خدمت ورته برابر کړو.',
    whyWeAskBullet4:
      'زموږ AI وسایل ښه کړو څو ټولو کاروونکو ته اغېزمن خدمت وړاندې کړي.',
    weDoNotSell:
      'موږ ستاسو معلومات نه پلورو. دا یوازې د پورته موخو لپاره کارول کېږي.',

    dataRetentionTitle: 'د معلوماتو ساتنه:',
    dataRetentionDescription:
      'موږ ستاسو معلومات تر هغه ساتو څو پورې چې تاسو موږ ته ووايئ چې نور خپل دودیز ډشبورډ ته لاسرسی نه غواړئ. وروسته له هغه، ستاسو معلومات بې نومه کېږي او یوازې زموږ د AI خدمتونو د ښه کولو لپاره کارول کېږي، څو پِټسبورګ ته نورو نویو راتلونکو سره مرسته وشي.',

    quomeTitle: 'Quome ستاسو معلومات څنګه کاروي:',
    quomeDescription:
      'زموږ وېبپاڼه Quome کوربتوب کوي، چې ښايي د پلیټفارم د چلولو او ښه کولو لپاره ځینې معلومات راټول کړي. تاسو کولی شئ د Quome د معلوماتو کارولو او ساتنې په اړه د هغوی',

    skillBuilderTitle: 'Skill Builder ستاسو معلومات څنګه کاروي:',
    skillBuilderDescription:
      'زموږ د وېبپاڼې چټ بوټ SkillBuilder.io کوربتوب کوي او ښايي د پلیټفارم د چلولو او ښه کولو لپاره ځینې معلومات راټول کړي. تاسو کولی شئ د SkillBuilder.io د معلوماتو د کارولو او ساتنې په اړه د هغوی',

    contactDescription:
      'که زموږ د معلوماتو کارونې یا د محرمیت د کړنو په اړه پوښتنې لرئ، مهرباني وکړئ د هرې پاڼې په ښي اړخ کې د «نظریات» تڼۍ وکاروئ.',
    privacyPolicyLink: 'د محرمیت تګلاره',
  },

  // Footer
  footer: {
    aboutPioneer: 'د Pittsburgh Tomorrow Pioneer په اړه',
    aboutDescription:
      'پایونیر د پِټسبورګ او الیګېني کاونټي نویو راتلونکو سره مرسته کوي چې خپله لاره ومومي. موږ تاسو د سمې سرچینې او فرصت سره نښلوو — هره لاره چې لرئ.',
    quickLinks: 'چټک لینکونه',
    home: 'کور',
    about: 'په اړه',
    resources: 'سرچینې',
    privacyPolicy: 'د محرمیت تګلاره',
    getStarted: 'پیل وکړئ',
    contact: 'اړيکه',
    location: 'له پِټسبورګ، پېنسلوانیا څخه سلام',
    email: 'برېښنالیک: Hello@pittsburghtomorrow.org',
  },

  // Role-based content
  roleContent: {
    welcomeImmigrant: 'ښه راغلاست، {{name}}!',
    welcomeStudent: 'بېرته ښه راغلاست، {{name}}!',
    welcomeProfessional: 'ښه راغلاست، {{name}}!',
    welcomeLocal: 'سلام {{name}}!',

    subtitleImmigrant: 'ستاسو د میشتېدو سفر له دې ځایه شروع کېږي',
    subtitleStudent: 'ستاسو اکادمیک بریالیتوب زموږ لومړیتوب دی',
    subtitleProfessional: 'ستاسو د مسلک وده زموږ تمرکز دی',
    subtitleLocal: 'راځئ پِټسبورګ د هر چا لپاره هرکلی کوونکی کړو',

    demoUserNote:
      'تاسو پایونیر د {{role}} کاروونکي په توګه ګورئ. تجربه د ستاسو رول لپاره شخصي شوې ده.',
    userBadge: '{{role}} کاروونکی',

    urgentResources: 'بیړني سرچینې',

    // Resource categories
    emergencyServices: 'بیړني خدمتونه',
    emergencyDescription: '۲۴/۷ د بحران ملاتړ او سمدستي مرسته',
    temporaryHousing: 'موقتي استوګنځای',
    temporaryHousingDescription: 'پناهځای او د استوګنې د ملاتړ پروګرامونه',
    healthcareAccess: 'روغتیايي لاسرسی',
    healthcareDescription: 'طبي خدمتونه او د روغتیا بیمې مرسته',
    languageServices: 'د ژبې خدمتونه',
    languageServicesDescription: 'ژباړه او تفسير',

    // Additional resource categories for other roles
    academicSupport: 'اکادمیک ملاتړ',
    academicSupportDescription: 'ټیوټرۍ، د مطالعې ډلې او اکادمیک سرچینې',
    studentHousing: 'د محصلینو استوګنځای',
    studentHousingDescription: 'په-کمپس او له کمپس بهر استوګنځایونه',
    financialAid: 'مالي مرسته',
    financialAidDescription: 'بورسې، مرستې او مالي ملاتړ',
    studentGroups: 'د محصلینو ډلې',
    studentGroupsDescription: 'د نړیوالو محصلینو سازمانونه او کلبونه',
    professionalNetworks: 'مسلکي شبکې',
    professionalNetworksDescription: 'د صنعت غونډې او اړیکې',
    careerDevelopment: 'د مسلک پرمختګ',
    careerDevelopmentDescription: 'د مهارتونو روزنه او تصدیق پروګرامونه',
    professionalHousing: 'د مسلکي کسانو استوګنځای',
    professionalHousingDescription: 'اجرایي استوګنځایونه او د ځای-بدلون خدمتونه',
    mentorship: 'لارښوونه',
    mentorshipDescription: 'د مسلکي لارښوونې او روزنې پروګرامونه',
    volunteerOpportunities: 'د رضاکارۍ فرصتونه',
    volunteerOpportunitiesDescription: 'لارې چې په خپلې ټولنې کې د نويو راتلونکو سره مرسته وکړئ',
    communityOrganizations: 'د ټولنې سازمانونه',
    communityOrganizationsDescription: 'ځايي غیر انتفاعي موسسې او خدمت وړاندې کوونکي',
    supportNetworks: 'د ملاتړ شبکې',
    supportNetworksDescription: 'لارښوونه او ملګرتیا پروګرامونه',
    culturalExchange: 'کلتوري تبادله',
    culturalExchangeDescription: 'د کلتوري تبادلې پېښې او پروګرامونه',

  },

  // Dashboard page
  dashboard: {
    signInExplore: 'خپل شخصي پِټسبورګ سفر د لیدو لپاره ننوځئ',
      signInToPioneer: 'Pittsburgh Tomorrow Pioneer ته ننوځئ',
    welcomeTitle: 'Pittsburgh Tomorrow Pioneer ته ښه راغلاست، {{name}}!',
    welcomeTitleWithoutName: 'Pittsburgh Tomorrow Pioneer ته ښه راغلاست!',
    journeyContinues: 'ستاسو شخصي سفر روان دی...',
    beginJourney: 'خپل شخصي پِټسبورګ سفر پیل کړئ',
    completedSurveyHeader: 'تاسو سروې لا دمخه بشپړه کړې',
    completedSurveyText:
      'تاسو خپل د ننوتلو سروې بشپړه کړې ده. لاندې خپله شخصي سړک نقشه وګورئ یا د سپارښتنو د نوي کېدو لپاره ځوابونه سم کړئ.',
    completedSurveyTextWithDate:
      'تاسو د {{date}} په نېټه خپله سروې بشپړه کړې ده. لاندې خپله شخصي سړک نقشه وګورئ یا د سپارښتنو د نوي کېدو لپاره ځوابونه سم کړئ.',
    editResponses: 'ځوابونه سم کړئ',
    viewMyRoadmap: 'زما سړک نقشه وګورئ',
    noteLabel: 'یادونه:',
    editRegenerateNote:
      'که د سروې ځوابونه سم کړئ، ستاسو شخصي سپارښتنې او سړک نقشه به په اتومات ډول د نوو خوښو سره سم بیا جوړه شي.',
    bridgitHelp:
      'ایا داسې پوښتنې لرئ چې سروې یې نه پوښي؟ د شخصي مرستې لپاره د ښي لاندې برېجټ چټ بوټ وکاروئ!',
    personalizedRoadmap: 'ستاسو شخصي سړک نقشه',
    unlockExperience: 'خپل دودیزه تجربه پرانیزئ',
    completeSurveyHeader: 'د پیل لپاره خپله سروې بشپړه کړئ',
    completeSurveyText:
      'زموږ پنځه-دقیقې لنډه سروې واخلئ څو د پِټسبورګ لپاره ستاسو اړتیاوو او موخو ته برابرې ځانګړې سپارښتنې تر لاسه کړئ.',
  },

  // Profile page
  profile: {
    title: 'د پروفایل امستنې',
    subtitle: 'خپل شخصي معلومات او خوښۍ مدیریت کړئ',
    accountInformation: 'د حساب معلومات',
    accountInformationDescription: 'د خپل حساب بنسټیز جزئیات نوي کړئ',
    basicInformation: 'بنسټیز معلومات',
    basicInformationDescription: 'خپل بنسټیز شخصي جزییات نوي کړئ',
    firstName: 'نوم',
    enterFirstName: 'خپل نوم ولیکئ',
    lastName: 'تخلص',
    enterLastName: 'خپل تخلص ولیکئ',
    username: 'د کارونکي نوم',
    enterUsername: 'د کارونکي نوم ولیکئ',
    email: 'برېښنالیک',
    emailChangeNote: 'برېښنالیک نه شي بدلېدلی. د بدلون لپاره له ملاتړ سره اړیکه ونیسئ.',
    emailCannotBeChanged: 'برېښنالیک نه شي بدلېدلی. د بدلون لپاره له ملاتړ سره اړیکه ونیسئ.',
    surveyRequired: 'لومړی خپله سروې بشپړه کړئ',
    surveyRequiredDescription:
      'د شخصي سپارښتنو د تر لاسه کولو او د سروې د ځوابونو د سمولو لپاره باید لومړنی ارزونه بشپړه کړئ.',
    takeSurvey: 'سروې واخلئ',
    basicQuestions: 'بنسټیز معلومات',
    basicQuestionsDescription:
      'د شخصي سپارښتنو لپاره موږ ته د خپل ځان او حالت په اړه ووایاست',
    selectPrimary: 'خپل اصلي خوښه وټاکئ:',
    selectOption: 'یوه گزینه وټاکئ...',
    supportNeeds: 'ملاتړ او اړتیاوې',
    supportNeedsDescription: 'تاسو کوم ډول ملاتړ او خدمتونو ته اړتیا لرئ؟',
    selectMultiple: 'ټول چې پلي کېږي وټاکئ:',
    selectAtLeastOne: 'مهرباني وکړئ لږ تر لږه یوه گزینه وټاکئ.',
    timelinePreferences: 'مهال ویش او خوښۍ',
    timelinePreferencesDescription: 'ستاسو مهال ویش او د ټکنالوژۍ خوښۍ',
    backToDashboard: 'بېرته ډشبورډ ته',
    languageAndCultural: 'ژبه او کلتوري شالید',
    languageAndCulturalDescription: 'موږ سره مرسته وکړئ څو لا ښه شخصي سپارښتنې برابرې کړو',
    primaryLanguage: 'اصلي ژبه',
    selectPrimaryLanguage: 'اصلي ژبه وټاکئ',
    culturalBackground: 'کلتوري شالید',
    selectCulturalBackground: 'کلتوري شالید وټاکئ',
    professionalAndLiving: 'مسلکي او استوګنې حالت',
    professionalAndLivingDescription: 'دا موږ سره مرسته کوي اړونده سرچینې او خدمتونه وړاندیز کړو',
    professionalStatus: 'مسلکي حالت',
    selectProfessionalStatus: 'خپل مسلکي حالت وټاکئ',
    housingSituation: 'د استوګنې وضعیت',
    selectHousingSituation: 'د استوګنې وضعیت وټاکئ',
    familyStatus: 'د کورنۍ وضعیت',
    selectFamilyStatus: 'د کورنۍ وضعیت وټاکئ',
    saveChanges: 'بدلونونه خوندي کړئ',
    saving: 'خوندي کېدل روان دي...',
    recalculatingRecommendations: 'سپارښتنې بیا محاسبه کېږي...',
    profileUpdated: 'پروفایل تازه شو',
    profileUpdatedDescription: 'ستاسو پروفایل په بریالیتوب سره تازه شو.',
    accountUpdated: 'حساب تازه شو',
    accountUpdatedDescription:
      'ستاسو د حساب معلومات په بریالیتوب سره تازه شول. د خوښو د خوندي کېدو لپاره سروې بشپړه کړئ.',
    updateFailed: 'تازه کول پاتې راغلل',
    updateFailedDescription: 'پروفایل نه شو تازه کېدای. مهرباني وکړئ بیا هڅه وکړئ.',
    pleaseLogIn: 'مهرباني وکړئ د خپل پروفایل د کتلو لپاره ننوځئ.',

    // Language options
    languages: {
      english: 'انګلیسي',
      spanish: 'هسپانوي',
      french: 'فرانسوي',
      arabic: 'عربي',
      chinese: 'چینايي',
      swahili: 'سواهيلي',
      hindi: 'هندي',
      portuguese: 'پرتګالي',
      russian: 'روسي',
      nepali: 'نېپالي',
      somali: 'سومالي',
      tagalog: 'تاګالوګ',
      turkish: 'ترکي',
      other: 'بله',
    },

    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'امریکايي/لوېدیځ',
      westAfrican: 'لوېدیځه افریقا',
      middleEasternNorthAfrican: 'منځنی ختیځ/شمالي افریقا',
      southAsian: 'سویلي آسیا (د بوټانیز په ګډون)',
      latinoHispanic: 'لاتیني/هسپانوي',
      eastAsian: 'ختیځې آسیا',
      easternEuropean: 'ختیځه اروپا',
      other: 'بله/نه غواړم ووایم',
    },

    // Professional status options
    professionalStatuses: {
      student: 'محصل',
      graduateStudent: 'لوړ زده کړو محصل',
      softwareEngineer: 'د سافټویر انجینر',
      healthcareProfessional: 'روغتیايي مسلکي',
      researchScientist: 'څېړنیز ساینس پوه',
      seekingEmployment: 'د کار په لټه کې',
      employedFullTime: 'په پوره وخت ګومارل شوی',
      employedPartTime: 'په نیمه وخت ګومارل شوی',
      selfEmployed: 'خپل-کاره',
      retired: 'متقاعد',
      other: 'بل',
    },

    // Housing situation options
    housingSituations: {
      temporaryHousing: 'موقتي استوګنځای',
      campusHousing: 'د کمپس استوګنځای',
      apartmentHunting: 'د اپارتمان لټون',
      rentingApartment: 'اپارتمان په کرايه',
      rentingHouse: 'کور په کرايه',
      homeowner: 'د کور خاوند',
      livingWithFamily: 'له کورنۍ سره اوسېږي',
      sharedHousing: 'ګډ استوګنځای',
      other: 'بل',
    },

    // Family status options
    familyStatuses: {
      single: 'مجرد',
      married: 'واده شوی/واده شوې',
      familyWithChildren: 'د ماشومانو لرونکې کورنۍ',
      singleParent: 'یوازینی مور/پلار',
      extendedFamily: 'غځېدلې کورنۍ',
      other: 'بل',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'موږ دې ته څه ووایو؟',
    description: 'زموږ سره د خپل نوم په ویلو سره زموږ سره د خپلې تجربې په شخصي کولو کې مرسته وکړئ.',
    firstName: 'لومړی نوم',
    firstNamePlaceholder: 'خپل لومړی نوم دننه کړئ',
    lastName: 'د کورنۍ نوم',
    lastNamePlaceholder: 'د خپلې کورنۍ نوم دننه کړئ (اختیاري)',
    skip: 'اوس د پاسه ورکړئ',
    save: 'نوم خوندي کړئ',
    saving: 'خوندي کوي...',
    firstNameRequired: 'لومړی نوم اړین دی',
    firstNameRequiredDescription: 'مهرباني وکړئ د دوام لپاره خپل لومړی نوم دننه کړئ.',
    nameUpdated: 'نوم تازه شو',
    nameUpdatedDescription: 'ستاسو نوم په بریالیتوب سره خوندي شو.',
    updateFailed: 'تازه کول ناکام شو',
    updateFailedDescription: 'ستاسو د نوم تازه کول ناکام شو. مهرباني وکړئ بیا هڅه وکړئ.',
  },
  
  // Common elements
  common: {
    dashboard: 'ډشبورډ',
    loading: 'لوډ کېږي...',
    search: 'لټون',
    filter: 'فلټر',
    next: 'بل',
    previous: 'مخکینی',
    save: 'خوندي کول',
    cancel: 'لغوه کول',
    confirm: 'تایید',
    edit: 'سمول',
    delete: 'ړنګول',
    close: 'بندول',
    back: 'شاته',
    backToResources: 'بېرته سرچینو ته',
    viewDetails: 'جزییات وګورئ',
    learnMore: 'نور زده کړئ',
    getHelp: 'مرسته تر لاسه کړئ',
    startNow: 'همدا اوس پیل کړئ',
    tryNow: 'همدا اوس وازمویئ',
    downloadNow: 'همدا اوس ډاونلوډ کړئ',
    visitWebsite: 'وګورئ',
    shareThis: 'دا شریک کړئ',
    copied: 'کاپي شو!',
    copy: 'کاپي کول',
    show: 'ښودل',
    hide: 'پټول',
    expand: 'غځول',
    collapse: 'راټولول',
    seeMore: 'نور وګورئ',
    seeLess: 'کمه وګورئ',
    showingTopOf: 'تر ټولو مهم {{current}} له {{total}} سرچینو څخه ښودل کېږي',
    selectLanguage: 'ژبه وټاکئ',
    personalizedRecommendationsLabel: 'شخصي سپارښتنې',
    exploreResourcesNowLabel: 'اوس سرچینې وپلټئ',
    curatedAdviceLabel: 'د بریا لپاره غوره شوې سپارښتنې',

    // Accessibility and UI labels
    toggleSidebar: 'څنګ پټه پر/بند کړئ',
    toggleMobileMenu: 'موبایل مېنو پر/بند کړئ',
    feedback: 'نظریات',
    openInNewTab: 'په نوي ټب کې پرانیزئ',
    removeBookmark: 'له خوندي شویو لرې کول',
    editResource: 'سرچینه سمول',
    deleteResource: 'سرچینه ړنګول',
    dragToReorder: 'د بیا ترتیبول لپاره کش کړئ',
    saveOrPrintOptions: 'خوندي یا چاپ انتخابونه',
    filterByCategory: 'د کټګورۍ له مخې فلټر',
    openChatAssistant: 'د بریجټ AI مرستیال چټ پرانیزئ',
    askBridget: 'له بریجټ څخه وپوښتئ',
    bridgitComingSoonTitle: 'بریجټ: ډېر ژر راځي!',
    bridgitComingSoonDescription: 'زموږ د AI مرستیال بریجټ اوس مهال د پراختیا په حال کې دی. د تازه معلوماتو لپاره انتظار وکړئ!',

    // Content section headers
    description: 'توضیحات',
    services: 'خدمتونه',
    languages: 'ژبې',
    languagesSupported: 'ملاتړ کېدونکې ژبې',
    available: 'شته',
    resources: 'سرچینې',
    exploreResources: 'سرچینې وپلټئ',

    // Admin interface
    authenticationRequired: 'تصدیق ته اړتیا ده',
    organizationName: 'د سازمان نوم',
    website: 'وېب پاڼه',
    shortDescription: 'لنډ توضیح',
    fullDescription: 'د خدمتونو او پروګرامونو بشپړې جزییات',
    affiliation: 'اړوندتیا',
    financialData: 'مالي معلومات',
    serviceDetails: 'د خدمتونو جزییات',
    categories: 'کټګورۍ',
    servicesProvided: 'ورکړل شوي خدمتونه',
    totalResources: 'ټولې سرچینې',
    publishingStatus: 'د خپرولو حالت',
    totalUsers: 'ټول کاروونکي',
    adminUsers: 'اداري کاروونکي',
    demoUsers: 'ډیمو کاروونکي',
    noResourcesFound: 'هیڅ سرچینه ونه موندل شوه',

    // Form placeholders
    placeholders: {
      organizationName: 'د سازمان نوم',
      briefDescription: 'لنډه توضیح',
      detailedDescription: 'د خدمتونو او پروګرامونو تفصیلي توضیحات',
      organizationAffiliation: 'اړوند سازمان یا شبکه',
      partnersCollaborating: 'ملګري او همکار سازمانونه',
      availableOnline: 'آنلاین شتون لري',
    },

    // Additional UI elements
    backToHome: 'بېرته کور ته',
    goHome: 'کور ته لاړ شئ',
    browseResources: 'سرچینې وپلټئ',
    needPersonalizedRecommendations: 'شخصي سپارښتنې غواړئ؟',
    personalizedRecommendationsDescription:
      'زموږ لنډه سروې واخلئ څو ستاسو لپاره ځانګړې ټاکل شوې سرچینو سره یو دودیز لړلیک تر لاسه کړئ.',
    getYourPersonalRoadmap: 'خپل شخصي سړک نقشه تر لاسه کړئ',
    allRightsReserved: 'ټول حقونه خوندي دي',
    initiativeOfPittsburghTomorrow: 'د Pittsburgh Tomorrow نوښت',
    viewingAsUserNotification:
      'تاسو پایونیر د {{role}} کاروونکي په توګه ګورئ. تجربه د ستاسو رول لپاره شخصي شوې ده.',
    priorityResourcesForYou: 'ستاسو لپاره لومړیتوب سرچینې',

    // Empty priority categories state
    noPriorityCategoriesMessage: 'ستاسو د سروې ځوابونو پر بنسټ، تاسو اوس مهال ځانګړي مرستې ته اړتیا نلرئ. که ستاسو وضعیت بدل شي، تاسو کولی شئ خپل پروفایل تازه کړئ. که نه، د ټولو شتون لرونکو سرچینو سپړلو لپاره آزاد احساس وکړئ.',
    editProfile: 'پروفایل تازه کړئ',
    exploreAllResources: 'ټولې سرچینې وګورئ',

    // Priority Categories
    priorityCategories: {
      housing: 'استوګنځای',
      education: 'زده کړه',
      income: 'عواید',
      first_things_first: 'لومړی مهم کارونه',
      meeting_people: 'له خلکو سره لیدنه',
      kids_activities: 'د ماشومانو فعالیتونه',
      faith_communities: 'دیني ټولنې',
      sports_wellness: 'ورزش او هوساینه',
      arts_entertainment: 'هنرونه او تفریح',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'د ارزانه کورونو موندل او مالي ملاتړ.',
      education: 'مسلکي انګلیسي او د نورو ژبو ملاتړ.',
      income: 'د دندې لټون او د مهارتونو پراختیا لپاره ملاتړ.',
      first_things_first: 'د بیړني مرستې، رواني روغتیا او نوم لیکنې سره مرسته.',
      meeting_people: 'د مسلکي شبکو او ټولنیزو پیښو له لارې اړیکه ونیسئ.',
      kids_activities: 'د کورنۍ او ماشومانو برنامې شتون لري.',
      faith_communities: 'سیمه ایز دیني او کلتوري ډلې ومومئ.',
      sports_wellness: 'د سپورت او تفریحي فرصتونه وپلټئ.',
      arts_entertainment: 'د سیمه ایزو هنرونو او کلتوري پیښو کشف وکړئ.',
    },

    // Bookmarks page
    viewAndManageBookmarks: 'خوندي شوې سرچینې وګورئ او مدیریت یې کړئ',
    searchYourBookmarks: 'خوندي شوي ولټوئ...',
    showingBookmarks: '{{count}} له {{total}} خوندي شویو څخه ښودل کېږي',
    showingBookmarksPaginated: '{{start}}-{{end}} له {{total}} خوندي شویو څخه ښودل کېږي',
    failedToLoadBookmarks: 'خوندي شوي رانه بار نه شول. مهرباني وکړئ بیا هڅه وکړئ.',
    bookmarkedOn: 'په دې نیټه خوندي شوی',
    noBookmarksMatchFilters: 'ستاسو د اوسني فلټرونو سره هیڅ خوندي شوی سمون نه لري.',

    // Additional UI elements - screening form
    stepOf: 'ګام {{current}} له {{total}}',
    percentComplete: '{{percent}}٪ بشپړ',
    previousButton: 'مخکینی',
    nextButton: 'بل',
    creatingYourPlan: 'ستاسو پلان جوړېږي...',
    completeAssessment: 'ارزونه بشپړه کړئ',

    // Bookmarks empty state
    noBookmarksYet: 'تر اوسه خوندي شوي نشته',
    startExploringBookmark: 'سرچینې وپلټئ او هغه خوندي کړئ چې ګټورې وي!',
    pageOf: 'پاڼه {{current}} له {{total}}',

    // Roadmap panel
    yourPersonalizedRoadmap: 'ستاسو شخصي سړک نقشه',
    resourcesReadyForYou: '{{count}} سرچینې ستاسو لپاره چمتو دي',
    seeMoreResources: 'ټولې سرچینې وپلټئ',
    discoveringPerfectResources: 'ستاسو لپاره مناسبې سرچینې لټول کېږي',
    noRecommendationsYet:
      'ستاسو شخصي سپارښتنې چمتو کېږي. د پیل لپاره زموږ د سرچینو لارښود وپلټئ.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'پاڼه ونه موندل شوه',
    pageNotFoundDescription: 'هغه پاڼه چې تاسو يې لټوئ شتون نلري یا منتقل شوې.',
  },
}


