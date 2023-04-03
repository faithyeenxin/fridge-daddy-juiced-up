import { RegisterCard } from '../reusables/cards/RegisterCard';
const JoinUsSection = () => {
  return (
    <div
      id='hero'
      data-testid='join-us-section-container'
      className='w-full h-[80vh] lg:h-[90vh] flex flex-col lg:flex-row justify-evenly items-center'
    >
      {/* left item */}

      <div className='flex mb-10 md:mt-16 md:mb-32 h-auto lg:h-full w-full lg:w-full justify-center lg:justify-start items-center'>
        <div
          className='w-[100%] lg:w-[60%] xl:w-[50%] lg:pl-[10%] flex flex-col gap-5'
          data-aos='fade-up'
          data-aos-duration='1500'
          data-aos-easing='ease-in-out'
          data-aos-once='false'
        >
          <h1 className='w-lg font-bold text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl'>
            It's terrible isn't it?
          </h1>
          <h1 className='w-lg font-bold text-center text-orange xs:text-lg sm:text-2xl md:text-4xl lg:text-xl xl:text-2xl'>
            Let's all join FridgeDaddy in the fight against food wastage!
          </h1>
          <div className='hidden lg:block'>
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
