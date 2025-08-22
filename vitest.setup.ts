import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';

// Optional: MUI/useMediaQuery sometimes needs this in jsdom
if (typeof window !== 'undefined' && !window.matchMedia) {
  // very small polyfill
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
