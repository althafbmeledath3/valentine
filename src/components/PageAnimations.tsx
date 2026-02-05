import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageAnimations = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['hsl(350, 80%, 65%)', 'hsl(280, 50%, 70%)', 'hsl(350, 70%, 55%)']
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Page Load Animation Overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-rose-light flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2 }}
        >
          <motion.span 
            className="text-6xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: 2 }}
          >
            💕
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-40 origin-left"
        style={{ scaleX, backgroundColor }}
      />

      {/* Sparkle effects on scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-30"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 0.3]) }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-rose/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default PageAnimations;
