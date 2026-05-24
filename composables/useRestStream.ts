export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

export interface RestToken {
  t: string
  c: string
}

export interface RestRequest {
  id: number
  method: HttpMethod
  path: string
  status: number
  statusText: string
  requestLines?: RestToken[][]
  responseLines: RestToken[][]
  expanded: boolean
}

let reqId = 0

const s = (t: string): RestToken => ({ t, c: 'text-primary' })
const k = (t: string): RestToken => ({ t, c: 'text-dim' })
const n = (t: string): RestToken => ({ t, c: 'text-accent' })
const p = (t: string): RestToken => ({ t, c: 'text-muted' })
const g = (t: string): RestToken => ({ t, c: 'text-ok' })

const REQUESTS: Omit<RestRequest, 'id' | 'expanded'>[] = [
  {
    method: 'GET',
    path: '/api/v1/orderbook/XBTUSD',
    status: 200,
    statusText: 'OK',
    responseLines: [
      [p('{')],
      [p('  '), k('"symbol"'), p(': '), s('"XBTUSD"'), p(',')],
      [p('  '), k('"bids"'), p(': '), s('[[76800.00, 1.423], [76795.50, 0.881]]'), p(',')],
      [p('  '), k('"asks"'), p(': '), s('[[76810.00, 0.550], [76815.25, 2.100]]'), p(',')],
      [p('  '), k('"timestamp"'), p(': '), n('"1779614917"'), p(',')],
      [p('  '), k('"microtimestamp"'), p(': '), n('"1779614917499000"')],
      [p('}')],
    ],
  },
  {
    method: 'POST',
    path: '/api/v1/orders',
    status: 201,
    statusText: 'Created',
    requestLines: [
      [p('{')],
      [p('  '), k('"symbol"'), p(': '), s('"XBTUSD"'), p(',')],
      [p('  '), k('"side"'), p(': '), s('"Buy"'), p(',')],
      [p('  '), k('"orderQty"'), p(': '), n('10000'), p(',')],
      [p('  '), k('"price"'), p(': '), n('76450.50'), p(',')],
      [p('  '), k('"ordType"'), p(': '), s('"Limit"'), p(',')],
      [p('  '), k('"timeInForce"'), p(': '), s('"GoodTillCancel"')],
      [p('}')],
    ],
    responseLines: [
      [p('{')],
      [p('  '), k('"orderID"'), p(': '), s('"ORD-20240524-001"'), p(',')],
      [p('  '), k('"ordStatus"'), p(': '), g('"New"'), p(',')],
      [p('  '), k('"cumQty"'), p(': '), n('0'), p(',')],
      [p('  '), k('"avgPx"'), p(': '), n('null'), p(',')],
      [p('  '), k('"transactTime"'), p(': '), s('"2024-05-24T09:30:00.000Z"')],
      [p('}')],
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/positions',
    status: 200,
    statusText: 'OK',
    responseLines: [
      [p('[')],
      [p('  {'), k('"symbol"'), p(': '), s('"XBTUSD"'), p(','), k('"currentQty"'), p(': '), n('10000'), p(','), k('"avgCostPrice"'), p(': '), n('76450.50'), p('}')],
      [p('  {'), k('"symbol"'), p(': '), s('"ETHUSD"'), p(','), k('"currentQty"'), p(': '), n('-500'), p(','), k('"avgCostPrice"'), p(': '), n('2851.00'), p('}')],
      [p(']')],
    ],
  },
  {
    method: 'DELETE',
    path: '/api/v1/orders/ORD-20240524-001',
    status: 204,
    statusText: 'No Content',
    responseLines: [
      [{ t: '— no body —', c: 'text-muted' }],
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/instruments',
    status: 200,
    statusText: 'OK',
    responseLines: [
      [p('[')],
      [p('  {'), k('"symbol"'), p(': '), s('"XBTUSD"'), p(','), k('"state"'), p(': '), g('"Open"'), p(','), k('"tickSize"'), p(': '), n('0.50'), p('}')],
      [p('  {'), k('"symbol"'), p(': '), s('"ETHUSD"'), p(','), k('"state"'), p(': '), g('"Open"'), p(','), k('"tickSize"'), p(': '), n('0.05'), p('}')],
      [p(']')],
    ],
  },
]

export function useRestStream() {
  const requests = ref<RestRequest[]>([])
  let rIndex = 0
  let mainTimer: ReturnType<typeof setInterval> | null = null
  let expandTimer: ReturnType<typeof setTimeout> | null = null

  function addRequest() {
    const base = REQUESTS[rIndex % REQUESTS.length]
    rIndex++

    const req: RestRequest = { ...base, id: reqId++, expanded: false }

    if (requests.value.length >= 4) {
      requests.value.shift()
    }
    requests.value.push(req)

    // Auto-expand after brief delay, then collapse after display period
    if (expandTimer) clearTimeout(expandTimer)
    expandTimer = setTimeout(() => {
      req.expanded = true
      expandTimer = setTimeout(() => {
        req.expanded = false
      }, 4000)
    }, 400)
  }

  function start() {
    addRequest()
    mainTimer = setInterval(addRequest, 3800)
  }

  function stop() {
    if (mainTimer !== null) { clearInterval(mainTimer); mainTimer = null }
    if (expandTimer !== null) { clearTimeout(expandTimer); expandTimer = null }
  }

  return { requests, start, stop }
}
