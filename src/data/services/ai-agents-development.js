import { contactsData } from '../contacts-data';
import { metrics, pricing, proof } from '../metrics';
import { withUtm } from '../../utils/utm';

const { primary, secondary } = contactsData.monetizationLinks;

export const aiAgentsDevelopment = {
    slug: 'ai-agents-development',
    nav: {
        title: 'AI Agents',
        teaser: 'Autonomous agents that reason, plan, and execute — LangGraph, CrewAI, and tool-using systems.',
    },
    seo: {
        title: 'AI Agents Development Egypt | Agentic AI & Automation Expert',
        description:
            'Expert AI agents development in Egypt. Multi-agent architectures with LangGraph and CrewAI, tool-using agents, function calling, and intelligent automation. Build autonomous AI systems with Ahmed Abulkhair.',
    },
    hero: {
        label: 'Services / AI Agents',
        title: 'Agents that',
        titleBold: 'reason, plan & execute',
        description:
            'Cutting-edge agentic AI development: multi-agent architectures, tool-using agents, and intelligent automation that handles complex tasks autonomously — built on LangGraph, CrewAI, and modern function calling.',
        stats: [
            { value: '24/7', label: 'Autonomous operation' },
            { value: proof.rating, label: `Topmate rating (${metrics.topmate.ratingCount})` },
            { value: 'AR / EN', label: 'Bilingual systems' },
        ],
        cta: {
            text: 'Build AI Agents',
            url: withUtm(primary.url, { campaign: 'ai_agents_hero' }),
            platform: 'topmate',
            position: 'service_hero',
        },
    },
    offerings: [
        {
            title: 'Multi-Agent Architectures',
            description:
                'Design and build systems of cooperating agents that decompose complex workflows into specialized roles with orchestrated handoffs.',
            technologies: ['LangGraph', 'CrewAI', 'AutoGen', 'State Machines'],
            outcomes: ['Complex task decomposition', 'Specialist agent roles', 'Reliable orchestration'],
        },
        {
            title: 'Tool-Using Agents & Function Calling',
            description:
                'Agents that operate your existing APIs, databases, and internal tools safely — with structured outputs, validation, and guardrails.',
            technologies: ['Function Calling', 'MCP', 'Structured Outputs', 'API Integration'],
            outcomes: ['Automated operations', 'Safe tool execution', 'Human-in-the-loop controls'],
        },
        {
            title: 'Conversational AI & Chatbots',
            description:
                'Production chat systems grounded in your data, with memory, retrieval, and escalation paths — in Arabic and English.',
            technologies: ['RAG', 'LangChain', 'Vector Databases', 'Arabic NLP'],
            outcomes: ['Grounded responses', 'Reduced support load', 'Bilingual coverage'],
        },
        {
            title: 'Agent Evaluation & Reliability',
            description:
                'Evaluation harnesses, tracing, and regression suites so your agents behave predictably before and after deployment.',
            technologies: ['LangSmith', 'Evals', 'Tracing', 'Guardrails'],
            outcomes: ['Measurable quality', 'Regression protection', 'Production confidence'],
        },
    ],
    process: [
        { step: '01', title: 'Workflow Mapping', description: 'Identify which tasks genuinely benefit from agency, and where deterministic automation is the better tool.' },
        { step: '02', title: 'Agent Design', description: 'Define roles, tools, memory, and orchestration topology — with guardrails and escalation from day one.' },
        { step: '03', title: 'Build & Evaluate', description: 'Iterative development against an evaluation harness, not vibes — measured task success rates.' },
        { step: '04', title: 'Deploy & Observe', description: 'Production deployment with tracing, cost monitoring, and continuous evaluation.' },
    ],
    pricing: [
        {
            title: 'Agentic AI Consultation',
            price: pricing.consult.price,
            period: pricing.consult.period,
            description: 'Strategy sessions to scope where agents create real value in your workflows.',
            features: [
                'Use-case feasibility assessment',
                'Architecture and framework selection',
                'Cost and latency modeling',
                'Guardrail and safety design',
                'Implementation roadmap',
            ],
            cta: { text: 'Book Consultation', url: withUtm(primary.url, { campaign: 'ai_agents_pricing' }), platform: 'topmate' },
        },
        {
            title: 'Agent System Development',
            price: pricing.development.price,
            period: pricing.development.period,
            description: 'End-to-end agent system development, evaluation, and deployment.',
            features: [
                'Multi-agent system implementation',
                'Tool and API integration',
                'Evaluation harness setup',
                'Production deployment',
                'Monitoring and iteration',
            ],
            featured: true,
            cta: { text: 'Hire for Project', url: withUtm(secondary.url, { campaign: 'ai_agents_dev_pricing' }), platform: 'upwork' },
        },
    ],
    faq: [
        {
            question: 'When do AI agents make sense versus simpler automation?',
            answer:
                'Agents earn their complexity when tasks need reasoning over changing context, multiple tools, or open-ended inputs. For fixed, repeatable workflows, deterministic automation is cheaper and more reliable — and I will tell you when that is the case.',
        },
        {
            question: 'Which frameworks do you build with?',
            answer:
                'Mostly LangGraph for orchestrated, stateful agent systems and CrewAI for role-based teams, on top of modern function-calling models. The framework is chosen per project — the design principles transfer.',
        },
        {
            question: 'How do you keep agents from going off the rails?',
            answer:
                'Structured outputs, validated tool schemas, bounded loops, human-in-the-loop checkpoints for sensitive actions, and an evaluation harness that measures task success before anything ships.',
        },
        {
            question: 'Can agents work with Arabic-language content and users?',
            answer:
                'Yes — bilingual agent systems are a specialty. That includes Arabic conversation, Arabic document retrieval, and culturally-aware responses for MENA users.',
        },
    ],
    related: ['llm-consulting-egypt', 'machine-learning-development'],
    finalCta: {
        heading: 'Ready to put agents',
        headingBold: 'to work?',
        sub: 'Start with a scoping session, or bring me in to design and ship your agent system.',
        primary: { text: 'Book Consultation', url: withUtm(primary.url, { campaign: 'ai_agents_footer' }), platform: 'topmate' },
        secondary: { text: 'Hire on Upwork', url: withUtm(secondary.url, { campaign: 'ai_agents_footer' }), platform: 'upwork' },
    },
};
