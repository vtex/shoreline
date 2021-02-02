import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Primitive } from './index'

export default {
  title: 'primitives/Primitive',
} as Meta

export const Basic: Story = () => {
  return <Primitive>Cool Primitive</Primitive>
}

export const Styles: Story = () => {
  return (
    <Primitive
      styles={{
        fontSize: 64,
        zIndex: 'over',
      }}
    >
      Huge Text
    </Primitive>
  )
}

export const ConsumeTheme: Story = () => {
  return (
    <Primitive
      styles={{
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

export const Divider: Story = () => {
  return (
    <>
      <Primitive
        styles={{
          text: 'headline',
          border: 'divider-bottom',
          width: 100,
        }}
      >
        Headline
      </Primitive>
      <Primitive
        styles={{
          text: 'subtitle',
        }}
      >
        Subtitle
      </Primitive>
    </>
  )
}

export const Polymorphism: Story = () => {
  return (
    <Primitive element="a" href="https://reakit.io/docs/role/" target="blank">
      Link
    </Primitive>
  )
}

export const WithClassName: Story = () => {
  return (
    <Primitive
      styles={{ bg: 'primary.base', color: 'background' }}
      className="my-className"
    >
      Primitive
    </Primitive>
  )
}
