import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Check, ArrowRight } from 'lucide-react'

const OPTIONS = [
  { id: 'tones', title: 'Tonos', left: { label: 'Tonos Oscuros', icon: '🖤' }, right: { label: 'Tonos Claros', icon: '🤍' } },
  { id: 'garden', title: 'Espacio Exterior', left: { label: 'Jardín Privado', icon: '🪴' }, right: { label: 'Terraza Minimalista', icon: '🌿' } },
  { id: 'materials', title: 'Materiales', left: { label: 'Concreto y Piedra', icon: '🪨' }, right: { label: 'Madera y Texturas', icon: '🪵' } },
  { id: 'vibe', title: 'Ambiente', left: { label: 'Acogedor y Cálido', icon: '🔥' }, right: { label: 'Sofisticado y Frío', icon: '💎' } },
  { id: 'forms', title: 'Formas', left: { label: 'Formas Curvas', icon: '🌀' }, right: { label: 'Líneas Rectas', icon: '📐' } },
  { id: 'light', title: 'Luz', left: { label: 'Luz Natural Directa', icon: '☀️' }, right: { label: 'Luz Indirecta Suave', icon: '🕯️' } },
]

export default function FinalVoting() {
  const { setPhase, phase7, setPhase7 } = useWorkshopStore()

  const toggleVote = (category: string, value: string) => {
    const current = phase7?.votes?.[category] || []
    const newVotes = current.includes(value) 
      ? current.filter((v: string) => v !== value)
      : [...current, value]
    
    setPhase7({ votes: { ...phase7?.votes, [category]: newVotes } })
  }

  return (
    <TransitionWrapper className="bg-brand-black text-white p-6 md:p-12 overflow-y-auto bg-mesh-dark">
      <div className="max-w-6xl mx-auto w-full space-y-20 pb-40 px-6">
        <header className="space-y-6 text-center">
          <p className="text-brand-gold tracking-[0.5em] text-[10px] font-bold uppercase animate-fade">FASE 7 · CONCLUSIÓN</p>
          <h2 className="text-6xl md:text-8xl font-playfair font-light animate-slide">Este Espacio es Tuyo</h2>
          <p className="text-white/30 font-light italic max-w-2xl mx-auto leading-relaxed text-sm md:text-lg">
             “Votación de Sensaciones: elige las texturas y atmósferas que resuenan con tu esencia.”
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {OPTIONS.map((opt, i) => (
            <div 
              key={opt.id} 
              className="space-y-6 animate-fade" 
              style={{ animationDelay: `${i * 0.15}s` }}
            >
               <h3 className="text-[10px] tracking-[0.4em] font-bold text-brand-gold uppercase pl-2 border-l border-brand-gold/30">{opt.title}</h3>
               <div className="grid grid-cols-2 gap-4 h-[120px]">
                  <VoteCard 
                    label={opt.left.label} 
                    icon={opt.left.icon}
                    selected={(phase7?.votes?.[opt.id] || []).includes(opt.left.label)} 
                    onClick={() => toggleVote(opt.id, opt.left.label)} 
                  />
                  <VoteCard 
                    label={opt.right.label} 
                    icon={opt.right.icon}
                    selected={(phase7?.votes?.[opt.id] || []).includes(opt.right.label)} 
                    onClick={() => toggleVote(opt.id, opt.right.label)} 
                  />
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 bg-white/[0.02] border border-white/5 p-12 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full"></div>
           <label className="text-[10px] tracking-[0.4em] font-bold text-white/30 uppercase">Comentarios Finales</label>
           <textarea 
            value={phase7?.finalComments || ''}
            onChange={e => setPhase7({ finalComments: e.target.value })}
            placeholder="¿Qué otras sensaciones, estilos o atmósferas no viste aquí y quisieras tener en tu espacio?"
            className="premium-input text-2xl min-h-[150px] resize-none italic"
           />
        </div>

        <div className="flex flex-col items-center gap-10">
           <button 
            onClick={() => setPhase(23)}
            className="metallic-btn min-w-[400px] animate-pulse-gold scale-110"
           >
            COMPLETAR MI TALLER
           </button>
           <p className="text-[9px] tracking-[0.8em] text-white/10 font-black uppercase">Elite 24 Studio · Architectural Lab</p>
        </div>
      </div>
    </TransitionWrapper>
  )
}

function VoteCard({ label, icon, selected, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative h-full border flex flex-col items-center justify-center gap-2 transition-all duration-700 overflow-hidden
                 ${selected ? 'bg-brand-gold border-brand-gold text-black shadow-2xl shadow-brand-gold/20 scale-105' : 'bg-[#111] border-white/5 text-white/40 hover:border-brand-gold/40'}`}
    >
       <div className={`text-2xl transition-transform duration-700 ${selected ? 'scale-125' : 'grayscale group-hover:grayscale-0'}`}>
          {icon}
       </div>
       <span className={`text-[10px] tracking-widest font-bold uppercase ${selected ? 'text-black' : 'text-white/20'}`}>{label}</span>
       {selected && (
         <div className="absolute top-2 right-2 flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
         </div>
       )}
    </button>
  );
}
