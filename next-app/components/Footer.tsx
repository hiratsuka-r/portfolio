'use client';

import Image from 'next/image';
import type { MouseEvent } from 'react';
import { smoothScrollTo } from '../utils/scroll';

export const Footer = () => {
    const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const targetId = event.currentTarget.hash.slice(1);
        const target = document.getElementById(targetId);

        if (!target) return;

        event.preventDefault();
        window.history.pushState(null, '', `#${targetId}`);
        smoothScrollTo(window.scrollY + target.getBoundingClientRect().top);
    };

    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__main">
                    <div className="footer__brand">
                        <a
                            href="#top"
                            className="footer__logo"
                            aria-label="hiratsuka-r ページトップ"
                            onClick={handleAnchorClick}
                        >
                            <Image
                                src="/portfolio/img/logo_green.png"
                                alt="かえるラボ | Web開発・UI/UXデザイン"
                                width={2172}
                                height={724}
                                priority
                            />
                        </a>
                    </div>

                    <div className="footer__message">
                        <p className="footer__catch">考える。つくる。かえる。</p>
                        <p className="footer__description">
                            課題を整理し、使う人の目線で考え、
                            <br />
                            必要なところまで自分でつくって、
                            <br />
                            よりいい形にかえていく。
                        </p>
                    </div>
                </div>

                <nav className="footer__nav" aria-label="フッターナビゲーション">
                    <a href="#profile" onClick={handleAnchorClick}>
                        PROFILE
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#skills" onClick={handleAnchorClick}>
                        SKILLS
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#works" onClick={handleAnchorClick}>
                        WORKS
                    </a>
                </nav>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2017–{new Date().getFullYear()} かえるラボ｜Web開発・UI/UXデザイン
                    </p>
                </div>
            </div>
        </footer>
    );
};
