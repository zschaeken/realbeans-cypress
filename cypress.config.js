const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'm2x5qi',
  
  // Minder tests in geheugen houden om crashes te vermijden
  numTestsKeptInMemory: 1,
  experimentalMemoryManagement: true,

  e2e: {
    baseUrl: 'https://r1036939-realbeans.myshopify.com',
    setupNodeEvents(on, config) {},
  },
})