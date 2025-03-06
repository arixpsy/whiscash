import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { motion, TargetAndTransition } from 'motion/react'
import { useForm } from 'react-hook-form'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import {
  CreateTransactionRequest,
  CreateTransactionRequestSchema,
  GetDashboardWalletsResponse,
  Transaction,
} from '@/@types/shared'
import { FormField, Loader, Modal } from '@/components/commons'
import useTransaction from '@/hooks/useTransaction'
import { cn } from '@/utils/functions'
import CategorySelector from './CategorySelector'
import TransactionAmountInput from './TransactionAmountInput'
import WalletSelector from './WalletSelector'

type CreateTransactionModalProps = {
  walletId: number
  currency: string
}

const CreateTransactionModal = (props: CreateTransactionModalProps) => {
  const { walletId, currency } = props
  const queryClient = useQueryClient()
  const { useCreateTransactionMutation } = useTransaction()
  const createTransaction = useCreateTransactionMutation(
    createTransactionSuccessCB
  )
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setFocus,
    watch,
  } = useForm({
    defaultValues: {
      amount: 1,
      category: undefined,
      description: '',
      paidAt: undefined,
      walletId,
    },
    resolver: zodResolver(CreateTransactionRequestSchema),
  })
  const formWalletId = watch('walletId')

  const handleFormSubmit = handleSubmit((data: CreateTransactionRequest) => {
    if (createTransaction.isPending) return
    createTransaction.mutate(data)
  })

  const handleCloseModal = () => window.history.back()

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '0%') setFocus('amount')
    if (translateY === '100%') reset()
  }

  function createTransactionSuccessCB(data: Transaction) {
    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'transactions', formWalletId.toString()],
    })
    queryClient.setQueryData(
      ['whiscash', 'wallets', 'dashboard'],
      (current: GetDashboardWalletsResponse) => {
        // TODO: update dashboard wallet amount if paidAt falls under period
        // TODO: update dashboard main wallet amount if paidAt falls under peroid
        const walletIndex = current.findIndex((w) => w.id === data.walletId)
        current[walletIndex].spendingPeriodTotal += data.amount
        return current
      }
    )
    handleCloseModal()
  }

  return (
    <Modal paramKey="create" paramValue="transaction">
      <motion.div
        className="h-full w-full rounded-t-2xl bg-white p-3"
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
            className="grid-stack place-items-center font-bold"
            onClick={handleFormSubmit}
          >
            <Loader
              size="xs"
              color="inherit"
              className={cn(!createTransaction.isPending && 'invisible')}
            />
            <p className={cn(createTransaction.isPending && 'invisible')}>
              Add
            </p>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="grid place-items-center">
          <FaFileInvoiceDollar className="text-primary-300 mt-9 mb-3 h-16 w-16" />

          <TransactionAmountInput
            register={register}
            currency={currency}
            handleFocus={() => setFocus('amount')}
            watch={watch}
          />

          <div className="mt-6 grid w-full gap-4">
            <FormField
              label="Description"
              hasError={!!errors.description?.message}
            >
              <input
                {...register('description')}
                className="w-full rounded-lg bg-gray-100 px-3 py-2 outline-none"
                autoComplete="off"
              />
            </FormField>

            <FormField label="Category" hasError={!!errors.category?.message}>
              <CategorySelector control={control} />
            </FormField>

            {/* TODO: */}
            {/* <FormField
              label="Payment made on"
              hasError={!!errors.paidAt?.message}
            >
              <button
                type="button"
                className="w-full rounded-lg bg-gray-100 px-3 py-2"
              >
                Select
              </button>
            </FormField> */}

            <FormField label="Wallet" hasError={!!errors.walletId?.message}>
              <WalletSelector control={control} />
            </FormField>
          </div>
        </form>
      </motion.div>
    </Modal>
  )
}

export default CreateTransactionModal
