import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profiles/$profileId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Custom Profile</div>
}
