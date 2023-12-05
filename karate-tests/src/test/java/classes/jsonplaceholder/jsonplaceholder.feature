Feature: Testando resources da API JSON Placeholder

Background: Executa antes de cada teste
    * def url_base = 'https://jsonplaceholder.typicode.com/'
    * def request_json1 = read("jsonplaceholder1.json")
    * def request_json2 = read("jsonplaceholder2.json")

Scenario: Pegando elementos do array de response e testando seu tipo
    Given url url_base
    And path '/posts/'
    When method get
    Then status 200
    And match $ == '#[]'
    And match $ == '#[100]'
    And match each $ contains { title: '#string', userId: '#number' }

Scenario Outline: Criando um novo elemento usando o método POST
    Given url url_base
    And path '/posts/'
    And request <request_json>
    When method post
    Then status 201
    And match $.id == 101
    And match $.title == '#string'
    And match $.body == <body>
    And match $.userId == '#number'

    Examples:
    | request_json  | body          |
    | request_json1 | body test one |
    | request_json2 | body test two |

