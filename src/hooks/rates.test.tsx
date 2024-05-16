import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useGetRateBySpecialFilter, useGetSpecialFilters, useGetSpecialRates } from './rates'

describe('Rates', () => {
  const props = {
    containerSize: '20FT',
    containerType: 'dry',
    specialFilter: 'Maersk',
  }
  it('useGetSpecialRates should return correct state', async () => {
    const { result } = renderHook(() => useGetSpecialRates({ ...props }), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
  })

  /**
   * Need to find out how to populate the query cache beforehand!
   */
  it('useGetSpecialFilters should return correct state', async () => {
    const { result } = renderHook(() => useGetSpecialRates({ ...props }), {
      wrapper: createQueryHookWrapper(),
    })
    const { result: result2 } = renderHook(() => useGetSpecialFilters({ ...props }), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const data = result2.current()

    expect(data).toStrictEqual([])
  })

  it('useGetRateBySpecialFilter should return correct state', async () => {
    const { result } = renderHook(() => useGetRateBySpecialFilter({ ...props }), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
  })
})
