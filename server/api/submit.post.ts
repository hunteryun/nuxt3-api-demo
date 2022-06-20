/* https://github.com/unjs/unstorage */

import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import memoryDriver from 'unstorage/drivers/memory'

/* FYI, this is how to create a driver. Pretty straightforward : https://github.com/unjs/unstorage/blob/main/src/drivers/memory.ts */

/* Select storage type depending on env: */
const getStorageDriver = () => {
  /* env is declared in the nuxt.config file, but could be provided by a .env file as well. See:
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
  /* Nuxt 3 uses h3 as its HTTP server, with its function being auto-imported
    https://github.com/unjs/h3
    https://www.jsdocs.io/package/h3
  */
  const value = await useBody(req)

  await storage.setItem('my-value', value.inputValue)

  const myValue = await storage.getItem('my-value')

  return {
    status: 201,
    response: `Value ${myValue} saved in storage`
  }
})