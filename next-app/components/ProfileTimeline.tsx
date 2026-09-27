'use client';

import { AnimatedHeading } from '@/components/AnimatedHeading';
import { timeline } from '@/data/profile';
import { useCallback, useEffect, useRef, useState } from 'react';

/** 横スクロール表示と縦並び表示を切り替える境界値。 */
const TIMELINE_BREAKPOINT = 599;
/** 横並び時のタイムラインカードの最小高さ。 */
const MIN_TIMELINE_CARD_HEIGHT = 150;
/** 要素位置の比較時に吸収する小数誤差。 */
const POSITION_EPSILON = 1;
/** 最初のカードを戻し切らずに残す表示幅。 */
const TIMELINE_EDGE_SPACE = 40;

/**
 * 現在までのあゆみを表示し、PCではカード単位で横移動するタイムライン。
 *
 * 初期位置では先頭カードを表示し、矢印操作では実際のカード幅を基準に移動する。
 * 末尾の空要素は横移動の終端を示すためだけに使用する。
 * @returns 経歴タイムライン。
 */
export function ProfileTimeline() {
    const wrapperRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLOListElement>(null);
    const [offset, setOffset] = useState(0);
    const [isLandscape, setIsLandscape] = useState(false);
    const [canMovePrev, setCanMovePrev] = useState(false);
    const [canMoveNext, setCanMoveNext] = useState(false);

    /**
     * タイムラインの移動・端判定に使用するDOM要素を取得する。
     * 末尾の補助要素は移動幅の計算から除外し、終端判定だけに使用する。
     */
    const getTimelineElements = () => {
        const list = timelineRef.current;
        const wrapper = wrapperRef.current;
        const firstItem = list?.querySelector<HTMLElement>('.timeline--first');
        const lastItem = list?.querySelector<HTMLElement>('.timeline--last');
        const stepItems = list?.querySelectorAll<HTMLElement>('.timeline:not(.timeline--last)');
        const stepItem = stepItems?.[1] ?? stepItems?.[0];

        if (!wrapper || !list || !firstItem || !lastItem || !stepItem) return null;

        return { wrapper, firstItem, lastItem, stepItem };
    };

    useEffect(() => {
        /** 画面幅に応じた表示方向とカード高さを設定する。 */
        const updateLayout = () => {
            const list = timelineRef.current;
            if (!list) return;

            const landscape = window.innerWidth > TIMELINE_BREAKPOINT;
            setIsLandscape(landscape);
            setOffset(0);

            const cards = Array.from(list.querySelectorAll<HTMLElement>('.timeline__card'));

            if (landscape) {
                // 横並びではカードの高さをそろえ、タイムラインの上下余白を確保する。
                const maxHeight = Math.max(
                    MIN_TIMELINE_CARD_HEIGHT,
                    ...cards.map((card) => card.offsetHeight)
                );
                cards.forEach((card) => {
                    card.style.height = `${maxHeight}px`;
                });
                list.style.padding = `${maxHeight + 16}px 0`;
            } else {
                // 縦並びではカード固有の高さと通常の余白へ戻す。
                cards.forEach((card) => {
                    card.style.height = '';
                });
                list.style.padding = '0';
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    /**
     * 先頭カードと末尾の補助要素の位置から矢印の活性状態を更新する。
     * 判定はタイムラインの移動アニメーション完了後にも実行する。
     */
    const updateButtonState = useCallback(() => {
        const elements = getTimelineElements();

        if (!elements || !isLandscape) {
            setCanMovePrev(false);
            setCanMoveNext(false);
            return;
        }

        const { wrapper, firstItem, lastItem } = elements;
        const wrapperRect = wrapper.getBoundingClientRect();
        const firstRect = firstItem.getBoundingClientRect();
        const lastRect = lastItem.getBoundingClientRect();
        setCanMovePrev(
            firstRect.right - TIMELINE_EDGE_SPACE <= wrapperRect.left - POSITION_EPSILON
        );
        setCanMoveNext(lastRect.right > wrapperRect.right + POSITION_EPSILON);
    }, [isLandscape]);

    useEffect(() => {
        const frame = window.requestAnimationFrame(updateButtonState);
        return () => window.cancelAnimationFrame(frame);
    }, [isLandscape, updateButtonState]);

    /**
     * 実際のカード幅を基準にタイムラインを1枚分移動する。
     * 端までの距離が1枚分に満たない場合は、端で止まるよう移動量を縮める。
     * @param direction 移動方向。
     */
    const moveTimeline = (direction: 'prev' | 'next') => {
        if (!isLandscape) return;

        const elements = getTimelineElements();

        if (!elements) return;

        const { wrapper, firstItem, lastItem, stepItem } = elements;
        const wrapperRect = wrapper.getBoundingClientRect();
        const targetItem = direction === 'prev' ? firstItem : lastItem;
        const targetRect = targetItem.getBoundingClientRect();
        const stepStyles = window.getComputedStyle(stepItem);
        const stepWidth =
            stepItem.getBoundingClientRect().width + parseFloat(stepStyles.marginLeft);
        const distance =
            direction === 'prev'
                ? wrapperRect.left - (targetRect.right - TIMELINE_EDGE_SPACE)
                : targetRect.right - wrapperRect.right;
        const scrollAmount = Math.min(stepWidth, Math.max(0, distance));

        if (scrollAmount === 0) return;

        setOffset(
            (currentOffset) => currentOffset + (direction === 'prev' ? scrollAmount : -scrollAmount)
        );
    };

    return (
        <div className="wrapper">
            <section
                className={`section section--profile-timeline ${
                    isLandscape ? 'timeline-layout--desktop' : 'timeline-layout--mobile'
                }`}
                ref={wrapperRef}
            >
                <AnimatedHeading className="heading--profile-timeline js_move-heading is-animated-top">
                    現在までのあゆみ
                </AnimatedHeading>
                <ol
                    className="timelines"
                    ref={timelineRef}
                    style={{ transform: `translateX(${offset}px)` }}
                    onTransitionEnd={(event) => {
                        // CSSアニメーション完了後に、表示位置とボタン状態を同期する。
                        if (
                            event.target === event.currentTarget &&
                            event.propertyName === 'transform'
                        ) {
                            updateButtonState();
                        }
                    }}
                >
                    {timeline.map(({ year, content }, index) => (
                        <li
                            className={`timeline${index === 0 ? ' timeline--first' : ''}`}
                            key={year}
                        >
                            <div className="timeline__card">
                                <time className="timeline__time">{year}</time>
                                {content.map((segment, index) => (
                                    <span className="timeline__content" key={`${year}-${index}`}>
                                        {segment.lineBreak && <br />}
                                        {segment.emphasis ? (
                                            <span className="timeline__subcolor">
                                                {segment.text}
                                            </span>
                                        ) : (
                                            segment.text
                                        )}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                    <li className="timeline timeline--last" aria-hidden="true"></li>
                </ol>
                <div className="timeline-arrows">
                    <button
                        className={`arrow__prev${canMovePrev ? '' : ' disabled'}`}
                        type="button"
                        disabled={!canMovePrev}
                        onClick={() => moveTimeline('prev')}
                        aria-label="前の経歴を表示"
                    >
                        <span className="icon-arrow icon-arrow--prev" aria-hidden="true" />
                    </button>
                    <button
                        className={`arrow__next${canMoveNext ? '' : ' disabled'}`}
                        type="button"
                        disabled={!canMoveNext}
                        onClick={() => moveTimeline('next')}
                        aria-label="次の経歴を表示"
                    >
                        <span className="icon-arrow icon-arrow--next" aria-hidden="true" />
                    </button>
                </div>
            </section>
        </div>
    );
}
