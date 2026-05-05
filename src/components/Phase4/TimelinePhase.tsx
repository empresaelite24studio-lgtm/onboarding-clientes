import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { Plus, Trash2, MapPin } from 'lucide-react'

export default function TimelinePhase() {
  const { setPhase, phase4, updatePlace, addPlace, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  return (
    <TransitionWrapper className="bg-brand-black text-white p-6 md:p-12 overflow-y-auto min-h-screen">
      <div className="max-w-5xl mx-auto w-full space-y-12 pb-32">
        <header className="space-y-4 text-center md:text-left pt-10">
          <p className="text-brand-gold tracking-[0.3em] text-[10px] font-bold uppercase animate-fade">{isEmpresa ? 'FASE 4 · TRAYECTORIA' : 'FASE 4 · RECORRIDO'}</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light animate-slide">{isEmpresa ? 'Trayectoria de Marca' : 'Línea del Tiempo'}</h2>
          <p className="text-brand-gold font-playfair italic text-xl">“{isEmpresa ? 'Así ha evolucionado nuestra visión' : 'Así me he movido por el mundo'}”</p>
          <p className="text-white/40 font-light max-w-3xl leading-relaxed text-sm">
            {isEmpresa 
              ? 'Ubica los hitos, sedes o momentos clave en la historia de la empresa. Por cada uno, comparte un valor, un logro y la cultura que se respiraba.' 
              : 'Ubica los lugares donde has vivido o pasado mucho tiempo. Por cada uno, comparte una palabra, un recuerdo, y lo que tus sentidos recuerdan.'}
          </p>
        </header>

        <div className="space-y-16 py-12 relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-brand-gold/10 hidden md:block"></div>

          {phase4?.places?.map((place, idx) => (
            <div key={place.id} className="relative pl-0 md:pl-16 space-y-6 group animate-fade" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-[#0a0a0a] border border-brand-gold/30 flex items-center justify-center text-brand-gold z-10 hidden md:flex shadow-[0_0_20px_rgba(197,160,89,0.1)]">
                   <MapPin size={18} />
                </div>
                
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-8 md:p-10 shadow-2xl space-y-8 relative group-hover:border-brand-gold/20 transition-all duration-700">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[9px] tracking-[0.3em] font-bold text-white/20 uppercase">{isEmpresa ? 'Nombre del Hito / Sede' : 'Nombre del lugar'}</label>
                         <input 
                          type="text" 
                          value={place.name} 
                          onChange={e => updatePlace(place.id, { name: e.target.value })}
                          placeholder={isEmpresa ? 'Fundación, Nueva Sede...' : 'Bogotá, Lisboa...'}
                          className="w-full bg-transparent border-b border-white/10 py-3 text-2xl font-light focus:outline-none focus:border-brand-gold transition-all placeholder:text-white/5"
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[9px] tracking-[0.3em] font-bold text-white/20 uppercase">Año o Época</label>
                         <input 
                          type="text" 
                          value={place.year} 
                          onChange={e => updatePlace(place.id, { year: e.target.value })}
                          placeholder={isEmpresa ? 'Ej: 2015, Etapa inicial' : 'Ej: Infancia, 2010 - 2015'}
                          className="w-full bg-transparent border-b border-white/10 py-3 text-2xl font-light focus:outline-none focus:border-brand-gold transition-all placeholder:text-white/5"
                         />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[9px] tracking-[0.3em] font-bold text-white/20 uppercase">{isEmpresa ? 'Un valor corporativo' : 'Una palabra clave'}</label>
                      <input 
                        type="text" 
                        value={place.keyword} 
                        onChange={e => updatePlace(place.id, { keyword: e.target.value })}
                        placeholder={isEmpresa ? 'Innovación, Resiliencia...' : 'Refugio, Caos, Libertad...'}
                        className="w-full bg-transparent border-b border-white/10 py-3 text-xl font-light focus:outline-none focus:border-brand-gold italic placeholder:text-white/5"
                      />
                   </div>

                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[9px] tracking-[0.3em] font-bold text-white/20 uppercase">{isEmpresa ? 'Un logro esencial' : 'Un recuerdo esencial'}</label>
                         <textarea 
                          value={place.memory} 
                          onChange={e => updatePlace(place.id, { memory: e.target.value })}
                          placeholder={isEmpresa ? 'Primer gran contrato...' : 'Aquella mañana de lluvia...'}
                          className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm font-light focus:outline-none focus:border-brand-gold/30 min-h-[120px] resize-none italic leading-relaxed"
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[9px] tracking-[0.3em] font-bold text-white/20 uppercase">{isEmpresa ? 'Cultura Organizacional' : 'Atmósfera Sensorial'}</label>
                         <textarea 
                          value={place.sensory} 
                          onChange={e => updatePlace(place.id, { sensory: e.target.value })}
                          placeholder={isEmpresa ? 'Ambiente colaborativo, dinámico...' : 'Olores a madera, sonidos lejanos...'}
                          className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm font-light focus:outline-none focus:border-brand-gold/30 min-h-[120px] resize-none italic leading-relaxed"
                         />
                      </div>
                   </div>

                   <button 
                    onClick={() => {
                        const newPlaces = phase4.places.filter(p => p.id !== place.id)
                        useWorkshopStore.setState((s) => ({ phase4: { places: newPlaces } }))
                    }} 
                    className="absolute top-6 right-6 text-white/5 hover:text-red-900 transition-colors"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
            </div>
          ))}

          {phase4.places.length === 0 && (
             <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/5 rounded-sm animate-pulse">
                <p className="text-white/10 font-playfair italic text-4xl mb-6">{isEmpresa ? 'Su trayectoria empieza aquí' : 'Tu historia empieza aquí'}</p>
                <div className="h-[1px] w-12 bg-brand-gold/20 mx-auto mb-6"></div>
                <p className="text-[9px] tracking-[0.4em] text-brand-gold font-bold uppercase transition-all">{isEmpresa ? 'Agrega el primer hito de su marca' : 'Agrega el primer lugar donde viviste'}</p>
             </div>
          )}

          <div className="flex justify-center pt-12">
             <button 
              onClick={addPlace}
              className="group flex items-center gap-4 px-10 py-5 border border-brand-gold/40 text-brand-gold text-[10px] tracking-[0.4em] font-bold uppercase bg-brand-gold/5 hover:bg-brand-gold hover:text-black transition-all duration-700 shadow-2xl relative overflow-hidden"
             >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" /> {isEmpresa ? 'Agregar nuevo hito' : 'Agregar nuevo escenario'}
             </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 pt-20">
           <button 
            onClick={() => setPhase(16)}
            className="primary-btn min-w-[380px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
           >
            Avanzar a Fase 5 →
           </button>
           <p className="text-[9px] tracking-[0.3em] font-bold text-white/10 uppercase">Hacia el diseño de tu futuro</p>
        </div>
      </div>
    </TransitionWrapper>
  )
}
