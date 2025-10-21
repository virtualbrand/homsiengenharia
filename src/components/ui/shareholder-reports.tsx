import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// Define the type for a single report item
export interface Report {
  id: string;
  quarter: string;
  period: string;
  imageSrc: string;
  isNew?: boolean;
}

// Define the props for the main component
interface ShareholderReportsProps {
  reports: Report[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ShareholderReports = React.forwardRef<
  HTMLDivElement,
  ShareholderReportsProps
>(({ reports, title = "Shareholders' Letter and Results", subtitle = "Powering India's changing lifestyles", className, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Function to handle scrolling and update arrow visibility
  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for precision
    }
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener("scroll", checkScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
    };
  }, [reports, checkScrollability]);

  // Scroll handler for navigation buttons
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of the visible width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={ref}
      className={cn("w-full max-w-7xl mx-auto py-8 relative", className)}
      aria-labelledby="reports-heading"
      {...props}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 mb-4">
        <h2 id="reports-heading" className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "p-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/30"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "p-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/30"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll indicators (gradients on edges) */}
      <div className="relative">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-4 md:space-x-6 px-4 sm:px-6 -mx-4 sm:mx-0 touch-pan-x"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex-shrink-0 w-[240px] sm:w-[280px] snap-start"
          >
            {/* Report Card - Glass Effect */}
            <div className="group cursor-pointer relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="relative overflow-hidden rounded-xl mb-3 transition-all duration-500 ease-in-out group-hover:-translate-y-3 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_20px_60px_-15px_rgba(156,114,72,0.5)] min-h-[320px] sm:min-h-[380px]">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Glass content */}
                <div className="relative p-6 flex flex-col justify-between text-white h-full min-h-[320px] sm:min-h-[380px]">
                  <div className="backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-white/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-lg mb-2">Serviço de Engenharia</h3>
                    <p className="text-xs text-white/90 drop-shadow-md">{report.period}</p>
                  </div>
                  <div className="backdrop-blur-md bg-white/10 rounded-lg p-4 border border-white/20 mt-auto">
                    <p className="text-sm font-semibold text-white drop-shadow-lg">{subtitle}</p>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-2">
                <h4 className="font-bold text-white text-sm sm:text-base drop-shadow-lg">{report.quarter}</h4>
                {report.isNew && (
                  <span className="text-xs font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-white/20 animate-pulse">
                    NEW
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
});

ShareholderReports.displayName = "ShareholderReports";
