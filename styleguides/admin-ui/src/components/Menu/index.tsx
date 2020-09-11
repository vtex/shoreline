/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { Fragment, cloneElement } from 'react'
import {
  useMenuState,
  Menu as BaseMenu,
  MenuItem,
  MenuButton,
} from 'reakit/Menu'
import { get } from '@vtex-components/theme'

export function Menu({ disclosure, items, ...props }: any) {
  const menu = useMenuState()

  return (
    <Fragment>
      <MenuButton {...menu} ref={disclosure.ref} {...disclosure.props}>
        {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
      </MenuButton>
      <BaseMenu
        aria-label="custom menu"
        sx={{
          border: 0,
          background: 'none',
          padding: 0,
          outline: 'none',
        }}
        {...menu}
        {...props}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyItems: 'center',
            justifyContent: 'center',
            background: (theme) => get(theme, 'colors.background'),
            border: (theme) =>
              `${get(theme, 'sizes.1')} solid ${get(theme, 'colors.muted.2')}`,
            marginTop: 4,
            padding: 5,
            minWidth: 19,
            borderRadius: 4,
          }}
        >
          {items.map((item: any, i: number) => (
            <MenuItem {...menu} {...item.props} key={i}>
              {(itemProps) => cloneElement(item, itemProps)}
            </MenuItem>
          ))}
        </Flex>
      </BaseMenu>
    </Fragment>
  )
}
