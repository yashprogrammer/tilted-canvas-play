// Animation configurations for react-spring and framer-motion
import { config } from '@react-spring/three';

export const springConfigs = {
  // Smooth, natural hover effect
  hover: {
    tension: 170,
    friction: 26,
  },
  // More elastic feel for interactions
  elastic: {
    tension: 280,
    friction: 60,
  },
  // Fast, snappy animations
  snappy: {
    tension: 300,
    friction: 30,
  },
  // Wobbly, playful animations
  wobbly: config.wobbly,
  // Slow, smooth animations
  slow: config.slow,
};

// Framer Motion variants for Lottie containers
export const lottieVariants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.95,
  },
};
