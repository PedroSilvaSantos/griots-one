import { useCallback, useEffect, useRef, useState } from 'react'
import type { Experience } from '../../experience/types/experience'
import { DEFAULT_CANVAS_PRESET, type CanvasPresetId } from '../experience-engine/core/canvas-presets'
import { exportService } from '../services/exportService'

export function useExperienceTemplateEngine(experience: Experience) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [rendering, setRendering] = useState(false)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloadFileName, setDownloadFileName] = useState('')

  const revokeDownloadUrl = useCallback(() => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl('')
    }
  }, [downloadUrl])

  useEffect(() => {
    return () => {
      revokeDownloadUrl()
    }
  }, [revokeDownloadUrl])

  const generateImage = useCallback(async (options?: { preset?: CanvasPresetId }) => {
    setRendering(true)
    setError('')
    setWarning('')

    try {
      const result = await exportService.generatePng(experience, {
        preset: options?.preset ?? DEFAULT_CANVAS_PRESET,
      })
      revokeDownloadUrl()
      setDownloadUrl(result.url)
      setDownloadFileName(result.fileName)
      if (result.missingAssets.length) {
        setWarning('A imagem foi gerada, mas alguns assets não puderam ser carregados.')
      }

      const anchor = document.createElement('a')
      anchor.href = result.url
      anchor.download = result.fileName
      anchor.click()
    } catch {
      setError('Nao foi possivel gerar a imagem final.')
    } finally {
      setRendering(false)
    }
  }, [experience, revokeDownloadUrl])

  return {
    canvasRef,
    rendering,
    error,
    warning,
    downloadUrl,
    downloadFileName,
    generateImage,
  }
}
