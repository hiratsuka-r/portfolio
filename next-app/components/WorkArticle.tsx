'use client';

import { AnimatedHeading } from '@/components/AnimatedHeading';
import { useTranslation } from '@/components/LocaleProvider';
import { WorksSection } from '@/components/WorksSection';
import { works } from '@/data/works';

/**
 * 制作実績の説明と一覧をまとめた記事セクションを表示する。
 * @returns 制作実績の記事要素。
 */
export const WorkArticle = () => {
    const { t } = useTranslation();

    // 制作実績の説明と一覧表示をまとめたページセクションを描画する。
    return (
        <article className="article article--work" id="works">
            <AnimatedHeading className="heading js_move-heading is-animated-slash">{t('works.見出し')}</AnimatedHeading>
            <div className="wrapper">
                <section className="section section--work">
                    <p className="work-info">
                        {t<string[]>('works.説明').map((line, index) => (
                            <span key={line}>
                                {line}
                                {index === 0 && <br className="media-br__tablet" />}
                            </span>
                        ))}
                    </p>
                    <WorksSection works={works} />
                </section>
            </div>
        </article>
    );
};
