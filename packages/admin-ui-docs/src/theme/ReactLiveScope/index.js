/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import * as AdminUi from '@vtex/admin-ui'
import * as AdminFormik from '@vtex/admin-formik'
import * as Formik from 'formik'
import * as Yup from 'yup'
import * as Intl from 'react-intl'
import * as dnd from 'react-beautiful-dnd'
import * as Forms from '@vtex/admin-ui-form'

import {
  Button as ReakitButton,
  useMenuState as useReakitMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton as ReakitMenuButton,
} from 'reakit'

import faker from 'faker'

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...AdminUi,
  ...AdminFormik,
  ...Formik,
  ...dnd,
  Forms,
  Yup,
  ...Intl,
  ReakitButton,
  ReakitMenu,
  ReakitMenuItem,
  ReakitMenuButton,
  useReakitMenuState,
  faker,
}

export default ReactLiveScope
