import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import DrawingCanvas from '../UI/DrawingCanvas'
import { Palette, Share2, Heart, Zap, Sparkles, Fingerprint } from 'lucide-react'

const SPACES_PERSONA = [
  { id: 'crear', icon: <Palette size={20}/>, title: 'Espacio para crear', sub: 'arte, música, lectura...' },
  { id: 'compartir', icon: <Share2 size={20}/>, title: 'Espacio para compartir', sub: 'comidas, conversaciones, fiestas...' },
  { id: 'ti-mism@', icon: <Heart size={20}/>, title: 'Espacio para estar contigo mism@', sub: 'meditar, descansar, pensar...' },
  { id: 'cuerpo', icon: <Zap size={20}/>, title: 'Espacio para el cuerpo', sub: 'ejercicio, yoga, estiramiento...' },
  { id: 'alma', icon: <Sparkles size={20}/>, title: 'Espacio para el alma', sub: 'espiritualidad, conexión, naturaleza...' },
]

const SPACES_EMPRESA = [
  { id: 'liderazgo', icon: <Fingerprint size={20}/>, title: 'Espacio de Liderazgo', sub: 'toma de decisiones, estrategia...' },
  { id: 'colaboración', icon: <Share2 size={20}/>, title: 'Espacio de Colaboración', sub: 'brainstorming, trabajo en equipo...' },
  { id: 'enfoque', icon: <Zap size={20}/>, title: 'Espacio de Enfoque', sub: 'concentración, análisis, producción...' },
  { id: 'cultura', icon: <Heart size={20}/>, title: 'Espacio de Cultura', sub: 'integración, valores, identidad...' },
  { id: 'expansión', icon: <Sparkles size={20}/>, title: 'Espacio de Expansión', sub: 'proyección, ventas, networking...' },
]

export default function Phase3Purpose() {
  const { setPhase, phase3, setPhase3, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'
  const spaces = isEmpresa ? SPACES_EMPRESA : SPACES_PERSONA

  const updateSpace = (id: string, text: string) => {
    setPhase3({
      purposeSpaces: { ...phase3.purposeSpaces, [id]: text }
    })
  }

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center overflow-y-auto overflow-x-hidden">
      <div className="max-w-5xl mx-auto w-full py-20 px-6 space-y-20">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold tracking-[0.3em] text-[10px] font-bold uppercase animate-fade leading-relaxed">SECCIÓN 4 · {isEmpresa ? 'ESTRATEGIA' : 'PROPÓSITOS'}</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light animate-slide">{isEmpresa ? '¿Qué áreas son vitales para tu marca?' : '¿Qué espacios son importantes para ti?'}</h2>
          <p className="text-white/40 font-light italic text-sm animate-fade max-w-2xl mx-auto">
             "{isEmpresa ? 'El espacio es la herramienta más poderosa para potenciar la cultura organizacional.' : 'El diseño no es lo que ves, sino lo que experimentas.'}"
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
           {spaces.map((space) => (
             <div 
                key={space.id} 
                className="bg-white/5 backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-xl space-y-6 hover:shadow-2xl transition-all duration-700 hover:border-brand-gold/30"
             >
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                      {space.icon}
                   </div>
                   <div>
                      <h4 className="font-playfair text-xl tracking-tight">{space.title}</h4>
                      <p className="text-[10px] tracking-widest font-bold text-white/30 uppercase">{space.sub}</p>
                   </div>
                </div>
                <textarea 
                  value={phase3.purposeSpaces[space.id] || ''}
                  onChange={(e) => updateSpace(space.id, e.target.value)}
                  placeholder={isEmpresa ? 'Describe el propósito de este área...' : 'Describe aquí cómo lo sueñas...'}
                  className="w-full bg-white/5 border-b border-white/10 p-4 text-sm font-light focus:outline-none focus:border-brand-gold transition-colors min-h-[120px] resize-none italic leading-relaxed"
                />
             </div>
           ))}
        </div>

        <div className="pt-20 space-y-12 max-w-4xl mx-auto bg-brand-gold/5 p-12 border border-brand-gold/10">
           <header className="text-center space-y-4">
              <h3 className="text-3xl md:text-5xl font-playfair font-light">{isEmpresa ? '¿Qué gran propósito define este proyecto?' : '¿Qué emoción principal quieres sentir?'}</h3>
              <p className="text-brand-gold/40 font-light italic text-[10px] uppercase tracking-widest font-bold">{isEmpresa ? 'Escríbelo como un concepto de marca' : 'Escríbela en grande o dibújala como un símbolo'}</p>
           </header>

           <div className="space-y-8">
              <input 
                type="text"
                value={phase3.mainEmotion}
                onChange={(e) => setPhase3({ mainEmotion: e.target.value })}
                placeholder="Ej: PAZ, REFUGIO, ABUNDANCIA..."
                className="w-full bg-transparent border-b border-white/10 py-6 text-4xl md:text-7xl text-center font-playfair font-light focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/5 uppercase tracking-tighter"
              />

              <div className="h-[400px] border border-white/10 rounded-sm overflow-hidden">
                <DrawingCanvas 
                  onSave={(data) => setPhase3({ mainEmotionDrawing: data })} 
                  initialData={phase3.mainEmotionDrawing}
                  placeholder="SÍMBOLO"
                  height="100%"
                />
              </div>
           </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-12 pb-32">
           <button 
            onClick={() => setPhase(15)}
            className="primary-btn min-w-[350px] shadow-2xl hover:-translate-y-1 transition-all"
           >
            Completar Fase 3 →
           </button>
           <p className="text-[10px] tracking-[0.3em] font-bold text-white/20 uppercase">Elite 24 Studio · Architectural Lab</p>
        </div>
      </div>
    </TransitionWrapper>
  )
}
