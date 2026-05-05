import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { ArrowRight, Quote } from 'lucide-react'

export default function Phase2Phrase() {
  const { setPhase, phase2, setPhase2 } = useWorkshopStore()

  const emotions = Object.values(phase2?.imageEmotions || {}).filter(e => e.trim() !== '')

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black items-center justify-center p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-12 pb-20">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-semibold uppercase">CUARTO PASO</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light">Frase Integradora Final</h2>
        </header>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.2em] font-bold text-brand-black/40 uppercase text-center">Tus palabras emocionales</p>
            <div className="flex flex-wrap justify-center gap-2">
               {emotions.map((emo, i) => (
                 <span key={i} className="px-3 py-1 bg-white border border-brand-black/5 text-[10px] tracking-widest font-bold text-brand-gold uppercase">{emo}</span>
               ))}
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 border border-brand-black/5 shadow-2xl space-y-8 relative overflow-hidden">
             <Quote className="absolute -top-6 -left-6 w-32 h-32 text-brand-gold/5 rotate-12" />
             
             <div className="space-y-4 relative z-10">
                <p className="text-brand-gold font-playfair italic text-2xl">🖋️ “Mi casa ideal se siente como...”</p>
                <textarea 
                  value={phase2.integrativePhrase}
                  onChange={(e) => setPhase2({ integrativePhrase: e.target.value })}
                  placeholder="Escribe una frase integradora guiándote por tus palabras emocionales..."
                  className="w-full bg-transparent border-none p-0 text-xl md:text-2xl font-light focus:outline-none placeholder:text-brand-black/10 min-h-[120px] resize-none italic leading-relaxed"
                />
             </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-12">
           <button 
            disabled={phase2.integrativePhrase.trim().length < 10}
            onClick={() => setPhase(10)}
            className={`primary-btn min-w-[320px] ${phase2.integrativePhrase.trim().length < 10 ? 'opacity-30' : ''}`}
           >
            Completar mi Moodboard
           </button>
           
           {phase2.integrativePhrase.trim().length >= 10 && (
             <button 
              onClick={() => setPhase(10)}
              className="flex items-center gap-4 text-brand-black/60 hover:text-brand-gold transition-colors font-medium tracking-[0.2em] uppercase text-[10px]"
             >
              Continuar a Fase 3 <ArrowRight size={14} />
             </button>
           )}
        </div>
      </div>
    </TransitionWrapper>
  )
}
