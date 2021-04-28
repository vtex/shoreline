import React from 'react'
import { Meta } from '@storybook/react'
import { Button as ReakitButton, Separator } from 'reakit'

import { createOnda } from './index'
import { ThemeProvider } from '../core'

export default {
  title: 'Core/createOnda',
} as Meta

export function Plain() {
  const Div = createOnda('div')

  return (
    <ThemeProvider>
      <Div>Plain div</Div>
      <Div
        csx={{
          bg: 'blue',
          color: 'light.primary',
          marginY: 2,
          size: 100,
        }}
      >
        With csx
      </Div>
      <Div
        csx={{
          color: 'red',
          fontSize: 3,
        }}
        as="a"
        href="https://admin-ui-docs.vercel.app"
        target="blank"
      >
        This should be a link
      </Div>
    </ThemeProvider>
  )
}

export function Themed() {
  const Div = createOnda('div', {
    size: 100,
  })

  return (
    <ThemeProvider>
      <Div>Plain div</Div>
      <Div
        csx={{
          bg: 'blue',
          color: 'light.primary',
        }}
      >
        With csx
      </Div>
      <Div
        csx={{
          color: 'red',
          fontSize: 3,
          bg: 'red.secondary',
        }}
        as="nav"
      >
        Nav, check the console
      </Div>
    </ThemeProvider>
  )
}

export function Extend() {
  const Div = createOnda('div', {
    size: 100,
    marginY: 1,
  })

  const NegativeDiv = createOnda(Div, {
    bg: 'red.secondary',
    color: 'red',
  })

  return (
    <ThemeProvider>
      <Div>Normal div</Div>
      <NegativeDiv>Negative div</NegativeDiv>
      <NegativeDiv
        csx={{
          fontSize: 3,
          marginTop: 1,
        }}
      >
        Negative div with csx
      </NegativeDiv>
    </ThemeProvider>
  )
}

export function DoubleExtend() {
  const Div = createOnda('div', {
    size: 100,
  })

  const Primary = createOnda(Div, {
    bg: 'blue',
    color: 'light.primary',
  })

  const Hoverable = createOnda(Primary, {
    cursor: 'pointer',
    ':hover': {
      bg: 'blue.hover',
    },
  })

  return (
    <ThemeProvider>
      <Primary>Primary</Primary>
      <Hoverable
        csx={{
          marginTop: 1,
        }}
      >
        Hoverable
      </Hoverable>
    </ThemeProvider>
  )
}

export function ButtonSeries() {
  const Button = createOnda('button', {
    height: 32,
    cursor: 'pointer',
    bg: 'transparent',
    margin: 1,
    borderRadius: 'default',
    ':hover': {
      bg: 'light.primary',
    },
    ':active': {
      bg: 'light.secondary',
    },
  })

  const Primary = createOnda(Button, {
    bg: 'blue',
    color: 'light.primary',
    ':hover': {
      bg: 'blue.hover',
    },
    ':active': {
      bg: 'blue.pressed',
    },
  })

  const Secondary = createOnda(Button, {
    bg: 'blue.secondary',
    color: 'blue',
    ':hover': {
      bg: 'blue.secondary.hover',
    },
    ':active': {
      bg: 'blue.secondary.pressed',
    },
  })

  return (
    <ThemeProvider>
      <Button>Base button</Button>
      <Primary>Primary Button</Primary>
      <Secondary>Secondary Button</Secondary>
    </ThemeProvider>
  )
}

export function ButtonVariants() {
  const Button = createOnda('button', {
    cursor: 'pointer',
    margin: 1,
    borderRadius: 'default',
    variants: {
      color: {
        primary: {
          bg: 'blue',
          color: 'light.primary',
          ':hover': {
            bg: 'blue.hover',
          },
          ':active': {
            bg: 'blue.pressed',
          },
        },
        secondary: {
          bg: 'blue.secondary',
          color: 'blue',
          ':hover': {
            bg: 'blue.secondary.hover',
          },
          ':active': {
            bg: 'blue.secondary.pressed',
          },
        },
      },
      size: {
        small: {
          height: 24,
        },
        regular: {
          height: 32,
        },
      },
    },
  })

  Button.defaultProps = {
    color: 'primary',
    size: 'regular',
  }

  return (
    <ThemeProvider>
      <Button>Base button</Button>
      <Button color="secondary" size="small">
        Secondary Button
      </Button>
    </ThemeProvider>
  )
}

export function SyncVariants() {
  const Button = createOnda(
    'button',
    {
      cursor: 'pointer',
      margin: 1,
      borderRadius: 'default',
      variants: {
        color: {
          blue: {
            bg: 'blue',
            color: 'light.primary',
            ':hover': {
              bg: 'blue.hover',
            },
            ':active': {
              bg: 'blue.pressed',
            },
          },
          red: {
            bg: 'red',
            color: 'light.primary',
            ':hover': {
              bg: 'red.hover',
            },
            ':active': {
              bg: 'red.pressed',
            },
          },
        },
        appearance: {
          solid: {},
          outline: {
            bg: 'transparent',
          },
        },
        size: {
          small: {
            height: 24,
          },
          regular: {
            height: 32,
          },
        },
      },
    },
    [
      {
        color: 'blue',
        appearance: 'outline',
        csx: {
          bg: 'transparent',
          borderStyle: 'solid',
          borderColor: 'blue',
          borderWidth: 1,
          color: 'blue',
          ':hover': {
            bg: 'blue.secondary.hover',
          },
          ':active': {
            bg: 'blue.secondary.pressed',
          },
        },
      },
      {
        color: 'red',
        appearance: 'outline',
        csx: {
          bg: 'transparent',
          borderStyle: 'solid',
          borderColor: 'red',
          borderWidth: 1,
          color: 'red',
          ':hover': {
            bg: 'red.secondary.hover',
          },
          ':active': {
            bg: 'red.secondary.pressed',
          },
        },
      },
    ]
  )

  Button.defaultProps = {
    color: 'blue',
    size: 'regular',
  }

  return (
    <ThemeProvider>
      <Button appearance="outline">Base button</Button>
      <Button color="red" size="small">
        Secondary Button
      </Button>
      <Button color="red" appearance="outline">
        Outlined Red Button
      </Button>
    </ThemeProvider>
  )
}

