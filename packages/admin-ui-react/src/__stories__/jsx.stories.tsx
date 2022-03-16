import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
} from 'react'
import type { Meta } from '@storybook/react'
import { Button as ReakitButton, Separator, Role } from 'reakit'

import { createSystem } from '../system'
import { jsx, tag } from '../system-deprecated'

const [SystemProvider] = createSystem({
  key: 'admin-ui-react',
})

export default {
  title: 'admin-ui-react/jsx',
  decorators: [
    (Story) => (
      <SystemProvider>
        <Story />
      </SystemProvider>
    ),
  ],
} as Meta

export function Test() {
  const Component = jsx(Fragment)({})

  return <Component>Fragment</Component>
}

export function Plain() {
  const Div = jsx('div')()

  return (
    <Fragment>
      <Div>Plain div</Div>
      <Div
        csx={{
          bg: '$info',
          color: '$info',
          marginY: 2,
          size: 100,
        }}
      >
        With csx
      </Div>
      <Div
        csx={{
          color: '$critical',
          fontSize: 3,
        }}
        as="a"
        href="https://admin-ui-docs.vercel.app"
        target="blank"
      >
        This should be a critical link
      </Div>
    </Fragment>
  )
}

export function WithFragments() {
  interface WrapOptions {
    label: string
  }

  const Wrap = jsx(Fragment)(
    {},
    {
      options: ['label'],
      useOptions(options: WrapOptions, props) {
        return {
          children: (
            <tag.div {...props}>
              {options.label} {props.children}
            </tag.div>
          ),
        }
      },
    }
  )

  return (
    <Wrap
      label="Fragment"
      csx={{ bg: '$inverted', color: '$inverted', padding: 2 }}
    >
      Children
    </Wrap>
  )
}

export function WithContext() {
  const Context = createContext<string | null>(null)

  interface ProviderOptions {
    forward: string
  }

  const Provider = jsx('div')(
    {},
    {
      useOptions(o: ProviderOptions, { children }) {
        return {
          children: () => (
            <Context.Provider value={o.forward}>{children}</Context.Provider>
          ),
        }
      },
      options: ['forward'],
    }
  )

  const Consumer = jsx('p')(
    {},
    {
      useOptions: (_, p) => {
        const content = useContext(Context)

        return {
          ...p,
          children: <>{content}</>,
        }
      },
    }
  )

  return (
    <Provider forward="All good">
      <Consumer />
    </Provider>
  )
}

export function ForwardRef() {
  const ref = useRef<HTMLInputElement>(null)

  const Input = jsx('input')({
    border: '$form.neutral',
    paddingX: 3,
    paddingY: 2,
  })

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <Fragment>
      <Input ref={ref} />
    </Fragment>
  )
}

export function DeepForwardRef() {
  const ref = useRef<HTMLInputElement>(null)

  const BaseInput = jsx('input')({
    border: '$form.neutral',
    paddingX: 3,
    paddingY: 2,
  })

  const Input = jsx(BaseInput)()

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <Fragment>
      <Input ref={ref} />
    </Fragment>
  )
}

export function Themed() {
  const Div = jsx('div')({
    size: 100,
  })

  return (
    <Fragment>
      <Div>Plain div</Div>
      <Div
        csx={{
          bg: '$positive',
          color: '$positive',
        }}
      >
        With csx
      </Div>
      <Div
        csx={{
          color: '$critical',
          fontSize: 3,
          bg: '$critical',
        }}
        as="nav"
      >
        Nav, check the console
      </Div>
    </Fragment>
  )
}

export function Extend() {
  const Div = jsx('div')({
    size: 100,
    marginY: 1,
  })

  const NegativeDiv = jsx(Div)({
    bg: '$critical',
    color: '$critical',
  })

  return (
    <Fragment>
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
    </Fragment>
  )
}

export function DoubleExtend() {
  const Div = jsx('div')({
    size: 100,
  })

  const Info = jsx(Div)({
    bg: '$info',
    color: '$info',
  })

  const Hoverable = jsx(Info)({
    cursor: 'pointer',
    ':hover': {
      bg: '$action.main.tertiaryHover',
    },
  })

  return (
    <Fragment>
      <Info>Primary</Info>
      <Hoverable
        csx={{
          marginTop: 1,
        }}
      >
        Hoverable
      </Hoverable>
    </Fragment>
  )
}

