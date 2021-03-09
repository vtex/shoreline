import React from 'react'
import { Meta } from '@storybook/react'

import { Accordion, useAccordion } from '.'

export default {
  title: 'beta/Collapsible/Accordion',
  component: Accordion,
} as Meta

export const SimpleUsage = () => {
  const {props, states} = useAccordion({collapsibles: 2, animated: true})

  return (
    <Accordion {...props} sx={{ width: 300 }}>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #1" />
        <Accordion.Section.Content state={states[0]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #2" />
        <Accordion.Section.Content state={states[1]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}

export const SectionInitialyVisible = () => {
  const {props, states} = useAccordion({ collapsibles: 3, initialState: {visible: 1},  animated: true })

  return (
    <Accordion {...props} sx={{ width: 300 }}>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #1" />
        <Accordion.Section.Content state={states[0]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #2" />
        <Accordion.Section.Content state={states[1]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #3" />
        <Accordion.Section.Content state={states[2]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}

export const SectionsDisabled = () => {
  const {props, states} = useAccordion({ collapsibles: 3, initialState: {disabled: [1, 2]}, animated: true })

  return (
    <Accordion {...props} sx={{ width: 300 }}>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #1" />
        <Accordion.Section.Content state={states[0]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #2" />
        <Accordion.Section.Content state={states[1]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header label="Build for Community #3" />
        <Accordion.Section.Content state={states[2]}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
