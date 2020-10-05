import React from 'react'
import { Meta } from '@storybook/react'

import { DisplayTable } from '../index'

export default {
  title: 'beta/DisplayTable/Directions',
  component: DisplayTable,
} as Meta

export const LTR = () => (
  <DisplayTable
    density="variable"
    columns={[
      {
        id: 'location',
        width: 148,
        lead: 'Location',
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'date',
        lead: 'Date',
        width: 148,
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'status',
        width: 156,
        lead: 'Status',
        resolver: {
          type: 'plain',
        },
      },
    ]}
    items={[
      {
        id: 1,
        location: 'São Paulo, SP',
        date: '8/7/2020, 23:29',
        status: `Delivered`,
      },
      {
        id: 2,
        location: 'São Paulo, SP',
        date: '6/7/2020, 21:12',
        status: `Arrived at São Paulo`,
      },
      {
        id: 3,
        location: 'São Paulo, SP',
        date: '5/7/2020, 13:04',
        status: `On its way from Rio de Janeiro to São Paulo`,
      },
      {
        id: 4,
        location: 'Itaquaquecetuba, SP',
        date: '4/7/2020, 14:48',
        status: `Object dispatched at the post office`,
      },
    ]}
  />
)

export const RTL = () => (
  <DisplayTable
    dir="rtl"
    density="variable"
    columns={[
      {
        id: 'location',
        width: 148,
        lead: 'موقعك',
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'date',
        lead: 'تاريخ',
        width: 148,
        resolver: {
          type: 'date',
          locale: 'ar-AE',
          options: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          },
        },
      },
      {
        id: 'status',
        width: 156,
        lead: 'الحالة',
        resolver: {
          type: 'plain',
        },
      },
    ]}
    items={[
      {
        id: 1,
        location: 'ساو باولو- اس بي',
        date: '8/7/2020, 23:29',
        status: `تم التوصيل`,
      },
      {
        id: 2,
        location: 'ساو باولو- اس بي',
        date: '6/7/2020, 21:12',
        status: `وصل إلى ساو باولو`,
      },
      {
        id: 3,
        location: 'ساو باولو- اس بي',
        date: '5/7/2020, 13:04',
        status: `في طريقها من ريو دي جانيرو إلى ساو باولو`,
      },
      {
        id: 4,
        location: 'ساو باولو- اس بي',
        date: '4/7/2020, 14:48',
        status: `إرسال الكائن في مكتب البريد`,
      },
    ]}
  />
)
