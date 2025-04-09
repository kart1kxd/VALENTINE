// src/components/Memories.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Memories = () => {
  const navigate = useNavigate();

  // Optional: add any side effects here.
  useEffect(() => {
    // For example, you might add analytics or additional animations here.
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-100 via-white to-yellow-100 overflow-hidden animate-fade-in">
      {/* Floating Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute text-4xl opacity-20 animate-bounce" style={{ top: '10%', left: '20%' }}>✨</div>
        <div className="absolute text-3xl opacity-30 animate-bounce-slow" style={{ top: '50%', left: '70%' }}>💖</div>
        <div className="absolute text-2xl opacity-25 animate-bounce" style={{ top: '80%', left: '30%' }}>❤️</div>
      </div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/85 backdrop-blur-xl rounded-2xl p-10 shadow-2xl text-center">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-6 drop-shadow-lg">
          Let's Make Memories
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          I've planned a magical day filled with laughter, adventure, and all your favorite treats. Every moment is designed for us to cherish together.
        </p>
        <button
          onClick={() => navigate('/timeline')}
          className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-transform transform hover:scale-105 shadow-lg font-semibold"
        >
          Let's Go! 🎉
        </button>
      </div>

      {/* Inline CSS for Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Memories;
