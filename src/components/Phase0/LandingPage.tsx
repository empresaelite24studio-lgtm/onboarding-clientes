import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'

export default function LandingPage() {
  const { setPhase } = useWorkshopStore()

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center justify-center relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[180px]"></div>

      <div className="max-w-4xl w-full text-center space-y-24 relative z-10 px-6">
        <header className="space-y-6">
          <div className="flex justify-center mb-20 animate-fade">
            <img src="/logo.png" alt="Elite 24" className="h-16 md:h-24 object-contain brightness-110 filter drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]" />
          </div>
          
          <div className="space-y-6">
            <p className="text-brand-gold tracking-[0.8em] text-[10px] font-bold uppercase animate-slide">
              BIENVENID@ A BORDO
            </p>
            <div className="space-y-2 transform transition-transform duration-1000">
               <h1 className="text-7xl md:text-9xl font-playfair font-light leading-none animate-slide">
                 Elite 24 <br /> 
                 <span className="italic text-brand-gold">Studio</span>
               </h1>
            </div>
          </div>
        </header>

        <div className="space-y-12">
            <div className="space-y-2 animate-slide">
                <p className="text-white/40 tracking-[0.4em] uppercase text-[10px] font-semibold">COMIENZO DE TU VIAJE</p>
                <p className="text-brand-gold/60 tracking-[0.2em] font-light italic text-sm">Transformando la arquitectura y el impacto social</p>
            </div>

            <div className="pt-8 animate-fade">
              <button 
                onClick={() => setPhase(1)}
                className="metallic-btn min-w-[320px] group scale-110"
              >
                <span className="relative z-10">INICIAR AVENTURA</span>
              </button>
            </div>
        </div>
      </div>
      
      <footer className="absolute bottom-12 left-0 right-0 text-center animate-fade">
         <p className="text-[10px] tracking-[0.8em] text-white/10 uppercase font-black">
            ARCHITECTURE LABORATORY
         </p>
      </footer>
    </TransitionWrapper>
  )
}
