"use client"

import { useRef } from "react"

export const useTextareaRefs = () => {
  const refs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({})

  const setRef = (element: HTMLTextAreaElement | null, blockId: string) => {
    refs.current[blockId] = element
  }

  const focusTextarea = (blockId: string) => {
    const textarea = refs.current[blockId]
    if (textarea) {
      textarea.focus()
    }
  }

  return {
    setRef,
    focusTextarea
  }
}
