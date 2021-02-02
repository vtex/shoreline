import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { ThemeProvider } from '@vtex/admin-core'
import { Table } from '../components'

describe('Table tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Table data-testid="table" styleOverrides={{ bg: 'coral' }}>
          <Table.Head>
            <Table.Row>
              <Table.Cell
                column={{
                  id: 'test',
                }}
              >
                cell
              </Table.Cell>
            </Table.Row>
          </Table.Head>
        </Table>
      </ThemeProvider>
    )

    expect(getByTestId('table')).toHaveStyleRule('background-color', 'coral')
  })

  it('should not have a11y violations on a correct table structure', async () => {
    const { container } = render(
      <ThemeProvider>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell
                column={{
                  id: 'test',
                }}
              >
                cell head
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell
                column={{
                  id: 'test',
                }}
              >
                cell data
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
