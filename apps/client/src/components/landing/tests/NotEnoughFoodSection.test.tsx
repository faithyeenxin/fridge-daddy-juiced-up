import { render, screen } from '../../../test-utils/testing-library-utils';
import NotEnoughFoodSection from '../NotEnoughFoodSection';

describe('initial conditions', () => {
  test('contains 2 images', () => {
    render(<NotEnoughFoodSection />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });
});
