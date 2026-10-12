import React, { forwardRef } from 'react';
import Link from 'next/link';
import { trackCTAClick, trackSocialClick, trackMonetization, trackContentEngagement, trackEvent } from './google-analytics';

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
  onClick,
  ...props
}, ref) => {
  
  const addUTMParameters = (url) => {
    // Only http(s) links get UTM — internal, anchor, mailto: and tel: stay as-is.
    if (!url || !/^https?:\/\//.test(url)) {
      return url;
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
    const target = href || '';
    const destination = target.includes('topmate') ? 'topmate' :
                      target.includes('upwork') ? 'upwork' :
                      target.includes('youtube') ? 'youtube' :
                      target.includes('tiktok') ? 'tiktok' :
                      target.includes('medium') ? 'medium' :
                      target.includes('linkedin') ? 'linkedin' :
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
      case 'content':
        trackContentEngagement(destination, trackingLabel, 'click');
        break;
      default:
        trackEvent('click', {
          category: 'link',
          label: trackingLabel || href,
          custom_parameters: {
            destination: destination,
            position: trackingPosition
          }
        });
    }

    // Compose with the caller's handler instead of letting it replace tracking.
    if (onClick) {
      onClick(event);
    }
  };

  const enhancedHref = addUTMParameters(href);
  
  // External links
  if (external || (href && (href.startsWith('http') || href.startsWith('mailto:')))) {
    return (
      <a
        {...props}
        ref={ref}
        href={enhancedHref}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // Internal Next.js links
  return (
    <Link
      {...props}
      href={enhancedHref}
      ref={ref}
      className={className}
      onClick={handleClick}
    >
      {children}
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