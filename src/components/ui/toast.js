import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// Minimal controlled toast — fixed top-center, gold on dark, auto-dismisses.
function Toast({ open, message, onClose, duration = 4000 }) {
    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [open, duration, onClose]);

    if (!open) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-primary text-bg rounded px-4 py-3 text-sm font-medium shadow-lg"
        >
            <span>{message}</span>
            <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss notification"
                className="opacity-70 hover:opacity-100 transition-opacity"
            >
                <FiX size={16} aria-hidden="true" />
            </button>
        </div>
    );
}

export default Toast;
