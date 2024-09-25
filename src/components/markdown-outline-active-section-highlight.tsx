import { memo } from 'react'
import { Box } from '@kuma-ui/core'
import { motion } from 'framer-motion'
import { Section } from '@/stores/toc'

type Props = {
  sections: Section[]
}

export const MarkdownOutlineActiveSectionHighlight = memo((props: Props) => {
  const { sections } = props
  const visibleSectionsIds = sections
    .filter(section => section.isVisible)
    .map(section => section.id)
  const elTocItems = sections.reduce((map, section) => {
    return {
      ...map,
      [section.id]: section.outlineRef?.current
    }
  }, {}) as Record<string, HTMLLIElement | null | undefined>

  const firstVisibleSectionIndex = Math.max(
    0,
    sections.findIndex(section => section.id === visibleSectionsIds[0])
  )

  const height: number | string = visibleSectionsIds.reduce(
    (h, id) => h + (elTocItems[id]?.offsetHeight || 0),
    0
  )

  const top = sections
    .slice(0, firstVisibleSectionIndex)
    .reduce((t, section) => t + (elTocItems[section.id]?.offsetHeight || 0), 0)

  return (
    <Box
      as={motion.div}
      className="active-section-highlight"
      position="absolute"
      left="0.75em"
      w="1px"
      background="var(--color-active)"
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2 }
      }}
      exit={{ opacity: 0 }}
      style={{ height, top }}
    />
  )
})
