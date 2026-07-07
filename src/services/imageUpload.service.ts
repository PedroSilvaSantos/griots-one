type UploadResult = {
  success: true
  url: string
}

export async function upload(file: File): Promise<UploadResult> {
  return {
    success: true,
    url: URL.createObjectURL(file),
  }
}
