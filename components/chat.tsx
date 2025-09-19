"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Mic, MicOff, Trash2, Zap } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { LoadingIndicator } from "@/components/loading-indicator"
import { speakText, startSpeechRecognition } from "@/lib/voice-utils"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("jadoo-messages")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error("Failed to load messages:", error)
      }
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("jadoo-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const personalityMode = localStorage.getItem("jadoo-personality-mode") || "default"

      console.log("[v0] Sending chat request with personality:", personalityMode)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
          history: messages,
          personalityMode,
        }),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] API error response:", errorData)
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()
      console.log("[v0] Received response data")

      let assistantContent = data.reply
      if (data.isDemo && data.error) {
        assistantContent = `${data.reply}\n\n${data.error}`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantContent,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (!data.isDemo) {
        speakText(data.reply)
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error && error.message.includes("API key")
            ? "🔑 Please configure your OpenAI API key in the environment variables to start chatting!"
            : "⚠️ Jadoo couldn't reply, try again",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const startListening = () => {
    const stopRecognition = startSpeechRecognition(
      (transcript) => {
        setInput(transcript)
        inputRef.current?.focus()
      },
      () => setIsListening(true),
      () => setIsListening(false),
      (error) => {
        console.error("Speech recognition error:", error)
        alert(`Speech recognition error: ${error}`)
      },
    )

    if (!stopRecognition) {
      alert("Speech recognition is not supported in your browser")
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem("jadoo-messages")
  }

  const retryLastMessage = () => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2]
      if (lastUserMessage.role === "user") {
        // Remove the last assistant message and retry
        setMessages((prev) => prev.slice(0, -1))
        sendMessage(lastUserMessage.content)
      }
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 opacity-20 rounded-full blur-sm" />
          </div>
          <span className="font-semibold">Chat with Jadoo</span>
        </div>
        <Button variant="outline" size="sm" onClick={clearChat} disabled={messages.length === 0}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <div className="relative inline-block mb-4">
                <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" fill="currentColor" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 opacity-20 rounded-full blur-md" />
              </div>
              <p className="text-lg mb-2">Welcome to Jadoo!</p>
              <p>Start a conversation by typing a message or using voice input.</p>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onRetry={message.role === "assistant" ? retryLastMessage : undefined}
            />
          ))}

          {isLoading && <LoadingIndicator />}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Jadoo anything…"
              disabled={isLoading}
              className="pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={startListening}
              disabled={isLoading || isListening}
            >
              {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        {isListening && <p className="text-sm text-muted-foreground mt-2 text-center">Listening... Speak now</p>}
      </div>
    </Card>
  )
}
