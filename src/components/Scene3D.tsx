import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

export const Scene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Arious_3DLogo.glb');
  const { camera, size } = useThree();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const initialRotationX = 0;
  
  const handlePointerMove = (event: any) => {
    if (isHovering && !isAnimating) {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      setMousePosition({ x, y });
    }
  };

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsHovering(false);
    }
  };

  useFrame(() => {
    if (groupRef.current) {
      if (isAnimating) {
        const newProgress = Math.min(animationProgress + 0.015, 1);
        setAnimationProgress(newProgress);
        
        groupRef.current.rotation.y = newProgress * Math.PI * 2;
        
        const scale = 100 + (newProgress * 200);
        groupRef.current.scale.set(scale, scale, scale);
        
        camera.position.z = 10 - (newProgress * 8);
        
        if (newProgress >= 1) {
          navigate('/welcome');
        }
      } else {
        const maxRotationX = (25 * Math.PI) / 180;
        const maxRotationY = (15 * Math.PI) / 180;
        
        const targetRotationX = isHovering 
          ? initialRotationX + (mousePosition.y * maxRotationX)
          : initialRotationX;
        const targetRotationY = isHovering 
          ? mousePosition.x * maxRotationY
          : 0;
        
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
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => !isAnimating && setIsHovering(true)}
      onPointerLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
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
