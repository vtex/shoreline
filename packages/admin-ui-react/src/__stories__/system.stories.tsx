import React, { createContext, useContext, Fragment } from 'react'
import type { Meta } from '@storybook/react'
import type { VariantProps } from '@vtex/admin-ui-core'
import { styleVariants } from '@vtex/admin-ui-core'
import {
  Role,
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
  useMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton as ReakitMenuButton,
} from 'reakit'

import { createSystem } from '../createSystem'
import { createComponent, createHook, useElement } from '../system'

const [SystemProvider] = createSystem({
  key: 'admin-ui-react',
})

export default {
  title: 'admin-ui-react/system',
  decorators: [
    (Story) => (
      <SystemProvider>
        <Story />
      </SystemProvider>
    ),
  ],
} as Meta

export function Basic() {
  const useLink = createHook<'a'>((props) => {
    return props
  })

  const Link = createComponent<'a'>((props) => {
    const linkProps = useLink(props)

    return useElement('a', linkProps)
  })

  Link.displayName = 'Link'

  return (
    <Link href="https://admin-ui.com" target="blank">
      Go to admin-ui site
    </Link>
  )
}

export function Styled() {
  const useCenter = createHook<'div'>((props) => {
    return {
      baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ...props,
    }
  })

  const Center = createComponent<'div'>((props) => {
    const centerProps = useCenter(props)

    return useElement('div', centerProps)
  })

  return (
    <Center
      csx={{
        width: 500,
        border: '$neutral',
        padding: '$narrow.l',
      }}
    >
      <button>Button in the center</button>
    </Center>
  )
}

export function StyleVariants() {
  const buttonVariants = styleVariants({
    size: {
      small: {
        padding: '$narrow.s',
      },
      regular: {
        padding: '$narrow.m',
      },
    },
  })

  type ButtonProps = VariantProps<typeof buttonVariants>

  const useButton = createHook<'button', ButtonProps>(({ size, ...props }) => {
    return {
      baseStyle: {
        bg: '$action.critical.primary',
        color: '$action.critical.primary',
        margin: '$narrow.s',
        ...buttonVariants({
          size,
        }),
      },
      ...props,
    }
  })

  const Button = createComponent<'button', ButtonProps>((props) => {
    const buttonProps = useButton(props)

    return useElement('button', buttonProps)
  })

  Button.defaultProps = {
    size: 'regular',
  }

  return (
    <div>
      <Button size="small">Small button</Button>
      <Button>Regular button</Button>
    </div>
  )
}

export function ExtendingComponents() {
  const Box = createComponent<typeof Role>((props) => {
    return useElement(Role, props)
  })

  return <Box>The box component</Box>
}

export function InternalState() {
  interface TooltipProps {
    title: string
    children: React.FunctionComponentElement<unknown>
  }

  const Tooltip = createComponent<typeof Fragment, TooltipProps>(
    ({ children, title, ...props }) => {
      const tooltip = useTooltipState()

      return (
        <Fragment {...props}>
          <TooltipReference
            state={tooltip}
            ref={children.ref}
            {...children.props}
          >
            {(referenceProps) => React.cloneElement(children, referenceProps)}
          </TooltipReference>
          <ReakitTooltip state={tooltip}>{title}</ReakitTooltip>
        </Fragment>
      )
    }
  )

  return (
    <Tooltip title="Tooltip">
      <button>Reference</button>
    </Tooltip>
  )
}

type MenuState = ReturnType<typeof useMenuState>

interface MenuProps {
  state: MenuState
  children?: React.ReactNode
}

const MenuStateContext = createContext<MenuState | null>(null)
const useMenuContext = () => useContext(MenuStateContext)

const Menu = createComponent<typeof Fragment, MenuProps>(
  ({ state, children }) => {
    return (
      <MenuStateContext.Provider value={state}>
        {children}
      </MenuStateContext.Provider>
    )
  }
)

const MenuBox = createComponent<typeof ReakitMenu>((props) => {
  const state = useMenuContext()

  return useElement(ReakitMenu, {
    state,
    baseStyle: {
      bg: '$primary',
      color: '$primary',
      border: '$neutral',
      padding: '$s',
      display: 'flex',
      flexDirection: 'column',
    },
    ...props,
  })
})

const MenuButton = createComponent<typeof ReakitMenuButton>((props) => {
  const state = useMenuContext()

  return useElement(ReakitMenuButton, { state, ...props })
})

const MenuItem = createComponent<typeof ReakitMenuItem>((props) => {
  const state = useMenuContext()

  return useElement(ReakitMenuItem, { state, ...props })
})

export function WithContext() {
  const menu = useMenuState()

  return (
    <Menu state={menu}>
      <MenuButton>Preferences</MenuButton>
      <MenuBox aria-label="Preferences">
        <MenuItem>Settings</MenuItem>
        <MenuItem disabled>Extensions</MenuItem>
        <MenuItem>Keyboard shortcuts</MenuItem>
      </MenuBox>
    </Menu>
  )
}
