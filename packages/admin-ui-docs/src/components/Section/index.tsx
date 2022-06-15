import React from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

import { useMediaQuery } from '@vtex/admin-ui'

import './styles.scss'

export interface SectionProps {
  actionElement?: ReactNode
  children: ReactNode
  className?: string
  direction?: 'column' | 'row'
  hasExplanation?: boolean
}

const FIRST_ELEMENT = 0
const SECOND_ELEMENT = 1

export function Section(props: SectionProps) {
  const [isLargeScreen] = useMediaQuery('(min-width: 997px)')
  const {
    actionElement: ActionElement,
    hasExplanation = false,
    children,
  } = props

  return (
    <div
      className={clsx(
        'section',
        {
          'section--row': isLargeScreen && props.direction === 'row',
        },
        props.className
      )}
    >
      <div className="section-info">
        <div className="header">
          {React.Children.map(children, (child, index) =>
            index === FIRST_ELEMENT ? child : null
          )}
          {ActionElement && <div className="action">{ActionElement}</div>}
        </div>
        {props.hasExplanation && (
          <p className="explanation">
            {React.Children.map(children, (child, index) =>
              index === SECOND_ELEMENT ? child : null
            )}
          </p>
        )}
      </div>
      <div className="section-content">
        {React.Children.map(children, (child, index) =>
          isContentChild(index, hasExplanation) ? child : null
        )}
      </div>
    </div>
  )
}

function isContentChild(index, hasExplanation) {
  if (hasExplanation) return index > SECOND_ELEMENT

  return index > FIRST_ELEMENT
}
