import { useParams } from 'react-router-dom'
import { ExperienceForm } from '../features/experience/components/ExperienceForm'
import { ImageUploader } from '../features/image-upload/components/ImageUploader'

export function ExperienceBuilder() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <ExperienceForm experienceId={id} />
      <ImageUploader />
    </>
  )
}
