import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { motion, TargetAndTransition } from 'motion/react'
import { FocusEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { IoClose } from 'react-icons/io5'
import { MdWallet } from 'react-icons/md'
import {
  CreateWalletRequest,
  CreateWalletRequestSchema,
  Wallet,
} from '@/@types/shared'
import { FormField, Loader, Modal } from '@/components/commons'
import useWallet from '@/hooks/useWallet'
import { Route } from '@/utils/constants/routes'
import { SpendingPeriod } from '@/utils/constants/spendingPeriod'
import { cn } from '@/utils/functions'
import CountryCurrencySelector from './CountryCurrencySelector'
import SpendingPeriodRadioInput from './SpendingPeriodRadioInput'
import WalletSelector from './WalletSelector'

type WalletModalProps = {
  action?: 'create' | 'update'
  existingWallet?: Wallet
}

const WalletModal = (props: WalletModalProps) => {
  const { action = 'create', existingWallet } = props
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { useCreateWalletMutation, useUpdateWalletMutation } = useWallet()
  const createWallet = useCreateWalletMutation(createWalletSuccessCB)
  const updateWallet = useUpdateWalletMutation(updateWalletSuccessCB)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setFocus,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: getDefaultValues(existingWallet) as CreateWalletRequest,
    resolver: zodResolver(CreateWalletRequestSchema),
  })
  const numOfChars = watch('name').length
  const currency = watch('currency')

  const handleFormSubmit = handleSubmit((data: CreateWalletRequest) => {
    if (createWallet.isPending) return
    if (updateWallet.isPending) return

    if (action === 'create') {
      createWallet.mutate(data)
      return
    }

    if (existingWallet) {
      updateWallet.mutate({ id: existingWallet.id, ...data })
      return
    }
  })

  const handleCloseModal = () => {
    const lastRoute = location.state?.from

    if (lastRoute) {
      navigate(-1)
      return
    }

    navigate(Route.DASHBOARD)
  }

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

  function getDefaultValues(wallet?: Wallet) {
    if (!wallet)
      return {
        name: '',
        spendingPeriod: SpendingPeriod.Month,
        currency: undefined,
        country: undefined,
        subWalletOf: undefined,
      }

    return {
      name: wallet.name,
      spendingPeriod: wallet.spendingPeriod,
      currency: wallet.currency,
      country: wallet.country,
      subWalletOf: wallet.subWalletOf || undefined,
    }
  }

  function createWalletSuccessCB() {
    queryClient.invalidateQueries({ queryKey: ['whiscash', 'wallets'] })
    handleCloseModal()
  }

  function updateWalletSuccessCB(data: Wallet) {
    if (!existingWallet) return

    reset(getDefaultValues(data))

    queryClient.invalidateQueries({ queryKey: ['whiscash', 'wallets'] })
    handleCloseModal()
  }

  return (
    <Modal paramKey={action} paramValue="wallet">
      <motion.div
        className="h-full w-full rounded-t-2xl bg-white p-3"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
        onAnimationComplete={handleModalAnimationComplete}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={!createWallet.isPending ? handleCloseModal : undefined}
          >
            <IoClose className="h-6 w-6" />
          </button>

          <button
            type="button"
            className="grid-stack place-items-center font-bold"
            onClick={handleFormSubmit}
          >
            <Loader
              size="xs"
              color="inherit"
              className={cn(!createWallet.isPending && 'invisible')}
            />
            <p className={cn(createWallet.isPending && 'invisible')}>
              {action === 'create' ? 'Add' : 'Save'}
            </p>
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
            {action === 'create' && (
              <FormField
                label="Country & Currency"
                hasError={!!errors.country?.message}
              >
                <CountryCurrencySelector control={control} />
              </FormField>
            )}

            {currency && (
              <FormField label="Main Wallet" isOptional>
                <WalletSelector control={control} currency={currency} existingWallet={existingWallet} />
              </FormField>
            )}

            <FormField
              label="Tracking Period"
              hasError={!!errors.spendingPeriod?.message}
            >
              <div className="flex flex-wrap gap-2">
                {Object.values(SpendingPeriod).map((spendingPeriod) => (
                  <SpendingPeriodRadioInput
                    key={spendingPeriod}
                    register={register}
                    spendingPeriod={spendingPeriod}
                  />
                ))}
              </div>
            </FormField>
          </div>
        </form>
      </motion.div>
    </Modal>
  )
}

export default WalletModal
