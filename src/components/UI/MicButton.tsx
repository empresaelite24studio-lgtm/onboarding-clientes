import React, { useState, useEffect, useRef } from 'react';
import { Mic, Loader2 } from 'lucide-react';

interface MicButtonProps {
  value: string;
  onChange: (text: string) => void;
  className?: string;
}

// Track if any recognition is currently active globally (only one can run at a time in browsers)
let activeRecognition: any = null;

export default function MicButton({ value, onChange, className = "" }: MicButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const baseValueRef = useRef('');
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  // Keep refs in sync with latest props
  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);

  // Stop recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
        if (activeRecognition === recognitionRef.current) activeRecognition = null;
      }
    };
  }, []);

  const supported = typeof window !== 'undefined' && 
    !!(( window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const toggleListening = () => {
    if (!supported) {
      alert("Tu navegador no soporta reconocimiento de voz. Por favor usa Google Chrome.");
      return;
    }

    if (isListening) {
      // Stop this instance
      try { recognitionRef.current?.stop(); } catch(e) {}
      setIsListening(false);
      setInterimTranscript('');
      return;
    }

    // Stop any other active recognition first
    if (activeRecognition && activeRecognition !== recognitionRef.current) {
      try { activeRecognition.stop(); } catch(e) {}
      activeRecognition = null;
    }

    // Create fresh recognition instance for this field
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      activeRecognition = recognition;
      setIsListening(true);
      setError(false);
      setInterimTranscript('');
      // Capture what's already in the field as baseline
      baseValueRef.current = valueRef.current || '';
    };

    recognition.onresult = (event: any) => {
      let spoken = '';
      for (let i = 0; i < event.results.length; i++) {
        spoken += event.results[i][0].transcript;
      }
      setInterimTranscript(spoken);

      // Append spoken text after whatever was already typed
      const base = baseValueRef.current;
      const separator = base && !base.endsWith(' ') && spoken ? ' ' : '';
      onChangeRef.current(base + separator + spoken);
    };

    recognition.onerror = (e: any) => {
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        setError(true);
        console.error('Speech recognition error:', e.error);
      }
      setIsListening(false);
      setInterimTranscript('');
      if (activeRecognition === recognition) activeRecognition = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
      if (activeRecognition === recognition) activeRecognition = null;
    };

    try {
      recognition.start();
    } catch (e) {
      console.error('Could not start recognition:', e);
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      title={!supported ? 'Usa Chrome para dictado por voz' : isListening ? 'Detener dictado' : 'Dictar con voz'}
      className={`p-3 rounded-full transition-all duration-300 border relative ${
        isListening
          ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.5)]'
          : error
            ? 'bg-red-500/10 border-red-400/30 text-red-400 hover:bg-red-500/20'
            : 'bg-white/5 border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5'
      } ${!supported ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Transcription preview bubble */}
      {isListening && interimTranscript && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 sm:w-72 bg-black/95 backdrop-blur-md p-4 rounded-xl border border-brand-gold/40 shadow-2xl text-left text-white text-xs z-50 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
            <span className="text-[9px] text-brand-gold uppercase tracking-widest font-bold">Escuchando...</span>
          </div>
          <p className="font-light leading-relaxed normal-case opacity-80 line-clamp-3">
            {interimTranscript}
            <span className="animate-pulse ml-1 text-brand-gold">|</span>
          </p>
        </div>
      )}

      {/* Ping animation when listening */}
      {isListening && (
        <span className="absolute inset-0 rounded-full animate-ping bg-brand-gold/25 pointer-events-none"></span>
      )}

      {/* Icon */}
      {isListening ? (
        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
      ) : (
        <Mic className="w-5 h-5 relative z-10" />
      )}
    </button>
  );
}
