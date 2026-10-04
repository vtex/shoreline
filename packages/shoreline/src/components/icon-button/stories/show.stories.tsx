import { userEvent, within } from '@storybook/test'
import type { StoryContext } from '@storybook/react'
import { IconPlus } from '../../../icons'
import { IconButton, type IconButtonProps } from '../index'
import './show.css'

export default {
  title: 'components/icon-button',
  parameters: { chromatic: { disableSnapshot: false } },
}

const sizes = ['small', 'normal', 'large'] as const
const shapes = ['default', 'rounded'] as const
const variants: Array<NonNullable<IconButtonProps['variant']>> = [
  'primary',
  'secondary',
  'tertiary',
  'critical',
  'criticalTertiary',
  'success',
  'outline',
]

export function Show() {
  return (
    <div>
      <h2>Keyboard focus and hover</h2>
      <div className="icon-button-show-states">
        <IconButton label="Keyboard focus" variant="primary" shape="rounded">
          <IconPlus />
        </IconButton>
        <IconButton label="Hover" variant="success" shape="rounded">
          <IconPlus />
        </IconButton>
      </div>
      <h2>Variants, shapes and sizes</h2>
      <div className="icon-button-show-grid">
        {sizes.flatMap((size) =>
          shapes.flatMap((shape) =>
            variants.map((variant) => (
              <section
                className="icon-button-show-card"
                key={`${size}-${shape}-${variant}`}
              >
                <h3>
                  {variant} · {shape} · {size}
                </h3>
                <div className="icon-button-show-states">
                  <IconButton
                    size={size}
                    shape={shape}
                    variant={variant}
                    label="Add item"
                  >
                    <IconPlus />
                  </IconButton>
                  <IconButton
                    size={size}
                    shape={shape}
                    variant={variant}
                    label="Add item"
                    loading
                  >
                    <IconPlus />
                  </IconButton>
                  <IconButton
                    size={size}
                    shape={shape}
                    variant={variant}
                    label="Add item"
                    disabled
                  >
                    <IconPlus />
                  </IconButton>
                </div>
              </section>
            ))
          )
        )}
      </div>
    </div>
  )
}

Show.play = async ({ canvasElement }: StoryContext) => {
  const canvas = within(canvasElement)
  await userEvent.tab()
  await userEvent.hover(canvas.getByRole('button', { name: 'Hover' }))
}
