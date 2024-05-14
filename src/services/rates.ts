import axios from 'axios'

import { GetSpecialRates } from '@/types/rates'

export const getSpecialRates = async () => {
  const response = await axios.get<GetSpecialRates>('/get_special_rates')
  return response?.data
}
