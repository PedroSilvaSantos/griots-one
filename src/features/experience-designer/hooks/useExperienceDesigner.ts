import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Experience } from '../../experience/types/experience'
import type { ExperienceTemplateId } from '../../experience-template-engine/types/template'
import type {
  DesignerRegion,
  DesignerTemplateElement,
  DesignerTemplateElementPatch,
  DesignerTemplateModel,
} from '../types/designer'
import {
  applyDesignerTemplate,
  loadDesignerTemplate,
  saveDesignerTemplate,
} from '../services/templateDesigner.service'
import { toEngineTemplate } from '../adapters/templateDesigner.adapter'
import { templateManager } from '../../experience-template-engine/services/templateManager'

type LocatedElement = {
  region: DesignerRegion
  regionIndex: number
  element: DesignerTemplateElement
  elementIndex: number
}

function locateElement(model: DesignerTemplateModel, elementId: string): LocatedElement | null {
  for (let regionIndex = 0; regionIndex < model.regions.length; regionIndex += 1) {
    const region = model.regions[regionIndex]
    const elementIndex = region.elements.findIndex((item) => item.id === elementId)
    if (elementIndex >= 0) {
      return {
        region,
        regionIndex,
        element: region.elements[elementIndex],
        elementIndex,
      }
    }
  }

  return null
}

function updateElementInModel(
  model: DesignerTemplateModel,
  elementId: string,
  patch: DesignerTemplateElementPatch,
): DesignerTemplateModel {
  return {
    ...model,
    regions: model.regions.map((region) => ({
      ...region,
      elements: region.elements.map((element) => {
        if (element.id !== elementId) return element

        return {
          ...element,
          ...patch,
          styles: {
            ...element.styles,
            ...patch.styles,
          },
          text: {
            ...element.text,
            ...patch.text,
          },
          image: {
            ...element.image,
            ...patch.image,
          },
        }
      }),
    })),
  }
}

function sortElements(region: DesignerRegion) {
  return {
    ...region,
    elements: [...region.elements].sort((a, b) => a.zIndex - b.zIndex),
  }
}

function createNewElement(type: DesignerTemplateElement['type'], region: DesignerRegion): DesignerTemplateElement {
  const baseId = `${type}-${Date.now()}`

  return {
    id: baseId,
    name: `${type}`,
    type,
    source: type === 'image' || type === 'logo' || type === 'mainPhoto' ? 'brand.logo' : 'content.title',
    visible: true,
    zIndex: region.elements.length,
    x: 0.1,
    y: 0.1,
    width: 0.3,
    height: 0.2,
    styles: {
      opacity: 1,
      rotation: 0,
      borderRadius: 'md',
      background: type === 'shape' || type === 'rectangle' ? 'Surface' : undefined,
      border: 'none',
    },
    text: {
      typography: 'body',
      align: 'left',
      verticalAlign: 'middle',
      autoScale: true,
      wrap: true,
      maxLines: 2,
      minFontSize: 12,
    },
    image: {
      fit: 'cover',
      radius: 'md',
      opacity: 1,
    },
  }
}

