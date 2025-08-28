import { Progress } from "@/components/ui/progress";

export default function DemoOne() {
  return (
    <div className="space-y-3 max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Download Progress</span>
        <span className="text-xs text-muted-foreground">Downloading...</span>
      </div>
      {/* Ajuste: Removido showValue e size, mantendo apenas props suportadas */}
      <Progress value={45} className="w-full h-2 rounded-full bg-primary/20" />
    </div>
  );
}
