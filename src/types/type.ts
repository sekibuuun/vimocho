import type { ChangeEvent, FormEvent, KeyboardEvent } from "react"

type BlockType = "textarea" | "headingOne"

export type KindOfElementType = HTMLTextAreaElement | HTMLHeadingElement | null

export type Block = {
  id: string
  content: string
  isFocused: boolean
  type: BlockType
}

export type TextAreaElementMap = { [key: string]: HTMLTextAreaElement | null }

export type HeadingElementMap = { [key: string]: HTMLHeadingElement | null }

export type BlockElementMap = {
  [key: string]: KindOfElementType
}

export type BlockElementProps = {
  block: Block
  onBlockClick: (blockId: string) => void
  onKeyDown: (e: KeyboardEvent<KindOfElementType>, blockId: string) => void
  setBlockElementRef: (element: KindOfElementType, blockId: string) => void
  setIsComposing: (isComposing: boolean) => void
  isFocused?: boolean
  handleFocus: (blockId: string) => void
  handleBlur: (blockId: string) => void
}

export type TextAreaElementProps = BlockElementProps & {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, blockId: string) => void
}
export type HeadingElementProps = BlockElementProps & {
  onChange: (e: FormEvent<HTMLHeadingElement>, blockId: string) => void
}
