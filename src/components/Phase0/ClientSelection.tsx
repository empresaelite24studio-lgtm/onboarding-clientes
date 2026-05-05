import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { User, Building2, ArrowRight } from 'lucide-react'

export default function ClientSelection() {
  const { setPhase, setClientInfo } = useWorkshopStore()

  const handleSelection = (type: 'persona' | 'empresa' | 'colaborador') => {
    setClientInfo({ type })
    if (type === 'colaborador') {
      setPhase(50)
    } else {
      setPhase(2)
    }
  }

  return (
    <TransitionWrapper className="bg-[#0a0a0a] text-white items-center justify-center p-6 md:p-12 overflow-hidden relative">
      {/* Background Cinematic Effects */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-brand-gold/30 to-transparent"></div>
      
      <div className="max-w-6xl w-full space-y-20 relative z-10">
        <header className="space-y-6 text-center">
          <p className="text-brand-gold tracking-[0.5em] text-[10px] font-bold uppercase animate-fade">PREVIO AL TALLER</p>
          <h2 className="text-5xl md:text-7xl font-playfair font-light animate-slide">¿Con quién trabajamos hoy?</h2>
          <p className="text-white/30 font-light italic text-sm md:text-lg animate-fade leading-relaxed">
             Selecciona el enfoque de tu experiencia de co-creación
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <button 
            onClick={() => handleSelection('persona')}
            className="group relative bg-[#111] p-10 border border-white/5 transition-all duration-700 hover:border-brand-gold/50 flex flex-col items-center gap-8 hover:-translate-y-2 shadow-2xl"
          >
             <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/[0.02] transition-colors"></div>
             
             <div className="w-20 h-20 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-500 shadow-lg shadow-brand-gold/5">
                <User size={32} strokeWidth={1} />
             </div>
             
             <div className="space-y-4 text-center relative z-10">
                <div className="space-y-2">
                   <h3 className="text-2xl font-playfair tracking-normal">Persona Natural</h3>
                   <div className="h-0.5 w-0 group-hover:w-full bg-brand-gold mx-auto transition-all duration-700"></div>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] tracking-[0.2em] font-bold text-white/40 uppercase">Taller “Mi Vida en Palabras”</p>
                   <p className="text-white/20 text-[10px] italic font-light">Diseño residencial y personal.</p>
                </div>
             </div>

             <div className="mt-4 flex items-center gap-3 text-brand-gold text-[9px] tracking-widest font-bold uppercase opacity-40 group-hover:opacity-100 transition-all">
                COMENZAR <ArrowRight size={12} />
             </div>
          </button>

          <button 
            onClick={() => handleSelection('empresa')}
            className="group relative bg-[#111] p-10 border border-white/5 transition-all duration-700 hover:border-brand-gold/50 flex flex-col items-center gap-8 hover:-translate-y-2 shadow-2xl"
          >
             <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/[0.02] transition-colors"></div>

             <div className="w-20 h-20 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-500 shadow-lg shadow-brand-gold/5">
                <Building2 size={32} strokeWidth={1} />
             </div>

             <div className="space-y-4 text-center relative z-10">
                <div className="space-y-2">
                   <h3 className="text-2xl font-playfair tracking-normal">Empresa / Jurídica</h3>
                   <div className="h-0.5 w-0 group-hover:w-full bg-brand-gold mx-auto transition-all duration-700"></div>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] tracking-[0.2em] font-bold text-white/40 uppercase">Taller “Mi Marca en Palabras”</p>
                   <p className="text-white/20 text-[10px] italic font-light">Diseño corporativo y oficinas.</p>
                </div>
             </div>

             <div className="mt-4 flex items-center gap-3 text-brand-gold text-[9px] tracking-widest font-bold uppercase opacity-40 group-hover:opacity-100 transition-all">
                COMENZAR <ArrowRight size={12} />
             </div>
          </button>

          <button 
            onClick={() => handleSelection('colaborador')}
            className="group relative bg-[#111] p-10 border border-white/5 transition-all duration-700 hover:border-brand-gold/50 flex flex-col items-center gap-8 hover:-translate-y-2 shadow-2xl"
          >
             <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/[0.02] transition-colors"></div>

             <div className="w-20 h-20 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-500 shadow-lg shadow-brand-gold/5">
                <div className="relative">
                  <User size={32} strokeWidth={1} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-gold rounded-full animate-ping"></div>
                </div>
             </div>

             <div className="space-y-4 text-center relative z-10">
                <div className="space-y-2">
                   <h3 className="text-2xl font-playfair tracking-normal">Talento / Equipo</h3>
                   <div className="h-0.5 w-0 group-hover:w-full bg-brand-gold mx-auto transition-all duration-700"></div>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] tracking-[0.2em] font-bold text-white/40 uppercase">Onboarding Elite 24</p>
                   <p className="text-white/20 text-[10px] italic font-light">Bienvenida a la familia Studio.</p>
                </div>
             </div>

             <div className="mt-4 flex items-center gap-3 text-brand-gold text-[9px] tracking-widest font-bold uppercase opacity-40 group-hover:opacity-100 transition-all">
                COMENZAR <ArrowRight size={12} />
             </div>
          </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
