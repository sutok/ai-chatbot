'use client'

import { ChatMessage } from '@/types/chat'
import { Avatar } from './Avatar'

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && <Avatar size="sm" />}
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-primary-500 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
        }`}
      >
        {/* 添付画像を表示 */}
        {message.image && (
          <div className="mb-2">
            <img
              src={`data:${message.image.media_type};base64,${message.image.data}`}
              alt="添付画像"
              className="max-w-full max-h-64 rounded-lg object-contain"
            />
          </div>
        )}
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  )
}
