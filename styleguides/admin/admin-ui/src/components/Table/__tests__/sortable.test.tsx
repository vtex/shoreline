import React from 'react'
import { StatefulTable } from '../../PowerfulTable/Stateful'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from '@vtex/admin-core'
import { StylesContext } from '../context'
import { getStyles } from './testUtil'

describe('Sortable tests', () => {
  describe('root', () => {
    it('should sort', () => {
      const { container } = render(
        <ThemeProvider>
          <StylesContext.Provider value={getStyles('compact')}>
            <StatefulTable
              items={[
                { id: '0', name: 'Candido' },
                { id: '1', name: 'Joseph' },
                { id: '2', name: 'Alex' },
              ]}
              columns={[
                {
                  id: 'name',
                  header: 'Nome',
                  compare: (a, b) => b.name.localeCompare(a.name),
                },
              ]}
            />
          </StylesContext.Provider>
        </ThemeProvider>
      )

      expect(container.innerHTML.indexOf('Candido')).toBeLessThan(
        container.innerHTML.indexOf('Joseph')
      )

      fireEvent.click(screen.getByText('Nome'))

      expect(container.innerHTML.indexOf('Candido')).toBeGreaterThan(
        container.innerHTML.indexOf('Joseph')
      )

      fireEvent.click(screen.getByText('Nome'))

      expect(container.innerHTML.indexOf('Candido')).toBeLessThan(
        container.innerHTML.indexOf('Joseph')
      )
    })
  })
})
