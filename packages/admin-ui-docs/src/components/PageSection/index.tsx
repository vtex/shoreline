import React from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

import Heading from '@theme/Heading'

import { useMediaQuery } from '@vtex/admin-ui'

import './styles.scss'

export interface PageSectionProps {
  actionElement?: ReactNode
  children: ReactNode
  direction?: 'column' | 'row'
  explanation?: string
  id: string
  level?: number
  title: string
}

export function PageSection(props: PageSectionProps) {
  const [isLargeScreen] = useMediaQuery('(min-width: 997px)')
  const headingLevel = `h${props.level ?? 2}`
  const { actionElement: ActionElement } = props

  return (
    <div
      className={clsx('page-section', {
        'page-section--row': isLargeScreen && props.direction === 'row',
      })}
    >
      <div className="section-info">
        <div className="header">
          <Heading id={props.id} as={headingLevel}>
            {props.title}
          </Heading>
          <div className="action">{ActionElement}</div>
        </div>
        {props.explanation && (
          <p className="explanation">{props.explanation}</p>
        )}
      </div>
      <div className="section-content">{props.children}</div>
    </div>
  )
}
