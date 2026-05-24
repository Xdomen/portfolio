export interface WsToken {
  t: string
  c: string
}

export interface WsLine {
  id: number
  tokens: WsToken[]
}

const k = (text: string): WsToken => ({ t: text, c: 'text-dim' })         // key
const sv = (text: string): WsToken => ({ t: text, c: 'text-primary' })    // string value
const nv = (text: string): WsToken => ({ t: text, c: 'text-accent' })     // numeric value
const pn = (text: string): WsToken => ({ t: text, c: 'text-muted' })      // punctuation
const ch = (text: string): WsToken => ({ t: text, c: 'text-ok' })         // channel/event

let lineId = 0

function makeLines(timestamp: string, channel: string, event: string, fields: WsToken[][]): WsLine[] {
  const result: WsLine[] = []
  result.push({ id: lineId++, tokens: [pn('{ '), k(`"channel"`), pn(': '), ch(`"${channel}"`), pn('  '), k(`"event"`), pn(': '), ch(`"${event}"`)] })
  result.push({ id: lineId++, tokens: [pn('  '), k('"timestamp"'), pn(': '), nv(`"${timestamp}"`)] })
  for (const line of fields) {
    result.push({ id: lineId++, tokens: [pn('  '), ...line] })
  }
  result.push({ id: lineId++, tokens: [pn('}'), { t: '', c: '' }] })
  result.push({ id: lineId++, tokens: [{ t: '', c: '' }] })
  return result
}

const WS_SEQUENCES: WsLine[][] = [
  makeLines('1779614917499', 'live_trades_btcusd', 'trade', [
    [k('"id"'),           pn(': '), nv('579011612'),                  pn('  '), k('"type"'), pn(': '), sv('"BUY"')],
    [k('"price"'),        pn(': '), nv('76806.22'),                   pn('  '), k('"price_str"'), pn(': '), sv('"76806.22"')],
    [k('"amount"'),       pn(': '), nv('0.00017867'),                 pn('  '), k('"amount_str"'), pn(': '), sv('"0.00017867"')],
    [k('"microtimestamp"'), pn(': '), nv('"1779614917499000"')],
    [k('"buy_order_id"'), pn(': '), nv('2010234645876752')],
  ]),

  makeLines('1779614918201', 'live_trades_ethusd', 'trade', [
    [k('"id"'),           pn(': '), nv('579011613'),                  pn('  '), k('"type"'), pn(': '), sv('"SELL"')],
    [k('"price"'),        pn(': '), nv('2847.55'),                    pn('  '), k('"price_str"'), pn(': '), sv('"2847.55"')],
    [k('"amount"'),       pn(': '), nv('0.12500'),                    pn('  '), k('"amount_str"'), pn(': '), sv('"0.12500"')],
    [k('"microtimestamp"'), pn(': '), nv('"1779614918201000"')],
    [k('"sell_order_id"'), pn(': '), nv('2010234619006978')],
  ]),

  makeLines('1779614920000', 'order_book_btcusd', 'data', [
    [k('"bids"'), pn(': '), sv('[[76800.00, 1.42300], [76795.50, 0.88100]]')],
    [k('"asks"'), pn(': '), sv('[[76810.00, 0.55000], [76815.25, 2.10000]]')],
    [k('"microtimestamp"'), pn(': '), nv('"1779614920000000"')],
  ]),

  makeLines('1779614921350', 'live_trades_btcusd', 'trade', [
    [k('"id"'),           pn(': '), nv('579011614'),                  pn('  '), k('"type"'), pn(': '), sv('"BUY"')],
    [k('"price"'),        pn(': '), nv('76812.00'),                   pn('  '), k('"price_str"'), pn(': '), sv('"76812.00"')],
    [k('"amount"'),       pn(': '), nv('0.00341200'),                 pn('  '), k('"amount_str"'), pn(': '), sv('"0.00341200"')],
    [k('"microtimestamp"'), pn(': '), nv('"1779614921350000"')],
    [k('"buy_order_id"'), pn(': '), nv('2010234650001001')],
  ]),

  [
    { id: lineId++, tokens: [pn('{ '), k('"event"'), pn(': '), ch('"heartbeat"'), pn('  '), k('"channel"'), pn(': '), ch('"bts:heartbeat"'), pn(' }')] },
    { id: lineId++, tokens: [{ t: '', c: '' }] },
  ],
]

export function useWsStream() {
  const lines = ref<WsLine[]>([])
  let seqIndex = 0
  let lineIndex = 0
  let timer: ReturnType<typeof setInterval> | null = null

  const flatLines: WsLine[] = WS_SEQUENCES.flat()

  function tick() {
    if (lines.value.length >= 24) {
      lines.value.shift()
    }
    lines.value.push(flatLines[lineIndex % flatLines.length])
    lineIndex++
  }

  function start() {
    timer = setInterval(tick, 520)
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  // Stats counters
  const msgRate = ref(1247)
  const byteRate = ref(14.2)
  const latency = ref(0.8)

  function startStats() {
    setInterval(() => {
      msgRate.value  = 1100 + Math.floor(Math.random() * 400)
      byteRate.value = parseFloat((12 + Math.random() * 5).toFixed(1))
      latency.value  = parseFloat((0.6 + Math.random() * 0.6).toFixed(1))
    }, 1800)
  }

  return { lines, msgRate, byteRate, latency, start, stop, startStats }
}
