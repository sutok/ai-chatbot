import { ChatMessage } from '@/types/chat'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function sendMessage(
  message: string,
  history: ChatMessage[],
  onChunk: (chunk: string) => void
): Promise<void> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history: history.map(({ role, content }) => ({ role, content })),
    }),
  })

  if (!response.ok) {
    throw new Error('チャットの送信に失敗しました')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('ストリーミングレスポンスを取得できませんでした')
  }

  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const text = decoder.decode(value)
    const lines = text.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') {
          return
        }
        onChunk(data)
      }
    }
  }
}
