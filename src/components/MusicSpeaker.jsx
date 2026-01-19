import React, { useState, useEffect } from 'react';

const MusicSpeaker = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 23,
        minutes: 59,
        seconds: 35,
    });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="container mx-auto px-4 mb-20 animate-fade-in">
      <div className="bg-black text-white p-12 md:p-16 rounded-sm flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden relative group">
          
        {/* Decorative Blur */}
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(60,60,60,1)_0%,rgba(0,0,0,1)_70%)] -z-0"></div>

        <div className="flex flex-col gap-8 md:w-1/2 relative z-10">
          <span className="text-[#00FF66] font-semibold text-base">Categories</span>
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-wide">
            Enhance Your <br /> Music Experience
          </h1>
          
          <div className="flex gap-4 sm:gap-6 mt-4">
              <div className="bg-white text-black w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default">
                  <span className="font-bold text-sm">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs">Days</span>
              </div>
               <div className="bg-white text-black w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default">
                  <span className="font-bold text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs">Hours</span>
              </div>
               <div className="bg-white text-black w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default">
                  <span className="font-bold text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs">Minutes</span>
              </div>
               <div className="bg-white text-black w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default">
                  <span className="font-bold text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs">Seconds</span>
              </div>
          </div>

          <button className="bg-[#00FF66] text-white px-10 py-4 rounded w-fit font-medium hover:bg-[#00DD55] transition-all hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] mt-4">
            Buy Now!
          </button>
        </div>

        <div className="md:w-1/2 relative z-10 flex justify-center items-center">
            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full transform scale-75 animate-pulse"></div>
            <img 
                src="https://m.media-amazon.com/images/I/71u79k3hXIL._AC_SX679_.jpg" 
                alt="JBL Speaker" 
                className="w-full max-w-[500px] object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700 hover:rotate-2"
            />
        </div>
      </div>
    </div>
  );
};

export default MusicSpeaker;
