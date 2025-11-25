'use client'

export default function PageLoadingSpinner() {
  return (
    <>
      {/* Loading Bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
        <div className="h-full bg-gradient-to-r from-[#9b7b6b] via-[#d4af37] to-[#9b7b6b] animate-loading-bar" />
      </div>

      {/* Loading Spinner */}
      <div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center bg-white">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
          <div className="w-8 h-8 border-4 border-[#9b7b6b] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
