<script setup lang="ts">
import { isNumber, extractSymboles, createMapFile } from '~/composables/useLib';

interface IMap extends Map<string, string> {}

const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const lines = computed(() => fileContent.value?.split('\n').slice(0, -1) ?? []);
const lineLength = computed(() => lines.value[0].length);

function getSubMatrix(map: IMap, startRow: number, endRow: number, startCol: number, endCol: number): IMap {
  const subMatrix = new Map();

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const key = `${row},${col}`;
      if (map.has(key)) {
        subMatrix.set(key, map.get(key));
      }
    }
  }

  return subMatrix;
}

function parseSubMatrix(subMatrix: IMap, symboles: string[]): boolean {
  let findSymbole = false;

  subMatrix.forEach((element: string) => {
    if (symboles.includes(element)) {
      findSymbole = true;
    }
  });
  return findSymbole;
}

function getNumberFromMap(mapFile: IMap, nums: string, rowIndex: number, colIndex: number, symboles: string[]): string {
  const subMatrix = getSubMatrix(mapFile, rowIndex - 1, rowIndex + 1, colIndex - (nums.length + 1), colIndex);

  return parseSubMatrix(subMatrix, symboles) ? nums : '';
}

function stepOne() {
  const symboles = extractSymboles(fileContent.value, ['.']);
  const mapFile = createMapFile(lines.value);

  const numbers = lines.value
    .map((str, rowIndex) => {
      const char = str.split('');
      let nums = '';
      const numbers = [];

      for (let colIndex = 0; colIndex < char.length; colIndex++) {
        const element = char[colIndex];
        if (isNumber(element)) {
          nums += element;
          if (colIndex + 1 === lineLength.value) {
            const getNbr = getNumberFromMap(mapFile, nums, rowIndex, colIndex + 1, symboles);
            if (getNbr) {
              numbers.push(nums);
            }
            nums = '';
          }
        } else {
          if (nums.length) {
            const getNbr = getNumberFromMap(mapFile, nums, rowIndex, colIndex, symboles);
            if (getNbr) {
              numbers.push(nums);
            }
          }
          nums = '';
        }
      }

      return numbers;
    })
    .flat();

  total.value = numbers
    .filter((str) => str)
    .map((str) => parseInt(str))
    .reduce((a, b) => a + b, 0);
}
</script>
<template>
  <Card title="Day 3: Gear Ratios" :result="total">
    <template #inputFile>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs mx-auto"
        @change="handleFileChange"
      />
    </template>
    <template #actions>
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepOne()">Step 1</button>
    </template>
  </Card>
</template>
