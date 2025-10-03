import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import * as THREE from 'three';

interface Scene3DProps {
  mousePosition: { x: number; y: number };
}

export const Scene3D = ({ mousePosition }: Scene3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Arious_3DLogo.glb');

  const initialRotationX = Math.PI / 2; // 45 degrees - edge pointing toward camera
  
  useFrame(() => {
    if (groupRef.current) {
      // Limited rotation: 15 degrees X, 10 degrees Y
      const maxRotationX = (15 * Math.PI) / 180; // 15 degrees in radians
      const maxRotationY = (10 * Math.PI) / 180; // 10 degrees in radians
      
      const targetRotationX = initialRotationX + (mousePosition.y * maxRotationX);
      const targetRotationY = mousePosition.x * maxRotationY;
      
      // Lerp for smooth transitions (reduced from 0.05 to 0.03 for less intensity)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.03
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.03
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={100} />
      
      {/* Lottie animations at the positions */}
      {/* Left position */}
      <Html position={[-1.6, 0, 0]} center>
        <div className="w-24 h-24 pointer-events-none">
          <DotLottieReact
            src="/animations/Flasks.lottie"
            loop={true}
            autoplay
          />
        </div>
      </Html>
      
      {/* Right position */}
      <Html position={[1.6, 0, 0]} center>
        <div className="w-24 h-24 pointer-events-none">
          <DotLottieReact
            src="/animations/Flasks.lottie"
            loop={true}
            autoplay
          />
        </div>
      </Html>
      
      {/* Bottom position */}
      <Html position={[0, -1.6, 0]} center>
        <div className="w-24 h-24 pointer-events-none">
          <DotLottieReact
            src="/animations/Flasks.lottie"
            loop={true}
            autoplay
          />
        </div>
      </Html>
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/Arious_3DLogo.glb');
