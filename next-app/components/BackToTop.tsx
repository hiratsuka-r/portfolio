'use client';

import { useEffect, useState } from 'react';

const SHOW_AFTER_SCROLL_Y = 200;

/**
 * スクロール位置に応じて表示状態を切り替えるページ上部移動UI。
 * @returns ページ上部へ戻るナビゲーション。
 */
export const BackToTop = () => {
    // ページ上部付近ではボタンを隠し、スクロール後に表示する。
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 現在位置を初期反映し、以後のスクロールで表示状態を更新する。
        /** 現在のスクロール位置からボタンの表示状態を更新する。 */
        const updateVisibility = () => {
            setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_Y);
        };

        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });
        return () => window.removeEventListener('scroll', updateVisibility);
    }, []);

    return (
        <nav className={`nav-toTop${isVisible ? ' js_is-animated' : ''}`}>
            <button
                className="nav-toTop__btn"
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <i className="fa-solid fa-shoe-prints fa-rotate-270 fa-lg" aria-hidden="true"></i>
                <span className="btn-text">TOP</span>
            </button>
        </nav>
    );
};
