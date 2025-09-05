import React, { forwardRef } from 'react';
import Link from 'next/link';
import { trackCTAClick, trackSocialClick, trackMonetization } from './google-analytics';

/**
 * Enhanced Link component with automatic UTM and analytics tracking
 */
const EnhancedLink = forwardRef(({
  href,
  children,
  trackingType = 'general',
  trackingLabel = '',
  trackingPosition = '',
  utmSource = 'abulkhair.ai',
  utmMedium = 'website',
  utmCampaign = 'general',
  className = '',
  external = false,
  monetizationValue = 0,
  ...props
}, ref) => {
  
  const addUTMParameters = (url) => {
    if (!url || url.startsWith('/') || url.startsWith('#')) {
      return url; // Internal links don't need UTM
    }

    const urlObj = new URL(url);
    
    // Only add UTM if not already present
    if (!urlObj.searchParams.has('utm_source')) {
      urlObj.searchParams.set('utm_source', utmSource);
      urlObj.searchParams.set('utm_medium', utmMedium);
      urlObj.searchParams.set('utm_campaign', utmCampaign);
    }

    return urlObj.toString();
  };

  const handleClick = (event) => {
    // Track the click based on type
    const destination = href.includes('topmate') ? 'topmate' :
                      href.includes('upwork') ? 'upwork' :
                      href.includes('youtube') ? 'youtube' :
                      href.includes('tiktok') ? 'tiktok' :
                      href.includes('medium') ? 'medium' :
                      href.includes('linkedin') ? 'linkedin' :
                      'other';

    switch (trackingType) {
      case 'monetization':
        trackMonetization('cta_click', destination, monetizationValue);
        break;
      case 'social':
        trackSocialClick(destination, trackingLabel);
        break;
      case 'cta':
        trackCTAClick(trackingLabel || 'button', destination, trackingPosition);
        break;
      default:
        // General click tracking
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'link',
            event_label: trackingLabel || href,
            custom_parameters: {
              destination: destination,
              position: trackingPosition
            }
          });
        }
    }

    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const enhancedHref = addUTMParameters(href);
  
  // External links
  if (external || (href && (href.startsWith('http') || href.startsWith('mailto:')))) {
    return (
      <a
        ref={ref}
        href={enhancedHref}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal Next.js links
  return (
    <Link href={enhancedHref} ref={ref}>
      <a 
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
});

EnhancedLink.displayName = 'EnhancedLink';

/**
 * Specific link components for common use cases
 */

export const MonetizationLink = ({ 
  href, 
  children, 
  platform, 
  value = 0, 
  position = '',
  ...props 
}) => (
  <EnhancedLink
    href={href}
    trackingType="monetization"
    trackingLabel={platform}
    trackingPosition={position}
    monetizationValue={value}
    utmCampaign={`${platform}_${position || 'cta'}`}
    external
    {...props}
  >
    {children}
  </EnhancedLink>
);

export const SocialLink = ({ 
  href, 
  children, 
  platform, 
  contentType = 'profile',
  ...props 
}) => (
  <EnhancedLink
    href={href}
    trackingType="social"
    trackingLabel={contentType}
    trackingPosition={platform}
    utmCampaign={`${platform}_social`}
    external
    {...props}
  >
    {children}
  </EnhancedLink>
);

export const CTALink = ({ 
  href, 
  children, 
  ctaType = 'button', 
  position = '',
  ...props 
}) => (
  <EnhancedLink
    href={href}
    trackingType="cta"
    trackingLabel={ctaType}
    trackingPosition={position}
    utmCampaign={`${ctaType}_${position || 'cta'}`}
    external
    {...props}
  >
    {children}
  </EnhancedLink>
);

export const ContentLink = ({ 
  href, 
  children, 
  contentType, 
  contentId,
  ...props 
}) => (
  <EnhancedLink
    href={href}
    trackingType="content"
    trackingLabel={`${contentType}_${contentId}`}
    utmCampaign={`${contentType}_content`}
    external
    {...props}
  >
    {children}
  </EnhancedLink>
);

export default EnhancedLink;