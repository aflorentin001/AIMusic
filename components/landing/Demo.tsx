'use client';

import { motion } from 'framer-motion';
import { Play, Pause, Music, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

interface DemoProps {
  onSignInClick?: () => void;
}

const sampleTracks = [
  {
    title: "Ain't Gonna Listen",
    genre: 'Rock',
    duration: '2:40',
    description: 'A powerful rock track with driving energy',
    audioUrl: '/songs/aintgonnalisten.mp3',
  },
  {
    title: 'My Boy',
    genre: 'Pop',
    duration: '2:45',
    description: 'A catchy pop track with uplifting vibes',
    audioUrl: '/songs/myboy.mp3',
  },
  {
    title: 'Drumming Boy',
    genre: 'Rock',
    duration: '3:05',
    description: 'An energetic rock anthem with powerful drums',
    audioUrl: '/songs/drummingboy.mp3',
  },
];

export default function Demo({ onSignInClick }: DemoProps = {}) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const togglePlay = async (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) {
      console.error('Audio element not found for index:', index);
      return;
    }

    try {
      // Pause all other tracks
      audioRefs.current.forEach((a, i) => {
        if (a && i !== index) {
          a.pause();
          a.currentTime = 0;
        }
      });

      // Toggle current track
      if (playingIndex === index) {
        audio.pause();
        setPlayingIndex(null);
      } else {
        await audio.play();
        setPlayingIndex(index);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Unable to play audio. Please check your browser settings.');
    }
  };

  return (
    <section className="flex items-center justify-center" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'linear-gradient(to bottom, #95c9de, #aec8d8)' }}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
          style={{ marginBottom: '4rem' }}
        >
          <h2 className="font-bold text-gray-900 text-center" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Hear the AI magic in action
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}>
            Listen to tracks created by our AI in seconds. Each one is unique, professional-quality, and ready for commercial use.
          </p>
        </motion.div>

        {/* Demo Video and Tracks Container */}
        <div className="w-full flex flex-col items-center">
          {/* Demo Video/Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl"
            style={{ marginBottom: '2rem' }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 to-purple-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white transition-colors"
                >
                  <Play className="w-10 h-10 text-blue-600 ml-1" />
                </motion.button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Sample Tracks */}
          <div className="w-full max-w-4xl" style={{ marginBottom: '3rem' }}>
            <p className="text-sm font-medium text-gray-700 mb-4 text-center">
              Sample AI-Generated Tracks
            </p>
            <div style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
              {sampleTracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center gap-6 hover:shadow-md hover:border-gray-300 transition-all duration-300"
              >
                {/* Hidden Audio Element */}
                <audio
                  ref={(el) => {
                    audioRefs.current[index] = el;
                  }}
                  src={track.audioUrl}
                  onEnded={() => setPlayingIndex(null)}
                />

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePlay(index)}
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  aria-label={playingIndex === index ? `Pause ${track.title}` : `Play ${track.title}`}
                >
                  {playingIndex === index ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </motion.button>

                {/* Track Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{track.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{track.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      {track.genre}
                    </span>
                    <span>•</span>
                    <span>{track.duration}</span>
                  </div>
                </div>

                {/* Waveform Placeholder */}
                <div className="hidden md:flex items-center gap-1 h-12">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                      style={{
                        height: `${Math.random() * 100}%`,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center flex flex-col items-center w-full max-w-4xl"
          >
            <button 
              onClick={onSignInClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Try It Yourself - Free
            </button>
            <p className="text-sm text-gray-600 mt-6">
              No credit card required • Start creating in seconds
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
