import type { ChangeEvent, KeyboardEvent } from "react"

export type BlockType = "input" | "headingOne" | "headingTwo" | "headingThree"

export type Block = {
  id: string
  content: string
  isFocused: boolean
  type: BlockType
}

export type InputElementMap = { [key: string]: HTMLInputElement | null }

export type BlockElementProps = {
  block: Block
  onBlockClick: (blockId: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>, blockId: string) => void
  onChange: (e: ChangeEvent<HTMLInputElement>, blockId: string) => void
  setBlockElementRef: (
    element: HTMLInputElement | null,
    blockId: string
  ) => void
  setIsComposing: (isComposing: boolean) => void
  isFocused?: boolean
  handleFocus: (blockId: string) => void
  handleBlur: (blockId: string) => void
}
