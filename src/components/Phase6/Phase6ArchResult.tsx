import { useEffect, useState } from 'react'
import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { generateArchitecturalVision } from '../../utils/iaService'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Phase6ArchResult() {
  const { setPhase, phase6, setPhase6 } = useWorkshopStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate IA processing
    const timer = setTimeout(() => {
      const state = useWorkshopStore.getState()
      const vision = generateArchitecturalVision(state)
      setPhase6({ iaVision: vision })
      setLoading(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <TransitionWrapper className="bg-brand-black text-white items-center justify-center p-6">
        <div className="space-y-8 flex flex-col items-center max-w-md text-center">
          <div className="relative">
             <div className="w-24 h-24 border border-brand-gold/30 rounded-full animate-ping opacity-20"></div>
             <Sparkles className="absolute inset-0 m-auto text-brand-gold animate-pulse" size={32} />
          </div>
          <div className="space-y-4">
             <p className="text-brand-gold tracking-[0.4em] text-[10px] font-bold uppercase">Interpretando tu casa soñada...</p>
             <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">
               La IA está convirtiendo tu boceto y visión en una propuesta realista...
             </p>
          </div>
        </div>
      </TransitionWrapper>
    )
  }

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-12 pb-20">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-[10px] font-semibold uppercase">RESULTADO FASE 6</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light">Aproximación Arquitectónica</h2>
          <p className="text-brand-gold font-playfair italic text-lg md:text-xl">
            Elite 24 Studio
          </p>
        </header>

        <div className="bg-white p-10 md:p-20 border border-brand-black/5 shadow-2xl space-y-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-brand-gold to-transparent"></div>
           
           <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-4 text-brand-gold/40">
                 <Sparkles size={20} />
                 <span className="text-[10px] tracking-[0.4em] font-bold uppercase">Visión de nuestro laboratorio</span>
              </div>

              <div className="prose prose-brand max-w-none">
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-brand-black/80 italic">
                  {phase6.iaVision}
                </p>
              </div>

              <div className="pt-12 border-t border-brand-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="text-[10px] tracking-widest font-bold text-brand-black/20 uppercase">
                    Esta es una aproximación inicial · El diseño final se desarrollará juntos
                 </div>
                 <div className="flex gap-4">
                    <img src="/logo.png" className="h-8 object-contain invert opacity-20" />
                 </div>
              </div>
           </div>
        </div>

        <div className="flex justify-center pt-12">
           <button 
            onClick={() => setPhase(22)}
            className="flex items-center gap-4 primary-btn min-w-[320px]"
           >
            Continuar a Fase 7 <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
