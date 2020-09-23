import React from 'react'
import { Meta } from '@storybook/react'

import { Accordion, useAccordion } from '.'

export default {
  title: 'beta/Collapsible/Accordion',
  component: Accordion,
} as Meta

export const SimpleUsage = () => {
  const accordion = useAccordion()

  return (
    <Accordion {...accordion} sx={{ width: 300 }}>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #1
        </Accordion.Section.Header>
        <Accordion.Section.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #2
        </Accordion.Section.Header>
        <Accordion.Section.Content>
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
  const accordion = useAccordion({ visible: 1 })

  return (
    <Accordion {...accordion} sx={{ width: 300 }}>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #1
        </Accordion.Section.Header>
        <Accordion.Section.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #2
        </Accordion.Section.Header>
        <Accordion.Section.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #3
        </Accordion.Section.Header>
        <Accordion.Section.Content>
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
  const accordion = useAccordion({ disabled: [1, 2] })

  return (
    <Accordion {...accordion} sx={{ width: 300 }}>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #1
        </Accordion.Section.Header>
        <Accordion.Section.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #2
        </Accordion.Section.Header>
        <Accordion.Section.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
      <Accordion.Section>
        <Accordion.Section.Header>
          Build for Community #3
        </Accordion.Section.Header>
        <Accordion.Section.Content>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Accordion.Section.Content>
      </Accordion.Section>
    </Accordion>
  )
}
