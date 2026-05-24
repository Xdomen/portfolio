<script setup lang="ts">
defineProps<{
  color?: 'ok' | 'accent' | 'err' | 'dim'
  pulse?: boolean
}>()
</script>

<template>
  <span
    class="inline-block w-1.5 h-1.5 rounded-full"
    :class="[
      color === 'ok'     ? 'bg-ok'     : '',
      color === 'accent' ? 'bg-accent' : '',
      color === 'err'    ? 'bg-err'    : '',
      color === 'dim'    ? 'bg-muted'  : '',
      !color             ? 'bg-ok'     : '',
      pulse              ? 'dot-pulse' : '',
    ]"
  />
</template>
