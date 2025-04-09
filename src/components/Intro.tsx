import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import musicc from '../music/musicc.mp3';

// Helper function for random numbers
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// BackgroundAnimations component for flying hearts, floating texts, and particles
const BackgroundAnimations = () => {
  const hearts = Array.from({ length: 12 });
  const texts = Array.from({ length: 7 });
  const particles = Array.from({ length: 20 });
  const randomTexts = [
    'cutie',
    'my love',
    '❤️',
    'baby girl',
    'Kiss',
    'hugs'
  ];

  return (
    <>
      {/* Flying Hearts */}
      {hearts.map((_, index) => {
        const left = random(0, 100);
        const delay = random(0, 10);
        const duration = random(8, 15);
        return (
          <div
            key={`heart-${index}`}
            className="absolute text-2xl"
            style={{
              left: `${left}%`,
              bottom: `-50px`,
              animation: `fly ${duration}s linear ${delay}s infinite`
            }}
          >
            ❤️
          </div>
        );
      })}

      {/* Floating Texts */}
      {texts.map((_, index) => {
        const left = random(0, 100);
        const delay = random(0, 10);
        const duration = random(10, 20);
        const text = randomTexts[random(0, randomTexts.length - 1)];
        return (
          <div
            key={`text-${index}`}
            className="absolute text-xl font-bold text-pink-500"
            style={{
              left: `${left}%`,
              top: `-50px`,
              animation: `flyDown ${duration}s linear ${delay}s infinite`
            }}
          >
            {text}
          </div>
        );
      })}

      {/* Particle effect (sparkles) */}
      {particles.map((_, index) => {
        const left = random(0, 100);
        const delay = random(0, 10);
        const duration = random(5, 10);
        return (
          <div
            key={`particle-${index}`}
            className="absolute text-xs opacity-70"
            style={{
              left: `${left}%`,
              top: `${random(0, 100)}%`,
              animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`
            }}
          >
            ✨
          </div>
        );
      })}
    </>
  );
};

const Intro = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Typewriter effect for heading
  const [displayedText, setDisplayedText] = useState("");
  const fullHeading = "my lady, extra classes on Feb 14?";

  // Confetti state & optimization for smaller screens
  const [confettiCount, setConfettiCount] = useState(200);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullHeading.slice(0, index + 1));
      index++;
      if (index === fullHeading.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [fullHeading]);

  useEffect(() => {
    if (window.innerWidth < 400) {
      setConfettiCount(100);
    }
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Parallax effect (skipped on small screens)
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!parallaxRef.current) return;
    if (window.innerWidth < 400) return;
    const layers = parallaxRef.current.querySelectorAll<HTMLDivElement>(".parallax-layer");
    layers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed");
      if (!speed) return;
      const x = (window.innerWidth - e.pageX * parseFloat(speed)) / 100;
      const y = (window.innerHeight - e.pageY * parseFloat(speed)) / 100;
      layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  };

  // Heart trail on cursor (optional on small screens)
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (window.innerWidth < 400) return;
      const heart = document.createElement("div");
      heart.className = "heart-trail";
      heart.style.left = `${e.pageX}px`;
      heart.style.top = `${e.pageY}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    };
    document.addEventListener("mousemove", handleMouse);
    return () => document.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden animate-gradient-bg flex items-center justify-center px-4"
      onMouseMove={handleMouseMove}
      ref={parallaxRef}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {showConfetti && <Confetti numberOfPieces={confettiCount} recycle={false} />}
      <BackgroundAnimations />

      {/* Glassmorphic Card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/30 text-center space-y-6 animate-fade-in max-w-xl mx-auto transform transition-all duration-700 hover:scale-105 hover:shadow-2xl">
        <Sparkles className="w-16 h-16 text-pink-500 mx-auto animate-bounce-slow" />
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-300 text-transparent bg-clip-text drop-shadow-xl">
          {displayedText}
        </h1>
        <h2 className="text-base sm:text-xl text-pink-400 font-semibold animate-pulse">
        Or shall we skip to the real syllabus —
        </h2>

        {/* Old Horizontal Button Layout */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate('/qualities')}
            className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-transform duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            yes!! 💖
          </button>
          <button
            onClick={togglePlay}
            className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-transform duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center gap-2"
          >
            <Music className="w-5 h-5" /> {isPlaying ? 'Pause Music' : 'Play Music 🎶'}
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={musicc} />

      {/* Inline CSS for keyframe animations */}
      <style>{`
        @keyframes fly {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-110vh) scale(1); opacity: 0; }
        }
        @keyframes flyDown {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) scale(1); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        @keyframes particleFloat {
          0% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(-50px); opacity: 0.5; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Intro;
