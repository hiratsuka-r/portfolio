'use client';

import { AnimatedHeading } from '@/components/AnimatedHeading';
import { useTranslation } from '@/components/LocaleProvider';

/**
 * 対応可能な業務を表示する記事セクション。
 * @returns できることの記事要素。
 */
export const ProfileCapabilities = () => {
    const { t } = useTranslation();

    return (
        <article className="article article--capabilities" id="capabilities">
            <div className="wrapper">
                <section className="section section--profile-note">
                    <AnimatedHeading className="heading--profile-timeline js_move-heading is-animated-top">
                        {t('profile.できること.見出し')}
                    </AnimatedHeading>
                    <p className="capabilities__description">{t('profile.できること.説明')}</p>
                    <ul className="profile-menu">
                        {t<string[]>('profile.できること.項目').map((capability) => (
                            <li key={capability}>{capability}</li>
                        ))}
                    </ul>
                    <div className="capabilities__availability">
                        <span>{t('profile.できること.対応可能時間.見出し')}</span>
                        <span>{t('profile.できること.対応可能時間.文章')}</span>
                    </div>
                </section>
            </div>
        </article>
    );
};
