import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
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

    await waitFor(() => {
      expect(
        screen.getByTestId('register-card-field-error-name')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('register-card-field-error-email')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('register-card-field-error-password')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByTestId('register-card-field-error-name')
    ).toHaveTextContent('Name is required');
    expect(
      screen.getByTestId('register-card-field-error-email')
    ).toHaveTextContent('Email is required');
    expect(
      screen.getByTestId('register-card-field-error-password')
    ).toHaveTextContent('Password is required');
  });

  test('correct name, email and password will show no error', async () => {
    const user = userEvent.setup();
    render(<RegisterCard />);
    const nameFeildItem = screen.getByTestId('register-card-field-name');
    await user.clear(nameFeildItem);
    await user.type(nameFeildItem, 'testingUser');
    await user.tab();

    const emailFeildItem = screen.getByTestId('register-card-field-email');
    await user.clear(emailFeildItem);
    await user.type(emailFeildItem, 'validUser@hotmail.com');
    await user.tab();

    const passwordFeildItem = screen.getByTestId(
      'register-card-field-password'
    );
    await user.clear(passwordFeildItem);
    await user.type(passwordFeildItem, 'Password123!');
    await user.tab();

    const createAccountButton = screen.getByTestId('create-account-button');
    await act(async () => {
      await user.click(createAccountButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Invalid email address')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Password is required')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      ).not.toBeInTheDocument();
    });
  });
});
