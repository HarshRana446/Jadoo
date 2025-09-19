"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { Message } from "@/components/chat"

interface ChatMessageProps {
  message: Message
  onRetry?: () => void
}

export function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const isUser = message.role === "user"
  const isError = message.content.includes("⚠️")

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        <Card
          className={`p-4 ${isUser ? "bg-blue-500 text-white" : isError ? "bg-red-50 dark:bg-red-950" : "bg-muted"}`}
        >
          <div className="flex items-start space-x-2">
            {!isUser && <span className="text-lg mt-0.5">✨</span>}
            <div className="flex-1 min-w-0">
              {isUser ? (
                <p className="text-sm leading-relaxed">{message.content}</p>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>,
                      code: ({ children }) => (
                        <code className="bg-background/20 px-1 py-0.5 rounded text-xs">{children}</code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-background/20 p-2 rounded text-xs overflow-x-auto">{children}</pre>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            {isError && onRetry && (
              <Button variant="ghost" size="sm" onClick={onRetry} className="ml-2 h-6 w-6 p-0">
                <RotateCcw className="h-3 w-3" />
              </Button>
            )}
          </div>
        </Card>
        <div className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
