"use client"
import { headingMap } from "@/app/const/headings"
import { BlockElement } from "@/components/ui/input/block"
import { useBlockElementRef } from "@/lib/hooks/useBlockElementRef"
import { useBlocks } from "@/lib/hooks/useBlocks"
import {
  animateBlockFocus,
  deleteBlock,
  findBlock,
  findIndexBlocks,
  handleBlockConversion,
  scrollElementIntoView
} from "@/lib/utils/textBlockUtils"
import type { ChangeEvent, KeyboardEvent } from "react"

export const Input: React.FC = () => {
  const {
    blocks,
    addBlock,
    updateBlockContent,
    updateBlockType,
    handleFocus,
    handleBlur,
    isComposing,
    setIsComposing
  } = useBlocks()
  const { setBlockElementRef, focusBlockElement } = useBlockElementRef()

  const handleBlockClick = (blockId: string) => {
    const index = findIndexBlocks(blocks, blockId)
    focusBlockElement(String(index))
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    blockId: string
  ) => {
    const block = findBlock(blocks, blockId)
    const input = e.target as HTMLInputElement
    if (block?.type === "input" && input.value in headingMap) {
      handleBlockConversion(
        e,
        blockId,
        headingMap[input.value],
        updateBlockType,
        updateBlockContent,
        focusBlockElement
      )
      return
    }

    if (e.code === "Space" && /^#{1,3}$/.test(input.value)) {
      const level = input.value.length
      const headingType =
        `heading${level === 1 ? "One" : level === 2 ? "Two" : "Three"}` as const
      handleBlockConversion(
        e,
        blockId,
        headingType,
        updateBlockType,
        updateBlockContent,
        focusBlockElement
      )
      return
    }

    if (block?.type !== "input" && input.value === "/p") {
      handleBlockConversion(
        e,
        blockId,
        headingMap[input.value],
        updateBlockType,
        updateBlockContent,
        focusBlockElement
      )
      return
    }

    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault()
      const newBlock = addBlock(blockId)
      animateBlockFocus(newBlock.id, focusBlockElement)
      return
    }

    if (e.key === "Backspace" && input.value === "") {
      e.preventDefault()
      if (blocks.length > 1) {
        deleteBlock(blocks, blockId, focusBlockElement)
        return
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      const index = findIndexBlocks(blocks, blockId)
      if (index > 0) {
        const prevBlock = blocks[index - 1]
        focusBlockElement(prevBlock.id)
        scrollElementIntoView(prevBlock.id)
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const index = findIndexBlocks(blocks, blockId)
      if (index < blocks.length - 1) {
        const nextBlock = blocks[index + 1]
        focusBlockElement(nextBlock.id)
        scrollElementIntoView(nextBlock.id)
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, blockId: string) => {
    updateBlockContent(blockId, e.target.value)
  }

  return (
    <div className="max-w-2xl mx-2">
      {blocks.map((block) => (
        <BlockElement
          key={block.id}
          block={block}
          onBlockClick={handleBlockClick}
          onKeyDown={(e) => handleKeyDown(e, block.id)}
          onChange={handleChange}
          setIsComposing={setIsComposing}
          setBlockElementRef={setBlockElementRef}
          isFocused={block.isFocused}
          handleFocus={() => handleFocus(block.id)}
          handleBlur={() => handleBlur(block.id)}
        />
      ))}
    </div>
  )
}
