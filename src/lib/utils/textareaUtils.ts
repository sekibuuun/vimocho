import type { Block } from "@/types/type"

export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}

export const findIndexBlocks = (blocks: Block[], blockId: string): number =>
  blocks.findIndex((block) => block.id === blockId)

export const scrollElementIntoView = (elementId: string) => {
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId)
    element?.scrollIntoView({ behavior: "smooth", block: "end" })
  })
}
