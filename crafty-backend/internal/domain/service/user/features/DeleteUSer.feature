Feature: Delete User
    #The first case
    Scenario: The UID is valid
        Given I am the user 
        And UID of user account that I want to delete is valid
        When I want to delete user
        Then The user account should be deleted
    
    #The second case
    Scenario: The UID is invalid
        Given I am the user
        And UID of user account that I want to delete is invalid
        When I want to delete user
        Then The system should show error "The User account is invalid"