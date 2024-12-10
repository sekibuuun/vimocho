"use client"

import { TextareaBlock } from "@/components/ui/input/textareaBlock"
import { useBlocks } from "@/lib/hooks/useBlocks"
import { useTextareaRefs } from "@/lib/hooks/useTextareaRef"
import { adjustTextareaHeight } from "@/lib/utils/adjustTextarea"
import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

export const Input: React.FC = () => {
  const { blocks, addBlock, updateBlockContent, handleFocus, handleBlur } =
    useBlocks()
  const { setTextareaRef, focusTextarea } = useTextareaRefs()

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
      requestAnimationFrame(() => focusTextarea(newBlock.id))
    }

    if (e.key === "ArrowUp" && e.currentTarget.selectionStart === 0) {
      e.preventDefault()
      const index = blocks.findIndex((block) => block.id === blockId)
      if (index > 0) {
        focusTextarea(blocks[index - 1].id)
      }
    }

    if (
      e.key === "ArrowDown" &&
      e.currentTarget.selectionStart === e.currentTarget.value.length
    ) {
      e.preventDefault()
      const index = blocks.findIndex((block) => block.id === blockId)
      if (index < blocks.length - 1) {
        focusTextarea(blocks[index + 1].id)
      }
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
          setTextareaRef={setTextareaRef}
          isFocused={block.isFocused}
          handleFocus={() => handleFocus(block.id)}
          handleBlur={() => handleBlur(block.id)}
        />
      ))}
    </div>
  )
}
