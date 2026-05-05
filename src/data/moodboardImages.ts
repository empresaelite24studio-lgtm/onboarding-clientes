export interface MoodboardImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export const DEFAULT_IMAGES: MoodboardImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', title: 'Casa moderna con piscina', category: 'Exterior Moderno' },
  { id: '2', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800', title: 'Fachada minimalista contemporánea', category: 'Exterior Moderno' },
  { id: '3', url: 'https://images.unsplash.com/photo-1600607687940-47200269556d?auto=format&fit=crop&q=80&w=800', title: 'Casa de lujo con jardín', category: 'Exterior Moderno' },
  { id: '4', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', title: 'Residencia contemporánea amplia', category: 'Exterior Moderno' },
  { id: '5', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800', title: 'Casa campestre entre árboles', category: 'Campo y Naturaleza' },
  { id: '6', url: 'https://images.unsplash.com/photo-1449156006075-bd7982424854?auto=format&fit=crop&q=80&w=800', title: 'Casa rústica con jardín exuberante', category: 'Campo y Naturaleza' },
  { id: '7', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800', title: 'Cabaña en el bosque junto al lago', category: 'Campo y Naturaleza' },
  { id: '8', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', title: 'Terraza con naturaleza desbordante', category: 'Campo y Naturaleza' },
  { id: '9', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', title: 'Sala moderna con sofás blancos', category: 'Sala de Estar' },
  { id: '10', url: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&q=80&w=800', title: 'Living nórdico luminoso', category: 'Sala de Estar' },
  { id: '11', url: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?auto=format&fit=crop&q=80&w=800', title: 'Sala boho con plantas y texturas', category: 'Sala de Estar' },
  { id: '12', url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800', title: 'Loft urbano minimalista', category: 'Sala de Estar' },
  { id: '13', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800', title: 'Cocina moderna abierta', category: 'Cocina' },
  { id: '14', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800', title: 'Cocina luminosa con isla central', category: 'Cocina' },
  { id: '15', url: 'https://images.unsplash.com/photo-1556911261-6bd341186b24?auto=format&fit=crop&q=80&w=800', title: 'Cocina de diseño en blanco y madera', category: 'Cocina' },
  { id: '16', url: 'https://images.unsplash.com/photo-1616594111754-a14a0ecdc199?auto=format&fit=crop&q=80&w=800', title: 'Dormitorio minimalista con ropa blanca', category: 'Dormitorio' },
  { id: '17', url: 'https://images.unsplash.com/photo-1617331140180-e8262094733a?auto=format&fit=crop&q=80&w=800', title: 'Habitación cálida estilo nórdico', category: 'Dormitorio' },
  { id: '18', url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800', title: 'Suite principal elegante', category: 'Dormitorio' },
  { id: '19', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800', title: 'Dormitorio con gran ventanal y luz natural', category: 'Dormitorio' },
  { id: '20', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800', title: 'Baño de lujo con tina', category: 'Baño / Spa' },
  { id: '21', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', title: 'Baño spa con piedra natural', category: 'Baño / Spa' },
  { id: '22', url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800', title: 'Chimenea y sala cálida de invierno', category: 'Ambientes Especiales' },
  { id: '23', url: 'https://images.unsplash.com/photo-1544413647-ad341ea29df8?auto=format&fit=crop&q=80&w=800', title: 'Rincón de lectura íntimo con luz suave', category: 'Ambientes Especiales' },
  { id: '24', url: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800', title: 'Comedor con luz de tarde dorada', category: 'Ambientes Especiales' },
  { id: '25', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=800', title: 'Gran ventanal con vista al bosque', category: 'Ambientes Especiales' },
  { id: '26', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800', title: 'Terraza con piscina y vista panorámica', category: 'Exterior / Terraza' },
  { id: '27', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800', title: 'Jardín con flores y sendero de piedra', category: 'Exterior / Terraza' },
  { id: '28', url: 'https://images.unsplash.com/photo-1511840534904-2977d3d53a61?auto=format&fit=crop&q=80&w=800', title: 'Piscina infinita rodeada de naturaleza', category: 'Exterior / Terraza' },
  { id: '29', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', title: 'Estudio / despacho de diseño moderno', category: 'Detalles y Diseño' },
  { id: '30', url: 'https://images.unsplash.com/photo-1585412727339-54e4bae303c6?auto=format&fit=crop&q=80&w=800', title: 'Sala verde con plantas y luz cenital', category: 'Detalles y Diseño' },
  { id: '31', url: 'https://images.unsplash.com/photo-1422728280356-7f87f7f59594?auto=format&fit=crop&q=80&w=800', title: 'Dormitorio cálido con texturas naturales', category: 'Detalles y Diseño' },
  { id: '32', url: 'https://images.unsplash.com/photo-1600585154542-6379b1d359f4?auto=format&fit=crop&q=80&w=800', title: 'Comedor elegante con mesa de madera', category: 'Detalles y Diseño' }
];

export const CATEGORIES = [
  'Todos',
  'Exterior Moderno',
  'Campo y Naturaleza',
  'Sala de Estar',
  'Cocina',
  'Dormitorio',
  'Baño / Spa',
  'Ambientes Especiales',
  'Exterior / Terraza',
  'Detalles y Diseño'
];
