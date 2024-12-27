// libs/constants/headings.ts
import type { BlockType } from "@/types/type"

export const headingMap: Record<string, BlockType> = {
  "/h1": "headingOne",
  "/h2": "headingTwo",
  "/h3": "headingThree",
  "/p": "input"
} as const
