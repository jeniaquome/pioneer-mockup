import type { TranslationStructure } from '../types'
import { englishTranslations } from './en'

// Standard Uzbek (Tashkent-based), formal register (Siz)
export const uzbekTranslations: TranslationStructure = {
  ...englishTranslations,

  // Navigation
  nav: {
    ...englishTranslations.nav,
    home: 'Bosh sahifa',
    dashboard: 'Boshqaruv paneli',
    adminDashboard: 'Administrator paneli',
    welcome: 'Xush kelibsiz',
    resources: 'Resurslar',
    bookmarks: 'Saqlanganlar',
    about: 'Haqida',
    myChecklist: 'Roʻyxat',
    signIn: 'Kirish',
    signUp: 'Roʻyxatdan oʻtish',
    accountSettings: 'Profil sozlamalari',
    signOut: 'Chiqish',
    settings: 'Sozlamalar',
  },

  // Homepage
  homepage: {
    ...englishTranslations.homepage,
    heroTitle: 'Pittsburgh Tomorrow Pioneer\'ga xush kelibsiz',
    heroWelcomeTo: 'Xush kelibsiz',
      heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Pittsburghda yangi hayotni boshlash uchun shaxsiy qoʻllanmangiz — Bepul, Maxfiy, Koʻp tilli',
    heroExtendedDescription: 'Pittsburghga koʻchib kelmoqdamisiz? Oʻnlab saytlarni qidirishga yoki bir xil savollarni qayta-qayta berishga soatlab vaqt sarflamang. Pittsburgh Tomorrow Pioneer — bu yangi kelganlar tez va ishonch bilan joylashishiga yordam beradigan barcha resurslar uchun bepul shaxsiy qoʻllanma — uy-joy va maktablardan til, imon va jamiyat hayotigacha. Bu Pittsburghda yangi bobni boshlashning eng toʻliq, vaqtni tejaydigan va samimiy usuli.',
    howCanWeHelp: 'Bugun Sizga qanday yordam bera olamiz?',
    howCanWeHelpSubtitle: 'Shaxsiy tavsiyalar uchun yoʻlni tanlang',
    createRoadmapTitle: 'Shaxsiy yoʻl xaritangizni yarating',
    createRoadmapDescription:
      'Qisqa soʻrovnomani toʻldiring va ehtiyoj hamda maqsadlaringizga mos shaxsiy harakat rejasini oling.',
    getStarted: 'Boshlash',
    browseResourcesTitle: 'Resurslarni ko‘rib chiqish',
    browseResourcesDescription:
      'Toifalar bo‘yicha tartiblangan xizmatlar, tashkilotlar va resurslar katalogimizni ko‘ring.',
    exploreDirectory: 'Katalogni ko‘rish',
    askBridgetTitle: 'Bridgitdan so‘rang',
    askBridgetDescription:
      'Savollaringizga AI yordamchisidan tezkor javob oling. Siz tanlagan tilda 24/7 mavjud.',
    startChatting: 'Suhbatni boshlash',
    saveProgressQuestion:
      'Jarayoningizni saqlab, shaxsiy funksiyalardan foydalanishni xohlaysizmi?',
    signIn: 'Kirish',
    createAccount: 'Hisob yaratish',
    servicesNote:
      'Barcha xizmatlar to\'liq bepul, qat\'iy maxfiy va ingliz, ispan, arab, fransuz, xitoy hamda suahili kabi 16+ tilda mavjud.',

    // Trust badges
    hundredPercentFree: '100% bepul',
    privateSecure: 'Maxfiy va xavfsiz',
    multilingualSupport: 'Ko\'p tilli yordam',
    languagesSupported:
      'Ispan, arab, fransuz, mandarin va suahili jumladan 16+ til qo\'llab-quvvatlanadi.',
  },

  // Resource search (subset)
  resources: {
    ...englishTranslations.resources,
    title: 'Resurslarni topish',
    searchPlaceholder: 'Resurslarni qidirish...',
    allCategories: 'Barcha toifalar',
    housing: 'Uy-joy',
    educationESL: 'Ta’lim / ESL',
    socialNetworking: 'Ijtimoiy / Tarmoq',
    noResourcesFound: 'Qidiruv yoki filtrlarga mos keladigan resurslar topilmadi.',
    backToAllCategories: 'Barcha toifalarga qaytish',
    backToCategory: '{{category}} ga qaytish',
    welcomeToCategory: '{{category}} ga xush kelibsiz',
    categoryDescription: {
      housing: 'Uy-joy yordami, ijaraga yordam va mahalla resurslarini toping',
      foodAssistance: 'Oziq-ovqat banklari, ovqat dasturlari va ovqatlanish yordamini toping',
      entrepreneurHiring: 'Biznes resurslari, ish o‘rinlari va yollash yordamini kashf eting',
      youthEducation: 'Ta’lim dasturlari, repetitorlik va o‘quv resurslariga kirish',
      eslImmigrant: 'Ingliz tili kurslari, immigratsiya xizmatlari va madaniy qo‘llab-quvvatlash',
      socialConnection: 'Jamoa guruhlari, madaniy tadbirlar va ijtimoiy faoliyatlarga qo‘shiling',
    },
    refreshBookmarks: 'Saqlanganlarni yangilash (sinov)',
    compare: 'Taqqoslash ({{count}}/3)',
    filterByLanguage: 'Til bo‘yicha filtrlash:',
    showingResults: '{{total}} resursdan {{current}} tasi ko‘rsatilmoqda',
    categoryTitles: {
      housingProcess: 'Pittsburghda uy-joy jarayoni',
      housingProcessDescription: 'Uy-joy izlash jarayoni va talablar haqida bilib oling',
    },
    exploreResources: 'Resurslarni ko‘rish',
    categoryNotFound: 'Toifa topilmadi',
    subcategoryNotFound: 'Pastki toifa topilmadi',
    clearFilters: 'Filtrlarni tozalash',
    showingResultsFor: 'uchun',
    showingResultsIn: 'ichida',
    compareSelected: 'Tanlanganlarni taqqoslash',
    noResourcesFoundCategory: 'Bu toifa uchun resurs topilmadi.',
    browseSubcategoryDescription: 'Ushbu pastki toifadagi resurslarni ko\'rib chiqing.',
    
    // Global search
    globalSearch: {
      placeholder: 'Barcha resurslarni qidirish...',
      button: 'Qidirish',
    },
    searchResults: {
      title: 'Qidiruv natijalari',
      for: 'uchun',
      noResults: 'Qidiruvingizga mos keladigan resurslar topilmadi.',
      tryDifferent: 'Boshqa qidiruv so\'zini sinab ko\'ring.',
    },

    // Individual category pages
    categoryPages: {
      welcomePrefix: '{{category}} ga xush kelibsiz',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Pittsburghda uy-joy jarayoni',
        housingProcessDesc: 'Uy-joy izlash jarayoni va talablar haqida bilib oling',
        neighborhoodResources: 'Mahalla va ko‘chmas mulk resurslari',
        neighborhoodResourcesDesc: 'Mahallalarni va ko‘chmas mulk ma’lumotlarini kashf eting',
        housingAssistanceSubcat: 'Uy-joy yordami',
        housingAssistanceSubcatDesc: 'Ijaraga to‘g‘ridan-to‘g‘ri yordam va uy-joy qo‘llab-quvvatlovi',

        // Food subcategories
        culturalFood: 'Madaniy taomlar markazi',
        culturalFoodDesc: 'Xalqaro bozorlari va madaniy taomlar resurslari',
        foodPantries: 'Oziq-ovqat banklari',
        foodPantriesDesc: 'Favqulodda oziq-ovqat yordami va omborlar',
        groceryGuide: 'Do‘konlar yo‘riqnomasi',
        groceryGuideDesc: 'Mahalliy oziq-ovqat do‘konlari va xarid qilish yordami',

        // Employment subcategories
        hiringHub: 'Siz muhojirmisiz yoki ish izlayotgan yangimisiz?',
        hiringHubDesc: 'Bizning Yollash markazimizni ko‘ring!',
        entrepreneurship: 'Pittsburghdagi tadbirkorlik resurslari',
        entrepreneurshipDesc: 'Biznesni rivojlantirish va startap resurslari',

        // Education subcategories
        schoolResources: 'Yangi maktab topish resurslarini izlayapsizmi?',
        schoolResourcesDesc: 'Maktabga yozilish va ta’lim resurslari',
        tutoring: 'Kollejga tayyorgarlik yoki repetitor kerakmi?',
        tutoringDesc: 'Repetitorlik xizmatlari va kollejga tayyorgarlik',
        gedResources: 'GED olishni xohlaysizmi?',
        gedResourcesDesc: 'GEDga tayyorgarlik va kattalar ta’limi',

        // ESL & Immigration subcategories
        eslResources: 'ESL resurslarini qidiryapsizmi?',
        eslResourcesDesc: 'Ingliz tilini o‘rganish va kurslar',
        documentation: 'Hujjatlar bo‘yicha yordam',
        documentationDesc: 'Immigratsiya qog‘ozlari va yuridik qo‘llab-quvvatlov',
        basicNeeds: 'Asosiy ehtiyojlar yordami',
        basicNeedsDesc: 'Muhim xizmatlar va favqulodda qo‘llab-quvvatlov',

        // Social subcategories
        fosterConnection: 'Aloqalarni mustahkamlash resurslari',
        fosterConnectionDesc: 'Ijtimoiy guruhlar va jamoa qurish',
        culturalResourcesSocial: 'Taom va madaniyat resurslari',
        culturalResourcesSocialDesc: 'Madaniy tadbirlar va taom an’analari',
        faithGroups: 'Diniy guruhlar',
        faithGroupsDesc: 'Diniy jamoalar va ma’naviy qo‘llab-quvvatlov',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
        'community-belonging': 'Jamoa va tegishlilik',
        'culture-leisure': 'Madaniyat, san’at va hordiq',
        'esl-immigrant': 'ESL va Immigratsiya yordami',
        'education-youth': 'Ta’lim: Kattalar va yoshlar',
        'living-essentials': 'Hayotiy ehtiyojlar',
        'work-business': 'Ish va biznes resurslari',
      },
      categoryDescriptions: {
        'community-belonging': 'Pittsburghda bog‘laning, qatnashing va jamoa quring',
        'culture-leisure': 'San’at, oilaviy faoliyat, hobbi va tungi hayotni kashf eting',
        'esl-immigrant': 'Til o‘rganish, immigratsiya yordami va yangi kelganlar uchun xizmatlar',
        'education-youth': 'Kattalar ta’limi, repetitorlik va yoshlar uchun imkoniyatlar',
        'living-essentials': 'Uy-joy, sog‘liq, transport va oziq-ovqat',
        'work-business': 'Ish o‘rinlari, martaba yordami va biznes resurslari',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'Hukumat',
        'civic-advocacy': 'Mahalliy himoya',
        'civic-volunteer': 'Ko‘ngillilik',
        'civic-youth': 'Yoshlar ishtiroki',
        religion: 'Din',
        'social-connection': 'Ijtimoiy aloqalar',

        // Culture & Leisure
        art: 'San’at',
        family: 'Oilaviy hordiq',
        'beauty-hair': 'Soch parvarishi / Go‘zallik',
        'hobby-spaces': 'Hobbi maydonlari',
        'night-life': 'Tungi hayot',

        // ESL & Immigrant Support
        'esl-support': 'Ingliz tili (ESL) yordami',
        'general-law': 'Umumiy huquq',
        'immigration-asylum': 'Immigratsiya / Boshpana',
        'refugee-immigrant-support': 'Qochqin / muhojirlar yordami',

        // Education & Youth
        'adult-education': 'Kattalar ta’limi',
        'college-prep-tutoring': 'Kollejga tayyorgarlik / Repetitorlik',
        'youth-education': 'Yoshlar ta’limi',
        'youth-programming': 'Yoshlar dasturlari',

        // Living Essentials
        'food-pantries': 'Oziq-ovqat banklari',
        'grocery-guide': 'Do‘konlar yo‘riqnomasi',
        'specialty-stores': 'Maxsus do‘konlar',
        'guide-discover-pittsburgh': 'Pittsburghni kashf eting',
        'guide-diverse-businesses': 'Turli bizneslar',
        'guide-immigrant-services': 'Muhojirlar uchun xizmatlar',
        'health-additional-support': 'Qo‘shimcha qo‘llab-quvvatlov',
        'health-body-mind': 'Tana va ong parvarishi',
        'health-hospitals': 'Shifoxonalar',
        'health-nutrition': 'Oziqlanish',
        'health-senior-care': 'Keksalar parvarishi',
        'housing-buying-home': 'Uy xaridi',
        'housing-assistance': 'Uy-joy yordami',
        'housing-relocating': 'Pittsburghga ko‘chish',
        'housing-rent': 'Ijaraga olish',
        transportation: 'Transport',

        // Work & Business
        'business-development': 'Biznesni rivojlantirish',
        'business-support': 'Biznesga yordam',
        'career-support': 'Martaba yordami',
        'internship-opportunities': 'Amaliyot imkoniyatlari',
      },
      groups: {
        'civic-engagement': 'Fuqarolik ishtiroki',
        legal: 'Yuridik',
        food: 'Oziq-ovqat',
        'pittsburgh-guides': 'Pittsburgh qo‘llanmalari',
        health: 'Sog‘liq',
        housing: 'Uy-joy',
        transit: 'Transport',
      },
    },
  },

  // Common elements (subset)
  common: {
    ...englishTranslations.common,
    dashboard: 'Boshqaruv paneli',
    loading: 'Yuklanmoqda...',
    search: 'Qidirish',
    filter: 'Filtrlash',
    next: 'Keyingi',
    previous: 'Oldingi',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    confirm: 'Tasdiqlash',
    edit: 'Tahrirlash',
    delete: 'O‘chirish',
    close: 'Yopish',
    back: 'Ortga',
    backToResources: 'Resurslarga qaytish',
    viewDetails: 'Tafsilotlarni ko‘rish',
    learnMore: 'Batafsil',
    getHelp: 'Yordam olish',
    startNow: 'Hoziroq boshlang',
    tryNow: 'Sinab ko‘ring',
    downloadNow: 'Yuklab olish',
    visitWebsite: 'Tashrif buyurish',
    shareThis: 'Ulashish',
    copied: 'Nusxa olindi!',
    copy: 'Nusxa olish',
    show: 'Ko‘rsatish',
    hide: 'Yashirish',
    expand: 'Yoyish',
    collapse: 'Yig‘ish',
    seeMore: 'Ko‘proq ko‘rish',
    seeLess: 'Kamroq ko‘rish',
    showingTopOf: 'Eng muhim {{current}} tasi {{total}} ta resurs ichidan ko‘rsatilmoqda',
    selectLanguage: 'Tilni tanlash',
    personalizedRecommendationsLabel: 'Shaxsiy tavsiyalar',
    exploreResourcesNowLabel: 'Resurslarni hoziroq ko‘ring',
    curatedAdviceLabel: 'Muvaffaqiyat uchun tanlangan tavsiyalar',

    // Accessibility and UI labels
    toggleSidebar: 'Yon panelni almashtirish',
    toggleMobileMenu: 'Mobil menyuni almashtirish',
    feedback: 'Fikr-mulohaza',
    openInNewTab: 'Yangi oynada ochish',
    removeBookmark: 'Saqlanganlardan olib tashlash',
    editResource: 'Resursni tahrirlash',
    deleteResource: 'Resursni o‘chirish',
    dragToReorder: 'Qayta tartiblash uchun torting',
    saveOrPrintOptions: 'Saqlash yoki chop etish',
    filterByCategory: 'Toifa bo‘yicha filtrlash',
    openChatAssistant: 'BRIDGIT yordamchisi bilan chatni ochish',
    askBridget: 'Bridgitdan so\'rang',
    bridgitComingSoonTitle: 'BRIDGIT: Tez orada!',
    bridgitComingSoonDescription: 'Bizning AI yordamchimiz BRIDGIT hozirda ishlab chiqilmoqda. Yangilanishlarni kuting!',

    // Content section headers
    description: 'Tavsif',
    services: 'Xizmatlar',
    languages: 'Tillar',
    languagesSupported: 'Qo‘llab-quvvatlanadigan tillar',
    available: 'Mavjud',
    resources: 'Resurslar',
    exploreResources: 'Resurslarni ko‘rish',

    // Additional UI elements
    backToHome: 'Bosh sahifaga qaytish',
    goHome: 'Bosh sahifaga',
    browseResources: 'Resurslarni ko\'rish',
    needPersonalizedRecommendations: 'Shaxsiy tavsiyalar kerakmi?',
    personalizedRecommendationsDescription:
      'Tezkor so‘rovnomamizni to‘ldirib, aynan Siz uchun tanlangan resurslar bilan moslashtirilgan ro‘yxatni oling.',
    getYourPersonalRoadmap: 'Shaxsiy yo‘l xaritangizni oling',
    allRightsReserved: 'Barcha huquqlar himoyalangan',
    initiativeOfPittsburghTomorrow: 'Pittsburgh Tomorrow tashabbusi',
    viewingAsUserNotification:
      'Siz Pittsburgh Tomorrow Pioneer’ni {{role}} foydalanuvchisi sifatida ko‘ryapsiz. Tajriba rolingizga moslashtirilgan.',
    priorityResourcesForYou: 'Siz uchun muhim resurslar',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: "So'rovnoma javoblaringizga asoslanib, sizga hozircha maxsus yordam kerak emas. Agar vaziyatingiz o'zgarsa, profilingizni yangilashingiz mumkin. Aks holda, barcha mavjud resurslarni bemalol o'rganing.",
    editProfile: 'Profilni Yangilash',
    exploreAllResources: "Barcha Resurslarni O'rganing",
    
    // Priority Categories
    priorityCategories: {
      ...englishTranslations.common.priorityCategories,
      housing: 'Uy-joy',
      education: 'Ta\'lim',
      income: 'Daromad',
      first_things_first: 'Birinchi navbatda',
      meeting_people: 'Odamlar bilan tanishish',
      kids_activities: 'Bolalar uchun mashg\'ulotlar',
      faith_communities: 'Diniy jamoalar',
      sports_wellness: 'Sport va salomatlik',
      arts_entertainment: 'San\'at va ko\'ngilochar',
    },
    
    // Descriptions for priority categories
    priorityCategoryDescriptions: {
      housing: 'Arzon uy-joy topish va moliyaviy yordam.',
      education: 'Professional ingliz tili va boshqa tillar yordami.',
      income: 'Ish qidirish va ko\'nikmalarni rivojlantirish yordami.',
      first_things_first: 'Favqulodda yordam, ruhiy salomatlik va ro\'yxatdan o\'tish yordami.',
      meeting_people: 'Professional tarmoqlar va ijtimoiy tadbirlar orqali bog\'lanish.',
      kids_activities: 'Oila va bolalar dasturlari mavjud.',
      faith_communities: 'Mahalliy diniy va madaniy guruhlarni toping.',
      sports_wellness: 'Sport va dam olish imkoniyatlarini o\'rganing.',
      arts_entertainment: 'Mahalliy san\'at va madaniy tadbirlarni kashf eting.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'Saqlangan resurslaringizni ko\'ring va boshqaring',
    searchYourBookmarks: 'Saqlanganlar bo\'yicha qidirish...',
    showingBookmarks: 'Ko\'rsatilmoqda: {{total}} tadan {{count}} tasi',
    showingBookmarksPaginated: 'Ko\'rsatilmoqda: {{total}} tadan {{start}}-{{end}}',
    failedToLoadBookmarks: 'Saqlanganlarni yuklash muvaffaqiyatsiz. Qayta urinib ko\'ring.',
    bookmarkedOn: 'Saqlangan sana',
    noBookmarksMatchFilters: 'Hozirgi filtrlaringizga mos keladigan saqlanganlar yo\'q.',

    // Additional UI elements - screening form
    stepOf: 'Qadam {{current}} / {{total}}',
    percentComplete: '{{percent}}% bajarildi',
    previousButton: 'Oldingi',
    nextButton: 'Keyingi',
    creatingYourPlan: 'Rejangiz yaratilyapti...',
    completeAssessment: 'Baholashni yakunlash',

    // Bookmarks empty state
    noBookmarksYet: 'Hozircha saqlanganlar yo\'q',
    startExploringBookmark: 'Resurslarni ko\'rib chiqing va foydali deb topganlaringizni saqlang!',
    pageOf: 'Sahifa {{current}} / {{total}}',
    yourPersonalizedRoadmap: 'Shaxsiy yo\'l xaritangiz',
    resourcesReadyForYou: 'Siz uchun {{count}} ta resurs tayyor',
    seeMoreResources: 'Barcha resurslarni ko\'rish',
    discoveringPerfectResources: 'Sizga mos resurslar aniqlanmoqda',
    noRecommendationsYet: 'Shaxsiy tavsiyalar tayyorlanmoqda. Boshlash uchun resurslar katalogini ko\'ring.',
  },

  // Toolkit interface
  toolkit: {
    ...englishTranslations.toolkit,
    title: 'YANGI KELGANLAR UCHUN VOSITALAR TO‘PLAMI',
    description:
      'Pittsburghda joylashish va ravnaq topish uchun kerakli resurslar va qo‘llab-quvvatlovni toping',
    categories: {
      housingAssistance: 'Uy-joy yordami',
      foodAssistance: 'Oziq-ovqat yordami',
      entrepreneurHiringHub: 'Tadbirkorlik va ishga qabul qilish markazi',
      youthAdultEducation: 'Yoshlar va kattalar ta’limi resurslari',
      eslImmigrantConnection: 'ESL va muhojirlar bilan bog‘lanish xizmatlari',
      socialConnectionCulture: 'Ijtimoiy aloqalar va madaniyat',
    },
    chat: {
      bridgitTitle: 'BRIDGIT bilan suhbat',
      bridgitDescription: 'Safaringiz uchun shaxsiy yordam va yo‘l-yo‘riq oling',
    },
  },

  // Footer (subset)
  footer: {
    ...englishTranslations.footer,
      aboutPioneer: 'Pittsburgh Tomorrow Pioneer haqida',
    aboutDescription:
      'Pittsburgh Tomorrow Pioneer Pittsburgh va Allegheny Countyga yangi kelganlarga yo‘l topishda yordam beradi. Qaysi yo‘lni tanlamang, Sizni to‘g‘ri resurs va imkoniyatlar bilan bog‘laymiz.',
    quickLinks: 'Tezkor havolalar',
    home: 'Bosh sahifa',
    about: 'Haqida',
    resources: 'Resurslar',
    privacyPolicy: 'Maxfiylik siyosati',
    getStarted: 'Boshlash',
    contact: 'Bog‘lanish',
    location: 'Pittsburgh, PA shahridan salom',
    email: 'Email: Hello@pittsburghtomorrow.org',
  },

  // Dashboard (subset)
  dashboard: {
    ...englishTranslations.dashboard,
    signInExplore: 'Shaxsiy Pittsburgh sayohatingizni ko‘rish uchun kiring',
      signInToPioneer: 'Pittsburgh Tomorrow Pioneer’ga kirish',
    welcomeTitle: 'Pittsburgh Tomorrow Pioneer’ga xush kelibsiz, {{name}}!',
    welcomeTitleWithoutName: 'Pittsburgh Tomorrow Pioneer’ga xush kelibsiz!',
    journeyContinues: 'Sizning shaxsiy sayohatingiz davom etadi...',
    beginJourney: 'Shaxsiy Pittsburgh sayohatingizni boshlang',
    completedSurveyHeader: 'So‘rovnomani allaqachon to‘ldirgansiz',
    completedSurveyText:
      'Onboarding so‘rovnomasini to‘ldirdingiz. Quyida shaxsiy yo‘l xaritangizni ko‘ring yoki tavsiyalarni yangilash uchun javoblaringizni tahrirlang.',
    completedSurveyTextWithDate:
      '{{date}} kuni onboarding so‘rovnomasini to‘ldirdingiz. Quyida shaxsiy yo‘l xaritangizni ko‘ring yoki tavsiyalarni yangilash uchun javoblaringizni tahrirlang.',
    editResponses: 'Javoblarni tahrirlash',
    viewMyRoadmap: 'Yo‘l xaritamni ko‘rish',
    noteLabel: 'Eslatma:',
    editRegenerateNote:
      'So‘rovnoma javoblarini tahrirlasangiz, shaxsiy tavsiyalar va yo‘l xaritasi yangilangan afzalliklaringizga mos ravishda avtomatik qayta yaratiladi.',
    bridgitHelp:
      'So‘rovnoma qamrab olmagan savollaringiz bormi? Shaxsiy yordam uchun pastki o‘ngdagi BRIDGIT chatbotini bosing!',
    personalizedRoadmap: 'Shaxsiy yo‘l xaritangiz',
    unlockExperience: 'MOSLASHTIRILGAN TAJRIBANI OCHING',
    completeSurveyHeader: 'Boshlash uchun so‘rovnomani to‘ldiring',
    completeSurveyText:
      'Pittsburghdagi ehtiyoj va maqsadlaringizga mos shaxsiy resurs tavsiyalarini olish uchun 5 daqiqalik tezkor so‘rovnomamizni to‘ldiring.',
  },

  // Profile page
  profile: {
    ...englishTranslations.profile,
    title: 'Profil sozlamalari',
    subtitle: 'Shaxsiy ma’lumotlaringiz va afzalliklaringizni boshqaring',
    accountInformation: 'Hisob ma’lumotlari',
    accountInformationDescription: 'Hisobingizning asosiy tafsilotlarini yangilang',
    basicInformation: 'Asosiy ma’lumotlar',
    basicInformationDescription: 'Shaxsiy asosiy ma’lumotlaringizni yangilang',
    firstName: 'Ism',
    enterFirstName: 'Ismingizni kiriting',
    lastName: 'Familiya',
    enterLastName: 'Familiyangizni kiriting',
    username: 'Foydalanuvchi nomi',
    enterUsername: 'Foydalanuvchi nomini kiriting',
    email: 'Elektron pochta',
    emailChangeNote: 'Elektron pochtani o‘zgartirib bo‘lmaydi. Agar yangilash kerak bo‘lsa, qo‘llab-quvvatlovga murojaat qiling.',
    emailCannotBeChanged: 'Elektron pochtani o‘zgartirib bo‘lmaydi. Yangilash uchun qo‘llab-quvvatlov bilan bog‘laning.',
    surveyRequired: 'Avval so‘rovnomani to‘ldiring',
    surveyRequiredDescription: 'Shaxsiy tavsiyalarni olish va so‘rovnoma javoblarini tahrirlash uchun avval dastlabki baholashni to‘ldirishingiz kerak.',
    takeSurvey: 'So‘rovnomani to‘ldirish',
    basicQuestions: 'Asosiy ma’lumotlar',
    basicQuestionsDescription: 'Shaxsiy tavsiyalarni olish uchun o‘zingiz va holatingiz haqida ayting',
    selectPrimary: 'Asosiy afzalligingizni tanlang:',
    selectOption: 'Variantni tanlang...',
    supportNeeds: 'Qo‘llab-quvvatlov va ehtiyojlar',
    supportNeedsDescription: 'Qanday turdagi qo‘llab-quvvatlov va xizmatlar kerak?',
    selectMultiple: 'Mos barchasini tanlang:',
    selectAtLeastOne: 'Iltimos, kamida bitta variantni tanlang.',
    timelinePreferences: 'Vaqt reja va afzalliklar',
    timelinePreferencesDescription: 'Vaqt rejangiz va texnologiya afzalliklaringiz',
    backToDashboard: 'Boshqaruv paneliga qaytish',
    languageAndCultural: 'Til va madaniy kelib chiqish',
    languageAndCulturalDescription: 'Yaxshiroq shaxsiy tavsiyalar berishimizga yordam bering',
    primaryLanguage: 'Asosiy til',
    selectPrimaryLanguage: 'Asosiy tilni tanlang',
    culturalBackground: 'Madaniy kelib chiqish',
    selectCulturalBackground: 'Madaniy kelib chiqishni tanlang',
    professionalAndLiving: 'Kasbiy va turmush holati',
    professionalAndLivingDescription: 'Bu tegishli resurslar va xizmatlarni tavsiya qilishga yordam beradi',
    professionalStatus: 'Kasbiy holati',
    selectProfessionalStatus: 'Kasbiy holatingizni tanlang',
    housingSituation: 'Uy-joy holati',
    selectHousingSituation: 'Uy-joy holatini tanlang',
    familyStatus: 'Oila holati',
    selectFamilyStatus: 'Oila holatini tanlang',
    saveChanges: 'O‘zgarishlarni saqlash',
    saving: 'Saqlanmoqda...',
    recalculatingRecommendations: 'Tavsiyalar qayta hisoblanmoqda...',
    profileUpdated: 'Profil yangilandi',
    profileUpdatedDescription: 'Profilingiz muvaffaqiyatli yangilandi.',
    accountUpdated: 'Hisob yangilandi',
    accountUpdatedDescription: 'Hisob ma’lumotlaringiz muvaffaqiyatli yangilandi. Afzalliklarni saqlash uchun so‘rovnomani to‘ldiring.',
    updateFailed: 'Yangilash muvaffaqiyatsiz',
    updateFailedDescription: 'Profilni yangilash amalga oshmadi. Iltimos, qayta urinib ko‘ring.',
    pleaseLogIn: 'Profilni ko‘rish uchun tizimga kiring.',

    // Language options
    languages: {
      english: 'Ingliz tili',
      spanish: 'Ispan tili',
      french: 'Fransuz tili',
      arabic: 'Arab tili',
      chinese: 'Xitoy tili',
      swahili: 'Suaxili',
      hindi: 'Hind tili',
      portuguese: 'Portugal tili',
      russian: 'Rus tili',
      nepali: 'Nepal tili',
      somali: 'Somali tili',
      tagalog: 'Tagalog',
      turkish: 'Turk tili',
      other: 'Boshqa',
    },

    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'Amerikalik/G‘arbiy',
      westAfrican: 'G‘arbiy Afrika',
      middleEasternNorthAfrican: 'Yaqin Sharq/Shimoliy Afrika',
      southAsian: 'Janubiy Osiyo (Bhutanliklar jumladan)',
      latinoHispanic: 'Latino/Ispaniyzabon',
      eastAsian: 'Sharqiy Osiyo',
      easternEuropean: 'Sharqiy Yevropa',
      other: 'Boshqa/Aytishni xohlamayman',
    },

    // Professional status options
    professionalStatuses: {
      student: 'Talaba',
      graduateStudent: 'Magistr/doktorant',
      softwareEngineer: 'Dasturiy ta’minot muhandisi',
      healthcareProfessional: 'Sog‘liqni saqlash mutaxassisi',
      researchScientist: 'Tadqiqotchi olim',
      seekingEmployment: 'Ish qidirmoqda',
      employedFullTime: 'To‘liq stavkada ishlaydi',
      employedPartTime: 'Qisman stavkada ishlaydi',
      selfEmployed: 'O‘zini o‘zi band qilgan',
      retired: 'Nafaqada',
      other: 'Boshqa',
    },

    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Vaqtinchalik uy-joy',
      campusHousing: 'Kampusdagi uy-joy',
      apartmentHunting: 'Kvartira izlash',
      rentingApartment: 'Kvartira ijarasi',
      rentingHouse: 'Uy ijarasi',
      homeowner: 'Uy egasi',
      livingWithFamily: 'Oila bilan yashaydi',
      sharedHousing: 'Birga yashash',
      other: 'Boshqa',
    },

    // Family status options
    familyStatuses: {
      single: 'Yolg‘iz',
      married: 'Uylangan/Turmushga chiqqan',
      familyWithChildren: 'Bolali oila',
      singleParent: 'Yolg‘iz ota-ona',
      extendedFamily: 'Keng oilada',
      other: 'Boshqa',
    },
  },

  // About page
  about: {
    ...englishTranslations.about,
    title: 'Pittsburgh Tomorrow Pioneer haqida',
    description:
      'Pittsburgh Tomorrow Pioneer Pittsburgh va Allegheny okrugida joylashishda Sizga ko‘maklashadigan qulay qo‘llanma. Siz texnologiya mutaxassisi bo‘lasizmi yoki yangi boshlanish izlayotgan yangi kelgan bo‘lasizmi — Pittsburgh Tomorrow Pioneer Sizni uy-joy, ta’lim, ish va jamoa bo‘yicha mahalliy resurslar bilan bog‘laydi.',
    features: [
      '161+ notijorat tashkilot',
      'Shaxsiy ro‘yxatlar va yo‘l xaritalari',
      'Mustaqil va an’anaviy muhojirlar uchun qo‘llab-quvvatlov',
      'Ehtiyojlaringizga moslashgan oson so‘rovnoma',
    ],
    conclusion:
      'Ushbu loyiha mahalliy hamkorlar va ko‘ngillilar hamkorligida ishlab chiqilgan bo‘lib, Pittsburghni hamma uchun quchoq ochuvchi, qo‘llab-quvvatlovchi va imkoniyatlarga boy shahar qilishga bag‘ishlangan.',
    copyright: 'Pittsburgh Tomorrow Pioneer. Barcha huquqlar himoyalangan.',

    // AboutPage specific content
    welcomeText:
      'Pittsburgh Tomorrow Pioneer\'ga xush kelibsiz — Pittsburgh va Allegheny okrugida yangi hayotni boshlash uchun shaxsiy qo\'llanmangiz. Siz AQSHga yaqinda kelgan bo\'lsangiz ham yoki Pittsburghning energiya, robototexnika, AI, hayotiy fanlar yoki po\'lat sohasidagi rivojlanayotgan kompaniyalaridan birida yangi ish boshlagan bo\'lsangiz ham — Pittsburgh Tomorrow Pioneer Sizga yordam beradi. Uy-joy topishdan tortib, farzandlaringizni maktabga yozish, ingliz tili kurslarini izlash, diniy jamoalar yoki mahalliy oziq-ovqat yordami bilan bog\'lanishgacha — zarur resurslarning barchasi bir joyda.',
    
    whyPioneerTitle: 'Nega Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'Chunki yangi shaharda yangi boshlanish noldan boshlash demak emas.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer Pittsburgh va Allegheny okrugida yangi hayot boshlash uchun kerak bo\'lgan hamma narsani bir joyga to\'playdi — ishonchli va foydalanish uchun qulay.',
    whyPioneerText3: 'Bu bepul, to\'liq va qidiruv, taqqoslash va taxmin qilishda soatlab vaqtni tejash uchun yaratilgan. Uy-joy qidirayotgan bo\'lsangiz, farzandlaringizni maktabga yozdirayotgan bo\'lsangiz, ingliz tilini o\'rganayotgan bo\'lsangiz yoki e\'tiqod, til yoki qiziqishlaringizni baham ko\'radigan odamlarni qidirayotgan bo\'lsangiz — Pittsburgh Tomorrow Pioneer ko\'chishingizni osonlashtirish va yangi hayotingizni boyitish uchun hech qanday imkoniyatni o\'tkazib yubormasligingizga ishonch hosil qiladi.',
    whyPioneerText4: 'Google qidiruvi sizga hamma narsani ko\'rsatsa, Pittsburgh Tomorrow Pioneer sizga haqiqatan muhim narsani ko\'rsatadi.',
    whyPioneerText5: 'AI chatbot javoblar bersa, Pioneer sizga yo\'l xaritasini beradi.',
    whyPioneerText6: 'Ko\'pgina ko\'chish vositalari logistikada to\'xtasa, Pioneer jamiyatdan boshlanadi.',
    whyPioneerText7: 'Bu Pittsburgh, shaxsiy yaratilgan.',
    
    youAreThePioneerTitle: 'Siz — Pionersiz',
    youAreThePioneerText1:
      'Siz shunchaki ko\'chayotganingiz yo\'q — Siz yangi narsani boshlayapsiz. Yangi ish. Yangi maktab. Yangi uy. Balki yangi til yoki madaniyat ham. Bu jur\'at talab qiladi.',
    youAreThePioneerText2:
      'Biz Pittsburgh Tomorrow Pioneer\'ni Sizni qo\'llab-quvvatlash uchun yaratdik — chunki Siz Pionersiz. Ushbu sayt Pittsburghda kelajagingizni qurayotganingizda Siz bilan birga bo\'lish uchun yaratilgan.',
    howPioneerHelpsTitle: 'Pittsburgh Tomorrow Pioneer qanday yordam beradi',

    madeForYouTitle: 'Siz uchun yaratilgan — Qaerdan bo\'lishingizdan qat\'i nazar',
    madeForYouDescription:
      'Hamma ham ingliz tilida so\'zlashmaydi. Shu sababli Pittsburgh Tomorrow Pioneer ispan, arab, fransuz, xitoy, dariy va boshqa ko\'plab tillarni qo\'llab-quvvatlaydi. Agar o\'z ona tilingizda yozsangiz, Pittsburgh Tomorrow Pioneer ham o\'sha tilda javob beradi.',

    personalRoadmapTitle: 'Shaxsiy yo\'l xaritangizni yarating',
    personalRoadmapDescription:
      'Bizning eng kuchli vositamiz — Sizning shaxsiy yo\'l xaritangiz. Uy-joy, oziq-ovqat, ish, ta\'lim kabi ehtiyojlaringiz haqida bir nechta oddiy savollarga javob berish orqali Pittsburgh Tomorrow Pioneer keyingi qadamlarga moslashtirilgan harakat rejasini yaratadi. Siz quyidagilarni qilishingiz mumkin:',
    personalRoadmapFeatures: [
      'Yo\'l xaritangizni istalgan vaqtda ko\'rish va yangilash',
      'Kirish orqali jarayonni saqlash (ixtiyoriy)',
      'Ro\'yxatingizni yuklab olish yoki chop etish',
      'Pittsburghdagi hayotingiz rivojlangani sayin yo\'l xaritangizni qayta ko\'rib chiqish va takomillashtirish',
    ],
    personalRoadmapNote:
      'Agar o\'zingizga qulay tezlikda o\'rganishni xohlasangiz, login qilmasdan ham resurslar kutubxonasini ko\'rib chiqishingiz mumkin.',

    smartSupportTitle: 'Aqlli, o\'zingizga yo\'naltirilgan yordam',
    smartSupportDescription:
      'Pittsburgh Tomorrow Pioneer yuzlab keng tarqalgan savollarga javob berishga o\'rgatilgan qulay AI chatbotini taqdim etadi. U Sizni resurslarga yo\'naltiradi, mahalliy tizimlar qanday ishlashini tushuntiradi va keyingi qadamda yordam beradi. Bundan tashqari, bizning ishonchli hamkorlarimiz — davlat idoralari, notijorat tashkilotlar, xizmat ko\'rsatuvchilar — bo\'yicha to\'liq aloqa ma\'lumotlari katalogi mavjud.',

    trustedPartnersTitle: 'Ishonchli hamkorlar',
    trustedPartnersDescription:
      'Pittsburgh va Allegheny okrugi bo\'ylab ishonchli hamkorlarimiz — davlat idoralari, notijorat tashkilotlar va xizmat ko\'rsatuvchilar katalogiga kirishingiz mumkin. Bizning tarmog\'imizda Sizning aniq ehtiyojlaringizga yordam berishga tayyor 380+ notijorat tashkilot mavjud.',

    privacyTitle: 'Sizning maxfiyligingiz himoyalangan',
    privacyDescription:
      'Maxfiyligingiz va xavfsizligingiz biz uchun muhim. Agar hisob yaratsangiz, shaxsiy ma\'lumotlaringiz SOC II standartlariga mos xavfsizlik protokollari bilan himoyalanadi. Biz Sizning ma\'lumotlaringizni hech qachon sotmaymiz yoki ulashmaymiz. Siz har doim o\'z ma\'lumotlaringizni to\'liq boshqarasiz.',

    pittsburghTomorrowTitle: 'Pittsburgh Tomorrow haqida',
    pittsburghTomorrowText1:
      'Pittsburgh Tomorrow Pioneer — Pittsburgh Tomorrow notijorat tashkilotining tashabbusi bo\'lib, Pittsburghni rivojlantirishga xizmat qiladi. Biz tarixchi Devid MakKallough "Amerikaning ajralmas shahri" deb atagan ruhni yangicha talqin qiluvchi harakatni kuchaytiryapmiz.',
    pittsburghTomorrowText2:
      'Amerikani poydevordan qurgan mintaqa bugun ham yangi hayotiylik va fuqarolik ruhi bilan yashamoqda: yangi kelganlarni qabul qilish, tadbirkorlarni boshlash va yangi yo\'llarni ochish. Bizning harakatimiz — imkoniyatlardan foydalanayotgan va kelajakni qurayotgan yangi avlod pionerlari tomonidan ilhomlantirilgan.',
    pittsburghTomorrowText3:
      'Pittsburgh Tomorrow\'da bizning maqsadimiz Pittsburghni rivojlantirishdir. Va bu faqat aholi yoki iqtisodiy o\'sish emas; bu shaharimiz ruhini qayta tiklashdir. Kichik biznes va tadbirkorlarni qo\'llab-quvvatlash. Atrof-muhitimizni go\'zallashtirish va himoya qilish. San\'at va madaniyatni rivojlantirish. Yangi kelganlarni qabul qilish va jamiyat qurish. Shaharimiz bilan faxrlanish va uni xaritaga qaytarish.',
    pittsburghTomorrowLink: 'Batafsil ma\'lumot',

    // Call to action section
    readyToStartTitle: 'Pittsburghda Safaringizni Boshlang',
    readyToStartDescription:
      'Yangi uyingizda joylashish va rivojlanishga yordam beradigan shaxsiy yo\'l xaritangizni yarating.',
    getStarted: 'Boshlash',
    browseResources: 'Resurslarni ko\'rish',
  },

  // Screening page (survey)
  screening: {
    ...englishTranslations.screening,
    title: 'O‘zingiz haqingizda bizga ayting',
    description:
      'Pittsburghda yashash va ravnaq topish uchun shaxsiy qo‘llanma yaratishimiz uchun bir nechta tezkor savollarga javob bering.',
    saveRoadmapBanner:
      'Hisob yaratib, shaxsiy yo‘l xaritangizni saqlang. Hozir anonim tarzda so‘rovnomani to‘ldirib, keyin kirib saqlashingiz mumkin.',

    // Progress indicator
    progress: 'Jarayon',
    completed: '{{total}} tadan {{count}} tasi bajarildi',

    // Questions
    questions: {
      audience: {
        question: 'Qaysi tavsif Sizning holatingizni eng yaxshi ifodalaydi?',
        options: [
          'Talaba/Mutaxassis (Pittsburgh mintaqasidagi universitetda o‘qiyman yoki tashkilotda ishlayman)',
          'Qaytgan (oldin bu yerda yashaganman, ketganman va endi Pittsburgh mintaqasiga qaytdim)',
          'Qochqin yoki Vaqtinchalik himoya maqomi (yaqinda bu yerga joylashtirildim yoki boshqa shahardan ko‘chib keldim)',
          'Ko‘chib keluvchi (AQSHning boshqa shahridan Pittsburghga ko‘chib kelyapman)',
          'Tadbirkor (o‘z biznesimni qurayapman)',
          'Masofadan ishlovchi xodim',
          'Boshqa',
        ],
      },
      primaryLanguage: {
        question: 'Sizning asosiy tilingiz qaysi?',
        options: [
          'Ingliz tili (English)',
          'Ispan tili (Español)',
          'Arab tili (العربية)',
          'Suaxili (Kiswahili)',
          'Oʻzbek tili (Oʻzbekcha)',
          'Nepalcha/Butancha (नेपाली / རྫོང་ཁ)',
          'Dari/Pashto (دری / پښتو)',
          'Mandarin xitoy tili (中文)',
          'Boshqa',
        ],
      },
      culturalBackground: {
        question: 'Qaysi madaniy yoki mintaqaviy kelib chiqish Sizni eng yaxshi ifodalaydi?',
        options: [
          'Oq tanli',
          'Qora tanli yoki afro-amerikalik (Afrika va Karib kelib chiqishi ham kiradi)',
          'Ispaniyzabon yoki Latino/a/x',
          'Osiyolik (masalan: xitoy, hind, vetnamlik)',
          'Yaqin Sharq yoki Shimoliy Afrika',
          'Gavayilik yoki boshqa Tinch okeani orolliklari',
          'Amerika hindulari yoki Alyaska mahalliylari',
          'Afrikalik (masalan: nigeriyalik, efiyopiyalik, g‘analik va h.k.)',
          'Karib mintaqasi (masalan: yamaykalik, gaiti, trinidadlik va h.k.)',
          'Boshqa',
          'Javob bermaslikni afzal ko‘raman',
        ],
      },
      housingNeed: {
        question: 'Qanday turdagi uy-joy yordami kerak?',
        options: [
          'Mahallalar va bozor narxidagi kvartiralarni topishda yordam',
          'Arzon uy-joy dasturlari va yordam',
          'Vaqtinchalik/zudlikdagi uy-joy',
          'Birga yashash/hamxona topish',
          'Uy sotib olishga urinishda yordam',
          'Menda uy-joy bor',
        ],
      },
      professionalStatus: {
        question: 'Sizning hozirgi kasbiy holatingiz qanday?',
        options: [
          'Talaba (bakalavr/magistr/kasb-hunar maktabi)',
          'Texnologiya mutaxassisi/muhandis',
          'Sog‘liqni saqlash/hayotiy fanlar mutaxassisi',
          'Akademik/tadqiqotchi',
          'Ish qidirmoqda',
          'Yaqinda bitirgan, ish izlayapti',
          'Boshqa mutaxassis',
        ],
      },
      languageSupport: {
        question: 'Qanday til yordami foydali bo‘lar edi?',
        options: [
          'Ingliz tili darslari (ESL) — boshlang‘ichdan o‘rtachagacha',
          'Kasbiy ingliz tilida muloqot ko‘nikmalari',
          'Hujjatlarni tarjima qilish xizmatlari',
          'Ingliz tilida suhbat mashqlari',
          'Til bo‘yicha yordam kerak emas',
        ],
      },
      employment: {
        question: 'Qaysi turdagi ish bo‘yicha yordam Sizni qiziqtiradi?',
        options: [
          'Kasbiy tarmoqlar va martaba o‘sishi',
          'Ish qidirish va rezume bo‘yicha yordam',
          'Ko‘nikmalar bo‘yicha treninglar va sertifikat dasturlari',
          'Sanoatga xos tarmoq (texnologiya, sog‘liqni saqlash va h.k.)',
          'Ish bo‘yicha yordam kerak emas, rahmat',
        ],
      },
      communityPriorities: {
        question: 'Qaysi jamoa aloqalari Siz uchun eng muhim? (Mos barchasini tanlang)',
        options: [
          'Kasbiy tarmoqlar va sanoat uchrashuvlari',
          'Madaniy va dini jamoalar',
          'Ijtimoiy faoliyat va hordiq',
          'Oila va bolalar xizmatlari',
          'Sport va dam olish faoliyatlari',
          'San’at va madaniy tadbirlar',
          'Hech biri',
        ],
      },
      immediateNeeds: {
        question: 'Eng zudlikdagi ehtiyojlaringiz nimalar? (Mos barchasini tanlang)',
        options: [
          'Odamlar bilan tanishish va yangi do‘stlar orttirish',
          'Asosiy xizmatlar (sog‘liqni saqlash, bank, transport)',
          'Bolalar uchun maktabga yozilish',
          'Yuridik/immigratsiya bo‘yicha yordam',
          'Ruhiy salomatlik va farovonlik yordami',
          'Zudlikdagi yordam (ovqat, boshpana)',
          'Hech biri',
        ],
      },
      timeline: {
        question: 'Pittsburgh hududida joylashish uchun vaqt rejangiz qanday?',
        options: [
          'Yaqinda keldim (oxirgi bir oy ichida)',
          'Yaqinda keldim (1–6 oy)',
          'Tez orada kelishni rejalashtiryapman (keyingi 3 oy)',
          'Uzoq muddatli rejalashtirish (6+ oy)',
          'Allaqachon Pittsburgh hududida joylashganman',
        ],
      },
      // techComfort removed
    },

    // Form messages
    pleaseAnswer: 'Iltimos, bu savolga javob bering.',
    pleaseAnswerAll: 'Davom etish uchun barcha savollarga javob bering',
    creatingGuide: 'Qo‘llanmangiz yaratilmoqda...',
    seePersonalizedGuide: 'Shaxsiy qo‘llanmamni ko‘rish',
    screeningQuestionnaire: 'So‘rovnoma',
  },

  // Privacy Policy
  privacy: {
    ...englishTranslations.privacy,
    backToAbout: 'Haqida sahifasiga qaytish',
    title: 'Ma’lumotlar shaffofligi va maxfiylik bayonoti',
    description:
      'Pittsburgh Tomorrow’da biz shaffoflik va Sizning ishonchingizni qadrlaymiz. Sizga nima uchun ayrim ma’lumotlarni so‘rayotganimiz, ulardan qanday foydalanishimiz va bu Sizga qanday foyda berishini aniq tushuntirishga ishonamiz.',

    whyWeAskTitle: 'Nega bu savollarni beramiz va ma’lumotlaringizdan qanday foydalanamiz:',
    whyWeAskDescription:
      'Berayotgan savollarimiz Siz uchun moslashtirilgan yo‘l xaritasini yaratishimizga xizmat qiladi. Javoblaringiz quyidagilarga imkon beradi:',
    whyWeAskBullet1:
      'Ehtiyojlaringizga mos ravishda bazamizdan tegishli resurs va ma’lumotlarni olish.',
    whyWeAskBullet2:
      'Turli jamoa va kelib chiqishlar bo‘ylab odamlarga teng erishayotganimizni ta’minlash.',
    whyWeAskBullet3:
      'Qaysi guruhlarni yetarlicha qamrab olmaganimizni aniqlash va ularga yaxshiroq yetib borish.',
    whyWeAskBullet4:
      'AI vositalarimizni barcha foydalanuvchilarga samarali xizmat ko‘rsatishi uchun yaxshilash.',
    weDoNotSell:
      'Biz ma’lumotlaringizni sotmaymiz. U faqat yuqoridagi maqsadlar uchun ishlatiladi.',

    dataRetentionTitle: "Ma'lumotlarni saqlash:",
    dataRetentionDescription:
      "Shaxsiylashtirilgan panelingizga endi kirishni xohlamasligingizni bildirguningizga qadar ma'lumotlaringiz bazamizda saqlanadi. Shundan so'ng, ma'lumotlaringiz anonimlashtiriladi va faqat AI xizmatlarimizni yaxshilash, Pittsburghga yangi kelganlarga yordam berish uchun ishlatiladi.",

    quomeTitle: "Quome ma'lumotlaringizdan qanday foydalanadi:",
    quomeDescription:
      "Saytimiz Quome tomonidan xost qilinadi. U platformani ishga tushirish va yaxshilash uchun ayrim ma'lumotlarni to'plashi mumkin. Quome ma'lumotlaringizdan qanday foydalanishi va uni qanday himoya qilishi haqida ularning",

    skillBuilderTitle: "Skill Builder ma'lumotlaringizdan qanday foydalanadi:",
    skillBuilderDescription:
      "Saytimizdagi chatbot SkillBuilder.io tomonidan xost qilinadi va platformani ishlatish hamda yaxshilash uchun ayrim ma'lumotlarni to'plashi mumkin. SkillBuilder.io ma'lumotlaringizdan qanday foydalanishi va uni qanday himoya qilishi haqida ularning",

    contactDescription:
      'Ma’lumotlarimizdan foydalanish yoki maxfiylik amaliyotlarimiz haqida savollaringiz bo‘lsa, har bir sahifaning o‘ng tomonidagi Fikr‑mulohaza tugmasi orqali biz bilan bog‘laning.',
    privacyPolicyLink: 'Maxfiylik siyosati',
  },

  // Auth pages
  auth: {
    ...englishTranslations.auth,
    demoMode: 'Demo rejimi',
    demoModeDescription:
      'Turli foydalanuvchi profillari bilan Pittsburgh Tomorrow Pioneer’ni sinab ko‘ring va tajriba ehtiyojlaringizga qanday moslashishini ko‘ring',
    whatYouExperience: 'Nimani ko‘rasiz',
    immigrantUser: 'Muhojir foydalanuvchi',
    immigrantFeatures: {
      emergency: 'Favqulodda resurslar ustuvor',
      multilingual: 'Ko‘p tilli yordam',
      settlement: 'Joylashishga yo‘naltirilgan kontent',
    },
    studentUser: 'Talaba foydalanuvchi',
    studentFeatures: {
      academic: 'Akademik resurslar',
      campus: 'Kampusga xos ma’lumotlar',
      career: 'Kasbiy yo‘l-yo‘riq',
    },
    professionalUser: 'Mutaxassis foydalanuvchi',
    professionalFeatures: {
      networking: 'Sanoat tarmoqlari',
      services: 'Kasbiy xizmatlar',
      advancement: 'Martaba o‘sishi',
    },
    localHelper: 'Mahalliy ko‘makchi',
    localFeatures: {
      community: 'Jamoa resurslari',
      volunteer: 'Ko‘ngillilik imkoniyatlari',
      support: 'Qo‘llab-quvvatlov tarmoqlari',
    },
    signIn: 'Kirish',

    // Authentication required page
    authenticationRequired: 'Autentifikatsiya talab qilinadi',
    loginToAccessPage: 'Ushbu sahifaga kirish uchun hisobingizga kirishingiz kerak.',
    
    // Login page
    emailVerified: 'Email tasdiqlandi',
    emailVerifiedDescription: 'Sizning emailingiz muvaffaqiyatli tasdiqlandi.',
    alreadySignedIn: 'Allaqachon kirdingiz',
    redirectingToDashboard: 'Sizning boshqaruv panelingizga yo\'naltirilmoqda...',
    signInDescription: 'Pittsburgh\'dagi shaxsiy resurslar va tavsiyalarga kirish uchun tizimga kiring.',
    signInWithAuth0: 'Kirish',
    signInHelp: 'Kirishda muammo bormi? Yordam uchun qo\'llab-quvvatlash xizmatiga murojaat qiling.',
    loginError: 'Kirish xatosi',
    loginErrorDescription: 'Kirishda muammo yuz berdi. Iltimos, qayta urinib ko\'ring.',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'O\'ylayapman...',
    curatingRecommendations: 'Shaxsiy tavsiyalar tayyorlanmoqda...',
    findingResources: 'Eng yaxshi resurslarni topmoqda...',
    complete: 'Tugallandi!',
    creatingYourPlan: 'Sizning Shaxsiy Rejangiz Yaratilmoqda',
    ready: 'Tayyor!',
    mayTakeAMoment: 'Tajribangizni shaxsiylashtirish uchun biroz vaqt ketishi mumkin...',
    seeMyRecommendations: 'Tavsiyalarimni ko\'rish',
    loadingHint: 'Tajribangizni shaxsiylashtirish uchun biroz vaqt ketishi mumkin...',
  },
  
  // Name Dialog
  nameDialog: {
    title: 'Sizni qanday chaqirishimiz kerak?',
    description: 'Ismingizni aytib, tajribangizni shaxsiylashtirish uchun bizga yordam bering.',
    firstName: 'Ism',
    firstNamePlaceholder: 'Ismingizni kiriting',
    lastName: 'Familiya',
    lastNamePlaceholder: 'Familiyangizni kiriting (ixtiyoriy)',
    skip: 'Hozir o\'tkazib yuborish',
    save: 'Ismni saqlash',
    saving: 'Saqlanmoqda...',
    firstNameRequired: 'Ism talab qilinadi',
    firstNameRequiredDescription: 'Davom etish uchun ismingizni kiriting.',
    nameUpdated: 'Ism yangilandi',
    nameUpdatedDescription: 'Ismingiz muvaffaqiyatli saqlandi.',
    updateFailed: 'Yangilash amalga oshmadi',
    updateFailedDescription: 'Ismingizni yangilab bo\'lmadi. Iltimos, qayta urinib ko\'ring.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Sahifa topilmadi',
    pageNotFoundDescription: 'Siz qidirayotgan sahifa mavjud emas yoki ko\'chirilgan.',
  },
}


