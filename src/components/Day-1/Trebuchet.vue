<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
let nums = "0123456789";

function count(){
    const array = input.value.split('\n')
    console.log(array);
}
</script>
<template>
  <div>
    <textarea v-model="input" />
    <button @click="count">Count</button>
  </div>
</template>
