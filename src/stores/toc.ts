import { RefObject } from 'react'
import { create } from 'zustand'
import {
  mdastExtractHeadings,
  TOCHeading
} from '@/utils/mdast-extract-headings'
import type { Root } from 'mdast'

export type Section = TOCHeading & {
  headingRef: RefObject<HTMLHeadingElement> | null
  outlineRef: RefObject<HTMLLIElement> | null
  isVisible: boolean
}

export type TocState = {
  sections: Section[]
  update: (mdast: Root) => void
  registerHeading: (id: string, ref: RefObject<HTMLHeadingElement>) => void
  registerOutlineItem: (id: string, ref: RefObject<HTMLLIElement>) => void
  setVisibleHeadings: (id: string[]) => void
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
          headingRef: prev ? prev.headingRef : null,
          outlineRef: prev ? prev.outlineRef : null,
          isVisible: false
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
  },
  registerOutlineItem: (id: string, ref: RefObject<HTMLLIElement>) => {
    set(state => ({
      sections: state.sections.map(section =>
        section.id === id ? { ...section, outlineRef: ref } : section
      )
    }))
  },
  setVisibleHeadings: (ids: string[]) => {
    set(state => ({
      sections: state.sections.map(section => ({
        ...section,
        isVisible: ids.includes(section.id)
      }))
    }))
  }
}))
