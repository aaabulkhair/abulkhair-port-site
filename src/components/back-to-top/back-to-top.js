import React, { useEffect, useState } from 'react';

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setVisible(document.documentElement.scrollTop > 300);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-8 h-8 rounded-full border border-rule bg-bg text-text-muted hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center text-sm"
            aria-label="Back to top"
        >
            &uarr;
        </button>
    );
}

export default BackToTop;
