import type { ExperienceTemplateConfig, LayoutRegion } from '../../core/types'
import { createGridLayout } from '../../design-system/layout'

type SupportFrameRegions = ExperienceTemplateConfig['regions']

type SupportFrameLayoutOptions = {
  headerEnabled?: boolean
  footerPhotoEnabled?: boolean
}

function normalizeRatio(value: number) {
  return Math.max(0, value)
}

function createMainGrid(headerEnabled: boolean) {
  const headerRatio = normalizeRatio(headerEnabled ? 0.07 : 0)
  const photoRatio = normalizeRatio(headerEnabled ? 0.66 : 0.74)
  const footerRatio = normalizeRatio(0.23)

  return createGridLayout({
    x: 0.04,
    y: 0.03,
    width: 0.92,
    height: 0.94,
    columns: [1],
    rows: [headerRatio, photoRatio, footerRatio],
    rowGap: 0.01,
  })
}

export function buildSupportFrameRegionLayout(options: SupportFrameLayoutOptions = {}): Record<string, LayoutRegion> {
  const {
    headerEnabled = true,
    footerPhotoEnabled = true,
  } = options
  const mainGrid = createMainGrid(headerEnabled)
  const headerArea = mainGrid.place(0, 0, 1, 1, {
    padding: 'xs',
    safeArea: { top: 'sm', right: 'md', bottom: 'xs', left: 'md' },
    horizontalAlign: 'center',
    verticalAlign: 'middle',
  })
  const photoArea = mainGrid.place(0, 1, 1, 1, {
    padding: 'xs',
    safeArea: { top: 'sm', right: 'sm', bottom: 'sm', left: 'sm' },
    horizontalAlign: 'center',
    verticalAlign: 'middle',
  })
  const footerArea = mainGrid.place(0, 2, 1, 1, {
    padding: 'sm',
    safeArea: { top: 'sm', right: 'sm', bottom: 'sm', left: 'sm' },
    horizontalAlign: 'left',
    verticalAlign: 'middle',
  })

  const headerGrid = createGridLayout({
    x: headerArea.x,
    y: headerArea.y,
    width: headerArea.width,
    height: headerArea.height,
    columns: [1, 1],
    rows: [1],
    columnGap: 0.02,
  })

  const photoGrid = createGridLayout({
    x: photoArea.x,
    y: photoArea.y,
    width: photoArea.width,
    height: photoArea.height,
    columns: [1],
    rows: [0.78, 0.22],
  })

  const hashtagArea = photoGrid.place(0, 1, 1, 1, {
    safeArea: { top: 'sm', right: 'sm', bottom: 'sm', left: 'sm' },
    horizontalAlign: 'center',
    verticalAlign: 'bottom',
  })

  const footerGrid = createGridLayout({
    x: footerArea.x,
    y: footerArea.y,
    width: footerArea.width,
    height: footerArea.height,
    columns: footerPhotoEnabled ? [4.8, 3.6, 3.6] : [6.4, 3.2],
    rows: footerPhotoEnabled ? [0.38, 0.28, 0.34] : [0.4, 0.6],
    columnGap: footerPhotoEnabled ? 0.014 : 0.02,
    rowGap: footerPhotoEnabled ? 0.01 : 0.02,
  })

  return {
    HeaderArea: headerArea,
    LogoLeftArea: headerGrid.place(0, 0, 1, 1, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'left',
      verticalAlign: 'middle',
    }),
    LogoRightArea: headerGrid.place(1, 0, 1, 1, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'right',
      verticalAlign: 'middle',
    }),
    PhotoArea: photoArea,
    OverlayArea: photoArea,
    HashtagArea: hashtagArea,
    FooterArea: footerArea,
    FooterLine1Area: footerPhotoEnabled ? footerGrid.place(1, 0, 1, 1, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'left',
      verticalAlign: 'middle',
    }) : footerGrid.place(0, 0, 2, 1, {
      safeArea: { top: 'xs', right: 'sm', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'left',
      verticalAlign: 'bottom',
    }),
    FooterLine2Area: footerPhotoEnabled ? footerGrid.place(1, 1, 1, 2, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'left',
      verticalAlign: 'middle',
    }) : footerGrid.place(1, 1, 1, 1, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'sm' },
      horizontalAlign: 'left',
      verticalAlign: 'middle',
    }),
    CandidateNumberArea: footerPhotoEnabled ? footerGrid.place(0, 0, 1, 3, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'left',
      verticalAlign: 'middle',
    }) : footerGrid.place(0, 1, 1, 1, {
      safeArea: { top: 'xs', right: 'sm', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'left',
      verticalAlign: 'bottom',
    }),
    CandidatePhotoArea: footerPhotoEnabled ? footerGrid.place(2, 0, 1, 3, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
    }) : footerGrid.place(1, 0, 1, 2, {
      safeArea: { top: 'xs', right: 'xs', bottom: 'xs', left: 'xs' },
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
    }),
  }
}

export function resolveSupportFrameRegions(regions: SupportFrameRegions): SupportFrameRegions {
  const headerEnabled = regions.HeaderArea?.enabled ?? true
  const footerPhotoEnabled = regions.CandidatePhotoArea?.enabled ?? true
  const resolvedLayout = buildSupportFrameRegionLayout({
    headerEnabled,
    footerPhotoEnabled,
  })

  return Object.fromEntries(
    Object.entries(regions).map(([regionName, regionConfig]) => {
      const shouldRender = regionName === 'LogoLeftArea' || regionName === 'LogoRightArea'
        ? regionConfig.enabled && headerEnabled
        : regionConfig.enabled

      return [
        regionName,
        {
          ...regionConfig,
          enabled: shouldRender,
          layout: resolvedLayout[regionName] ?? regionConfig.layout,
        },
      ]
    }),
  )
}
