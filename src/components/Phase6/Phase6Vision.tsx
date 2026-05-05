import { useState } from 'react'
import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import DrawingCanvas from '../UI/DrawingCanvas'
import { Mic, Heart } from 'lucide-react'

export default function Phase6Vision() {
  const { setPhase, phase6, setPhase6, clientInfo } = useWorkshopStore()
  const [isNarrating, setIsNarrating] = useState(false)
  const isEmpresa = clientInfo.type === 'empresa'

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-12 pb-20">
        <header className="space-y-4 text-center md:text-left">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-bold uppercase">FASE 6 · PASO FINAL</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-light">{isEmpresa ? 'Representa tu sede soñada' : 'Representa tu casa soñada'}</h2>
          <p className="text-brand-black/40 font-light italic text-sm">
            {isEmpresa ? 'Trazos, palabras, cultura, flujos... todo lo que visualizaste.' : 'Flechas, palabras, colores, formas abstractas... todo vale.'}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
              <div className="h-[500px]">
                <DrawingCanvas 
                  onSave={(data) => setPhase6({ dreamDrawing: data })} 
                  initialData={phase6.dreamDrawing}
                  placeholder="MI VISIÓN"
                />
              </div>
              
              <div className="flex items-center justify-between bg-white border border-brand-black/5 p-4 rounded-sm shadow-md">
                 <div className="flex items-center gap-3 text-brand-gold">
                    <Mic className={isNarrating ? 'animate-pulse' : ''} />
                    <span className="text-[10px] tracking-widest font-bold uppercase">Narra mientras dibujo</span>
                 </div>
                 <button 
                  onClick={() => setIsNarrating(!isNarrating)}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${isNarrating ? 'bg-brand-gold' : 'bg-brand-black/10'}`}
                 >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isNarrating ? 'translate-x-6' : ''}`}></div>
                 </button>
              </div>
           </div>

           <div className="space-y-8">
              <div className="space-y-4">
                 <label className="text-[10px] tracking-widest font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Describe la sede en tu visualización' : 'Describe cómo era tu hogar en la visualización'}</label>
                 <textarea 
                  value={phase6.narratedText} 
                  onChange={e => setPhase6({ narratedText: e.target.value })}
                  placeholder={isEmpresa ? 'Cuéntanos cómo se sentía el espacio de marca...' : 'Cuéntanos con tus palabras cómo se sentía ese hogar...'}
                  className="w-full bg-white/60 border border-brand-black/10 p-6 text-sm font-light h-[350px] resize-none focus:outline-none focus:border-brand-gold transition-colors italic leading-relaxed"
                 />
              </div>

              <div className="bg-brand-gold/5 p-6 border border-brand-gold/20 flex flex-col items-center text-center gap-4">
                 <Heart className="text-brand-gold" size={32} strokeWidth={1} />
                 <p className="text-[10px] tracking-widest font-bold text-brand-gold uppercase">{isEmpresa ? 'Sé libre, creativo y honesto. Esta es la sede de su marca.' : 'Sé libre, creativo y honesto. Esta es tu casa soñada.'}</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-12">
           <button 
            onClick={() => setPhase(21)}
            className="primary-btn min-w-[320px] flex items-center justify-center gap-3"
           >
            Generar Visión Arquitectónica IA
           </button>
           <button 
            onClick={() => setPhase(22)}
            className="text-[10px] tracking-[0.2em] font-medium text-brand-black/40 uppercase hover:text-brand-black transition-colors"
           >
            Saltar y continuar →
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
