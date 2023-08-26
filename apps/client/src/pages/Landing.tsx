import HeroSection from '../components/landing/HeroSection';
import JoinUsSection from '../components/landing/JoinUsSection';
import NotEnoughFoodSection from '../components/landing/NotEnoughFoodSection';
import WastedSection from '../components/landing/WastedSection';
import daddy from '../../src/assets/img/landing-page/daddy.svg';
import { ToastContainer } from 'react-toastify';
import NavBar from '../components/layout/NavBar';
export const Landing = () => {
  return (
    <div className='w-full h-[100vh] snap-y snap-mandatory overflow-auto'>
      <NavBar />
      <div className='sticky w-full top-10 z-10 hidden lg:block'>
        <img
          src={daddy}
          // src='../assets/img/landing-page/daddy.svg'
          className='absolute right-0 lg:w-[400px] xl:w-[500px] lg:top-28 xl:top-20'
        />
      </div>
      <div className='w-full h-[100vh] snap-center'>
        <HeroSection />
      </div>
      <div className='w-full h-[100vh] snap-center'>
        <WastedSection />
      </div>
      <div className='w-full h-[100vh] snap-center'>
        <NotEnoughFoodSection />
      </div>
      {/* </div> */}
      <div className='w-full h-[100vh] snap-center'>
        <JoinUsSection />
      </div>

      <ToastContainer
        position='bottom-right'
        data-testid='landing-toast-msg'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};
