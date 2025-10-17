import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  hoverText?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", hoverText, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full p-4 text-center font-medium text-lg",
        "bg-[var(--color-accent-500)] text-white",
        "shadow-[0_19px_35px_-2px_rgba(0,0,0,0.73)]",
        "hover:bg-[var(--color-accent-400)] transition-colors duration-500",
        className
      )}
      {...props}
    >
      <span className="inline-block translate-x-0 transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0 relative z-10">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-500 group-hover:-translate-x-0 group-hover:opacity-100">
        <span>{hoverText || text}</span>
        <ArrowRight className="w-5 h-5" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };