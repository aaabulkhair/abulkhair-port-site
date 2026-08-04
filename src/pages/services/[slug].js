import React from 'react';
import ServicePage from '../../components/service-page/service-page';
import { servicesBySlug, serviceSlugs } from '../../data/services';

export async function getStaticPaths() {
    return {
        paths: serviceSlugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    return { props: { slug: params.slug } };
}

// Data is resolved from the registry by slug (not passed through props) so
// functions/urls in data files never need serialization.
function Service({ slug }) {
    return <ServicePage service={servicesBySlug[slug]} />;
}

export default Service;
