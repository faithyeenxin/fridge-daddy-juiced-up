import { RegisterCard } from '../reusables/cards/RegisterCard';
import squareCircle from '../../assets/img/landing-page/square-circle.svg';
import waves from '../../assets/img/landing-page/waves.svg';

const JoinUsSection = () => {
  return (
    <div
      id='hero'
      data-testid='join-us-section-container'
      className='w-full h-[100vh] flex flex-col lg:flex-row justify-evenly items-center py-40 lg:py-0 relative'
    >
      <img
        src={squareCircle}
        className='absolute z-[-1] w-[100px] md:w-[220px] left-[0] bottom-[-50px] rotate-[210deg]'
      />
      <img
        src={waves}
        className='absolute z-[-1] w-[300px] md:w-[800px] right-[-98px] bottom-[40px] rotate-[-15deg]'
      />
      {/* left item */}
      <div className='flex md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-full justify-center lg:justify-start items-center'>
        <div
          className='w-[100%] lg:w-[60%] xl:w-[50%] lg:pl-[10%] flex flex-col gap-5 justify-center items-center'
          data-testid='content-container'
          // data-aos='fade-up'
          // data-aos-duration='1500'
          // data-aos-easing='ease-in-out'
          // data-aos-once='false'
        >
          <h1
            className='font-normal text-center text-gray-500 text-2xl md:text-2xl lg:text-4xl w-fit font-lato '
            data-testid='content-container-items'
          >
            Start using FridgeDaddy today!
          </h1>
          <div className='hidden lg:block w-full'>
            <RegisterCard />
          </div>
        </div>
      </div>
      {/* right item */}
      <div className='flex-col mb-10 md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-3/6 justify-center items-center flex lg:hidden'>
        <RegisterCard />
      </div>
    </div>
  );
};

export default JoinUsSection;
