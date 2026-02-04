import type { TranslationStructure } from '../types'

export const englishTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    adminDashboard: 'Admin Dashboard',
    welcome: 'Welcome',
    resources: 'Resources',
    bookmarks: 'Bookmarks',
    about: 'About',
    myChecklist: 'Checklist',
    signIn: 'Log In',
    signUp: 'Sign Up',
    accountSettings: 'Profile Settings',
    signOut: 'Sign Out',
    settings: 'Settings',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Welcome to Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: 'Welcome to',
    heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Your personal guide to starting a new life in Pittsburgh — Free, Private, Multilingual',
    heroExtendedDescription: 'Moving to Pittsburgh? Don\'t spend hours searching dozens of sites or asking the same questions again and again. Pittsburgh Tomorrow Pioneer is your personal, free guide to every resource that helps newcomers settle in quickly and confidently — from housing and schools to language, faith, and community life. It\'s the most complete, time-saving, and welcoming way to begin your new chapter in Pittsburgh.',
    howCanWeHelp: 'How can we help you today?',
    howCanWeHelpSubtitle: 'Choose your path to get personalized recommendations',
    createRoadmapTitle: 'Create Your Roadmap',
    createRoadmapDescription: 'Take a brief survey to receive a personalized action plan tailored to your specific needs and goals.',
    getStarted: 'Get Started',
    browseResourcesTitle: 'Browse Resources',
    browseResourcesDescription: 'Explore our comprehensive directory of services, organizations, and resources organized by category.',
    exploreDirectory: 'Explore Directory',
    askBridgetTitle: 'Ask BRIDGIT',
    askBridgetDescription: 'Get instant answers to your questions from our AI assistant. Available 24/7 in your preferred language.',
    startChatting: 'Start Chatting',
    saveProgressQuestion: 'Want to save your progress and access personalized features?',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    servicesNote: 'All services are completely free, strictly confidential, and available in 16+ languages including English, Spanish, Arabic, French, Chinese, and Swahili.',
    
    // Trust badges
    hundredPercentFree: '100% Free',
    privateSecure: 'Private & Secure',
    multilingualSupport: 'Multilingual Support',
    languagesSupported: '16+ languages supported including Spanish, Arabic, French, Mandarin, and Swahili.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'Demo Mode',
    demoModeDescription: 'Try Pittsburgh Tomorrow Pioneer with different user profiles to see how the experience adapts to your needs',
    whatYouExperience: 'What You\'ll Experience',
    immigrantUser: 'Immigrant User',
    immigrantFeatures: {
      emergency: 'Emergency resources prioritized',
      multilingual: 'Multilingual support',
      settlement: 'Settlement-focused content',
    },
    studentUser: 'Student User',
    studentFeatures: {
      academic: 'Academic resources',
      campus: 'Campus-specific info',
      career: 'Career guidance',
    },
    professionalUser: 'Professional User',
    professionalFeatures: {
      networking: 'Industry networking',
      services: 'Professional services',
      advancement: 'Career advancement',
    },
    localHelper: 'Local Helper',
    localFeatures: {
      community: 'Community resources',
      volunteer: 'Volunteer opportunities',
      support: 'Support networks',
    },
    signIn: 'Log In',
    
    // Authentication required page
    authenticationRequired: 'Authentication Required',
    loginToAccessPage: 'You need to be logged in to access this page.',
    
    // Login page
    emailVerified: 'Email Verified',
    emailVerifiedDescription: 'Your email has been successfully verified.',
    alreadySignedIn: 'Already Signed In',
    redirectingToDashboard: 'Redirecting you to your dashboard...',
    signInDescription: 'Sign in to access your personalized Pittsburgh resources and recommendations.',
    signInWithAuth0: 'Sign In',
    signInHelp: 'Having trouble signing in? Contact support for assistance.',
    loginError: 'Login Error',
    loginErrorDescription: 'There was a problem signing you in. Please try again.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'Try Demo Accounts',
    experienceDifferentPerspectives: 'Experience Pittsburgh Tomorrow Pioneer from different user perspectives',
    email: 'Email:',
    password: 'Password:',
    loginAs: 'Login as {{role}} user',
    demoTip: 'These demo accounts showcase different user experiences and personalized content',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'Thinking...',
    curatingRecommendations: 'Curating personalized recommendations...',
    findingResources: 'Finding the best resources...',
    complete: 'Complete!',
    creatingYourPlan: 'Creating Your Personalized Plan',
    ready: 'Ready!',
    mayTakeAMoment: 'This may take a moment as we personalize your experience...',
    seeMyRecommendations: 'See my recommendations',
    loadingHint: 'This may take a moment as we personalize your experience...',
  },
  
  // Screening page
  screening: {
    title: 'Tell us about you',
    description: 'Answer a few quick questions so we can create your personalized guide for living and thriving in Pittsburgh.',
    saveRoadmapBanner: 'Save your personalized roadmap by creating an account. You can take the survey anonymously now and sign in later to save it.',
    
    // Progress indicator
    progress: 'Progress',
    completed: '{{count}} of {{total}} completed',
    
    // Questions
    questions: {
      audience: {
        question: 'Which best describes your situation?',
        options: [
          'Student/Professional (attending a Pittsburgh-region university or working for an organization)',
          'Boomerang (lived here before, moved away and now I am back in the Pittsburgh region)',
          'Refugee or Temporary Protected Status (just got resettled here or moved here from another city)',
          'Transplant (moving to Pittsburgh from another city in the U.S.)',
          'Entrepreneur (building my own business)',
          'Remote employee',
          'Other',
        ],
      },
      primaryLanguage: {
        question: 'What is your primary language?',
        options: [
          'English (native/fluent)',
          'Spanish (Español)',
          'Arabic (العربية)',
          'Swahili (Kiswahili)',
          'Uzbek (Oʻzbekcha)',
          'Nepali/Bhutanese (नेपाली / རྫོང་ཁ)',
          'Dari/Pashto (دری / پښتو)',
          'Mandarin Chinese (中文)',
          'Other',
        ],
      },
      culturalBackground: {
        question: 'What cultural or regional background best describes you?',
        options: [
          'White',
          'Black or African American (including African and Caribbean descent)',
          'Hispanic or Latino/a/x',
          'Asian (e.g., Chinese, Indian, Vietnamese)',
          'Middle Eastern or North African',
          'Native Hawaiian or Other Pacific Islander',
          'American Indian or Alaska Native',
          'African (e.g., Nigerian, Ethiopian, Ghanaian, etc.)',
          'Caribbean (e.g., Jamaican, Haitian, Trinidadian, etc.)',
          'Other',
          'Prefer not to answer',
        ],
      },
      housingNeed: {
        question: 'What type of housing support do you need?',
        options: [
          'Help finding neighborhoods and market-rate apartments',
          'Affordable housing assistance and programs',
          'Temporary/emergency housing',
          'Shared housing/roommate matching',
          'Help trying to buy a house',
          'I have housing secured',
        ],
      },
      professionalStatus: {
        question: 'What is your current professional status?',
        options: [
          'Student (undergraduate/graduate/trade school)',
          'Tech professional/engineer',
          'Healthcare/life sciences professional',
          'Academic/researcher',
          'Seeking employment',
          'Recent graduate looking for work',
          'Other professional',
        ],
      },
      languageSupport: {
        question: 'What language support would be helpful?',
        options: [
          'English classes (ESL) - beginner to intermediate',
          'Professional English communication skills',
          'Document translation services',
          'Conversational English practice',
          'No language support needed',
        ],
      },
      employment: {
        question: 'What employment support interests you?',
        options: [
          'Professional networking and career advancement',
          'Job search assistance and resume help',
          'Skills training and certification programs',
          'Industry-specific networking (tech, healthcare, etc.)',
          'No employment support needed, Thanks',
        ],
      },
      communityPriorities: {
        question: 'What community connections are most important to you? (Select all that apply)',
        options: [
          'Professional networks and industry meetups',
          'Cultural and faith-based communities',
          'Social activities and entertainment',
          'Family and children services',
          'Sports and recreational activities',
          'Arts and cultural events',
          'None of these',
        ],
      },
      immediateNeeds: {
        question: 'What are your most immediate needs? (Select all that apply)',
        options: [
          'Meet people and make new friends',
          'Basic services (healthcare, banking, transportation)',
          'School enrollment for children',
          'Legal/immigration assistance',
          'Mental health and wellness support',
          'Emergency assistance (food, shelter)',
          'None of these',
        ],
      },
      timeline: {
        question: 'What is your timeline for settling in the Pittsburgh area?',
        options: [
          'Just arrived (within last month)',
          'Recently arrived (1-6 months)',
          'Planning to arrive soon (next 3 months)',
          'Long-term planning (6+ months)',
          'Already settled in Pittsburgh area',
        ],
      },
      // techComfort removed
    },
    
    // Form messages
    pleaseAnswer: 'Please answer this question.',
    pleaseAnswerAll: 'Please answer all questions to continue',
    creatingGuide: 'Creating Your Guide...',
    seePersonalizedGuide: 'See My Personalized Guide',
    screeningQuestionnaire: 'Screening Questionnaire',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'NEWCOMER TOOLKIT',
    description: 'Find the resources and support you need to settle and thrive in Pittsburgh',
    categories: {
      housingAssistance: 'Housing Assistance',
      foodAssistance: 'Food Assistance',
      entrepreneurHiringHub: 'Entrepreneur & Hiring Hub',
      youthAdultEducation: 'Youth & Adult Education Resources',
      eslImmigrantConnection: 'ESL & Immigrant Connection Services',
      socialConnectionCulture: 'Social Connection and Culture',
    },
    chat: {
      bridgitTitle: 'Chat with BRIDGIT',
      bridgitDescription: 'Get personalized assistance and guidance for your journey',
    },
  },

  // Resource search
  resources: {
    title: 'Find Resources',
    searchPlaceholder: 'Search resources...',
    allCategories: 'All Categories',
    housing: 'Housing',
    educationESL: 'Education / ESL',
    socialNetworking: 'Social / Networking',
    noResourcesFound: 'No resources found matching your search or filters.',
    backToAllCategories: 'Back to All Categories',
    backToCategory: 'Back to {{category}}',
    welcomeToCategory: 'Welcome to {{category}}',
    categoryDescription: {
      housing: 'Find housing support, rental assistance, and neighborhood resources',
      foodAssistance: 'Locate food banks, meal programs, and nutrition assistance',
      entrepreneurHiring: 'Discover business resources, job opportunities, and hiring support',
      youthEducation: 'Access educational programs, tutoring, and learning resources',
      eslImmigrant: 'Connect with English classes, immigration services, and cultural support',
      socialConnection: 'Join community groups, cultural events, and social activities',
    },
    refreshBookmarks: 'Refresh Bookmarks (Debug)',
    compare: 'Compare ({{count}}/3)',
    filterByLanguage: 'Filter by Language:',
    showingResults: 'Showing {{current}} of {{total}} resources',
    categoryTitles: {
      housingProcess: 'Housing Process in Pittsburgh',
      housingProcessDescription: 'Learn about the housing search process and requirements',
    },
    exploreResources: 'Explore resources',
    categoryNotFound: 'Category not found',
    subcategoryNotFound: 'Subcategory not found',
    clearFilters: 'Clear Filters',
    showingResultsFor: 'for',
    showingResultsIn: 'in',
    compareSelected: 'Compare Selected',
    noResourcesFoundCategory: 'No resources found for this category.',
    browseSubcategoryDescription: 'Browse resources within this subcategory.',
    
    // Global search
    globalSearch: {
      placeholder: 'Search all resources...',
      button: 'Search',
    },
    searchResults: {
      title: 'Search Results',
      for: 'for',
      noResults: 'No resources found matching your search.',
      tryDifferent: 'Try a different search term.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'Welcome to',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Housing Process in Pittsburgh',
        housingProcessDesc: 'Learn about the housing search process and requirements',
        neighborhoodResources: 'Neighborhood and Real Estate Resources',
        neighborhoodResourcesDesc: 'Discover neighborhoods and real estate information',
        housingAssistanceSubcat: 'Housing Assistance',
        housingAssistanceSubcatDesc: 'Direct rental assistance and housing support services',
        
        // Food subcategories
        culturalFood: 'Cultural Food Hub',
        culturalFoodDesc: 'International markets and cultural food resources',
        foodPantries: 'Food Pantries',
        foodPantriesDesc: 'Emergency food assistance and pantries',
        groceryGuide: 'Grocery Store Guide',
        groceryGuideDesc: 'Local grocery stores and shopping assistance',
        
        // Employment subcategories
        hiringHub: 'Are you an Immigrant or newcomer looking for work?',
        hiringHubDesc: 'Check out our Hiring Hub!',
        entrepreneurship: 'Entrepreneurial Resources within Pittsburgh',
        entrepreneurshipDesc: 'Business development and startup resources',
        
        // Education subcategories
        schoolResources: 'Looking for resources to find a new school?',
        schoolResourcesDesc: 'School enrollment and educational resources',
        tutoring: 'Looking for College Prep or a Tutor?',
        tutoringDesc: 'Tutoring services and college preparation',
        gedResources: 'Looking to get your GED?',
        gedResourcesDesc: 'GED preparation and adult education',
        
        // ESL & Immigration subcategories
        eslResources: 'Looking for ESL Resources?',
        eslResourcesDesc: 'English language learning and classes',
        documentation: 'Documentation Assistance',
        documentationDesc: 'Immigration paperwork and legal support',
        basicNeeds: 'Basic Needs Assistance',
        basicNeedsDesc: 'Essential services and emergency support',
        
        // Social subcategories
        fosterConnection: 'Resources to Foster Connection',
        fosterConnectionDesc: 'Social groups and community building',
        culturalResourcesSocial: 'Food and Cultural Resources',
        culturalResourcesSocialDesc: 'Cultural events and food traditions',
        faithGroups: 'Faith Based Groups',
        faithGroupsDesc: 'Religious communities and spiritual support',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'Community and Belonging',
          'culture-leisure': 'Culture, Arts and Fun',
        'esl-immigrant': 'ESL and Immigrant Support',
          'education-youth': 'Education: Adult and Youth',
        'living-essentials': 'Living Essentials',
          'work-business': 'Jobs and Business Resources',
      },
      categoryDescriptions: {
        'community-belonging': 'Connect, participate, and build community in Pittsburgh',
          'culture-leisure': 'Explore arts, family activities, hobbies, and nightlife',
        'esl-immigrant': 'Language learning, immigration help, and newcomer services',
          'education-youth': 'Adult learning, tutoring, and youth opportunities',
          'living-essentials': 'Housing, health, transit and food',
          'work-business': 'Jobs, career support, and business resources',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'Government',
        'civic-advocacy': 'Local advocacy',
        'civic-volunteer': 'Volunteer',
        'civic-youth': 'Youth engagement',
        religion: 'Religion',
        'social-connection': 'Social connection',

        // Culture & Leisure
        art: 'Arts',
        family: 'Family Recreation',
        'beauty-hair': 'Hair care / Beauty',
        'hobby-spaces': 'Hobby spaces',
        'night-life': 'Night life',

        // ESL & Immigrant Support
        'esl-support': 'English Second Language (ESL) Support',
        'general-law': 'General law',
        'immigration-asylum': 'Immigration / Asylum',
        'refugee-immigrant-support': 'Refugee / Immigrant support',

        // Education & Youth
        'adult-education': 'Adult education',
        'college-prep-tutoring': 'College prep / Tutoring',
        'youth-education': 'Youth education',
        'youth-programming': 'Youth programming',

        // Living Essentials
        'food-pantries': 'Food pantries',
        'grocery-guide': 'Grocery guide',
        'specialty-stores': 'Specialty stores',
        'guide-discover-pittsburgh': 'Discover Pittsburgh',
        'guide-diverse-businesses': 'Diverse businesses',
        'guide-immigrant-services': 'Immigrant services',
        'health-additional-support': 'Additional support',
        'health-body-mind': 'Body and mind care',
        'health-hospitals': 'Hospitals',
        'health-nutrition': 'Nutrition',
        'health-senior-care': 'Senior care',
        'housing-buying-home': 'Buying a home',
        'housing-assistance': 'Housing assistance',
        'housing-relocating': 'Relocating to Pittsburgh',
        'housing-rent': 'Renting',
        transportation: 'Transit',

        // Work & Business
        'business-development': 'Business Development',
        'business-support': 'Business Support',
        'career-support': 'Career Support',
        'internship-opportunities': 'Internship Opportunities',
      },
      groups: {
        'civic-engagement': 'Civic Engagement',
        legal: 'Legal',
        food: 'Food',
        'pittsburgh-guides': 'Pittsburgh Guides',
        health: 'Health',
        housing: 'Housing',
        transit: 'Transit',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'Loading your personalized checklist...',
  },
  
  // About page
  about: {
    title: 'About Pittsburgh Tomorrow Pioneer',
    description: 'Pittsburgh Tomorrow Pioneer is your friendly guide to settling in Pittsburgh and Allegheny County. Whether you\'re a tech professional or a newcomer seeking a fresh start, Pittsburgh Tomorrow Pioneer connects you to local resources for housing, education, employment, and community.',
    features: [
      '161+ not-for-profit organizations',
      'Personalized checklists and roadmaps',
      'Support for both independent and traditional immigrant newcomers',
      'Easy screening to match your needs',
    ],
    conclusion: 'This project is a collaboration of local partners and volunteers, dedicated to making Pittsburgh welcoming, supportive, and full of opportunity for all.',
    copyright: 'Pittsburgh Tomorrow Pioneer. All rights reserved.',
    
    // AboutPage specific content
    welcomeText: 'Welcome to Pittsburgh Tomorrow Pioneer, your personal guide to starting a new life in Pittsburgh and Allegheny County. Whether you\'ve just arrived in the U.S. or you\'ve taken a new job with one of Pittsburgh\'s growing companies in energy, robotics, AI, life sciences, or steel — Pittsburgh Tomorrow Pioneer is here to help. From finding housing to enrolling your children in school, from locating English classes to connecting with faith communities or local food support, Pittsburgh Tomorrow Pioneer brings together the resources you need in one place.',
    
    whyPioneerTitle: 'Why Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'Because starting fresh in a new city shouldn\'t mean starting from scratch.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer brings together everything you need to start a new life in Pittsburgh and Allegheny County — all in one trusted, easy-to-use place.',
    whyPioneerText3: 'It\'s free, comprehensive, and designed to save you hours of searching, comparing, and second-guessing. Whether you\'re finding housing, enrolling your children in school, learning English, or looking to meet people who share your faith, language, or interests — Pittsburgh Tomorrow Pioneer ensures you don\'t overlook a single opportunity to make your move smoother and your new life richer.',
    whyPioneerText4: 'Where a Google search shows you everything, Pittsburgh Tomorrow Pioneer shows you exactly what matters.',
    whyPioneerText5: 'Where an AI chatbot offers answers, Pioneer gives you a roadmap.',
    whyPioneerText6: 'Where most relocation tools stop at logistics, Pioneer starts with community.',
    whyPioneerText7: 'It\'s Pittsburgh, made personal.',
    
    youAreThePioneerTitle: 'You Are the Pioneer',
    youAreThePioneerText1: 'You\'re not just moving — you\'re starting something new. A new job. A new school. A new home. And maybe even a new language or culture. That takes courage.',
    youAreThePioneerText2: 'We built Pittsburgh Tomorrow Pioneer to support you — because you are the Pioneer. This site is here to walk alongside you as you build a future in Pittsburgh.',
    
    howPioneerHelpsTitle: 'How Pittsburgh Tomorrow Pioneer Helps',
    
    madeForYouTitle: 'Made for You — Wherever You\'re From',
    madeForYouDescription: 'We know that not everyone speaks English as their first language. That\'s why Pittsburgh Tomorrow Pioneer supports dozens of global languages, including Spanish, Arabic, French, Chinese, Dari, and more. If you type in your native language, Pittsburgh Tomorrow Pioneer will respond in kind.',
    
    personalRoadmapTitle: 'Create Your Personal Roadmap',
    personalRoadmapDescription: 'Our most powerful tool is your personalized roadmap — a checklist made just for you. By answering a few simple questions about your needs (housing, food, jobs, education, etc.), Pittsburgh Tomorrow Pioneer creates a tailored action plan to support your next steps. You can:',
    personalRoadmapFeatures: [
      'View and update your roadmap anytime',
      'Save your progress by signing in (optional)',
      'Download or print your checklist to keep it with you',
      'Revisit and refine your roadmap as your life in Pittsburgh grows'
    ],
    personalRoadmapNote: 'If you prefer to explore at your own pace, you can browse our complete resource library without logging in.',
    
    smartSupportTitle: 'Smart, Self-Guided Support',
    smartSupportDescription: 'Pittsburgh Tomorrow Pioneer features a friendly AI chatbot trained to answer hundreds of common questions. It can guide you to resources, explain how local systems work, and help you take the next step. There is also a full directory of contact information for our trusted partners — public agencies, nonprofits, service providers, and more.',
    
    trustedPartnersTitle: 'Trusted Partners',
    trustedPartnersDescription: 'Access our complete directory of trusted partners — public agencies, nonprofits, and service providers throughout Pittsburgh and Allegheny County. Our network includes 380+ not-for-profit organizations ready to help with your specific needs.',
    
    privacyTitle: 'Your Privacy, Protected',
    privacyDescription: 'Your privacy and security matter to us. If you choose to create an account, your personal data is protected by SOC II-compliant security protocols. We will never sell or share your data. You remain in full control of your information at all times.',
    
    pittsburghTomorrowTitle: 'About Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'Pittsburgh Tomorrow Pioneer is an initiative of Pittsburgh Tomorrow, a nonprofit organization on a mission to grow Pittsburgh. We\'re catalyzing the new spirit that\'s redefining what historian David McCullough called "America\'s Indispensable City."',
    pittsburghTomorrowText2: 'The region that built America from the ground up is surging with a new vitality and civic spirit: welcoming newcomers, launching entrepreneurs, and blazing new trails. Our movement is powered by a new wave of pioneers, first-movers, and risk-takers who are seizing opportunity and building the future — in Pittsburgh.',
    pittsburghTomorrowText3: 'At Pittsburgh Tomorrow, we\'re on a mission to grow Pittsburgh. And that doesn\'t just mean population or economic growth; it means revitalizing our city\'s spirit. Supporting small businesses and entrepreneurs. Beautifying and preserving our environment. Promoting arts and culture. Welcoming newcomers and creating community. Being proud of our city, and putting it back on the map.',
    pittsburghTomorrowLink: 'Learn More',
    
    // Call to action section
    readyToStartTitle: 'Start Your Journey in Pittsburgh',
    readyToStartDescription: 'Build your personalized roadmap to help you settle and thrive in your new home.',
    getStarted: 'Get Started',
    browseResources: 'Browse Resources',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'Back to About',
    title: 'Data Transparency & Privacy Statement',
    description: 'At Pittsburgh Tomorrow, we value transparency and your trust. We believe that you have the right to understand exactly why we ask for certain information, how we use it, and how it benefits you.',
    
    whyWeAskTitle: 'Why We Ask These Questions and How We Use Your Information:',
    whyWeAskDescription: 'The questions we ask are designed to help us create a customized roadmap for you. Your responses allow us to:',
    whyWeAskBullet1: 'Pull relevant resources and information from our database tailored to your needs.',
    whyWeAskBullet2: 'Ensure that we are reaching people equitably across communities and backgrounds.',
    whyWeAskBullet3: 'Identify gaps in who we are serving so we can better reach those who might be missing.',
    whyWeAskBullet4: 'Improve our AI tools so they are better equipped to serve all users effectively.',
    weDoNotSell: 'We do not sell your data. We use it solely for the purposes listed above.',
    
    dataRetentionTitle: 'Data Retention:',
    dataRetentionDescription: 'We keep your information in our database until you inform us that you no longer wish to access your customized dashboard. After that, your data will be anonymized and only used to improve our AI services to help other newcomers to Pittsburgh.',
    
    quomeTitle: 'How Quome Uses Your Data:',
    quomeDescription: 'Our site is hosted by Quome, which may collect certain data to operate and improve the platform. You can learn more about how Quome uses and protects your data by reviewing their',
    
    skillBuilderTitle: 'How Skill Builder Uses Your Data:',
    skillBuilderDescription: 'Our site chatbot is hosted by SkillBuilder.io, which may collect certain data to operate and improve the platform. You can learn more about how SkillBuilder.io uses and protects your data by reviewing their',
    
    contactDescription: 'If you have questions about our data use or privacy practices, please use our Feedback button on the right side of each page to contact us.',
    privacyPolicyLink: 'Privacy Policy'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'About Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'Pittsburgh Tomorrow Pioneer helps newcomers to Pittsburgh & Allegheny County find their path. We connect you to the right resources and opportunities, no matter your journey.',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About',
    resources: 'Resources',
    privacyPolicy: 'Privacy Policy',
    getStarted: 'Get Started',
    contact: 'Contact',
    location: 'Hello from Pittsburgh, PA',
    email: 'Email: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'Welcome, {{name}}!',
    welcomeStudent: 'Welcome back, {{name}}!',
    welcomeProfessional: 'Welcome, {{name}}!',
    welcomeLocal: 'Hello {{name}}!',
    
    subtitleImmigrant: 'Your settlement journey starts here',
    subtitleStudent: 'Your academic success is our priority',
    subtitleProfessional: 'Your career growth is our focus',
    subtitleLocal: 'Help make Pittsburgh welcoming for everyone',
    
    demoUserNote: 'You\'re viewing Pittsburgh Tomorrow Pioneer as a **{{role}}** user. Experience is personalized for your role.',
    userBadge: '{{role}} user',
    
    urgentResources: 'Urgent Resources',
    
    // Resource categories
    emergencyServices: 'Emergency Services',
    emergencyDescription: '24/7 crisis support and immediate assistance',
    temporaryHousing: 'Temporary Housing',
    temporaryHousingDescription: 'Shelter and housing assistance programs',
    healthcareAccess: 'Healthcare Access',
    healthcareDescription: 'Medical services and health insurance help',
    languageServices: 'Language Services',
    languageServicesDescription: 'Translation and interpretation support',
    
    // Additional resource categories for other roles
    academicSupport: 'Academic Support',
    academicSupportDescription: 'Tutoring, study groups, and academic resources',
    studentHousing: 'Student Housing',
    studentHousingDescription: 'On-campus and off-campus housing options',
    financialAid: 'Financial Aid',
    financialAidDescription: 'Scholarships, grants, and financial assistance',
    studentGroups: 'Student Groups',
    studentGroupsDescription: 'International student organizations and clubs',
    professionalNetworks: 'Professional Networks',
    professionalNetworksDescription: 'Industry meetups and networking events',
    careerDevelopment: 'Career Development',
    careerDevelopmentDescription: 'Skills training and certification programs',
    professionalHousing: 'Professional Housing',
    professionalHousingDescription: 'Executive housing and relocation services',
    mentorship: 'Mentorship',
    mentorshipDescription: 'Professional mentorship and guidance programs',
    volunteerOpportunities: 'Volunteer Opportunities',
    volunteerOpportunitiesDescription: 'Ways to help newcomers in your community',
    communityOrganizations: 'Community Organizations',
    communityOrganizationsDescription: 'Local nonprofits and service providers',
    supportNetworks: 'Support Networks',
    supportNetworksDescription: 'Mentorship and friendship programs',
    culturalExchange: 'Cultural Exchange',
    culturalExchangeDescription: 'Cross-cultural events and programs',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'Sign in to explore your personalized Pittsburgh journey',
    signInToPioneer: 'Sign in to Pittsburgh Tomorrow Pioneer',
    welcomeTitle: 'Welcome to Pittsburgh Tomorrow Pioneer, {{name}}!',
    welcomeTitleWithoutName: 'Welcome to Pittsburgh Tomorrow Pioneer!',
    journeyContinues: 'Your personalized journey continues...',
    beginJourney: 'Begin your personalized Pittsburgh journey',
    completedSurveyHeader: "You've Already Completed the Survey",
    completedSurveyText: 'You completed your onboarding survey. View your personalized roadmap below or edit your responses to update your recommendations.',
    completedSurveyTextWithDate: 'You completed your onboarding survey on {{date}}. View your personalized roadmap below or edit your responses to update your recommendations.',
    editResponses: 'Edit Responses',
    viewMyRoadmap: 'View My Roadmap',
    noteLabel: 'Note:',
    editRegenerateNote: 'If you edit your survey responses, your personalized recommendations and roadmap will be automatically regenerated to better match your updated preferences.',
    bridgitHelp: 'Have questions not covered by the survey? Click the BRIDGIT chatbot on the bottom right for personalized assistance!',
    personalizedRoadmap: 'Your Personalized Roadmap',
    unlockExperience: 'Unlock your customized experience',
    completeSurveyHeader: 'Complete Your Survey to Get Started',
    completeSurveyText: 'Take our quick 5-minute survey to receive personalized resource recommendations tailored specifically to your needs and goals in Pittsburgh.',
  },
  
  // Profile page
  profile: {
    title: 'Profile Settings',
    subtitle: 'Manage your personal information and preferences',
    accountInformation: 'Account Information',
    accountInformationDescription: 'Update your basic account details',
    basicInformation: 'Basic Information',
    basicInformationDescription: 'Update your basic personal details',
    firstName: 'First Name',
    enterFirstName: 'Enter your first name',
    lastName: 'Last Name',
    enterLastName: 'Enter your last name',
    username: 'Username',
    enterUsername: 'Enter your username',
    email: 'Email',
    emailChangeNote: 'Email cannot be changed. Contact support if you need to update your email.',
    emailCannotBeChanged: 'Email cannot be changed. Contact support if you need to update your email.',
    surveyRequired: 'Complete Your Survey First',
    surveyRequiredDescription: 'To get personalized recommendations and edit your survey responses, you need to complete the initial assessment survey first.',
    takeSurvey: 'Take the Survey',
    basicQuestions: 'Basic Information',
    basicQuestionsDescription: 'Tell us about yourself and your situation to get personalized recommendations',
    selectPrimary: 'Select your primary preference:',
    selectOption: 'Select an option...',
    supportNeeds: 'Support & Needs',
    supportNeedsDescription: 'What kind of support and services do you need?',
    selectMultiple: 'Select all that apply:',
    selectAtLeastOne: 'Please select at least one option.',
    timelinePreferences: 'Timeline & Preferences',
    timelinePreferencesDescription: 'Your timeline and technology preferences',
    backToDashboard: 'Back to Dashboard',
    languageAndCultural: 'Language & Cultural Background',
    languageAndCulturalDescription: 'Help us provide better personalized recommendations',
    primaryLanguage: 'Primary Language',
    selectPrimaryLanguage: 'Select your primary language',
    culturalBackground: 'Cultural Background',
    selectCulturalBackground: 'Select your cultural background',
    professionalAndLiving: 'Professional & Living Situation',
    professionalAndLivingDescription: 'This helps us recommend relevant resources and services',
    professionalStatus: 'Professional Status',
    selectProfessionalStatus: 'Select your professional status',
    housingSituation: 'Housing Situation',
    selectHousingSituation: 'Select your housing situation',
    familyStatus: 'Family Status',
    selectFamilyStatus: 'Select your family status',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    recalculatingRecommendations: 'Recalculating recommendations...',
    profileUpdated: 'Profile Updated',
    profileUpdatedDescription: 'Your profile has been successfully updated.',
    accountUpdated: 'Account Updated',
    accountUpdatedDescription: 'Your account information has been updated successfully. Complete the survey to save your preferences.',
    updateFailed: 'Update Failed',
    updateFailedDescription: 'Failed to update profile. Please try again.',
    pleaseLogIn: 'Please log in to view your profile.',
    
    // Language options
    languages: {
      english: 'English',
      spanish: 'Spanish',
      french: 'French',
      arabic: 'Arabic',
      chinese: 'Chinese',
      swahili: 'Swahili',
      hindi: 'Hindi',
      portuguese: 'Portuguese',
      russian: 'Russian',
      nepali: 'Nepali',
      somali: 'Somali',
      tagalog: 'Tagalog',
      turkish: 'Turkish',
      other: 'Other',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'American/Western',
      westAfrican: 'West African',
      middleEasternNorthAfrican: 'Middle Eastern/North African',
      southAsian: 'South Asian (including Bhutanese)',
      latinoHispanic: 'Latino/Hispanic',
      eastAsian: 'East Asian',
      easternEuropean: 'Eastern European',
      other: 'Other/Prefer not to say',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'Student',
      graduateStudent: 'Graduate student',
      softwareEngineer: 'Software engineer',
      healthcareProfessional: 'Healthcare professional',
      researchScientist: 'Research scientist',
      seekingEmployment: 'Seeking employment',
      employedFullTime: 'Employed full-time',
      employedPartTime: 'Employed part-time',
      selfEmployed: 'Self-employed',
      retired: 'Retired',
      other: 'Other',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Temporary housing',
      campusHousing: 'Campus housing',
      apartmentHunting: 'Apartment hunting',
      rentingApartment: 'Renting apartment',
      rentingHouse: 'Renting house',
      homeowner: 'Homeowner',
      livingWithFamily: 'Living with family',
      sharedHousing: 'Shared housing',
      other: 'Other',
    },
    
    // Family status options
    familyStatuses: {
      single: 'Single',
      married: 'Married',
      familyWithChildren: 'Family with children',
      singleParent: 'Single parent',
      extendedFamily: 'Extended family',
      other: 'Other',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'What should we call you?',
    description: 'Help us personalize your experience by telling us your name.',
    firstName: 'First Name',
    firstNamePlaceholder: 'Enter your first name',
    lastName: 'Last Name',
    lastNamePlaceholder: 'Enter your last name (optional)',
    skip: 'Skip for now',
    save: 'Save Name',
    saving: 'Saving...',
    firstNameRequired: 'First name required',
    firstNameRequiredDescription: 'Please enter your first name to continue.',
    nameUpdated: 'Name updated',
    nameUpdatedDescription: 'Your name has been saved successfully.',
    updateFailed: 'Update failed',
    updateFailedDescription: 'Failed to update your name. Please try again.',
  },
  
  // Common elements
  common: {
    dashboard: 'Dashboard',
    loading: 'Loading...',
    search: 'Search',
    filter: 'Filter',
    next: 'Next',
    previous: 'Previous',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    back: 'Back',
    backToResources: 'Back to Resources',
    viewDetails: 'View Details',
    learnMore: 'Learn More',
    getHelp: 'Get Help',
    startNow: 'Start Now',
    tryNow: 'Try Now',
    downloadNow: 'Download Now',
    visitWebsite: 'Visit',
    shareThis: 'Share This',
    copied: 'Copied!',
    copy: 'Copy',
    show: 'Show',
    hide: 'Hide',
    expand: 'Expand',
    collapse: 'Collapse',
    seeMore: 'See more',
    seeLess: 'See less',
    showingTopOf: 'Showing top {{current}} of {{total}} resources',
    selectLanguage: 'Select Language',
    personalizedRecommendationsLabel: 'Personalized Recommendations',
    exploreResourcesNowLabel: 'Explore resources now',
    curatedAdviceLabel: 'Curated advice for success',
    
    // Accessibility and UI labels
    toggleSidebar: 'Toggle Sidebar',
    toggleMobileMenu: 'Toggle mobile menu',
    feedback: 'Feedback',
    openInNewTab: 'Open in new tab',
    removeBookmark: 'Remove bookmark',
    editResource: 'Edit resource',
    deleteResource: 'Delete resource',
    dragToReorder: 'Drag to reorder',
    saveOrPrintOptions: 'Save or Print Options',
    filterByCategory: 'Filter by category',
    openChatAssistant: 'Open chat with BRIDGIT AI assistant',
    askBridget: 'Ask BRIDGIT',
    bridgitComingSoonTitle: 'BRIDGIT: Coming Soon!',
    bridgitComingSoonDescription: 'Our AI assistant BRIDGIT is currently under development. Stay tuned for updates!',
    
    // Content section headers
    description: 'Description',
    services: 'Services',
    languages: 'Languages',
    languagesSupported: 'Languages Supported',
    available: 'Available',
    resources: 'Resources',
    exploreResources: 'Explore resources',
    
    // Admin interface
    authenticationRequired: 'Authentication Required',
    organizationName: 'Organization Name',
    website: 'Website',
    shortDescription: 'Short Description',
    fullDescription: 'Full Description',
    affiliation: 'Affiliation',
    financialData: 'Financial Data',
    serviceDetails: 'Service Details',
    categories: 'Categories',
    servicesProvided: 'Services Provided',
    totalResources: 'Total Resources',
    publishingStatus: 'Publishing Status',
    totalUsers: 'Total Users',
    adminUsers: 'Admin Users',
    demoUsers: 'Demo Users',
    noResourcesFound: 'No resources found',
    
    // Form placeholders
    placeholders: {
      organizationName: 'Organization name',
      briefDescription: 'Brief description',
      detailedDescription: 'Detailed description of services and programs',
      organizationAffiliation: 'Organization affiliation or network',
      partnersCollaborating: 'List of partners and collaborating organizations',
      availableOnline: 'Available online',
    },
    
    // Additional UI elements
    backToHome: 'Back to Home',
    goHome: 'Go Home',
    browseResources: 'Browse Resources',
    needPersonalizedRecommendations: 'Need Personalized Recommendations?',
    personalizedRecommendationsDescription: 'Take our quick screening to get a customized checklist with resources specifically chosen for your needs.',
    getYourPersonalRoadmap: 'Get Your Personal Roadmap',
    allRightsReserved: 'All rights reserved',
    initiativeOfPittsburghTomorrow: 'An initiative of Pittsburgh Tomorrow',
    viewingAsUserNotification: "You're viewing Pittsburgh Tomorrow Pioneer as a {{role}} user. Experience is personalized for your role.",
    priorityResourcesForYou: 'Priority Resources for You',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: "Based on your survey responses, you don't need specific assistance right now. If your situation changes, you can update your profile. Otherwise, feel free to explore all available resources.",
    editProfile: 'Update Profile',
    exploreAllResources: 'Explore All Resources',
    
    // Priority Categories
    priorityCategories: {
      housing: 'Housing',
      education: 'Education', 
      income: 'Income',
      first_things_first: 'First Things First',
      meeting_people: 'Meeting People',
      kids_activities: 'Kids Activities',
      faith_communities: 'Faith Communities',
      sports_wellness: 'Sports and Wellness',
      arts_entertainment: 'Arts and Entertainment',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'Finding affordable housing and financial support.',
      education: 'Professional English and other language support.',
      income: 'Support for job searching and skill development.',
      first_things_first: 'Assistance with emergency aid, mental health, and enrollment.',
      meeting_people: 'Connect through professional networks and social events.',
      kids_activities: 'Family and children\'s programs available.',
      faith_communities: 'Find local faith and cultural groups.',
      sports_wellness: 'Explore sports and recreation opportunities.',
      arts_entertainment: 'Discover local arts and cultural events.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'View and manage your bookmarked resources',
    searchYourBookmarks: 'Search your bookmarks...',
    showingBookmarks: 'Showing {{count}} of {{total}} bookmarked resources',
    showingBookmarksPaginated: 'Showing {{start}}-{{end}} of {{total}} bookmarks',
    failedToLoadBookmarks: 'Failed to load bookmarks. Please try again.',
    bookmarkedOn: 'Bookmarked on',
    noBookmarksMatchFilters: 'No bookmarks match your current filters.',
    
    // Additional UI elements - screening form
    stepOf: 'Step {{current}} of {{total}}',
    percentComplete: '{{percent}}% Complete',
    previousButton: 'Previous',
    nextButton: 'Next',
    creatingYourPlan: 'Creating Your Plan...',
    completeAssessment: 'Complete Assessment',
    
    // Bookmarks empty state
    noBookmarksYet: 'No Bookmarks Yet',
    startExploringBookmark: 'Start exploring resources and bookmark the ones you find useful!',
    pageOf: 'Page {{current}} of {{total}}',
    yourPersonalizedRoadmap: 'Your Personalized Roadmap',
    resourcesReadyForYou: '{{count}} resources ready for you',
    seeMoreResources: 'Explore All Resources',
    discoveringPerfectResources: 'Discovering Your Perfect Resources',
    noRecommendationsYet: 'Your personalized recommendations are being prepared. Explore our resource directory to get started.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Page Not Found',
    pageNotFoundDescription: "The page you're looking for doesn't exist or has been moved.",
  },
} 