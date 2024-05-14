import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getSpecialRates } from '@/services/rates'
import { GetSpecialRates } from '@/types/rates'

const ratesQueryKey = ['get_special_rates']

const useGetSpecialRates = () => {
  return useQuery({
    queryKey: ratesQueryKey,
    queryFn: getSpecialRates,
  })
}
const useGetSpecialFilters = () => {
  const queryClient = useQueryClient()
  const getSpecialFilters = () => {
    const data: GetSpecialRates | undefined = queryClient.getQueryData(ratesQueryKey)

    return data ? Object.keys(data.data.rates) : []
  }

  return getSpecialFilters
}

export { useGetSpecialRates, useGetSpecialFilters }
