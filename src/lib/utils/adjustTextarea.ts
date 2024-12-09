export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}
