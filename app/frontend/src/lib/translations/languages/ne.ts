import type { TranslationStructure } from '../types'

// Standard Nepali (शुद्ध नेपाली), formal tone (तपाईं)
export const nepaliTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'गृहपृष्ठ',
    dashboard: 'ड्यासबोर्ड',
    adminDashboard: 'प्रशासन ड्यासबोर्ड',
    welcome: 'स्वागत छ',
    resources: 'स्रोतहरू',
    bookmarks: 'बुकमार्क',
    about: 'बारे',
    myChecklist: 'चेकलिस्ट',
    signIn: 'लगइन गर्नुहोस्',
    signUp: 'साइन अप गर्नुहोस्',
    accountSettings: 'प्रोफाइल सेटिङहरू',
    signOut: 'बाहिर निस्कनुहोस्',
    settings: 'सेटिङहरू',
  },

  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Pittsburgh Tomorrow Pioneer मा स्वागत छ',
    heroWelcomeTo: 'स्वागत छ',
      heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'पिट्सबर्गमा नयाँ जीवन सुरु गर्न तपाईंको व्यक्तिगत मार्गदर्शक — निःशुल्क, निजी, बहुभाषिक',
    heroExtendedDescription: 'पिट्सबर्गमा सर्दै हुनुहुन्छ? दर्जनौं साइटहरू खोज्न वा एउटै प्रश्नहरू बारम्बार सोध्न घण्टौं खर्च नगर्नुहोस्। Pittsburgh Tomorrow Pioneer तपाईंको व्यक्तिगत, निःशुल्क मार्गदर्शक हो जसले नयाँ आगन्तुकहरूलाई छिटो र आत्मविश्वासका साथ बसोबास गर्न मद्दत गर्ने हरेक स्रोतको लागि — आवास र विद्यालयहरूदेखि भाषा, विश्वास र सामुदायिक जीवनसम्म। यो पिट्सबर्गमा तपाईंको नयाँ अध्याय सुरु गर्ने सबैभन्दा पूर्ण, समय बचत गर्ने र स्वागत गर्ने तरिका हो।',
    howCanWeHelp: 'आज हामी तपाईंलाई कसरी सहयोग गर्न सक्छौं?',
    howCanWeHelpSubtitle: 'व्यक्तिगत सिफारिसहरू पाउन आफ्नो बाटो छान्नुहोस्',
    createRoadmapTitle: 'आफ्नो रोडम्याप बनाउनुहोस्',
    createRoadmapDescription:
      'छोटो सर्वे पूरा गर्नुहोस् र तपाईंका आवश्यकता तथा लक्ष्यअनुसार मिलेको व्यक्तिगत कार्य योजना प्राप्त गर्नुहोस्।',
    getStarted: 'सुरु गर्नुहोस्',
    browseResourcesTitle: 'स्रोतहरू हेर्नुहोस्',
    browseResourcesDescription:
      'श्रेणीअनुसार व्यवस्थित सेवाहरू, संस्थाहरू र स्रोतहरूको हाम्रो निर्देशिका अन्वेषण गर्नुहोस्।',
    exploreDirectory: 'निर्देशिका हेर्नुहोस्',
    askBridgetTitle: 'ब्रिजिटसँग सोध्नुहोस्',
    askBridgetDescription:
      'हाम्रो AI सहयोगीबाट तपाईंका प्रश्नहरूको तुरुन्तै उत्तर पाउनुहोस्। तपाईंको रोजाइको भाषामा २४/७ उपलब्ध।',
    startChatting: 'कुराकानी सुरु गर्नुहोस्',
    saveProgressQuestion: 'प्रगति सुरक्षित गरी व्यक्तिगत सुविधाहरू प्रयोग गर्न चाहनुहुन्छ?',
    signIn: 'लगइन गर्नुहोस्',
    createAccount: 'खाता बनाउनुहोस्',
    servicesNote:
      'सबै सेवाहरू पूर्णतया निःशुल्क, कडाइका साथ गोप्य, र अंग्रेजी, स्पेनी, अरबी, फ्रेन्च, चिनियाँ र स्वाहिली लगायत १६+ भाषामा उपलब्ध छन्।',

    // Trust badges
    hundredPercentFree: '१००% निःशुल्क',
    privateSecure: 'निजी र सुरक्षित',
    multilingualSupport: 'बहुभाषिक समर्थन',
    languagesSupported: 'स्पेनी, अरबी, फ्रेन्च, मन्डारिन र स्वाहिली सहित १६+ भाषाहरू समर्थित।',
  },

  // Auth pages
  auth: {
    demoMode: 'डेमो मोड',
    demoModeDescription:
      'विभिन्न प्रयोगकर्ता प्रोफाइलहरूसँग Pittsburgh Tomorrow Pioneer परीक्षण गर्नुहोस् र अनुभव तपाईंको आवश्यकतासँग कसरी मिल्छ भनेर हेर्नुहोस्',
    whatYouExperience: 'तपाईंले के अनुभव गर्नुहुनेछ',
    immigrantUser: 'आप्रवासी प्रयोगकर्ता',
    immigrantFeatures: {
      emergency: 'आपतकालीन स्रोतहरू प्राथमिकता',
      multilingual: 'बहुभाषिक समर्थन',
      settlement: 'स्थापना-केन्द्रित सामग्री',
    },
    studentUser: 'विद्यार्थी प्रयोगकर्ता',
    studentFeatures: {
      academic: 'शैक्षिक स्रोतहरू',
      campus: 'क्याम्पस-विशेष जानकारी',
      career: 'क्यारियर मार्गदर्शन',
    },
    professionalUser: 'व्यावसायिक प्रयोगकर्ता',
    professionalFeatures: {
      networking: 'उद्योगगत सञ्जाल',
      services: 'व्यावसायिक सेवाहरू',
      advancement: 'क्यारियर उन्नति',
    },
    localHelper: 'स्थानीय सहयोगी',
    localFeatures: {
      community: 'समुदाय स्रोतहरू',
      volunteer: 'स्वयंसेवा अवसरहरू',
      support: 'सहयोग सञ्जाल',
    },
    signIn: 'लगइन गर्नुहोस्',
    
    // Authentication required page
    authenticationRequired: 'प्रमाणीकरण आवश्यक छ',
    loginToAccessPage: 'यो पृष्ठ पहुँच गर्न तपाईँले लगइन गर्नुपर्छ।',
    
    // Login page
    emailVerified: 'इमेल प्रमाणित भयो',
    emailVerifiedDescription: 'तपाईंको इमेल सफलतापूर्वक प्रमाणित भयो।',
    alreadySignedIn: 'पहिले नै लगइन भएको',
    redirectingToDashboard: 'तपाईंको ड्यासबोर्डमा पुनर्निर्देशन गर्दै...',
    signInDescription: 'तपाईंको व्यक्तिगत पिट्सबर्ग स्रोतहरू र सिफारिसहरू पहुँच गर्न लगइन गर्नुहोस्।',
    signInWithAuth0: 'लगइन गर्नुहोस्',
    signInHelp: 'लगइन गर्नमा समस्या आइरहेको छ? सहयोगको लागि समर्थनलाई सम्पर्क गर्नुहोस्।',
    loginError: 'लगइन त्रुटि',
    loginErrorDescription: 'तपाईंलाई लगइन गर्नमा समस्या आयो। कृपया फेरि प्रयास गर्नुहोस्।',
  },

  // Demo credentials
  demo: {
    tryDemoAccounts: 'डेमो खाता प्रयोग गर्नुहोस्',
    experienceDifferentPerspectives: 'विभिन्न प्रयोगकर्ता दृष्टिकोणबाट Pittsburgh Tomorrow Pioneer को अनुभव लिनुहोस्',
    email: 'इमेल:',
    password: 'पासवर्ड:',
    loginAs: '{{role}} प्रयोगकर्ता रूपमा लगइन गर्नुहोस्',
    demoTip: 'यी डेमो खाताले विभिन्न अनुभव र व्यक्तिगत सामग्री देखाउँछन्',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'सोच्दै...',
    curatingRecommendations: 'व्यक्तिगत सिफारिसहरू तयार गर्दै...',
    findingResources: 'उत्तम स्रोतहरू खोज्दै...',
    complete: 'पूरा भयो!',
    creatingYourPlan: 'तपाईंको व्यक्तिगत योजना बनाइँदै',
    ready: 'तयार!',
    mayTakeAMoment: 'तपाईंको अनुभव व्यक्तिगत बनाउँदा यसले केही समय लिन सक्छ...',
    seeMyRecommendations: 'मेरा सिफारिसहरू हेर्नुहोस्',
    loadingHint: 'तपाईंको अनुभव व्यक्तिगत बनाउँदा यसले केही समय लिन सक्छ...',
  },

  // Screening page
  screening: {
    title: 'आफ्नो बारेमा हामीलाई बताउनुहोस्',
    description: 'पिट्सबर्गमा बसोबास र फस्टाउनको लागि तपाईंको व्यक्तिगत मार्गदर्शक बनाउन केही छिटो प्रश्नहरूको उत्तर दिनुहोस्।',
    saveRoadmapBanner:
      'खाता बनाएर आफ्नो व्यक्तिगत रोडम्याप सुरक्षित गर्नुहोस्। अहिले अनामिक तरिकाले सर्वे पूरा गरेर पछि लगइन गरी सुरक्षित गर्न सक्नुहुन्छ।',

    // Progress indicator
    progress: 'प्रगति',
    completed: '{{count}} मध्ये {{total}} पूरा',

    // Questions
    questions: {
      audience: {
        question: 'तपाईंको स्थिति सबैभन्दा राम्रोसँग कुन विकल्पले वर्णन गर्छ?',
        options: [
          'विद्यार्थी/व्यावसायिक (पिट्सबर्ग क्षेत्रको विश्वविद्यालयमा अध्ययन वा संस्थामा काम गर्ने)',
          'बुमेराङ (पहिले यहाँ बस्थेँ, टाढा गएँ र अहिले पिट्सबर्ग क्षेत्रमा फिर्ता आएको छु)',
          'शरणार्थी वा अस्थायी संरक्षित स्थिति (अहिले भर्खर यहाँ पुनर्स्थापित भएको वा अर्को शहरबाट आएका)',
          'ट्रान्सप्लान्ट (अमेरिकाको अर्को शहरबाट पिट्सबर्ग सारिँदै)',
          'उद्यमी (आफ्नै व्यवसाय बनाउँदै)',
          'दूरस्थ कर्मचारी',
          'अन्य',
        ],
      },
      primaryLanguage: {
        question: 'तपाईंको प्राथमिक भाषा के हो?',
        options: [
          'अंग्रेजी (English)',
          'स्पेनी (Español)',
          'अरबी (العربية)',
          'स्वाहिली (Kiswahili)',
          'उज्बेकी (Oʻzbekcha)',
          'नेपाली/भुटानी (नेपाली / རྫོང་ཁ)',
          'दारी/पास्तो (دری / پښتو)',
          'म्यान्डेरिन चिनियाँ (中文)',
          'अन्य',
        ],
      },
      culturalBackground: {
        question: 'कुन культурिक वा क्षेत्रीय पृष्ठभूमिले तपाईंलाई राम्रोसँग वर्णन गर्छ?',
        options: [
          'गोरो',
          'कालो वा अफ्रिकी-अमेरिकी (अफ्रिकी र क्यारिबियन मूल सहित)',
          'हिस्पानिक वा लातिनो/आ/एक्स',
          'एशियाली (जस्तै: चिनियाँ, भारतीय, भियतनामी)',
          'मध्यपूर्वी वा उत्तरी अफ्रिकी',
          'स्थानीय हवाई वा अन्य प्रशान्त टापुका बासिन्दा',
          'अमेरिकी आदिवासी वा अलास्का मूलवासी',
          'अफ्रिकी (जस्तै: नाइजेरियन, इथियोपियन, घानाली आदि)',
          'क्यारिबियन (जस्तै: जमैकन, हाइटी, ट्रिनिडाडियन आदि)',
          'अन्य',
          'उत्तर नदिन चाहन्छु',
        ],
      },
      housingNeed: {
        question: 'कस्तो खालको आवास सहयोग चाहिन्छ?',
        options: [
          'छिमेक र बजार-भावका अपार्टमेन्ट फेला पार्न सहयोग',
          'सस्तै आवास कार्यक्रम तथा सहयोग',
          'अस्थायी/आपतकालीन आवास',
          'साझा आवास/रूममेट मिलान',
          'घर किन्न प्रयास गर्न सहयोग',
          'मसँग आवास सुरक्षित छ',
        ],
      },
      professionalStatus: {
        question: 'तपाईंको वर्तमान व्यावसायिक स्थिति के हो?',
        options: [
          'विद्यार्थी (स्नातक/स्नातकोत्तर/प्राविधिक)',
          'टेक्नोलोजी व्यवसायी/इन्जिनियर',
          'स्वास्थ्य/जीव विज्ञान व्यवसायी',
          'शैक्षिक/अनुसन्धाता',
          'रोजगारी खोज्दै',
          'हालै स्नातक, रोजगारी खोज्दै',
          'अन्य व्यावसायिक',
        ],
      },
      languageSupport: {
        question: 'कस्तो भाषा सहयोग उपयोगी हुनेछ?',
        options: [
          'अंग्रेजी कक्षा (ESL) — प्रारम्भिक देखि मध्यम',
          'व्यावसायिक अंग्रेजी संप्रेषण कौशल',
          'कागजात अनुवाद सेवा',
          'अंग्रेजी संवाद अभ्यास',
          'भाषा सहयोग आवश्यक छैन',
        ],
      },
      employment: {
        question: 'तपाईंलाई कुन प्रकारको रोजगारी सहयोग मनपर्छ?',
        options: [
          'व्यावसायिक सञ्जाल र क्यारियर उन्नति',
          'रोजगारी खोज सहयोग र रेजुमे मद्दत',
          'सीप तालिम र प्रमाणिकरण कार्यक्रम',
          'उद्योग-विशेष सञ्जाल (टेक, स्वास्थ्य आदि)',
          'रोजगारी सहयोग आवश्यक छैन, धन्यवाद',
        ],
      },
      communityPriorities: {
        question: 'कुन सामुदायिक सम्बन्धहरू तपाईंका लागि अत्यन्त महत्त्वपूर्ण छन्? (लागू सबै छनौट गर्नुहोस्)',
        options: [
          'व्यावसायिक सञ्जाल र उद्योग भेटघाट',
          'सांस्कृतिक र धार्मिक समुदाय',
          'सामाजिक गतिविधि र मनोरञ्जन',
          'परिवार र बालबालिका सेवा',
          'खेलकुद र मनोरञ्जन गतिविधि',
          'कला र सांस्कृतिक कार्यक्रम',
          'यीमध्ये कुनै छैन',
        ],
      },
      immediateNeeds: {
        question: 'तपाईंका सबैभन्दा तुरुन्त आवश्यकताहरू के हुन्? (लागू सबै छनौट गर्नुहोस्)',
        options: [
          'मानिससँग चिनाजान गर्ने र नयाँ साथी बनाउने',
          'मूलभूत सेवा (स्वास्थ्य, बैंकिङ, यातायात)',
          'बालबालिकाको विद्यालय भर्ना',
          'कानुनी/आप्रवासन सहयोग',
          'मानसिक स्वास्थ्य र कल्याण सहयोग',
          'आपतकालीन सहयोग (खाना, आश्रय)',
          'यीमध्ये कुनै छैन',
        ],
      },
      timeline: {
        question: 'पिट्सबर्ग क्षेत्रमा बसोबास गर्न तपाईंको समयरेखा के हो?',
        options: [
          'भर्खरै आएका (गत महिनाभित्र)',
          'हालै आएका (१–६ महिना)',
          'चाँडै आउँदै (आगामी ३ महिना)',
          'दीर्घकालीन योजना (६+ महिना)',
          'पहिले नै पिट्सबर्ग क्षेत्रमा बसेको/बसोबास गरेको',
        ],
      },
      // techComfort removed
    },

    // Form messages
    pleaseAnswer: 'कृपया यो प्रश्नको उत्तर दिनुहोस्।',
    pleaseAnswerAll: 'जारी राख्न कृपया सबै प्रश्नहरूको उत्तर दिनुहोस्',
    creatingGuide: 'तपाईंको मार्गदर्शक तयार हुँदैछ...',
    seePersonalizedGuide: 'मेरो व्यक्तिगत मार्गदर्शक हेर्नुहोस्',
    screeningQuestionnaire: 'स्क्रिनिङ प्रश्नावली',
  },

  // Toolkit interface
  toolkit: {
    title: 'नयाँ आगन्तुक उपकरण-संग्रह',
    description:
      'पिट्सबर्गमा बसोबास र फस्टाउनका लागि आवश्यक स्रोतहरू र सहयोग खोज्नुहोस्',
    categories: {
      housingAssistance: 'आवास सहयोग',
      foodAssistance: 'खाद्य सहयोग',
      entrepreneurHiringHub: 'उद्यमी र भर्ती केन्द्र',
      youthAdultEducation: 'युवा र वयस्क शिक्षा स्रोतहरू',
      eslImmigrantConnection: 'ESL र आप्रवासी सम्बन्ध सेवा',
      socialConnectionCulture: 'सामाजिक जोड र संस्कृति',
    },
    chat: {
      bridgitTitle: 'BRIDGIT सँग कुराकानी',
      bridgitDescription: 'तपाईंको यात्राका लागि व्यक्तिगत सहयोग र मार्गदर्शन प्राप्त गर्नुहोस्',
    },
  },

  // Resource search
  resources: {
    title: 'स्रोतहरू खोज्नुहोस्',
    searchPlaceholder: 'स्रोतहरू खोज्नुहोस्...',
    allCategories: 'सबै श्रेणी',
    housing: 'आवास',
    educationESL: 'शिक्षा / ESL',
    socialNetworking: 'सामाजिक / सञ्जाल',
    noResourcesFound: 'तपाईंको खोज वा फिल्टरसँग मिल्ने स्रोतहरू भेटिएनन्।',
    backToAllCategories: 'सबै श्रेणीमा फर्कनुहोस्',
    backToCategory: 'पुनः {{category}} मा फर्कनुहोस्',
    welcomeToCategory: '{{category}} मा स्वागत छ',
    categoryDescription: {
      housing: 'आवास सहयोग, भाडा सहयोग र छिमेक स्रोतहरू खोज्नुहोस्',
      foodAssistance: 'खाद्य भण्डार, भोजन कार्यक्रम र पोषण सहयोग फेला पार्नुहोस्',
      entrepreneurHiring: 'व्यवसाय स्रोतहरू, जागिर अवसर र भर्ती सहयोग पत्ता लगाउनुहोस्',
      youthEducation: 'शैक्षिक कार्यक्रम, ट्युटरिङ र स्रोतहरूमा पहुँच',
      eslImmigrant: 'अंग्रेजी कक्षा, आप्रवासन सेवा र सांस्कृतिक सहयोगसँग जोडिनुहोस्',
      socialConnection: 'समुदाय समूह, सांस्कृतिक कार्यक्रम र सामाजिक गतिविधिमा सहभागी हुनुहोस्',
    },
    refreshBookmarks: 'बुकमार्क रिफ्रेस (परीक्षण)',
    compare: 'तुलना ({{count}}/३)',
    filterByLanguage: 'भाषा अनुसार फिल्टर:',
    showingResults: '{{total}} मध्ये {{current}} स्रोत देखाइँदै',
    categoryTitles: {
      housingProcess: 'पिट्सबर्गमा आवास प्रक्रिया',
      housingProcessDescription: 'आवास खोज प्रक्रियाबारे र आवश्यकताबारे जान्नुहोस्',
    },
    exploreResources: 'स्रोतहरू अन्वेषण गर्नुहोस्',
    categoryNotFound: 'श्रेणी फेला परेन',
    subcategoryNotFound: 'उप-श्रेणी फेला परेन',
    clearFilters: 'फिल्टर खाली गर्नुहोस्',
    showingResultsFor: 'का लागि',
    showingResultsIn: 'भित्र',
    compareSelected: 'छनोट गरिएका तुलना गर्नुहोस्',
    noResourcesFoundCategory: 'यस श्रेणीका लागि स्रोत फेला परेन।',
    browseSubcategoryDescription: 'यस उप-श्रेणी भित्रका स्रोतहरू हेर्नुहोस्।',
    
    // Global search
    globalSearch: {
      placeholder: 'सबै स्रोतहरू खोज्नुहोस्...',
      button: 'खोज्नुहोस्',
    },
    searchResults: {
      title: 'खोज परिणामहरू',
      for: 'का लागि',
      noResults: 'तपाईंको खोजसँग मेल खाने स्रोतहरू फेला परेन।',
      tryDifferent: 'फरक खोज शब्द प्रयास गर्नुहोस्।',
    },

    // Individual category pages
    categoryPages: {
      welcomePrefix: '{{category}} मा स्वागत छ',
      subcategories: {
        // Housing subcategories
        housingProcess: 'पिट्सबर्गमा आवास प्रक्रिया',
        housingProcessDesc: 'आवास खोज प्रक्रियाबारे र आवश्यकताबारे जान्नुहोस्',
        neighborhoodResources: 'छिमेक र रियल-इस्टेट स्रोतहरू',
        neighborhoodResourcesDesc: 'छिमेक र सम्पत्ति सम्बन्धी जानकारी पत्ता लगाउनुहोस्',
        housingAssistanceSubcat: 'आवास सहयोग',
        housingAssistanceSubcatDesc: 'प्रत्यक्ष भाडा सहयोग र आवास सहयोग सेवाहरू',

        // Food subcategories
        culturalFood: 'सांस्कृतिक खाद्य केन्द्र',
        culturalFoodDesc: 'अन्तर्राष्ट्रिय बजार र सांस्कृतिक खाद्य स्रोतहरू',
        foodPantries: 'खाद्य भण्डार',
        foodPantriesDesc: 'आपतकालीन खाद्य सहयोग र भण्डार',
        groceryGuide: 'किराना मार्गदर्शक',
        groceryGuideDesc: 'स्थानीय किराना पसल र खरिद सहयोग',

        // Employment subcategories
        hiringHub: 'के तपाईं आप्रवासी वा नयाँ आगन्तुक भएर काम खोज्दै हुनुहुन्छ?',
        hiringHubDesc: 'हाम्रो Hiring Hub हेर्नुहोस्!',
        entrepreneurship: 'पिट्सबर्गभित्र उद्यमशीलता स्रोतहरू',
        entrepreneurshipDesc: 'व्यवसाय विकास र स्टार्टअप स्रोतहरू',

        // Education subcategories
        schoolResources: 'नयाँ विद्यालय खोज्न स्रोतहरू चाहनुहुन्छ?',
        schoolResourcesDesc: 'विद्यालय भर्ना र शैक्षिक स्रोतहरू',
        tutoring: 'कलेज तयारी वा ट्युटर चाहनुहुन्छ?',
        tutoringDesc: 'ट्युटरिङ सेवा र कलेज तयारी',
        gedResources: 'GED लिन चाहनुहुन्छ?',
        gedResourcesDesc: 'GED तयारी र वयस्क शिक्षा',

        // ESL & Immigration subcategories
        eslResources: 'ESL स्रोतहरू खोज्दै हुनुहुन्छ?',
        eslResourcesDesc: 'अंग्रेजी भाषा सिकाइ र कक्षा',
        documentation: 'कागजात सहयोग',
        documentationDesc: 'आप्रवासन कागजात र कानुनी सहयोग',
        basicNeeds: 'मूलभूत आवश्यकता सहयोग',
        basicNeedsDesc: 'आवश्यक सेवाहरू र आपतकालीन सहयोग',

        // Social subcategories
        fosterConnection: 'सम्बन्ध सुदृढ पार्ने स्रोतहरू',
        fosterConnectionDesc: 'सामाजिक समूह र समुदाय निर्माण',
        culturalResourcesSocial: 'खाना र सांस्कृतिक स्रोतहरू',
        culturalResourcesSocialDesc: 'सांस्कृतिक कार्यक्रम र खाद्य परम्परा',
        faithGroups: 'धार्मिक समूह',
        faithGroupsDesc: 'धार्मिक समुदाय र आध्यात्मिक सहयोग',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
        'community-belonging': 'समुदाय र सम्बन्ध',
        'culture-leisure': 'संस्कृति, कला र मनोरञ्जन',
        'esl-immigrant': 'ESL र आप्रवासी समर्थन',
        'education-youth': 'शिक्षा: वयस्क र युवा',
        'living-essentials': 'जीवनका आधारभूत आवश्यकताहरू',
        'work-business': 'जागिर र व्यवसाय स्रोतहरू',
      },
      categoryDescriptions: {
        'community-belonging': 'पिट्सबर्गमा जोडिनुहोस्, सहभागिता जनाउनुहोस् र समुदाय निर्माण गर्नुहोस्',
        'culture-leisure': 'कला, पारिवारिक गतिविधि, शौक र नाइटलाइफ अन्वेषण गर्नुहोस्',
        'esl-immigrant': 'भाषा सिकाइ, आप्रवासन सहयोग र नयाँ आगन्तुकका सेवा',
        'education-youth': 'वयस्क शिक्षा, ट्युटरिङ र युवा अवसरहरू',
        'living-essentials': 'आवास, स्वास्थ्य, यातायात र खाना',
        'work-business': 'जागिर, क्यारियर सहयोग र व्यवसाय स्रोतहरू',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'सरकार',
        'civic-advocacy': 'स्थानीय वकालत',
        'civic-volunteer': 'स्वयंसेवा',
        'civic-youth': 'युवाको सहभागिता',
        religion: 'धर्म',
        'social-connection': 'सामाजिक सम्बन्ध',

        // Culture & Leisure
        art: 'कला',
        family: 'पारिवारिक मनोरञ्जन',
        'beauty-hair': 'कपाल हेरचाह / सौन्दर्य',
        'hobby-spaces': 'शौक स्थानहरू',
        'night-life': 'नाइट लाइफ',

        // ESL & Immigrant Support
        'esl-support': 'अंग्रेजी दोस्रो भाषा (ESL) समर्थन',
        'general-law': 'सामान्य कानून',
        'immigration-asylum': 'आप्रवासन / आश्रय',
        'refugee-immigrant-support': 'शरणार्थी / आप्रवासी समर्थन',

        // Education & Youth
        'adult-education': 'वयस्क शिक्षा',
        'college-prep-tutoring': 'कलेज तयारी / ट्युटरिङ',
        'youth-education': 'युवा शिक्षा',
        'youth-programming': 'युवा कार्यक्रम',

        // Living Essentials
        'food-pantries': 'खाद्य भण्डार',
        'grocery-guide': 'किराना मार्गदर्शक',
        'specialty-stores': 'विशेष स्टोर',
        'guide-discover-pittsburgh': 'पिट्सबर्ग बुझौँ',
        'guide-diverse-businesses': 'विविध व्यवसाय',
        'guide-immigrant-services': 'आप्रवासी सेवाहरू',
        'health-additional-support': 'अतिरिक्त सहयोग',
        'health-body-mind': 'शरीर र मनको हेरचाह',
        'health-hospitals': 'अस्पताल',
        'health-nutrition': 'पोषण',
        'health-senior-care': 'ज्येष्ठ नागरिक हेरचाह',
        'housing-buying-home': 'घर किन्नु',
        'housing-assistance': 'आवास सहयोग',
        'housing-relocating': 'पिट्सबर्ग सराइ',
        'housing-rent': 'भाडामा बसाइँ',
        transportation: 'यातायात',

        // Work & Business
        'business-development': 'व्यवसाय विकास',
        'business-support': 'व्यवसाय समर्थन',
        'career-support': 'क्यारियर समर्थन',
        'internship-opportunities': 'इन्टर्नसिप अवसर',
      },
      groups: {
        'civic-engagement': 'नागरिक सहभागिता',
        legal: 'कानुनी',
        food: 'खाना',
        'pittsburgh-guides': 'पिट्सबर्ग मार्गदर्शक',
        health: 'स्वास्थ्य',
        housing: 'आवास',
        transit: 'यातायात',
      },
    },
  },

  // Checklist page
  checklist: {
    loadingMessage: 'तपाईंको व्यक्तिगत चेकलिस्ट लोड हुँदैछ...',
  },

  // About page
  about: {
    title: 'Pittsburgh Tomorrow Pioneer बारे',
    description:
      'Pittsburgh Tomorrow Pioneer तपाईंको मित्रवत् मार्गदर्शक हो जसले पिट्सबर्ग र एलेगेनी काउन्टीमा बसोबास गर्न मद्दत गर्छ। तपाईं टेक व्यवसायी हुनुहुन्छ वा नयाँ सुरुवात खोज्दै नयाँ आगन्तुक — Pittsburgh Tomorrow Pioneer ले तपाईंलाई आवास, शिक्षा, रोजगारी र समुदायका स्थानीय स्रोतहरूसँग जोड्छ।',
    features: [
      '१६१+ गैर-नाफामूलक संस्थाहरू',
      'व्यक्तिगत चेकलिस्ट र रोडम्याप',
      'स्वतन्त्र र परम्परागत दुवै प्रकारका नयाँ आगन्तुकका लागि समर्थन',
      'तपाईंको आवश्यकताअनुसार सरल स्क्रिनिङ',
    ],
    conclusion:
      'यो परियोजना स्थानीय साझेदार र स्वयंसेवकहरूको सहकार्यमा बनेको हो, जसको उद्देश्य पिट्सबर्गलाई सबैका लागि आत्मीय, सहयोगी र अवसरले भरिपूर्ण सहर बनाउनु हो।',
    copyright: 'Pittsburgh Tomorrow Pioneer. सबै अधिकार सुरक्षित।',

    // AboutPage specific content
    welcomeText:
      'Pittsburgh Tomorrow Pioneer मा स्वागत छ — पिट्सबर्ग र एलेगेनी काउन्टीमा नयाँ जीवन सुरु गर्न तपाईंको व्यक्तिगत मार्गदर्शक। तपाईं हालै संयुक्त राज्य अमेरिकामा आउनुभएको छ वा ऊर्जा, रोबोटिक्स, AI, जीवन विज्ञान वा इस्पात उद्योगका पिट्सबर्गका उदीयमान कम्पनीहरूसँग नयाँ काम सुरु गर्नुभएको छ — Pittsburgh Tomorrow Pioneer तपाईंलाई सहयोग गर्न यहाँ छ। आवास खोज्नुदेखि बालबालिकालाई विद्यालयमा भर्ना गराउनु, अंग्रेजी कक्षा खोज्नु वा धार्मिक समुदाय वा स्थानीय खाद्य सहयोगसँग जोडिनु — आवश्यक सबै स्रोतहरू एकै स्थानमा।',
    
    whyPioneerTitle: 'किन Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'किनभने नयाँ शहरमा नयाँ सुरुवात भन्नाले शून्यबाट सुरु गर्नु होइन।',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer ले पिट्सबर्ग र एलेगेनी काउन्टीमा नयाँ जीवन सुरु गर्न आवश्यक सबै कुरा एकै ठाउँमा ल्याउँछ — विश्वसनीय र प्रयोग गर्न सजिलो।',
    whyPioneerText3: 'यो नि:शुल्क, व्यापक र तपाईंको खोज, तुलना र अनुमानमा घण्टौं बचत गर्न डिजाइन गरिएको छ। तपाईं आवास खोज्दै हुनुहुन्छ, बालबालिकालाई विद्यालयमा भर्ना गराउँदै हुनुहुन्छ, अंग्रेजी सिक्दै हुनुहुन्छ, वा आफ्नो विश्वास, भाषा वा रुचि साझा गर्ने मानिसहरू खोज्दै हुनुहुन्छ — Pittsburgh Tomorrow Pioneer ले तपाईंको सर्ने प्रक्रियालाई सहज र नयाँ जीवनलाई समृद्ध बनाउन कुनै अवसर छुटाउन दिँदैन।',
    whyPioneerText4: 'जहाँ Google खोजले तपाईंलाई सबै कुरा देखाउँछ, Pittsburgh Tomorrow Pioneer ले वास्तवमा के महत्त्वपूर्ण छ देखाउँछ।',
    whyPioneerText5: 'जहाँ AI च्याटबटले जवाफ दिन्छ, Pioneer ले तपाईंलाई रोडम्याप दिन्छ।',
    whyPioneerText6: 'जहाँ धेरैजसो स्थानान्तरण उपकरणहरू लजिस्टिक्समा रोकिन्छन्, Pioneer समुदायबाट सुरु हुन्छ।',
    whyPioneerText7: 'यो पिट्सबर्ग हो, तपाईंका लागि व्यक्तिगत बनाइएको।',
    
    youAreThePioneerTitle: 'तपाईं — Pittsburgh Tomorrow Pioneer हुनुहुन्छ',
    youAreThePioneerText1:
      'तपाईं केवल सर्ने होइन — तपाईं नयाँ केही सुरु गर्दै हुनुहुन्छ। नयाँ काम। नयाँ विद्यालय। नयाँ घर। र सायद नयाँ भाषा वा संस्कृति पनि। यो साहस चाहिन्छ।',
    youAreThePioneerText2:
      'हामीले Pittsburgh Tomorrow Pioneer तपाईंलाई समर्थन गर्न बनाएका हौँ — किनकि तपाईं नै Pittsburgh Tomorrow Pioneer हुनुहुन्छ। यो साइट पिट्सबर्गमा तपाईंको भविष्य निर्माणको यात्रामा सधैं साथ रहन्छ।',
    howPioneerHelpsTitle: 'Pittsburgh Tomorrow Pioneer कसरी सहयोग गर्छ',

    madeForYouTitle: 'तपाईंका लागि बनाइएको — जहाँबाट हुनुहुन्छ त्यहींबाट',
    madeForYouDescription:
      'हामीलाई थाहा छ सबैले अंग्रेजी बोल्दैनन्। त्यसैले Pittsburgh Tomorrow Pioneer ले स्पेनी, अरबी, फ्रेन्च, चिनियाँ, दारी लगायत धेरै भाषा समर्थन गर्छ। तपाईंले आफ्नो भाषामा लेख्नुभयो भने, Pittsburgh Tomorrow Pioneer ले पनि त्यही भाषामा जवाफ दिन्छ।',

    personalRoadmapTitle: 'आफ्नो व्यक्तिगत रोडम्याप बनाउनुहोस्',
    personalRoadmapDescription:
      'हाम्रो सबैभन्दा शक्तिशाली उपकरण तपाईंको व्यक्तिगत रोडम्याप हो — केवल तपाईंका लागि बनाइएको चेकलिस्ट। तपाईंका आवश्यकता (आवास, खाना, रोजगारी, शिक्षा आदि) सम्बन्धी केही सरल प्रश्नहरूको उत्तर दिएर Pittsburgh Tomorrow Pioneer ले तपाईंका आगामी कदमका लागि अनुकूल कार्य योजना बनाउँछ। तपाईंले गर्न सक्नुहुन्छ:',
    personalRoadmapFeatures: [
      'आफ्नो रोडम्याप जब चाह्यो हेर्नु र अद्यावधिक गर्नु',
      'लगइन गरेर प्रगति सुरक्षित गर्नुहोस् (वैकल्पिक)',
      'चेकलिस्ट डाउनलोड वा प्रिन्ट गर्नुहोस्',
      'पिट्सबर्गको जीवनसँगै आफ्नो रोडम्याप दोहोर्याएर सुधार गर्नुहोस्',
    ],
    personalRoadmapNote: 'यदि तपाईं आफ्नै गतिमा अन्वेषण गर्न चाहनुहुन्छ भने, लगइन नगरी पनि हाम्रो पूर्ण स्रोत पुस्तकालय हेर्न सक्नुहुन्छ।',

    smartSupportTitle: 'सम्झदार, स्व-मार्गदर्शित सहयोग',
    smartSupportDescription:
      'Pittsburgh Tomorrow Pioneer मा सयौँ सामान्य प्रश्‍नका उत्तर दिन तालिम प्राप्त मित्रवत् AI च्याटबोट छ। यसले तपाईंलाई स्रोततर्फ मार्गदर्शन गर्न, स्थानीय प्रणालीहरू कसरी काम गर्छन् भनेर व्याख्या गर्न र अर्को कदम चाल्न मद्दत गर्छ। विश्वसनीय साझेदारहरूको सम्पर्क सूचीकासँगको पूरा निर्देशिका पनि उपलब्ध छ — सार्वजनिक निकाय, गैर-नाफामूलक, सेवा प्रदायक आदि।',

    trustedPartnersTitle: 'विश्वसनीय साझेदार',
    trustedPartnersDescription:
      'पिट्सबर्ग र एलेगेनी काउन्टीभर रहेका हाम्रो विश्वसनीय साझेदारहरूको निर्देशिकामा पहुँच पाउनुहोस् — सार्वजनिक निकाय, गैर-नाफामूलक संस्थाहरू र सेवा प्रदायकहरू। हाम्रो सञ्जालमा ३८०+ गैर-नाफामूलक संस्थाहरू छन्, जो तपाईंका विशेष आवश्यकताहरूमा सहयोग गर्न तयार छन्।',

    privacyTitle: 'तपाईंको गोपनीयता, सुरक्षित',
    privacyDescription:
      'तपाईंको गोपनीयता र सुरक्षा हाम्रो लागि महत्वपूर्ण छ। यदि तपाईंले खाता बनाउनुभयो भने तपाईंको व्यक्तिगत डेटा SOC II मापदण्डअनुसार सुरक्षित गरिन्छ। हामी तपाईंको डेटा कहिल्यै बेच्दैनौं वा बाँड्दैनौं। तपाईं सधैं आफ्नो जानकारीमाथि पूर्ण नियन्त्रणमा हुनुहुन्छ।',

    pittsburghTomorrowTitle: 'Pittsburgh Tomorrow बारे',
    pittsburghTomorrowText1:
      'Pittsburgh Tomorrow Pioneer Pittsburgh Tomorrow नामक गैर-नाफामूलक संस्थाको पहल हो, जसको उद्देश्य पिट्सबर्गको विकास हो। हामी इतिहासकार डेभिड म्याककलोले "अमेरिकाको अपरिहार्य सहर" भनेको भावनालाई नयाँ रूप दिँदै अघि बढिरहेका छौँ।',
    pittsburghTomorrowText2:
      'अमेरिका आधारबाट निर्माण गर्ने क्षेत्रमा आज नयाँ जीवन्तता र नागरिक भावनाले ऊर्जा पाएको छ: नयाँ आगन्तुकलाई स्वागत, उद्यमीलाई सुरु र नयाँ बाटो खोल्ने। अवसर समातेका र भविष्य निर्माण गरिरहेका नयाँ पुस्ताका Pittsburgh Tomorrow Pioneer हरूबाट हाम्रो अभियान प्रेरित छ।',
    pittsburghTomorrowText3:
      'Pittsburgh Tomorrow मा, हाम्रो लक्ष्य पिट्सबर्गको विकास हो। र यसको अर्थ केवल जनसंख्या वा आर्थिक वृद्धि मात्र होइन; यसको अर्थ हाम्रो शहरको भावनालाई पुनर्जीवित गर्नु हो। साना व्यवसाय र उद्यमीहरूलाई समर्थन गर्नु। हाम्रो वातावरणलाई सुन्दर र संरक्षित गर्नु। कला र संस्कृतिलाई प्रवर्द्धन गर्नु। नयाँ आगन्तुकहरूलाई स्वागत गर्नु र समुदाय निर्माण गर्नु। हाम्रो शहरमा गर्व गर्नु, र यसलाई फेरि नक्सामा राख्नु।',
    pittsburghTomorrowLink: 'थप जान्नुहोस्',

    // Call to action section
    readyToStartTitle: 'Pittsburgh मा आफ्नो यात्रा सुरु गर्नुहोस्',
    readyToStartDescription:
      'आफ्नो व्यक्तिगत रोडम्याप बनाउनुहोस् जसले तपाईंलाई आफ्नो नयाँ घरमा बसोबास गर्न र फस्टाउन मद्दत गर्छ।',
    getStarted: 'सुरु गर्नुहोस्',
    browseResources: 'स्रोतहरू हेर्नुहोस्',
  },

  // Privacy Policy
  privacy: {
    backToAbout: 'Pittsburgh Tomorrow Pioneer बारे पृष्ठमा फर्कनुहोस्',
    title: 'डेटा पारदर्शिता र गोपनीयता वक्तव्य',
    description:
      'Pittsburgh Tomorrow मा, हामी पारदर्शिता र तपाईंको विश्वासलाई महत्त्व दिन्छौँ। किन हामी केही जानकारी माग्छौँ, कसरी प्रयोग गर्छौँ, र यसले तपाईंलाई कसरी फाइदा पुर्‍याउँछ भन्ने कुरा स्पष्ट पार्न हामी प्रतिबद्ध छौँ।',

    whyWeAskTitle: 'किन यी प्रश्नहरू सोधिन्छन् र तपाईंको जानकारी कसरी प्रयोग हुन्छ:',
    whyWeAskDescription:
      'हामीले सोधेका प्रश्नहरू तपाईंका लागि अनुकूल रोडम्याप बनाउनका लागि हुन्। तपाईंका उत्तरहरूले हामीलाई निम्न गर्न सक्षम बनाउँछ:',
    whyWeAskBullet1:
      'तपाईंका आवश्यकताअनुसार डेटाबेसबाट सम्बन्धित स्रोतहरू र जानकारी तान्नु।',
    whyWeAskBullet2:
      'विभिन्न समुदाय र पृष्ठभूमिका मानिसहरूसम्म समान रूपमा पुगिएको सुनिश्चित गर्नु।',
    whyWeAskBullet3:
      'हामी कुन समूहसम्म नपुगेका छौँ भनेर पत्ता लगाई तिनीहरूलाई राम्रोसँग समेट्नु।',
    whyWeAskBullet4:
      'हाम्रा AI उपकरणहरू सुधार गरी सबै प्रयोगकर्तालाई प्रभावकारी रूपमा सेवा पुर्‍याउनु।',
    weDoNotSell: 'हामी तपाईंको डेटा बेच्दैनौँ। यो केवल माथि उल्लेखित प्रयोजनका लागि प्रयोग हुन्छ।',

    dataRetentionTitle: 'डेटा संरक्षण:',
    dataRetentionDescription:
      'तपाईंले आफ्नो अनुकूलित ड्यासबोर्डमा अब पहुँच चाहन्नु भनेर हामीलाई जानकारी नदिएसम्म तपाईंको जानकारी हाम्रो डेटाबेसमा रहन्छ। त्यसपछि, तपाईंको जानकारी अनामिक गरिन्छ र केवल हाम्रा AI सेवाहरू सुधार गर्न र पिट्सबर्गका नयाँ आगन्तुकलाई सहयोग पुर्‍याउन प्रयोग हुन्छ।',

    quomeTitle: 'Quome ले तपाईंको जानकारी कसरी प्रयोग गर्छ:',
    quomeDescription:
      'हाम्रो साइट Quome द्वारा होस्ट गरिएको हो, जसले प्लेटफर्म सञ्चालन र सुधारका लागि केही डेटा संकलन गर्न सक्छ। Quome ले तपाईंको डेटा कसरी प्रयोग र सुरक्षित गर्छ भन्नेबारे थप जान्न उनीहरूको',

    skillBuilderTitle: 'Skill Builder ले तपाईंको जानकारी कसरी प्रयोग गर्छ:',
    skillBuilderDescription:
      'हाम्रो साइटको च्याटबोट SkillBuilder.io द्वारा होस्ट गरिएको छ र प्लेटफर्म सञ्चालन तथा सुधारका लागि केही डेटा संकलन गर्न सक्छ। SkillBuilder.io ले तपाईंको डेटा कसरी प्रयोग र सुरक्षित गर्छ भन्नेबारे थप जान्न उनीहरूको',

    contactDescription:
      'हाम्रो डेटा प्रयोग वा गोपनीयता अभ्यासबारे प्रश्न भएमा, कृपया प्रत्येक पृष्ठको दायाँपट्टि रहेको प्रतिक्रिया (Feedback) बटन प्रयोग गर्नुहोस्।',
    privacyPolicyLink: 'गोपनीयता नीति',
  },

  // Footer
  footer: {
    aboutPioneer: 'Pittsburgh Tomorrow Pioneer बारे',
    aboutDescription:
      'Pittsburgh Tomorrow Pioneer ले पिट्सबर्ग र एलेगेनी काउन्टीका नयाँ आगन्तुकलाई आफ्नो बाटो खोज्न मद्दत गर्छ। तपाईंको यात्रा जे भए पनि, हामी तपाईंलाई सही स्रोत र अवसरसँग जोड्छौँ।',
    quickLinks: 'द्रुत लिङ्कहरू',
    home: 'गृहपृष्ठ',
    about: 'बारे',
    resources: 'स्रोतहरू',
    privacyPolicy: 'गोपनीयता नीति',
    getStarted: 'सुरु गर्नुहोस्',
    contact: 'सम्पर्क',
    location: 'पिट्सबर्ग, पेन्सिलभेनियाबाट नमस्कार',
    email: 'इमेल: Hello@pittsburghtomorrow.org',
  },

  // Role-based content
  roleContent: {
    welcomeImmigrant: 'स्वागत छ, {{name}}!',
    welcomeStudent: 'पुनः स्वागत छ, {{name}}!',
    welcomeProfessional: 'स्वागत छ, {{name}}!',
    welcomeLocal: 'नमस्कार {{name}}!',

    subtitleImmigrant: 'तपाईंको बसोबासको यात्रा यहाँबाट सुरु हुन्छ',
    subtitleStudent: 'तपाईंको शैक्षिक सफलता हाम्रो प्राथमिकता हो',
    subtitleProfessional: 'तपाईंको क्यारियर विकासमा हाम्रो ध्यान',
    subtitleLocal: 'पिट्सबर्गलाई सबैका लागि स्वागतशील बनाऔँ',

    demoUserNote: 'तपाईं Pittsburgh Tomorrow Pioneer लाई {{role}} प्रयोगकर्ता रूपमा हेर्दै हुनुहुन्छ। अनुभव तपाईंको भूमिकाअनुसार अनुकूलित छ।',
    userBadge: '{{role}} प्रयोगकर्ता',

    urgentResources: 'आपतकालीन स्रोत',

    // Resource categories
    emergencyServices: 'आपतकालीन सेवा',
    emergencyDescription: '२४/७ संकट सहयोग र तत्काल मद्दत',
    temporaryHousing: 'अस्थायी आवास',
    temporaryHousingDescription: 'आश्रय र आवास सहयोग कार्यक्रम',
    healthcareAccess: 'स्वास्थ्य पहुँच',
    healthcareDescription: 'चिकित्सा सेवा र स्वास्थ्य बीमा सहयोग',
    languageServices: 'भाषा सेवा',
    languageServicesDescription: 'अनुवाद र व्याख्या सहयोग',

    // Additional resource categories for other roles
    academicSupport: 'शैक्षिक सहयोग',
    academicSupportDescription: 'ट्युटरिङ, अध्ययन समूह र शैक्षिक स्रोतहरू',
    studentHousing: 'विद्यार्थी आवास',
    studentHousingDescription: 'क्याम्पस भित्र र बाहिरका आवास विकल्प',
    financialAid: 'आर्थिक सहयोग',
    financialAidDescription: 'वृत्ति, अनुदान र आर्थिक सहायता',
    studentGroups: 'विद्यार्थी समूह',
    studentGroupsDescription: 'अन्तर्राष्ट्रिय विद्यार्थी संस्था र क्लब',
    professionalNetworks: 'व्यावसायिक सञ्जाल',
    professionalNetworksDescription: 'उद्योग भेटघाट र सञ्जाल कार्यक्रम',
    careerDevelopment: 'क्यारियर विकास',
    careerDevelopmentDescription: 'सीप तालिम र प्रमाणिकरण कार्यक्रम',
    professionalHousing: 'व्यावसायिक आवास',
    professionalHousingDescription: 'कार्यकारी आवास र स्थानान्तरण सेवा',
    mentorship: 'मार्गदर्शन',
    mentorshipDescription: 'व्यावसायिक मार्गदर्शन र परामर्श कार्यक्रम',
    volunteerOpportunities: 'स्वयंसेवा अवसर',
    volunteerOpportunitiesDescription: 'समुदायका नयाँ आगन्तुकलाई सहयोग गर्ने तरिकाहरू',
    communityOrganizations: 'समुदाय संगठन',
    communityOrganizationsDescription: 'स्थानीय गैर-नाफामूलक संस्था र सेवा प्रदायक',
    supportNetworks: 'सहयोग सञ्जाल',
    supportNetworksDescription: 'मार्गदर्शन र मित्रता कार्यक्रम',
    culturalExchange: 'सांस्कृतिक आदानप्रदान',
    culturalExchangeDescription: 'सांस्कृतिक कार्यक्रम र आदानप्रदान',

  },

  // Dashboard page
  dashboard: {
    signInExplore: 'आफ्नो व्यक्तिगत पिट्सबर्ग यात्रा हेर्न लगइन गर्नुहोस्',
      signInToPioneer: 'Pittsburgh Tomorrow Pioneer मा लगइन गर्नुहोस्',
    welcomeTitle: 'Pittsburgh Tomorrow Pioneer मा स्वागत छ, {{name}}!',
    welcomeTitleWithoutName: 'Pittsburgh Tomorrow Pioneer मा स्वागत छ!',
    journeyContinues: 'तपाईंको व्यक्तिगत यात्रा जारी छ...',
    beginJourney: 'आफ्नो व्यक्तिगत पिट्सबर्ग यात्रा सुरु गर्नुहोस्',
    completedSurveyHeader: 'तपाईंले सर्वे पहिले नै पूरा गर्नुभएको छ',
    completedSurveyText:
      'तपाईंले आफ्नो अनबोर्डिङ सर्वे पूरा गर्नुभयो। तल व्यक्तिगत रोडम्याप हेर्नुहोस् वा सिफारिसहरू अद्यावधिक गर्न उत्तर सम्पादन गर्नुहोस्।',
    completedSurveyTextWithDate:
      'तपाईंले {{date}} मा अनबोर्डिङ सर्वे पूरा गर्नुभयो। तल व्यक्तिगत रोडम्याप हेर्नुहोस् वा सिफारिसहरू अद्यावधिक गर्न उत्तर सम्पादन गर्नुहोस्।',
    editResponses: 'उत्तर सम्पादन गर्नुहोस्',
    viewMyRoadmap: 'मेरो रोडम्याप हेर्नुहोस्',
    noteLabel: 'सूचना:',
    editRegenerateNote:
      'यदि तपाईंले सर्वेका उत्तर सम्पादन गर्नुभयो भने, तपाईंको व्यक्तिगत सिफारिस र रोडम्याप तपाईंका अद्यावधिक प्राथमिकतासँग मिल्ने गरी स्वतः पुनः सिर्जना हुनेछ।',
    bridgitHelp:
      'सर्वेले नछोएका प्रश्न छन्? व्यक्तिगत सहयोगका लागि दायाँतल्लो कुनामा रहेको BRIDGIT च्याटबोट थिच्नुहोस्!',
    personalizedRoadmap: 'तपाईंको व्यक्तिगत रोडम्याप',
    unlockExperience: 'आफ्नो अनुकूलित अनुभव अनलक गर्नुहोस्',
    completeSurveyHeader: 'सुरु गर्न आफ्नो सर्वे पूरा गर्नुहोस्',
    completeSurveyText:
      'हाम्रो छिटो ५-मिनेटको सर्वे भर्नुहोस् र पिट्सबर्गका लागि तपाईंका आवश्यकता र लक्ष्यअनुसार व्यक्तिगत स्रोत सिफारिस प्राप्त गर्नुहोस्।',
  },

  // Profile page
  profile: {
    title: 'प्रोफाइल सेटिङहरू',
    subtitle: 'आफ्ना व्यक्तिगत जानकारी र प्राथमिकता व्यवस्थापन गर्नुहोस्',
    accountInformation: 'खाता जानकारी',
    accountInformationDescription: 'आफ्नो खाता सम्बन्धी आधारभूत विवरण अद्यावधिक गर्नुहोस्',
    basicInformation: 'आधारभूत जानकारी',
    basicInformationDescription: 'आफ्ना आधारभूत व्यक्तिगत विवरण अद्यावधिक गर्नुहोस्',
    firstName: 'पहिलो नाम',
    enterFirstName: 'पहिलो नाम लेख्नुहोस्',
    lastName: 'थर',
    enterLastName: 'थर लेख्नुहोस्',
    username: 'प्रयोगकर्ता नाम',
    enterUsername: 'प्रयोगकर्ता नाम लेख्नुहोस्',
    email: 'इमेल',
    emailChangeNote: 'इमेल परिवर्तन गर्न सकिँदैन। परिवर्तन आवश्यक परे समर्थनसँग सम्पर्क गर्नुहोस्।',
    emailCannotBeChanged: 'इमेल परिवर्तन गर्न सकिँदैन। परिवर्तनका लागि समर्थनसँग सम्पर्क गर्नुहोस्।',
    surveyRequired: 'पहिले आफ्नो सर्वे पूरा गर्नुहोस्',
    surveyRequiredDescription: 'व्यक्तिगत सिफारिस पाउन र सर्वेका उत्तर सम्पादन गर्न तपाईंले प्रारम्भिक मूल्याङ्कन (सर्वे) पूरा गर्नुपर्छ।',
    takeSurvey: 'सर्वे लिनुहोस्',
    basicQuestions: 'आधारभूत जानकारी',
    basicQuestionsDescription: 'व्यक्तिगत सिफारिसका लागि आफ्नो बारेमा र अवस्थाबारे हामीलाई बताउनुहोस्',
    selectPrimary: 'आफ्नो प्राथमिक प्राथमिकता छान्नुहोस्:',
    selectOption: 'विकल्प छान्नुहोस्...',
    supportNeeds: 'सहयोग र आवश्यकता',
    supportNeedsDescription: 'तपाईंलाई कस्तो सहयोग र सेवाहरू आवश्यक छन्?',
    selectMultiple: 'लागू सबै विकल्प छान्नुहोस्:',
    selectAtLeastOne: 'कृपया कम्तीमा एउटा विकल्प छान्नुहोस्।',
    timelinePreferences: 'समयरेखा र प्राथमिकता',
    timelinePreferencesDescription: 'तपाईंको समयरेखा र प्रविधि प्राथमिकता',
    backToDashboard: 'ड्यासबोर्डमा फर्कनुहोस्',
    languageAndCultural: 'भाषा र सांस्कृतिक पृष्ठभूमि',
    languageAndCulturalDescription: 'हामीलाई अझ राम्रो व्यक्तिगत सिफारिस दिन मद्दत गर्नुहोस्',
    primaryLanguage: 'प्राथमिक भाषा',
    selectPrimaryLanguage: 'प्राथमिक भाषा छान्नुहोस्',
    culturalBackground: 'सांस्कृतिक पृष्ठभूमि',
    selectCulturalBackground: 'सांस्कृतिक पृष्ठभूमि छान्नुहोस्',
    professionalAndLiving: 'व्यावसायिक र बसोबास स्थिति',
    professionalAndLivingDescription: 'यसले सम्बन्धित स्रोत र सेवाहरू सिफारिस गर्न मद्दत गर्छ',
    professionalStatus: 'व्यावसायिक स्थिति',
    selectProfessionalStatus: 'आफ्नो व्यावसायिक स्थिति छान्नुहोस्',
    housingSituation: 'आवास स्थिति',
    selectHousingSituation: 'आवास स्थिति छान्नुहोस्',
    familyStatus: 'पारिवारिक स्थिति',
    selectFamilyStatus: 'पारिवारिक स्थिति छान्नुहोस्',
    saveChanges: 'परिवर्तन सुरक्षित गर्नुहोस्',
    saving: 'सुरक्षित हुँदैछ...',
    recalculatingRecommendations: 'सिफारिसहरू पुनः गणना हुँदैछन्...',
    profileUpdated: 'प्रोफाइल अद्यावधिक भयो',
    profileUpdatedDescription: 'तपाईंको प्रोफाइल सफलतापूर्वक अद्यावधिक भयो।',
    accountUpdated: 'खाता अद्यावधिक भयो',
    accountUpdatedDescription: 'तपाईंको खाता जानकारी सफलतापूर्वक अद्यावधिक भयो। प्राथमिकता सुरक्षित गर्न सर्वे पूरा गर्नुहोस्।',
    updateFailed: 'अद्यावधिक असफल',
    updateFailedDescription: 'प्रोफाइल अद्यावधिक हुन सकेन। कृपया पुनः प्रयास गर्नुहोस्।',
    pleaseLogIn: 'प्रोफाइल हेर्न कृपया लगइन गर्नुहोस्।',

    // Language options
    languages: {
      english: 'अंग्रेजी',
      spanish: 'स्पेनी',
      french: 'फ्रेन्च',
      arabic: 'अरबी',
      chinese: 'चिनियाँ',
      swahili: 'स्वाहिली',
      hindi: 'हिन्दी',
      portuguese: 'पोर्चुगिज',
      russian: 'रूसी',
      nepali: 'नेपाली',
      somali: 'सोमाली',
      tagalog: 'टागालोग',
      turkish: 'टर्किश',
      other: 'अन्य',
    },

    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'अमेरिकी/पश्चिमी',
      westAfrican: 'पश्चिमी अफ्रिकी',
      middleEasternNorthAfrican: 'मध्यपूर्वी/उत्तरी अफ्रिकी',
      southAsian: 'दक्षिण एसियाली (भुटानी सहित)',
      latinoHispanic: 'लातिनो/हिस्पानिक',
      eastAsian: 'पूर्वी एसियाली',
      easternEuropean: 'पूर्वी युरोपेली',
      other: 'अन्य/भन्न चाहन्न',
    },

    // Professional status options
    professionalStatuses: {
      student: 'विद्यार्थी',
      graduateStudent: 'स्नातकोत्तर विद्यार्थी',
      softwareEngineer: 'सफ्टवेयर इन्जिनियर',
      healthcareProfessional: 'स्वास्थ्य व्यवसायी',
      researchScientist: 'अनुसन्धान वैज्ञानिक',
      seekingEmployment: 'रोजगारी खोज्दै',
      employedFullTime: 'पूर्ण समय कार्यरत',
      employedPartTime: 'आंशिक समय कार्यरत',
      selfEmployed: 'स्व-रोजगार',
      retired: 'अवकाशप्राप्त',
      other: 'अन्य',
    },

    // Housing situation options
    housingSituations: {
      temporaryHousing: 'अस्थायी आवास',
      campusHousing: 'क्याम्पस आवास',
      apartmentHunting: 'अपार्टमेन्ट खोज',
      rentingApartment: 'अपार्टमेन्ट भाडा',
      rentingHouse: 'घर भाडा',
      homeowner: 'घरधनी',
      livingWithFamily: 'परिवारसँग बसोबास',
      sharedHousing: 'साझा आवास',
      other: 'अन्य',
    },

    // Family status options
    familyStatuses: {
      single: 'अविवाहित',
      married: 'विवाहित',
      familyWithChildren: 'बालबालिकासहित परिवार',
      singleParent: 'एक्लो अभिभावक',
      extendedFamily: 'बढारो/संयुक्त परिवार',
      other: 'अन्य',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'हामीले तपाईंलाई के भन्ने?',
    description: 'तपाईंको नाम भनेर हामीलाई तपाईंको अनुभव व्यक्तिगत बनाउन मद्दत गर्नुहोस्।',
    firstName: 'पहिलो नाम',
    firstNamePlaceholder: 'तपाईंको पहिलो नाम प्रविष्ट गर्नुहोस्',
    lastName: 'थर',
    lastNamePlaceholder: 'तपाईंको थर प्रविष्ट गर्नुहोस् (वैकल्पिक)',
    skip: 'अहिलेको लागि छोड्नुहोस्',
    save: 'नाम सुरक्षित गर्नुहोस्',
    saving: 'सुरक्षित गर्दै...',
    firstNameRequired: 'पहिलो नाम आवश्यक छ',
    firstNameRequiredDescription: 'कृपया जारी राख्न तपाईंको पहिलो नाम प्रविष्ट गर्नुहोस्।',
    nameUpdated: 'नाम अपडेट भयो',
    nameUpdatedDescription: 'तपाईंको नाम सफलतापूर्वक सुरक्षित भयो।',
    updateFailed: 'अपडेट असफल',
    updateFailedDescription: 'तपाईंको नाम अपडेट गर्न असफल भयो। कृपया फेरि प्रयास गर्नुहोस्।',
  },
  
  // Common elements
  common: {
    dashboard: 'ड्यासबोर्ड',
    loading: 'लोड हुँदैछ...',
    search: 'खोज्नुहोस्',
    filter: 'फिल्टर',
    next: 'अगाडि',
    previous: 'अघिल्लो',
    save: 'सुरक्षित गर्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    confirm: 'पुष्टि गर्नुहोस्',
    edit: 'सम्पादन गर्नुहोस्',
    delete: 'मेटाउनुहोस्',
    close: 'बन्द गर्नुहोस्',
    back: 'पछाडि',
    backToResources: 'स्रोतहरूमा फर्कनुहोस्',
    viewDetails: 'विवरण हेर्नुहोस्',
    learnMore: 'थप जान्नुहोस्',
    getHelp: 'सहयोग पाउनुहोस्',
    startNow: 'अहिले नै सुरु गर्नुहोस्',
    tryNow: 'अहिले नै प्रयास गर्नुहोस्',
    downloadNow: 'अहिले नै डाउनलोड गर्नुहोस्',
    visitWebsite: 'हेर्नुहोस्',
    shareThis: 'यसलाई साझा गर्नुहोस्',
    copied: 'कपी भयो!',
    copy: 'कपी गर्नुहोस्',
    show: 'देखाउनुहोस्',
    hide: 'लुकाउनुहोस्',
    expand: 'विस्तार गर्नुहोस्',
    collapse: 'भाँच्नुहोस्',
    seeMore: 'थप हेर्नुहोस्',
    seeLess: 'कम हेर्नुहोस्',
    showingTopOf: 'शीर्ष {{current}} मध्ये {{total}} स्रोतहरू देखाइँदै',
    selectLanguage: 'भाषा छान्नुहोस्',
    personalizedRecommendationsLabel: 'व्यक्तिगत सिफारिस',
    exploreResourcesNowLabel: 'अहिले नै स्रोतहरू अन्वेषण गर्नुहोस्',
    curatedAdviceLabel: 'सफलताका लागि छानिएका सल्लाह',

    // Accessibility and UI labels
    toggleSidebar: 'साइडबार टगल गर्नुहोस्',
    toggleMobileMenu: 'मोबाइल मेनु टगल गर्नुहोस्',
    feedback: 'प्रतिक्रिया',
    openInNewTab: 'नयाँ ट्याबमा खोल्नुहोस्',
    removeBookmark: 'बुकमार्क हटाउनुहोस्',
    editResource: 'स्रोत सम्पादन',
    deleteResource: 'स्रोत मेटाउनुहोस्',
    dragToReorder: 'फेरि क्रम मिलाउन तान्नुहोस्',
    saveOrPrintOptions: 'सुरक्षित वा प्रिन्ट विकल्प',
    filterByCategory: 'श्रेणी अनुसार फिल्टर',
    openChatAssistant: 'BRIDGIT AI सहायकसँग च्याट खोल्नुहोस्',
    askBridget: 'ब्रिजिटसँग सोध्नुहोस्',
    bridgitComingSoonTitle: 'BRIDGIT: छिट्टै आउँदैछ!',
    bridgitComingSoonDescription: 'हाम्रो AI सहायक BRIDGIT हाल विकासमा छ। अपडेटहरूको लागि पर्खनुहोस्!',

    // Content section headers
    description: 'विवरण',
    services: 'सेवाहरू',
    languages: 'भाषाहरू',
    languagesSupported: 'समर्थित भाषाहरू',
    available: 'उपलब्ध',
    resources: 'स्रोतहरू',
    exploreResources: 'स्रोतहरू अन्वेषण गर्नुहोस्',

    // Admin interface
    authenticationRequired: 'प्रमाणीकरण आवश्यक छ',
    organizationName: 'संस्थाको नाम',
    website: 'वेबसाइट',
    shortDescription: 'छोटो विवरण',
    fullDescription: 'सेवा र कार्यक्रमहरूको विस्तृत विवरण',
    affiliation: 'सम्बद्धता',
    financialData: 'आर्थिक तथ्याङ्क',
    serviceDetails: 'सेवा विवरण',
    categories: 'श्रेणीहरू',
    servicesProvided: 'प्रदान गरिएका सेवाहरू',
    totalResources: 'कुल स्रोत',
    publishingStatus: 'प्रकाशन स्थिति',
    totalUsers: 'कुल प्रयोगकर्ता',
    adminUsers: 'प्रशासन प्रयोगकर्ता',
    demoUsers: 'डेमो प्रयोगकर्ता',
    noResourcesFound: 'कुनै स्रोत फेला परेन',

    // Form placeholders
    placeholders: {
      organizationName: 'संस्थाको नाम',
      briefDescription: 'छोटो विवरण',
      detailedDescription: 'सेवा र कार्यक्रमहरूको विस्तृत विवरण',
      organizationAffiliation: 'सम्बद्ध संस्था वा सञ्जाल',
      partnersCollaborating: 'साझेदार र सहकार्य संस्था',
      availableOnline: 'अनलाइन उपलब्ध',
    },

    // Additional UI elements
    backToHome: 'गृहपृष्ठमा फर्कनुहोस्',
    goHome: 'गृहपृष्ठमा जानुहोस्',
    browseResources: 'स्रोतहरू हेर्नुहोस्',
    needPersonalizedRecommendations: 'व्यक्तिगत सिफारिस चाहनुहुन्छ?',
    personalizedRecommendationsDescription: 'छिटो स्क्रिनिङ लिएर तपाईंका आवश्यकताअनुसार चयन गरिएका स्रोतहरू सहित अनुकूलित चेकलिस्ट पाउनुहोस्।',
    getYourPersonalRoadmap: 'आफ्नो व्यक्तिगत रोडम्याप पाउनुहोस्',
    allRightsReserved: 'सबै अधिकार सुरक्षित',
    initiativeOfPittsburghTomorrow: 'Pittsburgh Tomorrow को पहल',
    viewingAsUserNotification: 'तपाईं Pittsburgh Tomorrow Pioneer लाई {{role}} प्रयोगकर्ता रूपमा हेर्दै हुनुहुन्छ। अनुभव तपाईंको भूमिकाअनुसार अनुकूलित छ।',
    priorityResourcesForYou: 'तपाईंका लागि प्राथमिकता स्रोतहरू',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'तपाईंको सर्वेक्षण प्रतिक्रियाहरूको आधारमा, तपाईंलाई अहिले विशेष सहायता आवश्यक छैन। यदि तपाईंको अवस्था परिवर्तन हुन्छ भने, तपाईं आफ्नो प्रोफाइल अपडेट गर्न सक्नुहुन्छ। अन्यथा, सबै उपलब्ध स्रोतहरू अन्वेषण गर्न स्वतन्त्र महसुस गर्नुहोस्।',
    editProfile: 'प्रोफाइल अपडेट गर्नुहोस्',
    exploreAllResources: 'सबै स्रोतहरू अन्वेषण गर्नुहोस्',
    
    // Priority Categories
    priorityCategories: {
      housing: 'आवास',
      education: 'शिक्षा',
      income: 'आय',
      first_things_first: 'पहिला महत्त्वपूर्ण काम',
      meeting_people: 'मानिससँग भेटघाट',
      kids_activities: 'बालबालिकाका गतिविधि',
      faith_communities: 'धार्मिक समुदाय',
      sports_wellness: 'खेलकुद र स्वास्थ्य',
      arts_entertainment: 'कला र मनोरञ्जन',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'किफायती आवास फेला पार्न र आर्थिक सहयोग।',
      education: 'व्यावसायिक अंग्रेजी र अन्य भाषा सहयोग।',
      income: 'रोजगारी खोज र सीप विकासको लागि सहयोग।',
      first_things_first: 'आपतकालीन सहायता, मानसिक स्वास्थ्य र दर्तामा सहयोग।',
      meeting_people: 'व्यावसायिक सञ्जाल र सामाजिक कार्यक्रमहरू मार्फत जोडिनुहोस्।',
      kids_activities: 'पारिवारिक र बालबालिकाका कार्यक्रमहरू उपलब्ध।',
      faith_communities: 'स्थानीय धार्मिक र सांस्कृतिक समूहहरू फेला पार्नुहोस्।',
      sports_wellness: 'खेलकुद र मनोरञ्जनका अवसरहरू अन्वेषण गर्नुहोस्।',
      arts_entertainment: 'स्थानीय कला र सांस्कृतिक कार्यक्रमहरू पत्ता लगाउनुहोस्।',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'आफ्ना बुकमार्क गरिएको स्रोतहरू हेर्नुहोस् र व्यवस्थापन गर्नुहोस्',
    searchYourBookmarks: 'आफ्ना बुकमार्क खोज्नुहोस्...',
    showingBookmarks: '{{total}} मध्ये {{count}} बुकमार्क देखाइँदै',
    showingBookmarksPaginated: '{{total}} मध्ये {{start}}-{{end}} बुकमार्क देखाइँदै',
    failedToLoadBookmarks: 'बुकमार्क लोड हुन सकेन। कृपया पुनः प्रयास गर्नुहोस्।',
    bookmarkedOn: 'बुकमार्क गरिएको मिति',
    noBookmarksMatchFilters: 'तपाईंको हालको फिल्टरसँग मिल्ने कुनै बुकमार्क छैन।',

    // Additional UI elements - screening form
    stepOf: 'चरण {{current}} / {{total}}',
    percentComplete: '{{percent}}% पूरा',
    previousButton: 'अघिल्लो',
    nextButton: 'अर्को',
    creatingYourPlan: 'तपाईंको योजना तयार हुँदैछ...',
    completeAssessment: 'मूल्याङ्कन पूरा गर्नुहोस्',

    // Bookmarks empty state
    noBookmarksYet: 'अहिलेसम्म कुनै बुकमार्क छैन',
    startExploringBookmark: 'स्रोतहरू अन्वेषण गर्नुहोस् र उपयोगी देखिएका बुकमार्क गर्नुहोस्!',
    pageOf: 'पृष्ठ {{current}} / {{total}}',
    yourPersonalizedRoadmap: 'तपाईंको व्यक्तिगत रोडम्याप',
    resourcesReadyForYou: '{{count}} स्रोतहरू तपाईंका लागि तयार छन्',
    seeMoreResources: 'सबै स्रोत अन्वेषण गर्नुहोस्',
    discoveringPerfectResources: 'तपाईंका लागि उपयुक्त स्रोत खोजिँदै',
    noRecommendationsYet: 'तपाईंका व्यक्तिगत सिफारिसहरू तयार हुँदैछन्। सुरु गर्न हाम्रो स्रोत निर्देशिका हेर्नुहोस्।',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'पृष्ठ फेला परेन',
    pageNotFoundDescription: 'तपाईंले खोज्दै हुनुहुने पृष्ठ अवस्थित छैन वा सारिएको छ।',
  },
}


