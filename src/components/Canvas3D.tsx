import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Scene3D } from './Scene3D';

interface Canvas3DProps {
  animationSpeed?: number;
  maxRotationX?: number;
  maxRotationY?: number;
  targetScale?: number;
  cameraDistance?: number;
  lerpSpeed?: number;
}

export const Canvas3D = (props: Canvas3DProps) => {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[10, 10, 5]} intensity={0.5} color="#6366f1" />
        
        {/* 3D Model */}
        <Scene3D {...props} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
      </Canvas>
    </div>
  );
};
