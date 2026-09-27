import type { CSSProperties } from 'react';
import type { Work } from '../data/works';

interface WorkCardProps {
    work: Work;
    onSelect: (work: Work) => void;
    isPriority?: boolean;
}

/**
 * 1件分の制作実績を操作可能なカードとして表示する。
 * @param props 制作実績、選択時のコールバック、画像優先読み込み設定。
 * @returns 制作実績カード。
 */
export function WorkCard({ work, onSelect, isPriority = false }: WorkCardProps) {
    // カテゴリと担当タグを統合し、重複を除いてカードへ表示する。
    const tags = [...work.category.slice(1), ...work.responsibilityTags].filter(
        (tag, index, all) => all.indexOf(tag) === index
    );
    const projectName = typeof work.project === 'string' ? work.project : work.project?.name;
    const [title, titleSuffix] = work.title.split(' - ', 2);
    const imageStyle = { '--work-image': `url(${work.image})` } as CSSProperties;

    return (
        <button
            className="work is-animated-hover"
            type="button"
            onClick={() => onSelect(work)}
            aria-label={`${work.title}の詳細を表示`}
        >
            <span className="work-image" style={imageStyle}>
                {work.category[0] && (
                    <span className="work-category-badge">{work.category[0]}</span>
                )}
            </span>
            <span className="work-name">
                {titleSuffix ? (
                    <>
                        <span className="work-name__title">{title}</span>
                        <span className="work-name__suffix">- {titleSuffix}</span>
                    </>
                ) : (
                    work.title
                )}
            </span>
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
