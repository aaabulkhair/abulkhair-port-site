import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize GA4
export const initializeGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    // Load gtag script
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
    
    // Set up enhanced ecommerce tracking
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We'll send page views manually
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
    });
  }
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track events
export const trackEvent = (action, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      currency: parameters.currency || 'USD',
      ...parameters
    });
  }
};

// Track monetization events
export const trackMonetization = (action, platform, value = 0) => {
  trackEvent(action, {
    category: 'monetization',
    label: platform,
    value: value,
    custom_parameters: {
      platform: platform,
      conversion_type: action
    }
  });
};

// Track UTM campaigns
export const trackUTMCampaign = (utmParams) => {
  trackEvent('utm_campaign_view', {
    category: 'marketing',
    campaign_name: utmParams.utm_campaign || 'unknown',
    campaign_source: utmParams.utm_source || 'unknown',
    campaign_medium: utmParams.utm_medium || 'unknown',
    custom_parameters: {
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_term: utmParams.utm_term,
      utm_content: utmParams.utm_content
    }
  });
};

// Track content engagement
export const trackContentEngagement = (contentType, contentId, action) => {
  trackEvent(`content_${action}`, {
    category: 'content',
    label: `${contentType}_${contentId}`,
    custom_parameters: {
      content_type: contentType,
      content_id: contentId,
      engagement_type: action
    }
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaType, destination, position) => {
  trackEvent('cta_click', {
    category: 'conversion',
    label: `${ctaType}_${destination}`,
    custom_parameters: {
      cta_type: ctaType,
      destination: destination,
      position: position
    }
  });
};

// Track social media clicks
export const trackSocialClick = (platform, contentType = 'profile') => {
  trackEvent('social_click', {
    category: 'social',
    label: `${platform}_${contentType}`,
    custom_parameters: {
      social_platform: platform,
      content_type: contentType
    }
  });
};

// React Hook for Google Analytics
export const useGoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    // Initialize GA on mount
    if (GA_MEASUREMENT_ID) {
      initializeGA();
    }

    // Track page views on route change
    const handleRouteChange = (url) => {
      trackPageView(url, document.title);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track UTM parameters on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content')
      };

      // Only track if we have UTM parameters
      if (Object.values(utmParams).some(param => param !== null)) {
        trackUTMCampaign(utmParams);
      }
    }
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackMonetization,
    trackContentEngagement,
    trackCTAClick,
    trackSocialClick
  };
};

// Google Analytics Script Component
export const GoogleAnalyticsScript = () => {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `
        }}
      />
    </>
  );
};