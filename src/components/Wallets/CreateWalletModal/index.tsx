import { zodResolver } from '@hookform/resolvers/zod'
import { motion, TargetAndTransition } from 'motion/react'
import { FocusEvent } from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { MdWallet } from 'react-icons/md'
import { CreateWalletRequest, CreateWalletRequestSchema } from '@/@types/wallet'
import { FormField, Modal } from '@/components/commons'
import useWallet from '@/hooks/useWallet'
import { SpendingPeriod } from '@/utils/constants/spendingPeriod'
import CountryCurrencySelector from './CountryCurrencySelector'
import SpendingPeriodRadioInput from './SpendingPeriodRadioInput'

const CreateWalletModal = () => {
  const { useCreateWalletMutation } = useWallet()
  const createWallet = useCreateWalletMutation()
  const {
    control,
    handleSubmit,
    register,
    setFocus,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      defaultSpendingPeriod: SpendingPeriod.Month,
      currency: undefined,
      country: undefined,
      subWalletOf: undefined,
    },
    resolver: zodResolver(CreateWalletRequestSchema),
  })
  const numOfChars = watch('name').length

  const handleFormSubmit = handleSubmit((data: CreateWalletRequest) => {
    // TODO:
    console.log(data)

    createWallet.mutate({
      name: 'Wallet',
      currency: 'SGD',
      defaultSpendingPeriod: 'MONTH',
      country: 'SG',
      subWalletOf: undefined,
    })
  })

  const handleCloseModal = () => window.history.back()

  const handleNameInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      setValue('name', 'New Wallet')
    }
  }

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '0%') setFocus('name')
    if (translateY === '100%') reset()
  }

  return (
    <Modal paramKey="create" paramValue="new">
      <motion.div
        className="h-full w-full max-w-md self-end rounded-t-2xl bg-white p-3"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
        onAnimationComplete={handleModalAnimationComplete}
      >
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleCloseModal}>
            <IoClose className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="font-bold"
            onClick={handleFormSubmit}
          >
            Create
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="grid place-items-center">
          <MdWallet className="text-primary-300 my-3 h-20 w-20" />

          <div>
            <input
              id="wallet-name"
              type="text"
              placeholder="New Wallet"
              className="peer w-min text-center text-lg font-bold outline-none placeholder:text-gray-300"
              autoComplete="off"
              {...register('name', { onBlur: handleNameInputBlur })}
            />
            <p className="hidden text-center text-sm text-gray-300 peer-focus:block">{`${numOfChars} / 50`}</p>
            <label
              className="block text-center text-sm text-gray-300 peer-focus:hidden"
              htmlFor="wallet-name"
            >
              Tap to rename
            </label>
          </div>

          <div className="mt-12 grid w-full gap-4">
            <FormField
              label="Country & Currency"
              hasError={!!errors.country?.message}
            >
              <CountryCurrencySelector control={control} />
            </FormField>

            <FormField
              label="Tracking Period"
              hasError={!!errors.defaultSpendingPeriod?.message}
            >
              <div className="flex flex-wrap gap-2">
                {Object.values(SpendingPeriod).map((spendingPeriod) => (
                  <SpendingPeriodRadioInput
                    register={register}
                    spendingPeriod={spendingPeriod}
                  />
                ))}
              </div>
            </FormField>

            <FormField label="Main Wallet"></FormField>
          </div>
        </form>
      </motion.div>
    </Modal>
  )
}

export default CreateWalletModal
