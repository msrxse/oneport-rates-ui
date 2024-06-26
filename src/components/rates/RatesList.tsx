import { Rate } from '@/types/rates'

import RateCard from './RateCard'

const RatesList = ({ rates }: { rates: Rate[] }) => {
  return (
    <>
      {rates.map((rate, i) => (
        <RateCard
          key={i}
          dataTestid={`rates-list-rate-card-${i + 1}`}
          amountUsd={rate.total_amount_usd}
          carrier_name={rate.carrier_name}
          demurrage_days={rate.demurrage_days}
          destination_port_code={rate.destination_port_code}
          detention_days={rate.demurrage_days}
          origin_port_code={rate.origin_port_code}
          sailing_date={rate.sailing_date}
          transit_time={rate.transit_time}
        />
      ))}
    </>
  )
}

export default RatesList
