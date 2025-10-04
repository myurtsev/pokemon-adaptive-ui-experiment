<template>
  <div class="group rounded-2xl flex flex-col justify-start h-72 relative overflow-hidden bg-gray-100 animate-pulse transition-opacity duration-300 ease-in-out">
    <!-- Image skeleton -->
    <div class="relative mx-auto w-full">
      <div class="p-5 bg-gray-200 h-72"></div>
    </div>
    
    <!-- Content skeleton -->
    <div class="absolute bottom-0 left-0 w-full p-2.5">
      <div class="p-2 w-full bg-slate-500/30 rounded-2xl">
        <!-- Title skeleton -->
        <div class="mb-2">
          <div class="w-32 h-3 bg-gray-200 rounded"></div>
        </div>
        
        <!-- Info skeleton -->
        <div class="space-y-2">
          <!-- Type badges skeleton -->
          <div class="flex gap-1">
            <div class="w-8 h-4 bg-gray-200 rounded-full"></div>
            <div class="w-12 h-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>
