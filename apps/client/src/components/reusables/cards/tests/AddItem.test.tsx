import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { RegisterCard } from '../RegisterCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddItemCard from '../AddItemCard';

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
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<AddItemCard />);
    const addItemHeading = screen.getByTestId('add-item-heading');
    expect(addItemHeading).toHaveTextContent('Add an Item');

    const itemName = screen.getByTestId('item-name');
    expect(itemName).toBeInTheDocument();

    const quantity = screen.getByTestId('quantity');
    expect(quantity).toBeInTheDocument();

    const dropdownSelect = screen.queryAllByTestId('dropdown-select');

    const categoryDropdown = dropdownSelect[0];
    expect(categoryDropdown).toHaveTextContent('Category');

    const compartmentDropdown = dropdownSelect[1];
    expect(compartmentDropdown).toHaveTextContent('Compartment');

    const purchaseDate = screen.getByTestId('purchase-date');
    const expiryDate = screen.getByTestId('expiry-date');

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    expect(purchaseDate).toHaveValue(formattedDate);
    expect(expiryDate).toHaveValue(formattedDate);

    const addItemButton = screen.getByTestId('add-item-button');
    expect(addItemButton).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});

describe('add item card functionality', () => {
  it('should throw error if any feilds empty', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<AddItemCard />);
    const user = userEvent.setup();

    const itemName = screen.getByTestId('item-name');
    await user.clear(itemName);

    const quantity = screen.getByTestId('quantity');
    await user.clear(quantity);

    const addItemButton = screen.getByTestId('add-item-button');
    await user.click(addItemButton);

    await waitFor(() =>
      expect(toastErrorSpy).toHaveBeenCalledWith(
        'All fields have to be filled.'
      )
    );
    errorSpy.mockRestore();
  });

  it('should throw error if any feilds empty', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<AddItemCard />);
    const user = userEvent.setup();

    const itemName = screen.getByTestId('item-name');
    await user.clear(itemName);

    const quantity = screen.getByTestId('quantity');
    await user.clear(quantity);

    const addItemButton = screen.getByTestId('add-item-button');
    await user.click(addItemButton);

    await waitFor(() =>
      expect(toastErrorSpy).toHaveBeenCalledWith(
        'All fields have to be filled.'
      )
    );
    errorSpy.mockRestore();
  });

  it('should show purchase and expiry date title when no on hover', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<AddItemCard />);
    const user = userEvent.setup();

    const purchaseTitle = screen.getByTestId('purchase-date-title');
    expect(purchaseTitle).toBeInTheDocument();
    const purchaseTitleStyle = window.getComputedStyle(purchaseTitle);
    expect(purchaseTitleStyle.visibility).toBe('visible');

    const expiryTitle = screen.getByTestId('expiry-date-title');
    expect(expiryTitle).toBeInTheDocument();
    const expiryTitleStyle = window.getComputedStyle(expiryTitle);
    expect(expiryTitleStyle.visibility).toBe('visible');

    errorSpy.mockRestore();
  });

  // apparently we cannot persist a hover state in react testing library thus this test will fail
  //   it('should not show purchase title when hovered', () => {
  //     render(<AddItemCard />);
  //     const purchaseTitle = screen.getByTestId('purchase-date-title');
  //     expect(purchaseTitle).toBeInTheDocument();
  //     fireEvent.mouseOver(purchaseTitle);
  //     expect(purchaseTitle).toHaveStyle('visibility: hidden');
  //     fireEvent.mouseOut(purchaseTitle);
  //     expect(purchaseTitle).not.toHaveStyle('visibility: hidden');
  //   });
});
