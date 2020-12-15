import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import 'mutationobserver-shim'

import { Modal } from './index'
import { ThemeProvider } from '../../system'

global.MutationObserver = window.MutationObserver

describe('Modal tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Modal
          visible
          data-testid="modal"
          aria-label="modal"
          disclosure={<button>disclosure</button>}
          styleOverrides={{
            bg: 'coral',
          }}
        >
          <Modal.Header
            data-testid="header"
            title="Header"
            styleOverrides={{
              bg: 'azure',
            }}
          />
          <Modal.Content
            data-testid="content"
            styleOverrides={{
              bg: 'aquamarine',
            }}
          >
            <div>modal content</div>
          </Modal.Content>
          <Modal.Footer
            data-testid="footer"
            styleOverrides={{
              bg: 'firebrick',
            }}
          >
            <button>footer button</button>
          </Modal.Footer>
        </Modal>
      </ThemeProvider>
    )

    expect(getByTestId('modal')).toHaveStyleRule('background-color', 'coral')
    expect(getByTestId('header')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('content')).toHaveStyleRule(
      'background-color',
      'aquamarine'
    )
    expect(getByTestId('footer')).toHaveStyleRule(
      'background-color',
      'firebrick'
    )
  })

  it('should match snapshot visible', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Modal
          visible
          aria-label="modal"
          disclosure={<button>disclosure</button>}
          baseId="id"
        >
          <Modal.Header title="Header" />
          <Modal.Content>
            <div>modal content</div>
          </Modal.Content>
          <Modal.Footer>
            <button>footer button</button>
          </Modal.Footer>
        </Modal>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with custom header', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Modal
          visible
          aria-label="modal"
          disclosure={<button>disclosure</button>}
          baseId="id"
          omitCloseButton
        >
          <Modal.Header title={() => <div>header</div>} />
          <Modal.Content>
            <div>modal content</div>
          </Modal.Content>
          <Modal.Footer>
            <Modal.Button>footer button</Modal.Button>
          </Modal.Footer>
        </Modal>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot hidden', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Modal
          aria-label="modal"
          disclosure={<button>disclosure</button>}
          baseId="id"
        >
          <Modal.Header title="Header" />
          <Modal.Content>
            <div>modal content</div>
          </Modal.Content>
          <Modal.Footer>
            <button>footer button</button>
          </Modal.Footer>
        </Modal>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Modal
          visible
          aria-label="modal"
          disclosure={<button>disclosure</button>}
        >
          <Modal.Header title="Header" />
          <Modal.Content>
            <div>modal content</div>
          </Modal.Content>
          <Modal.Footer>
            <button>footer button</button>
          </Modal.Footer>
        </Modal>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
