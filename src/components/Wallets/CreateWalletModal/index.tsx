import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { FocusEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { MdWallet } from 'react-icons/md'
import { CreateWalletRequest, CreateWalletRequestSchema } from '@/@types/wallet'
import { Modal } from '@/components/commons'
import useWallet from '@/hooks/useWallet'
import CountryCurrencySelector from './CountryCurrencySelector'

const CreateWalletModal = () => {
  const { useCreateWalletMutation } = useWallet()
  const createWallet = useCreateWalletMutation()
  const { control, handleSubmit, register, setFocus, setValue, watch } =
    useForm({
      defaultValues: {
        name: '',
        defaultSpendingPeriod: undefined,
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

  useEffect(() => setFocus('name'), [setFocus])

  return (
    <Modal paramKey="create" paramValue="new">
      <motion.div
        className="h-full w-full max-w-md self-end rounded-t-2xl bg-white p-3"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
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

          <div className="mt-10 grid w-full gap-2">
            <label className="block text-sm text-gray-500">
              Country & Currency:
            </label>

            <CountryCurrencySelector control={control} />
          </div>

          {/* <div className="mt-3 grid w-full gap-2">
            <label className="block text-sm text-gray-500">
              Tracking period
            </label>
            <button
              type="button"
              className="w-full rounded-lg bg-gray-100 px-3 py-2"
            >
              Select
            </button>
            <select {...register('defaultSpendingPeriod')}>
              {Object.values(SpendingPeriod).map((spendingPeriod) => (
                <option key={spendingPeriod} value={spendingPeriod}>
                  {spendingPeriod}
                </option>
              ))}
            </select>
          </div> */}

          {/* <div className="mt-3 grid w-full gap-2">
            <label className="block text-sm text-gray-500">Main Wallet</label>
            <WalletSelector control={control} />
          </div> */}
        </form>
      </motion.div>
    </Modal>
  )
}

export default CreateWalletModal
