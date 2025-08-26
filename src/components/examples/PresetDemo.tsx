import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";
import { getComparisonById } from "@/data/presets-images";

// Exemplo de componente que usa uma comparação específica
export const PresetDemo = () => {
  const boloCenoura = getComparisonById("bolo-cenoura");
  
  if (!boloCenoura) {
    return <div>Preset não encontrado</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="aspect-square">
          <ImageComparisonSlider
            leftImage={boloCenoura.beforeImage}
            rightImage={boloCenoura.afterImage}
            altLeft={`${boloCenoura.title} - Antes`}
            altRight={`${boloCenoura.title} - Depois`}
            initialPosition={50}
            className="w-full h-full"
          />
        </div>
        <div className="p-6 text-center">
          <div className="text-2xl mb-2">{boloCenoura.emoji}</div>
          <h3 className="text-xl font-semibold text-primary-700 mb-2">
            {boloCenoura.title}
          </h3>
          <p className="text-chocolate-600 mb-4">
            {boloCenoura.description}
          </p>
          <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm">
            {boloCenoura.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PresetDemo;
