import styles from './flow-diagram.module.css'

type Side = 'top' | 'right' | 'bottom' | 'left'
type Tone = 'neutral' | 'accent' | 'yours' | 'ok' | 'error'

export interface FlowNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  title: string
  sub?: string
  tone?: Tone
}

export interface FlowEdge {
  from: string
  to: string
  fromSide?: Side
  toSide?: Side
  label?: string
  dashed?: boolean
}

export interface FlowDiagramProps {
  /** Accessible description of the whole diagram. */
  title: string
  width: number
  height: number
  nodes: FlowNode[]
  edges: FlowEdge[]
  caption?: string
}

function anchor(node: FlowNode, side: Side) {
  switch (side) {
    case 'top':
      return { x: node.x + node.width / 2, y: node.y }
    case 'bottom':
      return { x: node.x + node.width / 2, y: node.y + node.height }
    case 'left':
      return { x: node.x, y: node.y + node.height / 2 }
    default:
      return { x: node.x + node.width, y: node.y + node.height / 2 }
  }
}

function defaultSides(from: FlowNode, to: FlowNode): [Side, Side] {
  if (to.x >= from.x + from.width) return ['right', 'left']
  if (to.x + to.width <= from.x) return ['left', 'right']

  return to.y >= from.y ? ['bottom', 'top'] : ['top', 'bottom']
}

function arrowHead(x: number, y: number, side: Side) {
  const size = 6

  switch (side) {
    case 'left':
      return `${x},${y} ${x - size},${y - size / 2 - 1} ${x - size},${y + size / 2 + 1}`
    case 'right':
      return `${x},${y} ${x + size},${y - size / 2 - 1} ${x + size},${y + size / 2 + 1}`
    case 'top':
      return `${x},${y} ${x - size / 2 - 1},${y - size} ${x + size / 2 + 1},${y - size}`
    default:
      return `${x},${y} ${x - size / 2 - 1},${y + size} ${x + size / 2 + 1},${y + size}`
  }
}

/**
 * A small SVG box-and-arrow diagram. Nodes sit at fixed positions, so each
 * diagram reads the same on every screen. Colors follow the text color of the
 * page, so it works in light and dark themes.
 */
export function FlowDiagram(props: FlowDiagramProps) {
  const { title, width, height, nodes, edges, caption } = props
  const byId = new Map(nodes.map((node) => [node.id, node]))

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
      >
        {edges.map((edge) => {
          const from = byId.get(edge.from)
          const to = byId.get(edge.to)

          if (!from || !to) return null

          const [defaultFrom, defaultTo] = defaultSides(from, to)
          const fromSide = edge.fromSide ?? defaultFrom
          const toSide = edge.toSide ?? defaultTo
          const a = anchor(from, fromSide)
          const b = anchor(to, toSide)
          const horizontal = fromSide === 'left' || fromSide === 'right'
          const mid = horizontal ? (a.x + b.x) / 2 : (a.y + b.y) / 2
          const path = horizontal
            ? `M${a.x},${a.y} L${mid},${a.y} L${mid},${b.y} L${b.x},${b.y}`
            : `M${a.x},${a.y} L${a.x},${mid} L${b.x},${mid} L${b.x},${b.y}`

          return (
            <g key={`${edge.from}-${edge.to}-${edge.label ?? ''}`}>
              <path
                className={styles.edge}
                data-dashed={edge.dashed ? 'true' : 'false'}
                d={path}
              />
              <polygon
                className={styles.arrow}
                points={arrowHead(b.x, b.y, toSide)}
              />
              {edge.label ? (
                <text
                  className={styles.edgeLabel}
                  x={horizontal ? mid : (a.x + b.x) / 2 + 8}
                  y={horizontal ? (a.y + b.y) / 2 - 6 : mid - 6}
                  textAnchor={horizontal ? 'middle' : 'start'}
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          )
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              className={styles.node}
              data-tone={node.tone ?? 'neutral'}
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              rx={8}
            />
            <text
              className={styles.title}
              x={node.x + node.width / 2}
              y={node.y + node.height / 2 + (node.sub ? -4 : 5)}
              textAnchor="middle"
            >
              {node.title}
            </text>
            {node.sub ? (
              <text
                className={styles.sub}
                x={node.x + node.width / 2}
                y={node.y + node.height / 2 + 14}
                textAnchor="middle"
              >
                {node.sub}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
