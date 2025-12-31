'use client'

import { useRef, ChangeEvent } from 'react'
import { ImageData } from '@/types/chat'

interface ImageUploadButtonProps {
  onImageSelect: (image: ImageData | null) => void
  selectedImage: ImageData | null
  isDisabled: boolean
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function ImageUploadButton({
  onImageSelect,
  selectedImage,
  isDisabled,
}: ImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (selectedImage) {
      onImageSelect(null)
    } else {
      inputRef.current?.click()
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルタイプチェック
    if (!ALLOWED_TYPES.includes(file.type as typeof ALLOWED_TYPES[number])) {
      alert('対応している画像形式: JPEG, PNG, GIF, WebP')
      return
    }

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      alert('画像サイズは5MB以下にしてください')
      return
    }

    // Base64に変換
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]
      onImageSelect({
        media_type: file.type as ImageData['media_type'],
        data: base64,
      })
    }
    reader.readAsDataURL(file)

    // 同じファイルを再選択できるようにリセット
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`p-2 rounded-full transition-colors ${
          selectedImage
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={selectedImage ? '画像を削除' : '画像を添付'}
      >
        {selectedImage ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        )}
      </button>
    </>
  )
}
