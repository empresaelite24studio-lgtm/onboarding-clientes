import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Gift, Heart, Sparkles } from 'lucide-react'

export default function Phase5Intro() {
  const { setPhase, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl w-full space-y-16">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-semibold uppercase">FASE 5</p>
          <h2 className="text-4xl md:text-7xl font-playfair font-light">{isEmpresa ? 'El Elemento Identitario' : 'El Objeto Emocional'}</h2>
          <p className="text-2xl md:text-3xl font-playfair italic text-brand-gold">
            “{isEmpresa ? 'Nuestra esencia en un símbolo' : 'Esto no puede faltar...' }”
          </p>
        </header>

        <div className="bg-white p-8 md:p-12 border border-brand-black/5 shadow-xl space-y-6 text-center italic font-light text-brand-black/70">
           <p className="text-lg md:text-xl">
             “{isEmpresa 
               ? 'Ese elemento, objeto o símbolo que representa la trayectoria y el espíritu de su empresa. Aquello que debe tener un lugar de honor en su nueva sede.' 
               : 'Ese objeto que, sin importar dónde vivas, siempre llevas contigo o quisieras tener cerca. No tiene que ser costoso. Solo tiene que tener significado emocional.'}”
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
           <div className="bg-white/60 p-6 border border-brand-black/5 text-center space-y-4">
              <Gift className="mx-auto text-brand-gold/60" size={32} strokeWidth={1} />
              <h4 className="font-playfair text-lg">1. {isEmpresa ? 'Elige el elemento' : 'Elige el objeto'}</h4>
           </div>
           <div className="bg-white/60 p-6 border border-brand-black/5 text-center space-y-4">
              <Heart className="mx-auto text-brand-gold/60" size={32} strokeWidth={1} />
              <h4 className="font-playfair text-lg">2. {isEmpresa ? 'Su rol en la marca' : 'Cuéntanos su historia'}</h4>
           </div>
           <div className="bg-white/60 p-6 border border-brand-black/5 text-center space-y-4">
              <Sparkles className="mx-auto text-brand-gold/60" size={32} strokeWidth={1} />
              <h4 className="font-playfair text-lg">3. {isEmpresa ? 'Integración espacial' : 'Visualiza con IA'}</h4>
           </div>
        </div>

        <div className="flex justify-center">
           <button 
            onClick={() => setPhase(17)}
            className="primary-btn min-w-[280px]"
           >
            Comenzar
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
