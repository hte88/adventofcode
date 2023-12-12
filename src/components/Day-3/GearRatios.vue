<script setup lang="ts">
import { isNumber, extractSymboles, createMapFile } from '~/composables/useLib';

interface IMap extends Map<string, string> {}
type TMapItem = {
  number: string;
  position: string;
};

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

function getNumberFromMap(mapFile: IMap, nums: string, rowIndex: number, colIndex: number, symboles: string[]) {
  const subMatrix = getSubMatrix(mapFile, rowIndex - 1, rowIndex + 1, colIndex - (nums.length + 1), colIndex);

  const position = parseSubMatrix(subMatrix, symboles);

  return position ? ({ number: nums, position } as TMapItem) : '';
}

function parseSubMatrix(subMatrix: IMap, symboles: string[]): string {
  let position = '';
  subMatrix.forEach((element: string, keyPosition: string) => {
    if (symboles.includes(element)) {
      position = keyPosition;
    }
  });
  return position;
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

function stepTwo() {
  const symboles = ['*'];
  const mapFile = createMapFile(lines.value);

  const numbers = lines.value.map((str, rowIndex) => {
    const char = str.split('');
    let nums = '';
    const numbers = [];

    for (let colIndex = 0; colIndex < char.length; colIndex++) {
      const element = char[colIndex];

      if (isNumber(element)) {
        nums += element;
        if (colIndex + 1 === lineLength.value) {
          const getNbr = getNumberFromMap(mapFile, nums, rowIndex, colIndex + 1, symboles);
          if (getNbr && getNbr.number) {
            numbers.push({ number: getNbr.number, position: getNbr.position } as TMapItem);
          }
          nums = '';
        }
      } else {
        if (nums.length) {
          const getNbr = getNumberFromMap(mapFile, nums, rowIndex, colIndex, symboles);
          if (getNbr && getNbr.number) {
            numbers.push({ number: getNbr.number, position: getNbr.position } as TMapItem);
          }
        }
        nums = '';
      }
    }

    return numbers;
  });

  const savePositionDuplicates = numbers.flat().filter((numsArray, index, arr) => {
    if (numsArray) {
      const currentPos = numsArray?.position;
      return arr.some(
        (otherArray, otherIndex) => otherIndex !== index && otherArray && otherArray?.position === currentPos,
      );
    }
    return false;
  });

  const multiplyByPos: { [position: string]: number } = {};

  savePositionDuplicates.forEach((numsArray) => {
    const position = numsArray?.position;
    const number = parseInt(numsArray?.number);

    if (!isNaN(number)) {
      if (multiplyByPos[position] === undefined) {
        multiplyByPos[position] = number;
      } else {
        multiplyByPos[position] *= number;
      }
    }
  });

  const result = Object.values(multiplyByPos).reduce((acc, product) => acc + product, 0);
  total.value = result;
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
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepTwo()">Step 2</button>
    </template>
  </Card>
</template>
