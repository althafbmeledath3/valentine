import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4,
    opacity: Math.random() * 0.4 + 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose"
          style={{
            left: `${heart.left}%`,
            opacity: heart.opacity,
          }}
          initial={{ y: '100vh', rotate: 0 }}
          animate={{
            y: '-10vh',
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            className="drop-shadow-sm"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
