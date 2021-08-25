import * as AdminUI from '@vtex/admin-ui'
import * as AdminUIIcons from '@vtex/admin-ui-icons'
import * as AdminUICore from '@vtex/onda-core'
import * as dnd from 'react-beautiful-dnd'
import faker from 'faker'
import {
  Button as ReakitButton,
  useMenuState as useReakitMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton as ReakitMenuButton,
} from 'reakit'

export default {
  ...AdminUI,
  ...AdminUIIcons,
  ...AdminUICore,
  ...dnd,
  faker,
  ReakitButton,
  useReakitMenuState,
  ReakitMenu,
  ReakitMenuItem,
  ReakitMenuButton,
}
