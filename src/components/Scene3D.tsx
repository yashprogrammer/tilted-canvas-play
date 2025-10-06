import { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/three';
import { springConfigs } from '@/lib/animationConfigs';

export const Scene3D = () => {
  const { scene } = useGLTF('/models/Arious_3DLogo.glb');
  const { camera, size } = useThree();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxRotationX = (25 * Math.PI) / 180; // 25 degrees
  const maxRotationY = (15 * Math.PI) / 180; // 15 degrees
  
  // Unified animation using @react-spring/three
  const [springs, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    scale: [100, 100, 100],
    cameraZ: 10,
    config: springConfigs.hover,
  }));

  const handlePointerMove = (event: any) => {
    if (isHovering && !isAnimating) {
      // Normalize mouse position to -1 to 1 range relative to canvas
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      setMousePosition({ x, y });
      
      // Update spring for hover effect
      api.start({
        rotation: [y * maxRotationX, x * maxRotationY, 0],
        config: springConfigs.hover,
      });
    }
  };

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsHovering(false);
      
      // Animate with react-spring
      api.start({
        to: async (next) => {
          // Animate rotation, scale, and camera in parallel
          await next({
            rotation: [0, Math.PI * 2, 0], // 360 degrees on Y axis
            scale: [300, 300, 300],
            cameraZ: 2,
            config: springConfigs.elastic,
          });
          // Navigate after animation completes
          navigate('/welcome');
        },
      });
    }
  };
  
  // Reset rotation when not hovering
  if (!isHovering && !isAnimating) {
    api.start({
      rotation: [0, 0, 0],
      config: springConfigs.hover,
    });
  }

  // Apply camera position from spring
  camera.position.z = springs.cameraZ.get();

  return (
    <animated.group
      rotation={springs.rotation as any}
      scale={springs.scale as any}
      onPointerEnter={() => !isAnimating && setIsHovering(true)}
      onPointerLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <primitive object={scene} />
      
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
    </animated.group>
  );
};

// Preload the model
useGLTF.preload('/models/Arious_3DLogo.glb');
