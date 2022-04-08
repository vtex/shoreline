import React from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

import Heading from '@theme/Heading'

import { useMediaQuery } from '@vtex/admin-ui'

import './styles.scss'

export interface PageSectionProps {
  id: string
  title: string
  explanation?: string
  direction?: 'column' | 'row'
  actionElement?: Function
  children: ReactNode
}

export function PageSection(props: PageSectionProps) {
  const [isLargeScreen] = useMediaQuery('(min-width: 997px)')
  const { actionElement: ActionElement } = props

  return (
    <div
      className={clsx('page-section', {
        'page-section--row': isLargeScreen && props.direction === 'row',
      })}
    >
      <div className="section-info">
        <div className="header">
          <Heading id={props.id} as="h2">
            {props.title}
          </Heading>
          {ActionElement && <ActionElement />}
        </div>
        {props.explanation && (
          <p className="explanation">{props.explanation}</p>
        )}
      </div>
      <div className="section-content">{props.children}</div>
    </div>
  )
}
