let fixtures = {}

beforeEach(() => {
  cy.viewport(1024, 768)
  cy.visit('/')
  // Start tests from about page
  cy.contains("About").click()
  cy.fixture('registeredUser.json').then((user) => {
    // See what we get back from the fxiture
    console.log('data from fixture:', user)
    fixtures.registeredUser = user
  })
})

describe('Test login', () => {
  it('Should go to the login page', () => {
    cy.get("[data-cy=login]").click()
    cy.url().should('include', '/auth/login')
  })

  it('should render SignIn component', () => {
    cy.get("[data-cy=login]").click()
    cy.get("[data-cy=loginForm]").should('be.visible')
  })

  it('can login', () => {
    cy.get("[data-cy=login]").click()
    cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
    cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
    cy.get("[data-cy=loginButton]").click()
    cy.url().should("include", "/")
  })
})

describe("Test logout", () => {
	it("should logout user", () => {
		cy.get("[data-cy=login]").click()
		cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
		cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
		cy.get("[data-cy=loginButton").click()
		cy.get("[data-cy=logout]").click()
		cy.get("[data-cy=navbarBrand").should("contain", "guest")
	})
})
