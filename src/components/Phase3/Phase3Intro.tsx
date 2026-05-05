import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Palette, HelpCircle, Fingerprint } from 'lucide-react'

export default function Phase3Intro() {
  const { setPhase, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  return (
    <TransitionWrapper className="bg-[#f0f0f0] text-brand-black items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl w-full space-y-16">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-xs font-semibold uppercase">FASE 3</p>
          <h2 className="text-4xl md:text-7xl font-playfair font-light">{isEmpresa ? 'Boceta Tu Marca' : 'Boceta Tu Vida'}</h2>
          <p className="text-2xl md:text-3xl font-playfair italic text-brand-gold">
            “{isEmpresa ? 'Mi Espacio Corporativo, Mi Propósito' : 'Mi Espacio, Mis Emociones'}”
          </p>
        </header>

        <div className="bg-white p-8 md:p-12 border border-brand-black/5 shadow-xl space-y-6 text-center italic font-light text-brand-black/70">
           <p className="text-lg md:text-xl">
             “Aquí no se trata de saber dibujar ‘bien’ ni seguir reglas. Se trata de expresar lo que necesitas y sueñas a través del dibujo, la palabra y las emociones. Nuestro equipo se encargará de traducir esto en arquitectura.”
           </p>
           <p className="text-sm">
             Puedes hacer esquemas, dibujos, trazos, palabras, símbolos o incluso collages.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
           <div className="bg-white/60 p-6 border border-brand-black/5 text-center space-y-4 group hover:border-brand-gold/30 transition-all">
              <Palette className="mx-auto text-brand-gold/60 group-hover:text-brand-gold transition-colors" size={32} strokeWidth={1} />
              <h4 className="font-playfair text-lg">Pizarra libre</h4>
              <p className="text-xs text-brand-black/40 uppercase tracking-widest font-bold">Dibuja sin límites</p>
           </div>
           <div className="bg-white/60 p-6 border border-brand-black/5 text-center space-y-4 group hover:border-brand-gold/30 transition-all">
              <HelpCircle className="mx-auto text-brand-gold/60 group-hover:text-brand-gold transition-colors" size={32} strokeWidth={1} />
              <h4 className="font-playfair text-lg">{isEmpresa ? 'Preguntas estratégicas' : 'Preguntas guía'}</h4>
              <p className="text-xs text-brand-black/40 uppercase tracking-widest font-bold">{isEmpresa ? 'Sobre flujos de trabajo' : 'Sobre tu rutina y hábitos'}</p>
           </div>
           <div className="bg-white/60 p-6 border border-brand-black/5 text-center space-y-4 group hover:border-brand-gold/30 transition-all">
              <Fingerprint className="mx-auto text-brand-gold/60 group-hover:text-brand-gold transition-colors" size={32} strokeWidth={1} />
              <h4 className="font-playfair text-lg">Palabras clave</h4>
              <p className="text-xs text-brand-black/40 uppercase tracking-widest font-bold">{isEmpresa ? 'ADN de tu marca' : 'Tu identidad del hogar'}</p>
           </div>
        </div>

        <div className="flex justify-center">
           <button 
            onClick={() => setPhase(11)}
            className="primary-btn min-w-[280px]"
           >
            Comenzar →
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
