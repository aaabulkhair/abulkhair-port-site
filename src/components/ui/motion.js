import React from 'react';
import { LazyMotion, m, useReducedMotion } from 'framer-motion';

// Shared motion primitives. LazyMotion with an async import keeps the
// domAnimation feature bundle out of the critical path.
const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE, delay: i * 0.12 },
    }),
};

export const staggerParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

export function MotionProvider({ children }) {
    return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}

export { m, useReducedMotion };
