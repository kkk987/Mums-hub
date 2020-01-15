let fixtures = {}

beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
    // Start tests from pots page
    cy.get("[data-cy=posts]").click()
    cy.fixture('adminUser.json').then((admin)=> {
        fixtures.adminUser = admin
    })
    cy.fixture('testingPost.json').then((post)=>{
        fixtures.testingPost = post
    })
})

describe('Test view all posts without signin', () => {
    it('Should load all posts', ()=>{
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=posts-content]").should('be.visible')
    })
})

describe('Test view a single post without signin', () => {
    it('Should load a single post', ()=>{
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=post-link]").first().click()        
        cy.get("[data-cy=post-content]").should('be.visible')
    })
})

describe('Test view posts as an admin', ()=>{
    it('Should load all posts', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=posts-content]").should('be.visible')
    })

    it('Should load a single post', ()=>{
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=post-link]").first().click()        
        cy.get("[data-cy=post-content]").should('be.visible')
    })
})

describe('Test add a post', ()=>{
    it('Should go to the add post page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()        
        cy.get("[data-cy=new-post]").should('be.visible')
        cy.get("[data-cy=new-post]").click()
        cy.url().should('include', '/posts/new')
        cy.get("[data-cy=new-post-form]").should('be.visible')
    })

    it('Should add a post', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()        
        cy.get("[data-cy=new-post]").should('be.visible')
        cy.get("[data-cy=new-post]").click()
        cy.url().should('include', '/posts/new')
        cy.get("[data-cy=new-post-form]").should('be.visible')
        cy.get("[data-cy=title]").type(fixtures.testingPost.title)
        cy.get("[data-cy=content]").type(fixtures.testingPost.content)
        cy.get("[data-cy=post-submit]").click()
        cy.root().should("contain",fixtures.testingPost.title)
        cy.root().should("contain",fixtures.testingPost.content)
    })

})
