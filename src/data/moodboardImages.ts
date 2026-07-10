export interface MoodboardImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export const DEFAULT_IMAGES: MoodboardImage[] = [
  { id: '1', url: 'https://img.freepik.com/fotos-premium/casa-piscina-piscina-piscina-fondo_1103290-44877.jpg?w=360', title: 'Casa moderna con piscina', category: 'Exterior Moderno' },
  { id: '2', url: 'https://img.youtube.com/vi/a04u50PY1rE/sddefault.jpg', title: 'Fachada minimalista contemporánea', category: 'Exterior Moderno' },
  { id: '3', url: 'https://lamoralejamagazine.com/storage/3o1pqZUYKbsgZY3WuFt1bRmcjf2IkS-metaSmFyZMOtbiBSb21hLmpwZw==-.jpg', title: 'Casa de lujo con jardín', category: 'Exterior Moderno' },
  { id: '4', url: 'https://img.freepik.com/fotos-premium/casas-futuristas-energeticas-eficientes-patron-repeticion-arquitectura_964851-161915.jpg?semt=ais_hybrid&w=740&q=80', title: 'Residencia Clasica Luxury', category: 'Exterior Moderno' },
  { id: '5', url: 'https://cdn4.fincaraiz.com.co/repo/img/th.outside384x275.6a05e5ce0f6c1_infocdn__gu0qhqbu6q6tax2pudodbgjpg.jpg', title: 'Casa campestre entre árboles', category: 'Campo y Naturaleza' },
  { id: '6', url: 'https://i.pinimg.com/736x/ec/cf/03/eccf03763eaae794b99aa6cf9645939f.jpg', title: 'Casa Clasica con jardín ', category: 'Campo y Naturaleza' },
  { id: '7', url: 'https://i.pinimg.com/474x/31/ca/7c/31ca7c8e15b0744bfe4b6b9cb44f4cba.jpg', title: 'Cabaña en el bosque junto al lago', category: 'Campo y Naturaleza' },
  { id: '8', url: 'https://arquitecturaydiseno.es/medio/2024/08/23/casa-mateo-terraza_03e641b7_240823100817_1280x794.webp', title: 'Terraza con naturaleza desbordante', category: 'Campo y Naturaleza' },
  { id: '9', url: 'https://sofacentervalencia.com/imagenes/Ideas-de-decoracion-con-un-sofa-blanco.jpg', title: 'Sala moderna con sofás blancos', category: 'Sala de Estar' },
  { id: '10', url: 'https://bookstore.cl/img/cms/estilo-nordico-2.jpg', title: 'Living nórdico luminoso', category: 'Sala de Estar' },
  { id: '11', url: 'https://thumbs.dreamstime.com/b/sala-bohemio-espacioso-tonos-calidos-texturas-a-el-sol-357397141.jpg', title: 'Sala boho con plantas y texturas', category: 'Sala de Estar' },
  { id: '12', url: 'https://i.pinimg.com/736x/27/72/1c/27721c46508e2f7ebdbb8224b31d7e64.jpg', title: 'Loft urbano minimalista', category: 'Sala de Estar' },
  { id: '13', url: 'https://planner5d.com/blog/content/images/2024/03/cocina.abierta.13.jpg', title: 'Cocina moderna abierta', category: 'Cocina' },
  { id: '14', url: 'https://planner5d.com/blog/content/images/2024/03/cocina.abierta.5jpg.jpg', title: 'Cocina luminosa con isla central', category: 'Cocina' },
  { id: '15', url: 'https://santosvaguada.es/wp-content/uploads/2024/01/IMG_4791.jpg', title: 'Cocina de diseño en blanco y madera', category: 'Cocina' },
  { id: '16', url: 'https://www.hola.com/horizon/original_aspect_ratio/b67736152215-dormitorio-minimalista-5-a.jpg', title: 'Dormitorio minimalista con ropa blanca', category: 'Dormitorio' },
  { id: '17', url: 'https://thumbs.dreamstime.com/b/suite-de-dormitorio-principal-con-vistas-la-ciudad-lujoso-cama-grande-y-decoraci%C3%B3n-elegante-382016972.jpg', title: 'Suite principal elegante', category: 'Dormitorio' },
  { id: '18', url: 'https://thumbs.dreamstime.com/b/un-dormitorio-moderno-y-tranquilo-con-ambiente-luz-natural-minimalista-el-suelo-de-la-habitaci%C3%B3n-es-madera-clara-lo-que-se-380135447.jpg', title: 'Dormitorio tranquilo con luz natural', category: 'Dormitorio' },
  { id: '19', url: 'https://content.elmueble.com/medio/2020/12/23/dormitorio-con-aire-nordico-con-paredes-techo-y-suelo-de-madera-pintado-en-blanco-8ce14922_76ca761c_1200x630.jpg', title: 'Habitación cálida estilo nórdico', category: 'Dormitorio' },
  { id: '20', url: 'https://i.pinimg.com/564x/8e/28/34/8e28346799dda906297f6c0e1d8ab93f.jpg', title: 'Baño de lujo con tina', category: 'Baño / Spa' },
  { id: '21', url: 'https://thumbs.dreamstime.com/b/interior-de-ba%C3%B1o-moderno-estilo-spa-con-piedra-natural-427673775.jpg', title: 'Baño spa con piedra natural', category: 'Baño / Spa' },
  { id: '22', url: 'https://thumbs.dreamstime.com/b/acogedora-sala-de-estar-con-chimenea-en-las-noches-invierno-y-encendida-411133166.jpg', title: 'Chimenea y sala cálida de invierno', category: 'Ambientes Especiales' },
  { id: '23', url: 'https://thumbs.dreamstime.com/b/un-acogedor-rinc%C3%B3n-de-lectura-ba%C3%B1ado-por-una-suave-luz-nocturna-crea-ambiente-perfecto-para-la-relajaci%C3%B3n-y-escapada-literaria-338746296.jpg', title: 'Rincón de lectura íntimo con luz suave', category: 'Ambientes Especiales' },
  { id: '24', url: 'https://m.media-amazon.com/images/I/714xpi93DuL._AC_UF894,1000_QL80_.jpg', title: 'Comedor con luz de tarde dorada', category: 'Ambientes Especiales' },
  { id: '25', url: 'https://img.freepik.com/fotos-premium/mujer-descansando-rincón-tranquilo_506452-1049.jpg', title: 'Rincón acogedor y luz cálida', category: 'Ambientes Especiales' },
  { id: '26', url: 'https://content.arquitecturaydiseno.es/medio/2023/08/04/el-estudio-franklin-design-associates-firma-esta-magnifica-casa-mallorquina-presidida-por-las-transparentes-aguas-color-azul-turquesa-del-mediterraneo_00000000_023dab87_230804121351_1280x794.jpg', title: 'Terraza con piscina y vista panorámica', category: 'Exterior / Terraza' },
  { id: '27', url: 'https://images.homify.com/image/upload/a_0/v1440379524/p/photo/image/610148/Giardino_a_Terrazza_01.jpg', title: 'Jardín con flores y sendero de piedra', category: 'Exterior / Terraza' },
  { id: '28', url: 'https://st5.depositphotos.com/1152281/65546/i/950/depositphotos_655467292-stock-photo-zen-interior-potted-bamboo-plant.jpg', title: 'Sala verde con plantas y bambú', category: 'Detalles y Diseño' },
  { id: '29', url: 'https://images.ctfassets.net/ipjoepkmtnha/7Ka5KUsHmYnzvcnzLkBed8/7b2be6f32fb56fb97ce03e37c69bfad8/lifestyle-luxury-home-gym-concept-1_running.jpg', title: 'Gym en casa', category: 'Detalles y Diseño' },
  { id: '30', url: 'https://lago-cdn.thron.com/delivery/public/image/lago/567c29d7-66e2-4d2d-9d2c-c560325d2115/sqVrcnw/std/800x0/mobiliario-de-estudio-en-casa-or-home-office-or-lago.webp?quality=70', title: 'Estudio / despacho de diseño moderno', category: 'Detalles y Diseño' },
  { id: '31', url: 'https://images.adsttc.com/media/images/592d/77f4/e58e/ce5d/f700/02da/newsletter/Wheat_House___Damian_Rogers_Architecture_%C2%A9_Alessandro_Cerutti2.jpg?1496152045', title: 'Sala con luz cenital', category: 'Detalles y Diseño' },
  { id: '32', url: 'https://thumbs.dreamstime.com/b/este-acogedor-dormitorio-exhibe-un-dise%C3%B1o-minimalista-con-tonos-neutros-texturas-naturales-y-%C3%A9nfasis-en-la-comodidad-363670684.jpg', title: 'Dormitorio cálido con texturas naturales', category: 'Detalles y Diseño' }
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

export const CATEGORIES_BUSINESS = [
  'Todos',
  'Espacio Colaborativo',
  'Oficina Ejecutiva',
  'Salas de Reuniones',
  'Áreas de Descanso',
  'Recepción y Lobby',
  'Estilo Industrial / Tech',
  'Estilo Corporativo Clásico',
  'Detalles y Branding',
  'Restaurantes y Cafeterías',
  'Retail y Tiendas',
  'Supermercados y Mercados',
  'Hoteles y Hospitalidad',
  'Clínicas y Consultorios'
];

export const DEFAULT_IMAGES_BUSINESS: MoodboardImage[] = [
  {
    "id": "b1",
    "url": "https://png.pngtree.com/thumb_back/fw800/background/20251204/pngtree-a-bustling-modern-office-interior-with-diverse-team-working-collaboratively-in-image_20284584.webp",
    "title": "Espacio colaborativo abierto y luminoso",
    "category": "Espacio Colaborativo"
  },
  {
    "id": "b2",
    "url": "https://image.workin.space/wipng-81r1p88bxp4qdi5gazrj047ti/coworking-amenagement.png",
    "title": "Coworking moderno con toques de madera",
    "category": "Espacio Colaborativo"
  },
  {
    "id": "b3",
    "url": "https://www.wework.com/es-LA/ideas/wp-content/uploads/sites/15/2021/02/Web_150DPI-20191213_WeWork_One-Seaport-Square-Boston_011_v1.jpg?resize=1440%2C810",
    "title": "Trabajo en equipo en ambiente flexible",
    "category": "Espacio Colaborativo"
  },
  {
    "id": "b4",
    "url": "https://coworkingfy.com/wp-content/uploads/2019/12/trabajadores-oficinas-compartidas-1024x612.jpg",
    "title": "Mesa de trabajo compartida y dinámica",
    "category": "Espacio Colaborativo"
  },
  {
    "id": "b5",
    "url": "https://steelcase-res.cloudinary.com/image/upload/v1471871717/www.steelcase.com/eu-en/2016/08/22/D3576-1.jpg",
    "title": "Lounge colaborativo e informal",
    "category": "Espacio Colaborativo"
  },
  {
    "id": "b6",
    "url": "https://www.ofiprix.com/blog_images/wp-content/uploads/2016/05/12-720x540.jpg",
    "title": "Oficina creativa con vegetación",
    "category": "Espacio Colaborativo"
  },
  {
    "id": "b7",
    "url": "https://thumbs.dreamstime.com/b/moderna-oficina-ejecutiva-con-vistas-panor%C3%A1micas-la-ciudad-y-el-agua-una-elegante-un-gran-escritorio-de-madera-ordenador-silla-397387472.jpg",
    "title": "Oficina ejecutiva con vista panorámica",
    "category": "Oficina Ejecutiva"
  },
  {
    "id": "b8",
    "url": "https://estilooficina.com/wp-content/uploads/2019/07/84d279ad2efefb332e9df7692244a57f.jpg.webp",
    "title": "Coworking gerencial moderno y sobrio",
    "category": "Oficina Ejecutiva"
  },
  {
    "id": "b9",
    "url": "https://www.bunnoestudio.com/wp-content/uploads/2023/10/Despacho-en-casa.jpg",
    "title": "Despacho privado altamente iluminado",
    "category": "Oficina Ejecutiva"
  },
  {
    "id": "b10",
    "url": "https://storage.atlasplan.com/public/assets/press/2023-03-office/1-stone-effect-porcelain-stoneware-office-clamp_960_960_50.webp",
    "title": "Elegancia que lidera",
    "category": "Oficina Ejecutiva"
  },
  {
    "id": "b11",
    "url": "https://4878716.fs1.hubspotusercontent-na1.net/hubfs/4878716/sala-de-juntas-exitosa%20(1).webp",
    "title": "Sala de juntas Modernas",
    "category": "Oficina Ejecutiva"
  },
  {
    "id": "b12",
    "url": "https://thumbs.dreamstime.com/b/elegante-sala-de-juntas-con-mesa-madera-y-sillas-cuero-en-un-ambiente-corporativo-para-reuniones-debates-la-vista-interior-una-383131121.jpg",
    "title": "Sala de juntas corporativa elegante",
    "category": "Salas de Reuniones"
  },
  {
    "id": "b13",
    "url": "https://thumbs.dreamstime.com/b/moderna-sala-de-reuniones-interiores-oficina-dise%C3%B1o-colorido-y-brillante-mobiliario-blanco-gran-mesa-c%C3%B3moda-espacio-creativo-384983525.jpg",
    "title": "Sala de reuniones creativa y colorida",
    "category": "Salas de Reuniones"
  },
  {
    "id": "b14",
    "url": "https://cristaleriagranados.com/wp-content/uploads/2023/12/paredes-de-cristal-en-la-oficina.jpg",
    "title": "Acabados en cristal y sillas ergonómicas",
    "category": "Salas de Reuniones"
  },
  {
    "id": "b15",
    "url": "https://caracol.com.co/resizer/v2/LLQQ5JZHDVEPJAXV6SUUKPF3UY.jpeg?auth=4ffab7a644fffb407adf8c28447f23ae0ac93de10ed8586824a3261888ad0eaa&quality=70&width=650&height=487&smart=true",
    "title": "Mesa con tecnología y conectividad",
    "category": "Salas de Reuniones"
  },
  {
    "id": "b16",
    "url": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    "title": "Espacios de Exposicion ",
    "category": "Salas de Reuniones"
  },
  {
    "id": "b17",
    "url": "https://cafesydney.com/wp-content/uploads/2024/12/JCZ6944-2-Edit.jpg",
    "title": "Lounge y cafetería casual",
    "category": "Áreas de Descanso"
  },
  {
    "id": "b18",
    "url": "https://paraleloestudio.com/wp-content/uploads/dromme_main_img-2.jpg",
    "title": "Cafetería corporativa estilo escandinavo",
    "category": "Áreas de Descanso"
  },
  {
    "id": "b19",
    "url": "https://cdn.forbes.co/2025/06/Imagen-de-WhatsApp-2025-06-26-a-las-17.27.11_6f507c10-1024x768.jpg",
    "title": "Zona de descanso amplia",
    "category": "Áreas de Descanso"
  },
  {
    "id": "b20",
    "url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/df/ea/8e/puerto-125.jpg?w=900&h=500&s=1",
    "title": "cafetaeria asiatica",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b21",
    "url": "https://thumbs.dreamstime.com/b/elegante-recepci%C3%B3n-nocturna-del-hotel-ilustraci%C3%B3n-un-detallado-dise%C3%B1o-de-para-lujoso-vest%C3%ADbulo-con-l%C3%ADneas-depuradas-este-354067533.jpg",
    "title": "Lobby elegante y de líneas puras",
    "category": "Recepción y Lobby"
  },
  {
    "id": "b22",
    "url": "https://thumbs.dreamstime.com/b/moderna-recepci%C3%B3n-con-dise%C3%B1o-elegante-e-iluminaci%C3%B3n-c%C3%A1lida-en-un-edificio-contempor%C3%A1neo-una-bien-dise%C3%B1ada-muestra-387051816.jpg",
    "title": "Recepción corporativa cálida Minimalista",
    "category": "Recepción y Lobby"
  },
  {
    "id": "b23",
    "url": "https://thumbs.dreamstime.com/b/interior-de-oficina-con-pared-verde-viva-y-mostrador-recepci%C3%B3n-madera-427878046.jpg",
    "title": "Entrada acogedora con plantas y luz",
    "category": "Recepción y Lobby"
  },
  {
    "id": "b24",
    "url": "https://thumbs.dreamstime.com/b/un-lujoso-vest%C3%ADbulo-de-hotel-con-imponente-mostrador-recepci%C3%B3n-m%C3%A1rmol-ia-creativa-325294775.jpg",
    "title": "Recepción imponente en mármol",
    "category": "Recepción y Lobby"
  },
  {
    "id": "b25",
    "url": "https://images.adsttc.com/media/images/55ee/1e57/e58e/ce95/a800/0020/large_jpg/6_PCH_08.jpg?1441668676",
    "title": "Tech Hub con instalaciones expuestas",
    "category": "Estilo Industrial / Tech"
  },
  {
    "id": "b26",
    "url": "https://limobelinwo.com/wp-content/uploads/2022/09/oficina-con-pared-de-ladrillo.jpg",
    "title": "Paredes de ladrillo expuesto y cristal",
    "category": "Estilo Industrial / Tech"
  },
  {
    "id": "b27",
    "url": "https://barandillastop.com/wp-content/uploads/2024/06/interiorismo-de-oficinas-de-doble-altura.webp",
    "title": "Estructura metálica, madera y doble altura",
    "category": "Estilo Industrial / Tech"
  },
  {
    "id": "b28",
    "url": "https://www.tsdesignconstruccion.com/wp-content/uploads/2018/01/loft-elegante-6-800x400.jpg",
    "title": "Atmósfera loft industrial oscuro",
    "category": "Estilo Industrial / Tech"
  },
  {
    "id": "b29",
    "url": "https://png.pngtree.com/thumb_back/fw800/background/20251117/pngtree-elegant-and-modern-dark-themed-restaurant-interior-with-minimalist-decor-subtle-image_20333973.webp",
    "title": "Restaurante minimalista íntimo y oscuro",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b30",
    "url": "https://thumbs.dreamstime.com/b/dise%C3%B1o-moderno-y-minimalista-de-la-cafeter%C3%ADa-con-muebles-plantas-madera-un-caf%C3%A9-clara-amplio-paredes-blancas-grandes-ventanales-338346749.jpg",
    "title": "Cafetería estilo boho y maderas claras",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b31",
    "url": "https://i0.wp.com/outsidebcn.com/wp-content/uploads/Ideas-y-consejos-para-ilumnar-restaurantes.jpg?ssl=1",
    "title": "Comedor de restaurante luminoso y sofisticado",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b32",
    "url": "https://www.porcelanosa.com/trendbook/app/uploads/2024/01/9-barra-pieda-natural-porcelanosa.jpg",
    "title": "Bar y barra de coctelería contemporánea",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b33",
    "url": "https://www.metalocus.es/sites/default/files/metalocus_carlos-martinez-interiors_restaurante-crep-nova_03.jpg",
    "title": "Restaurante orgánico con alta vegetación",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b34",
    "url": "https://i.pinimg.com/474x/40/be/ed/40beed34090a2826ef8f1cd1a2cf1d0f.jpg",
    "title": "Bistró de inspiración rústica europea",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b35",
    "url": "https://png.pngtree.com/background/20250106/original/pngtree-minimalist-coffee-shop-or-cafe-interior-design-modern-with-aesthetic-and-picture-image_16007394.jpg",
    "title": "Cafetería de especialidad minimalista",
    "category": "Restaurantes y Cafeterías"
  },
  {
    "id": "b36",
    "url": "https://thumbs.dreamstime.com/b/tienda-de-ropa-contempor%C3%A1nea-con-dise%C3%B1o-minimalista-y-luz-natural-el-moderno-luminoso-espacio-venta-al-por-menor-cuenta-381582097.jpg",
    "title": "Tienda de ropa moderna y espaciosa",
    "category": "Retail y Tiendas"
  },
  {
    "id": "b37",
    "url": "https://www.shutterstock.com/image-photo/advertising-testimonial-photo-highend-fashion-600nw-2753200427.jpg",
    "title": "Boutique de autor minimalista",
    "category": "Retail y Tiendas"
  },
  {
    "id": "b38",
    "url": "https://images.adsttc.com/media/images/5f88/ff31/63c0/17d6/a100/01a5/newsletter/JM_Balneum__4.jpg?1602813729",
    "title": "Showroom de diseño y exhibición limpia",
    "category": "Retail y Tiendas"
  },
  {
    "id": "b39",
    "url": "https://www.signliteled.com/wp-content/uploads/2025/07/LED-Linear-Lights-for-Musical-Instrument-Store_01.webp",
    "title": "Retail tecnológico con iluminación lineal",
    "category": "Retail y Tiendas"
  },
  {
    "id": "b40",
    "url": "https://caad-design.com/wp-content/uploads/2022/06/retail-sector-lujo-pic02-20220628-caad-retail-design-barcelona.jpg",
    "title": "Tienda concepto de lujo y moda",
    "category": "Retail y Tiendas"
  },
  {
    "id": "b41",
    "url": "https://www.imprentaenlasrozas.com/wp-content/uploads/escaparates-atractivos.jpg",
    "title": "Escaparate y fachada comercial atractiva",
    "category": "Retail y Tiendas"
  },
  {
    "id": "b42",
    "url": "https://media.istockphoto.com/id/1556119299/es/foto/pasillos-vac%C3%ADos-en-un-supermercado.jpg?s=612x612&w=0&k=20&c=McdQS_WpqcxYP0XICoWzRSCK7_tAf3zJGFNeODLQiwg=",
    "title": "Pasillo de supermercado impecable",
    "category": "Supermercados y Mercados"
  },
  {
    "id": "b43",
    "url": "https://images.adsttc.com/media/images/53f3/ef0a/c07a/8038/8e00/052c/newsletter/2014_05_ArqSistemica_Intersybarite_079.jpg?1408495315",
    "title": "Mercado gourmet con acentos en madera",
    "category": "Supermercados y Mercados"
  },
  {
    "id": "b44",
    "url": "https://thumbs.dreamstime.com/b/moderna-pantalla-de-comestibles-con-vibrantes-frutas-y-verduras-una-vibrante-exposici%C3%B3n-frescas-en-un-marco-moderno-iluminado-por-391934540.jpg",
    "title": "Exhibición de frescos y frutas iluminadas",
    "category": "Supermercados y Mercados"
  },
  {
    "id": "b45",
    "url": "https://campbellrigg.com/images/uploads/projects/supermarkets/sundance-organic-supermarket-design/3.jpg",
    "title": "Minimarket orgánico y productos naturales",
    "category": "Supermercados y Mercados"
  },
  {
    "id": "b46",
    "url": "https://thumbs.dreamstime.com/b/bodega-moderna-en-una-casa-grande-hermosa-y-141570323.jpg",
    "title": "Bodega de vinos",
    "category": "Supermercados y Mercados"
  },
  {
    "id": "b47",
    "url": "https://thumbs.dreamstime.com/b/%C3%A1rea-tropical-de-la-piscina-del-centro-tur%C3%ADstico-8484622.jpg",
    "title": "Área de piscina y resort tropical",
    "category": "Hoteles y Hospitalidad"
  },
  {
    "id": "b48",
    "url": "https://www.derbyhotels.es/files/img/img_s/hotel-banke-paris-5-321.jpg",
    "title": "Suite de hotel 5 estrellas",
    "category": "Hoteles y Hospitalidad"
  },
  {
    "id": "b49",
    "url": "https://png.pngtree.com/thumb_back/fw800/background/20251130/pngtree-grand-hotel-lobby-luxury-and-elegance-in-marble-image_20671569.webp",
    "title": "Lobby de hotel majestuoso y glamuroso",
    "category": "Hoteles y Hospitalidad"
  },
  {
    "id": "b50",
    "url": "https://cesarserrano.co/wp-content/uploads/2026/04/diseno-interiores-arquitectura-hoteles-boutique-lujo-cesar-serrano-colombia-panama-republica-dominicana-peru-2-1024x765.webp",
    "title": "Habitación de hotel boutique texturizada",
    "category": "Hoteles y Hospitalidad"
  },
  {
    "id": "b51",
    "url": "https://static.vecteezy.com/system/resources/previews/054/446/829/non_2x/spacious-spa-area-features-organic-furnishings-warm-lighting-and-a-connection-to-nature-promoting-relaxation-and-wellness-ideal-for-retreats-and-rejuvenation-photo.jpg",
    "title": "Zonas de Spa, relajación y bienestar",
    "category": "Hoteles y Hospitalidad"
  },
  {
    "id": "b52",
    "url": "https://img.freepik.com/fotos-premium/pasillo-interior-clinica-moderna_788189-8672.jpg",
    "title": "Pasillos de clínica moderna y aséptica",
    "category": "Clínicas y Consultorios"
  },
  {
    "id": "b53",
    "url": "https://thumbs.dreamstime.com/b/una-sofisticada-recepci%C3%B3n-cl%C3%ADnica-con-un-escritorio-de-m%C3%A1rmol-paredes-madera-y-iluminaci%C3%B3n-elegante-el-espacio-est%C3%A1-adornado-323454212.jpg",
    "title": "Recepción de consultorio cálida",
    "category": "Clínicas y Consultorios"
  },
  {
    "id": "b54",
    "url": "https://thumbs.dreamstime.com/b/recepci%C3%B3n-de-cl%C3%ADnica-m%C3%A9dica-moderna-zona-espera-serena-con-dise%C3%B1o-minimalista-e-iluminaci%C3%B3n-suave-356814759.jpg",
    "title": "Sala de espera médica premium y serena",
    "category": "Clínicas y Consultorios"
  },
  {
    "id": "b55",
    "url": "https://thumbs.dreamstime.com/b/cl%C3%ADnica-dental-moderna-con-tecnolog%C3%ADa-avanzada-incluye-herramientas-quir%C3%BArgicas-para-silla-odontol%C3%B3gica-de-alta-xrays-digital-402670677.jpg",
    "title": "Consultorio dental de alta tecnología",
    "category": "Clínicas y Consultorios"
  },
  {
    "id": "b56",
    "url": "https://amadeaclinicas.com/wp-content/uploads/2024/07/InOutStudio_Aesthetic-clinic_-2.jpg",
    "title": "Clínica estética con vibra de spa",
    "category": "Clínicas y Consultorios"
  },
  {
    "id": "b57",
    "url": "https://clinicaesteticavilloria.es/wp-content/uploads/2024/06/clinica.webp",
    "title": "Oficina moderna con paneles de madera",
    "category": "Hoteles y Hospitalidad"
  },
  {
    "id": "b58",
    "url": "https://thumbs.dreamstime.com/b/opulent-boardroom-providing-sophisticated-exclusive-environment-high-end-business-discussions-generative-ai-281672282.jpg",
    "title": "Sala ejecutiva luxury / prestigio",
    "category": "Estilo Corporativo Clásico"
  },
  {
    "id": "b59",
    "url": "https://thumbs.dreamstime.com/b/sala-de-reuniones-ejecutiva-moderna-con-vistas-la-ciudad-361049358.jpg",
    "title": "Sala ejecutiva moderna",
    "category": "Estilo Corporativo Clásico"
  },
  {
    "id": "b60",
    "url": "https://thumbs.dreamstime.com/b/sala-de-reuniones-contempor%C3%A1nea-con-decoraci%C3%B3n-minimalista-y-espacio-en-blanco-juntas-moderna-un-dise%C3%B1o-mesas-largas-una-381577336.jpg",
    "title": "Sala ejecutiva contemporanea",
    "category": "Detalles y Branding"
  }
];
