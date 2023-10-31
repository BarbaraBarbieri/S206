/// <reference types="cypress" />

describe('Criando cenário de teste para o site GlobalsQA', () => {

  it.skip('Caso de teste: Registrando um usuário no site com falha (faltando usuário).', () => {
    let { id, password } = createUser()
    fillFormRegistration(id, password)
    cy.get('#username').clear()
    requiredValidation()
    cy.get('.btn-primary').should('be.disabled')
  })

  it('Caso de teste: Realizando um login com falha (senha incorreta).', () => {
    let user = register()
    cy.wait(1000) // Esperando a página carregar
    let unregisteredUser = { id: user.id, password: 'password' }
    fillFormLogin(unregisteredUser.id, unregisteredUser.password)
    cy.get('.btn-primary').click()
    incorrectValidation()
  })

})

function createUser() {
  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let id = hours + minutes + seconds + 'id'
  let password = hours + minutes + seconds + 'password'
  let user = { 'id': id, 'password': password }

  return user
}

function fillFormRegistration(id, password) {
  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
  cy.get('#firstName').type(id)
  cy.get('#Text1').type(id)
  cy.get('#username').type(id)
  cy.get('#password').type(password)
}

function register() {
  let user = createUser()
  fillFormRegistration(user.id, user.password)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'successful')

  return user
}

function fillFormLogin(id, password) {
  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('#username').type(id)
  cy.get('#password').type(password)
}

function requiredValidation() {
  return cy.get('.has-error > .help-block').should('contain.text', 'is required')
}

function incorrectValidation() {
  return cy.get('.ng-binding').should('contain.text', 'is incorrect')
}
