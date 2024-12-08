export const adjustTextareaHeight = (
  textarea: HTMLTextAreaElement,
  options = { minHeight: 0, maxHeight: Number.POSITIVE_INFINITY }
) => {
  // 現在の高さを保存
  const previousHeight = textarea.style.height

  // 高さをリセット
  textarea.style.height = "auto"

  // 新しい高さを計算
  const newHeight = Math.max(
    options.minHeight,
    Math.min(textarea.scrollHeight, options.maxHeight)
  )

  // 高さが変わる場合のみ更新
  if (`${newHeight}px` !== previousHeight) {
    textarea.style.height = `${newHeight}px`
  }
}
