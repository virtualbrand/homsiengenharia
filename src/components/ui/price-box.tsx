

import type { ReactNode } from "react";

type PriceBoxProps = {
  title: string;
  price: ReactNode;
  description?: string;
  cta?: string;
  highlight?: boolean;
};

export function PriceBox({ title, price, description, cta, highlight }: PriceBoxProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 md:p-10 shadow-xl w-full max-w-md mx-auto ${highlight ? 'ring-4 ring-yellow-400' : ''}`}>
      <div className="flex flex-col items-center text-neutral-800 gap-4">
        <h3 className="text-2xl font-bold text-neutral-700">{title}</h3>
        <div className="text-4xl font-extrabold text-neutral-900">{price}</div>
        {description && <p className="text-base opacity-90 text-center text-neutral-700">{description}</p>}
        {cta && (
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
            {cta}
          </button>
        )}
      </div>
    </div>
  );
}
