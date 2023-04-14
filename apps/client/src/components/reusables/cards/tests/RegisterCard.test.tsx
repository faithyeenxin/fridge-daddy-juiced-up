import {
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// I will ignore the google login button as I do not know how to test it yet!
jest.mock('../../GoogleButton.tsx', () => {
  return () => <div data-testid='mock-google-button' />;
});

it('should have initial conditions', () => {
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

describe('register card functionality', () => {
  it('should show error when no name, email and password on submit', async () => {
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

  it('should not show error on submission with correct data and redirect to /home', async () => {
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
    await user.click(createAccountButton);

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
      expect(useNavigate).toHaveBeenCalled();
    });
  });

  it('should throw error with invalid email', async () => {
    const user = userEvent.setup();
    render(<RegisterCard />);

    const emailFeildItem = screen.getByTestId('register-card-field-email');
    await user.clear(emailFeildItem);
    await user.type(emailFeildItem, 'invalid-email@hotmail');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('should throw error with invalid password', async () => {
    const user = userEvent.setup();
    render(<RegisterCard />);

    const passwordFeildItem = screen.getByTestId(
      'register-card-field-password'
    );
    await user.clear(passwordFeildItem);
    await user.type(passwordFeildItem, 'password123!');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
      ).toBeInTheDocument();
    });
  });

  it('should throw error on submit when registering with existing email', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();

    render(<RegisterCard />);
    const nameFeildItem = screen.getByTestId('register-card-field-name');
    await user.clear(nameFeildItem);
    await user.type(nameFeildItem, 'testingUser');
    await user.tab();

    const emailFeildItem = screen.getByTestId('register-card-field-email');
    await user.clear(emailFeildItem);
    await user.type(emailFeildItem, 'existing-email@hotmail.com');
    await user.tab();

    const passwordFeildItem = screen.getByTestId(
      'register-card-field-password'
    );
    await user.clear(passwordFeildItem);
    await user.type(passwordFeildItem, 'Password123!');
    await user.tab();

    const createAccountButton = screen.getByTestId('create-account-button');

    await user.click(createAccountButton);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("We're registering you!");
      expect(toast.error).toHaveBeenCalledWith(
        'User already exist, please register with another email.'
      );
    });
    errorSpy.mockRestore();
  });
});
