import { userEvent, within } from '@storybook/test'
import type { StoryContext } from '@storybook/react'
import { IconPlus } from '../../../icons'
import { Button, type ButtonProps } from '../index'
import './show.css'

export default {
  title: 'components/button',
  parameters: { chromatic: { disableSnapshot: false } },
}

const sizes = ['small', 'normal', 'large'] as const
const shapes = ['default', 'rounded'] as const
const variants: Array<NonNullable<ButtonProps['variant']>> = [
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
      <div className="button-show-states">
        <Button variant="primary">Keyboard focus</Button>
        <Button variant="success">Hover</Button>
      </div>
      <h2>Variants, shapes and sizes</h2>
      <div className="button-show-grid">
        {sizes.flatMap((size) =>
          shapes.flatMap((shape) =>
            variants.map((variant) => (
              <section
                className="button-show-card"
                key={`${size}-${shape}-${variant}`}
              >
                <h3>
                  {variant} · {shape} · {size}
                </h3>
                <div className="button-show-states">
                  <Button size={size} shape={shape} variant={variant}>
                    Continue
                  </Button>
                  <Button size={size} shape={shape} variant={variant}>
                    <IconPlus /> Add item
                  </Button>
                  <Button size={size} shape={shape} variant={variant} loading>
                    Continue
                  </Button>
                  <Button size={size} shape={shape} variant={variant} disabled>
                    Continue
                  </Button>
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
