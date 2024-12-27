import type { Block, BlockType } from "@/types/type"
import type { ChangeEvent, KeyboardEvent } from "react"

export const findIndexBlocks = (blocks: Block[], blockId: string): number =>
  blocks.findIndex((block) => block.id === blockId)

export const findBlock = (
  blocks: Block[],
  blockId: string
): Block | undefined => blocks.find((block) => block.id === blockId)

export const scrollElementIntoView = (elementId: string) => {
  if (!elementId) return
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId)
    try {
      element?.scrollIntoView({ behavior: "smooth", block: "end" })
    } catch {
      console.error("指定された要素までスクロールできませんでした")
    }
  })
}

export const deleteBlock = (
  blocks: Block[],
  blockId: string,
  focusBlockElement: (blockId: string) => void
) => {
  const index = findIndexBlocks(blocks, blockId)
  if (index === -1) return
  blocks.splice(index, 1)
  if (index > 0) {
    const prevBlockId = blocks[index - 1].id
    focusBlockElement(prevBlockId)
  }
}

export const animateBlockFocus = (
  blockId: string,
  focusBlockElement: (blockId: string) => void
) => requestAnimationFrame(() => focusBlockElement(blockId))

export const getHeadingStyles = (type: BlockType): string => {
  switch (type) {
    case "headingOne":
      return "text-3xl font-bold"
    case "headingTwo":
      return "text-2xl font-bold"
    case "headingThree":
      return "text-xl font-bold"
    default:
      return "leading-normal"
  }
}

export const getBlockHeight = (type: BlockType): string => {
  if (type.startsWith("heading")) {
    return "min-h-[2rem]"
  }
  return "min-h-[1rem]"
}

export const handleBlockConversion = (
  e: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>,
  blockId: string,
  blockType: BlockType,
  updateBlockType: (blockId: string, type: BlockType) => void,
  updateBlockContent: (blockId: string, content: string) => void,
  focusBlockElement: (blockId: string) => void
) => {
  e.preventDefault()
  updateBlockType(blockId, blockType)
  updateBlockContent(blockId, "")
  animateBlockFocus(blockId, focusBlockElement)
}
