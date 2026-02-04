/**
 * Japanese (ja) translations
 * 
 * Professional translations with formal/polite register (keigo) for websites
 * Proper horizontal LTR text support
 * Cultural appropriateness
 * 
 * Language: Japanese (ja-JP)
 * Locale: Japan
 */

import type { TranslationStructure } from '../types'

export const japaneseTranslations: TranslationStructure = {
  // Navigation
  nav: {
    home: 'ホーム',
    dashboard: 'ダッシュボード',
    adminDashboard: '管理者ダッシュボード',
    welcome: 'ようこそ',
    resources: 'リソース',
    bookmarks: 'ブックマーク',
    about: 'について',
    myChecklist: 'チェックリスト',
    signIn: 'ログイン',
    signUp: '新規登録',
    accountSettings: 'プロフィール設定',
    signOut: 'ログアウト',
    settings: '設定',
  },
  
  // Homepage - streamlined for current design
  homepage: {
    heroTitle: 'ピッツバーグ・トゥモロー・パイオニアへようこそ',
    heroWelcomeTo: 'ようこそ',
    heroPioneer: 'ピッツバーグ・トゥモロー・パイオニア',
    heroDescription: 'ピッツバーグで新しい生活を始めるための個人ガイド — 無料、プライベート、多言語対応',
    heroExtendedDescription: 'ピッツバーグへ引っ越しされますか？何時間も何十ものサイトを検索したり、同じ質問を何度も繰り返す必要はありません。ピッツバーグ・トゥモロー・パイオニアは、新規移住者が迅速かつ自信を持って定住できるよう支援するあらゆるリソースへの個人向け無料ガイドです — 住宅や学校から言語、信仰、コミュニティ生活まで。ピッツバーグでの新しい章を始めるための最も包括的で時間を節約し、温かく迎える方法です。',
    howCanWeHelp: '本日はどのようにお手伝いできますか？',
    howCanWeHelpSubtitle: 'パスを選択して、パーソナライズされた推奨事項を受け取る',
    createRoadmapTitle: 'ロードマップを作成する',
    createRoadmapDescription: '簡単なアンケートに回答して、特定のニーズと目標に合わせたパーソナライズされた行動計画を受け取ります。',
    getStarted: '始める',
    browseResourcesTitle: 'リソースを閲覧する',
    browseResourcesDescription: 'カテゴリ別に整理されたサービス、組織、リソースの包括的なディレクトリを探索してください。',
    exploreDirectory: 'ディレクトリを探索する',
    askBridgetTitle: 'BRIDGITに質問する',
    askBridgetDescription: 'AIアシスタントから質問への即座の回答を受け取ります。希望する言語で24時間365日利用可能です。',
    startChatting: 'チャットを開始する',
    saveProgressQuestion: '進捗を保存してパーソナライズされた機能にアクセスしますか？',
    signIn: 'ログイン',
    createAccount: 'アカウントを作成する',
    servicesNote: 'すべてのサービスは完全に無料で、厳格に機密保持され、英語、スペイン語、アラビア語、フランス語、中国語、スワヒリ語を含む16言語以上で利用できます。',
    
    // Trust badges
    hundredPercentFree: '100%無料',
    privateSecure: 'プライベート＆セキュア',
    multilingualSupport: '多言語サポート',
    languagesSupported: 'スペイン語、アラビア語、フランス語、中国語、スワヒリ語を含む16言語以上をサポート。',
  },
  
  // Auth pages
  auth: {
    demoMode: 'デモモード',
    demoModeDescription: '異なるユーザープロフィールでピッツバーグ・トゥモロー・パイオニアを試して、体験がニーズにどのように適応するかを確認してください',
    whatYouExperience: '体験できること',
    immigrantUser: '移民ユーザー',
    immigrantFeatures: {
      emergency: '緊急リソースを優先',
      multilingual: '多言語サポート',
      settlement: '定住に焦点を当てたコンテンツ',
    },
    studentUser: '学生ユーザー',
    studentFeatures: {
      academic: '学術リソース',
      campus: 'キャンパス固有の情報',
      career: 'キャリアガイダンス',
    },
    professionalUser: '専門職ユーザー',
    professionalFeatures: {
      networking: '業界ネットワーキング',
      services: '専門サービス',
      advancement: 'キャリア向上',
    },
    localHelper: 'ローカルヘルパー',
    localFeatures: {
      community: 'コミュニティリソース',
      volunteer: 'ボランティア機会',
      support: 'サポートネットワーク',
    },
    signIn: 'ログイン',
    
    // Authentication required page
    authenticationRequired: '認証が必要です',
    loginToAccessPage: 'このページにアクセスするにはログインする必要があります。',
    
    // Login page
    emailVerified: 'メールアドレスが確認されました',
    emailVerifiedDescription: 'メールアドレスが正常に確認されました。',
    alreadySignedIn: '既にログインしています',
    redirectingToDashboard: 'ダッシュボードにリダイレクトしています...',
    signInDescription: 'ログインして、パーソナライズされたピッツバーグのリソースと推奨事項にアクセスしてください。',
    signInWithAuth0: 'ログイン',
    signInHelp: 'ログインに問題がありますか？サポートにお問い合わせください。',
    loginError: 'ログインエラー',
    loginErrorDescription: 'ログイン中に問題が発生しました。もう一度お試しください。',
  },
  
  // Demo credentials
  demo: {
    tryDemoAccounts: 'デモアカウントを試す',
    experienceDifferentPerspectives: '異なるユーザーの視点からピッツバーグ・トゥモロー・パイオニアを体験する',
    email: 'メールアドレス：',
    password: 'パスワード：',
    loginAs: '{{role}}ユーザーとしてログイン',
    demoTip: 'これらのデモアカウントは、異なるユーザー体験とパーソナライズされたコンテンツを紹介しています',
  },
  
  // Onboarding loading screen
  onboarding: {
    thinking: '考えています...',
    curatingRecommendations: 'パーソナライズされた推奨事項をキュレーションしています...',
    findingResources: '最適なリソースを探しています...',
    complete: '完了しました！',
    creatingYourPlan: 'パーソナライズされたプランを作成しています',
    ready: '準備完了！',
    mayTakeAMoment: '体験をパーソナライズしているため、少々お時間をいただく場合があります...',
    seeMyRecommendations: '推奨事項を表示する',
    loadingHint: '体験をパーソナライズしているため、少々お時間をいただく場合があります...',
  },
  
  // Screening page
  screening: {
    title: 'あなたについて教えてください',
    description: '簡単な質問にいくつか回答して、ピッツバーグで生活し、繁栄するためのパーソナライズされたガイドを作成します。',
    saveRoadmapBanner: 'アカウントを作成してパーソナライズされたロードマップを保存してください。今は匿名でアンケートに回答し、後でログインして保存できます。',
    
    // Progress indicator
    progress: '進捗',
    completed: '{{total}}件中{{count}}件完了',
    
    // Questions
    questions: {
      audience: {
        question: 'あなたの状況を最もよく表すものはどれですか？',
        options: [
          '学生/専門職（ピッツバーグ地域の大学に通っている、または組織で働いている）',
          'ブーメラン（以前ここに住んでいたが、引っ越して、今ピッツバーグ地域に戻ってきた）',
          '難民または一時的保護ステータス（ここに再定住したばかり、または別の都市からここに引っ越してきた）',
          '移住者（米国内の別の都市からピッツバーグに引っ越している）',
          '起業家（自分のビジネスを構築している）',
          'リモート従業員',
          'その他',
        ],
      },
      primaryLanguage: {
        question: 'あなたの第一言語は何ですか？',
        options: [
          '英語（ネイティブ/流暢）',
          'スペイン語（Español）',
          'アラビア語（العربية）',
          'スワヒリ語（Kiswahili）',
          'ウズベク語（Oʻzbekcha）',
          'ネパール語/ブータン語（नेपाली / རྫོང་ཁ）',
          'ダリー語/パシュトー語（دری / پښتو）',
          '中国語（中文）',
          'その他',
        ],
      },
      culturalBackground: {
        question: 'あなたを最もよく表す文化的または地域的背景は何ですか？',
        options: [
          '白人',
          '黒人またはアフリカ系アメリカ人（アフリカおよびカリブ系を含む）',
          'ヒスパニックまたはラティーノ/ア/エックス',
          'アジア系（例：中国人、インド人、ベトナム人）',
          '中東または北アフリカ',
          'ハワイ先住民またはその他の太平洋諸島民',
          'アメリカ先住民またはアラスカ先住民',
          'アフリカ系（例：ナイジェリア人、エチオピア人、ガーナ人など）',
          'カリブ系（例：ジャマイカ人、ハイチ人、トリニダード人など）',
          'その他',
          '回答したくない',
        ],
      },
      housingNeed: {
        question: 'どのような住宅サポートが必要ですか？',
        options: [
          '近隣地域と市場価格のアパートを見つけるための支援',
          '手頃な価格の住宅支援とプログラム',
          '一時的/緊急住宅',
          'シェアハウス/ルームメイトマッチング',
          '家を購入しようとするための支援',
          '住宅は確保済みです',
        ],
      },
      professionalStatus: {
        question: '現在の職業ステータスは何ですか？',
        options: [
          '学生（学部/大学院/専門学校）',
          '技術専門職/エンジニア',
          '医療/生命科学専門職',
          '学術/研究者',
          '就職活動中',
          '最近卒業して就職を探している',
          'その他の専門職',
        ],
      },
      languageSupport: {
        question: 'どのような言語サポートが役立ちますか？',
        options: [
          '英語クラス（ESL）- 初級から中級',
          '専門的な英語コミュニケーションスキル',
          '文書翻訳サービス',
          '会話英語の練習',
          '言語サポートは不要です',
        ],
      },
      employment: {
        question: 'どのような就職サポートに興味がありますか？',
        options: [
          '専門的なネットワーキングとキャリア向上',
          '就職活動支援と履歴書のヘルプ',
          'スキルトレーニングと認定プログラム',
          '業界固有のネットワーキング（技術、医療など）',
          '就職サポートは不要です、ありがとうございます',
        ],
      },
      communityPriorities: {
        question: 'あなたにとって最も重要なコミュニティのつながりは何ですか？（該当するものをすべて選択）',
        options: [
          '専門ネットワークと業界ミートアップ',
          '文化的および信仰に基づくコミュニティ',
          '社交活動とエンターテインメント',
          '家族と子供向けサービス',
          'スポーツとレクリエーション活動',
          '芸術と文化イベント',
          'これらには該当しません',
        ],
      },
      immediateNeeds: {
        question: '最も緊急のニーズは何ですか？（該当するものをすべて選択）',
        options: [
          '人と会って新しい友達を作る',
          '基本的なサービス（医療、銀行、交通）',
          '子供の学校登録',
          '法的/移民支援',
          'メンタルヘルスとウェルネスサポート',
          '緊急支援（食料、住居）',
          'これらには該当しません',
        ],
      },
      timeline: {
        question: 'ピッツバーグ地域への定住のタイムラインはどのようですか？',
        options: [
          '到着したばかり（先月以内）',
          '最近到着（1〜6ヶ月）',
          'まもなく到着予定（今後3ヶ月）',
          '長期計画（6ヶ月以上）',
          '既にピッツバーグ地域に定住している',
        ],
      },
    },
    
    // Form messages
    pleaseAnswer: 'この質問に回答してください。',
    pleaseAnswerAll: '続行するには、すべての質問に回答してください',
    creatingGuide: 'ガイドを作成しています...',
    seePersonalizedGuide: 'パーソナライズされたガイドを表示する',
    screeningQuestionnaire: 'スクリーニングアンケート',
  },
  
  // Toolkit interface
  toolkit: {
    title: '新規移住者ツールキット',
    description: 'ピッツバーグで定住し、繁栄するために必要なリソースとサポートを見つける',
    categories: {
      housingAssistance: '住宅支援',
      foodAssistance: '食料支援',
      entrepreneurHiringHub: '起業家＆採用ハブ',
      youthAdultEducation: '若者＆成人教育リソース',
      eslImmigrantConnection: 'ESL＆移民接続サービス',
      socialConnectionCulture: '社会的つながりと文化',
    },
    chat: {
      bridgitTitle: 'BRIDGITとチャットする',
      bridgitDescription: '旅のためのパーソナライズされた支援とガイダンスを受け取る',
    },
  },

  // Resource search
  resources: {
    title: 'リソースを探す',
    searchPlaceholder: 'リソースを検索...',
    allCategories: 'すべてのカテゴリ',
    housing: '住宅',
    educationESL: '教育 / ESL',
    socialNetworking: '社交 / ネットワーキング',
    noResourcesFound: '検索またはフィルターに一致するリソースが見つかりませんでした。',
    backToAllCategories: 'すべてのカテゴリに戻る',
    backToCategory: '{{category}}に戻る',
    welcomeToCategory: '{{category}}へようこそ',
    categoryDescription: {
      housing: '住宅支援、賃貸支援、近隣リソースを見つける',
      foodAssistance: 'フードバンク、食事プログラム、栄養支援を見つける',
      entrepreneurHiring: 'ビジネスリソース、就職機会、採用支援を発見する',
      youthEducation: '教育プログラム、家庭教師、学習リソースにアクセスする',
      eslImmigrant: '英語クラス、移民サービス、文化的サポートとつながる',
      socialConnection: 'コミュニティグループ、文化イベント、社交活動に参加する',
    },
    refreshBookmarks: 'ブックマークを更新（デバッグ）',
    compare: '比較（{{count}}/3）',
    filterByLanguage: '言語でフィルター：',
    showingResults: '{{total}}件中{{current}}件を表示',
    categoryTitles: {
      housingProcess: 'ピッツバーグの住宅プロセス',
      housingProcessDescription: '住宅検索プロセスと要件について学ぶ',
    },
    exploreResources: 'リソースを探索する',
    categoryNotFound: 'カテゴリが見つかりません',
    subcategoryNotFound: 'サブカテゴリが見つかりません',
    clearFilters: 'フィルターをクリア',
    showingResultsFor: 'の',
    showingResultsIn: 'で',
    compareSelected: '選択したものを比較',
    noResourcesFoundCategory: 'このカテゴリのリソースが見つかりませんでした。',
    browseSubcategoryDescription: 'このサブカテゴリ内のリソースを閲覧してください。',
    
    // Global search
    globalSearch: {
      placeholder: 'すべてのリソースを検索...',
      button: '検索',
    },
    searchResults: {
      title: '検索結果',
      for: 'の',
      noResults: '検索に一致するリソースが見つかりませんでした。',
      tryDifferent: '別の検索語を試してください。',
    },
    
    // Individual category pages
    categoryPages: {
      welcomePrefix: 'へようこそ',
      subcategories: {
        // Housing subcategories
        housingProcess: 'ピッツバーグの住宅プロセス',
        housingProcessDesc: '住宅検索プロセスと要件について学ぶ',
        neighborhoodResources: '近隣地域と不動産リソース',
        neighborhoodResourcesDesc: '近隣地域と不動産情報を発見する',
        housingAssistanceSubcat: '住宅支援',
        housingAssistanceSubcatDesc: '直接賃貸支援と住宅サポートサービス',
        
        // Food subcategories
        culturalFood: '文化的食品ハブ',
        culturalFoodDesc: '国際市場と文化的食品リソース',
        foodPantries: 'フードパントリー',
        foodPantriesDesc: '緊急食料支援とパントリー',
        groceryGuide: '食料品店ガイド',
        groceryGuideDesc: '地元の食料品店とショッピング支援',
        
        // Employment subcategories
        hiringHub: '仕事を探している移民または新規移住者ですか？',
        hiringHubDesc: '採用ハブをご覧ください！',
        entrepreneurship: 'ピッツバーグ内の起業家リソース',
        entrepreneurshipDesc: 'ビジネス開発とスタートアップリソース',
        
        // Education subcategories
        schoolResources: '新しい学校を見つけるためのリソースを探していますか？',
        schoolResourcesDesc: '学校登録と教育リソース',
        tutoring: '大学準備または家庭教師を探していますか？',
        tutoringDesc: '家庭教師サービスと大学準備',
        gedResources: 'GEDを取得したいですか？',
        gedResourcesDesc: 'GED準備と成人教育',
        
        // ESL & Immigration subcategories
        eslResources: 'ESLリソースを探していますか？',
        eslResourcesDesc: '英語学習とクラス',
        documentation: '文書支援',
        documentationDesc: '移民書類と法的サポート',
        basicNeeds: '基本的ニーズ支援',
        basicNeedsDesc: '必須サービスと緊急支援',
        
        // Social subcategories
        fosterConnection: 'つながりを育むリソース',
        fosterConnectionDesc: '社交グループとコミュニティ構築',
        culturalResourcesSocial: '食品と文化リソース',
        culturalResourcesSocialDesc: '文化イベントと食品の伝統',
        faithGroups: '信仰に基づくグループ',
        faithGroupsDesc: '宗教コミュニティと精神的サポート',
      },
    },

    // Centralized taxonomy labels used by the Resources UI
    taxonomy: {
      categories: {
          'community-belonging': 'コミュニティと帰属',
          'culture-leisure': '文化、芸術、楽しみ',
        'esl-immigrant': 'ESLと移民サポート',
          'education-youth': '教育：成人と若者',
        'living-essentials': '生活必需品',
          'work-business': '仕事とビジネスリソース',
      },
      categoryDescriptions: {
        'community-belonging': 'ピッツバーグでつながり、参加し、コミュニティを構築する',
          'culture-leisure': '芸術、家族活動、趣味、ナイトライフを探索する',
        'esl-immigrant': '言語学習、移民支援、新規移住者サービス',
          'education-youth': '成人学習、家庭教師、若者向け機会',
          'living-essentials': '住宅、健康、交通、食料',
          'work-business': '仕事、キャリアサポート、ビジネスリソース',
      },
      subcategories: {
        // Community & Belonging
        'civic-government': '政府',
        'civic-advocacy': '地域の擁護',
        'civic-volunteer': 'ボランティア',
        'civic-youth': '若者の参加',
        religion: '宗教',
        'social-connection': '社会的つながり',

        // Culture & Leisure
        art: '芸術',
        family: '家族のレクリエーション',
        'beauty-hair': 'ヘアケア / 美容',
        'hobby-spaces': '趣味のスペース',
        'night-life': 'ナイトライフ',

        // ESL & Immigrant Support
        'esl-support': '第二言語としての英語（ESL）サポート',
        'general-law': '一般法',
        'immigration-asylum': '移民 / 亡命',
        'refugee-immigrant-support': '難民 / 移民サポート',

        // Education & Youth
        'adult-education': '成人教育',
        'college-prep-tutoring': '大学準備 / 家庭教師',
        'youth-education': '若者教育',
        'youth-programming': '若者向けプログラム',

        // Living Essentials
        'food-pantries': 'フードパントリー',
        'grocery-guide': '食料品ガイド',
        'specialty-stores': '専門店',
        'guide-discover-pittsburgh': 'ピッツバーグを発見する',
        'guide-diverse-businesses': '多様なビジネス',
        'guide-immigrant-services': '移民サービス',
        'health-additional-support': '追加サポート',
        'health-body-mind': '身体と心のケア',
        'health-hospitals': '病院',
        'health-nutrition': '栄養',
        'health-senior-care': '高齢者ケア',
        'housing-buying-home': '家を購入する',
        'housing-assistance': '住宅支援',
        'housing-relocating': 'ピッツバーグへの移住',
        'housing-rent': '賃貸',
        transportation: '交通',

        // Work & Business
        'business-development': 'ビジネス開発',
        'business-support': 'ビジネスサポート',
        'career-support': 'キャリアサポート',
        'internship-opportunities': 'インターンシップ機会',
      },
      groups: {
        'civic-engagement': '市民参加',
        legal: '法的',
        food: '食品',
        'pittsburgh-guides': 'ピッツバーグガイド',
        health: '健康',
        housing: '住宅',
        transit: '交通',
      },
    },
  },
  
  // Checklist page
  checklist: {
    loadingMessage: 'パーソナライズされたチェックリストを読み込んでいます...',
  },
  
  // About page
  about: {
    title: 'ピッツバーグ・トゥモロー・パイオニアについて',
    description: 'ピッツバーグ・トゥモロー・パイオニアは、ピッツバーグとアレゲーニー郡に定住するための親しみやすいガイドです。技術専門職であろうと、新しいスタートを求める新規移住者であろうと、ピッツバーグ・トゥモロー・パイオニアは、住宅、教育、就職、コミュニティのための地元リソースに接続します。',
    features: [
      '161以上の非営利組織',
      'パーソナライズされたチェックリストとロードマップ',
      '独立した移住者と伝統的な移住者の両方をサポート',
      'ニーズに合わせた簡単なスクリーニング',
    ],
    conclusion: 'このプロジェクトは、ピッツバーグをすべての人にとって歓迎的で支援的で機会に満ちたものにすることを目的とした、地元のパートナーとボランティアの協力です。',
    copyright: 'ピッツバーグ・トゥモロー・パイオニア。全著作権所有。',
    
    // AboutPage specific content
    welcomeText: 'ピッツバーグ・トゥモロー・パイオニアへようこそ。ピッツバーグとアレゲーニー郡で新しい生活を始めるための個人ガイドです。米国に到着したばかりであろうと、エネルギー、ロボティクス、AI、生命科学、または鉄鋼のピッツバーグの成長企業の1つで新しい仕事に就いたばかりであろうと、ピッツバーグ・トゥモロー・パイオニアはお手伝いします。住宅を見つけることから子供を学校に登録すること、英語クラスを見つけることから信仰コミュニティや地元の食料支援とつながることまで、ピッツバーグ・トゥモロー・パイオニアは必要なリソースを1つの場所にまとめます。',
    
    whyPioneerTitle: 'なぜピッツバーグ・トゥモロー・パイオニアなのか？',
    whyPioneerText1: '新しい都市で新しく始めることは、ゼロから始めることを意味するべきではないからです。',
    whyPioneerText2: 'ピッツバーグ・トゥモロー・パイオニアは、ピッツバーグとアレゲーニー郡で新しい生活を始めるために必要なすべてを、信頼できる使いやすい1つの場所にまとめます。',
    whyPioneerText3: '無料で包括的であり、何時間もの検索、比較、再考を節約するように設計されています。住宅を見つけること、子供を学校に登録すること、英語を学ぶこと、または信仰、言語、または興味を共有する人と会うことを探している場合でも、ピッツバーグ・トゥモロー・パイオニアは、移動をよりスムーズにし、新しい生活をより豊かにするための単一の機会を見逃さないようにします。',
    whyPioneerText4: 'Google検索がすべてを表示する場所で、ピッツバーグ・トゥモロー・パイオニアは正確に重要なことを表示します。',
    whyPioneerText5: 'AIチャットボットが回答を提供する場所で、パイオニアはロードマップを提供します。',
    whyPioneerText6: 'ほとんどの移住ツールがロジスティクスで停止する場所で、パイオニアはコミュニティから始まります。',
    whyPioneerText7: 'それはピッツバーグ、パーソナライズされたものです。',
    
    youAreThePioneerTitle: 'あなたがパイオニアです',
    youAreThePioneerText1: 'あなたは単に移動しているのではありません — 何か新しいことを始めています。新しい仕事。新しい学校。新しい家。そしておそらく新しい言語や文化さえも。それは勇気が必要です。',
    youAreThePioneerText2: '私たちはあなたをサポートするためにピッツバーグ・トゥモロー・パイオニアを構築しました — あなたがパイオニアだからです。このサイトは、ピッツバーグで未来を築く際にあなたと共に歩むためにここにあります。',
    
    howPioneerHelpsTitle: 'ピッツバーグ・トゥモロー・パイオニアがどのように役立つか',
    
    madeForYouTitle: 'あなたのために作られた — どこから来ても',
    madeForYouDescription: 'すべての人が英語を第一言語として話すわけではないことを私たちは知っています。そのため、ピッツバーグ・トゥモロー・パイオニアは、スペイン語、アラビア語、フランス語、中国語、ダリー語などを含む数十の世界言語をサポートしています。母国語で入力すると、ピッツバーグ・トゥモロー・パイオニアは同じように応答します。',
    
    personalRoadmapTitle: '個人ロードマップを作成する',
    personalRoadmapDescription: '私たちの最も強力なツールは、パーソナライズされたロードマップです — あなたのために作られたチェックリストです。ニーズ（住宅、食料、仕事、教育など）について簡単な質問に答えることで、ピッツバーグ・トゥモロー・パイオニアは次のステップをサポートするためのカスタマイズされた行動計画を作成します。次のことができます：',
    personalRoadmapFeatures: [
      'いつでもロードマップを表示および更新する',
      'ログインして進捗を保存する（オプション）',
      'チェックリストをダウンロードまたは印刷して持ち歩く',
      'ピッツバーグでの生活が成長するにつれてロードマップを再訪問し、改善する'
    ],
    personalRoadmapNote: '自分のペースで探索したい場合は、ログインせずに完全なリソースライブラリを閲覧できます。',
    
    smartSupportTitle: 'スマートで自己ガイド型のサポート',
    smartSupportDescription: 'ピッツバーグ・トゥモロー・パイオニアには、数百の一般的な質問に答えるように訓練された親しみやすいAIチャットボットが備わっています。リソースに案内し、地元のシステムの仕組みを説明し、次のステップを踏むのを助けることができます。また、信頼できるパートナー — 公共機関、非営利団体、サービスプロバイダーなど — の連絡先情報の完全なディレクトリもあります。',
    
    trustedPartnersTitle: '信頼できるパートナー',
    trustedPartnersDescription: '信頼できるパートナーの完全なディレクトリにアクセス — ピッツバーグとアレゲーニー郡全体の公共機関、非営利団体、サービスプロバイダー。私たちのネットワークには、特定のニーズを支援する準備ができている380以上の非営利組織が含まれています。',
    
    privacyTitle: 'あなたのプライバシー、保護されています',
    privacyDescription: 'あなたのプライバシーとセキュリティは私たちにとって重要です。アカウントを作成することを選択した場合、個人データはSOC II準拠のセキュリティプロトコルによって保護されます。私たちはあなたのデータを販売または共有することはありません。あなたは常に情報を完全に制御しています。',
    
    pittsburghTomorrowTitle: 'ピッツバーグ・トゥモローについて',
    pittsburghTomorrowText1: 'ピッツバーグ・トゥモロー・パイオニアは、ピッツバーグを成長させることを使命とする非営利組織であるピッツバーグ・トゥモローのイニシアチブです。私たちは、歴史家デイビッド・マッカローが「アメリカの不可欠な都市」と呼んだものを再定義している新しい精神を促進しています。',
    pittsburghTomorrowText2: 'アメリカを一から構築した地域は、新しい活力と市民精神で急成長しています：新規移住者を歓迎し、起業家を立ち上げ、新しい道を切り開いています。私たちの運動は、機会を掴み、未来を築いている — ピッツバーグで — 新しい波のパイオニア、先駆者、リスクテイカーによって推進されています。',
    pittsburghTomorrowText3: 'ピッツバーグ・トゥモローでは、ピッツバーグを成長させることを使命としています。それは単に人口や経済成長を意味するのではありません。それは私たちの都市の精神を活性化することを意味します。中小企業と起業家をサポートする。環境を美化し、保存する。芸術と文化を促進する。新規移住者を歓迎し、コミュニティを作る。私たちの都市に誇りを持ち、それを地図に戻す。',
    pittsburghTomorrowLink: '詳細を見る',
    
    // Call to action section
    readyToStartTitle: 'ピッツバーグでの旅を始める',
    readyToStartDescription: '新しい家で定住し、繁栄するのを助けるパーソナライズされたロードマップを構築してください。',
    getStarted: '始める',
    browseResources: 'リソースを閲覧する',
  },
  
  // Privacy Policy
  privacy: {
    backToAbout: 'についてに戻る',
    title: 'データの透明性とプライバシー声明',
    description: 'ピッツバーグ・トゥモローでは、透明性とあなたの信頼を大切にしています。私たちは、特定の情報を尋ねる理由、使用方法、そしてそれがどのようにあなたに利益をもたらすかを正確に理解する権利があると信じています。',
    
    whyWeAskTitle: 'これらの質問をする理由と情報の使用方法：',
    whyWeAskDescription: '私たちが尋ねる質問は、あなたのためにカスタマイズされたロードマップを作成するのに役立ちます。あなたの回答により、以下が可能になります：',
    whyWeAskBullet1: 'ニーズに合わせてデータベースから関連リソースと情報を引き出す。',
    whyWeAskBullet2: 'コミュニティと背景全体で人々に公平に到達していることを確認する。',
    whyWeAskBullet3: 'サービスを提供している人々のギャップを特定し、見逃されている可能性のある人々により良く到達できるようにする。',
    whyWeAskBullet4: 'すべてのユーザーに効果的にサービスを提供できるようにAIツールを改善する。',
    weDoNotSell: '私たちはあなたのデータを販売しません。上記の目的のみに使用します。',
    
    dataRetentionTitle: 'データ保持：',
    dataRetentionDescription: 'カスタマイズされたダッシュボードにアクセスしたくないと通知するまで、データベースに情報を保持します。その後、データは匿名化され、ピッツバーグへの他の新規移住者を支援するためにAIサービスを改善するためにのみ使用されます。',
    
    quomeTitle: 'Quomeがデータを使用する方法：',
    quomeDescription: '私たちのサイトはQuomeによってホストされており、プラットフォームを運用および改善するために特定のデータを収集する場合があります。',
    
    skillBuilderTitle: 'Skill Builderがデータを使用する方法：',
    skillBuilderDescription: '私たちのサイトチャットボットはSkillBuilder.ioによってホストされており、プラットフォームを運用および改善するために特定のデータを収集する場合があります。',
    
    contactDescription: 'データの使用またはプライバシー慣行について質問がある場合は、各ページの右側にあるフィードバックボタンを使用してお問い合わせください。',
    privacyPolicyLink: 'プライバシーポリシー'
  },
  
  // Footer
  footer: {
    aboutPioneer: 'ピッツバーグ・トゥモロー・パイオニアについて',
    aboutDescription: 'ピッツバーグ・トゥモロー・パイオニアは、ピッツバーグとアレゲーニー郡への新規移住者が自分の道を見つけるのを助けます。旅が何であれ、適切なリソースと機会に接続します。',
    quickLinks: 'クイックリンク',
    home: 'ホーム',
    about: 'について',
    resources: 'リソース',
    privacyPolicy: 'プライバシーポリシー',
    getStarted: '始める',
    contact: 'お問い合わせ',
    location: 'ペンシルベニア州ピッツバーグからこんにちは',
    email: 'メールアドレス：Hello@pittsburghtomorrow.org',
  },
  
  // Role-based content
  roleContent: {
    welcomeImmigrant: 'ようこそ、{{name}}さん！',
    welcomeStudent: 'おかえりなさい、{{name}}さん！',
    welcomeProfessional: 'ようこそ、{{name}}さん！',
    welcomeLocal: 'こんにちは、{{name}}さん！',
    
    subtitleImmigrant: 'あなたの定住の旅はここから始まります',
    subtitleStudent: 'あなたの学業の成功が私たちの優先事項です',
    subtitleProfessional: 'あなたのキャリア成長が私たちの焦点です',
    subtitleLocal: 'ピッツバーグをすべての人にとって歓迎的なものにするのを助ける',
    
    demoUserNote: 'あなたは**{{role}}**ユーザーとしてピッツバーグ・トゥモロー・パイオニアを表示しています。体験はあなたの役割に合わせてパーソナライズされています。',
    userBadge: '{{role}}ユーザー',
    
    urgentResources: '緊急リソース',
    
    // Resource categories
    emergencyServices: '緊急サービス',
    emergencyDescription: '24時間365日の危機サポートと即座の支援',
    temporaryHousing: '一時住宅',
    temporaryHousingDescription: '避難所と住宅支援プログラム',
    healthcareAccess: '医療アクセス',
    healthcareDescription: '医療サービスと健康保険のヘルプ',
    languageServices: '言語サービス',
    languageServicesDescription: '翻訳と通訳サポート',
    
    // Additional resource categories for other roles
    academicSupport: '学術サポート',
    academicSupportDescription: '家庭教師、学習グループ、学術リソース',
    studentHousing: '学生住宅',
    studentHousingDescription: 'キャンパス内およびキャンパス外の住宅オプション',
    financialAid: '財政援助',
    financialAidDescription: '奨学金、助成金、財政支援',
    studentGroups: '学生グループ',
    studentGroupsDescription: '国際学生組織とクラブ',
    professionalNetworks: '専門ネットワーク',
    professionalNetworksDescription: '業界ミートアップとネットワーキングイベント',
    careerDevelopment: 'キャリア開発',
    careerDevelopmentDescription: 'スキルトレーニングと認定プログラム',
    professionalHousing: '専門職住宅',
    professionalHousingDescription: 'エグゼクティブ住宅と移住サービス',
    mentorship: 'メンターシップ',
    mentorshipDescription: '専門的なメンターシップとガイダンスプログラム',
    volunteerOpportunities: 'ボランティア機会',
    volunteerOpportunitiesDescription: 'コミュニティで新規移住者を支援する方法',
    communityOrganizations: 'コミュニティ組織',
    communityOrganizationsDescription: '地元の非営利団体とサービスプロバイダー',
    supportNetworks: 'サポートネットワーク',
    supportNetworksDescription: 'メンターシップと友情プログラム',
    culturalExchange: '文化交流',
    culturalExchangeDescription: '異文化イベントとプログラム',
    

  },
  
  // Dashboard page
  dashboard: {
    signInExplore: 'ログインして、パーソナライズされたピッツバーグの旅を探索する',
    signInToPioneer: 'ピッツバーグ・トゥモロー・パイオニアにログインする',
    welcomeTitle: 'ピッツバーグ・トゥモロー・パイオニアへようこそ、{{name}}さん！',
    welcomeTitleWithoutName: 'ピッツバーグ・トゥモロー・パイオニアへようこそ！',
    journeyContinues: 'あなたのパーソナライズされた旅は続きます...',
    beginJourney: 'パーソナライズされたピッツバーグの旅を始める',
    completedSurveyHeader: '既にアンケートを完了しています',
    completedSurveyText: 'オンボーディングアンケートを完了しました。下のパーソナライズされたロードマップを表示するか、回答を編集して推奨事項を更新してください。',
    completedSurveyTextWithDate: '{{date}}にオンボーディングアンケートを完了しました。下のパーソナライズされたロードマップを表示するか、回答を編集して推奨事項を更新してください。',
    editResponses: '回答を編集する',
    viewMyRoadmap: '私のロードマップを表示する',
    noteLabel: '注意：',
    editRegenerateNote: 'アンケートの回答を編集すると、パーソナライズされた推奨事項とロードマップが、更新された設定により良く一致するように自動的に再生成されます。',
    bridgitHelp: 'アンケートでカバーされていない質問がありますか？右下のBRIDGITチャットボットをクリックして、パーソナライズされた支援を受け取ってください！',
    personalizedRoadmap: 'あなたのパーソナライズされたロードマップ',
    unlockExperience: 'カスタマイズされた体験を解除する',
    completeSurveyHeader: '始めるためにアンケートを完了する',
    completeSurveyText: '5分間の簡単なアンケートに回答して、ピッツバーグでのニーズと目標に特に合わせたパーソナライズされたリソース推奨事項を受け取ります。',
  },
  
  // Profile page
  profile: {
    title: 'プロフィール設定',
    subtitle: '個人情報と設定を管理する',
    accountInformation: 'アカウント情報',
    accountInformationDescription: '基本的なアカウント詳細を更新する',
    basicInformation: '基本情報',
    basicInformationDescription: '基本的な個人詳細を更新する',
    firstName: '名',
    enterFirstName: '名を入力してください',
    lastName: '姓',
    enterLastName: '姓を入力してください',
    username: 'ユーザー名',
    enterUsername: 'ユーザー名を入力してください',
    email: 'メールアドレス',
    emailChangeNote: 'メールアドレスは変更できません。メールアドレスを更新する必要がある場合は、サポートにお問い合わせください。',
    emailCannotBeChanged: 'メールアドレスは変更できません。メールアドレスを更新する必要がある場合は、サポートにお問い合わせください。',
    surveyRequired: 'まずアンケートを完了してください',
    surveyRequiredDescription: 'パーソナライズされた推奨事項を取得し、アンケートの回答を編集するには、まず初期評価アンケートを完了する必要があります。',
    takeSurvey: 'アンケートを受ける',
    basicQuestions: '基本情報',
    basicQuestionsDescription: '自分自身と状況について教えてください。パーソナライズされた推奨事項を受け取ります。',
    selectPrimary: '主要な設定を選択してください：',
    selectOption: 'オプションを選択...',
    supportNeeds: 'サポートとニーズ',
    supportNeedsDescription: 'どのようなサポートとサービスが必要ですか？',
    selectMultiple: '該当するものをすべて選択してください：',
    selectAtLeastOne: '少なくとも1つのオプションを選択してください。',
    timelinePreferences: 'タイムラインと設定',
    timelinePreferencesDescription: 'タイムラインと技術設定',
    backToDashboard: 'ダッシュボードに戻る',
    languageAndCultural: '言語と文化的背景',
    languageAndCulturalDescription: 'より良いパーソナライズされた推奨事項を提供するのを助ける',
    primaryLanguage: '第一言語',
    selectPrimaryLanguage: '第一言語を選択してください',
    culturalBackground: '文化的背景',
    selectCulturalBackground: '文化的背景を選択してください',
    professionalAndLiving: '職業と生活状況',
    professionalAndLivingDescription: 'これは関連するリソースとサービスを推奨するのに役立ちます',
    professionalStatus: '職業ステータス',
    selectProfessionalStatus: '職業ステータスを選択してください',
    housingSituation: '住宅状況',
    selectHousingSituation: '住宅状況を選択してください',
    familyStatus: '家族状況',
    selectFamilyStatus: '家族状況を選択してください',
    saveChanges: '変更を保存',
    saving: '保存中...',
    recalculatingRecommendations: '推奨事項を再計算しています...',
    profileUpdated: 'プロフィールが更新されました',
    profileUpdatedDescription: 'プロフィールが正常に更新されました。',
    accountUpdated: 'アカウントが更新されました',
    accountUpdatedDescription: 'アカウント情報が正常に更新されました。設定を保存するにはアンケートを完了してください。',
    updateFailed: '更新に失敗しました',
    updateFailedDescription: 'プロフィールの更新に失敗しました。もう一度お試しください。',
    pleaseLogIn: 'プロフィールを表示するにはログインしてください。',
    
    // Language options
    languages: {
      english: '英語',
      spanish: 'スペイン語',
      french: 'フランス語',
      arabic: 'アラビア語',
      chinese: '中国語',
      swahili: 'スワヒリ語',
      hindi: 'ヒンディー語',
      portuguese: 'ポルトガル語',
      russian: 'ロシア語',
      nepali: 'ネパール語',
      somali: 'ソマリ語',
      tagalog: 'タガログ語',
      turkish: 'トルコ語',
      other: 'その他',
    },
    
    // Cultural background options
    culturalBackgrounds: {
      americanWestern: 'アメリカ/西洋',
      westAfrican: '西アフリカ',
      middleEasternNorthAfrican: '中東/北アフリカ',
      southAsian: '南アジア（ブータンを含む）',
      latinoHispanic: 'ラティーノ/ヒスパニック',
      eastAsian: '東アジア',
      easternEuropean: '東ヨーロッパ',
      other: 'その他/言いたくない',
    },
    
    // Professional status options
    professionalStatuses: {
      student: '学生',
      graduateStudent: '大学院生',
      softwareEngineer: 'ソフトウェアエンジニア',
      healthcareProfessional: '医療専門職',
      researchScientist: '研究科学者',
      seekingEmployment: '就職活動中',
      employedFullTime: 'フルタイムで雇用されている',
      employedPartTime: 'パートタイムで雇用されている',
      selfEmployed: '自営業',
      retired: '退職',
      other: 'その他',
    },
    
    // Housing situation options
    housingSituations: {
      temporaryHousing: '一時住宅',
      campusHousing: 'キャンパス住宅',
      apartmentHunting: 'アパート探し',
      rentingApartment: 'アパートを賃貸',
      rentingHouse: '家を賃貸',
      homeowner: '住宅所有者',
      livingWithFamily: '家族と一緒に住んでいる',
      sharedHousing: 'シェアハウス',
      other: 'その他',
    },
    
    // Family status options
    familyStatuses: {
      single: '独身',
      married: '既婚',
      familyWithChildren: '子供がいる家族',
      singleParent: 'シングルペアレント',
      extendedFamily: '拡大家族',
      other: 'その他',
    },
  },
  
  // Name Dialog
  nameDialog: {
    title: 'どのようにお呼びすればよろしいですか？',
    description: 'お名前を教えてください。体験をパーソナライズするのに役立ちます。',
    firstName: '名',
    firstNamePlaceholder: '名を入力してください',
    lastName: '姓',
    lastNamePlaceholder: '姓を入力してください（オプション）',
    skip: '今はスキップ',
    save: '名前を保存',
    saving: '保存中...',
    firstNameRequired: '名が必要です',
    firstNameRequiredDescription: '続行するには名を入力してください。',
    nameUpdated: '名前が更新されました',
    nameUpdatedDescription: '名前が正常に保存されました。',
    updateFailed: '更新に失敗しました',
    updateFailedDescription: '名前の更新に失敗しました。もう一度お試しください。',
  },
  
  // Common elements
  common: {
    dashboard: 'ダッシュボード',
    loading: '読み込み中...',
    search: '検索',
    filter: 'フィルター',
    next: '次へ',
    previous: '前へ',
    save: '保存',
    cancel: 'キャンセル',
    confirm: '確認',
    edit: '編集',
    delete: '削除',
    close: '閉じる',
    back: '戻る',
    backToResources: 'リソースに戻る',
    viewDetails: '詳細を表示',
    learnMore: '詳細を見る',
    getHelp: 'ヘルプを取得',
    startNow: '今すぐ始める',
    tryNow: '今すぐ試す',
    downloadNow: '今すぐダウンロード',
    visitWebsite: '訪問',
    shareThis: 'これを共有',
    copied: 'コピーしました！',
    copy: 'コピー',
    show: '表示',
    hide: '非表示',
    expand: '展開',
    collapse: '折りたたむ',
    seeMore: 'もっと見る',
    seeLess: '少なく見る',
    showingTopOf: '{{total}}件中上位{{current}}件を表示',
    selectLanguage: '言語を選択',
    personalizedRecommendationsLabel: 'パーソナライズされた推奨事項',
    exploreResourcesNowLabel: '今すぐリソースを探索する',
    curatedAdviceLabel: '成功のためのキュレーションされたアドバイス',
    
    // Accessibility and UI labels
    toggleSidebar: 'サイドバーを切り替える',
    toggleMobileMenu: 'モバイルメニューを切り替える',
    feedback: 'フィードバック',
    openInNewTab: '新しいタブで開く',
    removeBookmark: 'ブックマークを削除',
    editResource: 'リソースを編集',
    deleteResource: 'リソースを削除',
    dragToReorder: 'ドラッグして並べ替え',
    saveOrPrintOptions: '保存または印刷オプション',
    filterByCategory: 'カテゴリでフィルター',
    openChatAssistant: 'BRIDGIT AIアシスタントとチャットを開く',
    askBridget: 'BRIDGITに質問する',
    bridgitComingSoonTitle: 'BRIDGIT：まもなく公開！',
    bridgitComingSoonDescription: 'AIアシスタントBRIDGITは現在開発中です。更新をお待ちください！',
    
    // Content section headers
    description: '説明',
    services: 'サービス',
    languages: '言語',
    languagesSupported: 'サポートされている言語',
    available: '利用可能',
    resources: 'リソース',
    exploreResources: 'リソースを探索する',
    
    // Admin interface
    authenticationRequired: '認証が必要です',
    organizationName: '組織名',
    website: 'ウェブサイト',
    shortDescription: '短い説明',
    fullDescription: '完全な説明',
    affiliation: '所属',
    financialData: '財務データ',
    serviceDetails: 'サービス詳細',
    categories: 'カテゴリ',
    servicesProvided: '提供されるサービス',
    totalResources: '総リソース',
    publishingStatus: '公開ステータス',
    totalUsers: '総ユーザー数',
    adminUsers: '管理者ユーザー',
    demoUsers: 'デモユーザー',
    noResourcesFound: 'リソースが見つかりません',
    
    // Form placeholders
    placeholders: {
      organizationName: '組織名',
      briefDescription: '簡単な説明',
      detailedDescription: 'サービスとプログラムの詳細な説明',
      organizationAffiliation: '組織の所属またはネットワーク',
      partnersCollaborating: 'パートナーと協力組織のリスト',
      availableOnline: 'オンラインで利用可能',
    },
    
    // Additional UI elements
    backToHome: 'ホームに戻る',
    goHome: 'ホームに移動',
    browseResources: 'リソースを閲覧する',
    needPersonalizedRecommendations: 'パーソナライズされた推奨事項が必要ですか？',
    personalizedRecommendationsDescription: '簡単なスクリーニングを受けて、ニーズに特に合わせて選択されたリソースを含むカスタマイズされたチェックリストを取得してください。',
    getYourPersonalRoadmap: '個人ロードマップを取得する',
    allRightsReserved: '全著作権所有',
    initiativeOfPittsburghTomorrow: 'ピッツバーグ・トゥモローのイニシアチブ',
    viewingAsUserNotification: 'あなたは{{role}}ユーザーとしてピッツバーグ・トゥモロー・パイオニアを表示しています。体験はあなたの役割に合わせてパーソナライズされています。',
    priorityResourcesForYou: 'あなたのための優先リソース',
    
    // Empty priority categories state
    noPriorityCategoriesMessage: 'アンケートの回答に基づいて、現在は特定の支援は必要ありません。状況が変わった場合は、プロフィールを更新できます。それ以外の場合は、利用可能なすべてのリソースを自由に探索してください。',
    editProfile: 'プロフィールを更新',
    exploreAllResources: 'すべてのリソースを探索する',
    
    // Priority Categories
    priorityCategories: {
      housing: '住宅',
      education: '教育', 
      income: '収入',
      first_things_first: '最優先事項',
      meeting_people: '人と会う',
      kids_activities: '子供の活動',
      faith_communities: '信仰コミュニティ',
      sports_wellness: 'スポーツとウェルネス',
      arts_entertainment: '芸術とエンターテインメント',
    },

    // Priority Category Descriptions
    priorityCategoryDescriptions: {
      housing: '手頃な価格の住宅と財政支援を見つける。',
      education: '専門的な英語とその他の言語サポート。',
      income: '就職活動とスキル開発のためのサポート。',
      first_things_first: '緊急支援、メンタルヘルス、登録のための支援。',
      meeting_people: '専門ネットワークと社交イベントを通じてつながる。',
      kids_activities: '家族と子供向けプログラムが利用可能です。',
      faith_communities: '地元の信仰と文化グループを見つける。',
      sports_wellness: 'スポーツとレクリエーション機会を探索する。',
      arts_entertainment: '地元の芸術と文化イベントを発見する。',
    },
    
    // Bookmarks page
    viewAndManageBookmarks: 'ブックマークしたリソースを表示および管理する',
    searchYourBookmarks: 'ブックマークを検索...',
    showingBookmarks: '{{total}}件中{{count}}件のブックマークしたリソースを表示',
    showingBookmarksPaginated: '{{total}}件のブックマーク中{{start}}-{{end}}件を表示',
    failedToLoadBookmarks: 'ブックマークの読み込みに失敗しました。もう一度お試しください。',
    bookmarkedOn: 'ブックマークした日',
    noBookmarksMatchFilters: '現在のフィルターに一致するブックマークはありません。',
    
    // Additional UI elements - screening form
    stepOf: 'ステップ{{current}}/{{total}}',
    percentComplete: '{{percent}}%完了',
    previousButton: '前へ',
    nextButton: '次へ',
    creatingYourPlan: 'プランを作成しています...',
    completeAssessment: '評価を完了する',
    
    // Bookmarks empty state
    noBookmarksYet: 'まだブックマークがありません',
    startExploringBookmark: 'リソースの探索を始めて、役立つものを見つけたらブックマークしてください！',
    pageOf: 'ページ{{current}}/{{total}}',
    yourPersonalizedRoadmap: 'あなたのパーソナライズされたロードマップ',
    resourcesReadyForYou: '{{count}}件のリソースが準備できています',
    seeMoreResources: 'すべてのリソースを探索する',
    discoveringPerfectResources: '完璧なリソースを発見しています',
    noRecommendationsYet: 'パーソナライズされた推奨事項を準備しています。開始するにはリソースディレクトリを探索してください。',
  },
  
  // Error messages
  errors: {
    pageNotFound: 'ページが見つかりません',
    pageNotFoundDescription: 'お探しのページは存在しないか、移動されました。',
  },
}
