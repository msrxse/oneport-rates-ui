import RatesFilter from './RatesFilter'
import { RateSelect } from './RatesSelect'

const RatesHeader = ({ rateFilters }: { rateFilters: string[] }) => {
  return (
    <div
      data-testid="rates-header-id"
      className="mt-10 pb-8 border-b border-custom-border-grey flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:justify-between md:items-center gap-x-3 relative"
    >
      <div className="flex items-center gap-x-3">
        <RateSelect type="size" />
        <RateSelect type="type" />
      </div>
      <RatesFilter filters={rateFilters} />
    </div>
  )
}

export default RatesHeader
