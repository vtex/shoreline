import React, { Fragment } from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { IconMock } from '../Button/IconMock'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const SimpleUsage = () => {
  const props = useCollapsible({animated: true})

  return (
    <Collapsible {...props} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
      <Collapsible.Content state={props}>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const NestedCollapsible = () => {
  const firstProps = useCollapsible({ animated: true})
  const secondProps = useCollapsible({ animated: true})
  const thirdProps = useCollapsible({ animated: true})

  return (
    <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
      <Collapsible.Content state={firstProps}>
        <Collapsible {...secondProps}>
          <Collapsible.Header label="Build for Community #2" />
          <Collapsible.Content state={secondProps}>
            <Collapsible {...thirdProps}>
              <Collapsible.Header label="Build for Community #2" />
              <Collapsible.Content state={thirdProps}>
                It’s all about being ready to grow and reach new levels. Have a
                solid foundation, modular thinking and flexible essence, and
                you’re building for scale. We are global but we’re audacious
                enough to aim for the stars.
              </Collapsible.Content>
            </Collapsible>
          </Collapsible.Content>
        </Collapsible>
      </Collapsible.Content>
    </Collapsible>
  )
}

export const InitiallyVisible = () => {
  const firstProps = useCollapsible({ visible: true, animated: true })

  return (
    <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const Disabled = () => {
  const props = useCollapsible({ animated: true})

  return (
    <Collapsible {...props} disabled sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
      <Collapsible.Content state={props}>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const WithPrefixIcon = () => {
  const props = useCollapsible({ animated: true})

  return (
    <Collapsible {...props} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header
        prefix={(props) => <IconMock {...props} />}
        label="Build for Community #2"
      />
      <Collapsible.Content state={props}>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const WithSuffixIcon = () => {
  const props = useCollapsible({ animated: true})

  return (
    <Collapsible {...props} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header
        suffix={(props) => <IconMock {...props} />}
        label="Build for Community #2"
      />
      <Collapsible.Content state={props}>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const Sizes = () => {
  const firstProps = useCollapsible({ animated: true})
  const secondProps = useCollapsible({ animated: true})

  return (
    <Fragment>
      <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
        <Collapsible.Header size="regular" label="Header size: regular" />
        <Collapsible.Content state={firstProps}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
      <Collapsible {...secondProps} sx={{ width: ['100%', 500] }}>
        <Collapsible.Header size="small" label="Header size: small" />
        <Collapsible.Content state={secondProps}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
    </Fragment>
  )
}

export const ArrowPositions = () => {
  const firstProps = useCollapsible({ animated: true})
  const secondProps = useCollapsible({ animated: true})

  return (
    <Fragment>
      <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
        <Collapsible.Header label="Arrow position: right" />
        <Collapsible.Content state={firstProps}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
      <Collapsible {...secondProps} sx={{ width: ['100%', 500] }}>
        <Collapsible.Header label="Arrow position: left" arrowPosition="left" />
        <Collapsible.Content state={secondProps}>
          It’s all about being ready to grow and reach new levels. Have a solid
          foundation, modular thinking and flexible essence, and you’re building
          for scale. We are global but we’re audacious enough to aim for the
          stars.
        </Collapsible.Content>
      </Collapsible>
    </Fragment>
  )
}
