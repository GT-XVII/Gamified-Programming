Feature: Viewing Progress Dashboard
  As a user,
  I want to view my progress on the dashboard
  So that I can track my learning journey

  Scenario: Viewing completed quizzes and scores
    Given the user is logged into the system
    When the user navigates to the progress dashboard
    Then the system retrieves the user's progress data
    And the dashboard displays completed quizzes and scores
    When the user selects a completed quiz to review feedback
    Then the system shows correct answers and feedback

  Scenario: No progress available
    Given the user has not completed any quizzes
    When the user navigates to the progress dashboard
    Then the system displays a message "No progress available"
    And prompts the user to complete a quiz