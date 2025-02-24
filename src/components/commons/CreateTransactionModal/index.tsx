import { zodResolver } from '@hookform/resolvers/zod'
import { motion, TargetAndTransition } from 'motion/react'
import { useForm } from 'react-hook-form'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import {
  CreateTransactionRequest,
  CreateTransactionRequestSchema,
} from '@/@types/transaction'
import { FormField, Modal } from '@/components/commons'
import TransactionAmountInput from './TransactionAmountInput'

type CreateTransactionModalProps = {
  walletId: number
  currency: string
}

const CreateTransactionModal = (props: CreateTransactionModalProps) => {
  const { walletId, currency } = props
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setFocus,
    watch,
  } = useForm({
    defaultValues: {
      amount: 1,
      walletId,
    },
    resolver: zodResolver(CreateTransactionRequestSchema),
  })

  const handleFormSubmit = handleSubmit((data: CreateTransactionRequest) => {
    // TODO:
    console.log(data)
    // if (createWallet.isPending) return
    // createWallet.mutate(data)
  })

  const handleCloseModal = () => window.history.back()

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '0%') setFocus('amount')
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
            className="grid-stack place-items-center font-bold"
            onClick={handleFormSubmit}
          >
            {/* TODO: */}
            {/* <Loader
              size="xs"
              color="inherit"
              className={cn('invisible')}
            /> */}
            <p>Add</p>
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
            {/* TODO: */}
            <FormField
              label="Category"
              hasError={!!errors.category?.message}
            ></FormField>

            <FormField label="Description" isOptional>
              <input
                {...register('description')}
                className="w-full rounded-lg bg-gray-100 px-3 py-2 outline-none"
                autoComplete="off"
              />
            </FormField>

            {/* TODO: */}
            <FormField
              label="Payment made on"
              hasError={!!errors.paidAt?.message}
            >
              <button
                type="button"
                className="w-full rounded-lg bg-gray-100 px-3 py-2"
              >
                Select
              </button>
            </FormField>

            {/* TODO: */}
            <FormField label="Wallet" hasError={!!errors.walletId?.message}>
              <button
                type="button"
                className="w-full rounded-lg bg-gray-100 px-3 py-2"
              >
                Select
              </button>
            </FormField>
          </div>
        </form>
      </motion.div>
    </Modal>
  )
}

export default CreateTransactionModal
