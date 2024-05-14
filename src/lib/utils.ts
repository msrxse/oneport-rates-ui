import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Rate } from '@/types/rates'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getRateFilters(rates: Rate[]) {
  // Create a Set to store unique carrier names
  const uniqueCarrierNames = new Set()

  // Iterate over the rates and add each name to the Set
  rates.forEach((rate) => {
    uniqueCarrierNames.add(rate.carrier_name)
    // console.log(uniqueCarrierNames);
  })

  // Convert the Set back to an array
  const uniqueCarrierNamesArray = [...uniqueCarrierNames]

  return uniqueCarrierNamesArray
}

export { cn, getRateFilters }
