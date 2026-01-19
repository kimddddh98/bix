import { useEffect, useRef } from 'react'

export function useObserver(callback: () => void, enabled: boolean) {
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled || !observerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      },
      {
        rootMargin: '100px',
      }
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [callback, enabled])

  return {
    observerRef,
  }
}
