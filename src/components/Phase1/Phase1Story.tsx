import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Sparkles, ArrowRight, Quote } from 'lucide-react'
import MicButton from '../UI/MicButton'

export default function Phase1Story() {
  const { setPhase, phase1, setPhase1, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  const updateReflection = (word: string, text: string) => {
    setPhase1({
      reflections: { ...phase1.reflections, [word]: text }
    })
  }

  // ALLOW SHORT REFLECTIONS (min 2 chars)
  const isComplete = phase1.selectedWords.every(word => (phase1.reflections[word] || '').trim().length >= 2)

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center justify-center p-6 md:p-12 overflow-y-auto bg-mesh-dark">
      <div className="max-w-4xl w-full space-y-16 pb-40">
        <header className="space-y-6 text-center">
          <p className="text-brand-gold/60 tracking-[0.5em] text-[10px] font-bold uppercase animate-fade">{isEmpresa ? 'LA ESENCIA DE TU MARCA' : 'LA ESENCIA DE TU HOGAR'}</p>
          <h2 className="text-5xl md:text-7xl font-playfair font-light animate-slide">{isEmpresa ? 'Tus Valores, Tu Identidad' : 'Tus Palabras, Tu Historia'}</h2>
          <p className="text-white/30 font-light italic max-w-2xl mx-auto leading-relaxed text-sm">
             “{isEmpresa ? 'Cada valor elegido es un pilar de la cultura que daremos forma en arquitectura corporativa.' : 'Cada palabra elegida es un fragmento de tu alma que daremos forma en arquitectura.'}”
          </p>
        </header>

        <div className="space-y-12">
          {phase1?.selectedWords?.map((word, idx) => (
            <div key={word} className="group relative bg-white/[0.02] border border-white/5 p-10 md:p-14 transition-all duration-700 hover:border-brand-gold/30 hover:bg-white/[0.03]">
               <div className="absolute -top-6 -left-6 text-8xl font-playfair italic text-white/[0.02] select-none group-hover:text-brand-gold/5 transition-colors">
                  0{idx + 1}
               </div>
               
               <div className="space-y-8 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <div className="h-[1px] w-12 bg-brand-gold"></div>
                       <h3 className="text-3xl md:text-4xl font-playfair tracking-widest uppercase text-brand-gold font-light">{word}</h3>
                    </div>
                    <MicButton 
                      value={phase1.reflections[word] || ''} 
                      onChange={(text) => updateReflection(word, text)} 
                    />
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 text-brand-gold/5 w-12 h-12" />
                    <textarea 
                      value={phase1.reflections[word] || ''}
                      onChange={(e) => updateReflection(word, e.target.value)}
                      placeholder="Escribe aquí tu reflexión o dicta con el micrófono..."
                      className="w-full bg-transparent border-none p-0 text-xl md:text-2xl font-light focus:outline-none placeholder:text-white/5 min-h-[120px] resize-none italic leading-relaxed text-white/80"
                    />
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8 pt-12">
           <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[9px] tracking-[0.4em] font-bold text-white/20 uppercase">
                 Nuestra IA interpretará tu narrativa para el perfil emocional
              </p>
           </div>
           
           <button 
            disabled={!isComplete}
            onClick={() => setPhase(5)}
            className={`metallic-btn min-w-[350px] group ${!isComplete ? 'opacity-20 cursor-not-allowed' : 'animate-pulse-gold scale-110'}`}
           >
            <span className="flex items-center justify-center gap-3">
               <Sparkles size={16} /> GENERAR REFLEXIÓN IA
            </span>
           </button>
           
           {isComplete && (
             <button 
              onClick={() => setPhase(5)}
              className="flex items-center gap-3 text-white/20 hover:text-brand-gold transition-all duration-500 text-[10px] tracking-[0.3em] font-bold uppercase hover:tracking-[0.4em]"
             >
                CONTINUAR AL PERFIL <ArrowRight size={14} />
             </button>
           )}
        </div>
      </div>
    </TransitionWrapper>
  )
}
