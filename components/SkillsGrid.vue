<script setup lang="ts">
const categories = [
  {
    label: 'Languages',
    skills: ['C++', 'Go', 'Python', 'Rust', 'TypeScript', 'Bash'],
  },
  {
    label: 'Protocols',
    skills: ['FIX 4.2', 'FIX 4.4', 'ITCH 5.0', 'OUCH', 'FAST', 'UDP Multicast', 'WebSocket', 'gRPC'],
  },
  {
    label: 'Infrastructure',
    skills: ['Co-location', 'Kernel Bypass', 'DPDK', 'FPGA', 'Redis', 'PostgreSQL', 'Docker', 'Linux'],
  },
]
</script>

<template>
  <section class="relative z-10 px-6 lg:px-12 xl:px-20 pb-28">
    <!-- Section label -->
    <div class="flex items-center gap-3 mb-8">
      <span class="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Technical Profile</span>
      <div class="flex-1 h-px bg-edge" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="cat in categories"
        :key="cat.label"
        class="skills-col"
      >
        <!-- Category header -->
        <div class="font-mono text-[9px] tracking-[0.25em] text-muted uppercase mb-4 pb-2 border-b border-edge">
          {{ cat.label }}
        </div>

        <!-- Chips -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in cat.skills"
            :key="skill"
            class="skill-chip border border-edge text-muted font-mono text-[10px] tracking-wider px-2.5 py-1 uppercase cursor-default"
          >{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
