'use client';

import { useEffect, useState } from 'react';

const SHOW_AFTER_SCROLL_Y = 200;

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => {
            setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_Y);
        };

        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });
        return () => window.removeEventListener('scroll', updateVisibility);
    }, []);

    return (
        <nav className={`nav-toTop${isVisible ? ' js_is-animated' : ''}`}>
            <button className="nav-toTop__btn">
                <i className="fa-solid fa-shoe-prints fa-rotate-270 fa-lg" aria-hidden="true"></i>
                <span className="btn-text">TOP</span>
            </button>
        </nav>
    );
}
