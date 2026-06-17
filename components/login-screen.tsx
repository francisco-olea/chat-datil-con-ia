"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DEMO_CREDENTIALS } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Info } from "lucide-react"

export function LoginScreen() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    // Pequeño retraso para simular autenticación
    setTimeout(() => {
      const result = login(email, password)
      if (result.ok) {
        router.push("/")
      } else {
        setError(result.error ?? "Error al iniciar sesión")
        setLoading(false)
      }
    }, 500)
  }

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
  }

  return (
    <div className="flex min-h-svh w-full">
      {/* Panel visual */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/datil-palms2.png"
          alt="Plantación de palmas datileras al atardecer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 text-background">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-background/70 text-primary">
              <Image src="/date-icon.png" alt="Date Palm" width={20} height={20} />
            </div>
            <span className="font-heading text-lg font-semibold"></span>
          </div>
          <div className="max-w-md">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight">
              Conocimiento experto sobre la producción del dátil, a un mensaje de distancia.
            </h2>
            <p className="mt-3 text-pretty text-sm text-background/80 leading-relaxed">
              Resuelve dudas sobre riego, plagas, variedades, cosecha y mucho más con tu asistente especializado.
            </p>
          </div>
        </div>
      </div>

      {/* Panel de formulario */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary-foreground lg:hidden">
              <Image src="/date-icon.png" alt="Date Palm" width={24} height={24} />
            </div>
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              Bienvenido de nuevo
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Inicia sesión para continuar con tu asistente del dátil.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="mt-2 gap-2" disabled={loading}>
              <LogIn className="size-4" />
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2 rounded-lg border border-border bg-muted/60 p-3 text-sm">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="flex flex-col gap-1.5">
              <p className="text-muted-foreground">
                Cuenta de demostración:
                <br />
                <span className="font-mono text-foreground">{DEMO_CREDENTIALS.email}</span>
                {" / "}
                <span className="font-mono text-foreground">{DEMO_CREDENTIALS.password}</span>
              </p>
              <button
                type="button"
                onClick={fillDemo}
                className="self-start text-primary underline-offset-2 hover:underline"
              >
                Rellenar automáticamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
