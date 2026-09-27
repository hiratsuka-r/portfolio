import { AnimatedHeading } from './AnimatedHeading';

/**
 * 仕事への向き合い方と相談例を表示する記事セクション。
 * @returns アプローチの記事要素。
 */
export function ProfileApproach() {
    return (
        <article className="article article--approach" id="approach">
            <div className="wrapper">
                <section className="section section--approach">
                    <AnimatedHeading className="heading--profile-timeline js_move-heading is-animated-top">
                        考える。つくる。かえる。
                    </AnimatedHeading>
                    <p className="approach__description">
                        課題を整理し、使う人の目線で考え、必要なところまで自分でつくって、
                        よりいい形にかえていく。
                    </p>
                    <div className="approach__consultation">
                        <h2>何を頼めばいいかわからない、の段階からでも大丈夫です。</h2>
                        <ul>
                            <li>ホームページを作りたいけど、何から決めればいい？</li>
                            <li>今あるサイトをもっと見やすくしたい</li>
                            <li>こんな機能を追加できる？</li>
                        </ul>
                    </div>
                </section>
            </div>
        </article>
    );
}
