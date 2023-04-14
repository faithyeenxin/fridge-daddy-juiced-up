import { render, screen } from '../../../test-utils/testing-library-utils';
import HeroSection from '../HeroSection';

describe('initial conditions', () => {
  it('should have left container', () => {
    render(<HeroSection />);
    const leftContainerItems = screen.getAllByTestId(
      'hero-left-container-item'
    );
    const leftContainerTextArray = leftContainerItems.map(
      (item) => item.textContent
    );
    expect(leftContainerTextArray).toEqual([
      "Tracking your fridge's inventory has never been easier!",
      'Play your part to reduce food waste with FridgeDaddy',
      'Get Started',
    ]);
  });
  it('should have right container with 2 images', () => {
    render(<HeroSection />);
    const rightContainerImages = screen.getAllByRole('img');
    expect(rightContainerImages.length).toBe(2);
  });
});
