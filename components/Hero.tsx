import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
      >
        <source src="https://h.top4top.io/m_36197g27n0.mov" type="video/mp4" />
        <source src="https://h.top4top.io/m_36197g27n0.mov" type="video/quicktime" />
      </video>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default Hero;