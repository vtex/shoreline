---
title: Modal
path: /modal/
---

# Modal

A Modal Dialog is used to represent information that demands attention and/or action from the users, preventing them from interacting with the rest of the page. It follows the [WAI-ARIA Dialog (Modal) Pattern](https://www.w3.org/TR/wai-aria-practices/#dialog_modal).

## Import

```jsx isStatic
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalDisclosure,
  useModalState,
} from '@vtex/admin-ui'
```

## Behavior

Modal is a compound component with the following composites:

| Name           | Description                                       |
| -------------- | ------------------------------------------------- |
| `ModalHeader`  | Modal header. Renders `header` element            |
| `ModalContent` | Content of the modal. Renders a `section` element |
| `ModalFooter`  | Modal footer. Renders a `footer` element          |
| `ModalButton`  | Renders a admin-ui/Button                         |

```jsx
function ModalDialog() {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>Publish</Button>
      </ModalDisclosure>
      <Modal aria-label="Publish modal" state={modal} size="small">
        <ModalHeader title="Publish content" />
        <ModalContent>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}
```

## Examples

### Sizes

The modal comes in three different sizes: `small`, `regular`, and `large`.

#### Small

```jsx
function SmallModal() {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>Small</Button>
      </ModalDisclosure>
      <Modal aria-label="Small" state={modal} size="small">
        <ModalHeader title="Small" />
        <ModalContent>
          <Text>Small Modal</Text>
        </ModalContent>
        <ModalFooter>
          <Button>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}
```

#### Regular (default)

```jsx
function RegularModal() {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>Regular</Button>
      </ModalDisclosure>
      <Modal aria-label="Regular" state={modal}>
        <ModalHeader title="Regular" />
        <ModalContent>
          <Text>Regular Modal</Text>
        </ModalContent>
        <ModalFooter>
          <Button>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}
```

#### Large

```jsx
function LargeModal() {
  const modal = useModalState()

  return (
    <Box>
      <ModalDisclosure state={modal}>
        <Button>Large</Button>
      </ModalDisclosure>
      <Modal aria-label="Large" state={modal} size="large">
        <ModalHeader title="Large" />
        <ModalContent>
          <Text>Large Modal</Text>
        </ModalContent>
        <ModalFooter>
          <Button>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Box>
  )
}
```

## Accessibility

- `Modal` has the `dialog` role.
- `Modal` has `aria-modal` set to true.
- When `Modal` opens, focus moves to an element inside of it.
- Focus is trapped within the `Modal`.
- <kbd>ESC</kbd> closes `Modal` unless hideOnEsc is set to false.
- Clicking outside the `Modal` closes it unless hideOnClickOutside is set to false.

## Props

### Modal

| Name                 | Description                                                       | Type                          | Required | Default   |
| -------------------- | ----------------------------------------------------------------- | ----------------------------- | -------- | --------- |
| `aria-label`         | Modal aria-label                                                  | `string`                      | ✅       | -         |
| `state`              | Return of useModalState                                           | `ModalState`                  | ✅       | -         |
| `size`               | Modal size                                                        | `small`, `regular` or `large` | 🚫       | `regular` |
| `hideOnClickOutside` | When enabled, user can hide the dialog by clicking outside it     | `boolean`                     | 🚫       | true      |
| `hideOnEsc`          | When enabled, user can hide the dialog by pressing <kbd>ESC</kbd> | `boolean`                     | 🚫       | true      |

### useModalState

| Name    | Description             | Type      | Required | Default |
| ------- | ----------------------- | --------- | -------- | ------- |
| visible | If is initially visible | `boolean` | 🚫       | false   |

### ModalHeader

All props of `header` JSX element, and:

| Name        | Description                     | Type          | Required | Default |
| ----------- | ------------------------------- | ------------- | -------- | ------- |
| title       | Title of the modal              | `ReactNode`   | 🚫       | null    |
| containerSx | Styles of the buttons container | `SxStyleProp` | 🚫       | {}      |

### ModalButton Props

All props of [Button](/button/), and:

| Name              | Description                        | Type      | Required | Default |
| ----------------- | ---------------------------------- | --------- | -------- | ------- |
| closeModalOnClick | If should close the modal on click | `boolean` | 🚫       | false   |

### ModalContent Props

All props of `section` JSX element.

### ModalFooter Props

All props of `footer` JSX element.
