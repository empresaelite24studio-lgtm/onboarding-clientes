import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Eye, CloudRain, Layout } from 'lucide-react'

export default function Phase2Intro() {
  const { setPhase, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl w-full space-y-16">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold/80 tracking-[0.3em] text-xs font-semibold uppercase">
            FASE 2
          </p>
          <h2 className="text-4xl md:text-7xl font-playfair font-light">{isEmpresa ? 'Inspiración de Marca' : 'Moodboard de Emociones'}</h2>
          <p className="text-2xl md:text-3xl font-playfair italic text-brand-gold">
            “{isEmpresa ? 'Mi marca se siente como...' : 'Mi casa ideal se siente como...' }”
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4 text-center group">
            <div className="w-16 h-16 mx-auto rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/5 transition-all">
              <Eye className="text-brand-gold" size={28} strokeWidth={1} />
            </div>
            <h3 className="font-playfair text-xl tracking-wide">1. {isEmpresa ? 'Analiza el ADN' : 'Cierra los ojos'}</h3>
            <p className="text-sm font-light text-brand-black/60 leading-relaxed">
              {isEmpresa ? 'Imagina el impacto que quieres causar en tus clientes y equipo. Cómo se respira tu marca.' : 'Por unos segundos, imagina cómo se siente tu hogar ideal. No cómo se ve — cómo se siente.'}
            </p>
          </div>

          <div className="space-y-4 text-center group">
            <div className="w-16 h-16 mx-auto rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/5 transition-all">
              <CloudRain className="text-brand-gold" size={28} strokeWidth={1} />
            </div>
            <h3 className="font-playfair text-xl tracking-wide">2. Piensa en sensaciones</h3>
            <p className="text-sm font-light text-brand-black/60 leading-relaxed">
              {isEmpresa ? 'Identifica imágenes que proyecten los valores y la cultura de tu empresa.' : 'Identifica imágenes, colores, texturas o paisajes que se relacionen con ese sentimiento.'}
            </p>
          </div>

          <div className="space-y-4 text-center group">
            <div className="w-16 h-16 mx-auto rounded-full border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/5 transition-all">
              <Layout className="text-brand-gold" size={28} strokeWidth={1} />
            </div>
            <h3 className="font-playfair text-xl tracking-wide">3. Construye tu moodboard</h3>
            <p className="text-sm font-light text-brand-black/60 leading-relaxed">
              Elige las imágenes que representen lo que sientes y asígnales una palabra {isEmpresa ? 'de marca' : 'emocional'}.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 pt-8">
          <div className="bg-white/40 border border-brand-gold/20 px-6 py-3 rounded-full flex items-center gap-3">
             <span className="text-brand-gold text-lg">💡</span>
             <p className="text-xs tracking-[0.1em] font-medium uppercase text-brand-black/60">
               Consejo: <span className="text-brand-black">No pienses en “estilo”, piensa en “sentimiento”</span>
             </p>
          </div>

          <button 
            onClick={() => setPhase(7)}
            className="primary-btn min-w-[280px]"
          >
            Explorar imágenes
          </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
