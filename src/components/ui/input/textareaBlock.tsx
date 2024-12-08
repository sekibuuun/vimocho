import type { Block } from "@/types/type"
import type React from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
export const TextareaBlock: React.FC<{
  block: Block
  onBlockClick: (blockId: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>, blockId: string) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>, blockId: string) => void
  setTextareaRef: (element: HTMLTextAreaElement | null, blockId: string) => void
}> = ({ block, onBlockClick, onKeyDown, onChange, setTextareaRef }) => (
  <div
    className="min-h-[2rem] p-2 rounded hover:bg-gray-50 cursor-text mb-1"
    onClick={() => onBlockClick(block.id)}
  >
    <textarea
      ref={(el) => setTextareaRef(el, block.id)}
      className="w-full resize-none outline-none bg-transparent py-1"
      value={block.content}
      onChange={(e) => onChange(e, block.id)}
      onKeyDown={(e) => onKeyDown(e, block.id)}
      placeholder="Type something..."
      rows={1}
      style={{
        overflow: "hidden",
        lineHeight: "1.5"
      }}
    />
  </div>
)
