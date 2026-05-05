import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'

const SUGGESTIONS_PERSONA = ["calma", "libertad", "refugio", "alegría", "frescura", "seguridad", "conexión", "magia", "calidez", "expansión"]
const SUGGESTIONS_EMPRESA = ["innovación", "liderazgo", "colaboración", "solidez", "creatividad", "confianza", "eficiencia", "impacto", "disrupción", "legado"]

export default function Phase3Keywords() {
  const { setPhase, phase3, setPhase3, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  const updateKey = (idx: number, val: string) => {
    const newKeys = [...phase3.emotionalKeywords]
    newKeys[idx] = val
    setPhase3({ emotionalKeywords: newKeys })
  }

  return (
    <TransitionWrapper className="bg-[#f0f0f0] text-brand-black items-center justify-center p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-bold uppercase">SECCIÓN 3</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-light">{isEmpresa ? '¿Qué proyecta tu marca?' : '¿Cómo deseas sentirte en tu hogar?'}</h2>
          <p className="text-brand-black/40 font-light italic text-sm">
             {isEmpresa ? 'Escribe palabras que representen tu identidad corporativa ideal' : 'Escribe palabras que representen tu hogar ideal'}
          </p>
        </header>

        <div className="space-y-12">
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
             {(isEmpresa ? SUGGESTIONS_EMPRESA : SUGGESTIONS_PERSONA).map(s => (
               <button 
                key={s} 
                onClick={() => {
                  const emptyIdx = phase3.emotionalKeywords.findIndex(k => !k)
                  if (emptyIdx !== -1) updateKey(emptyIdx, s)
                }}
                className="px-3 py-1 bg-white/50 border border-brand-black/5 text-[10px] tracking-widest font-bold text-brand-black/40 uppercase hover:bg-brand-gold hover:text-white transition-all"
               >
                 {s}
               </button>
             ))}
          </div>

          <div className="grid gap-4 max-w-md mx-auto">
             {phase3?.emotionalKeywords?.map((val, i) => (
               <div key={i} className="flex items-center gap-4 group">
                  <span className="text-brand-gold/30 font-playfair text-xl italic w-4">0{i+1}</span>
                  <input 
                    type="text"
                    value={val}
                    onChange={(e) => updateKey(i, e.target.value)}
                    placeholder="Tu palabra..."
                    className="w-full bg-transparent border-b border-brand-black/10 py-2 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/20"
                  />
               </div>
             ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
           <button 
            onClick={() => setPhase(14)}
            className="primary-btn min-w-[280px]"
           >
            Continuar →
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
