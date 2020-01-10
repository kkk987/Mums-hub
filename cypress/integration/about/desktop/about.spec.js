let fixtures = {}

beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
    // Start tests from pots page
    cy.get("[data-cy=posts]").click()
    cy.fixture('registeredUser.json').then((user) => {
      // See what we get back from the fxiture
      console.log('data from fixture:', user)
      fixtures.registeredUser = user
    })
})

describe('Test About page without signin for desktop', ()=> {
    it('Should go to the about page', ()=>{
        cy.get("[data-cy=about]").click()
        cy.url().should('include', '/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })

    it('Should go to the page with url', () => {
        cy.visit('/posts')
        cy.visit('/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })
})

describe('Test About page with signin for desktop', ()=> {
    it('Should go to the about page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.url().should("include", "/posts")
        // render about page
        cy.get("[data-cy=about]").click()
        cy.url().should('include', '/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })

    it('Should go to the page with url', () => {
        cy.visit('/posts')
        cy.visit('/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })
})

