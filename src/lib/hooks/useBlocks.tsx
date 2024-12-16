"use client"

import type { Block, BlockType } from "@/types/type"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { findIndexBlocks } from "../utils/textBlockUtils"

export const useBlocks = (
  initialBlocks: Block[] = [
    { id: uuidv4(), content: "", isFocused: true, type: "input" }
  ]
) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [isComposing, setIsComposing] = useState<boolean>(false)

  const addBlock = (currentBlockId: string) => {
    const newBlock: Block = {
      id: uuidv4(),
      content: "",
      isFocused: true,
      type: "input"
    }
    setBlocks((prev) => {
      const index = findIndexBlocks(prev, currentBlockId)
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

  const updateBlockType = (blockId: string, type: BlockType) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === blockId ? { ...block, type } : block))
    )
  }

  const handleFocus = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? { ...block, isFocused: true }
          : { ...block, isFocused: false }
      )
    )
  }

  const handleBlur = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, isFocused: false } : block
      )
    )
  }

  return {
    blocks,
    addBlock,
    updateBlockContent,
    updateBlockType,
    handleFocus,
    handleBlur,
    isComposing,
    setIsComposing
  }
}
