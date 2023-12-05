Feature: Testando API Pokemon

Background: Executa antes de cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'

Scenario: Testando retorno pokemon/charmander e verificando JSON
    Given url url_base
    And path 'pokemon/charmander/'
    When method get
    Then status 200
    And match response.id == 4
    And match response.name == 'charmander'
    And match response.types[0].type.name == 'fire'

Scenario: Testando retorno pokemon/pikachu com método errado
    Given url url_base
    And path 'pokemon/pikachu/'
    When method post
    Then status 404

Scenario: Testando retorno ability/ com informações inválidas
    Given url url_base
    And path 'ability/sword'
    When method get
    Then status 404

Scenario: Testando retorno ability/ com informações inválidas
    Given url url_base
    And path 'location/spring-path'
    When method get
    Then status 200
    And response.names[0].language.name == 'fr'
    And response.names[1].language.name == 'en'

Scenario: Testando retorno pokemon/ditto entrando no objeto species e verificando JSON
    Given url url_base
    And path 'pokemon/ditto'
    When method get
    Then status 200
    And def speciesUrl = response.species.url
    And url speciesUrl
    When method get
    Then status 200
    And match response.varieties[0].pokemon.name == 'ditto'
