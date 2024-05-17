import { HttpResponse, delay, http } from 'msw'

import { getRates, getSpecialRates } from './data'

export const handlers = [
  http.get('/get_special_rates', async () => {
    // Await a random realistic server response time.
    await delay()
    return HttpResponse.json(getSpecialRates)
  }),
  http.get('/get_rates', async ({ request }) => {
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url)
    // Read the "carrier_name" URL query parameter using the "URLSearchParams" API.
    const carrierName = url.searchParams.get('special_filter')

    // Await a 500msec server response time.
    await delay(500)

    // we use this carrierName to mock the server sending distinct data each time a carrierName filter is elected
    return HttpResponse.json(getRates(carrierName))
  }),

  // ...other request handlers.
]
