import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { User, MessageCircle, BookOpen, Lightbulb, Sparkles, Heart, Star, Send, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

// --- Utility Hooks ---
const useSoundEffect = (src: string, volume: number = 0.5) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
  }, [src, volume]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Sound effect prevented:', e));
    }
  };
  return play;
};

// --- Subcomponents (Extracted to prevent remounting/flickering) ---

const WelcomeStep = ({ nextStep }: { nextStep: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center text-center space-y-12 max-w-4xl"
  >
    <div className="relative">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-12 -left-16 text-[#87ceeb] opacity-60" // Blue sparkle
      >
        <Sparkles size={64} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-8 -right-12 text-brand-gold opacity-60" // Gold sparkle
      >
        <Sparkles size={56} />
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-playfair font-light leading-tight">
        ¡Bienvenid@ a <span className="text-brand-gold italic">bordo!</span> 🌟
      </h1>
    </div>
    <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
      Te damos la bienvenida a <span className="font-bold text-brand-gold">ELITE 24 STUDIO</span>, un lugar donde tus sueños, ideas y talentos no solo son bienvenidos, ¡son necesarios!
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={nextStep}
      className="metallic-btn px-12 py-4 text-lg"
    >
      COMENZAR EL VIAJE
    </motion.button>
  </motion.div>
);

const IntroStep = ({ nextStep }: { nextStep: () => void }) => (
  <div className="flex flex-col md:flex-row w-full h-full min-h-[60vh] gap-8">
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex-1 rounded-3xl overflow-hidden relative group shadow-2xl border border-white/10"
    >
      <img src="/assets/talent/buildings.png" alt="Iconic Buildings" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
        <p className="text-white/80 text-sm tracking-widest uppercase">Nuestros Proyectos</p>
      </div>
    </motion.div>
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex-1 flex flex-col justify-center items-center text-center space-y-8 p-8"
    >
      <div className="space-y-2">
        <p className="text-brand-gold tracking-[0.4em] text-xs font-bold uppercase">LA INTEGRACIÓN</p>
        <h2 className="text-6xl md:text-8xl font-playfair font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          TÚ
        </h2>
        <div className="h-1 w-24 bg-brand-gold mx-auto blur-[1px]"></div>
      </div>
      <p className="text-lg text-white/80 font-light max-w-md">
        Desde este momento, formas parte de un equipo que no solo crea edificios, sino sueños. 🌠 Cada línea que trazamos lleva tu sello.
      </p>
      <button onClick={nextStep} className="text-brand-gold flex items-center gap-2 hover:gap-4 transition-all">
        CONTINUAR <ArrowRight size={20} />
      </button>
    </motion.div>
  </div>
);

const TasksStep = ({ nextStep }: { nextStep: () => void }) => {
  const playClick = useSoundEffect('/assets/sounds/click.mp3', 0.3);

  const handleAction = () => {
    playClick();
    // Simulate interaction before moving to next step if desired
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
      {[
        {
          icon: <User className="text-brand-gold" size={32} />,
          title: "Conéctate",
          text: "Cada miembro de ELITE 24 es más que un colega; es un mentor. 💬",
          action: "HABLAR CON MENTOR",
          img: "/assets/talent/mentor.png"
        },
        {
          icon: <BookOpen className="text-brand-gold" size={32} />,
          title: "Sumérgete",
          text: "Desde los sueños de Santiago Folleco Ruiz hasta nuestra esencia. 📖",
          action: "VER HISTORIA",
          img: "/assets/talent/history.png"
        },
        {
          icon: <Lightbulb className="text-brand-gold" size={32} />,
          title: "Iniciativa",
          text: "Sé responsable y, sobre todo, sé curioso. Mantén tu mente abierta. 💡",
          action: "DESCUBRIR MÁS",
          img: null
        }
      ].map((task, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
          className="bg-brand-grey/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex flex-col items-center text-center space-y-6 hover:border-brand-gold/30 transition-all"
        >
          {task.img ? (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-gold/20 mb-2 shadow-lg">
              <img src={task.img} alt={task.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mb-2 shadow-lg">
              {task.icon}
            </div>
          )}
          <h3 className="text-2xl font-playfair">{task.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{task.text}</p>
          <button onClick={handleAction} className="text-[10px] tracking-widest font-bold text-brand-gold border-b border-brand-gold/20 pb-1 hover:border-brand-gold transition-all">
            {task.action}
          </button>
        </motion.div>
      ))}
      <div className="md:col-span-3 flex justify-center pt-8">
        <button onClick={() => { playClick(); nextStep(); }} className="metallic-btn px-16">SIGUIENTE PASO</button>
      </div>
    </div>
  )
};

const InspiringStep = ({ nextStep }: { nextStep: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="text-center space-y-12 max-w-4xl"
  >
    <div className="relative inline-block">
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-brand-gold/40 to-[#87ceeb]/40 blur-[80px] -z-10"
      ></motion.div>
      <h2 className="text-5xl md:text-8xl font-playfair italic text-white leading-tight">
        Es tu momento <br /> 
        <span className="text-brand-gold font-black not-italic drop-shadow-[0_0_20px_rgba(197,160,89,0.5)]">DE BRILLAR</span>
      </h2>
    </div>
    <p className="text-xl text-white/80 font-light leading-relaxed">
      Cada paso que tomes en ELITE 24 es un paso hacia el futuro, un futuro lleno de innovación, pasión y crecimiento. Cada trazo, cada idea, deja huella. 🌟
    </p>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={nextStep} 
      className="metallic-btn px-12 py-4 shadow-[0_0_20px_rgba(197,160,89,0.2)]"
    >
      INICIAR AVENTURA
    </motion.button>
  </motion.div>
);

const ContactStep = ({ nextStep }: { nextStep: () => void }) => {
  const playNotification = useSoundEffect('/assets/sounds/notification.mp3', 0.6);
  
  useEffect(() => {
    playNotification();
  }, []);

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-brand-grey p-12 rounded-[40px] border border-white/5 shadow-[0_0_50px_rgba(197,160,89,0.1)] flex flex-col items-center space-y-8 max-w-2xl text-center relative overflow-hidden"
    >
      {/* Glowing borders simulation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
      
      <div className="w-20 h-20 bg-brand-gold rounded-3xl flex items-center justify-center rotate-12 shadow-[0_0_30px_rgba(197,160,89,0.4)]">
        <MessageCircle size={40} className="text-black -rotate-12" />
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-playfair">¿Necesitas ayuda?</h3>
        <p className="text-white/60 leading-relaxed">
          Tu mentor y líder de equipo están aquí para guiarte. ¡No dudes en hacer preguntas! Utiliza los recursos internos y nuestra base de conocimiento.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="metallic-btn px-8 text-xs">CHAT CON MENTOR</button>
        <button onClick={nextStep} className="bg-white/5 hover:bg-white/10 px-8 py-3 rounded-full text-xs transition-all uppercase tracking-widest font-bold">ENTENDIDO</button>
      </div>
    </motion.div>
  )
};

const FinalMessageStep = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-12 max-w-4xl relative"
    >
      <div className="flex justify-center gap-6 mb-8">
        <Heart size={40} className="text-[#87ceeb] drop-shadow-[0_0_15px_rgba(135,206,235,0.6)]" />
        <Star size={48} className="text-brand-gold drop-shadow-[0_0_20px_rgba(197,160,89,0.6)]" />
        <Heart size={40} className="text-[#87ceeb] drop-shadow-[0_0_15px_rgba(135,206,235,0.6)]" />
      </div>
      <h2 className="text-4xl md:text-6xl font-playfair leading-tight">
        Aquí no contratamos solo manos, contratamos <span className="text-brand-gold italic">corazones que sueñan</span>, mentes que crean y almas que transforman. 🧡
      </h2>
      <p className="text-brand-gold tracking-[0.5em] text-xs font-bold uppercase drop-shadow-md">¡Bienvenid@ a la familia!</p>
      <button onClick={nextStep} className="metallic-btn px-16">CONTINUAR</button>
    </motion.div>
  )
};

const PersonalExpressionStep = ({ 
  name, setName, emotion, setEmotion, nextStep 
}: { 
  name: string, setName: (v: string) => void, emotion: string, setEmotion: (v: string) => void, nextStep: () => void 
}) => {
  const playType = useSoundEffect('/assets/sounds/typing-tick.mp3', 0.2);

  const handleKeyDown = () => {
    playType();
  };

  const handleFinish = () => {
    if (name && emotion) nextStep();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-playfair italic">¡Queremos saber de ti! 📝</h2>
        <p className="text-white/60">Comparte tus emociones al comenzar este viaje.</p>
      </div>

      <div className="space-y-8 bg-brand-grey/30 p-10 rounded-[40px] border border-white/5 backdrop-blur-md shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.03] to-transparent rounded-[40px] pointer-events-none"></div>
        <div className="space-y-4 relative z-10">
          <label className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Tu Nombre Completo</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu nombre..."
            className="w-full bg-black/50 border-b border-white/10 py-4 px-2 text-2xl font-light focus:border-brand-gold transition-all outline-none text-white placeholder:text-white/20"
          />
        </div>
        <div className="space-y-4 relative z-10">
          <label className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">¿Cómo te sientes hoy?</label>
          <textarea 
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Siento que este viaje..."
            rows={4}
            className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-lg font-light focus:border-brand-gold transition-all outline-none resize-none text-white placeholder:text-white/20"
          />
        </div>
        <button 
          disabled={!name || !emotion}
          onClick={handleFinish}
          className={`w-full py-5 rounded-full flex items-center justify-center gap-3 tracking-[0.3em] font-bold text-xs transition-all relative z-10 ${name && emotion ? 'bg-brand-gold text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-[1.02]' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          REGISTRARME <Send size={16} />
        </button>
      </div>
    </motion.div>
  )
};

const SuccessStep = ({ resetSession, setPhase }: { resetSession: () => void, setPhase: (p: number) => void }) => {
  const playApplause = useSoundEffect('/assets/sounds/applause.mp3', 0.6);

  useEffect(() => {
    playApplause();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#87ceeb', '#ffffff'] // Gold, blue, white
    });
  }, []);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center space-y-12"
    >
      <div className="relative inline-block">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_60px_rgba(197,160,89,0.5)]"
        >
          <Star size={64} className="text-black" />
        </motion.div>
      </div>
      <h2 className="text-5xl md:text-7xl font-playfair leading-tight">
        ¡Registro <span className="text-brand-gold italic">exitoso!</span> 🎉
      </h2>
      <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
        Ahora eres parte de la familia <span className="text-white font-bold">ELITE 24 STUDIO</span>. Te esperamos con los brazos abiertos para comenzar a construir el futuro juntos.
      </p>
      <button 
        onClick={() => {
          resetSession();
          setPhase(0);
        }}
        className="metallic-btn px-16 py-4"
      >
        FINALIZAR Y EXPLORAR
      </button>
    </motion.div>
  )
};


// --- Main Container ---

export default function EliteTalentFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [emotion, setEmotion] = useState('');
  const { setPhase, resetSession } = useWorkshopStore();

  // Background Audio Management
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const epicMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusic.current = new Audio('/assets/sounds/bg-music.mp3');
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.3;

    epicMusic.current = new Audio('/assets/sounds/epic-music.mp3');
    epicMusic.current.loop = true;
    epicMusic.current.volume = 0.5;

    return () => {
      bgMusic.current?.pause();
      epicMusic.current?.pause();
    };
  }, []);

  useEffect(() => {
    // Logic to switch music based on the step
    const manageAudio = async () => {
      try {
        if (step >= 0 && step <= 2) {
          epicMusic.current?.pause();
          await bgMusic.current?.play();
        } else if (step === 3 || step === 4) {
          bgMusic.current?.pause();
          await epicMusic.current?.play();
        } else if (step >= 5) {
          // Fade out or pause all music for focus on typing and success
          bgMusic.current?.pause();
          epicMusic.current?.pause();
        }
      } catch (e) {
        console.log("Audio play prevented by browser policy until interaction.");
      }
    };
    manageAudio();
  }, [step]);

  const nextStep = () => setStep(prev => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 0: return <WelcomeStep key="w" nextStep={nextStep} />
      case 1: return <IntroStep key="i" nextStep={nextStep} />
      case 2: return <TasksStep key="t" nextStep={nextStep} />
      case 3: return <InspiringStep key="insp" nextStep={nextStep} />
      case 4: return <ContactStep key="con" nextStep={nextStep} />
      case 5: return <FinalMessageStep key="f" nextStep={nextStep} />
      case 6: return <PersonalExpressionStep key="p" name={name} setName={setName} emotion={emotion} setEmotion={setEmotion} nextStep={nextStep} />
      case 7: return <SuccessStep key="s" resetSession={resetSession} setPhase={setPhase} />
      default: return <WelcomeStep key="def" nextStep={nextStep} />
    }
  }

  return (
    <TransitionWrapper className="items-center justify-center p-6 md:p-12 overflow-y-auto">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </TransitionWrapper>
  )
}
