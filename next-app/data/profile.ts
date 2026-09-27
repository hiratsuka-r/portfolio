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
                text: '在学中は化学・工学を学びながら、アルバイト先の映画館で作品を観ることに没頭する。',
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
            { text: 'WEB制作の専門学校', emphasis: true },
            { text: 'に進学。' },
            {
                text: 'デザインやWEB制作の基礎を学びながら、ひたすら作品作りに没頭する。',
                lineBreak: true,
            },
            {
                text: '卒業時、主席として表彰を受ける。',
                lineBreak: true,
            },
        ],
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
    {
        year: '2017~',
        content: [
            { text: 'フリーランスとして独立。' },
            {
                text: '企業からの開発依頼を中心に、WEBサイト・WEBシステムの開発に携わる。',
                lineBreak: true,
            },
        ],
    },
];

export const skillGroups = [
    [
        '言語・マークアップ',
        ['HTML', 'CSS / SCSS', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'SQL'],
    ],
    [
        'フレームワーク・ライブラリ',
        ['Next.js', 'React', 'React Native', 'Angular', 'CakePHP', 'Laravel', 'Riot.js'],
    ],
    ['開発環境・ツール', ['Node.js', 'npm', 'Git', 'GitHub', 'Docker', 'PHPUnit', 'JUnit']],
    ['AI支援', ['GitHub Copilot']],
    ['クラウド・インフラ', ['AWS', 'S3', 'CloudFront', 'RDS', 'DynamoDB', 'Lambda']],
    ['デザイン・制作', ['Figma', 'Sketch', 'Photoshop', 'Illustrator']],
] as const;
