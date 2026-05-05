import { useEffect, useState } from 'react'
import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { generateEmotionalReflection } from '../../utils/iaService'
import { Volume2, ArrowRight, Quote } from 'lucide-react'

export default function Phase1Profile() {
  const { setPhase, phase1, setPhase1, clientInfo } = useWorkshopStore()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const isEmpresa = clientInfo.type === 'empresa'

  useEffect(() => {
    const timer = setTimeout(() => {
      const generated = generateEmotionalReflection(
        clientInfo.fullName,
        phase1.selectedWords,
        phase1.reflections,
        clientInfo.type as any
      )
      setResult(generated)
      setPhase1({ iaReflection: generated.reflection })
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [clientInfo.fullName, phase1.selectedWords, phase1.reflections, setPhase1, clientInfo.type])

  if (loading) {
    return (
      <TransitionWrapper className="bg-brand-cream text-brand-black items-center justify-center p-6">
        <div className="space-y-8 flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-brand-gold tracking-[0.6em] text-[10px] font-bold animate-pulse uppercase">{isEmpresa ? 'Interpretando el ADN de marca...' : 'Interpretando tu esencia...'}</p>
        </div>
      </TransitionWrapper>
    )
  }

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-20 pb-40 px-6">
        <header className="space-y-6 text-center">
          <p className="text-brand-gold tracking-[0.4em] text-[10px] font-bold uppercase animate-fade">RESULTADO FASE 1</p>
          <h2 className="text-5xl md:text-7xl font-playfair font-light animate-slide">{isEmpresa ? 'Tu Perfil de Marca' : 'Tu Perfil Emocional'}</h2>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-8 bg-brand-gold/40"></div>
             <p className="text-brand-black italic font-playfair text-xl md:text-2xl">
               {clientInfo.fullName} · {isEmpresa ? 'Taller Mi Marca en Palabras' : 'Taller Mi Vida en Palabras'}
             </p>
             <div className="h-[1px] w-8 bg-brand-gold/40"></div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {phase1?.selectedWords?.map((word, i) => (
            <div 
               key={word} 
               className="bg-white p-10 border border-brand-black/5 shadow-xl flex flex-col items-center text-center space-y-6 hover:-translate-y-1 transition-all duration-700"
               style={{ animationDelay: `${i * 0.2}s` }}
            >
              <h3 className="text-2xl font-playfair tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/10 pb-4 w-full">{word}</h3>
              <p className="text-sm font-light text-brand-black/60 italic leading-relaxed px-2">
                "{phase1.reflections[word] || 'Una búsqueda de equilibrio y armonía en el espacio cotidiano.'}"
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 md:p-20 shadow-[-40px_40px_80px_rgba(var(--brand-black),0.05)] relative border border-brand-black/5">
          <Quote className="absolute top-10 left-10 text-brand-gold/5 w-32 h-32 -z-10" />
          
          <div className="space-y-12 relative">
            <h4 className="text-[10px] tracking-[0.4em] font-bold text-brand-gold uppercase border-l-2 border-brand-gold pl-6">Reflexión de Elite 24 Studio</h4>
            
            <div className="max-w-3xl">
              <p className="text-2xl md:text-3xl font-light leading-[1.6] text-brand-black/80 whitespace-pre-line italic font-playfair">
                {result.reflection}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-20 border-t border-brand-black/10">
          <button className="flex items-center gap-6 group">
            <div className="w-16 h-16 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-700 shadow-xl shadow-brand-gold/5">
              <Volume2 size={24} strokeWidth={1.5} className="animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-[10px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">Música de reflexión</p>
              <p className="text-lg font-light tracking-tight group-hover:text-brand-gold transition-colors">Reproducir ambiente sonoro</p>
            </div>
          </button>

          <button 
            onClick={() => setPhase(6)}
            className="metallic-btn group !text-brand-black hover:!text-white border-brand-black/10 hover:border-brand-gold"
          >
            CONTINUAR FASE 2: MOODBOARD 
          </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
