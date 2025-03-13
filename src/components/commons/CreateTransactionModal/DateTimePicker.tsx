import { DateTime } from 'luxon'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { CreateTransactionRequest } from '@/@types/shared'

type DateTimePickerProps = {
  register: UseFormRegister<CreateTransactionRequest>
  watch: UseFormWatch<CreateTransactionRequest>
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const { register, watch } = props
  const value = watch('paidAt')
  const displayLabel = DateTime.fromISO(value || '').toFormat(
    'ccc, d LLL y, h:mm a'
  )

  const handleOpenDatePicker = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const dateInput = e.currentTarget.previousElementSibling as HTMLInputElement
    dateInput.showPicker()
  }

  return (
    <div className="grid-stack">
      <input
        type="datetime-local"
        className="pointer-events-none"
        {...register('paidAt')}
      />

      <button
        type="button"
        className="w-full rounded-lg bg-gray-100 px-3 py-2"
        onClick={handleOpenDatePicker}
      >
        {value ? displayLabel : 'Now'}
      </button>
    </div>
  )
}

export default DateTimePicker
