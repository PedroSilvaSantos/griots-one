export async function loadImageAsset(source: File | string): Promise<HTMLImageElement> {
  const imageUrl = typeof source === 'string' ? source : URL.createObjectURL(source)

  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('asset-load-failed'))
      image.src = imageUrl
    })
  } finally {
    if (typeof source !== 'string') {
      URL.revokeObjectURL(imageUrl)
    }
  }
}
