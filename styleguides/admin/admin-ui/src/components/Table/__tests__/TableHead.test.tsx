import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { TableHead } from '../components/Head'
import { ThemeProvider } from '../../../system'
import { StylesContext, useCellRoleContext } from '../context'
import { TableDensity, TableDir } from '../typings'

const getStyles = (density: TableDensity) => {
  const base = `components.table.${density}`

  return {
    variants: {
      base,
      table: `${base}.table`,
      header: `${base}.header`,
      body: `${base}.body`,
      row: `${base}.row`,
      cell: `${base}.cell`,
      columnheader: `${base}.columnheader`,
    },
    dir: 'rtl' as TableDir,
  }
}

describe('TableHead tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <StylesContext.Provider value={getStyles('compact')}>
          <TableHead
            data-testid="table-head"
            styleOverrides={{ bg: 'coral' }}
          />
        </StylesContext.Provider>
      </ThemeProvider>
    )

    expect(getByTestId('table-head')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should provide the "columnheader" value within its Context', () => {
    const { result } = renderHook(() => useCellRoleContext(), {
      wrapper: function Render({ children }: PropsWithChildren<unknown>) {
        return (
          <ThemeProvider>
            <StylesContext.Provider value={getStyles('compact')}>
              <TableHead styleOverrides={{ bg: 'coral' }}>{children}</TableHead>
            </StylesContext.Provider>
          </ThemeProvider>
        )
      },
    })

    expect(result.current).toBe('columnheader')
  })
})