function isEqualModel(a: DesignerTemplateModel, b: DesignerTemplateModel) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function useExperienceDesigner(experience: Experience) {
  const templateId = experience.template.id as ExperienceTemplateId
  const [model, setModel] = useState<DesignerTemplateModel>(() => loadDesignerTemplate(templateId))
  const [selectedElementId, setSelectedElementId] = useState<string>('')
  const [savingTemplate, setSavingTemplate] = useState(false)
  const [renderVersion, setRenderVersion] = useState(0)
  const [past, setPast] = useState<DesignerTemplateModel[]>([])
  const [future, setFuture] = useState<DesignerTemplateModel[]>([])
  const [savedSnapshot, setSavedSnapshot] = useState<string>(() => JSON.stringify(loadDesignerTemplate(templateId)))

  useEffect(() => {
    applyDesignerTemplate(templateId)
    const next = loadDesignerTemplate(templateId)
    setModel(next)
    setSelectedElementId(next.regions[0]?.elements[0]?.id ?? '')
    setPast([])
    setFuture([])
    setSavedSnapshot(JSON.stringify(next))
  }, [templateId])

  useEffect(() => {
    const template = toEngineTemplate(model)
    templateManager.setOverride(templateId, template)
    setRenderVersion((value) => value + 1)
  }, [model, templateId])

  const applyChange = useCallback((updater: (current: DesignerTemplateModel) => DesignerTemplateModel) => {
    setModel((current) => {
      const next = updater(current)
      if (isEqualModel(current, next)) {
        return current
      }

      setPast((history) => [...history.slice(-49), current])
      setFuture([])
      return next
    })
  }, [])

  const selectedElement = useMemo(() => {
    if (!selectedElementId) return null
    return locateElement(model, selectedElementId)?.element ?? null
  }, [model, selectedElementId])

  const selectedRegionId = useMemo(() => {
    if (!selectedElementId) return model.regions[0]?.id ?? ''
    return locateElement(model, selectedElementId)?.region.id ?? ''
  }, [model, selectedElementId])

  const canUndo = past.length > 0
  const canRedo = future.length > 0
  const hasUnsavedChanges = useMemo(() => JSON.stringify(model) !== savedSnapshot, [model, savedSnapshot])

  const setTemplateName = useCallback((value: string) => {
    applyChange((current) => ({
      ...current,
      name: value,
    }))
  }, [applyChange])

  const setCanvas = useCallback((width: number, height: number) => {
    applyChange((current) => ({
      ...current,
      canvas: { width, height },
    }))
  }, [applyChange])

  const setTheme = useCallback((theme: DesignerTemplateModel['theme']) => {
    applyChange((current) => ({
      ...current,
      theme,
    }))
  }, [applyChange])

  const setRegionEnabled = useCallback((regionId: string, enabled: boolean) => {
    applyChange((current) => ({
      ...current,
      regions: current.regions.map((region) => (region.id === regionId ? { ...region, enabled } : region)),
    }))
  }, [applyChange])

  const updateElement = useCallback((elementId: string, patch: DesignerTemplateElementPatch) => {
    applyChange((current) => updateElementInModel(current, elementId, patch))
  }, [applyChange])

  const addElement = useCallback((type: DesignerTemplateElement['type']) => {
    applyChange((current) => {
      const regionId = selectedRegionId || current.regions[0]?.id
      if (!regionId) return current

      let nextSelectedElementId = ''
      const next = {
        ...current,
        regions: current.regions.map((region) => {
          if (region.id !== regionId) return region
          const nextElement = createNewElement(type, region)
          nextSelectedElementId = nextElement.id
          return sortElements({
            ...region,
            elements: [...region.elements, nextElement],
          })
        }),
      }

      if (nextSelectedElementId) {
        setSelectedElementId(nextSelectedElementId)
      }

      return next
    })
  }, [applyChange, selectedRegionId])

  const duplicateElement = useCallback((elementId: string) => {
    applyChange((current) => {
      const located = locateElement(current, elementId)
      if (!located) return current

      const copyId = `${located.element.type}-${Date.now()}-copy`
      const clone: DesignerTemplateElement = {
        ...located.element,
        id: copyId,
        name: `${located.element.name} Copy`,
        x: Math.min(0.95, located.element.x + 0.02),
        y: Math.min(0.95, located.element.y + 0.02),
        zIndex: located.region.elements.length,
      }

      setSelectedElementId(copyId)

      return {
        ...current,
        regions: current.regions.map((region, index) => {
          if (index !== located.regionIndex) return region

          return sortElements({
            ...region,
            elements: [...region.elements, clone],
          })
        }),
      }
    })
  }, [applyChange])

  const removeElement = useCallback((elementId: string) => {
    applyChange((current) => ({
      ...current,
      regions: current.regions.map((region) => ({
        ...region,
        elements: region.elements.filter((element) => element.id !== elementId),
      })),
    }))

    setSelectedElementId('')
  }, [applyChange])

  const moveLayer = useCallback((elementId: string, direction: 'up' | 'down') => {
    applyChange((current) => {
      const located = locateElement(current, elementId)
      if (!located) return current

      const nextIndex = direction === 'up'
        ? Math.min(located.region.elements.length - 1, located.elementIndex + 1)
        : Math.max(0, located.elementIndex - 1)

      if (nextIndex === located.elementIndex) return current

      const nextElements = [...located.region.elements]
      const [element] = nextElements.splice(located.elementIndex, 1)
      nextElements.splice(nextIndex, 0, element)

      const withZIndex = nextElements.map((item, index) => ({
        ...item,
        zIndex: index,
      }))

      return {
        ...current,
        regions: current.regions.map((region, index) => {
          if (index !== located.regionIndex) return region
          return {
            ...region,
            elements: withZIndex,
          }
        }),
      }
    })
  }, [applyChange])

  const toggleLayerVisibility = useCallback((elementId: string) => {
    const located = locateElement(model, elementId)
    if (!located) return

    updateElement(elementId, {
      visible: !located.element.visible,
    })
  }, [model, updateElement])

  const alignSelected = useCallback((direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (!selectedElementId) return

    const located = locateElement(model, selectedElementId)
    if (!located) return

    const element = located.element

    if (direction === 'center') {
      updateElement(element.id, { x: Math.max(0, (1 - element.width) / 2) })
      return
    }

    if (direction === 'middle') {
      updateElement(element.id, { y: Math.max(0, (1 - element.height) / 2) })
      return
    }

    if (direction === 'left') {
      updateElement(element.id, { x: 0 })
      return
    }

    if (direction === 'right') {
      updateElement(element.id, { x: Math.max(0, 1 - element.width) })
      return
    }

    if (direction === 'top') {
      updateElement(element.id, { y: 0 })
      return
    }

    updateElement(element.id, { y: Math.max(0, 1 - element.height) })
  }, [model, selectedElementId, updateElement])

  const undo = useCallback(() => {
    setPast((history) => {
      if (!history.length) return history

      const previous = history[history.length - 1]
      setFuture((currentFuture) => [model, ...currentFuture])
      setModel(previous)
      return history.slice(0, -1)
    })
  }, [model])

  const redo = useCallback(() => {
    setFuture((currentFuture) => {
      if (!currentFuture.length) return currentFuture

      const [next, ...rest] = currentFuture
      setPast((history) => [...history.slice(-49), model])
      setModel(next)
      return rest
    })
  }, [model])

  const saveTemplate = useCallback(async () => {
    setSavingTemplate(true)
    try {
      saveDesignerTemplate(templateId, model)
      setSavedSnapshot(JSON.stringify(model))
    } finally {
      setSavingTemplate(false)
    }
  }, [model, templateId])

  return {
    model,
    selectedElement,
    selectedElementId,
    selectedRegionId,
    savingTemplate,
    renderVersion,
    canUndo,
    canRedo,
    hasUnsavedChanges,
    setSelectedElementId,
    setTemplateName,
    setCanvas,
    setTheme,
    setRegionEnabled,
    updateElement,
    addElement,
    duplicateElement,
    removeElement,
    moveLayer,
    toggleLayerVisibility,
    alignSelected,
    undo,
    redo,
    saveTemplate,
  }
}
