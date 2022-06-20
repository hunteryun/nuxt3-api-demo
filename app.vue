<template>
  <div>
    {{ data }}
    <hr/>
    <input v-model="inputValue" />
    <button @click="postContent">
      POST some content
    </button>
  </div>
</template>

<script setup lang="ts">
/* https://v3.nuxtjs.org/guide/features/data-fetching */

/* Du ring the (back-end) SSR phase, useFetch and useAsyncData perform a simple function call if using the server/api folder, so we can spare an HTTP call */
/* The HTTP call is automatically typed, if you hover over the function in VSCode */
const { data } = await useFetch('/api/hello')

/* If we only wanted a partial response, we could do:

  /* const { data } = await useFetch('/api/hello', {
    pick: ['response']
  }) */

  /* Try it and look at the computed below in VSCode
    - pick([]) and transform() are super useful to limit the payload in window.__NUXT__

*/

/* Thanks to types, if we replace data.value.status with data.value.response, a TS warning will be raised */
const double = computed(() => data.value.status * 2)

const inputValue = ref('a default value')

/* POSt to route /api/submit (file: server/api/submit.post.ts), which accepts the POST method thanks to postfix .post in its name */
const postContent = async () => {
  await useFetch('/api/submit', {
    method: 'POST',
    body: {
      inputValue: inputValue.value
    },
    /* For now, a unique key is required otherwise the HTTP call will be cached and won't be executed multiple times if the body does not change
      To avoid this key, we could use $fetch instead of useFetch
      (useFetch is a wrapper around https://github.com/unjs/ohmyfetch)
    */
    key: `${inputValue.value}-${new Date().toISOString()}`
  })
}
</script>
