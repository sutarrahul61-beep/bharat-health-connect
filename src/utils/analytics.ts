/**
 * Analytics and tracking utilities for Bharat Health Connect (Miraj Medical Tourism)
 */

export function trackEvent(eventName: string, params?: Record<string, any>): void {
  try {
    if (typeof window !== 'undefined') {
      // Log event locally for debugging
      if (process.env.NODE_ENV !== 'production') {
        console.debug(`[Analytics Event] ${eventName}:`, params || {});
      }
      // If gtag or any analytics script is available in window
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, params);
      }
    }
  } catch (err) {
    // Fail silently so user interactions are never interrupted
  }
}

export function trackPageView(pageName: string, params?: Record<string, any>): void {
  trackEvent('page_view', { page: pageName, ...params });
}

export function buildWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
