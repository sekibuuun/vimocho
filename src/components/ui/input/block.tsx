import { getBlockHeight, getHeadingStyles } from "@/lib/utils/textBlockUtils"
import type { BlockElementProps } from "@/types/type"
import type React from "react"

export const BlockElement: React.FC<BlockElementProps> = ({
  block,
  onBlockClick,
  onKeyDown,
  onChange,
  setBlockElementRef,
  setIsComposing,
  isFocused,
  handleFocus,
  handleBlur
}) => {
  const getInputClassName = () => {
    const baseClasses =
      "w-full outline-none bg-transparent py-1 overflow-hidden"
    return `${baseClasses} ${getHeadingStyles(block.type)}`
  }

  return (
    <div
      className={`p-1 rounded cursor-text ${getBlockHeight(block.type)}`}
      onClick={() => onBlockClick(block.id)}
    >
      <input
        ref={(el) => setBlockElementRef(el, block.id)}
        type="text"
        className={getInputClassName()}
        value={block.content}
        onChange={(e) => onChange(e, block.id)}
        onFocus={() => handleFocus(block.id)}
        onBlur={() => handleBlur(block.id)}
        onKeyDown={(e) => onKeyDown(e, block.id)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder={
          !isFocused || block.type !== "input"
            ? ""
            : "文字を入力するか、「/」でコマンドを呼び出します..."
        }
      />
    </div>
  )
}
