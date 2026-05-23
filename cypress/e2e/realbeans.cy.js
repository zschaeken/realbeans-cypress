const STORE_PASSWORD = 'shewbi'
const BASE_URL = 'https://r1036939-realbeans.myshopify.com'

// Sessie wordt eenmalig aangemaakt en hergebruikt door alle tests
// cy.session() slaat cookies automatisch op na het inloggen
const login = () => {
  cy.session('shopify-login', () => {
    cy.visit(BASE_URL)
    cy.get('input[type="password"]').type(STORE_PASSWORD)
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/password')
  })
}

describe('RealBeans webshop tests', () => {

  beforeEach(() => {
    login()
  })

  it('homepage toont de introtekst', () => {
    cy.visit(BASE_URL)
    cy.contains('Since 1801, RealBeans has roasted premium coffee').should('be.visible')
  })

  it('homepage toont de producten', () => {
    cy.visit(BASE_URL)
    cy.contains('Roasted coffee beans 5kg').should('be.visible')
    cy.contains('Blended coffee 5kg').should('be.visible')
  })

  it('About pagina toont de historietekst', () => {
    cy.visit(`${BASE_URL}/pages/about`)
    cy.contains('From a small Antwerp grocery').should('be.visible')
  })

  it('productcatalog toont beide producten', () => {
  cy.visit(`${BASE_URL}/collections/all`)
  // Zoek specifiek in de productlijst, niet in het navigatiemenu
  cy.get('.product-card, .card, main').contains('Roasted coffee beans 5kg').should('exist')
  cy.get('.product-card, .card, main').contains('Blended coffee 5kg').should('exist')
})

it('productdetailpagina toont juiste info', () => {
  cy.visit(`${BASE_URL}/collections/all`)
  // force: true omdat de productafbeelding de link bedekt
  cy.get('main').contains('Roasted coffee beans 5kg').click({ force: true })
  cy.contains('Our best and sustainable real roasted beans').should('exist')
  cy.contains('$40').should('exist')
})

})