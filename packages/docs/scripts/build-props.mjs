import { join, dirname } from 'node:path'
import { getReferences } from './props-utils.mjs'
import { kebabCase } from '@vtex/shoreline-utils'
import fse from 'fs-extra'
import { format } from 'prettier'

const outputDirectory = `${dirname('')}/__props__`
const outputFile = 'index.ts'

const files = [
  /**
   * Primitives
   */
  getPath('shoreline', 'components', 'accessible-icon', 'accessible-icon'),
  getPath('shoreline', 'components', 'clickable', 'clickable'),
  getPath('shoreline', 'components', 'clickable', 'clickable-bubble'),
  getPath('shoreline', 'components', 'combobox', 'combobox'),
  getPath('shoreline', 'components', 'combobox', 'combobox-provider'),
  getPath('shoreline', 'components', 'combobox', 'combobox-popover'),
  getPath('shoreline', 'components', 'combobox', 'combobox-list'),
  getPath('shoreline', 'components', 'combobox', 'combobox-item'),
  getPath('shoreline', 'components', 'compose', 'compose'),
  getPath('shoreline', 'components', 'compose', 'composable'),
  getPath('shoreline', 'components', 'link-box', 'link-box'),
  getPath('shoreline', 'components', 'locale', 'locale-provider'),
  getPath('shoreline', 'components', 'visually-hidden', 'visually-hidden'),
  /**
   * Components
   */
  getPath('shoreline', 'components', 'alert', 'alert'),
  getPath('shoreline', 'components', 'bleed', 'bleed'),
  getPath('shoreline', 'components', 'button', 'button'),
  getPath('shoreline', 'components', 'center', 'center'),
  getPath('shoreline', 'components', 'checkbox', 'checkbox'),
  getPath('shoreline', 'components', 'checkbox', 'checkbox-group'),
  getPath('shoreline', 'components', 'collection', 'collection'),
  getPath('shoreline', 'components', 'collection', 'collection-view'),
  getPath('shoreline', 'components', 'collection', 'collection-row'),
  getPath(
    'shoreline',
    'components',
    'confirmation-modal',
    'confirmation-modal'
  ),
  getPath('shoreline', 'components', 'content', 'content'),
  getPath('shoreline', 'components', 'content', 'container'),
  getPath('shoreline', 'components', 'contextual-help', 'contextual-help'),
  getPath('shoreline', 'components', 'divider', 'divider'),
  getPath('shoreline', 'components', 'drawer', 'drawer-content'),
  getPath('shoreline', 'components', 'drawer', 'drawer-dismiss'),
  getPath('shoreline', 'components', 'drawer', 'drawer-footer'),
  getPath('shoreline', 'components', 'drawer', 'drawer-header'),
  getPath('shoreline', 'components', 'drawer', 'drawer-heading'),
  getPath('shoreline', 'components', 'drawer', 'drawer-popover'),
  getPath('shoreline', 'components', 'drawer', 'drawer-provider'),
  getPath('shoreline', 'components', 'drawer', 'drawer-trigger'),
  getPath('shoreline', 'components', 'empty-state', 'empty-state'),
  getPath('shoreline', 'components', 'empty-state', 'empty-state-actions'),
  getPath('shoreline', 'components', 'empty-state', 'empty-state-illustration'),
  getPath('shoreline', 'components', 'field', 'field'),
  getPath('shoreline', 'components', 'field', 'field-provider'),
  getPath('shoreline', 'components', 'field', 'field-error'),
  getPath('shoreline', 'components', 'field', 'field-description'),
  getPath('shoreline', 'components', 'field', 'field-char-counter'),
  getPath('shoreline', 'components', 'filter', 'filter'),
  getPath('shoreline', 'components', 'filter', 'filter-value'),
  getPath('shoreline', 'components', 'filter', 'filter-trigger'),
  getPath('shoreline', 'components', 'filter', 'filter-provider'),
  getPath('shoreline', 'components', 'filter', 'filter-popover'),
  getPath('shoreline', 'components', 'filter', 'filter-list'),
  getPath('shoreline', 'components', 'filter', 'filter-list-skeleton'),
  getPath('shoreline', 'components', 'filter', 'filter-item'),
  getPath('shoreline', 'components', 'filter', 'filter-item-check'),
  getPath('shoreline', 'components', 'filter', 'filter-clear'),
  getPath('shoreline', 'components', 'filter', 'filter-apply'),
  getPath('shoreline', 'components', 'flex', 'flex'),
  getPath('shoreline', 'components', 'grid', 'grid'),
  getPath('shoreline', 'components', 'grid', 'grid-cell'),
  getPath('shoreline', 'components', 'heading', 'heading'),
  getPath('shoreline', 'components', 'icon-button', 'icon-button'),
  getPath('shoreline', 'components', 'input', 'input'),
  getPath('shoreline', 'components', 'label', 'label'),
  getPath('shoreline', 'components', 'link', 'link'),
  getPath('shoreline', 'components', 'menu', 'menu'),
  getPath('shoreline', 'components', 'menu', 'menu-trigger'),
  getPath('shoreline', 'components', 'menu', 'menu-separator'),
  getPath('shoreline', 'components', 'menu', 'menu-provider'),
  getPath('shoreline', 'components', 'menu', 'menu-popover'),
  getPath('shoreline', 'components', 'menu', 'menu-item'),
  getPath('shoreline', 'components', 'modal', 'modal'),
  getPath('shoreline', 'components', 'modal', 'modal-heading'),
  getPath('shoreline', 'components', 'modal', 'modal-header'),
  getPath('shoreline', 'components', 'modal', 'modal-footer'),
  getPath('shoreline', 'components', 'modal', 'modal-dismiss'),
  getPath('shoreline', 'components', 'modal', 'modal-content'),
  getPath('shoreline', 'components', 'page', 'page'),
  getPath('shoreline', 'components', 'page', 'page-heading'),
  getPath('shoreline', 'components', 'page', 'page-header'),
  getPath('shoreline', 'components', 'page', 'page-header-row'),
  getPath('shoreline', 'components', 'page', 'page-content'),
  getPath('shoreline', 'components', 'pagination', 'pagination'),
  getPath('shoreline', 'components', 'popover', 'popover'),
  getPath('shoreline', 'components', 'popover', 'popover-trigger'),
  getPath('shoreline', 'components', 'popover', 'popover-provider'),
  getPath('shoreline', 'components', 'popover', 'popover-dismiss'),
  getPath('shoreline', 'components', 'radio', 'radio'),
  getPath('shoreline', 'components', 'radio', 'radio-group'),
  getPath('shoreline', 'components', 'search', 'search'),
  getPath('shoreline', 'components', 'select', 'select'),
  getPath('shoreline', 'components', 'select', 'select-trigger'),
  getPath('shoreline', 'components', 'select', 'select-provider'),
  getPath('shoreline', 'components', 'select', 'select-popover'),
  getPath('shoreline', 'components', 'select', 'select-list'),
  getPath('shoreline', 'components', 'select', 'select-item'),
  getPath('shoreline', 'components', 'select', 'select-item-check'),
  getPath('shoreline', 'components', 'skeleton', 'skeleton'),
  getPath('shoreline', 'components', 'spinner', 'spinner'),
  getPath('shoreline', 'components', 'stack', 'stack'),
  getPath('shoreline', 'components', 'tab', 'tab'),
  getPath('shoreline', 'components', 'tab', 'tab-provider'),
  getPath('shoreline', 'components', 'tab', 'tab-panel'),
  getPath('shoreline', 'components', 'tab', 'tab-list'),
  getPath('shoreline', 'components', 'table', 'table'),
  getPath('shoreline', 'components', 'table', 'table-sort-indicator'),
  getPath('shoreline', 'components', 'table', 'table-row'),
  getPath('shoreline', 'components', 'table', 'table-header'),
  getPath('shoreline', 'components', 'table', 'table-header-cell'),
  getPath('shoreline', 'components', 'table', 'table-cell'),
  getPath('shoreline', 'components', 'table', 'table-body'),
  getPath('shoreline', 'components', 'tag', 'tag'),
  getPath('shoreline', 'components', 'text', 'text'),
  getPath('shoreline', 'components', 'textarea', 'textarea'),
  getPath('shoreline', 'components', 'toast', 'toast'),
  getPath('shoreline', 'components', 'toast', 'toast-stack'),
  getPath('shoreline', 'components', 'tooltip', 'tooltip'),
  getPath('shoreline', 'components', 'tooltip', 'tooltip-trigger'),
  getPath('shoreline', 'components', 'tooltip', 'tooltip-provider'),
  getPath('shoreline', 'components', 'tooltip', 'tooltip-popover'),
  getPath('shoreline', 'components', 'tooltip', 'tooltip-arrow'),
  /**
   * ts-table
   */
  join(dirname(''), '../ts-table/src/ts-table.tsx'),
  /**
   * Date
   */
  getPath('shoreline', 'components', 'calendar', 'calendar'),
  getPath('shoreline', 'components', 'calendar', 'calendar-cell'),
  getPath('shoreline', 'components', 'calendar', 'calendar-grid'),
  getPath('shoreline', 'components', 'calendar', 'calendar-header'),
  getPath('shoreline', 'components', 'calendar', 'calendar-provider'),
  getPath('shoreline', 'components', 'calendar', 'calendar-title'),
  getPath('shoreline', 'components', 'date-field', 'date-field'),
  getPath('shoreline', 'components', 'date-picker', 'date-picker'),
  getPath('shoreline', 'components', 'date-range-picker', 'date-range-picker'),
  getPath('shoreline', 'components', 'date-segment', 'date-segment'),
  getPath('shoreline', 'components', 'range-calendar', 'range-calendar'),
  getPath('shoreline', 'components', 'time-input', 'time-input'),
  /**
   * Charts
   */
]

