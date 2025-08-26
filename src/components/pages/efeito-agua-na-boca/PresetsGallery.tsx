import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";
import { presetsComparisons, getCategories, getComparisonsByCategory } from "@/data/presets-images";
import { useState } from "react";

export const PresetsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const categories = ["Todos", ...getCategories()];

  const filteredPresets = selectedCategory === "Todos" 
    ? presetsComparisons 
    : getComparisonsByCategory(selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
  <h2 className="text-3xl md:text-4xl font-bold text-primary-700 text-center mb-4">
          Galeria de Transformações
        </h2>
        <p className="text-chocolate-600 text-center mb-6">
          Veja o antes e depois das nossas edições profissionais
        </p>
        
        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white text-primary-600 border border-primary-200 hover:bg-primary-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de comparações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="aspect-square relative">
              <ImageComparisonSlider
                leftImage={preset.beforeImage}
                rightImage={preset.afterImage}
                altLeft={`${preset.title} - Antes`}
                altRight={`${preset.title} - Depois`}
                initialPosition={50}
                className="w-full h-full rounded-t-2xl"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{preset.emoji}</span>
                <span className="px-2 py-1 text-xs bg-accent-100 text-accent-700 rounded-full font-medium">
                  {preset.category}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                {preset.title}
              </h3>
              <p className="text-sm text-chocolate-600 leading-relaxed">
                {preset.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredPresets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-chocolate-500">
            Nenhum preset encontrado para esta categoria.
          </p>
        </div>
      )}
    </div>
  );
};

export default PresetsGallery;
