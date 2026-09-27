import rawWorks from './works.json';

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

const asStrings = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

export const works: Work[] = (rawWorks as unknown[]).map((item) => {
    const work = item as Record<string, unknown>;
    const project = work.project;
    return {
        id: String(work.id),
        title: String(work.title),
        subtitle: typeof work.subtitle === 'string' ? work.subtitle : undefined,
        category: asStrings(work.category),
        responsibilityTags: asStrings(work.responsibilityTags),
        image: String(work.image),
        link: typeof work.link === 'string' ? work.link : undefined,
        project:
            typeof project === 'string' || project === null || project === undefined
                ? (project as string | null | undefined)
                : {
                      name: String((project as Record<string, unknown>).name ?? ''),
                      company:
                          typeof (project as Record<string, unknown>).company === 'string'
                              ? ((project as Record<string, unknown>).company as string)
                              : undefined,
                  },
        description: typeof work.description === 'string' ? work.description : undefined,
        overview: typeof work.overview === 'string' ? work.overview : undefined,
        basicInfo: work.basicInfo as BasicInfo | undefined,
        responsibilities: asStrings(work.responsibilities),
        technologies:
            work.technologies && typeof work.technologies === 'object'
                ? Object.fromEntries(
                      Object.entries(work.technologies as Record<string, unknown>).map(
                          ([key, value]) => [key, asStrings(value)]
                      )
                  )
                : undefined,
        achievements: asStrings(work.achievements),
        note: typeof work.note === 'string' ? work.note : undefined,
    };
});
