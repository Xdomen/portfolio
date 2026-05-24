<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const { lines, seq, msgRate, rtt, start, stop } = useFixStream()

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <PanelFrame title="FIX Protocol" status="SESSION ACTIVE" statusColor="ok" :statusPulse="true">
    <div class="h-full flex flex-col overflow-hidden">
      <!-- Stream body -->
      <div class="flex-1 overflow-hidden px-3 py-2 flex flex-col gap-0 font-mono text-[11px] leading-[1.6]">
        <div
          v-for="line in lines"
          :key="line.id"
          class="line-in whitespace-nowrap overflow-hidden text-ellipsis shrink-0"
        >
          <template v-if="line.tokens.length === 1 && line.tokens[0].t === ''">
            <span class="block h-[1px] bg-edge my-1 opacity-60" />
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
        <span>SEQ <span class="text-accent">{{ seq }}</span></span>
        <span>MSG/s <span class="text-accent">{{ msgRate }}</span></span>
        <span>RTT <span class="text-accent">{{ rtt }}μs</span></span>
      </div>
    </div>
  </PanelFrame>
</template>
