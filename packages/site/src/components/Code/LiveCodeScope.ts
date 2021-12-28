import * as AdminUI from '@vtex/admin-ui'
import * as dnd from 'react-beautiful-dnd'
import faker from 'faker'
import * as AdminFormik from '@vtex/admin-formik'
import * as Formik from 'formik'
import * as Yup from 'yup'
import * as Intl from 'react-intl'
import {
  Button as ReakitButton,
  useMenuState as useReakitMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton as ReakitMenuButton,
} from 'reakit'

export default {
  ...AdminUI,
  ...AdminFormik,
  ...Formik,
  Yup,
  ...Intl,
  ...dnd,
  faker,
  ReakitButton,
  useReakitMenuState,
  ReakitMenu,
  ReakitMenuItem,
  ReakitMenuButton,
}
