import { notFound } from "next/navigation"
import { demoConversations } from "@/lib/demo-data"
import { ChatView } from "@/components/chat-view"

export default async function ConversacionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const conversation = demoConversations.find((c) => c.id === id)

  if (!conversation) {
    notFound()
  }

  return (
    <ChatView
      initialMessages={conversation.messages}
      title={conversation.title}
    />
  )
}
