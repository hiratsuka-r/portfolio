'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
    children: React.ReactNode;
    className: string;
    level?: 1 | 2;
}

/**
 * 見出しが表示領域に入ったときにアニメーションを開始する見出しコンポーネント。
 * @param props 見出しの内容、クラス名、見出しレベル。
 * @returns 表示監視機能を持つ見出し要素。
 */
export function AnimatedHeading({ children, className, level = 2 }: Props) {
    // 見出しが表示領域に入ったタイミングでアニメーション用クラスを付与する。
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const Tag = level === 1 ? 'h1' : 'h2';

    useEffect(() => {
        // IntersectionObserverが使えない環境では、初回描画後に表示状態へ移行する。
        const heading = headingRef.current;
        if (!heading) return;

        if (!('IntersectionObserver' in window)) {
            const timer = globalThis.setTimeout(() => setIsVisible(true), 0);
            return () => globalThis.clearTimeout(timer);
        }

        // 見出しが一度表示されたら監視を解除し、不要な監視を続けない。
        /** 見出しが表示されたら監視を終了し、アニメーションを開始する。 */
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            setIsVisible(true);
            observer.unobserve(heading);
        });

        observer.observe(heading);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag ref={headingRef} className={`${className} ${isVisible ? 'js_is-animated' : ''}`}>
            {children}
        </Tag>
    );
}
