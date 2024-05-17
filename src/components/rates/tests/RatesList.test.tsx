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
  service_type: '',
  sailing_date: '',
  transit_time: undefined,
  demurrage_days: 0,
  detention_days: 0,
  valid_to: '',
  valid_from: '',
  commodity: '',
  total_amount_usd: 0,
  total_amount_ngn: 0,
  charge_breakdown: {
    ocean_charges: [
      [
        {
          amount: 0,
          amountUsd: 0,
          description: '',
          qty: 0,
          rate: 0,
          rateCurrency: '',
          rateUsd: 0,
          rateBasis: '',
          rateTypeCode: '',
          paymentMethod: '',
          containerType: '',
          amountNgn: 0,
          rateNgn: 0,
        },
      ],
    ],
  },
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
        detention_days: 3,
        demurrage_days: 2,
        total_amount_usd: 1882,
      },
      {
        ...defaultCardProp,
        carrier_name: 'Maersk',
        origin_port_code: 'CNSZC',
        destination_port_code: 'GHTEM',
        detention_days: 3,
        demurrage_days: 2,
        total_amount_usd: 1882,
      },
      {
        ...defaultCardProp,
        carrier_name: 'Maersk',
        origin_port_code: 'CNSZC',
        destination_port_code: 'GHTEM',
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
