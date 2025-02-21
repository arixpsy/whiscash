import { motion } from 'motion/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/commons'
import useWallet from '@/hooks/useWallet'
import { IoClose } from 'react-icons/io5'
import { SpendingPeriod } from '@/utils/constants/spendingPeriod'
import { CreateWalletRequest, CreateWalletRequestSchema } from '@/@types/wallet'
import { MdWallet } from 'react-icons/md'
import { useSearchParams } from 'react-router'

const CreateWalletModal = () => {
  const { useCreateWalletMutation, useGetWalletsQuery } = useWallet()
  const wallets = useGetWalletsQuery()
  const createWallet = useCreateWalletMutation()
  // TODO: form hook

  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(CreateWalletRequestSchema),
  })

  const handleFormSubmit = handleSubmit((data: CreateWalletRequest) => {
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
            <IoClose className="h-8 w-8 text-gray-500" />
          </button>
          <div className="font-bold text-gray-500" onClick={handleFormSubmit}>
            Create
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="grid place-items-center">
          <MdWallet className="text-primary-300 h-20 w-20" />
          <input type="text" placeholder="New Wallet" {...register('name')} className='w-min' />
          <Controller
            control={control}
            name="currency"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <CurrencySelector />
            )}
          />
          <select {...register('defaultSpendingPeriod')}>
            {Object.values(SpendingPeriod).map((spendingPeriod) => (
              <option key={spendingPeriod} value={spendingPeriod}>
                {spendingPeriod}
              </option>
            ))}
          </select>
          {/* <select {...register('subWalletOf')}>
            {wallets.data?.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </select> */}

          <input type="submit" />
        </form>
      </motion.div>
    </Modal>
  )
}

const CurrencySelector = () => {
  const [searchParam, setSearchParams] = useSearchParams()

  const handleClickAddButton = () => {
    searchParam.append('field', 'currency')
    setSearchParams(searchParam)
  }

  return (
    <>
      <button type="button" onClick={handleClickAddButton}>
        Open
      </button>
      <Modal portalKey="field" paramKey="field" paramValue="currency">
        <motion.div
          className="h-40 w-full max-w-md self-end rounded-t-2xl bg-white p-3"
          initial={{ translateY: '100%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '100%' }}
          transition={{ type: 'tween', ease: 'easeOut' }}
        >
          Select Currency
        </motion.div>
      </Modal>
    </>
  )
}

export default CreateWalletModal
