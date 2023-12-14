<script setup lang="ts">
type TColors = 'blue' | 'red' | 'green';
type TShema = { [key in TColors]: number };
const ob: TShema = {
  blue: 14,
  green: 13,
  red: 12,
};

const { fileContent, handleFileChange } = useFileReader();

const example = ref(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);
const total = ref<number>(0);
const selectedInput = ref(true);

const words = computed(() => {
  const file = selectedInput.value ? example.value : fileContent.value;
  return file?.split('\n') ?? [];
});

function parseWord(word: string) {
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
    return { ...{ blue: 0, green: 0, red: 0 }, ...lineValues };
  });
}

function filterAndMap(parsedWords: TShema[][], ob: TShema): number[] {
  return parsedWords
    ?.map((lineArray, index) =>
      lineArray.map((lineObject) =>
        lineObject.blue <= ob.blue && lineObject.red <= ob.red && lineObject.green <= ob.green ? index + 1 : 0,
      ),
    )
    ?.map((valueArray) => (valueArray.includes(0) ? 0 : valueArray))
    ?.flat();
}

function stepOne(words: string[], ob: TShema) {
  const parsedWords: TShema[][] = words?.map((word) => parseWord(word)).filter((line) => line);
  const resultArray: number[] = filterAndMap(parsedWords, ob);

  total.value = [...new Set(resultArray)]?.reduce((a, b) => a + b, 0) ?? 0;
}
</script>
<template>
  <Card
    v-model:example="example"
    title="Day 2 : Cube Conundrum"
    :result="total"
    :rating="1"
    @selected-input="selectedInput = $event"
  >
    <template #inputFile>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary mx-auto w-full max-w-xs"
        @change="handleFileChange"
      />
    </template>
    <template #actions>
      <button type="button" class="btn btn-primary join-item" @click.prevent="stepOne(words, ob)">Step 1</button>
    </template>
  </Card>
</template>
