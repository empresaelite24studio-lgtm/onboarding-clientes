import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'

export default function Phase6Meditation() {
  const { setPhase, clientInfo } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'
  
  // Persona Natural: qkWIGgmX_OA
  // Empresa: jPBKH-Wmq9E
  const videoId = isEmpresa ? 'jPBKH-Wmq9E' : 'qkWIGgmX_OA'

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center justify-center p-6 md:p-12">
      <div className="max-w-5xl w-full space-y-12">
        <header className="space-y-4 text-center">
          <h2 className="text-3xl md:text-5xl font-playfair font-light">{isEmpresa ? 'Visualice su espacio de marca...' : 'Escucha con los ojos cerrados...'}</h2>
          <p className="text-brand-gold italic text-xl">“{isEmpresa ? 'El espacio es el eco de su ADN corporativo.' : 'Lo importante no es cómo se ve, sino cómo se siente.'}”</p>
        </header>

        <div className="aspect-video w-full bg-[#111] overflow-hidden border border-brand-gold/20 shadow-2xl">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={isEmpresa ? "Meditación Guiada Espacio Corporativo" : "Meditación Guiada Casa Soñada"}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex justify-center pt-8">
           <button 
            onClick={() => setPhase(20)}
            className="metallic-btn min-w-[280px]"
           >
            Continuar →
           </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
