import type { Block } from "@/types/type"
import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
export const TextareaBlock: React.FC<{
  block: Block
  onBlockClick: (blockId: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>, blockId: string) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, blockId: string) => void
  setTextareaRef: (element: HTMLTextAreaElement | null, blockId: string) => void
  isFocused: boolean
  handleFocus: (blockId: string) => void
  handleBlur: (blockId: string) => void
}> = ({
  block,
  onBlockClick,
  onKeyDown,
  onChange,
  setTextareaRef,
  isFocused,
  handleFocus,
  handleBlur
}) => (
  <div
    className="min-h-[1rem] p-1 rounded cursor-text"
    onClick={() => onBlockClick(block.id)}
  >
    <textarea
      ref={(el) => setTextareaRef(el, block.id)}
      className="w-full resize-none outline-none bg-transparent py-1 overflow-hidden leading-normal"
      value={block.content}
      onChange={(e) => onChange(e, block.id)}
      onFocus={() => handleFocus(block.id)}
      onBlur={() => handleBlur(block.id)}
      onKeyDown={(e) => onKeyDown(e, block.id)}
      placeholder={`${!isFocused ? "" : "文字を入力するか、「/」でコマンドを呼び出します..."}`}
      rows={1}
      style={{
        overflow: "hidden",
        lineHeight: "1.5"
      }}
    />
  </div>
)
