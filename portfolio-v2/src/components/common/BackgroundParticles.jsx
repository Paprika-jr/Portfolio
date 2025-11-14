import { motion } from 'framer-motion';
import { MusicNoteIcon } from './Icons';
import './BackgroundParticles.css';

const BackgroundParticles = () => {
  // Generate animated background particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
  }));

  // Generate floating music notes
  const musicNotes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className="background-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="bg-particle"
          style={{ left: particle.left, top: particle.top }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Floating Music Notes */}
      {musicNotes.map((note) => (
        <motion.div
          key={`note-${note.id}`}
          className="floating-music-note"
          style={{ left: note.left }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: note.duration,
            delay: note.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <MusicNoteIcon size={20} />
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundParticles;
