import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

export default function Loading() {
  const { path } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);

  const [typedText, setTypedText] = useState('');
  const textToType = 'Loading...';
  const particles = Array.from({ length: 12 });

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => navigate(`/${path}`), 3500);
      return () => clearTimeout(timer);
    }
  }, [path, navigate]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < textToType.length) {
        setTypedText(textToType.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'light' ? 'bg-light-white' : 'bg-dark-black'
      }`}
    >
      {/* Glowing Core */}
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner Glowing Circle */}
        <motion.div
          className={`absolute w-16 h-16 rounded-full transition-shadow duration-300 ${
            theme === 'light'
              ? 'bg-light-purple shadow-[0_0_30px_#4F46E5,0_0_60px_#4F46E5,0_0_80px_#4F46E5,0_0_100px_#4F46E5]'
              : 'bg-dark-gold shadow-[0_0_40px_#FBBF24,0_0_80px_#FBBF24,0_0_120px_#FBBF24,0_0_160px_#FBBF24]'
          }`}
          animate={{
            boxShadow:
              theme === 'light'
                ? [
                    '0px 0px 30px #4F46E5, 0px 0px 60px #4F46E5',
                    '0px 0px 60px #4F46E5, 0px 0px 100px #4F46E5',
                    '0px 0px 30px #4F46E5, 0px 0px 60px #4F46E5',
                  ]
                : [
                    '0px 0px 40px #FBBF24, 0px 0px 80px #FBBF24',
                    '0px 0px 80px #FBBF24, 0px 0px 160px #FBBF24',
                    '0px 0px 40px #FBBF24, 0px 0px 80px #FBBF24',
                  ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Expanding Rings */}
        <motion.div
          className={`absolute w-24 h-24 border-2 rounded-full transition-colors duration-300 ${
            theme === 'light' ? 'border-light-sky' : 'border-dark-blue'
          }`}
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className={`absolute w-28 h-28 border-2 rounded-full transition-colors duration-300 ${
            theme === 'light' ? 'border-light-gray' : 'border-dark-gray'
          }`}
          animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />

        {/* Particle Effects */}
        {particles.map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-2 h-2 rounded-full ${
              theme === 'light'
                ? 'bg-light-sky shadow-[0_0_8px_#A5B4FC]'
                : 'bg-dark-gold shadow-[0_0_15px_#FBBF24,0_0_25px_#FBBF24]'
            }`}
            animate={{
              x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80],
              y: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </motion.div>

      {/* Typewriter Effect for "Loading..." */}
      <motion.p
        className={`absolute bottom-16 text-lg font-semibold transition-colors duration-300 ${
          theme === 'light' ? 'text-light-black' : 'text-dark-white'
        }`}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {typedText}
      </motion.p>
    </div>
  );
}
