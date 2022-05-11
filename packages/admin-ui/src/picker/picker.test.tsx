import React from 'react'
import { axe, fireEvent, render, screen } from '../test-utils'

import type { PickerInitialState } from './index'
import {
  Picker,
  PickerPopover,
  PickerDisclosure,
  usePickerState,
} from './index'

function BaseComponent(props: PickerInitialState) {
  const state = usePickerState({
    ...props,
    pickerId: 'selector-1',
    popoverId: 'dialog-1',
    baseId: 'picker-test',
  })

  return (
    <>
      <Picker aria-label="picker base" state={state}>
        <PickerDisclosure state={state}>open</PickerDisclosure>
      </Picker>
      <PickerPopover
        aria-label="picker base content"
        data-testid="testid-picker-dialog"
        state={state}
      >
        <button>tabbable</button> Content
      </PickerPopover>
    </>
  )
}

describe('Picker', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<BaseComponent visible />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should open/close properly', () => {
    render(<BaseComponent />)

    const pickerContent = screen.getByTestId('testid-picker-dialog')

    expect(pickerContent).not.toBeVisible()
    fireEvent.click(screen.getByText('open'))
    expect(pickerContent).toBeVisible()
  })

  /**
   * @TODO Fix a11y
   * Disabled because the component behavior is not accessible yet.
   */
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Selector renders with no a11y violations', async () => {
    const { container } = render(<BaseComponent />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
