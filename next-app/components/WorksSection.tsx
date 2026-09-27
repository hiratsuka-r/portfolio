'use client';

import { useEffect, useRef, useState } from 'react';
import type { Work } from '../data/works';
import { WorkCard } from './WorkCard';
import { WorkDetailModal } from './WorkDetailModal';

export function WorksSection({ works }: { works: Work[] }) {
    const [selected, setSelected] = useState<Work | null>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    const selectWork = (work: Work) => {
        lastFocusedElement.current = document.activeElement as HTMLElement;
        setSelected(work);
    };

    const closeModal = () => {
        setSelected(null);
        lastFocusedElement.current?.focus();
    };

    useEffect(() => {
        if (!selected) return;
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', close);
        document.body.classList.add('is-modal-open');
        return () => {
            document.removeEventListener('keydown', close);
            document.body.classList.remove('is-modal-open');
        };
    }, [selected]);

    return (
        <>
            <div className="works">
                {works.map((work, index) => (
                    <WorkCard
                        key={work.id}
                        work={work}
                        onSelect={selectWork}
                        isPriority={index === 0}
                    />
                ))}
            </div>
            <WorkDetailModal work={selected} onClose={closeModal} />
        </>
    );
}
