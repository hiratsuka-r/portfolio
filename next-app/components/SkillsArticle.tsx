'use client';

import { AnimatedHeading } from '@/components/AnimatedHeading';
import { useTranslation } from '@/components/LocaleProvider';
import { skillGroups } from '@/data/profile';
import type { TranslationKey } from '@/tools/dictionary/i18n';

/**
 * 主な技術と詳細なスキル一覧を表示する記事セクション。
 * @returns スキルの記事要素。
 */
export function SkillsArticle() {
    const { t } = useTranslation();

    return (
        <article className="article article--skills" id="skills">
            <AnimatedHeading className="heading js_move-heading is-animated-top">{t('skills.見出し')}</AnimatedHeading>
            <div className="wrapper">
                <section className="section section--profile-note">
                    <div className="profile-skill__primary" aria-label={t('skills.主な技術.見出し')}>
                        {[
                            {
                                title: t('skills.主な技術.見出し'),
                                skills: t<string[]>('skills.主な技術.項目'),
                            },
                        ].map(({ title, skills }) => (
                            <dl className="profile-skill" key={title}>
                                <dt className="profile-skill__dt">{title}</dt>
                                {skills.map((skill) => (
                                    <dd className="profile-skill__dd" key={skill}>
                                        {skill}
                                    </dd>
                                ))}
                            </dl>
                        ))}
                    </div>
                    <details className="profile-skill__details">
                        <summary>{t('skills.その他の技術')}</summary>
                        <div className="profile-skill__details-content">
                            {skillGroups.map(([title]) => (
                                <dl className="profile-skill" key={title}>
                                    <dt className="profile-skill__dt">{t(`skills.${title}.見出し` as TranslationKey)}</dt>
                                    {t<string[]>(`skills.${title}.項目` as TranslationKey).map((skill) => (
                                        <dd className="profile-skill__dd" key={skill}>
                                            {skill}
                                        </dd>
                                    ))}
                                </dl>
                            ))}
                        </div>
                    </details>
                </section>
            </div>
        </article>
    );
}
