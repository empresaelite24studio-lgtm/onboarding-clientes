import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'

export default function Phase2Moodboard() {
  const { setPhase, phase2, setPhase2, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  const updateEmotion = (id: string, text: string) => {
    setPhase2({
      imageEmotions: { ...phase2.imageEmotions, [id]: text }
    })
  }

  const isComplete = phase2.selectedImages.every(img => phase2.imageEmotions[img.id]?.trim().length > 1)

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-12 pb-32">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-xs font-semibold uppercase">{isEmpresa ? 'FASE 2 · ADN DE MARCA' : 'FASE 2 · MOODBOARD'}</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-light">{isEmpresa ? 'Define el sentimiento corporativo' : 'Escribe una emoción por imagen'}</h2>
          <div className="flex items-center justify-center gap-4 text-[10px] tracking-widest font-bold text-brand-black/40 uppercase">
             <span>PROGRESO</span>
             <div className="w-48 h-1 bg-brand-black/5 overflow-hidden">
                <div 
                  className="h-full bg-brand-gold transition-all duration-500" 
                  style={{ width: `${(Object.keys(phase2.imageEmotions).filter(k => phase2.imageEmotions[k]).length / phase2.selectedImages.length) * 100}%` }}
                ></div>
             </div>
             <span className="text-brand-gold">{Object.keys(phase2.imageEmotions).filter(k => phase2.imageEmotions[k]).length}/{phase2.selectedImages.length} PALABRAS</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {phase2?.selectedImages?.map((img, idx) => (
             <div key={img.id} className="group flex flex-col space-y-4 bg-white/40 p-4 border border-brand-black/5 shadow-lg transition-all hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden relative">
                   <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" title={img.title} />
                   <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-brand-black/80 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">
                      {idx + 1}
                   </span>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] tracking-widest font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Atributo de marca:' : 'Sensación que evoca:'}</label>
                   <input 
                    type="text" 
                    value={phase2.imageEmotions[img.id] || ''}
                    onChange={(e) => updateEmotion(img.id, e.target.value)}
                    placeholder="Escribe una emoción..."
                    className="w-full bg-transparent border-b border-brand-black/10 py-2 text-sm font-medium focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/20 italic"
                   />
                </div>
             </div>
           ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-brand-cream/90 backdrop-blur-md p-8 border-t border-brand-black/5 flex justify-center z-40">
           <button 
            disabled={!isComplete}
            onClick={() => setPhase(9)}
            className={`primary-btn min-w-[320px] transition-all ${!isComplete ? 'opacity-30' : 'animate-slide-up shadow-xl shadow-brand-gold/20'}`}
           >
            Continuar
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
