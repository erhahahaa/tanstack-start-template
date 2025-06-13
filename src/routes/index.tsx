import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 p-4'>
      <h1 className='text-2xl font-bold'>Welcome to TanStack Start!</h1>
    </main>
  )
}
