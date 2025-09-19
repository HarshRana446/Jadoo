"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { VoiceControls } from "@/components/voice-controls"
import { Save, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PersonalityMode {
  id: string
  name: string
  description: string
  systemPrompt: string
}

const PERSONALITY_MODES: PersonalityMode[] = [
  {
    id: "default",
    name: "Jadoo (Default)",
    description: "Helpful and friendly AI assistant",
    systemPrompt:
      "You are Jadoo, a helpful and friendly AI assistant. You have a warm, conversational personality and enjoy helping users with a wide variety of tasks. Keep your responses helpful, engaging, and concise.",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Formal and business-focused responses",
    systemPrompt:
      "You are Jadoo, a professional AI assistant. Provide clear, concise, and formal responses. Focus on accuracy and efficiency while maintaining a respectful tone.",
  },
  {
    id: "friendly",
    name: "Friendly",
    description: "Casual and enthusiastic personality",
    systemPrompt:
      "You are Jadoo, a friendly and enthusiastic AI assistant. Use a casual, upbeat tone and show genuine interest in helping. Feel free to use appropriate humor and be conversational.",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Imaginative and artistic responses",
    systemPrompt:
      "You are Jadoo, a creative and imaginative AI assistant. Approach problems with creativity and think outside the box. Encourage artistic expression and innovative solutions.",
  },
  {
    id: "analytical",
    name: "Analytical",
    description: "Logical and detail-oriented responses",
    systemPrompt:
      "You are Jadoo, an analytical AI assistant. Provide detailed, logical responses with clear reasoning. Break down complex problems step by step and focus on accuracy and thoroughness.",
  },
]

export function SettingsForm() {
  const [selectedPersonality, setSelectedPersonality] = useState("default")
  const [hasChanges, setHasChanges] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedPersonality = localStorage.getItem("jadoo-personality-mode")
      if (savedPersonality) {
        setSelectedPersonality(savedPersonality)
      }
    }
  }, [])

  const handlePersonalityChange = (personalityId: string) => {
    setSelectedPersonality(personalityId)
    setHasChanges(true)
  }

  const saveSettings = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jadoo-personality-mode", selectedPersonality)
    }
    setHasChanges(false)
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const resetSettings = () => {
    setSelectedPersonality("default")
    if (typeof window !== "undefined") {
      localStorage.removeItem("jadoo-personality-mode")
      localStorage.removeItem("jadoo-speak-replies")
      localStorage.removeItem("jadoo-selected-voice")
      localStorage.removeItem("jadoo-speech-rate")
      localStorage.removeItem("jadoo-speech-pitch")
      localStorage.removeItem("jadoo-speech-volume")
      setHasChanges(false)
      toast({
        title: "Settings reset",
        description: "All settings have been reset to defaults.",
      })
      window.location.reload()
    }
  }

  if (!mounted) {
    return <div className="space-y-6">Loading...</div>
  }

  const selectedPersonalityData = PERSONALITY_MODES.find((p) => p.id === selectedPersonality) || PERSONALITY_MODES[0]

  return (
    <div className="space-y-6">
      {/* Personality Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Personality Mode</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Choose Jadoo's personality</Label>
            <Select value={selectedPersonality} onValueChange={handlePersonalityChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERSONALITY_MODES.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">{selectedPersonalityData.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">{selectedPersonalityData.description}</p>
            <p className="text-xs text-muted-foreground italic">"{selectedPersonalityData.systemPrompt}"</p>
          </div>
        </div>
      </Card>

      <Separator />

      {/* Voice Settings */}
      <VoiceControls />

      <Separator />

      {/* Data & Privacy */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Local Storage</h4>
            <p className="text-sm text-muted-foreground">
              Your chat history and settings are stored locally in your browser. No data is sent to external servers
              except for AI responses.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">OpenAI Integration</h4>
            <p className="text-sm text-muted-foreground">
              Messages are sent to OpenAI's API to generate responses. Please review OpenAI's privacy policy for more
              information.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6">
        <Button variant="outline" onClick={resetSettings}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Settings
        </Button>

        <Button onClick={saveSettings} disabled={!hasChanges}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
