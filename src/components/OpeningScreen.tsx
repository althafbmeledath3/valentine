import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchOrderData } from '../lib/orderData';

interface OpeningScreenProps {
  onComplete: () => void;
}

const OpeningScreen = ({ onComplete }: OpeningScreenProps) => {
  const [phase, setPhase] = useState<'initial' | 'heart' | 'text' | 'complete'>('initial');
  const [receiverName, setReceiverName] = useState('recivername');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data: any = await fetchOrderData();
        if (!mounted) return;
        if (data) {
          setReceiverName(data.recieverName || 'recivername');
        }
      } catch (err) {
        console.error('fetchOrderData error in OpeningScreen:', err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleTap = () => {
    if (phase === 'initial') {
      setPhase('heart');
      setTimeout(() => setPhase('text'), 1500);
      setTimeout(() => setPhase('complete'), 3500);
      setTimeout(onComplete, 4000);
    }
  };

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-romantic-gradient cursor-pointer"
          onClick={handleTap}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated glow background */}
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, hsl(350 70% 70%) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main heart animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase === 'initial' ? { scale: 1, opacity: 1 } : phase === 'heart' ? { scale: [1, 1.2, 1] } : { scale: 0.8, y: -50 }}
            transition={{ 
              duration: phase === 'heart' ? 0.3 : 0.4, 
              ease: 'easeOut',
              times: phase === 'heart' ? [0, 0.5, 1] : undefined
            }}
          >
            <motion.div
              animate={phase !== 'initial' ? {
                filter: ['drop-shadow(0 0 20px hsl(350 80% 60% / 0.5))', 'drop-shadow(0 0 40px hsl(350 80% 60% / 0.8))', 'drop-shadow(0 0 20px hsl(350 80% 60% / 0.5))'],
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Heart 
                size={120} 
                className="text-primary fill-primary"
              />
            </motion.div>
            
            {/* Sparkle effects around heart */}
            {phase !== 'initial' && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-accent"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 8) * 80,
                      y: Math.sin((i * Math.PI * 2) / 8) * 80,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Text reveal */}
          <AnimatePresence>
            {phase === 'text' && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h1 
                  className="font-display text-4xl md:text-5xl text-foreground mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Happy Valentine&apos;s Day {receiverName}
                </motion.h1>
                <motion.p
                  className="font-body text-lg text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  A special message awaits...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tap indicator */}
          {phase === 'initial' && (
            <motion.div
              className="absolute bottom-20 text-center"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <p className="font-body text-sm text-muted-foreground">
                Tap to continue ✨
              </p>
            </motion.div>
          )}

          {/* Corner decorative sparkles */}
          <motion.div
            className="absolute top-10 left-10 w-3 h-3 rounded-full bg-accent/60"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-20 right-16 w-2 h-2 rounded-full bg-primary/40"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-32 left-20 w-2 h-2 rounded-full bg-accent/50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningScreen;


