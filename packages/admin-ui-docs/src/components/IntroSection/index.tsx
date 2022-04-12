import type { ReactNode } from 'react'
import React from 'react'

import { PageSection } from '../PageSection'

import './styles.scss'

export interface IntroSectionProps {
  children: ReactNode
  code: string
  columnsCount: number
  description: string
  direction: 'column' | 'row'
  id: string
  isLive: boolean
  isNoInline: boolean
  layout: 'grid' | null
  title: string
}

export function IntroSection(props: IntroSectionProps) {
  return (
    <PageSection className="intro-container" id={props.id} title={props.title}>
      {props.description}
    </PageSection>
  )
}
