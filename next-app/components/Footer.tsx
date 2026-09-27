'use client';

import { smoothScrollTo } from '@/utils/scroll';
import Image from 'next/image';
import type { MouseEvent } from 'react';

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
                        プロフィール
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#capabilities" onClick={handleAnchorClick}>
                        できること
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#works" onClick={handleAnchorClick}>
                        制作実績
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#skills" onClick={handleAnchorClick}>
                        スキル
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#timeline" onClick={handleAnchorClick}>
                        あゆみ
                    </a>
                </nav>

                <div className="footer__bottom">
                    <div className="footer__legal">
                        <p className="footer__copyright">
                            © 2017–{new Date().getFullYear()} かえるラボ
                        </p>
                        <p className="footer__invoice-number">
                            適格請求書発行事業者登録番号：T2810973054129
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
