"use client"

import { TextareaBlock } from "@/components/ui/input/textareaBlock"
import { useBlocks } from "@/lib/hooks/useBlocks"
import { useTextareaRefs } from "@/lib/hooks/useTextareaRef"
import { adjustTextareaHeight } from "@/lib/utils/adjustTextarea"
import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

export const Input: React.FC = () => {
  const { blocks, addBlock, updateBlockContent } = useBlocks()
  const { setRef, focusTextarea } = useTextareaRefs()

  const handleBlockClick = (blockId: string) => {
    focusTextarea(blockId)
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    blockId: string
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const newBlock = addBlock(blockId)

      // 新しいブロックにフォーカスを移動
      setTimeout(() => focusTextarea(newBlock.id), 0)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    blockId: string
  ) => {
    updateBlockContent(blockId, e.target.value)
    adjustTextareaHeight(e.target)
  }

  return (
    <div className="max-w-2xl mx-2">
      {blocks.map((block) => (
        <TextareaBlock
          key={block.id}
          block={block}
          onBlockClick={handleBlockClick}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          setTextareaRef={setRef}
        />
      ))}
    </div>
  )
}
