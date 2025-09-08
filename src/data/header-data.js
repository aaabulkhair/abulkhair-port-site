import profile from '../assets/png/profile.png';

export const headerData = {
    name: 'Ahmed Abulkhair',
    title: "Senior Data Scientist & Educator",
    desciption: "Specializing in LLMs, Time-Series Forecasting, and AI Solutions. Book a consultation or hire me for your next project. Available in Arabic and English.",
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
    specialties: ['LLMs & AI Agents', 'Time-Series Forecasting', 'Data Science Consulting', 'Power BI Solutions']
}
