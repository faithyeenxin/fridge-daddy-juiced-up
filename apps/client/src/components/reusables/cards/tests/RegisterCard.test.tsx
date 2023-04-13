import {
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { act } from 'react-dom/test-utils';
// import { act } from '@testing-library/react-hooks';

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
  test('all correctly filled should show no error', async () => {
    // switch off console.error as it tells me that setEmailExist is not properly configured in act.
    // will try to solve it later
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<RegisterCard />);

    await act(async () => {
      const nameFeildItem = screen.getByTestId('register-card-field-name');
      await user.clear(nameFeildItem);
      await user.type(nameFeildItem, 'testUserTwo');
      userEvent.tab();

      const emailFeildItem = screen.getByTestId('register-card-field-email');
      await user.clear(emailFeildItem);
      await user.type(emailFeildItem, 'newUser@hotmail.com');
      userEvent.tab();

      const passwordFeildItem = screen.getByTestId(
        'register-card-field-password'
      );
      await user.clear(passwordFeildItem);
      await user.type(passwordFeildItem, 'Password123!');
      userEvent.tab();

      const createAccountButton = screen.getByTestId('create-account-button');
      await user.click(createAccountButton);

      const nameError = screen.queryByTestId('register-card-field-error-name');
      const emailError = screen.queryByTestId(
        'register-card-field-error-email'
      );
      const passwordError = screen.queryByTestId(
        'register-card-field-error-password'
      );
      // cant seem to figure out how to get rid of email error
      await waitFor(() => {
        expect(nameError).not.toBeInTheDocument();
        expect(emailError).not.toBeInTheDocument();
        expect(passwordError).not.toBeInTheDocument();
      });
    });
    // expect(passwordError).toHaveTextContent(
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    // );
    errorSpy.mockRestore();
  });
  test('name, email and password is required on submit with Create Acc Button else will show error', async () => {
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

    const emailRequiredErrorMsg = screen.getByTestId(
      'register-card-field-error-email'
    );

    const passwordRequiredErrorMsg = screen.getByTestId(
      'register-card-field-error-password'
    );
    expect(nameRequiredErrorMsg).toHaveTextContent('Name is required');
    expect(emailRequiredErrorMsg).toHaveTextContent('Email is required');
    expect(passwordRequiredErrorMsg).toHaveTextContent('Password is required');
  });

  test('invalid (existing) email address throws error message', async () => {
    const user = userEvent.setup();
    render(<RegisterCard />);
    const nameFeildItem = screen.getByTestId('register-card-field-name');
    await user.clear(nameFeildItem);
    await user.type(nameFeildItem, 'testUserTwo');
    userEvent.click(document.body);

    const emailFeildItem = screen.getByTestId('register-card-field-email');
    await user.clear(emailFeildItem);
    await user.type(emailFeildItem, 'test-email@hotmail.com');
    const passwordFeildItem = screen.getByTestId(
      'register-card-field-password'
    );
    await user.clear(passwordFeildItem);
    await user.type(passwordFeildItem, 'Password123!');
    userEvent.click(document.body);

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

  test('invalid password throws error message', async () => {
    // switch off console.error as it tells me that setEmailExist is not properly configured in act.
    // will try to solve it later
    // const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<RegisterCard />);

    await act(async () => {
      const nameFeildItem = screen.getByTestId('register-card-field-name');
      await user.clear(nameFeildItem);
      await user.type(nameFeildItem, 'testUserTwo');
      userEvent.tab();

      const emailFeildItem = screen.getByTestId('register-card-field-email');
      await user.clear(emailFeildItem);
      await user.type(emailFeildItem, 'newUser@hotmail.com');
      userEvent.tab();

      const passwordFeildItem = screen.getByTestId(
        'register-card-field-password'
      );
      await user.clear(passwordFeildItem);
      await user.type(passwordFeildItem, 'password123!');
      userEvent.tab();

      const createAccountButton = screen.getByTestId('create-account-button');
      await user.click(createAccountButton);

      const nameError = screen.queryByTestId('register-card-field-error-name');
      const emailError = screen.queryByTestId(
        'register-card-field-error-email'
      );
      const passwordError = screen.queryByTestId(
        'register-card-field-error-password'
      );
      // cant seem to figure out how to get rid of email error

      expect(nameError).not.toBeInTheDocument();
      expect(emailError).not.toBeInTheDocument();
      expect(passwordError).toHaveTextContent(
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      );
    });

    // errorSpy.mockRestore();
  });
});

// test('functionality of register card - Google Button', () => {
//   render(<RegisterCard />);
// });
