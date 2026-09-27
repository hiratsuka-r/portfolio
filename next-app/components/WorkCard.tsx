import Image from 'next/image';
import type { Work } from '../data/works';

interface WorkCardProps {
    work: Work;
    onSelect: (work: Work) => void;
    isPriority?: boolean;
}

export function WorkCard({ work, onSelect, isPriority = false }: WorkCardProps) {
    const tags = [...work.category.slice(1), ...work.responsibilityTags].filter(
        (tag, index, all) => all.indexOf(tag) === index
    );
    const projectName = typeof work.project === 'string' ? work.project : work.project?.name;

    return (
        <button
            className="work is-animated-hover"
            type="button"
            onClick={() => onSelect(work)}
            aria-label={`${work.title}の詳細を表示`}
        >
            <span className="work-image">
                <Image
                    src={work.image}
                    alt=""
                    width={640}
                    height={360}
                    loading={isPriority ? 'eager' : 'lazy'}
                />
                {work.category[0] && (
                    <span className="work-category-badge">{work.category[0]}</span>
                )}
            </span>
            <span className="work-name">{work.title}</span>
            {work.subtitle && <span className="work-subtitle">{work.subtitle}</span>}
            {tags.length > 0 && (
                <span className="work__label">
                    {tags.map((tag) => (
                        <span className="label-genre" key={tag}>
                            {tag}
                        </span>
                    ))}
                </span>
            )}
            {projectName && (
                <span className="work-project">
                    <span>
                        {work.basicInfo?.format === '個人制作' ? '制作区分' : '参画プロジェクト'}
                    </span>
                    {projectName}
                </span>
            )}
            <span className="work-detail-action" aria-hidden="true">
                <span>&raquo;</span>
            </span>
        </button>
    );
}