export function WithReakit() {
  const Button = createOnda(
    ReakitButton,
    {
      cursor: 'pointer',
      margin: 1,
      borderRadius: 'default',
      variants: {
        color: {
          blue: {
            bg: 'blue',
            color: 'light.primary',
            ':hover': {
              bg: 'blue.hover',
            },
            ':active': {
              bg: 'blue.pressed',
            },
          },
          red: {
            bg: 'red',
            color: 'light.primary',
            ':hover': {
              bg: 'red.hover',
            },
            ':active': {
              bg: 'red.pressed',
            },
          },
        },
        appearance: {
          solid: {},
          outline: {
            bg: 'transparent',
          },
        },
        size: {
          small: {
            height: 24,
          },
          regular: {
            height: 32,
          },
        },
      },
    },
    [
      {
        color: 'blue',
        appearance: 'outline',
        csx: {
          bg: 'transparent',
          borderStyle: 'solid',
          borderColor: 'blue',
          borderWidth: 1,
          color: 'blue',
          ':hover': {
            bg: 'blue.secondary.hover',
          },
          ':active': {
            bg: 'blue.secondary.pressed',
          },
        },
      },
      {
        color: 'red',
        appearance: 'outline',
        csx: {
          bg: 'transparent',
          borderStyle: 'solid',
          borderColor: 'red',
          borderWidth: 1,
          color: 'red',
          ':hover': {
            bg: 'red.secondary.hover',
          },
          ':active': {
            bg: 'red.secondary.pressed',
          },
        },
      },
    ]
  )

  Button.defaultProps = {
    color: 'blue',
    size: 'regular',
  }

  return (
    <ThemeProvider>
      <Button appearance="outline">Base button</Button>
      <Button color="red" size="small">
        Secondary Button
      </Button>
      <Button color="red" appearance="outline">
        Outlined Red Button
      </Button>
    </ThemeProvider>
  )
}

export function OwnProps() {
  const Divider = createOnda(
    {
      as: Separator,
      ownProps: ['orientation'],
    },
    {
      border: 'solid',
      borderWidth: 1,
      borderColor: 'mid.tertiary',
      margin: 0,
      variants: {
        orientation: {
          vertical: {
            borderLeft: 0,
            height: 'auto',
          },
          horizontal: {
            borderBottom: 0,
          },
        },
      },
    }
  )

  Divider.defaultProps = {
    orientation: 'horizontal',
  }

  const Div = createOnda('div')
  const Heading = createOnda('h1')
  const Paragraph = createOnda('p')

  return (
    <ThemeProvider>
      <Div csx={{ width: 500, margin: 5 }}>
        <Heading csx={{ marginBottom: 2 }}>Tolerance</Heading>
        <Paragraph>
          Allows orders to be placed even if they pass X% of the account`s
          credit limit. Tolerance is set per account.
        </Paragraph>
        <Divider as="hr" orientation="horizontal" csx={{ marginY: 6 }} />
        <Heading csx={{ marginBottom: 2 }}>Automatic account creation</Heading>
        <Paragraph>
          Allows users who have not been previously credited to close a
          purchase.
        </Paragraph>
      </Div>
      <Div
        csx={{
          display: 'flex',
          width: 500,
          justifyContent: 'center',
          margin: 5,
        }}
      >
        <Div csx={{ width: '1/2' }}>
          <Heading csx={{ marginY: 2 }}>Cards</Heading>
          <Paragraph>
            In Cards, your customer is given autonomy to manage credit cards
            related to his account, and can add, remove or edit credit card
            data.
          </Paragraph>
        </Div>
        <Divider orientation="vertical" csx={{ marginX: 6 }} />
        <Div csx={{ width: '1/2' }}>
          <Heading csx={{ marginY: 2 }}>Personal data</Heading>
          <Paragraph>
            In this section, the user can manage their personal data registered
            on the store site.
          </Paragraph>
        </Div>
      </Div>
    </ThemeProvider>
  )
}

export function UseOwnProps() {
  interface AvatarOwnProps {
    label: string
  }

  const Avatar = createOnda(
    {
      as: 'div',
      useOwnProps: (ownProps: AvatarOwnProps) => {
        return { children: ownProps.label.charAt(0) }
      },
      ownProps: ['label'],
    },
    {
      size: 100,
      borderRadius: 'circle',
      margin: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 3,
      variants: {
        palette: {
          blue: {
            bg: 'blue',
            color: 'light.primary',
          },
          red: {
            bg: 'red',
            color: 'light.primary',
          },
        },
      },
    }
  )

  Avatar.defaultProps = {
    palette: 'blue',
  }

  return (
    <ThemeProvider>
      <Avatar label="Blue" />
      <Avatar label="Red" palette="red" />
    </ThemeProvider>
  )
}
