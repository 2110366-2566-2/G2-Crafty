Feature: Get User by UID

    Scenario: Getting User With Valid UID
        Given "UID" is valid
        When I invoke "GetUserByID" function
        Then I get "User" with corresponding "UID"

    Scenario: Getting User With Invalid UID
        Given "UID" is invalid
        When I invoke "GetUserByID" function
        Then I get an error "UserNotFound"