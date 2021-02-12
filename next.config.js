module.exports = {
  i18n: {
    locales: ['es-AR'],
    defaultLocale: 'es-AR',
  },

  serverRuntimeConfig: {
    myApiURL: process.env.MY_API_URL,
    apiURL: 'http://localhost:3000/api/graphql',
  },
  publicRuntimeConfig: {
    apiURL: '/api/graphql',
  },
}
