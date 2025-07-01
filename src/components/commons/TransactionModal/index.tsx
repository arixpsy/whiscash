import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { motion, TargetAndTransition } from 'motion/react'
import { useForm } from 'react-hook-form'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import {
  CreateTransactionRequest,
  CreateTransactionRequestSchema,
  GetDashboardWalletsResponse,
  Transaction,
  TransactionWithWallet,
} from '@/@types/shared'
import { FormField, Loader, Modal } from '@/components/commons'
import useTransaction from '@/hooks/useTransaction'
import { QUERY_KEYS } from '@/utils/constants/queryKey'
import { Route } from '@/utils/constants/routes'
import { cn } from '@/utils/functions'
import CategorySelector from './CategorySelector'
import DateTimePicker from './DateTimePicker'
import TransactionAmountInput from './TransactionAmountInput'
import WalletSelector from './WalletSelector'
import Camera from './Camera'

type TransactionModalProps = {
  action?: 'create' | 'update'
  walletId: number
  mainWalletId: number | null
  currency: string
  existingTransaction?: TransactionWithWallet
}

const TransactionModal = (props: TransactionModalProps) => {
  const {
    action = 'create',
    mainWalletId,
    walletId,
    currency,
    existingTransaction,
  } = props
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParam, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const { useCreateTransactionMutation, useUpdateTransactionMutation } =
    useTransaction()
  const createTransaction = useCreateTransactionMutation(
    createTransactionSuccessCB
  )
  const updateTransaction = useUpdateTransactionMutation(
    updateTransactionSuccessCB
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
    defaultValues: getDefaultValues(
      existingTransaction
    ) as CreateTransactionRequest,
    resolver: zodResolver(CreateTransactionRequestSchema),
  })
  const formWalletId = watch('walletId')

  const handleFormSubmit = handleSubmit((data: CreateTransactionRequest) => {
    if (createTransaction.isPending) return
    if (updateTransaction.isPending) return

    if (data.paidAt) {
      const paidAtJSDate = DateTime.fromJSDate(new Date(data.paidAt))
        .toUTC()
        .toISO()
      data.paidAt = paidAtJSDate || undefined
    } else {
      data.paidAt = undefined
    }

    if (action === 'create') {
      createTransaction.mutate(data)
      return
    }

    if (existingTransaction) {
      updateTransaction.mutate({ id: existingTransaction.id, ...data })
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

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '0%') setFocus('amount')
    if (translateY === '100%') reset()
  }

  const handleOpenCamera = () => {
    searchParam.append('field', 'camera')
    setSearchParams(searchParam)
  }

  function getDefaultValues(transaction?: TransactionWithWallet) {
    if (!transaction)
      return {
        amount: 1,
        category: undefined,
        description: '',
        paidAt: undefined,
        walletId,
      }

    // TODO: change toLocal() to toZone()
    return {
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      paidAt: DateTime.fromISO(transaction.paidAt.replace(' ', 'T'), {
        zone: 'utc',
      })
        .toLocal()
        .toFormat("yyyy-MM-dd'T'HH:mm"),
      walletId: transaction.walletId,
    }
  }

  function createTransactionSuccessCB(data: Transaction) {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(formWalletId.toString()),
    })

    if (mainWalletId) {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(mainWalletId.toString()),
      })
    }

    queryClient.setQueryData(
      ['whiscash', 'wallets', 'dashboard'],
      (current: GetDashboardWalletsResponse) => {
        const walletIndex = current.findIndex((w) => w.id === data.walletId)

        current[walletIndex].spendingPeriodTotal += data.amount

        if (mainWalletId) {
          const mainWalletIndex = current.findIndex(
            (w) => w.id === mainWalletId
          )
          current[mainWalletIndex].spendingPeriodTotal += data.amount
        }

        return current
      }
    )

    handleCloseModal()
  }

  function updateTransactionSuccessCB(data: Transaction) {
    if (!existingTransaction) return

    reset(
      getDefaultValues({
        ...data,
        currency: existingTransaction.currency,
        country: existingTransaction.country,
        name: existingTransaction.name,
        subWalletOf: existingTransaction.subWalletOf,
      })
    )

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(formWalletId.toString()),
    })

    if (mainWalletId) {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WALLET_TRANSACTIONS(mainWalletId.toString()),
      })
    }

    queryClient.invalidateQueries({
      queryKey: ['whiscash', 'wallets', 'dashboard'],
    })

    if (existingTransaction) {
      queryClient.invalidateQueries({
        queryKey: [
          'whiscash',
          'transactions',
          existingTransaction.id.toString(),
        ],
      })
    }

    handleCloseModal()
  }

  return (
    <>
      <Modal paramKey={action} paramValue="transaction">
        <motion.div
          className="grid h-full w-full grid-rows-[auto_1fr] overflow-auto rounded-t-2xl bg-white"
          initial={{ translateY: '100%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '100%' }}
          transition={{ type: 'tween', ease: 'easeOut' }}
          onAnimationComplete={handleModalAnimationComplete}
        >
          <div className="flex items-center justify-between p-3">
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
                className={cn(
                  !(
                    createTransaction.isPending || updateTransaction.isPending
                  ) && 'invisible'
                )}
              />
              <p
                className={cn(
                  (createTransaction.isPending ||
                    updateTransaction.isPending) &&
                    'invisible'
                )}
              >
                {action === 'create' ? 'Add' : 'Save'}
              </p>
            </button>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="grid auto-rows-min justify-items-center overflow-auto p-3"
          >
            <FaFileInvoiceDollar
              className="text-primary-300 mb-3 h-16 w-16"
              onClick={handleOpenCamera}
            />

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

              <FormField
                label="Payment made on"
                hasError={!!errors.paidAt?.message}
              >
                <DateTimePicker register={register} watch={watch} />
              </FormField>

              <FormField label="Wallet" hasError={!!errors.walletId?.message}>
                <WalletSelector control={control} />
              </FormField>
            </div>
          </form>
        </motion.div>
      </Modal>

      <Camera />
    </>
  )
}

export default TransactionModal
