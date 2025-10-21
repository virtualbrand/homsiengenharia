import BackgroundShader from "@/components/ui/background-shader";

export default function BackgroundShaderDemo() {
  return (
    <BackgroundShader 
      className="min-h-screen"
      colors={[
        "hsl(0, 0%, 7%)",       // Very dark gray
        "hsl(0, 0%, 15%)",      // Dark gray
        "hsl(28, 42%, 35%)",    // Dark brown (darker accent)
        "hsl(0, 0%, 25%)",      // Medium dark gray
      ]}
      distortion={0.6}
      swirl={0.15}
      speed={0.8}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl">
            Background Shader Demo
          </h1>
          <p className="text-xl text-white/80">
            Este é um exemplo do background animado com shader
          </p>
        </div>
      </div>
    </BackgroundShader>
  );
}
