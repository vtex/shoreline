import React, { useState } from 'react'

import {
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../index'

import './stories.css'
import { Slot } from '../../slot'
import { Button } from '../../button'
import { Bleed } from '../../bleed'
import { Tag } from '../../tag'
import { IconImageSquareFill } from '@vtex/shoreline-icons'

export default {
  title: 'shoreline-components/modal',
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Modal size',
    },
  },
  args: {
    size: 'medium',
  },
}

interface StoryArgs {
  size: 'small' | 'medium' | 'large'
}

export function Default(args: StoryArgs) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        size={args.size}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <ModalHeader>
          <ModalTitle>Confirm action</ModalTitle>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>This is a super basic modal</ModalContent>
      </Modal>
    </>
  )
}

export function Complete(args: StoryArgs) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal size={args.size} open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <ModalTitle>Confirm action</ModalTitle>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla
          posuere sollicitudin aliquam ultrices sagittis orci. Vel risus commodo
          viverra maecenas. Montes nascetur ridiculus mus mauris vitae ultricies
          leo. Nibh cras pulvinar mattis nunc. Mattis aliquam faucibus purus in
          massa tempor nec. Cursus mattis molestie a iaculis at. Dolor sed
          viverra ipsum nunc aliquet bibendum. In eu mi bibendum neque egestas
          congue. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
          fermentum odio. At tellus at urna condimentum mattis pellentesque id.
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)} size="large">
            Close
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)} size="large">
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export function WithScroll(args: StoryArgs) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal size={args.size} open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <ModalTitle>Confirm action</ModalTitle>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit
          scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
          tristique senectus. Morbi tristique senectus et netus et. Nec
          tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.
          Morbi tristique senectus et netus et malesuada fames ac. Ultricies leo
          integer malesuada nunc vel risus commodo viverra maecenas. Nunc congue
          nisi vitae suscipit tellus mauris a diam maecenas. Dui accumsan sit
          amet nulla facilisi morbi tempus. Venenatis lectus magna fringilla
          urna. Mus mauris vitae ultricies leo integer malesuada nunc. Ac ut
          consequat semper viverra. Fusce id velit ut tortor pretium viverra. Ut
          etiam sit amet nisl purus in mollis nunc. Nunc mi ipsum faucibus vitae
          aliquet nec ullamcorper. Ac ut consequat semper viverra nam libero.
          Sed id semper risus in hendrerit gravida rutrum quisque non. Quis
          commodo odio aenean sed adipiscing diam donec adipiscing. Urna et
          pharetra pharetra massa massa ultricies mi quis. Amet purus gravida
          quis blandit. Nunc lobortis mattis aliquam faucibus purus in.
          Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae
          elementum. Risus sed vulputate odio ut. Elementum curabitur vitae nunc
          sed velit. Tristique et egestas quis ipsum suspendisse. Aliquet
          sagittis id consectetur purus ut. Sit amet mattis vulputate enim
          nulla. Morbi non arcu risus quis varius quam quisque. Non quam lacus
          suspendisse faucibus interdum posuere lorem. Ut ornare lectus sit amet
          est. Aliquet enim tortor at auctor urna nunc id cursus. Non pulvinar
          neque laoreet suspendisse interdum consectetur. Pulvinar neque laoreet
          suspendisse interdum consectetur libero. At quis risus sed vulputate
          odio ut. Egestas dui id ornare arcu odio ut. Dictum sit amet justo
          donec enim diam. Egestas integer eget aliquet nibh praesent tristique
          magna sit. Nulla posuere sollicitudin aliquam ultrices sagittis.
          Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Ut
          porttitor leo a diam sollicitudin tempor id. Cum sociis natoque
          penatibus et magnis dis parturient montes nascetur. Enim ut sem
          viverra aliquet. Et netus et malesuada fames ac. Orci dapibus ultrices
          in iaculis nunc sed augue. Gravida arcu ac tortor dignissim convallis
          aenean. Nunc vel risus commodo viverra maecenas. Sagittis vitae et leo
          duis ut. Sit amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Donec enim diam vulputate ut pharetra. Pretium fusce id
          velit ut. Elementum pulvinar etiam non quam lacus suspendisse faucibus
          interdum posuere. Ac tortor dignissim convallis aenean et tortor at.
          Molestie nunc non blandit massa enim nec dui nunc. Odio pellentesque
          diam volutpat commodo. Sit amet consectetur adipiscing elit ut aliquam
          purus. Turpis tincidunt id aliquet risus feugiat in ante metus dictum.
          Sit amet volutpat consequat mauris nunc congue nisi. Orci phasellus
          egestas tellus rutrum tellus pellentesque. Est velit egestas dui id.
          Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Lorem
          dolor sed viverra ipsum nunc aliquet bibendum enim. Semper auctor
          neque vitae tempus quam pellentesque nec nam aliquam. Volutpat diam ut
          venenatis tellus in metus vulputate eu. Facilisi nullam vehicula ipsum
          a arcu cursus vitae congue. Feugiat in fermentum posuere urna nec
          tincidunt. Donec massa sapien faucibus et. Ac placerat vestibulum
          lectus mauris ultrices eros. Volutpat lacus laoreet non curabitur
          gravida. Vitae aliquet nec ullamcorper sit amet risus nullam. Et
          malesuada fames ac turpis egestas maecenas pharetra convallis posuere.
          Erat pellentesque adipiscing commodo elit at imperdiet. Ultricies
          integer quis auctor elit sed vulputate. Nisi porta lorem mollis
          aliquam ut porttitor leo a. Urna id volutpat lacus laoreet. Sagittis
          purus sit amet volutpat consequat. Nibh venenatis cras sed felis. Amet
          consectetur adipiscing elit pellentesque. Montes nascetur ridiculus
          mus mauris vitae ultricies leo integer malesuada. Montes nascetur
          ridiculus mus mauris vitae ultricies. Arcu dictum varius duis at. Quam
          elementum pulvinar etiam non. Purus viverra accumsan in nisl nisi
          scelerisque eu ultrices. Congue mauris rhoncus aenean vel elit
          scelerisque mauris. Pharetra sit amet aliquam id diam maecenas. Sed
          odio morbi quis commodo odio aenean sed. Sed odio morbi quis commodo
          odio aenean sed adipiscing diam. Eu non diam phasellus vestibulum
          lorem sed risus ultricies. Aliquet enim tortor at auctor. Id diam
          maecenas ultricies mi eget mauris pharetra et ultrices. Risus
          ultricies tristique nulla aliquet enim. Pharetra massa massa ultricies
          mi quis hendrerit. Vitae suscipit tellus mauris a diam maecenas sed
          enim. Euismod nisi porta lorem mollis aliquam ut porttitor leo.
          Suscipit adipiscing bibendum est ultricies integer quis auctor elit
          sed. Ut faucibus pulvinar elementum integer. Fames ac turpis egestas
          maecenas pharetra convallis posuere morbi. Varius duis at consectetur
          lorem donec massa sapien. Montes nascetur ridiculus mus mauris.
          Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Non
          arcu risus quis varius quam quisque. Ut tristique et egestas quis
          ipsum suspendisse ultrices.
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)} size="large">
            Close
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)} size="large">
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export function CompleteHeader(args: StoryArgs) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal size={args.size} open={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <Slot>
            <Bleed left="$space-1">
              <div className="image-placeholder">
                <IconImageSquareFill />
              </div>
            </Bleed>
            <ModalTitle>Confirm action</ModalTitle>
            <Tag>Short text</Tag>
          </Slot>
          <Slot>
            <Button variant="tertiary" size="large">
              Action
            </Button>
            <ModalDismiss />
          </Slot>
        </ModalHeader>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla
          posuere sollicitudin aliquam ultrices sagittis orci. Vel risus commodo
          viverra maecenas. Montes nascetur ridiculus mus mauris vitae ultricies
          leo. Nibh cras pulvinar mattis nunc. Mattis aliquam faucibus purus in
          massa tempor nec. Cursus mattis molestie a iaculis at. Dolor sed
          viverra ipsum nunc aliquet bibendum. In eu mi bibendum neque egestas
          congue. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
          fermentum odio. At tellus at urna condimentum mattis pellentesque id.
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)} size="large">
            Close
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)} size="large">
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
