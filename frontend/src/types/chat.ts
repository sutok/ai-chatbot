export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  id: string
}

export interface ChatRequest {
  message: string
  history: Omit<ChatMessage, 'id'>[]
}
