import type { StoryObj } from '@storybook/react'
import { Chart } from '../index'

export default {
  title: 'Charts/sunburst',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    chartConfig: { type: 'sunburst' },
    series: {
      label: { fontSize: 11 },
      data: [
        {
          name: 'Vovó',
          children: [
            {
              name: 'Uncle Leo',
              value: 15,
              children: [
                {
                  name: 'Cousin Jack',
                  value: 2,
                },
                {
                  name: 'Cousin Mary',
                  value: 5,
                  children: [
                    {
                      name: 'Jackson',
                      value: 2,
                    },
                  ],
                },
                {
                  name: 'Cousin Ben',
                  value: 4,
                },
              ],
            },
            {
              name: 'Father',
              value: 10,
              children: [
                {
                  name: 'Me',
                  value: 5,
                },
                {
                  name: 'Brother Peter',
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          name: 'Nancy',
          children: [
            {
              name: 'Uncle Nike',
              children: [
                {
                  name: 'Cousin Betty',
                  value: 2,
                },
                {
                  name: 'Cousin Jenny',
                  value: 2,
                },
              ],
            },
          ],
        },
        {
          name: 'Ramon',
          children: [
            {
              name: 'Katya',
              children: [
                { name: 'Cousin Trixie', value: 9 },
                { name: 'Auntie Bosco', value: 5 },
              ],
            },
          ],
        },
      ],
    },
    style: { width: 600, height: 600 },
  },
}
