import Link from "next/link"
import { demoConversations } from "@/lib/demo-data"
import { PageHeader } from "@/components/page-header"
import { MessageCircle, ChevronRight } from "lucide-react"

export default function ConversacionesPage() {
  return (
    <div className="flex h-svh flex-col overflow-y-auto">
      <PageHeader
        title="Conversaciones recientes"
        description="Tu historial de conversaciones con el asistente del dátil."
      />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <ul className="flex flex-col gap-2">
          {demoConversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1]
            return (
              <li key={conv.id}>
                <Link
                  href={`/conversaciones/${conv.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/30"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageCircle className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate font-medium text-card-foreground">
                        {conv.title}
                      </h3>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {conv.date}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {lastMessage?.content}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
