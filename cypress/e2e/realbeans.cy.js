const STORE_PASSWORD = 'shewbi'
const BASE_URL = 'https://r1036939-realbeans.myshopify.com'

// Wachtwoord invullen als het scherm zichtbaar is
const bypassPassword = () => {
  cy.url().then((url) => {
    if (url.includes('/password')) {
      cy.get('input[type="password"]').type(STORE_PASSWORD)
      cy.get('button[type="submit"]').click()
      cy.url().should('not.include', '/password')
    }
  })
}

describe('RealBeans webshop tests', () => {

  it('homepage toont de introtekst', () => {
    cy.visit(BASE_URL)
    bypassPassword()
    cy.contains('Since 1801, RealBeans has roasted premium coffee').should('exist')
  })

  it('homepage toont de producten', () => {
    cy.visit(BASE_URL)
    bypassPassword()
    cy.get('main').contains('Roasted coffee beans 5kg').should('exist')
    cy.get('main').contains('Blended coffee 5kg').should('exist')
  })

  it('About pagina toont de historietekst', () => {
    cy.visit(`${BASE_URL}/pages/about`)
    bypassPassword()
    cy.contains('From a small Antwerp grocery').should('exist')
  })

  it('productcatalog toont beide producten', () => {
    cy.visit(`${BASE_URL}/collections/all`)
    bypassPassword()
    cy.get('main').contains('Roasted coffee beans 5kg').should('exist')
    cy.get('main').contains('Blended coffee 5kg').should('exist')
  })

  it('productdetailpagina toont juiste info', () => {
    cy.visit(`${BASE_URL}/collections/all`)
    bypassPassword()
    cy.get('main').contains('Roasted coffee beans 5kg').click({ force: true })
    cy.contains('Our best and sustainable real roasted beans').should('exist')
    cy.contains('$40').should('exist')
  })

})