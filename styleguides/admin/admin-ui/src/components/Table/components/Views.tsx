import React, { PropsWithChildren } from 'react'
import { Box, Grid, Flex } from '@vtex/admin-primitives'
import { useViewContext, TableViewState } from '../context'
import { Anchor, AnchorProps } from '../../Anchor'
import { Text } from '../../Text'

const illustrations = {
  itemsNotFound: (
    <svg
      width="193"
      height="97"
      viewBox="0 0 193 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.8"
        x="29"
        y="41"
        width="142.769"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.6"
        x="29"
        y="61"
        width="150.154"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.4"
        x="29"
        y="81"
        width="135.385"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect x="29" y="21" width="163.692" height="16" rx="2" fill="#DAE3F5" />
      <g filter="url(#filter0_d)">
        <circle cx="35.8182" cy="27.8182" r="19.6364" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
          fill="#B6C3E1"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M35.9339 32.7129C36.7353 32.75 37.3653 33.3423 37.3653 34.083C37.3653 34.8401 36.6896 35.4546 35.8572 35.4546C35.0249 35.4546 34.3492 34.8401 34.3492 34.0949C34.341 33.3512 34.9841 32.7426 35.7919 32.7129L35.8556 32.7114L35.9339 32.7129ZM35.8066 34.9366C35.8229 34.938 35.8393 34.938 35.8556 34.938L35.8066 34.9366Z"
          fill="#B6C3E1"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.4546 24.1469C31.4546 21.9527 33.4115 20.1819 35.819 20.1819C38.2291 20.1819 40.1819 21.958 40.1819 24.1498C40.1819 25.8778 38.9421 26.7878 38.0876 27.3103L38.086 27.3112C37.3703 27.7474 37.0402 28.0889 37.0402 28.6709V29.0267C37.0402 29.6409 36.4927 30.1388 35.8174 30.1388C35.1421 30.1388 34.5946 29.6409 34.5946 29.0267V28.6709C34.5946 26.9195 35.8484 25.9977 36.7239 25.464C37.076 25.2486 37.3256 25.0598 37.4913 24.8567C37.6369 24.6783 37.7363 24.4672 37.7363 24.1498C37.7363 23.1863 36.8784 22.4061 35.819 22.4061C34.7572 22.4061 33.9001 23.1856 33.9001 24.1469C33.9001 24.7611 33.3527 25.259 32.6774 25.259C32.002 25.259 31.4546 24.7611 31.4546 24.1469Z"
          fill="#B6C3E1"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="76"
          height="76"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.714028 0 0 0 0 0.765932 0 0 0 0 0.883333 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  empty: (
    <svg
      width="193"
      height="97"
      viewBox="0 0 193 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.8"
        x="29"
        y="41"
        width="142.769"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.6"
        x="29"
        y="61"
        width="150.154"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.4"
        x="29"
        y="81"
        width="135.385"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect x="29" y="21" width="163.692" height="16" rx="2" fill="#DAE3F5" />
      <g filter="url(#filter0_d)">
        <circle cx="35.8182" cy="27.8182" r="19.6364" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
          fill="#B6C3E1"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.4985 20.8468C35.9609 20.8468 36.3357 21.2216 36.3357 21.684L36.3357 34.3132C36.3357 34.7756 35.9609 35.1505 35.4985 35.1505C35.0362 35.1505 34.6613 34.7756 34.6613 34.3132L34.6613 21.684C34.6613 21.2216 35.0362 20.8468 35.4985 20.8468Z"
        fill="#B6C3E1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.6504 27.9986C42.6504 28.461 42.2755 28.8358 41.8132 28.8358H29.1839C28.7215 28.8358 28.3467 28.461 28.3467 27.9986C28.3467 27.5362 28.7215 27.1614 29.1839 27.1614H41.8132C42.2755 27.1614 42.6504 27.5362 42.6504 27.9986Z"
        fill="#B6C3E1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.4985 20.8468C35.9609 20.8468 36.3357 21.2216 36.3357 21.684L36.3357 34.3132C36.3357 34.7756 35.9609 35.1505 35.4985 35.1505C35.0362 35.1505 34.6613 34.7756 34.6613 34.3132L34.6613 21.684C34.6613 21.2216 35.0362 20.8468 35.4985 20.8468Z"
        stroke="#B6C3E1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.6504 27.9986C42.6504 28.461 42.2755 28.8358 41.8132 28.8358H29.1839C28.7215 28.8358 28.3467 28.461 28.3467 27.9986C28.3467 27.5362 28.7215 27.1614 29.1839 27.1614H41.8132C42.2755 27.1614 42.6504 27.5362 42.6504 27.9986Z"
        stroke="#B6C3E1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="76"
          height="76"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.714028 0 0 0 0 0.765932 0 0 0 0 0.883333 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  error: (
    <svg
      width="193"
      height="97"
      viewBox="0 0 193 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.8"
        x="29"
        y="41"
        width="142.769"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.6"
        x="29"
        y="61"
        width="150.154"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect
        opacity="0.4"
        x="29"
        y="81"
        width="135.385"
        height="16"
        rx="2"
        fill="#DAE3F5"
      />
      <rect x="29" y="21" width="163.692" height="16" rx="2" fill="#DAE3F5" />
      <g filter="url(#filter0_d)">
        <circle cx="35.6364" cy="27.8182" r="19.6364" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
          fill="#B6C3E1"
        />
        <path
          d="M37.5156 27.7273V20.4578C37.5156 19.6531 36.8436 19 36.0156 19C35.1876 19 34.5156 19.6531 34.5156 20.4578V27.7273C34.5156 28.532 35.1876 29.1851 36.0156 29.1851C36.8436 29.1851 37.5156 28.532 37.5156 27.7273Z"
          fill="#B6C3E1"
        />
        <path
          d="M34 34.0621C33.994 32.9814 34.898 32.1126 35.998 32.1126C37.1 32.1126 38 32.9795 38 34.0563C38 35.1292 37.104 36 36 36C34.898 36 34.004 35.1331 34 34.0621Z"
          fill="#B6C3E1"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="76"
          height="76"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.714028 0 0 0 0 0.765932 0 0 0 0 0.883333 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
}

const tableViewTitleFallback = {
  itemsNotFound: 'No product match your search criteria',
  empty: 'You don’t have any product yet',
  error: 'Something went wrong',
}

export function TableViews({
  illustration,
  children,
}: PropsWithChildren<TableViewsProps>) {
  return (
    <Grid
      csx={{ bg: '#F8F9FA', borderRadius: '4px', paddingY: '5rem' }}
      templateColumns="repeat(3, 1fr)"
      templateAreas={['item-1 item-2 item-3']}
    >
      <Grid.Item area="item-2" csx={{ justifySelf: 'center' }}>
        <Flex direction="column">
          <Box csx={{ marginLeft: '-1.7rem', marginY: 5 }}>{illustration}</Box>
          {children}
        </Flex>
      </Grid.Item>
    </Grid>
  )
}

export function TableViewResolver({ children, views }: TableViewResolverProps) {
  const { loading, error, itemsNotFound, empty } = useViewContext()

  const state = loading
    ? 'loading'
    : error
    ? 'error'
    : itemsNotFound
    ? 'itemsNotFound'
    : empty
    ? 'empty'
    : undefined

  if (state && state !== 'loading') {
    return (
      <TableViews illustration={illustrations[state]}>
        <Flex direction="column">
          <Text variant="subtitle">
            {views?.[state].title ?? tableViewTitleFallback[state]}
          </Text>
          {views?.[state].text && (
            <Text variant="body" feedback="secondary">
              {views[state].text}
            </Text>
          )}
          {views?.[state].anchor && (
            <Anchor
              csx={{ fontSize: 1 }}
              href={views[state].anchor?.href}
              onClick={views[state].anchor?.onClick}
            >
              {views[state].anchor?.text}
            </Anchor>
          )}
        </Flex>
      </TableViews>
    )
  }

  return children
}

export interface TableViewsProps {
  illustration?: JSX.Element
  children?: JSX.Element
}

export interface TableViewResolverProps {
  children: JSX.Element
  views?: TableViewsType
}

export interface BasicTableView {
  title?: string
}

export interface TablewViewWithAnchor extends BasicTableView {
  anchor?: ViewAnchor
  text?: never
}

export interface TablewViewWithText extends BasicTableView {
  anchor?: never
  text?: string
}

type TableView = TablewViewWithText | TablewViewWithAnchor

interface ViewAnchor extends Pick<AnchorProps, 'onClick' | 'href'> {
  text: string
}

export type TableViewsType = Omit<
  Record<keyof TableViewState, TableView>,
  'loading'
>
