<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);

function stepOne() {
  const ob = {
    blue: 14,
    green: 13,
    red: 12,
  };
  const words = fileContent.value?.split('\n');
  const cut = words.map((str) => {
    const arr = str.replace(/:|;/g, ',').split(',').slice(1);

    return arr
      .map((str2) => {
        const ll = str2.split(' ').splice(1);
        return {
          [ll[1]]: parseInt(ll[0]),
        };
      })
      .reduce((acc, item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        acc[key] = (acc[key] || 0) + value;
        return acc;
      }, {});
  });
  console.log(cut);

  const p = cut
    .map((oto, index) => {
      if (oto.blue <= ob.blue && oto.red <= ob.red && oto.green <= ob.green) {
        console.log(oto);
        return index + 1;
      }
    })
    .filter((i) => i);
  console.log(p);

  total.value = p.reduce((a, b) => a + b);
  console.log(words);
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
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepOne()">Step 1</button>
    </template>
  </Card>
</template>
