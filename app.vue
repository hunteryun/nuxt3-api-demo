<template>
  <div>
    <input v-model="inputValue" />
    <button @click="postContent">
      POST some content
    </button>
  </div>
</template>

<script setup lang="ts">
const inputValue = ref('a default value')

const postContent = async () => {
  await useFetch('/api/submit', {
    method: 'POST',
    body: {
      inputValue: inputValue.value
    },
    key: `${inputValue.value}-${new Date().toISOString()}`
  })
}
</script>
