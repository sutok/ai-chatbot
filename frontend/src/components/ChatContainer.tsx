'use client'

import { useChat } from '@/hooks/useChat'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { Avatar } from './Avatar'

export function ChatContainer() {
  const { messages, isLoading, sendChatMessage, clearMessages, isLoaded } = useChat()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="md" />
          <div>
            <h1 className="font-bold text-gray-800">ロボ</h1>
            <p className="text-xs text-gray-500">癒し系チャットボット</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
          >
            履歴クリア
          </button>
        )}
      </header>

      {/* メッセージリスト */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* 入力欄 */}
      <ChatInput onSend={sendChatMessage} isLoading={isLoading} />
    </div>
  )
}
