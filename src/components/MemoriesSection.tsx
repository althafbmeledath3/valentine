import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import memory1 from '@/assets/memory-1.jpg';
import memory2 from '@/assets/memory-2.jpg';
import memory3 from '@/assets/memory-3.jpg';
// import memory4 from '@/assets/memory-4.jpg';
// import memory5 from '@/assets/memory-5.jpg';
import InteractiveSurprise from './InteractiveSurprise';
import { fetchOrderData } from '@/lib/orderData';


interface Memory {
  id: number;
  image: string;
  caption: string;
  date: string;
}

const MemoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      image: memory1,
      caption: 'The moment that stole my heart 🌹',
      date: 'Forever in my heart',
    },
    {
      id: 2,
      image: memory2,
      caption: 'Your smile is my favorite view 💕',
      date: 'A beautiful memory',
    },
    {
      id: 3,
      image: memory3,
      caption: 'Together is my favorite place to be 💗',
      date: 'Our special moment',
    },
  ]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data: any = await fetchOrderData();
        if (!mounted) return;
        console.log('Order data in MemoriesSection:', data);

        if (data && typeof data.imageUrls === 'string') {
          // Handle comma-separated string
          let imgs = data.imageUrls.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
          // Remove the last item from the array
          if (imgs.length > 0) {
            imgs = imgs.slice(0, -1);
          }
          setMemories((prev) => {
            const newMem = [...prev];
            // Apply fetched images to the first n slots, keep rest as default
            for (let i = 0; i < Math.min(3, imgs.length); i++) {
              if (imgs[i]) {
                newMem[i] = { ...newMem[i], image: imgs[i] };
              }
            }
            console.log('Applying fetched imageUrls (last removed, split from string):', imgs, '-> resulting memories:', newMem);
            return newMem;
          });
          setCurrentIndex(0);
        } else if (data && Array.isArray(data.imageUrls)) {
          let imgs: string[] = data.imageUrls;
          // Remove the last item from the array
          if (imgs.length > 0) {
            imgs = imgs.slice(0, -1);
          }
          setMemories((prev) => {
            const newMem = [...prev];
            for (let i = 0; i < Math.min(3, imgs.length); i++) {
              const url = imgs[i];
              if (url && typeof url === 'string') {
                newMem[i] = { ...newMem[i], image: url };
              }
            }
            console.log('Applying fetched imageUrls (last removed, array):', imgs, '-> resulting memories:', newMem);
            return newMem;
          });
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error('fetchOrderData error:', err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    console.log('memories state updated:', memories.map((m) => m.image));
  }, [memories]);

  

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = memories.length - 1;
      if (next >= memories.length) next = 0;
      return next;
    });
  };

  // Touch/Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-dreamy min-h-screen">
      <div className="max-w-lg mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading flex items-center justify-center gap-3">
            Memories
            <Heart className="w-8 h-8 fill-rose text-rose animate-pulse-soft" />
          </h2>
          <p className="font-body text-muted-foreground">
            Our beautiful journey together
          </p>
        </motion.div>

        {/* Photo Slider */}
        <motion.div
          ref={containerRef}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-romantic bg-white"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src={memories[currentIndex].image}
                alt={memories[currentIndex].caption}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <motion.p 
                  className="font-script text-2xl text-white mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {memories[currentIndex].caption}
                </motion.p>
                <motion.p 
                  className="font-body text-sm text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {memories[currentIndex].date}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-rose hover:bg-white transition-colors"
            aria-label="Previous photo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-rose hover:bg-white transition-colors"
            aria-label="Next photo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {memories.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-rose w-8'
                  : 'bg-rose/30 hover:bg-rose/50 w-2.5'
              }`}
              aria-label={`Go to photo ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Interactive Surprise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <InteractiveSurprise />
        </motion.div>
      </div>
    </section>
  );
};

export default MemoriesSection;



