'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Work } from '../data/works';

const labels: Record<string, React.ReactNode> = {
    serviceType: '種類',
    industry: '分野',
    period: '期間',
    process: '担当工程',
    role: '担当',
    teamSize: '体制',
};

const basicInfoOrder = [
    'serviceType',
    'industry',
    'period',
    'role',
    'process',
    'teamSize',
] as const;

interface Props {
    work: Work | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

/**
 * 選択された制作実績の詳細情報をモーダルで表示する。
 * @param props 表示対象の制作実績、モーダルを閉じるコールバック、前後の実績への移動コールバックと可否。
 * @returns 制作実績の詳細モーダル。対象がない場合は`null`。
 */
export function WorkDetailModal({ work, onClose, onPrev, onNext, hasPrev, hasNext }: Props) {
    // 詳細モーダルを開いた直後に、閉じるボタンへフォーカスを移す。
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (work) closeButtonRef.current?.focus();
    }, [work]);

    if (!work) return null;
    const project = typeof work.project === 'string' ? work.project : work.project?.name;
    const [title, titleSuffix] = work.title.split(' - ', 2);
    const company =
        work.project && typeof work.project === 'object' ? work.project.company : undefined;
    const basicInfoCount =
        basicInfoOrder.filter((key) => work.basicInfo?.[key]).length + (company ? 1 : 0);
    // タグ表示の共通形式を生成する。
    /** 文字列の配列を共通タグ要素へ変換する。 */
    const tags = (values: string[]) =>
        values.map((tag) => (
            <span className="label-genre" key={tag}>
                {tag}
            </span>
        ));
    // 内容が存在するセクションだけを描画し、空の見出しを表示しない。
    /** 内容がある場合だけ、モーダル内の見出し付きセクションを生成する。 */
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
                                <h2 id="work-modal-title">
                                    {titleSuffix ? (
                                        <>
                                            <span className="work-modal__title">{title}</span>
                                            <span className="work-modal__title-suffix">
                                                - {titleSuffix}
                                            </span>
                                        </>
                                    ) : (
                                        work.title
                                    )}
                                </h2>
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
                                        <dl
                                            className={`work-modal__basic-info--${
                                                basicInfoCount % 2 === 0 ? 'even' : 'odd'
                                            }`}
                                        >
                                            {basicInfoOrder.map((key) => {
                                                const value = work.basicInfo?.[key];
                                                if (!value) return null;
                                                return (
                                                    <span key={key}>
                                                        <dt>{labels[key]}</dt>
                                                        <dd>{value}</dd>
                                                    </span>
                                                );
                                            })}
                                            {company && (
                                                <span className="work-modal__basic-item--company">
                                                    <dt>参画先</dt>
                                                    <dd>{company}</dd>
                                                </span>
                                            )}
                                        </dl>,
                                        'work-modal__section--basic'
                                    )}
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
                        <div className="work-modal__nav">
                            <button
                                className={`work-modal__nav-button work-modal__nav-button--prev${
                                    hasPrev ? '' : ' disabled'
                                }`}
                                type="button"
                                disabled={!hasPrev}
                                onClick={onPrev}
                                aria-label="前の制作実績を表示"
                            >
                                <Image
                                    src="/portfolio/img/arrow_prev.svg"
                                    alt=""
                                    width={45}
                                    height={45}
                                />
                            </button>
                            <button
                                className={`work-modal__nav-button work-modal__nav-button--next${
                                    hasNext ? '' : ' disabled'
                                }`}
                                type="button"
                                disabled={!hasNext}
                                onClick={onNext}
                                aria-label="次の制作実績を表示"
                            >
                                <Image
                                    src="/portfolio/img/arrow_next.svg"
                                    alt=""
                                    width={45}
                                    height={45}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
