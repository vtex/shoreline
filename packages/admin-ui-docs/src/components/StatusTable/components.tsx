import React from 'react'
import { Text, Anchor } from '@vtex/admin-ui'

const components = [
  {
    component: 'Button',
    status: 'supported',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Box',
    status: 'supported',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Flex',
    status: 'supported',
    notes: '-',
    type: 'components',
  },
  {
    component: 'Grid',
    status: 'supported',
    notes: '-',
    type: 'components',
  },
]

const dataDisplay = [
  {
    component: 'Tag',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Divider',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'VisuallyHidden',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Card',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'CollapsibleGroup',
    status: 'supported',
    notes: 'We expect to add the animations soon',
    type: 'dataDisplay',
  },
  {
    component: 'Collapsible',
    status: 'supported',
    notes: 'We expect to add the animations soon',
    type: 'dataDisplay',
  },
  {
    component: 'DataGrid',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Toolbar',
    status: 'experimental',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Pagination',
    status: 'experimental',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterBar',
    status: 'experimental',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Autocomplete',
    status: 'upcoming',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Charts library',
    status: 'upcoming',
    notes: '-',
    type: 'dataDisplay',
  },
]

const overlay = [
  {
    component: 'Tooltip',
    status: 'supported',
    notes: (
      <Text>
        We have some zIndex issues.{' '}
        <Anchor href="https://github.com/vtex/onda/issues/495" target="_blank">
          Issue #495
        </Anchor>
      </Text>
    ),
    type: 'overlay',
  },
  {
    component: 'Modal',
    status: 'supported',
    notes: (
      <Text>
        We have some zIndex issues.{' '}
        <Anchor href="https://github.com/vtex/onda/issues/495" target="_blank">
          Issue #495
        </Anchor>
      </Text>
    ),
    type: 'overlay',
  },
  {
    component: 'Menu',
    status: 'supported',
    notes: '-',
    type: 'overlay',
  },
  {
    component: 'Popover',
    status: 'upcoming',
    notes: '-',
    type: 'overlay',
  },
]

export const media = [
  {
    component: 'Avatar',
    status: 'supported',
    notes: '-',
    type: 'media',
  },
  {
    component: 'Icons',
    status: 'supported',
    notes: '-',
    type: 'media',
  },
  {
    component: 'Image',
    status: 'upcoming',
    notes: '-',
    type: 'media',
  },
]

const feedback = [
  {
    component: 'Alert',
    status: 'supported',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Spinner',
    status: 'supported',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Skeleton',
    status: 'supported',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Toast',
    status: 'supported',
    notes: '-',
    type: 'feedback',
  },
  {
    component: 'Progress',
    status: 'upcoming',
    notes: '-',
    type: 'feedback',
  },
]

const typography = [
  {
    component: 'Anchor',
    status: 'supported',
    notes: '-',
    type: 'typography',
  },
  {
    component: 'Heading',
    status: 'supported',
    notes: 'Levels are not dynamic yet',
    type: 'typography',
  },
  {
    component: 'List',
    status: 'supported',
    notes: '-',
    type: 'typography',
  },
  {
    component: 'Paragraph',
    status: 'supported',
    notes: '-',
    type: 'typography',
  },
  {
    component: 'Text',
    status: 'supported',
    notes: '-',
    type: 'typography',
  },
]

const layout = [
  {
    component: 'Set',
    status: 'supported',
    notes: 'It will be renamed to Stack',
    type: 'layout',
  },
  {
    component: 'Columns',
    status: 'experimental',
    notes: '-',
    type: 'layout',
  },
]

const page = [
  {
    component: 'Tabs',
    status: 'supported',
    notes: '-',
    type: 'page',
  },
  {
    component: 'Sidebar',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
  {
    component: 'Topbar',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageHeader',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
  {
    component: 'Page',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageContent',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageTitle',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageActions',
    status: 'experimental',
    notes: '-',
    type: 'page',
  },
]

const forms = [
  {
    component: 'CheckboxGroup',
    status: 'supported',
    notes: 'Investigating the need for a helper text',
    type: 'forms',
  },
  {
    component: 'Checkbox',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Dropdown',
    status: 'supported',
    notes: 'Design change may coming soon that maybe invalidate this component',
    type: 'forms',
  },
  {
    component: 'InputPassword',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Input',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Label',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'NumericStepper',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'RadioGroup',
    status: 'supported',
    notes: 'Investigating the need for a helper text',
    type: 'forms',
  },
  {
    component: 'Radio',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Select',
    status: 'supported',
    notes: 'Design change may coming soon that maybe invalidate this component',
    type: 'forms',
  },
  {
    component: 'TextArea',
    status: 'supported',
    notes: (
      <Text>
        TextArea label covered by input content.{' '}
        <Anchor href="https://github.com/vtex/onda/issues/501" target="_blank">
          Issue #501
        </Anchor>
      </Text>
    ),
    type: 'forms',
  },
  {
    component: 'Toggle',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Search',
    status: 'supported',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Formik library',
    status: 'experimental',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Combobox',
    status: 'in development',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'SearchBox',
    status: 'in development',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'FormGroup',
    status: 'upcoming',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'DatePicker',
    status: 'upcoming',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'Dropzone',
    status: 'upcoming',
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
