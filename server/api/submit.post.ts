/* https://github.com/unjs/unstorage */

import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'

const storage = createStorage({
  driver: fsDriver({
    base: './fs-storage'
  })
})

export default defineEventHandler(async (req) => {
  /* Nuxt 3 uses h3 as its HTTP server, with its function being auto-imported
    https://github.com/unjs/h3
    https://www.jsdocs.io/package/h3
  */
  const value = await readBody(req)

  await storage.setItem('my-value', value.inputValue)

  const myValue = await storage.getItem('my-value')

  return {
    status: 201,
    response: `Value ${myValue} saved in storage`
  }
})
