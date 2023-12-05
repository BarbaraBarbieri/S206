/// <reference types="cypress" />

describe('Criando cenário de teste para o site Product Store', () => {

  it.skip('Caso de teste: Registrando um usuário no site com sucesso.', () => {
    cy.visit('https://www.demoblaze.com/index.html')
    cy.get('#signin2').click()

    let { username, password } = createUser()
    cy.get('#sign-username').type(username)
    cy.get('#sign-password').type(password)
    cy.get('#signInModal').find('.btn-primary').click()
    cy.on('window:alert', (str) => expect(str).to.equal('Sign up successful.'))
  })

  it.skip('Caso de teste: Adicionando um produto no carrinho com sucesso.', () => {
    let card = addProduct(1)
    let cart = visitCart(1)
    
    cy.get(card).then((productCard) => {
      cy.get(cart).then((productCart) => {
        expect(productCard).to.equal(productCart)
      })
    })
  })

  it('Caso de teste: Comprando os produtos do carrinho com falha (faltando número do cartão de crédito).', () => {
    let card1 = addProduct(1)
    let card2 = addProduct(2)

    cy.get('#cartur').click()
    cy.get('.col-lg-1 > .btn').click()
    cy.get('#name').type('Bárbara Barbieri')
    cy.get('#country').type('Brazil')
    cy.get('#city').type('Santa Rita do Sapucaí')
    cy.get('#card').clear()
    cy.get('#month').type('2023')
    cy.get('#year').type('12')
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    cy.on('window:alert', (str) => expect(str).to.equal('Please fill out Name and Creditcard.'))
  })

})

function createUser() {
  let hours = new Date().getHours().toString()
  let minutes = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()

  let username = hours + minutes + seconds + 'username'
  let password = hours + minutes + seconds + 'password'

  let user = { 'username': username, 'password': password }

  return user
}

function addProduct(index) {
  cy.visit('https://www.demoblaze.com/index.html')
  cy.get(`:nth-child(${index}) > .card > .card-block > .card-title > .hrefch`).invoke('text').then((product) => {
    cy.wrap(product).as('productCard')
  })
  cy.get(`:nth-child(${index}) > .card > .card-block > .card-title > .hrefch`).click()
  cy.get('.col-sm-12 > .btn').click()
  
  return '@productCard'
}

function visitCart(index) {
  cy.get('#cartur').click()
  cy.get(`.success > :nth-child(${index+1})`).invoke('text').then((product) => {
    cy.wrap(product).as('productCart')
  })

  return '@productCart'
}
