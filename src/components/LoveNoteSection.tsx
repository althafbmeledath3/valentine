import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroBg from '@/assets/hero-bg.jpg';
import { fetchOrderData } from '../lib/orderData';

const LoveNoteSection = () => {
  const [senderName, setSenderName] = useState('sendername');
  const [receiverName, setReceiverName] = useState('recivername');
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const loveNote = `My Dearest Love ,

Every moment with you feels like a beautiful dream I never want to wake up from. Your smile lights up my world, your laughter is my favorite melody, and your love is the greatest gift I've ever received.

In your eyes, I found my home.
In your heart, I found my love.
In your soul, I found my best friend.

Forever and always yours ${receiverName} ,
With all my heart 💕 ${senderName}`;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data: any = await fetchOrderData();
        if (!mounted) return;
        if (data) {
          setSenderName(data.senderName || 'sendername');
          setReceiverName(data.recieverName || 'recivername');
        }
      } catch (err) {
        console.error('fetchOrderData error in LoveNoteSection:', err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const typingSpeed = 20; // Fast typing speed (milliseconds per character)
    
    const typeWriter = () => {
      if (index < loveNote.length) {
        setDisplayedText(loveNote.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start typing after a short delay
    const startDelay = setTimeout(typeWriter, 800);
    
    return () => clearTimeout(startDelay);
  }, [loveNote]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-light/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 py-20 max-w-lg mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative Hearts */}
        <motion.div
          className="flex justify-center gap-3 mb-8"
          variants={lineVariants}
        >
          <Heart className="w-6 h-6 text-rose fill-rose animate-heart-beat" />
          <Heart className="w-8 h-8 text-rose-dark fill-rose-dark animate-heart-beat" style={{ animationDelay: '0.2s' }} />
          <Heart className="w-6 h-6 text-rose fill-rose animate-heart-beat" style={{ animationDelay: '0.4s' }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-script text-5xl md:text-6xl text-rose-dark mb-10 drop-shadow-sm"
          variants={lineVariants}
        >
          A Letter for You
        </motion.h1>

        {/* Love Note Card with Typing Effect */}
        <motion.div
          className="glass-card rounded-2xl p-8 shadow-romantic"
          variants={lineVariants}
        >
          <p className="love-note text-foreground whitespace-pre-line text-left">
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-rose-dark ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center text-rose/70"
          variants={lineVariants}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-body text-sm mb-2">Scroll for more</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveNoteSection;
