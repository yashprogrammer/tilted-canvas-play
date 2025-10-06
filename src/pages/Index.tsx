import { Canvas3D } from "@/components/Canvas3D";
import { AnimationControls } from "@/components/AnimationControls";
import { useState } from "react";

const Index = () => {
  // Animation control states
  const [animationSpeed, setAnimationSpeed] = useState(0.015);
  const [maxRotationX, setMaxRotationX] = useState((25 * Math.PI) / 180);
  const [maxRotationY, setMaxRotationY] = useState((15 * Math.PI) / 180);
  const [targetScale, setTargetScale] = useState(200);
  const [cameraDistance, setCameraDistance] = useState(8);
  const [lerpSpeed, setLerpSpeed] = useState(0.03);

  const handleReset = () => {
    setAnimationSpeed(0.015);
    setMaxRotationX((25 * Math.PI) / 180);
    setMaxRotationY((15 * Math.PI) / 180);
    setTargetScale(200);
    setCameraDistance(8);
    setLerpSpeed(0.03);
  };

  return <main className="relative w-full h-screen overflow-hidden bg-gradient-bg">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      
      {/* Title */}
      <div className="absolute top-8 left-0 right-0 z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          <span className="bg-gradient-primary bg-clip-text text-slate-50">ARious Logo</span>
          {" "}Model
        </h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          Hover to interact • Click to animate • Adjust controls
        </p>
      </div>
      
      {/* Animation Controls */}
      <AnimationControls
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        maxRotationX={maxRotationX}
        setMaxRotationX={setMaxRotationX}
        maxRotationY={maxRotationY}
        setMaxRotationY={setMaxRotationY}
        targetScale={targetScale}
        setTargetScale={setTargetScale}
        cameraDistance={cameraDistance}
        setCameraDistance={setCameraDistance}
        lerpSpeed={lerpSpeed}
        setLerpSpeed={setLerpSpeed}
        onReset={handleReset}
      />
      
      {/* 3D Canvas */}
      <Canvas3D
        animationSpeed={animationSpeed}
        maxRotationX={maxRotationX}
        maxRotationY={maxRotationY}
        targetScale={targetScale}
        cameraDistance={cameraDistance}
        lerpSpeed={lerpSpeed}
      />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
      </div>
    </main>;
};
export default Index;