import { screen } from '@testing-library/react'

import RatesFilter from '@/components/rates/rates-filter'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('RatesFilter', () => {
  const props = {
    filters: ['MAERSK', 'MSC', 'ONE', 'ZI'],
  }

  test('should show passed filters', async () => {
    renderWithQueryClient(<RatesFilter {...props} />)
    const button01 = screen.getByRole('button', { name: 'MAERSK' })
    const button02 = screen.getByRole('button', { name: 'MSC' })
    const button03 = screen.getByRole('button', { name: 'ONE' })
    const button04 = screen.getByRole('button', { name: 'ZI' })

    expect(button01).toBeInTheDocument()
    expect(button02).toBeInTheDocument()
    expect(button03).toBeInTheDocument()
    expect(button04).toBeInTheDocument()
  })
})
