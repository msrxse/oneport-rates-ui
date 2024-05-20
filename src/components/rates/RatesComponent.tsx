import { useEffect } from 'react'

import RatesHeader from '@/components/rates/RatesHeader'
import Loading from '@/components/ui/loading'
import { useGetRateBySpecialFilter, useGetSpecialFilters, useGetSpecialRates } from '@/hooks/rates'
import { useRatesFilterStore } from '@/store/rates-filters-store'
import { useRatesParamsStore } from '@/store/rates-params-store'

import RateContainer from './RateContainer'
import RatesList from './RatesList'

/**
 * RatesComponent displays a list of rates based on certain parameters.
 * It fetches rates from the API and allows the user to filter and paginate through the results.
 */

const RatesComponent = () => {
  // Global State
  const containerSize = useRatesParamsStore((state) => state.containerSize)
  const containerType = useRatesParamsStore((state) => state.containerType)
  const { data } = useGetSpecialRates({
    containerSize: containerSize,
    containerType: containerType,
  })
  // Custom hook functions
  const setCurrentRateFilter = useRatesFilterStore((state) => state.setCurrentRateFilter)
  const currentRateFilter = useRatesFilterStore((state) => state.currentRateFilter)
  const {
    isLoading,
    isError,
    error,
    data: ratesBySpecialFilter,
  } = useGetRateBySpecialFilter({
    containerSize: containerSize,
    containerType: containerType,
    specialFilter: currentRateFilter,
  })

  const getSpecialFilters = useGetSpecialFilters({
    containerSize: containerSize,
    containerType: containerType,
  })

  /**
   * We want to mark the first filter as active just once
   *  - When success data is fetched
   *  - and only the first time - when currentRateFilter is empty string
   */
  useEffect(() => {
    if (data?.status === 'success' && data?.data.rates && currentRateFilter === '') {
      setCurrentRateFilter(getSpecialFilters()[0])
    }
  }, [currentRateFilter, data?.data.rates, data?.status, getSpecialFilters, setCurrentRateFilter])

  if (isError) {
    return <span>Error: {error?.message}</span>
  }

  return (
    <>
      {/* Render the rates header */}
      <RatesHeader rateFilters={getSpecialFilters()} />

      {/* Render loading spinner or rates */}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div>
          <RateContainer>
            {ratesBySpecialFilter?.data.total_rates === 0 ? (
              <p>No Rates to Display</p>
            ) : (
              <RatesList rates={ratesBySpecialFilter ? ratesBySpecialFilter.data.rates : []} />
            )}
          </RateContainer>
        </div>
      )}
    </>
  )
}

export default RatesComponent
