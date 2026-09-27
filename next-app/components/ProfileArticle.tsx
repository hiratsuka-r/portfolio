import Image from 'next/image';
import { profileName } from '../data/profile';
import { AnimatedHeading } from './AnimatedHeading';

/**
 * プロフィールを表示する記事セクション。
 * @returns プロフィールの記事要素。
 */
export function ProfileArticle() {
    return (
        <article className="article article--profile" id="profile">
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
                            2012年から、仕事としてフロントエンド・バックエンド両方の開発に携わっています。
                            日々仕事をする中で学ぶことも多く、まだまだ勉強中ではありますが…ゆくゆくは&quot;フルスタックな開発者です！&quot;と名乗ってみたいと思っています。
                        </p>
                        <p className="u-mb">
                            現在は特定の会社に所属せず、フリーランスとしてお仕事を請け負っています。
                            <br />
                            もし面白そうなお話があれば、ぜひ声をかけてください！
                        </p>
                        <p className="u-mb">
                            1989年生まれ、埼玉県在住。
                            <br />
                            二児の母で、家族は夫とおてんば娘とやんちゃ坊主。
                            <br />
                            趣味は映画を観ること、散歩ガチ勢、和服の着付け。
                            <br />
                            放送大学 情報コースにて学位取得に向けて邁進中。
                        </p>
                    </div>
                </section>
            </div>
        </article>
    );
}
