import { cx } from '../cx'
import { mergeProps } from '../merge-props'

describe('mergeProps', function () {
  it('handles one argument', function () {
    const onClick = () => {}
    const className = 'primary'
    const id = 'test_id'
    const mergedProps = mergeProps({ onClick, className, id })

    expect(mergedProps.onClick).toBe(onClick)
    expect(mergedProps.className).toBe(className)
    expect(mergedProps.id).toBe(id)
  })

  it('combines callbacks', function () {
    const mockFn = jest.fn()
    const message1 = 'click1'
    const message2 = 'click2'
    const message3 = 'click3'
    const mergedProps = mergeProps(
      { onClick: () => mockFn(message1) },
      { onClick: () => mockFn(message2) },
      { onClick: () => mockFn(message3) }
    )

    mergedProps.onClick()
    expect(mockFn).toHaveBeenNthCalledWith(1, message1)
    expect(mockFn).toHaveBeenNthCalledWith(2, message2)
    expect(mockFn).toHaveBeenNthCalledWith(3, message3)
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('merges props with different keys', function () {
    const mockFn = jest.fn()
    const click1 = 'click1'
    const click2 = 'click2'
    const hover = 'hover'
    const focus = 'focus'
    const margin = 2
    const mergedProps = mergeProps(
      { onClick: () => mockFn(click1) },
      { onHover: () => mockFn(hover), styles: { margin } },
      { onClick: () => mockFn(click2), onFocus: () => mockFn(focus) }
    )

    mergedProps.onClick()
    expect(mockFn).toHaveBeenNthCalledWith(1, click1)
    expect(mockFn).toHaveBeenNthCalledWith(2, click2)
    mergedProps.onFocus()
    expect(mockFn).toHaveBeenNthCalledWith(3, focus)
    mergedProps.onHover()
    expect(mockFn).toHaveBeenNthCalledWith(4, hover)
    expect(mockFn).toHaveBeenCalledTimes(4)
    expect(mergedProps.styles.margin).toBe(margin)
  })

  it('combines classNames', function () {
    const className1 = 'primary'
    const className2 = 'hover'
    const className3 = 'focus'
    const mergedProps = mergeProps(
      { className: className1 },
      { className: className2 },
      { className: className3 }
    )

    const mergedClassNames = cx(className1, className2, className3)

    expect(mergedProps.className).toBe(mergedClassNames)
  })
})
