import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function FloatingAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // High quality royalty-free ambient track
  const AMBIENT_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

  useEffect(() => {
    // Initial setup
    const audio = new Audio(AMBIENT_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Audio play failed:", e);
        alert("Haz clic en cualquier parte de la pantalla primero para permitir el audio.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center gap-4">
      <div className={`overflow-hidden transition-all duration-700 ${isPlaying ? 'max-w-[250px] opacity-100' : 'max-w-0 opacity-0'}`}>
         <div className="bg-black/60 backdrop-blur-xl px-5 py-2 border border-brand-gold/30 rounded-full whitespace-nowrap shadow-2xl">
            <p className="text-[9px] tracking-[0.3em] font-bold text-brand-gold uppercase animate-pulse">Ambiente Sonoro Activo</p>
         </div>
      </div>
      
      <button
        onClick={toggle}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group
                   ${isPlaying ? 'bg-brand-gold text-black shadow-[0_0_30px_rgba(197,160,89,0.4)] scale-110' : 'bg-black/60 text-white/60 border border-white/20 hover:border-brand-gold hover:text-brand-gold backdrop-blur-xl'}`}
      >
        {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <VolumeX size={24} className="group-hover:scale-110 transition-transform" />}
      </button>
    </div>
  );
}
