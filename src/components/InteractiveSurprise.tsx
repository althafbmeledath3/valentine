import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Heart, Gift, Mail, Star } from 'lucide-react';

const surprises = [
  {
    id: 'heart',
    icon: Heart,
    message: "You make my heart skip a beat 💕",
    color: 'bg-gradient-to-br from-rose-400 to-pink-500'
  },
  {
    id: 'gift',
    icon: Gift,
    message: "You are the greatest gift in my life 🎁",
    color: 'bg-gradient-to-br from-amber-300 to-rose-400'
  },
  {
    id: 'letter',
    icon: Mail,
    message: "Every word I write is about you 💌",
    color: 'bg-gradient-to-br from-pink-300 to-rose-400'
  },
  {
    id: 'star',
    icon: Star,
    message: "You light up my darkest days ✨",
    color: 'bg-gradient-to-br from-yellow-200 to-pink-300'
  },
];

const InteractiveSurprise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [revealed, setRevealed] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTap = (id: string, message: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple effect
    const rippleId = Date.now();
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 600);

    if (!revealed.includes(id)) {
      setRevealed(prev => [...prev, id]);
    }
    setActiveMessage(message);

    setTimeout(() => setActiveMessage(null), 2500);
  };

  return (
    <section ref={ref} className="valentine-section bg-romantic-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="max-w-sm mx-auto relative z-10 w-full px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            className="inline-block mb-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Gift className="text-primary mx-auto" size={40} />
          </motion.div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Tap to Reveal
          </h2>
          <p className="font-body text-muted-foreground">
            Each holds a special message for you
          </p>
        </motion.div>

        {/* Interactive items grid */}
        <div className="grid grid-cols-2 gap-4">
          {surprises.map((item, index) => {
            const Icon = item.icon;
            const isRevealed = revealed.includes(item.id);

            return (
              <motion.button
                key={item.id}
                onClick={(e) => handleTap(item.id, item.message, e)}
                className={`relative aspect-square rounded-2xl ${item.color} shadow-heart overflow-hidden`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Ripple effects */}
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 20,
                      height: 20,
                      marginLeft: -10,
                      marginTop: -10,
                    }}
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-white/0"
                  animate={isRevealed ? {
                    backgroundColor: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)']
                  } : {}}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isRevealed ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      size={48}
                      className="text-white drop-shadow-lg"
                      fill={isRevealed ? 'currentColor' : 'none'}
                    />
                  </motion.div>
                </div>

                {/* Sparkles on reveal */}
                <AnimatePresence>
                  {isRevealed && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-white"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{ scale: 0, x: 0, y: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            x: Math.cos((i * Math.PI * 2) / 6) * 50,
                            y: Math.sin((i * Math.PI * 2) / 6) * 50,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Checkmark for revealed */}
                {isRevealed && (
                  <motion.div
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Heart size={14} className="text-primary fill-primary" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Message popup */}
        <AnimatePresence>
          {activeMessage && (
            <motion.div
              className="fixed inset-x-4 bottom-32 z-50"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="bg-white rounded-2xl p-5 shadow-heart text-center max-w-xs mx-auto">
                <motion.p
                  className="font-display text-lg text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {activeMessage}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="font-body text-sm text-muted-foreground">
            {revealed.length} of {surprises.length} revealed
          </p>
          <div className="flex justify-center gap-2 mt-2">
            {surprises.map((item) => (
              <motion.div
                key={item.id}
                className={`w-3 h-3 rounded-full transition-colors ${revealed.includes(item.id) ? 'bg-primary' : 'bg-primary/20'
                  }`}
                animate={revealed.includes(item.id) ? { scale: [1, 1.3, 1] } : {}}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSurprise;
