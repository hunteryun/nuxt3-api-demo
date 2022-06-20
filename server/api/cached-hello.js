/*
  https://nitro.unjs.io/guide/cache.html
*/

export default defineCachedEventHandler(async () => {
  /* Emulate a response delay */
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    status: 200,
    response: `Response generated at ${new Date().toISOString()} (took 1 second)`
  }
})