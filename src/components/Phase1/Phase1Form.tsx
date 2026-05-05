import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Calendar, User } from 'lucide-react'

export default function Phase1Form() {
  const { setPhase, clientInfo, setClientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  const isComplete = clientInfo.fullName.trim().length > 3 && clientInfo.date.length > 5

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black items-center justify-center p-6 md:p-12">
      <div className="max-w-xl w-full space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold tracking-[0.3em] text-[10px] font-bold uppercase">PASO 1 DE 3</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-light">{isEmpresa ? 'Sobre su empresa' : 'Cuéntanos sobre ti'}</h2>
          <p className="text-brand-black/40 font-light italic">{isEmpresa ? 'Nos encantaría conocer la marca detrás de este proyecto.' : 'Nos encantaría conocer quién está detrás de este proyecto.'}</p>
        </header>

        <div className="space-y-8 bg-white/40 p-10 border border-brand-black/5 shadow-xl">
          <div className="space-y-3">
             <label className="text-[10px] tracking-widest font-bold text-brand-black/40 uppercase flex items-center gap-2">
                <User size={14} className="text-brand-gold" /> {isEmpresa ? 'Nombre de la Empresa' : 'Nombre Completo'}
             </label>
             <input 
              type="text" 
              value={clientInfo.fullName}
              onChange={(e) => setClientInfo({ fullName: e.target.value })}
              placeholder={isEmpresa ? 'Ej: Apple Inc, Starbucks...' : 'Ej: Alejandro Volkov'}
              className="w-full bg-transparent border-b border-brand-black/10 py-3 text-xl font-light focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/10"
             />
          </div>

          <div className="space-y-3">
             <label className="text-[10px] tracking-widest font-bold text-brand-black/40 uppercase flex items-center gap-2">
                <Calendar size={14} className="text-brand-gold" /> Fecha del Taller
             </label>
             <input 
              type="date" 
              value={clientInfo.date}
              onChange={(e) => setClientInfo({ date: e.target.value })}
              className="w-full bg-transparent border-b border-brand-black/10 py-3 text-xl font-light focus:outline-none focus:border-brand-gold transition-colors text-brand-black/60"
             />
          </div>
        </div>

        <div className="flex justify-center pt-6">
           <button 
            disabled={!isComplete}
            onClick={() => setPhase(3)}
            className={`primary-btn min-w-[280px] ${!isComplete ? 'opacity-10' : 'animate-slide-up shadow-2xl shadow-brand-gold/20'}`}
           >
            Continuar
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
