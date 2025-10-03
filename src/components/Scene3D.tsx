import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3DProps {
  mousePosition: { x: number; y: number };
}

export const Scene3D = ({ mousePosition }: Scene3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Arious_3DLogo.glb');

  useFrame(() => {
    if (groupRef.current) {
      // Smooth tilt animation based on mouse position
      const targetRotationX = mousePosition.y * 0.5;
      const targetRotationY = mousePosition.x * 0.5;
      
      // Lerp for smooth transitions
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={100} />
      
      {/* Tiny 3D models at the red dot positions */}
      {/* Left position */}
      <mesh position={[-1.8, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#ef4444" 
          emissive="#ef4444" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Right position */}
      <mesh position={[1.8, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#ef4444" 
          emissive="#ef4444" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Bottom position */}
      <mesh position={[0, -1.8, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#ef4444" 
          emissive="#ef4444" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/Arious_3DLogo.glb');
