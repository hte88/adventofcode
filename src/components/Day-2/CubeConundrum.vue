<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const words = computed(() => fileContent.value?.split('\n'));
const ob = {
  blue: 14,
  green: 13,
  red: 12,
};

function parseWord(word) {
  const wordSections = word.split(':').slice(1);
  const gameData = wordSections[0]?.split(';');
  const lines = gameData?.map((line) => line.split(','));

  return lines?.map((lineData) => {
    const lineValues = lineData
      ?.map((value) => {
        const tokens = value.split(' ').splice(1);
        return { [tokens[1]]: parseInt(tokens[0]) };
      })
      .reduce((acc, obj) => ({ ...acc, ...obj }), {});
    const defaultObj = { blue: 0, green: 0, red: 0 };
    return { ...defaultObj, ...lineValues };
  });
}

function filterAndMap(parsedWords, ob) {
  return parsedWords
    ?.map((lineArray, index) => {
      return lineArray.map((lineObject) => {
        if (lineObject.blue <= ob.blue && lineObject.red <= ob.red && lineObject.green <= ob.green) {
          return index + 1;
        }
      });
    })
    ?.map((valueArray) => (valueArray.includes(undefined) ? 0 : valueArray))
    ?.flat();
}

function stepOne(words, ob) {
  const parsedWords = words?.map((word) => parseWord(word)).filter((line) => line);
  const resultArray = filterAndMap(parsedWords, ob);

  total.value = [...new Set(resultArray)]?.reduce((acc, value) => acc + value);
}
</script>
<template>
  <Card title="Day 2 : Cube Conundrum" :result="total">
    <template #inputFile>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs mx-auto"
        @change="handleFileChange"
      />
    </template>
    <template #actions>
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepOne(words, ob)">Step 1</button>
    </template>
  </Card>
</template>
