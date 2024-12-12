"use client"

import type { BlockElementMap, KindOfElementType } from "@/types/type"
import { useRef } from "react"

export const useBlockElementRef = () => {
  const blockElementRefs = useRef<BlockElementMap>({})

  const setBlockElementRef = (element: KindOfElementType, blockId: string) => {
    if (!element) {
      delete blockElementRefs.current[blockId]
      return
    }
    blockElementRefs.current[blockId] = element
  }

  const focusBlockElement = (blockId: string) => {
    const textBlock = blockElementRefs.current[blockId]
    console.log(textBlock)
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
