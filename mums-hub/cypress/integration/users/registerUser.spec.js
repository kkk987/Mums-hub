let fixtures = {}

beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
    // Start tests from about page
    cy.contains("About").click()
    cy.fixture('unregisteredUser.json').then((user) => {
        // See what we get back from the fixture
        console.log('data from fixture: ', user)
        fixtures.newUser = user
    })
    logoutUser()
})

function logoutUser() {
    // If user is logged in, log out
	cy.get("[data-cy=navbar]").then(navbar => {
		if (navbar.find("[data-cy=logout]").length > 0) {
			cy.get("[data-cy=logout").click()
		}
	})
}

describe('Test registeration', () => {
    it('Should go to the registeration page', () => {
        cy.get("[data-cy=register]").click()
        cy.url().should('include', '/auth/register')
    })

    it('Should render register component', () => {
        cy.get("[data-cy=register]").click()
        cy.get("[data-cy=registerForm]").should('be.visible')
    })

    it('Can register', () => {
        cy.get("[data-cy=register]").click()
        cy.get("[data-cy=username]").type(fixtures.newUser.username)
        cy.get("[data-cy=email]").type(fixtures.newUser.email)
        cy.get("[data-cy=password]").type(fixtures.newUser.password)
        cy.get("[data-cy=duedate]").type(fixtures.newUser.duedate)
        cy.get("[data-cy=registerButton]").click()
        cy.url().should("include", "/auth/login")
    })

    it('Can login with new username', () => {
        cy.get("[data-cy=register]").click()
        cy.get("[data-cy=username]").type(fixtures.newUser.username)
        cy.get("[data-cy=email]").type(fixtures.newUser.email)
        cy.get("[data-cy=password]").type(fixtures.newUser.password)
        cy.get("[data-cy=duedate]").type(fixtures.newUser.duedate)
        cy.get("[data-cy=registerButton]").click()
        cy.get("[data-cy=username]").type(fixtures.newUser.username)
        cy.get("[data-cy=password]").type(fixtures.newUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.get("[data-cy=logout]").its('length').should('be.gt', 0)            
    })
})