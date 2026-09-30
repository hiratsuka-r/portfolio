'use client';

import { useTranslation } from '@/components/LocaleProvider';
import { WorkCard } from '@/components/WorkCard';
import { WorkDetailModal } from '@/components/WorkDetailModal';
import type { Work, WorkSource } from '@/data/works';
import { localizedWork } from '@/tools/dictionary/i18n';
import { useEffect, useRef, useState } from 'react';

/**
 * 制作実績カードの一覧と詳細モーダルを管理するセクション。
 * @param works 表示する制作実績の一覧。
 * @returns 制作実績一覧と選択中の詳細モーダル。
 */
export const WorksSection = ({ works: sourceWorks }: { works: WorkSource[] }) => {
    const { locale } = useTranslation();
    const works = sourceWorks.map((source) => localizedWork(source, locale));
    // 選択中の制作実績のインデックスを保持し、前後の実績へ移動できるようにする。
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    /** 制作実績を選択し、選択元の要素を記録してモーダルを開く。 */
    const selectWork = (work: Work) => {
        // モーダルを閉じた後に、選択元のカードへフォーカスを戻せるようにする。
        lastFocusedElement.current = document.activeElement as HTMLElement;
        setSelectedIndex(works.findIndex((item) => item.id === work.id));
    };

    /** モーダルを閉じ、記録していた選択元の要素へフォーカスを戻す。 */
    const closeModal = () => {
        // モーダルを閉じ、操作開始元の要素へフォーカスを復元する。
        setSelectedIndex(null);
        lastFocusedElement.current?.focus();
    };

    /** 一つ前の制作実績へ移動する。先頭では何もしない。 */
    const goToPrev = () => {
        setSelectedIndex((index) => (index !== null && index > 0 ? index - 1 : index));
    };

    /** 一つ次の制作実績へ移動する。末尾では何もしない。 */
    const goToNext = () => {
        setSelectedIndex((index) => (index !== null && index < works.length - 1 ? index + 1 : index));
    };

    useEffect(() => {
        // モーダル表示中だけEscapeキーと背景スクロールを制御する。
        if (selectedIndex === null) return;
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
    }, [selectedIndex]);

    const selected = selectedIndex !== null ? works[selectedIndex] : null;

    return (
        <>
            <div className="works">
                {works.map((work, index) => (
                    <WorkCard key={work.id} work={work} onSelect={selectWork} isPriority={index === 0} />
                ))}
            </div>
            <WorkDetailModal
                work={selected}
                onClose={closeModal}
                onPrev={goToPrev}
                onNext={goToNext}
                hasPrev={selectedIndex !== null && selectedIndex > 0}
                hasNext={selectedIndex !== null && selectedIndex < works.length - 1}
            />
        </>
    );
};
