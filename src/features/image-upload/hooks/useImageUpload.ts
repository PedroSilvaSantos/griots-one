import { useCallback, useEffect, useState } from 'react'
import { upload } from '../../../services/imageUpload.service'
import { validateImageFile } from '../imageValidation'

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const removeImage = useCallback(() => {
    setFile(null)
    setError('')

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setPreview('')
  }, [preview])

  const selectImage = useCallback(
    async (nextFile: File) => {
      const validationError = validateImageFile(nextFile)

      if (validationError) {
        setError(validationError)
        return
      }

      setLoading(true)
      setError('')

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      try {
        const result = await upload(nextFile)

        setFile(nextFile)
        setPreview(result.url)
      } catch {
        setError('Nao foi possivel carregar a imagem.')
      } finally {
        setLoading(false)
      }
    },
    [preview],
  )

  const reset = useCallback(() => {
    removeImage()
    setLoading(false)
  }, [removeImage])

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  return {
    file,
    preview,
    error,
    loading,
    selectImage,
    removeImage,
    reset,
  }
}
