import type { RefObject } from 'react'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { IconCaret, IconCheck } from '@vtex/admin-ui-icons'

import { Box } from '../Box'
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
    tone = 'neutral',
    disabled,
    block,
    renderItem = (item) => item,
  } = props

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
      csx={{
        width: 288,
        position: 'relative',
        ...(block ? { display: 'block', minWidth: 288, width: 'full' } : {}),
      }}
    >
      <Box
        as="button"
        type="button"
        {...state.getToggleButtonProps()}
        disabled={disabled}
        csx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          height: 48,
          width: 'inherit',
          boxShadow: `0 0 0 0 transparent`,
          borderStyle: 'solid',
          borderWidth: 1,
          paddingLeft: 3,
          paddingRight: 4,
          borderColor: `field.${tone}`,
          borderRadius: 'default',
          bg: `field.${tone}`,
          fontSize: 1,
          color: `field.${tone}`,
          outline: 0,
          ':hover': {
            borderColor: `field.${tone}Hover`,
          },
          ':hover > svg': {
            color: `field.${tone}`,
          },
          ':focus': {
            borderColor: `field.${tone}Focus`,
            boxShadow: `ring.${tone}`,
          },
          ':disabled': {
            bg: `field.${tone}Disabled`,
            borderColor: `field.${tone}Disabled`,
            color: `field.${tone}Disabled`,
            cursor: 'initial',
          },
          ':disabled > svg': {
            color: `field.${tone}Disabled`,
          },
        }}
      >
        <Box>
          <Box
            as="span"
            csx={{
              lineHeight: 1.43,
              color: 'base',
              float: 'left',
              marginTop: '1.125rem',
              ':not(:empty) + label': {
                fontSize: 0,
                lineHeight: 1.5,
              },
            }}
          >
            {renderItem(state.selectedItem)}
          </Box>
          <Label
            csx={{ lineHeight: 1.43, position: 'absolute', left: 12 }}
            {...state.getLabelProps()}
          >
            {label}
          </Label>
        </Box>
        <IconCaret direction="down" size={24} csx={{ color: 'muted' }} />
      </Box>

      <Box
        {...state.getMenuProps()}
        role="option"
        csx={{
          top: `${topDistanceOptions}px`,
          borderRadius: 'default',
          position: 'absolute',
          zIndex: 999,
          width: 'inherit',
          bg: 'popover',
          outline: 'none',
        }}
      >
        {state.isOpen && (
          <Box
            csx={{
              display: 'flex',
              flexDirection: 'column',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'base',
              borderRadius: 'default',
            }}
          >
            <Label
              csx={{
                text: 'small',
                lineHeight: 1.5,
                paddingTop: 2,
                paddingBottom: 1,
                paddingLeft: 3,
                color: 'muted',
              }}
            >
              {label}
            </Label>
            <Box
              as="ul"
              csx={{
                paddingBottom: 1,
                maxHeight: 150,
                width: 'inherit',
                overflowY: 'auto',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
            >
              {items.map((item, index) => (
                <Box
                  key={`${item}${index}`}
                  as="li"
                  {...state.getItemProps({ item, index })}
                  csx={{
                    verticalAlign: 'middle',
                    listStyleType: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    paddingY: 1,
                    paddingLeft: state.selectedItem ? 9 : 12,
                    bg:
                      state.highlightedIndex === index
                        ? 'listBoxItem.mainSelected'
                        : 'listBoxItem.main',
                    color:
                      state.highlightedIndex === index
                        ? 'listBoxItem.mainSelected'
                        : 'listBoxItem.main',
                  }}
                >
                  {state.selectedItem && (
                    <>
                      {renderItem(item) === renderItem(state.selectedItem) ? (
                        <IconCheck size={16} csx={{ color: 'base' }} />
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