export function InterceptVariants() {
  const Div = jsx('div')(
    {
      variants: {
        theme: {
          primary: {
            bg: '$primary',
            color: '$primary',
          },
          inverted: {
            bg: '$inverted',
            color: '$inverted',
          },
        },
      },
    },
    {
      useOptions(_, props) {
        const { theme = 'inverted', ...rest } = props

        return {
          theme,
          ...rest,
        }
      },
    }
  )

  return (
    <>
      <Div>Normal</Div>
      {/* <Div theme="inverted">Inverted</Div> */}
    </>
  )
}

export function ButtonSeries() {
  const Button = jsx('button')({
    height: 32,
    cursor: 'pointer',
    bg: 'transparent',
    margin: 1,
    borderRadius: 'default',
    text: '$action1',
    ':hover': {
      bg: 'base',
    },
    ':active': {
      bg: 'light.secondary',
    },
  })

  const Primary = jsx(Button)({
    bg: 'blue',
    color: 'light.primary',
    ':hover': {
      bg: 'blue.hover',
    },
    ':active': {
      bg: 'blue.pressed',
    },
  })

  const Secondary = jsx(Button)({
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
    <Fragment>
      <Button>Base button</Button>
      <Primary>Primary Button</Primary>
      <Secondary>Secondary Button</Secondary>
    </Fragment>
  )
}

export function BooleanVariants() {
  const Div = jsx('div')({
    size: 100,
    bg: 'blue',
    margin: 2,
    variants: {
      danger: {
        true: {
          bg: 'red',
        },
      },
    },
  })

  return (
    <Fragment>
      <Div />
      <Div danger />
    </Fragment>
  )
}

export function ButtonVariants() {
  const Button = jsx('button')({
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
    <Fragment>
      <Button>Base button</Button>
      <Button color="secondary" size="small">
        Secondary Button
      </Button>
    </Fragment>
  )
}

export function SyncVariants() {
  const Button = jsx('button')(
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
    {
      sync: [
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
      ],
    }
  )

  Button.defaultProps = {
    color: 'blue',
    size: 'regular',
  }

  return (
    <Fragment>
      <Button appearance="outline">Base button</Button>
      <Button color="red" size="small">
        Secondary Button
      </Button>
      <Button color="red" appearance="outline">
        Outlined Red Button
      </Button>
    </Fragment>
  )
}

export function WithReakit() {
  const Button = jsx(ReakitButton)(
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
    {
      sync: [
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
      ],
    }
  )

  Button.defaultProps = {
    color: 'blue',
    size: 'regular',
  }

  return (
    <Fragment>
      <Button appearance="outline">Base button</Button>
      <Button color="red" size="small">
        Secondary Button
      </Button>
      <Button color="red" appearance="outline">
        Outlined Red Button
      </Button>
    </Fragment>
  )
}

export function WithOptions() {
  const Divider = jsx(Separator)(
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
    },
    {
      options: ['orientation'],
    }
  )

  Divider.defaultProps = {
    orientation: 'horizontal',
  }

  const Div = jsx('div')()
  const Heading = jsx('h1')()
  const Paragraph = jsx('p')()

  return (
    <Fragment>
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
    </Fragment>
  )
}

export function UseOptions() {
  interface AvatarOptions {
    label: string
  }

  const Avatar = jsx(Role)(
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
    },
    {
      useOptions: (options: AvatarOptions, props) => {
        return { children: options.label.charAt(0), ...props }
      },
      options: ['label'],
    }
  )

  Avatar.defaultProps = {
    palette: 'blue',
  }

  return (
    <Fragment>
      <Avatar label="Blue" />
      <Avatar label="Red" palette="red" />
    </Fragment>
  )
}

export function CompoundComponents() {
  const _Nav = jsx('nav')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 64,
    bg: 'sidebar.light',
  })

  const Button = jsx('button')({
    bg: 'blue',
    color: 'light.primary',
    cursor: 'pointer',
    variants: {
      size: {
        small: {
          paddingX: 2,
          paddingY: 1,
        },
        regular: {
          paddingX: 3,
          paddingY: 2,
        },
      },
    },
  })

  Button.defaultProps = {
    size: 'regular',
  }

  const Nav = Object.assign(_Nav, {
    Button,
  })

  return (
    <Fragment>
      <Nav>
        <Nav.Button>button</Nav.Button>
        <Nav.Button size="small">small button</Nav.Button>
      </Nav>
    </Fragment>
  )
}
