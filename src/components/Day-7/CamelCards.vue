<script setup lang="ts">
type THand = { hand: string; bid: number };

const { fileContent, handleFileChange } = useFileReader();

const example = ref(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);

const total = ref<number>(0);
const selectedInput = ref(true);

const lines = computed(() => {
  const file = selectedInput.value ? example.value : fileContent.value;
  return selectedInput.value ? file?.split('\n') ?? [] : file?.split('\n').slice(0, -1) ?? [];
});

function ranking(hand: string) {
  const groupByChar = {} as { [key: string]: number };

  for (const card of hand) {
    if (!groupByChar[card]) {
      groupByChar[card] = 1;
    } else {
      groupByChar[card]++;
    }
  }

  const keysValues = Object.keys(groupByChar);

  switch (true) {
    case keysValues.some((value) => groupByChar[value] === 5): //Five of a kind
      return 6;
    case keysValues.some((value) => groupByChar[value] === 4): //Four of a kind
      return 5;
    case keysValues.some((value) => groupByChar[value] === 3) && keysValues.some((value) => groupByChar[value] === 2): //Full house
      return 4;
    case keysValues.some((value) => groupByChar[value] === 3): //Three of a kind
      return 3;
    case keysValues.filter((value) => groupByChar[value] === 2).length === 2: //Two pair
      return 2;
    case keysValues.some((value) => groupByChar[value] === 2): //One pair
      return 1;
    default: //High card
      return 0;
  }
}

function order(a: string, b: string) {
  const order = 'AKQJT98765432';

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const diff = order.indexOf(b[i]) - order.indexOf(a[i]);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

function stepOne() {
  const hands: THand[] = lines.value.map((line) => {
    const str = line.split(' ');
    return { hand: str[0], bid: parseInt(str[1]) };
  });

  hands.sort((a, b) => {
    const rangA = ranking(a.hand);
    const rangB = ranking(b.hand);

    if (rangA !== rangB) {
      return rangA - rangB;
    }

    return order(a.hand, b.hand);
  });

  total.value = hands.reduce((a, b, i) => a + b.bid * (i + 1), 0);
}

/* function stepTwo() {
  // total.value = scratchcards.reduce((a, b) => a + b, 0);
} */
</script>
<template>
  <Card
    v-model:example="example"
    title="Day 7: Camel Cards"
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
      <button type="button" class="btn btn-primary join-item" @click.prevent="stepOne()">Step 1</button>
      <!-- <button type="button" class="btn btn-primary join-item" @click.prevent="stepTwo()">Step 2</button> -->
    </template>
  </Card>
</template>
