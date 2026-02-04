/**
 * Portuguese (pt) translations
 * 
 * Professional translations with Brazilian Portuguese variant (pt-BR)
 * Formal address using "você"
 * Cultural appropriateness
 * 
 * Language: Portuguese (pt-BR)
 * Locale: Brazil
 */

import type { TranslationStructure } from '../types'

export const portugueseTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'Início',
    dashboard: 'Painel',
    adminDashboard: 'Painel Administrativo',
    welcome: 'Bem-vindo',
    resources: 'Recursos',
    bookmarks: 'Favoritos',
    about: 'Sobre',
    myChecklist: 'Lista de Verificação',
    signIn: 'Entrar',
    signUp: 'Cadastrar',
    accountSettings: 'Configurações do Perfil',
    signOut: 'Sair',
    settings: 'Configurações',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'Bem-vindo ao Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: 'Bem-vindo ao',
    heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: 'Seu guia pessoal para começar uma nova vida em Pittsburgh — Gratuito, Privado, Multilíngue',
    heroExtendedDescription: 'Mudando para Pittsburgh? Não passe horas procurando em dezenas de sites ou fazendo as mesmas perguntas repetidamente. O Pittsburgh Tomorrow Pioneer é seu guia pessoal e gratuito para todos os recursos que ajudam recém-chegados a se estabelecerem rapidamente e com confiança — desde moradia e escolas até idioma, fé e vida comunitária. É a forma mais completa, que economiza tempo e acolhedora de começar seu novo capítulo em Pittsburgh.',
    howCanWeHelp: 'Como podemos ajudá-lo hoje?',
    howCanWeHelpSubtitle: 'Escolha seu caminho para receber recomendações personalizadas',
    createRoadmapTitle: 'Crie Seu Roteiro',
    createRoadmapDescription: 'Responda a uma pesquisa breve para receber um plano de ação personalizado adaptado às suas necessidades e objetivos específicos.',
    getStarted: 'Começar',
    browseResourcesTitle: 'Navegar Recursos',
    browseResourcesDescription: 'Explore nosso diretório abrangente de serviços, organizações e recursos organizados por categoria.',
    exploreDirectory: 'Explorar Diretório',
    askBridgetTitle: 'Perguntar ao BRIDGIT',
    askBridgetDescription: 'Obtenha respostas instantâneas às suas perguntas de nosso assistente de IA. Disponível 24/7 no seu idioma preferido.',
    startChatting: 'Iniciar Conversa',
    saveProgressQuestion: 'Deseja salvar seu progresso e acessar recursos personalizados?',
    signIn: 'Entrar',
    createAccount: 'Criar Conta',
    servicesNote: 'Todos os serviços são completamente gratuitos, estritamente confidenciais e disponíveis em mais de 16 idiomas, incluindo inglês, espanhol, árabe, francês, chinês e suaíli.',
    
    // Trust badges
    hundredPercentFree: '100% Gratuito',
    privateSecure: 'Privado e Seguro',
    multilingualSupport: 'Suporte Multilíngue',
    languagesSupported: 'Mais de 16 idiomas suportados, incluindo espanhol, árabe, francês, mandarim e suaíli.',
  },
  
  // Auth pages
  auth: {
    demoMode: 'Modo Demonstração',
    demoModeDescription: 'Experimente o Pittsburgh Tomorrow Pioneer com diferentes perfis de usuário para ver como a experiência se adapta às suas necessidades',
    whatYouExperience: 'O Que Você Vai Experimentar',
    immigrantUser: 'Usuário Imigrante',
    immigrantFeatures: {
      emergency: 'Recursos de emergência priorizados',
      multilingual: 'Suporte multilíngue',
      settlement: 'Conteúdo focado em estabelecimento',
    },
    studentUser: 'Usuário Estudante',
    studentFeatures: {
      academic: 'Recursos acadêmicos',
      campus: 'Informações específicas do campus',
      career: 'Orientação de carreira',
    },
    professionalUser: 'Usuário Profissional',
    professionalFeatures: {
      networking: 'Networking da indústria',
      services: 'Serviços profissionais',
      advancement: 'Progressão na carreira',
    },
    localHelper: 'Ajudante Local',
    localFeatures: {
      community: 'Recursos da comunidade',
      volunteer: 'Oportunidades de voluntariado',
      support: 'Redes de apoio',
    },
    signIn: 'Entrar',
    
    // Authentication required page
    authenticationRequired: 'Autenticação Necessária',
    loginToAccessPage: 'Você precisa estar conectado para acessar esta página.',
    
    // Login page
    emailVerified: 'E-mail Verificado',
    emailVerifiedDescription: 'Seu e-mail foi verificado com sucesso.',
    alreadySignedIn: 'Já Conectado',
    redirectingToDashboard: 'Redirecionando você para seu painel...',
    signInDescription: 'Entre para acessar seus recursos e recomendações personalizados de Pittsburgh.',
    signInWithAuth0: 'Entrar',
    signInHelp: 'Tendo problemas para entrar? Entre em contato com o suporte para obter ajuda.',
    loginError: 'Erro de Login',
    loginErrorDescription: 'Houve um problema ao fazer seu login. Por favor, tente novamente.',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'Experimentar Contas de Demonstração',
    experienceDifferentPerspectives: 'Experimente o Pittsburgh Tomorrow Pioneer de diferentes perspectivas de usuário',
    email: 'E-mail:',
    password: 'Senha:',
    loginAs: 'Entrar como usuário {{role}}',
    demoTip: 'Essas contas de demonstração mostram diferentes experiências de usuário e conteúdo personalizado',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: 'Pensando...',
    curatingRecommendations: 'Criando recomendações personalizadas...',
    findingResources: 'Encontrando os melhores recursos...',
    complete: 'Concluído!',
    creatingYourPlan: 'Criando Seu Plano Personalizado',
    ready: 'Pronto!',
    mayTakeAMoment: 'Isso pode levar um momento enquanto personalizamos sua experiência...',
    seeMyRecommendations: 'Ver minhas recomendações',
    loadingHint: 'Isso pode levar um momento enquanto personalizamos sua experiência...',
  },
  
  // Screening page
  screening: {
    title: 'Conte-nos sobre você',
    description: 'Responda algumas perguntas rápidas para que possamos criar seu guia personalizado para viver e prosperar em Pittsburgh.',
    saveRoadmapBanner: 'Salve seu roteiro personalizado criando uma conta. Você pode fazer a pesquisa anonimamente agora e entrar mais tarde para salvá-la.',
    
    // Progress indicator
    progress: 'Progresso',
    completed: '{{count}} de {{total}} concluído',
    
    // Questions
    questions: {
      audience: {
        question: 'Qual descreve melhor sua situação?',
        options: [
          'Estudante/Profissional (frequentando uma universidade da região de Pittsburgh ou trabalhando para uma organização)',
          'Bumerangue (morei aqui antes, me mudei e agora estou de volta na região de Pittsburgh)',
          'Refugiado ou Status de Proteção Temporária (acabei de ser reassentado aqui ou me mudei de outra cidade)',
          'Transplantado (mudando para Pittsburgh de outra cidade nos EUA)',
          'Empreendedor (construindo meu próprio negócio)',
          'Funcionário remoto',
          'Outro',
        ],
      },
      primaryLanguage: {
        question: 'Qual é seu idioma principal?',
        options: [
          'Inglês (nativo/fluente)',
          'Espanhol (Español)',
          'Árabe (العربية)',
          'Suaíli (Kiswahili)',
          'Uzbeque (Oʻzbekcha)',
          'Nepalês/Butanês (नेपाली / རྫོང་ཁ)',
          'Dari/Pashto (دری / پښتو)',
          'Chinês Mandarim (中文)',
          'Outro',
        ],
      },
      culturalBackground: {
        question: 'Qual origem cultural ou regional o descreve melhor?',
        options: [
          'Branco',
          'Negro ou Afro-americano (incluindo descendência africana e caribenha)',
          'Hispânico ou Latino/a/x',
          'Asiático (ex.: chinês, indiano, vietnamita)',
          'Oriente Médio ou Norte da África',
          'Havaiano Nativo ou Outro Ilhéu do Pacífico',
          'Indígena Americano ou Nativo do Alasca',
          'Africano (ex.: nigeriano, etíope, ganês, etc.)',
          'Caribenho (ex.: jamaicano, haitiano, trinitário, etc.)',
          'Outro',
          'Prefiro não responder',
        ],
      },
      housingNeed: {
        question: 'Que tipo de apoio habitacional você precisa?',
        options: [
          'Ajuda para encontrar bairros e apartamentos com preços de mercado',
          'Assistência habitacional acessível e programas',
          'Moradia temporária/de emergência',
          'Moradia compartilhada/compatibilidade de colegas de quarto',
          'Ajuda para comprar uma casa',
          'Já tenho moradia garantida',
        ],
      },
      professionalStatus: {
        question: 'Qual é seu status profissional atual?',
        options: [
          'Estudante (graduação/pós-graduação/escola técnica)',
          'Profissional de tecnologia/engenheiro',
          'Profissional de saúde/ciências da vida',
          'Acadêmico/pesquisador',
          'Procurando emprego',
          'Recém-formado procurando trabalho',
          'Outro profissional',
        ],
      },
      languageSupport: {
        question: 'Que tipo de apoio linguístico seria útil?',
        options: [
          'Aulas de inglês (ESL) - iniciante a intermediário',
          'Habilidades de comunicação profissional em inglês',
          'Serviços de tradução de documentos',
          'Prática de inglês conversacional',
          'Não preciso de apoio linguístico',
        ],
      },
      employment: {
        question: 'Que tipo de apoio para emprego o interessa?',
        options: [
          'Networking profissional e progressão na carreira',
          'Assistência na busca de emprego e ajuda com currículo',
          'Programas de treinamento de habilidades e certificação',
          'Networking específico da indústria (tecnologia, saúde, etc.)',
          'Não preciso de apoio para emprego, obrigado',
        ],
      },
      communityPriorities: {
        question: 'Quais conexões comunitárias são mais importantes para você? (Selecione todas as que se aplicam)',
        options: [
          'Redes profissionais e encontros da indústria',
          'Comunidades culturais e baseadas em fé',
          'Atividades sociais e entretenimento',
          'Serviços para família e crianças',
          'Atividades esportivas e recreativas',
          'Eventos artísticos e culturais',
          'Nenhum destes',
        ],
      },
      immediateNeeds: {
        question: 'Quais são suas necessidades mais imediatas? (Selecione todas as que se aplicam)',
        options: [
          'Conhecer pessoas e fazer novos amigos',
          'Serviços básicos (saúde, banco, transporte)',
          'Matrícula escolar para crianças',
          'Assistência legal/imigração',
          'Apoio à saúde mental e bem-estar',
          'Assistência de emergência (comida, abrigo)',
          'Nenhum destes',
        ],
      },
      timeline: {
        question: 'Qual é seu cronograma para se estabelecer na região de Pittsburgh?',
        options: [
          'Acabei de chegar (no último mês)',
          'Cheguei recentemente (1-6 meses)',
          'Planejando chegar em breve (próximos 3 meses)',
          'Planejamento de longo prazo (6+ meses)',
          'Já estabelecido na região de Pittsburgh',
        ],
      },
    },
    
    // Form messages
    pleaseAnswer: 'Por favor, responda esta pergunta.',
    pleaseAnswerAll: 'Por favor, responda todas as perguntas para continuar',
    creatingGuide: 'Criando Seu Guia...',
    seePersonalizedGuide: 'Ver Meu Guia Personalizado',
    screeningQuestionnaire: 'Questionário de Triagem',
  },
  
  // Toolkit interface
  toolkit: {
    title: 'KIT DE FERRAMENTAS PARA RECÉM-CHEGADOS',
    description: 'Encontre os recursos e apoio que você precisa para se estabelecer e prosperar em Pittsburgh',
    categories: {
      housingAssistance: 'Assistência Habitacional',
      foodAssistance: 'Assistência Alimentar',
      entrepreneurHiringHub: 'Centro de Empreendedorismo e Contratação',
      youthAdultEducation: 'Recursos de Educação para Jovens e Adultos',
      eslImmigrantConnection: 'Serviços de Conexão ESL e Imigração',
      socialConnectionCulture: 'Conexão Social e Cultura',
    },
    chat: {
      bridgitTitle: 'Conversar com BRIDGIT',
      bridgitDescription: 'Obtenha assistência e orientação personalizadas para sua jornada',
    },
  },

  // Resource search
  resources: {
    title: 'Encontrar Recursos',
    searchPlaceholder: 'Pesquisar recursos...',
    allCategories: 'Todas as Categorias',
    housing: 'Moradia',
    educationESL: 'Educação / ESL',
    socialNetworking: 'Social / Networking',
    noResourcesFound: 'Nenhum recurso encontrado correspondente à sua pesquisa ou filtros.',
    backToAllCategories: 'Voltar para Todas as Categorias',
    backToCategory: 'Voltar para {{category}}',
    welcomeToCategory: 'Bem-vindo a {{category}}',
    categoryDescription: {
      housing: 'Encontre apoio habitacional, assistência para aluguel e recursos do bairro',
      foodAssistance: 'Localize bancos de alimentos, programas de refeições e assistência nutricional',
      entrepreneurHiring: 'Descubra recursos de negócios, oportunidades de emprego e apoio para contratação',
      youthEducation: 'Acesse programas educacionais, tutoria e recursos de aprendizado',
      eslImmigrant: 'Conecte-se com aulas de inglês, serviços de imigração e apoio cultural',
      socialConnection: 'Junte-se a grupos comunitários, eventos culturais e atividades sociais',
    },
    refreshBookmarks: 'Atualizar Favoritos (Debug)',
    compare: 'Comparar ({{count}}/3)',
    filterByLanguage: 'Filtrar por Idioma:',
    showingResults: 'Mostrando {{current}} de {{total}} recursos',
    categoryTitles: {
      housingProcess: 'Processo Habitacional em Pittsburgh',
      housingProcessDescription: 'Saiba mais sobre o processo de busca de moradia e requisitos',
    },
    exploreResources: 'Explorar recursos',
    categoryNotFound: 'Categoria não encontrada',
    subcategoryNotFound: 'Subcategoria não encontrada',
    clearFilters: 'Limpar Filtros',
    showingResultsFor: 'para',
    showingResultsIn: 'em',
    compareSelected: 'Comparar Selecionados',
    noResourcesFoundCategory: 'Nenhum recurso encontrado para esta categoria.',
    browseSubcategoryDescription: 'Navegue pelos recursos nesta subcategoria.',
    
    // Global search
    globalSearch: {
      placeholder: 'Pesquisar todos os recursos...',
      button: 'Pesquisar',
    },
    searchResults: {
      title: 'Resultados da Pesquisa',
      for: 'para',
      noResults: 'Nenhum recurso encontrado correspondente à sua pesquisa.',
      tryDifferent: 'Tente um termo de pesquisa diferente.',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'Bem-vindo a',
      subcategories: {
        // Housing subcategories
        housingProcess: 'Processo Habitacional em Pittsburgh',
        housingProcessDesc: 'Saiba mais sobre o processo de busca de moradia e requisitos',
        neighborhoodResources: 'Recursos do Bairro e Imobiliários',
        neighborhoodResourcesDesc: 'Descubra bairros e informações imobiliárias',
        housingAssistanceSubcat: 'Assistência Habitacional',
        housingAssistanceSubcatDesc: 'Assistência direta para aluguel e serviços de apoio habitacional',
        
        // Food subcategories
        culturalFood: 'Centro de Alimentos Culturais',
        culturalFoodDesc: 'Mercados internacionais e recursos de alimentos culturais',
        foodPantries: 'Bancos de Alimentos',
        foodPantriesDesc: 'Assistência alimentar de emergência e bancos de alimentos',
        groceryGuide: 'Guia de Supermercados',
        groceryGuideDesc: 'Supermercados locais e assistência para compras',
        
        // Employment subcategories
        hiringHub: 'Você é um Imigrante ou recém-chegado procurando trabalho?',
        hiringHubDesc: 'Confira nosso Centro de Contratação!',
        entrepreneurship: 'Recursos Empreendedores em Pittsburgh',
        entrepreneurshipDesc: 'Recursos de desenvolvimento de negócios e startups',
        
        // Education subcategories
        schoolResources: 'Procurando recursos para encontrar uma nova escola?',
        schoolResourcesDesc: 'Matrícula escolar e recursos educacionais',
        tutoring: 'Procurando Preparação para a Faculdade ou um Tutor?',
        tutoringDesc: 'Serviços de tutoria e preparação para a faculdade',
        gedResources: 'Quer obter seu GED?',
        gedResourcesDesc: 'Preparação para GED e educação de adultos',
        
        // ESL & Immigration subcategories
        eslResources: 'Procurando Recursos ESL?',
        eslResourcesDesc: 'Aprendizado de inglês e aulas',
        documentation: 'Assistência com Documentação',
        documentationDesc: 'Papelada de imigração e apoio legal',
        basicNeeds: 'Assistência para Necessidades Básicas',
        basicNeedsDesc: 'Serviços essenciais e apoio de emergência',
        
        // Social subcategories
        fosterConnection: 'Recursos para Fomentar Conexões',
        fosterConnectionDesc: 'Grupos sociais e construção comunitária',
        culturalResourcesSocial: 'Recursos de Alimentos e Cultura',
        culturalResourcesSocialDesc: 'Eventos culturais e tradições alimentares',
        faithGroups: 'Grupos Baseados em Fé',
        faithGroupsDesc: 'Comunidades religiosas e apoio espiritual',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'Comunidade e Pertencimento',
          'culture-leisure': 'Cultura, Artes e Diversão',
        'esl-immigrant': 'Apoio ESL e Imigração',
          'education-youth': 'Educação: Adultos e Jovens',
        'living-essentials': 'Essenciais para a Vida',
          'work-business': 'Recursos de Trabalho e Negócios',
      },
      categoryDescriptions: {
        'community-belonging': 'Conecte, participe e construa comunidade em Pittsburgh',
          'culture-leisure': 'Explore artes, atividades familiares, hobbies e vida noturna',
        'esl-immigrant': 'Aprendizado de idiomas, ajuda com imigração e serviços para recém-chegados',
          'education-youth': 'Aprendizado de adultos, tutoria e oportunidades para jovens',
          'living-essentials': 'Moradia, saúde, transporte e comida',
          'work-business': 'Trabalho, apoio de carreira e recursos de negócios',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': 'Governo',
        'civic-advocacy': 'Defesa local',
        'civic-volunteer': 'Voluntário',
        'civic-youth': 'Envolvimento juvenil',
        religion: 'Religião',
        'social-connection': 'Conexão social',

        // Culture & Leisure
        art: 'Artes',
        family: 'Recreação Familiar',
        'beauty-hair': 'Cuidados com Cabelo / Beleza',
        'hobby-spaces': 'Espaços para Hobbies',
        'night-life': 'Vida Noturna',

        // ESL & Immigrant Support
        'esl-support': 'Apoio de Inglês como Segunda Língua (ESL)',
        'general-law': 'Direito geral',
        'immigration-asylum': 'Imigração / Asilo',
        'refugee-immigrant-support': 'Apoio a Refugiados / Imigrantes',

        // Education & Youth
        'adult-education': 'Educação de adultos',
        'college-prep-tutoring': 'Preparação para faculdade / Tutoria',
        'youth-education': 'Educação juvenil',
        'youth-programming': 'Programação para jovens',

        // Living Essentials
        'food-pantries': 'Bancos de alimentos',
        'grocery-guide': 'Guia de supermercados',
        'specialty-stores': 'Lojas especializadas',
        'guide-discover-pittsburgh': 'Descobrir Pittsburgh',
        'guide-diverse-businesses': 'Negócios diversos',
        'guide-immigrant-services': 'Serviços para imigrantes',
        'health-additional-support': 'Apoio adicional',
        'health-body-mind': 'Cuidados com corpo e mente',
        'health-hospitals': 'Hospitais',
        'health-nutrition': 'Nutrição',
        'health-senior-care': 'Cuidados com idosos',
        'housing-buying-home': 'Comprar uma casa',
        'housing-assistance': 'Assistência habitacional',
        'housing-relocating': 'Mudança para Pittsburgh',
        'housing-rent': 'Aluguel',
        transportation: 'Trânsito',

        // Work & Business
        'business-development': 'Desenvolvimento de Negócios',
        'business-support': 'Apoio a Negócios',
        'career-support': 'Apoio de Carreira',
        'internship-opportunities': 'Oportunidades de Estágio',
      },
      groups: {
        'civic-engagement': 'Envolvimento Cívico',
        legal: 'Legal',
        food: 'Comida',
        'pittsburgh-guides': 'Guias de Pittsburgh',
        health: 'Saúde',
        housing: 'Moradia',
        transit: 'Trânsito',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'Carregando sua lista de verificação personalizada...',
  },
  
  // About page
  about: {
    title: 'Sobre o Pittsburgh Tomorrow Pioneer',
    description: 'O Pittsburgh Tomorrow Pioneer é seu guia amigável para se estabelecer em Pittsburgh e no Condado de Allegheny. Seja você um profissional de tecnologia ou um recém-chegado buscando um novo começo, o Pittsburgh Tomorrow Pioneer conecta você a recursos locais para moradia, educação, emprego e comunidade.',
    features: [
      'Mais de 161 organizações sem fins lucrativos',
      'Listas de verificação e roteiros personalizados',
      'Apoio para recém-chegados imigrantes independentes e tradicionais',
      'Triagem fácil para corresponder às suas necessidades',
    ],
    conclusion: 'Este projeto é uma colaboração de parceiros locais e voluntários, dedicados a tornar Pittsburgh acolhedor, solidário e cheio de oportunidades para todos.',
    copyright: 'Pittsburgh Tomorrow Pioneer. Todos os direitos reservados.',
    
    // AboutPage specific content
    welcomeText: 'Bem-vindo ao Pittsburgh Tomorrow Pioneer, seu guia pessoal para começar uma nova vida em Pittsburgh e no Condado de Allegheny. Se você acabou de chegar aos EUA ou aceitou um novo emprego em uma das empresas em crescimento de Pittsburgh em energia, robótica, IA, ciências da vida ou aço — o Pittsburgh Tomorrow Pioneer está aqui para ajudar. Desde encontrar moradia até matricular seus filhos na escola, desde localizar aulas de inglês até conectar-se com comunidades de fé ou apoio alimentar local, o Pittsburgh Tomorrow Pioneer reúne todos os recursos que você precisa em um só lugar.',
    
    whyPioneerTitle: 'Por que Pittsburgh Tomorrow Pioneer?',
    whyPioneerText1: 'Porque começar de novo em uma nova cidade não deveria significar começar do zero.',
    whyPioneerText2: 'O Pittsburgh Tomorrow Pioneer reúne tudo que você precisa para começar uma nova vida em Pittsburgh e no Condado de Allegheny — tudo em um lugar confiável e fácil de usar.',
    whyPioneerText3: 'É gratuito, abrangente e projetado para economizar horas de busca, comparação e dúvidas. Seja encontrando moradia, matriculando seus filhos na escola, aprendendo inglês ou procurando conhecer pessoas que compartilham sua fé, idioma ou interesses — o Pittsburgh Tomorrow Pioneer garante que você não perca uma única oportunidade de tornar sua mudança mais suave e sua nova vida mais rica.',
    whyPioneerText4: 'Onde uma busca no Google mostra tudo, o Pittsburgh Tomorrow Pioneer mostra exatamente o que importa.',
    whyPioneerText5: 'Onde um chatbot de IA oferece respostas, o Pioneer oferece um roteiro.',
    whyPioneerText6: 'Onde a maioria das ferramentas de realocação para na logística, o Pioneer começa com a comunidade.',
    whyPioneerText7: 'É Pittsburgh, personalizado.',
    
    youAreThePioneerTitle: 'Você é o Pioneer',
    youAreThePioneerText1: 'Você não está apenas se mudando — você está começando algo novo. Um novo emprego. Uma nova escola. Um novo lar. E talvez até um novo idioma ou cultura. Isso requer coragem.',
    youAreThePioneerText2: 'Construímos o Pittsburgh Tomorrow Pioneer para apoiá-lo — porque você é o Pioneer. Este site está aqui para caminhar ao seu lado enquanto você constrói um futuro em Pittsburgh.',
    
    howPioneerHelpsTitle: 'Como o Pittsburgh Tomorrow Pioneer Ajuda',
    
    madeForYouTitle: 'Feito para Você — De Onde Você Vier',
    madeForYouDescription: 'Sabemos que nem todos falam inglês como primeira língua. É por isso que o Pittsburgh Tomorrow Pioneer suporta dezenas de idiomas globais, incluindo espanhol, árabe, francês, chinês, dari e mais. Se você digitar em seu idioma nativo, o Pittsburgh Tomorrow Pioneer responderá da mesma forma.',
    
    personalRoadmapTitle: 'Crie Seu Roteiro Pessoal',
    personalRoadmapDescription: 'Nossa ferramenta mais poderosa é seu roteiro personalizado — uma lista de verificação feita especialmente para você. Ao responder algumas perguntas simples sobre suas necessidades (moradia, comida, trabalho, educação, etc.), o Pittsburgh Tomorrow Pioneer cria um plano de ação sob medida para apoiar seus próximos passos. Você pode:',
    personalRoadmapFeatures: [
      'Visualizar e atualizar seu roteiro a qualquer momento',
      'Salvar seu progresso fazendo login (opcional)',
      'Baixar ou imprimir sua lista de verificação para mantê-la com você',
      'Revisitar e refinar seu roteiro conforme sua vida em Pittsburgh cresce'
    ],
    personalRoadmapNote: 'Se você preferir explorar no seu próprio ritmo, pode navegar em nossa biblioteca completa de recursos sem fazer login.',
    
    smartSupportTitle: 'Apoio Inteligente e Autodirigido',
    smartSupportDescription: 'O Pittsburgh Tomorrow Pioneer apresenta um chatbot de IA amigável treinado para responder centenas de perguntas comuns. Ele pode guiá-lo a recursos, explicar como os sistemas locais funcionam e ajudá-lo a dar o próximo passo. Também há um diretório completo de informações de contato para nossos parceiros confiáveis — agências públicas, organizações sem fins lucrativos, provedores de serviços e mais.',
    
    trustedPartnersTitle: 'Parceiros Confiáveis',
    trustedPartnersDescription: 'Acesse nosso diretório completo de parceiros confiáveis — agências públicas, organizações sem fins lucrativos e provedores de serviços em toda Pittsburgh e Condado de Allegheny. Nossa rede inclui mais de 380 organizações sem fins lucrativos prontas para ajudar com suas necessidades específicas.',
    
    privacyTitle: 'Sua Privacidade, Protegida',
    privacyDescription: 'Sua privacidade e segurança são importantes para nós. Se você optar por criar uma conta, seus dados pessoais são protegidos por protocolos de segurança compatíveis com SOC II. Nunca venderemos ou compartilharemos seus dados. Você permanece com controle total de suas informações em todos os momentos.',
    
    pittsburghTomorrowTitle: 'Sobre o Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'O Pittsburgh Tomorrow Pioneer é uma iniciativa do Pittsburgh Tomorrow, uma organização sem fins lucrativos com a missão de fazer Pittsburgh crescer. Estamos catalisando o novo espírito que está redefinindo o que o historiador David McCullough chamou de "Cidade Indispensável da América".',
    pittsburghTomorrowText2: 'A região que construiu a América do zero está crescendo com uma nova vitalidade e espírito cívico: acolhendo recém-chegados, lançando empreendedores e abrindo novos caminhos. Nosso movimento é impulsionado por uma nova onda de pioneiros, primeiros a agir e assumidores de riscos que estão aproveitando oportunidades e construindo o futuro — em Pittsburgh.',
    pittsburghTomorrowText3: 'No Pittsburgh Tomorrow, temos a missão de fazer Pittsburgh crescer. E isso não significa apenas crescimento populacional ou econômico; significa revitalizar o espírito de nossa cidade. Apoiando pequenas empresas e empreendedores. Embelezando e preservando nosso ambiente. Promovendo artes e cultura. Acolhendo recém-chegados e criando comunidade. Tendo orgulho de nossa cidade e colocando-a de volta no mapa.',
    pittsburghTomorrowLink: 'Saiba Mais',
    
    // Call to action section
    readyToStartTitle: 'Comece Sua Jornada em Pittsburgh',
    readyToStartDescription: 'Construa seu roteiro personalizado para ajudá-lo a se estabelecer e prosperar em seu novo lar.',
    getStarted: 'Começar',
    browseResources: 'Navegar Recursos',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'Voltar para Sobre',
    title: 'Transparência de Dados e Declaração de Privacidade',
    description: 'No Pittsburgh Tomorrow, valorizamos a transparência e sua confiança. Acreditamos que você tem o direito de entender exatamente por que solicitamos certas informações, como as usamos e como isso o beneficia.',
    
    whyWeAskTitle: 'Por Que Fazemos Essas Perguntas e Como Usamos Suas Informações:',
    whyWeAskDescription: 'As perguntas que fazemos são projetadas para nos ajudar a criar um roteiro personalizado para você. Suas respostas nos permitem:',
    whyWeAskBullet1: 'Extrair recursos e informações relevantes de nosso banco de dados adaptados às suas necessidades.',
    whyWeAskBullet2: 'Garantir que estamos alcançando pessoas de forma equitativa em todas as comunidades e origens.',
    whyWeAskBullet3: 'Identificar lacunas em quem estamos servindo para que possamos alcançar melhor aqueles que podem estar faltando.',
    whyWeAskBullet4: 'Melhorar nossas ferramentas de IA para que estejam melhor equipadas para servir todos os usuários com eficácia.',
    weDoNotSell: 'Não vendemos seus dados. Usamos apenas para os fins listados acima.',
    
    dataRetentionTitle: 'Retenção de Dados:',
    dataRetentionDescription: 'Mantemos suas informações em nosso banco de dados até que você nos informe que não deseja mais acessar seu painel personalizado. Depois disso, seus dados serão anonimizados e usados apenas para melhorar nossos serviços de IA para ajudar outros recém-chegados a Pittsburgh.',
    
    quomeTitle: 'Como o Quome Usa Seus Dados:',
    quomeDescription: 'Nosso site é hospedado pelo Quome, que pode coletar certos dados para operar e melhorar a plataforma. Você pode saber mais sobre como o Quome usa e protege seus dados revisando',
    
    skillBuilderTitle: 'Como o Skill Builder Usa Seus Dados:',
    skillBuilderDescription: 'O chatbot de nosso site é hospedado pelo SkillBuilder.io, que pode coletar certos dados para operar e melhorar a plataforma. Você pode saber mais sobre como o SkillBuilder.io usa e protege seus dados revisando',
    
    contactDescription: 'Se você tiver perguntas sobre nosso uso de dados ou práticas de privacidade, use nosso botão de Feedback no lado direito de cada página para entrar em contato conosco.',
    privacyPolicyLink: 'Política de Privacidade'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'Sobre o Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'O Pittsburgh Tomorrow Pioneer ajuda recém-chegados a Pittsburgh e Condado de Allegheny a encontrar seu caminho. Conectamos você aos recursos e oportunidades certos, não importa qual seja sua jornada.',
    quickLinks: 'Links Rápidos',
    home: 'Início',
    about: 'Sobre',
    resources: 'Recursos',
    privacyPolicy: 'Política de Privacidade',
    getStarted: 'Começar',
    contact: 'Contato',
    location: 'Olá de Pittsburgh, PA',
    email: 'E-mail: Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'Bem-vindo, {{name}}!',
    welcomeStudent: 'Bem-vindo de volta, {{name}}!',
    welcomeProfessional: 'Bem-vindo, {{name}}!',
    welcomeLocal: 'Olá {{name}}!',
    
    subtitleImmigrant: 'Sua jornada de estabelecimento começa aqui',
    subtitleStudent: 'Seu sucesso acadêmico é nossa prioridade',
    subtitleProfessional: 'Seu crescimento na carreira é nosso foco',
    subtitleLocal: 'Ajude a tornar Pittsburgh acolhedor para todos',
    
    demoUserNote: 'Você está visualizando o Pittsburgh Tomorrow Pioneer como usuário **{{role}}**. A experiência é personalizada para sua função.',
    userBadge: 'usuário {{role}}',
    
    urgentResources: 'Recursos Urgentes',
    
    // Resource categories
    emergencyServices: 'Serviços de Emergência',
    emergencyDescription: 'Apoio de crise 24/7 e assistência imediata',
    temporaryHousing: 'Moradia Temporária',
    temporaryHousingDescription: 'Programas de abrigo e assistência habitacional',
    healthcareAccess: 'Acesso à Saúde',
    healthcareDescription: 'Serviços médicos e ajuda com seguro de saúde',
    languageServices: 'Serviços de Idioma',
    languageServicesDescription: 'Apoio de tradução e interpretação',
    
    // Additional resource categories for other roles
    academicSupport: 'Apoio Acadêmico',
    academicSupportDescription: 'Tutoria, grupos de estudo e recursos acadêmicos',
    studentHousing: 'Moradia Estudantil',
    studentHousingDescription: 'Opções de moradia no campus e fora do campus',
    financialAid: 'Auxílio Financeiro',
    financialAidDescription: 'Bolsas de estudo, subsídios e assistência financeira',
    studentGroups: 'Grupos Estudantis',
    studentGroupsDescription: 'Organizações e clubes de estudantes internacionais',
    professionalNetworks: 'Redes Profissionais',
    professionalNetworksDescription: 'Encontros da indústria e eventos de networking',
    careerDevelopment: 'Desenvolvimento de Carreira',
    careerDevelopmentDescription: 'Programas de treinamento de habilidades e certificação',
    professionalHousing: 'Moradia Profissional',
    professionalHousingDescription: 'Moradia executiva e serviços de realocação',
    mentorship: 'Mentoria',
    mentorshipDescription: 'Programas de mentoria e orientação profissional',
    volunteerOpportunities: 'Oportunidades de Voluntariado',
    volunteerOpportunitiesDescription: 'Formas de ajudar recém-chegados em sua comunidade',
    communityOrganizations: 'Organizações Comunitárias',
    communityOrganizationsDescription: 'Organizações sem fins lucrativos locais e provedores de serviços',
    supportNetworks: 'Redes de Apoio',
    supportNetworksDescription: 'Programas de mentoria e amizade',
    culturalExchange: 'Intercâmbio Cultural',
    culturalExchangeDescription: 'Eventos e programas interculturais',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'Entre para explorar sua jornada personalizada em Pittsburgh',
    signInToPioneer: 'Entrar no Pittsburgh Tomorrow Pioneer',
    welcomeTitle: 'Bem-vindo ao Pittsburgh Tomorrow Pioneer, {{name}}!',
    welcomeTitleWithoutName: 'Bem-vindo ao Pittsburgh Tomorrow Pioneer!',
    journeyContinues: 'Sua jornada personalizada continua...',
    beginJourney: 'Comece sua jornada personalizada em Pittsburgh',
    completedSurveyHeader: 'Você Já Concluiu a Pesquisa',
    completedSurveyText: 'Você concluiu sua pesquisa de integração. Visualize seu roteiro personalizado abaixo ou edite suas respostas para atualizar suas recomendações.',
    completedSurveyTextWithDate: 'Você concluiu sua pesquisa de integração em {{date}}. Visualize seu roteiro personalizado abaixo ou edite suas respostas para atualizar suas recomendações.',
    editResponses: 'Editar Respostas',
    viewMyRoadmap: 'Ver Meu Roteiro',
    noteLabel: 'Nota:',
    editRegenerateNote: 'Se você editar suas respostas da pesquisa, suas recomendações e roteiro personalizados serão automaticamente regenerados para corresponder melhor às suas preferências atualizadas.',
    bridgitHelp: 'Tem perguntas não cobertas pela pesquisa? Clique no chatbot BRIDGIT no canto inferior direito para assistência personalizada!',
    personalizedRoadmap: 'Seu Roteiro Personalizado',
    unlockExperience: 'Desbloqueie sua experiência personalizada',
    completeSurveyHeader: 'Conclua Sua Pesquisa para Começar',
    completeSurveyText: 'Faça nossa pesquisa rápida de 5 minutos para receber recomendações de recursos personalizados adaptadas especificamente às suas necessidades e objetivos em Pittsburgh.',
  },
  
  // Profile page
  profile: {
    title: 'Configurações do Perfil',
    subtitle: 'Gerencie suas informações pessoais e preferências',
    accountInformation: 'Informações da Conta',
    accountInformationDescription: 'Atualize os detalhes básicos da sua conta',
    basicInformation: 'Informações Básicas',
    basicInformationDescription: 'Atualize seus detalhes pessoais básicos',
    firstName: 'Nome',
    enterFirstName: 'Digite seu nome',
    lastName: 'Sobrenome',
    enterLastName: 'Digite seu sobrenome',
    username: 'Nome de usuário',
    enterUsername: 'Digite seu nome de usuário',
    email: 'E-mail',
    emailChangeNote: 'O e-mail não pode ser alterado. Entre em contato com o suporte se precisar atualizar seu e-mail.',
    emailCannotBeChanged: 'O e-mail não pode ser alterado. Entre em contato com o suporte se precisar atualizar seu e-mail.',
    surveyRequired: 'Conclua Sua Pesquisa Primeiro',
    surveyRequiredDescription: 'Para obter recomendações personalizadas e editar suas respostas da pesquisa, você precisa concluir a pesquisa de avaliação inicial primeiro.',
    takeSurvey: 'Fazer a Pesquisa',
    basicQuestions: 'Informações Básicas',
    basicQuestionsDescription: 'Conte-nos sobre você e sua situação para obter recomendações personalizadas',
    selectPrimary: 'Selecione sua preferência principal:',
    selectOption: 'Selecione uma opção...',
    supportNeeds: 'Apoio e Necessidades',
    supportNeedsDescription: 'Que tipo de apoio e serviços você precisa?',
    selectMultiple: 'Selecione todas as que se aplicam:',
    selectAtLeastOne: 'Por favor, selecione pelo menos uma opção.',
    timelinePreferences: 'Cronograma e Preferências',
    timelinePreferencesDescription: 'Seu cronograma e preferências de tecnologia',
    backToDashboard: 'Voltar para o Painel',
    languageAndCultural: 'Idioma e Origem Cultural',
    languageAndCulturalDescription: 'Ajude-nos a fornecer melhores recomendações personalizadas',
    primaryLanguage: 'Idioma Principal',
    selectPrimaryLanguage: 'Selecione seu idioma principal',
    culturalBackground: 'Origem Cultural',
    selectCulturalBackground: 'Selecione sua origem cultural',
    professionalAndLiving: 'Situação Profissional e de Vida',
    professionalAndLivingDescription: 'Isso nos ajuda a recomendar recursos e serviços relevantes',
    professionalStatus: 'Status Profissional',
    selectProfessionalStatus: 'Selecione seu status profissional',
    housingSituation: 'Situação Habitacional',
    selectHousingSituation: 'Selecione sua situação habitacional',
    familyStatus: 'Status Familiar',
    selectFamilyStatus: 'Selecione seu status familiar',
    saveChanges: 'Salvar Alterações',
    saving: 'Salvando...',
    recalculatingRecommendations: 'Recalculando recomendações...',
    profileUpdated: 'Perfil Atualizado',
    profileUpdatedDescription: 'Seu perfil foi atualizado com sucesso.',
    accountUpdated: 'Conta Atualizada',
    accountUpdatedDescription: 'Suas informações da conta foram atualizadas com sucesso. Conclua a pesquisa para salvar suas preferências.',
    updateFailed: 'Atualização Falhou',
    updateFailedDescription: 'Falha ao atualizar o perfil. Por favor, tente novamente.',
    pleaseLogIn: 'Por favor, entre para visualizar seu perfil.',
    
    // Language options
    languages: {
      english: 'Inglês',
      spanish: 'Espanhol',
      french: 'Francês',
      arabic: 'Árabe',
      chinese: 'Chinês',
      swahili: 'Suaíli',
      hindi: 'Hindi',
      portuguese: 'Português',
      russian: 'Russo',
      nepali: 'Nepalês',
      somali: 'Somali',
      tagalog: 'Tagalo',
      turkish: 'Turco',
      other: 'Outro',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'Americano/Ocidental',
      westAfrican: 'África Ocidental',
      middleEasternNorthAfrican: 'Oriente Médio/Norte da África',
      southAsian: 'Sul da Ásia (incluindo butanês)',
      latinoHispanic: 'Latino/Hispânico',
      eastAsian: 'Ásia Oriental',
      easternEuropean: 'Europa Oriental',
      other: 'Outro/Prefiro não dizer',
    },
    
    // Professional status options
    professionalStatuses: {
      student: 'Estudante',
      graduateStudent: 'Pós-graduando',
      softwareEngineer: 'Engenheiro de software',
      healthcareProfessional: 'Profissional de saúde',
      researchScientist: 'Cientista pesquisador',
      seekingEmployment: 'Procurando emprego',
      employedFullTime: 'Empregado em tempo integral',
      employedPartTime: 'Empregado em meio período',
      selfEmployed: 'Autônomo',
      retired: 'Aposentado',
      other: 'Outro',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: 'Moradia temporária',
      campusHousing: 'Moradia no campus',
      apartmentHunting: 'Procurando apartamento',
      rentingApartment: 'Alugando apartamento',
      rentingHouse: 'Alugando casa',
      homeowner: 'Proprietário',
      livingWithFamily: 'Morando com a família',
      sharedHousing: 'Moradia compartilhada',
      other: 'Outro',
    },
    
    // Family status options
    familyStatuses: {
      single: 'Solteiro',
      married: 'Casado',
      familyWithChildren: 'Família com crianças',
      singleParent: 'Pai/mãe solteiro',
      extendedFamily: 'Família estendida',
      other: 'Outro',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'Como devemos chamá-lo?',
    description: 'Ajude-nos a personalizar sua experiência nos contando seu nome.',
    firstName: 'Nome',
    firstNamePlaceholder: 'Digite seu nome',
    lastName: 'Sobrenome',
    lastNamePlaceholder: 'Digite seu sobrenome (opcional)',
    skip: 'Pular por enquanto',
    save: 'Salvar Nome',
    saving: 'Salvando...',
    firstNameRequired: 'Nome obrigatório',
    firstNameRequiredDescription: 'Por favor, digite seu nome para continuar.',
    nameUpdated: 'Nome atualizado',
    nameUpdatedDescription: 'Seu nome foi salvo com sucesso.',
    updateFailed: 'Atualização falhou',
    updateFailedDescription: 'Falha ao atualizar seu nome. Por favor, tente novamente.',
  },
  
  // Common elements
  common: {
    dashboard: 'Painel',
    loading: 'Carregando...',
    search: 'Pesquisar',
    filter: 'Filtrar',
    next: 'Próximo',
    previous: 'Anterior',
    save: 'Salvar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    edit: 'Editar',
    delete: 'Excluir',
    close: 'Fechar',
    back: 'Voltar',
    backToResources: 'Voltar para Recursos',
    viewDetails: 'Ver Detalhes',
    learnMore: 'Saiba Mais',
    getHelp: 'Obter Ajuda',
    startNow: 'Começar Agora',
    tryNow: 'Experimentar Agora',
    downloadNow: 'Baixar Agora',
    visitWebsite: 'Visitar',
    shareThis: 'Compartilhar Isso',
    copied: 'Copiado!',
    copy: 'Copiar',
    show: 'Mostrar',
    hide: 'Ocultar',
    expand: 'Expandir',
    collapse: 'Recolher',
    seeMore: 'Ver mais',
    seeLess: 'Ver menos',
    showingTopOf: 'Mostrando os {{current}} principais de {{total}} recursos',
    selectLanguage: 'Selecionar Idioma',
    personalizedRecommendationsLabel: 'Recomendações Personalizadas',
    exploreResourcesNowLabel: 'Explorar recursos agora',
    curatedAdviceLabel: 'Conselhos curados para o sucesso',
    
    // Accessibility and UI labels
    toggleSidebar: 'Alternar Barra Lateral',
    toggleMobileMenu: 'Alternar menu móvel',
    feedback: 'Feedback',
    openInNewTab: 'Abrir em nova aba',
    removeBookmark: 'Remover favorito',
    editResource: 'Editar recurso',
    deleteResource: 'Excluir recurso',
    dragToReorder: 'Arrastar para reordenar',
    saveOrPrintOptions: 'Opções de Salvar ou Imprimir',
    filterByCategory: 'Filtrar por categoria',
    openChatAssistant: 'Abrir chat com assistente de IA BRIDGIT',
    askBridget: 'Perguntar ao BRIDGIT',
    bridgitComingSoonTitle: 'BRIDGIT: Em Breve!',
    bridgitComingSoonDescription: 'Nosso assistente de IA BRIDGIT está atualmente em desenvolvimento. Fique atento para atualizações!',
    
    // Content section headers
    description: 'Descrição',
    services: 'Serviços',
    languages: 'Idiomas',
    languagesSupported: 'Idiomas Suportados',
    available: 'Disponível',
    resources: 'Recursos',
    exploreResources: 'Explorar recursos',
    
    // Admin interface
    authenticationRequired: 'Autenticação Necessária',
    organizationName: 'Nome da Organização',
    website: 'Site',
    shortDescription: 'Descrição Curta',
    fullDescription: 'Descrição Completa',
    affiliation: 'Afiliação',
    financialData: 'Dados Financeiros',
    serviceDetails: 'Detalhes do Serviço',
    categories: 'Categorias',
    servicesProvided: 'Serviços Fornecidos',
    totalResources: 'Total de Recursos',
    publishingStatus: 'Status de Publicação',
    totalUsers: 'Total de Usuários',
    adminUsers: 'Usuários Administradores',
    demoUsers: 'Usuários de Demonstração',
    noResourcesFound: 'Nenhum recurso encontrado',
    
    // Form placeholders
    placeholders: {
      organizationName: 'Nome da organização',
      briefDescription: 'Descrição breve',
      detailedDescription: 'Descrição detalhada de serviços e programas',
      organizationAffiliation: 'Afiliação ou rede da organização',
      partnersCollaborating: 'Lista de parceiros e organizações colaboradoras',
      availableOnline: 'Disponível online',
    },
    
    // Additional UI elements
    backToHome: 'Voltar para Início',
    goHome: 'Ir para Início',
    browseResources: 'Navegar Recursos',
    needPersonalizedRecommendations: 'Precisa de Recomendações Personalizadas?',
    personalizedRecommendationsDescription: 'Faça nossa triagem rápida para obter uma lista de verificação personalizada com recursos especificamente escolhidos para suas necessidades.',
    getYourPersonalRoadmap: 'Obtenha Seu Roteiro Pessoal',
    allRightsReserved: 'Todos os direitos reservados',
    initiativeOfPittsburghTomorrow: 'Uma iniciativa do Pittsburgh Tomorrow',
    viewingAsUserNotification: 'Você está visualizando o Pittsburgh Tomorrow Pioneer como usuário {{role}}. A experiência é personalizada para sua função.',
    priorityResourcesForYou: 'Recursos Prioritários para Você',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'Com base em suas respostas da pesquisa, você não precisa de assistência específica no momento. Se sua situação mudar, você pode atualizar seu perfil. Caso contrário, sinta-se à vontade para explorar todos os recursos disponíveis.',
    editProfile: 'Atualizar Perfil',
    exploreAllResources: 'Explorar Todos os Recursos',
    
    // Priority Categories
    priorityCategories: {
      housing: 'Moradia',
      education: 'Educação', 
      income: 'Renda',
      first_things_first: 'Primeiro o Mais Importante',
      meeting_people: 'Conhecer Pessoas',
      kids_activities: 'Atividades para Crianças',
      faith_communities: 'Comunidades de Fé',
      sports_wellness: 'Esportes e Bem-estar',
      arts_entertainment: 'Artes e Entretenimento',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: 'Encontrar moradia acessível e apoio financeiro.',
      education: 'Apoio profissional em inglês e outros idiomas.',
      income: 'Apoio para busca de emprego e desenvolvimento de habilidades.',
      first_things_first: 'Assistência com auxílio de emergência, saúde mental e matrícula.',
      meeting_people: 'Conecte-se através de redes profissionais e eventos sociais.',
      kids_activities: 'Programas para família e crianças disponíveis.',
      faith_communities: 'Encontre grupos de fé e cultura locais.',
      sports_wellness: 'Explore oportunidades de esportes e recreação.',
      arts_entertainment: 'Descubra eventos artísticos e culturais locais.',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'Visualizar e gerenciar seus recursos favoritos',
    searchYourBookmarks: 'Pesquisar seus favoritos...',
    showingBookmarks: 'Mostrando {{count}} de {{total}} recursos favoritos',
    showingBookmarksPaginated: 'Mostrando {{start}}-{{end}} de {{total}} favoritos',
    failedToLoadBookmarks: 'Falha ao carregar favoritos. Por favor, tente novamente.',
    bookmarkedOn: 'Favoritado em',
    noBookmarksMatchFilters: 'Nenhum favorito corresponde aos seus filtros atuais.',
    
    // Additional UI elements - screening form
    stepOf: 'Etapa {{current}} de {{total}}',
    percentComplete: '{{percent}}% Concluído',
    previousButton: 'Anterior',
    nextButton: 'Próximo',
    creatingYourPlan: 'Criando Seu Plano...',
    completeAssessment: 'Concluir Avaliação',
    
    // Bookmarks empty state
    noBookmarksYet: 'Ainda Não Há Favoritos',
    startExploringBookmark: 'Comece a explorar recursos e marque como favorito os que você achar úteis!',
    pageOf: 'Página {{current}} de {{total}}',
    yourPersonalizedRoadmap: 'Seu Roteiro Personalizado',
    resourcesReadyForYou: '{{count}} recursos prontos para você',
    seeMoreResources: 'Explorar Todos os Recursos',
    discoveringPerfectResources: 'Descobrindo Seus Recursos Perfeitos',
    noRecommendationsYet: 'Suas recomendações personalizadas estão sendo preparadas. Explore nosso diretório de recursos para começar.',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'Página Não Encontrada',
    pageNotFoundDescription: 'A página que você está procurando não existe ou foi movida.',
  },
}
