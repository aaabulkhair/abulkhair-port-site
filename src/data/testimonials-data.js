export const testimonialsData = [
    {
        id: 1,
        name: "Sarah M.",
        role: "Data Analyst, Tech Startup",
        service: "1-on-1 Consulting",
        testimonial: "Ahmed helped me transition from Excel analyst to Python data scientist in 3 months. His Arabic explanations made complex ML concepts finally click for me.",
        rating: 5,
        platform: "Topmate",
        featured: true
    },
    {
        id: 2,
        name: "Khalid A.",
        role: "Software Engineer, Fintech",
        service: "Project Development",
        testimonial: "Built our predictive analytics system from scratch. Clean code, proper documentation, and delivered 2 weeks ahead of schedule. Will hire again!",
        rating: 5,
        platform: "Upwork",
        featured: true
    },
    {
        id: 3,
        name: "Fatima H.",
        role: "CS Graduate, Cairo University",
        service: "1-on-1 Consulting",
        testimonial: "Passed my Google data science interview thanks to Ahmed's mock interviews and technical guidance. His career roadmap was spot-on.",
        rating: 5,
        platform: "Topmate",
        featured: true
    },
    {
        id: 4,
        name: "Omar K.",
        role: "Business Analyst, E-commerce",
        service: "Arabic Education",
        testimonial: "Finally found data science content in Arabic that actually makes sense! Ahmed's YouTube tutorials helped me land my first ML project at work.",
        rating: 5,
        platform: "YouTube",
        featured: false
    },
    {
        id: 5,
        name: "Mariam S.",
        role: "PhD Researcher, NLP",
        service: "Project Development", 
        testimonial: "Implemented our Arabic sentiment analysis model with transformer architecture. Excellent code quality and deep understanding of NLP workflows.",
        rating: 5,
        platform: "Upwork",
        featured: false
    },
    {
        id: 6,
        name: "Hassan F.",
        role: "Marketing Manager, Healthcare",
        service: "1-on-1 Consulting",
        testimonial: "Ahmed taught me to build customer segmentation models that increased our campaign ROI by 40%. Clear explanations and practical examples.",
        rating: 5,
        platform: "Topmate",
        featured: false
    }
];

// Testimonials by service type for easy filtering
export const testimonialsByService = {
    consulting: testimonialsData.filter(t => t.service === "1-on-1 Consulting"),
    development: testimonialsData.filter(t => t.service === "Project Development"),
    education: testimonialsData.filter(t => t.service === "Arabic Education"),
    all: testimonialsData
};

// Featured testimonials (shown by default)
export const featuredTestimonials = testimonialsData.filter(t => t.featured);