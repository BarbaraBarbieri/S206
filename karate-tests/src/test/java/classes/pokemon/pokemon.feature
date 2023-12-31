Feature: Testando API Pokemon

Background: Executa antes de cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'

Scenario: Testando retorno pokemon/pikachu
    Given url 'https://pokeapi.co/api/v2/pokemon/pikachu/'
    When method get
    Then status 200

Scenario: Testando retorno pokemon/ com informações inválidas
    Given url 'https://pokeapi.co/api/v2/pokemon/chocolate/'
    When method get
    Then status 404

Scenario: Testando retorno pokemon/pikachu e verificando o JSON
    Given url url_base
    And path 'pokemon/pikachu/'
    When method get
    Then status 200
    And match response.id == 25
    And match response.name == 'pikachu'

Scenario: Testando retorno pokemon/red entrando em um dos elementos do array de idiomas e verificando o JSON
    Given url url_base
    And path 'version/1/'
    When method get
    Then status 200
    And def lang = $.names[5].language.url
    And print lang
    And url lang
    When method get
    Then status 200
    And match response.id == 7
    And match response.name == 'es'
