import type { Block } from "@/types/type"

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
