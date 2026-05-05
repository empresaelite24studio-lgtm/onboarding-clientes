import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { PlayCircle, EyeOff } from 'lucide-react'

export default function Phase6Intro() {
  const { setPhase, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center justify-center p-6 md:p-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-20"></div>
      
      <div className="max-w-4xl w-full space-y-16 relative z-10">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold tracking-[0.3em] text-[10px] font-semibold uppercase">FASE 6</p>
          <h2 className="text-4xl md:text-7xl font-playfair font-light">{isEmpresa ? 'Entra a tu Sede Soñada' : 'Entra a tu Casa Soñada'}</h2>
          <p className="text-white/60 font-light italic text-lg md:text-xl">
             {isEmpresa 
               ? 'Una meditación guiada para visualizar el espacio de marca ideal. Cierra los ojos, respira profundo...' 
               : 'Una meditación guiada para visualizar tu hogar ideal. Cierra los ojos, respira profundo...'}
          </p>
        </header>

        <div className="flex flex-col items-center gap-12">
           <button 
             onClick={() => setPhase(19)}
             className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-brand-gold/50 flex flex-col items-center justify-center group hover:bg-brand-gold hover:text-brand-black transition-all shadow-[0_0_50px_rgba(197,160,89,0.2)]"
           >
              <PlayCircle size={64} strokeWidth={1} className="group-hover:scale-110 transition-transform" />
              <span className="mt-4 text-[10px] tracking-[0.4em] font-bold uppercase">Iniciar meditación</span>
           </button>

           <div className="flex items-center gap-4 text-white/40">
              <EyeOff size={16} />
              <span className="text-[10px] tracking-[0.2em] font-medium uppercase">Recomendado: Usar audífonos</span>
           </div>
        </div>
      </div>
    </TransitionWrapper>
  )
}
