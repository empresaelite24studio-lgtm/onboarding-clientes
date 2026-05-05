export interface IAProfile {
  summary: Record<string, string>;
  reflection: string;
  vision: string;
}

export const generateEmotionalReflection = (name: string, words: string[], reflections: Record<string, string>, type?: 'persona' | 'empresa'): IAProfile => {
  const isEmpresa = type === 'empresa';
  const wordSummaries: Record<string, string> = {};
  
  words.forEach(w => {
    wordSummaries[w] = isEmpresa 
      ? `El valor ${w} representa para la marca ${name} un pilar de su identidad corporativa...`
      : `La palabra ${w} representa para ${name} un pilar de ${reflections[w]?.substring(0, 50) || 'búsqueda de armonía'}...`;
  });

  const reflection = isEmpresa
    ? `Estimados líderes de ${name},\n\nEn el corazón del espacio que co-crearemos para su marca, la esencia de ${words.join(', ')} se convierte en el cimiento donde su visión empresarial encuentra su máxima expresión. Hemos interpretado su búsqueda como una declaración de propósito. La arquitectura corporativa que visualizamos no es solo funcional; es un manifiesto de su cultura organizacional que respira a través de la innovación y la solidez.\n\n“Su sede no es solo un punto de operación, es el eco de su ADN corporativo convertido en espacio y luz.”`
    : `Querido ${name},\n\nEn el corazón del hogar que soñamos construir para ti, la esencia de ${words.join(', ')} se convierte en el refugio donde los días encuentran su curso sereno. Hemos interpretado tu búsqueda no solo como una necesidad de espacio, sino como una declaración de identidad. La arquitectura que visualizamos para ti no es estática; es un organismo vivo que respira a través de la luz y el silencio, protegiendo tus recuerdos mientras proyecta tu futuro.\n\n“Tu hogar no es solo un lugar en el mapa, es el eco de tu propia alma convertido en piedra y luz.”`;

  return {
    summary: wordSummaries,
    reflection,
    vision: isEmpresa
      ? `Una sede de vanguardia donde la identidad de marca y la eficiencia espacial crean un ecosistema de ${words[0]}.`
      : `Una residencia de líneas puras donde la materialidad honesta y la fluidez espacial crean un santuario de ${words[0]}.`
  };
};

export const generateObjectVision = (objectName: string, history: string, type?: 'persona' | 'empresa'): string => {
  const isEmpresa = type === 'empresa';
  return isEmpresa
    ? `Este elemento, ${objectName}, no es solo parte del mobiliario. Es el símbolo de su trayectoria. En su nuevo espacio, propondremos un lugar de honor que narre su historia —esa que comenzó con "${history.substring(0, 30)}..."— inspirando a su equipo y clientes diariamente.`
    : `Este objeto, ${objectName}, no es un simple elemento decorativo. Es el ancla de tu memoria. En tu nuevo hogar, propondremos un nicho de luz dedicado exclusivamente a su presencia, permitiendo que su historia —esa que comenzó con "${history.substring(0, 30)}..."— impregne el ambiente de significado y lo convierta en un verdadero hogar.`;
}

export const generateArchitecturalVision = (state: any): string => {
  const { clientInfo, phase1, phase3, phase6 } = state;
  const isEmpresa = clientInfo?.type === 'empresa';
  
  const name = clientInfo?.fullName || (isEmpresa ? "la empresa" : "nuestro cliente");
  const spaces = Object.keys(phase3?.purposeSpaces || {}).join(', ') || (isEmpresa ? "áreas estratégicas" : "diversos espacios");
  const narratedText = phase6?.narratedText || "";
  const emotion = phase3?.mainEmotion || (isEmpresa ? "propósito" : "armonía");
  const words = phase1?.selectedWords?.join(', ') || (isEmpresa ? "identidad" : "equilibrio");

  let vision = isEmpresa
    ? `Tras procesar el ADN de su marca, Elite 24 Studio visualiza una propuesta arquitectónica corporativa para ${name}.\n\n`
    : `Tras procesar tu viaje emocional, Elite 24 Studio visualiza una propuesta arquitectónica integral para ti, ${name}.\n\n`;
  
  if (narratedText.trim().length > 0) {
    vision += isEmpresa
      ? `Hemos analizado su visión estratégica: "${narratedText}". Basándonos en su relato, su espacio se define por una "transparencia corporativa", donde las áreas de ${spaces} se integran mediante flujos colaborativos, evocando la ${emotion} y la ${words} de su marca.\n\n`
      : `Hemos analizado detenidamente tu visión: "${narratedText}". Nos inspiraste profundamente. Basándonos en tus palabras, tu hogar se define por una "transparencia protegida", donde los espacios de ${spaces} se entrelazan mediante patios de luz naturales, evocando siempre esa sensación de ${emotion} y ${words} que tanto anhelas.\n\n`;
  } else {
    vision += isEmpresa
      ? `Su espacio se define por una "transparencia corporativa", donde las áreas de ${spaces} se integran mediante flujos colaborativos de alto impacto.\n\n`
      : `Su hogar se define por una "transparencia protegida", donde los espacios de ${spaces} se entrelazan mediante patios de luz naturales.\n\n`;
  }

  vision += isEmpresa
    ? `Utilizaremos una materialidad que refleje su solidez y visión de futuro. Cada rincón ha sido pensado para potenciar sus procesos y la experiencia de sus usuarios, convirtiendo la oficina en un laboratorio de innovación. El resultado es un activo arquitectónico que crece con su empresa.`
    : `Utilizaremos una paleta de materiales que responde a tu votación, priorizando la conexión táctil y visual. Cada rincón ha sido pensado para honrar tus rituales matutinos y tus flujos de movimiento diarios, convirtiendo la rutina en un acto poético. El resultado es un laboratorio de vida que evoluciona contigo.`;

  return vision;
}
