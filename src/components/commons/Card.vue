<script setup lang="ts">
const emit = defineEmits(['selectedInput']);
defineProps({
  title: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 1,
  },
});

const example = defineModel<string>('example');

const modal = ref(false);
const toggleInput = ref(true);

watch(toggleInput, () => emit('selectedInput', toggleInput.value));
</script>
<template>
  <div class="relative flex h-full flex-col justify-between">
    <div class="flex flex-1 flex-col gap-y-5 p-8">
      <div class="absolute right-1 top-1">
        <div class="rating">
          <input
            v-for="i in rating"
            :key="i"
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-yellow-500"
            :checked="i === rating"
            readonly
          />
        </div>
      </div>
      <p class="font-semibold text-gray-900">{{ title }}</p>
      <label class="label cursor-pointer">
        <span class="label-text text-gray-900">Use the example or yours</span>
        <input v-model="toggleInput" type="checkbox" class="toggle toggle-primary" />
      </label>
      <div v-if="toggleInput">
        <button class="btn btn-primary w-full" @click="modal = true">View example</button>
      </div>
      <slot v-else name="inputFile" />
      <div class="join justify-center">
        <slot name="actions" />
      </div>
    </div>

    <div class="border-t border-gray-200">
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <p
            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
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
  <div class="modal" :class="{ 'modal-open': modal }">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Use this example for the test or yours</p>
      <small class="mb-4 block text-red-500">Careful with space</small>
      <textarea v-model="example" class="textarea textarea-primary h-60 w-full">{{ example }}</textarea>
      <div class="modal-action">
        <button class="btn btn-primary" @click="modal = false">Close</button>
      </div>
    </div>
  </div>
</template>
