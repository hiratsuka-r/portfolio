(() => {
    let works = [];
    let lastFocusedElement;

    const worksContainer = document.querySelector('.js_works');
    const modal = document.querySelector('.js_work-modal');
    const modalBody = document.querySelector('.js_work-modal-body');
    const closeButton = document.querySelector('.js_work-modal-close');
    const overlay = document.querySelector('.js_work-modal-overlay');

    const renderWorks = () => {
        worksContainer.innerHTML = window.WorksView.getWorksMarkup(works);
    };

    const openModal = (work) => {
        if (!work) return;

        lastFocusedElement = document.activeElement;
        modalBody.innerHTML = window.WorksView.getModalMarkup(work);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-modal-open');
        closeButton.focus();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-modal-open');
        modalBody.innerHTML = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    const loadWorks = async () => {
        const dataUrl = new URL('data/works.json', document.baseURI);
        let lastError;

        for (let attempt = 1; attempt <= 3; attempt += 1) {
            try {
                const response = await fetch(
                    `${dataUrl.href}?v=2&attempt=${attempt}`,
                    { cache: 'no-store' }
                );
                if (!response.ok) {
                    throw new Error(
                        `Works data request failed: ${response.status}`
                    );
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Works data must be an array.');
                }
                return data;
            } catch (error) {
                lastError = error;
                if (attempt < 3) {
                    await new Promise((resolve) => setTimeout(resolve, 200));
                }
            }
        }

        throw lastError;
    };

    const bindEvents = () => {
        worksContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.js_work-card');
            if (!card) return;

            event.preventDefault();
            openModal(works.find((work) => work.id === card.dataset.workId));
        });
        worksContainer.addEventListener('keydown', (event) => {
            const card = event.target.closest('.js_work-card');
            if (!card || (event.key !== 'Enter' && event.key !== ' ')) return;

            event.preventDefault();
            openModal(works.find((work) => work.id === card.dataset.workId));
        });
        closeButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    };

    const initialize = async () => {
        worksContainer.setAttribute('aria-busy', 'true');
        worksContainer.hidden = true;

        try {
            works = await loadWorks();
            renderWorks();
            worksContainer.hidden = false;
            worksContainer.setAttribute('aria-busy', 'false');
            bindEvents();
        } catch (error) {
            worksContainer.hidden = false;
            worksContainer.setAttribute('aria-busy', 'false');
            worksContainer.textContent = '制作物の読み込みに失敗しました';
            throw error;
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        initialize().catch((error) => {
            console.error('Works initialization failed.', error);
        });
    });
})();
