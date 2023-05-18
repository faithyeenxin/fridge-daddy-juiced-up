import {
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddCategoryCard from '../AddCategoryCard';

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

const toastSuccessSpy = jest.spyOn(toast, 'success');
const toastErrorSpy = jest.spyOn(toast, 'error');

// I will ignore the google login button as I do not know how to test it yet!
jest.mock('../../GoogleButton.tsx', () => {
  return () => <div data-testid='mock-google-button' />;
});

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('should have initial conditions', () => {
  it('should have correct heading, input and button', () => {
    render(<AddCategoryCard />);
    const addCategoryHeading = screen.getByTestId('add-category-heading');
    expect(addCategoryHeading).toHaveTextContent('Add a Category');

    const nameInput = screen.getByTestId('add-category-name-input');
    expect(nameInput).toBeInTheDocument();

    const pantryInput = screen.getByTestId('add-category-pantry-input');
    expect(pantryInput).toBeInTheDocument();

    const fridgeInput = screen.getByTestId('add-category-fridge-input');
    expect(fridgeInput).toBeInTheDocument();

    const freezerInput = screen.getByTestId('add-category-freezer-input');
    expect(freezerInput).toBeInTheDocument();

    const addCategoryButton = screen.getByTestId('add-category-button');
    expect(addCategoryButton).toBeInTheDocument();
  });
});

describe('add category card functionality', () => {
  it('should throw toast error if fields all empty', async () => {
    const user = userEvent.setup();
    render(<AddCategoryCard />);

    const nameInput = screen.getByTestId('add-category-name-input');
    await user.clear(nameInput);

    const pantryInput = screen.getByTestId('add-category-pantry-input');
    await user.clear(pantryInput);

    const fridgeInput = screen.getByTestId('add-category-fridge-input');
    await user.clear(fridgeInput);

    const freezerInput = screen.getByTestId('add-category-freezer-input');
    await user.clear(freezerInput);

    const addCategoryButton = screen.getByTestId('add-category-button');
    user.click(addCategoryButton);
    await waitFor(() =>
      expect(toastErrorSpy).toHaveBeenCalledWith(
        'All fields have to be filled.'
      )
    );
  });

  it('should throw toast error if fields have negative values', async () => {
    const user = userEvent.setup();
    render(<AddCategoryCard />);

    const nameInput = screen.getByTestId('add-category-name-input');
    await user.clear(nameInput);
    await user.type(nameInput, '-2');

    const pantryInput = screen.getByTestId('add-category-pantry-input');
    await user.clear(pantryInput);
    await user.type(pantryInput, '-2');

    const fridgeInput = screen.getByTestId('add-category-fridge-input');
    await user.clear(fridgeInput);
    await user.type(fridgeInput, '-2');

    const freezerInput = screen.getByTestId('add-category-freezer-input');
    await user.clear(freezerInput);
    await user.type(freezerInput, '2');

    const addCategoryButton = screen.getByTestId('add-category-button');
    await user.click(addCategoryButton);
    await waitFor(() =>
      expect(toastErrorSpy).toHaveBeenCalledWith(
        'Pantry, Fridge & Freezer Days must be a positive value.'
      )
    );
  });

  it('should not throw toast error if fields valid', async () => {
    const user = userEvent.setup();
    render(<AddCategoryCard />);

    const nameInput = screen.getByTestId('add-category-name-input');
    await user.clear(nameInput);
    await user.type(nameInput, 'juices');

    const pantryInput = screen.getByTestId('add-category-pantry-input');
    await user.clear(pantryInput);
    await user.type(pantryInput, '10');

    const fridgeInput = screen.getByTestId('add-category-fridge-input');
    await user.clear(fridgeInput);
    await user.type(fridgeInput, '10');

    const freezerInput = screen.getByTestId('add-category-freezer-input');
    await user.clear(freezerInput);
    await user.type(freezerInput, '10');

    const addCategoryButton = screen.getByTestId('add-category-button');
    user.click(addCategoryButton);
    await waitFor(() => expect(toastSuccessSpy).toHaveBeenCalled());
  });

  it('should throw toast error if unable to create category', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<AddCategoryCard />);

    const nameInput = screen.getByTestId('add-category-name-input');
    await user.clear(nameInput);
    await user.type(nameInput, 'invalid');

    const pantryInput = screen.getByTestId('add-category-pantry-input');
    await user.clear(pantryInput);
    await user.type(pantryInput, '10');

    const fridgeInput = screen.getByTestId('add-category-fridge-input');
    await user.clear(fridgeInput);
    await user.type(fridgeInput, '10');

    const freezerInput = screen.getByTestId('add-category-freezer-input');
    await user.clear(freezerInput);
    await user.type(freezerInput, '10');

    const addCategoryButton = screen.getByTestId('add-category-button');
    user.click(addCategoryButton);
    await waitFor(() =>
      expect(toastErrorSpy).toHaveBeenCalledWith(
        'We could not add your category! Please try again.'
      )
    );
    errorSpy.mockRestore();
  });
});
