import { useState, useEffect } from 'react'
import { useWorkshopStore } from '../../store/useWorkshopStore'
import TransitionWrapper from '../UI/TransitionWrapper'
import { DEFAULT_IMAGES, CATEGORIES, MoodboardImage } from '../../data/moodboardImages'
import { Settings, Plus, X, Check, Save, Trash2 } from 'lucide-react'

export default function Phase2Explorer() {
  const { setPhase, phase2, setPhase2 } = useWorkshopStore()
  const [images, setImages] = useState<MoodboardImage[]>([])
  const [filter, setFilter] = useState('Todos')
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminForm, setAdminForm] = useState<Partial<MoodboardImage>>({ title: '', category: 'Todos', url: '' })

  // Initialize images from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem('moodboard-gallery')
    if (saved) {
      setImages(JSON.parse(saved))
    } else {
      setImages(DEFAULT_IMAGES)
      localStorage.setItem('moodboard-gallery', JSON.stringify(DEFAULT_IMAGES))
    }
  }, [])

  const toggleImage = (img: MoodboardImage) => {
    const isSelected = phase2.selectedImages.find(i => i.id === img.id)
    if (isSelected) {
      setPhase2({ selectedImages: phase2.selectedImages.filter(i => i.id !== img.id) })
    } else if (phase2.selectedImages.length < 12) {
      setPhase2({ selectedImages: [...phase2.selectedImages, img] })
    }
  }

  const handleSaveAdmin = () => {
    const newImgs = [...images]
    if (adminForm.id) {
      const idx = newImgs.findIndex(i => i.id === adminForm.id)
      newImgs[idx] = adminForm as MoodboardImage
    } else {
      newImgs.push({ ...adminForm as MoodboardImage, id: Date.now().toString() })
    }
    setImages(newImgs)
    localStorage.setItem('moodboard-gallery', JSON.stringify(newImgs))
    setAdminForm({ title: '', category: 'Todos', url: '' })
  }

  const deleteImage = (id: string) => {
    const newImgs = images.filter(i => i.id !== id)
    setImages(newImgs)
    localStorage.setItem('moodboard-gallery', JSON.stringify(newImgs))
  }

  const filteredImages = filter === 'Todos' ? images : images.filter(i => i.category === filter)

  return (
    <TransitionWrapper className="bg-brand-cream text-brand-black p-6 md:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-playfair">¿Qué imágenes resuenan contigo?</h2>
            <p className="text-sm font-light text-brand-black/60">
              Selecciona entre 6 y 12 imágenes que representen las emociones y sensaciones de tu hogar ideal.
            </p>
          </div>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="flex items-center gap-2 text-[10px] tracking-widest font-bold text-brand-black/40 uppercase hover:text-brand-gold transition-colors"
          >
            <Settings size={14} /> {isAdmin ? 'Cerrar Admin' : 'Editar imágenes (admin)'}
          </button>
        </header>

        {isAdmin ? (
          <div className="bg-white/60 p-8 border border-brand-gold/20 shadow-xl space-y-8 animate-fade-in">
            <h3 className="text-xl font-playfair tracking-wide border-b border-brand-gold/20 pb-4">Administrador de Galería</h3>
            
            <div className="grid md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-black/40 uppercase">Título</label>
                <input 
                  type="text" 
                  value={adminForm.title} 
                  onChange={e => setAdminForm({...adminForm, title: e.target.value})}
                  className="w-full bg-white border border-brand-black/5 p-2 text-sm focus:outline-none focus:border-brand-gold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-black/40 uppercase">Categoría</label>
                <select 
                   value={adminForm.category} 
                   onChange={e => setAdminForm({...adminForm, category: e.target.value})}
                   className="w-full bg-white border border-brand-black/5 p-2 text-sm"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-black/40 uppercase">URL Imagen</label>
                <input 
                  type="text" 
                  value={adminForm.url} 
                  onChange={e => setAdminForm({...adminForm, url: e.target.value})}
                  className="w-full bg-white border border-brand-black/5 p-2 text-sm"
                />
              </div>
              <button 
                disabled={!adminForm.url || !adminForm.title}
                onClick={handleSaveAdmin}
                className="bg-brand-gold text-white p-2 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase hover:bg-brand-black transition-colors disabled:opacity-30"
              >
                <Save size={14} /> Guardar Cambios
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(images, null, 2))
                  alert("¡Datos copiados al portapapeles! Por favor pégalos aquí en el chat para guardarlos para siempre.")
                }}
                className="bg-brand-black text-white p-2 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors"
              >
                Copiar Datos para el Chat
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
               {images.map(img => (
                 <div key={img.id} className="relative group aspect-square">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button onClick={() => setAdminForm(img)} className="text-white hover:text-brand-gold"><Plus size={18}/></button>
                       <button onClick={() => deleteImage(img.id)} className="text-white hover:text-red-500"><Trash2 size={18}/></button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex flex-wrap gap-2">
               {CATEGORIES.map(c => (
                 <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase transition-all
                    ${filter === c ? 'bg-brand-gold text-white' : 'bg-white/40 text-brand-black/40 hover:bg-brand-gold/10'}
                  `}
                 >
                  {c}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {filteredImages.map(img => {
                 const isSelected = phase2.selectedImages.find(i => i.id === img.id)
                 return (
                   <div 
                    key={img.id}
                    onClick={() => toggleImage(img)}
                    className={`group relative aspect-[4/5] cursor-pointer overflow-hidden border-2 transition-all duration-300
                      ${isSelected ? 'border-brand-gold' : 'border-transparent hover:border-brand-gold/30'}
                    `}
                   >
                     <img src={img.url} className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`} />
                     <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end`}>
                        <p className="text-white text-[10px] font-bold tracking-widest uppercase">{img.category}</p>
                        <p className="text-white font-playfair">{img.title}</p>
                     </div>
                     {isSelected && (
                       <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white shadow-xl animate-scale-in">
                          <Check size={18} strokeWidth={3} />
                       </div>
                     )}
                   </div>
                 )
               })}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-brand-cream/90 backdrop-blur-md p-6 border-t border-brand-black/5 flex flex-col items-center gap-4 z-40">
               <div className="flex items-center gap-6">
                  <span className="text-xs tracking-[0.2em] font-bold text-brand-black/40 uppercase">Seleccionadas</span>
                  <span className={`text-xl font-playfair ${phase2.selectedImages.length >= 6 ? 'text-brand-gold' : 'text-brand-black'}`}>
                    {phase2.selectedImages.length} <span className="text-sm opacity-30">/ 12</span>
                  </span>
                  {phase2.selectedImages.length < 6 ? (
                    <p className="text-[10px] tracking-wider text-brand-black/40 italic">Elige al menos {6 - phase2.selectedImages.length} imágenes más para continuar</p>
                  ) : (
                    <p className="text-[10px] tracking-wider text-brand-gold font-bold uppercase">✨ {phase2.selectedImages.length} imágenes seleccionadas — puedes elegir {12 - phase2.selectedImages.length} más o continuar</p>
                  )}
               </div>
               
               {phase2.selectedImages.length >= 6 && (
                 <button 
                  onClick={() => setPhase(8)}
                  className="primary-btn min-w-[320px] animate-slide-up"
                 >
                  Crear mi Moodboard →
                 </button>
               )}
            </div>
            <div className="h-32"></div>
          </div>
        )}
      </div>
    </TransitionWrapper>
  )
}
