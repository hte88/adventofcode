<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const lines = computed(() => fileContent.value?.split('\n').slice(0, -1) ?? []);

const symboles = computed(() => {
  const symboles = fileContent.value?.replace(/[\d.\n]/g, '');
  console.log(symboles);

  return [...new Set(symboles)];
});
const lineLength = computed(() => lines.value[0].length);
const linesLength = computed(() => lines.value.length);

const numbers = ref([]);
const numbersChecked = ref([]);

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
  console.log(startRow, endRow, startCol, endCol);

  const subMatrix = new Map();
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const key = `${row},${col}`;
      if (map.has(key)) {
        subMatrix.set(key, map.get(key));
      } else {
        subMatrix.set(key, null);
      }
    }
  }

  return subMatrix;
}

function stepOne() {
  lines.value.map((str, rowIndex) => {
    const char = str.split('');

    let nums = '';
    for (let colIndex = 0; colIndex < char.length; colIndex++) {
      const element = char[colIndex];

      if (isNumber(element)) {
        nums += element;
        if (colIndex + 1 === lineLength.value) {
          const subMatrix = getSubMatrix(
            mapFile.value,
            rowIndex - 1,
            rowIndex + 1,
            colIndex + 1 - (nums.length + 1),
            colIndex + 1,
          );

          subMatrix.forEach((element) => {
            if (symboles.value.includes(element)) {
              numbers.value.push(nums);
              nums = '';
              return false;
            }
          });
          nums = '';
        }
      } else {
        if (nums.length) {
          const subMatrix = getSubMatrix(
            mapFile.value,
            rowIndex - 1,
            rowIndex + 1,
            colIndex - (nums.length + 1),
            colIndex,
          );

          subMatrix.forEach((element) => {
            if (symboles.value.includes(element)) {
              numbers.value.push(nums);
              nums = '';
              return false;
            }
          });
        }
        nums = '';
      }
    }
  });

  console.log(numbers.value);
  console.log(
    numbers.value
      .filter((str) => str)
      .map((str) => parseInt(str))
      .reduce((a, b) => a + b, 0),
  );
}

1116;
// 77
//552 638 x
//563584 x
//558879 x
//558892 x
//558107 x
//56090 x
//55399 x
//55300 x
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
