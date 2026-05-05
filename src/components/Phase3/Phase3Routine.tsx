import { useState } from 'react'
import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Coffee, Key, Sofa, Utensils, Zap, CloudRain, Map as MapIcon, Trees, Footprints, ArrowLeft, ArrowRight, Fingerprint } from 'lucide-react'
import MicButton from '../UI/MicButton'

const QUESTIONS_PERSONA = [
  { id: 'coffee', icon: <Coffee />, title: 'El primer despertar', question: '¿Dónde tomas el primer café o té del día? ¿Cómo te gustaría que se sintiera ese momento?' },
  { id: 'arrival', icon: <Key />, title: 'El regreso al refugio', question: '¿Qué haces al llegar a casa? ¿Dónde dejas tus cosas, tus llaves, tu chaqueta?' },
  { id: 'rest', icon: <Sofa />, title: 'Desconexión', question: '¿Dónde te gusta descansar? ¿Cómo es el lugar ideal para desconectarte?' },
  { id: 'food', icon: <Utensils />, title: 'Compartir', question: '¿Te gusta cocinar, comer en familia? ¿Cómo sueñas ese espacio?' },
  { id: 'rituals', icon: <Zap />, title: 'Rituales', question: '¿Tienes rituales personales? Leer, pintar, yoga... ¿Dónde ocurren?' },
  { id: 'rain', icon: <CloudRain />, title: 'Atmósfera', question: '¿Cómo te imaginas tu casa en un día de lluvia? Descríbelo...' },
  { id: 'relations', icon: <MapIcon />, title: 'Geografía interna', question: 'Relaciones entre espacios: ¿Qué quieres cerca? ¿Privado vs Social?' },
  { id: 'exterior', icon: <Trees />, title: 'Vínculo con el afuera', question: 'Patios, balcones, terrazas... ¿Qué imaginas?' },
  { id: 'flow', icon: <Footprints />, title: 'Recorrido', question: '¿Cómo te mueves por tu casa en un día normal?' },
]

const QUESTIONS_EMPRESA = [
  { id: 'operación', icon: <Zap />, title: 'El Motor del Negocio', question: '¿Dónde ocurre la magia de su operación? ¿Cómo debe ser el ambiente de trabajo ideal?' },
  { id: 'creatividad', icon: <CloudRain />, title: 'Espacio de Innovación', question: '¿Dónde nacen las ideas? ¿Qué atmósfera necesitan para crear y colaborar?' },
  { id: 'reuniones', icon: <MapIcon />, title: 'Puntos de Encuentro', question: '¿Cómo son sus reuniones? ¿Buscan algo formal, dinámico o inspiracional?' },
  { id: 'pausas', icon: <Coffee />, title: 'Cultura y Bienestar', question: '¿Cómo son los momentos de pausa del equipo? ¿Dónde recargan energía?' },
  { id: 'branding', icon: <Fingerprint />, title: 'Identidad Espacial', question: '¿Cómo debe recibir el espacio a un cliente para que sienta su marca de inmediato?' },
  { id: 'flujo_trabajo', icon: <Footprints />, title: 'Flujo de Trabajo', question: '¿Cómo se mueve la información y las personas en su oficina? ¿Qué áreas deben estar conectadas?' },
]

export default function Phase3Routine() {
  const { setPhase, phase3, setPhase3, clientInfo } = useWorkshopStore()
  const [currentIdx, setCurrentIdx] = useState(0)
  const isEmpresa = clientInfo.type === 'empresa'
  const questions = isEmpresa ? QUESTIONS_EMPRESA : QUESTIONS_PERSONA

  const currentQ = questions[currentIdx]

  const updateAnswer = (text: string) => {
    setPhase3({
      routine: { ...phase3?.routine, [currentQ.id]: text }
    })
  }

  const isLast = currentIdx === questions.length - 1

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center justify-center p-6 md:p-12 bg-mesh-dark">
      <div className="max-w-4xl w-full space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold tracking-[0.4em] text-[10px] font-bold uppercase animate-fade">SECCIÓN 2 · {isEmpresa ? 'DINÁMICAS' : 'TU RUTINA'}</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light animate-slide">{isEmpresa ? 'Cuéntanos cómo trabajan' : 'Cuéntanos cómo vives'}</h2>
          <div className="flex items-center justify-center gap-2 text-white/20">
             {questions.map((_, i) => (
                <div key={i} className={`h-1 transition-all duration-500 ${i === currentIdx ? 'w-8 bg-brand-gold' : 'w-2 bg-white/10'}`}></div>
             ))}
          </div>
        </header>

        <div className="bg-white/[0.02] border border-white/5 p-10 md:p-20 shadow-2xl space-y-10 relative group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
          
          <div className="flex flex-col items-center gap-8 text-center">
             <div className="w-20 h-20 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-700">
                {currentQ.icon}
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-playfair tracking-wide uppercase">{currentQ.title}</h3>
                <p className="text-white/40 italic font-light leading-relaxed max-w-lg mx-auto">{currentQ.question}</p>
             </div>
          </div>

          <div className="relative space-y-4" key={currentQ.id}>
            <textarea 
              value={phase3?.routine?.[currentQ.id] || ''}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder="Habla o escribe tu respuesta aquí..."
              className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl font-light focus:outline-none focus:border-brand-gold transition-all min-h-[150px] resize-none italic placeholder:text-white/5"
            />
            <div className="flex justify-end">
               <MicButton 
                 value={phase3?.routine?.[currentQ.id] || ''} 
                 onChange={(text) => updateAnswer(text)} 
               />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8">
           <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="flex items-center gap-3 text-white/20 hover:text-white disabled:opacity-0 transition-all uppercase text-[10px] tracking-widest"
           >
            <ArrowLeft size={16} /> Anterior
           </button>

           {isLast ? (
             <button 
              onClick={() => setPhase(13)}
              className="primary-btn min-w-[250px]"
             >
                Continuar
             </button>
           ) : (
             <button 
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="metallic-btn !px-8 hover:tracking-widest"
             >
                Siguiente <ArrowRight size={16} className="inline ml-2" />
             </button>
           )}
        </div>
      </div>
    </TransitionWrapper>
  )
}
