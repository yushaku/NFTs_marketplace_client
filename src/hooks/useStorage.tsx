import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const storageObject =
    typeof window !== 'undefined' ? window.localStorage : null
  return useStorage<T>(key, defaultValue, storageObject)
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const storageObject =
    typeof window !== 'undefined' ? window.sessionStorage : null
  return useStorage<T>(key, defaultValue, storageObject)
}

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageObject: Storage | null
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = useState<T>(() => {
    if (storageObject) {
      const jsonValue = storageObject.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)
    }

    if (typeof defaultValue === 'function') {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (storageObject) {
      if (value === undefined) return storageObject.removeItem(key)
      storageObject.setItem(key, JSON.stringify(value))
    }
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined as unknown as T)
  }, [])

  return [value, setValue, remove]
}
