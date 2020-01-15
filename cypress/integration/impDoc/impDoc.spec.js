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


describe('Test disclaim page without signin', ()=> {
    it('Should go to the disclaim page', ()=>{
        cy.get("[data-cy=imp-docs]").click()
        cy.url().should('include', '/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })

    it('Should go to the page with url', () => {
        cy.visit('/posts')
        cy.visit('/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })
})

describe('Test disclaim page with signin', ()=> {
    it('Should go to the disclaim page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.url().should("include", "/posts")
        // render disclaim page
        cy.get("[data-cy=imp-docs]").click()
        cy.url().should('include', '/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })

    it('Should go to the page with url', () => {
        cy.visit('/posts')
        cy.visit('/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })
})

