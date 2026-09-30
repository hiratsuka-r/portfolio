export interface TimelineEntry {
    year: string;
    text: string;
}

export const profileName = 'hiratsuka-r'.split('');

export const timeline: TimelineEntry[] = [
    {
        year: '2000',
        text: '{{Yahoo!ジオシティーズ}}にてサイト運営を始める。\n題材は当時の趣味だったキャンプ・散歩の体験記。',
    },
    {
        year: '2005',
        text: '高等専門学校 物質工学科に進学。\n在学中は化学・工学を学びながら、アルバイト先の映画館で作品を観ることに没頭する。',
    },
    {
        year: '2008',
        text: 'アルバイト先の企業サイトを作成。\nこれを皮切りに複数企業のサイト運営保守に関わる。\nご要望を伺いながら<em>喜ばれるページを作りあげることの面白さ</em>に目覚める。',
    },
    {
        year: '2010',
        text: '進路変更し<em>WEB制作の専門学校</em>に進学。\nデザインやWEB制作の基礎を学びながら、ひたすら作品作りに没頭する。\n卒業時、主席として表彰を受ける。',
    },
    {
        year: '2012',
        text: '新卒にてシステム開発会社に就職。\n<em>バックエンド ときどき インフラなエンジニア</em>としてシステム開発に関わる。',
    },
    {
        year: '2015',
        text: '2社目のシステム開発会社に転職。\n<em>フロントエンド ときどき コーダーなエンジニア</em>としてシステム開発に関わる。',
    },
    {
        year: '2017~',
        text: 'フリーランスとして独立。\n企業からの開発依頼を中心に、WEBサイト・WEBシステムの開発に携わる。',
    },
];

export const primarySkills = [
    ['主なスキル', ['TypeScript', 'JavaScript', 'Next.js', 'React', 'PHP', 'Java', 'AWS', 'SQL']],
] as const;

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