const chart = getPath('charts', 'components', 'chart', 'chart')
const chartVariants = [
  {
    type: 'Bar',
    description: 'teste',
  },
  {
    type: 'Line',
    description: 'teste',
  },
]

let tsCode = `
// This file is autogenerated by scripts/build-props.mjs
// Do not edit this file directly.

export default {
`

async function main() {
  const refs = {}

  files.forEach((file) => {
    const ref = getReferences(file)[0]

    if (ref) {
      refs[kebabCase(ref?.name)] = ref

      tsCode += `
      "${kebabCase(ref?.name)}": ${JSON.stringify(ref)},
      `
    }
  })
  chartVariants.forEach((chartVariant) => {
    const ref = getReferences(chart)[0]
    if (ref) {
      const displayName = chartVariant.type
      const refName = `${ref?.name}-${chartVariant.type}`
      const newRef = {
        ...ref,
        name: displayName,
        description: chartVariant.description,
      }
      refs[kebabCase(refName)] = newRef

      tsCode += `
      "${kebabCase(refName)}": ${JSON.stringify(newRef)},
      `
    }
  })

  tsCode += '}'

  const formattedTsCode = await format(tsCode, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  fse.outputFile(`${outputDirectory}/${outputFile}`, formattedTsCode, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('✅ Props documentation generated!')
    }
  })
}

function getPath(pkg, path, folder, file) {
  return join(dirname(''), `../${pkg}/src/${path}/${folder}/${file}.tsx`)
}

main()
