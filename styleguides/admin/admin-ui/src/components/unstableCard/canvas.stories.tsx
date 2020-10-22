import React from 'react'
import { Meta } from '@storybook/react'

import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { Columns } from '../unstableColumns'
import { unstableCard as Card } from './index'
import { Text } from '../Text'

export default {
  title: 'system-next/card',
  component: Card,
} as Meta

export const Example = () => {
  return (
    <ThemeProvider>
      <Card styleOverrides={{ width: '1/2' }}>
        <Text variant="headline">Build for community</Text>
        <Text>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Text>
      </Card>
    </ThemeProvider>
  )
}

export const CardSet = () => {
  return (
    <ThemeProvider>
      <Columns>
        <Columns.Item units={[12, 12, 8]}>
          <Card styleOverrides={{ height: 'full' }}>
            <Text variant="headline">Build for community</Text>
            <Text>
              It’s all about being ready to grow and reach new levels. Have a
              solid foundation, modular thinking and flexible essence, and
              you’re building for scale. We are global but we’re audacious
              enough to aim for the stars.
            </Text>
          </Card>
        </Columns.Item>
        <Columns.Item units={[12, 12, 4]}>
          <Card>
            <Text variant="headline">Build for community</Text>
            <Text>
              It’s all about being ready to grow and reach new levels. Have a
              solid foundation, modular thinking and flexible essence, and
              you’re building for scale. We are global but we’re audacious
              enough to aim for the stars.
            </Text>
          </Card>
        </Columns.Item>
      </Columns>
    </ThemeProvider>
  )
}

export const WithoutPadding = () => {
  return (
    <ThemeProvider>
      <Card styleOverrides={{ padding: 0 }}>
        <Text variant="headline" p="6">
          Our People
        </Text>
        <img
          width="100%"
          src="https://careers.vtex.com/assets/media/perspectives03.jpg"
          alt=""
        />
        <Text el="p" variant="body" p="6">
          At VTEX we believe inclusion inspires innovation. We are committed to
          implement a recruiting process that guarantees equal opportunities for
          all, regardless of ethnicity, gender, disability, sexual orientation,
          gender identity or religion.
        </Text>
      </Card>
    </ThemeProvider>
  )
}
