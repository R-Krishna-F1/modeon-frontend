// src/lib/posthog.js
// PostHog analytics — stubbed until VITE_POSTHOG_KEY is supplied.
// Replace each trackEvent call body with: posthog.capture(eventName, properties)

let _posthog = null;

export function initPostHog() {
  // TODO (Analytics): uncomment when PostHog SDK is wired
  // import('posthog-js').then(({ default: posthog }) => {
  //   posthog.init(import.meta.env.VITE_POSTHOG_KEY, { api_host: 'https://app.posthog.com' });
  //   _posthog = posthog;
  // });
  console.info('[Analytics] PostHog init stubbed — set VITE_POSTHOG_KEY to enable.');
}

/**
 * Track an analytics event.
 * @param {string} eventName
 * @param {Record<string, unknown>} [properties]
 */
export function trackEvent(eventName, properties = {}) {
  // TODO (Analytics): wire PostHog SDK — replace stub with real posthog.capture() call
  if (_posthog) {
    _posthog.capture(eventName, properties);
  } else {
    console.debug(`[Analytics] ${eventName}`, properties);
  }
}
