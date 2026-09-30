export type Project = string | { name: string; company?: string };
export type Technologies = Record<string, string[]>;

export interface BasicInfo {
    serviceType?: string;
    industry?: string;
    format?: string;
    period?: string;
    process?: string;
    role?: string;
    teamSize?: string;
    [key: string]: string | undefined;
}

export interface Work {
    id: string;
    title: string;
    subtitle?: string;
    category: string[];
    responsibilityTags: string[];
    image: string;
    link?: string;
    project?: Project | null;
    description?: string;
    overview?: string;
    basicInfo?: BasicInfo;
    responsibilities?: string[];
    technologies?: Technologies;
    achievements?: string[];
    note?: string;
}

export const works: Work[] = [
    {
        "id": "data-scfleet",
        "title": "Smart Construction Fleet",
        "subtitle": "車両動態管理システム・管理画面",
        "category": [
            "業務システム"
        ],
        "responsibilityTags": [
            "新規開発",
            "既存保守",
            "フロントエンド",
            "バックエンド"
        ],
        "image": "/portfolio/img/works/smart-construction-fleet.jpg",
        "link": "https://jp.smartconstruction.com/smart-construction-fleet",
        "project": {
            "name": "建設DX・車両動態管理システム開発",
            "company": "福島コンピューターシステム株式会社"
        },
        "description": "建設現場における車両・建設機械の位置情報や稼働状況を管理する車両動態管理システム。施工・施工管理フェーズで利用される管理画面の開発・保守を担当しました。",
        "basicInfo": {
            "serviceType": "業務システム",
            "period": "2025/06～2026/09",
            "role": "フロントエンドエンジニア（管理画面担当）",
            "process": "詳細設計～実装・テスト"
        },
        "responsibilities": [
            "管理画面のフロントエンド開発・保守",
            "REST APIの改修など、バックエンド開発の対応",
            "詳細設計から実装・テスト・レビューまでの開発工程を担当",
            "AIを活用した開発手法を取り入れ、要件整理から実装・レビューまで一貫して対応",
            "顧客から事前にご要望を伺い、要件・仕様を整理・提案",
            "定例会での顧客との要件・仕様のすり合わせ"
        ],
        "technologies": {
            "Frontend": [
                "Next.js",
                "TypeScript"
            ],
            "Backend": [
                "Java",
                "Spring Boot"
            ],
            "API": [
                "REST API"
            ],
            "Tools": [
                "GitHub Copilot",
                "Microsoft 365 Copilot"
            ]
        },
        "achievements": [
            "ダンプの積み下ろし回数や移動土量などを確認できる予実管理機能を新規開発",
            "船舶や低速車両が中心となる現場からの要望を受け、走行履歴画面で速度帯・表示色を切り替えられる機能を追加",
            "重量表示をキログラム・ポンドに加えてトンにも対応",
            "レポート機能の期間指定を日・週・月単位から任意期間に拡張",
            "走行履歴・レポート・各種表示機能など、既存管理画面の機能改善を実施"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-tr-mypage",
        "title": "EXILE TRIBE mobile - MY PAGE -",
        "subtitle": "マイページ・アバターサービス",
        "category": [
            "モバイルサービス"
        ],
        "responsibilityTags": [
            "新規開発",
            "既存保守",
            "フロントエンド"
        ],
        "image": "/portfolio/img/works/exile-tribe-mypage.jpg",
        "link": "https://m.tribe-m.jp/common/mypage/tutorial/mypage/index",
        "project": {
            "name": "芸能系モバイルサイト開発",
            "company": "株式会社CAM"
        },
        "description": "芸能系モバイルファンサイトのマイページ（アバターサービス）を主担当として、継続的な機能開発・運用を担当しました。\nアバターパーツの追加やゲーム・ガシャコンテンツの演出実装、関連するLP・特別演出の制作など、サービス運営に伴うフロントエンド開発に幅広く携わりました。",
        "basicInfo": {
            "serviceType": "モバイルファンサイト",
            "period": "2016/07～2019/06\n2021/01～2022/12",
            "role": "フロントエンドエンジニア",
            "process": "基本設計～保守・運用"
        },
        "responsibilities": [
            "マイページ（アバターサービス）の画面UI・各機能のフロントエンド開発・保守",
            "APIとのデータ連携を含むマイページ機能の実装",
            "アバターの服・靴などのパーツ追加に伴うHTML/CSS調整",
            "Riot.jsをベースとしたガシャ・ゲームコンテンツの開発、演出ロジックの実装",
            "ガシャアニメーションやゲームパートのCSS・JavaScriptによる演出実装",
            "デザイナーから提供された素材をもとにした画面・演出の実装"
        ],
        "technologies": {
            "Frontend": [
                "JavaScript",
                "Riot.js",
                "HTML",
                "SCSS",
                "jQuery"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Mobile": [
                "React Native"
            ],
            "Database": [
                "MySQL"
            ],
            "Infrastructure": [
                "AWS",
                "Docker"
            ],
            "Tools": [
                "Git",
                "GitHub",
                "Gulp",
                "Rollup",
                "webpack",
                "Jenkins",
                "Figma",
                "Sketch",
                "Photoshop",
                "Illustrator"
            ]
        },
        "achievements": [
            "CSSからSCSSへの移行にあたり、複雑化していたセレクタや上書き関係、共通化を整理し、スタイルの保守性を向上",
            "ReactやAngularなど複数のフレームワークが混在していた環境の整理に参画し、React部分のRiot.jsへの移行を担当",
            "Node.jsのバージョンアップに伴い、非対応パッケージの置き換え、package.jsonの整理、ビルドエラーの解消まで対応",
            "Prettierをチームの開発ルールとして導入し、設定ファイルの整備と既存コードのフォーマットを実施",
            "Gitコミット時の自動整形を導入し、チーム内のコードフォーマットを統一"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-ex-birthday",
        "title": "EXILE mobile - MEMBER BIRTHDAY PARTY -",
        "subtitle": "アバターサービスを拡張した新コンテンツ",
        "category": [
            "モバイルサービス"
        ],
        "responsibilityTags": [
            "新規開発",
            "基本設計",
            "フロントエンド"
        ],
        "image": "/portfolio/img/works/exile-member-birthday-party.jpg",
        "link": "https://mbd.ldh-m.jp/service",
        "project": {
            "name": "芸能系モバイルサイト開発",
            "company": "株式会社CAM"
        },
        "description": "既存のアバターサービスを拡張し、4つのモバイルサイトと連携した「MEMBER BIRTHDAY PARTY」の新コンテンツ開発に携わりました。複数サイト間でデータ連携が発生する構成に対応し、連携された情報に応じてサイト名やカラーなどのUI・デザインを切り替えるフロントエンド実装を担当しました。",
        "basicInfo": {
            "serviceType": "モバイルファンサイト",
            "industry": "エンタメ・芸能",
            "period": "2021/03～2022/10",
            "role": "フロントエンドエンジニア",
            "process": "基本設計～実装",
            "teamSize": "8名規模"
        },
        "responsibilities": [
            "4つのモバイルサイトと連携する新コンテンツのフロントエンド開発",
            "サイト間のデータ連携を考慮した画面・UIの実装",
            "連携された情報に応じたサイト名・カラーなどのUI切り替え",
            "Figmaのデザインをもとにした動作プロトタイプの作成",
            "デザイナー・運営側へのプロトタイプ確認と仕様調整",
            "ゲーム・アバター関連機能のフロントエンド実装"
        ],
        "technologies": {
            "Frontend": [
                "JavaScript",
                "Riot.js",
                "HTML",
                "SCSS",
                "jQuery"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Database": [
                "MySQL"
            ],
            "Infrastructure": [
                "AWS",
                "Docker"
            ],
            "Tools": [
                "Git",
                "GitHub",
                "Gulp",
                "Rollup",
                "webpack",
                "Jenkins",
                "Figma"
            ]
        },
        "achievements": [
            "既存のアバターサービスを基盤として、新規コンテンツ「MEMBER BIRTHDAY PARTY」を開発し、4つのモバイルサイトから連携される情報に応じたUI・デザインの切り替えを実装",
            "Figmaのデザインをもとに動作プロトタイプを作成し、新規コンテンツの画面仕様や動きを実装前に具体化",
            "複数のプロトタイプをデザイナー・運営側に確認して合意を得た上で実装を進め、新規サービスの仕様を固めながら開発"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-tr-generations",
        "title": "GENERATIONS",
        "subtitle": "アーティストページ リニューアル",
        "category": [
            "モバイルサービス"
        ],
        "responsibilityTags": [
            "リニューアル",
            "UI実装",
            "フロントエンド"
        ],
        "image": "/portfolio/img/works/generations.jpg",
        "link": "https://m.tribe-m.jp/artist/index/37",
        "project": {
            "name": "芸能系モバイルサイト開発",
            "company": "株式会社CAM"
        },
        "description": "EXILE TRIBE mobile の GENERATIONS アーティストページのリニューアルに携わりました。デザイン・仕様に基づき、スクロールに連動したUIインタラクションの実装を担当しました。",
        "basicInfo": {
            "serviceType": "モバイルファンサイト",
            "role": "フロントエンドエンジニア",
            "process": "詳細設計～実装"
        },
        "responsibilities": [
            "GENERATIONSアーティストページのリニューアルに伴うフロントエンド実装",
            "スクロールに連動したアーティスト写真のスライドインアニメーションの実装",
            "スクロール位置に応じた背景切り替えロジックの実装",
            "メンバーの写真・名前を一覧表示するUIの実装"
        ],
        "technologies": {
            "Frontend": [
                "JavaScript",
                "Riot.js",
                "HTML",
                "SCSS",
                "jQuery"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Database": [
                "MySQL"
            ],
            "Infrastructure": [
                "AWS",
                "Docker"
            ],
            "Tools": [
                "Git",
                "GitHub",
                "Gulp",
                "Rollup",
                "webpack",
                "Jenkins"
            ]
        },
        "achievements": [
            "デザイン・仕様に基づき、スクロール位置の判定や背景切り替え、アーティスト写真のスライドインなど、UIインタラクションの実現方法を検討し実装"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-tr-psychic-fever",
        "title": "PSYCHIC FEVER",
        "subtitle": "アーティストページ リニューアル",
        "category": [
            "モバイルサービス"
        ],
        "responsibilityTags": [
            "リニューアル",
            "フロントエンド"
        ],
        "image": "/portfolio/img/works/psychic-fever.jpg",
        "link": "https://m.tribe-m.jp/Artist/index/262",
        "project": {
            "name": "芸能系モバイルサイト開発",
            "company": "株式会社CAM"
        },
        "description": "芸能系モバイルファンサイトの関連サイトとして、アーティストページのリニューアルに携わりました。デザイナーが制作したアーティストの世界観をもとに、フロントエンド側で動きや演出を実装しました。",
        "basicInfo": {
            "serviceType": "モバイルファンサイト",
            "period": "2019/04～2019/05",
            "role": "フロントエンドエンジニア",
            "process": "基本設計～保守・運用"
        },
        "responsibilities": [
            "PSYCHIC FEVERアーティストページのフロントエンド開発",
            "デザイナーが制作したアーティストの世界観をもとにした画面実装",
            "JavaScript等による画面演出・アニメーションの実装"
        ],
        "technologies": {
            "Frontend": [
                "JavaScript",
                "Riot.js",
                "HTML",
                "SCSS",
                "jQuery"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Database": [
                "MySQL"
            ],
            "Infrastructure": [
                "AWS",
                "Docker"
            ],
            "Tools": [
                "Git",
                "GitHub",
                "Gulp",
                "Rollup",
                "webpack",
                "Jenkins"
            ]
        },
        "achievements": [
            "EXILE TRIBE mobileのトップページ直下に位置するアーティストページの開発を担当し、フロントエンドの担当範囲を広げて対応",
            "アーティストの世界観を表現するデザインに対してフロントエンド側で動きを加え、インタラクティブな演出を実装",
            "背景の雷の演出について、運営側から評価を得た"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-ex-tetsuya",
        "title": "EXILE TETSUYA",
        "subtitle": "アーティストページ リニューアル",
        "category": [
            "モバイルサービス"
        ],
        "responsibilityTags": [
            "リニューアル",
            "UI実装",
            "フロントエンド"
        ],
        "image": "/portfolio/img/works/exile-tetsuya.jpg",
        "link": "https://m.ex-m.jp/artist/index/11",
        "project": {
            "name": "芸能系モバイルサイト開発",
            "company": "株式会社CAM"
        },
        "description": "EXILE TETSUYAさんの個人コーナーについて、ブランド立ち上げに伴うリニューアルを担当しました。デザインをもとにHTML/CSS・JavaScriptでフロントエンド実装を行い、メニュー部分のアニメーションについて実装方法を検討しました。",
        "basicInfo": {
            "serviceType": "モバイルファンサイト",
            "role": "フロントエンドエンジニア",
            "process": "詳細設計～結合テスト"
        },
        "responsibilities": [
            "EXILE TETSUYA個人コーナーのブランドリニューアルに伴うフロントエンド実装",
            "デザインをもとにしたHTML/CSS・JavaScriptの実装",
            "メニュー部分のUI・アニメーションの実装方法を検討",
            "複数のアニメーション案を作成し、採用案を実装"
        ],
        "technologies": {
            "Frontend": [
                "JavaScript",
                "Riot.js",
                "HTML",
                "SCSS",
                "jQuery"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Database": [
                "MySQL"
            ],
            "Infrastructure": [
                "AWS",
                "Docker"
            ],
            "Tools": [
                "Git",
                "GitHub",
                "Gulp",
                "Rollup",
                "webpack",
                "Jenkins"
            ]
        },
        "achievements": [
            "メニュー部分のアニメーションについて実装方法を複数検討し、採用された案を実装",
            "デザインの意図を踏まえながら、実装可能な表現方法を調整"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-m-and-a",
        "title": "社長の選択",
        "subtitle": "オーナー経営者さま限定カンファレンス",
        "category": [
            "LP"
        ],
        "responsibilityTags": [
            "新規開発",
            "フロントエンド"
        ],
        "image": "/portfolio/img/works/shacho-no-sentaku.jpg",
        "link": "https://www.nihon-ma.co.jp/seminar/sentaku2024/",
        "project": {
            "name": "M&A関連Webサイト運用・制作",
            "company": "株式会社日本M&Aセンター"
        },
        "description": "M&A関連Webサイトの運用・制作に携わり、デザイン画像をもとにしたLPの新規作成や既存サイトの改修、開発環境の移行などを担当しました。",
        "basicInfo": {
            "serviceType": "M&A関連Webサイト",
            "industry": "M&A仲介",
            "period": "2023/12～2024/05",
            "role": "バックエンドエンジニア（主担当）／フロントエンド",
            "process": "詳細設計～結合テスト",
            "teamSize": "13名規模"
        },
        "responsibilities": [
            "M&A関連WebサイトにおけるLPの新規作成",
            "デザイン画像をもとにしたHTML/CSSの実装",
            "デザインの再現性を考慮したレイアウト・スタイリング調整",
            "ポータルサイトの日常更新・改修",
            "Dockerを用いた開発環境への移行・環境構築"
        ],
        "technologies": {
            "Frontend": [
                "JavaScript",
                "SCSS",
                "jQuery"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Database": [
                "MySQL"
            ],
            "Tools": [
                "Docker",
                "Node.js",
                "npm",
                "Gulp",
                "PageSpeed Insights",
                "Lighthouse",
                "Google Analytics"
            ]
        },
        "achievements": [
            "Figmaではなくデザイン画像をもとにLPをゼロから実装し、マージン等の細部まで再現して仕上げた点を評価された",
            "デザイン画像から画面構成やレイアウトを読み取り、HTML/CSSで実装へ落とし込んだ"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-webinar",
        "title": "admintTV Webinar",
        "subtitle": "動画配信型LMS・CMS",
        "category": [
            "業務システム"
        ],
        "responsibilityTags": [
            "既存保守",
            "バックエンド"
        ],
        "image": "/portfolio/img/works/adminttv-webinar.jpg",
        "link": "https://www.digital-cruise.co.jp/webinar/",
        "project": {
            "name": "動画配信型LMS・CMS開発",
            "company": "デジタルクルーズ株式会社"
        },
        "description": "社員教育・育成分野を中心とした動画配信型LMSおよび、関連するポータルサイト作成用CMSの開発に携わりました。動画配信のための管理画面を保守し、管理者がエンドユーザーへ教育用動画を配信できる仕組みに対応しました。",
        "basicInfo": {
            "serviceType": "動画配信型LMS・CMS",
            "industry": "教育・研修／動画配信",
            "period": "2023/03～2023/08",
            "role": "バックエンドエンジニア",
            "process": "基本設計～結合テスト"
        },
        "responsibilities": [
            "動画配信型LMSの管理画面の保守・改修",
            "管理者がエンドユーザーへ教育用動画を配信するための機能対応",
            "LMSに関連するポータルサイト作成用CMSの開発",
            "システム全体の仕様調査",
            "各担当者へのヒアリング",
            "機能実装に伴うテスト観点の整理",
            "シナリオ試験書の作成",
            "システムの回帰テスト"
        ],
        "technologies": {
            "Frontend": [
                "TypeScript",
                "SCSS"
            ],
            "Backend": [
                "PHP",
                "CakePHP"
            ],
            "Mobile": [
                "React Native"
            ],
            "Database": [
                "MySQL",
                "DynamoDB"
            ],
            "Infrastructure": [
                "AWS",
                "Docker"
            ],
            "Tools": [
                "Node.js",
                "npm",
                "Rollup",
                "webpack",
                "Bitrise",
                "PHPUnit",
                "AWS CodeCommit",
                "Lambda",
                "CloudFront",
                "S3"
            ]
        },
        "achievements": [
            "機能実装ごとに詳細なテストを作成する時間が限られていたため、複数の機能に適用できる汎用的なシナリオ試験書のテンプレートを作成",
            "作成したテンプレートを用いて回帰テストを実施し、リリース前のテストでほぼ毎回バグを発見・修正ができていた"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    },
    {
        "id": "data-portfolio",
        "title": "ポートフォリオ",
        "subtitle": "プロフィール・制作実績ポートフォリオ",
        "category": [
            "個人制作"
        ],
        "responsibilityTags": [
            "企画",
            "設計",
            "デザイン",
            "実装"
        ],
        "image": "/portfolio/img/works/portfolio.png",
        "link": "https://github.com/hiratsuka-r/portfolio",
        "project": {
            "name": "ポートフォリオ制作"
        },
        "description": "自身のプロフィール、スキル、制作物を紹介するポートフォリオサイトです。閲覧者が経歴と制作実績を確認しやすいよう、情報をセクションごとに整理しています。",
        "basicInfo": {
            "serviceType": "ポートフォリオサイト",
            "process": "要件定義～公開"
        },
        "responsibilities": [],
        "technologies": {
            "Frontend": [
                "Next.js",
                "TypeScript",
                "SCSS"
            ],
            "Tools": [
                "GitHub",
                "GitHub Copilot"
            ]
        },
        "achievements": [
            "PC・タブレット・スマートフォンでの閲覧に対応",
            "制作物の一覧から詳細情報へスムーズに遷移できるUIを実装",
            "制作物の追加・更新をデータ変更中心で行える構成とし、 保守性を向上"
        ],
        "note": "掲載しているビジュアルは案件内容をイメージしたもので、実際のサービス画面・素材ではありません。"
    }
];
