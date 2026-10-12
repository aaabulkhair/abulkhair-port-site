import { contactsData } from '../contacts-data';
import { metrics, pricing, proof } from '../metrics';

const { primary, secondary } = contactsData.monetizationLinks;

export const timeSeriesForecasting = {
    slug: 'time-series-forecasting',
    nav: {
        title: 'Time-Series Forecasting',
        teaser: 'Demand, sales, and trend forecasting with classical and deep-learning models you can trust.',
    },
    seo: {
        title: 'Time-Series Forecasting Expert Egypt | Demand & Sales Forecasting',
        description:
            'Expert time-series forecasting consulting in Egypt. Demand forecasting, sales prediction, and trend analysis with ARIMA, Prophet, and Temporal Fusion Transformers. Hire Ahmed Abulkhair.',
    },
    hero: {
        label: 'Services / Time-Series Forecasting',
        title: 'Forecasts your business',
        titleBold: 'can plan on',
        description:
            'Demand prediction, sales forecasting, and trend analysis built with the right tool for the job — from classical statistics to Temporal Fusion Transformers — with honest uncertainty estimates, not just point predictions.',
        stats: [
            { value: metrics.yearsExperience, label: 'Years in production ML' },
            { value: proof.jobSuccess, label: 'Upwork job success' },
            { value: 'P10–P90', label: 'Uncertainty bands' },
        ],
        cta: {
            text: 'Start Forecasting Project',
            url: `${secondary.url}&utm_campaign=tsf_hero`,
            platform: 'upwork',
            position: 'service_hero',
        },
    },
    offerings: [
        {
            title: 'Demand & Sales Forecasting',
            description:
                'Forecast product demand and revenue across SKUs, stores, or regions — handling seasonality, promotions, and holidays.',
            technologies: ['SARIMA', 'Prophet', 'LightGBM', 'Hierarchical Reconciliation'],
            outcomes: ['Lower stock-outs and overstock', 'Promotion-aware planning', 'SKU-level accuracy'],
        },
        {
            title: 'Deep Learning Forecasting',
            description:
                'Modern neural approaches for complex, multi-variate series where classical models plateau.',
            technologies: ['Temporal Fusion Transformer', 'LSTM', 'N-BEATS', 'PyTorch Forecasting'],
            outcomes: ['Multi-horizon predictions', 'Covariate-aware models', 'Interpretable attention'],
        },
        {
            title: 'Anomaly Detection & Monitoring',
            description:
                'Detect unusual patterns in metrics, transactions, or sensor data — and keep models honest after deployment.',
            technologies: ['Statistical Process Control', 'Isolation Forest', 'Drift Detection'],
            outcomes: ['Early incident detection', 'Reduced false alarms', 'Model health dashboards'],
        },
        {
            title: 'Forecasting Pipelines',
            description:
                'Productionize forecasts with automated retraining, backtesting, and APIs your planners and systems consume directly.',
            technologies: ['Airflow', 'MLflow', 'FastAPI', 'Docker'],
            outcomes: ['Automated retraining', 'Rigorous backtesting', 'Forecasts as a service'],
        },
    ],
    industries: [
        { name: 'Retail & E-commerce', applications: ['Demand planning', 'Inventory optimization', 'Price elasticity'] },
        { name: 'Logistics & Maritime', applications: ['Capacity planning', 'Freight rate trends', 'Route demand'] },
        { name: 'Energy & Utilities', applications: ['Load forecasting', 'Consumption patterns'] },
        { name: 'Finance', applications: ['Cash-flow projection', 'Risk metrics', 'Volume forecasting'] },
    ],
    process: [
        { step: '01', title: 'Data & Baseline', description: 'Audit your historical data and establish honest naive baselines every model must beat.' },
        { step: '02', title: 'Model Selection', description: 'Backtest classical and ML approaches against your actual planning horizon and error costs.' },
        { step: '03', title: 'Validation', description: 'Time-aware cross-validation with the metrics your business decisions actually depend on.' },
        { step: '04', title: 'Production & Retraining', description: 'Deploy with automated retraining and monitoring so accuracy holds as patterns shift.' },
    ],
    pricing: [
        {
            title: 'Forecasting Consultation',
            price: pricing.consult.price,
            period: pricing.consult.period,
            description: 'Assess your forecasting setup and chart the highest-impact improvements.',
            features: [
                'Data readiness assessment',
                'Baseline and metric definition',
                'Model approach recommendation',
                'Accuracy improvement roadmap',
            ],
            cta: { text: 'Book Consultation', url: `${primary.url}&utm_campaign=tsf_pricing`, platform: 'topmate' },
        },
        {
            title: 'Forecasting System Development',
            price: pricing.development.price,
            period: pricing.development.period,
            description: 'Complete forecasting solution from data pipeline to production API.',
            features: [
                'Feature engineering and modeling',
                'Backtesting framework',
                'Uncertainty quantification',
                'Production deployment',
                'Retraining automation',
            ],
            featured: true,
            cta: { text: 'Hire for Project', url: `${secondary.url}&utm_campaign=tsf_dev_pricing`, platform: 'upwork' },
        },
    ],
    faq: [
        {
            question: 'Which forecasting method will you use for my data?',
            answer:
                'The one that wins a fair backtest. Classical models (SARIMA, Prophet) often beat deep learning on short or clean series; TFT and neural models shine with many related series and rich covariates. I benchmark both against naive baselines before recommending anything.',
        },
        {
            question: 'How much historical data do I need?',
            answer:
                'Ideally two-plus years for seasonal businesses (to learn yearly cycles), but useful models can be built with less by pooling related series or borrowing seasonality. A data audit is the first step of every engagement.',
        },
        {
            question: 'Do you provide uncertainty estimates or just point forecasts?',
            answer:
                'Always uncertainty. Planning decisions need ranges — P10/P50/P90 quantiles — not single numbers. Models are evaluated on calibration as well as accuracy.',
        },
        {
            question: 'Can forecasts update automatically as new data arrives?',
            answer:
                'Yes. Production engagements include automated retraining pipelines with drift monitoring, so forecasts stay current without manual intervention.',
        },
    ],
    related: ['machine-learning-development', 'llm-consulting-egypt'],
    finalCta: {
        heading: 'Stop planning on',
        headingBold: 'guesswork',
        sub: 'Get forecasts with honest uncertainty — built, validated, and deployed for your business.',
        primary: { text: 'Hire on Upwork', url: `${secondary.url}&utm_campaign=tsf_footer`, platform: 'upwork' },
        secondary: { text: 'Book Consultation', url: `${primary.url}&utm_campaign=tsf_footer`, platform: 'topmate' },
    },
};
