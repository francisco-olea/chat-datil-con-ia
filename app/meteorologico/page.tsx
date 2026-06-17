import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Construction, MapPin, Thermometer, Droplets, Wind } from "lucide-react"

// Coordenadas aproximadas de San Luis Río Colorado, Sonora
const BBOX = "-114.85,32.40,-114.65,32.52"
const MARKER = "32.4636,-114.7728"
const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${MARKER}`

const placeholderStats = [
  { label: "Temperatura", value: "—", icon: Thermometer },
  { label: "Humedad", value: "—", icon: Droplets },
  { label: "Viento", value: "—", icon: Wind },
]

export default function MeteorologicoPage() {
  return (
    <div className="flex h-svh flex-col overflow-y-auto">
      <PageHeader
        title="Historial meteorológico"
        description="Datos climáticos de tu región para apoyar las decisiones de manejo del cultivo."
      />

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          <span>San Luis Río Colorado, Sonora</span>
        </div>

        {/* Mapa */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="absolute right-4 top-4 z-10">
            <Badge className="gap-1.5 bg-primary text-primary-foreground shadow-sm">
              <Construction className="size-3.5" />
              En proceso
            </Badge>
          </div>
          <iframe
            title="Mapa de San Luis Río Colorado"
            src={MAP_SRC}
            className="h-[420px] w-full border-0"
            loading="lazy"
          />
        </div>

        {/* Estadísticas placeholder */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {placeholderStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-heading text-xl font-semibold text-card-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Aviso */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-4">
          <Construction className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <h3 className="font-medium text-foreground">Sección en desarrollo</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Próximamente integraremos el historial meteorológico completo con
              temperatura, humedad, precipitación y alertas climáticas
              específicas para la producción del dátil en tu ubicación.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
