import type { LayoutRegion } from '../core/types'

export function createRegion(
  x: number,
  y: number,
  width: number,
  height: number,
  patch?: Partial<LayoutRegion>,
): LayoutRegion {
  return {
    x,
    y,
    width,
    height,
    ...patch,
  }
}

type GridConfig = {
  x: number
  y: number
  width: number
  height: number
  columns: number[]
  rows: number[]
  columnGap?: number
  rowGap?: number
}

function resolveTrackStarts(tracks: number[], totalSize: number, gap: number) {
  const totalTrackWeight = tracks.reduce((sum, value) => sum + Math.max(0, value), 0)
  const totalGap = Math.max(0, tracks.length - 1) * gap
  const usableSize = Math.max(0, totalSize - totalGap)

  const sizes = tracks.map((weight) => (totalTrackWeight > 0 ? (Math.max(0, weight) / totalTrackWeight) * usableSize : 0))
  const starts: number[] = []

  let cursor = 0
  sizes.forEach((size, index) => {
    starts.push(cursor)
    cursor += size
    if (index < sizes.length - 1) {
      cursor += gap
    }
  })

  return {
    starts,
    sizes,
  }
}

export function createGridLayout(config: GridConfig) {
  const {
    x,
    y,
    width,
    height,
    columns,
    rows,
    columnGap = 0,
    rowGap = 0,
  } = config

  const columnTracks = resolveTrackStarts(columns, width, columnGap)
  const rowTracks = resolveTrackStarts(rows, height, rowGap)

  const place = (
    column: number,
    row: number,
    columnSpan = 1,
    rowSpan = 1,
    patch?: Partial<LayoutRegion>,
  ): LayoutRegion => {
    const safeColumn = Math.max(0, Math.min(column, columnTracks.starts.length - 1))
    const safeRow = Math.max(0, Math.min(row, rowTracks.starts.length - 1))
    const safeColumnSpan = Math.max(1, columnSpan)
    const safeRowSpan = Math.max(1, rowSpan)

    const lastColumn = Math.min(columnTracks.sizes.length - 1, safeColumn + safeColumnSpan - 1)
    const lastRow = Math.min(rowTracks.sizes.length - 1, safeRow + safeRowSpan - 1)

    const spanWidth = columnTracks.sizes
      .slice(safeColumn, lastColumn + 1)
      .reduce((sum, value) => sum + value, 0) + (lastColumn - safeColumn) * columnGap

    const spanHeight = rowTracks.sizes
      .slice(safeRow, lastRow + 1)
      .reduce((sum, value) => sum + value, 0) + (lastRow - safeRow) * rowGap

    return createRegion(
      x + columnTracks.starts[safeColumn],
      y + rowTracks.starts[safeRow],
      spanWidth,
      spanHeight,
      patch,
    )
  }

  return {
    place,
  }
}
