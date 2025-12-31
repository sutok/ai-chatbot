'use client'

interface VoiceInputButtonProps {
  isListening: boolean
  isSupported: boolean
  onClick: () => void
}

export function VoiceInputButton({ isListening, isSupported, onClick }: VoiceInputButtonProps) {
  if (!isSupported) {
    return null
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-full transition-colors ${
        isListening
          ? 'bg-red-500 text-white animate-pulse'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
      title={isListening ? '録音中...' : '音声入力'}
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
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    </button>
  )
}
