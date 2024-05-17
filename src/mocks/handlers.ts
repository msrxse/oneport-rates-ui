import { HttpResponse, delay, http } from 'msw'

import { getRates, getSpecialRates } from './data'

export const handlers = [
  http.get('/get_special_rates', async () => {
    // Await a random realistic server response time.
    await delay()
    return HttpResponse.json(getSpecialRates)
  }),
  http.get('/get_rates', async () => {
    // Await a 500msec server response time.
    await delay(500)

    return HttpResponse.json(getRates)
  }),

  // ...other request handlers.
]
