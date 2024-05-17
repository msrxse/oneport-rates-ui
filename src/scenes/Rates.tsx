import RatesComponent from '@/components/rates/RatesComponent'

/**
 * Rates displays a list of rates based on certain parameters.
 * It fetches rates from the API and allows the user to filter and paginate through the results.
 */
const Rates = () => {
  return (
    <div className="relative">
      <h1 className="text-[40px] satoshi text-custom-black font-medium">Special Rates</h1>
      <RatesComponent />
    </div>
  )
}

export default Rates
