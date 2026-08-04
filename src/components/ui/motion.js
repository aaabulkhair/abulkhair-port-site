import React from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

// Shared motion primitives. LazyMotion + domAnimation keeps the
// framer-motion bundle out of the critical path (features load async).

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
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export { m, useReducedMotion };
