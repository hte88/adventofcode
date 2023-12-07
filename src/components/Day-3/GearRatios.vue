<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const lines = computed(() => fileContent.value?.split('\n').slice(0, -1) ?? []);

const symboles = computed(() => {
  const symboles = fileContent.value?.replace(/[\d.\n]/g, '');
  return [...new Set(symboles)];
});
const lineLength = computed(() => lines.value[0].length);
const linesLength = computed(() => lines.value.length);

function isNumber(x: string) {
  return /\d/.test(x);
}

const mapFile = computed(() => {
  let mapFile = new Map();
  lines.value?.forEach((row, rowIndex) => {
    Array.from(row).forEach((str, colIndex) => {
      mapFile.set(`${rowIndex},${colIndex}`, str);
    });
  });
  return mapFile;
});

function getSubMatrix(map, startRow, endRow, startCol, endCol) {
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

function mapToString(subMatrix) {
  let resultString = '';

  subMatrix.forEach((value) => {
    resultString += value;
  });

  return [resultString];
}

function parseSubMatrix(subMatrix) {
  const numbers = [];

  subMatrix.forEach((value, key) => {
    const newKey = key.split(',');
    const rowIndex = newKey[0];
    const colIndex = newKey[1];
    if (isNumber(value)) {
      const left = getAreaNumber(rowIndex, colIndex, '-', []).reverse().join('');
      const right = getAreaNumber(rowIndex, colIndex, '+', []).join('');

      let mapString = mapToString(getSubMatrix(mapFile.value, rowIndex - 1, rowIndex + 1, 0, lineLength.value));

      mapString = mapString[0].match(/\d+/g) || [];
      if (mapString.find((str) => str === left)) {
        numbers.push(parseInt(left));
      }
      if (mapString.find((str) => str === right)) {
        numbers.push(parseInt(right));
      }
    }
  });

  return numbers;
}

function getAreaNumber(rowIndex, colIndex, symbole, number) {
  if (number.length > 20) return;
  const key = `${rowIndex},${colIndex}`;
  const element = mapFile.value.get(key);
  const newColIndex = symbole === '-' ? colIndex - 1 : colIndex + 1;

  if (element && isNumber(element)) {
    number.push(element);
    return getAreaNumber(rowIndex, newColIndex, symbole, number);
  }
  return number;
}

function stepOne() {
  const expressionReguliere = new RegExp(`[${symboles.value.map((symbole) => '\\' + symbole).join('')}]`, 'g');

  const nbr = lines.value
    .map((str, rowIndex) => {
      const char = str.split('');
      for (let colIndex = 0; colIndex <= char.length; colIndex++) {
        const element = char[colIndex];
        const symbolePerChar = str.match(expressionReguliere) || [];
        /* for (let index = 0; index < symbolePerChar.length; index++) {
          console.log(symbolePerChar, index);

          const element2 = symbolePerChar[index];
          console.log(element2); */
        if (symboles.value.includes(element)) {
          const subMatrix = getSubMatrix(mapFile.value, rowIndex - 1, rowIndex + 1, colIndex - 2, colIndex + 2);
          console.log(element, 'subMatrix => ', subMatrix);
          const numbersInMap = parseSubMatrix(subMatrix);
          return numbersInMap;
          //}
        }
      }
    })
    .filter((str) => str)
    .flat();

  console.log(nbr);

  symboles.value;
  total.value = nbr.reduce((a, b) => a + b);
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
