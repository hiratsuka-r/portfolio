import { works } from '../data/works';
import { AnimatedHeading } from './AnimatedHeading';
import { WorksSection } from './WorksSection';

/**
 * 制作実績の説明と一覧をまとめた記事セクションを表示する。
 * @returns 制作実績の記事要素。
 */
export function WorkArticle() {
    // 制作実績の説明と一覧表示をまとめたページセクションを描画する。
    return (
        <article className="article article--work" id="works">
            <AnimatedHeading className="heading js_move-heading is-animated-slash">
                制作実績
            </AnimatedHeading>
            <div className="wrapper">
                <section className="section section--work">
                    <p className="work-info">
                        制作会社様から頂いた案件については、守秘義務の都合上一般公開されているサイト(紹介ページ等)のみを掲載しております。
                        <br className="media-br__tablet" />
                        個別にお話しできるものもありますため、興味を持ってくださった場合は気軽にお声がけください。
                    </p>
                    <WorksSection works={works} />
                </section>
            </div>
        </article>
    );
}
