export type Step = { title: string; desc: string }
export type SectionVideo =
  | { type: "file"; src: string; note?: string }
  | { type: "youtube"; src: string; note?: string }

export type Section = {
  heading: string
  steps: Step[]
  video?: SectionVideo
}

export type Guide = {
  title: string
  intro: string
  sections: Section[]   // ← độ dài tùy ý: 5 cho Binance, 3 cho Bybit...
}
