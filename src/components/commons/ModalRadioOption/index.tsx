import { cn } from '@/utils/functions'

type ModalRadioOption = {
  isSelected: boolean
  label: string
  onClick: () => void
}

const ModalRadioOption = (props: ModalRadioOption) => {
  const { isSelected, label, onClick } = props

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-between rounded-lg border border-gray-300 p-3 capitalize'
      )}
    >
      {label.toLowerCase()}

      <div className="grid h-5 w-5 place-items-center rounded-full border border-gray-200">
        <div
          className={cn(
            'bg-primary-500 grid h-full w-full scale-0 place-items-center rounded-full transition-transform',
            isSelected && 'scale-100'
          )}
        >
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  )
}

export default ModalRadioOption
