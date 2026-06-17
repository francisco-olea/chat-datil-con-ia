// Generador de respuestas simuladas de IA especializadas en producción de dátil.
// No usa ningún modelo real; selecciona respuestas según palabras clave.

type KnowledgeEntry = {
  keywords: string[]
  answer: string
}

const knowledge: KnowledgeEntry[] = [
  {
    keywords: ["riego", "agua", "goteo", "hidr"],
    answer:
      "El riego es clave para la palma datilera. Una palma adulta puede requerir entre 150 y 300 litros de agua por día en verano. El riego por goteo es el más eficiente: mantiene la humedad en la zona radicular, reduce la evaporación y permite fertirrigación. Evita el encharcamiento prolongado, ya que la palma tolera la sequía pero no el exceso de agua en las raíces.",
  },
  {
    keywords: ["plaga", "palomilla", "insecto", "ácaro", "acaro", "barreno", "picudo"],
    answer:
      "Para el manejo de plagas en el dátil recomiendo un enfoque integrado (MIP): monitorea con trampas de feromonas, mantén la higiene del huerto retirando frutos y racimos caídos, favorece enemigos naturales como Trichogramma, y reserva los insecticidas selectivos para cuando se supere el umbral económico. Las plagas más comunes son la palomilla del dátil, el ácaro Oligonychus y el picudo rojo de la palmera.",
  },
  {
    keywords: ["variedad", "medjool", "deglet", "tipo", "cultivar"],
    answer:
      "Las variedades más cultivadas en climas cálidos y secos son la Medjool (frutos grandes, blandos y de alto valor comercial) y la Deglet Noor (semiseca, gran vida de anaquel y muy tolerante al calor). Para el noroeste de México, la Medjool suele dar el mejor retorno económico si se cuenta con buen manejo de cosecha y secado.",
  },
  {
    keywords: ["cosecha", "madur", "recolec", "tamar", "rutab", "khalal"],
    answer:
      "El dátil pasa por cuatro etapas de maduración: Kimri (verde), Khalal (color firme), Rutab (blando y dulce) y Tamar (maduro y seco). La cosecha óptima depende de la variedad y del mercado destino; muchas variedades se cosechan en Rutab o Tamar. Realiza cortes escalonados de los racimos porque la maduración no es uniforme.",
  },
  {
    keywords: ["poliniz", "polen", "macho", "hembra", "flor", "espata"],
    answer:
      "La palma datilera es dioica, por lo que requiere polinización artificial para una buena producción. Recolecta polen de palmas masculinas y aplícalo a las inflorescencias femeninas dentro de los 3-4 días posteriores a la apertura de la espata. Puede ser manual (hebras masculinas entre las femeninas) o mecanizada (polvo de polen con harina). Se recomienda 1 palma macho por cada 25-50 hembras.",
  },
  {
    keywords: ["suelo", "salin", "nutri", "fertiliz", "abono"],
    answer:
      "La palma datilera tolera suelos salinos y arenosos mejor que la mayoría de los cultivos, pero rinde más en suelos profundos y bien drenados. Realiza análisis de suelo anuales para ajustar nitrógeno, potasio y magnesio. El potasio es especialmente importante para el llenado y calidad del fruto. Aplica materia orgánica para mejorar la retención de humedad.",
  },
  {
    keywords: ["clima", "temperatura", "calor", "frío", "frio", "helada", "viento"],
    answer:
      "La palma datilera prospera en climas cálidos y secos: tolera temperaturas de hasta 50°C y necesita veranos largos y calurosos para madurar el fruto. La lluvia y la humedad alta durante la maduración pueden dañar la cosecha. Las heladas intensas afectan a las palmas jóvenes, así que protégelas en sus primeros años.",
  },
  {
    keywords: ["poda", "racimo", "raleo", "encamis", "hoja"],
    answer:
      "El manejo de racimos incluye el raleo (eliminar parte de los frutos para mejorar el tamaño de los restantes), el encamisado o embolsado para proteger de aves, lluvia y plagas, y el soporte o atado de los racimos. La poda de hojas secas debe ser moderada: conserva un buen número de hojas verdes, ya que cada racimo necesita alrededor de 8-9 hojas funcionales para nutrirse.",
  },
  {
    keywords: ["precio", "mercado", "vender", "comercializ", "export", "valor"],
    answer:
      "El dátil tiene buena demanda en mercados nacionales e internacionales, especialmente las variedades premium como la Medjool. Para agregar valor considera la selección por calibre, el empaque diferenciado, productos derivados (pasta, jarabe, dátil deshuesado relleno) y certificaciones orgánicas. La exportación a EE.UU. y Medio Oriente ofrece precios atractivos para fruto de alta calidad.",
  },
]

const fallback =
  "Esa es una excelente pregunta sobre la producción de dátil. Como asistente especializado puedo ayudarte con temas de riego, variedades, control de plagas, polinización, cosecha, manejo de suelos y comercialización. ¿Podrías darme un poco más de detalle sobre lo que necesitas para darte una recomendación más precisa? (Recuerda que esta es una demostración con respuestas simuladas.)"

export function getSimulatedAnswer(question: string): string {
  const normalized = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  for (const entry of knowledge) {
    if (entry.keywords.some((k) => normalized.includes(k.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
      return entry.answer
    }
  }
  return fallback
}
