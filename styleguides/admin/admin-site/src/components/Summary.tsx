import { useSystem } from '@vtex/admin-ui'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'

import { useAnchor } from './Anchor'

export type SummaryOptions = BoxOptions & {
  experimental?: 'true' | 'false'
}

export type SummaryHTMLProps = BoxHTMLProps

export type SummaryProps = SummaryOptions & SummaryHTMLProps

export const useSummary = createHook<SummaryOptions, SummaryHTMLProps>({
  name: 'Summary',
  compose: useBox,

  useProps(options, htmlProps) {
    const anchor = useAnchor(options, htmlProps)
    const { cn } = useSystem()

    const summary = cn({
      display: 'inline-block',
      padding: '0.5em 0.5em',
      cursor: 'pointer',
      fontSize: '24px',
    })

    return {
      ...htmlProps,
      ...anchor,
      className: `${anchor.className} ${summary} ${htmlProps.className}`,
    }
  },
})

const Summary = createComponent({
  as: 'summary',
  useHook: useSummary,
})

export default Summary
