import React from 'react'
import { render, axe } from '../../test-utils'
import 'mutationobserver-shim'

import { Modal } from './index'

global.MutationObserver = window.MutationObserver

describe('Modal tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Modal
        visible
        data-testid="modal"
        aria-label="modal"
        disclosure={<button>disclosure</button>}
        csx={{
          bg: 'coral',
        }}
      >
        <Modal.Header
          data-testid="header"
          title="Header"
          csx={{
            bg: 'azure',
          }}
        />
        <Modal.Content
          data-testid="content"
          csx={{
            bg: 'aquamarine',
          }}
        >
          <div>modal content</div>
        </Modal.Content>
        <Modal.Footer
          data-testid="footer"
          csx={{
            bg: 'firebrick',
          }}
        >
          <button>footer button</button>
        </Modal.Footer>
      </Modal>
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

  it('should match snapshot visible with small size', () => {
    const { asFragment } = render(
      <Modal
        visible
        aria-label="modal"
        disclosure={<button>disclosure</button>}
        baseId="id"
        size="small"
      >
        <Modal.Header title="Header" />
        <Modal.Content>
          <div>modal content</div>
        </Modal.Content>
      </Modal>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot visible with regular size', () => {
    const { asFragment } = render(
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
      </Modal>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot visible with large size', () => {
    const { asFragment } = render(
      <Modal
        visible
        aria-label="modal"
        disclosure={<button>disclosure</button>}
        baseId="id"
        size="large"
      >
        <Modal.Header title="Header" />
        <Modal.Content>
          <div>modal content</div>
        </Modal.Content>
      </Modal>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot visible with larger scroll area', () => {
    const { asFragment } = render(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot visible with extra large scroll area', () => {
    const { asFragment } = render(
      <Modal
        visible
        aria-label="modal"
        disclosure={<button>disclosure</button>}
        baseId="id"
        size="large"
      >
        <Modal.Header title="Header" />
        <Modal.Content>
          <div>modal content</div>
        </Modal.Content>
        <Modal.Footer>
          <button>footer button</button>
        </Modal.Footer>
      </Modal>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with custom header', () => {
    const { asFragment } = render(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot hidden', () => {
    const { asFragment } = render(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
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
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
