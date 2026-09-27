import '@/app/style.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'かえるラボ｜Web開発・UI/UXデザイン',
    description: 'hiratsuka-rのポートフォリオ',
    metadataBase: new URL('https://hiratsuka-r.github.io/'),
    alternates: {
        canonical: '/portfolio/',
    },
    icons: {
        icon: '/portfolio/img/favicon.png',
    },
    robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ja">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Kaisei+Opti&family=Kiwi+Maru&family=Kosugi+Maru&display=swap"
                    rel="stylesheet"
                />
                <script src="https://kit.fontawesome.com/85d6855f03.js" crossOrigin="anonymous" />
            </head>
            <body id="top">{children}</body>
        </html>
    );
}
