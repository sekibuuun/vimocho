"use client"

import { TextareaBlock } from "@/components/ui/input/textareaBlock"
import { useBlocks } from "@/lib/hooks/useBlocks"
import { useTextareaRefs } from "@/lib/hooks/useTextareaRef"
import {
  adjustTextareaHeight,
  findIndexBlocks,
  scrollElementIntoView
} from "@/lib/utils/textareaUtils"
import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

export const Input: React.FC = () => {
  const { blocks, addBlock, updateBlockContent, handleFocus, handleBlur } =
    useBlocks()
  const { refs, setTextareaRef, focusTextarea } = useTextareaRefs()

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
      const index = findIndexBlocks(blocks, blockId)
      if (index > 0) {
        const prevBlockId = blocks[index - 1].id
        focusTextarea(prevBlockId)
        scrollElementIntoView(prevBlockId)
      }
    }

    if (
      e.key === "ArrowDown" &&
      e.currentTarget.selectionStart === e.currentTarget.value.length
    ) {
      e.preventDefault()
      const index = findIndexBlocks(blocks, blockId)
      if (index < blocks.length - 1) {
        const nextBlockId = blocks[index + 1].id
        focusTextarea(nextBlockId)
        scrollElementIntoView(nextBlockId)
      }
    }

    if (e.key === "Backspace" && e.currentTarget.value === "") {
      e.preventDefault()
      if (refs.current[blockId]?.value === "" && blocks.length > 1) {
        // 切り出したい
        refs.current[blockId]?.remove()
        const index = findIndexBlocks(blocks, blockId)
        blocks.splice(index, 1)
        const prevBlockId = blocks[index - 1].id
        focusTextarea(prevBlockId)
        console.log(blocks)
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
          onKeyDown={(e) => handleKeyDown(e, block.id)}
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
