import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { TableBody } from '../components/Body'
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

describe('TableBody tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <StylesContext.Provider value={getStyles('compact')}>
          <TableBody
            data-testid="table-body"
            styleOverrides={{ bg: 'coral' }}
          />
        </StylesContext.Provider>
      </ThemeProvider>
    )

    expect(getByTestId('table-body')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should provide the "cell" value within its Context', () => {
    const { result } = renderHook(() => useCellRoleContext(), {
      wrapper: function Render({ children }: PropsWithChildren<unknown>) {
        return (
          <ThemeProvider>
            <StylesContext.Provider value={getStyles('compact')}>
              <TableBody
                data-testid="table-body"
                styleOverrides={{ bg: 'coral' }}
              >
                {children}
              </TableBody>
            </StylesContext.Provider>
          </ThemeProvider>
        )
      },
    })

    expect(result.current).toBe('cell')
  })
})
