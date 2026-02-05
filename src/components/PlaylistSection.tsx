import { motion } from 'framer-motion';
import { Music, Heart, Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  note: string;
  audioFile: string;
}

const PlaylistSection = () => {
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: 'Raatan Lambiyan',
      artist: 'tere mere gallan hogi mashhur',
      note: 'Because every moment with you feels timeless and eternal.',
      audioFile: new URL('../assets/audio/Raataan Lambiyan – Official Video ｜ Shershaah ｜ Sidharth – Kiara ｜ Tanishk B｜ Jubin Nautiyal  ｜Asees - Sony Music India (mp3cut.net).mp3', import.meta.url).href,
    },
    {
      id: 2,
      title: 'Sahiba',
      artist: 'saahiba aaye ghar kaahe na',
      note: 'You are my queen, my everything, my sahiba.',
      audioFile: new URL('../assets/audio/Sahiba Lyrics - Aditya Rikhari • saahiba, aaye ghar kaahe na - Vibe Bird (mp3cut.net).mp3', import.meta.url).href,
    },
    {
      id: 3,
      title: 'Kalank',
      artist: 'main tera main tera',
      note: 'Our love story is written in the stars, eternal and beautiful.',
      audioFile: new URL('../assets/audio/Kalank - Arijit Singh (Lyrics)  Lyrical Bam Hindi - LYRICAL BAM HINDI (mp3cut.net).mp3', import.meta.url).href,
    },
    {
      id: 4,
      title: 'Tujh Mein Rab',
      artist: 'Rab Ne Bana Di Jodi',
      note: 'In you, I found my god, my destiny, my true love.',
      audioFile: new URL('../assets/audio/Tujh Mein Rab Dikhta Hai Song  Rab Ne Bana Di Jodi  Shah Rukh Khan, Anushka Sharma  Roop Kumar - YRF (mp3cut.net).mp3', import.meta.url).href,
    },
  ];

  const handlePlaySong = (songId: number, audioFile: string) => {
    if (currentPlayingId === songId) {
      // Pause if already playing
      if (audioRef.current) audioRef.current.pause();
      setCurrentPlayingId(null);
    } else {
      // Stop previous song and play new one
      if (audioRef.current) {
        audioRef.current.src = audioFile;
        audioRef.current.play();
      }
      setCurrentPlayingId(songId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-6 bg-sunset min-h-screen">
      <audio ref={audioRef} onEnded={() => setCurrentPlayingId(null)} />
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
            Songs That Feel Like Us
            <Music className="w-7 h-7 text-rose" />
          </h2>
          <p className="font-body text-muted-foreground">
            Every song tells our story
          </p>
        </motion.div>

        {/* Playlist */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {songs.map((song) => (
            <motion.div
              key={song.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                onClick={() => handlePlaySong(song.id, song.audioFile)}
                className="block glass-card rounded-xl p-5 shadow-soft hover:shadow-romantic transition-shadow group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Play/Pause Icon */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose to-coral flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {currentPlayingId === song.id ? (
                      <Pause className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-serif text-lg font-semibold text-foreground truncate">
                        {song.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-rose mb-3">{song.artist}</p>
                    <p className="font-body text-sm text-muted-foreground italic leading-relaxed">
                      "{song.note}"
                    </p>
                  </div>
                </div>

                {/* Decorative Heart */}
                <div className="flex justify-end mt-3">
                  <Heart className="w-4 h-4 text-rose/40 fill-rose/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlaylistSection;



