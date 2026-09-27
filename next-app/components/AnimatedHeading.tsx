'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
    children: React.ReactNode;
    className: string;
    level?: 1 | 2;
}

export function AnimatedHeading({ children, className, level = 2 }: Props) {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const Tag = level === 1 ? 'h1' : 'h2';

    useEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        if (!('IntersectionObserver' in window)) {
            const timer = globalThis.setTimeout(() => setIsVisible(true), 0);
            return () => globalThis.clearTimeout(timer);
        }

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
