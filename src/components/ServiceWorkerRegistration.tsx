'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Desabilitar Service Worker temporariamente para debugging
    // Isso pode estar causando problemas em Safari e alguns navegadores
    return;
    
    /* Service Worker desabilitado temporariamente
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      try {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((registration) => {
              console.log('Service Worker registered:', registration.scope);
            })
            .catch((error) => {
              console.warn('Service Worker registration failed:', error);
              // Não bloquear o site se o SW falhar
            });
        });
      } catch (error) {
        console.warn('Service Worker not supported:', error);
      }
    }
    */
  }, []);

  return null;
}
