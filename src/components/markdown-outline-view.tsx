import { Box, Heading } from '@kuma-ui/core'
import { useTocStore } from '@/stores/toc'
import { MarkdownOutlineActiveSectionHighlight } from './markdown-outline-active-section-highlight'
import { MarkdownOutlineItem } from './markdown-outline-item'

export const MarkdownOutlineView = () => {
  const sections = useTocStore(state => state.sections)
  const minLevel = (sections || []).reduce((p, c) => Math.min(p, c.level), 6)

  return (
    <Box className="markdown-outline-view" fontSize="0.9em">
      <Heading as="h2" fontSize="1em">
        On this page
      </Heading>
      <Box position="relative">
        <Box
          position="absolute"
          top={0}
          left="0.75em"
          bottom={0}
          width="1px"
          backgroundColor="var(--color-muted)"
        />
        <MarkdownOutlineActiveSectionHighlight sections={sections} />
        <Box as="ul" role="list" m={0} pl="1.5em" listStyle="none">
          {sections.map(heading => {
            return (
              <MarkdownOutlineItem
                {...heading}
                key={heading.id}
                level={heading.level - minLevel}
                active={heading.isVisible}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
