import HeroSection from '../components/landing/HeroSection';
import JoinUsSection from '../components/landing/JoinUsSection';
import NotEnoughFoodSection from '../components/landing/NotEnoughFoodSection';
import WastedSection from '../components/landing/WastedSection';
import daddy from '../../src/assets/img/landing-page/daddy.svg';
export const Landing = () => {
  return (
    <div className='w-full h-full'>
      <div>
        <div className='sticky w-full top-10 z-10 hidden lg:block'>
          <img src={daddy} className='absolute right-0 w-[500px] top-20' />
        </div>
        <HeroSection />
        <WastedSection />
        <NotEnoughFoodSection />
      </div>
      <div className='relative'>
        <JoinUsSection />
      </div>
    </div>
  );
};
