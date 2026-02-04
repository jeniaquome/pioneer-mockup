export interface TranslationStructure {
  // Navigation
  nav: {
    home: string
    dashboard: string
    adminDashboard: string
    welcome: string
    resources: string
    bookmarks: string
    about: string
    myChecklist: string
    signIn: string
    signUp: string
    accountSettings: string
    signOut: string
    settings: string
  }
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: string
    heroWelcomeTo: string
    heroPioneer: string
    heroDescription: string
    heroExtendedDescription: string
    howCanWeHelp: string
    howCanWeHelpSubtitle: string
    createRoadmapTitle: string
    createRoadmapDescription: string
    getStarted: string
    browseResourcesTitle: string
    browseResourcesDescription: string
    exploreDirectory: string
    askBridgetTitle: string
    askBridgetDescription: string
    startChatting: string
    saveProgressQuestion: string
    signIn: string
    createAccount: string
    servicesNote: string
    
    // Trust badges
    hundredPercentFree: string
    privateSecure: string
    multilingualSupport: string
    languagesSupported: string
  }
  
  // Auth pages
  auth: {
    demoMode: string
    demoModeDescription: string
    whatYouExperience: string
    immigrantUser: string
    immigrantFeatures: {
      emergency: string
      multilingual: string
      settlement: string
    }
    studentUser: string
    studentFeatures: {
      academic: string
      campus: string
      career: string
    }
    professionalUser: string
    professionalFeatures: {
      networking: string
      services: string
      advancement: string
    }
    localHelper: string
    localFeatures: {
      community: string
      volunteer: string
      support: string
    }
    
    signIn: string
    
    // Authentication required page
    authenticationRequired: string
    loginToAccessPage: string
    
    // Login page
    emailVerified: string
    emailVerifiedDescription: string
    alreadySignedIn: string
    redirectingToDashboard: string
    signInDescription: string
    signInWithAuth0: string
    signInHelp: string
    loginError: string
    loginErrorDescription: string
  }
  
  // Demo credentials
  demo: {
    tryDemoAccounts: string
    experienceDifferentPerspectives: string
    email: string
    password: string
    loginAs: string
    demoTip: string
  }
  
  // Onboarding loading screen
  onboarding: {
    thinking: string
    curatingRecommendations: string
    findingResources: string
    complete: string
    creatingYourPlan: string
    ready: string
    mayTakeAMoment: string
    seeMyRecommendations: string
    loadingHint: string
  }
  
  // Screening page
  screening: {
    title: string
    description: string
    saveRoadmapBanner?: string
    
    // Progress indicator
    progress: string
    completed: string
    
    // Questions
    questions: {
      audience: {
        question: string
        options: string[]
      }
      primaryLanguage: {
        question: string
        options: string[]
      }
      culturalBackground: {
        question: string
        options: string[]
      }
      housingNeed: {
        question: string
        options: string[]
      }
      professionalStatus: {
        question: string
        options: string[]
      }
      languageSupport: {
        question: string
        options: string[]
      }
      employment: {
        question: string
        options: string[]
      }
      communityPriorities: {
        question: string
        options: string[]
      }
      immediateNeeds: {
        question: string
        options: string[]
      }
      timeline: {
        question: string
        options: string[]
      }
      // techComfort removed
    }
    
    // Form messages
    pleaseAnswer: string
    pleaseAnswerAll: string
    creatingGuide: string
    seePersonalizedGuide: string
    screeningQuestionnaire: string
  }
  
  // Toolkit interface
  toolkit: {
    title: string
    description: string
    categories: {
      housingAssistance: string
      foodAssistance: string
      entrepreneurHiringHub: string
      youthAdultEducation: string
      eslImmigrantConnection: string
      socialConnectionCulture: string
    }
    chat: {
      bridgitTitle: string
      bridgitDescription: string
    }
  }

  // Resource search
  resources: {
    title: string
    searchPlaceholder: string
    allCategories: string
    housing: string
    educationESL: string
    socialNetworking: string
    noResourcesFound: string
    backToAllCategories: string
    backToCategory: string
    welcomeToCategory: string
    categoryDescription: {
      housing: string
      foodAssistance: string
      entrepreneurHiring: string
      youthEducation: string
      eslImmigrant: string
      socialConnection: string
    }
    refreshBookmarks: string
    compare: string
    filterByLanguage: string
    showingResults: string
    categoryTitles: {
      housingProcess: string
      housingProcessDescription: string
    }
    exploreResources: string
    categoryNotFound: string
    subcategoryNotFound: string
    clearFilters: string
    showingResultsFor: string
    showingResultsIn: string
    compareSelected: string
    noResourcesFoundCategory: string
    browseSubcategoryDescription: string
    
    // Global search
    globalSearch: {
      placeholder: string
      button: string
    }
    searchResults: {
      title: string
      for: string
      noResults: string
      tryDifferent: string
    }
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: string
      subcategories: {
        // Housing subcategories
        housingProcess: string
        housingProcessDesc: string
        neighborhoodResources: string
        neighborhoodResourcesDesc: string
        housingAssistanceSubcat: string
        housingAssistanceSubcatDesc: string
        
        // Food subcategories
        culturalFood: string
        culturalFoodDesc: string
        foodPantries: string
        foodPantriesDesc: string
        groceryGuide: string
        groceryGuideDesc: string
        
        // Employment subcategories
        hiringHub: string
        hiringHubDesc: string
        entrepreneurship: string
        entrepreneurshipDesc: string
        
        // Education subcategories
        schoolResources: string
        schoolResourcesDesc: string
        tutoring: string
        tutoringDesc: string
        gedResources: string
        gedResourcesDesc: string
        
        // ESL & Immigration subcategories
        eslResources: string
        eslResourcesDesc: string
        documentation: string
        documentationDesc: string
        basicNeeds: string
        basicNeedsDesc: string
        
        // Social subcategories
        fosterConnection: string
        fosterConnectionDesc: string
        culturalResourcesSocial: string
        culturalResourcesSocialDesc: string
        faithGroups: string
        faithGroupsDesc: string
      }
    }

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      // Category display labels by id (e.g., 'work-business')
      categories: { [key: string]: string }
      // Category descriptions by id
      categoryDescriptions: { [key: string]: string }
      // Subcategory display labels by id (e.g., 'career-support')
      subcategories: { [key: string]: string }
      // Group labels (e.g., 'food', 'health')
      groups: { [key: string]: string }
    }
  }
  
  // Checklist page
  checklist: {
    loadingMessage: string
  }
  
  // About page
  about: {
    title: string
    description: string
    features: string[]
    conclusion: string
    copyright: string
    
    // AboutPage specific content
    welcomeText: string
    // Optional legacy/expanded content fields used by some locales
    whyPioneerTitle?: string
    whyPioneerText1?: string
    whyPioneerText2?: string
    whyPioneerText3?: string
    whyPioneerText4?: string
    whyPioneerText5?: string
    whyPioneerText6?: string
    whyPioneerText7?: string
    youAreThePioneerTitle: string
    youAreThePioneerText1: string
    youAreThePioneerText2: string
    howPioneerHelpsTitle: string
    madeForYouTitle: string
    madeForYouDescription: string
    personalRoadmapTitle: string
    personalRoadmapDescription: string
    personalRoadmapFeatures: string[]
    personalRoadmapNote: string
    smartSupportTitle: string
    smartSupportDescription: string
    trustedPartnersTitle: string
    trustedPartnersDescription: string
    privacyTitle: string
    privacyDescription: string
    pittsburghTomorrowTitle: string
    pittsburghTomorrowText1: string
    pittsburghTomorrowText2: string
    pittsburghTomorrowText3?: string
    pittsburghTomorrowLink: string
    
    // Call to action section
    readyToStartTitle: string
    readyToStartDescription: string
    getStarted: string
    browseResources: string
  }
  
  // Privacy Policy
  privacy: {
    backToAbout: string
    title: string
    description: string
    
    whyWeAskTitle: string
    whyWeAskDescription: string
    whyWeAskBullet1: string
    whyWeAskBullet2: string
    whyWeAskBullet3: string
    whyWeAskBullet4: string
    weDoNotSell: string
    
    dataRetentionTitle: string
    dataRetentionDescription: string
    
    quomeTitle: string
    quomeDescription: string
    
    skillBuilderTitle: string
    skillBuilderDescription: string
    
    contactDescription: string
    privacyPolicyLink: string
  }
  
  // Footer
  footer: {
    aboutPioneer: string
    aboutDescription: string
    quickLinks: string
    home: string
    about: string
    resources: string
    privacyPolicy: string
    getStarted: string
    contact: string
    location: string
    email: string
  }
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: string
    welcomeStudent: string
    welcomeProfessional: string
    welcomeLocal: string
    
    subtitleImmigrant: string
    subtitleStudent: string
    subtitleProfessional: string
    subtitleLocal: string
    
    demoUserNote: string
    userBadge: string
    
    urgentResources: string
    
    // Resource categories
    emergencyServices: string
    emergencyDescription: string
    temporaryHousing: string
    temporaryHousingDescription: string
    healthcareAccess: string
    healthcareDescription: string
    languageServices: string
    languageServicesDescription: string
    
    // Additional resource categories for other roles
    academicSupport: string
    academicSupportDescription: string
    studentHousing: string
    studentHousingDescription: string
    financialAid: string
    financialAidDescription: string
    studentGroups: string
    studentGroupsDescription: string
    professionalNetworks: string
    professionalNetworksDescription: string
    careerDevelopment: string
    careerDevelopmentDescription: string
    professionalHousing: string
    professionalHousingDescription: string
    mentorship: string
    mentorshipDescription: string
    volunteerOpportunities: string
    volunteerOpportunitiesDescription: string
    communityOrganizations: string
    communityOrganizationsDescription: string
    supportNetworks: string
    supportNetworksDescription: string
    culturalExchange: string
    culturalExchangeDescription: string
    

  }
  
  // Dashboard page
  dashboard: {
    signInExplore: string
    signInToPioneer: string
    welcomeTitle: string // "Welcome to Pittsburgh Tomorrow Pioneer, {{name}}!"
    welcomeTitleWithoutName: string // "Welcome to Pittsburgh Tomorrow Pioneer!"
    journeyContinues: string
    beginJourney: string
    completedSurveyHeader: string
    completedSurveyText: string
    completedSurveyTextWithDate: string // uses {{date}}
    editResponses: string
    viewMyRoadmap: string
    noteLabel: string
    editRegenerateNote: string
    bridgitHelp: string
    personalizedRoadmap: string
    unlockExperience: string
    completeSurveyHeader: string
    completeSurveyText: string
  }
  
  // Profile page
  profile: {
    title: string
    subtitle: string
    // Account section
    accountInformation?: string
    accountInformationDescription?: string
    basicInformation: string
    basicInformationDescription: string
    // Input labels and placeholders
    firstName: string
    enterFirstName?: string
    lastName: string
    enterLastName?: string
    username: string
    enterUsername?: string
    email: string
    emailChangeNote?: string
    emailCannotBeChanged: string
    // Survey call-to-action and sections used on Profile
    surveyRequired?: string
    surveyRequiredDescription?: string
    takeSurvey?: string
    basicQuestions?: string
    basicQuestionsDescription?: string
    selectPrimary?: string
    selectOption?: string
    supportNeeds?: string
    supportNeedsDescription?: string
    selectMultiple?: string
    selectAtLeastOne?: string
    timelinePreferences?: string
    timelinePreferencesDescription?: string
    backToDashboard?: string
    accountUpdated?: string
    accountUpdatedDescription?: string
    languageAndCultural: string
    languageAndCulturalDescription: string
    primaryLanguage: string
    selectPrimaryLanguage: string
    culturalBackground: string
    selectCulturalBackground: string
    professionalAndLiving: string
    professionalAndLivingDescription: string
    professionalStatus: string
    selectProfessionalStatus: string
    housingSituation: string
    selectHousingSituation: string
    familyStatus: string
    selectFamilyStatus: string
    saveChanges: string
    saving: string
    recalculatingRecommendations: string
    profileUpdated: string
    profileUpdatedDescription: string
    updateFailed: string
    updateFailedDescription: string
    pleaseLogIn: string
    
    // Language options
    languages: {
      english: string
      spanish: string
      french: string
      arabic: string
      chinese: string
      swahili: string
      hindi: string
      portuguese: string
      russian: string
      nepali: string
      somali: string
      tagalog: string
      turkish: string
      other: string
    }
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: string
      westAfrican: string
      middleEasternNorthAfrican: string
      southAsian: string
      latinoHispanic: string
      eastAsian: string
      easternEuropean: string
      other: string
    }
    
    // Professional status options
    professionalStatuses: {
      student: string
      graduateStudent: string
      softwareEngineer: string
      healthcareProfessional: string
      researchScientist: string
      seekingEmployment: string
      employedFullTime: string
      employedPartTime: string
      selfEmployed: string
      retired: string
      other: string
    }
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: string
      campusHousing: string
      apartmentHunting: string
      rentingApartment: string
      rentingHouse: string
      homeowner: string
      livingWithFamily: string
      sharedHousing: string
      other: string
    }
    
    // Family status options
    familyStatuses: {
      single: string
      married: string
      familyWithChildren: string
      singleParent: string
      extendedFamily: string
      other: string
    }
  }

  // Name Dialog
  nameDialog: {
    title: string
    description: string
    firstName: string
    firstNamePlaceholder: string
    lastName: string
    lastNamePlaceholder: string
    skip: string
    save: string
    saving: string
    firstNameRequired: string
    firstNameRequiredDescription: string
    nameUpdated: string
    nameUpdatedDescription: string
    updateFailed: string
    updateFailedDescription: string
  }

  // Common elements
  common: {
    dashboard: string
    loading: string
    search: string
    filter: string
    next: string
    previous: string
    save: string
    cancel: string
    confirm: string
    edit: string
    delete: string
    close: string
    back: string
    backToResources: string
    viewDetails: string
    learnMore: string
    getHelp: string
    startNow: string
    tryNow: string
    downloadNow: string
    visitWebsite: string
    shareThis: string
    copied: string
    copy: string
    show: string
    hide: string
    expand: string
    collapse: string
    seeMore: string
    seeLess: string
    // Showing top X of Y (priority resources summary)
    showingTopOf?: string
    selectLanguage: string
    personalizedRecommendationsLabel?: string
    exploreResourcesNowLabel?: string
    curatedAdviceLabel?: string
    
    // Accessibility and UI labels
    toggleSidebar: string
    toggleMobileMenu: string
    feedback: string
    openInNewTab: string
    removeBookmark: string
    editResource: string
    deleteResource: string
    dragToReorder: string
    saveOrPrintOptions: string
    filterByCategory: string
    openChatAssistant: string
    askBridget: string
    bridgitComingSoonTitle: string
    bridgitComingSoonDescription: string
    
    // Content section headers
    description: string
    services: string
    languages: string
    languagesSupported: string
    available: string
    resources: string
    exploreResources: string
    
    // Admin interface
    authenticationRequired: string
    organizationName: string
    website: string
    shortDescription: string
    fullDescription: string
    affiliation: string
    financialData: string
    serviceDetails: string
    categories: string
    servicesProvided: string
    totalResources: string
    publishingStatus: string
    totalUsers: string
    adminUsers: string
    demoUsers: string
    noResourcesFound: string
    
    // Form placeholders
    placeholders: {
      organizationName: string
      briefDescription: string
      detailedDescription: string
      organizationAffiliation: string
      partnersCollaborating: string
      availableOnline: string
    }
    
    // Additional UI elements
    backToHome: string
    goHome: string
    browseResources: string
    needPersonalizedRecommendations: string
    personalizedRecommendationsDescription: string
    getYourPersonalRoadmap: string
    allRightsReserved: string
    initiativeOfPittsburghTomorrow: string
    viewingAsUserNotification: string
    priorityResourcesForYou: string
    // Optional CTAs in empty states
    editProfile?: string
    exploreAllResources?: string
    
    // Priority Categories
    priorityCategories: {
      housing: string
      education: string
      income: string
      first_things_first: string
      meeting_people: string
      kids_activities: string
      faith_communities: string
      sports_wellness: string
      arts_entertainment: string
    }
    // Optional localized descriptions for priority categories
    priorityCategoryDescriptions?: { [key: string]: string }
    
    // Bookmarks page
    viewAndManageBookmarks: string
    searchYourBookmarks: string
    showingBookmarks: string
    showingBookmarksPaginated: string
    failedToLoadBookmarks: string
    bookmarkedOn?: string
    noBookmarksMatchFilters?: string
    
    // Additional UI elements - screening form
    stepOf: string
    percentComplete: string
    previousButton: string
    nextButton: string
    creatingYourPlan: string
    completeAssessment: string
    
    // Bookmarks empty state
    noBookmarksYet: string
    startExploringBookmark: string
    pageOf: string

    // Roadmap panel
    yourPersonalizedRoadmap?: string
    resourcesReadyForYou?: string // uses {{count}}
    seeMoreResources?: string
    discoveringPerfectResources?: string
    // Optional message when there are no prioritized categories
    noPriorityCategoriesMessage?: string
    noRecommendationsYet?: string
  }
  
  // Error messages
  errors: {
    pageNotFound: string
    pageNotFoundDescription: string
  }
} 