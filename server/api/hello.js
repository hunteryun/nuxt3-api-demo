/*https://v3.nuxtjs.org/guide/features/server-routes */

export default defineEventHandler(async () => {
  return {
    status: 200,
    response: `Response generated at ${new Date().toISOString()}`
  }
})