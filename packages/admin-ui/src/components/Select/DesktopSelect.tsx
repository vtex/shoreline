import type { RefObject } from 'react'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { IconCaret, IconCheck } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'
import { useSystem } from '@vtex/admin-core'

import type { SelectProps } from './index'
import { Label } from '../Label'

/**
 * The -20 its equals to line height of the label.
 */
const DEFAULT_PORTAL_OFFSET = -20

export function DesktopSelect<T>(props: SelectProps<T>) {
  const {
    state,
    label,
    items,
    error,
    disabled,
    block,
    renderItem = (item) => item,
  } = props

  const { stylesOf } = useSystem()

  const [topDistanceOptions, setTopDistanceOptions] = useState(
    DEFAULT_PORTAL_OFFSET
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const liRefs = useRef<Array<RefObject<HTMLDivElement>>>(
    items.map(() => React.createRef<HTMLDivElement>())
  )

  const getSelectedItemHeight = (selectedItemTop: number) => {
    const linePadding = 18
    const lineHeight = 20

    return linePadding + lineHeight + selectedItemTop
  }

  const getScrollOffset = (buttonTop: number, selectedItemHeight: number) => {
    const labelHeight = 21
    const maxHeight = 150

    return buttonTop + labelHeight + maxHeight - selectedItemHeight
  }

  useLayoutEffect(
    function calculatePortalTopPosition() {
      const selectedItemIndex = items.findIndex(
        (item) => renderItem(item) === renderItem(state.selectedItem)
      )

      if (
        !state.isOpen ||
        selectedItemIndex === -1 ||
        liRefs.current?.[selectedItemIndex]?.current == null ||
        containerRef.current == null
      ) {
        const buttonTop = containerRef.current?.getBoundingClientRect().top ?? 0
        const newTopDistance =
          buttonTop < Math.abs(DEFAULT_PORTAL_OFFSET)
            ? -buttonTop
            : DEFAULT_PORTAL_OFFSET

        setTopDistanceOptions(newTopDistance)

        return
      }

      const buttonTop = containerRef.current.getBoundingClientRect().top
      const selectedItemTop =
        liRefs.current[selectedItemIndex].current!.getBoundingClientRect().top

      const selectedItemHeight = getSelectedItemHeight(selectedItemTop)
      const scrollOffset = getScrollOffset(buttonTop, selectedItemHeight)
      const selectedItemOffset = buttonTop - selectedItemTop
      const portalOffset =
        scrollOffset < 0
          ? selectedItemOffset - scrollOffset
          : selectedItemOffset

      const newTop =
        Math.abs(portalOffset) > buttonTop
          ? DEFAULT_PORTAL_OFFSET
          : portalOffset

      setTopDistanceOptions(newTop)
    },
    /**
     * If the items array is declared inside the component that uses Select, there will be an infinite loop in
     * the useLayoutEffect, because as the hover or focus changes between the select options, the useSelectState
     * of the downshift is changing the `highlightedIndex` property and consequently creating a new array ref.
     * Therefore, items were removed from the dependency array, since the calculation is based on the selected element.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.isOpen, state.selectedItem]
  )

  return (
    <Box
      ref={containerRef}
      role="listbox"
      csx={
        block
          ? {
              themeKey: 'components.select.container',
              display: 'block',
              minWidth: 288,
              width: 'full',
            }
          : { themeKey: 'components.select.container' }
      }
    >
      <Box
        element="button"
        type="button"
        {...state.getToggleButtonProps()}
        disabled={disabled}
        csx={{
          themeKey: `components.select.button${error ? 'Error' : ''}`,
        }}
      >
        <Box>
          <Box
            element="span"
            csx={{ themeKey: 'components.select.selectedItem' }}
          >
            {renderItem(state.selectedItem)}
          </Box>
          <Label
            csx={stylesOf('components.select.label')}
            {...state.getLabelProps()}
          >
            {label}
          </Label>
        </Box>
        <IconCaret
          direction="down"
          size={24}
          csx={{ color: 'dark.secondary' }}
        />
      </Box>

      <Box
        {...state.getMenuProps()}
        role="option"
        csx={{
          top: `${topDistanceOptions}px`,
          borderRadius: 'default',
          themeKey: 'components.select.optionsPortal',
        }}
      >
        {state.isOpen && (
          <Box
            csx={{
              themeKey: 'components.select.optionsContainer',
            }}
          >
            <Label csx={stylesOf('components.select.optionsLabel')}>
              {label}
            </Label>
            <Box element="ul" csx={{ themeKey: 'components.select.optionsUl' }}>
              {items.map((item, index) => (
                <Box
                  key={`${item}${index}`}
                  element="li"
                  {...state.getItemProps({ item, index })}
                  csx={{
                    themeKey: 'components.select.item',
                    paddingY: 1,
                    paddingLeft: state.selectedItem ? 9 : 12,
                    backgroundColor:
                      state.highlightedIndex === index
                        ? 'light.secondary'
                        : 'transparent',
                  }}
                >
                  {state.selectedItem && (
                    <>
                      {renderItem(item) === renderItem(state.selectedItem) ? (
                        <IconCheck size={16} csx={{ color: 'dark.primary' }} />
                      ) : (
                        <Box csx={{ width: 16 }} />
                      )}
                    </>
                  )}
                  <Box
                    csx={{
                      paddingLeft: state.selectedItem ? 1 : 0,
                      text: 'body',
                      lineHeight: 1.43,
                    }}
                    ref={liRefs.current[index]}
                  >
                    {renderItem(item)}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
