import { UseFormRegister } from 'react-hook-form'
import { CreateWalletRequest } from '@/@types/wallet'
import {
  SPENDING_PERIOD_INPUT_LABELS,
  SpendingPeriod,
} from '@/utils/constants/spendingPeriod'

type SpendingPeriodRadioInputprops = {
  register: UseFormRegister<CreateWalletRequest>
  spendingPeriod: SpendingPeriod
}

const SpendingPeriodRadioInput = (props: SpendingPeriodRadioInputprops) => {
  const { register, spendingPeriod } = props
  return (
    <label className="relative rounded-lg bg-gray-100 px-3 py-0.5 transition-colors has-checked:bg-gray-500 has-checked:text-white">
      <input
        {...register('spendingPeriod')}
        type="radio"
        value={spendingPeriod}
        className="absolute hidden"
      />
      {SPENDING_PERIOD_INPUT_LABELS[spendingPeriod]}
    </label>
  )
}

export default SpendingPeriodRadioInput
