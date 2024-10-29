from behave import given

@given('the user is logged into the system')
def step_impl(context):
    context.user_logged_in = True
    print("User is logged in.")