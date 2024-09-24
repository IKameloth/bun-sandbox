import { EXIT, visit } from 'unist-util-visit'
import YAML from 'yaml'
import { create } from 'zustand'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import type { Root as HastRoot } from 'hast'
import type { Root as MdastRoot } from 'mdast'

type ContentType = React.ReactElement<
  unknown,
  string | React.JSXElementConstructor<any>
>

interface ContentState {
  dom: ContentType | null
  mdast: MdastRoot | null
  hast: HastRoot | null
  lastError: Error | null | undefined
  title: string | null
  render: (markdown: string) => Promise<void>
}

const renderer = new MarkdownRenderer()

export const useContentStore = create<ContentState>(set => ({
  renderId: 0,
  dom: null,
  mdast: null,
  hast: null,
  lastError: null,
  title: null,
  render: async (markdown: string) => {
    try {
      const { result, mdast, hast } = await renderer.render(markdown)

      let title = ''
      visit(mdast, 'yaml', node => {
        const frontmatter = YAML.parse(node.value)
        title = frontmatter.title || ''
        return EXIT
      })

      set({
        dom: result,
        mdast,
        hast,
        lastError: null,
        title
      })
    } catch (err: any) {
      console.error(`Failed to render preview: ${err.stack}`)
      set({
        dom: null,
        mdast: null,
        hast: null,
        title: null,
        lastError: new Error('Failed to render preview Markdown')
      })
    }
  }
}))
