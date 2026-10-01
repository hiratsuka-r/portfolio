'use client';

import { useTranslation } from '@/components/LocaleProvider';
import { smoothScrollTo } from '@/utils/scroll';
import Image from 'next/image';
import type { MouseEvent } from 'react';

export const Footer = () => {
    const { t, locale } = useTranslation();

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
                            aria-label={`hiratsuka-r ${t('site.ページトップ')}`}
                            onClick={handleAnchorClick}
                        >
                            <Image
                                src={locale === 'en' ? '/portfolio/img/logo_green_en.png' : '/portfolio/img/logo_green.png'}
                                alt={t('site.サイト名')}
                                width={750}
                                height={125}
                                priority
                            />
                        </a>
                    </div>

                    <div className="footer__message">
                        <p className="footer__catch">{t('site.キャッチコピー.0')}</p>
                        <p className="footer__description">
                            {t<string[]>('site.キャッチコピー')
                                .slice(1)
                                .map((line) => (
                                    <span key={line}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                        </p>
                    </div>
                </div>

                <nav className="footer__nav" aria-label={t('footer.ナビゲーションラベル')}>
                    <a href="#profile" onClick={handleAnchorClick}>
                        {t<string[]>('footer.ナビゲーション')[0]}
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#capabilities" onClick={handleAnchorClick}>
                        {t<string[]>('footer.ナビゲーション')[1]}
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#works" onClick={handleAnchorClick}>
                        {t<string[]>('footer.ナビゲーション')[2]}
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#skills" onClick={handleAnchorClick}>
                        {t<string[]>('footer.ナビゲーション')[3]}
                    </a>
                    <span aria-hidden="true">/</span>
                    <a href="#timeline" onClick={handleAnchorClick}>
                        {t<string[]>('footer.ナビゲーション')[4]}
                    </a>
                </nav>

                <div className="footer__bottom">
                    <div className="footer__legal">
                        <p className="footer__copyright">
                            © 2017–{new Date().getFullYear()} {t('site.著作権者')}
                        </p>
                        <p className="footer__invoice-number">{t('site.適格請求書発行事業者登録番号')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
