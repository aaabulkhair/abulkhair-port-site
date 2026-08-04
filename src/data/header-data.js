import profile from '../assets/png/profile.png';

export const headerData = {
    name: 'Ahmed Abulkhair',
    title: "AI Scientist @ Incept Labs",
    description: "AI Scientist with 7+ years of production ML. I fine-tune and evaluate LLMs — my tuned Arabic models rank top-5 on OALL and Arabic HELM. Book a consultation or hire me for your next project. Available in Arabic and English.",
    image: profile,
    imagebw: profile,
    resumePdf: '',
    ctaPrimary: {
        text: 'Book Consultation',
        url: 'https://topmate.io/abulkhair?utm_source=abulkhair.ai&utm_medium=cta&utm_campaign=topmate_hero_primary',
        external: true
    },
    ctaSecondary: {
        text: 'Hire on Upwork',
        url: 'https://www.upwork.com/freelancers/~01e8b690de797b2ecf?utm_source=abulkhair.ai&utm_medium=cta&utm_campaign=upwork_hero_secondary',
        external: true
    },
    trustBadges: [
        {
            platform: 'Topmate',
            rating: '4.9/5.0',
            metric: 'Stars',
            icon: '/images/topmate-icon.svg'
        },
        {
            platform: 'Upwork',
            rating: '100%',
            metric: 'Job Success',
            icon: '/images/upwork-icon.svg'
        }
    ],
    languages: ['Arabic', 'English'],
    specialties: ['LLM Fine-Tuning & Evaluation', 'Arabic NLP', 'Time-Series Forecasting', 'AI Agents']
}
