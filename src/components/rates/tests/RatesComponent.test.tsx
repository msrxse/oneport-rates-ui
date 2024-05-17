import { screen, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

import RatesComponent from '@/components/rates/RatesComponent'
import { server } from '@/mocks/node'
import { renderWithQueryClient } from '@/utils/test-utils'

const rateData = {
  freightify_request_id: 'N/A',
  freightify_offer_id: 'N/A',
  carrier_name: 'COSCO',
  carrier_image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/COSCO_logo.svg',
  carrier_scac: '',
  offer_type: 'CONTRACT',
  route_schedule: [],
  service_type: 'CY/CY',
  sailing_date: null,
  demurrage_days: 14,
  detention_days: 0,
  valid_to: '2024-02-14T00:00:00.000Z',
  valid_from: '2024-02-03T11:08:28.359Z',
  commodity: 'FAK - GENERAL CARGO',
  total_amount_usd: 1885,
  total_amount_ngn: 1734200,
  charge_breakdown: {
    ocean_charges: [
      [
        {
          amount: 1885,
          amountUsd: 1885,
          description: 'Basic Ocean Freight',
          qty: 1,
          rate: 1885,
          rateCurrency: 'USD',
          rateUsd: 1885,
          rateBasis: 'PER_EQUIPMENT',
          rateTypeCode: 'FREIGHT',
          paymentMethod: '',
          containerType: '20FT',
          amountNgn: 1734200,
          rateNgn: 1734200,
        },
      ],
    ],
  },
  origin_port_code: 'CNSZX',
  destination_port_code: 'GHTEM',
  special_rate_id: '65bbf8dfe57ef17a5a90f9e1',
}

describe('RatesComponent', () => {
  it('should render correctly', async () => {
    server.use(
      http.get('/get_rates', () => {
        return HttpResponse.json({
          status: 'success',
          data: {
            rates: [rateData],
            total_rates: 1,
          },
          message: 'rates successfully fetched',
          code: 200,
        })
      }),
    )
    renderWithQueryClient(<RatesComponent />)

    // first wait for loader
    await waitFor(() => {
      expect(screen.getByTestId('rates-loading-id')).toBeInTheDocument()
    })

    // is there a header displayed?
    expect(screen.getByTestId('rates-header-id')).toBeInTheDocument()

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
