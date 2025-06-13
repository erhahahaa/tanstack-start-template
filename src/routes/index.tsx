import { createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Button>
        Click Me
      </Button>
    </main>
  )
}
