'use client';

import { defaultLocale, getTranslation, type Locale, type TranslationKey } from '@/tools/dictionary/i18n';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// ブラウザに保存する言語設定のキー。
const LOCALE_STORAGE_KEY = 'portfolio-locale';

// 子コンポーネントへ渡す言語状態と翻訳関数の型。
type LocaleContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: <T = string>(key: TranslationKey) => T;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * サイト全体で利用する言語状態を提供する。
 * 初回表示は日本語とし、ブラウザに保存された言語があれば復元する。
 */
export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState<Locale>(defaultLocale);

    useEffect(() => {
        // localStorageはブラウザ上でのみ参照できるため、マウント後に言語設定を読み込む。
        const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        if (savedLocale === 'ja' || savedLocale === 'en') {
            setLocale(savedLocale);
        }
        // スクリーンリーダーなどにも現在の表示言語を伝える。
        document.documentElement.lang = savedLocale === 'en' ? 'en' : 'ja';
    }, []);

    // 言語が変わったときだけContextの値を作り直し、利用コンポーネントを再描画する。
    const value = useMemo(
        () => ({
            locale,
            setLocale: (nextLocale: Locale) => {
                // 次回訪問時にも同じ言語を使えるよう、選択結果を保存する。
                window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
                document.documentElement.lang = nextLocale;
                setLocale(nextLocale);
            },
            // 現在の言語を指定して辞書から文言を取得する。
            t: <T = string,>(key: TranslationKey) => getTranslation<T>(locale, key),
        }),
        [locale]
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

/**
 * 現在の言語と翻訳関数を取得する。
 * Providerの外側で呼び出した場合は、設定漏れを検知できるよう例外を投げる。
 */
export const useTranslation = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useTranslation must be used inside LocaleProvider');
    }
    return context;
};

/** 日本語と英語を選択できるセグメント型の言語切り替えUI。 */
export const LanguageSwitcher = () => {
    const { locale, setLocale } = useTranslation();

    return (
        <div className="language-switcher" role="group" aria-label="言語を選択">
            <button
                className={`language-switcher__option${locale === 'ja' ? ' is-active' : ''}`}
                type="button"
                onClick={() => setLocale('ja')}
                aria-label="日本語に切り替える"
                aria-pressed={locale === 'ja'}
            >
                JA
            </button>
            <button
                className={`language-switcher__option${locale === 'en' ? ' is-active' : ''}`}
                type="button"
                onClick={() => setLocale('en')}
                aria-label="英語に切り替える"
                aria-pressed={locale === 'en'}
            >
                EN
            </button>
        </div>
    );
};
