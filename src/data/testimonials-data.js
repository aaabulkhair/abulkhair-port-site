import { metrics } from './metrics';

// Verbatim public reviews from topmate.io/abulkhair (copied 2026-10-12).
// Only add reviews that are publicly visible on the linked source — never paraphrase.
const topmate = { platform: 'Topmate', sourceUrl: `${metrics.topmate.url}?utm_source=abulkhair.ai&utm_medium=testimonial&utm_campaign=topmate_reviews`, service: '1-on-1 Mentoring' };

export const testimonialsData = [
    {
        id: 'topmate-moustafa-2024-01',
        name: 'Moustafa I.',
        date: '2024-01-04',
        testimonial: "Ahmed is an exceptional mentor – friendly, deeply knowledgeable, and adept at solving core problems. His insights are instrumental for personal growth. I highly recommend Ahmed to anyone seeking effective solutions in data science. Thank you, Ahmed, for your outstanding support!",
        rating: 5,
        featured: true,
        ...topmate,
    },
    {
        id: 'topmate-ahmed-a-2024-05',
        name: 'Ahmed A.',
        date: '2024-05-04',
        testimonial: "Ahmed heard my questions and all my doubts towards the career clearly and gave me insightful to the point advices on how to improve, develop and present my skills.",
        rating: 5,
        featured: true,
        ...topmate,
    },
    {
        id: 'topmate-ahmed-f-2026-04',
        name: 'Ahmed F.',
        date: '2026-04-26',
        testimonial: "Had a great session. He was honest, genuine, and very clear in delivering the information. I really appreciated how transparent and helpful he was throughout the call. One of the best mentors I’ve worked with",
        rating: 5,
        featured: true,
        ...topmate,
    },
    {
        id: 'topmate-mohamed-r-2025-11',
        name: 'Mohamed R.',
        date: '2025-11-24',
        testimonial: "Ahmed is an exceptionally friendly and supportive expert. He helped me clearly identify my areas for improvement and provided a comprehensive overview of the data analysis career path. He was incredibly patient throughout our sessions and answered all of my questions thoroughly.",
        rating: 5,
        featured: true,
        ...topmate,
    },
    {
        id: 'topmate-mohamed-t-2023-12',
        name: 'Mohamed T.',
        date: '2023-12-28',
        testimonial: "Ahmed's session was outstanding-practical, deeply knowledgeable, and strategic. his insights have been instrumental in my growth and I'm grateful for the invaluable support he provided. Thank you Ahmed.",
        rating: 5,
        featured: true,
        ...topmate,
    },
    {
        id: 'topmate-fatima-a-2024-05',
        name: 'Fatima A.',
        date: '2024-05-03',
        testimonial: "This call helped me pave the way for a better career opportunity. Engineer Ahmed helped me understand what I should focus on in terms of career goals.",
        rating: 5,
        featured: true,
        ...topmate,
    },
];

export const featuredTestimonials = testimonialsData.filter(t => t.featured);
