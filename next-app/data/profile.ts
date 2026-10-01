export interface TimelineEntry {
    year: string;
}

export const profileName = 'hiratsuka-r'.split('');

export const timeline: TimelineEntry[] = [
    {
        year: '2000',
    },
    {
        year: '2005',
    },
    {
        year: '2008',
    },
    {
        year: '2010',
    },
    {
        year: '2012',
    },
    {
        year: '2015',
    },
    {
        year: '2017~',
    },
];

export const primarySkills = [['主なスキル', ['TypeScript', 'JavaScript', 'Next.js', 'React', 'PHP', 'Java', 'AWS', 'SQL']]] as const;

export const skillGroups = [
    ['言語・マークアップ', ['HTML', 'CSS / SCSS', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'SQL']],
    ['フレームワーク・ライブラリ', ['Next.js', 'React', 'React Native', 'Angular', 'CakePHP', 'Laravel', 'Riot.js']],
    ['開発環境・ツール', ['Node.js', 'npm', 'Git', 'GitHub', 'Docker', 'PHPUnit', 'JUnit']],
    ['AI支援', ['GitHub Copilot']],
    ['クラウド・インフラ', ['AWS', 'S3', 'CloudFront', 'RDS', 'DynamoDB', 'Lambda']],
    ['デザイン・制作', ['Figma', 'Sketch', 'Photoshop', 'Illustrator']],
] as const;
