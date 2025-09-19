"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Play, Square } from "lucide-react"
import {
  getVoiceSettings,
  saveVoiceSettings,
  getAvailableVoices,
  speakText,
  stopSpeaking,
  type VoiceSettings,
  DEFAULT_VOICE_SETTINGS,
} from "@/lib/voice-utils"

export function VoiceControls() {
  const [settings, setSettings] = useState<VoiceSettings>(DEFAULT_VOICE_SETTINGS)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSettings(getVoiceSettings())

    // Load voices when component mounts
    const loadVoices = () => {
      const availableVoices = getAvailableVoices()
      setVoices(availableVoices)
    }

    loadVoices()

    // Check speech recognition support
    if (typeof window !== "undefined") {
      setSpeechRecognitionSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)

      // Some browsers load voices asynchronously
      if ("speechSynthesis" in window) {
        speechSynthesis.onvoiceschanged = loadVoices
      }
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        speechSynthesis.onvoiceschanged = null
      }
    }
  }, [])

  const updateSetting = <K extends keyof VoiceSettings>(key: K, value: VoiceSettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveVoiceSettings({ [key]: value })
  }

  const testVoice = () => {
    if (isSpeaking) {
      stopSpeaking()
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true)
      speakText("Hello! This is how Jadoo will sound when speaking to you.", settings)

      // Reset speaking state after a delay
      setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)
    }
  }

  if (!mounted) {
    return <div className="space-y-6">Loading...</div>
  }

  const englishVoices = voices.filter((voice) => voice.lang.startsWith("en"))

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Text-to-Speech Settings</h3>

        <div className="space-y-4">
          {/* Enable/Disable Speech */}
          <div className="flex items-center justify-between">
            <Label htmlFor="speak-replies" className="text-sm font-medium">
              Speak Jadoo's replies
            </Label>
            <Switch
              id="speak-replies"
              checked={settings.speakReplies}
              onCheckedChange={(checked) => updateSetting("speakReplies", checked)}
            />
          </div>

          {settings.speakReplies && (
            <>
              {/* Voice Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Voice</Label>
                <Select
                  value={settings.selectedVoice || "default"}
                  onValueChange={(value) => updateSetting("selectedVoice", value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice (default will be used if none selected)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Voice</SelectItem>
                    {englishVoices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Speech Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Speech Rate: {settings.speechRate.toFixed(1)}x</Label>
                <Slider
                  value={[settings.speechRate]}
                  onValueChange={([value]) => updateSetting("speechRate", value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Speech Pitch */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Speech Pitch: {settings.speechPitch.toFixed(1)}</Label>
                <Slider
                  value={[settings.speechPitch]}
                  onValueChange={([value]) => updateSetting("speechPitch", value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Speech Volume */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Volume: {Math.round(settings.speechVolume * 100)}%</Label>
                <Slider
                  value={[settings.speechVolume]}
                  onValueChange={([value]) => updateSetting("speechVolume", value)}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Test Voice Button */}
              <Button onClick={testVoice} variant="outline" className="w-full bg-transparent">
                {isSpeaking ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop Test
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Test Voice
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Speech Recognition</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Click the microphone button in the chat to use voice input. Speech recognition uses your browser's built-in
            capabilities.
          </p>
          {!speechRecognitionSupported && (
            <p className="text-sm text-destructive">Speech recognition is not supported in your current browser.</p>
          )}
        </div>
      </Card>
    </div>
  )
}
