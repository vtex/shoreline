import React from 'react'
import { ThemeProvider } from '@vtex/admin-core'
import { render, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Toast } from './components/Toast'
import {
  ToastManagerProps,
  ToastOptions,
  ToastProps,
  ToastManagerActions,
} from './components/typings'
import { message, types } from './testUtils'
import { ToastManager } from './components/Manager'
import { act } from 'react-dom/test-utils'

const mockedToastProps: ToastOptions = {
  remove: () => null,
  stack: [],
  id: '',
  message,
}

const mockedToastManagerProps: ToastManagerProps = {
  actions: () => null,
}

const ToastVariants = () => (
  <>
    <Toast {...mockedToastProps} />
    {types.map((type, key) => (
      <Toast key={key} {...mockedToastProps} type={type} />
    ))}
    {types.map((type, key) => (
      <Toast key={key} {...mockedToastProps} type={type} dismissible />
    ))}
    {types.map((type, key) => (
      <Toast
        key={key}
        {...mockedToastProps}
        type={type}
        action={{
          children: <span>Action</span>,
        }}
      />
    ))}
    {types.map((type, key) => (
      <Toast
        key={key}
        {...mockedToastProps}
        type={type}
        dismissible
        action={{
          children: <span>Action</span>,
        }}
      />
    ))}
  </>
)

describe('Toast tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Toast {...mockedToastProps} csx={{ backgroundColor: 'azure' }} />
      </ThemeProvider>
    )

    expect(getByTestId('toast')).toHaveStyleRule('background-color', 'azure')
  })

  it('should have info style when no type is passed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Toast {...mockedToastProps} />
      </ThemeProvider>
    )

    expect(getByTestId('toast')).toHaveStyleRule('background-color', 'white')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <ToastVariants />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <ToastVariants />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('ToastManager tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <ToastManager {...mockedToastManagerProps} />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <ToastManager {...mockedToastManagerProps} />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should bind actions on mount', () => {
    const bindActions = jest.fn()

    render(
      <ThemeProvider>
        <ToastManager actions={bindActions} />
      </ThemeProvider>
    )

    expect(bindActions).toHaveBeenCalled()
  })

  it('should add toast on the stack', () => {
    let notify: (props: ToastProps) => string
    const bindActions = jest.fn((actions: ToastManagerActions) => {
      notify = actions.notify
    })

    const { getByTestId } = render(
      <ThemeProvider>
        <ToastManager actions={bindActions} />
      </ThemeProvider>
    )

    expect(bindActions).toHaveBeenCalled()

    act(() => {
      notify!({
        message: "I'm a toast!",
      })
    })

    expect(getByTestId('toast')).toHaveTextContent("I'm a toast!")
  })

  it('should stack toasts', () => {
    let notify: (props: ToastProps) => string
    const bindActions = jest.fn((actions: ToastManagerActions) => {
      notify = actions.notify
    })

    const { queryAllByTestId, getByText } = render(
      <ThemeProvider>
        <ToastManager actions={bindActions} />
      </ThemeProvider>
    )

    expect(bindActions).toHaveBeenCalled()

    act(() => {
      notify!({
        message: "I'm a toast!",
      })
      notify!({
        message: "I'm another toast!",
      })
      notify!({
        message: "I'm the third toast!",
      })
    })

    expect(queryAllByTestId('toast')).toHaveLength(3)
    expect(getByText("I'm a toast!")).toBeVisible()
    expect(getByText("I'm another toast!")).toBeVisible()
    expect(getByText("I'm the third toast!")).toBeVisible()
  })

  it('should remove toast after specified duration', async () => {
    let notify: (props: ToastProps) => string
    const bindActions = jest.fn((actions: ToastManagerActions) => {
      notify = actions.notify
    })

    const { getByText, queryByText } = render(
      <ThemeProvider>
        <ToastManager actions={bindActions} />
      </ThemeProvider>
    )

    expect(bindActions).toHaveBeenCalled()

    act(() => {
      notify!({
        message: "I'm a toast!",
        duration: 3000,
      })
    })

    expect(getByText("I'm a toast!")).toBeInTheDocument()

    await waitFor(
      () => expect(queryByText("I'm a toast!")).not.toBeInTheDocument(),
      {
        timeout: 4000,
      }
    )
  })

  it('should remove toast from stack after specified duration', async () => {
    let notify: (props: ToastProps) => string
    const bindActions = jest.fn((actions: ToastManagerActions) => {
      notify = actions.notify
    })

    const { getByText, queryByText } = render(
      <ThemeProvider>
        <ToastManager actions={bindActions} />
      </ThemeProvider>
    )

    expect(bindActions).toHaveBeenCalled()

    act(() => {
      notify!({
        message: "I'm a toast!",
        duration: 3000,
      })
      setTimeout(() => {
        notify!({
          message: "I'm another toast!",
          duration: 3000,
        })
      }, 1000)
    })

    expect(getByText("I'm a toast!")).toBeInTheDocument()
    await waitFor(
      () => {
        expect(getByText("I'm another toast!")).toBeInTheDocument()
      },
      {
        timeout: 1000,
      }
    )

    await waitFor(
      () => {
        expect(queryByText("I'm a toast!")).not.toBeInTheDocument()
        expect(getByText("I'm another toast!")).toBeInTheDocument()
      },
      {
        timeout: 4000,
      }
    )

    await waitFor(
      () => {
        expect(queryByText("I'm another toast!")).not.toBeInTheDocument()
      },
      {
        timeout: 5000,
      }
    )
  })
})
