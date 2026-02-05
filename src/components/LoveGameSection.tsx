import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

const LoveGameSection = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentReason, setCurrentReason] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [revealedHearts, setRevealedHearts] = useState<number[]>([]);

  const reasonsILoveYou = [
    "Your smile makes my heart skip a beat 💓",
    "The way you laugh at my silly jokes 😄",
    "How you always know what I need 🌟",
    "Your kindness that inspires me daily ✨",
    "The way you hold my hand 🤝",
    "Your beautiful, caring soul 💕",
    "How safe I feel in your arms 🏠",
    "The adventures we share together 🌈",
    "Your patience and understanding 🌸",
  ];

  const handleHeartClick = (index: number) => {
    if (revealedHearts.includes(index)) return;
    
    setRevealedHearts([...revealedHearts, index]);
    setCurrentReason(index);
    
    if (revealedHearts.length + 1 === reasonsILoveYou.length) {
      setTimeout(() => setGameComplete(true), 1500);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentReason(0);
    setGameComplete(false);
    setRevealedHearts([]);
  };

  return (
    <section className="py-20 px-6 bg-romantic min-h-screen flex items-center">
      <div className="max-w-lg mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading flex items-center justify-center gap-3">
            A Little Game Just for You
            <Sparkles className="w-7 h-7 text-coral" />
          </h2>
          <p className="font-body text-muted-foreground">
            Tap each heart to reveal why I love you
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!gameStarted ? (
            /* Start Button */
            <motion.div
              key="start"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.button
                onClick={() => setGameStarted(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose to-coral text-white font-body font-semibold text-lg rounded-full shadow-romantic hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6 fill-white" />
                Start the Game
                <Heart className="w-6 h-6 fill-white" />
              </motion.button>
            </motion.div>
          ) : gameComplete ? (
            /* Game Complete */
            <motion.div
              key="complete"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="glass-card rounded-2xl p-8 shadow-romantic"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Heart
                        className="w-10 h-10 text-rose fill-rose mx-1"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    </motion.div>
                  ))}
                </div>
                <h3 className="font-script text-3xl text-rose-dark mb-4">
                  You Are My Everything
                </h3>
                <p className="font-serif text-lg text-foreground mb-6 leading-relaxed">
                  There are a million more reasons why I love you, but the most important one is simply this:
                </p>
                <p className="font-script text-2xl text-rose">
                  Because you are YOU 💕
                </p>
                <motion.button
                  onClick={resetGame}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-body rounded-full hover:bg-secondary/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Play Again
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            /* Game Grid */
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Current Reason Display */}
              <AnimatePresence mode="wait">
                {revealedHearts.length > 0 && (
                  <motion.div
                    key={currentReason}
                    className="glass-card rounded-xl p-6 mb-8 text-center shadow-soft min-h-[100px] flex items-center justify-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-serif text-lg text-foreground">
                      {reasonsILoveYou[currentReason]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hearts Grid */}
              <div className="grid grid-cols-3 gap-4">
                {reasonsILoveYou.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleHeartClick(index)}
                    className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${
                      revealedHearts.includes(index)
                        ? 'bg-rose/20'
                        : 'bg-white/80 hover:bg-white shadow-soft hover:shadow-romantic'
                    }`}
                    whileHover={!revealedHearts.includes(index) ? { scale: 1.1 } : {}}
                    whileTap={!revealedHearts.includes(index) ? { scale: 0.9 } : {}}
                    disabled={revealedHearts.includes(index)}
                  >
                    <motion.div
                      animate={
                        revealedHearts.includes(index)
                          ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Heart
                        className={`w-10 h-10 transition-all ${
                          revealedHearts.includes(index)
                            ? 'text-rose fill-rose'
                            : 'text-rose/40'
                        }`}
                      />
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Progress */}
              <p className="text-center mt-6 font-body text-muted-foreground">
                {revealedHearts.length} of {reasonsILoveYou.length} reasons discovered 💕
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveGameSection;
