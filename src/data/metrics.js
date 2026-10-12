// Single source of truth for every public number on the site.
// Only verified values belong here — update them when the source changes.
//   years:   Ahmed_Abulkhair_CV.pdf ("7+ years of production ML")
//   topmate: topmate.io/abulkhair profile — rating, rating count and bookings badge (checked 2026-10-12)
//   upwork:  Upwork dashboard, confirmed by Ahmed; badge per CV ("Upwork Top-Rated")
export const metrics = {
    yearsExperience: '7+',
    topmate: {
        rating: 4.9,
        ratingCount: 19,
        bookings: 35,
        url: 'https://topmate.io/abulkhair',
    },
    upwork: {
        jobSuccess: 100,
        jobs: 28,
        hours: 105,
        badge: 'Top-Rated',
        url: 'https://www.upwork.com/freelancers/~01e8b690de797b2ecf',
    },
};

export const pricing = {
    consult: { price: '$50', period: '/session', min: 50 },
    development: { price: '$60–100', period: '/hour', min: 60, max: 100 },
};

// Ready-made display strings so components never re-type the numbers.
export const proof = {
    rating: `${metrics.topmate.rating}/5`,
    ratingLong: `${metrics.topmate.rating}/5★ from ${metrics.topmate.ratingCount} Topmate ratings`,
    jobSuccess: `${metrics.upwork.jobSuccess}%`,
    upworkLong: `${metrics.upwork.badge} on Upwork • ${metrics.upwork.jobSuccess}% Job Success • ${metrics.upwork.jobs} jobs`,
    years: `${metrics.yearsExperience} years`,
};
