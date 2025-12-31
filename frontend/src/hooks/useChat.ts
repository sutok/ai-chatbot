'use client'

import { useState, useCallback } from 'react'
import { ChatMessage } from '@/types/chat'
import { sendMessage } from '@/lib/api'
import { useLocalStorage } from './useLocalStorage'

interface UseChatReturn {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendChatMessage: (message: string) => Promise<void>
  clearMessages: () => void
  isLoaded: boolean
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useChat(): UseChatReturn {
  const { storedValue: messages, setValue: setMessages, clearValue: clearMessages, isLoaded } =
    useLocalStorage<ChatMessage[]>('robo-chat-history', [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendChatMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return

    setError(null)
    setIsLoading(true)

    // ユーザーメッセージを追加
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: message.trim(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    // アシスタントメッセージを準備
    const assistantMessage: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: '',
    }

    try {
      // ストリーミングでレスポンスを受信
      await sendMessage(
        message,
        updatedMessages,
        (chunk) => {
          assistantMessage.content += chunk
          setMessages([...updatedMessages, { ...assistantMessage }])
        }
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'エラーが発生しました'
      setError(errorMessage)
      // エラー時はアシスタントメッセージにエラーを表示
      assistantMessage.content = 'ごめんなさい、エラーが発生しました。もう一度お試しください。'
      setMessages([...updatedMessages, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading, setMessages])

  return {
    messages,
    isLoading,
    error,
    sendChatMessage,
    clearMessages,
    isLoaded,
  }
}
