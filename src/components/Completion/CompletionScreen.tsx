import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { generatePDF } from '../../utils/pdfService'
import { Download, RefreshCcw, Camera, Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CompletionScreen() {
  const { resetSession, clientInfo, phase1, phase2, phase3, phase4, phase5, phase6, phase7 } = useWorkshopStore()
  const isEmpresa = clientInfo.type === 'empresa'

  const handleDownload = async () => {
    const data = { clientInfo, phase1, phase2, phase3, phase4, phase5, phase6, phase7 }
    await generatePDF(data)
  }

  return (
    <TransitionWrapper className="bg-brand-black text-white items-center justify-center p-6 bg-mesh-dark min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[200px] animate-pulse"></div>

      <div className="max-w-4xl w-full text-center space-y-24 relative z-10 px-6">
        <header className="space-y-10">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold">
               <Heart size={40} strokeWidth={1} fill="currentColor" className="animate-pulse" />
            </div>
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-playfair font-light leading-none animate-slide">
              Taller <br /> 
              <span className="gold-gradient-text italic">Completado</span>
            </h1>
            <p className="text-white/40 tracking-[0.5em] text-[10px] font-bold uppercase animate-fade" style={{ animationDelay: '0.5s' }}>
              {isEmpresa ? 'Gracias por confiarnos el ADN de su marca' : 'Gracias por abrirnos las puertas de tu mundo'}
            </p>
          </div>
        </header>

        <div className="max-w-2xl mx-auto space-y-10 animate-fade" style={{ animationDelay: '1s' }}>
           <p className="text-xl md:text-2xl font-light italic leading-relaxed text-white/60">
              {isEmpresa 
                ? '“Hoy no solo comenzamos a diseñar una sede, sino a proyectar el éxito y la cultura de su empresa. Su visión estratégica es ahora el corazón de este proyecto corporativo.”'
                : '“Hoy no solo comenzamos a diseñar un espacio, sino a imaginar una vida juntos. Tu historia, tus emociones y tus sueños son ahora el corazón de este proyecto.”'}
           </p>
           <div className="h-[1px] w-24 bg-brand-gold/30 mx-auto"></div>
           <div>
              <p className="text-brand-gold text-lg tracking-widest uppercase font-bold">{clientInfo?.fullName || (isEmpresa ? 'Empresa Elite 24' : 'Cliente Elite 24')}</p>
              <p className="text-[10px] tracking-widest text-white/20 uppercase mt-2">{isEmpresa ? 'Aliados en la excelencia · Elite 24 Studio' : 'Bienvenid@ a la familia Elite 24 Studio'}</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-12 animate-slide opacity-0" style={{ animationDelay: '1.5s' }}>
           <button 
             onClick={handleDownload}
             className="metallic-btn !bg-brand-gold !text-black shadow-[0_0_40px_rgba(197,160,89,0.3)] flex items-center justify-center gap-4 group"
           >
              <Download size={18} className="group-hover:translate-y-1 transition-transform" /> GUARDAR PDF RESUMEN
           </button>
           
           <button 
             onClick={resetSession}
             className="secondary-btn flex items-center justify-center gap-4 group"
           >
              <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-1000" /> NUEVA SESIÓN
           </button>
        </div>

        <footer className="pt-20 space-y-6">
           <div className="flex justify-center gap-10 text-white/20">
              <a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2 text-[10px] tracking-widest font-bold uppercase">
                <Camera size={16} /> @elite24studio
              </a>
              <p className="text-[10px] tracking-widest font-bold uppercase flex items-center gap-2">
                <Sparkles size={14} /> DISEÑANDO EXPERIENCIAS
              </p>
           </div>
        </footer>
      </div>
    </TransitionWrapper>
  )
}
