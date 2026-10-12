// Credentials aligned with Ahmed_Abulkhair_CV.pdf — keep these factual.
import { metrics } from './metrics';

export const achievementsData = [
    {
        id: 'oall',
        label: 'Top-5 on OALL & Arabic HELM',
        detail: 'Fine-tuned Arabic LLMs ranked top-5 on both benchmarks',
    },
    {
        id: 'chidi',
        label: 'Chidi — Socratic AI Tutor',
        detail: 'Built on Anthropic models; deployed via the ALX × Anthropic × Government of Rwanda partnership',
    },
    {
        id: 'kaggle',
        label: 'Kaggle Expert',
        detail: 'kaggle.com/ahmedabdulhamid',
    },
    {
        id: 'upwork',
        label: `Upwork ${metrics.upwork.badge}`,
        detail: `${metrics.upwork.jobSuccess}% Job Success Score`,
    },
    {
        id: 'kagglex',
        label: 'KaggleX BIPOC Mentor',
        detail: 'Mentored early-career data scientists, 2023–2024',
    },
    {
        id: 'experience',
        label: `${metrics.yearsExperience} Years in Production ML`,
        detail: 'EdTech, e-commerce, fintech, and maritime',
    },
];
