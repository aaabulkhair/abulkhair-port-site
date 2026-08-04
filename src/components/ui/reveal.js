import React from 'react';
import { useReveal } from '../../hooks/use-reveal';

// Fade-up entrance wrapper. `delay` (ms) staggers card grids: index * 80, capped at 240.
function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
    const [ref, isVisible] = useReveal();

    return (
        <Tag
            ref={ref}
            className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`.trim()}
            style={delay ? { transitionDelay: `${Math.min(delay, 240)}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}

export default Reveal;
