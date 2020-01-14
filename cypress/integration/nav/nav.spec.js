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
    cy.fixture('adminUser.json').then((admin)=> {
        fixtures.adminUser = admin
    })
})

describe('Test nav bar without signin', () => {
    it('Should go to the login page', ()=>{
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
    })
    
    it('Should go to the signup page', ()=>{
        cy.get("[data-cy=register]").click()
        cy.url().should('include', '/auth/register')
        cy.get("[data-cy=registerForm]").should('be.visible')
    })
    
    it('Should go to the about page', ()=>{
        cy.get("[data-cy=about]").click()
        cy.url().should('include', '/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })

    it('Should go to the posts page', ()=>{
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=posts-content]").should('be.visible')
    })
    
    it('Should go to the disclaim page', ()=>{
        cy.get("[data-cy=imp-docs]").click()
        cy.url().should('include', '/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })

})

describe('Test nav bar with admin', () => {
    it('Should go to the login page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.url().should("include", "/posts")
    })    
    
    it('Should go to the about page', ()=>{
        cy.get("[data-cy=about]").click()
        cy.url().should('include', '/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })
    
    it('Should go to the posts page', ()=>{
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=posts-content]").should('be.visible')
    })

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
    
    it('Should go to the disclaim page', ()=>{
        cy.get("[data-cy=imp-docs]").click()
        cy.url().should('include', '/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })

    it('Should go to the myprofile page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()        
        cy.get("[data-cy=my-profile]").click()
        cy.url().should('include', '/myProfile')
        cy.get("[data-cy=profile-content]").should('be.visible')
    })

    it('Should go to the home page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.get("[data-cy=homepage]").click()
        cy.get("[data-cy=homepage-content]").should('be.visible')
    })    
    
    it('Should go to the logout page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.adminUser.username)
        cy.get("[data-cy=password]").type(fixtures.adminUser.password)
        cy.get("[data-cy=loginButton]").click()        
        cy.get("[data-cy=logout]").click()
        cy.url().should('include', '/')
    })
})

describe('Test nav bar with signin', () => {
    it('Should go to the login page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()
        cy.url().should("include", "/posts")
    })    
    
    it('Should go to the about page', ()=>{
        cy.get("[data-cy=about]").click()
        cy.url().should('include', '/about')
        cy.get("[data-cy=about-content]").should('be.visible')
    })
    
    it('Should go to the posts page', ()=>{
        cy.get("[data-cy=posts]").click()
        cy.url().should('include', '/posts')
        cy.get("[data-cy=posts-content]").should('be.visible')
    })
    
    it('Should go to the disclaim page', ()=>{
        cy.get("[data-cy=imp-docs]").click()
        cy.url().should('include', '/impDocs')
        cy.get("[data-cy=disclaim]").should('be.visible')
    })

    it('Should go to the myprofile page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()        
        cy.get("[data-cy=my-profile]").click()
        cy.url().should('include', '/myProfile')
        cy.get("[data-cy=profile-content]").should('be.visible')
    })

    it('Should go to the home page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()                
        cy.get("[data-cy=homepage]").click()
        cy.get("[data-cy=homepage-content]").should('be.visible')
    })    
    
    it('Should go to the logout page', ()=>{
        // user login
        cy.get("[data-cy=login]").click()
        cy.url().should('include', '/auth/login')
        cy.get("[data-cy=loginForm]").should('be.visible')
        cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
        cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
        cy.get("[data-cy=loginButton]").click()        
        cy.get("[data-cy=logout]").click()
        cy.url().should('include', '/')
    })
})