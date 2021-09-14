---
path: /toolbar/
---

# Toolbar

Accessible Toolbar component that follows the [WAI-ARIA Toolbar Pattern](https://www.w3.org/TR/wai-aria-practices/#toolbar). It's a container for grouping a set of controls.

## Import

```jsx isStatic
import {
  Toolbar,
  ToolbarItem,
  ToolbarButton,
  useToolbarState,
} from '@vtex/admin-ui'
```

## Behavior

The `useToolbarState` hook handles the `Toolbar` behavior.

```jsx
function Example() {
  const toolbar = useToolbarState()

  return (
    <Toolbar state={toolbar} aria-label="Example Toolbar">
      <ToolbarButton>Item 1</ToolbarButton>
      <ToolbarButton>Item 2</ToolbarButton>
      <ToolbarButton>Item 3</ToolbarButton>
    </Toolbar>
  )
}
```

## ToolbarButton

A [Button](/button/) ready for the `Toolbar`

```jsx
function Example() {
  const toolbar = useToolbarState()

  return (
    <Toolbar state={toolbar} aria-label="Example Toolbar">
      <ToolbarButton>Item 1</ToolbarButton>
      <ToolbarButton variant="secondary">Item 2</ToolbarButton>
      <ToolbarButton variant="tertiary">Item 3</ToolbarButton>
    </Toolbar>
  )
}
```

## ToolbarItem

For composition, you can use `ToolbarItem`. It has the item props as callback so that the render can be customized. This is useful to trigger Menus, Modals and so on.

```jsx
function Example() {
  const toolbar = useToolbarState()
  const menuState = useMenuState()
  const modalState = useModalState()

  return (
    <tag.div>
      <Toolbar state={toolbar} aria-label="Toolbar Render Props">
        <ToolbarItem>
          {(itemProps) => (
            <Menu state={state}>
              <MenuButton display="actions" variant="secondary" {...itemProps}>
                Open Menu
              </MenuButton>
              <MenuList aria-label="Menu">
                {canDownload && (
                  <MenuItem icon={<IconImport />}>Download</MenuItem>
                )}
                <MenuItem icon={<IconLink />}>Link to</MenuItem>
                <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<IconDelete />}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </ToolbarItem>
        <ToolbarItem>
          {(itemProps) => (
            <ModalDisclosure state={modalState}>
              <Button {...itemProps} variant="adaptative-dark">
                Open modal
              </Button>
            </ModalDisclosure>
          )}
        </ToolbarItem>
      </Toolbar>

      <Modal aria-label="Seneca's modal" state={modalState} size="small">
        <ModalHeader title="Item 6" />
        <ModalContent>
          <Text>
            True happiness is to enjoy the present, without anxious dependence
            upon the future, not to amuse ourselves with either hopes or fears
            but to rest satisfied with what we have, which is sufficient, for he
            that is so wants nothing. The greatest blessings of mankind are
            within us and within our reach. A wise man is content with his lot,
            whatever it may be, without wishing for what he has not.
          </Text>
        </ModalContent>
      </Modal>
    </tag.div>
  )
}
```

## Accessibility

### Best practices

- Its always important to define an `aria-label` for the `Toolbar`:

```jsx isStatic
const state = useToolbarState()

<Toolbar state={state} aria-label="MeaningfulNameFor Toolbar" />
```

- You should always pass a focusable element within ToolbarItem

```jsx isStatic
// ✅ Good
<ToolbarItem>
  (props => <button {...props}>action</button>)
</ToolbarItem>

// ✅ Good
<ToolbarItem>
  (props => <Clickable {...props}>clickable surface</Clickable>)
</ToolbarItem>

// 🚨 Bad
<ToolbarItem>
  (props => <div {...props}>action</div>)
</ToolbarItem>

// 🚨 Bad
<ToolbarItem>
  (props => <div role="button" {...props}>action</div>)
</ToolbarItem>
```

### Keyboard Navigation

- <kbd>→</kbd> moves focus to the next `ToolbarItem` if orientation is horizontal or not defined.
- <kbd>←</kbd> moves focus to the previous `ToolbarItem` if orientation is horizontal or not defined.
- <kbd>Home</kbd> or <kbd>PageUp</kbd> moves focus to the first `ToolbarItem`.
- <kbd>End</kbd> or <kbd>PageDown</kbd> moves focus to the last `ToolbarItem`.

## Types

### Toolbar props

| Name      | Type           | Description                                                                                                                                           | Required | Default |
| --------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| state     | `ToolbarState` | Toolbar state                                                                                                                                         | ✅       | -       |
| disabled  | `boolean`      | Same as the HTML attribute                                                                                                                            | 🚫       | -       |
| focusable | `boolean`      | When an element is disabled, it may still be focusable. It works similarly to readOnly on form elements. In this case, only aria-disabled will be set | 🚫       | -       |
