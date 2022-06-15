/*
  https://nitro.unjs.io/guide/cache.html
*/

export default defineCachedEventHandler(async () => {
  /* On simule un délai de réponse */
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    status: 200,
    response: `Response generated at ${new Date().toISOString()} (took 1 second)`
  }
})