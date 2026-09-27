export interface TimelineSegment {
    text: string;
    emphasis?: boolean;
    lineBreak?: boolean;
}

export interface TimelineEntry {
    year: string;
    content: TimelineSegment[];
}

export const profileName = 'hiratsuka-r'.split('');

export const timeline: TimelineEntry[] = [
    {
        year: '2000',
        content: [
            { text: 'Yahoo!ジオシティーズにてサイト運営を始める。' },
            { text: '題材は当時の趣味だったキャンプ・散歩の体験記。', lineBreak: true },
        ],
    },
    {
        year: '2005',
        content: [
            { text: '高等専門学校 物質工学科に進学。' },
            {
                text: '在学中は白衣で試験管を振りつつ、アルバイト先の映画館で作品を観ることに没頭する。',
                lineBreak: true,
            },
        ],
    },
    {
        year: '2008',
        content: [
            { text: 'アルバイト先の企業サイトを作成。' },
            {
                text: 'これを皮切りに複数企業のサイト運営保守に関わる。ご要望を伺いながら',
                lineBreak: true,
            },
            { text: '喜ばれるページを作りあげることの面白さ', emphasis: true },
            { text: 'に目覚める。' },
        ],
    },
    {
        year: '2010',
        content: [
            { text: '進路変更し' },
            { text: 'ウェブ制作の専門学校', emphasis: true },
            { text: 'に進学。' },
            {
                text: '在学中はデザインやページ制作の基礎を学びつつ、ひたすら作品作りに没頭する。',
                lineBreak: true,
            },
        ],
    },
    {
        year: '2011',
        content: [{ text: 'ポートフォリオ片手に就職活動中、東日本大震災に見舞われる。' }],
    },
    {
        year: '2012',
        content: [
            { text: '新卒にてシステム開発会社に就職。' },
            { text: 'バックエンド ときどき インフラなエンジニア', emphasis: true, lineBreak: true },
            { text: 'としてシステム開発に関わる。' },
        ],
    },
    {
        year: '2015',
        content: [
            { text: '2社目のシステム開発会社に転職。' },
            {
                text: 'フロントエンド ときどき コーダーなエンジニア',
                emphasis: true,
                lineBreak: true,
            },
            { text: 'としてシステム開発に関わる。' },
        ],
    },
];

export const skillGroups = [
    ['言語', ['HTML', 'CSS (Scss,Sass)', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'SQL']],
    [
        'フレームワーク',
        ['CakePHP', 'Laravel', 'React', 'Angular', 'Riot.js', 'WordPress', 'HeadlessCMS'],
    ],
    [
        '開発系ツール',
        [
            'npm',
            'node.js',
            'VSCode',
            'Test (PHPUnit,JUnit)',
            'TaskRunner (Gulp,webpack,rollup)',
            'AWS (S3,CloudFront,RDS,DynamoDB等)',
        ],
    ],
    ['業務改善系ツール', ['GA', 'Page Speed Insights', 'Lighthouse', 'DBMS_XPLAN.DISPLAY_CURSOR']],
    ['デザイン系ツール', ['Adobe (Ps,Ai,Xd,Dw)', 'Figma', 'Sketch']],
] as const;
