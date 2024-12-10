"use client"

import { useRef } from "react"

export const useTextareaRefs = () => {
  const refs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({})

  const setTextareaRef = (
    element: HTMLTextAreaElement | null,
    blockId: string
  ) => {
    if (!element) {
      delete refs.current[blockId]
      return
    }
    refs.current[blockId] = element
  }

  const focusTextarea = (blockId: string) => {
    const textarea = refs.current[blockId]
    if (textarea) {
      textarea.focus()
    }
  }

  return {
    refs,
    setTextareaRef,
    focusTextarea
  }
}
