const components = [
  {
    component: 'Button',
    status: 'stable',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Box',
    status: 'stable',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Flex',
    status: 'stable',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Grid',
    status: 'stable',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Localization',
    status: 'experimental',
    notes: '-',
    type: 'components',
  },
]

const dataDisplay = [
  {
    component: 'Tag',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Divider',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'VisuallyHidden',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Card',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'CollapsibleGroup',
    status: 'deprecated',
    notes: 'Use the useCollapsible hook instead',
    type: 'dataDisplay',
  },
  {
    component: 'Collapsible',
    status: 'deprecated',
    notes: 'Use the useCollapsible hook instead',
    type: 'dataDisplay',
  },
  {
    component: 'Table',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'DataView',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Filter',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterMultiple',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterGroup',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Toolbar',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Pagination',
    status: 'stable',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterBar',
    status: 'deprecated',
    notes: 'Use the new Filter components instead',
    type: 'dataDisplay',
  },
]

const overlay = [
  {
    component: 'Tooltip',
    status: 'stable',
    notes: '-',
    type: 'overlay',
  },
  {
    component: 'Modal',
    status: 'stable',
    notes: '-',
    type: 'overlay',
  },
  {
    component: 'Menu',
    status: 'stable',
    notes: '-',
    type: 'overlay',
  },
  {
    component: 'Popover',
    status: 'proposed',
    notes: '-',
    type: 'overlay',
  },
]

export const media = [
  {
    component: 'Avatar',
    status: 'experimental',
    notes: '-',
    type: 'media',
  },
]

const feedback = [
  {
    component: 'Alert',
    status: 'stable',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Spinner',
    status: 'experimental',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Skeleton',
    status: 'stable',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Toast',
    status: 'stable',
    notes: '-',
    type: 'feedback',
  },
]

const typography = [
  {
    component: 'Anchor',
    status: 'experimental',
    notes: 'Will be renamed to Link',
    type: 'typography',
  },
  {
    component: 'Heading',
    status: 'experimental',
    notes: 'Levels are not dynamic yet',
    type: 'typography',
  },
  {
    component: 'List',
    status: 'experimental',
    notes: '-',
    type: 'typography',
  },
  {
    component: 'Paragraph',
    status: 'experimental',
    notes: '-',
    type: 'typography',
  },
  {
    component: 'Text',
    status: 'experimental',
    notes: '-',
    type: 'typography',
  },
]

const layout = [
  {
    component: 'Stack',
    status: 'stable',
    notes: '-',
    type: 'layout',
  },
  {
    component: 'Columns',
    status: 'experimental',
    notes: '-',
    type: 'layout',
  },
  {
    component: 'Center',
    status: 'stable',
    notes: '-',
    type: 'layout',
  },
  {
    component: 'Bleed',
    status: 'stable',
    notes: '-',
    type: 'layout',
  },
  {
    component: 'Inline',
    status: 'experimental',
    notes: '-',
    type: 'layout',
  },
]

const page = [
  {
    component: 'Tab',
    status: 'stable',
    notes: '-',
    type: 'page',
  },
  {
    component: 'Stats',
    status: 'proposed',
    notes: 'Some teams currently refer to this component as Totalizer',
    type: 'page',
  },
  {
    component: 'Page',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
]

const forms = [
  {
    component: 'Checkbox',
    status: 'stable',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Dropdown',
    status: 'experimental',
    notes: 'Will be deprecated in favor of a future Select Inline',
    type: 'forms',
  },
  {
    component: 'Label',
    status: 'stable',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Radio',
    status: 'stable',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Switch',
    status: 'stable',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Search',
    status: 'stable',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Combobox',
    status: 'experimental',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'DatePicker',
    status: 'experimental',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'File Input',
    status: 'proposed',
    notes: '-',
    type: 'forms',
  },
]

export const componentsStatus = [
  ...components,
  ...forms,
  ...layout,
  ...feedback,
  ...media,
  ...dataDisplay,
  ...overlay,
  ...page,
  ...typography,
]
