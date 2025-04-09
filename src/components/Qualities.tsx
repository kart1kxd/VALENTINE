// src/components/Qualities.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component for animated background elements (floating hearts and texts)
const AnimatedBackground = () => {
  const hearts = Array.from({ length: 15 });
  const texts = Array.from({ length: 8 });
  const randomTexts = ['Love', 'Joy', '❤️', '💖', 'Kiss', 'cuddles?'];

  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <>
      {hearts.map((_, index) => {
        const left = random(0, 100);
        const delay = random(0, 10);
        const duration = random(10, 20);
        return (
          <div
            key={`heart-${index}`}
            className="absolute text-2xl opacity-60"
            style={{
              left: `${left}%`,
              bottom: `-50px`,
              animation: `flyUp ${duration}s linear ${delay}s infinite`,
            }}
          >
            ❤️
          </div>
        );
      })}
      {texts.map((_, index) => {
        const left = random(0, 100);
        const delay = random(0, 10);
        const duration = random(10, 20);
        const text = randomTexts[random(0, randomTexts.length - 1)];
        return (
          <div
            key={`text-${index}`}
            className="absolute text-xl font-bold text-pink-500 opacity-70"
            style={{
              left: `${left}%`,
              top: `-50px`,
              animation: `flyDown ${duration}s linear ${delay}s infinite`,
            }}
          >
            {text}
          </div>
        );
      })}
    </>
  );
};

const Qualities = () => {
  const navigate = useNavigate();

  const qualities = [
    { icon: "🌞", title: "Your Glow", desc: "Bright enough to blind my bad decisions." },
    { icon: "😂", title: "Your Goofy Side", desc: "Like a walking meme, but cuter." },
    { icon: "🎵", title: "Your Sweet Voice", desc: "Sweeter than my 3AM cravings." },
    { icon: "🥺", title: "Your Kind Heart", desc: "But I’m still tryna forget how you ate my fries without asking 🍟😩" },
    { icon: "✨", title: "Your Eyes", desc: "HD. No filter. No cap." },
    { icon: "💫", title: "Literally Everything", desc: "Even the way you steal the blanket every night 😤💕" },
  ];

  useEffect(() => {
    // Additional animations or effects can be added here if desired.
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-200 to-blue-200 overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Glassmorphic Card with enhanced hover effects */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-lg hover:backdrop-blur-2xl rounded-3xl p-10 shadow-2xl space-y-10 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-8 drop-shadow-lg">
          Why Only You?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualities.map((quality, index) => (
            <div 
              key={index} 
              className="quality-card relative bg-white/95 p-8 rounded-2xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'both' }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-5xl mb-6 flex justify-center animate-bounce">
                  {quality.icon}
                </div>
                <h3 className="text-2xl font-semibold text-center text-pink-600">
                  {quality.title}
                </h3>
                <p className="text-center text-purple-500">
                  {quality.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/whyme')}
            className="px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full transition-transform transform hover:scale-105 shadow-xl font-bold"
          >
            Let's Make Memories! ✨
          </button>
        </div>
      </div>

      {/* Inline CSS for animations and hover glow */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes flyUp {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-110vh) scale(1); opacity: 0; }
        }
        @keyframes flyDown {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) scale(1); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes particleFloat {
          0% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(-50px); opacity: 0.5; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        /* Extra Hover Glow for quality cards */
        .quality-card:hover::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(255, 105, 180, 0.5);
          border-radius: 1rem;
          pointer-events: none;
          animation: pulseGlow 1.5s infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Qualities;
