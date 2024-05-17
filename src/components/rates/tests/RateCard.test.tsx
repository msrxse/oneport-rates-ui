import RateCard from '@/components/rates/RateCard'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('RateCard', () => {
  const props = {
    carrier_name: 'Maersk',
    origin_port_code: 'CNSZC',
    destination_port_code: 'GHTEM',
    sailing_date: null,
    transit_time: null,
    detention_days: 3,
    demurrage_days: 2,
    amountUsd: 1882,
  }
  test('should show title', async () => {
    const result = renderWithQueryClient(<RateCard {...props} />)
    const item01 = await result.findByText(/Maersk/i)
    const item02 = await result.findByText(/CNSZC/i)
    const item03 = await result.findByText(/GHTEM/i)
    const item04 = await result.findByText(/5 days/i)
    const item05 = await result.findByText(/1882/i)
    expect(item01).toBeInTheDocument()
    expect(item02).toBeInTheDocument()
    expect(item03).toBeInTheDocument()
    expect(item04).toBeInTheDocument()
    expect(item05).toBeInTheDocument()
  })
})
