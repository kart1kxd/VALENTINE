import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Photo1 from "./assets/Photo1.jpg";
import Photo2 from "./assets/Photo2.jpg";
import Photo3 from "./assets/Photo3.jpg";
import Photo4 from "./assets/Photo4.jpg";
import Photo5 from "./assets/Photo5.jpg";

// Timeline data (same as your code, just replace "spotify_link_..." as needed)
const timelineEvents = [
  {
    photo: Photo1,
    title: "A Surprising Hello",
    desc: "We ended up talking in a way no one expected—maybe it was fate.",
    music: "47isJpIIO8m7BJEhiFhnaf?si=ed5a002ffc6e4517",
    quote: "“Still funny how it began!”"
  },
  {
    photo: Photo2,
    title: "We Fought Over Silly Stuff",
    desc: "We had our share of banter—some call it drama, but hey, it’s never boring.",
    music: "5e0b9LgOfi3aJSKXFcOWRe?si=fabb04af6fed4428",
    quote: "“Rivals or friends? Hard to say sometimes.”"
  },
  {
    photo: Photo3,
    title: "Moments Got Real",
    desc: "I shared more than usual; you didn't mind—thanks for rolling with it.",
    music: "3be9ACTxtcL6Zm4vJRUiPG?si=3f3e8133dafa4b9e",
    quote: "“I guess it was kinda nice, right?”"
  },
  {
    photo: Photo4,
    title: "That Spicy Argument",
    desc: "Remember when it all got intense? Half-sorry, half-amused. Oops.",
    music: "0yc6Gst2xkRu0eMLeRMGCX?si=6401a28953794af3",
    quote: "“Chaos follows me—apologies in advance.”"
  },
  {
    photo: Photo5,
    title: "Another Chapter",
    desc: "Let’s keep adding to this story—who knows what’s next?",
    music: "5XeFesFbtLpXzIVDNQP22n?si=da5b0abe89724bba",
    quote: "“No idea where it goes, but I'm in for the ride.”"
  }
];

