import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getRatesBySpecialFilter, getSpecialRates } from '@/services/rates'
import { GetSpecialRates } from '@/types/rates'

interface RatesQueryKeyProps {
  containerSize: string
  containerType: string
}

const getRatesQueryKey = ({ containerSize, containerType }: RatesQueryKeyProps) => [
  `get_special_rates-${containerSize}-${containerType}`,
]

const useGetSpecialRates = ({ containerSize, containerType }: RatesQueryKeyProps) => {
  return useQuery({
    queryKey: getRatesQueryKey({ containerSize, containerType }),
    queryFn: () => getSpecialRates({ containerSize, containerType }),
  })
}
const useGetSpecialFilters = ({ containerSize, containerType }: RatesQueryKeyProps) => {
  const queryClient = useQueryClient()
  const getSpecialFilters = () => {
    const data: GetSpecialRates | undefined = queryClient.getQueryData(
      getRatesQueryKey({ containerSize, containerType }),
    )

    return data ? Object.keys(data.data.rates) : []
  }

  return getSpecialFilters
}

interface rateBySpecialFilterProps {
  containerSize: string
  containerType: string
  specialFilter: string
}

const getRatesBySpecialFilterQueryKey = ({
  containerSize,
  containerType,
  specialFilter,
}: rateBySpecialFilterProps) => [
  `get_rates_by_special_filter--${containerSize}-${containerType}-${specialFilter}`,
]

const useGetRateBySpecialFilter = ({
  containerSize,
  containerType,
  specialFilter,
}: rateBySpecialFilterProps) => {
  return useQuery({
    queryKey: getRatesBySpecialFilterQueryKey({ containerSize, containerType, specialFilter }),
    queryFn: () => getRatesBySpecialFilter({ containerSize, containerType, specialFilter }),
    enabled: !!specialFilter,
  })
}

export { useGetSpecialRates, useGetSpecialFilters, useGetRateBySpecialFilter }
