<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);

function isNumber(x: string) {
  const nums = '0123456789';
  return nums.includes(x) ? true : false;
}

function mergeNumbers(nums: string[]) {
  if (nums.length >= 3) {
    return parseInt(nums[0] + nums.slice(-1));
  } else if (nums.length === 1) {
    return parseInt(nums[0] + nums[0]);
  } else {
    return parseInt(nums.reduce((x, y) => x + y, ''));
  }
}

function trebuchet() {
  const words = fileContent.value?.split('\n');

  const numbers = words
    ?.map((str) => mergeNumbers([...str].filter((x) => (isNumber(x) ? x : ''))))
    ?.filter((num) => Number.isInteger(num));

  total.value = numbers?.reduce((x, y) => x + y, 0) ?? 0;
}
</script>
<template>
  <div class="flex flex-col gap-y-5">
    <p class="font-semibold">Day 1 : Trebuchet</p>
    <input
      class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
      type="file"
      @change="handleFileChange"
    />
    <button
      v-if="fileContent"
      class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-blue-600"
      @click.prevent="trebuchet()"
    >
      Go step 1
    </button>

    <p><b>Result:</b> {{ total }}</p>
  </div>
</template>
