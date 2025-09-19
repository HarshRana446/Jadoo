export interface VoiceSettings {
  speakReplies: boolean
  selectedVoice: string | null
  speechRate: number
  speechPitch: number
  speechVolume: number
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  speakReplies: true,
  selectedVoice: null,
  speechRate: 1,
  speechPitch: 1,
  speechVolume: 1,
}

export function getVoiceSettings(): VoiceSettings {
  if (typeof window === "undefined") return DEFAULT_VOICE_SETTINGS

  try {
    const speakReplies = localStorage.getItem("jadoo-speak-replies") !== "false"
    const selectedVoice = localStorage.getItem("jadoo-selected-voice")
    const speechRate = Number.parseFloat(localStorage.getItem("jadoo-speech-rate") || "1")
    const speechPitch = Number.parseFloat(localStorage.getItem("jadoo-speech-pitch") || "1")
    const speechVolume = Number.parseFloat(localStorage.getItem("jadoo-speech-volume") || "1")

    return {
      speakReplies,
      selectedVoice,
      speechRate: isNaN(speechRate) ? 1 : speechRate,
      speechPitch: isNaN(speechPitch) ? 1 : speechPitch,
      speechVolume: isNaN(speechVolume) ? 1 : speechVolume,
    }
  } catch {
    return DEFAULT_VOICE_SETTINGS
  }
}

export function saveVoiceSettings(settings: Partial<VoiceSettings>) {
  if (typeof window === "undefined") return

  if (settings.speakReplies !== undefined) {
    localStorage.setItem("jadoo-speak-replies", settings.speakReplies.toString())
  }
  if (settings.selectedVoice !== undefined) {
    if (settings.selectedVoice) {
      localStorage.setItem("jadoo-selected-voice", settings.selectedVoice)
    } else {
      localStorage.removeItem("jadoo-selected-voice")
    }
  }
  if (settings.speechRate !== undefined) {
    localStorage.setItem("jadoo-speech-rate", settings.speechRate.toString())
  }
  if (settings.speechPitch !== undefined) {
    localStorage.setItem("jadoo-speech-pitch", settings.speechPitch.toString())
  }
  if (settings.speechVolume !== undefined) {
    localStorage.setItem("jadoo-speech-volume", settings.speechVolume.toString())
  }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return []
  }

  return speechSynthesis.getVoices()
}

export function speakText(text: string, settings?: Partial<VoiceSettings>) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported")
    return
  }

  // Stop any current speech
  speechSynthesis.cancel()

  const voiceSettings = { ...getVoiceSettings(), ...settings }

  if (!voiceSettings.speakReplies) return

  const utterance = new SpeechSynthesisUtterance(text)

  // Apply voice settings
  utterance.rate = voiceSettings.speechRate
  utterance.pitch = voiceSettings.speechPitch
  utterance.volume = voiceSettings.speechVolume

  // Set selected voice
  if (voiceSettings.selectedVoice) {
    const voices = getAvailableVoices()
    const voice = voices.find((v) => v.name === voiceSettings.selectedVoice)
    if (voice) {
      utterance.voice = voice
    }
  }

  speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    speechSynthesis.cancel()
  }
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window
}

export function startSpeechRecognition(
  onResult: (transcript: string) => void,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: string) => void,
): (() => void) | null {
  if (!isSpeechRecognitionSupported()) {
    onError?.("Speech recognition is not supported in your browser")
    return null
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = "en-US"

  recognition.onstart = () => {
    onStart?.()
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    onResult(transcript)
  }

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error)
    onError?.(event.error)
  }

  recognition.onend = () => {
    onEnd?.()
  }

  recognition.start()

  // Return a function to stop recognition
  return () => {
    recognition.stop()
  }
}
