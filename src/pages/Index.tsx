import FloatingHearts from '@/components/FloatingHearts';
import LoveNoteSection from '@/components/LoveNoteSection';
import MemoriesSection from '@/components/MemoriesSection';
import PlaylistSection from '@/components/PlaylistSection';
import LoveGameSection from '@/components/LoveGameSection';
import Footer from '@/components/Footer';
import PageAnimations from '@/components/PageAnimations';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Page Load & Scroll Animations */}
      <PageAnimations />
      
      {/* Floating Hearts Background Animation */}
      <FloatingHearts />
      
      {/* Main Content */}
      <motion.main 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Hero - Love Note Section */}
        <LoveNoteSection />
        
        {/* Memories Photo Slider */}
        <MemoriesSection />
        
        {/* Favourite Songs Playlist */}
        <PlaylistSection />
        
        {/* Interactive Love Game */}
        <LoveGameSection />
        
        {/* Footer */}
        <Footer />
      </motion.main>
    </div>
  );
};

export default Index;
