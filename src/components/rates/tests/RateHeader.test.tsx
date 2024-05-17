import { screen } from '@testing-library/react'

import RatesHeader from '@/components/rates/RatesHeader'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('RatesHeader', () => {
  const props = {
    rateFilters: ['MAERSK', 'MSC', 'ONE', 'ZI'],
  }
  test('should show title', async () => {
    renderWithQueryClient(<RatesHeader {...props} />)
    const button01 = screen.getByText(/20FT/)
    const button02 = screen.getByText(/DRY/)
    const button03 = screen.getByRole('button', { name: 'MAERSK' })

    expect(button01).toBeInTheDocument()
    expect(button02).toBeInTheDocument()
    expect(button03).toBeInTheDocument()
  })
})
