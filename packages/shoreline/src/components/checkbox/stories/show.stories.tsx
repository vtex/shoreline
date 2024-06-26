import { Checkbox, CheckboxGroup } from '../index'
import { Stack } from '../../stack'

import { IconInfoFill } from '../../../icons'

export default {
  title: 'components/checkbox',
}

export function Show() {
  return (
    <Stack>
      <Stack>
        <Checkbox>Label</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox indeterminate disabled>
          Indeterminate and disabled
        </Checkbox>
      </Stack>
      <Stack space="5rem">
        <CheckboxGroup label="Options">
          <Checkbox indeterminate>Everything</Checkbox>
          <Checkbox>Everywhere</Checkbox>
          <Checkbox>All at once</Checkbox>
          <Checkbox disabled>None</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          label="Options with help (optional)"
          description="Choose one of these"
        >
          <Checkbox indeterminate>Everything</Checkbox>
          <Checkbox>Everywhere</Checkbox>
          <Checkbox>All at once</Checkbox>
          <Checkbox disabled>None</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup error label="Options" errorText="Bad choice">
          <Checkbox>Everything</Checkbox>
          <Checkbox>Everywhere</Checkbox>
          <Checkbox>All at once</Checkbox>
          <Checkbox disabled>None</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          error
          label={
            <>
              Options
              <IconInfoFill />
            </>
          }
          description="Choose one of these"
          errorText="Bad choice"
        >
          <Checkbox>Everything</Checkbox>
          <Checkbox>Everywhere</Checkbox>
          <Checkbox>All at once</Checkbox>
          <Checkbox disabled>None</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          error
          horizontal
          label="Options with error"
          errorText="Bad choice"
        >
          <Checkbox>Everything</Checkbox>
          <Checkbox>Everywhere</Checkbox>
          <Checkbox>All at once</Checkbox>
          <Checkbox disabled>None</Checkbox>
        </CheckboxGroup>
      </Stack>
    </Stack>
  )
}
