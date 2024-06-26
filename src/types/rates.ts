enum ContainerSize {
  '20FT',
  '40FT',
  '40FT HC',
}

enum ContainerType {
  DRY = 'dry',
  REFEER = 'REEFER',
}

interface OceanCharges {
  amount: number
  amountUsd: number
  description: string
  qty: number
  rate: number
  rateCurrency: string
  rateUsd: number
  rateBasis: string
  rateTypeCode: string
  paymentMethod: string
  containerType: string
  amountNgn: number
  rateNgn: number
}

interface Rate {
  freightify_request_id: string
  freightify_offer_id: string
  carrier_name: string
  carrier_image: string
  carrier_scac: string
  offer_type: string
  route_schedule: string[]
  transit_time?: string
  service_type: string
  sailing_date: string
  demurrage_days: number
  detention_days: number
  valid_to: string | undefined
  valid_from: string
  commodity: string
  total_amount_usd: number
  total_amount_ngn: number
  charge_breakdown: {
    ocean_charges: OceanCharges[]
  }
  origin_port_code: string
  destination_port_code: string
  special_rate_id: string
}

interface GetSpecialRates {
  status: string
  data: {
    rates: Record<string, number>
    total_rates: number
  }
  message: string
  code: number
}

interface GetRates {
  status: string
  data: {
    rates: Rate[]
    total_rates: number
  }
  message: string
  code: number
}

export { type GetRates, type Rate, type GetSpecialRates, ContainerSize, ContainerType }
