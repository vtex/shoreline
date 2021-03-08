import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Primitive } from './index'

export default {
  title: 'primitives/Primitive',
} as Meta

export const Basic: Story = () => {
  return <Primitive>Cool Primitive</Primitive>
}

export const CsxProp: Story = () => {
  return (
    <Primitive
      csx={{
        fontSize: 64,
        zIndex: 'over',
      }}
    >
      Huge Text
    </Primitive>
  )
}

export const ConsumingAdminUiTheme: Story = () => {
  return (
    <Primitive
      csx={{
        fontSize: 64,
        bg: 'blue',
        color: 'light.primary',
        borderRadius: 4,
      }}
    >
      Primary Primitive
    </Primitive>
  )
}

export const Polymorphism: Story = () => {
  return (
    <Primitive element="a" href="https://reakit.io/docs/role/" target="blank">
      Link
    </Primitive>
  )
}

export const UsingClassNames: Story = () => {
  return (
    <Primitive
      csx={{ bg: 'primary.base', color: 'background' }}
      className="my-className"
    >
      Primitive
    </Primitive>
  )
}
