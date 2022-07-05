import type { ReactNode } from 'react'
import React from 'react'

import { Section } from '../Section'

import './styles.scss'

export interface IntroSectionProps {
  description: string
  children: ReactNode
}

export function IntroSection(props: IntroSectionProps) {
  const { children } = props

  return <Section className="intro-container">{children}</Section>
}
