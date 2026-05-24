<template>
  <section class="relative z-10 px-6 lg:px-12 xl:px-20 pb-20">
    <!-- Section label -->
    <div class="flex items-center gap-3 mb-8">
      <span class="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Infrastructure</span>
      <div class="flex-1 h-px bg-edge" />
    </div>

    <!-- 3-column panel grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="panel-col-reveal min-h-[360px] lg:min-h-[440px]">
        <FIXPanel class="h-full" />
      </div>
      <div class="panel-col-reveal min-h-[360px] lg:min-h-[440px]">
        <WebSocketPanel class="h-full" />
      </div>
      <div class="panel-col-reveal min-h-[360px] lg:min-h-[440px]">
        <RestAPIPanel class="h-full" />
      </div>
    </div>
  </section>
</template>
