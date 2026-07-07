export const ACCEPTED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'] as const
export const ACCEPTED_IMAGE_MIME_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'] as const
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024

export function validateImageExtension(fileName: string): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? ''
  return ACCEPTED_IMAGE_EXTENSIONS.includes(extension as (typeof ACCEPTED_IMAGE_EXTENSIONS)[number])
}

export function validateImageMimeType(mimeType: string): boolean {
  return ACCEPTED_IMAGE_MIME_TYPES.includes(mimeType as (typeof ACCEPTED_IMAGE_MIME_TYPES)[number])
}

export function validateImageMaxSize(fileSize: number, maxSizeBytes = MAX_IMAGE_SIZE_BYTES): boolean {
  return fileSize <= maxSizeBytes
}

export function validateImageFile(file: File): string | null {
  if (!validateImageExtension(file.name)) {
    return 'Extensao invalida. Use PNG, JPG, JPEG ou WEBP.'
  }

  if (!validateImageMimeType(file.type)) {
    return 'Tipo de arquivo invalido. Envie PNG, JPG, JPEG ou WEBP.'
  }

  if (!validateImageMaxSize(file.size)) {
    return 'Arquivo muito grande. O limite e de 10MB.'
  }

  return null
}
