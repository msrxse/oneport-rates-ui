import { act } from 'react-dom/test-utils'

import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useGetSpecialFilters, useGetSpecialRates } from './rates'

describe('Rates', () => {
  it('useGetSpecialRates should return correct state', async () => {
    const { result } = renderHook(() => useGetSpecialRates(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
  })

  /**
   * Need to find out how to populate the query cache beforehand!
   */
  it('useGetSpecialFilters should return correct state', async () => {
    const { result } = renderHook(() => useGetSpecialRates(), {
      wrapper: createQueryHookWrapper(),
    })
    const { result: result2 } = renderHook(() => useGetSpecialFilters(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const data = result2.current()

    expect(data).toStrictEqual([])
  })
})
