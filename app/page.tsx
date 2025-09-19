import { Chat } from "@/components/chat"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Chat with Jadoo ✨</h1>
        <p className="text-muted-foreground text-lg">Your intelligent AI assistant with voice capabilities</p>
      </div>
      <Chat />
    </div>
  )
}
