<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { HttpMethod } from '~/composables/useRestStream'

const { requests, start, stop } = useRestStream()

onMounted(start)
onUnmounted(stop)

const methodColor: Record<HttpMethod, string> = {
  GET:    'bg-ok text-base',
  POST:   'bg-accent text-base',
  DELETE: 'bg-err text-base',
  PUT:    'bg-dim text-base',
}

const statusColor = (code: number) =>
  code < 300 ? 'text-ok' : code < 400 ? 'text-accent' : 'text-err'
</script>

<template>
  <PanelFrame title="REST INTERFACE" status="ONLINE" statusColor="ok" :statusPulse="false">
    <div class="h-full overflow-hidden px-3 py-2 flex flex-col gap-2 font-mono text-[11px]">
      <div
        v-for="req in requests"
        :key="req.id"
        class="line-in shrink-0 border border-edge overflow-hidden"
      >
        <!-- Request line -->
        <div class="flex items-center gap-2 px-2 py-1.5 bg-surface-2">
          <span
            class="shrink-0 px-1.5 py-0.5 text-[9px] font-mono font-medium tracking-wider"
            :class="methodColor[req.method]"
          >{{ req.method }}</span>
          <span class="text-dim truncate flex-1">{{ req.path }}</span>
          <span class="shrink-0 font-medium" :class="statusColor(req.status)">
            {{ req.status }}
          </span>
          <span class="shrink-0 text-muted">{{ req.statusText }}</span>
        </div>

        <!-- Expandable response -->
        <div
          v-if="req.expanded"
          class="border-t border-edge px-2 py-1.5 bg-surface"
        >
          <div v-if="req.requestLines" class="mb-1">
            <div class="text-[9px] tracking-widest text-muted mb-1">REQUEST BODY</div>
            <div v-for="(line, li) in req.requestLines" :key="li" class="leading-5">
              <span v-for="(tok, ti) in line" :key="ti" :class="tok.c">{{ tok.t }}</span>
            </div>
            <div class="border-t border-edge my-1 opacity-50" />
          </div>
          <div class="text-[9px] tracking-widest text-muted mb-1">RESPONSE</div>
          <div v-for="(line, li) in req.responseLines" :key="li" class="leading-5">
            <span v-for="(tok, ti) in line" :key="ti" :class="tok.c">{{ tok.t }}</span>
          </div>
        </div>
      </div>
    </div>
  </PanelFrame>
</template>
