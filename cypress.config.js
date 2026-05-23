const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Koppeling met Cypress Cloud project
  projectId: 'm2x5qi',

  e2e: {
    baseUrl: 'https://r1036939-realbeans.myshopify.com',
    setupNodeEvents(on, config) {},
  },
})