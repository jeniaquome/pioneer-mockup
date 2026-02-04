import type { TranslationStructure } from '../types'

export const chineseTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: '首页',
    dashboard: '仪表板',
    adminDashboard: '管理仪表板',
    welcome: '欢迎',
    resources: '资源',
    bookmarks: '我的书签',
    about: '关于',
    myChecklist: '我的清单',
    signIn: '登录',
    signUp: '注册',
    accountSettings: '个人资料设置',
    signOut: '退出',
    settings: '设置',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: '欢迎来到Pittsburgh Tomorrow Pioneer',
    heroWelcomeTo: '欢迎来到',
      heroPioneer: 'Pittsburgh Tomorrow Pioneer',
    heroDescription: '你在匹兹堡开始新生活的个人指南 — 免费、私密、多语言',
    heroExtendedDescription: '搬到匹兹堡？不要花费数小时搜索数十个网站或一次又一次地问同样的问题。Pittsburgh Tomorrow Pioneer是你的个人免费指南，提供帮助新移民快速、自信地安顿下来的所有资源——从住房和学校到语言、信仰和社区生活。这是在匹兹堡开始新篇章最完整、最节省时间和最热情的方式。',
    howCanWeHelp: '今天我们如何帮助你？',
    howCanWeHelpSubtitle: '选择你的路径以获得个性化推荐',
    createRoadmapTitle: '创建你的路线图',
    createRoadmapDescription: '回答一个简短的调查，接收针对你的具体需求和目标量身定制的个性化行动计划。',
    getStarted: '开始',
    browseResourcesTitle: '浏览资源',
    browseResourcesDescription: '探索我们按类别整理的服务、组织和资源的综合目录。',
    exploreDirectory: '探索目录',
    askBridgetTitle: '询问BRIDGIT',
    askBridgetDescription: '从我们的AI助手那里获得问题的即时答案。24/7全天候提供你的首选语言服务。',
    startChatting: '开始聊天',
    saveProgressQuestion: '想要保存你的进度并访问个性化功能吗？',
    signIn: '登录',
    createAccount: '创建账户',
    servicesNote: '所有服务完全免费、严格保密，并提供16种以上语言版本，包括英语、西班牙语、阿拉伯语、法语、中文和斯瓦希里语。',
    
    // Trust badges
    hundredPercentFree: '100% 免费',
    privateSecure: '私密安全',
    multilingualSupport: '多语言支持',
    languagesSupported: '支持 16+ 种语言，包括西班牙语、阿拉伯语、法语、普通话和斯瓦希里语。',
  },
  
  // Auth pages
  auth: {
    demoMode: '演示模式',
    demoModeDescription: '使用不同的用户档案试用Pittsburgh Tomorrow Pioneer，看看体验如何适应你的需求',
    whatYouExperience: '你将体验到什么',
    immigrantUser: '移民用户',
    immigrantFeatures: {
      emergency: '优先显示紧急资源',
      multilingual: '多语言支持',
      settlement: '以定居为重点的内容',
    },
    studentUser: '学生用户',
    studentFeatures: {
      academic: '学术资源',
      campus: '校园专属信息',
      career: '职业指导',
    },
    professionalUser: '专业用户',
    professionalFeatures: {
      networking: '行业网络',
      services: '专业服务',
      advancement: '职业发展',
    },
    localHelper: '本地助手',
    localFeatures: {
      community: '社区资源',
      volunteer: '志愿服务机会',
      support: '支持网络',
    },
    signIn: '登录',
    
    // Authentication required page
    authenticationRequired: '需要身份验证',
    loginToAccessPage: '你需要登录才能访问此页面。',
    
    // Login page
    emailVerified: '邮箱已验证',
    emailVerifiedDescription: '您的邮箱已成功验证。',
    alreadySignedIn: '已登录',
    redirectingToDashboard: '正在重定向到您的仪表板...',
    signInDescription: '登录以访问您的个性化匹兹堡资源和推荐。',
    signInWithAuth0: '登录',
    signInHelp: '登录遇到问题？请联系支持获取帮助。',
    loginError: '登录错误',
    loginErrorDescription: '登录时出现问题。请重试。',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: '试用演示账户',
    experienceDifferentPerspectives: '从不同用户视角体验Pittsburgh Tomorrow Pioneer',
    email: '电子邮件：',
    password: '密码：',
    loginAs: '以{{role}}用户身份登录',
    demoTip: '这些演示账户展示了不同的用户体验和个性化内容',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: '思考中...',
    curatingRecommendations: '正在整理个性化推荐...',
    findingResources: '正在寻找最佳资源...',
    complete: '完成！',
    creatingYourPlan: '正在创建您的个性化计划',
    ready: '准备就绪！',
    mayTakeAMoment: '我们正在为您个性化体验，这可能需要一点时间...',
    seeMyRecommendations: '查看我的推荐',
    loadingHint: '我们正在为您个性化体验，这可能需要一点时间...',
  },
  
  // Screening page
  screening: {
    title: '告诉我们关于你的情况',
    description: '回答几个快速问题，这样我们就可以为你创建在匹兹堡生活与发展的个性化指南。',
    saveRoadmapBanner: '创建账户即可保存你的个性化路线图。你现在可以匿名完成问卷，稍后登录保存。',
    
    // Progress indicator
    progress: '进度',
    completed: '已完成{{count}}个，共{{total}}个',
    
    // Questions
    questions: {
      audience: {
        question: '以下哪种情况最符合你的描述？',
        options: [
          '学生/专业人士（就读于匹兹堡地区大学或在机构工作）',
          '回流者（曾在此居住，离开后又回到匹兹堡地区）',
          '难民或临时保护身份（刚在此重新安置或从其他城市迁来）',
          '移居者（从美国其他城市迁移到匹兹堡）',
          '创业者（正在创办自己的企业）',
          '远程员工',
          '其他',
        ],
      },
      primaryLanguage: {
        question: '你的母语是什么？',
        options: [
          '英语（English）',
          '西班牙语（Español）',
          '阿拉伯语（العربية）',
          '斯瓦希里语（Kiswahili）',
          '乌兹别克语（Oʻzbekcha）',
          '尼泊尔语/不丹语（नेपाली / རྫོང་ཁ）',
          '达里语/普什图语（دری / پښتو）',
          '中文',
          '其他',
        ],
      },
      culturalBackground: {
        question: '什么文化或地区背景最能描述你？',
        options: [
          '白人',
          '黑人或非裔美国人（包括非洲和加勒比血统）',
          '西语裔或拉丁裔',
          '亚洲人（如：中国人、印度人、越南人）',
          '中东或北非',
          '夏威夷原住民或其他太平洋岛民',
          '美洲原住民或阿拉斯加原住民',
          '非洲人（如：尼日利亚人、埃塞俄比亚人、加纳人等）',
          '加勒比地区（如：牙买加人、海地人、特立尼达人等）',
          '其他',
          '不想回答',
        ],
      },
      housingNeed: {
        question: '你需要什么类型的住房支持？',
        options: [
          '帮助寻找社区和市场价公寓',
          '经济适用房援助和项目',
          '临时/紧急住房',
          '合租/室友匹配',
          '购房尝试的帮助',
          '我已有住房保障',
        ],
      },
      professionalStatus: {
        question: '你目前的职业状况是什么？',
        options: [
          '学生（本科/研究生/技校）',
          '技术专业人士/工程师',
          '医疗保健/生命科学专业人士',
          '学者/研究员',
          '求职中',
          '应届毕业生寻找工作',
          '其他专业人士',
        ],
      },
      languageSupport: {
        question: '什么语言支持会有帮助？',
        options: [
          '英语课程（ESL）——从初级到中级',
          '专业英语沟通技能',
          '文件翻译服务',
          '英语会话练习',
          '不需要语言支持',
        ],
      },
      employment: {
        question: '你对什么就业支持感兴趣？',
        options: [
          '专业网络和职业发展',
          '求职援助和简历帮助',
          '技能培训和认证项目',
          '行业特定网络（技术、医疗保健等）',
          '不需要就业支持，谢谢',
        ],
      },
      communityPriorities: {
        question: '什么社区联系对你最重要？（选择所有适用项）',
        options: [
          '专业网络和行业聚会',
          '文化和宗教社区',
          '社交活动和娱乐',
          '家庭和儿童服务',
          '体育和娱乐活动',
          '艺术和文化活动',
          '这些都不是',
        ],
      },
      immediateNeeds: {
        question: '你最迫切的需求是什么？（选择所有适用项）',
        options: [
          '认识人并结交新朋友',
          '基本服务（医疗保健、银行、交通）',
          '儿童入学',
          '法律/移民援助',
          '心理健康和健康支持',
          '紧急援助（食物、住所）',
          '这些都不是',
        ],
      },
      timeline: {
        question: '你在匹兹堡地区定居的时间表是什么？',
        options: [
          '刚刚到达（过去一个月内）',
          '最近到达（1-6个月）',
          '计划很快到达（接下来3个月）',
          '长期规划（6个月以上）',
          '已在匹兹堡地区定居',
        ],
      },
      // techComfort removed
    },
    
    // Form messages
    pleaseAnswer: '请回答这个问题。',
    pleaseAnswerAll: '请回答所有问题以继续',
    creatingGuide: '正在创建你的指南...',
    seePersonalizedGuide: '查看我的个性化指南',
    screeningQuestionnaire: '筛选问卷',
  },
  
  // Toolkit interface
  toolkit: {
    title: '新移民工具包',
    description: '找到您在匹兹堡定居和发展所需的资源和支持',
    categories: {
      housingAssistance: '住房援助',
      foodAssistance: '食物援助',
      entrepreneurHiringHub: '创业与就业中心',
      youthAdultEducation: '青少年和成人教育资源',
      eslImmigrantConnection: 'ESL与移民连接服务',
      socialConnectionCulture: '社交连接与文化',
    },
    chat: {
      bridgitTitle: '与BRIDGIT聊天',
      bridgitDescription: '获得个性化帮助和旅程指导',
    },
  },

  // Resource search
  resources: {
    title: '查找资源',
    searchPlaceholder: '搜索资源...',
    allCategories: '所有类别',
    housing: '住房',
    educationESL: '教育/英语学习',
    socialNetworking: '社交/网络',
    noResourcesFound: '未找到与你的搜索或筛选条件匹配的资源。',
    backToAllCategories: '返回所有类别',
    backToCategory: '返回{{category}}',
    welcomeToCategory: '欢迎来到{{category}}',
    categoryDescription: {
      housing: '寻找住房支持、租金援助和社区资源',
      foodAssistance: '找到食物银行、用餐计划和营养援助',
      entrepreneurHiring: '发现商业资源、工作机会和招聘支持',
      youthEducation: '获得教育项目、辅导和学习资源',
      eslImmigrant: '连接英语课程、移民服务和文化支持',
      socialConnection: '加入社区团体、文化活动和社交活动',
    },
    refreshBookmarks: '刷新书签（调试）',
    compare: '比较（{{count}}/3）',
    filterByLanguage: '按语言筛选：',
    showingResults: '显示{{current}}个，共{{total}}个资源',
    categoryTitles: {
      housingProcess: '匹兹堡住房流程',
      housingProcessDescription: '了解住房搜索流程和要求',
    },
    exploreResources: '探索资源',
    categoryNotFound: '找不到类别',
    subcategoryNotFound: '找不到子类别',
    clearFilters: '清除筛选',
    showingResultsFor: '关于',
    showingResultsIn: '在',
    compareSelected: '比较选定项',
    noResourcesFoundCategory: '此类别未找到资源。',
    browseSubcategoryDescription: '浏览此子类别中的资源。',
    
    // Global search
    globalSearch: {
      placeholder: '搜索所有资源...',
      button: '搜索',
    },
    searchResults: {
      title: '搜索结果',
      for: '关于',
      noResults: '未找到与您的搜索匹配的资源。',
      tryDifferent: '尝试不同的搜索词。',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: '欢迎来到',
      subcategories: {
        // Housing subcategories
        housingProcess: '匹兹堡住房流程',
        housingProcessDesc: '了解住房搜索流程和要求',
        neighborhoodResources: '社区和房地产资源',
        neighborhoodResourcesDesc: '发现社区和房地产信息',
        housingAssistanceSubcat: '住房援助',
        housingAssistanceSubcatDesc: '直接租金援助和住房支持服务',
        
        // Food subcategories
        culturalFood: '文化食品中心',
        culturalFoodDesc: '国际市场和文化食品资源',
        foodPantries: '食品银行',
        foodPantriesDesc: '紧急食品援助和食品储藏室',
        groceryGuide: '杂货店指南',
        groceryGuideDesc: '当地杂货店和购物援助',
        
        // Employment subcategories
        hiringHub: '您是正在寻找工作的移民或新移民吗？',
        hiringHubDesc: '查看我们的招聘中心！',
        entrepreneurship: '匹兹堡内的创业资源',
        entrepreneurshipDesc: '商业发展和创业资源',
        
        // Education subcategories
        schoolResources: '正在寻找新学校资源吗？',
        schoolResourcesDesc: '学校注册和教育资源',
        tutoring: '正在寻找大学预科或导师吗？',
        tutoringDesc: '辅导服务和大学预科',
        gedResources: '正在寻求获得GED吗？',
        gedResourcesDesc: 'GED准备和成人教育',
        
        // ESL & Immigration subcategories
        eslResources: '正在寻找ESL资源吗？',
        eslResourcesDesc: '英语学习和课程',
        documentation: '文档援助',
        documentationDesc: '移民文件和法律支持',
        basicNeeds: '基本需求援助',
        basicNeedsDesc: '基本服务和紧急支持',
        
        // Social subcategories
        fosterConnection: '促进联系的资源',
        fosterConnectionDesc: '社交团体和社区建设',
        culturalResourcesSocial: '食品和文化资源',
        culturalResourcesSocialDesc: '文化活动和食品传统',
        faithGroups: '宗教团体',
        faithGroupsDesc: '宗教社区和精神支持',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
        'community-belonging': '社区与归属',
          'culture-leisure': '文化、艺术与娱乐',
        'esl-immigrant': 'ESL与移民支持',
          'education-youth': '教育：成人与青年',
          'living-essentials': '生活必需',
          'work-business': '工作与商业资源',
      },
      categoryDescriptions: {
        'community-belonging': '在匹兹堡连接、参与并建立社区',
        'culture-leisure': '探索艺术、亲子活动、兴趣爱好和夜生活',
        'esl-immigrant': '语言学习、移民帮助和新移民服务',
          'education-youth': '成人学习、辅导与青年机会',
          'living-essentials': '住房、健康、交通与食品',
          'work-business': '工作、职业支持与商业资源',
      },
      subcategories: {
        'civic-government': '政府',
        'civic-advocacy': '地方倡议',
        'civic-volunteer': '志愿服务',
        'civic-youth': '青年参与',
        religion: '宗教',
        'social-connection': '社交联系',
        art: '艺术',
        family: '家庭娱乐',
        'beauty-hair': '美发 / 美容',
        'hobby-spaces': '兴趣空间',
        'night-life': '夜生活',
        'esl-support': '英语作为第二语言 (ESL) 支持',
        'general-law': '普通法律',
        'immigration-asylum': '移民 / 庇护',
        'refugee-immigrant-support': '难民 / 移民支持',
        'adult-education': '成人教育',
        'college-prep-tutoring': '大学预科 / 辅导',
        'youth-education': '青少年教育',
        'youth-programming': '青少年项目',
        'food-pantries': '食品银行',
        'grocery-guide': '超市指南',
        'specialty-stores': '特色商店',
        'guide-discover-pittsburgh': '发现匹兹堡',
        'guide-diverse-businesses': '多元企业',
        'guide-immigrant-services': '移民服务',
        'health-additional-support': '额外支持',
        'health-body-mind': '身心护理',
        'health-hospitals': '医院',
        'health-nutrition': '营养',
        'health-senior-care': '老年护理',
        'housing-buying-home': '购房',
        'housing-assistance': '住房援助',
        'housing-relocating': '搬迁至匹兹堡',
        'housing-rent': '租房',
        transportation: '公交',
        'business-development': '商业发展',
        'business-support': '企业支持',
        'career-support': '职业支持',
        'internship-opportunities': '实习机会',
      },
      groups: {
        'civic-engagement': '公民参与',
        legal: '法律',
        food: '食品',
        'pittsburgh-guides': '匹兹堡指南',
        health: '健康',
        housing: '住房',
        transit: '公交',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: '正在加载你的个性化清单...',
  },
  
  // About page
  about: {
    title: '关于Pittsburgh Tomorrow Pioneer',
    description: 'Pittsburgh Tomorrow Pioneer是你在匹兹堡和阿勒格尼县定居的友好指南。无论你是技术专业人士还是寻求新开始的新来者，Pittsburgh Tomorrow Pioneer都会将你与住房、教育、就业和社区的当地资源联系起来。',
    features: [
      '161+个非营利组织',
      '个性化清单和路线图',
      '支持独立和传统移民新来者',
      '轻松筛选以匹配你的需求',
    ],
    conclusion: '这个项目是当地合作伙伴和志愿者的协作成果，致力于让匹兹堡对所有人都充满欢迎、支持和机会。',
    copyright: 'Pittsburgh Tomorrow Pioneer。保留所有权利。',
    
    // AboutPage specific content
    welcomeText: '欢迎来到Pittsburgh Tomorrow Pioneer，你在匹兹堡和阿勒格尼县开始新生活的个人指南。无论你是刚到美国还是在匹兹堡能源、机器人、人工智能、生命科学或钢铁等蓬勃发展的公司找到了新工作——Pittsburgh Tomorrow Pioneer都在这里帮助你。从寻找住房到为孩子注册学校，从寻找英语课程到联系信仰社区或当地食物支持，Pittsburgh Tomorrow Pioneer将你需要的资源汇集在一个地方。',
    
    whyPioneerTitle: '为什么选择Pittsburgh Tomorrow Pioneer？',
    whyPioneerText1: '因为在新城市重新开始不应该意味着从零开始。',
    whyPioneerText2: 'Pittsburgh Tomorrow Pioneer汇集了你在匹兹堡和阿勒格尼县开始新生活所需的一切——全部在一个值得信赖、易于使用的地方。',
    whyPioneerText3: '它是免费的、全面的，旨在为你节省数小时的搜索、比较和犹豫时间。无论你是在寻找住房、为孩子注册学校、学习英语，还是寻找与你有相同信仰、语言或兴趣的人——Pittsburgh Tomorrow Pioneer确保你不会错过任何让搬家更顺利、新生活更丰富的机会。',
    whyPioneerText4: '谷歌搜索向你展示一切，Pittsburgh Tomorrow Pioneer向你展示真正重要的东西。',
    whyPioneerText5: 'AI聊天机器人提供答案，Pioneer给你路线图。',
    whyPioneerText6: '大多数搬迁工具止步于后勤，Pioneer从社区开始。',
    whyPioneerText7: '这是匹兹堡，为你量身定制。',
    
    youAreThePioneerTitle: '你是先驱者',
    youAreThePioneerText1: '你不仅仅是在搬家——你正在开始新的事业。新工作。新学校。新家。也许甚至是新语言或新文化。这需要勇气。',
    youAreThePioneerText2: '我们创建Pittsburgh Tomorrow Pioneer来支持你——因为你是先驱者。这个网站在这里陪伴你在匹兹堡建设未来。',
    
    howPioneerHelpsTitle: 'Pittsburgh Tomorrow Pioneer如何帮助',
    
    madeForYouTitle: '为你而做——无论你来自哪里',
    madeForYouDescription: '我们知道不是每个人都以英语为母语。这就是为什么Pittsburgh Tomorrow Pioneer支持数十种全球语言，包括西班牙语、阿拉伯语、法语、中文、达里语等等。如果你用母语输入，Pittsburgh Tomorrow Pioneer会用同样的语言回复。',
    
    personalRoadmapTitle: '创建你的个人路线图',
    personalRoadmapDescription: '我们最强大的工具是你的个性化路线图——专为你制作的清单。通过回答关于你需求的几个简单问题（住房、食物、工作、教育等），Pittsburgh Tomorrow Pioneer会创建量身定制的行动计划来支持你的下一步。你可以：',
    personalRoadmapFeatures: [
      '随时查看和更新你的路线图',
      '通过登录保存进度（可选）',
      '下载或打印你的清单随身携带',
      '随着你在匹兹堡生活的发展重新访问和完善你的路线图'
    ],
    personalRoadmapNote: '如果你喜欢按自己的节奏探索，你可以在不登录的情况下浏览我们完整的资源库。',
    
    smartSupportTitle: '智能、自导式支持',
    smartSupportDescription: 'Pittsburgh Tomorrow Pioneer配备了一个友好的AI聊天机器人，经过训练可以回答数百个常见问题。它可以引导你找到资源，解释当地系统如何运作，并帮助你迈出下一步。还有一个完整的目录，包含我们可信合作伙伴的联系信息——公共机构、非营利组织、服务提供商等等。',
    
    trustedPartnersTitle: '可信合作伙伴',
    trustedPartnersDescription: '访问我们完整的可信合作伙伴目录——整个匹兹堡和阿勒格尼县的公共机构、非营利组织和服务提供商。我们的网络包括380+个非营利组织，准备帮助解决你的特定需求。',
    
    privacyTitle: '你的隐私，受保护',
    privacyDescription: '你的隐私和安全对我们很重要。如果你选择创建账户，你的个人数据受到SOC II合规安全协议的保护。我们永远不会出售或分享你的数据。你始终完全控制你的信息。',
    
    pittsburghTomorrowTitle: '关于Pittsburgh Tomorrow',
    pittsburghTomorrowText1: 'Pittsburgh Tomorrow Pioneer是Pittsburgh Tomorrow的一项倡议，这是一个致力于发展匹兹堡的非营利组织。我们正在催化重新定义历史学家大卫·麦卡洛所称的"美国不可或缺之城"的新精神。',
    pittsburghTomorrowText2: '这个从头开始建设美国的地区正焕发出新的活力和公民精神：欢迎新来者，启动企业家，开辟新道路。我们的运动由新一波先驱者、先行者和风险承担者推动，他们抓住机遇并在匹兹堡建设未来。',
    pittsburghTomorrowText3: '在Pittsburgh Tomorrow，我们的使命是发展匹兹堡。这不仅仅意味着人口或经济增长；它意味着振兴我们城市的精神。支持小企业和企业家。美化和保护我们的环境。推广艺术和文化。欢迎新来者并创建社区。为我们的城市感到自豪，并将其重新放回地图上。',
    pittsburghTomorrowLink: '了解更多',
    
    // Call to action section
    readyToStartTitle: '在匹兹堡开始您的旅程',
    readyToStartDescription: '建立您的个性化路线图，帮助您在新家安顿下来并茁壮成长。',
    getStarted: '开始',
    browseResources: '浏览资源',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: '返回关于',
    title: '数据透明度与隐私声明',
    description: '在Pittsburgh Tomorrow，我们重视透明度和您的信任。我们相信您有权确切了解我们为什么询问某些信息，我们如何使用它，以及它如何使您受益。',
    
    whyWeAskTitle: '我们为什么询问这些问题以及如何使用您的信息：',
    whyWeAskDescription: '我们询问的问题旨在帮助我们为您创建定制化路线图。您的回答使我们能够：',
    whyWeAskBullet1: '从我们的数据库中提取针对您需求定制的相关资源和信息。',
    whyWeAskBullet2: '确保我们公平地接触到各个社区和背景的人群。',
    whyWeAskBullet3: '识别我们服务中的空白，以便更好地接触到可能被遗漏的人群。',
    whyWeAskBullet4: '改进我们的AI工具，使其更好地为所有用户有效服务。',
    weDoNotSell: '我们不出售您的数据。我们仅将其用于上述目的。',
    
    dataRetentionTitle: '数据保留：',
    dataRetentionDescription: '我们将您的信息保留在数据库中，直到您告知我们您不再希望访问您的定制化仪表板。之后，您的数据将被匿名化，仅用于改进我们的AI服务，以帮助其他匹兹堡新来者。',
    
    quomeTitle: 'Quome如何使用您的数据：',
    quomeDescription: '我们的网站由Quome托管，Quome可能收集某些数据来运营和改进平台。您可以通过查看他们的',
    
    skillBuilderTitle: 'Skill Builder如何使用您的数据：',
    skillBuilderDescription: '我们的网站聊天机器人由SkillBuilder.io托管，SkillBuilder.io可能收集某些数据来运营和改进平台。您可以通过查看他们的',
    
    contactDescription: '如果您对我们的数据使用或隐私做法有疑问，请使用每页右侧的反馈按钮联系我们。',
    privacyPolicyLink: '隐私政策'
  },
  
  // Footer
  footer: {
    aboutPioneer: '关于Pittsburgh Tomorrow Pioneer',
    aboutDescription: 'Pittsburgh Tomorrow Pioneer帮助匹兹堡和阿勒格尼县的新来者找到他们的道路。我们将你与合适的资源和机会联系起来，无论你的旅程如何。',
    quickLinks: '快速链接',
    home: '首页',
    about: '关于我们',
    resources: '资源',
    privacyPolicy: '隐私政策',
    getStarted: '开始',
    contact: '联系',
    location: '来自宾夕法尼亚州匹兹堡的问候',
    email: '电子邮件：Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: '欢迎，{{name}}！',
    welcomeStudent: '欢迎回来，{{name}}！',
    welcomeProfessional: '欢迎，{{name}}！',
    welcomeLocal: '你好{{name}}！',
    
    subtitleImmigrant: '你的定居之旅从这里开始',
    subtitleStudent: '你的学术成功是我们的首要任务',
    subtitleProfessional: '你的职业发展是我们的重点',
    subtitleLocal: '帮助让匹兹堡对每个人都充满欢迎',
    
    demoUserNote: '你正在以**{{role}}**用户身份查看Pittsburgh Tomorrow Pioneer。体验是为你的角色个性化的。',
    userBadge: '{{role}}用户',
    
    urgentResources: '紧急资源',
    
    // Resource categories
    emergencyServices: '紧急服务',
    emergencyDescription: '24/7危机支持和紧急援助',
    temporaryHousing: '临时住房',
    temporaryHousingDescription: '住所和住房援助项目',
    healthcareAccess: '医疗保健服务',
    healthcareDescription: '医疗服务和健康保险帮助',
    languageServices: '语言服务',
    languageServicesDescription: '翻译和口译支持',
    
    // Additional resource categories for other roles
    academicSupport: '学术支持',
    academicSupportDescription: '辅导、学习小组和学术资源',
    studentHousing: '学生住房',
    studentHousingDescription: '校内和校外住房选择',
    financialAid: '财政援助',
    financialAidDescription: '奖学金、助学金和财政援助',
    studentGroups: '学生组织',
    studentGroupsDescription: '国际学生组织和俱乐部',
    professionalNetworks: '专业网络',
    professionalNetworksDescription: '行业聚会和网络活动',
    careerDevelopment: '职业发展',
    careerDevelopmentDescription: '技能培训和认证项目',
    professionalHousing: '专业住房',
    professionalHousingDescription: '高管住房和搬迁服务',
    mentorship: '指导',
    mentorshipDescription: '专业指导和辅导项目',
    volunteerOpportunities: '志愿服务机会',
    volunteerOpportunitiesDescription: '帮助你社区中新来者的方式',
    communityOrganizations: '社区组织',
    communityOrganizationsDescription: '当地非营利组织和服务提供商',
    supportNetworks: '支持网络',
    supportNetworksDescription: '指导和友谊项目',
    culturalExchange: '文化交流',
    culturalExchangeDescription: '跨文化活动和项目',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: '登录以探索你的个性化匹兹堡之旅',
      signInToPioneer: '登录 Pittsburgh Tomorrow Pioneer',
    welcomeTitle: '欢迎来到 Pittsburgh Tomorrow Pioneer，{{name}}！',
    welcomeTitleWithoutName: '欢迎来到 Pittsburgh Tomorrow Pioneer！',
    journeyContinues: '你的个性化旅程继续...',
    beginJourney: '开始你的个性化匹兹堡之旅',
    completedSurveyHeader: '你已完成问卷',
    completedSurveyText: '你已完成入门问卷。请在下方查看你的个性化路线图，或编辑你的回答以更新推荐。',
    completedSurveyTextWithDate: '你在 {{date}} 完成了入门问卷。请在下方查看你的个性化路线图，或编辑你的回答以更新推荐。',
    editResponses: '编辑回答',
    viewMyRoadmap: '查看我的路线图',
    noteLabel: '提示：',
    editRegenerateNote: '如果你编辑问卷回答，你的个性化推荐和路线图会自动重新生成，以更好地匹配更新后的偏好。',
    bridgitHelp: '有问卷中没有涵盖的问题吗？点击右下角的BRIDGIT聊天机器人获取个性化帮助！',
    personalizedRoadmap: '你的个性化路线图',
    unlockExperience: '解锁你的个性化体验',
    completeSurveyHeader: '完成问卷即可开始',
    completeSurveyText: '完成我们仅需 5 分钟的快速问卷，以获得针对你在匹兹堡需求与目标量身定制的资源推荐。',
  },
  
  // Profile page
  profile: {
    title: '个人资料设置',
    subtitle: '管理你的个人信息和偏好',
    accountInformation: '账户信息',
    accountInformationDescription: '更新你的账户基本信息',
    basicInformation: '基本信息',
    basicInformationDescription: '更新你的基本个人详情',
    firstName: '名字',
    enterFirstName: '输入你的名字',
    lastName: '姓氏',
    enterLastName: '输入你的姓氏',
    username: '用户名',
    enterUsername: '输入你的用户名',
    email: '电子邮件',
    emailChangeNote: '电子邮件无法更改。如需更新，请联系支持。',
    emailCannotBeChanged: '电子邮件无法更改。如果你需要更新电子邮件，请联系支持。',
    surveyRequired: '请先完成问卷',
    surveyRequiredDescription: '要获得个性化推荐并编辑问卷回答，你需要先完成初始评估问卷。',
    takeSurvey: '进行问卷',
    basicQuestions: '基本信息',
    basicQuestionsDescription: '告诉我们你的情况以获得个性化推荐',
    selectPrimary: '选择你的主要偏好：',
    selectOption: '选择一个选项...',
    supportNeeds: '支持与需求',
    supportNeedsDescription: '你需要哪类支持与服务？',
    selectMultiple: '选择所有适用项：',
    selectAtLeastOne: '请至少选择一个选项。',
    timelinePreferences: '时间安排与偏好',
    timelinePreferencesDescription: '你的时间安排与技术偏好',
    backToDashboard: '返回仪表板',
    languageAndCultural: '语言和文化背景',
    languageAndCulturalDescription: '帮助我们提供更好的个性化建议',
    primaryLanguage: '母语',
    selectPrimaryLanguage: '选择你的母语',
    culturalBackground: '文化背景',
    selectCulturalBackground: '选择你的文化背景',
    professionalAndLiving: '职业和生活状况',
    professionalAndLivingDescription: '这有助于我们推荐相关的资源和服务',
    professionalStatus: '职业状况',
    selectProfessionalStatus: '选择你的职业状况',
    housingSituation: '住房状况',
    selectHousingSituation: '选择你的住房状况',
    familyStatus: '家庭状况',
    selectFamilyStatus: '选择你的家庭状况',
    saveChanges: '保存更改',
    saving: '正在保存...',
    recalculatingRecommendations: '正在重新计算推荐...',
    profileUpdated: '个人资料已更新',
    profileUpdatedDescription: '你的个人资料已成功更新。',
    accountUpdated: '账户已更新',
    accountUpdatedDescription: '你的账户信息已成功更新。完成问卷以保存你的偏好。',
    updateFailed: '更新失败',
    updateFailedDescription: '个人资料更新失败。请重试。',
    pleaseLogIn: '请登录以查看你的个人资料。',
    
    // Language options
    languages: {
      english: '英语',
      spanish: '西班牙语',
      french: '法语',
      arabic: '阿拉伯语',
      chinese: '中文',
      swahili: '斯瓦希里语',
      hindi: '印地语',
      portuguese: '葡萄牙语',
      russian: '俄语',
      nepali: '尼泊尔语',
      somali: '索马里语',
      tagalog: '他加禄语',
      turkish: '土耳其语',
      other: '其他',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: '美国/西方',
      westAfrican: '西非',
      middleEasternNorthAfrican: '中东/北非',
      southAsian: '南亚（包括不丹）',
      latinoHispanic: '拉丁美洲/西班牙裔',
      eastAsian: '东亚',
      easternEuropean: '东欧',
      other: '其他/不愿透露',
    },
    
    // Professional status options
    professionalStatuses: {
      student: '学生',
      graduateStudent: '研究生',
      softwareEngineer: '软件工程师',
      healthcareProfessional: '医疗保健专业人士',
      researchScientist: '研究科学家',
      seekingEmployment: '求职中',
      employedFullTime: '全职就业',
      employedPartTime: '兼职就业',
      selfEmployed: '自雇',
      retired: '退休',
      other: '其他',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: '临时住房',
      campusHousing: '校园住房',
      apartmentHunting: '寻找公寓',
      rentingApartment: '租赁公寓',
      rentingHouse: '租赁房屋',
      homeowner: '房主',
      livingWithFamily: '与家人同住',
      sharedHousing: '合租住房',
      other: '其他',
    },
    
    // Family status options
    familyStatuses: {
      single: '单身',
      married: '已婚',
      familyWithChildren: '有孩子的家庭',
      singleParent: '单亲',
      extendedFamily: '大家庭',
      other: '其他',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: '我们应该怎么称呼您？',
    description: '请告诉我们您的姓名，帮助我们为您提供个性化体验。',
    firstName: '名字',
    firstNamePlaceholder: '请输入您的名字',
    lastName: '姓氏',
    lastNamePlaceholder: '请输入您的姓氏（可选）',
    skip: '暂时跳过',
    save: '保存姓名',
    saving: '正在保存...',
    firstNameRequired: '名字必填',
    firstNameRequiredDescription: '请输入您的名字以继续。',
    nameUpdated: '姓名已更新',
    nameUpdatedDescription: '您的姓名已成功保存。',
    updateFailed: '更新失败',
    updateFailedDescription: '无法更新您的姓名。请重试。',
  },
  
  // Common elements
  common: {
    dashboard: '仪表板',
    loading: '加载中...',
    search: '搜索',
    filter: '筛选',
    next: '下一个',
    previous: '上一个',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    edit: '编辑',
    delete: '删除',
    close: '关闭',
    back: '返回',
    backToResources: '返回资源',
    viewDetails: '查看详情',
    learnMore: '了解更多',
    getHelp: '获得帮助',
    startNow: '立即开始',
    tryNow: '立即试用',
    downloadNow: '立即下载',
    visitWebsite: '访问',
    shareThis: '分享这个',
    copied: '已复制！',
    copy: '复制',
    show: '显示',
    hide: '隐藏',
    expand: '展开',
    collapse: '折叠',
    seeMore: '查看更多',
    seeLess: '查看更少',
    showingTopOf: '显示前 {{current}} 个，共 {{total}} 个资源',
    selectLanguage: '选择语言',
    personalizedRecommendationsLabel: '个性化推荐',
    exploreResourcesNowLabel: '立即探索资源',
    curatedAdviceLabel: '成功的精选建议',
    
    // Accessibility and UI labels
    toggleSidebar: '切换侧边栏',
    toggleMobileMenu: '切换移动菜单',
    feedback: '反馈',
    openInNewTab: '在新标签页中打开',
    removeBookmark: '删除书签',
    editResource: '编辑资源',
    deleteResource: '删除资源',
    dragToReorder: '拖拽重新排序',
    saveOrPrintOptions: '保存或打印选项',
    filterByCategory: '按类别筛选',
    openChatAssistant: '打开与BRIDGIT助手的聊天',
    askBridget: '询问BRIDGIT',
    bridgitComingSoonTitle: 'BRIDGIT：即将推出！',
    bridgitComingSoonDescription: '我们的AI助手BRIDGIT目前正在开发中。敬请期待更新！',
    
    // Content section headers
    description: '描述',
    services: '服务',
    languages: '语言',
    languagesSupported: '支持的语言',
    available: '可用',
    resources: '资源',
    exploreResources: '探索资源',
    
    // Admin interface
    authenticationRequired: '需要身份验证',
    organizationName: '组织名称',
    website: '网站',
    shortDescription: '简短描述',
    fullDescription: '完整描述',
    affiliation: '从属关系',
    financialData: '财务数据',
    serviceDetails: '服务详情',
    categories: '类别',
    servicesProvided: '提供的服务',
    totalResources: '总资源数',
    publishingStatus: '发布状态',
    totalUsers: '总用户数',
    adminUsers: '管理员用户',
    demoUsers: '演示用户',
    noResourcesFound: '未找到资源',
    
    // Form placeholders
    placeholders: {
      organizationName: '组织名称',
      briefDescription: '简要描述',
      detailedDescription: '服务和项目的详细描述',
      organizationAffiliation: '组织从属关系或网络',
      partnersCollaborating: '合作伙伴和协作组织列表',
      availableOnline: '在线可用',
    },
    
    // Additional UI elements
    backToHome: '返回首页',
    goHome: '回到首页',
    browseResources: '浏览资源',
    needPersonalizedRecommendations: '需要个性化推荐吗？',
    personalizedRecommendationsDescription: '参加我们的快速评估，获得专为您的需求选择的定制化清单。',
    getYourPersonalRoadmap: '获取您的个人路线图',
    allRightsReserved: '版权所有',
    initiativeOfPittsburghTomorrow: 'Pittsburgh Tomorrow的倡议',
    viewingAsUserNotification: '您正在以{{role}}用户身份查看Pittsburgh Tomorrow Pioneer。体验已为您的角色进行个性化。',
    priorityResourcesForYou: '为你优先推荐的资源',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: '根据您的调查回答，您目前不需要特定的帮助。如果您的情况发生变化，您可以更新您的个人资料。否则，请随意浏览所有可用的资源。',
    editProfile: '更新个人资料',
    exploreAllResources: '浏览所有资源',
    
    // Priority Categories
    priorityCategories: {
      housing: '住房',
      education: '教育', 
      income: '收入',
      first_things_first: '优先事项',
      meeting_people: '认识他人',
      kids_activities: '儿童活动',
      faith_communities: '宗教社区',
      sports_wellness: '运动与健康',
      arts_entertainment: '艺术与娱乐',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: '寻找负担得起的住房和财政支持。',
      education: '专业英语和其他语言支持。',
      income: '求职和技能发展支持。',
      first_things_first: '紧急援助、心理健康和注册协助。',
      meeting_people: '通过专业网络和社交活动建立联系。',
      kids_activities: '提供家庭和儿童项目。',
      faith_communities: '寻找当地宗教和文化团体。',
      sports_wellness: '探索体育和娱乐机会。',
      arts_entertainment: '发现当地艺术和文化活动。',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: '查看和管理您收藏的资源',
    searchYourBookmarks: '搜索您的书签...',
    showingBookmarks: '显示{{count}}个，共{{total}}个收藏资源',
    showingBookmarksPaginated: '显示第{{start}}-{{end}}个，共{{total}}个书签',
    failedToLoadBookmarks: '加载书签失败，请重试。',
    bookmarkedOn: '收藏于',
    noBookmarksMatchFilters: '没有书签符合您当前的筛选条件。',
    
    // Additional UI elements - screening form
    stepOf: '第{{current}}步，共{{total}}步',
    percentComplete: '{{percent}}%完成',
    previousButton: '上一步',
    nextButton: '下一步',
    creatingYourPlan: '正在创建您的计划...',
    completeAssessment: '完成评估',
    
    // Bookmarks empty state
    noBookmarksYet: '还没有书签',
    startExploringBookmark: '开始探索资源并收藏您觉得有用的资源！',
    pageOf: '第 {{current}} 页，共 {{total}} 页',
    yourPersonalizedRoadmap: '你的个性化路线图',
    resourcesReadyForYou: '为你准备了 {{count}} 个资源',
    seeMoreResources: '浏览全部资源',
    discoveringPerfectResources: '发现你的完美资源',
    noRecommendationsYet: '正在为你准备个性化推荐。先浏览我们的资源目录开始吧。',
  },
  
  // Error messages
  errors: {
    pageNotFound: '页面未找到',
    pageNotFoundDescription: '您查找的页面不存在或已被移动。',
  },
} 