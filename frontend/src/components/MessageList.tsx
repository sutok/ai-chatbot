'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { MessageBubble } from './MessageBubble'
import { LoadingIndicator } from './LoadingIndicator'
import { Avatar } from './Avatar'

interface MessageListProps {
  messages: ChatMessage[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
        <Avatar size="lg" />
        <p className="mt-4 text-center">
          こんにちは！ロボです。
          <br />
          何でもお話ししてくださいね。
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <div className="flex gap-3">
          <Avatar size="sm" />
          <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
            <LoadingIndicator />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
