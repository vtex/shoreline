import React from 'react'
import { axe, fireEvent, press, render, screen } from '../../../test-utils'

import type { SelectorInitialState } from '../index'
import {
  Selector,
  SelectorDialog,
  SelectorDisclosure,
  useSelectorState,
} from '../index'

function BaseComponent(props: SelectorInitialState) {
  const state = useSelectorState({
    ...props,
    selectorId: 'selector-1',
    dialogId: 'dialog-1',
    baseId: 'selector-test',
  })

  return (
    <>
      <Selector aria-label="selector base" state={state}>
        <SelectorDisclosure state={state}>open</SelectorDisclosure>
      </Selector>
      <SelectorDialog
        aria-label="selector base content"
        data-testid="testid-selector-dialog"
        state={state}
      >
        <button>tabbable</button> Content
      </SelectorDialog>
    </>
  )
}

describe('Selector', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<BaseComponent visible />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should open/close properly', () => {
    render(<BaseComponent />)

    const pickerContent = screen.getByTestId('testid-selector-dialog')

    expect(pickerContent).not.toBeVisible()
    fireEvent.click(screen.getByText('open'))
    expect(pickerContent).toBeVisible()

    press.Escape()
    expect(pickerContent).not.toBeVisible()
  })

  it('Selector renders with no a11y violations', async () => {
    const { container } = render(<BaseComponent />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
