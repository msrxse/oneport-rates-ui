import axios from 'axios'

import { Rate } from '@/types/rates'

export const getRates = async () => {
  const response = await axios.get<Rate[]>('/rate')
  return response?.data
}
