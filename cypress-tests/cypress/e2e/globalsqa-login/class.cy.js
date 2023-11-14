/// <reference types="cypress" />

describe('Criando cenário de teste para o site GlobalsQA', () => {

  it('Caso de teste: Registrando um usuário no site com sucesso.', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Barbara')
    cy.get('#Text1').type('Barbieri')
    cy.get('#username').type('barbieri')
    cy.get('#password').type('admin123')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')
  })

  it('Caso de teste: Registrando um usuário no site com falha (faltando senha).', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('Barbara')
    cy.get('#Text1').type('Barbieri')
    cy.get('#username').type('barbieri')
    cy.get('#password').type('admin123')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled')
  })

  it('Caso de teste: Realizando um login com sucesso.', () => {
    let user = createUser()
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', user.username)
  })

  it('Caso de teste: Deletando um usuário com sucesso.', () => {
    let { username, password } = createUser()
    cy.login(username, password)
    cy.get('h1.ng-binding').should('contain.text', username)
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.login(username, password)
    cy.get('.ng-binding').should('have.text', 'Username or password is incorrect')
  })

})

function createUser() {
  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let username = hours + minutes + seconds + 'username'
  let password = hours + minutes + seconds + 'password'

  let user = { 'username': username, 'password': password }

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(username)
  cy.get('#Text1').type(username)
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return user
}


