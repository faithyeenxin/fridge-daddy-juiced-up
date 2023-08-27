import { RegisterCard } from '../reusables/cards/RegisterCard';
const JoinUsSection = () => {
  return (
    <div
      id='hero'
      data-testid='join-us-section-container'
      className='w-full h-[100vh] flex flex-col lg:flex-row justify-evenly items-center py-40 lg:py-0'
    >
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
            className='font-bold text-center text-orange text-4xl md:text-4xl lg:text-4xl xl:text-5xl w-fit font-lato '
            data-testid='content-container-items'
          >
            Make a difference today.
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
