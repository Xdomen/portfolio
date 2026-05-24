<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const { lines, msgRate, byteRate, latency, start, stop, startStats } = useWsStream()

onMounted(() => {
  start()
  startStats()
})
onUnmounted(stop)
</script>

<template>
  <PanelFrame title="Market Data" status="CONNECTED" statusColor="accent" :statusPulse="true">
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Stream body -->
      <div class="flex-1 overflow-hidden px-3 py-2 font-mono text-[11px] leading-[1.65] flex flex-col gap-0">
        <div
          v-for="line in lines"
          :key="line.id"
          class="line-in whitespace-nowrap overflow-hidden text-ellipsis shrink-0"
        >
          <template v-if="line.tokens.length === 1 && line.tokens[0].t === ''">
            <span class="block h-px bg-edge my-1 opacity-40" />
          </template>
          <template v-else>
            <span
              v-for="(token, i) in line.tokens"
              :key="i"
              :class="token.c"
            >{{ token.t }}</span>
          </template>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="shrink-0 border-t border-edge px-3 py-1.5 flex gap-4 font-mono text-[10px] text-muted bg-base">
        <span>MSGS <span class="text-accent">{{ msgRate.toLocaleString() }}</span>/s</span>
        <span>BYTES <span class="text-accent">{{ byteRate }}KB</span>/s</span>
        <span>LAT <span class="text-accent">{{ latency }}ms</span></span>
      </div>
    </div>
  </PanelFrame>
</template>
