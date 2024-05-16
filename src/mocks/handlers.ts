import { HttpResponse, delay, http } from 'msw'

const getSpecialRates = {
  status: 'success',
  data: {
    rates: {
      MAERSK: 16,
      MSC: 36,
      ONE: 71,
      ZIM: 8,
      PIL: 16,
      ESL: 23,
      COSCO: 9,
      OOCL: 1,
      'CMA CGM': 10,
      TSL: 1,
      'HAPAG LLOYD': 5,
    },
    total_rates: 196,
  },
  message: 'special rates successfully fetched',
  code: 200,
}
const getRates = {
  status: 'success',
  data: {
    rates: [],
    total_rates: 0,
  },
  message: 'rates successfully fetched',
  code: 200,
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateRates = () => {
  const num = getRandomInt(1, 10)
  const rate = Array(num).fill({
    carrier_name: 'Maersk',
    origin_port_code: 'CNSZC',
    destination_port_code: 'GHTEM',
    sailing_date: null,
    transit_time: null,
    detention_days: 3,
    demurrage_days: 2,
    total_amount_usd: 1882,
  })

  return {
    ...getRates,
    data: {
      rates: rate,
      total_rates: rate.length,
    },
  }
}
export const handlers = [
  http.get('/get_special_rates', async () => {
    // Await a random realistic server response time.
    await delay()
    return HttpResponse.json(getSpecialRates)
  }),
  http.get('/get_rates', async () => {
    // Await a 500msec server response time.
    await delay(500)

    return HttpResponse.json(generateRates())
  }),

  // ...other request handlers.
]
