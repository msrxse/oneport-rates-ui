import { screen, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

import RatesComponent from '@/components/rates/RatesComponent'
import * as useRatesData from '@/hooks/rates'
import { server } from '@/mocks/node'
import { renderWithQueryClient } from '@/utils/test-utils'

describe('RatesComponent', () => {
  // Mocking this hook is not needed but done to example how to mock custom hooks
  // (Now lists of filters will have these 3 items instead of all as comming from MSW mocks)
  const getSpecialFiltersData = () => ['MAERSK', 'MSC', 'ONE']
  const useGetSpecialFiltersSpy = vi.spyOn(useRatesData, 'useGetSpecialFilters')

  useGetSpecialFiltersSpy.mockReturnValue(getSpecialFiltersData)

  it('should render correctly', async () => {
    renderWithQueryClient(<RatesComponent />)

    await waitFor(() => {
      // thanks to useGetSpecialFilters mock above - we have correct filters displayed
      expect(screen.getByTestId('rates-header-id')).toBeInTheDocument()
    })
    // screen.debug(undefined, Infinity)

    await waitFor(() => {
      expect(screen.getByTestId('rates-loading-id')).toBeInTheDocument()
    })

    // Wait for secondary call to rates after filter selection is done
    // is there a card now?
    await waitFor(() => {
      expect(screen.getByTestId('rates-list-rate-card-1')).toBeInTheDocument()
    })
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
