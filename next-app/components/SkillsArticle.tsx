import { AnimatedHeading } from '@/components/AnimatedHeading';
import { primarySkills, skillGroups } from '@/data/profile';

/**
 * 主な技術と詳細なスキル一覧を表示する記事セクション。
 * @returns スキルの記事要素。
 */
export function SkillsArticle() {
    return (
        <article className="article article--skills" id="skills">
            <AnimatedHeading className="heading js_move-heading is-animated-top">
                スキル
            </AnimatedHeading>
            <div className="wrapper">
                <section className="section section--profile-note">
                    <div className="profile-skill__primary" aria-label="主な技術">
                        {primarySkills.map(([title, skills]) => (
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
                        <summary>その他の技術を見る</summary>
                        <div className="profile-skill__details-content">
                            {skillGroups.map(([title, skills]) => (
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
                    </details>
                </section>
            </div>
        </article>
    );
}
