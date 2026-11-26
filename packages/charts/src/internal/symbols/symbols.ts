/**
 * Size of the marker a line draws at each point, in the engine's symbol units.
 *
 * The engine strokes a marker's circle with a ring a third of the symbol's
 * size, so this size draws an 8px circle with a 2px ring — the design's
 * marker. The chart relies on one size everywhere: the marker at each point
 * and the marker a dense chart keeps on an isolated value must match.
 */
export const lineSymbolSize = 6
