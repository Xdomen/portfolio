export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH'

export interface RestEntry {
  id: number
  method: HttpMethod
  path: string
  status: number
  statusText: string
}

let entryId = 0

const POOL: Omit<RestEntry, 'id'>[] = [
  { method: 'GET',    path: '/api/v1/orderbook/XBTUSD',        status: 200, statusText: 'OK' },
  { method: 'POST',   path: '/api/v1/orders',                  status: 201, statusText: 'Created' },
  { method: 'GET',    path: '/api/v1/positions',               status: 200, statusText: 'OK' },
  { method: 'DELETE', path: '/api/v1/orders/78432',            status: 204, statusText: 'No Content' },
  { method: 'GET',    path: '/api/v1/instruments',             status: 200, statusText: 'OK' },
  { method: 'PATCH',  path: '/api/v1/orders/78433',            status: 200, statusText: 'OK' },
  { method: 'GET',    path: '/api/v1/trades/history',          status: 200, statusText: 'OK' },
  { method: 'POST',   path: '/api/v1/orders',                  status: 400, statusText: 'Bad Request' },
  { method: 'GET',    path: '/api/v1/ratelimit',               status: 429, statusText: 'Too Many Requests' },
  { method: 'POST',   path: '/api/v1/orders',                  status: 500, statusText: 'Internal Server Error' },
  { method: 'GET',    path: '/api/v1/market-status',           status: 503, statusText: 'Service Unavailable' },
  { method: 'DELETE', path: '/api/v1/session',                 status: 401, statusText: 'Unauthorized' },
  { method: 'PATCH',  path: '/api/v1/positions/XBTUSD',        status: 422, statusText: 'Unprocessable Entity' },
  { method: 'GET',    path: '/api/v1/depth/ETHUSD',            status: 200, statusText: 'OK' },
  { method: 'POST',   path: '/api/v1/withdrawals',             status: 500, statusText: 'Internal Server Error' },
]

const BUFFER_MAX = 14

export function useRestStream() {
  const entries = ref<RestEntry[]>([])
  let poolIndex = 0
  let timer: ReturnType<typeof setInterval> | null = null

  // Stats
  const totalReqs = ref(0)
  const avgTime   = ref(38)
  const errRate   = ref(0)
  let statsTimer: ReturnType<typeof setInterval> | null = null

  function addEntry() {
    const base = POOL[poolIndex % POOL.length]
    poolIndex++
    entries.value.push({ ...base, id: entryId++ })
    if (entries.value.length > BUFFER_MAX) {
      entries.value.shift()
    }
    totalReqs.value++
  }

  function start() {
    addEntry()
    timer = setInterval(addEntry, 1800)

    statsTimer = setInterval(() => {
      avgTime.value = 22 + Math.floor(Math.random() * 60)
      // err rate based on how many pool entries are 4xx/5xx (6 of 15 ≈ 40% ceiling)
      errRate.value = parseFloat((Math.random() * 38).toFixed(1))
    }, 2400)
  }

  function stop() {
    if (timer !== null)      { clearInterval(timer);      timer = null }
    if (statsTimer !== null) { clearInterval(statsTimer); statsTimer = null }
  }

  return { entries, totalReqs, avgTime, errRate, start, stop }
}
