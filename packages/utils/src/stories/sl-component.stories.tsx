import type { ReactNode } from 'react'
import React from 'react'
import { createComponent } from '../create-component'

export default {
  title: 'utils',
}

/**
 * A title for something
 * @example
 */
const Title = createComponent<TitleProps>('h1', {
  name: 'title',
  useProps(props) {
    const { theme = 'red', ...rest } = props

    return {
      'data-theme': theme,
      ...rest,
    }
  },
})

export interface TitleProps {
  theme?: 'red' | 'blue' | 'green'
  children?: ReactNode
}

export function Default() {
  return (
    <>
      <Title>Title</Title>
      <Title theme="green">Green Text</Title>
      <Title theme="blue">Blue Text</Title>
    </>
  )
}

export function Composition() {
  return (
    <>
      <Title asChild>
        <a href="https://google.com.br" target="_blank" rel="noreferrer">
          Title
        </a>
      </Title>
    </>
  )
}
