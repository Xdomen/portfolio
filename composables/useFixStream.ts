export interface FIXToken {
  t: string
  c: string
}

export interface FIXLine {
  id: number
  tokens: FIXToken[]
}

const t = (text: string, cls: string): FIXToken => ({ t: text, c: cls })

const SEP   = 'text-muted'
const HDR   = 'text-dim'
const VAL   = 'text-primary'
const ACC   = 'text-accent'
const OK    = 'text-ok'
const ERR   = 'text-err'
const MUT   = 'text-muted'

// Pre-tokenized display lines for FIX message sequences.
// → outbound (client), ← inbound (broker/exchange)
const MESSAGE_LINES: FIXToken[][] = [
  // ── NewOrderSingle (35=D) ──
  [t('→ ', OK), t('35=', MUT), t('D', ACC), t('  NEW ORDER SINGLE', MUT)],
  [t('8=', MUT), t('FIX.4.2 ', HDR), t('9=', MUT), t('103 ', HDR), t('35=', MUT), t('D ', ACC), t('34=', MUT), t('3 ', HDR), t('49=', MUT), t('DOMEN ', VAL), t('56=', MUT), t('EXEC', VAL)],
  [t('52=', MUT), t('20121105-23:24:42 ', HDR), t('11=', MUT), t('1352157882577 ', VAL), t('21=', MUT), t('1 ', HDR)],
  [t('38=', MUT), t('10000 ', VAL), t('40=', MUT), t('1 ', HDR), t('54=', MUT), t('1 ', ACC), t('55=', MUT), t('MSFT ', VAL), t('59=', MUT), t('0 ', HDR), t('10=', MUT), t('062', MUT)],
  [t('', '')],

  // ── ExecutionReport (35=8) — New / Acknowledged ──
  [t('← ', HDR), t('35=', MUT), t('8', ACC), t('  EXECUTION REPORT  ', MUT), t('39=', MUT), t('0', ACC), t('  ACK', MUT)],
  [t('8=', MUT), t('FIX.4.2 ', HDR), t('9=', MUT), t('103 ', HDR), t('35=', MUT), t('8 ', ACC), t('34=', MUT), t('4 ', HDR), t('49=', MUT), t('EXEC ', VAL), t('56=', MUT), t('DOMEN', VAL)],
  [t('52=', MUT), t('20121105-23:24:43 ', HDR), t('11=', MUT), t('1352157882577 ', VAL), t('37=', MUT), t('ORD-78432 ', VAL)],
  [t('38=', MUT), t('10000 ', VAL), t('39=', MUT), t('0 ', ACC), t('54=', MUT), t('1 ', ACC), t('55=', MUT), t('MSFT ', VAL), t('150=', MUT), t('0 ', ACC), t('10=', MUT), t('077', MUT)],
  [t('', '')],

  // ── NewOrderSingle (35=D) — second order ──
  [t('→ ', OK), t('35=', MUT), t('D', ACC), t('  NEW ORDER SINGLE', MUT)],
  [t('8=', MUT), t('FIX.4.2 ', HDR), t('9=', MUT), t('103 ', HDR), t('35=', MUT), t('D ', ACC), t('34=', MUT), t('5 ', HDR), t('49=', MUT), t('DOMEN ', VAL), t('56=', MUT), t('EXEC', VAL)],
  [t('52=', MUT), t('20121105-23:24:55 ', HDR), t('11=', MUT), t('1352157882578 ', VAL), t('21=', MUT), t('1 ', HDR)],
  [t('38=', MUT), t('5000 ', VAL), t('40=', MUT), t('2 ', HDR), t('44=', MUT), t('25.25 ', VAL), t('54=', MUT), t('2 ', ERR), t('55=', MUT), t('MSFT ', VAL), t('59=', MUT), t('0 ', HDR), t('10=', MUT), t('044', MUT)],
  [t('', '')],

  // ── ExecutionReport (35=8) — Filled ──
  [t('← ', HDR), t('35=', MUT), t('8', ACC), t('  EXECUTION REPORT  ', MUT), t('150=', MUT), t('F', ACC), t('  FILL', MUT)],
  [t('8=', MUT), t('FIX.4.2 ', HDR), t('9=', MUT), t('103 ', HDR), t('35=', MUT), t('8 ', ACC), t('34=', MUT), t('6 ', HDR), t('49=', MUT), t('EXEC ', VAL), t('56=', MUT), t('DOMEN', VAL)],
  [t('52=', MUT), t('20121105-23:24:56 ', HDR), t('11=', MUT), t('1352157882577 ', VAL), t('37=', MUT), t('ORD-78432 ', VAL)],
  [t('6=', MUT), t('25.15 ', ACC), t('14=', MUT), t('10000 ', VAL), t('31=', MUT), t('25.15 ', ACC), t('32=', MUT), t('10000 ', VAL), t('38=', MUT), t('10000 ', VAL)],
  [t('39=', MUT), t('2 ', ACC), t('54=', MUT), t('1 ', ACC), t('55=', MUT), t('MSFT ', VAL), t('150=', MUT), t('F ', ACC), t('151=', MUT), t('0 ', HDR), t('10=', MUT), t('128', MUT)],
  [t('', '')],

  // ── Heartbeat (35=0) ──
  [t('→ ', OK), t('35=', MUT), t('0', ACC), t('  HEARTBEAT', MUT)],
  [t('8=', MUT), t('FIX.4.2 ', HDR), t('9=', MUT), t('57 ', HDR), t('35=', MUT), t('0 ', ACC), t('34=', MUT), t('7 ', HDR), t('49=', MUT), t('DOMEN ', VAL), t('52=', MUT), t('20121105-23:25:00 ', HDR), t('56=', MUT), t('EXEC ', VAL), t('10=', MUT), t('198', MUT)],
  [t('', '')],

  // ── OrderCancelRequest (35=F) ──
  [t('→ ', OK), t('35=', MUT), t('F', ACC), t('  ORDER CANCEL REQUEST', MUT)],
  [t('8=', MUT), t('FIX.4.1 ', HDR), t('9=', MUT), t('104 ', HDR), t('35=', MUT), t('F ', ACC), t('34=', MUT), t('6 ', HDR), t('49=', MUT), t('DOMEN ', VAL), t('56=', MUT), t('EXEC', VAL)],
  [t('52=', MUT), t('20121105-23:25:16 ', HDR), t('11=', MUT), t('1352157916437 ', VAL)],
  [t('38=', MUT), t('10000 ', VAL), t('41=', MUT), t('1352157912357 ', VAL), t('54=', MUT), t('1 ', ACC), t('55=', MUT), t('SPY ', VAL), t('10=', MUT), t('198', MUT)],
  [t('', '')],

  // ── Reject (35=3) ──
  [t('← ', HDR), t('35=', MUT), t('3', ACC), t('  REJECT', MUT)],
  [t('8=', MUT), t('FIX.4.1 ', HDR), t('9=', MUT), t('82 ', HDR), t('35=', MUT), t('3 ', ACC), t('34=', MUT), t('8 ', HDR), t('49=', MUT), t('EXEC ', VAL), t('56=', MUT), t('DOMEN', VAL)],
  [t('52=', MUT), t('20121105-23:25:16 ', HDR), t('45=', MUT), t('6 ', HDR)],
  [t('58=', MUT), t('Unsupported message type ', ERR), t('10=', MUT), t('000', MUT)],
  [t('', '')],
]

