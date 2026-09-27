import { AnimatedHeading } from '@/components/AnimatedHeading';

const capabilities = [
    'Webサイト・Webサービスのフロントエンド開発',
    'Webサイト・LPの新規制作・リニューアル',
    '既存サイト・Webサービスの保守・改修',
    'UI・画面実装、JavaScriptによるインタラクション・アニメーション実装',
    'API連携を含むWeb機能開発',
    'CMS・管理画面の開発・保守',
];

/**
 * 対応可能な業務を表示する記事セクション。
 * @returns できることの記事要素。
 */
export function ProfileCapabilities() {
    return (
        <article className="article article--capabilities" id="capabilities">
            <div className="wrapper">
                <section className="section section--profile-note">
                    <AnimatedHeading className="heading--profile-timeline js_move-heading is-animated-top">
                        できること
                    </AnimatedHeading>
                    <p className="capabilities__description">
                        Webサイトの新規制作から、既存サイトの修正・改善、Webサービスの開発まで。気軽にご相談ください。
                    </p>
                    <ul className="profile-menu">
                        {capabilities.map((capability) => (
                            <li key={capability}>{capability}</li>
                        ))}
                    </ul>
                    <div className="capabilities__availability">
                        <span>対応可能な時間帯</span>
                        <span>[平日] 9:00〜17:30 / 22:00〜24:00</span>
                    </div>
                </section>
            </div>
        </article>
    );
}
