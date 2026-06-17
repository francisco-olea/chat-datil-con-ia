"use client"

import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { demoConversations } from "@/lib/demo-data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import Image from "next/image"
import {
  MessageSquarePlus,
  Library,
  CloudSun,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react"

const navItems = [
  { title: "Biblioteca", href: "/biblioteca", icon: Library },
  { title: "Historial meteorológico", href: "/meteorologico", icon: CloudSun },
  { title: "Configuración", href: "/configuracion", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const isMobile = useIsMobile()
  const { setOpenMobile } = useSidebar()

  function handleLogout() {
    logout()
    router.push("/login")
  }

  function handleNavigation(href: string) {
    if (isMobile) {
      setOpenMobile(false)
    }
    router.push(href)
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary-foreground">
            <Image src="/date-icon.png" alt="Date Palm" width={20} height={20} />
          </div>
          <span className="font-heading text-base font-semibold">Dátil con IA</span>
        </div>

        {/* Tarjeta de usuario */}
        <div className="mt-1 flex items-center gap-3 rounded-lg bg-sidebar-accent/60 px-3 py-2.5">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-sidebar-foreground">
              {user?.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.company}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/")}
                  className="bg-primary/10 font-medium text-primary hover:bg-primary/15 hover:text-primary"
                >
                  <MessageSquarePlus className="size-4" />
                  <span>Nueva conversación</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Conversaciones recientes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {demoConversations.map((conv) => {
                const href = `/conversaciones/${conv.id}`
                return (
                  <SidebarMenuItem key={conv.id}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(href)}
                      isActive={pathname === href}
                      tooltip={conv.title}
                    >
                      <MessageCircle className="size-4 shrink-0" />
                      <span className="truncate">{conv.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.href)}
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.title}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
