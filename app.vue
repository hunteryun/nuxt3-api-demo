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

/* Côté back-end (lors du SSR), useFetch et useAsyncData feront un simple appel de fonction si on utilise le dossier server/api, donc on s'épargne un call HTTP */
/* Le call HTTP est automatiquement typé, si tu survoles la fonction dans VSCode */
const { data } = await useFetch('/api/hello')

/* Si on ne voulait qu'une partie de la réponse, on pourrait faire :

  const { data } = await useFetch('/api/hello', {
    pick: ['response']
  })

  Essaie et regarde la computed en-dessous dans VSCode :)
  - pick([]) est super utile pour limiter le payload reçu dans window.__NUXT__

*/

/* Grâce au typage, si tu remplaces data.value.status par data.value.response, tu auras un warning TS */
const double = computed(() => data.value.status * 2)

const inputValue = ref('a default value')

/* POSt vers la route /api/submit (fichier server/api/submit.post.ts), qui accepte le POST grâce au postfix .post dans son nom */
const postContent = async () => {
  await useFetch('/api/submit', {
    method: 'POST',
    body: {
      inputValue: inputValue.value
    },
    /* Pour l'instant, une key unique est nécessaire sinon le call sera mis en cache et ne pourra pas s'effectuer plusieurs fois de suite avec les même params
      Si on voulait éviter de spécifier cette clé, on pourrait utiliser $fetch à la place de useFetch
      (useFetch est un wrapper autour de https://github.com/unjs/ohmyfetch)
    */
    key: `${inputValue.value}-${new Date().toISOString()}`
  })
}
</script>
