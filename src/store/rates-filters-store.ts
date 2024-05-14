/**
 * Represents the store for managing rate filters.
 */
import { create } from 'zustand'

// Props for the RatesFilterStore.
interface RatesFilterStoreProps {
  currentRateFilter: string

  /**
   * Sets the current rate filter.
   * @param filter - The new current rate filter.
   */
  setCurrentRateFilter: (filter: string) => void
}

// Creates and initializes the RatesFilterStore.
export const useRatesFilterStore = create<RatesFilterStoreProps>((set) => ({
  currentRateFilter: '',
  setCurrentRateFilter: (filter) => set(() => ({ currentRateFilter: filter })),
}))
