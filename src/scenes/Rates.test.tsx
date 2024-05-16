import { renderWithQueryClient } from '@/utils/test-utils'

import Rates from './Rates'

describe('App', () => {
  test('should show title', async () => {
    const result = renderWithQueryClient(<Rates />)
    const team01 = await result.findByText(/Special Rates/i)
    expect(team01).toBeInTheDocument()
  })
})
