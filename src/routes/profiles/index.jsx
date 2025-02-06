import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profiles/')({
  component: About,
})

function About() {
  return <div className="p-2">Profiles</div>
}
