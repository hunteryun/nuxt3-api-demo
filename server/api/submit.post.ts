/* https://github.com/unjs/unstorage */

import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import memoryDriver from 'unstorage/drivers/memory'

/* Pour info, voilà comment on créé un driver, assez facile : https://github.com/unjs/unstorage/blob/main/src/drivers/memory.ts */

/* Choisir le type de storage en fonction d'une variable d'env */
const getStorageDriver = () => {
  /* env est déclaré dans le nuxt.config, mais il pourrait venir d'un fichier .env
     https://v3.nuxtjs.org/guide/features/runtime-config
  */
  const { env } = useRuntimeConfig()

  if (env === 'production') {
    return fsDriver({
      base: './fs-storage'
    })
  }

  return memoryDriver()

}

const storage = createStorage({
  driver: getStorageDriver()
})

export default defineEventHandler(async (req) => {
  /* Nuxt 3 utilise h3 comme serveur HTTP, avec l'auto-import de ses fonctions
    https://github.com/unjs/h3
    https://www.jsdocs.io/package/h3
  */
  const value = await useBody(req)

  await storage.setItem('my-value', value.inputValue)

  const myValue = await storage.getItem('my-value')

  /*
  console.log(myValue)
  */

  return {
    status: 201,
    response: `Value ${myValue} saved in storage`
  }
})