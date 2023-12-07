<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-1 flex-col p-8 gap-y-5">
      <p class="font-semibold text-gray-900">{{ title }}</p>
      <slot name="inputFile" />
      <div class="join justify-center">
        <slot name="actions" />
      </div>
    </div>

    <div class="border-t border-gray-200">
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <p
            class="relative font-semibold -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm text-gray-900"
          >
            Result
          </p>
        </div>
        <div class="-ml-px flex w-0 flex-1">
          <p
            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
          >
            {{ result }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
