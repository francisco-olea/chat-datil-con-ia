"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function LoadingScreen() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="flex size-11 animate-pulse items-center justify-center rounded-xl bg-primary/10 text-primary-foreground">
          <Image src="/date-icon.png" alt="Date Palm" width={24} height={24} />
        </div>
        <span className="text-sm">Cargando...</span>
      </div>
    </div>
  )
}

function Gate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const isLoginRoute = pathname === "/login"

  useEffect(() => {
    if (isLoading) return
    if (!user && !isLoginRoute) {
      router.replace("/login")
    } else if (user && isLoginRoute) {
      router.replace("/")
    }
  }, [user, isLoading, isLoginRoute, router])

  if (isLoading) return <LoadingScreen />

  // Ruta de login: sin shell
  if (isLoginRoute) {
    return <>{children}</>
  }

  // Rutas protegidas
  if (!user) return <LoadingScreen />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur md:hidden">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary-foreground">
              <Image src="/date-icon.png" alt="Date Palm" width={16} height={16} />
            </div>
            <span className="font-heading text-sm font-semibold">Dátil con IA</span>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Gate>{children}</Gate>
    </AuthProvider>
  )
}
