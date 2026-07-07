import { useParams } from 'react-router-dom'
import { ExperienceForm } from '../features/experience/components/ExperienceForm'

export function ExperienceBuilder() {
  const { id } = useParams<{ id: string }>()

  return <ExperienceForm experienceId={id} />
}
