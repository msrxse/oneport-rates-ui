import { screen, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

import RatesComponent from '@/components/rates/RatesComponent'
import { server } from '@/mocks/node'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('RatesComponent', () => {
  it('should render Article', async () => {
    renderWithQueryClient(<RatesComponent />)

    expect(screen.getByTestId('rates-header-id')).toBeInTheDocument()
    expect(screen.getByTestId('rates-list-id')).toBeInTheDocument()
  })

  it('should render loading state', async () => {
    renderWithQueryClient(<RatesComponent />)
    await waitFor(() => {
      expect(screen.getByTestId('rates-loading-id')).toBeInTheDocument()
    })
  })

  it('should render empty state', async () => {
    server.use(
      http.get('/get_rates', () => {
        return HttpResponse.json({
          status: 'success',
          data: {
            rates: [],
            total_rates: 0,
          },
          message: 'rates successfully fetched',
          code: 200,
        })
      }),
    )
    const result = renderWithQueryClient(<RatesComponent />)
    const error = await result.findByText(/No Rates to Display/i)
    expect(error).toBeInTheDocument()
  })

  it('should render error state', async () => {
    server.use(
      http.get('/get_rates', () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )
    const result = renderWithQueryClient(<RatesComponent />)
    const error = await result.findByText(/Error/i)
    expect(error).toBeInTheDocument()
  })
})
