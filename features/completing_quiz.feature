Feature: Completing a Quiz

  Scenario: User starts and completes a quiz with correct and incorrect answers
    Given the user is logged into the system
    And the user has opened a Python topic
    And the topic content is displayed
    When the user clicks on the "Start Quiz" button
    Then the system loads the quiz page
    When the user submits the correct answer for the first question
    Then the system displays "Correct" and tracks the correct answer
    When the user submits an incorrect answer for the second question
    Then the system displays "Incorrect" and shows the correct answer
    And the system tracks the incorrect answer
    When the user submits the final answer for the last question
    Then the system calculates the total number of correct answers
    And the system displays the overall score
    And the system allows the user to review each question with feedback
    And the user's progress is saved

  Scenario: User cancels the quiz
    Given the user is logged into the system
    And the user has started a quiz
    When the user clicks the "Cancel" button
    Then the system asks the user to confirm the cancellation
    When the user confirms the cancellation
    Then the quiz is canceled and no data is saved
    And the user is returned to the topic page

  Scenario: System error occurs during the quiz
    Given the user is logged into the system
    And the user has started a quiz
    When a system error occurs (e.g., loss of network connection)
    Then the system displays an error message
    And the user can retry submission or exit the quiz
