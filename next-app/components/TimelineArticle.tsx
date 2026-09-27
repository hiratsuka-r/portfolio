import { ProfileTimeline } from './ProfileTimeline';

/**
 * 現在までのあゆみを表示する記事セクション。
 * @returns 経歴の記事要素。
 */
export function TimelineArticle() {
    return (
        <article className="article article--timeline" id="timeline">
            <ProfileTimeline />
        </article>
    );
}
