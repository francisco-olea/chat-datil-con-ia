"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, User } from "lucide-react"

export default function ConfiguracionPage() {
  const { user, updateUser } = useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    palms: "",
    annualProduction: "",
    productionUnit: "kg" as "kg" | "lbs",
    location: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        company: user.company,
        palms: String(user.palms),
        annualProduction: String(user.annualProduction),
        productionUnit: user.productionUnit,
        location: user.location,
      })
    }
  }, [user])

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateUser({
      name: form.name,
      email: form.email,
      company: form.company,
      palms: Number(form.palms) || 0,
      annualProduction: Number(form.annualProduction) || 0,
      productionUnit: form.productionUnit,
      location: form.location,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex h-svh flex-col overflow-y-auto">
      <PageHeader
        title="Configuración"
        description="Administra la información de tu cuenta y tu producción de dátil."
      />

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <form onSubmit={handleSubmit}>
          <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <User className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold text-card-foreground">
                  Cuenta
                </h2>
                <p className="text-sm text-muted-foreground">
                  Información personal y de tu explotación.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Nombre de usuario"
                value={form.name}
                onChange={(v) => handleChange("name", v)}
              />
              <Field
                id="email"
                label="Correo electrónico"
                type="email"
                value={form.email}
                onChange={(v) => handleChange("email", v)}
              />
              <Field
                id="company"
                label="Nombre de empresa"
                value={form.company}
                onChange={(v) => handleChange("company", v)}
                className="sm:col-span-2"
              />
              <Field
                id="palms"
                label="Cantidad de palmas datileras"
                type="number"
                value={form.palms}
                onChange={(v) => handleChange("palms", v)}
              />

              {/* Producción con unidad */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="production">Producción de dátil al año</Label>
                <div className="flex gap-2">
                  <Input
                    id="production"
                    type="number"
                    value={form.annualProduction}
                    onChange={(e) =>
                      handleChange("annualProduction", e.target.value)
                    }
                    className="flex-1"
                  />
                  <div className="flex overflow-hidden rounded-md border border-input">
                    {(["kg", "lbs"] as const).map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => handleChange("productionUnit", unit)}
                        className={
                          form.productionUnit === unit
                            ? "bg-primary px-3 text-sm font-medium text-primary-foreground"
                            : "bg-card px-3 text-sm text-muted-foreground hover:bg-accent/40"
                        }
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Field
                id="location"
                label="Ubicación"
                value={form.location}
                onChange={(v) => handleChange("location", v)}
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-primary">
                  <Check className="size-4" />
                  Cambios guardados
                </span>
              )}
              <Button type="submit">Guardar cambios</Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
