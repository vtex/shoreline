/** @jsx jsx */
import { jsx, Flex, SxStyleProp } from 'theme-ui'
import {
  Fragment,
  cloneElement,
  Children,
  ReactElement,
  FunctionComponentElement,
  Ref,
  forwardRef,
} from 'react'
import {
  useMenuState,
  Menu as RekitMenu,
  MenuItem,
  MenuButton,
  MenuState,
} from 'reakit/Menu'
import { get, mergeSx } from '@vtex-components/theme'

import { Button, ButtonProps } from '../Button'

export interface MenuProps extends Pick<MenuState, 'placement'> {
  disclosure: FunctionComponentElement<unknown>
  children: ReactElement[]
  label: string
  sx?: SxStyleProp
  disabled?: boolean
  loop?: boolean
}

function Menu(props: MenuProps) {
  const {
    disclosure,
    children,
    label,
    disabled = false,
    placement = 'bottom',
    loop = false,
    sx = {},
    ...baseProps
  } = props

  const menu = useMenuState({ orientation: 'vertical', placement, loop })

  const styles = mergeSx<SxStyleProp>(
    {
      flexDirection: 'column',
      background: (theme) => get(theme, 'colors.background'),
      border: (theme) =>
        `${get(theme, 'sizes.1')} solid ${get(theme, 'colors.muted.2')}`,
      marginTop: 4,
      padding: 5,
      minWidth: 20,
      borderRadius: 3,
    },
    sx
  )

  return (
    <Fragment>
      <MenuButton
        {...menu}
        disabled={disabled}
        ref={disclosure.ref}
        {...disclosure.props}
      >
        {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
      </MenuButton>
      <RekitMenu
        aria-label={label}
        sx={{
          border: 0,
          background: 'none',
          padding: 0,
          outline: 'none',
        }}
        {...menu}
        {...baseProps}
        disabled={disabled}
      >
        <Flex sx={styles}>
          {Children.map(children, (child, index) => (
            <MenuItem {...menu} {...child.props} key={index}>
              {(itemProps) => cloneElement(child, itemProps)}
            </MenuItem>
          ))}
        </Flex>
      </RekitMenu>
    </Fragment>
  )
}

export type MenuItemProps = Omit<ButtonProps, 'variant' | 'iconPosition'>

function Item(props: MenuItemProps, ref: Ref<HTMLButtonElement>) {
  const { sx = {}, ...buttonProps } = props
  const styles = mergeSx<SxStyleProp>(
    {
      color: 'text',
      ':hover': {
        color: 'text',
      },
      width: 'full',
      div: {
        justifyContent: 'flex-start',
      },
    },
    sx
  )

  return <Button ref={ref} sx={styles} variant="subtle" {...buttonProps} />
}

Menu.Item = forwardRef(Item)

export { Menu }
