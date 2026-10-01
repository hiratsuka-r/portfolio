import '@/app/style.scss';
import { t } from '@/tools/dictionary/i18n';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: t('site.サイト名'),
    description: t('site.説明'),
    metadataBase: new URL('https://hiratsuka-r.github.io/'),
    alternates: {
        canonical: '/portfolio/',
    },
    icons: {
        icon: '/portfolio/img/favicon.png',
    },
    robots: { index: false, follow: false },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="ja" className="locale-ja">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Kaisei+Opti&family=Kiwi+Maru&family=Kosugi+Maru&display=swap"
                    rel="stylesheet"
                />
                <Script src="https://kit.fontawesome.com/85d6855f03.js" crossOrigin="anonymous" />
            </head>
            <body id="top">{children}</body>
        </html>
    );
};

export default RootLayout;
