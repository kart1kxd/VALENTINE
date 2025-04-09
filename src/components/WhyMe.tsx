// src/components/WhyMe.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WhyMe = () => {
  const navigate = useNavigate();

  const whyMeReasons = [
    { icon: "🫂", title: "I’m your cozy chaos.", desc: "The partner you didn’t know you needed!" },
    { icon: "🎵", title: "My music taste is best", desc: "No cap." },
    { icon: "🤗", title: "👉🏻👈🏻", desc: "Cuddles on demand." },
    { icon: "💝", title: "I’ll tease you just enough", desc: "to keep that smile sneaking in." }
  ];

  useEffect(() => {
    // You can add additional side effects here if needed
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden animate-fade-in relative">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-3xl opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      {/* Glassmorphic Card */}
      <div className="w-full max-w-3xl bg-white/85 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 relative z-10">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-8 drop-shadow-lg">
          Why Me?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyMeReasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl animate-bounce">{reason.icon}</span>
                <div>
                  <h3 className="font-semibold text-xl text-pink-500">{reason.title}</h3>
                  <p className="text-gray-600">{reason.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/memories')}
            className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Let's Make Memories! ✨
          </button>
        </div>
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
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WhyMe;
