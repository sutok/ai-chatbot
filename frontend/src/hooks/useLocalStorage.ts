'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 初期値を取得（SSR対応）
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // マウント時にローカルストレージから読み込み
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error('ローカルストレージの読み込みに失敗しました:', error)
    }
    setIsLoaded(true)
  }, [key])

  // 値を保存
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('ローカルストレージへの保存に失敗しました:', error)
    }
  }

  // 値をクリア
  const clearValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('ローカルストレージのクリアに失敗しました:', error)
    }
  }

  return { storedValue, setValue, clearValue, isLoaded }
}
