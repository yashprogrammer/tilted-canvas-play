import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Scene3D } from './Scene3D';

export const Canvas3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { width, height } = currentTarget.getBoundingClientRect();
    
    // Normalize mouse position to -1 to 1 range
    const x = (clientX / width) * 2 - 1;
    const y = -(clientY / height) * 2 + 1;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    // Reset to center position when mouse leaves
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="w-full h-screen cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
        <Scene3D mousePosition={mousePosition} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
      </Canvas>
    </div>
  );
};
