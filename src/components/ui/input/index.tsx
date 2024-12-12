"use client"

import { HeadingOneBlock } from "@/components/ui/input/headingOneBlock"
import { TextareaBlock } from "@/components/ui/input/textareaBlock"
import { useBlockElementRef } from "@/lib/hooks/useBlockElementRef"
import { useBlocks } from "@/lib/hooks/useBlocks"
import {
  adjustTextareaHeight,
  animateBlockFocus,
  deleteBlock,
  findBlock,
  findIndexBlocks,
  scrollElementIntoView
} from "@/lib/utils/textBlockUtils"
import type { Block, KindOfElementType } from "@/types/type"
import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

export const Input: React.FC = () => {
  const {
    blocks,
    addBlock,
    updateBlockContent,
    updateBlockType,
    handleFocus,
    handleBlur,
    setIsComposing
  } = useBlocks()
  const { setBlockElementRef, focusBlockElement } = useBlockElementRef()

  const handleBlockClick = (blockId: string) => {
    const index = findIndexBlocks(blocks, blockId)
    focusBlockElement(String(index))
  }

  const handleKeyDown = (
    e: KeyboardEvent<KindOfElementType>,
    blockId: string
  ) => {
    const block = findBlock(blocks, blockId)

    if (block?.type === "textarea") {
      const textarea = e.target as HTMLTextAreaElement
      if (textarea.value === "/h1") {
        e.preventDefault()
        updateBlockType(blockId, "headingOne")
        updateBlockContent(blockId, "")
        animateBlockFocus(blockId, focusBlockElement)
        return
      }
    }

    if (block?.type === "headingOne") {
      const heading = e.target as HTMLHeadingElement
      if (heading.textContent === "/p") {
        e.preventDefault()
        updateBlockType(blockId, "textarea")
        updateBlockContent(blockId, "")
        animateBlockFocus(blockId, focusBlockElement)
        return
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const newBlock = addBlock(blockId)
      animateBlockFocus(newBlock.id, focusBlockElement)
      return
    }

    if (e.key === "Backspace" && e.currentTarget.textContent === "") {
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

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    blockId: string
  ) => {
    updateBlockContent(blockId, e.target.value)
    adjustTextareaHeight(e.target)
  }

  const handleHeadingOneChange = (
    e: React.FormEvent<HTMLHeadingElement>,
    blockId: string
  ) => {
    updateBlockContent(blockId, e.currentTarget.textContent || "")
  }

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "headingOne":
        return (
          <HeadingOneBlock
            key={block.id}
            block={block}
            onBlockClick={handleBlockClick}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            onChange={handleHeadingOneChange}
            setBlockElementRef={setBlockElementRef}
            setIsComposing={setIsComposing}
            handleFocus={() => handleFocus(block.id)}
            handleBlur={() => handleBlur(block.id)}
          />
        )
      default:
        return (
          <TextareaBlock
            key={block.id}
            block={block}
            onBlockClick={handleBlockClick}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
            onChange={handleTextareaChange}
            setIsComposing={setIsComposing}
            setBlockElementRef={setBlockElementRef}
            isFocused={block.isFocused}
            handleFocus={() => handleFocus(block.id)}
            handleBlur={() => handleBlur(block.id)}
          />
        )
    }
  }

  return <div className="max-w-2xl mx-2">{blocks.map(renderBlock)}</div>
}
