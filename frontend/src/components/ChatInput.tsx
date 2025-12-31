'use client'

import { useState, useEffect, FormEvent, KeyboardEvent } from 'react'
import { VoiceInputButton } from './VoiceInputButton'
import { ImageUploadButton } from './ImageUploadButton'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { ImageData } from '@/types/chat'

interface ChatInputProps {
  onSend: (message: string, image?: ImageData) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition()

  // 音声認識結果を入力欄に反映
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
      resetTranscript()
    }
  }, [transcript, resetTranscript])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input, selectedImage || undefined)
      setInput('')
      setSelectedImage(null)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // IME変換中は送信しない（日本語入力対応）
    if (e.nativeEvent.isComposing || e.key === 'Process') {
      return
    }
    // Shift+Enterで改行、Enterのみで送信
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleVoiceClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      {/* 画像プレビュー */}
      {selectedImage && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative inline-block">
            <img
              src={`data:${selectedImage.media_type};base64,${selectedImage.data}`}
              alt="添付画像"
              className="h-16 w-16 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <span className="text-sm text-gray-500">画像が添付されています</span>
        </div>
      )}
      <div className="flex items-end gap-2">
        <VoiceInputButton
          isListening={isListening}
          isSupported={isSupported}
          onClick={handleVoiceClick}
        />
        <ImageUploadButton
          onImageSelect={setSelectedImage}
          selectedImage={selectedImage}
          isDisabled={isLoading}
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メッセージを入力..."
          rows={1}
          className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 rounded-full bg-primary-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-1 text-center">
        Enterで送信 / Shift+Enterで改行
      </p>
    </form>
  )
}
