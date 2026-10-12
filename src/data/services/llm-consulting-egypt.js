import { contactsData } from '../contacts-data';
import { metrics, pricing, proof } from '../metrics';

const { primary, secondary } = contactsData.monetizationLinks;

export const llmConsultingEgypt = {
    slug: 'llm-consulting-egypt',
    nav: {
        title: 'LLM Consulting',
        teaser: 'RAG systems, Arabic NLP, and LLM strategy for businesses building on language models.',
    },
    seo: {
        title: 'LLM Consulting Egypt | Large Language Models Expert',
        description:
            `Expert LLM consulting in Egypt. Specializing in RAG systems, LangChain, AI agents, and Arabic NLP. Rated ${proof.rating} by clients. Book a consultation with Ahmed Abulkhair.`,
    },
    hero: {
        label: 'Services / LLM Consulting',
        title: 'LLM consulting',
        titleBold: 'in Arabic & English',
        description:
            'Specializing in Large Language Models, RAG systems, and AI agents development. Helping businesses harness the power of conversational AI and intelligent automation — in Arabic and English.',
        stats: [
            { value: metrics.yearsExperience, label: 'Years in production ML' },
            { value: proof.rating, label: `Topmate rating (${metrics.topmate.ratingCount})` },
            { value: 'AR / EN', label: 'Bilingual delivery' },
        ],
        cta: {
            text: 'Book LLM Consultation',
            url: `${primary.url}&utm_campaign=llm_consulting_egypt_hero`,
            platform: 'topmate',
            position: 'service_hero',
        },
    },
    offerings: [
        {
            title: 'RAG Systems Development',
            description:
                'Build production-ready Retrieval-Augmented Generation systems with vector databases and semantic search.',
            technologies: ['LangChain', 'Pinecone', 'Chroma', 'FAISS', 'OpenAI', 'Hugging Face'],
            outcomes: ['Accurate document retrieval', 'Contextual AI responses', 'Reduced hallucinations'],
        },
        {
            title: 'AI Agents & Automation',
            description:
                'Create intelligent agents that can reason, plan, and execute complex tasks autonomously using LangGraph and CrewAI.',
            technologies: ['LangGraph', 'CrewAI', 'Function Calling', 'Tool Integration', 'Multi-Agent Systems'],
            outcomes: ['Automated workflows', 'Intelligent decision making', '24/7 AI assistance'],
        },
        {
            title: 'Arabic NLP Solutions',
            description:
                'Specialized in Arabic language processing, cultural context understanding, and bilingual AI systems.',
            technologies: ['AraBERT', 'CAMeLBERT', 'mBERT', 'Custom Fine-tuning'],
            outcomes: ['Accurate Arabic understanding', 'Cultural context awareness', 'Bilingual capabilities'],
        },
        {
            title: 'LLM Fine-tuning & Training',
            description:
                'Custom model training and fine-tuning for domain-specific applications and improved performance.',
            technologies: ['PyTorch', 'Transformers', 'LoRA', 'QLoRA', 'PEFT', 'Custom Datasets'],
            outcomes: ['Domain expertise', 'Improved accuracy', 'Cost optimization'],
        },
    ],
    pricing: [
        {
            title: 'LLM Strategy Consultation',
            price: pricing.consult.price,
            period: pricing.consult.period,
            description: '1-on-1 sessions to plan your LLM implementation strategy.',
            features: [
                'LLM architecture design',
                'Technology stack recommendations',
                'Implementation roadmap',
                'Cost optimization strategies',
                'Arabic NLP guidance',
            ],
            cta: { text: 'Book Consultation', url: `${primary.url}&utm_campaign=llm_consulting_pricing`, platform: 'topmate' },
        },
        {
            title: 'LLM Development Projects',
            price: pricing.development.price,
            period: pricing.development.period,
            description: 'End-to-end LLM system development and deployment.',
            features: [
                'RAG system implementation',
                'AI agent development',
                'Custom model fine-tuning',
                'Production deployment',
                'Ongoing maintenance',
            ],
            featured: true,
            cta: { text: 'Hire for Project', url: `${secondary.url}&utm_campaign=llm_development_pricing`, platform: 'upwork' },
        },
    ],
    faq: [
        {
            question: 'What makes your LLM consulting unique for Egyptian businesses?',
            answer:
                'I specialize in Arabic language processing and understand the cultural context crucial for Middle Eastern applications. My experience at ALX Africa gives me deep insights into regional business needs.',
        },
        {
            question: 'How long does it take to implement a RAG system?',
            answer:
                'Depending on complexity, a basic RAG system takes 2-4 weeks. Enterprise-grade systems with custom fine-tuning may take 6-12 weeks. I provide detailed timelines during consultation.',
        },
        {
            question: 'Do you work with both Arabic and English content?',
            answer:
                'Yes, I specialize in bilingual AI systems. Many of my projects involve processing both Arabic and English content simultaneously with proper language detection and context switching.',
        },
        {
            question: "What's included in the consultation sessions?",
            answer:
                'Strategy planning, architecture design, technology recommendations, implementation roadmap, cost estimates, and ongoing support guidance. All sessions include follow-up documentation.',
        },
    ],
    related: ['ai-agents-development', 'machine-learning-development'],
    finalCta: {
        heading: 'Ready to build with',
        headingBold: 'language models?',
        sub: 'Book a strategy session or bring me in to ship your RAG or LLM project end to end.',
        primary: { text: 'Book Consultation', url: `${primary.url}&utm_campaign=llm_consulting_egypt_footer`, platform: 'topmate' },
        secondary: { text: 'Hire on Upwork', url: `${secondary.url}&utm_campaign=llm_consulting_egypt_footer`, platform: 'upwork' },
    },
};
