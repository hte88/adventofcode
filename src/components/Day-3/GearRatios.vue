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
      } else {
        subMatrix.set(key, null);
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

function mapToNumber(subMatrix) {
  const resultString = [];

  subMatrix.forEach((value, key) => {
    if (isNumber(value)) {
      resultString.push({ key, value });
    }
  });

  return resultString;
}

const direction = {
  0: 'left',
  1: 'both',
  2: 'right',
  3: 'left',
  4: 'not',
  5: 'right',
  6: 'left',
  7: 'both',
  8: 'right',
};

function ia(matrix) {
  const numbers = [];

  if (matrix[1].number.length > 0) {
    // Vérifier et fusionner avec matrix[i-1]
    let p = '';
    if (matrix[0].number.length > 0) {
      p += matrix[0].number.concat(matrix[1].number).join('');
    }
    // Vérifier et fusionner avec matrix[i+1]
    if (matrix[2].number.length > 0) {
      p += matrix[2].number.concat(matrix[1].number).join('');
    }
    numbers.push(p);
  } else {
    let p = '';
    if (matrix[0].number.length > 0) {
      p += matrix[0].number.join('');
    }
    // Vérifier et fusionner avec matrix[i+1]
    if (matrix[2].number.length > 0) {
      p += matrix[2].number.join('');
    }
    numbers.push(p);
  }

  if (matrix[7].number.length > 0) {
    // Vérifier et fusionner avec matrix[i-1]
    let p = '';
    if (matrix[6].number.length > 0) {
      p += matrix[6].number.concat(matrix[7].number).join('');
    }
    // Vérifier et fusionner avec matrix[i+1]
    if (matrix[8].number.length > 0) {
      p += matrix[8].number.concat(matrix[7].number).join('');
    }
    numbers.push(p);
  } else {
    let p = '';
    if (matrix[6].number.length > 0) {
      p += matrix[6].number.join('');
    }
    // Vérifier et fusionner avec matrix[i+1]
    if (matrix[8].number.length > 0) {
      p += matrix[8].number.join('');
    }
    numbers.push(p);
  }
  if (matrix[3].number.length > 0) {
    numbers.push(matrix[3].number.join(''));
  }
  if (matrix[5].number.length > 0) {
    numbers.push(matrix[5].number.join(''));
  }
  console.log(numbers);
}

/* const processRow = (matrix, startIndex, endIndex) => {
  let p = '';
  for (let i = startIndex; i <= endIndex; i++) {
    if (matrix[i].number.length > 0) {
      p += matrix[i].number.join('');
    }
    console.log(p);
  }
  return p;
}; */

const processRow = (matrix, startIndex, middleIndex, endIndex) => {
  let p = '';

  if (matrix[middleIndex].number.length > 0) {
    if (matrix[startIndex].number.length === 1 && matrix[endIndex].number.length === 1) {
      if (matrix[startIndex].number.length > 0) {
        p += matrix[startIndex].number.concat(matrix[middleIndex].number).join('');
        console.log(p);
      }
      if (matrix[endIndex].number.length > 0) {
        p += matrix[endIndex].number;
        console.log(p);
      }
    } else {
    }
  } else {
    let p = [];
    if (matrix[startIndex].number.length > 0) {
      p.push(matrix[startIndex].number.join(''));
    }
    if (matrix[endIndex].number.length > 0) {
      p.push(matrix[endIndex].number.join(''));
    }
    return p;
  }

  return [p];
};

function parseSubMatrix(subMatrix) {
  const numbers = [];
  //console.log(subMatrix);
  let i = 0;
  subMatrix.forEach((value, key) => {
    //console.log(value);

    const newKey = key.split(',');
    const rowIndex = parseInt(newKey[0]);
    const colIndex = parseInt(newKey[1]);
    let numbersMatrix = {};
    if (isNumber(value)) {
      let mapString = [];
      if (direction[i] === 'left') {
        numbersMatrix = getAreaNumber(0, rowIndex, colIndex, '-', [], []);
      } else if (direction[i] === 'both') {
        numbersMatrix = { number: [value], keys: [key] };
      } else if (direction[i] === 'right') {
        numbersMatrix = getAreaNumber(0, rowIndex, colIndex, '+', [], []);
      } else {
        numbersMatrix = { number: [], keys: [] };
      }

      //mapString = mapString[0].match(/\d+/g) || [];
      /* const left = getAreaNumber(0, rowIndex, colIndex, '-', [], []);
      const leftNumber = { numbers: left.number.reverse().join(''), keys: left.keys.reverse() };
      const right = getAreaNumber(0, rowIndex, colIndex, '+', [], []);

      const rightNumber = { numbers: right.number.join(''), keys: right.keys };

      let mapString = [];
      console.log(newKey);

      console.log(getSubMatrix(mapFile.value, rowIndex, rowIndex, colIndex - 3, colIndex + 3));

      mapString = mapToString(getSubMatrix(mapFile.value, rowIndex, rowIndex, colIndex - 3, colIndex + 3));

      mapString = mapString[0].match(/\d+/g) || [];
      console.log(mapString);
      console.log(leftNumber, rightNumber);

      if (mapString.find((str) => str === leftNumber.numbers)) {
        numbers.push(leftNumber);
      }
      if (mapString.find((str) => str === rightNumber.numbers)) {
        numbers.push(rightNumber);
      } */
    } else {
      numbersMatrix = { number: [], keys: [] };
    }
    numbers.push(numbersMatrix);

    i++;
  });
  //ia(numbers);

  /* let l = [];
  l.push(processRow(numbers, 0, 2));
  l.push(processRow(numbers, 6, 8));
  console.log(numbers[3].number);

  if (numbers[3].number.length > 0) l.push(numbers[3].number.join(''));
  if (numbers[5].number.length > 0) l.push(numbers[5].number.join(''));
  console.log(l); */
  let l = [];
  l.push(processRow(numbers, 0, 1, 2));
  l.push(processRow(numbers, 6, 7, 8));

  if (numbers[3].number.length > 0) l.push([numbers[3].number.join('')]);
  if (numbers[5].number.length > 0) l.push([numbers[5].number.join('')]);

  console.log(l);

  return l;
}

function getAreaNumber(i, rowIndex, colIndex, symbole, number, keys) {
  const key = `${rowIndex},${colIndex}`;
  const element = mapFile.value.get(key);
  const newColIndex =
    symbole === '-'
      ? i >= 0
        ? parseInt(colIndex) - 1
        : parseInt(colIndex)
      : i >= 0
        ? parseInt(colIndex) + 1
        : parseInt(colIndex);

  if (element && isNumber(element) && newColIndex >= -1) {
    symbole === '-' ? number.unshift(element) : number.push(element);
    symbole === '-' ? keys.unshift(key) : keys.push(key);
    return getAreaNumber((i = i + 1), rowIndex, newColIndex, symbole, number, keys);
  }
  return { number, keys };
}

function stepOne() {
  // const expressionReguliere = new RegExp(`[${symboles.value.map((symbole) => '\\' + symbole).join('')}]`, 'g');
  const schemaArray = fileContent.value.split('\n').map((row) => row.split(''));
  console.table(schemaArray);

  const nbr = lines.value
    .map((str, rowIndex) => {
      const char = str.split('');
      const numbersArray = [];
      //const symbolePerChar = str.match(expressionReguliere) || [];

      for (let colIndex = 0; colIndex <= char.length; colIndex++) {
        //for (let index = 0; index < symbolePerChar.length; index++) {
        const element = char[colIndex];
        if (symboles.value.includes(element)) {
          const subMatrix = getSubMatrix(mapFile.value, rowIndex - 1, rowIndex + 1, colIndex - 1, colIndex + 1);
          //          console.log(subMatrix);

          const numbersInMap = parseSubMatrix(subMatrix);
          numbersArray.push(numbersInMap);
        }
      }
      return numbersArray;
    })
    .flat()
    .filter((str) => str);

  console.log(
    nbr
      .flat()
      .map((item) => item.filter((str) => str))
      .filter((str) => str.length)
      .map((item) => parseInt(item)),
  );
  console.log(
    nbr
      .flat()
      .map((item) => item.filter((str) => str))
      .filter((str) => str.length)
      .map((item) => parseInt(item))
      .reduce((a, b) => a + b),
  );

  const tableauSansDoublons = nbr.map((sousTableau) => {
    const keysDejaVues = new Set();

    return sousTableau
      .filter((element) => {
        const keyString = JSON.stringify(element.keys);
        if (!keysDejaVues.has(keyString)) {
          keysDejaVues.add(keyString);
          return true;
        }
        return false;
      })
      .map((element) => parseInt(element.numbers));
  });

  console.log(tableauSansDoublons);
  console.log(tableauSansDoublons.flat());
  console.log(mapFile.value);

  symboles.value;
  total.value = tableauSansDoublons.flat().reduce((a, b) => a + b);
  //558879 x
  //558892 x
  //558107 x
  //56090 x
  //55399 x
  //55300 x
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
