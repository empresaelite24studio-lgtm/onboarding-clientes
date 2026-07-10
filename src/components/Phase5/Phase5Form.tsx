import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import DrawingCanvas from '../UI/DrawingCanvas'
import MicButton from '../UI/MicButton'
import { Sparkles, Camera, PenTool, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

export default function Phase5Form() {
  const { setPhase, phase5, setPhase5, clientInfo } = useWorkshopStore()
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const isEmpresa = clientInfo.type === 'empresa'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'upload' | 'draw'>('upload')

  const updateField = (field: string, value: string) => {
    setPhase5({ [field]: value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhase5({ image: event.target?.result as string })
        setMode('upload')
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-16 pb-40">
        <header className="space-y-4 text-center">
          <p className="text-brand-gold tracking-[0.3em] text-[10px] font-bold uppercase animate-fade leading-relaxed">FASE 5 · EL ADN DEL ESPACIO</p>
          <h2 className="text-4xl md:text-6xl font-playfair font-light animate-slide">{isEmpresa ? 'El Elemento de Marca' : 'El Objeto Emocional'}</h2>
          <p className="text-brand-black/40 font-light italic text-sm animate-fade">
            {isEmpresa ? 'Definan ese símbolo que narra su trayectoria' : 'Cuéntanos sobre ese objeto que tiene un lugar especial en tu vida'}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Nombre del Elemento' : 'Nombre del Objeto'}</label>
                <input
                  type="text"
                  value={phase5.objectName}
                  onChange={(e) => updateField('objectName', e.target.value)}
                  placeholder={isEmpresa ? 'Ej: Primer Logotipo, Trofeo, Mueble icónico...' : 'Ej: Reloj de mi abuelo, Pintura favorita...'}
                  className="w-full bg-transparent border-b border-brand-black/10 py-4 text-3xl font-light focus:outline-none focus:border-brand-gold transition-all placeholder:text-brand-black/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Su valor para la marca' : '¿Por qué es especial?'}</label>
                <input
                  type="text"
                  value={phase5.emotion}
                  onChange={(e) => updateField('emotion', e.target.value)}
                  placeholder={isEmpresa ? 'Innovación, Historia, Unión...' : 'Nostalgia, Calma, Identidad...'}
                  className="w-full bg-transparent border-b border-brand-black/10 py-3 text-xl font-light focus:outline-none focus:border-brand-gold transition-all italic placeholder:text-brand-black/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Origen y significado' : 'Historia del objeto'}</label>
                <div className="relative">
                  <textarea
                    value={phase5.history}
                    onChange={(e) => updateField('history', e.target.value)}
                    placeholder={isEmpresa ? 'Cuéntanos cómo llegó este elemento a la empresa...' : 'Cuéntanos cómo llegó a ti y qué representa...'}
                    className="w-full bg-brand-black/5 border border-brand-black/5 p-6 text-sm font-light focus:outline-none focus:border-brand-gold/30 min-h-[150px] resize-none italic leading-relaxed"
                  />
                  <div className="absolute bottom-4 right-4">
                    <MicButton value={phase5.history} onChange={(text) => updateField('history', text)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <div className="space-y-3">
                <label className="text-[9px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Descripción del elemento' : 'Descripción física'}</label>
                <textarea
                  value={phase5.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={isEmpresa ? 'Materiales, colores, formas...' : 'Color, material, tamaño, aroma...'}
                  className="w-full bg-brand-black/5 border border-brand-black/5 p-5 text-sm font-light focus:outline-none focus:border-brand-gold/30 min-h-[100px] resize-none italic"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Rol en la Sede' : 'Rol en la vivienda'}</label>
                <textarea
                  value={phase5.livingRole}
                  onChange={(e) => updateField('livingRole', e.target.value)}
                  placeholder={isEmpresa ? '¿Qué impacto debe tener en el espacio?' : '¿Cómo interactúas con él a diario?'}
                  className="w-full bg-brand-black/5 border border-brand-black/5 p-5 text-sm font-light focus:outline-none focus:border-brand-gold/30 min-h-[100px] resize-none italic"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] tracking-[0.3em] font-bold text-brand-black/40 uppercase">{isEmpresa ? 'Elemento complementario' : 'Objeto complementario'}</label>
                <textarea
                  value={phase5.extraObject}
                  onChange={(e) => updateField('extraObject', e.target.value)}
                  placeholder={isEmpresa ? '¿Qué otro elemento potenciaría este símbolo?' : '¿Qué otro objeto lo acompañaría?'}
                  className="w-full bg-brand-black/5 border border-brand-black/5 p-5 text-sm font-light focus:outline-none focus:border-brand-gold/30 min-h-[100px] resize-none italic"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 flex flex-col">
            <div className="flex-1 min-h-[400px] relative group flex flex-col">
              {mode === 'upload' ? (
                <div className="w-full h-full min-h-[400px] bg-brand-black/5 border border-dashed border-brand-black/20 flex flex-col items-center justify-center gap-4 transition-all hover:bg-brand-black/10 rounded-2xl overflow-hidden">
                  {phase5.image ? (
                    <img src={phase5.image} alt="Objeto" className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="text-center space-y-4">
                      <Camera className="w-12 h-12 text-brand-gold mx-auto" strokeWidth={1} />
                      <p className="text-[10px] tracking-widest font-bold text-brand-black/40 uppercase">REPRESENTA TU OBJETO</p>
                    </div>
                  )}
                </div>
              ) : (
                <DrawingCanvas
                  onSave={(data) => setPhase5({ image: data })}
                  initialData={phase5.image}
                  placeholder="RECUERDO"
                  height="100%"
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => { setMode('upload'); fileInputRef.current?.click() }}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 ${mode === 'upload' ? 'bg-brand-black text-brand-cream shadow-xl' : 'bg-brand-black/5 text-brand-black border border-brand-black/10 hover:bg-brand-black/10'}`}
              >
                <Camera size={16} /> CARGAR IMAGEN
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

              <button
                onClick={() => setMode('draw')}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 ${mode === 'draw' ? 'bg-brand-black text-brand-cream shadow-xl' : 'bg-brand-black/5 text-brand-black border border-brand-black/10 hover:bg-brand-black/10'}`}
              >
                <PenTool size={16} /> DIBUJAR
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 pt-10">
          <button
            disabled={!phase5.objectName}
            onClick={() => setPhase(18)}
            className={`metallic-btn min-w-[350px] group ${!phase5.objectName ? 'opacity-20' : 'animate-pulse-gold scale-105'}`}
          >
            <span className="flex items-center justify-center gap-3">
              <Sparkles size={16} /> GENERAR VISIÓN CON IA
            </span>
          </button>

          <button onClick={() => setPhase(18)} className="text-[10px] tracking-[0.4em] text-white/20 hover:text-brand-gold transition-all uppercase font-bold">
            CONTINUAR <ArrowRight size={14} className="inline ml-2" />
          </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
