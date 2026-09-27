'use client';

import { useEffect, useRef, useState } from 'react';
import type { Work } from '../data/works';
import { WorkCard } from './WorkCard';
import { WorkDetailModal } from './WorkDetailModal';

/**
 * 制作実績カードの一覧と詳細モーダルを管理するセクション。
 * @param works 表示する制作実績の一覧。
 * @returns 制作実績一覧と選択中の詳細モーダル。
 */
export function WorksSection({ works }: { works: Work[] }) {
    // 選択中の制作実績を保持し、詳細モーダルの表示を制御する。
    const [selected, setSelected] = useState<Work | null>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    /** 制作実績を選択し、選択元の要素を記録してモーダルを開く。 */
    const selectWork = (work: Work) => {
        // モーダルを閉じた後に、選択元のカードへフォーカスを戻せるようにする。
        lastFocusedElement.current = document.activeElement as HTMLElement;
        setSelected(work);
    };

    /** モーダルを閉じ、記録していた選択元の要素へフォーカスを戻す。 */
    const closeModal = () => {
        // モーダルを閉じ、操作開始元の要素へフォーカスを復元する。
        setSelected(null);
        lastFocusedElement.current?.focus();
    };

    useEffect(() => {
        // モーダル表示中だけEscapeキーと背景スクロールを制御する。
        if (!selected) return;
        /** Escapeキー入力時にモーダルを閉じる。 */
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
