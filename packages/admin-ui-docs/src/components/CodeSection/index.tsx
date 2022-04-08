import type { ReactNode } from 'react'
import React from 'react'

import { PageSection } from '../PageSection'

import CodeBlock from '../../theme/CodeBlock'

export interface CodeSectionProps {
  children: ReactNode
  code: string
  columnsCount: number
  direction: 'column' | 'row'
  id: string
  isLive: boolean
  isNoInline: boolean
  language: string
  layout: 'grid' | null
  title: string
}

export function CodeSection(props: CodeSectionProps) {
  const codeClassName = props.language ? `language-${props.language}` : ''

  return (
    <PageSection id={props.id} title={props.title} direction={props.direction}>
      <CodeBlock
        className={codeClassName}
        children={props.code}
        live={props.isLive}
        layout={props.layout}
        columnsCount={props.columnsCount}
        noInline={props.isNoInline}
      />
      {props.children}
    </PageSection>
  )
}
