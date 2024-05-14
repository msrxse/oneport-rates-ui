import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useGetSpecialRates } from './rates'

describe('getSpecialRates', () => {
  it('should return special rates', async () => {
    const { result } = renderHook(() => useGetSpecialRates(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.message).toBe('special rates successfully fetched')
  })
})
