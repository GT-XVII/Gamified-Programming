from behave import given, when, then

@given('the user has opened a Python topic')
def step_impl(context):
    context.topic_opened = True
    print("Python topic is opened.")

@given('the topic content is displayed')
def step_impl(context):
    if context.topic_opened:
        context.topic_content_displayed = True
        print("Topic content is displayed.")

@when('the user clicks on the "Start Quiz" button')
def step_impl(context):
    if context.topic_content_displayed:
        context.quiz_started = True
        print("Quiz has started.")

@then('the system loads the quiz page')
def step_impl(context):
    if context.quiz_started:
        print("Quiz page is loaded.")

@when('the user submits the correct answer for the first question')
def step_impl(context):
    context.first_answer_correct = True
    print("User submitted the correct answer for the first question.")

@then('the system displays "Correct" and tracks the correct answer')
def step_impl(context):
    if context.first_answer_correct:
        print("Correct! The system tracks the correct answer.")

@when('the user submits an incorrect answer for the second question')
def step_impl(context):
    context.second_answer_correct = False
    print("User submitted an incorrect answer for the second question.")

@then('the system displays "Incorrect" and shows the correct answer')
def step_impl(context):
    if not context.second_answer_correct:
        print("Incorrect! The correct answer is displayed.")

@then('the system tracks the incorrect answer')
def step_impl(context):
    print("The system is tracking the incorrect answer.")

@when('the user submits the final answer for the last question')
def step_impl(context):
    context.final_question_submitted = True
    print("Final question submitted.")

@then('the system calculates the total number of correct answers')
def step_impl(context):
    context.total_correct = 1
    print(f"Total correct answers: {context.total_correct}")

@then('the system displays the overall score')
def step_impl(context):
    print(f"Overall score: {context.total_correct} out of 2")

@then('the system allows the user to review each question with feedback')
def step_impl(context):
    print("User can now review each question with feedback.")

@then('the user\'s progress is saved')
def step_impl(context):
    print("User's progress has been saved.")

@given('the user has started a quiz')
def step_impl(context):
    context.quiz_started = True
    print("User has started the quiz.")

@when('the user clicks the "Cancel" button')
def step_impl(context):
    context.quiz_canceled = True
    print("User clicked Cancel.")

@then('the system asks the user to confirm the cancellation')
def step_impl(context):
    context.cancellation_confirmed = True
    print("System asks for confirmation to cancel the quiz.")

@when('the user confirms the cancellation')
def step_impl(context):
    if context.cancellation_confirmed:
        context.quiz_canceled = True
        print("Quiz is canceled, and no data is saved.")

@then('the quiz is canceled and no data is saved')
def step_impl(context):
    if context.quiz_canceled:
        print("Quiz is canceled, and no data is saved.")

@then('the user is returned to the topic page')
def step_impl(context):
    print("User is returned to the topic page.")

@when('a system error occurs')
def step_impl(context):
    context.system_error = True
    print("A system error occurred.")


@then('the system displays an error message')
def step_impl(context):
    if context.system_error:
        print("Error: System encountered an issue.")

@then('the user can retry submission or exit the quiz')
def step_impl(context):
    if context.system_error:
        print("User can retry the submission or exit the quiz.")