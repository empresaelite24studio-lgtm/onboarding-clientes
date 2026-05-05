import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import DrawingCanvas from '../UI/DrawingCanvas'

export default function Phase3Sketch() {
  const { setPhase, phase3, setPhase3 } = useWorkshopStore()

  return (
    <TransitionWrapper className="bg-[#f0f0f0] text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <header className="space-y-2 text-center md:text-left">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-bold uppercase">SECCIÓN 1</p>
          <h2 className="text-3xl md:text-5xl font-playfair">Dibuja tu espacio soñado</h2>
          <p className="text-brand-black/50 font-light text-sm">
            Usa los marcadores, lápiz o resaltador. Esquemas, símbolos, palabras, flechas... todo vale.
          </p>
        </header>

        <div className="relative group">
          <DrawingCanvas 
            onSave={(data) => setPhase3({ canvasBase64: data })} 
            initialData={phase3.canvasBase64}
            placeholder="PIZARRA LIBRE"
          />
          <div className="absolute -bottom-4 -right-4 py-2 px-4 bg-brand-black text-brand-gold text-[10px] tracking-widest font-bold uppercase shadow-xl">
             Boceto de mi vida
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-12">
           <button 
            disabled={!phase3.canvasBase64}
            onClick={() => setPhase(12)}
            className={`primary-btn min-w-[280px] ${!phase3.canvasBase64 ? 'opacity-30' : ''}`}
           >
            Continuar
           </button>
           <button 
             onClick={() => setPhase(12)}
             className="text-[10px] tracking-widest font-bold text-brand-black/30 uppercase hover:text-brand-black transition-colors"
           >
             Saltar este paso
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
