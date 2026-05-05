import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Pencil, Trash2, Square, Circle, 
  MousePointer2, ZoomIn, ZoomOut, 
  Undo2, Sparkles, Upload, Eraser, 
  ArrowRight, Minus, Maximize2, Download,
  Type as TypeIcon, Palette
} from 'lucide-react';

interface Element {
  id: string;
  type: 'pencil' | 'rect' | 'circle' | 'text' | 'image' | 'line' | 'arrow';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points?: { x: number; y: number }[];
  text?: string;
  img?: HTMLImageElement;
  color: string;
  fillColor?: string;
  lineWidth: number;
  opacity: number;
}

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
  initialData?: string;
  placeholder?: string;
  height?: string;
}

const COLORS = [
  '#c5a059', '#ffffff', '#ff4d4d', '#4ade80', '#60a5fa', '#facc15', '#a855f7'
];

export default function DrawingCanvas({ onSave, initialData, height = '700px' }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [elements, setElements] = useState<Element[]>([]);
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [tool, setTool] = useState<Element['type'] | 'selection' | 'eraser'>('pencil');
  const [color, setColor] = useState('#c5a059');
  const [fillColor, setFillColor] = useState('transparent');
  const [lineWidth, setLineWidth] = useState(3);
  const [opacity, setOpacity] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan] = useState({ x: 0, y: 0 });
  
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [textInput, setTextInput] = useState<{ x: number, y: number, value: string } | null>(null);

  const commitText = useCallback(() => {
    setTextInput((currentTextInput) => {
      if (currentTextInput && currentTextInput.value.trim()) {
        const newEl: Element = {
          id: Date.now().toString(), type: 'text', x1: currentTextInput.x, y1: currentTextInput.y, x2: currentTextInput.x, y2: currentTextInput.y, text: currentTextInput.value, color, lineWidth: 5, opacity: 1
        };
        setElements(prev => [...prev, newEl]);
        setTimeout(() => {
          if (canvasRef.current) onSave(canvasRef.current.toDataURL());
        }, 100);
      }
      return null;
    });
  }, [color, onSave]);

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as any).touches[0].clientX : (e as any).clientX;
    const clientY = 'touches' in e ? (e as any).touches[0].clientY : (e as any).clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: ((clientX - rect.left) * scaleX - pan.x) / zoom,
      y: ((clientY - rect.top) * scaleY - pan.y) / zoom
    };
  };

  useEffect(() => {
    if (initialData && elements.length === 0) {
      const img = new Image();
      img.src = initialData;
      img.onload = () => {
        setElements([{ id: 'initial', type: 'image', x1: 0, y1: 0, x2: 1600, y2: 1000, img, color: 'transparent', lineWidth: 0, opacity: 1 }]);
      };
    }
  }, [initialData]);

  const isWithinElement = (x: number, y: number, el: Element) => {
    const threshold = 10 / zoom;
    switch (el.type) {
      case 'rect':
      case 'image':
        return x >= Math.min(el.x1, el.x2) && x <= Math.max(el.x1, el.x2) &&
               y >= Math.min(el.y1, el.y2) && y <= Math.max(el.y1, el.y2);
      case 'circle':
        const r = Math.sqrt(Math.pow(el.x2 - el.x1, 2) + Math.pow(el.y2 - el.y1, 2));
        const dist = Math.sqrt(Math.pow(x - el.x1, 2) + Math.pow(y - el.y1, 2));
        return dist <= r;
      case 'line':
      case 'arrow':
        const length = Math.sqrt(Math.pow(el.x2 - el.x1, 2) + Math.pow(el.y2 - el.y1, 2));
        const d1 = Math.sqrt(Math.pow(x - el.x1, 2) + Math.pow(y - el.y1, 2));
        const d2 = Math.sqrt(Math.pow(x - el.x2, 2) + Math.pow(y - el.y2, 2));
        return d1 + d2 >= length - threshold && d1 + d2 <= length + threshold;
      case 'text':
        return x >= el.x1 && x <= el.x1 + 100 && y >= el.y1 - 30 && y <= el.y1;
      case 'pencil':
        return el.points?.some(p => Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2)) < threshold * 2);
      default: return false;
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getMousePos(e);
    
    if (textInput && tool !== 'text') {
      commitText();
    }

    if (tool === 'selection') {
      const el = [...elements].reverse().find(el => isWithinElement(x, y, el));
      if (el) {
        setSelectedElement(el);
        setIsMoving(true);
        setOffset({ x: x - el.x1, y: y - el.y1 });
        return;
      }
      setSelectedElement(null);
      return;
    }

    if (tool === 'eraser') {
      const el = [...elements].reverse().find(el => isWithinElement(x, y, el));
      if (el) {
        setElements(prev => prev.filter(e => e.id !== el.id));
        save();
      }
      return;
    }

    setIsDrawing(true);
    if (tool === 'text') {
      if (textInput) {
        commitText();
      } else {
        setTextInput({ x, y, value: '' });
      }
      setIsDrawing(false);
      return;
    }

    setCurrentElement({
      id: Date.now().toString(), type: tool as any, x1: x, y1: y, x2: x, y2: y,
      points: tool === 'pencil' ? [{ x, y }] : undefined, color, fillColor, lineWidth, opacity
    });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getMousePos(e);

    if (isMoving && selectedElement) {
      setElements(prev => prev.map(el => {
        if (el.id === selectedElement.id) {
          const dx = x - offset.x - el.x1;
          const dy = y - offset.y - el.y1;
          if (el.type === 'pencil' && el.points) {
            return { ...el, points: el.points.map(p => ({ x: p.x + dx, y: p.y + dy })), x1: el.x1 + dx, y1: el.y1 + dy };
          }
          return { ...el, x1: el.x1 + dx, y1: el.y1 + dy, x2: el.x2 + dx, y2: el.y2 + dy };
        }
        return el;
      }));
      return;
    }

    if (tool === 'eraser' && (e as any).buttons === 1) {
       const el = [...elements].reverse().find(el => isWithinElement(x, y, el));
       if (el) setElements(prev => prev.filter(e => e.id !== el.id));
       return;
    }

    if (!isDrawing || !currentElement) return;
    if (tool === 'pencil') {
      setCurrentElement(prev => ({ ...prev!, points: [...(prev!.points || []), { x, y }] }));
    } else {
      setCurrentElement(prev => ({ ...prev!, x2: x, y2: y }));
    }
  };

  const handleMouseUp = () => {
    setIsMoving(false);
    if (currentElement) {
      setElements(prev => [...prev, currentElement]);
      setCurrentElement(null);
      save();
    }
    setIsDrawing(false);
  };

  const save = () => {
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      onSave(canvas.toDataURL());
    }, 100);
  };

  const clear = () => {
    if (confirm('¿Seguro que quieres borrar todo?')) {
      setElements([]);
      save();
    }
  };

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, 1600, 1000);
    ctx.save();
    ctx.scale(zoom, zoom);
    
    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for(let i=0; i<1600; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1000); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1600, i); ctx.stroke();
    }

    [...elements, ...(currentElement ? [currentElement] : [])].forEach(el => {
      ctx.globalAlpha = el.opacity;
      ctx.strokeStyle = el.color;
      ctx.fillStyle = el.fillColor || 'transparent';
      ctx.lineWidth = el.lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (selectedElement?.id === el.id) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = el.color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      if (el.type === 'pencil' && el.points && el.points.length > 0) {
        ctx.moveTo(el.points[0].x, el.points[0].y);
        el.points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      } else if (el.type === 'rect') {
        const x = Math.min(el.x1, el.x2);
        const y = Math.min(el.y1, el.y2);
        const w = Math.abs(el.x2 - el.x1);
        const h = Math.abs(el.y2 - el.y1);
        if (el.fillColor !== 'transparent') ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
      } else if (el.type === 'circle') {
        const r = Math.sqrt(Math.pow(el.x2 - el.x1, 2) + Math.pow(el.y2 - el.y1, 2));
        ctx.arc(el.x1, el.y1, r, 0, Math.PI * 2);
        if (el.fillColor !== 'transparent') ctx.fill();
        ctx.stroke();
      } else if (el.type === 'line') {
        ctx.moveTo(el.x1, el.y1);
        ctx.lineTo(el.x2, el.y2);
        ctx.stroke();
      } else if (el.type === 'arrow') {
        const headlen = 15;
        const dx = el.x2 - el.x1;
        const dy = el.y2 - el.y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length > 0) {
          const angle = Math.atan2(dy, dx);
          ctx.moveTo(el.x1, el.y1);
          ctx.lineTo(el.x2, el.y2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(el.x2, el.y2);
          ctx.lineTo(el.x2 - headlen * Math.cos(angle - Math.PI / 6), el.y2 - headlen * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(el.x2 - headlen * Math.cos(angle + Math.PI / 6), el.y2 - headlen * Math.sin(angle + Math.PI / 6));
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      } else if (el.type === 'text') {
        ctx.font = '30px "Outfit", sans-serif';
        ctx.fillText(el.text || '', el.x1, el.y1);
      } else if (el.type === 'image' && el.img) {
        ctx.drawImage(el.img, el.x1, el.y1, el.x2 - el.x1, el.y2 - el.y1);
      }
    });
    ctx.restore();
  }, [elements, currentElement, zoom, selectedElement]);

  useEffect(() => draw(), [draw]);

  return (
    <div className="flex flex-col w-full h-full bg-[#080808] rounded-2xl overflow-hidden border border-white/10 relative" style={{ height }}>
      {/* Top Bar Tools */}
      <div className="bg-[#0c0c0c] p-4 flex items-center justify-between border-b border-white/5 z-30 shadow-2xl">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
          <ToolbarBtn active={tool === 'selection'} onClick={() => setTool('selection')} icon={<MousePointer2 size={18}/>} tooltip="Seleccionar" />
          <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
          <ToolbarBtn active={tool === 'pencil'} onClick={() => setTool('pencil')} icon={<Pencil size={18}/>} tooltip="Lápiz" />
          <ToolbarBtn active={tool === 'line'} onClick={() => setTool('line')} icon={<Minus size={18}/>} tooltip="Línea" />
          <ToolbarBtn active={tool === 'arrow'} onClick={() => setTool('arrow')} icon={<ArrowRight size={18}/>} tooltip="Flecha" />
          <ToolbarBtn active={tool === 'rect'} onClick={() => setTool('rect')} icon={<Square size={18}/>} tooltip="Rectángulo" />
          <ToolbarBtn active={tool === 'circle'} onClick={() => setTool('circle')} icon={<Circle size={18}/>} tooltip="Círculo" />
          <ToolbarBtn active={tool === 'text'} onClick={() => setTool('text')} icon={<TypeIcon size={18}/>} tooltip="Texto" />
          <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
          <ToolbarBtn active={tool === 'eraser'} onClick={() => setTool('eraser')} icon={<Eraser size={18}/>} tooltip="Borrador" className="hover:text-red-400" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl">
             <Palette size={14} className="text-white/40" />
             <div className="flex gap-1.5">
               {COLORS.map(c => (
                 <button 
                  key={c} 
                  onClick={() => setColor(c)} 
                  className={`w-5 h-5 rounded-full transition-all hover:scale-125 ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`} 
                  style={{ background: c }} 
                 />
               ))}
             </div>
          </div>
          
          <button onClick={clear} className="p-2 text-white/20 hover:text-red-500 transition-colors" title="Borrar Todo">
            <Trash2 size={20}/>
          </button>
        </div>
      </div>

      {/* Side Properties Panel */}
      <div className="absolute left-6 top-24 z-30 space-y-4">
         <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl space-y-6 w-48">
            <div className="space-y-3">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase block">Grosor</label>
               <input 
                type="range" min="1" max="20" value={lineWidth} 
                onChange={e => setLineWidth(parseInt(e.target.value))} 
                className="w-full accent-brand-gold h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
               />
            </div>
            
            <div className="space-y-3">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase block">Opacidad</label>
               <input 
                type="range" min="0.1" max="1" step="0.1" value={opacity} 
                onChange={e => setOpacity(parseFloat(e.target.value))} 
                className="w-full accent-brand-gold h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
               />
            </div>

            <div className="space-y-3">
               <label className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase block">Relleno</label>
               <div className="flex gap-2">
                  <button 
                    onClick={() => setFillColor('transparent')}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${fillColor === 'transparent' ? 'bg-brand-gold text-black border-brand-gold' : 'border-white/10 text-white/40'}`}
                  >NINGUNO</button>
                  <button 
                    onClick={() => setFillColor(color)}
                    className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${fillColor !== 'transparent' ? 'bg-brand-gold text-black border-brand-gold' : 'border-white/10 text-white/40'}`}
                  >COLOR</button>
               </div>
            </div>
         </div>

         <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col gap-2 w-fit">
            <button onClick={() => fileInputRef.current?.click()} className="p-3 text-white/40 hover:text-brand-gold transition-all" title="Cargar Imagen"><Upload size={20}/></button>
            <button onClick={() => setZoom(1)} className="p-3 text-white/40 hover:text-brand-gold transition-all" title="Reset Zoom"><Maximize2 size={20}/></button>
         </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative cursor-crosshair overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={1600} 
          height={1000} 
          onMouseDown={handleMouseDown} 
          onMouseMove={handleMouseMove} 
          onMouseUp={handleMouseUp} 
          className="w-full h-full touch-none" 
        />
        {textInput && (
          <input
            autoFocus
            value={textInput.value}
            onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                commitText();
              }
            }}
            style={{
              position: 'absolute',
              left: `${(textInput.x * zoom / 1600) * 100}%`,
              top: `${((textInput.y - 30) * zoom / 1000) * 100}%`,
              fontSize: `${30 * zoom}px`,
              color: color,
              background: 'transparent',
              border: '1px dashed rgba(255,255,255,0.5)',
              outline: 'none',
              fontFamily: '"Outfit", sans-serif',
              minWidth: '200px',
              zIndex: 50,
              padding: 0,
              margin: 0,
              lineHeight: 1,
              transform: 'translateY(-20%)'
            }}
          />
        )}
      </div>

      {/* Zoom / Undo Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 bg-black/80 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 border-r border-white/10 pr-4">
           <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 text-white/40 hover:text-white"><ZoomOut size={18}/></button>
           <span className="text-xs text-brand-gold font-mono w-10 text-center font-bold">{Math.round(zoom * 100)}%</span>
           <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-2 text-white/40 hover:text-white"><ZoomIn size={18}/></button>
        </div>
        <button 
          onClick={() => {
            setElements(p => p.slice(0, -1));
            save();
          }} 
          className="p-2 text-white/40 hover:text-brand-gold transition-colors"
          title="Deshacer"
        >
          <Undo2 size={20}/>
        </button>
        <button 
          onClick={save} 
          className="bg-brand-gold text-black px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Download size={14}/> GUARDAR
        </button>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={e => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = ev => {
            const img = new Image();
            img.src = ev.target?.result as string;
            img.onload = () => {
              setElements(prev => [...prev, { id: Date.now().toString(), type: 'image', x1: 400, y1: 300, x2: 800, y2: 600, img, color: 'transparent', lineWidth: 0, opacity: 1 }]);
              save();
            };
          };
          reader.readAsDataURL(file);
        }
      }} />
    </div>
  );
}

function ToolbarBtn({ active, onClick, icon, tooltip, className = "" }: any) {
  return (
    <button 
      onClick={onClick} 
      title={tooltip}
      className={`relative p-3 rounded-lg transition-all duration-300 group
                 ${active ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/20' : 'text-white/40 hover:text-white hover:bg-white/5'} ${className}`}
    >
      {icon}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {tooltip}
      </span>
    </button>
  );
}
