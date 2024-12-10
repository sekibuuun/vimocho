import type { Block } from "@/types/type"

export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}

export const findIndexBlocks = (blocks: Block[], blockId: string): number =>
  blocks.findIndex((block) => block.id === blockId)
