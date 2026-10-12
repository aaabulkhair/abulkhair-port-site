import { contactsData } from '../contacts-data';
import { metrics, pricing, proof } from '../metrics';
import { withUtm } from '../../utils/utm';

const { primary, secondary } = contactsData.monetizationLinks;

export const machineLearningDevelopment = {
    slug: 'machine-learning-development',
    nav: {
        title: 'ML Development',
        teaser: 'End-to-end machine learning systems — from data pipelines to monitored production models.',
    },
    seo: {
        title: 'Machine Learning Development Egypt | ML Expert Services',
        description:
            `Machine learning and data science development in Egypt: classical ML (regression, classification, forecasting), analytics, NLP and LLM systems, from pipelines to production. ${proof.jobSuccess} Upwork Job Success. Hire Ahmed Abulkhair.`,
    },
    hero: {
        label: 'Services / ML Development',
        title: 'Production-ready',
        titleBold: 'machine learning',
        description:
            'Building ML systems that drive real business value — classical machine learning (regression, classification, forecasting), data science and analytics, through to NLP and LLMs. From proof-of-concept to scalable deployment, I deliver complete solutions — data, models, APIs, and monitoring.',
        stats: [
            { value: String(metrics.upwork.jobs), label: 'Upwork jobs' },
            { value: proof.jobSuccess, label: 'Upwork job success' },
            { value: metrics.yearsExperience, label: 'Years experience' },
        ],
        cta: {
            text: 'Start ML Project',
            url: withUtm(secondary.url, { campaign: 'ml_development_egypt_hero' }),
            platform: 'upwork',
            position: 'service_hero',
        },
    },
    offerings: [
        {
            title: 'End-to-End ML Pipelines',
            description:
                'Complete machine learning workflows from data ingestion to model deployment with automated retraining and monitoring.',
            technologies: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'MLflow', 'Docker', 'Kubernetes'],
            outcomes: ['Automated ML workflows', 'Scalable predictions', 'Model monitoring', 'CI/CD integration'],
        },
        {
            title: 'Time-Series Forecasting',
            description:
                'Advanced forecasting models for business planning, demand prediction, and trend analysis using state-of-the-art techniques.',
            technologies: ['ARIMA', 'SARIMA', 'Prophet', 'TFT', 'LSTM', 'Transformers'],
            outcomes: ['Accurate forecasts', 'Seasonal pattern detection', 'Uncertainty quantification'],
        },
        {
            title: 'Computer Vision Solutions',
            description:
                'Custom computer vision applications including object detection, image classification, and video analysis.',
            technologies: ['OpenCV', 'YOLO', 'ResNet', 'EfficientNet', 'TensorFlow', 'PyTorch'],
            outcomes: ['Automated visual inspection', 'Real-time detection', 'Quality control'],
        },
        {
            title: 'Natural Language Processing',
            description:
                'NLP solutions for text analysis, sentiment analysis, document processing, and conversational AI with Arabic language expertise.',
            technologies: ['spaCy', 'Transformers', 'BERT', 'Arabic NLP'],
            outcomes: ['Text understanding', 'Arabic processing', 'Document automation'],
        },
    ],
    industries: [
        { name: 'E-commerce', applications: ['Recommendation systems', 'Price optimization', 'Demand forecasting', 'Customer segmentation'] },
        { name: 'Finance', applications: ['Fraud detection', 'Risk assessment', 'Credit scoring'] },
        { name: 'Healthcare', applications: ['Medical image analysis', 'Patient risk prediction', 'Clinical decision support'] },
        { name: 'Manufacturing', applications: ['Quality control', 'Predictive maintenance', 'Supply chain optimization'] },
    ],
    process: [
        { step: '01', title: 'Discovery & Planning', description: 'Understanding your business problem, data assessment, and solution architecture design.' },
        { step: '02', title: 'Data Preparation', description: 'Data cleaning, feature engineering, and exploratory analysis for optimal model performance.' },
        { step: '03', title: 'Model Development', description: 'Algorithm selection, model training, hyperparameter tuning, and performance optimization.' },
        { step: '04', title: 'Deployment & Monitoring', description: 'Production deployment, API development, monitoring setup, and maintenance planning.' },
    ],
    pricing: [
        {
            title: 'ML Strategy Consultation',
            price: pricing.consult.price,
            period: pricing.consult.period,
            description: 'Expert guidance on ML strategy and implementation planning.',
            features: [
                'Problem definition and scoping',
                'Data strategy and assessment',
                'Algorithm selection guidance',
                'Architecture and infrastructure planning',
                'ROI estimation and timeline planning',
            ],
            cta: { text: 'Book Consultation', url: withUtm(primary.url, { campaign: 'ml_consulting_pricing' }), platform: 'topmate' },
        },
        {
            title: 'Full ML Development',
            price: pricing.development.price,
            period: pricing.development.period,
            description: 'Complete ML solution development from concept to deployment.',
            features: [
                'End-to-end pipeline development',
                'Model training and optimization',
                'API development and deployment',
                'Monitoring and maintenance setup',
                'Documentation and knowledge transfer',
            ],
            featured: true,
            cta: { text: 'Hire for Project', url: withUtm(secondary.url, { campaign: 'ml_development_pricing' }), platform: 'upwork' },
        },
    ],
    faq: [
        {
            question: 'What types of ML projects do you work on?',
            answer:
                'I work on end-to-end ML pipelines, time-series forecasting, NLP, computer vision, and recommendation systems. Each project is tailored to your specific business requirements.',
        },
        {
            question: 'How long does a typical ML project take?',
            answer:
                'A proof-of-concept takes 2-4 weeks. Production-ready solutions typically take 6-12 weeks depending on complexity, data quality, and deployment requirements.',
        },
        {
            question: 'Do you provide ongoing model maintenance?',
            answer:
                "Yes, I offer monitoring and retraining services to ensure model performance doesn't degrade over time. This includes drift detection, automated retraining pipelines, and performance dashboards.",
        },
        {
            question: 'What industries have you worked in?',
            answer:
                'I have experience across e-commerce, finance, healthcare, manufacturing, and maritime. My solutions adapt to domain-specific requirements and regulatory constraints.',
        },
    ],
    related: ['time-series-forecasting', 'llm-consulting-egypt'],
    finalCta: {
        heading: 'Have a model that needs to',
        headingBold: 'reach production?',
        sub: 'From scoping to deployment — let’s ship an ML system your business can rely on.',
        primary: { text: 'Hire on Upwork', url: withUtm(secondary.url, { campaign: 'ml_development_footer' }), platform: 'upwork' },
        secondary: { text: 'Book Consultation', url: withUtm(primary.url, { campaign: 'ml_development_footer' }), platform: 'topmate' },
    },
};
