/**
 * German (de) translations
 * 
 * Professional translations with formal address using "Sie" (not informal "du")
 * Business/professional tone
 * Cultural appropriateness
 * 
 * Language: German (de-DE)
 * Locale: Germany
 */

import type { TranslationStructure } from '../types'

export const germanTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'Startseite',
    dashboard: 'Dashboard',
    adminDashboard: 'Admin-Dashboard',
    welcome: 'Willkommen',
    resources: 'Ressourcen',
    bookmarks: 'Lesezeichen',
    about: 'Über uns',
    myChecklist: 'Checkliste',
    signIn: 'Anmelden',
    signUp: 'Registrieren',
    accountSettings: 'Profil-Einstellungen',
    signOut: 'Abmelden',
    settings: 'Einstellungen',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Willkommen bei Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: 'Willkommen bei',
    heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Ihr persönlicher Leitfaden für den Start eines neuen Lebens in Pittsburgh — Kostenlos, Privat, Mehrsprachig',
    heroExtendedDescription: 'Ziehen Sie nach Pittsburgh? Verbringen Sie keine Stunden damit, Dutzende von Websites zu durchsuchen oder immer wieder dieselben Fragen zu stellen. Pittsburgh Tomorrow Pioneer ist Ihr persönlicher, kostenloser Leitfaden für jede Ressource, die Neuankömmlingen hilft, sich schnell und selbstbewusst niederzulassen — von Wohnung und Schulen bis hin zu Sprache, Glauben und Gemeinschaftsleben. Es ist der vollständigste, zeitsparendste und einladendste Weg, um Ihr neues Kapitel in Pittsburgh zu beginnen.',
    howCanWeHelp: 'Wie können wir Ihnen heute helfen?',
    howCanWeHelpSubtitle: 'Wählen Sie Ihren Weg, um personalisierte Empfehlungen zu erhalten',
    createRoadmapTitle: 'Erstellen Sie Ihre Roadmap',
    createRoadmapDescription: 'Nehmen Sie an einer kurzen Umfrage teil, um einen personalisierten Aktionsplan zu erhalten, der auf Ihre spezifischen Bedürfnisse und Ziele zugeschnitten ist.',
    getStarted: 'Loslegen',
    browseResourcesTitle: 'Ressourcen durchsuchen',
    browseResourcesDescription: 'Erkunden Sie unser umfassendes Verzeichnis von Dienstleistungen, Organisationen und Ressourcen, die nach Kategorien organisiert sind.',
    exploreDirectory: 'Verzeichnis erkunden',
    askBridgetTitle: 'BRIDGIT fragen',
    askBridgetDescription: 'Erhalten Sie sofortige Antworten auf Ihre Fragen von unserem KI-Assistenten. 24/7 in Ihrer bevorzugten Sprache verfügbar.',
    startChatting: 'Chat starten',
    saveProgressQuestion: 'Möchten Sie Ihren Fortschritt speichern und auf personalisierte Funktionen zugreifen?',
    signIn: 'Anmelden',
    createAccount: 'Konto erstellen',
    servicesNote: 'Alle Dienstleistungen sind vollständig kostenlos, streng vertraulich und in 16+ Sprachen verfügbar, einschließlich Englisch, Spanisch, Arabisch, Französisch, Chinesisch und Swahili.',
    
    // Trust badges
    hundredPercentFree: '100% kostenlos',
    privateSecure: 'Privat & sicher',
    multilingualSupport: 'Mehrsprachige Unterstützung',
    languagesSupported: '16+ Sprachen werden unterstützt, einschließlich Spanisch, Arabisch, Französisch, Mandarin und Swahili.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'Demo-Modus',
    demoModeDescription: 'Probieren Sie Pittsburgh Tomorrow Pioneer mit verschiedenen Benutzerprofilen aus, um zu sehen, wie sich die Erfahrung an Ihre Bedürfnisse anpasst',
    whatYouExperience: 'Was Sie erleben werden',
    immigrantUser: 'Migranten-Benutzer',
    immigrantFeatures: {
      emergency: 'Notfallressourcen priorisiert',
      multilingual: 'Mehrsprachige Unterstützung',
      settlement: 'Auf Ansiedlung ausgerichtete Inhalte',
    },
    studentUser: 'Studenten-Benutzer',
    studentFeatures: {
      academic: 'Akademische Ressourcen',
      campus: 'Campus-spezifische Informationen',
      career: 'Karriereberatung',
    },
    professionalUser: 'Fachkraft-Benutzer',
    professionalFeatures: {
      networking: 'Branchennetzwerk',
      services: 'Professionelle Dienstleistungen',
      advancement: 'Karriereentwicklung',
    },
    localHelper: 'Lokaler Helfer',
    localFeatures: {
      community: 'Gemeinschaftsressourcen',
      volunteer: 'Freiwilligenmöglichkeiten',
      support: 'Unterstützungsnetzwerke',
    },
    signIn: 'Anmelden',
    
    // Authentication required page
    authenticationRequired: 'Authentifizierung erforderlich',
    loginToAccessPage: 'Sie müssen angemeldet sein, um auf diese Seite zuzugreifen.',
    
    // Login page
    emailVerified: 'E-Mail bestätigt',
    emailVerifiedDescription: 'Ihre E-Mail wurde erfolgreich bestätigt.',
    alreadySignedIn: 'Bereits angemeldet',
    redirectingToDashboard: 'Sie werden zu Ihrem Dashboard weitergeleitet...',
    signInDescription: 'Melden Sie sich an, um auf Ihre personalisierten Pittsburgh-Ressourcen und Empfehlungen zuzugreifen.',
    signInWithAuth0: 'Anmelden',
    signInHelp: 'Probleme beim Anmelden? Kontaktieren Sie den Support für Hilfe.',
    loginError: 'Anmeldefehler',
    loginErrorDescription: 'Es gab ein Problem bei der Anmeldung. Bitte versuchen Sie es erneut.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'Demo-Konten ausprobieren',
    experienceDifferentPerspectives: 'Erleben Sie Pittsburgh Tomorrow Pioneer aus verschiedenen Benutzerperspektiven',
    email: 'E-Mail:',
    password: 'Passwort:',
    loginAs: 'Als {{role}}-Benutzer anmelden',
    demoTip: 'Diese Demo-Konten zeigen verschiedene Benutzererfahrungen und personalisierte Inhalte',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'Wird überlegt...',
    curatingRecommendations: 'Personalisierte Empfehlungen werden erstellt...',
    findingResources: 'Die besten Ressourcen werden gesucht...',
    complete: 'Abgeschlossen!',
    creatingYourPlan: 'Ihr personalisierter Plan wird erstellt',
    ready: 'Bereit!',
    mayTakeAMoment: 'Dies kann einen Moment dauern, während wir Ihre Erfahrung personalisieren...',
    seeMyRecommendations: 'Meine Empfehlungen anzeigen',
    loadingHint: 'Dies kann einen Moment dauern, während wir Ihre Erfahrung personalisieren...',
  },
  
  // Screening page
  screening: {
    title: 'Erzählen Sie uns von sich',
    description: 'Beantworten Sie einige kurze Fragen, damit wir Ihren personalisierten Leitfaden für das Leben und Gedeihen in Pittsburgh erstellen können.',
    saveRoadmapBanner: 'Speichern Sie Ihre personalisierte Roadmap, indem Sie ein Konto erstellen. Sie können die Umfrage jetzt anonym durchführen und sich später anmelden, um sie zu speichern.',
    
    // Progress indicator
    progress: 'Fortschritt',
    completed: '{{count}} von {{total}} abgeschlossen',
    
    // Questions
    questions: {
      audience: {
        question: 'Was beschreibt Ihre Situation am besten?',
        options: [
          'Student/Fachkraft (besucht eine Universität in der Region Pittsburgh oder arbeitet für eine Organisation)',
          'Boomerang (habe hier früher gelebt, bin weggezogen und bin jetzt zurück in der Region Pittsburgh)',
          'Flüchtling oder vorübergehender Schutzstatus (gerade hier umgesiedelt oder von einer anderen Stadt hierher gezogen)',
          'Zugezogener (ziehe von einer anderen Stadt in den USA nach Pittsburgh)',
          'Unternehmer (baue mein eigenes Unternehmen auf)',
          'Remote-Mitarbeiter',
          'Sonstiges',
        ],
      },
      primaryLanguage: {
        question: 'Was ist Ihre Hauptsprache?',
        options: [
          'Englisch (Muttersprache/fließend)',
          'Spanisch (Español)',
          'Arabisch (العربية)',
          'Swahili (Kiswahili)',
          'Usbekisch (Oʻzbekcha)',
          'Nepalesisch/Bhutanisch (नेपाली / རྫོང་ཁ)',
          'Dari/Paschtu (دری / پښتو)',
          'Chinesisch (中文)',
          'Sonstiges',
        ],
      },
      culturalBackground: {
        question: 'Welcher kulturelle oder regionale Hintergrund beschreibt Sie am besten?',
        options: [
          'Weiß',
          'Schwarz oder afroamerikanisch (einschließlich afrikanischer und karibischer Abstammung)',
          'Hispanisch oder Latino/a/x',
          'Asiatisch (z. B. chinesisch, indisch, vietnamesisch)',
          'Naher Osten oder Nordafrika',
          'Hawaiianer oder andere pazifische Inselbewohner',
          'Amerikanischer Ureinwohner oder Alaska-Ureinwohner',
          'Afrikanisch (z. B. nigerianisch, äthiopisch, ghanaisch usw.)',
          'Karibisch (z. B. jamaikanisch, haitianisch, trinidadisch usw.)',
          'Sonstiges',
          'Möchte nicht antworten',
        ],
      },
      housingNeed: {
        question: 'Welche Art von Wohnungsunterstützung benötigen Sie?',
        options: [
          'Hilfe bei der Suche nach Stadtteilen und Wohnungen zu Marktpreisen',
          'Erschwingliche Wohnungsunterstützung und Programme',
          'Vorübergehende/Notfallwohnung',
          'Gemeinsames Wohnen/WG-Vermittlung',
          'Hilfe beim Hauskauf',
          'Ich habe bereits eine Wohnung',
        ],
      },
      professionalStatus: {
        question: 'Wie ist Ihr aktueller beruflicher Status?',
        options: [
          'Student (Bachelor/Master/Berufsschule)',
          'Technikfachkraft/Ingenieur',
          'Gesundheitswesen/Lebenswissenschaften-Fachkraft',
          'Akademiker/Forscher',
          'Auf Arbeitssuche',
          'Kürzlich abgeschlossenes Studium, auf Arbeitssuche',
          'Andere Fachkraft',
        ],
      },
      languageSupport: {
        question: 'Welche Sprachunterstützung wäre hilfreich?',
        options: [
          'Englischkurse (ESL) - Anfänger bis Mittelstufe',
          'Professionelle englische Kommunikationsfähigkeiten',
          'Dokumentenübersetzungsdienste',
          'Konversations-Englisch-Übung',
          'Keine Sprachunterstützung benötigt',
        ],
      },
      employment: {
        question: 'Welche Beschäftigungsunterstützung interessiert Sie?',
        options: [
          'Professionelles Networking und Karriereentwicklung',
          'Arbeitssuchhilfe und Lebenslauf-Hilfe',
          'Fähigkeitstraining und Zertifizierungsprogramme',
          'Branchenspezifisches Networking (Technik, Gesundheitswesen usw.)',
          'Keine Beschäftigungsunterstützung benötigt, danke',
        ],
      },
      communityPriorities: {
        question: 'Welche Gemeinschaftsverbindungen sind für Sie am wichtigsten? (Alle zutreffenden auswählen)',
        options: [
          'Professionelle Netzwerke und Branchentreffen',
          'Kulturelle und glaubensbasierte Gemeinschaften',
          'Soziale Aktivitäten und Unterhaltung',
          'Familien- und Kinderdienste',
          'Sport- und Freizeitaktivitäten',
          'Kunst- und Kulturveranstaltungen',
          'Keine davon',
        ],
      },
      immediateNeeds: {
        question: 'Was sind Ihre dringendsten Bedürfnisse? (Alle zutreffenden auswählen)',
        options: [
          'Menschen treffen und neue Freunde finden',
          'Grundlegende Dienstleistungen (Gesundheitswesen, Bankwesen, Verkehr)',
          'Schulanmeldung für Kinder',
          'Rechtliche/Einwanderungshilfe',
          'Unterstützung für psychische Gesundheit und Wohlbefinden',
          'Notfallhilfe (Essen, Unterkunft)',
          'Keine davon',
        ],
      },
      timeline: {
        question: 'Wie ist Ihr Zeitplan für die Ansiedlung in der Region Pittsburgh?',
        options: [
          'Gerade angekommen (im letzten Monat)',
          'Kürzlich angekommen (1-6 Monate)',
          'Planung, bald anzukommen (nächste 3 Monate)',
          'Langfristige Planung (6+ Monate)',
          'Bereits in der Region Pittsburgh angesiedelt',
        ],
      },
    },
    
    // Form messages
    pleaseAnswer: 'Bitte beantworten Sie diese Frage.',
    pleaseAnswerAll: 'Bitte beantworten Sie alle Fragen, um fortzufahren',
    creatingGuide: 'Ihr Leitfaden wird erstellt...',
    seePersonalizedGuide: 'Meinen personalisierten Leitfaden anzeigen',
    screeningQuestionnaire: 'Screening-Fragebogen',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'NEUANKÖMMLING-TOOLKIT',
    description: 'Finden Sie die Ressourcen und Unterstützung, die Sie benötigen, um sich in Pittsburgh niederzulassen und zu gedeihen',
    categories: {
      housingAssistance: 'Wohnungsunterstützung',
      foodAssistance: 'Nahrungsmittelunterstützung',
      entrepreneurHiringHub: 'Unternehmer & Einstellungszentrum',
      youthAdultEducation: 'Jugend- und Erwachsenenbildungsressourcen',
      eslImmigrantConnection: 'ESL & Migrantenverbindungsdienste',
      socialConnectionCulture: 'Soziale Verbindung und Kultur',
    },
    chat: {
      bridgitTitle: 'Mit BRIDGIT chatten',
      bridgitDescription: 'Erhalten Sie personalisierte Unterstützung und Beratung für Ihre Reise',
    },
  },

  // Resource search
  resources: {
    title: 'Ressourcen finden',
    searchPlaceholder: 'Ressourcen suchen...',
    allCategories: 'Alle Kategorien',
    housing: 'Wohnung',
    educationESL: 'Bildung / ESL',
    socialNetworking: 'Sozial / Networking',
    noResourcesFound: 'Keine Ressourcen gefunden, die Ihrer Suche oder Ihren Filtern entsprechen.',
    backToAllCategories: 'Zurück zu allen Kategorien',
    backToCategory: 'Zurück zu {{category}}',
    welcomeToCategory: 'Willkommen bei {{category}}',
    categoryDescription: {
      housing: 'Finden Sie Wohnungsunterstützung, Mietunterstützung und Nachbarschaftsressourcen',
      foodAssistance: 'Finden Sie Tafeln, Essensprogramme und Ernährungsunterstützung',
      entrepreneurHiring: 'Entdecken Sie Geschäftsressourcen, Arbeitsmöglichkeiten und Einstellungsunterstützung',
      youthEducation: 'Zugang zu Bildungsprogrammen, Nachhilfe und Lernressourcen',
      eslImmigrant: 'Verbinden Sie sich mit Englischkursen, Einwanderungsdiensten und kultureller Unterstützung',
      socialConnection: 'Treten Sie Gemeinschaftsgruppen, Kulturveranstaltungen und sozialen Aktivitäten bei',
    },
    refreshBookmarks: 'Lesezeichen aktualisieren (Debug)',
    compare: 'Vergleichen ({{count}}/3)',
    filterByLanguage: 'Nach Sprache filtern:',
    showingResults: '{{current}} von {{total}} Ressourcen werden angezeigt',
    categoryTitles: {
      housingProcess: 'Wohnungsprozess in Pittsburgh',
      housingProcessDescription: 'Erfahren Sie mehr über den Wohnungssuchprozess und die Anforderungen',
    },
    exploreResources: 'Ressourcen erkunden',
    categoryNotFound: 'Kategorie nicht gefunden',
    subcategoryNotFound: 'Unterkategorie nicht gefunden',
    clearFilters: 'Filter löschen',
    showingResultsFor: 'für',
    showingResultsIn: 'in',
    compareSelected: 'Ausgewählte vergleichen',
    noResourcesFoundCategory: 'Keine Ressourcen für diese Kategorie gefunden.',
    browseSubcategoryDescription: 'Durchsuchen Sie Ressourcen innerhalb dieser Unterkategorie.',
    
    // Global search
    globalSearch: {
      placeholder: 'Alle Ressourcen suchen...',
      button: 'Suchen',
    },
    searchResults: {
      title: 'Suchergebnisse',
      for: 'für',
      noResults: 'Keine Ressourcen gefunden, die Ihrer Suche entsprechen.',
      tryDifferent: 'Versuchen Sie einen anderen Suchbegriff.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'Willkommen bei',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Wohnungsprozess in Pittsburgh',
        housingProcessDesc: 'Erfahren Sie mehr über den Wohnungssuchprozess und die Anforderungen',
        neighborhoodResources: 'Nachbarschafts- und Immobilienressourcen',
        neighborhoodResourcesDesc: 'Entdecken Sie Stadtteile und Immobilieninformationen',
        housingAssistanceSubcat: 'Wohnungsunterstützung',
        housingAssistanceSubcatDesc: 'Direkte Mietunterstützung und Wohnungsunterstützungsdienste',
        
        // Food subcategories
        culturalFood: 'Kulturelles Lebensmittelzentrum',
        culturalFoodDesc: 'Internationale Märkte und kulturelle Lebensmittelressourcen',
        foodPantries: 'Tafeln',
        foodPantriesDesc: 'Notfallnahrungsmittelhilfe und Tafeln',
        groceryGuide: 'Lebensmittelladen-Führer',
        groceryGuideDesc: 'Lokale Lebensmittelläden und Einkaufshilfe',
        
        // Employment subcategories
        hiringHub: 'Sind Sie ein Migrant oder Neuankömmling auf Arbeitssuche?',
        hiringHubDesc: 'Schauen Sie sich unser Einstellungszentrum an!',
        entrepreneurship: 'Unternehmerressourcen in Pittsburgh',
        entrepreneurshipDesc: 'Geschäftsentwicklung und Startup-Ressourcen',
        
        // Education subcategories
        schoolResources: 'Suchen Sie nach Ressourcen, um eine neue Schule zu finden?',
        schoolResourcesDesc: 'Schulanmeldung und Bildungsressourcen',
        tutoring: 'Suchen Sie nach College-Vorbereitung oder einem Nachhilfelehrer?',
        tutoringDesc: 'Nachhilfedienste und College-Vorbereitung',
        gedResources: 'Möchten Sie Ihren GED erhalten?',
        gedResourcesDesc: 'GED-Vorbereitung und Erwachsenenbildung',
        
        // ESL & Immigration subcategories
        eslResources: 'Suchen Sie nach ESL-Ressourcen?',
        eslResourcesDesc: 'Englischlernen und Kurse',
        documentation: 'Dokumentationshilfe',
        documentationDesc: 'Einwanderungsunterlagen und rechtliche Unterstützung',
        basicNeeds: 'Grundbedürfnisse-Unterstützung',
        basicNeedsDesc: 'Wesentliche Dienstleistungen und Notfallunterstützung',
        
        // Social subcategories
        fosterConnection: 'Ressourcen zur Förderung von Verbindungen',
        fosterConnectionDesc: 'Soziale Gruppen und Gemeinschaftsaufbau',
        culturalResourcesSocial: 'Lebensmittel- und Kulturressourcen',
        culturalResourcesSocialDesc: 'Kulturveranstaltungen und Lebensmitteltraditionen',
        faithGroups: 'Glaubensbasierte Gruppen',
        faithGroupsDesc: 'Religiöse Gemeinschaften und spirituelle Unterstützung',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'Gemeinschaft und Zugehörigkeit',
          'culture-leisure': 'Kultur, Kunst und Spaß',
        'esl-immigrant': 'ESL und Migrantenunterstützung',
          'education-youth': 'Bildung: Erwachsene und Jugend',
        'living-essentials': 'Lebensnotwendiges',
          'work-business': 'Arbeits- und Geschäftsressourcen',
      },
      categoryDescriptions: {
        'community-belonging': 'Verbinden, teilnehmen und Gemeinschaft in Pittsburgh aufbauen',
          'culture-leisure': 'Kunst, Familienaktivitäten, Hobbys und Nachtleben erkunden',
        'esl-immigrant': 'Sprachlernen, Einwanderungshilfe und Neuankömmling-Dienstleistungen',
          'education-youth': 'Erwachsenenlernen, Nachhilfe und Jugendmöglichkeiten',
          'living-essentials': 'Wohnung, Gesundheit, Verkehr und Essen',
          'work-business': 'Arbeit, Karriereunterstützung und Geschäftsressourcen',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'Regierung',
        'civic-advocacy': 'Lokale Interessenvertretung',
        'civic-volunteer': 'Freiwilliger',
        'civic-youth': 'Jugendbeteiligung',
        religion: 'Religion',
        'social-connection': 'Soziale Verbindung',

        // Culture & Leisure
        art: 'Kunst',
        family: 'Familienfreizeit',
        'beauty-hair': 'Haarpflege / Schönheit',
        'hobby-spaces': 'Hobby-Räume',
        'night-life': 'Nachtleben',

        // ESL & Immigrant Support
        'esl-support': 'Englisch als Zweitsprache (ESL) Unterstützung',
        'general-law': 'Allgemeines Recht',
        'immigration-asylum': 'Einwanderung / Asyl',
        'refugee-immigrant-support': 'Flüchtlings- / Migrantenunterstützung',

        // Education & Youth
        'adult-education': 'Erwachsenenbildung',
        'college-prep-tutoring': 'College-Vorbereitung / Nachhilfe',
        'youth-education': 'Jugendbildung',
        'youth-programming': 'Jugendprogrammierung',

        // Living Essentials
        'food-pantries': 'Tafeln',
        'grocery-guide': 'Lebensmittelladen-Führer',
        'specialty-stores': 'Fachgeschäfte',
        'guide-discover-pittsburgh': 'Pittsburgh entdecken',
        'guide-diverse-businesses': 'Vielfältige Unternehmen',
        'guide-immigrant-services': 'Migrantendienstleistungen',
        'health-additional-support': 'Zusätzliche Unterstützung',
        'health-body-mind': 'Körper- und Geistpflege',
        'health-hospitals': 'Krankenhäuser',
        'health-nutrition': 'Ernährung',
        'health-senior-care': 'Seniorenpflege',
        'housing-buying-home': 'Haus kaufen',
        'housing-assistance': 'Wohnungsunterstützung',
        'housing-relocating': 'Umzug nach Pittsburgh',
        'housing-rent': 'Mieten',
        transportation: 'Verkehr',

        // Work & Business
        'business-development': 'Geschäftsentwicklung',
        'business-support': 'Geschäftsunterstützung',
        'career-support': 'Karriereunterstützung',
        'internship-opportunities': 'Praktikumsmöglichkeiten',
      },
      groups: {
        'civic-engagement': 'Bürgerbeteiligung',
        legal: 'Rechtlich',
        food: 'Essen',
        'pittsburgh-guides': 'Pittsburgh-Führer',
        health: 'Gesundheit',
        housing: 'Wohnung',
        transit: 'Verkehr',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'Ihre personalisierte Checkliste wird geladen...',
  },
  
  // About page
  about: {
    title: 'Über Pittsburgh Tomorrow Pioneer',
    description: 'Pittsburgh Tomorrow Pioneer ist Ihr freundlicher Leitfaden für die Ansiedlung in Pittsburgh und Allegheny County. Ob Sie eine Technikfachkraft oder ein Neuankömmling sind, der einen Neuanfang sucht, Pittsburgh Tomorrow Pioneer verbindet Sie mit lokalen Ressourcen für Wohnung, Bildung, Beschäftigung und Gemeinschaft.',
    features: [
      '161+ gemeinnützige Organisationen',
      'Personalisierte Checklisten und Roadmaps',
      'Unterstützung für sowohl unabhängige als auch traditionelle Migranten-Neuankömmlinge',
      'Einfaches Screening, um Ihre Bedürfnisse zu erfüllen',
    ],
    conclusion: 'Dieses Projekt ist eine Zusammenarbeit lokaler Partner und Freiwilliger, die sich der Aufgabe widmen, Pittsburgh für alle einladend, unterstützend und voller Möglichkeiten zu machen.',
    copyright: 'Pittsburgh Tomorrow Pioneer. Alle Rechte vorbehalten.',
    
    // AboutPage specific content
    welcomeText: 'Willkommen bei Pittsburgh Tomorrow Pioneer, Ihrem persönlichen Leitfaden für den Start eines neuen Lebens in Pittsburgh und Allegheny County. Ob Sie gerade in den USA angekommen sind oder einen neuen Job bei einem der wachsenden Unternehmen in Pittsburgh in den Bereichen Energie, Robotik, KI, Lebenswissenschaften oder Stahl angenommen haben — Pittsburgh Tomorrow Pioneer ist hier, um zu helfen. Von der Wohnungssuche bis zur Schulanmeldung Ihrer Kinder, von der Suche nach Englischkursen bis zur Verbindung mit Glaubensgemeinschaften oder lokaler Nahrungsmittelunterstützung — Pittsburgh Tomorrow Pioneer bringt alle Ressourcen, die Sie benötigen, an einem Ort zusammen.',
    
    whyPioneerTitle: 'Warum Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'Weil ein Neuanfang in einer neuen Stadt nicht bedeuten sollte, bei null anzufangen.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer bringt alles zusammen, was Sie benötigen, um ein neues Leben in Pittsburgh und Allegheny County zu beginnen — alles an einem vertrauenswürdigen, benutzerfreundlichen Ort.',
    whyPioneerText3: 'Es ist kostenlos, umfassend und darauf ausgelegt, Ihnen Stunden des Suchens, Vergleichens und Zweifelns zu ersparen. Ob Sie eine Wohnung suchen, Ihre Kinder in der Schule anmelden, Englisch lernen oder Menschen treffen möchten, die Ihren Glauben, Ihre Sprache oder Ihre Interessen teilen — Pittsburgh Tomorrow Pioneer stellt sicher, dass Sie keine einzige Gelegenheit verpassen, Ihren Umzug reibungsloser und Ihr neues Leben reicher zu gestalten.',
    whyPioneerText4: 'Wo eine Google-Suche Ihnen alles zeigt, zeigt Ihnen Pittsburgh Tomorrow Pioneer genau das, was wichtig ist.',
    whyPioneerText5: 'Wo ein KI-Chatbot Antworten bietet, gibt Ihnen Pioneer eine Roadmap.',
    whyPioneerText6: 'Wo die meisten Umzugstools bei der Logistik aufhören, beginnt Pioneer mit der Gemeinschaft.',
    whyPioneerText7: 'Es ist Pittsburgh, personalisiert.',
    
    youAreThePioneerTitle: 'Sie sind der Pioneer',
    youAreThePioneerText1: 'Sie ziehen nicht nur um — Sie beginnen etwas Neues. Ein neuer Job. Eine neue Schule. Ein neues Zuhause. Und vielleicht sogar eine neue Sprache oder Kultur. Das erfordert Mut.',
    youAreThePioneerText2: 'Wir haben Pittsburgh Tomorrow Pioneer gebaut, um Sie zu unterstützen — weil Sie der Pioneer sind. Diese Website ist hier, um Sie zu begleiten, während Sie eine Zukunft in Pittsburgh aufbauen.',
    
    howPioneerHelpsTitle: 'Wie Pittsburgh Tomorrow Pioneer hilft',
    
    madeForYouTitle: 'Für Sie gemacht — woher Sie auch kommen',
    madeForYouDescription: 'Wir wissen, dass nicht jeder Englisch als Muttersprache spricht. Deshalb unterstützt Pittsburgh Tomorrow Pioneer Dutzende von Weltsprachen, einschließlich Spanisch, Arabisch, Französisch, Chinesisch, Dari und mehr. Wenn Sie in Ihrer Muttersprache tippen, antwortet Pittsburgh Tomorrow Pioneer entsprechend.',
    
    personalRoadmapTitle: 'Erstellen Sie Ihre persönliche Roadmap',
    personalRoadmapDescription: 'Unser mächtigstes Tool ist Ihre personalisierte Roadmap — eine Checkliste, die nur für Sie erstellt wurde. Durch die Beantwortung einiger einfacher Fragen zu Ihren Bedürfnissen (Wohnung, Essen, Arbeit, Bildung usw.) erstellt Pittsburgh Tomorrow Pioneer einen maßgeschneiderten Aktionsplan, um Ihre nächsten Schritte zu unterstützen. Sie können:',
    personalRoadmapFeatures: [
      'Ihre Roadmap jederzeit anzeigen und aktualisieren',
      'Ihren Fortschritt durch Anmeldung speichern (optional)',
      'Ihre Checkliste herunterladen oder ausdrucken, um sie bei sich zu haben',
      'Ihre Roadmap überarbeiten und verfeinern, während Ihr Leben in Pittsburgh wächst'
    ],
    personalRoadmapNote: 'Wenn Sie es vorziehen, in Ihrem eigenen Tempo zu erkunden, können Sie unsere vollständige Ressourcenbibliothek ohne Anmeldung durchsuchen.',
    
    smartSupportTitle: 'Intelligente, selbstgesteuerte Unterstützung',
    smartSupportDescription: 'Pittsburgh Tomorrow Pioneer verfügt über einen freundlichen KI-Chatbot, der darauf trainiert ist, Hunderte von häufigen Fragen zu beantworten. Er kann Sie zu Ressourcen führen, erklären, wie lokale Systeme funktionieren, und Ihnen helfen, den nächsten Schritt zu tun. Es gibt auch ein vollständiges Verzeichnis mit Kontaktinformationen für unsere vertrauenswürdigen Partner — öffentliche Behörden, gemeinnützige Organisationen, Dienstleister und mehr.',
    
    trustedPartnersTitle: 'Vertrauenswürdige Partner',
    trustedPartnersDescription: 'Zugriff auf unser vollständiges Verzeichnis vertrauenswürdiger Partner — öffentliche Behörden, gemeinnützige Organisationen und Dienstleister in ganz Pittsburgh und Allegheny County. Unser Netzwerk umfasst 380+ gemeinnützige Organisationen, die bereit sind, bei Ihren spezifischen Bedürfnissen zu helfen.',
    
    privacyTitle: 'Ihre Privatsphäre, geschützt',
    privacyDescription: 'Ihre Privatsphäre und Sicherheit sind uns wichtig. Wenn Sie sich entscheiden, ein Konto zu erstellen, werden Ihre persönlichen Daten durch SOC II-konforme Sicherheitsprotokolle geschützt. Wir verkaufen oder teilen Ihre Daten niemals. Sie haben jederzeit die volle Kontrolle über Ihre Informationen.',
    
    pittsburghTomorrowTitle: 'Über Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'Pittsburgh Tomorrow Pioneer ist eine Initiative von Pittsburgh Tomorrow, einer gemeinnützigen Organisation mit der Mission, Pittsburgh zu wachsen. Wir katalysieren den neuen Geist, der das neu definiert, was der Historiker David McCullough "Amerikas unverzichtbare Stadt" nannte.',
    pittsburghTomorrowText2: 'Die Region, die Amerika von Grund auf aufgebaut hat, erlebt einen neuen Aufschwung mit neuer Vitalität und bürgerlichem Geist: Neuankömmlinge willkommen heißen, Unternehmer starten und neue Wege beschreiten. Unsere Bewegung wird von einer neuen Welle von Pionieren, Vorreitern und Risikoträgern angetrieben, die Chancen ergreifen und die Zukunft aufbauen — in Pittsburgh.',
    pittsburghTomorrowText3: 'Bei Pittsburgh Tomorrow haben wir die Mission, Pittsburgh zu wachsen. Und das bedeutet nicht nur Bevölkerungs- oder Wirtschaftswachstum; es bedeutet, den Geist unserer Stadt wiederzubeleben. Unterstützung kleiner Unternehmen und Unternehmer. Verschönerung und Erhaltung unserer Umwelt. Förderung von Kunst und Kultur. Neuankömmlinge willkommen heißen und Gemeinschaft schaffen. Stolz auf unsere Stadt sein und sie wieder auf die Karte setzen.',
    pittsburghTomorrowLink: 'Mehr erfahren',
    
    // Call to action section
    readyToStartTitle: 'Beginnen Sie Ihre Reise in Pittsburgh',
    readyToStartDescription: 'Erstellen Sie Ihre personalisierte Roadmap, um Ihnen zu helfen, sich in Ihrem neuen Zuhause niederzulassen und zu gedeihen.',
    getStarted: 'Loslegen',
    browseResources: 'Ressourcen durchsuchen',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'Zurück zu Über uns',
    title: 'Daten-Transparenz & Datenschutzerklärung',
    description: 'Bei Pittsburgh Tomorrow schätzen wir Transparenz und Ihr Vertrauen. Wir glauben, dass Sie das Recht haben, genau zu verstehen, warum wir bestimmte Informationen anfragen, wie wir sie verwenden und wie sie Ihnen nützen.',
    
    whyWeAskTitle: 'Warum wir diese Fragen stellen und wie wir Ihre Informationen verwenden:',
    whyWeAskDescription: 'Die Fragen, die wir stellen, sind darauf ausgelegt, uns zu helfen, eine maßgeschneiderte Roadmap für Sie zu erstellen. Ihre Antworten ermöglichen es uns:',
    whyWeAskBullet1: 'Relevante Ressourcen und Informationen aus unserer Datenbank abzurufen, die auf Ihre Bedürfnisse zugeschnitten sind.',
    whyWeAskBullet2: 'Sicherzustellen, dass wir Menschen gerecht über Gemeinschaften und Hintergründe hinweg erreichen.',
    whyWeAskBullet3: 'Lücken bei den Personen zu identifizieren, denen wir dienen, damit wir diejenigen besser erreichen können, die möglicherweise fehlen.',
    whyWeAskBullet4: 'Unsere KI-Tools zu verbessern, damit sie besser ausgerüstet sind, um allen Benutzern effektiv zu dienen.',
    weDoNotSell: 'Wir verkaufen Ihre Daten nicht. Wir verwenden sie ausschließlich für die oben aufgeführten Zwecke.',
    
    dataRetentionTitle: 'Datenaufbewahrung:',
    dataRetentionDescription: 'Wir speichern Ihre Informationen in unserer Datenbank, bis Sie uns mitteilen, dass Sie nicht mehr auf Ihr personalisiertes Dashboard zugreifen möchten. Danach werden Ihre Daten anonymisiert und nur zur Verbesserung unserer KI-Dienste verwendet, um anderen Neuankömmlingen in Pittsburgh zu helfen.',
    
    quomeTitle: 'Wie Quome Ihre Daten verwendet:',
    quomeDescription: 'Unsere Website wird von Quome gehostet, das bestimmte Daten sammeln kann, um die Plattform zu betreiben und zu verbessern. Sie können mehr darüber erfahren, wie Quome Ihre Daten verwendet und schützt, indem Sie',
    
    skillBuilderTitle: 'Wie Skill Builder Ihre Daten verwendet:',
    skillBuilderDescription: 'Unser Website-Chatbot wird von SkillBuilder.io gehostet, das bestimmte Daten sammeln kann, um die Plattform zu betreiben und zu verbessern. Sie können mehr darüber erfahren, wie SkillBuilder.io Ihre Daten verwendet und schützt, indem Sie',
    
    contactDescription: 'Wenn Sie Fragen zu unserer Datennutzung oder Datenschutzpraktiken haben, verwenden Sie bitte unseren Feedback-Button auf der rechten Seite jeder Seite, um uns zu kontaktieren.',
    privacyPolicyLink: 'Datenschutzerklärung'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'Über Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'Pittsburgh Tomorrow Pioneer hilft Neuankömmlingen in Pittsburgh & Allegheny County, ihren Weg zu finden. Wir verbinden Sie mit den richtigen Ressourcen und Möglichkeiten, unabhängig von Ihrer Reise.',
    quickLinks: 'Schnelllinks',
    home: 'Startseite',
    about: 'Über uns',
    resources: 'Ressourcen',
    privacyPolicy: 'Datenschutzerklärung',
    getStarted: 'Loslegen',
    contact: 'Kontakt',
    location: 'Hallo aus Pittsburgh, PA',
    email: 'E-Mail: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'Willkommen, {{name}}!',
    welcomeStudent: 'Willkommen zurück, {{name}}!',
    welcomeProfessional: 'Willkommen, {{name}}!',
    welcomeLocal: 'Hallo {{name}}!',
    
    subtitleImmigrant: 'Ihre Ansiedlungsreise beginnt hier',
    subtitleStudent: 'Ihr akademischer Erfolg ist unsere Priorität',
    subtitleProfessional: 'Ihr Karrierewachstum ist unser Fokus',
    subtitleLocal: 'Helfen Sie, Pittsburgh für alle einladend zu machen',
    
    demoUserNote: 'Sie sehen Pittsburgh Tomorrow Pioneer als **{{role}}**-Benutzer. Die Erfahrung ist für Ihre Rolle personalisiert.',
    userBadge: '{{role}}-Benutzer',
    
    urgentResources: 'Dringende Ressourcen',
    
    // Resource categories
    emergencyServices: 'Notdienste',
    emergencyDescription: '24/7 Krisenunterstützung und sofortige Hilfe',
    temporaryHousing: 'Vorübergehende Wohnung',
    temporaryHousingDescription: 'Unterkunft und Wohnungsunterstützungsprogramme',
    healthcareAccess: 'Gesundheitszugang',
    healthcareDescription: 'Medizinische Dienstleistungen und Krankenversicherungshilfe',
    languageServices: 'Sprachdienste',
    languageServicesDescription: 'Übersetzungs- und Dolmetschunterstützung',
    
    // Additional resource categories for other roles
    academicSupport: 'Akademische Unterstützung',
    academicSupportDescription: 'Nachhilfe, Lerngruppen und akademische Ressourcen',
    studentHousing: 'Studentenwohnung',
    studentHousingDescription: 'Wohnmöglichkeiten auf dem Campus und außerhalb des Campus',
    financialAid: 'Finanzielle Unterstützung',
    financialAidDescription: 'Stipendien, Zuschüsse und finanzielle Unterstützung',
    studentGroups: 'Studentengruppen',
    studentGroupsDescription: 'Internationale Studentenorganisationen und Clubs',
    professionalNetworks: 'Professionelle Netzwerke',
    professionalNetworksDescription: 'Branchentreffen und Networking-Veranstaltungen',
    careerDevelopment: 'Karriereentwicklung',
    careerDevelopmentDescription: 'Fähigkeitstraining und Zertifizierungsprogramme',
    professionalHousing: 'Professionelle Wohnung',
    professionalHousingDescription: 'Führungskräftewohnung und Umzugsdienste',
    mentorship: 'Mentoring',
    mentorshipDescription: 'Professionelle Mentoring- und Beratungsprogramme',
    volunteerOpportunities: 'Freiwilligenmöglichkeiten',
    volunteerOpportunitiesDescription: 'Möglichkeiten, Neuankömmlingen in Ihrer Gemeinschaft zu helfen',
    communityOrganizations: 'Gemeinschaftsorganisationen',
    communityOrganizationsDescription: 'Lokale gemeinnützige Organisationen und Dienstleister',
    supportNetworks: 'Unterstützungsnetzwerke',
    supportNetworksDescription: 'Mentoring- und Freundschaftsprogramme',
    culturalExchange: 'Kulturaustausch',
    culturalExchangeDescription: 'Interkulturelle Veranstaltungen und Programme',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'Melden Sie sich an, um Ihre personalisierte Pittsburgh-Reise zu erkunden',
    signInToPioneer: 'Bei Pittsburgh Tomorrow Pioneer anmelden',
    welcomeTitle: 'Willkommen bei Pittsburgh Tomorrow Pioneer, {{name}}!',
    welcomeTitleWithoutName: 'Willkommen bei Pittsburgh Tomorrow Pioneer!',
    journeyContinues: 'Ihre personalisierte Reise setzt sich fort...',
    beginJourney: 'Beginnen Sie Ihre personalisierte Pittsburgh-Reise',
    completedSurveyHeader: 'Sie haben die Umfrage bereits abgeschlossen',
    completedSurveyText: 'Sie haben Ihre Onboarding-Umfrage abgeschlossen. Zeigen Sie unten Ihre personalisierte Roadmap an oder bearbeiten Sie Ihre Antworten, um Ihre Empfehlungen zu aktualisieren.',
    completedSurveyTextWithDate: 'Sie haben Ihre Onboarding-Umfrage am {{date}} abgeschlossen. Zeigen Sie unten Ihre personalisierte Roadmap an oder bearbeiten Sie Ihre Antworten, um Ihre Empfehlungen zu aktualisieren.',
    editResponses: 'Antworten bearbeiten',
    viewMyRoadmap: 'Meine Roadmap anzeigen',
    noteLabel: 'Hinweis:',
    editRegenerateNote: 'Wenn Sie Ihre Umfrageantworten bearbeiten, werden Ihre personalisierten Empfehlungen und Roadmap automatisch neu generiert, um besser zu Ihren aktualisierten Präferenzen zu passen.',
    bridgitHelp: 'Haben Sie Fragen, die von der Umfrage nicht abgedeckt werden? Klicken Sie auf den BRIDGIT-Chatbot unten rechts für personalisierte Unterstützung!',
    personalizedRoadmap: 'Ihre personalisierte Roadmap',
    unlockExperience: 'Entsperren Sie Ihre angepasste Erfahrung',
    completeSurveyHeader: 'Schließen Sie Ihre Umfrage ab, um zu beginnen',
    completeSurveyText: 'Nehmen Sie an unserer schnellen 5-Minuten-Umfrage teil, um personalisierte Ressourcenempfehlungen zu erhalten, die speziell auf Ihre Bedürfnisse und Ziele in Pittsburgh zugeschnitten sind.',
  },
  
  // Profile page
  profile: {
    title: 'Profil-Einstellungen',
    subtitle: 'Verwalten Sie Ihre persönlichen Informationen und Präferenzen',
    accountInformation: 'Kontoinformationen',
    accountInformationDescription: 'Aktualisieren Sie Ihre grundlegenden Kontodetails',
    basicInformation: 'Grundinformationen',
    basicInformationDescription: 'Aktualisieren Sie Ihre grundlegenden persönlichen Details',
    firstName: 'Vorname',
    enterFirstName: 'Geben Sie Ihren Vornamen ein',
    lastName: 'Nachname',
    enterLastName: 'Geben Sie Ihren Nachnamen ein',
    username: 'Benutzername',
    enterUsername: 'Geben Sie Ihren Benutzernamen ein',
    email: 'E-Mail',
    emailChangeNote: 'E-Mail kann nicht geändert werden. Kontaktieren Sie den Support, wenn Sie Ihre E-Mail aktualisieren müssen.',
    emailCannotBeChanged: 'E-Mail kann nicht geändert werden. Kontaktieren Sie den Support, wenn Sie Ihre E-Mail aktualisieren müssen.',
    surveyRequired: 'Schließen Sie zuerst Ihre Umfrage ab',
    surveyRequiredDescription: 'Um personalisierte Empfehlungen zu erhalten und Ihre Umfrageantworten zu bearbeiten, müssen Sie zuerst die erste Bewertungsumfrage abschließen.',
    takeSurvey: 'Umfrage durchführen',
    basicQuestions: 'Grundinformationen',
    basicQuestionsDescription: 'Erzählen Sie uns von sich und Ihrer Situation, um personalisierte Empfehlungen zu erhalten',
    selectPrimary: 'Wählen Sie Ihre Hauptpräferenz:',
    selectOption: 'Wählen Sie eine Option...',
    supportNeeds: 'Unterstützung & Bedürfnisse',
    supportNeedsDescription: 'Welche Art von Unterstützung und Dienstleistungen benötigen Sie?',
    selectMultiple: 'Wählen Sie alle zutreffenden aus:',
    selectAtLeastOne: 'Bitte wählen Sie mindestens eine Option aus.',
    timelinePreferences: 'Zeitplan & Präferenzen',
    timelinePreferencesDescription: 'Ihr Zeitplan und Ihre Technologiepräferenzen',
    backToDashboard: 'Zurück zum Dashboard',
    languageAndCultural: 'Sprache & kultureller Hintergrund',
    languageAndCulturalDescription: 'Helfen Sie uns, bessere personalisierte Empfehlungen zu bieten',
    primaryLanguage: 'Hauptsprache',
    selectPrimaryLanguage: 'Wählen Sie Ihre Hauptsprache',
    culturalBackground: 'Kultureller Hintergrund',
    selectCulturalBackground: 'Wählen Sie Ihren kulturellen Hintergrund',
    professionalAndLiving: 'Berufliche & Lebenssituation',
    professionalAndLivingDescription: 'Dies hilft uns, relevante Ressourcen und Dienstleistungen zu empfehlen',
    professionalStatus: 'Beruflicher Status',
    selectProfessionalStatus: 'Wählen Sie Ihren beruflichen Status',
    housingSituation: 'Wohnsituation',
    selectHousingSituation: 'Wählen Sie Ihre Wohnsituation',
    familyStatus: 'Familienstatus',
    selectFamilyStatus: 'Wählen Sie Ihren Familienstatus',
    saveChanges: 'Änderungen speichern',
    saving: 'Wird gespeichert...',
    recalculatingRecommendations: 'Empfehlungen werden neu berechnet...',
    profileUpdated: 'Profil aktualisiert',
    profileUpdatedDescription: 'Ihr Profil wurde erfolgreich aktualisiert.',
    accountUpdated: 'Konto aktualisiert',
    accountUpdatedDescription: 'Ihre Kontoinformationen wurden erfolgreich aktualisiert. Schließen Sie die Umfrage ab, um Ihre Präferenzen zu speichern.',
    updateFailed: 'Aktualisierung fehlgeschlagen',
    updateFailedDescription: 'Profil konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.',
    pleaseLogIn: 'Bitte melden Sie sich an, um Ihr Profil anzuzeigen.',
    
    // Language options
    languages: {
      english: 'Englisch',
      spanish: 'Spanisch',
      french: 'Französisch',
      arabic: 'Arabisch',
      chinese: 'Chinesisch',
      swahili: 'Swahili',
      hindi: 'Hindi',
      portuguese: 'Portugiesisch',
      russian: 'Russisch',
      nepali: 'Nepalesisch',
      somali: 'Somali',
      tagalog: 'Tagalog',
      turkish: 'Türkisch',
      other: 'Sonstiges',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'Amerikanisch/Westlich',
      westAfrican: 'Westafrikanisch',
      middleEasternNorthAfrican: 'Naher Osten/Nordafrika',
      southAsian: 'Südasiatisch (einschließlich Bhutanisch)',
      latinoHispanic: 'Latino/Hispanisch',
      eastAsian: 'Ostasiatisch',
      easternEuropean: 'Osteuropäisch',
      other: 'Sonstiges/Möchte nicht sagen',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'Student',
      graduateStudent: 'Absolvent',
      softwareEngineer: 'Software-Ingenieur',
      healthcareProfessional: 'Gesundheitsfachkraft',
      researchScientist: 'Forschungswissenschaftler',
      seekingEmployment: 'Auf Arbeitssuche',
      employedFullTime: 'Vollzeit beschäftigt',
      employedPartTime: 'Teilzeit beschäftigt',
      selfEmployed: 'Selbstständig',
      retired: 'Im Ruhestand',
      other: 'Sonstiges',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Vorübergehende Wohnung',
      campusHousing: 'Campus-Wohnung',
      apartmentHunting: 'Wohnungssuche',
      rentingApartment: 'Wohnung mieten',
      rentingHouse: 'Haus mieten',
      homeowner: 'Hauseigentümer',
      livingWithFamily: 'Bei Familie wohnen',
      sharedHousing: 'Gemeinsames Wohnen',
      other: 'Sonstiges',
    },
    
    // Family status options
    familyStatuses: {
      single: 'Ledig',
      married: 'Verheiratet',
      familyWithChildren: 'Familie mit Kindern',
      singleParent: 'Alleinerziehend',
      extendedFamily: 'Großfamilie',
      other: 'Sonstiges',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'Wie sollen wir Sie nennen?',
    description: 'Helfen Sie uns, Ihre Erfahrung zu personalisieren, indem Sie uns Ihren Namen mitteilen.',
    firstName: 'Vorname',
    firstNamePlaceholder: 'Geben Sie Ihren Vornamen ein',
    lastName: 'Nachname',
    lastNamePlaceholder: 'Geben Sie Ihren Nachnamen ein (optional)',
    skip: 'Vorerst überspringen',
    save: 'Namen speichern',
    saving: 'Wird gespeichert...',
    firstNameRequired: 'Vorname erforderlich',
    firstNameRequiredDescription: 'Bitte geben Sie Ihren Vornamen ein, um fortzufahren.',
    nameUpdated: 'Name aktualisiert',
    nameUpdatedDescription: 'Ihr Name wurde erfolgreich gespeichert.',
    updateFailed: 'Aktualisierung fehlgeschlagen',
    updateFailedDescription: 'Name konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.',
  },
  
  // Common elements
  common: {
    dashboard: 'Dashboard',
    loading: 'Wird geladen...',
    search: 'Suchen',
    filter: 'Filter',
    next: 'Weiter',
    previous: 'Zurück',
    save: 'Speichern',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    close: 'Schließen',
    back: 'Zurück',
    backToResources: 'Zurück zu Ressourcen',
    viewDetails: 'Details anzeigen',
    learnMore: 'Mehr erfahren',
    getHelp: 'Hilfe erhalten',
    startNow: 'Jetzt starten',
    tryNow: 'Jetzt ausprobieren',
    downloadNow: 'Jetzt herunterladen',
    visitWebsite: 'Besuchen',
    shareThis: 'Dies teilen',
    copied: 'Kopiert!',
    copy: 'Kopieren',
    show: 'Anzeigen',
    hide: 'Ausblenden',
    expand: 'Erweitern',
    collapse: 'Einklappen',
    seeMore: 'Mehr anzeigen',
    seeLess: 'Weniger anzeigen',
    showingTopOf: 'Top {{current}} von {{total}} Ressourcen werden angezeigt',
    selectLanguage: 'Sprache auswählen',
    personalizedRecommendationsLabel: 'Personalisierte Empfehlungen',
    exploreResourcesNowLabel: 'Jetzt Ressourcen erkunden',
    curatedAdviceLabel: 'Kuratierter Rat für Erfolg',
    
    // Accessibility and UI labels
    toggleSidebar: 'Sidebar umschalten',
    toggleMobileMenu: 'Mobiles Menü umschalten',
    feedback: 'Feedback',
    openInNewTab: 'In neuem Tab öffnen',
    removeBookmark: 'Lesezeichen entfernen',
    editResource: 'Ressource bearbeiten',
    deleteResource: 'Ressource löschen',
    dragToReorder: 'Zum Neuordnen ziehen',
    saveOrPrintOptions: 'Speichern oder Drucken Optionen',
    filterByCategory: 'Nach Kategorie filtern',
    openChatAssistant: 'Chat mit BRIDGIT KI-Assistenten öffnen',
    askBridget: 'BRIDGIT fragen',
    bridgitComingSoonTitle: 'BRIDGIT: Kommt bald!',
    bridgitComingSoonDescription: 'Unser KI-Assistent BRIDGIT befindet sich derzeit in der Entwicklung. Bleiben Sie dran für Updates!',
    
    // Content section headers
    description: 'Beschreibung',
    services: 'Dienstleistungen',
    languages: 'Sprachen',
    languagesSupported: 'Unterstützte Sprachen',
    available: 'Verfügbar',
    resources: 'Ressourcen',
    exploreResources: 'Ressourcen erkunden',
    
    // Admin interface
    authenticationRequired: 'Authentifizierung erforderlich',
    organizationName: 'Organisationsname',
    website: 'Website',
    shortDescription: 'Kurze Beschreibung',
    fullDescription: 'Vollständige Beschreibung',
    affiliation: 'Zugehörigkeit',
    financialData: 'Finanzdaten',
    serviceDetails: 'Dienstleistungsdetails',
    categories: 'Kategorien',
    servicesProvided: 'Bereitgestellte Dienstleistungen',
    totalResources: 'Gesamtressourcen',
    publishingStatus: 'Veröffentlichungsstatus',
    totalUsers: 'Gesamtbenutzer',
    adminUsers: 'Admin-Benutzer',
    demoUsers: 'Demo-Benutzer',
    noResourcesFound: 'Keine Ressourcen gefunden',
    
    // Form placeholders
    placeholders: {
      organizationName: 'Organisationsname',
      briefDescription: 'Kurze Beschreibung',
      detailedDescription: 'Detaillierte Beschreibung von Dienstleistungen und Programmen',
      organizationAffiliation: 'Organisationszugehörigkeit oder Netzwerk',
      partnersCollaborating: 'Liste der Partner und zusammenarbeitenden Organisationen',
      availableOnline: 'Online verfügbar',
    },
    
    // Additional UI elements
    backToHome: 'Zurück zur Startseite',
    goHome: 'Zur Startseite',
    browseResources: 'Ressourcen durchsuchen',
    needPersonalizedRecommendations: 'Benötigen Sie personalisierte Empfehlungen?',
    personalizedRecommendationsDescription: 'Nehmen Sie an unserem schnellen Screening teil, um eine angepasste Checkliste mit Ressourcen zu erhalten, die speziell für Ihre Bedürfnisse ausgewählt wurden.',
    getYourPersonalRoadmap: 'Erhalten Sie Ihre persönliche Roadmap',
    allRightsReserved: 'Alle Rechte vorbehalten',
    initiativeOfPittsburghTomorrow: 'Eine Initiative von Pittsburgh Tomorrow',
    viewingAsUserNotification: 'Sie sehen Pittsburgh Tomorrow Pioneer als {{role}}-Benutzer. Die Erfahrung ist für Ihre Rolle personalisiert.',
    priorityResourcesForYou: 'Prioritätsressourcen für Sie',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'Basierend auf Ihren Umfrageantworten benötigen Sie derzeit keine spezifische Unterstützung. Wenn sich Ihre Situation ändert, können Sie Ihr Profil aktualisieren. Ansonsten können Sie gerne alle verfügbaren Ressourcen erkunden.',
    editProfile: 'Profil aktualisieren',
    exploreAllResources: 'Alle Ressourcen erkunden',
    
    // Priority Categories
    priorityCategories: {
      housing: 'Wohnung',
      education: 'Bildung', 
      income: 'Einkommen',
      first_things_first: 'Das Wichtigste zuerst',
      meeting_people: 'Menschen treffen',
      kids_activities: 'Kinderaktivitäten',
      faith_communities: 'Glaubensgemeinschaften',
      sports_wellness: 'Sport und Wellness',
      arts_entertainment: 'Kunst und Unterhaltung',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'Erschwingliche Wohnung und finanzielle Unterstützung finden.',
      education: 'Professionelle englische und andere Sprachunterstützung.',
      income: 'Unterstützung bei der Arbeitssuche und Kompetenzentwicklung.',
      first_things_first: 'Unterstützung bei Notfallhilfe, psychischer Gesundheit und Anmeldung.',
      meeting_people: 'Verbinden Sie sich über professionelle Netzwerke und soziale Veranstaltungen.',
      kids_activities: 'Familien- und Kinderprogramme verfügbar.',
      faith_communities: 'Lokale Glaubens- und Kulturgruppen finden.',
      sports_wellness: 'Sport- und Freizeitmöglichkeiten erkunden.',
      arts_entertainment: 'Lokale Kunst- und Kulturveranstaltungen entdecken.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'Ihre mit Lesezeichen versehenen Ressourcen anzeigen und verwalten',
    searchYourBookmarks: 'Ihre Lesezeichen durchsuchen...',
    showingBookmarks: '{{count}} von {{total}} mit Lesezeichen versehenen Ressourcen werden angezeigt',
    showingBookmarksPaginated: '{{start}}-{{end}} von {{total}} Lesezeichen werden angezeigt',
    failedToLoadBookmarks: 'Lesezeichen konnten nicht geladen werden. Bitte versuchen Sie es erneut.',
    bookmarkedOn: 'Mit Lesezeichen versehen am',
    noBookmarksMatchFilters: 'Keine Lesezeichen entsprechen Ihren aktuellen Filtern.',
    
    // Additional UI elements - screening form
    stepOf: 'Schritt {{current}} von {{total}}',
    percentComplete: '{{percent}}% abgeschlossen',
    previousButton: 'Zurück',
    nextButton: 'Weiter',
    creatingYourPlan: 'Ihr Plan wird erstellt...',
    completeAssessment: 'Bewertung abschließen',
    
    // Bookmarks empty state
    noBookmarksYet: 'Noch keine Lesezeichen',
    startExploringBookmark: 'Beginnen Sie, Ressourcen zu erkunden und diejenigen mit Lesezeichen zu versehen, die Sie nützlich finden!',
    pageOf: 'Seite {{current}} von {{total}}',
    yourPersonalizedRoadmap: 'Ihre personalisierte Roadmap',
    resourcesReadyForYou: '{{count}} Ressourcen bereit für Sie',
    seeMoreResources: 'Alle Ressourcen erkunden',
    discoveringPerfectResources: 'Ihre perfekten Ressourcen werden entdeckt',
    noRecommendationsYet: 'Ihre personalisierten Empfehlungen werden vorbereitet. Erkunden Sie unser Ressourcenverzeichnis, um zu beginnen.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Seite nicht gefunden',
    pageNotFoundDescription: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
  },
}
