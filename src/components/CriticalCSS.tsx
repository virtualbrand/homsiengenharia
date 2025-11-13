/**
 * Critical CSS Component
 * Inline critical CSS to prevent render-blocking
 */
export default function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical font preload hint */
          @font-face {
            font-family: 'Satoshi';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Satoshi');
          }
          
          /* Prevent layout shift */
          img, video {
            max-width: 100%;
            height: auto;
          }
          
          /* Header critical styles */
          header {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 50;
          }
        `,
      }}
    />
  );
}
