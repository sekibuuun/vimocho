"use client"

import type { Block } from "@/types/type"
import { useState } from "react"

export const useBlocks = (
  initialBlocks: Block[] = [{ id: "1", content: "" }]
) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)

  const addBlock = (currentBlockId: string) => {
    const newBlock: Block = { id: Date.now().toString(), content: "" }
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === currentBlockId)
      const newBlocks = [...prev]
      newBlocks.splice(index + 1, 0, newBlock)
      return newBlocks
    })
    return newBlock
  }

  const updateBlockContent = (blockId: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, content } : block
      )
    )
  }

  return {
    blocks,
    addBlock,
    updateBlockContent
  }
}
