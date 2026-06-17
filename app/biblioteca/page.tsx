"use client"

import { useMemo, useState } from "react"
import { libraryItems, type LibraryItem } from "@/lib/demo-data"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Presentation,
  ImageIcon,
  Video,
  Search,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

const typeConfig: Record<
  LibraryItem["type"],
  { label: string; icon: typeof FileText }
> = {
  documento: { label: "Documento", icon: FileText },
  presentacion: { label: "Presentación", icon: Presentation },
  imagen: { label: "Imagen", icon: ImageIcon },
  video: { label: "Video", icon: Video },
}

const filters = [
  { value: "todos", label: "Todos" },
  { value: "documento", label: "Documentos" },
  { value: "presentacion", label: "Presentaciones" },
  { value: "imagen", label: "Imágenes" },
  { value: "video", label: "Videos" },
] as const

export default function BibliotecaPage() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<string>("todos")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return libraryItems.filter((item) => {
      const matchesType = filter === "todos" || item.type === filter
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      return matchesType && matchesQuery
    })
  }, [query, filter])

  return (
    <div className="flex h-svh flex-col overflow-y-auto">
      <PageHeader
        title="Biblioteca"
        description="Busca y consulta fuentes de información: documentos, presentaciones, imágenes y videos sobre el dátil."
      />

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {/* Buscador */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, tema o categoría..."
            className="pl-9"
          />
        </div>

        {/* Filtros */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-accent/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Resultados */}
        {results.length === 0 ? (
          <div className="mt-12 flex flex-col items-center text-center text-muted-foreground">
            <Search className="size-8 opacity-40" />
            <p className="mt-3 text-sm">
              No se encontraron resultados para tu búsqueda.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => {
              const config = typeConfig[item.type]
              const isExternal = item.url.startsWith("http")
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <config.icon className="size-4.5" />
                    </div>
                    {isExternal && (
                      <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </div>
                  <h3 className="mt-3 font-medium text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="font-normal">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{item.source}</p>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
