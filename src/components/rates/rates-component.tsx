import { useEffect, useState } from 'react'

import axios from 'axios'

import RatesHeader from '@/components/rates/rates-header'
import Loading from '@/components/ui/loading'
import { useGetSpecialFilters, useGetSpecialRates } from '@/hooks/rates'
import { getRateFilters } from '@/lib/utils'
import { useRatesFilterStore } from '@/store/rates-filters-store'
import { useRatesParamsStore } from '@/store/rates-params-store'
import { useRatesStore } from '@/store/rates-store'

import RateContainer from './rate-container'
import RatesList from './rates-list'

/**
 * RatesComponent displays a list of rates based on certain parameters.
 * It fetches rates from the API and allows the user to filter and paginate through the results.
 */

const RatesComponent = () => {
  // State variables
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const [noOfRates, setNoOfRates] = useState(9)

  // Global State
  const { isLoading, error, data } = useGetSpecialRates()
  // Custom hook variables
  // const containerSize = useRatesParamsStore((state) => state.containerSize)
  // const containerType = useRatesParamsStore((state) => state.containerType)
  const CurrentRateFilter = useRatesFilterStore((state) => state.currentRateFilter)
  const rateStore = useRatesStore((state) => state.rates)
  // const rateFilters = useRatesFilterStore((state) => state.rateFilters)
  const getSpecialFilters = useGetSpecialFilters()

  // Custom hook functions
  const setCurrentRateFilter = useRatesFilterStore((state) => state.setCurrentRateFilter)
  const currentRateFilter = useRatesFilterStore((state) => state.currentRateFilter)
  // const setRatesStore = useRatesStore((state) => state.setRates)
  // const setRateFilters = useRatesFilterStore((state) => state.setRateFilters)

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

  // Filter and paginate rates
  const filteredRates = rateStore.filter((rate) => {
    return rate.carrier_name === CurrentRateFilter
  })

  const paginatedRates = filteredRates.slice(0, noOfRates)

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
            {paginatedRates.length === 0 ? (
              <p>No Rates to Display</p>
            ) : (
              <RatesList rates={paginatedRates} />
            )}
          </RateContainer>

          {/* Render show more/less button */}
          {paginatedRates.length >= 9 && (
            <div className="mt-10">
              <p className="text-center mb-4 text-sm text-custom-black">
                Viewing {paginatedRates.length} of {filteredRates.length} special rates
              </p>
              {paginatedRates.length <= 9 ? (
                <button
                  className="border-solid flex px-12 mx-auto border-[1px] border-[#374151] rounded py-3"
                  onClick={() => {
                    setNoOfRates(rateStore.length)
                  }}
                >
                  Show All
                </button>
              ) : (
                <button
                  className="border-solid flex px-12 mx-auto border-[1px] border-[#374151] rounded py-3"
                  onClick={() => {
                    setNoOfRates(9)
                  }}
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RatesComponent
