import { motion, TargetAndTransition } from 'motion/react'
import { useMemo, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { TbArrowBackUp } from 'react-icons/tb'
import { useSearchParams } from 'react-router'
import { useDebounce } from 'use-debounce'
import { CreateWalletRequest, Wallet } from '@/@types/shared'
import { Banner, Modal, SearchBar } from '@/components/commons'
import WalletTile from '@/components/Wallets/WalletTile'
import useWallet from '@/hooks/useWallet'

type WalletSelectorProps = {
  currency?: string
  control: Control<CreateWalletRequest>
  existingWallet?: Wallet
}

const WalletSelector = (props: WalletSelectorProps) => {
  const { control, currency, existingWallet } = props
  const [searchParam, setSearchParams] = useSearchParams()
  const { useGetMainWalletsQuery } = useWallet()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [debounceSearchPhrase] = useDebounce(searchPhrase, 250)
  const getWallets = useGetMainWalletsQuery({
    searchPhrase: debounceSearchPhrase,
    currency,
  })
  const { field: subWalletOfField } = useController({
    name: 'subWalletOf',
    control,
  })

  const wallets = useMemo(
    () => getWallets.data?.filter((w) => w.id !== existingWallet?.id) || [],
    [getWallets.data, existingWallet]
  )
  const selectedWallet = useMemo(
    () => wallets.find((wallet) => wallet.id === subWalletOfField.value),
    [subWalletOfField.value, wallets]
  )

  const handleOpenSelector = () => {
    searchParam.append('field', 'subWalletOf')
    setSearchParams(searchParam)
  }

  const handleCloseSelector = () => window.history.back()

  const handleClickOption = (id: number) => {
    subWalletOfField.onChange(id)
    handleCloseSelector()
  }

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '100%') setSearchPhrase('')
  }

  // display states
  const shouldDisplaySkeleton = getWallets.isPending
  const shouldDisplayWalletsData = !getWallets.isPending && wallets.length > 0
  const shouldDisplayEmptyBanner = !getWallets.isPending && wallets.length === 0

  return (
    <>
      <button
        type="button"
        onClick={handleOpenSelector}
        className="w-full rounded-lg bg-gray-100 px-3 py-2"
      >
        {subWalletOfField.value ? (
          <div className="flex items-center justify-center gap-3">
            <p>{selectedWallet?.name}</p>
          </div>
        ) : (
          'Select'
        )}
      </button>

      <Modal
        portalKey="field"
        paramKey="field"
        paramValue="subWalletOf"
        withoutBackground
      >
        <motion.div
          className="grid h-full w-full grid-rows-[auto_1fr] overflow-auto rounded-t-2xl bg-white"
          initial={{ translateY: '100%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '100%' }}
          transition={{ type: 'tween', ease: 'easeOut' }}
          onAnimationComplete={handleModalAnimationComplete}
        >
          <div className="p-3">
            <button type="button" onClick={handleCloseSelector}>
              <TbArrowBackUp className="h-6 w-6" />
            </button>

            <div className="text-center text-lg font-bold">
              Select Main Wallet
            </div>

            <SearchBar className="my-3" setValue={setSearchPhrase} />
          </div>

          <div className="grid h-full auto-rows-min gap-3 overflow-auto px-3">
            {shouldDisplaySkeleton &&
              Array.from({ length: 3 }).map((_, index) => (
                <WalletTile.Skeleton key={index} />
              ))}

            {shouldDisplayEmptyBanner && (
              <div className="flex h-[200px] w-full items-center justify-center">
                <Banner.NoWalletsFound />
              </div>
            )}

            {shouldDisplayWalletsData &&
              wallets.map((wallet) => (
                <WalletTile
                  key={wallet.id}
                  wallet={wallet}
                  onClick={() => handleClickOption(wallet.id)}
                />
              ))}
          </div>
        </motion.div>
      </Modal>
    </>
  )
}

export default WalletSelector
