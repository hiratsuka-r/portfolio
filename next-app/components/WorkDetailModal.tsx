'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Work } from '../data/works';

const labels: Record<string, React.ReactNode> = {
    serviceType: '種類',
    industry: '分野',
    format: '制作形態',
    period: '期間',
    process: '担当工程',
    role: '担当',
    teamSize: '体制',
};

interface Props {
    work: Work | null;
    onClose: () => void;
}

export function WorkDetailModal({ work, onClose }: Props) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (work) closeButtonRef.current?.focus();
    }, [work]);

    if (!work) return null;
    const project = typeof work.project === 'string' ? work.project : work.project?.name;
    const company =
        work.project && typeof work.project === 'object' ? work.project.company : undefined;
    const tags = (values: string[]) =>
        values.map((tag) => (
            <span className="label-genre" key={tag}>
                {tag}
            </span>
        ));
    const section = (title: string, content: React.ReactNode, className = '') =>
        content ? (
            <section className={`work-modal__section ${className}`}>
                <h3>{title}</h3>
                {content}
            </section>
        ) : null;

    return (
        <div
            className="work-modal is-open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
        >
            <div className="work-modal__overlay" role="presentation" onClick={onClose} />
            <div className="work-modal__frame">
                <div className="work-modal__content">
                    <button
                        ref={closeButtonRef}
                        className="work-modal__close"
                        type="button"
                        onClick={onClose}
                        aria-label="制作物の詳細を閉じる"
                    >
                        ×
                    </button>
                    <div className="work-modal__body">
                        <div className="work-modal__hero">
                            <section className="work-modal__header-info">
                                {work.category.length > 0 && (
                                    <div className="work-modal__work-type">
                                        {tags(work.category)}
                                    </div>
                                )}
                                <h2 id="work-modal-title">{work.title}</h2>
                                {(work.description || work.overview) && (
                                    <p className="work-modal__summary">
                                        {work.description || work.overview}
                                    </p>
                                )}
                                {work.responsibilityTags.length > 0 && (
                                    <div className="work-modal__responsibility-tags">
                                        {tags(work.responsibilityTags)}
                                    </div>
                                )}
                                {project && (
                                    <p className="work-modal__project">
                                        <span>
                                            {work.basicInfo?.format === '個人制作'
                                                ? '制作区分'
                                                : '参画プロジェクト'}
                                        </span>
                                        {project}
                                    </p>
                                )}
                            </section>
                            <section className="work-modal__section work-modal__section--image">
                                {work.link ? (
                                    <a
                                        className="work-modal__image-link"
                                        href={work.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${work.title}の公開ページを見る`}
                                    >
                                        <Image
                                            className="work-modal__image"
                                            src={work.image}
                                            alt={work.title}
                                            width={1280}
                                            height={720}
                                        />
                                        <span className="work-modal__image-action">
                                            公開ページを見る <span>↗</span>
                                        </span>
                                    </a>
                                ) : (
                                    <Image
                                        className="work-modal__image"
                                        src={work.image}
                                        alt={work.title}
                                        width={1280}
                                        height={720}
                                    />
                                )}
                            </section>
                        </div>
                        <div className="work-modal__columns">
                            <div className="work-modal__column work-modal__column--left">
                                {(work.basicInfo || company) &&
                                    section(
                                        '基本情報',
                                        <dl>
                                            {Object.entries(work.basicInfo ?? {})
                                                .filter(([, value]) => value)
                                                .map(([key, value]) => (
                                                    <span key={key}>
                                                        <dt>{labels[key] ?? key}</dt>
                                                        <dd>{value}</dd>
                                                    </span>
                                                ))}
                                            {company && (
                                                <span>
                                                    <dt>参画先</dt>
                                                    <dd>{company}</dd>
                                                </span>
                                            )}
                                        </dl>,
                                        'work-modal__section--basic'
                                    )}
                                {section(
                                    '工夫した点・成果',
                                    work.achievements?.length ? (
                                        <ul>
                                            {work.achievements.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : null,
                                    'work-modal__section--achievements'
                                )}
                            </div>
                            <div className="work-modal__column work-modal__column--right">
                                {section(
                                    '担当業務',
                                    work.responsibilities?.length ? (
                                        <ul>
                                            {work.responsibilities.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : null,
                                    'work-modal__section--responsibilities'
                                )}
                                {section(
                                    '使用技術',
                                    work.technologies && (
                                        <div>
                                            {Object.entries(work.technologies).map(
                                                ([group, values]) => (
                                                    <div
                                                        className="work-modal__technology-group"
                                                        key={group}
                                                    >
                                                        <h4>{group}</h4>
                                                        <div className="work-modal__technologies">
                                                            {values.map((value) => (
                                                                <span
                                                                    className="work-modal__technology"
                                                                    key={value}
                                                                >
                                                                    {value}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ),
                                    'work-modal__section--technologies'
                                )}
                            </div>
                        </div>
                        {work.note && <p className="work-modal__note">{work.note}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
