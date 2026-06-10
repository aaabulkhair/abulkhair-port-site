import { llmConsultingEgypt } from './llm-consulting-egypt';
import { machineLearningDevelopment } from './machine-learning-development';
import { aiAgentsDevelopment } from './ai-agents-development';
import { timeSeriesForecasting } from './time-series-forecasting';

// Slug -> service data. Order here drives the /services hub listing.
export const services = [
    llmConsultingEgypt,
    aiAgentsDevelopment,
    machineLearningDevelopment,
    timeSeriesForecasting,
];

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export const serviceSlugs = services.map((s) => s.slug);
