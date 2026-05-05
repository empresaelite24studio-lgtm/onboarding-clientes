import { jsPDF } from 'jspdf';
import { generateEmotionalReflection, generateArchitecturalVision } from './iaService';

export const generatePDF = async (data: any) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const { clientInfo, phase1, phase2, phase3, phase4, phase5, phase6, phase7 } = data;
  const isEmpresa = clientInfo?.type === 'empresa';

  const addPageTitle = (title: string, subtitle?: string) => {
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFont('times', 'italic');
    doc.setTextColor(197, 160, 89);
    doc.setFontSize(22);
    doc.text(title, 20, 25);
    if (subtitle) {
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(subtitle.toUpperCase(), 20, 32);
    }
  };

  const addSectionHeader = (text: string, y: number) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(197, 160, 89);
    doc.text(text.toUpperCase(), 20, y);
    doc.setDrawColor(197, 160, 89);
    doc.setLineWidth(0.2);
    doc.line(20, y + 2, 190, y + 2);
    return y + 10;
  };

  // --- PAGE 1: PORTADA ---
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setTextColor(197, 160, 89);
  doc.setFontSize(40);
  doc.text(isEmpresa ? 'Mi Marca en Palabras' : 'Mi Vida en Palabras', 20, 100);
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('TALLER DE CO-CREACIÓN ARQUITECTÓNICA', 20, 110);
  doc.text(`CLIENTE: ${clientInfo.fullName || (isEmpresa ? 'EMPRESA ELITE 24' : 'ELITE 24 CLIENT')}`, 20, 150);
  doc.text(`FECHA: ${clientInfo.date || new Date().toLocaleDateString()}`, 20, 158);
  doc.setTextColor(197, 160, 89);
  doc.text('@ELITE24STUDIO', 20, 270);

  // --- PAGE 2: FASE 1 - PERFIL ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Perfil de Marca' : 'Perfil Emocional', isEmpresa ? 'Fase 1 · El ADN' : 'Fase 1 · La Esencia');
  doc.setTextColor(0, 0, 0);
  let y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Valores Seleccionados' : 'Tus Palabras Seleccionadas', y);
  
  if (phase1.selectedWords && phase1.selectedWords.length > 0) {
    phase1.selectedWords.forEach((word: string) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(word.toUpperCase(), 20, y);
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`"${phase1.reflections[word] || 'Sin reflexión'}"`, 20, y + 6, { maxWidth: 170 });
      y += 18;
      if (y > 250) { doc.addPage(); y = 50; }
    });
  } else {
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.text('No se seleccionaron palabras en esta fase.', 20, y);
    y += 15;
  }

  y += 10;
  y = addSectionHeader('Reflexión Elite 24 Studio', y);
  const reflection = phase1.iaReflection || generateEmotionalReflection(clientInfo.fullName, phase1.selectedWords, phase1.reflections, isEmpresa ? 'empresa' : 'persona').reflection;
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  const splitReflection = doc.splitTextToSize(reflection, 170);
  doc.text(splitReflection, 20, y);
  y += (splitReflection.length * 6) + 10;

  // --- PAGE 3: FASE 2 - MOODBOARD ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Moodboard Corporativo' : 'Moodboard de Sensaciones', isEmpresa ? 'Fase 2 · Inspiración de Marca' : 'Fase 2 · Inspiración Visual');
  y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Conceptos de Marca' : 'Palabras Clave del Moodboard', y);
  if (phase2.selectedImages && phase2.selectedImages.length > 0) {
    phase2.selectedImages.forEach((img: any, idx: number) => {
      const emotion = phase2.imageEmotions[img.id] || 'Sin emoción definida';
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`${idx + 1}. ${img.title || 'Imagen'}: `, 20, y);
      doc.setFont('times', 'bold');
      doc.text(emotion.toUpperCase(), 50, y);
      y += 8;
      if (y > 270) { doc.addPage(); y = 50; }
    });
  } else {
    doc.text('No se seleccionaron imágenes.', 20, y);
    y += 10;
  }

  y += 10;
  y = addSectionHeader('Frase Integradora', y);
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(197, 160, 89);
  doc.text(`"${phase2.integrativePhrase || 'Sin frase definida'}"`, 20, y, { maxWidth: 170 });

  // --- PAGE 4: FASE 3 - BOCETA TU VISIÓN ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Boceta tu Marca' : 'Boceta tu Vida', isEmpresa ? 'Fase 3 · El Espacio Corporativo' : 'Fase 3 · El Espacio Propuesto');
  y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Propósito de Marca y Símbolo' : 'Emoción Principal y Símbolo', y);
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text((phase3.mainEmotion || (isEmpresa ? 'SIN PROPÓSITO' : 'SIN EMOCIÓN')).toUpperCase(), 20, y);
  y += 10;

  if (phase3.mainEmotionDrawing) {
    try {
      doc.addImage(phase3.mainEmotionDrawing, 'PNG', 20, y, 60, 60);
      y += 70;
    } catch(e) {}
  } else {
    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.text(isEmpresa ? '(Sin dibujo de propósito)' : '(Sin dibujo de emoción principal)', 20, y);
    y += 10;
  }

  y = addSectionHeader('Concepto Espacial', y);
  if (phase3.canvasBase64) {
    try {
      doc.addImage(phase3.canvasBase64, 'PNG', 20, y, 170, 80);
      y += 90;
    } catch(e) {}
  } else {
    doc.text('(Sin boceto espacial)', 20, y);
    y += 10;
  }

  // --- PAGE 5: FASE 3 - FLUJOS Y PROPÓSITOS ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Tus Flujos y Áreas' : 'Tu Rutina y Propósitos', isEmpresa ? 'Fase 3 · Dinámicas de Trabajo' : 'Fase 3 · Hábitos y Flujos');
  y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Dinámicas de Oficina' : 'Rituales Diarios', y);
  const routine = phase3.routine || {};
  const routineKeys = isEmpresa ? ['operación', 'creatividad', 'reuniones', 'pausas'] : ['mañana', 'tarde', 'noche', 'fin de semana'];
  routineKeys.forEach(key => {
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(key.toUpperCase(), 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(routine[key] || 'No especificado', 20, y + 5, { maxWidth: 170 });
    y += 15;
  });

  y += 5;
  y = addSectionHeader(isEmpresa ? 'Valores de Cultura' : 'Palabras de Sentimiento', y);
  doc.text((phase3.emotionalKeywords || []).filter((k: string) => k).join(' · ') || 'Sin palabras definidas', 20, y);
  y += 15;

  y = addSectionHeader(isEmpresa ? 'Áreas Estratégicas' : 'Propósitos de Espacio', y);
  const spaces = phase3.purposeSpaces || {};
  Object.keys(spaces).forEach(spaceId => {
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(spaceId.toUpperCase(), 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(spaces[spaceId] || 'Sin descripción', 20, y + 5, { maxWidth: 170 });
    y += 15;
    if (y > 270) { doc.addPage(); y = 20; }
  });

  // --- PAGE 6: FASE 4 - HISTORIA ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Historia de la Marca' : 'Recorrido: Línea del Tiempo', isEmpresa ? 'Fase 4 · Trayectoria' : 'Fase 4 · Tu Historia');
  y = 55;
  
  if (phase4.places && phase4.places.length > 0) {
    phase4.places.forEach((place: any, idx: number) => {
      y = addSectionHeader(`${place.name || (isEmpresa ? 'Hito ' : 'Lugar ') + (idx+1)} (${place.year || 'S/F'})`, y);
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`VALOR/PALABRA: ${place.keyword || 'N/A'}`, 20, y);
      doc.text(`MEMORIA/LOGRO: ${place.memory || 'Sin registro'}`, 20, y + 6, { maxWidth: 170 });
      doc.text(`ATMÓSFERA/CULTURA: ${place.sensory || 'Sin atmósfera definida'}`, 20, y + 20, { maxWidth: 170 });
      
      if (place.drawing) {
        try {
          doc.addImage(place.drawing, 'PNG', 130, y - 5, 60, 40);
        } catch(e) {}
      }
      
      y += 45;
      if (y > 250) { doc.addPage(); y = 50; }
    });
  } else {
    doc.text('No se registraron hitos.', 20, y);
  }

  // --- PAGE 7: FASE 5 - ELEMENTO IDENTITARIO ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'El Elemento de Marca' : 'El Objeto Emocional', isEmpresa ? 'Fase 5 · El ADN del Espacio' : 'Fase 5 · El Alma del Espacio');
  y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Símbolo Corporativo' : 'Ancla de Memoria', y);
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.text(`ELEMENTO: ${phase5.objectName || 'No especificado'}`, 20, y);
  y += 10;
  
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(isEmpresa ? 'ORIGEN Y SIGNIFICADO:' : 'HISTORIA Y SIGNIFICADO:', 20, y);
  doc.setTextColor(0, 0, 0);
  doc.text(phase5.history || 'Sin historia', 20, y + 6, { maxWidth: 170 });
  y += 25;

  doc.setTextColor(100, 100, 100);
  doc.text('DESCRIPCIÓN:', 20, y);
  doc.setTextColor(0, 0, 0);
  doc.text(phase5.description || 'Sin descripción', 20, y + 6, { maxWidth: 170 });
  y += 20;

  doc.setFont('times', 'bold');
  doc.text(`VALOR: ${phase5.emotion || 'No definido'}`, 20, y);
  y += 10;

  if (phase5.image || phase5.uploadedImage) {
    try {
      doc.addImage(phase5.image || phase5.uploadedImage, 'PNG', 20, y, 80, 80);
      y += 90;
    } catch(e) {}
  }

  y = addSectionHeader(isEmpresa ? 'Rol en el Espacio' : 'Rol en la Vivienda', y);
  doc.text(`FUNCIÓN EN LA SEDE: ${phase5.livingRole || 'No definido'}`, 20, y);
  y += 10;
  doc.text(`ELEMENTO COMPLEMENTARIO: ${phase5.extraObject || 'No definido'}`, 20, y);

  // --- PAGE 8: FASE 6 - VISIÓN IA ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Visión de Sede' : 'Aproximación Arquitectónica', 'Fase 6 · Laboratorio Elite 24');
  y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Relato de Marca' : 'Tu Relato de Ensueño', y);
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.text(phase6.narratedText || 'No se registró narración.', 20, y, { maxWidth: 170 });
  y += 40;

  if (phase6.dreamDrawing) {
    y = addSectionHeader(isEmpresa ? 'Trazo Visionario' : 'Tu Trazo Visionario', y);
    try {
      doc.addImage(phase6.dreamDrawing, 'PNG', 20, y, 170, 80);
      y += 90;
    } catch(e) {}
  }

  y = addSectionHeader('Visión de Nuestro Laboratorio', y);
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(197, 160, 89);
  const iaVision = phase6.iaVision || generateArchitecturalVision(data);
  const splitVision = doc.splitTextToSize(iaVision, 170);
  doc.text(splitVision, 20, y, { lineHeightFactor: 1.5 });

  // --- PAGE 9: FASE 7 - CONCLUSIÓN ---
  doc.addPage();
  addPageTitle(isEmpresa ? 'Votación de Marca' : 'Votación de Sensaciones', 'Fase 7 · Conclusión');
  y = 55;
  
  y = addSectionHeader(isEmpresa ? 'Lineamientos Estéticos' : 'Preferencias Estéticas', y);
  const votes = phase7.votes || {};
  Object.keys(votes).forEach(cat => {
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(cat.toUpperCase(), 20, y);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text((votes[cat] || []).join(' · ') || 'Sin votos', 20, y + 5);
    y += 15;
    if (y > 270) { doc.addPage(); y = 20; }
  });

  y += 10;
  y = addSectionHeader('Comentarios Finales', y);
  doc.setFont('times', 'italic');
  doc.text(phase7.finalComments || 'Sin comentarios adicionales.', 20, y, { maxWidth: 170 });

  doc.save(isEmpresa ? `Estrategia_Marca_${clientInfo.fullName || 'Empresa'}.pdf` : `Taller_Elite24_${clientInfo.fullName || 'Cliente'}.pdf`);
};


