---
path: /docs/modal/
---

# Modal

Accessible Dialog component that follows the [WAI-ARIA Dialog
(Modal)](https://www.w3.org/TR/wai-aria-practices/#dialog_modal) Pattern. It's
rendered within a [Portal](https://reactjs.org/docs/portals.html) by default.
It has both stateful (Modal) and stateless components (StatelessModal).

## Usage

Stateful is the default way of using the Modal component within admin-ui.

```jsx
import { Modal, ThemeProvider, Text, Button } from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Modal
        aria-label="Publish modal"
        size="small"
        disclosure={<Button>Publish</Button>}
      >
        <Modal.Header title="Publish content" />
        <Modal.Content>
          <Text>
            Are you sure you want to publish this content? These action cannot
            be undone.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="subtle">Cancel</Button>
          <Button>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  )
}
```

### Composites

Modal is a compound component with the following composites:

| Name            | Description                                       | Props               |
| --------------- | ------------------------------------------------- | ------------------- |
| `Modal.Header`  | Modal header. Renders `header` element            | `Modal.HeaderProps` |
| `Modal.Content` | Content of the modal. Renders a `section` element | `BoxProps`          |
| `Modal.Footer`  | Modal footer. Renders a `footer` element          | `BoxProps`          |
| `Modal.Button`  | Renders a admin-ui/Button                         | `Modal.ButtonProps` |

**Modal.Header Props**

Same as `BoxProps` with aditional,

| Name        | Description                     | Type          | Default |
| ----------- | ------------------------------- | ------------- | ------- |
| title       | Title of the modal              | `ReactNode`   | null    |
| containerSx | Styles of the buttons container | `SxStyleProp` | {}      |

**Modal.Button Props**

Same as `ButtonProps` with aditional,

| Name              | Description                        | Type      | Default |
| ----------------- | ---------------------------------- | --------- | ------- |
| closeModalOnClick | If should close the modal on click | `boolean` | false   |

**Modal.Content Props**

Same as `BoxProps`.

**Modal.Footer Props**

Same as `BoxProps`.

### Sizes

The modal comes in three different sizes: `small`, `regular`, and `large`.

#### Regular (default)

```jsx
import {
  Modal,
  ThemeProvider,
  Text,
  Button,
  Label,
  Checkbox,
  useCheckbox,
} from '@vtex/admin-ui'
function Example() {
  const checkbox = useCheckbox()

  const handleClose = () => checkbox.setState(false)

  return (
    <ThemeProvider>
      <Modal
        aria-label="Conditions Modal"
        disclosure={<Button>Regular</Button>}
        size="regular"
        onClose={handleClose}
      >
        <Modal.Header title="Terms and Conditions" />
        <Modal.Content>
          <Text variant="subtitle">Shared Cart</Text>
          <Text>
            The shared cart is a tool that allows more than one customer to add,
            remove or update items and informations from the same cart.
            <br />
            For your customer, the shared cart means practicality when making a
            purchase. For your store, it means:
            <Text variant="subtitle">How this is technically possible</Text>
            We started using a parameter in the URL to identify the cart. As a
            result, the URL can be shared with other users, who can view the
            items, add and remove products, and even pay for the order. However,
            for users already registered in the platform (whose data is filled
            automatically in the checkout), all personal informations are
            secure: only the informations owner has access to them, after he is
            authenticated in the store.
            <Text variant="subtitle">Information security</Text>
            The payment is still done by one person whose informations remain
            secure, since the profile and delivery data are visible only to the
            user who creates the cart. For others, these same data are
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Label display="flex" position="relative" items="center">
            <Checkbox {...checkbox} />
            <Text pl="2">I accept the terms and conditions above</Text>
          </Label>
          <Button disabled={!checkbox.state}>Next</Button>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  )
}
```

#### Small

```jsx
import { Modal, ThemeProvider, Text, Button } from '@vtex/admin-ui'
function Example() {
  return (
    <ThemeProvider>
      <Modal
        aria-label="News modal"
        disclosure={<Button>Small</Button>}
        size="small"
      >
        <Modal.Header title="We have good news!" />
        <Modal.Content>
          <Text>
            This is our new experience for inventory update. Feel free to leave
            feedback.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button>Okay, got it</Button>
        </Modal.Footer>
      </Modal>
    </ThemeProvider>
  )
}
```

#### Large

```jsx
import {
  Modal,
  ThemeProvider,
  Text,
  Toggle,
  Button,
  List,
} from '@vtex/admin-ui'

function Example() {
  return (
    <ThemeProvider>
      <Modal
        aria-label="Transactions Modal"
        disclosure={<Button>Transactions settings</Button>}
        size="large"
        omitCloseButton
      >
        <Modal.Header title="Transactions settings">
          <Modal.Button variant="subtle" size="small" closeModalOnClick>
            Cancel
          </Modal.Button>
          <Modal.Button closeModalOnClick size="small">
            Save Changes
          </Modal.Button>
        </Modal.Header>
        <Modal.Content>
          <List
            density="compact"
            label="General"
            sx={{
              div: {
                justifyContent: 'space-between',
              },
            }}
          >
            <List.Item>
              <Text>Default markup for external integration</Text>
              <Text c="muted.1">100%</Text>
            </List.Item>
            <List.Item>
              <Text>Use price variation limit</Text>
              <Toggle state />
            </List.Item>
            <List.Item>
              <Text>Inherit prices from parent account</Text>
              <Toggle state />
            </List.Item>
            <List.Item>
              <Text>Overwrite seller prices</Text>
              <Toggle state />
            </List.Item>
          </List>
        </Modal.Content>
        <Modal.Content>
          <List
            density="compact"
            label="Psychological pricing"
            sx={{
              div: {
                justifyContent: 'space-between',
              },
            }}
          >
            <List.Item>
              <List.TextGroup
                variant="body"
                title="Apply this method to all prices"
                subtitle="Inactive"
              />
              <Toggle state />
            </List.Item>
            <List.Item>
              <Text>At what price range will this rule apply?</Text>
              <Text c="muted.1">From 9.90 to 20.00</Text>
            </List.Item>
            <List.Item>
              <Text>How many digits will be rounded?</Text>
              <Text c="muted.1">2</Text>
            </List.Item>
            <List.Item>
              <Text>Which rounding method will be applied to?</Text>
              <Text c="muted.1">Nines</Text>
            </List.Item>
          </List>
        </Modal.Content>
      </Modal>
    </ThemeProvider>
  )
}
```

## Props

<propdetails heading="Modal" component="Modal">
</propdetails>

# Stateless Modal

Sometimes, you may need to access the modal states or open it on async updates (like data fetching). For this, need to use the stateless approach.
You will also need the `ModalDisclosure` component and the `useModalState` hook.

```jsx static
import { useModalState, ModalDisclosure } from '@vtex/admin-ui'

function Example() {
  const state = useModalState()
  return (
    <ModalDisclosure {...state}>
      {/** Can be any component */}
      <Button>Toggle Modal</Button>
    </ModalDisclosure>
  )
}
```

```jsx
import {
  StatelessModal,
  ModalDisclosure,
  ThemeProvider,
  Box,
  useModalState,
  Text,
  Button,
} from '@vtex/admin-ui'

function Example() {
  const publishModal = useModalState()

  return (
    <ThemeProvider>
      <Box>
        <ModalDisclosure {...publishModal}>
          <Button>Publish</Button>
        </ModalDisclosure>
        <StatelessModal
          aria-label="Publish modal"
          state={publishModal}
          size="small"
        >
          <StatelessModal.Header title="Publish content" />
          <StatelessModal.Content>
            <Text>
              Are you sure you want to publish this content? These action cannot
              be undone.
            </Text>
          </StatelessModal.Content>
          <StatelessModal.Footer>
            <Button variant="subtle">Cancel</Button>
            <Button>Confirm</Button>
          </StatelessModal.Footer>
        </StatelessModal>
      </Box>
    </ThemeProvider>
  )
}
```

In this example, we trigger the modal after fetching some data (it takes 1 second):

```jsx static
import { Modal, ThemeProvider, Box, Button, Text } from '@vtex/admin-ui'

const [data, setData] = useState([])
const ref = useRef({ oneTime: true })
const blockModal = useModalState()

/**
 * Simulates a data fetching
 */
const fetchData = async () => {
  const simulateRequest = (delay: number, value: Item[]): Promise<Item[]> =>
    new Promise((resolve) => setTimeout(resolve, delay, value))

  const resolved = await simulateRequest(1000, [
    { id: '1', icon: IconCarousel, title: 'Carousel' },
    { id: '2', icon: IconShelf, title: 'Shelf' },
    { id: '3', icon: IconInfoCard, title: 'Infocard' },
    { id: '4', icon: IconRichText, title: 'Rich text' },
    { id: '5', icon: IconVitrine, title: 'Vitrine by Corebiz™' },
  ])

  setData(resolved)
}

useEffect(() => {
  if (ref.current.oneTime && data.length > 0) {
    blockModal.show()
    ref.current.oneTime = false
  }
}, [data, blockModal])
function Example() {
  return (
    <ThemeProvider>
      <Box sx={{ 'button + button': { ml: 4 } }}>
        <Button onClick={fetchData} disabled={data.length > 0}>
          Get blocks data
        </Button>
        <ModalDisclosure {...blockModal}>
          <Button disabled={data.length === 0}>Add new block</Button>
        </ModalDisclosure>
        <StatelessModal aria-label="Add block modal" state={blockModal}>
          <StatelessModal.Header title="Add new block" />
          <StatelessModal.Content sx={{ paddingTop: 0 }}>
            <List>
              {data.map(({ id, icon: Icon, title }) => (
                <List.Item key={id}>
                  <Icon />
                  <List.TextGroup
                    ml="4"
                    title={title}
                    subtitle="Short description about the block"
                  />
                </List.Item>
              ))}
            </List>
          </StatelessModal.Content>
        </StatelessModal>
      </Box>
    </ThemeProvider>
  )
}
```

## useModalState Props

Same as [Reakit useDialogState](https://reakit.io/docs/dialog/#usedialogstate)

## Props

<propdetails heading="StatelessModal" component="StatelessModal">
</propdetails>
