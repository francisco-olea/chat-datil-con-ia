"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { getSimulatedAnswer } from "@/lib/ai-responses"
import type { ChatMessage } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, User } from "lucide-react"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  "¿Cómo controlo la palomilla del dátil?",
  "Mejores prácticas de riego por goteo",
  "¿Cuándo es la temporada óptima de cosecha?",
  "Diferencias entre Medjool y Deglet Noor",
]

let idCounter = 0
function nextId() {
  idCounter += 1
  return `msg-${Date.now()}-${idCounter}`
}

export function ChatView({
  initialMessages = [],
  title,
}: {
  initialMessages?: ChatMessage[]
  title?: string
}) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, isTyping])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content: trimmed,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Respuesta simulada con un pequeño retraso
    setTimeout(() => {
      const answer = getSimulatedAnswer(trimmed)
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: answer },
      ])
      setIsTyping(false)
    }, 900)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const firstName = user?.name?.split(" ")[0] ?? ""

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col md:h-svh">
      {/* Área de mensajes */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
          {!hasMessages ? (
            <div className="flex min-h-[60svh] flex-col items-center justify-center text-center">
              <h1 className="text-balance font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Dátil con IA
              </h1>
              <p className="mt-4 max-w-md text-pretty text-base text-muted-foreground leading-relaxed">
                {firstName ? `Hola ${firstName}, ` : ""}¿En qué te puedo ayudar respecto al dátil?
              </p>

              <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="rounded-xl border border-border bg-card p-3.5 text-left text-sm text-card-foreground transition-colors hover:border-primary/40 hover:bg-accent/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {title && (
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} userInitial={firstName?.[0]} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      {/* Compositor */}
      <div className="border-t border-border bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-4 py-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-primary/50"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta sobre el dátil..."
              rows={1}
              className="max-h-40 min-h-10 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0 dark:bg-transparent"
            />
            <Button
              type="submit"
              size="icon"
              className="size-9 shrink-0 rounded-xl"
              disabled={!input.trim() || isTyping}
              aria-label="Enviar mensaje"
            >
              <ArrowUp className="size-4" />
            </Button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Demostración con respuestas simuladas. Verifica siempre con un agrónomo.
          </p>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  userInitial,
}: {
  message: ChatMessage
  userInitial?: string
}) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          isUser
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {isUser ? (
          userInitial ? (
            <span className="text-sm font-medium">{userInitial.toUpperCase()}</span>
          ) : (
            <User className="size-4" />
          )
        ) : (
          <Image src="/date-icon-gray.png" alt="Date Palm" width={16} height={16} />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-border",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-foreground">
        <Image src="/date-icon.png" alt="Date Palm" width={16} height={16} />
      </div>
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3.5">
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </div>
  )
}
