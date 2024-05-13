import { renderHook, waitFor } from '@testing-library/react'

import { createQueryHookWrapper } from '@/utils/test-utils'

import { useRates } from './rates'

describe('getRates', () => {
  it('should return rates', async () => {
    const { result } = renderHook(() => useRates(), {
      wrapper: createQueryHookWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(4)
  })
})
