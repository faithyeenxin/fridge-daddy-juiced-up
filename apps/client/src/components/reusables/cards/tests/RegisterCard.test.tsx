import { render, screen } from '../../../../test-utils/testing-library-utils';
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

describe('functionality of register card', () => {
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
    // screen.debug();

    const nameExistErrorMsg = screen.queryByTestId(
      'register-card-field-error-name'
    );
    const emailExistErrorMsg = screen.getByTestId(
      'register-card-field-error-email'
    );

    const passwordExistErrorMsg = screen.queryByTestId(
      'register-card-field-error-password'
    );

    expect(nameExistErrorMsg).not.toBeInTheDocument();
    expect(emailExistErrorMsg).toHaveTextContent('User already exist');
    expect(passwordExistErrorMsg).not.toBeInTheDocument();
  });
});
