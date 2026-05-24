<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const { lines, start, stop } = useFixStream()

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <PanelFrame title="FIX Protocol" status="SESSION ACTIVE" statusColor="ok" :statusPulse="true">
    <div class="h-full overflow-hidden px-3 py-2 flex flex-col gap-0 font-mono text-[11px] leading-[1.6]">
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
  </PanelFrame>
</template>
