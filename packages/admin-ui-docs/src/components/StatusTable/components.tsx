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
    notes: 'Will be deprecated',
    type: 'dataDisplay',
  },
  {
    component: 'Collapsible',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'DataGrid',
    status: 'supported',
    notes: 'Will be renamed to Table',
    type: 'dataDisplay',
  },
  {
    component: 'DataView',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Filter',
    status: 'experimental',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterMultiple',
    status: 'experimental',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterGroup',
    status: 'experimental',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Toolbar',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'Pagination',
    status: 'supported',
    notes: '-',
    type: 'dataDisplay',
  },
  {
    component: 'FilterBar',
    status: 'supported',
    notes: 'Will be deprecated in favor of the new filter components',
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
        <br />
        Will be deprecated in favor of the List, Heading, Label and Paragraph
        components.
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
    notes: 'Will be renamed to Link',
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
    notes: 'Will be renamed to Stack',
    type: 'layout',
  },
  {
    component: 'Columns',
    status: 'supported',
    notes: '-',
    type: 'layout',
  },
  {
    component: 'Center',
    status: 'supported',
    notes: '-',
    type: 'layout',
  },
  {
    component: 'Bleed',
    status: 'experimental',
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
    component: 'Tabs',
    status: 'supported',
    notes: '-',
    type: 'page',
  },
  {
    component: 'Stats',
    status: 'upcoming',
    notes: 'Some teams currently refer to this component as Totalizer',
    type: 'page',
  },
  {
    component: 'Sidebar',
    status: 'experimental',
    notes: 'Will be renamed to Left Nav',
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
    status: 'supported',
    notes: '-',
    type: 'page',
  },
  {
    component: 'Page',
    status: 'supported',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageContent',
    status: 'supported',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageTitle',
    status: 'supported',
    notes: '-',
    type: 'page',
  },
  {
    component: 'PageActions',
    status: 'supported',
    notes: '-',
    type: 'page',
  },
]

const forms = [
  {
    component: 'CheckboxGroup',
    status: 'supported',
    notes: 'Will be merged with the RadioGroup in a new ChoiceList component',
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
    notes:
      'Will be deprecated in favor of a future Inline variant in the Select',
    type: 'forms',
  },
  {
    component: 'InputPassword',
    status: 'supported',
    notes: 'Will be deprecated for lack of a use case',
    type: 'forms',
  },
  {
    component: 'Input',
    status: 'supported',
    notes: 'Will be merged with the TextArea in a new TextField component.',
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
    notes: 'Will be renamed to Number Field',
    type: 'forms',
  },
  {
    component: 'RadioGroup',
    status: 'supported',
    notes:
      'Will be merged with the CheckboxGroup in a new ChoiceList component',
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
    notes: '-',
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
        <br />
        This component will be merged with the Input in a new TextField
        component.
      </Text>
    ),
    type: 'forms',
  },
  {
    component: 'Toggle',
    status: 'supported',
    notes: 'Will be renamed to Switch',
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
    status: 'supported',
    notes: 'Will be deprecated, it should be a separate library',
    type: 'forms',
  },
  {
    component: 'Combobox',
    status: 'experimental',
    notes: '-',
    type: 'forms',
  },
  {
    component: 'SearchBox',
    status: 'supported',
    notes: 'Will be renamed to GlobalSearch',
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
    status: 'experimental',
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
