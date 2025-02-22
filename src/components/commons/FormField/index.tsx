import { motion } from 'motion/react'
import { PropsWithChildren, HTMLAttributes } from 'react'
import { MdOutlineError } from 'react-icons/md'
import { cn } from '@/utils/functions'

type FormFieldProps = {
  label: string
  hasError?: boolean
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>

const FormField = (props: FormFieldProps) => {
  const { children, hasError, label, className } = props

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex justify-between">
        <label
          className={cn(
            'text-sm font-bold transition-colors',
            !!hasError && 'text-red-400'
          )}
        >
          {label}
        </label>

        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MdOutlineError className="h-5 w-5 text-red-400" />
          </motion.div>
        )}
      </div>

      {children}
    </div>
  )
}

export default FormField
