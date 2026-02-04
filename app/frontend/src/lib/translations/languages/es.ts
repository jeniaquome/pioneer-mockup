import type { TranslationStructure } from '../types'

export const spanishTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'Inicio',
    dashboard: 'Panel de Control',
    adminDashboard: 'Panel de Administración',
    welcome: 'Bienvenida',
    resources: 'Recursos',
    bookmarks: 'Mis Recursos Guardados',
    about: 'Acerca de',
    myChecklist: 'Mi Lista de Tareas',
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    accountSettings: 'Configuración de Perfil',
    signOut: 'Cerrar Sesión',
    settings: 'Configuración',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Bienvenido a Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: 'Bienvenido a',
    heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Su guía personal para comenzar una nueva vida en Pittsburgh — Gratis, Privado, Multilingüe',
    heroExtendedDescription: '¿Se muda a Pittsburgh? No pase horas buscando en docenas de sitios web ni haciendo las mismas preguntas una y otra vez. Pittsburgh Tomorrow Pioneer es su guía personal y gratuita para cada recurso que ayuda a los recién llegados a establecerse de manera rápida y segura — desde vivienda y escuelas hasta idioma, fe y vida comunitaria. Es la forma más completa, que ahorra tiempo y es acogedora para comenzar su nuevo capítulo en Pittsburgh.',
    howCanWeHelp: '¿Cómo podemos ayudarle hoy?',
    howCanWeHelpSubtitle: 'Elija su camino para obtener recomendaciones personalizadas',
    createRoadmapTitle: 'Cree Su Hoja de Ruta',
    createRoadmapDescription: 'Responda una breve encuesta para recibir un plan de acción personalizado adaptado a sus necesidades y objetivos específicos.',
    getStarted: 'Comenzar',
    browseResourcesTitle: 'Explorar Recursos',
    browseResourcesDescription: 'Explore nuestro directorio integral de servicios, organizaciones y recursos organizados por categoría.',
    exploreDirectory: 'Explorar Directorio',
    askBridgetTitle: 'Preguntar a BRIDGIT',
    askBridgetDescription: 'Obtenga respuestas instantáneas a sus preguntas de nuestro asistente de IA. Disponible 24/7 en su idioma preferido.',
    startChatting: 'Comenzar a Conversar',
    saveProgressQuestion: '¿Desea guardar su progreso y acceder a funciones personalizadas?',
    signIn: 'Iniciar Sesión',
    createAccount: 'Crear Cuenta',
    servicesNote: 'Todos los servicios son completamente gratuitos, estrictamente confidenciales y están disponibles en más de 16 idiomas, incluyendo inglés, español, árabe, francés, chino y suajili.',
    
    // Trust badges
    hundredPercentFree: '100% Gratis',
    privateSecure: 'Privado y Seguro',
    multilingualSupport: 'Soporte Multilingüe',
    languagesSupported: 'Más de 16 idiomas disponibles, incluyendo español, árabe, francés, mandarín y suajili.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'Modo de Demostración',
    demoModeDescription: 'Pruebe Pittsburgh Tomorrow Pioneer con diferentes perfiles de usuario para ver cómo la experiencia se adapta a sus necesidades',
    whatYouExperience: 'Lo Que Experimentará',
    immigrantUser: 'Usuario Inmigrante',
    immigrantFeatures: {
      emergency: 'Recursos de emergencia priorizados',
      multilingual: 'Soporte multilingüe',
      settlement: 'Contenido enfocado en el asentamiento',
    },
    studentUser: 'Usuario Estudiante',
    studentFeatures: {
      academic: 'Recursos académicos',
      campus: 'Información específica del campus',
      career: 'Orientación profesional',
    },
    professionalUser: 'Usuario Profesional',
    professionalFeatures: {
      networking: 'Redes de la industria',
      services: 'Servicios profesionales',
      advancement: 'Avance profesional',
    },
    localHelper: 'Ayudante Local',
    localFeatures: {
      community: 'Recursos comunitarios',
      volunteer: 'Oportunidades de voluntariado',
      support: 'Redes de apoyo',
    },
    signIn: 'Iniciar Sesión',
    
    // Authentication required page
    authenticationRequired: 'Autenticación Requerida',
    loginToAccessPage: 'Necesita iniciar sesión para acceder a esta página.',
    
    // Login page
    emailVerified: 'Correo Verificado',
    emailVerifiedDescription: 'Su correo electrónico ha sido verificado exitosamente.',
    alreadySignedIn: 'Ya Inició Sesión',
    redirectingToDashboard: 'Redirigiendo a su panel de control...',
    signInDescription: 'Inicie sesión para acceder a sus recursos y recomendaciones personalizadas de Pittsburgh.',
    signInWithAuth0: 'Iniciar Sesión',
    signInHelp: '¿Tiene problemas para iniciar sesión? Contacte soporte para asistencia.',
    loginError: 'Error de Inicio de Sesión',
    loginErrorDescription: 'Hubo un problema al iniciar sesión. Por favor, intente de nuevo.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'Probar Cuentas de Demostración',
    experienceDifferentPerspectives: 'Experimente Pittsburgh Tomorrow Pioneer desde diferentes perspectivas de usuario',
    email: 'Correo electrónico:',
    password: 'Contraseña:',
    loginAs: 'Iniciar sesión como usuario {{role}}',
    demoTip: 'Estas cuentas de demostración muestran diferentes experiencias de usuario y contenido personalizado',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'Pensando...',
    curatingRecommendations: 'Seleccionando recomendaciones personalizadas...',
    findingResources: 'Encontrando los mejores recursos...',
    complete: '¡Completo!',
    creatingYourPlan: 'Creando Su Plan Personalizado',
    ready: '¡Listo!',
    mayTakeAMoment: 'Esto puede tomar un momento mientras personalizamos su experiencia...',
    seeMyRecommendations: 'Ver mis recomendaciones',
    loadingHint: 'Esto puede tomar un momento mientras personalizamos su experiencia...',
  },
  
  // Screening page
  screening: {
    title: 'Cuéntenos sobre usted',
    description: 'Responda algunas preguntas rápidas para que podamos crear su guía personalizada para vivir y prosperar en Pittsburgh.',
    saveRoadmapBanner: 'Guarde su hoja de ruta personalizada creando una cuenta. Puede realizar la encuesta de forma anónima ahora y luego iniciar sesión para guardarla.',
    
    // Progress indicator
    progress: 'Progreso',
    completed: '{{count}} de {{total}} completadas',
    
    // Questions
    questions: {
      audience: {
        question: '¿Cuál describe mejor su situación?',
        options: [
          'Estudiante o profesional (asiste a una universidad de la región de Pittsburgh o trabaja para una organización)',
          'Boomerang (viví aquí antes, me mudé y ahora he regresado al área de Pittsburgh)',
          'Refugiado/a o con Estatus de Protección Temporal (acabo de ser reasentado/a aquí o me mudé desde otra ciudad)',
          'Trasplantado/a (mudándose a Pittsburgh desde otra ciudad de los EE.UU.)',
          'Emprendedor/a (construyendo mi propio negocio)',
          'Empleado/a remoto/a',
          'Otro',
        ],
      },
      primaryLanguage: {
        question: '¿Cuál es su idioma principal?',
        options: [
          'Inglés (English)',
          'Español',
          'Árabe (العربية)',
          'Suajili (Kiswahili)',
          'Uzbeko (Oʻzbekcha)',
          'Nepalí/Butanés (नेपाली / རྫོང་ཁ)',
          'Darí/Pastún (دری / پښتو)',
          'Chino mandarín (中文)',
          'Otro',
        ],
      },
      culturalBackground: {
        question: '¿Qué trasfondo cultural o regional le describe mejor?',
        options: [
          'Blanco/a',
          'Negro/a o Afroestadounidense (incluye descendencia africana y caribeña)',
          'Hispano/a o Latino/a/x',
          'Asiático/a (p. ej., chino, indio, vietnamita)',
          'Medio Oriente o Norte de África',
          'Nativo/a de Hawái u Otro Isleño/a del Pacífico',
          'Nativo/a Americano/a o Nativo/a de Alaska',
          'Africano/a (p. ej., nigeriano/a, etíope, ghanés/esa, etc.)',
          'Caribeño/a (p. ej., jamaicano/a, haitiano/a, trinitense, etc.)',
          'Otro',
          'Prefiero no responder',
        ],
      },
      housingNeed: {
        question: '¿Qué tipo de apoyo de vivienda necesita?',
        options: [
          'Ayuda para encontrar vecindarios y apartamentos a precio de mercado',
          'Asistencia de vivienda asequible y programas',
          'Vivienda temporal/de emergencia',
          'Vivienda compartida/búsqueda de compañero de cuarto',
          'Ayuda para intentar comprar una casa',
          'Tengo vivienda asegurada',
        ],
      },
      professionalStatus: {
        question: '¿Cuál es su estado profesional actual?',
        options: [
          'Estudiante (pregrado/posgrado/escuela técnica)',
          'Profesional de tecnología/ingeniero',
          'Profesional de salud/ciencias de la vida',
          'Académico/investigador',
          'Buscando empleo',
          'Graduado reciente buscando trabajo',
          'Otro profesional',
        ],
      },
      languageSupport: {
        question: '¿Qué apoyo de idioma sería útil?',
        options: [
          'Clases de inglés (ESL) - principiante a intermedio',
          'Habilidades de comunicación profesional en inglés',
          'Servicios de traducción de documentos',
          'Práctica conversacional en inglés',
          'No necesito apoyo de idioma',
        ],
      },
      employment: {
        question: '¿Qué apoyo de empleo le interesa?',
        options: [
          'Redes profesionales y avance profesional',
          'Asistencia de búsqueda de empleo y ayuda con currículum',
          'Programas de capacitación y certificación de habilidades',
          'Redes específicas de la industria (tecnología, salud, etc.)',
          'No necesito apoyo de empleo, Gracias',
        ],
      },
      communityPriorities: {
        question: '¿Qué conexiones comunitarias son más importantes para usted? (Seleccione todas las que apliquen)',
        options: [
          'Redes profesionales y reuniones de la industria',
          'Comunidades culturales y basadas en la fe',
          'Actividades sociales y entretenimiento',
          'Servicios familiares y para niños',
          'Actividades deportivas y recreativas',
          'Eventos artísticos y culturales',
          'Ninguna de estas',
        ],
      },
      immediateNeeds: {
        question: '¿Cuáles son sus necesidades más inmediatas? (Seleccione todas las que apliquen)',
        options: [
          'Conocer gente y hacer nuevos amigos',
          'Servicios básicos (salud, banca, transporte)',
          'Inscripción escolar para niños',
          'Asistencia legal/de inmigración',
          'Apoyo de salud mental y bienestar',
          'Asistencia de emergencia (comida, refugio)',
          'Ninguna de estas',
        ],
      },
      timeline: {
        question: '¿Cuál es su cronograma para establecerse en el área de Pittsburgh?',
        options: [
          'Acabo de llegar (dentro del último mes)',
          'Llegué recientemente (1-6 meses)',
          'Planeo llegar pronto (próximos 3 meses)',
          'Planificación a largo plazo (6+ meses)',
          'Ya establecido/a en el área de Pittsburgh',
        ],
      },
      // techComfort removed
    },
    
    // Form messages
    pleaseAnswer: 'Por favor responda esta pregunta.',
    pleaseAnswerAll: 'Por favor responda todas las preguntas para continuar',
    creatingGuide: 'Creando Su Guía...',
    seePersonalizedGuide: 'Ver Mi Guía Personalizada',
    screeningQuestionnaire: 'Cuestionario de Evaluación',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'CONJUNTO DE HERRAMIENTAS PARA RECIÉN LLEGADOS',
    description: 'Encuentre los recursos y el apoyo que necesita para establecerse y prosperar en Pittsburgh',
    categories: {
      housingAssistance: 'Asistencia de Vivienda',
      foodAssistance: 'Asistencia Alimentaria',
      entrepreneurHiringHub: 'Centro de Emprendimiento y Contratación',
      youthAdultEducation: 'Recursos de Educación para Jóvenes y Adultos',
      eslImmigrantConnection: 'Servicios de Conexión ESL e Inmigración',
      socialConnectionCulture: 'Conexión Social y Cultura',
    },
    chat: {
      bridgitTitle: 'Chatear con BRIDGIT',
      bridgitDescription: 'Obtenga asistencia personalizada y orientación para su viaje',
    },
  },

  // Resource search
  resources: {
    title: 'Encontrar Recursos',
    searchPlaceholder: 'Buscar recursos...',
    allCategories: 'Todas las Categorías',
    housing: 'Vivienda',
    educationESL: 'Educación / ESL',
    socialNetworking: 'Social / Redes',
    noResourcesFound: 'No se encontraron recursos que coincidan con su búsqueda o filtros.',
    backToAllCategories: 'Volver a Todas las Categorías',
    backToCategory: 'Volver a {{category}}',
    welcomeToCategory: 'Bienvenido a {{category}}',
    categoryDescription: {
      housing: 'Encuentre apoyo de vivienda, asistencia de alquiler y recursos del vecindario',
      foodAssistance: 'Localice bancos de alimentos, programas de comidas y asistencia nutricional',
      entrepreneurHiring: 'Descubra recursos empresariales, oportunidades de trabajo y apoyo de contratación',
      youthEducation: 'Acceda a programas educativos, tutorías y recursos de aprendizaje',
      eslImmigrant: 'Conéctese con clases de inglés, servicios de inmigración y apoyo cultural',
      socialConnection: 'Únase a grupos comunitarios, eventos culturales y actividades sociales',
    },
    refreshBookmarks: 'Actualizar Marcadores (Depuración)',
    compare: 'Comparar ({{count}}/3)',
    filterByLanguage: 'Filtrar por Idioma:',
    showingResults: 'Mostrando {{current}} de {{total}} recursos',
    categoryTitles: {
      housingProcess: 'Proceso de Vivienda en Pittsburgh',
      housingProcessDescription: 'Aprenda sobre el proceso de búsqueda de vivienda y los requisitos',
    },
    exploreResources: 'Explorar recursos',
    categoryNotFound: 'Categoría no encontrada',
    subcategoryNotFound: 'Subcategoría no encontrada',
    clearFilters: 'Limpiar Filtros',
    showingResultsFor: 'para',
    showingResultsIn: 'en',
    compareSelected: 'Comparar Seleccionados',
    noResourcesFoundCategory: 'No se encontraron recursos para esta categoría.',
    browseSubcategoryDescription: 'Explore los recursos dentro de esta subcategoría.',
    
    // Global search
    globalSearch: {
      placeholder: 'Buscar todos los recursos...',
      button: 'Buscar',
    },
    searchResults: {
      title: 'Resultados de Búsqueda',
      for: 'para',
      noResults: 'No se encontraron recursos que coincidan con su búsqueda.',
      tryDifferent: 'Intente con un término de búsqueda diferente.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'Bienvenido a',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Proceso de Vivienda en Pittsburgh',
        housingProcessDesc: 'Aprenda sobre el proceso de búsqueda de vivienda y los requisitos',
        neighborhoodResources: 'Recursos de Vecindario y Bienes Raíces',
        neighborhoodResourcesDesc: 'Descubra vecindarios e información de bienes raíces',
        housingAssistanceSubcat: 'Asistencia de Vivienda',
        housingAssistanceSubcatDesc: 'Asistencia directa de alquiler y servicios de apoyo de vivienda',
        
        // Food subcategories
        culturalFood: 'Centro de Comida Cultural',
        culturalFoodDesc: 'Mercados internacionales y recursos de comida cultural',
        foodPantries: 'Bancos de Alimentos',
        foodPantriesDesc: 'Asistencia alimentaria de emergencia y despensas',
        groceryGuide: 'Guía de Tiendas de Comestibles',
        groceryGuideDesc: 'Tiendas de comestibles locales y asistencia para compras',
        
        // Employment subcategories
        hiringHub: '¿Es usted un inmigrante o recién llegado que busca trabajo?',
        hiringHubDesc: '¡Consulte nuestro Centro de Contratación!',
        entrepreneurship: 'Recursos Empresariales dentro de Pittsburgh',
        entrepreneurshipDesc: 'Desarrollo empresarial y recursos para startups',
        
        // Education subcategories
        schoolResources: '¿Busca recursos para encontrar una nueva escuela?',
        schoolResourcesDesc: 'Inscripción escolar y recursos educativos',
        tutoring: '¿Busca preparación universitaria o un tutor?',
        tutoringDesc: 'Servicios de tutoría y preparación universitaria',
        gedResources: '¿Busca obtener su GED?',
        gedResourcesDesc: 'Preparación para GED y educación de adultos',
        
        // ESL & Immigration subcategories
        eslResources: '¿Busca recursos de ESL?',
        eslResourcesDesc: 'Aprendizaje del idioma inglés y clases',
        documentation: 'Asistencia con Documentación',
        documentationDesc: 'Papeleo de inmigración y apoyo legal',
        basicNeeds: 'Asistencia con Necesidades Básicas',
        basicNeedsDesc: 'Servicios esenciales y apoyo de emergencia',
        
        // Social subcategories
        fosterConnection: 'Recursos para Fomentar la Conexión',
        fosterConnectionDesc: 'Grupos sociales y construcción de comunidad',
        culturalResourcesSocial: 'Recursos de Comida y Cultura',
        culturalResourcesSocialDesc: 'Eventos culturales y tradiciones alimentarias',
        faithGroups: 'Grupos Basados en la Fe',
        faithGroupsDesc: 'Comunidades religiosas y apoyo espiritual',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
        'community-belonging': 'Comunidad y Pertenencia',
          'culture-leisure': 'Cultura, Artes y Diversión',
        'esl-immigrant': 'Apoyo ESL e Inmigración',
          'education-youth': 'Educación: Adultos y Jóvenes',
          'living-essentials': 'Esenciales de la Vida',
          'work-business': 'Trabajos y Recursos Empresariales',
      },
      categoryDescriptions: {
        'community-belonging': 'Conéctese, participe y construya comunidad en Pittsburgh',
        'culture-leisure': 'Explore artes, actividades familiares, pasatiempos y vida nocturna',
        'esl-immigrant': 'Aprendizaje de idiomas, ayuda de inmigración y servicios para recién llegados',
          'education-youth': 'Aprendizaje para adultos, tutoría y oportunidades para jóvenes',
          'living-essentials': 'Vivienda, salud, transporte y alimentos',
          'work-business': 'Empleos, apoyo de carrera y recursos empresariales',
      },
      subcategories: {
        'civic-government': 'Gobierno',
        'civic-advocacy': 'Incidencia local',
        'civic-volunteer': 'Voluntariado',
        'civic-youth': 'Participación juvenil',
        religion: 'Religión',
        'social-connection': 'Conexión social',
        art: 'Artes',
        family: 'Recreación familiar',
        'beauty-hair': 'Cuidado del cabello / Belleza',
        'hobby-spaces': 'Espacios de pasatiempos',
        'night-life': 'Vida nocturna',
        'esl-support': 'Apoyo de Inglés como Segunda Lengua (ESL)',
        'general-law': 'Derecho general',
        'immigration-asylum': 'Inmigración / Asilo',
        'refugee-immigrant-support': 'Apoyo a refugiados / inmigrantes',
        'adult-education': 'Educación de adultos',
        'college-prep-tutoring': 'Preparación universitaria / Tutoría',
        'youth-education': 'Educación juvenil',
        'youth-programming': 'Programación para jóvenes',
        'food-pantries': 'Bancos de alimentos',
        'grocery-guide': 'Guía de supermercados',
        'specialty-stores': 'Tiendas especializadas',
        'guide-discover-pittsburgh': 'Descubrir Pittsburgh',
        'guide-diverse-businesses': 'Negocios diversos',
        'guide-immigrant-services': 'Servicios para inmigrantes',
        'health-additional-support': 'Apoyo adicional',
        'health-body-mind': 'Cuidado del cuerpo y la mente',
        'health-hospitals': 'Hospitales',
        'health-nutrition': 'Nutrición',
        'health-senior-care': 'Cuidado de mayores',
        'housing-buying-home': 'Compra de vivienda',
        'housing-assistance': 'Asistencia de vivienda',
        'housing-relocating': 'Reubicación en Pittsburgh',
        'housing-rent': 'Alquilar',
        transportation: 'Tránsito',
        'business-development': 'Desarrollo empresarial',
        'business-support': 'Apoyo empresarial',
        'career-support': 'Apoyo de carrera',
        'internship-opportunities': 'Oportunidades de prácticas',
      },
      groups: {
        'civic-engagement': 'Participación cívica',
        legal: 'Legal',
        food: 'Alimentos',
        'pittsburgh-guides': 'Guías de Pittsburgh',
        health: 'Salud',
        housing: 'Vivienda',
        transit: 'Tránsito',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'Cargando su lista de tareas personalizada...',
  },
  
  // About page
  about: {
    title: 'Acerca de Pittsburgh Tomorrow Pioneer',
    description: 'Pittsburgh Tomorrow Pioneer es su guía amigable para establecerse en Pittsburgh y el Condado de Allegheny. Ya sea que usted sea un profesional de tecnología o un recién llegado que busca un nuevo comienzo, Pittsburgh Tomorrow Pioneer le conecta con recursos locales para vivienda, educación, empleo y comunidad.',
    features: [
      'Más de 161 organizaciones sin fines de lucro',
      'Listas de tareas y hojas de ruta personalizadas',
      'Apoyo tanto para inmigrantes independientes como tradicionales',
      'Evaluación fácil para satisfacer sus necesidades',
    ],
    conclusion: 'Este proyecto es una colaboración de socios locales y voluntarios, dedicados a hacer que Pittsburgh sea acogedor, solidario y lleno de oportunidades para todos.',
    copyright: 'Pittsburgh Tomorrow Pioneer. Todos los derechos reservados.',
    
    // AboutPage specific content
    welcomeText: 'Bienvenido a Pittsburgh Tomorrow Pioneer, su guía personal para comenzar una nueva vida en Pittsburgh y el Condado de Allegheny. Ya sea que usted haya llegado recientemente a los EE.UU. o haya tomado un nuevo trabajo con una de las empresas en crecimiento de Pittsburgh en energía, robótica, IA, ciencias de la vida o acero — Pittsburgh Tomorrow Pioneer está aquí para ayudarle. Desde encontrar vivienda hasta inscribir a sus hijos en la escuela, desde localizar clases de inglés hasta conectar con comunidades de fe o apoyo alimentario local, Pittsburgh Tomorrow Pioneer reúne los recursos que usted necesita en un solo lugar.',
    
    whyPioneerTitle: '¿Por Qué Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'Porque comenzar de nuevo en una ciudad nueva no debería significar empezar desde cero.',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer reúne todo lo que usted necesita para comenzar una nueva vida en Pittsburgh y el Condado de Allegheny — todo en un lugar confiable y fácil de usar.',
    whyPioneerText3: 'Es gratuito, completo y diseñado para ahorrarle horas de búsqueda, comparación y dudas. Ya sea que esté buscando vivienda, inscribiendo a sus hijos en la escuela, aprendiendo inglés o buscando conocer personas que compartan su fe, idioma o intereses — Pittsburgh Tomorrow Pioneer asegura que usted no pase por alto ninguna oportunidad para hacer su mudanza más fácil y su nueva vida más rica.',
    whyPioneerText4: 'Donde una búsqueda de Google le muestra todo, Pittsburgh Tomorrow Pioneer le muestra exactamente lo que importa.',
    whyPioneerText5: 'Donde un chatbot de IA ofrece respuestas, Pioneer le da una hoja de ruta.',
    whyPioneerText6: 'Donde la mayoría de las herramientas de reubicación se detienen en la logística, Pioneer comienza con la comunidad.',
    whyPioneerText7: 'Es Pittsburgh, hecho personal.',
    
    youAreThePioneerTitle: 'Usted Es el Pionero',
    youAreThePioneerText1: 'Usted no solo se está mudando — está comenzando algo nuevo. Un nuevo trabajo. Una nueva escuela. Un nuevo hogar. Y tal vez incluso un nuevo idioma o cultura. Eso requiere valor.',
    youAreThePioneerText2: 'Construimos Pittsburgh Tomorrow Pioneer para apoyarle — porque usted es el Pionero. Este sitio está aquí para acompañarle mientras construye un futuro en Pittsburgh.',
    
    howPioneerHelpsTitle: 'Cómo Pittsburgh Tomorrow Pioneer Ayuda',
    
    madeForYouTitle: 'Hecho para Usted — Venga de Donde Venga',
    madeForYouDescription: 'Sabemos que no todos hablan inglés como primer idioma. Por eso Pittsburgh Tomorrow Pioneer admite docenas de idiomas globales, incluyendo español, árabe, francés, chino, darí y más. Si usted escribe en su idioma nativo, Pittsburgh Tomorrow Pioneer responderá en el mismo idioma.',
    
    personalRoadmapTitle: 'Cree Su Hoja de Ruta Personal',
    personalRoadmapDescription: 'Nuestra herramienta más poderosa es su hoja de ruta personalizada — una lista de tareas hecha solo para usted. Al responder algunas preguntas simples sobre sus necesidades (vivienda, comida, trabajos, educación, etc.), Pittsburgh Tomorrow Pioneer crea un plan de acción personalizado para apoyar sus próximos pasos. Usted puede:',
    personalRoadmapFeatures: [
      'Ver y actualizar su hoja de ruta en cualquier momento',
      'Guardar su progreso iniciando sesión (opcional)',
      'Descargar o imprimir su lista de tareas para llevarla consigo',
      'Revisar y refinar su hoja de ruta mientras su vida en Pittsburgh evoluciona'
    ],
    personalRoadmapNote: 'Si usted prefiere explorar a su propio ritmo, puede navegar por nuestra biblioteca completa de recursos sin iniciar sesión.',
    
    smartSupportTitle: 'Soporte Inteligente y Autoguiado',
    smartSupportDescription: 'Pittsburgh Tomorrow Pioneer cuenta con un chatbot amigable entrenado para responder cientos de preguntas comunes. Puede guiarle a recursos, explicar cómo funcionan los sistemas locales y ayudarle a dar el siguiente paso. También hay un directorio completo de información de contacto para nuestros socios de confianza — agencias públicas, organizaciones sin fines de lucro, proveedores de servicios y más.',
    
    trustedPartnersTitle: 'Socios de Confianza',
    trustedPartnersDescription: 'Acceda a nuestro directorio completo de socios de confianza — agencias públicas, organizaciones sin fines de lucro y proveedores de servicios en todo Pittsburgh y el Condado de Allegheny. Nuestra red incluye más de 380 organizaciones sin fines de lucro listas para ayudar con sus necesidades específicas.',
    
    privacyTitle: 'Su Privacidad, Protegida',
    privacyDescription: 'Su privacidad y seguridad nos importan. Si usted elige crear una cuenta, sus datos personales están protegidos por protocolos de seguridad compatibles con SOC II. Nunca venderemos ni compartiremos sus datos. Usted mantiene el control total de su información en todo momento.',
    
    pittsburghTomorrowTitle: 'Acerca de Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'Pittsburgh Tomorrow Pioneer es una iniciativa de Pittsburgh Tomorrow, una organización sin fines de lucro con la misión de hacer crecer Pittsburgh. Estamos catalizando el nuevo espíritu que está redefiniendo lo que el historiador David McCullough llamó "La Ciudad Indispensable de América".',
    pittsburghTomorrowText2: 'La región que construyó América desde cero está experimentando una nueva vitalidad y espíritu cívico: dando la bienvenida a recién llegados, lanzando emprendedores y abriendo nuevos caminos. Nuestro movimiento está impulsado por una nueva ola de pioneros, primeros en moverse y tomadores de riesgos que están aprovechando oportunidades y construyendo el futuro — en Pittsburgh.',
    pittsburghTomorrowText3: 'En Pittsburgh Tomorrow, tenemos la misión de hacer crecer Pittsburgh. Y eso no solo significa crecimiento poblacional o económico; significa revitalizar el espíritu de nuestra ciudad. Apoyar a pequeñas empresas y emprendedores. Embellecer y preservar nuestro medio ambiente. Promover las artes y la cultura. Dar la bienvenida a recién llegados y crear comunidad. Estar orgullosos de nuestra ciudad y ponerla de nuevo en el mapa.',
    pittsburghTomorrowLink: 'Aprenda Más',
    
    // Call to action section
    readyToStartTitle: 'Comience Su Viaje en Pittsburgh',
    readyToStartDescription: 'Construya su hoja de ruta personalizada para ayudarle a establecerse y prosperar en su nuevo hogar.',
    getStarted: 'Comenzar',
    browseResources: 'Explorar Recursos',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'Volver a Acerca de',
    title: 'Declaración de Transparencia y Privacidad de Datos',
    description: 'En Pittsburgh Tomorrow, valoramos la transparencia y su confianza. Creemos que usted tiene el derecho de entender exactamente por qué hacemos ciertas preguntas, cómo usamos la información y cómo le beneficia.',
    
    whyWeAskTitle: 'Por Qué Hacemos Estas Preguntas y Cómo Usamos Su Información:',
    whyWeAskDescription: 'Las preguntas que hacemos están diseñadas para ayudarnos a crear una hoja de ruta personalizada para usted. Sus respuestas nos permiten:',
    whyWeAskBullet1: 'Obtener recursos e información relevantes de nuestra base de datos adaptados a sus necesidades.',
    whyWeAskBullet2: 'Asegurar que estemos llegando a las personas de manera equitativa en todas las comunidades y orígenes.',
    whyWeAskBullet3: 'Identificar brechas en a quién estamos sirviendo para poder llegar mejor a quienes podrían estar faltando.',
    whyWeAskBullet4: 'Mejorar nuestras herramientas de IA para que estén mejor equipadas para servir a todos los usuarios de manera efectiva.',
    weDoNotSell: 'No vendemos sus datos. Los usamos únicamente para los propósitos listados arriba.',
    
    dataRetentionTitle: 'Retención de Datos:',
    dataRetentionDescription: 'Mantenemos su información en nuestra base de datos hasta que nos informe que ya no desea acceder a su panel personalizado. Después de eso, sus datos serán anonimizados y solo se usarán para mejorar nuestros servicios de IA para ayudar a otros recién llegados a Pittsburgh.',
    
    quomeTitle: 'Cómo Quome Usa Sus Datos:',
    quomeDescription: 'Nuestro sitio está alojado por Quome, que puede recopilar ciertos datos para operar y mejorar la plataforma. Puede aprender más sobre cómo Quome usa y protege sus datos revisando su',
    
    skillBuilderTitle: 'Cómo Skill Builder Usa Sus Datos:',
    skillBuilderDescription: 'Nuestro chatbot del sitio está alojado por SkillBuilder.io, que puede recopilar ciertos datos para operar y mejorar la plataforma. Puede aprender más sobre cómo SkillBuilder.io usa y protege sus datos revisando su',
    
    contactDescription: 'Si tiene preguntas sobre nuestro uso de datos o prácticas de privacidad, por favor use nuestro botón de Comentarios en el lado derecho de cada página para contactarnos.',
    privacyPolicyLink: 'Política de Privacidad'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'Acerca de Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'Pittsburgh Tomorrow Pioneer ayuda a los recién llegados a Pittsburgh y el Condado de Allegheny a encontrar su camino. Le conectamos con los recursos y oportunidades correctos, sin importar su trayectoria.',
    quickLinks: 'Enlaces Rápidos',
    home: 'Inicio',
    about: 'Acerca de',
    resources: 'Recursos',
    privacyPolicy: 'Política de Privacidad',
    getStarted: 'Comenzar',
    contact: 'Contacto',
    location: 'Hola desde Pittsburgh, PA',
    email: 'Correo: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: '¡Bienvenida, {{name}}!',
    welcomeStudent: '¡Bienvenido de vuelta, {{name}}!',
    welcomeProfessional: '¡Bienvenido, {{name}}!',
    welcomeLocal: '¡Hola {{name}}!',
    
    subtitleImmigrant: 'Su viaje de asentamiento comienza aquí',
    subtitleStudent: 'Su éxito académico es nuestra prioridad',
    subtitleProfessional: 'Su crecimiento profesional es nuestro enfoque',
    subtitleLocal: 'Ayude a hacer que Pittsburgh sea acogedor para todos',
    
    demoUserNote: 'Está viendo Pittsburgh Tomorrow Pioneer como un usuario **{{role}}**. La experiencia está personalizada para su rol.',
    userBadge: 'usuario {{role}}',
    
    urgentResources: 'Recursos Urgentes',
    
    // Resource categories
    emergencyServices: 'Servicios de Emergencia',
    emergencyDescription: 'Apoyo de crisis 24/7 y asistencia inmediata',
    temporaryHousing: 'Vivienda Temporal',
    temporaryHousingDescription: 'Programas de refugio y asistencia de vivienda',
    healthcareAccess: 'Acceso a Atención Médica',
    healthcareDescription: 'Servicios médicos y ayuda con seguro de salud',
    languageServices: 'Servicios de Idiomas',
    languageServicesDescription: 'Apoyo de traducción e interpretación',
    
    // Additional resource categories for other roles
    academicSupport: 'Apoyo Académico',
    academicSupportDescription: 'Tutoría, grupos de estudio y recursos académicos',
    studentHousing: 'Vivienda Estudiantil',
    studentHousingDescription: 'Opciones de vivienda dentro y fuera del campus',
    financialAid: 'Ayuda Financiera',
    financialAidDescription: 'Becas, subvenciones y asistencia financiera',
    studentGroups: 'Grupos Estudiantiles',
    studentGroupsDescription: 'Organizaciones y clubes de estudiantes internacionales',
    professionalNetworks: 'Redes Profesionales',
    professionalNetworksDescription: 'Reuniones de la industria y eventos de networking',
    careerDevelopment: 'Desarrollo Profesional',
    careerDevelopmentDescription: 'Capacitación en habilidades y programas de certificación',
    professionalHousing: 'Vivienda Profesional',
    professionalHousingDescription: 'Vivienda ejecutiva y servicios de reubicación',
    mentorship: 'Mentoría',
    mentorshipDescription: 'Programas de mentoría y orientación profesional',
    volunteerOpportunities: 'Oportunidades de Voluntariado',
    volunteerOpportunitiesDescription: 'Formas de ayudar a los recién llegados en su comunidad',
    communityOrganizations: 'Organizaciones Comunitarias',
    communityOrganizationsDescription: 'Organizaciones sin fines de lucro y proveedores de servicios locales',
    supportNetworks: 'Redes de Apoyo',
    supportNetworksDescription: 'Programas de mentoría y amistad',
    culturalExchange: 'Intercambio Cultural',
    culturalExchangeDescription: 'Eventos y programas interculturales',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'Inicie sesión para explorar su experiencia personalizada en Pittsburgh',
    signInToPioneer: 'Iniciar sesión en Pittsburgh Tomorrow Pioneer',
    welcomeTitle: 'Bienvenido a Pittsburgh Tomorrow Pioneer, {{name}}!',
    welcomeTitleWithoutName: '¡Bienvenido a Pittsburgh Tomorrow Pioneer!',
    journeyContinues: 'Su recorrido personalizado continúa...',
    beginJourney: 'Comience su experiencia personalizada en Pittsburgh',
    completedSurveyHeader: 'Ya ha completado la encuesta',
    completedSurveyText: 'Usted completó su encuesta de incorporación. Vea su hoja de ruta personalizada a continuación o edite sus respuestas para actualizar sus recomendaciones.',
    completedSurveyTextWithDate: 'Usted completó su encuesta de incorporación el {{date}}. Vea su hoja de ruta personalizada a continuación o edite sus respuestas para actualizar sus recomendaciones.',
    editResponses: 'Editar respuestas',
    viewMyRoadmap: 'Ver mi hoja de ruta',
    noteLabel: 'Nota:',
    editRegenerateNote: 'Si edita sus respuestas de la encuesta, sus recomendaciones personalizadas y su hoja de ruta se regenerarán automáticamente para ajustarse mejor a sus preferencias actualizadas.',
    bridgitHelp: '¿Tiene preguntas que no fueron cubiertas por la encuesta? ¡Haga clic en el chatbot BRIDGIT en la esquina inferior derecha para recibir asistencia personalizada!',
    personalizedRoadmap: 'Su Hoja de Ruta Personalizada',
    unlockExperience: 'DESBLOQUEE SU EXPERIENCIA PERSONALIZADA',
    completeSurveyHeader: 'Complete su encuesta para comenzar',
    completeSurveyText: 'Responda nuestra encuesta rápida de 5 minutos para recibir recomendaciones de recursos personalizadas, adaptadas específicamente a sus necesidades y objetivos en Pittsburgh.',
  },
  
  // Profile page
  profile: {
    title: 'Configuración de Perfil',
    subtitle: 'Administre su información personal y preferencias',
    accountInformation: 'Información de la Cuenta',
    accountInformationDescription: 'Actualice los datos básicos de su cuenta',
    basicInformation: 'Información Básica',
    basicInformationDescription: 'Actualice sus datos personales básicos',
    firstName: 'Nombre',
    enterFirstName: 'Ingrese su nombre',
    lastName: 'Apellido',
    enterLastName: 'Ingrese su apellido',
    username: 'Nombre de Usuario',
    enterUsername: 'Ingrese su nombre de usuario',
    email: 'Correo Electrónico',
    emailChangeNote: 'El correo electrónico no se puede cambiar. Contacte al soporte si necesita actualizar su correo electrónico.',
    emailCannotBeChanged: 'El correo electrónico no se puede cambiar. Contacte al soporte si necesita actualizar su correo electrónico.',
    surveyRequired: 'Complete Primero Su Encuesta',
    surveyRequiredDescription: 'Para obtener recomendaciones personalizadas y editar sus respuestas de la encuesta, primero debe completar la evaluación inicial.',
    takeSurvey: 'Realizar la Encuesta',
    basicQuestions: 'Información Básica',
    basicQuestionsDescription: 'Cuéntenos sobre usted y su situación para obtener recomendaciones personalizadas',
    selectPrimary: 'Seleccione su preferencia principal:',
    selectOption: 'Seleccione una opción...',
    supportNeeds: 'Apoyo y Necesidades',
    supportNeedsDescription: '¿Qué tipo de apoyo y servicios necesita?',
    selectMultiple: 'Seleccione todas las que apliquen:',
    selectAtLeastOne: 'Por favor seleccione al menos una opción.',
    timelinePreferences: 'Cronograma y Preferencias',
    timelinePreferencesDescription: 'Su cronograma y preferencias tecnológicas',
    backToDashboard: 'Volver al Panel',
    languageAndCultural: 'Idioma y Trasfondo Cultural',
    languageAndCulturalDescription: 'Ayúdenos a brindar mejores recomendaciones personalizadas',
    primaryLanguage: 'Idioma Principal',
    selectPrimaryLanguage: 'Seleccione su idioma principal',
    culturalBackground: 'Trasfondo Cultural',
    selectCulturalBackground: 'Seleccione su trasfondo cultural',
    professionalAndLiving: 'Situación Profesional y de Vivienda',
    professionalAndLivingDescription: 'Esto nos ayuda a recomendar recursos y servicios relevantes',
    professionalStatus: 'Estado Profesional',
    selectProfessionalStatus: 'Seleccione su estado profesional',
    housingSituation: 'Situación de Vivienda',
    selectHousingSituation: 'Seleccione su situación de vivienda',
    familyStatus: 'Estado Familiar',
    selectFamilyStatus: 'Seleccione su estado familiar',
    saveChanges: 'Guardar Cambios',
    saving: 'Guardando...',
    recalculatingRecommendations: 'Recalculando recomendaciones...',
    profileUpdated: 'Perfil Actualizado',
    profileUpdatedDescription: 'Su perfil ha sido actualizado exitosamente.',
    accountUpdated: 'Cuenta Actualizada',
    accountUpdatedDescription: 'La información de su cuenta se ha actualizado correctamente. Complete la encuesta para guardar sus preferencias.',
    updateFailed: 'Actualización Fallida',
    updateFailedDescription: 'No se pudo actualizar el perfil. Por favor intente de nuevo.',
    pleaseLogIn: 'Por favor inicie sesión para ver su perfil.',
    
    // Language options
    languages: {
      english: 'Inglés',
      spanish: 'Español',
      french: 'Francés',
      arabic: 'Árabe',
      chinese: 'Chino',
      swahili: 'Suajili',
      hindi: 'Hindi',
      portuguese: 'Portugués',
      russian: 'Ruso',
      nepali: 'Nepalí',
      somali: 'Somalí',
      tagalog: 'Tagalo',
      turkish: 'Turco',
      other: 'Otro',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'Americano/Occidental',
      westAfrican: 'Africano Occidental',
      middleEasternNorthAfrican: 'Medio Oriente/Norte de África',
      southAsian: 'Sur Asiático (incluyendo Butanés)',
      latinoHispanic: 'Latino/Hispano',
      eastAsian: 'Este Asiático',
      easternEuropean: 'Europeo Oriental',
      other: 'Otro/Prefiero no decir',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'Estudiante',
      graduateStudent: 'Estudiante de posgrado',
      softwareEngineer: 'Ingeniero de software',
      healthcareProfessional: 'Profesional de la salud',
      researchScientist: 'Científico investigador',
      seekingEmployment: 'Buscando empleo',
      employedFullTime: 'Empleado tiempo completo',
      employedPartTime: 'Empleado tiempo parcial',
      selfEmployed: 'Trabajador independiente',
      retired: 'Jubilado',
      other: 'Otro',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Vivienda temporal',
      campusHousing: 'Vivienda del campus',
      apartmentHunting: 'Buscando apartamento',
      rentingApartment: 'Alquilando apartamento',
      rentingHouse: 'Alquilando casa',
      homeowner: 'Propietario de vivienda',
      livingWithFamily: 'Viviendo con familia',
      sharedHousing: 'Vivienda compartida',
      other: 'Otro',
    },
    
    // Family status options
    familyStatuses: {
      single: 'Soltero',
      married: 'Casado',
      familyWithChildren: 'Familia con hijos',
      singleParent: 'Padre/madre soltero(a)',
      extendedFamily: 'Familia extendida',
      other: 'Otro',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: '¿Cómo deberíamos llamarte?',
    description: 'Ayúdanos a personalizar tu experiencia diciéndonos tu nombre.',
    firstName: 'Nombre',
    firstNamePlaceholder: 'Ingresa tu nombre',
    lastName: 'Apellido',
    lastNamePlaceholder: 'Ingresa tu apellido (opcional)',
    skip: 'Omitir por ahora',
    save: 'Guardar Nombre',
    saving: 'Guardando...',
    firstNameRequired: 'Nombre requerido',
    firstNameRequiredDescription: 'Por favor ingresa tu nombre para continuar.',
    nameUpdated: 'Nombre actualizado',
    nameUpdatedDescription: 'Tu nombre ha sido guardado exitosamente.',
    updateFailed: 'Error al actualizar',
    updateFailedDescription: 'No se pudo actualizar tu nombre. Por favor intenta de nuevo.',
  },
  
  // Common elements
  common: {
    dashboard: 'Panel de Control',
    loading: 'Cargando...',
    search: 'Buscar',
    filter: 'Filtrar',
    next: 'Siguiente',
    previous: 'Anterior',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    edit: 'Editar',
    delete: 'Eliminar',
    close: 'Cerrar',
    back: 'Atrás',
    backToResources: 'Volver a Recursos',
    viewDetails: 'Ver Detalles',
    learnMore: 'Aprenda Más',
    getHelp: 'Obtener Ayuda',
    startNow: 'Comenzar Ahora',
    tryNow: 'Probar Ahora',
    downloadNow: 'Descargar Ahora',
    visitWebsite: 'Visitar',
    shareThis: 'Compartir Esto',
    copied: '¡Copiado!',
    copy: 'Copiar',
    show: 'Mostrar',
    hide: 'Ocultar',
    expand: 'Expandir',
    collapse: 'Contraer',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    showingTopOf: 'Mostrando las primeras {{current}} de {{total}} recursos',
    selectLanguage: 'Seleccionar Idioma',
    personalizedRecommendationsLabel: 'Recomendaciones Personalizadas',
    exploreResourcesNowLabel: 'Explorar recursos ahora',
    curatedAdviceLabel: 'Consejos seleccionados para el éxito',
    
    // Accessibility and UI labels
    toggleSidebar: 'Alternar Barra Lateral',
    toggleMobileMenu: 'Alternar menú móvil',
    feedback: 'Comentarios',
    openInNewTab: 'Abrir en nueva pestaña',
    removeBookmark: 'Eliminar marcador',
    editResource: 'Editar recurso',
    deleteResource: 'Eliminar recurso',
    dragToReorder: 'Arrastrar para reordenar',
    saveOrPrintOptions: 'Opciones de Guardar o Imprimir',
    filterByCategory: 'Filtrar por categoría',
    openChatAssistant: 'Abrir chat con el asistente BRIDGIT',
    askBridget: 'Preguntar a BRIDGIT',
    bridgitComingSoonTitle: 'BRIDGIT: ¡Próximamente!',
    bridgitComingSoonDescription: 'Nuestro asistente de IA BRIDGIT está actualmente en desarrollo. ¡Manténgase atento a las actualizaciones!',
    
    // Content section headers
    description: 'Descripción',
    services: 'Servicios',
    languages: 'Idiomas',
    languagesSupported: 'Idiomas Compatibles',
    available: 'Disponible',
    resources: 'Recursos',
    exploreResources: 'Explorar recursos',
    
    // Admin interface
    authenticationRequired: 'Autenticación Requerida',
    organizationName: 'Nombre de la Organización',
    website: 'Sitio Web',
    shortDescription: 'Descripción Breve',
    fullDescription: 'Descripción Completa',
    affiliation: 'Afiliación',
    financialData: 'Datos Financieros',
    serviceDetails: 'Detalles del Servicio',
    categories: 'Categorías',
    servicesProvided: 'Servicios Proporcionados',
    totalResources: 'Recursos Totales',
    publishingStatus: 'Estado de Publicación',
    totalUsers: 'Usuarios Totales',
    adminUsers: 'Usuarios Administradores',
    demoUsers: 'Usuarios de Demostración',
    noResourcesFound: 'No se encontraron recursos',
    
    // Form placeholders
    placeholders: {
      organizationName: 'Nombre de la organización',
      briefDescription: 'Descripción breve',
      detailedDescription: 'Descripción detallada de servicios y programas',
      organizationAffiliation: 'Afiliación de la organización o red',
      partnersCollaborating: 'Lista de socios y organizaciones colaboradoras',
      availableOnline: 'Disponible en línea',
    },
    
    // Additional UI elements
    backToHome: 'Volver al Inicio',
    goHome: 'Ir al Inicio',
    browseResources: 'Explorar Recursos',
    needPersonalizedRecommendations: '¿Necesita recomendaciones personalizadas?',
    personalizedRecommendationsDescription: 'Responda nuestra evaluación rápida para obtener una lista de verificación personalizada con recursos elegidos específicamente para sus necesidades.',
    getYourPersonalRoadmap: 'Obtenga su Hoja de Ruta Personal',
    allRightsReserved: 'Todos los derechos reservados',
    initiativeOfPittsburghTomorrow: 'Una iniciativa de Pittsburgh Tomorrow',
    viewingAsUserNotification: 'Está viendo Pittsburgh Tomorrow Pioneer como un usuario {{role}}. La experiencia está personalizada para su rol.',
    priorityResourcesForYou: 'Recursos Prioritarios para Usted',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'Según sus respuestas a la encuesta, no necesita asistencia específica en este momento. Si su situación cambia, puede actualizar su perfil. De lo contrario, siéntase libre de explorar todos los recursos disponibles.',
    editProfile: 'Actualizar Perfil',
    exploreAllResources: 'Explorar Todos los Recursos',
    
    // Priority Categories
    priorityCategories: {
      housing: 'Vivienda',
      education: 'Educación', 
      income: 'Ingresos',
      first_things_first: 'Primeras Necesidades',
      meeting_people: 'Conocer Personas',
      kids_activities: 'Actividades para Niños',
      faith_communities: 'Comunidades de Fe',
      sports_wellness: 'Deportes y Bienestar',
      arts_entertainment: 'Arte y Entretenimiento',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'Encontrar vivienda asequible y apoyo financiero.',
      education: 'Inglés profesional y apoyo en otros idiomas.',
      income: 'Apoyo para la búsqueda de empleo y desarrollo de habilidades.',
      first_things_first: 'Asistencia con ayuda de emergencia, salud mental e inscripción.',
      meeting_people: 'Conéctese a través de redes profesionales y eventos sociales.',
      kids_activities: 'Programas familiares y para niños disponibles.',
      faith_communities: 'Encuentre grupos locales de fe y culturales.',
      sports_wellness: 'Explore oportunidades deportivas y recreativas.',
      arts_entertainment: 'Descubra eventos artísticos y culturales locales.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'Vea y gestione sus recursos marcados',
    searchYourBookmarks: 'Busque en sus marcadores...',
    showingBookmarks: 'Mostrando {{count}} de {{total}} recursos marcados',
    showingBookmarksPaginated: 'Mostrando {{start}}-{{end}} de {{total}} marcadores',
    failedToLoadBookmarks: 'Error al cargar marcadores. Inténtelo de nuevo.',
    bookmarkedOn: 'Marcado el',
    noBookmarksMatchFilters: 'Ningún marcador coincide con sus filtros actuales.',
    
    // Additional UI elements - screening form
    stepOf: 'Paso {{current}} de {{total}}',
    percentComplete: '{{percent}}% Completado',
    previousButton: 'Anterior',
    nextButton: 'Siguiente',
    creatingYourPlan: 'Creando su Plan...',
    completeAssessment: 'Completar Evaluación',
    
    // Bookmarks empty state
    noBookmarksYet: 'Aún No Hay Marcadores',
    startExploringBookmark: '¡Comience a explorar recursos y marque los que le resulten útiles!',
    pageOf: 'Página {{current}} de {{total}}',
    yourPersonalizedRoadmap: 'Su Hoja de Ruta Personalizada',
    resourcesReadyForYou: '{{count}} recursos listos para usted',
    seeMoreResources: 'Explorar Todos los Recursos',
    discoveringPerfectResources: 'Descubriendo Tus Recursos Perfectos',
    noRecommendationsYet: 'Sus recomendaciones personalizadas se están preparando. Explore nuestro directorio de recursos para comenzar.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Página No Encontrada',
    pageNotFoundDescription: 'La página que busca no existe o ha sido movida.',
  },
} 