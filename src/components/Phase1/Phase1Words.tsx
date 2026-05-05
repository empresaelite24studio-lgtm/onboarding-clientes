import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Check } from 'lucide-react'

const WORDS = [
  'Calma', 'Aventura', 'Luz', 'Silencio', 'Naturaleza', 
  'Elegancia', 'Calor', 'Minimalismo', 'Historia', 'Paz',
  'Libertad', 'Seguridad', 'Misterio', 'Alegría', 'Raíces',
  'Futuro', 'Equilibrio', 'Pasión', 'Orden', 'Identidad'
]

export default function Phase1Words() {
  const { setPhase, phase1, setPhase1, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  const toggleWord = (word: string) => {
    const current = phase1.selectedWords
    if (current.includes(word)) {
      setPhase1({ selectedWords: current.filter(w => w !== word) })
    } else if (current.length < 3) {
      setPhase1({ selectedWords: [...current, word] })
    }
  }

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black items-center justify-center p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-bold uppercase">PASO 2 DE 3</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light">Selecciona tus {isEmpresa ? 'valores' : 'palabras'}</h2>
          <p className="text-brand-black/40 font-light italic text-sm">
             Elige 3 conceptos que definan la esencia de tu {isEmpresa ? 'marca' : 'hogar'}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {WORDS.map(word => {
            const isSelected = phase1.selectedWords.includes(word)
            return (
              <button
                key={word}
                onClick={() => toggleWord(word)}
                className={`
                  relative py-8 px-4 border transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold
                  ${isSelected ? 'bg-brand-black text-white border-brand-black shadow-2xl scale-105' : 'bg-white border-brand-black/5 text-brand-black/40 hover:border-brand-gold/30 hover:text-brand-gold'}
                `}
              >
                {word}
                {isSelected && (
                  <div className="absolute top-2 right-2 text-brand-gold">
                    <Check size={12} />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col items-center gap-6 pt-12">
           <div className="text-[10px] tracking-widest font-bold text-brand-black/30 uppercase">
              SELECCIONADAS: <span className="text-brand-gold">{phase1.selectedWords.length} / 3</span>
           </div>
           
           <button 
            disabled={phase1.selectedWords.length !== 3}
            onClick={() => setPhase(4)}
            className={`primary-btn min-w-[280px] ${phase1.selectedWords.length !== 3 ? 'opacity-30' : 'animate-slide-up shadow-xl shadow-brand-gold/20'}`}
           >
            Continuar
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