let idCounter = 0

export function useFixStream() {
  const lines = ref<FIXLine[]>([])
  let lineIndex = 0
  let timer: ReturnType<typeof setInterval> | null = null

  // Stats
  const seq      = ref(3)
  const msgRate  = ref(18)
  const rtt      = ref(214)
  let statsTimer: ReturnType<typeof setInterval> | null = null

  function start() {
    timer = setInterval(() => {
      const tokens = MESSAGE_LINES[lineIndex % MESSAGE_LINES.length]
      lineIndex++

      if (lines.value.length >= 26) {
        lines.value.shift()
      }
      lines.value.push({ id: idCounter++, tokens })

      // Advance seq on non-empty, non-separator lines that look like FIX fields
      const first = tokens[0]?.t ?? ''
      if (first.startsWith('8=') || first.startsWith('→') || first.startsWith('←')) {
        seq.value++
      }
    }, 680)

    statsTimer = setInterval(() => {
      msgRate.value = 14 + Math.floor(Math.random() * 10)
      rtt.value     = 180 + Math.floor(Math.random() * 120)
    }, 1800)
  }

  function stop() {
    if (timer !== null)      { clearInterval(timer);      timer = null }
    if (statsTimer !== null) { clearInterval(statsTimer); statsTimer = null }
  }

  return { lines, seq, msgRate, rtt, start, stop }
}
