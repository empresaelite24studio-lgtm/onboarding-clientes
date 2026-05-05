import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface MicButtonProps {
  value: string;
  onChange: (text: string) => void;
  className?: string;
}

let globalRecognition: any = null;
const getGlobalRecognition = () => {
  if (typeof window === 'undefined') return null;
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  
  if (!globalRecognition) {
    globalRecognition = new SpeechRecognition();
    globalRecognition.lang = 'es-ES';
    globalRecognition.continuous = true;
    globalRecognition.interimResults = true;
  }
  return globalRecognition;
};

export default function MicButton({ value, onChange, className = "" }: MicButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const baseValueRef = useRef("");
  
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  // Update refs when props change
  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const recognition = getGlobalRecognition();
      if (recognition && isListening) {
        try { recognition.stop(); } catch(e) {}
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    const recognition = getGlobalRecognition();
    if (!recognition) {
      alert("Tu navegador no soporta el reconocimiento de voz. Intenta con Chrome.");
      return;
    }

    if (isListening) {
      try { recognition.stop(); } catch(e) {}
      setIsListening(false);
    } else {
      // Bind handlers dynamically for this specific component instance
      recognition.onstart = () => {
        setIsListening(true);
        setError(false);
        setInterimTranscript('');
        baseValueRef.current = valueRef.current || '';
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        
        setInterimTranscript(currentTranscript);
        
        let prefix = baseValueRef.current;
        if (prefix && !prefix.endsWith(' ') && currentTranscript) {
           prefix += ' ';
        }
        
        onChangeRef.current(prefix + currentTranscript);
      };

      recognition.onerror = (e: any) => {
        console.error("Speech Recognition Error", e);
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          setError(true);
        }
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      const attemptStart = (retries = 5) => {
        try {
          recognition.start();
        } catch (e) {
          console.log("Recognition start locked, retrying...", e);
          if (retries > 0) {
            setTimeout(() => attemptStart(retries - 1), 300);
          } else {
            console.error("Failed to start recognition", e);
            setIsListening(false);
          }
        }
      };
      
      attemptStart();
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-3 rounded-full transition-all duration-500 border relative ${
        isListening 
          ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.5)]' 
          : 'bg-white/5 border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5'
      } ${className}`}
      title={isListening ? "Detener..." : "Dictar con voz"}
    >
      {isListening && interimTranscript && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 sm:w-64 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-brand-gold/30 shadow-2xl text-left text-white text-xs z-50 animate-fade-in pointer-events-none cursor-default">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">Transcribiendo...</span>
          </div>
          <p className="font-light leading-relaxed normal-case">
            {interimTranscript}
            <span className="animate-pulse ml-1">_</span>
          </p>
        </div>
      )}
      {isListening && (
        <span className="absolute inset-0 rounded-full animate-ping bg-brand-gold/30"></span>
      )}
      {isListening ? (
        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
      ) : (
        <Mic className="w-5 h-5 relative z-10" />
      )}
    </button>
  );
}
