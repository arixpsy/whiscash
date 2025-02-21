import { Currency, getAllISOCodes, getParamByISO } from 'iso-country-currency'
import { motion } from 'motion/react'
import { useCallback, useMemo } from 'react'
import { Control, useController } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { TbArrowBackUp } from 'react-icons/tb'
import { useSearchParams } from 'react-router'
import { CreateWalletRequest } from '@/@types/wallet'
import { Modal } from '@/components/commons'
import 'country-flag-icons/3x2/flags.css'

type CountryCurrencySelectorProps = {
  control: Control<CreateWalletRequest>
}

const CountryCurrencySelector = (props: CountryCurrencySelectorProps) => {
  const { control } = props
  const [searchParam, setSearchParams] = useSearchParams()
  const { field: countryField } = useController({
    name: 'country',
    control,
  })
  const { field: currencyField } = useController({
    name: 'currency',
    control,
  })

  const handleOpenSelector = () => {
    searchParam.append('field', 'currency')
    setSearchParams(searchParam)
  }

  const handleCloseSelector = () => window.history.back()

  const handleSelectOption = useCallback(
    (currency: Currency) => {
      countryField.onChange(currency.iso)
      currencyField.onChange(currency.currency)
      handleCloseSelector()
    },
    [countryField, currencyField]
  )

  const options = useMemo(
    () =>
      getAllISOCodes().map((option) => (
        <button
          type="button"
          key={option.iso}
          className="flex items-center gap-3"
          onClick={() => handleSelectOption(option)}
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gray-200 p-2">
            <div
              className={`flag:${option.iso}`}
              style={
                { '--CountryFlagIcon-height': '21.33px' } as React.CSSProperties
              }
            />
          </div>
          <div className="flex w-full justify-between gap-3">
            <p className="text-left">{option.countryName}</p>
            <b>{option.currency}</b>
          </div>
        </button>
      )),
    [handleSelectOption]
  )

  return (
    <>
      {/* TODO: */}
      <button
        type="button"
        onClick={handleOpenSelector}
        className="w-full rounded-lg bg-gray-100 px-3 py-2"
      >
        {countryField.value && currencyField.value
          ? `${getParamByISO(countryField.value, 'countryName')} - ${currencyField.value}`
          : 'Select'}
      </button>

      <Modal portalKey="field" paramKey="field" paramValue="currency">
        <motion.div
          className="grid h-full w-full max-w-md grid-rows-[auto_auto_auto_1fr] self-end overflow-auto rounded-t-2xl bg-white p-3"
          initial={{ translateY: '100%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '100%' }}
          transition={{ type: 'tween', ease: 'easeOut' }}
        >
          <button type="button" onClick={handleCloseSelector}>
            <TbArrowBackUp className="h-6 w-6" />
          </button>

          <div className="text-center text-lg font-bold">Select Currency</div>

          {/* TODO: extract to component */}
          <div className="my-3 flex h-10 items-center gap-3 rounded-full bg-gray-100 px-3 text-gray-500">
            <FaSearch /> Search
          </div>

          <div className="grid h-full gap-3 overflow-auto">{options}</div>
        </motion.div>
      </Modal>
    </>
  )
}

export default CountryCurrencySelector
