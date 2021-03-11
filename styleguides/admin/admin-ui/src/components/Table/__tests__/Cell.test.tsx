import React from 'react'
import { render } from '@testing-library/react'

import { TableCell } from '../components/Cell'
import { TableHead } from '../components/Head'
import { TableBody } from '../components/Body'
import { ThemeProvider } from '@vtex/admin-core'
import { StylesContext } from '../context'
import { getStyles } from './testUtil'

describe('TableCell tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <StylesContext.Provider value={getStyles('compact')}>
          <TableHead>
            <TableCell
              data-testid="table-cell"
              csx={{ bg: 'coral' }}
              column={{
                id: 'test',
              }}
            >
              cell
            </TableCell>
          </TableHead>
        </StylesContext.Provider>
      </ThemeProvider>
    )

    expect(getByTestId('table-cell')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should provide the "columnheader" value within Head', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <StylesContext.Provider value={getStyles('compact')}>
          <TableHead>
            <TableCell
              column={{
                id: 'test',
              }}
            >
              cell
            </TableCell>
          </TableHead>
        </StylesContext.Provider>
      </ThemeProvider>
    )

    expect(getByRole('columnheader')).toBeInTheDocument()
  })

  it('should provide the "cell" value within Body', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <StylesContext.Provider value={getStyles('compact')}>
          <TableBody>
            <TableCell
              column={{
                id: 'test',
              }}
            >
              cell
            </TableCell>
          </TableBody>
        </StylesContext.Provider>
      </ThemeProvider>
    )

    expect(getByRole('cell')).toBeInTheDocument()
  })
})
