'use client';

import { AnimatedHeading } from '@/components/AnimatedHeading';
import { useTranslation } from '@/components/LocaleProvider';

/**
 * 仕事への向き合い方と相談例を表示する記事セクション。
 * @returns アプローチの記事要素。
 */
export const ProfileApproach = () => {
    const { t } = useTranslation();

    return (
        <article className="article article--approach" id="approach">
            <div className="wrapper">
                <section className="section section--approach">
                    <AnimatedHeading className="heading--profile-timeline js_move-heading is-animated-top">
                        {t('profile.取り組み.見出し')}
                    </AnimatedHeading>
                    <p className="approach__description">{t<string[]>('site.キャッチコピー').slice(1).join('\n')}</p>
                    <div className="approach__consultation">
                        <h2>{t('profile.取り組み.説明')}</h2>
                        <ul>
                            {t<string[]>('profile.取り組み.質問').map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </article>
    );
};
