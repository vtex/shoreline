import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { TableRow } from '../components/Row'
import { TableCell } from '../components/Cell'
import { TableHead } from '../components/Head'
import { TableBody } from '../components/Body'
import { ThemeProvider } from '@vtex/admin-core'
import { StylesContext } from '../context'
import { getStyles } from './testUtil'

describe('TableRow tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <StylesContext.Provider value={getStyles('compact')}>
          <TableHead>
            <TableRow data-testid="table-row" styleOverrides={{ bg: 'coral' }}>
              <TableCell
                column={{
                  id: 'test',
                }}
              >
                cell
              </TableCell>
            </TableRow>
          </TableHead>
        </StylesContext.Provider>
      </ThemeProvider>
    )

    expect(getByTestId('table-row')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })
  it('should not have a11y violations on a correct table structure', async () => {
    const { container } = render(
      <ThemeProvider>
        <div role="table">
          <StylesContext.Provider value={getStyles('compact')}>
            <TableHead>
              <TableRow>
                <TableCell
                  column={{
                    id: 'test',
                  }}
                >
                  cell head
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  column={{
                    id: 'test',
                  }}
                >
                  cell data
                </TableCell>
              </TableRow>
            </TableBody>
          </StylesContext.Provider>
        </div>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
