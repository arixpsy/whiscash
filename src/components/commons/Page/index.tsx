import { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/utils/functions'

type PageProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>

const Page = (props: PageProps) => {
  const { children, className } = props

  return (
    <div
      className={cn(
        'relative m-auto min-h-svh max-w-md bg-white text-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Page
