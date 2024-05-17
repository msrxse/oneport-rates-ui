import { screen } from '@testing-library/react'

import RatesList from '@/components/rates/RatesList'
import { renderWithQueryClient } from '@/utils/test-utils'

const defaultCardProp = {
  freightify_request_id: '',
  freightify_offer_id: '',
  carrier_name: '',
  carrier_image: '',
  carrier_scac: '',
  offer_type: '',
  route_schedule: [],
  transit_time: null,
  service_type: '',
  sailing_date: null,
  demurrage_days: 0,
  detention_days: 0,
  valid_to: '',
  valid_from: '',
  commodity: '',
  total_amount_usd: 0,
  total_amount_ngn: 0,
  charge_breakdown: {},
  origin_port_code: '',
  destination_port_code: '',
  special_rate_id: '',
}

describe('RatesList', () => {
  const props = {
    rates: [
      {
        ...defaultCardProp,
        carrier_name: 'Maersk',
        origin_port_code: 'CNSZC',
        destination_port_code: 'GHTEM',
        sailing_date: null,
        transit_time: null,
        detention_days: 3,
        demurrage_days: 2,
        total_amount_usd: 1882,
      },
      {
        ...defaultCardProp,
        carrier_name: 'Maersk',
        origin_port_code: 'CNSZC',
        destination_port_code: 'GHTEM',
        sailing_date: null,
        transit_time: null,
        detention_days: 3,
        demurrage_days: 2,
        total_amount_usd: 1882,
      },
      {
        ...defaultCardProp,
        carrier_name: 'Maersk',
        origin_port_code: 'CNSZC',
        destination_port_code: 'GHTEM',
        sailing_date: null,
        transit_time: null,
        detention_days: 3,
        demurrage_days: 2,
        total_amount_usd: 1882,
      },
    ],
  }

  test('should show passed cards', async () => {
    renderWithQueryClient(<RatesList {...props} />)

    expect(screen.getByTestId('rates-list-rate-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('rates-list-rate-card-2')).toBeInTheDocument()
    expect(screen.getByTestId('rates-list-rate-card-3')).toBeInTheDocument()
  })
})
