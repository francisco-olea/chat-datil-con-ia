export type DemoUser = {
  name: string
  email: string
  company: string
  palms: number
  annualProduction: number
  productionUnit: "kg" | "lbs"
  location: string
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export type Conversation = {
  id: string
  title: string
  date: string
  messages: ChatMessage[]
}

export type LibraryItem = {
  id: string
  title: string
  description: string
  type: "documento" | "presentacion" | "imagen" | "video"
  category: string
  source: string
  url: string
}

export const DEMO_CREDENTIALS = {
  email: "demo@datil.com",
  password: "demo123",
}

export const demoUser: DemoUser = {
  name: "Nombre Apellido",
  email: "demo@datil.com",
  company: "Datiles de San Luis RC S.P.R. de R.L.",
  palms: 1250,
  annualProduction: 38000,
  productionUnit: "kg",
  location: "San Luis Río Colorado, Sonora",
}

export const demoConversations: Conversation[] = [
  {
    id: "c1",
    title: "Control de la palomilla del dátil",
    date: "Hoy",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "¿Cómo controlo la palomilla del dátil en mis palmas?",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "La palomilla del dátil (Batrachedra amydraula) se controla mejor con un enfoque integrado: realiza monitoreo con trampas de feromonas desde el cuajado del fruto, retira y destruye los racimos y frutos caídos infestados, y aplica controladores biológicos como Trichogramma. Si la infestación supera el umbral económico, considera insecticidas selectivos respetando los intervalos de seguridad antes de la cosecha.",
      },
    ],
  },
  {
    id: "c2",
    title: "Mejores variedades para clima cálido",
    date: "Ayer",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "¿Qué variedades de dátil rinden mejor en clima cálido y seco?",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Para climas cálidos y secos como el del desierto de Sonora, las variedades Medjool y Deglet Noor son las más recomendadas. La Medjool ofrece frutos grandes y de alto valor comercial, mientras que la Deglet Noor tolera muy bien las altas temperaturas y tiene excelente vida de anaquel.",
      },
    ],
  },
  {
    id: "c3",
    title: "Riego por goteo en palma datilera",
    date: "Hace 3 días",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "¿Cuánta agua necesita una palma datilera adulta?",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Una palma datilera adulta puede requerir entre 150 y 300 litros de agua por día en los meses más calurosos, dependiendo del clima y la etapa fenológica. El riego por goteo es ideal porque mantiene la humedad en la zona radicular y reduce pérdidas por evaporación, mejorando la eficiencia hasta en un 40%.",
      },
    ],
  },
  {
    id: "c4",
    title: "Polinización artificial",
    date: "Hace 1 semana",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "¿Cómo se hace la polinización artificial del dátil?",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "La polinización artificial consiste en recolectar el polen de las palmas masculinas y aplicarlo a las inflorescencias femeninas recién abiertas. Puede hacerse de forma manual colocando hebras masculinas entre las femeninas, o de forma mecanizada con polvo de polen mezclado con harina. El momento óptimo es dentro de los 3-4 días posteriores a la apertura de la espata femenina.",
      },
    ],
  },
]

export const librarySuggestions = [
  "¿Cómo controlo la palomilla del dátil?",
  "Mejores prácticas de riego para palma datilera",
  "¿Cuándo es la temporada óptima de cosecha?",
  "Diferencias entre variedad Medjool y Deglet Noor",
]

export const libraryItems: LibraryItem[] = [
  {
    id: "l1",
    title: "Manual de producción de dátil",
    description:
      "Guía completa sobre el cultivo, manejo y cosecha de la palma datilera en zonas áridas.",
    type: "documento",
    category: "Cultivo",
    source: "FAO - PDF, 124 páginas",
    url: "#",
  },
  {
    id: "l2",
    title: "Manejo integrado de plagas en el dátil",
    description:
      "Presentación sobre las principales plagas que afectan a la palma datilera y su control.",
    type: "presentacion",
    category: "Sanidad vegetal",
    source: "INIFAP - 42 diapositivas",
    url: "#",
  },
  {
    id: "l3",
    title: "Etapas de maduración del fruto",
    description:
      "Galería fotográfica de las cuatro etapas: Kimri, Khalal, Rutab y Tamar.",
    type: "imagen",
    category: "Cosecha",
    source: "Banco de imágenes agrícola",
    url: "#",
  },
  {
    id: "l4",
    title: "Técnicas de polinización artificial",
    description:
      "Video tutorial paso a paso sobre la polinización manual y mecanizada de la palma.",
    type: "video",
    category: "Reproducción",
    source: "YouTube - 14:32 min",
    url: "https://www.youtube.com",
  },
  {
    id: "l5",
    title: "Sistemas de riego eficiente en el desierto",
    description:
      "Documento técnico sobre diseño e implementación de riego por goteo para palmas.",
    type: "documento",
    category: "Riego",
    source: "CONAGUA - PDF, 68 páginas",
    url: "#",
  },
  {
    id: "l6",
    title: "Comercialización y mercados del dátil",
    description:
      "Presentación sobre canales de venta, exportación y agregación de valor del dátil.",
    type: "presentacion",
    category: "Comercialización",
    source: "SADER - 28 diapositivas",
    url: "#",
  },
  {
    id: "l7",
    title: "Poda y manejo de racimos",
    description:
      "Video sobre técnicas de raleo, encamisado y soporte de racimos para mejorar la calidad.",
    type: "video",
    category: "Cultivo",
    source: "YouTube - 9:48 min",
    url: "https://www.youtube.com",
  },
  {
    id: "l8",
    title: "Análisis de suelos para palma datilera",
    description:
      "Galería de muestreos y parámetros ideales de salinidad y nutrientes del suelo.",
    type: "imagen",
    category: "Suelos",
    source: "Banco de imágenes agrícola",
    url: "#",
  },
]
