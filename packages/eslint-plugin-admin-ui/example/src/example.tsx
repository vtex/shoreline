import { tag } from '@vtex/admin-ui'

const createComponent = () => {
  function Component() {
    const newLocal = 'div'
    // eslint-disable-next-line @vtex/admin-ui/create-tag-component-outside-render-phase
    const Box = tag(newLocal)

    return Box
  }

  return Component
}

createComponent()
