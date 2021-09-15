---
path: /introduction/can-i-use/
---

# Can I use?

admin-ui features separated by status:

- supported: The safest components to use. You shouldn't expect many breaking changes. Bugs are a priority on the team.
- experimental: Developed recently, may present unexpected behavior. Can also be removed without warning. The documentation may not be precise.
- in development: Currently under construction.
- upcoming: Will be added in the future.

## Features

| feature                                            | status       | notes                        |
| -------------------------------------------------- | ------------ | ---------------------------- |
| [useSystem](/hooks/use-system/)                    | supported    | -                            |
| [csx prop](/core-concepts/csx-prop/)               | supported    | -                            |
| [responsive styles](/theming/responsive-design/)   | experimental | API improvements coming soon |
| [gatsby plugin](/packages/gatsby-plugin-admin-ui/) | experimental | -                            |

## Components

### Primitives

| component | status    | notes |
| --------- | --------- | ----- |
| Box       | supported | -     |
| Flex      | supported | -     |
| Grid      | supported | -     |

### Feedback

| component | status       | notes                                                                               |
| --------- | ------------ | ----------------------------------------------------------------------------------- |
| Alert     | supported    | Design changes comming soon                                                         |
| Spinner   | supported    | -                                                                                   |
| Skeleton  | supported    | -                                                                                   |
| Toast     | experimental | We are facing some rendering issues [#648](https://github.com/vtex/onda/issues/648) |
| Progress  | upcoming     | -                                                                                   |

### Data display

| component        | status         | notes                                   |
| ---------------- | -------------- | --------------------------------------- |
| Tag              | supported      | -                                       |
| Divider          | supported      | -                                       |
| VisuallyHidden   | supported      | -                                       |
| Card             | supported      | -                                       |
| CollapsibleGroup | supported      | We expect to change the animations soon |
| Collapsible      | supported      | We expect to change the animation soon  |
| Toolbar          | experimental   | -                                       |
| Pagination       | experimental   | -                                       |
| Filters          | in development | -                                       |
| Table            | in development | -                                       |
| Autocomplete     | upcoming       | -                                       |
| Charts library   | upcoming       | -                                       |

### Overlay

| component | status    | notes                                                                            |
| --------- | --------- | -------------------------------------------------------------------------------- |
| Tooltip   | supported | We have some zIndex issues, [#495](https://github.com/vtex/onda/issues/495)      |
| Modal     | supported | Does not work well with tooltips [#495](https://github.com/vtex/onda/issues/495) |
| Menu      | supported | -                                                                                |
| Popover   | upcoming  | -                                                                                |

### Media

| component | status    | notes |
| --------- | --------- | ----- |
| Avatar    | supported | -     |
| Icons     | supported | -     |
| Image     | upcoming  | -     |

### Forms

| component      | status         | notes                                                                                    |
| -------------- | -------------- | ---------------------------------------------------------------------------------------- |
| Button         | supported      | Missing the loading state                                                                |
| CheckboxGroup  | supported      | Investigating the need for a helper text                                                 |
| Checkbox       | supported      | -                                                                                        |
| Dropdown       | supported      | Design changes coming soon that maybe invalidate this component                          |
| InputPassword  | supported      | -                                                                                        |
| Input          | supported      | -                                                                                        |
| Label          | supported      | -                                                                                        |
| NumericStepper | supported      | -                                                                                        |
| RadioGroup     | supported      | Investigating the need for a helper text                                                 |
| Radio          | supported      | -                                                                                        |
| Select         | supported      | Design changes coming soon that maybe invalidate this component                          |
| Textarea       | supported      | TextArea label covered by input content, [#501](https://github.com/vtex/onda/issues/501) |
| Toggle         | supported      | -                                                                                        |
| Search         | supported      | -                                                                                        |
| Formik library | experimental   | -                                                                                        |
| Combobox       | in development | -                                                                                        |
| Searchbox      | in development | -                                                                                        |
| FormGroup      | upcoming       | -                                                                                        |
| DatePicker     | upcoming       | -                                                                                        |
| TimePicker     | upcoming       | -                                                                                        |
| Dropzone       | upcoming       | -                                                                                        |

### Page structure

| component  | status       | notes |
| ---------- | ------------ | ----- |
| Tabs       | experimental | -     |
| Sidebar    | experimental | -     |
| Topbar     | experimental | -     |
| PageHeader | experimental     | -     |

### Layouts

| component | status       | notes |
| --------- | ------------ | ----- |
| Set       | supported    | -     |
| Columns   | experimental | -     |
| Stack     | upcoming     | -     |

### Typography

| component | status       | notes                      |
| --------- | ------------ | -------------------------- |
| Anchor    | supported    | -                          |
| Heading   | supported    | Levels are not dynamic yet |
| List      | supported    | -                          |
| Paragraph | supported    | -                          |
| Text      | experimental | -                          |
