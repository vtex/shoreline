import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { Button } from '../../button'
import type { ModalProps } from '../index'
import {
  Modal,
  useModalState,
  ModalHeader,
  ModalTitle,
  ModalDismiss,
  ModalContent,
  ModalFooter,
} from '../index'

export default {
  title: 'admin-ui-review/modal',
} as Meta

export function Basic() {
  const modal = useModalState()

  return (
    <>
      <Button onClick={modal.toggle}>Show modal</Button>
      <Modal state={modal}>
        <p>
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
      </Modal>
    </>
  )
}

function Abstraction(props: { label: string } & Omit<ModalProps, 'state'>) {
  const { label, ...modalProps } = props
  const modal = useModalState()

  return (
    <>
      <Button onClick={modal.toggle}>{label}</Button>
      <Modal {...modalProps} state={modal}>
        <p>
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
      </Modal>
    </>
  )
}

export function Dimensions() {
  return (
    <Stack>
      <Abstraction label="Small" size="small" />
      <Abstraction label="Small fluid" size="small" fluid />

      <Abstraction label="Medium" size="medium" />
      <Abstraction label="Medium fluid" size="medium" fluid />

      <Abstraction label="Large" size="large" />
      <Abstraction label="Large fluid" size="large" fluid />
    </Stack>
  )
}

export function CompoundComponents() {
  const modal = useModalState()

  return (
    <>
      <Button onClick={modal.toggle}>Show modal</Button>
      <Modal state={modal}>
        <ModalHeader>
          <ModalTitle>Success</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            fringilla pulvinar tortor, at dapibus nunc mollis ac. Donec sit amet
            fermentum justo. Vivamus tellus libero, varius et enim nec, feugiat
            facilisis est. Etiam et eros ac sapien convallis vestibulum at eget
            turpis. Curabitur semper cursus leo quis mollis. Maecenas vel nisl
            non eros pretium cursus sed a ante. Ut malesuada sem quis mi
            ultricies pellentesque. Pellentesque eget lectus viverra, tincidunt
            urna sit amet, tincidunt lacus.
          </p>
          <p>
            Mauris commodo purus vehicula ex malesuada rhoncus. Nunc bibendum
            massa eget nulla dignissim, vitae interdum massa pretium. Interdum
            et malesuada fames ac ante ipsum primis in faucibus. Nulla gravida,
            enim sit amet finibus sollicitudin, ligula quam varius ex, eget
            vestibulum lacus quam a nisl. Curabitur sodales diam non commodo
            auctor. Nunc tempor vulputate augue a pharetra. Etiam vel pulvinar
            enim. Etiam at leo vitae nulla viverra dignissim ac ac arcu. Nunc
            auctor est felis, quis auctor erat vulputate vitae. Praesent
            sagittis eros et libero cursus, at ornare leo posuere. Quisque
            mollis porta ante, vel iaculis quam tempus at. Morbi at magna
            elementum, mollis diam non, aliquet augue. Praesent eget nulla
            libero. Etiam nec sollicitudin tellus. In hac habitasse platea
            dictumst.
          </p>
          <p>
            Nulla vehicula felis vitae lorem faucibus sodales. Sed malesuada
            porttitor quam, nec scelerisque quam fringilla eu. Donec in varius
            erat, eu viverra sem. Morbi ut nulla eget nulla pulvinar porta nec
            molestie sem. Pellentesque velit odio, varius sit amet lectus quis,
            finibus varius ante. Duis molestie sem risus, ac bibendum dui dictum
            et. Suspendisse semper, nulla iaculis aliquam imperdiet, ex tortor
            egestas dolor, eu egestas sapien risus non odio. Nam efficitur
            tellus sit amet leo imperdiet, mollis feugiat enim consectetur.
            Suspendisse scelerisque ultrices magna ac vestibulum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Aenean eget ullamcorper
            dolor. Proin nec ipsum id lectus efficitur consequat. Donec vitae
            dui consectetur, fringilla risus in, maximus dolor.
          </p>
        </ModalContent>
        <ModalFooter>
          <ModalDismiss>OK</ModalDismiss>
        </ModalFooter>
      </Modal>
    </>
  )
}
