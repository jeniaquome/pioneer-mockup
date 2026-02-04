import type { TranslationStructure } from '../types'

export const swahiliTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'Nyumbani',
    dashboard: 'Dashibodi',
    adminDashboard: 'Dashibodi ya Msimamizi',
    welcome: 'Karibu',
    resources: 'Rasilimali',
    bookmarks: 'Rasilimali Zangu Zilizohifadhiwa',
    about: 'Kuhusu',
    myChecklist: 'Orodha Yangu',
    signIn: 'Ingia',
    signUp: 'Jisajili',
    accountSettings: 'Mipangilio ya Wasifu',
    signOut: 'Toka',
    settings: 'Mipangilio',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Karibu Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: 'Karibu',
      heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Mwongozi wako wa kibinafsi wa kuanza maisha mapya huko Pittsburgh — Bure, Ya Siri, Lugha Nyingi',
    heroExtendedDescription: 'Unahamia Pittsburgh? Usitumie masaa mengi kutafuta tovuti nyingi au kuuliza maswali sawa tena na tena. Pittsburgh Tomorrow Pioneer ni mwongozi wako wa kibinafsi na wa bure kwa kila rasilimali inayosaidia wageni wapya kuishi haraka na kwa ujasiri — kutoka makazi na shule hadi lugha, imani, na maisha ya jamii. Ni njia kamili zaidi, inayookoa muda, na ya kukaribishwa zaidi ya kuanza sura yako mpya huko Pittsburgh.',
    howCanWeHelp: 'Tunawezaje kukusaidia leo?',
    howCanWeHelpSubtitle: 'Chagua njia yako kupata mapendekezo ya kibinafsi',
    createRoadmapTitle: 'Unda Ramani Yako',
    createRoadmapDescription: 'Jibu utafiti mfupi ili upokee mpango wa hatua ulioboreshwa unaokuongoza kwa mahitaji na malengo yako maalum.',
    getStarted: 'Anza',
    browseResourcesTitle: 'Vinjari Rasilimali',
    browseResourcesDescription: 'Chunguza saraka yetu kamili ya huduma, mashirika, na rasilimali zilizopangwa kwa makundi.',
    exploreDirectory: 'Chunguza Saraka',
    askBridgetTitle: 'Uliza BRIDGIT',
    askBridgetDescription: 'Pata majibu ya haraka ya maswali yako kutoka kwa msaidizi wetu wa AI. Inapatikana saa 24/7 kwa lugha unayopendelea.',
    startChatting: 'Anza Mazungumzo',
    saveProgressQuestion: 'Unataka kuhifadhi maendeleo yako na kupata vipengele vya kibinafsi?',
    signIn: 'Ingia',
    createAccount: 'Unda Akaunti',
    servicesNote: 'Huduma zote ni za bure kabisa, za siri kikamilifu, na zinapatikana kwa lugha zaidi ya 16 ikiwa ni pamoja na Kiingereza, Kihispania, Kiarabu, Kifaransa, Kichina, na Kiswahili.',
    
    // Trust badges
    hundredPercentFree: '100% Bure',
    privateSecure: 'Ya Siri na Salama',
    multilingualSupport: 'Msaada wa Lugha Nyingi',
    languagesSupported: 'Inasaidia lugha 16+ ikijumuisha Kihispania, Kiarabu, Kifaransa, Mandarin na Kiswahili.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'Hali ya Onyesho',
    demoModeDescription: 'Jaribu Pittsburgh Tomorrow Pioneer na wasifu tofauti wa watumiaji uone jinsi uzoefu unavyobadilika kulingana na mahitaji yako',
    whatYouExperience: 'Utakachopata',
    immigrantUser: 'Mtumiaji Mhamiaji',
    immigrantFeatures: {
      emergency: 'Rasilimali za dharura zimepewa kipaumbele',
      multilingual: 'Msaada wa lugha nyingi',
      settlement: 'Maudhui yanayolenga makazi',
    },
    studentUser: 'Mtumiaji Mwanafunzi',
    studentFeatures: {
      academic: 'Rasilimali za kitaaluma',
      campus: 'Maelezo maalum ya kampu',
      career: 'Mwongozo wa kazi',
    },
    professionalUser: 'Mtumiaji Mtaalamu',
    professionalFeatures: {
      networking: 'Mitandao ya viwanda',
      services: 'Huduma za kitaalamu',
      advancement: 'Maendeleo ya kazi',
    },
    localHelper: 'Msaidizi wa Mtaa',
    localFeatures: {
      community: 'Rasilimali za jumuiya',
      volunteer: 'Fursa za kujitolea',
      support: 'Mitandao ya msaada',
    },
    signIn: 'Ingia',
    
    // Authentication required page
    authenticationRequired: 'Uhakikisho Unahitajika',
    loginToAccessPage: 'Unahitaji kuwa umeingia ili kupata ukurasa huu.',
    
    // Login page
    emailVerified: 'Barua Pepe Imethibitishwa',
    emailVerifiedDescription: 'Barua pepe yako imethibitishwa kwa mafanikio.',
    alreadySignedIn: 'Tayari Umeingia',
    redirectingToDashboard: 'Unarudishwa kwenye dashibodi yako...',
    signInDescription: 'Ingia ili kupata rasilimali na mapendekezo ya kibinafsi ya Pittsburgh.',
    signInWithAuth0: 'Ingia',
    signInHelp: 'Una shida ya kuingia? Wasiliana na msaada wa kiufundi.',
    loginError: 'Hitilafu ya Kuingia',
    loginErrorDescription: 'Kulikuwa na tatizo wakati wa kuingia. Tafadhali jaribu tena.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'Jaribu Akaunti za Onyesho',
    experienceDifferentPerspectives: 'Pata uzoefu wa Pittsburgh Tomorrow Pioneer kutoka mitazamo ya watumiaji tofauti',
    email: 'Barua pepe:',
    password: 'Nywila:',
    loginAs: 'Ingia kama mtumiaji wa {{role}}',
    demoTip: 'Akaunti hizi za onyesho zinaonyesha uzoefu tofauti wa watumiaji na maudhui ya kibinafsi',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'Ninafikiria...',
    curatingRecommendations: 'Ninachagua mapendekezo ya kibinafsi...',
    findingResources: 'Ninatafuta rasilimali bora...',
    complete: 'Imekamilika!',
    creatingYourPlan: 'Ninaunda Mpango Wako wa Kibinafsi',
    ready: 'Tayari!',
    mayTakeAMoment: 'Hii inaweza kuchukua muda kidogo tunapobadilisha uzoefu wako...',
    seeMyRecommendations: 'Ona mapendekezo yangu',
    loadingHint: 'Hii inaweza kuchukua muda kidogo tunapobadilisha uzoefu wako...',
  },
  
  // Screening page
  screening: {
    title: 'Tuambie kuhusu wewe',
    description: 'Jibu maswali machache ya haraka ili tuweze kuunda mwongozo wako wa kibinafsi wa kuishi na kustawi huko Pittsburgh.',
    saveRoadmapBanner: 'Hifadhi ramani yako ya kibinafsi kwa kuunda akaunti. Unaweza kujaza hojaji sasa bila kutajwa jina na kuingia baadaye kuihifadhi.',
    
    // Progress indicator
    progress: 'Maendeleo',
    completed: '{{count}} kati ya {{total}} zimekamilika',
    
    // Questions
    questions: {
      audience: {
        question: 'Nini kinachoelezea hali yako vizuri zaidi?',
        options: [
          'Mwanafunzi/Mtaalamu (anasoma katika chuo kikuu cha eneo la Pittsburgh au anafanya kazi kwa shirika)',
          'Mrejea (niliwahi kuishi hapa, nikahama na sasa nimerudi eneo la Pittsburgh)',
          'Mkimbizi au mwenye Hali ya Ulinzi wa Muda (nimehamishiwa hapa hivi karibuni au nimetoka jiji lingine)',
          'Mhamiaji (nahamia Pittsburgh kutoka jiji lingine ndani ya Marekani)',
          'Mjasiriamali (najenga biashara yangu mwenyewe)',
          'Mfanyakazi wa mbali',
          'Nyingine',
        ],
      },
      primaryLanguage: {
        question: 'Lugha yako kuu ni ipi?',
        options: [
          'Kiingereza (English)',
          'Kihispania (Español)',
          'Kiarabu (العربية)',
          'Kiswahili',
          'Kiuzbeki (Oʻzbekcha)',
          'Kinepali/Kibhutan (नेपाली / རྫོང་ཁ)',
          'Dari/Pashto (دری / پښتو)',
          'Kichina cha Mandarin (中文)',
          'Nyingine',
        ],
      },
      culturalBackground: {
        question: 'Ni asili gani ya kitamaduni au ya kikanda inayokuelezea vyema?',
        options: [
          'Mzungu',
          'Mweusi au Mmarekani-Mweusi (ikiwemo asili ya Afrika na Karibiani)',
          'Mhispania au Mlatino/a/x',
          'Mwaasia (mf. Mchina, Mhindi, Mvietnamu)',
          'Mashariki ya Kati au Afrika Kaskazini',
          'Mkazi Asili wa Hawaii au Kisiwa Kingine cha Pasifiki',
          'Mwamerika Asili au Mwamerika wa Alaska Asili',
          'Mwaafrika (mf. Mnigeria, Mwethiopia, Mghana, n.k.)',
          'Mkaribiani (mf. Mjamaika, Mhaiti, Mtrinidadi, n.k.)',
          'Nyingine',
          'Sipendi kujibu',
        ],
      },
      housingNeed: {
        question: 'Aina gani ya msaada wa makazi unahitaji?',
        options: [
          'Msaada wa kupata mitaa na nyumba/apartment za bei ya soko',
          'Msaada wa makazi nafuu na programu',
          'Makazi ya muda/ya dharura',
          'Makazi ya pamoja/ulinganifu wa wapangaji',
          'Msaada wa kujaribu kununua nyumba',
          'Nina makazi salama',
        ],
      },
      professionalStatus: {
        question: 'Hali yako ya sasa ya kitaalamu ni ipi?',
        options: [
          'Mwanafunzi (shahada/uzamili/shule ya ufundi)',
          'Mtaalamu wa teknolojia/mhandisi',
          'Mtaalamu wa huduma za afya/sayansi za maisha',
          'Mtaaluma/Mtafiti',
          'Kutafuta ajira',
          'Mhitiimu hivi karibuni anayetafuta kazi',
          'Mtaalamu mwingine',
        ],
      },
      languageSupport: {
        question: 'Msaada gani wa lugha utakuwa wa msaada?',
        options: [
          'Madarasa ya Kiingereza (ESL) - wa mwanzo hadi wa kati',
          'Ujuzi wa mawasiliano ya Kiingereza ya kitaalamu',
          'Huduma za utafsiri wa hati',
          'Mazoezi ya mazungumzo ya Kiingereza',
          'Hakuna msaada wa lugha unaohitajika',
        ],
      },
      employment: {
        question: 'Msaada gani wa ajira unakuvutia?',
        options: [
          'Mitandao ya kitaalamu na maendeleo ya kazi',
          'Msaada wa kutafuta kazi na msaada wa wasifu',
          'Mafunzo ya ujuzi na programu za vyeti',
          'Mitandao maalum ya viwanda (teknolojia, huduma za afya, n.k.)',
          'Hakuna msaada wa ajira unaohitajika, Asante',
        ],
      },
      communityPriorities: {
        question: 'Miunganiko gani ya jumuiya ni muhimu zaidi kwako? (Chagua yote yanayotumika)',
        options: [
          'Mitandao ya kitaalamu na mikutano ya viwanda',
          'Jumuiya za kitamaduni na za kidini',
          'Shughuli za kijamii na burudani',
          'Huduma za familia na watoto',
          'Shughuli za michezo na burudani',
          'Matukio ya sanaa na kitamaduni',
          'Hakuna hata moja ya haya',
        ],
      },
      immediateNeeds: {
        question: 'Mahitaji yako ya haraka zaidi ni yapi? (Chagua yote yanayotumika)',
        options: [
          'Kukutana na watu na kutengeneza marafiki wapya',
          'Huduma za kimsingi (huduma za afya, benki, usafiri)',
          'Usajili wa shule kwa watoto',
          'Msaada wa kisheria/wa uhamiaji',
          'Msaada wa afya ya akili na ustawi',
          'Msaada wa dharura (chakula, makazi)',
          'Hakuna hata moja ya haya',
        ],
      },
      timeline: {
        question: 'Ratiba yako ya kuishi katika eneo la Pittsburgh ni ipi?',
        options: [
          'Nimefika tu (ndani ya mwezi uliopita)',
          'Nimefika hivi karibuni (miezi 1-6)',
          'Ninapanga kufika hivi karibuni (miezi 3 ijayo)',
          'Upangaji wa muda mrefu (miezi 6+)',
          'Tayari nimekaa katika eneo la Pittsburgh',
        ],
      },
      // techComfort removed
    },
    
    // Form messages
    pleaseAnswer: 'Tafadhali jibu swali hili.',
    pleaseAnswerAll: 'Tafadhali jibu maswali yote ili kuendelea',
    creatingGuide: 'Ninaunda Mwongozo Wako...',
    seePersonalizedGuide: 'Ona Mwongozo Wangu wa Kibinafsi',
    screeningQuestionnaire: 'Hojaji ya Uchunguzi',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'KIFAA CHA WAGENI WAPYA',
    description: 'Pata rasilimali na msaada unaouhitaji kujipatia makazi na kustawi Pittsburgh',
    categories: {
      housingAssistance: 'Msaada wa Makazi',
      foodAssistance: 'Msaada wa Chakula',
      entrepreneurHiringHub: 'Kituo cha Ujasiriamali na Ajira',
      youthAdultEducation: 'Rasilimali za Elimu za Vijana na Wazee',
      eslImmigrantConnection: 'Huduma za Muunganisho wa ESL na Uhamiaji',
      socialConnectionCulture: 'Muunganisho wa Kijamii na Utamaduni',
    },
    chat: {
      bridgitTitle: 'Ongea na BRIDGIT',
      bridgitDescription: 'Pata msaada binafsi na mwongozo kwa safari yako',
    },
  },

  // Resource search
  resources: {
    title: 'Pata Rasilimali',
    searchPlaceholder: 'Tafuta rasilimali...',
    allCategories: 'Makundi Yote',      
    housing: 'Makazi',
    educationESL: 'Elimu / ESL',
    socialNetworking: 'Kijamii / Mitandao',
    noResourcesFound: 'Hakuna rasilimali zilizopatikana zinazounga mkono utafutaji au vichujio vyako.',
    backToAllCategories: 'Rudi kwenye Makundi Yote',
    backToCategory: 'Rudi kwenye {{category}}',
    welcomeToCategory: 'Karibu kwenye {{category}}',
    categoryDescription: {
      housing: 'Pata msaada wa makazi, msaada wa kodi na rasilimali za mtaa',
      foodAssistance: 'Pata mabenki ya chakula, mipango ya milo na msaada wa lishe',
      entrepreneurHiring: 'Gundua rasilimali za biashara, nafasi za kazi na msaada wa ajira',
      youthEducation: 'Fikia mipango ya kielimu, mafunzo binafsi na rasilimali za kujifunza',
      eslImmigrant: 'Unganisha na madarasa ya Kiingereza, huduma za uhamiaji na msaada wa kitamaduni',
      socialConnection: 'Jiunge na vikundi vya jamii, matukio ya kitamaduni na shughuli za kijamii',
    },
    refreshBookmarks: 'Onyesha Upya Alamisho (Utatuzi)',
    compare: 'Linganisha ({{count}}/3)',
    filterByLanguage: 'Chuja kwa Lugha:',
    showingResults: 'Inaonyesha {{current}} kati ya {{total}} rasilimali',
    categoryTitles: {
      housingProcess: 'Mchakato wa Makazi Pittsburgh',
      housingProcessDescription: 'Jifunze kuhusu mchakato wa kutafuta makazi na mahitaji',
    },
    exploreResources: 'Chunguza rasilimali',
    categoryNotFound: 'Kundi halijapatikana',
    subcategoryNotFound: 'Kundi ndogo halijapatikana',
    clearFilters: 'Futa Vichujio',
    showingResultsFor: 'kwa',
    showingResultsIn: 'katika',
    compareSelected: 'Linganisha Vilivyochaguliwa',
    noResourcesFoundCategory: 'Hakuna rasilimali zilizopatikana kwa kundi hili.',
    browseSubcategoryDescription: 'Vinjari rasilimali ndani ya kundi hili dogo.',
    
    // Global search
    globalSearch: {
      placeholder: 'Tafuta rasilimali zote...',
      button: 'Tafuta',
    },
    searchResults: {
      title: 'Matokeo ya Utafutaji',
      for: 'kwa',
      noResults: 'Hakuna rasilimali zilizopatikana zinazofanana na utafutaji wako.',
      tryDifferent: 'Jaribu neno lingine la utafutaji.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'Karibu kwenye',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Mchakato wa Makazi Pittsburgh',
        housingProcessDesc: 'Jifunze kuhusu mchakato wa kutafuta makazi na mahitaji',
        neighborhoodResources: 'Rasilimali za Mtaa na Mali',
        neighborhoodResourcesDesc: 'Gundua mitaa na habari za mali',
        housingAssistanceSubcat: 'Msaada wa Makazi',
        housingAssistanceSubcatDesc: 'Msaada wa moja kwa moja wa kodi na huduma za msaada wa makazi',
        
        // Food subcategories
        culturalFood: 'Kituo cha Chakula cha Kitamaduni',
        culturalFoodDesc: 'Masoko ya kimataifa na rasilimali za chakula cha kitamaduni',
        foodPantries: 'Mabenki ya Chakula',
        foodPantriesDesc: 'Msaada wa dharura wa chakula na ghala',
        groceryGuide: 'Mwongozo wa Maduka ya Vyakula',
        groceryGuideDesc: 'Maduka ya vyakula ya mtaani na msaada wa ununuzi',
        
        // Employment subcategories
        hiringHub: 'Je, wewe ni mhamiaji au mgeni mpya unayetafuta kazi?',
        hiringHubDesc: 'Angalia Kituo chetu cha Ajira!',
        entrepreneurship: 'Rasilimali za Ujasiriamali ndani ya Pittsburgh',
        entrepreneurshipDesc: 'Maendeleo ya biashara na rasilimali za biashara mpya',
        
        // Education subcategories
        schoolResources: 'Unatafuta rasilimali za kupata shule mpya?',
        schoolResourcesDesc: 'Usajili wa shule na rasilimali za kielimu',
        tutoring: 'Unatafuta maandalizi ya chuo kikuu au mkufunzi?',
        tutoringDesc: 'Huduma za ufundishaji na maandalizi ya chuo kikuu',
        gedResources: 'Unatafuta kupata GED yako?',
        gedResourcesDesc: 'Maandalizi ya GED na elimu ya watu wazima',
        
        // ESL & Immigration subcategories
        eslResources: 'Unatafuta rasilimali za ESL?',
        eslResourcesDesc: 'Kujifunza lugha ya Kiingereza na madarasa',
        documentation: 'Msaada wa Hati',
        documentationDesc: 'Karatasi za uhamiaji na msaada wa kisheria',
        basicNeeds: 'Msaada wa Mahitaji ya Msingi',
        basicNeedsDesc: 'Huduma muhimu na msaada wa dharura',
        
        // Social subcategories
        fosterConnection: 'Rasilimali za Kukuza Uhusiano',
        fosterConnectionDesc: 'Vikundi vya kijamii na ujenzi wa jamii',
        culturalResourcesSocial: 'Rasilimali za Chakula na Utamaduni',
        culturalResourcesSocialDesc: 'Matukio ya kitamaduni na mila za chakula',
        faithGroups: 'Vikundi vya Kidini',
        faithGroupsDesc: 'Jamii za kidini na msaada wa kiroho',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'Jumuiya na Uhusiano',
          'culture-leisure': 'Utamaduni, Sanaa na Burudani',
        'esl-immigrant': 'Msaada wa ESL na Uhamiaji',
          'education-youth': 'Elimu: Watu Wazima na Vijana',
          'living-essentials': 'Mahitaji Muhimu ya Maisha',
          'work-business': 'Ajira na Rasilimali za Biashara',
      },
      categoryDescriptions: {
        'community-belonging': 'Ungana, shiriki, na jenga jumuiya huko Pittsburgh',
        'culture-leisure': 'Gundua sanaa, shughuli za familia, burudani na maisha ya usiku',
        'esl-immigrant': 'Kujifunza lugha, msaada wa uhamiaji, na huduma kwa wageni wapya',
          'education-youth': 'Elimu ya watu wazima, ufundishaji, na fursa kwa vijana',
          'living-essentials': 'Makazi, afya, usafiri na chakula',
          'work-business': 'Kazi, msaada wa kazi, na rasilimali za biashara',
      },
      subcategories: {
        'civic-government': 'Serikali',
        'civic-advocacy': 'Utetezi wa mtaa',
        'civic-volunteer': 'Kujitolea',
        'civic-youth': 'Ushiriki wa vijana',
        religion: 'Dini',
        'social-connection': 'Uhusiano wa kijamii',
        art: 'Sanaa (Arts)',
        family: 'Burudani ya Familia',
        'beauty-hair': 'Utunzaji wa nywele / Urembo',
        'hobby-spaces': 'Maeneo ya burudani',
        'night-life': 'Maisha ya usiku',
        'esl-support': 'Msaada wa Kiingereza kama Lugha ya Pili (ESL)',
        'general-law': 'Sheria ya jumla',
        'immigration-asylum': 'Uhamiaji / Hifadhi',
        'refugee-immigrant-support': 'Msaada kwa wakimbizi / wahamiaji',
        'adult-education': 'Elimu ya watu wazima',
        'college-prep-tutoring': 'Maandalizi ya chuo / Ufundishaji',
        'youth-education': 'Elimu ya vijana',
        'youth-programming': 'Mipango ya vijana',
        'food-pantries': 'Benki za chakula',
        'grocery-guide': 'Mwongozo wa maduka ya vyakula',
        'specialty-stores': 'Maduka maalum',
        'guide-discover-pittsburgh': 'Gundua Pittsburgh',
        'guide-diverse-businesses': 'Biashara anuwai',
        'guide-immigrant-services': 'Huduma za wahamiaji',
        'health-additional-support': 'Msaada wa ziada',
        'health-body-mind': 'Huduma ya mwili na akili',
        'health-hospitals': 'Hospitali',
        'health-nutrition': 'Lishe',
        'health-senior-care': 'Huduma kwa wazee',
        'housing-buying-home': 'Kununua nyumba',
        'housing-assistance': 'Msaada wa makazi',
        'housing-relocating': 'Kuhamia Pittsburgh',
        'housing-rent': 'Kukodi',
        transportation: 'Usafiri wa umma',
        'business-development': 'Maendeleo ya biashara',
        'business-support': 'Msaada wa biashara',
        'career-support': 'Msaada wa kazi',
        'internship-opportunities': 'Fursa za mafunzo kwa vitendo',
      },
      groups: {
        'civic-engagement': 'Ushiriki wa kiraia',
        legal: 'Kisheria',
        food: 'Chakula',
        'pittsburgh-guides': 'Miongozo ya Pittsburgh',
        health: 'Afya',
        housing: 'Makazi',
        transit: 'Usafiri wa umma',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'Ninapakia orodha yako ya kibinafsi...',
  },
  
  // About page
  about: {
    title: 'Kuhusu Pittsburgh Tomorrow Pioneer',
    description: 'Pittsburgh Tomorrow Pioneer ni mwongozi wako rafiki wa kuishi huko Pittsburgh na Allegheny County. Iwe wewe ni mtaalamu wa teknolojia au mgeni anayetafuta mwanzo mpya, Pittsburgh Tomorrow Pioneer inakuunganisha na rasilimali za mtaa za makazi, elimu, ajira, na jumuiya.',
    features: [
      'Mashirika 161+ yasiyo ya faida',
      'Orodha za kibinafsi na ramani',
      'Msaada kwa wageni wajitegemezi na wa jadi',
      'Uchunguzi rahisi wa kuunga mkono mahitaji yako',
    ],
    conclusion: 'Mradi huu ni ushirikiano wa washirika wa mtaa na wanajitolea, waliojitolea kufanya Pittsburgh ikaribishe, isaidie, na ijae fursa kwa wote.',
    copyright: 'Pittsburgh Tomorrow Pioneer. Haki zote zimehifadhiwa.',
    
    // AboutPage specific content
    welcomeText: 'Karibu Pittsburgh Tomorrow Pioneer, mwongozi wako wa kibinafsi wa kuanza maisha mapya huko Pittsburgh na Allegheny County. Iwe umefika hivi karibuni Marekani au umepata kazi mpya katika mojawapo ya makampuni yanayokua ya Pittsburgh katika nishati, roboti, AI, sayansi za uhai, au chuma — Pittsburgh Tomorrow Pioneer iko hapa kukusaidia. Kutoka kutafuta makazi hadi kusajili watoto wako shuleni, kutoka kutafuta madarasa ya Kiingereza hadi kuungana na jumuiya za imani au msaada wa chakula wa mitaa, Pittsburgh Tomorrow Pioneer inaunganisha rasilimali unazohitaji mahali pamoja.',
    
    whyPioneerTitle: 'Kwa Nini Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'Kwa sababu kuanza upya katika jiji jipya haipaswi kumaanisha kuanza kutoka sifuri.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer inaunganisha kila kitu unachohitaji kuanza maisha mapya huko Pittsburgh na Allegheny County — yote mahali pamoja panapoaminika na rahisi kutumia.',
    whyPioneerText3: 'Ni bure, kamili, na imeundwa kukuokoa masaa ya kutafuta, kulinganisha, na kukisia-kisia. Iwe unatafuta makazi, unasajili watoto wako shuleni, unajifunza Kiingereza, au unatafuta kukutana na watu wanaoshiriki imani yako, lugha, au maslahi — Pittsburgh Tomorrow Pioneer inahakikisha hupotezi fursa yoyote ya kufanya uhamisho wako kuwa laini zaidi na maisha yako mapya kuwa matajiri zaidi.',
    whyPioneerText4: 'Ambapo utafutaji wa Google unakuonyesha kila kitu, Pittsburgh Tomorrow Pioneer inakuonyesha kile kinachohusika.',
    whyPioneerText5: 'Ambapo roboti ya mazungumzo ya AI inatoa majibu, Pioneer inakupa ramani.',
    whyPioneerText6: 'Ambapo zana nyingi za uhamisho zinasimama kwenye usimamizi, Pioneer inaanza na jamii.',
    whyPioneerText7: 'Ni Pittsburgh, imefanywa kibinafsi.',
    
    youAreThePioneerTitle: 'Wewe ni Msonga Mbele',
    youAreThePioneerText1: 'Huhami tu — unaanza kitu kipya. Kazi mpya. Shule mpya. Nyumba mpya. Na pengine hata lugha au utamaduni mpya. Hiyo inahitaji ujasiri.',
    youAreThePioneerText2: 'Tuliijenga Pittsburgh Tomorrow Pioneer kukusaidia — kwa sababu wewe ni Msonga Mbele. Tovuti hii iko hapa kukutembeza unapojenga mustakabali huko Pittsburgh.',
    
    howPioneerHelpsTitle: 'Jinsi Pittsburgh Tomorrow Pioneer Inavyosaidia',
    
    madeForYouTitle: 'Imefanywa kwa Ajili Yako — Popote Ulipotoka',
    madeForYouDescription: 'Tunajua kuwa si kila mtu anazungumza Kiingereza kama lugha ya kwanza. Ndiyo maana Pittsburgh Tomorrow Pioneer inasaidia lugha nyingi za kimataifa, ikiwa ni pamoja na Kihispania, Kiarabu, Kifaransa, Kichina, Kidarí, na zaidi. Ukiandika kwa lugha yako ya mama, Pittsburgh Tomorrow Pioneer itajibu kwa lugha hiyo hiyo.',
    
    personalRoadmapTitle: 'Unda Ramani Yako ya Kibinafsi',
    personalRoadmapDescription: 'Chombo chetu chenye nguvu zaidi ni ramani yako ya kibinafsi — orodha ya mambo ya kufanya iliyotengenezwa kwa ajili yako pekee. Kwa kujibu maswali machache rahisi kuhusu mahitaji yako (makazi, chakula, kazi, elimu, n.k.), Pittsburgh Tomorrow Pioneer huunda mpango wa hatua ulioongozwa ili kusaidia hatua zako zijazo. Unaweza:',
    personalRoadmapFeatures: [
      'Kuona na kusasisha ramani yako wakati wowote',
      'Kuhifadhi maendeleo yako kwa kuingia (si lazima)',
      'Kupakua au kuchapisha orodha yako ya mambo ya kufanya ili uichukue nawe',
      'Kurudi na kuboresha ramani yako kadri maisha yako huko Pittsburgh yanavyokua'
    ],
    personalRoadmapNote: 'Ukipendelea kuchunguza kwa kasi yako mwenyewe, unaweza kupitia maktaba yetu kamili ya rasilimali bila kuingia.',
    
    smartSupportTitle: 'Msaada Mahiri na wa Kujielekeza',
    smartSupportDescription: 'Pittsburgh Tomorrow Pioneer ina roboti ya mazungumzo ya kirafiki iliyofunzwa kujibu maswali mamia ya kawaida. Inaweza kukuongoza kwenye rasilimali, kueleza jinsi mifumo ya mitaa inavyofanya kazi, na kukusaidia kuchukua hatua ijayo. Pia kuna saraka kamili ya maelezo ya mawasiliano ya washirika wetu wanaoaminika — mashirika ya umma, mashirika yasiyo ya faida, watoa huduma, na zaidi.',
    
    trustedPartnersTitle: 'Washirika Wanaoaminika',
    trustedPartnersDescription: 'Fikia saraka yetu kamili ya washirika wanaoaminika — mashirika ya umma, mashirika yasiyo ya faida, na watoa huduma kote Pittsburgh na Allegheny County. Mtandao wetu unajumuisha mashirika 380+ yasiyo ya faida yaliyojiandaa kusaidia na mahitaji yako maalum.',
    
    privacyTitle: 'Faragha Yako, Imelindwa',
    privacyDescription: 'Faragha na usalama wako ni muhimu kwetu. Ukichagua kuunda akaunti, data yako ya kibinafsi inalindwa na itifaki za usalama zinazofuata SOC II. Hatutauza au kushiriki data yako kamwe. Unabaki na udhibiti kamili wa maelezo yako wakati wote.',
    
    pittsburghTomorrowTitle: 'Kuhusu Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'Pittsburgh Tomorrow Pioneer ni mpango wa Pittsburgh Tomorrow, shirika lisilofanya faida lenye dhamira ya kukuza Pittsburgh. Tunachochea roho mpya inayobadilisha kile mwanahistoria David McCullough aliitacho "Jiji Lisilo na Badala la Amerika".',
    pittsburghTomorrowText2: 'Eneo lililoljenga Amerika tangu msingi linazururuka na uongozi mpya na roho ya kiraia: kukaribisha wageni wapya, kuanzisha wafanyabiashara, na kufungua njia mpya. Harakati zetu zinasukumwa na wimbi jipya la wasonga mbele, waongozaji wa kwanza, na wachukuzi wa hatari wanaotumia fursa na kujenga mustakabali — huko Pittsburgh.',
    pittsburghTomorrowText3: 'Katika Pittsburgh Tomorrow, tuna dhamira ya kukuza Pittsburgh. Na hii haimaanishi tu ukuaji wa idadi ya watu au uchumi; inamaanisha kufufua roho ya jiji letu. Kusaidia biashara ndogo na wafanyabiashara. Kupamba na kuhifadhi mazingira yetu. Kukuza sanaa na utamaduni. Kukaribisha wageni wapya na kuunda jamii. Kuwa na fahari ya jiji letu, na kuliweka tena kwenye ramani.',
    pittsburghTomorrowLink: 'Jifunze Zaidi',
    
    // Call to action section
    readyToStartTitle: 'Anza Safari Yako Pittsburgh',
    readyToStartDescription: 'Jenga ramani yako ya kibinafsi kukusaidia kujipatanisha na kustawi katika nyumbani mpya yako.',
    getStarted: 'Anza',
    browseResources: 'Vinjari Rasilimali',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'Rudi kwa Kuhusu',
    title: 'Taarifa ya Uwazi na Faragha ya Data',
    description: 'Katika Pittsburgh Tomorrow, tunathamini uwazi na imani yako. Tunaamini una haki ya kuelewa kwa usahihi kwa nini tunauliza maelezo fulani, jinsi tunavyoyatumia, na jinsi yanavyokufaidia.',
    
    whyWeAskTitle: 'Kwa Nini Tunauliza Maswali Haya na Jinsi Tunavyotumia Maelezo Yako:',
    whyWeAskDescription: 'Maswali tunayouliza yameundwa kutusaidia kuunda ramani ya kibinafsi kwako. Majibu yako yanatururuhusu:',
    whyWeAskBullet1: 'Kutoa rasilimali na maelezo muhimu kutoka kwa hifadhidata yetu yaliyobinafsishwa kwa mahitaji yako.',
    whyWeAskBullet2: 'Kuhakikisha kwamba tunawafikia watu kwa uwiano sawa katika jamii na asili zote.',
    whyWeAskBullet3: 'Kutambua mapungufu katika wale tunaowahuudumia ili tuweze kuwafikia vizuri zaidi wale ambao wanaweza kukosa.',
    whyWeAskBullet4: 'Kuboresha zana zetu za AI ili ziwe na uwezo mkubwa wa kuwahuudumia watumiaji wote kwa ufanisi.',
    weDoNotSell: 'Hatuuzi data yako. Tunaizitumia tu kwa madhumuni yaliyoorodheshwa hapo juu.',
    
    dataRetentionTitle: 'Uhifadhi wa Data:',
    dataRetentionDescription: 'Tunahifadhi maelezo yako katika hifadhidata yetu hadi utuambie kwamba hutaki tena kufikia dashibodi yako ya kibinafsi. Baada ya hapo, data yako itafichwa na itatumika tu kuboresha huduma zetu za AI kusaidia wageni wengine wa Pittsburgh.',
    
    quomeTitle: 'Jinsi Quome Inavyotumia Data Yako:',
    quomeDescription: 'Tovuti yetu inahifadhiwa na Quome, ambayo inaweza kukusanya data fulani kuendesha na kuboresha jukwaa. Unaweza kujifunza zaidi kuhusu jinsi Quome inavyotumia na kulinda data yako kwa kusoma',
    
    skillBuilderTitle: 'Jinsi Skill Builder Inavyotumia Data Yako:',
    skillBuilderDescription: 'Chatbot ya tovuti yetu inahifadhiwa na SkillBuilder.io, ambayo inaweza kukusanya data fulani kuendesha na kuboresha jukwaa. Unaweza kujifunza zaidi kuhusu jinsi SkillBuilder.io inavyotumia na kulinda data yako kwa kusoma',
    
    contactDescription: 'Ikiwa una maswali kuhusu matumizi yetu ya data au mazoea ya faragha, tafadhali tumia kitufe chetu cha Maoni upande wa kulia wa kila ukurasa kutuwasiliana nasi.',
    privacyPolicyLink: 'Sera ya Faragha'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'Kuhusu Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'Pittsburgh Tomorrow Pioneer husaidia wageni wa Pittsburgh na Allegheny County kupata njia yao. Tunakuunganisha na rasilimali na fursa sahihi, bila kujali safari yako.',
    quickLinks: 'Viunganishi vya Haraka',
    home: 'Nyumbani',
    about: 'Kuhusu',
    resources: 'Rasilimali',
    privacyPolicy: 'Sera ya Faragha',
    getStarted: 'Anza',
    contact: 'Wasiliana',
    location: 'Hujambo kutoka Pittsburgh, PA',
    email: 'Barua pepe: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'Karibu, {{name}}!',
    welcomeStudent: 'Karibu tena, {{name}}!',
    welcomeProfessional: 'Karibu, {{name}}!',
    welcomeLocal: 'Hujambo {{name}}!',
    
    subtitleImmigrant: 'Safari yako ya makazi inaanza hapa',
    subtitleStudent: 'Mafanikio yako ya kitaaluma ni kipaumbele chetu',
    subtitleProfessional: 'Ukuaji wako wa kazi ni lengo letu',
    subtitleLocal: 'Saidia kufanya Pittsburgh ikaribishe kwa kila mtu',
    
    demoUserNote: 'Unatazama Pittsburgh Tomorrow Pioneer kama mtumiaji wa **{{role}}**. Uzoefu umebinafsishwa kwa jukumu lako.',
    userBadge: 'mtumiaji wa {{role}}',
    
    urgentResources: 'Rasilimali za Dharura',
    
    // Resource categories
    emergencyServices: 'Huduma za Dharura',
    emergencyDescription: 'Msaada wa machafuko wa saa 24/7 na msaada wa haraka',
    temporaryHousing: 'Makazi ya Muda',
    temporaryHousingDescription: 'Programu za makazi na msaada wa makazi',
    healthcareAccess: 'Upatikanaji wa Huduma za Afya',
    healthcareDescription: 'Huduma za matibabu na msaada wa bima ya afya',
    languageServices: 'Huduma za Lugha',
    languageServicesDescription: 'Msaada wa utafsiri na ufasiri',
    
    // Additional resource categories for other roles
    academicSupport: 'Msaada wa Kitaaluma',
    academicSupportDescription: 'Mafunzo, vikundi vya masomo, na rasilimali za kitaaluma',
    studentHousing: 'Makazi ya Wanafunzi',
    studentHousingDescription: 'Chaguo za makazi ndani ya kampu na nje ya kampu',
    financialAid: 'Msaada wa Kifedha',
    financialAidDescription: 'Skoolarshipi, ruzuku, na msaada wa kifedha',
    studentGroups: 'Vikundi vya Wanafunzi',
    studentGroupsDescription: 'Mashirika ya wanafunzi wa kimataifa na klabu',
    professionalNetworks: 'Mitandao ya Kitaalamu',
    professionalNetworksDescription: 'Mikutano ya viwanda na matukio ya mitandao',
    careerDevelopment: 'Maendeleo ya Kazi',
    careerDevelopmentDescription: 'Mafunzo ya ujuzi na programu za vyeti',
    professionalHousing: 'Makazi ya Kitaalamu',
    professionalHousingDescription: 'Makazi ya watendaji na huduma za uhamishaji',
    mentorship: 'Ushauri',
    mentorshipDescription: 'Programu za ushauri wa kitaalamu na mwongozo',
    volunteerOpportunities: 'Fursa za Kujitolea',
    volunteerOpportunitiesDescription: 'Njia za kusaidia wageni katika jumuiya yako',
    communityOrganizations: 'Mashirika ya Jumuiya',
    communityOrganizationsDescription: 'Mashirika ya mtaa yasiyo ya faida na watoa huduma',
    supportNetworks: 'Mitandao ya Msaada',
    supportNetworksDescription: 'Programu za ushauri na urafiki',
    culturalExchange: 'Kubadilishana Kitamaduni',
    culturalExchangeDescription: 'Matukio na programu za kitamaduni tofauti',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'Ingia ili kuchunguza safari yako ya kibinafsi Pittsburgh',
      signInToPioneer: 'Ingia Pittsburgh Tomorrow Pioneer',
    welcomeTitle: 'Karibu Pittsburgh Tomorrow Pioneer, {{name}}!',
    welcomeTitleWithoutName: 'Karibu Pittsburgh Tomorrow Pioneer!',
    journeyContinues: 'Safari yako ya kibinafsi inaendelea...',
    beginJourney: 'Anza safari yako ya kibinafsi Pittsburgh',
    completedSurveyHeader: 'Tayari umekamilisha hojaji',
    completedSurveyText: 'Ulikamilisha hojaji yako ya mwongozo. Tazama ramani yako ya kibinafsi hapa chini au hariri majibu yako ili kusasisha mapendekezo.',
    completedSurveyTextWithDate: 'Ulikamilisha hojaji yako ya mwongozo tarehe {{date}}. Tazama ramani yako ya kibinafsi hapa chini au hariri majibu yako ili kusasisha mapendekezo.',
    editResponses: 'Hariri majibu',
    viewMyRoadmap: 'Ona ramani yangu',
    noteLabel: 'Kumbuka:',
    editRegenerateNote: 'Ukihariri majibu yako ya hojaji, mapendekezo yako ya kibinafsi na ramani yataundwa upya kiotomatiki ili yaendane vyema na mapendeleo yako mapya.',
    bridgitHelp: 'Una maswali ambayo hayajashughulikiwa na hojaji? Bonyeza chatbot ya BRIDGIT kwenye chini kulia kupata msaada wa kibinafsi!',
    personalizedRoadmap: 'Ramani Yako ya Kibinafsi',
    unlockExperience: 'FUNGA UZOEFU WAKO ULIOBORESHWA',
    completeSurveyHeader: 'Kamilisha hojaji ili uanze',
    completeSurveyText: 'Jaza hojaji yetu ya haraka ya dakika 5 kupata mapendekezo ya rasilimali yaliyoandaliwa mahsusi kwa mahitaji na malengo yako Pittsburgh.',
  },
  
  // Profile page
  profile: {
    title: 'Mipangilio ya Wasifu',
    subtitle: 'Simamia maelezo yako ya kibinafsi na mapendeleo',
    accountInformation: 'Maelezo ya Akaunti',
    accountInformationDescription: 'Sasisha maelezo ya msingi ya akaunti yako',
    basicInformation: 'Maelezo ya Kimsingi',
    basicInformationDescription: 'Sasisha maelezo yako ya kibinafsi ya kimsingi',
    firstName: 'Jina la Kwanza',
    enterFirstName: 'Ingiza jina lako la kwanza',
    lastName: 'Jina la Mwisho',
    enterLastName: 'Ingiza jina lako la mwisho',
    username: 'Jina la Mtumiaji',
    enterUsername: 'Ingiza jina la mtumiaji',
    email: 'Barua Pepe',
    emailChangeNote: 'Barua pepe haiwezi kubadilishwa. Wasiliana na msaada ili kusasisha barua pepe yako.',
    emailCannotBeChanged: 'Barua pepe haiwezi kubadilishwa. Wasiliana na msaada ikiwa unahitaji kusasisha barua pepe yako.',
    surveyRequired: 'Kamilisha Kwanza Hojaji',
    surveyRequiredDescription: 'Ili kupata mapendekezo ya kibinafsi na kuhariri majibu yako, lazima ukamilishe kwanza hojaji ya tathmini ya awali.',
    takeSurvey: 'Fanya Hojaji',
    basicQuestions: 'Maelezo ya Kimsingi',
    basicQuestionsDescription: 'Tuambie kuhusu wewe na hali yako ili upate mapendekezo ya kibinafsi',
    selectPrimary: 'Chagua upendeleo wako mkuu:',
    selectOption: 'Chagua chaguo...',
    supportNeeds: 'Msaada na Mahitaji',
    supportNeedsDescription: 'Unahitaji aina gani ya msaada na huduma?',
    selectMultiple: 'Chagua yote yanayotumika:',
    selectAtLeastOne: 'Tafadhali chagua angalau chaguo moja.',
    timelinePreferences: 'Ratiba na Mapendeleo',
    timelinePreferencesDescription: 'Ratiba yako na mapendeleo ya teknolojia',
    backToDashboard: 'Rudi kwenye Dashibodi',
    languageAndCultural: 'Lugha na Mazingira ya Kitamaduni',
    languageAndCulturalDescription: 'Tusaidie kutoa mapendekezo bora ya kibinafsi',
    primaryLanguage: 'Lugha Kuu',
    selectPrimaryLanguage: 'Chagua lugha yako kuu',
    culturalBackground: 'Mazingira ya Kitamaduni',
    selectCulturalBackground: 'Chagua mazingira yako ya kitamaduni',
    professionalAndLiving: 'Hali ya Kitaalamu na ya Maisha',
    professionalAndLivingDescription: 'Hii inatusaidia kupendekeza rasilimali na huduma husika',
    professionalStatus: 'Hali ya Kitaalamu',
    selectProfessionalStatus: 'Chagua hali yako ya kitaalamu',
    housingSituation: 'Hali ya Makazi',
    selectHousingSituation: 'Chagua hali yako ya makazi',
    familyStatus: 'Hali ya Familia',
    selectFamilyStatus: 'Chagua hali ya familia yako',
    saveChanges: 'Hifadhi Mabadiliko',
    saving: 'Ninahifadhi...',
    recalculatingRecommendations: 'Ninahesabu upya mapendekezo...',
    profileUpdated: 'Wasifu Umesasishwa',
    profileUpdatedDescription: 'Wasifu wako umesasishwa kwa mafanikio.',
    accountUpdated: 'Akaunti Imeboreshwa',
    accountUpdatedDescription: 'Taarifa za akaunti yako zimesasishwa. Kamilisha hojaji ili kuhifadhi mapendeleo yako.',
    updateFailed: 'Kusasisha Kuishindwa',
    updateFailedDescription: 'Kushindwa kusasisha wasifu. Tafadhali jaribu tena.',
    pleaseLogIn: 'Tafadhali ingia kutazama wasifu wako.',
    
    // Language options
    languages: {
      english: 'Kiingereza',
      spanish: 'Kihispania',
      french: 'Kifaransa',
      arabic: 'Kiarabu',
      chinese: 'Kichina',
      swahili: 'Kiswahili',
      hindi: 'Kihindi',
      portuguese: 'Kireno',
      russian: 'Kirusi',
      nepali: 'Kinepali',
      somali: 'Kisomali',
      tagalog: 'Kitagalog',
      turkish: 'Kituruki',
      other: 'Nyingine',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'Kimarekani/Magharibi',
      westAfrican: 'Afrika ya Magharibi',
      middleEasternNorthAfrican: 'Mashariki ya Kati/Kaskazini mwa Afrika',
      southAsian: 'Asia ya Kusini (ikiwa ni pamoja na Kibhutan)',
      latinoHispanic: 'Kilatino/Kihispania',
      eastAsian: 'Asia ya Mashariki',
      easternEuropean: 'Ulaya ya Mashariki',
      other: 'Nyingine/Sipendi kusema',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'Mwanafunzi',
      graduateStudent: 'Mwanafunzi wa kufuzu',
      softwareEngineer: 'Mhandisi wa programu',
      healthcareProfessional: 'Mtaalamu wa huduma za afya',
      researchScientist: 'Mwanasayansi wa utafiti',
      seekingEmployment: 'Kutafuta ajira',
      employedFullTime: 'Anaajiriwa wakati wote',
      employedPartTime: 'Anaajiriwa wakati wa nusu',
      selfEmployed: 'Mwajiri wa kibinafsi',
      retired: 'Aliyestaafu',
      other: 'Nyingine',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Makazi ya muda',
      campusHousing: 'Makazi ya kampu',
      apartmentHunting: 'Kutafuta apartment',
      rentingApartment: 'Kukodi apartment',
      rentingHouse: 'Kukodi nyumba',
      homeowner: 'Mmiliki wa nyumba',
      livingWithFamily: 'Kuishi na familia',
      sharedHousing: 'Makazi ya pamoja',
      other: 'Nyingine',
    },
    
    // Family status options
    familyStatuses: {
      single: 'Mjane',
      married: 'Ameoa/Ameolewa',
      familyWithChildren: 'Familia yenye watoto',
      singleParent: 'Mzazi mjane',
      extendedFamily: 'Familia ya kina',
      other: 'Nyingine',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'Tukuite vipi?',
    description: 'Tusaidie kubinafsisha uzoefu wako kwa kutuambia jina lako.',
    firstName: 'Jina la Kwanza',
    firstNamePlaceholder: 'Ingiza jina lako la kwanza',
    lastName: 'Jina la Ukoo',
    lastNamePlaceholder: 'Ingiza jina lako la ukoo (si lazima)',
    skip: 'Ruka kwa sasa',
    save: 'Hifadhi Jina',
    saving: 'Inahifadhi...',
    firstNameRequired: 'Jina la kwanza linahitajika',
    firstNameRequiredDescription: 'Tafadhali ingiza jina lako la kwanza ili kuendelea.',
    nameUpdated: 'Jina limesasishwa',
    nameUpdatedDescription: 'Jina lako limehifadhiwa kwa ufanisi.',
    updateFailed: 'Kusasisha kumeshindikana',
    updateFailedDescription: 'Imeshindikana kusasisha jina lako. Tafadhali jaribu tena.',
  },
  
  // Common elements
  common: {
    dashboard: 'Dashibodi',
    loading: 'Ninapakia...',
    search: 'Tafuta',
    filter: 'Chuja',
    next: 'Ifuatayo',
    previous: 'Iliyopita',
    save: 'Hifadhi',
    cancel: 'Ghairi',
    confirm: 'Thibitisha',
    edit: 'Hariri',
    delete: 'Futa',
    close: 'Funga',
    back: 'Rudi',
    backToResources: 'Rudi kwa Rasilimali',
    viewDetails: 'Tazama Maelezo',
    learnMore: 'Jifunze Zaidi',
    getHelp: 'Pata Msaada',
    startNow: 'Anza Sasa',
    tryNow: 'Jaribu Sasa',
    downloadNow: 'Pakua Sasa',
    visitWebsite: 'Tembelea',
    shareThis: 'Shiriki Hiki',
    copied: 'Imenakiliwa!',
    copy: 'Nakili',
    show: 'Onyesha',
    hide: 'Ficha',
    expand: 'Panua',
    collapse: 'Pinda',
    seeMore: 'Ona zaidi',
    seeLess: 'Ona kidogo',
    showingTopOf: 'Inaonyesha zilizotangulizwa {{current}} kati ya {{total}} rasilimali',
    selectLanguage: 'Chagua Lugha',
    personalizedRecommendationsLabel: 'Mapendekezo ya Kibinafsi',
    exploreResourcesNowLabel: 'Gundua rasilimali sasa',
    curatedAdviceLabel: 'Ushauri ulioteuliwa kwa mafanikio',
    
    // Accessibility and UI labels
    toggleSidebar: 'Geuza Upau wa Kando',
    toggleMobileMenu: 'Geuza menyu ya simu',
    feedback: 'Maoni',
    openInNewTab: 'Fungua kwenye kichupo kipya',
    removeBookmark: 'Ondoa alama ya ukurasa',
    editResource: 'Hariri rasilimali',
    deleteResource: 'Futa rasilimali',
    dragToReorder: 'Buruta ili upange upya',
    saveOrPrintOptions: 'Chaguo za Kuhifadhi au Kuchapisha',
    filterByCategory: 'Chuja kwa jamii',
    openChatAssistant: 'Fungua mazungumzo na msaidizi BRIDGIT',
    askBridget: 'Uliza BRIDGIT',
    bridgitComingSoonTitle: 'BRIDGIT: Inakuja Hivi Karibuni!',
    bridgitComingSoonDescription: 'Msaidizi wetu wa AI BRIDGIT bado anaundwa. Subiri masasisho!',
    
    // Content section headers
    description: 'Maelezo',
    services: 'Huduma',
    languages: 'Lugha',
    languagesSupported: 'Lugha Zinazotumika',
    available: 'Inapatikana',
    resources: 'Rasilimali',
    exploreResources: 'Chunguza rasilimali',
    
    // Admin interface
    authenticationRequired: 'Uthibitisho Unahitajika',
    organizationName: 'Jina la Shirika',
    website: 'Tovuti',
    shortDescription: 'Maelezo Mafupi',
    fullDescription: 'Maelezo Kamili',
    affiliation: 'Uhusiano',
    financialData: 'Data za Kifedha',
    serviceDetails: 'Maelezo ya Huduma',
    categories: 'Makundi',
    servicesProvided: 'Huduma Zinazotolewa',
    totalResources: 'Jumla ya Rasilimali',
    publishingStatus: 'Hali ya Uchapishaji',
    totalUsers: 'Jumla ya Watumiaji',
    adminUsers: 'Watumiaji wa Utawala',
    demoUsers: 'Watumiaji wa Onyesho',
    noResourcesFound: 'Hakuna rasilimali zilizopatikana',
    
    // Form placeholders
    placeholders: {
      organizationName: 'Jina la shirika',
      briefDescription: 'Maelezo mafupi',
      detailedDescription: 'Maelezo ya kina ya huduma na mipango',
      organizationAffiliation: 'Uhusiano wa shirika au mtandao',
      partnersCollaborating: 'Orodha ya washirika na mashirika yanayoshirikiana',
      availableOnline: 'Inapatikana mtandaoni',
    },
    
    // Additional UI elements
    backToHome: 'Rudi Nyumbani',
    goHome: 'Nenda Nyumbani',
    browseResources: 'Vinjari Rasilimali',
    needPersonalizedRecommendations: 'Unahitaji mapendekezo ya kibinafsi?',
    personalizedRecommendationsDescription: 'Jibu tathmini yetu ya haraka ili upate orodha ya uhakiki iliyotengenezwa kwa rasilimali zilizochaguliwa maalum kwa mahitaji yako.',
    getYourPersonalRoadmap: 'Pata Ramani Yako ya Kibinafsi',
    allRightsReserved: 'Haki zote zimehifadhiwa',
    initiativeOfPittsburghTomorrow: 'Mpango wa Pittsburgh Tomorrow',
    viewingAsUserNotification: 'Unaona Pittsburgh Tomorrow Pioneer kama mtumiaji wa {{role}}. Uzoefu umeboreshwa kwa jukumu lako.',
    priorityResourcesForYou: 'Rasilimali za Kipaumbele Kwa Ajili Yako',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'Kulingana na majibu yako ya uchunguzi, huhitaji msaada maalum kwa sasa. Ikiwa hali yako itabadilika, unaweza kusasisha wasifu wako. Vinginevyo, jisikie huru kuchunguza rasilimali zote zinazopatikana.',
    editProfile: 'Sasisha Wasifu',
    exploreAllResources: 'Chunguza Rasilimali Zote',
    
    // Priority Categories
    priorityCategories: {
      housing: 'Makazi',
      education: 'Elimu', 
      income: 'Mapato',
      first_things_first: 'Mambo ya Kwanza',
      meeting_people: 'Kukutana na Watu',
      kids_activities: 'Shughuli za Watoto',
      faith_communities: 'Jumuiya za Kidini',
      sports_wellness: 'Michezo na Afya',
      arts_entertainment: 'Sanaa na Burudani',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'Kupata makazi ya bei nafuu na msaada wa kifedha.',
      education: 'Kiingereza cha kitaaluma na msaada wa lugha nyingine.',
      income: 'Msaada katika kutafuta kazi na maendeleo ya ujuzi.',
      first_things_first: 'Msaada wa msaada wa dharura, afya ya akili na usajili.',
      meeting_people: 'Unganishwa kupitia mitandao ya kitaaluma na matukio ya kijamii.',
      kids_activities: 'Mipango ya familia na watoto inapatikana.',
      faith_communities: 'Pata makundi ya kidini na kitamaduni ya eneo.',
      sports_wellness: 'Chunguza fursa za michezo na burudani.',
      arts_entertainment: 'Gundua matukio ya kisanaa na kitamaduni ya eneo.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'Angalia na simamia rasilimali zako zilizohifadhiwa',
    searchYourBookmarks: 'Tafuta katika alama zako za ukurasa...',
    showingBookmarks: 'Kuonyesha {{count}} ya {{total}} rasilimali zilizohifadhiwa',
    showingBookmarksPaginated: 'Kuonyesha {{start}}-{{end}} ya {{total}} alama za ukurasa',
    failedToLoadBookmarks: 'Imeshindwa kupakia alama za ukurasa. Tafadhali jaribu tena.',
    bookmarkedOn: 'Imehifadhiwa tarehe',
    noBookmarksMatchFilters: 'Hakuna alama za ukurasa zinazolingana na vichujio vyako vya sasa.',
    
    // Additional UI elements - screening form
    stepOf: 'Hatua {{current}} ya {{total}}',
    percentComplete: '{{percent}}% Kumekamilika',
    previousButton: 'Iliyotangulia',
    nextButton: 'Ifuatayo',
    creatingYourPlan: 'Kuunda Mpango Wako...',
    completeAssessment: 'Kamilisha Tathmini',
    
    // Bookmarks empty state
    noBookmarksYet: 'Hakuna Alama za Ukurasa Bado',
    startExploringBookmark: 'Anza kuchunguza rasilimali na uweke alama za ukurasa za zile unazoziona muhimu!',
    pageOf: 'Ukurasa {{current}} kati ya {{total}}',
    yourPersonalizedRoadmap: 'Ramani Yako ya Kibinafsi',
    resourcesReadyForYou: 'Rasilimali {{count}} ziko tayari kwa ajili yako',
    seeMoreResources: 'Vinjari Rasilimali Zote',
    discoveringPerfectResources: 'Kugundua Rasilimali Zako Kamili',
    noRecommendationsYet: 'Mapendekezo yako ya kibinafsi yanatayarishwa. Vinjari saraka ya rasilimali ili kuanza.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Ukurasa Haupatikani',
    pageNotFoundDescription: 'Ukurasa unaooutafuta haupo au umehamishwa.',
  },
} 