from behave import given, when, then


@when('the user navigates to the progress dashboard')
def step_impl(context):
    pass

@then('the system retrieves the user\'s progress data')
def step_impl(context):
    pass

@then('the dashboard displays completed quizzes and scores')
def step_impl(context):
    pass

@when('the user selects a completed quiz to review feedback')
def step_impl(context):
    pass

@then('the system shows correct answers and feedback')
def step_impl(context):
    pass 

@given('the user has not completed any quizzes')
def step_impl(context):
    pass

@then('the system displays a message "No progress available"')
def step_impl(context):
    pass

@then('prompts the user to complete a quiz')
def step_impl(context):
    pass  
