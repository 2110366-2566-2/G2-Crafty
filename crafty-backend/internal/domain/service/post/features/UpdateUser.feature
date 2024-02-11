Feature: Update User Personal Info

    Scenario: User edits personal info with invalid info
        Given I am a "User"
        When I go to the edit page
        And I fill in "personal info" with "new personal info"
        And Invalid "new personal info" exists
        And I press "update"
        Then I should see "Personal information is invalid"

    Scenario: User edits personal info with nil string
        Given I am a "User"
        When I go to the edit page
        And I fill in "personal info" with "new personal info"
        And Nil "new personal info" exists
        And I press "update"
        Then I should see "Personal information is invalid"

    Scenario: User edits personal info with valid info
        Given I am a "User"
        When I go to the edit page
        And I fill in "personal info" with "new personal info"
        And "new personal info" is valid
        And I press "update"
        Then I should see "Personal info updated"