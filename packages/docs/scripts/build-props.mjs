import { join, dirname } from 'path'
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
  getPath('primitives', 'accessible-icon', 'accessible-icon'),
  getPath('primitives', 'clickable', 'clickable'),
  getPath('primitives', 'clickable', 'clickable-bubble'),
  getPath('primitives', 'combobox', 'combobox'),
  getPath('primitives', 'combobox', 'combobox-provider'),
  getPath('primitives', 'combobox', 'combobox-popover'),
  getPath('primitives', 'combobox', 'combobox-list'),
  getPath('primitives', 'combobox', 'combobox-item'),
  getPath('primitives', 'compose', 'compose'),
  getPath('primitives', 'compose', 'composable'),
  getPath('primitives', 'link-box', 'link-box'),
  getPath('primitives', 'locale', 'locale-provider'),
  getPath('primitives', 'visually-hidden', 'visually-hidden'),
  /**
   * Components
   */
  getPath('components', 'alert', 'alert'),
  getPath('components', 'bleed', 'bleed'),
  getPath('components', 'button', 'button'),
  getPath('components', 'center', 'center'),
  getPath('components', 'checkbox', 'checkbox'),
  getPath('components', 'checkbox', 'checkbox-group'),
  getPath('components', 'collection', 'collection'),
  getPath('components', 'collection', 'collection-view'),
  getPath('components', 'collection', 'collection-row'),
  getPath('components', 'confirmation-modal', 'confirmation-modal'),
  getPath('components', 'content', 'content'),
  getPath('components', 'content', 'container'),
  getPath('components', 'contextual-help', 'contextual-help'),
  getPath('components', 'divider', 'divider'),
  getPath('components', 'empty-state', 'empty-state'),
  getPath('components', 'empty-state', 'empty-state-actions'),
  getPath('components', 'empty-state', 'empty-state-illustration'),
  getPath('components', 'field', 'field'),
  getPath('components', 'field', 'field-provider'),
  getPath('components', 'field', 'field-error'),
  getPath('components', 'field', 'field-description'),
  getPath('components', 'field', 'field-char-counter'),
  getPath('components', 'filter', 'filter'),
  getPath('components', 'filter', 'filter-value'),
  getPath('components', 'filter', 'filter-trigger'),
  getPath('components', 'filter', 'filter-provider'),
  getPath('components', 'filter', 'filter-popover'),
  getPath('components', 'filter', 'filter-list'),
  getPath('components', 'filter', 'filter-list-skeleton'),
  getPath('components', 'filter', 'filter-item'),
  getPath('components', 'filter', 'filter-item-check'),
  getPath('components', 'filter', 'filter-clear'),
  getPath('components', 'filter', 'filter-apply'),
  getPath('components', 'flex', 'flex'),
  getPath('components', 'grid', 'grid'),
  getPath('components', 'grid', 'grid-cell'),
  getPath('components', 'heading', 'heading'),
  getPath('components', 'icon-button', 'icon-button'),
  getPath('components', 'input', 'input'),
  getPath('components', 'label', 'label'),
  getPath('components', 'link', 'link'),
  getPath('components', 'menu', 'menu'),
  getPath('components', 'menu', 'menu-trigger'),
  getPath('components', 'menu', 'menu-separator'),
  getPath('components', 'menu', 'menu-provider'),
  getPath('components', 'menu', 'menu-popover'),
  getPath('components', 'menu', 'menu-item'),
  getPath('components', 'modal', 'modal'),
  getPath('components', 'modal', 'modal-heading'),
  getPath('components', 'modal', 'modal-header'),
  getPath('components', 'modal', 'modal-footer'),
  getPath('components', 'modal', 'modal-dismiss'),
  getPath('components', 'modal', 'modal-content'),
  getPath('components', 'page', 'page'),
  getPath('components', 'page', 'page-heading'),
  getPath('components', 'page', 'page-header'),
  getPath('components', 'page', 'page-header-row'),
  getPath('components', 'page', 'page-content'),
  getPath('components', 'pagination', 'pagination'),
  getPath('components', 'popover', 'popover'),
  getPath('components', 'popover', 'popover-trigger'),
  getPath('components', 'popover', 'popover-provider'),
  getPath('components', 'popover', 'popover-dismiss'),
  getPath('components', 'radio', 'radio'),
  getPath('components', 'radio', 'radio-group'),
  getPath('components', 'search', 'search'),
  getPath('components', 'select', 'select'),
  getPath('components', 'select', 'select-trigger'),
  getPath('components', 'select', 'select-provider'),
  getPath('components', 'select', 'select-popover'),
  getPath('components', 'select', 'select-list'),
  getPath('components', 'select', 'select-item'),
  getPath('components', 'select', 'select-item-check'),
  getPath('components', 'skeleton', 'skeleton'),
  getPath('components', 'spinner', 'spinner'),
  getPath('components', 'stack', 'stack'),
  getPath('components', 'tab', 'tab'),
  getPath('components', 'tab', 'tab-provider'),
  getPath('components', 'tab', 'tab-panel'),
  getPath('components', 'tab', 'tab-list'),
  getPath('components', 'table', 'table'),
  getPath('components', 'table', 'table-sort-indicator'),
  getPath('components', 'table', 'table-row'),
  getPath('components', 'table', 'table-header'),
  getPath('components', 'table', 'table-header-cell'),
  getPath('components', 'table', 'table-cell'),
  getPath('components', 'table', 'table-body'),
  getPath('components', 'tag', 'tag'),
  getPath('components', 'text', 'text'),
  getPath('components', 'textarea', 'textarea'),
  getPath('components', 'toast', 'toast-stack'),
  getPath('components', 'tooltip', 'tooltip'),
  getPath('components', 'tooltip', 'tooltip-trigger'),
  getPath('components', 'tooltip', 'tooltip-provider'),
  getPath('components', 'tooltip', 'tooltip-popover'),
  getPath('components', 'tooltip', 'tooltip-arrow'),
  /**
   * ts-table
   */
  join(dirname(''), `../ts-table/src/ts-table.tsx`),
  /**
   * Date
   */
  getPath('date', 'calendar', 'calendar'),
  getPath('date', 'calendar', 'calendar-cell'),
  getPath('date', 'calendar', 'calendar-grid'),
  getPath('date', 'calendar', 'calendar-header'),
  getPath('date', 'calendar', 'calendar-provider'),
  getPath('date', 'calendar', 'calendar-title'),
  getPath('date', 'date-field', 'date-field'),
  getPath('date', 'date-picker', 'date-picker'),
  getPath('date', 'date-range-picker', 'date-range-picker'),
  getPath('date', 'date-segment', 'date-segment'),
  getPath('date', 'range-calendar', 'range-calendar'),
  getPath('date', 'time-input', 'time-input'),
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

    refs[kebabCase(ref.name)] = ref

    tsCode += `
      "${kebabCase(ref.name)}": ${JSON.stringify(ref)},
      `
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

function getPath(pkg, folder, file) {
  return join(dirname(''), `../${pkg}/src/${folder}/${file}.tsx`)
}

main()
