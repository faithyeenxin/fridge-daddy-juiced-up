import { render, screen } from '../../../test-utils/testing-library-utils';
import WastedSection from '../WastedSection';

describe('initial conditions', () => {
  it('should have left container', () => {
    render(<WastedSection />);
    const leftContainerItem = screen.getByTestId('wasted-left-container-item');
    expect(leftContainerItem).toHaveTextContent(
      'Did you know that one third of all food produced are lost or wasted?'
    );
  });

  it('should have right container 2 images', () => {
    render(<WastedSection />);
    const rightContainerImages = screen.getAllByRole('img');
    expect(rightContainerImages.length).toBe(2);
  });
});
