import axios from 'axios'

import { GetRates, GetSpecialRates } from '@/types/rates'

interface RatesQueryKeyProps {
  containerSize: string
  containerType: string
}

const getSpecialRates = async ({ containerSize, containerType }: RatesQueryKeyProps) => {
  const response = await axios.get<GetSpecialRates>('/get_special_rates', {
    params: {
      container_size: containerSize,
      container_type: containerType,
    },
  })
  return response?.data
}

interface rateBySpecialFilterProps {
  containerSize: string
  containerType: string
  specialFilter: string
}

const getRatesBySpecialFilter = async ({
  containerSize,
  containerType,
  specialFilter,
}: rateBySpecialFilterProps) => {
  const response = await axios.get<GetRates>('/get_rates', {
    params: {
      container_size: containerSize,
      container_type: containerType,
      special_filter: specialFilter,
    },
  })
  return response?.data
}

export { getSpecialRates, getRatesBySpecialFilter }
