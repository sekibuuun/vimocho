"use client"

import type { InputElementMap } from "@/types/type"
import { useRef } from "react"

export const useBlockElementRef = () => {
  const blockElementRefs = useRef<InputElementMap>({})

  const setBlockElementRef = (
    element: HTMLInputElement | null,
    blockId: string
  ) => {
    if (!element) {
      delete blockElementRefs.current[blockId]
      return
    }
    blockElementRefs.current[blockId] = element
  }

  const focusBlockElement = (blockId: string) => {
    const textBlock = blockElementRefs.current[blockId]
    if (textBlock) {
      textBlock.focus()
    }
  }

  return {
    blockElementRefs,
    setBlockElementRef,
    focusBlockElement
  }
}
