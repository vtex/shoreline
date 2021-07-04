import React from 'react'
import { ThemeProvider } from '@vtex/admin-core'
import {
  getByTestId,
  getByText,
  queryAllByTestId,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react'
import { axe } from 'jest-axe'
import { Toast } from './components/Toast'
import { ToasterProps, ToastOptions } from './components/typings'
import { message, types } from './testUtils'
import { Toaster } from './components/Toaster'
import { act } from 'react-dom/test-utils'
import { toast } from './index'

const mockedToastProps: ToastOptions = {
  remove: () => null,
  stack: [],
  id: '',
  message,
}

const mockedToasterProps: ToasterProps = {
  state: {
    'bottom-right': [],
  },
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

    expect(getByTestId('onda-toast-component')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should have info style when no type is passed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Toast {...mockedToastProps} />
      </ThemeProvider>
    )

    expect(getByTestId('onda-toast-component')).toHaveStyleRule(
      'background-color',
      'white'
    )
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
  it('should remove toast after specified duration', async () => {
    act(() => {
      toast.dispatch({
        message: "I'm a toast!",
        duration: 3000,
      })
    })

    expect(getByText(document.body, "I'm a toast!")).toBeInTheDocument()

    await waitFor(
      () =>
        expect(
          queryByText(document.body, "I'm a toast!")
        ).not.toBeInTheDocument(),
      {
        timeout: 4000,
      }
    )
  })

  it('should dispatch toasts and remove them from stack', async () => {
    act(() => {
      toast.dispatch({
        message: "I'm a toast!",
        duration: 3000,
      })
      setTimeout(() => {
        toast.dispatch({
          message: "I'm another toast!",
          duration: 3000,
        })
      }, 1000)
    })

    expect(getByText(document.body, "I'm a toast!")).toBeInTheDocument()
    await waitFor(
      () => {
        expect(
          getByText(document.body, "I'm another toast!")
        ).toBeInTheDocument()
      },
      {
        timeout: 1000,
      }
    )

    await waitFor(
      () => {
        expect(
          queryByText(document.body, "I'm a toast!")
        ).not.toBeInTheDocument()
        expect(
          getByText(document.body, "I'm another toast!")
        ).toBeInTheDocument()
      },
      {
        timeout: 4000,
      }
    )

    await waitFor(
      () => {
        expect(
          queryByText(document.body, "I'm another toast!")
        ).not.toBeInTheDocument()
      },
      {
        timeout: 5000,
      }
    )
  })

  it('should remove toast from stack after specified duration', async () => {
    act(() => {
      toast.dispatch({
        message: "I'm a toast!",
        duration: 3000,
      })
      setTimeout(() => {
        toast.dispatch({
          message: "I'm another toast!",
          duration: 3000,
        })
      }, 1000)
    })

    expect(getByText(document.body, "I'm a toast!")).toBeInTheDocument()

    await waitFor(
      () => {
        expect(
          getByText(document.body, "I'm another toast!")
        ).toBeInTheDocument()
      },
      {
        timeout: 1000,
      }
    )

    await waitFor(
      () => {
        expect(
          queryByText(document.body, "I'm a toast!")
        ).not.toBeInTheDocument()
        expect(
          getByText(document.body, "I'm another toast!")
        ).toBeInTheDocument()
      },
      {
        timeout: 4000,
      }
    )

    await waitFor(
      () => {
        expect(
          queryByText(document.body, "I'm another toast!")
        ).not.toBeInTheDocument()
      },
      {
        timeout: 5000,
      }
    )
  })
})

describe('Toaster tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Toaster {...mockedToasterProps} />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Toaster {...mockedToasterProps} />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should stack toasts', () => {
    act(() => {
      toast.dispatch({
        message: "I'm a toast!",
      })
      toast.dispatch({
        message: "I'm another toast!",
      })
      toast.dispatch({
        message: "I'm yet another toast!",
      })
    })

    expect(
      queryAllByTestId(document.body, 'onda-toast-component')
    ).toHaveLength(3)
    expect(getByText(document.body, "I'm a toast!")).toBeVisible()
    expect(getByText(document.body, "I'm another toast!")).toBeVisible()
    expect(getByText(document.body, "I'm yet another toast!")).toBeVisible()
  })

  it('should be rendered on toast.dispatch', () => {
    act(() => {
      toast.dispatch({
        message: "I'm a toast!",
      })
    })

    expect(getByTestId(document.body, 'onda-toaster')).toBeInTheDocument()
  })
})
