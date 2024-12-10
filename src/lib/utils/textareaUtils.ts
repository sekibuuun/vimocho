import type { Block, TextAreaElementMap } from "@/types/type"
import type { RefObject } from "react"

export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}

export const findIndexBlocks = (blocks: Block[], blockId: string): number =>
  blocks.findIndex((block) => block.id === blockId)

export const scrollElementIntoView = (elementId: string) => {
  if (!elementId) return
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId)
    element?.scrollIntoView({ behavior: "smooth", block: "end" })
    if (!element) {
      console.warn("要素が見つかりません")
      return
    }
    try {
      element.scrollIntoView({ behavior: "smooth", block: "end" })
    } catch {
      console.error("指定された要素までスクロールできませんでした")
    }
  })
}

export const deleteBlock = (
  refs: RefObject<TextAreaElementMap>,
  blocks: Block[],
  blockId: string,
  focusTextarea: (blockId: string) => void
) => {
  const index = findIndexBlocks(blocks, blockId)
  refs.current[blockId]?.remove()
  blocks.splice(index, 1)
  const prevBlockId = blocks[index - 1].id
  focusTextarea(prevBlockId)
}
