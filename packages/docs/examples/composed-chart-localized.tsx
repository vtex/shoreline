import { ComposedChart } from '@vtex/shoreline-charts'
import { LocaleProvider } from '@vtex/shoreline'

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']

export default function Example() {
  return (
    <LocaleProvider locale="pt-BR">
      <ComposedChart
        label="Vendas por canal e taxa de conversão"
        categories={months}
        series={[
          {
            type: 'bar',
            name: 'Site',
            data: [2300, 2900, 2500, 3400, 3100, 3800],
          },
          {
            type: 'bar',
            name: 'Marketplace',
            data: [1200, 1400, 1500, 1800, 1900, 2200],
          },
          {
            type: 'bar',
            name: 'Loja física',
            data: [700, 800, 800, 1100, 900, 1200],
          },
          {
            type: 'bar',
            name: 'Redes sociais',
            data: [300, 350, 400, 500, 450, 600],
          },
          {
            type: 'line',
            name: 'Conversão',
            unit: 'percentage',
            data: [2.1, 2.4, 2.2, 2.9, 2.7, 3.2],
          },
        ]}
      />
    </LocaleProvider>
  )
}
