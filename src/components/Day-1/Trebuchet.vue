<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const letters = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

function isNumber(x: string) {
  const nums = '0123456789';
  return nums.includes(x) ? true : false;
}

function isNumberToLetter(str: string): number {
  return letters[str] ?? 0;
}

function mergeNumbers(nums: string[]): number {
  if (nums.length >= 3) {
    return parseInt(nums[0] + nums.slice(-1));
  } else if (nums.length === 1) {
    return parseInt(nums[0] + nums[0]);
  } else {
    return parseInt(nums.reduce((x, y) => x + y, ''));
  }
}

function extractWords(str: string): number[] {
  const result: number[] = [];
  const strLower = str.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const subStr = strLower.substring(i, j);
      const num = isNumberToLetter(subStr);
      if (num) {
        result.push(num);
      }
    }
  }

  return result;
}

function stepOne() {
  const words = fileContent.value?.split('\n');

  const numbers = words
    ?.map((str) => mergeNumbers([...str].filter((x) => (isNumber(x) ? x : ''))))
    ?.filter((num) => Number.isInteger(num));

  total.value = numbers?.reduce((x, y) => x + y, 0) ?? 0;
}

function stepTwo() {
  const words = fileContent.value?.split('\n');

  const resultat = words?.map((word) => {
    const splitByDigital = word.match(/[a-zA-Z]+|\d+/g);
    return (
      splitByDigital
        ?.map((str: string) => {
          if (Number.isInteger(parseInt(str))) {
            return [...(str + '')];
          } else if (Object.keys(letters).find((motInList) => str.includes(motInList))) {
            return extractWords(str);
          } else {
            return null;
          }
        })
        ?.filter((str) => str)
        .flat() ?? []
    );
  });

  const numbers = resultat
    ?.map((str) => mergeNumbers([...str].filter((x) => (isNumber(x) ? x : ''))))
    ?.filter((num) => Number.isInteger(num));

  total.value = numbers?.reduce((x, y) => x + y, 0) ?? 0;
}
</script>
<template>
  <Card title="Day 1 : Trebuchet" :result="total">
    <template #inputFile>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs mx-auto"
        @change="handleFileChange"
      />
    </template>
    <template #actions>
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepOne()">Step 1</button>
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepTwo()">Step 2</button>
    </template>
  </Card>
</template>
