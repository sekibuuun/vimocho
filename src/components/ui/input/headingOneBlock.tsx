import type { HeadingElementProps } from "@/types/type"
import type React from "react"

export const HeadingOneBlock: React.FC<HeadingElementProps> = ({
  block,
  onBlockClick,
  onKeyDown,
  onChange,
  setBlockElementRef,
  setIsComposing,
  handleFocus,
  handleBlur
}) => (
  <div
    className="min-h-[2rem] p-1 rounded cursor-text"
    onClick={() => onBlockClick(block.id)}
  >
    <h1
      ref={(el) => setBlockElementRef(el, block.id)}
      className="w-full outline-none bg-transparent py-1 text-3xl font-bold"
      contentEditable
      onChange={(e) => onChange(e, block.id)}
      onFocus={() => handleFocus(block.id)}
      onBlur={() => handleBlur(block.id)}
      onKeyDown={(e) => onKeyDown(e, block.id)}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      suppressContentEditableWarning
      aria-multiline="false"
      aria-label="heading-one"
    >
      {block.content}
    </h1>
  </div>
)
