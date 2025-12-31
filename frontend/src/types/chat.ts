export interface ImageData {
  media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
  data: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  image?: ImageData
  id: string
}

export interface ChatRequest {
  message: string
  image?: ImageData
  history: Omit<ChatMessage, 'id'>[]
}
