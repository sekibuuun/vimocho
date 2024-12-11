import type { ChangeEvent, KeyboardEvent } from "react"

export type Block = {
  id: string
  content: string
  isFocused: boolean
}

export type TextAreaElementMap = { [key: string]: HTMLTextAreaElement | null }

export type TextareaBlockProps = {
  block: Block
  onBlockClick: (blockId: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>, blockId: string) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, blockId: string) => void
  setTextareaRef: (element: HTMLTextAreaElement | null, blockId: string) => void
  setIsComposing: (isComposing: boolean) => void
  isFocused: boolean
  handleFocus: (blockId: string) => void
  handleBlur: (blockId: string) => void
}
