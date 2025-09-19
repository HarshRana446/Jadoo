import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Mic, Volume2, Settings, Sparkles, Brain, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl mr-4">✨</span>
          <h1 className="text-4xl font-bold">Jadoo</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-6 text-balance">
          Your intelligent AI assistant with voice capabilities
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">AI-Powered</Badge>
          <Badge variant="secondary">Voice Enabled</Badge>
          <Badge variant="secondary">Privacy-First</Badge>
          <Badge variant="secondary">Open Source</Badge>
        </div>
      </div>

      {/* What Jadoo Can Do */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          What Jadoo Can Do
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 mt-1 text-blue-500" />
              <div>
                <h3 className="font-semibold">Intelligent Conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Engage in natural, context-aware conversations on any topic
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mic className="h-5 w-5 mt-1 text-green-500" />
              <div>
                <h3 className="font-semibold">Voice Input</h3>
                <p className="text-sm text-muted-foreground">
                  Speak naturally and Jadoo will understand your voice commands
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Volume2 className="h-5 w-5 mt-1 text-purple-500" />
              <div>
                <h3 className="font-semibold">Text-to-Speech</h3>
                <p className="text-sm text-muted-foreground">
                  Listen to Jadoo's responses with customizable voice settings
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Settings className="h-5 w-5 mt-1 text-orange-500" />
              <div>
                <h3 className="font-semibold">Customizable Personality</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from different personality modes to match your needs
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 mt-1 text-pink-500" />
              <div>
                <h3 className="font-semibold">Creative & Analytical</h3>
                <p className="text-sm text-muted-foreground">
                  Get help with creative projects or analytical problem-solving
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 mt-1 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Fast & Responsive</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by OpenAI's latest models for quick, accurate responses
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Key Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Real-time chat with AI responses
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Speech-to-text voice input
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Text-to-speech with voice selection
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Multiple personality modes
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
              Markdown support in responses
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Local conversation history
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Privacy & Security
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium">Local Storage</h4>
              <p className="text-muted-foreground">
                Your conversations are stored locally in your browser, not on external servers.
              </p>
            </div>
            <div>
              <h4 className="font-medium">No Account Required</h4>
              <p className="text-muted-foreground">
                Start chatting immediately without creating an account or providing personal information.
              </p>
            </div>
            <div>
              <h4 className="font-medium">OpenAI Integration</h4>
              <p className="text-muted-foreground">
                Messages are sent to OpenAI's API only to generate responses. Review their privacy policy for details.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Technical Details */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Frontend</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>Next.js 15 with App Router</li>
              <li>React 18 with TypeScript</li>
              <li>Tailwind CSS for styling</li>
              <li>Shadcn/ui components</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">AI Integration</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>OpenAI GPT-4o-mini</li>
              <li>Conversation context</li>
              <li>Customizable personalities</li>
              <li>Error handling & retry</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Voice Features</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>Web Speech API</li>
              <li>Speech Recognition</li>
              <li>Speech Synthesis</li>
              <li>Voice customization</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start space-x-3">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold">
              1
            </span>
            <div>
              <h4 className="font-medium">Start Chatting</h4>
              <p className="text-muted-foreground">Go to the main chat page and type your first message to Jadoo.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold">
              2
            </span>
            <div>
              <h4 className="font-medium">Try Voice Input</h4>
              <p className="text-muted-foreground">
                Click the microphone button and speak your message instead of typing.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex items-center justify-center w-6 h-6 bg-purple-500 text-white rounded-full text-xs font-bold">
              3
            </span>
            <div>
              <h4 className="font-medium">Customize Settings</h4>
              <p className="text-muted-foreground">
                Visit the Settings page to choose a personality mode and configure voice options.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
