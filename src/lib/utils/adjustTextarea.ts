export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  // まず高さをautoに設定してスクロールハイトを取得できるようにする
  textarea.style.height = "auto"
  // スクロールハイトに基づいて高さを設定
  textarea.style.height = `${textarea.scrollHeight}px`
}