const ValentineExtra: React.FC = () => {
  const navigate = useNavigate();
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  // Confetti state
  const [confettiCount, setConfettiCount] = useState(200);
  const [showConfetti, setShowConfetti] = useState(true);

  // For the parallax effect
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  // Turn off confetti after 4s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Reduce confetti on very small screens (Android phones, etc.)
  useEffect(() => {
    if (window.innerWidth < 400) {
      setConfettiCount(100); // fewer confetti pieces on narrow screens
    }
  }, []);

  // Parallax effect on mouse move (skip if very small screen to reduce CPU)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!parallaxRef.current) return;
    if (window.innerWidth < 400) return; // skip parallax on very narrow devices for performance
    const layers = parallaxRef.current.querySelectorAll<HTMLDivElement>(".parallax-layer");
    layers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed");
      if (!speed) return;
      const x = (window.innerWidth - e.pageX * parseFloat(speed)) / 100;
      const y = (window.innerHeight - e.pageY * parseFloat(speed)) / 100;
      layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  };

  // Heart trail on cursor
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (window.innerWidth < 400) return; // optional: skip heart trail on small screens
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

  const handleCardClick = (index: number) => {
    setActiveEvent(activeEvent === index ? null : index);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden animate-gradient-bg"
      onMouseMove={handleMouseMove}
      ref={parallaxRef}
    >
      {/* Confetti on mount */}
      {showConfetti && (
        <Confetti
          numberOfPieces={confettiCount}
          recycle={false}
          // Optional: set width/height if needed, or let Confetti autodetect
        />
      )}

      {/* Parallax hearts background */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="parallax-layer absolute w-40 h-40 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url('/assets/heart1.png')" }}
          data-speed="1.5"
        />
        <div
          className="parallax-layer absolute w-32 h-32 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url('/assets/heart2.png')", top: "30%", left: "10%" }}
          data-speed="2.2"
        />
        <div
          className="parallax-layer absolute w-48 h-48 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url('/assets/heart3.png')", top: "60%", left: "70%" }}
          data-speed="1.0"
        />
      </div>

      {/* Main container content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-10 px-4 sm:px-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-pink-600 animate-pulse drop-shadow-lg text-center mb-4">
          Happy Valentine
        </h1>
        <h2 className="text-lg sm:text-2xl font-semibold text-pink-500 mb-6 text-center">
          my lady
        </h2>

        {/* Glassmorphic Timeline Container */}
        <div
          className="relative w-full max-w-5xl mt-4 mb-8 bg-white/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl
                     border border-white/40 transition-shadow duration-300 hover:shadow-2xl"
          style={{ zIndex: 10 }}
        >
          {/* Central line (for bigger screens) */}
          <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] bg-pink-300 opacity-75"></div>

          {timelineEvents.map((event, index) => {
            const isActive = activeEvent === index;
            return (
              <div
                key={index}
                className={`relative mb-8 sm:mb-12 sm:w-1/2 ${
                  index % 2 === 0 ? "sm:ml-auto sm:pl-8" : "sm:mr-auto sm:pr-8"
                }`}
              >
                {/* 3D flip card */}
                <div
                  className="group perspective-1000 w-full h-64 sm:h-72 cursor-pointer
                              transition-transform duration-500 hover:scale-[1.02]"
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    className={`relative preserve-3d w-full h-full duration-700 transform ${
                      isActive ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front side */}
                    <div
                      className="absolute w-full h-full backface-hidden overflow-hidden rounded-xl shadow-lg"
                      style={{
                        backgroundImage: `url(${event.photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="w-full h-full flex flex-col justify-end bg-black/30 p-4 sm:p-6 transition-all duration-300 hover:bg-black/40">
                        <h3 className="text-lg sm:text-xl font-semibold text-white drop-shadow-lg mb-1">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-pink-100 drop-shadow-md">
                          {event.desc}
                        </p>
                      </div>
                    </div>

                    {/* Back side (Spotify embed + quote) */}
                    <div className="absolute w-full h-full rounded-xl shadow-lg backface-hidden bg-white/80 rotate-y-180 overflow-hidden flex flex-col p-4 justify-center items-center">
                      {/* Official Spotify embed - lighten the background */}
                      <iframe
                        title={`spotify-${index}`}
                        src={`https://open.spotify.com/embed/track/${event.music}`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="encrypted-media"
                        className="rounded-md"
                      />
                      <p className="mt-4 text-pink-700 font-semibold text-center text-sm sm:text-base px-2">
                        {event.quote}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
                        
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button to next page (playlist) */}
        <button
          onClick={() => navigate("/playlist")}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-pink-300/90 text-pink-800 font-bold rounded-full shadow-md hover:shadow-2xl
                     hover:scale-105 transform transition-transform duration-300"
        >
          Dedicated Songs Just For You! 🎵
        </button>
      </div>

      {/* Inline CSS for animations */}
      <style>{`
        /* 3D Flip - Utility classes */
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        /* Heart trail */
        .heart-trail {
          position: absolute;
          width: 20px;
          height: 20px;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 32 29.6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffa8b8' d='M23.6,0c-2.7,0-5.2,1.4-6.6,3.6C15.6,1.4,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4c0,5.4,4.4,9.8,9.9,10.3 c0,0,0,0,0.1,0l6.2,7.2l6.1-7.1l0.2,0c5.4-0.6,9.5-5,9.5-10.4C32,4.7,27.3,0,21.6,0z' /%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          pointer-events: none;
          animation: pop 1s forwards;
          z-index: 9999;
        }
        @keyframes pop {
          0% {
            transform: scale(1) translate(-50%, -50%);
            opacity: 1;
          }
          50% {
            transform: scale(1.3) translate(-50%, -50%);
            opacity: 0.7;
          }
          100% {
            transform: scale(0) translate(-50%, -50%);
            opacity: 0;
          }
        }

        /* Parallax Layers */
        .parallax-layer {
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.35;
        }

        /* 
          Light pastel Valentines Gradient Animation
        */
        .animate-gradient-bg {
          background: linear-gradient(
            135deg,
            #ffe4e6 0%,
            #ffdce0 25%,
            #ffcbd5 50%,
            #ffdce0 75%,
            #ffe4e6 100%
          );
          background-size: 300% 300%;
          animation: gradientShift 12s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default ValentineExtra;
