# Admin UI Modal

Used to group various pieces of content into a container.

## Install

```bash
yarn add @vtex/admin-ui
```

## Usage

- Simple usage

```jsx
import { Modal, Card } from '@vtex/admin-ui'

function UseCase() {
  return (
    <Modal>
      <Card>{content}</Card>
    </Modal>
  )
}
```

## Props

| prop | type        | description        | required | default |
| ---- | ----------- | ------------------ | -------- | ------- |
| sx   | SxStyleProp | ThemeUI style prop | 🚫       | {}      |
