import type { TranslationStructure } from '../types'

export const frenchTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'Accueil',
    dashboard: 'Tableau de Bord',
    adminDashboard: 'Tableau de Bord Admin',
    welcome: 'Bienvenue',
    resources: 'Ressources',
    bookmarks: 'Mes Ressources Sauvegardées',
    about: 'À propos',
    myChecklist: 'Ma liste de tâches',
    signIn: 'Se connecter',
    signUp: 'S\'inscrire',
    accountSettings: 'Paramètres du profil',
    signOut: 'Se déconnecter',
    settings: 'Paramètres',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Bienvenue à Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: 'Bienvenue à',
      heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Votre guide personnel pour commencer une nouvelle vie à Pittsburgh — Gratuit, Privé, Multilingue',
    heroExtendedDescription: 'Vous déménagez à Pittsburgh ? Ne passez pas des heures à rechercher sur des dizaines de sites ou à poser les mêmes questions encore et encore. Pittsburgh Tomorrow Pioneer est votre guide personnel et gratuit pour chaque ressource qui aide les nouveaux arrivants à s\'installer rapidement et en toute confiance — du logement et des écoles à la langue, la foi et la vie communautaire. C\'est la façon la plus complète, qui fait gagner du temps et qui est la plus accueillante de commencer votre nouveau chapitre à Pittsburgh.',
    howCanWeHelp: 'Comment pouvons-nous vous aider aujourd\'hui ?',
    howCanWeHelpSubtitle: 'Choisissez votre chemin pour obtenir des recommandations personnalisées',
    createRoadmapTitle: 'Créez Votre Feuille de Route',
    createRoadmapDescription: 'Répondez à une courte enquête pour recevoir un plan d\'action personnalisé adapté à vos besoins et objectifs spécifiques.',
    getStarted: 'Commencer',
    browseResourcesTitle: 'Parcourir les Ressources',
    browseResourcesDescription: 'Explorez notre répertoire complet de services, d\'organisations et de ressources organisés par catégorie.',
    exploreDirectory: 'Explorer le Répertoire',
    askBridgetTitle: 'Demander à BRIDGIT',
    askBridgetDescription: 'Obtenez des réponses instantanées à vos questions de notre assistant IA. Disponible 24h/24 et 7j/7 dans votre langue préférée.',
    startChatting: 'Commencer à Discuter',
    saveProgressQuestion: 'Voulez-vous sauvegarder vos progrès et accéder aux fonctionnalités personnalisées ?',
    signIn: 'Se Connecter',
    createAccount: 'Créer un Compte',
    servicesNote: 'Tous les services sont entièrement gratuits, strictement confidentiels et disponibles dans plus de 16 langues, notamment l\'anglais, l\'espagnol, l\'arabe, le français, le chinois et le swahili.',
    
    // Trust badges
    hundredPercentFree: '100% Gratuit',
    privateSecure: 'Privé et Sécurisé',
    multilingualSupport: 'Support Multilingue',
    languagesSupported: 'Plus de 16 langues prises en charge, dont l\'espagnol, l\'arabe, le français, le mandarin et le swahili.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'Mode démonstration',
    demoModeDescription: 'Essayez Pittsburgh Tomorrow Pioneer avec différents profils d\'utilisateur pour voir comment l\'expérience s\'adapte à vos besoins',
    whatYouExperience: 'Ce que vous allez découvrir',
    immigrantUser: 'Utilisateur immigrant',
    immigrantFeatures: {
      emergency: 'Ressources d\'urgence priorisées',
      multilingual: 'Support multilingue',
      settlement: 'Contenu axé sur l\'installation',
    },
    studentUser: 'Utilisateur étudiant',
    studentFeatures: {
      academic: 'Ressources académiques',
      campus: 'Informations spécifiques au campus',
      career: 'Orientation professionnelle',
    },
    professionalUser: 'Utilisateur professionnel',
    professionalFeatures: {
      networking: 'Réseautage industriel',
      services: 'Services professionnels',
      advancement: 'Avancement professionnel',
    },
    localHelper: 'Assistant local',
    localFeatures: {
      community: 'Ressources communautaires',
      volunteer: 'Opportunités de bénévolat',
      support: 'Réseaux de soutien',
    },
    signIn: 'Se connecter',
    
    // Authentication required page
    authenticationRequired: 'Authentification requise',
    loginToAccessPage: 'Vous devez vous connecter pour accéder à cette page.',
    
    // Login page
    emailVerified: 'E-mail vérifié',
    emailVerifiedDescription: 'Votre e-mail a été vérifié avec succès.',
    alreadySignedIn: 'Déjà connecté',
    redirectingToDashboard: 'Redirection vers votre tableau de bord...',
    signInDescription: 'Connectez-vous pour accéder à vos ressources et recommandations personnalisées de Pittsburgh.',
    signInWithAuth0: 'Se connecter',
    signInHelp: 'Vous avez des difficultés à vous connecter ? Contactez le support pour obtenir de l\'aide.',
    loginError: 'Erreur de connexion',
    loginErrorDescription: 'Un problème s\'est produit lors de la connexion. Veuillez réessayer.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'Essayer les comptes de démonstration',
    experienceDifferentPerspectives: 'Découvrez Pittsburgh Tomorrow Pioneer sous différentes perspectives d\'utilisateur',
    email: 'E-mail :',
    password: 'Mot de passe :',
    loginAs: 'Se connecter en tant qu\'utilisateur {{role}}',
    demoTip: 'Ces comptes de démonstration présentent différentes expériences utilisateur et contenus personnalisés',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'Réflexion...',
    curatingRecommendations: 'Sélection de recommandations personnalisées...',
    findingResources: 'Recherche des meilleures ressources...',
    complete: 'Terminé !',
    creatingYourPlan: 'Création de Votre Plan Personnalisé',
    ready: 'Prêt !',
    mayTakeAMoment: 'Cela peut prendre un moment pendant que nous personnalisons votre expérience...',
    seeMyRecommendations: 'Voir mes recommandations',
    loadingHint: 'Cela peut prendre un moment pendant que nous personnalisons votre expérience...',
  },
  
  // Screening page
  screening: {
    title: 'Parlez-nous de vous',
    description: 'Répondez à quelques questions rapides pour que nous puissions créer votre guide personnalisé pour vivre et prospérer à Pittsburgh.',
    saveRoadmapBanner: 'Enregistrez votre feuille de route personnalisée en créant un compte. Vous pouvez répondre au questionnaire de façon anonyme maintenant et vous connecter plus tard pour l’enregistrer.',
    
    // Progress indicator
    progress: 'Progression',
    completed: '{{count}} sur {{total}} terminées',
    
    // Questions
    questions: {
      audience: {
        question: 'Qu\'est-ce qui décrit le mieux votre situation ?',
        options: [
          'Étudiant(e)/professionnel(le) (fréquentant une université de la région de Pittsburgh ou travaillant pour une organisation)',
          'Boomerang (j\'ai déjà vécu ici, je suis parti(e) et je suis maintenant de retour dans la région de Pittsburgh)',
          'Réfugié(e) ou Statut de Protection Temporaire (je viens d\'être réinstallé(e) ici ou je viens d\'une autre ville)',
          'Transplanté(e) (déménageant à Pittsburgh depuis une autre ville des États-Unis)',
          'Entrepreneur(e) (je construis mon entreprise)',
          'Employé(e) à distance',
          'Autre',
        ],
      },
      primaryLanguage: {
        question: 'Quelle est votre langue principale ?',
        options: [
          'Anglais (English)',
          'Espagnol (Español)',
          'Arabe (العربية)',
          'Swahili (Kiswahili)',
          'Ouzbek (Oʻzbekcha)',
          'Népalais/Bhoutanais (नेपाली / རྫོང་ཁ)',
          'Dari/Pachto (دری / پښتو)',
          'Chinois mandarin (中文)',
          'Autre',
        ],
      },
      culturalBackground: {
        question: 'Quelle origine culturelle ou régionale vous décrit le mieux ?',
        options: [
          'Blanc/Blanche',
          'Noir/Noire ou Afro-Américain(e) (y compris personnes d\'ascendance africaine et caribéenne)',
          'Hispanique ou Latino/a/x',
          'Asiatique (ex. chinois, indien, vietnamien)',
          'Moyen-Orient ou Afrique du Nord',
          'Autochtone d’Hawaï ou autre insulaire du Pacifique',
          'Amérindien(ne) ou Autochtone d’Alaska',
          'Africain(e) (ex. nigérian, éthiopien, ghanéen, etc.)',
          'Caribéen(ne) (ex. jamaïcain, haïtien, trinidadien, etc.)',
          'Autre',
          'Préfère ne pas répondre',
        ],
      },
      housingNeed: {
        question: 'De quel type de soutien au logement avez-vous besoin ?',
        options: [
          'Aide pour trouver des quartiers et des appartements au prix du marché',
          'Aide au logement abordable et programmes',
          'Logement temporaire/d\'urgence',
          'Colocation/recherche de colocataire',
          'Aide pour essayer d\'acheter une maison',
          'J\'ai un logement sécurisé',
        ],
      },
      professionalStatus: {
        question: 'Quel est votre statut professionnel actuel ?',
        options: [
          'Étudiant(e) (licence/master/école technique)',
          'Professionnel(le) de la technologie/ingénieur(e)',
          'Professionnel(le) de la santé/sciences de la vie',
          'Universitaire/chercheur(se)',
          'À la recherche d\'un emploi',
          'Jeune diplômé(e) en recherche d\'emploi',
          'Autre professionnel(le)',
        ],
      },
      languageSupport: {
        question: 'Quel soutien linguistique serait utile ?',
        options: [
          'Cours d\'anglais (ESL) - débutant à intermédiaire',
          'Compétences de communication professionnelle en anglais',
          'Services de traduction de documents',
          'Pratique conversationnelle en anglais',
          'Aucun soutien linguistique nécessaire',
        ],
      },
      employment: {
        question: 'Quel soutien à l\'emploi vous intéresse ?',
        options: [
          'Réseautage professionnel et avancement de carrière',
          'Assistance à la recherche d\'emploi et aide au CV',
          'Programmes de formation et de certification des compétences',
          'Réseautage spécifique à l\'industrie (technologie, santé, etc.)',
          'Aucun soutien à l\'emploi nécessaire, Merci',
        ],
      },
      communityPriorities: {
        question: 'Quelles connexions communautaires sont les plus importantes pour vous ? (Sélectionnez toutes celles qui s\'appliquent)',
        options: [
          'Réseaux professionnels et rencontres industrielles',
          'Communautés culturelles et religieuses',
          'Activités sociales et divertissement',
          'Services familiaux et pour enfants',
          'Activités sportives et récréatives',
          'Événements artistiques et culturels',
          'Aucune de celles-ci',
        ],
      },
      immediateNeeds: {
        question: 'Quels sont vos besoins les plus immédiats ? (Sélectionnez toutes celles qui s\'appliquent)',
        options: [
          'Rencontrer des gens et se faire de nouveaux amis',
          'Services de base (soins de santé, banque, transport)',
          'Inscription scolaire pour les enfants',
          'Assistance juridique/d\'immigration',
          'Soutien en santé mentale et bien-être',
          'Assistance d\'urgence (nourriture, abri)',
          'Aucune de celles-ci',
        ],
      },
      timeline: {
        question: 'Quel est votre calendrier pour vous installer dans la région de Pittsburgh ?',
        options: [
          'Je viens d\'arriver (dans le dernier mois)',
          'Arrivé(e) récemment (1-6 mois)',
          'J\'envisage d\'arriver bientôt (dans les 3 prochains mois)',
          'Planification à long terme (6+ mois)',
          'Déjà installé(e) dans la région de Pittsburgh',
        ],
      },
      // techComfort removed
    },
    
    // Form messages
    pleaseAnswer: 'Veuillez répondre à cette question.',
    pleaseAnswerAll: 'Veuillez répondre à toutes les questions pour continuer',
    creatingGuide: 'Création de votre guide...',
    seePersonalizedGuide: 'Voir mon guide personnalisé',
    screeningQuestionnaire: 'Questionnaire de sélection',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'BOÎTE À OUTILS POUR NOUVEAUX ARRIVANTS',
    description: 'Trouvez les ressources et le soutien dont vous avez besoin pour vous installer et prospérer à Pittsburgh',
    categories: {
      housingAssistance: 'Assistance au Logement',
      foodAssistance: 'Assistance Alimentaire',
      entrepreneurHiringHub: 'Centre d\'Entrepreneuriat et d\'Embauche',
      youthAdultEducation: 'Ressources Éducatives pour Jeunes et Adultes',
      eslImmigrantConnection: 'Services de Connexion ESL et Immigration',
      socialConnectionCulture: 'Connexion Sociale et Culture',
    },
    chat: {
      bridgitTitle: 'Discuter avec BRIDGIT',
      bridgitDescription: 'Obtenez une assistance personnalisée et des conseils pour votre parcours',
    },
  },

  // Resource search
  resources: {
    title: 'Trouver des ressources',
    searchPlaceholder: 'Rechercher des ressources...',
    allCategories: 'Toutes les catégories',
    housing: 'Logement',
    educationESL: 'Éducation / ESL',
    socialNetworking: 'Social / Réseautage',
    noResourcesFound: 'Aucune ressource trouvée correspondant à votre recherche ou vos filtres.',
    backToAllCategories: 'Retour à Toutes les Catégories',
    backToCategory: 'Retour à {{category}}',
    welcomeToCategory: 'Bienvenue à {{category}}',
    categoryDescription: {
      housing: 'Trouvez un soutien au logement, une aide au loyer et des ressources de quartier',
      foodAssistance: 'Localisez les banques alimentaires, les programmes de repas et l\'aide nutritionnelle',
      entrepreneurHiring: 'Découvrez les ressources d\'entreprise, les opportunités d\'emploi et l\'aide à l\'embauche',
      youthEducation: 'Accédez aux programmes éducatifs, au tutorat et aux ressources d\'apprentissage',
      eslImmigrant: 'Connectez-vous aux cours d\'anglais, aux services d\'immigration et au soutien culturel',
      socialConnection: 'Rejoignez des groupes communautaires, des événements culturels et des activités sociales',
    },
    refreshBookmarks: 'Actualiser les Signets (Débogage)',
    compare: 'Comparer ({{count}}/3)',
    filterByLanguage: 'Filtrer par Langue :',
    showingResults: 'Affichage de {{current}} sur {{total}} ressources',
    categoryTitles: {
      housingProcess: 'Processus de Logement à Pittsburgh',
      housingProcessDescription: 'Apprenez le processus de recherche de logement et les exigences',
    },
    exploreResources: 'Explorer les ressources',
    categoryNotFound: 'Catégorie non trouvée',
    subcategoryNotFound: 'Sous-catégorie non trouvée',
    clearFilters: 'Effacer les Filtres',
    showingResultsFor: 'pour',
    showingResultsIn: 'en',
    compareSelected: 'Comparer Sélectionnés',
    noResourcesFoundCategory: 'Aucune ressource trouvée pour cette catégorie.',
    browseSubcategoryDescription: 'Parcourez les ressources dans cette sous‑catégorie.',
    
    // Global search
    globalSearch: {
      placeholder: 'Rechercher toutes les ressources...',
      button: 'Rechercher',
    },
    searchResults: {
      title: 'Résultats de Recherche',
      for: 'pour',
      noResults: 'Aucune ressource trouvée correspondant à votre recherche.',
      tryDifferent: 'Essayez un terme de recherche différent.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'Bienvenue à',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Processus de Logement à Pittsburgh',
        housingProcessDesc: 'Apprenez le processus de recherche de logement et les exigences',
        neighborhoodResources: 'Ressources de Quartier et Immobilières',
        neighborhoodResourcesDesc: 'Découvrez les quartiers et les informations immobilières',
        housingAssistanceSubcat: 'Assistance au Logement',
        housingAssistanceSubcatDesc: 'Aide directe au loyer et services de soutien au logement',
        
        // Food subcategories
        culturalFood: 'Centre Alimentaire Culturel',
        culturalFoodDesc: 'Marchés internationaux et ressources alimentaires culturelles',
        foodPantries: 'Banques Alimentaires',
        foodPantriesDesc: 'Aide alimentaire d\'urgence et garde-manger',
        groceryGuide: 'Guide des Épiceries',
        groceryGuideDesc: 'Épiceries locales et aide aux achats',
        
        // Employment subcategories
        hiringHub: 'Êtes-vous un immigrant ou nouveau venu cherchant du travail ?',
        hiringHubDesc: 'Découvrez notre Centre d\'Embauche !',
        entrepreneurship: 'Ressources Entrepreneuriales à Pittsburgh',
        entrepreneurshipDesc: 'Développement d\'entreprise et ressources de startup',
        
        // Education subcategories
        schoolResources: 'Cherchez-vous des ressources pour trouver une nouvelle école ?',
        schoolResourcesDesc: 'Inscription scolaire et ressources éducatives',
        tutoring: 'Cherchez-vous une préparation universitaire ou un tuteur ?',
        tutoringDesc: 'Services de tutorat et préparation universitaire',
        gedResources: 'Cherchez-vous à obtenir votre GED ?',
        gedResourcesDesc: 'Préparation GED et éducation des adultes',
        
        // ESL & Immigration subcategories
        eslResources: 'Cherchez-vous des ressources ESL ?',
        eslResourcesDesc: 'Apprentissage de la langue anglaise et cours',
        documentation: 'Assistance Documentaire',
        documentationDesc: 'Paperasse d\'immigration et soutien juridique',
        basicNeeds: 'Assistance aux Besoins Essentiels',
        basicNeedsDesc: 'Services essentiels et soutien d\'urgence',
        
        // Social subcategories
        fosterConnection: 'Ressources pour Favoriser la Connexion',
        fosterConnectionDesc: 'Groupes sociaux et construction communautaire',
        culturalResourcesSocial: 'Ressources Alimentaires et Culturelles',
        culturalResourcesSocialDesc: 'Événements culturels et traditions alimentaires',
        faithGroups: 'Groupes Confessionnels',
        faithGroupsDesc: 'Communautés religieuses et soutien spirituel',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'Communauté et Appartenance',
          'culture-leisure': 'Culture, Arts et Loisirs',
        'esl-immigrant': 'Soutien ESL et Immigration',
          'education-youth': 'Éducation : Adultes et Jeunes',
          'living-essentials': 'Essentiels du Quotidien',
          'work-business': 'Emplois et Ressources d’Entreprise',
      },
      categoryDescriptions: {
          'community-belonging': 'Se connecter, participer et créer des liens communautaires à Pittsburgh',
        'culture-leisure': 'Explorer les arts, les activités familiales, les loisirs et la vie nocturne',
        'esl-immigrant': 'Apprentissage des langues, aide à l’immigration et services pour nouveaux arrivants',
          'education-youth': 'Apprentissage pour adultes, tutorat et opportunités pour les jeunes',
          'living-essentials': 'Logement, santé, transport et alimentation',
          'work-business': 'Emplois, accompagnement de carrière et ressources pour les entreprises',
      },
      subcategories: {
        'civic-government': 'Administration',
        'civic-advocacy': 'Plaidoyer local',
        'civic-volunteer': 'Bénévolat',
        'civic-youth': 'Participation des jeunes',
        religion: 'Religion',
        'social-connection': 'Lien social',
        art: 'Arts',
        family: 'Loisirs familiaux',
        'beauty-hair': 'Coiffure / Beauté',
        'hobby-spaces': 'Espaces de loisirs',
        'night-life': 'Vie nocturne',
        'esl-support': 'Soutien en Anglais Langue Seconde (ESL)',
        'general-law': 'Droit général',
        'immigration-asylum': 'Immigration / Asile',
        'refugee-immigrant-support': 'Soutien aux réfugiés / immigrants',
        'adult-education': 'Éducation des adultes',
        'college-prep-tutoring': 'Préparation universitaire / Tutorat',
        'youth-education': 'Éducation des jeunes',
        'youth-programming': 'Programmes jeunesse',
        'food-pantries': 'Banques alimentaires',
        'grocery-guide': 'Guide des épiceries',
        'specialty-stores': 'Épiceries spécialisées',
        'guide-discover-pittsburgh': 'Découvrir Pittsburgh',
        'guide-diverse-businesses': 'Entreprises diverses',
        'guide-immigrant-services': 'Services pour immigrants',
        'health-additional-support': 'Soutien complémentaire',
        'health-body-mind': 'Soins du corps et de l’esprit',
        'health-hospitals': 'Hôpitaux',
        'health-nutrition': 'Nutrition',
        'health-senior-care': 'Soins aux aînés',
        'housing-buying-home': 'Achat d’une maison',
        'housing-assistance': 'Aide au logement',
        'housing-relocating': 'S’installer à Pittsburgh',
        'housing-rent': 'Location',
        transportation: 'Transit',
        'business-development': 'Développement des entreprises',
        'business-support': 'Soutien aux entreprises',
        'career-support': 'Accompagnement de carrière',
        'internship-opportunities': 'Stages',
      },
      groups: {
        'civic-engagement': 'Engagement civique',
        legal: 'Juridique',
        food: 'Alimentation',
        'pittsburgh-guides': 'Guides de Pittsburgh',
        health: 'Santé',
        housing: 'Logement',
        transit: 'Transit',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'Chargement de votre liste de tâches personnalisée...',
  },
  
  // About page
  about: {
    title: 'À propos de Pittsburgh Tomorrow Pioneer',
    description: 'Pittsburgh Tomorrow Pioneer est votre guide convivial pour vous installer à Pittsburgh et dans le comté d\'Allegheny. Que vous soyez un professionnel de la technologie ou un nouveau venu cherchant un nouveau départ, Pittsburgh Tomorrow Pioneer vous connecte aux ressources locales pour le logement, l\'éducation, l\'emploi et la communauté.',
    features: [
      'Plus de 161 organisations à but non lucratif',
      'Listes de tâches et feuilles de route personnalisées',
      'Soutien pour les nouveaux arrivants indépendants et traditionnels',
      'Sélection facile pour répondre à vos besoins',
    ],
    conclusion: 'Ce projet est une collaboration de partenaires locaux et de bénévoles, dédiés à rendre Pittsburgh accueillant, solidaire et plein d\'opportunités pour tous.',
    copyright: 'Pittsburgh Tomorrow Pioneer. Tous droits réservés.',
    
    // AboutPage specific content
    welcomeText: 'Bienvenue à Pittsburgh Tomorrow Pioneer, votre guide personnel pour commencer une nouvelle vie à Pittsburgh et dans le comté d\'Allegheny. Que vous veniez d\'arriver aux États-Unis ou que vous ayez pris un nouvel emploi dans l\'une des entreprises en croissance de Pittsburgh dans l\'énergie, la robotique, l\'IA, les sciences de la vie ou l\'acier — Pittsburgh Tomorrow Pioneer est là pour vous aider. De la recherche d\'un logement à l\'inscription de vos enfants à l\'école, de la localisation de cours d\'anglais à la connexion avec des communautés de foi ou de soutien alimentaire local, Pittsburgh Tomorrow Pioneer rassemble les ressources dont vous avez besoin en un seul endroit.',
    
    whyPioneerTitle: 'Pourquoi Pittsburgh Tomorrow Pioneer ?',
    whyPioneerText1: 'Parce que recommencer dans une nouvelle ville ne devrait pas signifier repartir de zéro.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer rassemble tout ce dont vous avez besoin pour commencer une nouvelle vie à Pittsburgh et dans le comté d\'Allegheny — le tout dans un endroit fiable et facile à utiliser.',
    whyPioneerText3: 'C\'est gratuit, complet et conçu pour vous faire économiser des heures de recherche, de comparaison et d\'hésitation. Que vous cherchiez un logement, inscriviez vos enfants à l\'école, appreniez l\'anglais ou cherchiez à rencontrer des personnes qui partagent votre foi, votre langue ou vos intérêts — Pittsburgh Tomorrow Pioneer vous assure de ne manquer aucune opportunité de rendre votre déménagement plus fluide et votre nouvelle vie plus riche.',
    whyPioneerText4: 'Là où une recherche Google vous montre tout, Pittsburgh Tomorrow Pioneer vous montre exactement ce qui compte.',
    whyPioneerText5: 'Là où un chatbot IA offre des réponses, Pioneer vous donne une feuille de route.',
    whyPioneerText6: 'Là où la plupart des outils de relocalisation s\'arrêtent à la logistique, Pioneer commence par la communauté.',
    whyPioneerText7: 'C\'est Pittsburgh, rendu personnel.',
    
    youAreThePioneerTitle: 'Vous Êtes le Pionnier',
    youAreThePioneerText1: 'Vous ne déménagez pas seulement — vous commencez quelque chose de nouveau. Un nouvel emploi. Une nouvelle école. Un nouveau foyer. Et peut-être même une nouvelle langue ou culture. Cela demande du courage.',
    youAreThePioneerText2: 'Nous avons construit Pittsburgh Tomorrow Pioneer pour vous soutenir — parce que vous êtes le Pionnier. Ce site est là pour vous accompagner pendant que vous construisez un avenir à Pittsburgh.',
    
    howPioneerHelpsTitle: 'Comment Pittsburgh Tomorrow Pioneer Aide',
    
    madeForYouTitle: 'Fait pour Vous — D\'où que Vous Veniez',
    madeForYouDescription: 'Nous savons que tout le monde ne parle pas anglais comme première langue. C\'est pourquoi Pittsburgh Tomorrow Pioneer prend en charge des dizaines de langues mondiales, notamment l\'espagnol, l\'arabe, le français, le chinois, le dari et plus encore. Si vous tapez dans votre langue maternelle, Pittsburgh Tomorrow Pioneer répondra de la même manière.',
    
    personalRoadmapTitle: 'Créez Votre Feuille de Route Personnelle',
    personalRoadmapDescription: 'Notre outil le plus puissant est votre feuille de route personnalisée — une liste de tâches faite juste pour vous. En répondant à quelques questions simples sur vos besoins (logement, nourriture, emplois, éducation, etc.), Pittsburgh Tomorrow Pioneer crée un plan d\'action personnalisé pour soutenir vos prochaines étapes. Vous pouvez :',
    personalRoadmapFeatures: [
      'Voir et mettre à jour votre feuille de route à tout moment',
      'Sauvegarder vos progrès en vous connectant (optionnel)',
      'Télécharger ou imprimer votre liste de tâches pour la garder avec vous',
      'Revisiter et affiner votre feuille de route au fur et à mesure que votre vie à Pittsburgh évolue'
    ],
    personalRoadmapNote: 'Si vous préférez explorer à votre propre rythme, vous pouvez parcourir notre bibliothèque complète de ressources sans vous connecter.',
    
    smartSupportTitle: 'Support Intelligent et Auto-guidé',
    smartSupportDescription: 'Pittsburgh Tomorrow Pioneer dispose d\'un chatbot convivial formé pour répondre à des centaines de questions courantes. Il peut vous guider vers des ressources, expliquer comment fonctionnent les systèmes locaux et vous aider à franchir la prochaine étape. Il y a aussi un répertoire complet d\'informations de contact pour nos partenaires de confiance — agences publiques, organisations à but non lucratif, fournisseurs de services et plus encore.',
    
    trustedPartnersTitle: 'Partenaires de Confiance',
    trustedPartnersDescription: 'Accédez à notre répertoire complet de partenaires de confiance — agences publiques, organisations à but non lucratif et fournisseurs de services dans tout Pittsburgh et le comté d\'Allegheny. Notre réseau comprend plus de 380 organisations à but non lucratif prêtes à aider avec vos besoins spécifiques.',
    
    privacyTitle: 'Votre Confidentialité, Protégée',
    privacyDescription: 'Votre confidentialité et votre sécurité nous importent. Si vous choisissez de créer un compte, vos données personnelles sont protégées par des protocoles de sécurité conformes SOC II. Nous ne vendrons ni ne partagerons jamais vos données. Vous gardez le contrôle total de vos informations à tout moment.',
    
    pittsburghTomorrowTitle: 'À Propos de Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'Pittsburgh Tomorrow Pioneer est une initiative de Pittsburgh Tomorrow, une organisation à but non lucratif ayant pour mission de faire grandir Pittsburgh. Nous catalysons le nouvel esprit qui redéfinit ce que l\'historien David McCullough a appelé "La Ville Indispensable de l\'Amérique".',
    pittsburghTomorrowText2: 'La région qui a construit l\'Amérique depuis le début connaît une nouvelle vitalité et un nouvel esprit civique : accueillir les nouveaux arrivants, lancer des entrepreneurs et ouvrir de nouvelles voies. Notre mouvement est alimenté par une nouvelle vague de pionniers, de précurseurs et de preneurs de risques qui saisissent les opportunités et construisent l\'avenir — à Pittsburgh.',
    pittsburghTomorrowText3: 'Chez Pittsburgh Tomorrow, nous avons pour mission de faire grandir Pittsburgh. Et cela ne signifie pas seulement la croissance démographique ou économique ; cela signifie revitaliser l\'esprit de notre ville. Soutenir les petites entreprises et les entrepreneurs. Embellir et préserver notre environnement. Promouvoir les arts et la culture. Accueillir les nouveaux arrivants et créer une communauté. Être fiers de notre ville et la remettre sur la carte.',
    pittsburghTomorrowLink: 'En Savoir Plus',
    
    // Call to action section
    readyToStartTitle: 'Commencez Votre Voyage à Pittsburgh',
    readyToStartDescription: 'Construisez votre feuille de route personnalisée pour vous aider à vous installer et à prospérer dans votre nouveau foyer.',
    getStarted: 'Commencer',
    browseResources: 'Parcourir les Ressources',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'Retour à À propos',
    title: 'Déclaration de Transparence et de Confidentialité des Données',
    description: 'Chez Pittsburgh Tomorrow, nous valorisons la transparence et votre confiance. Nous croyons que vous avez le droit de comprendre exactement pourquoi nous posons certaines questions, comment nous utilisons les informations et comment cela vous profite.',
    
    whyWeAskTitle: 'Pourquoi Nous Posons Ces Questions et Comment Nous Utilisons Vos Informations :',
    whyWeAskDescription: 'Les questions que nous posons sont conçues pour nous aider à créer une feuille de route personnalisée pour vous. Vos réponses nous permettent de :',
    whyWeAskBullet1: 'Extraire des ressources et informations pertinentes de notre base de données adaptées à vos besoins.',
    whyWeAskBullet2: 'Nous assurer que nous atteignons les gens de manière équitable dans toutes les communautés et origines.',
    whyWeAskBullet3: 'Identifier les lacunes dans qui nous servons afin de mieux atteindre ceux qui pourraient manquer.',
    whyWeAskBullet4: 'Améliorer nos outils IA pour qu\'ils soient mieux équipés pour servir tous les utilisateurs efficacement.',
    weDoNotSell: 'Nous ne vendons pas vos données. Nous les utilisons uniquement aux fins énumérées ci-dessus.',
    
    dataRetentionTitle: 'Rétention des Données :',
    dataRetentionDescription: 'Nous conservons vos informations dans notre base de données jusqu\'à ce que vous nous informiez que vous ne souhaitez plus accéder à votre tableau de bord personnalisé. Après cela, vos données seront anonymisées et utilisées uniquement pour améliorer nos services IA pour aider d\'autres nouveaux arrivants à Pittsburgh.',
    
    quomeTitle: 'Comment Quome Utilise Vos Données :',
    quomeDescription: 'Notre site est hébergé par Quome, qui peut collecter certaines données pour opérer et améliorer la plateforme. Vous pouvez en apprendre plus sur comment Quome utilise et protège vos données en consultant leur',
    
    skillBuilderTitle: 'Comment Skill Builder Utilise Vos Données :',
    skillBuilderDescription: 'Notre chatbot de site est hébergé par SkillBuilder.io, qui peut collecter certaines données pour opérer et améliorer la plateforme. Vous pouvez en apprendre plus sur comment SkillBuilder.io utilise et protège vos données en consultant leur',
    
    contactDescription: 'Si vous avez des questions sur notre utilisation des données ou nos pratiques de confidentialité, veuillez utiliser notre bouton Commentaires sur le côté droit de chaque page pour nous contacter.',
    privacyPolicyLink: 'Politique de Confidentialité'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'À propos de Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'Pittsburgh Tomorrow Pioneer aide les nouveaux arrivants à Pittsburgh et dans le comté d\'Allegheny à trouver leur chemin. Nous vous connectons aux bonnes ressources et opportunités, quel que soit votre parcours.',
    quickLinks: 'Liens rapides',
    home: 'Accueil',
    about: 'À propos',
    resources: 'Ressources',
    privacyPolicy: 'Politique de Confidentialité',
    getStarted: 'Commencer',
    contact: 'Contact',
    location: 'Bonjour de Pittsburgh, PA',
    email: 'E-mail : Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'Bienvenue, {{name}} !',
    welcomeStudent: 'Bon retour, {{name}} !',
    welcomeProfessional: 'Bienvenue, {{name}} !',
    welcomeLocal: 'Bonjour {{name}} !',
    
    subtitleImmigrant: 'Votre parcours d\'installation commence ici',
    subtitleStudent: 'Votre réussite académique est notre priorité',
    subtitleProfessional: 'Votre croissance professionnelle est notre objectif',
    subtitleLocal: 'Aidez à rendre Pittsburgh accueillant pour tous',
    
    demoUserNote: 'Vous visualisez Pittsburgh Tomorrow Pioneer en tant qu\'utilisateur **{{role}}**. L\'expérience est personnalisée pour votre rôle.',
    userBadge: 'utilisateur {{role}}',
    
    urgentResources: 'Ressources urgentes',
    
    // Resource categories
    emergencyServices: 'Services d\'urgence',
    emergencyDescription: 'Soutien de crise 24/7 et assistance immédiate',
    temporaryHousing: 'Logement temporaire',
    temporaryHousingDescription: 'Programmes d\'abri et d\'assistance au logement',
    healthcareAccess: 'Accès aux soins de santé',
    healthcareDescription: 'Services médicaux et aide à l\'assurance santé',
    languageServices: 'Services linguistiques',
    languageServicesDescription: 'Soutien à la traduction et à l\'interprétation',
    
    // Additional resource categories for other roles
    academicSupport: 'Soutien académique',
    academicSupportDescription: 'Tutorat, groupes d\'étude et ressources académiques',
    studentHousing: 'Logement étudiant',
    studentHousingDescription: 'Options de logement sur et hors campus',
    financialAid: 'Aide financière',
    financialAidDescription: 'Bourses, subventions et assistance financière',
    studentGroups: 'Groupes étudiants',
    studentGroupsDescription: 'Organisations et clubs d\'étudiants internationaux',
    professionalNetworks: 'Réseaux professionnels',
    professionalNetworksDescription: 'Rencontres industrielles et événements de réseautage',
    careerDevelopment: 'Développement de carrière',
    careerDevelopmentDescription: 'Formation aux compétences et programmes de certification',
    professionalHousing: 'Logement professionnel',
    professionalHousingDescription: 'Logement exécutif et services de relocalisation',
    mentorship: 'Mentorat',
    mentorshipDescription: 'Programmes de mentorat et d\'orientation professionnelle',
    volunteerOpportunities: 'Opportunités de bénévolat',
    volunteerOpportunitiesDescription: 'Moyens d\'aider les nouveaux arrivants dans votre communauté',
    communityOrganizations: 'Organisations communautaires',
    communityOrganizationsDescription: 'Organismes à but non lucratif et prestataires de services locaux',
    supportNetworks: 'Réseaux de soutien',
    supportNetworksDescription: 'Programmes de mentorat et d\'amitié',
    culturalExchange: 'Échange culturel',
    culturalExchangeDescription: 'Événements et programmes interculturels',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'Connectez-vous pour découvrir votre parcours personnalisé à Pittsburgh',
      signInToPioneer: 'Se connecter à Pittsburgh Tomorrow Pioneer',
    welcomeTitle: 'Bienvenue à Pittsburgh Tomorrow Pioneer, {{name}} !',
    welcomeTitleWithoutName: 'Bienvenue à Pittsburgh Tomorrow Pioneer !',
    journeyContinues: 'Votre parcours personnalisé se poursuit...',
    beginJourney: 'Commencez votre parcours personnalisé à Pittsburgh',
    completedSurveyHeader: 'Vous avez déjà complété le questionnaire',
    completedSurveyText: 'Vous avez complété votre questionnaire d\'intégration. Consultez votre feuille de route personnalisée ci‑dessous ou modifiez vos réponses pour mettre à jour vos recommandations.',
    completedSurveyTextWithDate: 'Vous avez complété votre questionnaire d\'intégration le {{date}}. Consultez votre feuille de route personnalisée ci‑dessous ou modifiez vos réponses pour mettre à jour vos recommandations.',
    editResponses: 'Modifier les réponses',
    viewMyRoadmap: 'Voir ma feuille de route',
    noteLabel: 'Remarque :',
    editRegenerateNote: 'Si vous modifiez vos réponses au questionnaire, vos recommandations et votre feuille de route seront régénérées automatiquement pour mieux correspondre à vos préférences mises à jour.',
    bridgitHelp: 'Avez-vous des questions non couvertes par le questionnaire ? Cliquez sur le chatbot BRIDGIT en bas à droite pour une assistance personnalisée !',
    personalizedRoadmap: 'Votre feuille de route personnalisée',
    unlockExperience: 'DÉBLOQUEZ VOTRE EXPÉRIENCE PERSONNALISÉE',
    completeSurveyHeader: 'Complétez le questionnaire pour commencer',
    completeSurveyText: 'Répondez à notre questionnaire rapide de 5 minutes pour recevoir des recommandations de ressources personnalisées, adaptées à vos besoins et objectifs à Pittsburgh.',
  },
  
  // Profile page
  profile: {
    title: 'Paramètres du profil',
    subtitle: 'Gérez vos informations personnelles et préférences',
    accountInformation: 'Informations du compte',
    accountInformationDescription: 'Mettez à jour les détails de base de votre compte',
    basicInformation: 'Informations de base',
    basicInformationDescription: 'Mettez à jour vos informations personnelles de base',
    firstName: 'Prénom',
    enterFirstName: 'Entrez votre prénom',
    lastName: 'Nom de famille',
    enterLastName: 'Entrez votre nom de famille',
    username: 'Nom d\'utilisateur',
    enterUsername: 'Entrez votre nom d\'utilisateur',
    email: 'E-mail',
    emailChangeNote: 'L\'e-mail ne peut pas être modifié. Contactez le support si vous devez mettre à jour votre e-mail.',
    emailCannotBeChanged: 'L\'e-mail ne peut pas être modifié. Contactez le support si vous devez mettre à jour votre e-mail.',
    surveyRequired: 'Complétez d\'abord votre questionnaire',
    surveyRequiredDescription: 'Pour obtenir des recommandations personnalisées et modifier vos réponses, vous devez d\'abord compléter le questionnaire initial.',
    takeSurvey: 'Remplir le questionnaire',
    basicQuestions: 'Informations de base',
    basicQuestionsDescription: 'Parlez-nous de vous et de votre situation pour obtenir des recommandations personnalisées',
    selectPrimary: 'Sélectionnez votre préférence principale :',
    selectOption: 'Sélectionnez une option...',
    supportNeeds: 'Soutien et besoins',
    supportNeedsDescription: 'De quel type de soutien et de services avez-vous besoin ?',
    selectMultiple: 'Sélectionnez tout ce qui s\'applique :',
    selectAtLeastOne: 'Veuillez sélectionner au moins une option.',
    timelinePreferences: 'Calendrier et préférences',
    timelinePreferencesDescription: 'Votre calendrier et vos préférences technologiques',
    backToDashboard: 'Retour au Tableau de bord',
    languageAndCultural: 'Langue et origine culturelle',
    languageAndCulturalDescription: 'Aidez-nous à fournir de meilleures recommandations personnalisées',
    primaryLanguage: 'Langue principale',
    selectPrimaryLanguage: 'Sélectionnez votre langue principale',
    culturalBackground: 'Origine culturelle',
    selectCulturalBackground: 'Sélectionnez votre origine culturelle',
    professionalAndLiving: 'Situation professionnelle et de logement',
    professionalAndLivingDescription: 'Cela nous aide à recommander des ressources et services pertinents',
    professionalStatus: 'Statut professionnel',
    selectProfessionalStatus: 'Sélectionnez votre statut professionnel',
    housingSituation: 'Situation de logement',
    selectHousingSituation: 'Sélectionnez votre situation de logement',
    familyStatus: 'Statut familial',
    selectFamilyStatus: 'Sélectionnez votre statut familial',
    saveChanges: 'Enregistrer les modifications',
    saving: 'Enregistrement...',
    recalculatingRecommendations: 'Recalcul des recommandations...',
    profileUpdated: 'Profil mis à jour',
    profileUpdatedDescription: 'Votre profil a été mis à jour avec succès.',
    accountUpdated: 'Compte mis à jour',
    accountUpdatedDescription: 'Les informations de votre compte ont été mises à jour. Complétez le questionnaire pour enregistrer vos préférences.',
    updateFailed: 'Mise à jour échouée',
    updateFailedDescription: 'Échec de la mise à jour du profil. Veuillez réessayer.',
    pleaseLogIn: 'Veuillez vous connecter pour voir votre profil.',
    
    // Language options
    languages: {
      english: 'Anglais',
      spanish: 'Espagnol',
      french: 'Français',
      arabic: 'Arabe',
      chinese: 'Chinois',
      swahili: 'Swahili',
      hindi: 'Hindi',
      portuguese: 'Portugais',
      russian: 'Russe',
      nepali: 'Népalais',
      somali: 'Somali',
      tagalog: 'Tagalog',
      turkish: 'Turc',
      other: 'Autre',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'Américain/Occidental',
      westAfrican: 'Africain de l\'Ouest',
      middleEasternNorthAfrican: 'Moyen-Orient/Afrique du Nord',
      southAsian: 'Asie du Sud (y compris bhoutanais)',
      latinoHispanic: 'Latino/Hispanique',
      eastAsian: 'Asie de l\'Est',
      easternEuropean: 'Europe de l\'Est',
      other: 'Autre/Préfère ne pas dire',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'Étudiant',
      graduateStudent: 'Étudiant de troisième cycle',
      softwareEngineer: 'Ingénieur logiciel',
      healthcareProfessional: 'Professionnel de la santé',
      researchScientist: 'Chercheur scientifique',
      seekingEmployment: 'À la recherche d\'un emploi',
      employedFullTime: 'Employé à temps plein',
      employedPartTime: 'Employé à temps partiel',
      selfEmployed: 'Travailleur indépendant',
      retired: 'Retraité',
      other: 'Autre',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Logement temporaire',
      campusHousing: 'Logement du campus',
      apartmentHunting: 'Recherche d\'appartement',
      rentingApartment: 'Location d\'appartement',
      rentingHouse: 'Location de maison',
      homeowner: 'Propriétaire',
      livingWithFamily: 'Vivant avec la famille',
      sharedHousing: 'Logement partagé',
      other: 'Autre',
    },
    
    // Family status options
    familyStatuses: {
      single: 'Célibataire',
      married: 'Marié(e)',
      familyWithChildren: 'Famille avec enfants',
      singleParent: 'Parent célibataire',
      extendedFamily: 'Famille élargie',
      other: 'Autre',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'Comment devons-nous vous appeler ?',
    description: 'Aidez-nous à personnaliser votre expérience en nous disant votre nom.',
    firstName: 'Prénom',
    firstNamePlaceholder: 'Entrez votre prénom',
    lastName: 'Nom de famille',
    lastNamePlaceholder: 'Entrez votre nom de famille (optionnel)',
    skip: 'Passer pour maintenant',
    save: 'Enregistrer le nom',
    saving: 'Enregistrement...',
    firstNameRequired: 'Prénom requis',
    firstNameRequiredDescription: 'Veuillez entrer votre prénom pour continuer.',
    nameUpdated: 'Nom mis à jour',
    nameUpdatedDescription: 'Votre nom a été enregistré avec succès.',
    updateFailed: 'Échec de la mise à jour',
    updateFailedDescription: 'Impossible de mettre à jour votre nom. Veuillez réessayer.',
  },
  
  // Common elements
  common: {
    dashboard: 'Tableau de Bord',
    loading: 'Chargement...',
    search: 'Rechercher',
    filter: 'Filtrer',
    next: 'Suivant',
    previous: 'Précédent',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    edit: 'Modifier',
    delete: 'Supprimer',
    close: 'Fermer',
    back: 'Retour',
    backToResources: 'Retour aux ressources',
    viewDetails: 'Voir les détails',
    learnMore: 'En savoir plus',
    getHelp: 'Obtenir de l\'aide',
    startNow: 'Commencer maintenant',
    tryNow: 'Essayer maintenant',
    downloadNow: 'Télécharger maintenant',
    visitWebsite: 'Visiter',
    shareThis: 'Partager ceci',
    copied: 'Copié !',
    copy: 'Copier',
    show: 'Afficher',
    hide: 'Masquer',
    expand: 'Développer',
    collapse: 'Réduire',
    seeMore: 'Voir plus',
    seeLess: 'Voir moins',
    showingTopOf: 'Affichage des {{current}} premières sur {{total}} ressources',
    selectLanguage: 'Sélectionner la langue',
    personalizedRecommendationsLabel: 'Recommandations personnalisées',
    exploreResourcesNowLabel: 'Explorer les ressources maintenant',
    curatedAdviceLabel: 'Conseils sélectionnés pour réussir',
    
    // Accessibility and UI labels
    toggleSidebar: 'Basculer la barre latérale',
    toggleMobileMenu: 'Basculer le menu mobile',
    feedback: 'Commentaires',
    openInNewTab: 'Ouvrir dans un nouvel onglet',
    removeBookmark: 'Supprimer le signet',
    editResource: 'Modifier la ressource',
    deleteResource: 'Supprimer la ressource',
    dragToReorder: 'Glisser pour réorganiser',
    saveOrPrintOptions: 'Options de sauvegarde ou d\'impression',
    filterByCategory: 'Filtrer par catégorie',
    openChatAssistant: 'Ouvrir le chat avec l\'assistant BRIDGIT',
    askBridget: 'Demander à BRIDGIT',
    bridgitComingSoonTitle: 'BRIDGIT : Bientôt disponible !',
    bridgitComingSoonDescription: 'Notre assistant IA BRIDGIT est actuellement en développement. Restez à l\'écoute pour les mises à jour !',
    
    // Content section headers
    description: 'Description',
    services: 'Services',
    languages: 'Langues',
    languagesSupported: 'Langues prises en charge',
    available: 'Disponible',
    resources: 'Ressources',
    exploreResources: 'Explorer les ressources',
    
    // Admin interface
    authenticationRequired: 'Authentification requise',
    organizationName: 'Nom de l\'organisation',
    website: 'Site web',
    shortDescription: 'Description courte',
    fullDescription: 'Description complète',
    affiliation: 'Affiliation',
    financialData: 'Données financières',
    serviceDetails: 'Détails du service',
    categories: 'Catégories',
    servicesProvided: 'Services fournis',
    totalResources: 'Total des ressources',
    publishingStatus: 'Statut de publication',
    totalUsers: 'Total des utilisateurs',
    adminUsers: 'Utilisateurs administrateurs',
    demoUsers: 'Utilisateurs de démonstration',
    noResourcesFound: 'Aucune ressource trouvée',
    
    // Form placeholders
    placeholders: {
      organizationName: 'Nom de l\'organisation',
      briefDescription: 'Description brève',
      detailedDescription: 'Description détaillée des services et programmes',
      organizationAffiliation: 'Affiliation de l\'organisation ou réseau',
      partnersCollaborating: 'Liste des partenaires et organisations collaboratrices',
      availableOnline: 'Disponible en ligne',
    },
    
    // Additional UI elements
    backToHome: 'Retour à l\'accueil',
    goHome: 'Retour à l\'accueil',
    browseResources: 'Parcourir les Ressources',
    needPersonalizedRecommendations: 'Besoin de recommandations personnalisées ?',
    personalizedRecommendationsDescription: 'Répondez à notre évaluation rapide pour obtenir une liste de vérification personnalisée avec des ressources spécifiquement choisies pour vos besoins.',
    getYourPersonalRoadmap: 'Obtenez votre feuille de route personnelle',
    allRightsReserved: 'Tous droits réservés',
    initiativeOfPittsburghTomorrow: 'Une initiative de Pittsburgh Tomorrow',
    viewingAsUserNotification: 'Vous visualisez Pittsburgh Tomorrow Pioneer en tant qu\'utilisateur {{role}}. L\'expérience est personnalisée pour votre rôle.',
    priorityResourcesForYou: 'Ressources prioritaires pour vous',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: "D'après vos réponses au questionnaire, vous n'avez pas besoin d'assistance spécifique pour le moment. Si votre situation change, vous pouvez mettre à jour votre profil. Sinon, n'hésitez pas à explorer toutes les ressources disponibles.",
    editProfile: 'Mettre à Jour le Profil',
    exploreAllResources: 'Explorer Toutes les Ressources',
    
    // Priority Categories
    priorityCategories: {
      housing: 'Logement',
      education: 'Éducation', 
      income: 'Revenus',
      first_things_first: 'Premières Nécessités',
      meeting_people: 'Rencontrer des Gens',
      kids_activities: 'Activités pour Enfants',
      faith_communities: 'Communautés de Foi',
      sports_wellness: 'Sports et Bien-être',
      arts_entertainment: 'Arts et Divertissement',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'Trouver un logement abordable et un soutien financier.',
      education: 'Anglais professionnel et soutien dans d\'autres langues.',
      income: 'Soutien pour la recherche d\'emploi et le développement des compétences.',
      first_things_first: 'Assistance avec l\'aide d\'urgence, la santé mentale et l\'inscription.',
      meeting_people: 'Connectez-vous grâce aux réseaux professionnels et aux événements sociaux.',
      kids_activities: 'Programmes familiaux et pour enfants disponibles.',
      faith_communities: 'Trouvez des groupes locaux de foi et culturels.',
      sports_wellness: 'Explorez les opportunités sportives et récréatives.',
      arts_entertainment: 'Découvrez les événements artistiques et culturels locaux.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'Consultez et gérez vos ressources favorites',
    searchYourBookmarks: 'Recherchez dans vos favoris...',
    showingBookmarks: 'Affichage de {{count}} sur {{total}} ressources favorites',
    showingBookmarksPaginated: 'Affichage de {{start}}-{{end}} sur {{total}} favoris',
    failedToLoadBookmarks: 'Échec du chargement des favoris. Veuillez réessayer.',
    bookmarkedOn: 'Ajouté aux favoris le',
    noBookmarksMatchFilters: 'Aucun favori ne correspond à vos filtres actuels.',
    
    // Additional UI elements - screening form
    stepOf: 'Étape {{current}} sur {{total}}',
    percentComplete: '{{percent}}% Terminé',
    previousButton: 'Précédent',
    nextButton: 'Suivant',
    creatingYourPlan: 'Création de votre plan...',
    completeAssessment: 'Terminer l\'évaluation',
    
    // Bookmarks empty state
    noBookmarksYet: 'Aucun favori pour le moment',
    startExploringBookmark: 'Commencez à explorer les ressources et ajoutez celles que vous trouvez utiles à vos favoris !',
    pageOf: 'Page {{current}} sur {{total}}',
    yourPersonalizedRoadmap: 'Votre feuille de route personnalisée',
    resourcesReadyForYou: '{{count}} ressources prêtes pour vous',
    seeMoreResources: 'Explorer toutes les ressources',
    discoveringPerfectResources: 'Découvrir Vos Ressources Parfaites',
    noRecommendationsYet: 'Vos recommandations personnalisées sont en cours de préparation. Parcourez notre annuaire des ressources pour commencer.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Page Non Trouvée',
    pageNotFoundDescription: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  },
} 