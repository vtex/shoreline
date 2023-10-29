import React from 'react'
import { fireEvent, render, screen } from '../test-utils'

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
  it('should open/close properly', () => {
    render(<BaseComponent />)

    const pickerContent = screen.getByTestId('testid-picker-dialog')

    expect(pickerContent).not.toBeVisible()
    fireEvent.click(screen.getByText('open'))
    expect(pickerContent).toBeVisible()
  })
})
