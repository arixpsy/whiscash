import { UseFormRegister, UseFormSetFocus, UseFormWatch } from 'react-hook-form'
import { CreateTransactionRequest } from '@/@types/transaction'

type TransactionAmountInputProps = {
  currency: string
  handleFocus: UseFormSetFocus<CreateTransactionRequest>
  register: UseFormRegister<CreateTransactionRequest>
  watch: UseFormWatch<CreateTransactionRequest>
}

const TransactionAmountInput = (props: TransactionAmountInputProps) => {
  const { currency, handleFocus, register, watch } = props
  const amountValue = watch('amount')

  const handleFocusInput = () => handleFocus('amount')

  return (
    <div onClick={handleFocusInput}>
      <div className="peer mb-1 rounded-full bg-gray-100">
        <div className="flex h-[60px] min-w-[200px] items-center justify-center gap-1 px-3 text-2xl font-bold">
          <input
            id="transaction-amount"
            type="number"
            className="min-w-[5px] text-right outline-none"
            style={{ width: `${amountValue.toString().length + 0.4}ch` }}
            {...register('amount', {
              valueAsNumber: true,
            })}
          />
          {currency}
        </div>
      </div>
      <p className="hidden text-center text-sm text-gray-300 peer-focus-within:block">
        Enter amount
      </p>
      <label
        className="block text-center text-sm text-gray-300 peer-focus-within:hidden"
        htmlFor="transaction-amount"
      >
        Tap to change amount
      </label>
    </div>
  )
}

export default TransactionAmountInput
