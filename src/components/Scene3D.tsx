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
      
      {/* Lottie animations at the positions */}
      {/* Left position */}
      <Html position={[-1.6, 0, 0]} center>
        <div className="w-8 h-8 pointer-events-none">
          <DotLottieReact
            src="/animations/Flasks.lottie"
            loop={true}
            autoplay
          />
        </div>
      </Html>
      
      {/* Right position */}
      <Html position={[1.6, 0, 0]} center>
        <div className="w-16 h-16 pointer-events-none">
          <DotLottieReact
            src="/animations/Flasks.lottie"
            loop={true}
            autoplay
          />
        </div>
      </Html>
      
      {/* Bottom position */}
      <Html position={[0, -1.6, 0]} center>
        <div className="w-16 h-16 pointer-events-none">
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
