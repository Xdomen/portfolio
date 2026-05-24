<script setup lang="ts">
defineProps<{
  title: string
  status?: string
  statusColor?: 'ok' | 'accent' | 'err' | 'dim'
  statusPulse?: boolean
}>()
</script>

<template>
  <div class="panel-hover flex flex-col border border-edge bg-surface overflow-hidden">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-3 py-2 border-b border-edge bg-base shrink-0">
      <span class="font-mono text-[10px] tracking-widest text-dim uppercase">{{ title }}</span>
      <div v-if="status" class="flex items-center gap-1.5">
        <span class="font-mono text-[9px] tracking-wider text-dim uppercase">{{ status }}</span>
        <StatusDot :color="statusColor ?? 'ok'" :pulse="statusPulse ?? true" />
      </div>
    </div>
    <!-- Body -->
    <div class="flex-1 overflow-hidden relative">
      <slot />
    </div>
  </div>
</template>
