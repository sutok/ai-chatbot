'use client'

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0`}
    >
      {/* アバター画像がない場合のプレースホルダー */}
      <span className="text-primary-600 font-bold text-sm">ロボ</span>
    </div>
  )
}
