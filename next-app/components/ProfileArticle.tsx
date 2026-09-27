import Image from 'next/image';
import { AnimatedHeading } from './AnimatedHeading';
import { ProfileTimeline } from './ProfileTimeline';
import { profileName, skillGroups } from '../data/profile';

/**
 * プロフィール、経歴、スキル、対応可能な業務を表示する記事セクション。
 * @returns プロフィールの記事要素。
 */
export function ProfileArticle() {
    // プロフィール、経歴、スキル、対応業務を各セクションとして表示する。
    return (
        <article className="article article--profile">
            <AnimatedHeading className="heading js_move-heading is-animated-top" level={1}>
                プロフィール
            </AnimatedHeading>
            <div className="wrapper">
                <section className="section section--profile-name">
                    <h2 className="heading--profile-name">hiratsuka-r</h2>
                    <div className="profile-name is-animated-fluffy">
                        <div className="profile-name__heading">
                            {profileName.map((character, index) => (
                                <span key={`${character}-${index}`}>{character}</span>
                            ))}
                        </div>
                        <Image
                            className="profile-name__image"
                            src="/portfolio/img/22903625.jpg"
                            alt=""
                            width={280}
                            height={280}
                        />
                    </div>
                    <div className="profile-name__content">
                        <p className="u-mb">
                            こんにちは！hiratsuka-rと申します。
                            <br />
                            2012年からお仕事としてフロントエンド・バックエンド両方の開発者をしています。日々仕事をすればするほど学ぶことがたくさん出てきて、まだ自信を持っては言えないのですが…ゆくゆくは&quot;フルスタックな開発者です！&quot;と名乗ってみたいと思っています。
                        </p>
                        <p className="u-mb">
                            現在は特定の会社に所属せず、フリーランスとしてお仕事を請け負っています。もし面白そうなお話があればぜひ声をかけてください！
                        </p>
                        <p className="u-mb">
                            1989年生まれ埼玉県在住、二児の母、家族は夫とおてんば娘とやんちゃ坊主。趣味は食べ歩き、散歩ガチ勢、和服の着付け。放送大学
                            情報コースにて学位取得に向けて邁進中。
                        </p>
                    </div>
                </section>
            </div>

            <ProfileTimeline />

            <div className="wrapper">
                <section className="section section--profile-note">
                    <AnimatedHeading className="heading--profile-note js_move-heading is-animated-top">
                        開発スキル・環境
                    </AnimatedHeading>
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
                    <div className="profile-skill__etc">などなど..</div>
                </section>
            </div>

            <div className="wrapper">
                <section className="section section--profile-note">
                    <AnimatedHeading className="heading--profile-note js_move-heading is-animated-top">
                        対応可能な業務
                    </AnimatedHeading>
                    <ul className="profile-menu">
                        <li>ECサイト保守開発</li>
                        <li>ホームページ・LP(1Pで完結できるサイト)構築</li>
                        <li>既存サイトの不具合改善・リファクタリング</li>
                        <li>既存サイトのテキストや画像の修正</li>
                        <li>CMS構築</li>
                    </ul>
                </section>
            </div>

            <div className="wrapper">
                <section className="section section--profile-note">
                    <AnimatedHeading className="heading--profile-note js_move-heading is-animated-top">
                        対応可能な時間帯
                    </AnimatedHeading>
                    <p>[平日] 9:30〜17:00 22:00〜24:00</p>
                </section>
            </div>
        </article>
    );
}
