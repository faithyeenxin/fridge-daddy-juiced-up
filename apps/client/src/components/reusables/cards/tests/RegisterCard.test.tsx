import {
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
// I will ignore the google login button as I do not know how to test it yet!
jest.mock('../../GoogleButton.tsx', () => {
  return () => <div data-testid='mock-google-button' />;
});

test('initial conditions', () => {
  render(<RegisterCard />);
  // test heading
  const testHeading = screen.getByTestId('register-card-heading');
  expect(testHeading).toHaveTextContent('Register');
  // test button
  const testButton = screen.getByRole('button', {
    name: /Create Account/i,
  });
  expect(testButton).not.toBeDisabled();
});

describe('functionality of register card - Create Account Button', () => {
  test('name, email and password is required on submit with Create Acc Button, else error message will show', async () => {
    const user = userEvent.setup();
    render(<RegisterCard />);
    const nameFeildItem = screen.getByTestId('register-card-field-name');
    await user.clear(nameFeildItem);

    const emailFeildItem = screen.getByTestId('register-card-field-email');
    await user.clear(emailFeildItem);

    const passwordFeildItem = screen.getByTestId(
      'register-card-field-password'
    );
    await user.clear(passwordFeildItem);

    const createAccountButton = screen.getByTestId('create-account-button');
    await user.click(createAccountButton);

    // const allErrorMessages = screen.getAllByTestId('register-card-field-error');
    // const allErrorMessagesArr = allErrorMessages.map(
    //   (item) => item.textContent
    // );
    // expect(allErrorMessagesArr).toEqual(['Required', 'Required', 'Required']);
    const nameRequiredErrorMsg = screen.getByTestId(
      'register-card-field-error-name'
    );
    expect(nameRequiredErrorMsg).toHaveTextContent('Required');

    const emailRequiredErrorMsg = screen.getByTestId(
      'register-card-field-error-email'
    );
    expect(emailRequiredErrorMsg).toHaveTextContent('Required');

    const passwordRequiredErrorMsg = screen.getByTestId(
      'register-card-field-error-password'
    );
    expect(passwordRequiredErrorMsg).toHaveTextContent('Required');
  });

  test('invalid (existing) email address throws error message', async () => {
    const user = userEvent.setup();
    render(<RegisterCard />);
    const nameFeildItem = screen.getByTestId('register-card-field-name');
    await user.clear(nameFeildItem);
    await user.type(nameFeildItem, 'testUserTwo');

    const emailFeildItem = screen.getByTestId('register-card-field-email');
    await user.clear(emailFeildItem);
    await user.type(emailFeildItem, 'test-email@hotmail.com');

    const passwordFeildItem = screen.getByTestId(
      'register-card-field-password'
    );
    await user.clear(passwordFeildItem);
    await user.type(passwordFeildItem, 'Password123!');

    const createAccountButton = screen.getByTestId('create-account-button');
    await user.click(createAccountButton);

    const nameError = screen.queryByTestId('register-card-field-error-name');
    const emailError = screen.queryByTestId('register-card-field-error-email');
    const passwordError = screen.queryByTestId(
      'register-card-field-error-password'
    );

    expect(nameError).not.toBeInTheDocument();
    expect(emailError).toHaveTextContent('User already exist');
    expect(passwordError).not.toBeInTheDocument();
  });

  // to complete below
  // test('invalid password throws error message', async () => {
  //   const user = userEvent.setup();
  //   render(<RegisterCard />);
  //   const nameFeildItem = screen.getByTestId('register-card-field-name');
  //   await user.clear(nameFeildItem);
  //   await user.type(nameFeildItem, 'testUserTwo');

  //   const emailFeildItem = screen.getByTestId('register-card-field-email');
  //   await user.clear(emailFeildItem);
  //   await user.type(emailFeildItem, 'newUser@hotmail.com');

  //   const passwordFeildItem = screen.getByTestId(
  //     'register-card-field-password'
  //   );
  //   await user.clear(passwordFeildItem);
  //   await user.type(passwordFeildItem, 'password123!');
  //   const createAccountButton = screen.getByTestId('create-account-button');
  //   await user.click(createAccountButton);

  //   const nameError = screen.queryByTestId('register-card-field-error-name');
  //   const emailError = screen.queryByTestId('register-card-field-error-email');
  //   const passwordError = screen.getByTestId(
  //     'register-card-field-error-password'
  //   );

  //   // cant seem to figure out how to get rid of email error
  //   await waitFor(() => {
  //     expect(nameError).not.toBeInTheDocument();
  //     expect(emailError).not.toBeInTheDocument();
  //     expect(passwordError).toHaveTextContent(
  //       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  //     );
  //   });
  // });
});

// test('functionality of register card - Google Button', () => {
//   render(<RegisterCard />);
// });
// to complete below
test('invalid password throws error message', async () => {
  const user = userEvent.setup();
  render(<RegisterCard />);
  const nameFeildItem = screen.getByTestId('register-card-field-name');
  await user.clear(nameFeildItem);
  await user.type(nameFeildItem, 'testUserTwo');

  const emailFeildItem = screen.getByTestId('register-card-field-email');
  await user.clear(emailFeildItem);
  await user.type(emailFeildItem, 'newUser@hotmail.com');

  const passwordFeildItem = screen.getByTestId('register-card-field-password');
  await user.clear(passwordFeildItem);
  await user.type(passwordFeildItem, 'password123!');

  // const createAccountButton = screen.getByTestId('create-account-button');
  // await user.click(createAccountButton);

  const nameError = screen.queryByTestId('register-card-field-error-name');
  const emailError = screen.queryByTestId('register-card-field-error-email');
  const passwordError = screen.queryByTestId(
    'register-card-field-error-password'
  );

  // cant seem to figure out how to get rid of email error
  await waitFor(() => {
    expect(nameError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    expect(passwordError).toHaveTextContent(
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    );
  });
});
