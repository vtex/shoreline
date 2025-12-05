import { vi } from 'vitest'

import 'vitest-canvas-mock'

vi.mock('echarts', async () => {
  const echarts = await vi.importActual<typeof import('echarts')>('echarts')
  return {
    ...echarts,
    init: vi.fn(() => {
      return {
        setOption: vi.fn(),
        resize: vi.fn(),
        getOption: vi.fn(),
        dispose: vi.fn(),
        clear: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
      }
    }),
  }
})
