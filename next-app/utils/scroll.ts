export const smoothScrollTo = (top: number) => {
    window.scrollTo({
        top,
        behavior: 'smooth',
    });
};
