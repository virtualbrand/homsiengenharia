'use client';

import { useEffect } from 'react';

/**
 * Deferred Styles Loader
 * Load non-critical CSS after initial render to prevent render-blocking
 */
export default function DeferredStyles() {
  useEffect(() => {
    // Load non-critical styles after page load
    const loadDeferredStyles = () => {
      // Check if already loaded
      if (document.getElementById('deferred-styles')) return;
      
      // Create link element for deferred CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/globals-deferred.css';
      link.id = 'deferred-styles';
      link.media = 'print';
      link.onload = function() {
        // @ts-ignore
        this.media = 'all';
      };
      
      document.head.appendChild(link);
      
      // Fallback for browsers that don't support media switching
      const noscriptLink = document.createElement('noscript');
      noscriptLink.innerHTML = '<link rel="stylesheet" href="/globals-deferred.css">';
      document.head.appendChild(noscriptLink);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadDeferredStyles);
    } else {
      setTimeout(loadDeferredStyles, 1);
    }
  }, []);

  return null;
}
