import { HttpResponse, http } from 'msw'

const rates = {
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

export const handlers = [
  http.get('/rates', () => {
    return HttpResponse.json(rates)
  }),

  // ...other request handlers.
]
