import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AnimationControlsProps {
  animationSpeed: number;
  setAnimationSpeed: (value: number) => void;
  maxRotationX: number;
  setMaxRotationX: (value: number) => void;
  maxRotationY: number;
  setMaxRotationY: (value: number) => void;
  targetScale: number;
  setTargetScale: (value: number) => void;
  cameraDistance: number;
  setCameraDistance: (value: number) => void;
  lerpSpeed: number;
  setLerpSpeed: (value: number) => void;
  onReset: () => void;
}

export const AnimationControls = ({
  animationSpeed,
  setAnimationSpeed,
  maxRotationX,
  setMaxRotationX,
  maxRotationY,
  setMaxRotationY,
  targetScale,
  setTargetScale,
  cameraDistance,
  setCameraDistance,
  lerpSpeed,
  setLerpSpeed,
  onReset,
}: AnimationControlsProps) => {
  return (
    <Card className="absolute top-24 left-8 z-20 p-6 w-80 bg-background/95 backdrop-blur-sm border-primary/20">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Animation Controls</h2>
      
      <div className="space-y-4">
        {/* Animation Speed */}
        <div className="space-y-2">
          <Label className="text-sm flex justify-between">
            <span>Click Animation Speed</span>
            <span className="text-muted-foreground">{animationSpeed.toFixed(3)}</span>
          </Label>
          <Slider
            value={[animationSpeed]}
            onValueChange={(value) => setAnimationSpeed(value[0])}
            min={0.001}
            max={0.05}
            step={0.001}
            className="w-full"
          />
        </div>

        {/* Max Rotation X */}
        <div className="space-y-2">
          <Label className="text-sm flex justify-between">
            <span>Hover Rotation X (degrees)</span>
            <span className="text-muted-foreground">{Math.round((maxRotationX * 180) / Math.PI)}°</span>
          </Label>
          <Slider
            value={[maxRotationX]}
            onValueChange={(value) => setMaxRotationX(value[0])}
            min={0}
            max={Math.PI / 2}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* Max Rotation Y */}
        <div className="space-y-2">
          <Label className="text-sm flex justify-between">
            <span>Hover Rotation Y (degrees)</span>
            <span className="text-muted-foreground">{Math.round((maxRotationY * 180) / Math.PI)}°</span>
          </Label>
          <Slider
            value={[maxRotationY]}
            onValueChange={(value) => setMaxRotationY(value[0])}
            min={0}
            max={Math.PI / 2}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* Target Scale */}
        <div className="space-y-2">
          <Label className="text-sm flex justify-between">
            <span>Click Scale Multiplier</span>
            <span className="text-muted-foreground">{targetScale}x</span>
          </Label>
          <Slider
            value={[targetScale]}
            onValueChange={(value) => setTargetScale(value[0])}
            min={100}
            max={500}
            step={10}
            className="w-full"
          />
        </div>

        {/* Camera Distance */}
        <div className="space-y-2">
          <Label className="text-sm flex justify-between">
            <span>Camera Zoom Distance</span>
            <span className="text-muted-foreground">{cameraDistance.toFixed(1)}</span>
          </Label>
          <Slider
            value={[cameraDistance]}
            onValueChange={(value) => setCameraDistance(value[0])}
            min={2}
            max={12}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Lerp Speed */}
        <div className="space-y-2">
          <Label className="text-sm flex justify-between">
            <span>Hover Smoothness</span>
            <span className="text-muted-foreground">{lerpSpeed.toFixed(3)}</span>
          </Label>
          <Slider
            value={[lerpSpeed]}
            onValueChange={(value) => setLerpSpeed(value[0])}
            min={0.001}
            max={0.1}
            step={0.001}
            className="w-full"
          />
        </div>

        {/* Reset Button */}
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full mt-4"
        >
          Reset to Defaults
        </Button>
      </div>
    </Card>
  );
};
