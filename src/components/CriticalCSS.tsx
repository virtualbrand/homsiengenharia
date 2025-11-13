/**
 * Critical CSS Component
 * Inline critical CSS to prevent render-blocking
 */
export default function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical styles for above-the-fold content */
          html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #1C1C1C;
            color: #ffffff;
          }
          
          * {
            box-sizing: border-box;
          }
          
          /* Critical animation for hero */
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
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
