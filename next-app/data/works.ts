export type Project = string | { name: string; company?: string };
export type Technologies = Record<string, string[]>;

export type BasicInfo = {
    serviceType?: string;
    industry?: string;
    format?: string;
    period?: string;
    process?: string;
    role?: string;
    teamSize?: string;
    [key: string]: string | undefined;
};

export type WorkSource = {
    id: string;
    image: string;
    link?: string;
    links?: {
        ja?: string;
        en?: string;
    };
};

export type Work = WorkSource & {
    title: string;
    subtitle?: string;
    category: string[];
    responsibilityTags: string[];
    project?: Project | null;
    description?: string;
    overview?: string;
    basicInfo?: BasicInfo;
    responsibilities?: string[];
    technologies?: Technologies;
    achievements?: string[];
    note?: string;
};

export const works: WorkSource[] = [
    {
        "id": "data-scfleet",
        "image": "/portfolio/img/works/smart-construction-fleet.jpg",
        "link": "https://jp.smartconstruction.com/smart-construction-fleet",
        "links": {
            "ja": "https://jp.smartconstruction.com/smart-construction-fleet",
            "en": "https://jp.smartconstruction.com/en/smart-construction-fleet"
        }
    },
    {
        "id": "data-tr-mypage",
        "image": "/portfolio/img/works/exile-tribe-mypage.jpg",
        "link": "https://m.tribe-m.jp/common/mypage/tutorial/mypage/index",
        "links": {
            "ja": "https://m.tribe-m.jp/common/mypage/tutorial/mypage/index",
            "en": "https://m.tribe-m.jp/common/mypage/tutorial/mypage/index"
        }
    },
    {
        "id": "data-ex-birthday",
        "image": "/portfolio/img/works/exile-member-birthday-party.jpg",
        "link": "https://mbd.ldh-m.jp/service",
        "links": {
            "ja": "https://mbd.ldh-m.jp/service",
            "en": "https://mbd.ldh-m.jp/service"
        }
    },
    {
        "id": "data-tr-generations",
        "image": "/portfolio/img/works/generations.jpg",
        "link": "https://m.tribe-m.jp/artist/index/37",
        "links": {
            "ja": "https://m.tribe-m.jp/artist/index/37",
            "en": "https://m.tribe-m.jp/artist/index/37"
        }
    },
    {
        "id": "data-tr-psychic-fever",
        "image": "/portfolio/img/works/psychic-fever.jpg",
        "link": "https://m.tribe-m.jp/Artist/index/262",
        "links": {
            "ja": "https://m.tribe-m.jp/Artist/index/262",
            "en": "https://m.tribe-m.jp/Artist/index/262"
        }
    },
    {
        "id": "data-ex-tetsuya",
        "image": "/portfolio/img/works/exile-tetsuya.jpg",
        "link": "https://m.ex-m.jp/artist/index/11",
        "links": {
            "ja": "https://m.ex-m.jp/artist/index/11",
            "en": "https://m.ex-m.jp/artist/index/11"
        }
    },
    {
        "id": "data-m-and-a",
        "image": "/portfolio/img/works/shacho-no-sentaku.jpg",
        "link": "https://www.nihon-ma.co.jp/seminar/sentaku2024/",
        "links": {
            "ja": "https://www.nihon-ma.co.jp/seminar/sentaku2024/",
            "en": "https://www.nihon-ma.co.jp/seminar/sentaku2024/"
        }
    },
    {
        "id": "data-webinar",
        "image": "/portfolio/img/works/adminttv-webinar.jpg",
        "link": "https://www.digital-cruise.co.jp/webinar/",
        "links": {
            "ja": "https://www.digital-cruise.co.jp/webinar/",
            "en": "https://www.digital-cruise.co.jp/webinar/"
        }
    },
    {
        "id": "data-portfolio",
        "image": "/portfolio/img/works/portfolio.png",
        "link": "https://github.com/hiratsuka-r/portfolio",
        "links": {
            "ja": "https://github.com/hiratsuka-r/portfolio",
            "en": "https://github.com/hiratsuka-r/portfolio"
        }
    }
];
