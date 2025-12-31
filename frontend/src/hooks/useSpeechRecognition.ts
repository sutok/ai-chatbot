'use client'

import { useState, useEffect, useCallback } from 'react'

// Web Speech API 型定義
interface ISpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: ISpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null
  start(): void
  stop(): void
  abort(): void
}

interface ISpeechRecognitionEvent {
  resultIndex: number
  results: ISpeechRecognitionResultList
}

interface ISpeechRecognitionResultList {
  readonly length: number
  [index: number]: ISpeechRecognitionResult
}

interface ISpeechRecognitionResult {
  readonly length: number
  readonly isFinal: boolean
  [index: number]: ISpeechRecognitionAlternative
}

interface ISpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}

interface ISpeechRecognitionErrorEvent {
  readonly error: string
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition?: ISpeechRecognitionConstructor
    webkitSpeechRecognition?: ISpeechRecognitionConstructor
  }
}

interface SpeechRecognitionHook {
  transcript: string
  isListening: boolean
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [recognition, setRecognition] = useState<ISpeechRecognition | null>(null)

  useEffect(() => {
    // ブラウザ対応チェック
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognitionClass) {
      setIsSupported(true)
      const rec = new SpeechRecognitionClass()
      rec.continuous = false
      rec.interimResults = true
      rec.lang = 'ja-JP'

      rec.onresult = (event) => {
        const current = event.resultIndex
        const result = event.results[current]
        if (result.isFinal) {
          setTranscript(result[0].transcript)
        }
      }

      rec.onend = () => {
        setIsListening(false)
      }

      rec.onerror = (event) => {
        console.error('音声認識エラー:', event.error)
        setIsListening(false)
      }

      setRecognition(rec)
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setTranscript('')
      recognition.start()
      setIsListening(true)
    }
  }, [recognition, isListening])

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }, [recognition, isListening])

  const resetTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  }
}
