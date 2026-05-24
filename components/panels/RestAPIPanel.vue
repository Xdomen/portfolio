<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { HttpMethod } from '~/composables/useRestStream'

const { entries, totalReqs, avgTime, errRate, start, stop } = useRestStream()

onMounted(start)
onUnmounted(stop)

const methodColor: Record<HttpMethod, string> = {
  GET:    'bg-ok text-base',
  POST:   'bg-accent text-base',
  DELETE: 'bg-err text-base',
  PATCH:  'bg-dim text-primary',
}

const statusColor = (code: number) =>
  code < 300 ? 'text-ok' : code < 500 ? 'text-accent' : 'text-err'
</script>

<template>
  <PanelFrame title="REST INTERFACE" status="ONLINE" statusColor="ok" :statusPulse="false">
    <div class="h-full flex flex-col overflow-hidden font-mono text-[11px]">
      <!-- Stream body -->
      <div class="flex-1 overflow-hidden flex flex-col">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="line-in flex items-center gap-2 px-3 py-1.5 border-b border-edge shrink-0"
        >
          <span
            class="shrink-0 px-1.5 py-0.5 text-[9px] font-mono font-medium tracking-wider"
            :class="methodColor[entry.method]"
          >{{ entry.method }}</span>
          <span class="text-dim truncate flex-1 min-w-0">{{ entry.path }}</span>
          <span class="shrink-0 font-medium" :class="statusColor(entry.status)">{{ entry.status }}</span>
          <span class="shrink-0 text-muted hidden sm:inline">{{ entry.statusText }}</span>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="shrink-0 border-t border-edge px-3 py-1.5 flex gap-4 font-mono text-[10px] text-muted bg-base">
        <span>TOTAL <span class="text-accent">{{ totalReqs }}</span></span>
        <span>AVG <span class="text-accent">{{ avgTime }}ms</span></span>
        <span>ERR <span class="text-accent">{{ errRate }}%</span></span>
      </div>
    </div>
  </PanelFrame>
</template>
