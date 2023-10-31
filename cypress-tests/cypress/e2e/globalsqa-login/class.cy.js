/// <reference types="cypress" />

describe('Criando cenário de teste para o site GlobalsQA', () => {

  it.skip('Caso de teste: Registrando um usuário no site com sucesso.', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Barbara')
    cy.get('#Text1').type('Barbieri')
    cy.get('#username').type('barbieri')
    cy.get('#password').type('admin123')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')
  })

  it.skip('Caso de teste: Registrando um usuário no site com falha (faltando senha).', () => {
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
    cy.get('#username').type(user.id)
    cy.get('#password').type(user.password)
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', user.id)
  })

})

function createUser() {
  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let id = hours + minutes + seconds + 'id'
  let password = hours + minutes + seconds + 'password'

  let user = { 'id': id, 'password': password }

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(id)
  cy.get('#Text1').type(id)
  cy.get('#username').type(id)
  cy.get('#password').type(password)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return user
}
