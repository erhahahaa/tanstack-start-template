import { createFileRoute, Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
export const Route = createFileRoute('/')({
  loader: () => ({
    logo: 'https://avatars.githubusercontent.com/u/72518640?s=200&v=4',
    repo: 'https://github.com/TanStack/router/tree/main/examples/react/start-bare',
    docs: 'https://tanstack.com/start/latest',
  }),
  component: RouteComponent,
})
function RouteComponent() {
  const { logo, repo, docs } = Route.useLoaderData()

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 p-4'>
      <img src={logo} className='size-32 rounded-full' alt='Tanstack start logo' />
      <h1 className='text-3xl font-bold mt-4'>Tanstack Start is Cool😎</h1>
      <p className='text-foreground/50'>
        This project is forking from
        <Link to={repo} className={cn(buttonVariants({ variant: 'link' }), "p-0 pl-1")}>Tanstack Start Example</Link>
      </p>
      <Link to={docs} className={buttonVariants()}>
        Check out the their docs <ExternalLinkIcon />
      </Link>
    </main>
  )
}
