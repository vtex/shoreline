import React from 'react'

import { PageSection } from '../PageSection'

import './styles.scss'

export interface IntroSectionProps {
  description: string
  id: string
  title: string
}

export function IntroSection(props: IntroSectionProps) {
  return (
    <PageSection className="intro-container" id={props.id} title={props.title}>
      {props.description}
    </PageSection>
  )
}
