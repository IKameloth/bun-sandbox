import { RefObject } from 'react'
import { create } from 'zustand'
import {
  mdastExtractHeadings,
  TOCHeading
} from '@/utils/mdast-extract-headings'
import type { Root } from 'mdast'

export type Section = TOCHeading & {
  headingRef: RefObject<HTMLHeadingElement> | null
}
export type TocState = {
  sections: Section[]
  update: (mdast: Root) => void
  registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => void
}

export const useTocStore = create<TocState>((set, get) => ({
  sections: [],
  update: (mdast: Root) => {
    if (mdast) {
      const prevSections = get().sections

      const sections = mdastExtractHeadings(mdast).map(head => {
        const prev = prevSections.find(section => section.id === head.id)

        return {
          ...head,
          headingRef: prev ? prev.headingRef : null
        }
      })
      set({ sections })
    } else {
      set({ sections: [] })
    }
  },
  registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => {
    set(state => ({
      sections: state.sections.map(section =>
        section.id === id ? { ...section, headingRef: ref } : section
      )
    }))
  }
}))
