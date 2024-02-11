Feature: Create User
  #The first case 
  Scenario: create user success
    Given I am the user
    When My phone number is never register 
    And pass verification
    Then I should can craete user success

  #The Second case
  Scenario: Phone number is already use to create user
    Given I am the user
    When My email is alraedy use to register
    Then I should get error "This phone number is already use"

  #The personal case 1
  Scenario: Personal Information "Username" 
    Given I am the user
    When I try to register 
    And Username that I use is invalid
    Then I should get error "Personal information is invalid"

  #The personal case 2
  Scenario: Personal Information "Provide" 
    Given I am the user
    When I try to register 
    And Provide that I use is invalid
    Then I should get error "Personal information is invalid"
  
  #The personal case 3
  Scenario: Personal Information "Postal Code" 
    Given I am the user
    When I try to register 
    And Postal Code that I use is invalid
    Then I should get error "Personal information is invalid"

  #The personal case 4
  Scenario: Personal Information "Building" 
    Given I am the user
    When I try to register 
    And Building that I use is invalid
    Then I should get error "Personal information is invalid"

  #The personal case 5
  Scenario: Personal Information "Phone number" 
    Given I am the user
    When I try to register 
    And Phone number that I use is invalid
    Then I should get error "Personal information is invalid"

  #The personal case 6
  Scenario: Personal Information "District" 
    Given I am the user
    When I try to register 
    And District that I use is invalid
    Then I should get error "Personal information is invalid"

  #The personal case 7
  Scenario: Personal Information "Street Name" 
    Given I am the user
    When I try to register 
    And Street Name that I use is invalid
    Then I should get error "Personal information is invalid"

  #The personal case 8
  Scenario: Personal Information "House NO." 
    Given I am the user
    When I try to register 
    And House NO. that I use is invalid
    Then I should get error "Personal information is invalid"