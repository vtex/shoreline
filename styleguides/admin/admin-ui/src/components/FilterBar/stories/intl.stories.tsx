import React from 'react'
import { Meta, Story } from '@storybook/react'

import { FilterBar } from '../index'

export default {
  title: 'admin-ui/FilterBar',
  component: FilterBar,
} as Meta

export const Intl: Story = () => {
  const conditions = [
    { label: 'é', id: '1' },
    { label: 'contém', id: '2' },
  ]

  return (
    <FilterBar
      label="Use um filtro para achar produtos, criar coleções ou gerar relatórios"
      filters={[
        {
          label: 'Status',
          id: 'status',
          conditions: [
            ...conditions,
            { label: 'não é', id: '3' },
            { label: 'é vázio', id: '4' },
            { label: 'é igual a', id: '5' },
          ],
          resolver: {
            type: 'simple',
            defaultValue: { value: '1' },
            items: [{ value: '1' }, { value: '2' }],
          },
        },
        {
          label: 'Loja específica',
          id: 'specificStoreLabel',
          conditions,
          resolver: {
            type: 'simple',
            accessor: 'label',
            defaultValue: { value: { label: '1' } },
            items: [
              { value: { label: '1' } },
              { value: { label: '2' } },
              { value: { label: '3' } },
              { value: { label: '4' } },
            ],
          },
        },
        {
          label: 'Tópico',
          id: 'topic',
          conditions,
          resolver: {
            type: 'simple',
            defaultValue: { value: '2' },
            items: [{ value: '1' }, { value: '2' }, { value: '3' }],
          },
        },
      ]}
      onApply={(filters) => {
        console.log(filters)
      }}
      conjunction={{ label: 'E', value: 'and' }}
      conjunctions={[
        { label: 'E', value: 'and' },
        { label: 'Ou', value: 'or' },
      ]}
      internalLabels={{
        conjunctionLabel: 'Conjunção',
        filterLabel: 'Filtro',
        conditionLabel: 'Condição',
        statementMenuLabel: 'Menu da sentença',
        applyFilterLabel: 'Aplicar',
        addFilterLabel: 'Adicionar Filtro',
        clearFilterLabel: 'Limpar Filtros',
        deleteStatementLabel: 'Deletar',
        duplicateStatementLabel: 'Duplicar',
        whereStatementLabel: 'Em que',
      }}
    />
  )
}
