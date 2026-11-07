// Centralized Google Tag Manager dataLayer event dispatcher
export function sendGTMEvent(eventName, params = {}) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
}
