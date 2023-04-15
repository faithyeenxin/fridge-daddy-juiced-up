import {
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// const axiosPostSpy = jest.spyOn(axios, 'post');
const mockNavigate = jest.fn();
// const mockAxios = axios as jest.Mocked<typeof axios>;

// jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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
  const registerHeading = screen.getByTestId('register-card-heading');
  expect(registerHeading).toHaveTextContent('Register');
  // test button
  const submitButton = screen.getByRole('button', {
    name: /Create Account/i,
  });
  expect(submitButton).not.toBeDisabled();
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

  it('should not show error on submission with correct data', async () => {
    render(<RegisterCard />);

    fillUpAndSubmitForm({
      name: 'testingUser',
      email: 'validUser@hotmail.com',
      password: 'Password123!',
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
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'));
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
    render(<RegisterCard />);

    fillUpAndSubmitForm({
      name: 'testingUser',
      email: 'existing-email@hotmail.com',
      password: 'Password123!',
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("We're registering you!");
      expect(toast.error).toHaveBeenCalledWith(
        'User already exist, please register with another email.'
      );
    });
    errorSpy.mockRestore();
  });
});

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const fillUpAndSubmitForm = async ({ name, email, password }: IFormData) => {
  const user = userEvent.setup();
  const nameFeildItem = screen.getByTestId('register-card-field-name');
  await user.clear(nameFeildItem);
  await user.type(nameFeildItem, name);

  const emailFeildItem = screen.getByTestId('register-card-field-email');
  await user.clear(emailFeildItem);
  await user.type(emailFeildItem, email);

  const passwordFeildItem = screen.getByTestId('register-card-field-password');
  await user.clear(passwordFeildItem);
  await user.type(passwordFeildItem, password);

  const createAccountButton = screen.getByTestId('create-account-button');
  await user.click(createAccountButton);
};
