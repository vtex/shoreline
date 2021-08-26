import React, { Fragment } from 'react'
import type { Meta } from '@storybook/react'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'

import { tag } from '../index'

export default {
  title: 'react/tag',
} as Meta

export function WithStyles() {
  return (
    <Fragment>
      <tag.div
        csx={{
          bg: 'blue',
          color: 'light.primary',
          size: 120,
        }}
      >
        Div element
      </tag.div>
    </Fragment>
  )
}

export function Standalone() {
  const Div = tag('div')

  return (
    <Fragment>
      <Div
        csx={{
          bg: 'blue',
          color: 'light.primary',
          size: 120,
        }}
      >
        Div element
      </Div>
    </Fragment>
  )
}

export function Polymorphism() {
  const menu = useMenuState()

  return (
    <Fragment>
      <tag.button
        as={MenuButton}
        {...menu}
        csx={{
          bg: 'blue',
          color: 'light.primary',
          height: 32,
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Preferences
      </tag.button>
      <tag.div
        as={Menu}
        {...menu}
        aria-label="Preferences"
        csx={{
          border: '1px solid',
          borderColor: 'dark.secondary',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          '> button': {
            borderRadius: 4,
            height: 32,
            cursor: 'pointer',
            bg: 'light.primary',
            ':hover': {
              bg: 'light.secondary',
            },
            ':active': {
              bg: 'mid.tertiary',
            },
          },
          hr: {
            height: '1px',
            bg: 'dark.primary',
          },
        }}
      >
        <tag.button as={MenuItem} {...menu}>
          Settings
        </tag.button>
        <tag.button as={MenuItem} {...menu}>
          Extensions
        </tag.button>
        <tag.button as={MenuItem} {...menu}>
          Keyboard shortcuts
        </tag.button>
      </tag.div>
    </Fragment>
  )
}
